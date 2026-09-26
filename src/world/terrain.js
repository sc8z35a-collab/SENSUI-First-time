// Terrain streaming: octree LOD of Surface-Nets chunks meshed in a worker pool.
//   L2 = 128 m chunks @ 4 m voxels (roots)
//   L1 =  64 m chunks @ 2 m voxels
//   L0 =  32 m chunks @ 1 m voxels
// A node renders its own mesh until all 8 children are ready, which avoids holes.
import * as THREE from 'three';
import { classifyBox } from './density.js';

const N = 32; // cells per chunk edge (all levels)
const LEVELS = 3;
const ROOT_SIZE = N * (1 << (LEVELS - 1)); // 128
const VIEW_RADIUS = 520;
// split a node of level L when camera distance to its box < SPLIT[L]
const SPLIT = [0, 96, 230];

class WorkerPool {
  constructor(count) {
    this.workers = [];
    this.idle = [];
    this.queue = [];
    this.pending = new Map();
    this.nextId = 1;
    for (let i = 0; i < count; i++) {
      const w = new Worker(new URL('./terrainWorker.js', import.meta.url), { type: 'module' });
      w.onmessage = (ev) => this._done(w, ev.data);
      this.workers.push(w);
      this.idle.push(w);
    }
  }
  request(job, cb) {
    job.id = this.nextId++;
    this.queue.push({ job, cb });
    return job.id;
  }
  pump(priorityFn) {
    if (!this.idle.length || !this.queue.length) return;
    // choose best jobs first
    this.queue.sort((a, b) => priorityFn(a.job) - priorityFn(b.job));
    while (this.idle.length && this.queue.length) {
      const item = this.queue.shift();
      if (item.job.cancelled) continue;
      const w = this.idle.pop();
      this.pending.set(item.job.id, item);
      w.postMessage({ id: item.job.id, ox: item.job.ox, oy: item.job.oy, oz: item.job.oz, n: N, v: item.job.v });
    }
  }
  _done(w, data) {
    this.idle.push(w);
    const item = this.pending.get(data.id);
    this.pending.delete(data.id);
    if (item && !item.job.cancelled) item.cb(data);
  }
  get busy() { return this.pending.size + this.queue.length; }
}

class Node {
  constructor(level, ix, iy, iz) {
    this.level = level;
    this.ix = ix; this.iy = iy; this.iz = iz;
    this.size = N << level;
    this.v = 1 << level;
    this.x = ix * this.size; this.y = iy * this.size; this.z = iz * this.size;
    this.state = 0; // 0 = none, 1 = requested, 2 = ready (mesh or empty)
    this.cls = classifyBox(this.x, this.y, this.z, this.size); // -1 water, 1 solid, 0 surface
    if (this.cls !== 0) this.state = 2;
    this.mesh = null;
    this.children = null;
    this.job = null;
    this.lastUsed = 0;
  }
  key() { return `${this.level},${this.ix},${this.iy},${this.iz}`; }
  distTo(p) {
    const dx = Math.max(this.x - p.x, 0, p.x - (this.x + this.size));
    const dy = Math.max(this.y - p.y, 0, p.y - (this.y + this.size));
    const dz = Math.max(this.z - p.z, 0, p.z - (this.z + this.size));
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
}

export class Terrain {
  constructor(scene, material) {
    this.scene = scene;
    this.material = material;
    this.group = new THREE.Group();
    this.group.name = 'terrain';
    scene.add(this.group);
    const cores = (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 4;
    this.pool = new WorkerPool(Math.max(2, Math.min(8, cores - 1)));
    this.roots = new Map();
    this.frame = 0;
    this.focus = new THREE.Vector3();
    this.meshCount = 0;
    this.triCount = 0;
    this.maxMeshes = 900;
    this.allMeshed = new Set();
  }

  _request(node) {
    node.state = 1;
    const job = { ox: node.x, oy: node.y, oz: node.z, v: node.v, node };
    node.job = job;
    this.pool.request(job, (data) => this._onMesh(node, data));
  }

  _onMesh(node, data) {
    node.job = null;
    node.state = 2;
    if (data.empty) return;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(data.P, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(data.N, 3));
    g.setAttribute('ao', new THREE.BufferAttribute(data.AO, 1));
    g.setIndex(new THREE.BufferAttribute(data.I, 1));
    g.computeBoundingSphere();
    g.computeBoundingBox();
    const m = new THREE.Mesh(g, this.material);
    m.castShadow = true;
    m.receiveShadow = true;
    m.matrixAutoUpdate = false;
    m.updateMatrix();
    m.visible = false;
    m.userData.node = node;
    node.mesh = m;
    this.group.add(m);
    this.allMeshed.add(node);
    this.meshCount++;
    this.triCount += data.I.length / 3;
  }

  _dispose(node) {
    if (node.job) { node.job.cancelled = true; node.job = null; if (node.state === 1) node.state = 0; }
    if (node.mesh) {
      this.group.remove(node.mesh);
      this.triCount -= node.mesh.geometry.index.count / 3;
      node.mesh.geometry.dispose();
      node.mesh = null;
      this.meshCount--;
      this.allMeshed.delete(node);
      if (node.cls === 0) node.state = 0;
    }
    if (node.children) { for (const c of node.children) this._dispose(c); node.children = null; }
  }

  // returns true if the subtree under node is fully drawable (no holes)
  _update(node, p) {
    node.lastUsed = this.frame;
    if (node.cls !== 0) return true; // empty/solid, nothing to draw
    const d = node.distTo(p);
    const wantSplit = node.level > 0 && d < SPLIT[node.level];
    if (wantSplit) {
      if (!node.children) {
        node.children = [];
        const half = node.level - 1;
        for (let k = 0; k < 2; k++) for (let j = 0; j < 2; j++) for (let i = 0; i < 2; i++) {
          node.children.push(new Node(half, node.ix * 2 + i, node.iy * 2 + j, node.iz * 2 + k));
        }
      }
      let allReady = true;
      for (const c of node.children) if (!this._update(c, p)) allReady = false;
      if (allReady) {
        if (node.mesh) node.mesh.visible = false;
        // children draw themselves
        return true;
      }
      // children not ready: draw self (if possible), hide children meshes
      for (const c of node.children) this._hideSubtree(c);
      if (node.state === 0) this._request(node);
      if (node.mesh) node.mesh.visible = true;
      return node.state === 2;
    } else {
      if (node.children) {
        // merge: keep children until own mesh ready
        if (node.state === 2) { for (const c of node.children) this._dispose(c); node.children = null; }
        else {
          if (node.state === 0) this._request(node);
          // keep children displayed meanwhile
          let ok = true;
          for (const c of node.children) if (!this._update(c, p)) ok = false;
          return ok;
        }
      }
      if (node.state === 0) this._request(node);
      if (node.mesh) node.mesh.visible = true;
      return node.state === 2;
    }
  }

  _hideSubtree(node) {
    if (node.mesh) node.mesh.visible = false;
    if (node.children) for (const c of node.children) this._hideSubtree(c);
  }

  update(focus) {
    this.frame++;
    this.focus.copy(focus);
    const p = focus;
    const R = VIEW_RADIUS;
    const x0 = Math.floor((p.x - R) / ROOT_SIZE), x1 = Math.floor((p.x + R) / ROOT_SIZE);
    const y0 = Math.floor((p.y - R) / ROOT_SIZE), y1 = Math.floor((p.y + R) / ROOT_SIZE);
    const z0 = Math.floor((p.z - R) / ROOT_SIZE), z1 = Math.floor((p.z + R) / ROOT_SIZE);
    const L = LEVELS - 1;
    for (let iz = z0; iz <= z1; iz++) for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
      if (iy * ROOT_SIZE > 10) continue; // nothing above sea
      const key = `${L},${ix},${iy},${iz}`;
      let n = this.roots.get(key);
      if (!n) {
        n = new Node(L, ix, iy, iz);
        this.roots.set(key, n);
      }
      if (n.distTo(p) > R) continue;
      this._update(n, p);
    }
    // evict roots not used for a while
    if (this.frame % 30 === 0) {
      for (const [k, n] of this.roots) {
        if (this.frame - n.lastUsed > 60) { this._dispose(n); this.roots.delete(k); }
      }
    }
    this.pool.pump((job) => {
      const n = job.node;
      // prefer near + fine chunks, but coarse ones first when nothing is shown
      return n.distTo(this.focus) - (2 - n.level) * 6 + (n.level === 2 ? -40 : 0);
    });
  }

  get loading() { return this.pool.busy; }
}
