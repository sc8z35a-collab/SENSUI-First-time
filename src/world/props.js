// Landmark set-pieces, built lazily when the submarine approaches (keeps startup fast).
// Everything is procedural geometry with PBR materials + underwater optics.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { POIS, groundHeight } from './density.js';
import { applyWater } from '../render/water.js';
import { pbrMaterial, tex } from '../render/textures.js';
import { SphereCollider, BoxCollider } from './colliders.js';
import { mulberry32 } from '../core/noise.js';

const W = (m, c = false) => applyWater(m, { caustics: c });

// --------------------------------------------------------------------- geometry helpers
// Ship hull: stations along length, each a U-shaped section. Open deck on top.
function shipHull(L, B, D, { bowRake = 0.25, segs = 48, ring = 20, sternCut = 0.1 } = {}) {
  const pos = [], uv = [], idx = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;                         // 0 stern .. 1 bow
    const z = (t - 0.5) * L;
    // beam distribution: fine bow, fuller stern
    let bw = t > 0.7 ? Math.cos(((t - 0.7) / 0.3) * Math.PI / 2) ** 0.8 : t < sternCut ? 0.75 + 0.25 * (t / sternCut) : 1;
    bw = Math.max(bw, 0.02);
    const keelRise = t > 0.85 ? (t - 0.85) / 0.15 * D * bowRake : 0;
    for (let j = 0; j <= ring; j++) {
      const a = (j / ring) * Math.PI;           // 0 = port deck edge .. pi = stbd deck edge
      const s = Math.sin(a), c = Math.cos(a);
      const x = -c * (B / 2) * bw * (0.35 + 0.65 * Math.pow(s, 0.15));
      const y = -Math.pow(s, 1.6) * (D - keelRise) + (t > 0.9 ? (t - 0.9) * D * 0.8 : 0);
      pos.push(x, y, z);
      uv.push(j / ring * 3, t * L / 6);
    }
  }
  for (let i = 0; i < segs; i++) for (let j = 0; j < ring; j++) {
    const a = i * (ring + 1) + j, b = a + ring + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
// jagged break cap to simulate a torn hull
function tearNoise(g, zCut, amp, rnd, side = 1) {
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const z = p.getZ(i);
    if ((z - zCut) * side > -1.5) { p.setZ(i, z + (rnd() - 0.5) * amp); p.setY(i, p.getY(i) + (rnd() - 0.5) * amp * 0.4); }
  }
  g.computeVertexNormals();
}
function deform(g, amp, freq, rnd) {
  const p = g.attributes.position;
  const ph = rnd() * 100;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const n = Math.sin(x * freq + ph) * Math.sin(y * freq * 1.3 + ph * 0.7) * Math.sin(z * freq * 0.8 + ph * 1.3);
    p.setXYZ(i, x + n * amp, y + n * amp * 0.6, z + n * amp);
  }
  g.computeVertexNormals();
  return g;
}
function rock(r, detail, rnd, squash = 1) {
  const g = new THREE.IcosahedronGeometry(r, detail);
  const p = g.attributes.position;
  const s = rnd() * 50;
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(p, i);
    const n = 1 + 0.25 * Math.sin(v.x * 3 / r + s) * Math.sin(v.y * 2.7 / r + s) * Math.sin(v.z * 3.3 / r) + 0.1 * Math.sin(v.x * 9 / r + v.z * 7 / r);
    v.multiplyScalar(n); v.y *= squash;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

function ground(x, z, y0) { return groundHeight(x, z, y0 + 40, y0 - 120); }

// --------------------------------------------------------------------- materials (shared)
let M = null;
async function mats() {
  if (M) return M;
  const [rust, hull, paint, rock1] = await Promise.all([
    pbrMaterial('rust', { repeat: 1, metal: true }),
    pbrMaterial('hull', { repeat: 1, metal: true }),
    pbrMaterial('paint', { repeat: 1, metal: true, ao: true }),
    pbrMaterial('rock1', { repeat: 1, ao: true }),
  ]);
  const rustW = W(rust.clone(), true); rustW.color.set(0x8a6a58); rustW.envMapIntensity = 0; rustW.side = THREE.DoubleSide;
  const rustDeep = W(rust.clone()); rustDeep.color.set(0x5c524c); rustDeep.side = THREE.DoubleSide;
  const hullGrey = W(hull.clone()); hullGrey.color.set(0x59636b); hullGrey.side = THREE.DoubleSide;
  const antifoul = W(paint.clone(), true); antifoul.color.set(0x6b2a20); antifoul.side = THREE.DoubleSide;
  const bone = W(new THREE.MeshStandardMaterial({ color: 0xd8ccb0, roughness: 0.85 }));
  const mat = W(new THREE.MeshStandardMaterial({ color: 0xe8e4c8, roughness: 1, emissive: 0x0a0a06 }));
  const chimney = W(rock1.clone()); chimney.color.set(0x4a3e36);
  const sulfide = W(new THREE.MeshStandardMaterial({ color: 0x9a7a3a, roughness: 0.7, metalness: 0.4 }));
  const nodule = W(new THREE.MeshStandardMaterial({ color: 0x241f1b, roughness: 0.75, metalness: 0.2 }));
  const orange = W(new THREE.MeshStandardMaterial({ color: 0xff6a10, roughness: 0.45 }));
  const yellow = W(new THREE.MeshStandardMaterial({ color: 0xf2c200, roughness: 0.4 }));
  const steel = W(new THREE.MeshStandardMaterial({ color: 0xb0b6bc, metalness: 1, roughness: 0.35 }));
  const coralW = W(new THREE.MeshStandardMaterial({ color: 0xf2ece0, roughness: 0.7 }));
  const coralO = W(new THREE.MeshStandardMaterial({ color: 0xff8a50, roughness: 0.7 }));
  const sponge = W(new THREE.MeshStandardMaterial({ color: 0xdcd3b0, roughness: 0.9, side: THREE.DoubleSide, transparent: true, opacity: 0.85 }));
  const worm = W(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }));
  const plume = W(new THREE.MeshStandardMaterial({ color: 0xff1a1a, roughness: 0.5, emissive: 0x220000 }));
  const black = W(new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.5 }));
  const wood = W(new THREE.MeshStandardMaterial({ color: 0x3b2c20, roughness: 0.95 }));
  const glass = W(new THREE.MeshStandardMaterial({ color: 0x222a2e, roughness: 0.1, metalness: 0.5 }));
  M = { rustW, rustDeep, hullGrey, antifoul, bone, mat, chimney, sulfide, nodule, orange, yellow, steel, coralW, coralO, sponge, worm, plume, black, wood, glass };
  return M;
}

// --------------------------------------------------------------------- builders
const builders = {
  // ---------------- cargo ship wreck, broken in two, on the shelf
  async wreck(poi, g, cols, rnd) {
    const m = await mats();
    const L = 72, B = 11, D = 7;
    const gy = ground(poi.x, poi.z, poi.y);
    // aft section
    const aft = new THREE.Group();
    const hg = shipHull(L * 0.58, B, D, { segs: 40 });
    tearNoise(hg, L * 0.29, 2.2, rnd, 1);
    const aftHull = new THREE.Mesh(hg, m.rustW);
    aft.add(aftHull);
    // deck plates with holes
    const deck = new THREE.Mesh(new THREE.BoxGeometry(B * 0.92, 0.25, L * 0.5), m.rustW); deck.position.set(0, -0.3, -2); aft.add(deck);
    // superstructure (bridge/accommodation)
    const sup = new THREE.Mesh(deform(new THREE.BoxGeometry(8, 6, 9, 6, 6, 6), 0.25, 0.9, rnd), m.rustW); sup.position.set(0, 2.8, -12); aft.add(sup);
    const bridge = new THREE.Mesh(deform(new THREE.BoxGeometry(9.5, 2.6, 5, 6, 3, 4), 0.2, 1.1, rnd), m.rustW); bridge.position.set(0, 7, -10.5); aft.add(bridge);
    for (let i = 0; i < 6; i++) { const w = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.9, 0.2), m.black); w.position.set(-3.6 + i * 1.45, 7.2, -8.0); aft.add(w); }
    const funnel = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, 5.5, 20, 4, true), m.rustW); funnel.position.set(0, 7.5, -16); funnel.rotation.x = 0.12; aft.add(funnel);
    // cargo hatches & masts
    for (let i = 0; i < 2; i++) { const h = new THREE.Mesh(new THREE.BoxGeometry(6, 0.9, 7), m.rustW); h.position.set(0, 0.2, 5 + i * 9); aft.add(h); }
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 14, 10), m.rustW); mast.position.set(0, 6.5, 9.5); mast.rotation.z = 0.35; aft.add(mast);
    const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 9, 8), m.rustW); boom.position.set(2.2, 2.2, 12); boom.rotation.x = 1.1; aft.add(boom);
    // rudder & prop
    const rud = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5, 3), m.rustW); rud.position.set(0, -4.6, -L * 0.29 - 1.4); aft.add(rud);
    const prop = new THREE.Group(); prop.position.set(0, -4.4, -L * 0.29 + 0.2);
    for (let i = 0; i < 4; i++) { const bl = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.9), m.rustW); bl.position.y = 1.1; const p = new THREE.Group(); p.rotation.z = (i / 4) * Math.PI * 2; bl.rotation.y = 0.5; p.add(bl); prop.add(p); }
    aft.add(prop);
    // antifouling paint on lower hull (second layer, slightly inset)
    aft.rotation.set(0.03, 0.4, -0.22);
    aft.position.set(poi.x - 14, gy + 4.6, poi.z + 10);
    g.add(aft);
    // bow section (tilted, half-buried)
    const bow = new THREE.Group();
    const bg = shipHull(L * 0.42, B, D, { segs: 30 });
    // shift so t 0..1 of this piece is the forward 42%
    bg.translate(0, 0, 0);
    tearNoise(bg, -L * 0.21, 2.2, rnd, -1);
    bow.add(new THREE.Mesh(bg, m.rustW));
    const fc = new THREE.Mesh(deform(new THREE.BoxGeometry(B * 0.7, 2, 6, 4, 2, 4), 0.2, 1, rnd), m.rustW); fc.position.set(0, 0.8, L * 0.16); bow.add(fc);
    const anchor = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.14, 6, 12, Math.PI), m.rustW); anchor.position.set(B * 0.35, -1.5, L * 0.17); anchor.rotation.y = Math.PI / 2; bow.add(anchor);
    bow.rotation.set(-0.14, 0.62, 0.3);
    bow.position.set(poi.x + 22, gy + 3.3, poi.z - 26);
    g.add(bow);
    // debris field: containers, plates, barrels
    for (let i = 0; i < 40; i++) {
      const a = rnd() * Math.PI * 2, r = 8 + rnd() * 40;
      const x = poi.x + Math.cos(a) * r, z = poi.z + Math.sin(a) * r;
      const y = ground(x, z, poi.y);
      let mesh;
      if (i % 3 === 0) mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.9, 12), m.rustW);
      else if (i % 3 === 1) mesh = new THREE.Mesh(deform(new THREE.BoxGeometry(2 + rnd() * 3, 0.1, 1 + rnd() * 2, 4, 1, 4), 0.2, 1.3, rnd), m.rustW);
      else mesh = new THREE.Mesh(deform(new THREE.BoxGeometry(2.4, 2.4, 6, 3, 3, 6), 0.12, 1, rnd), m.rustW);
      mesh.position.set(x, y + 0.2, z); mesh.rotation.set(rnd() * 0.6, rnd() * 6, rnd() * 0.6);
      g.add(mesh);
    }
    // colliders: approximate hull pieces with boxes
    const q1 = new THREE.Quaternion().setFromEuler(aft.rotation);
    cols.push(new BoxCollider(new THREE.Vector3(poi.x - 14, gy + 1.2, poi.z + 10), new THREE.Vector3(B / 2, D / 2 + 0.5, L * 0.29), q1));
    cols.push(new BoxCollider(new THREE.Vector3().copy(aft.position).add(new THREE.Vector3(0, 5, -11.5).applyQuaternion(q1)), new THREE.Vector3(4.8, 3.5, 4.5), q1));
    const q2 = new THREE.Quaternion().setFromEuler(bow.rotation);
    cols.push(new BoxCollider(new THREE.Vector3(poi.x + 22, gy + 0.5, poi.z - 26), new THREE.Vector3(B / 2, D / 2, L * 0.21), q2));
    // coral & sponges growing on the wreck
    const cg = coralGeometry(rnd, 0.6);
    const inst = new THREE.InstancedMesh(cg, m.coralO, 120);
    const mm = new THREE.Matrix4();
    for (let i = 0; i < 120; i++) {
      const tgt = i % 2 ? aft : bow;
      const p = new THREE.Vector3((rnd() - 0.5) * B * 0.9, 0.2 + rnd() * 1.5, (rnd() - 0.5) * L * 0.35).applyQuaternion(tgt.quaternion).add(tgt.position);
      const s = 0.5 + rnd() * 1.4;
      mm.compose(p, new THREE.Quaternion().setFromEuler(new THREE.Euler(rnd() * 0.4, rnd() * 6, rnd() * 0.4)), new THREE.Vector3(s, s, s));
      inst.setMatrixAt(i, mm);
      inst.setColorAt(i, new THREE.Color().setHSL(0.02 + rnd() * 0.1, 0.6, 0.45 + rnd() * 0.3));
    }
    g.add(inst);
  },

  // ---------------- cold-water coral reef (Lophelia) + glass sponges + gorgonians
  async coral(poi, g, cols, rnd) {
    const m = await mats();
    const geos = [coralGeometry(rnd, 1), coralGeometry(rnd, 1.3), coralGeometry(rnd, 0.8)];
    const count = 260;
    const insts = geos.map((ge, i) => new THREE.InstancedMesh(ge, i === 1 ? m.coralO : m.coralW, count));
    const mm = new THREE.Matrix4();
    const n = [0, 0, 0];
    for (let i = 0; i < count * 3; i++) {
      const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * poi.r * 1.3;
      const x = poi.x + Math.cos(a) * r, z = poi.z + Math.sin(a) * r;
      const y = ground(x, z, poi.y);
      const k = i % 3;
      if (n[k] >= count) continue;
      const s = 0.8 + rnd() * 2.2;
      mm.compose(new THREE.Vector3(x, y - 0.1, z), new THREE.Quaternion().setFromEuler(new THREE.Euler((rnd() - 0.5) * 0.3, rnd() * 6, (rnd() - 0.5) * 0.3)), new THREE.Vector3(s, s * (0.8 + rnd() * 0.5), s));
      insts[k].setMatrixAt(n[k], mm);
      insts[k].setColorAt(n[k], new THREE.Color().setHSL(k === 1 ? 0.04 + rnd() * 0.05 : 0.1, k === 1 ? 0.7 : 0.15, 0.6 + rnd() * 0.25));
      n[k]++;
    }
    insts.forEach((im, i) => { im.count = n[i]; g.add(im); });
    // glass sponges (vase-shaped lathe)
    const pts = []; for (let i = 0; i <= 12; i++) { const t = i / 12; pts.push(new THREE.Vector2(0.15 + Math.sin(t * Math.PI * 0.9) * 0.55 + t * 0.2, t * 2.2)); }
    const sg = new THREE.LatheGeometry(pts, 24);
    const sp = new THREE.InstancedMesh(sg, m.sponge, 40);
    for (let i = 0; i < 40; i++) {
      const a = rnd() * Math.PI * 2, r = rnd() * poi.r * 1.6;
      const x = poi.x + Math.cos(a) * r, z = poi.z + Math.sin(a) * r, y = ground(x, z, poi.y);
      const s = 0.6 + rnd() * 1.2;
      mm.compose(new THREE.Vector3(x, y - 0.1, z), new THREE.Quaternion(), new THREE.Vector3(s, s, s)); sp.setMatrixAt(i, mm);
    }
    g.add(sp);
    // gorgonian sea fans (canvas-drawn alpha texture on planes)
    const fanTex = fanTexture();
    const fm = W(new THREE.MeshStandardMaterial({ map: fanTex, alphaTest: 0.4, side: THREE.DoubleSide, roughness: 0.8, color: 0xffcc88 }));
    for (let i = 0; i < 28; i++) {
      const a = rnd() * Math.PI * 2, r = rnd() * poi.r * 1.4;
      const x = poi.x + Math.cos(a) * r, z = poi.z + Math.sin(a) * r, y = ground(x, z, poi.y);
      const s = 1.5 + rnd() * 2.5;
      const f = new THREE.Mesh(new THREE.PlaneGeometry(s, s), fm);
      f.position.set(x, y + s / 2 - 0.1, z); f.rotation.y = rnd() * Math.PI; g.add(f);
    }
    cols.push(new SphereCollider(new THREE.Vector3(poi.x, ground(poi.x, poi.z, poi.y) - 2, poi.z), 3));
  },

  // ---------------- whale fall: sperm whale skeleton with bacterial mats
  async whale(poi, g, cols, rnd) {
    const m = await mats();
    const gy = ground(poi.x, poi.z, poi.y);
    const sk = new THREE.Group();
    const Lw = 15;
    const vg = new THREE.CylinderGeometry(0.22, 0.22, 0.28, 12);
    const spineCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.6, -Lw / 2), new THREE.Vector3(0.6, 0.9, -2), new THREE.Vector3(-0.3, 0.7, 3), new THREE.Vector3(0.4, 0.3, Lw / 2)]);
    for (let i = 0; i < 44; i++) {
      const t = i / 43;
      const p = spineCurve.getPoint(t);
      const s = 1.2 - t * 0.8;
      const v = new THREE.Mesh(vg, m.bone); v.position.copy(p); v.scale.set(s, s, s); v.rotation.x = Math.PI / 2; sk.add(v);
      const proc = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5 * s, 0.12), m.bone); proc.position.copy(p).add(new THREE.Vector3(0, 0.35 * s, 0)); sk.add(proc);
      if (t > 0.18 && t < 0.52 && i % 2 === 0) {
        for (const side of [-1, 1]) {
          const rib = new THREE.Mesh(new THREE.TorusGeometry(1.4 * s, 0.07, 6, 18, Math.PI * 0.62), m.bone);
          rib.position.copy(p); rib.rotation.set(0, Math.PI / 2, side > 0 ? -0.2 : Math.PI + 0.2);
          rib.rotation.x = 0.15 * side + (rnd() - 0.5) * 0.3;
          sk.add(rib);
        }
      }
    }
    const skull = new THREE.Mesh(deform(new THREE.BoxGeometry(2.4, 1.6, 4.5, 6, 4, 8), 0.2, 1.5, rnd), m.bone); skull.position.set(0, 0.8, -Lw / 2 - 2.4); sk.add(skull);
    const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.3, 4.6), m.bone); jaw.position.set(0.9, 0.1, -Lw / 2 - 3.2); jaw.rotation.y = 0.35; sk.add(jaw);
    sk.position.set(poi.x, gy, poi.z); sk.rotation.y = rnd() * Math.PI;
    g.add(sk);
    // bacterial mat (white/yellow patches on the sediment)
    const matTex = matTexture();
    const mm = W(new THREE.MeshStandardMaterial({ map: matTex, transparent: true, depthWrite: false, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2 }));
    const pl = new THREE.Mesh(new THREE.PlaneGeometry(28, 28, 24, 24), mm);
    const pp = pl.geometry.attributes.position;
    for (let i = 0; i < pp.count; i++) { const x = pp.getX(i), y = pp.getY(i); const wx = poi.x + x, wz = poi.z - y; pp.setZ(i, ground(wx, wz, poi.y) - gy + 0.08); }
    pl.rotation.x = -Math.PI / 2; pl.position.set(poi.x, gy, poi.z); g.add(pl);
    cols.push(new BoxCollider(new THREE.Vector3(poi.x, gy + 0.8, poi.z), new THREE.Vector3(1.6, 1.2, Lw / 2 + 3), new THREE.Quaternion().setFromEuler(sk.rotation)));
  },

  // ---------------- hydrothermal vents: black smokers with plumes, tube worms
  async vents(poi, g, cols, rnd, ctx) {
    const m = await mats();
    const plumes = [];
    for (let i = 0; i < 9; i++) {
      const a = rnd() * Math.PI * 2, r = i === 0 ? 0 : 8 + rnd() * poi.r * 0.8;
      const x = poi.x + Math.cos(a) * r, z = poi.z + Math.sin(a) * r;
      const y = ground(x, z, poi.y);
      const H = (i === 0 ? 22 : 5 + rnd() * 12);
      const chim = new THREE.Group();
      // stacked irregular segments
      let yy = 0, rad = H * 0.16 + 1.2;
      while (yy < H) {
        const h = 1 + rnd() * 2;
        const seg = new THREE.Mesh(deform(new THREE.CylinderGeometry(rad * 0.8, rad, h, 14, 3), rad * 0.18, 2.5, rnd), rnd() < 0.3 ? m.sulfide : m.chimney);
        seg.position.y = yy + h / 2; seg.position.x = (rnd() - 0.5) * 0.3; chim.add(seg);
        // flanges (ledges)
        if (rnd() < 0.3) { const fl = new THREE.Mesh(deform(new THREE.CylinderGeometry(rad * 1.6, rad * 1.1, 0.35, 12), 0.2, 3, rnd), m.chimney); fl.position.y = yy + h; chim.add(fl); }
        yy += h; rad *= 0.86;
      }
      chim.position.set(x, y - 0.5, z);
      g.add(chim);
      plumes.push({ p: new THREE.Vector3(x, y + yy - 0.6, z), r: Math.max(0.3, rad * 0.5), s: i === 0 ? 1.6 : 0.6 + rnd() * 0.6 });
      cols.push(new BoxCollider(new THREE.Vector3(x, y + yy / 2, z), new THREE.Vector3(H * 0.16 + 1.2, yy / 2, H * 0.16 + 1.2)));
      // tube worms clusters at base
      const wormG = new THREE.CylinderGeometry(0.03, 0.04, 1, 5); wormG.translate(0, 0.5, 0);
      const plumeG = new THREE.SphereGeometry(0.07, 6, 4);
      const nW = 60;
      const tw = new THREE.InstancedMesh(wormG, m.worm, nW);
      const tp = new THREE.InstancedMesh(plumeG, m.plume, nW);
      const mm = new THREE.Matrix4();
      for (let k = 0; k < nW; k++) {
        const aa = rnd() * Math.PI * 2, rr = H * 0.18 + 1 + rnd() * 2.2;
        const wx = x + Math.cos(aa) * rr, wz = z + Math.sin(aa) * rr;
        const wy = y - 0.2;
        const len = 0.6 + rnd() * 1.4;
        const q = new THREE.Quaternion().setFromEuler(new THREE.Euler((rnd() - 0.5) * 0.5, 0, (rnd() - 0.5) * 0.5));
        mm.compose(new THREE.Vector3(wx, wy, wz), q, new THREE.Vector3(1, len, 1)); tw.setMatrixAt(k, mm);
        const tip = new THREE.Vector3(0, len, 0).applyQuaternion(q).add(new THREE.Vector3(wx, wy, wz));
        mm.compose(tip, q, new THREE.Vector3(1, 1.6, 1)); tp.setMatrixAt(k, mm);
      }
      g.add(tw); g.add(tp);
    }
    // plume particle system (black smoke): billboards rising and spreading
    const N = 900;
    const geo = new THREE.BufferGeometry();
    const seed = new Float32Array(N * 4);
    const src = new Float32Array(N * 4);
    for (let i = 0; i < N; i++) {
      const pl = plumes[i % plumes.length];
      src[i * 4] = pl.p.x; src[i * 4 + 1] = pl.p.y; src[i * 4 + 2] = pl.p.z; src[i * 4 + 3] = pl.s;
      seed[i * 4] = rnd(); seed[i * 4 + 1] = rnd(); seed[i * 4 + 2] = rnd(); seed[i * 4 + 3] = rnd();
    }
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.setAttribute('src', new THREE.BufferAttribute(src, 4));
    geo.setAttribute('seed', new THREE.BufferAttribute(seed, 4));
    const pm = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uT: { value: 0 }, uLight: { value: new THREE.Vector3() }, uCam: { value: new THREE.Vector3() }, uSpot: { value: new THREE.Vector3() }, uSpotI: { value: 0 } },
      vertexShader: `attribute vec4 src; attribute vec4 seed; uniform float uT; varying float vA; varying float vH; varying vec3 vW; uniform vec3 uCam;
        void main(){ float life = fract(seed.x + uT * (0.06 + seed.y * 0.04) * src.w);
          float h = life * 55.0 * src.w;
          vec3 p = src.xyz + vec3(0.0, h, 0.0);
          float spread = 0.4 + life * life * 14.0 * src.w;
          p.x += sin(seed.z * 6.28 + uT * 0.3 + h * 0.08) * spread; p.z += cos(seed.w * 6.28 + uT * 0.25 + h * 0.07) * spread;
          p.x += h * 0.25; // drift with current
          vW = p; vH = life;
          vA = smoothstep(0.0, 0.05, life) * (1.0 - life);
          vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.5 + life * 9.0 * src.w) * 260.0 / -mv.z; }`,
      fragmentShader: `varying float vA; varying float vH; varying vec3 vW; uniform vec3 uCam; uniform vec3 uSpot; uniform float uSpotI;
        void main(){ vec2 c = gl_PointCoord - 0.5; float r = length(c); if (r > 0.5) discard;
          float a = smoothstep(0.5, 0.0, r) * vA * 0.35;
          // lit only by sub lights: distance to spot
          float d = distance(vW, uSpot); float lit = uSpotI / (1.0 + d * d * 0.02);
          vec3 col = vec3(0.05, 0.045, 0.04) * (0.2 + lit) + vec3(1.0, 0.35, 0.05) * smoothstep(0.08, 0.0, vH) * 3.0;
          float fog = exp(-distance(vW, uCam) * 0.03);
          gl_FragColor = vec4(col * fog, a * fog); }`,
    });
    const pts = new THREE.Points(geo, pm); pts.frustumCulled = false;
    g.add(pts);
    ctx.tick.push((t, st) => { pm.uniforms.uT.value = t; pm.uniforms.uCam.value.copy(st.camPos); pm.uniforms.uSpot.value.copy(st.camPos); pm.uniforms.uSpotI.value = st.extLight * 0.6; });
    // glow at orifices
    for (const pl of plumes.slice(0, 3)) { const l = new THREE.PointLight(0xff5a10, 2.5 * pl.s, 8, 2); l.position.copy(pl.p); g.add(l); }
  },

  // ---------------- manganese nodule field + sea cucumbers + tracks
  async nodules(poi, g, cols, rnd) {
    const m = await mats();
    const N = 2400;
    const geos = [rock(0.12, 1, rnd, 0.7), rock(0.08, 1, rnd, 0.8), rock(0.18, 1, rnd, 0.6)];
    const insts = geos.map((ge) => new THREE.InstancedMesh(ge, m.nodule, N / 3));
    const mm = new THREE.Matrix4();
    const cnt = [0, 0, 0];
    for (let i = 0; i < N; i++) {
      const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * poi.r * 1.8;
      const x = poi.x + Math.cos(a) * r, z = poi.z + Math.sin(a) * r;
      const y = i % 8 === 0 ? ground(x, z, poi.y) : null;
      const k = i % 3;
      const yy = y ?? groundCache(x, z, poi);
      const s = 0.6 + rnd() * 1.4;
      mm.compose(new THREE.Vector3(x, yy - 0.02, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rnd(), rnd() * 6, rnd())), new THREE.Vector3(s, s, s));
      insts[k].setMatrixAt(cnt[k]++, mm);
    }
    insts.forEach((im) => { im.receiveShadow = true; g.add(im); });
    // holothurians (sea pigs: Scotoplanes) - pinkish translucent
    const pigG = new THREE.CapsuleGeometry(0.12, 0.3, 4, 10); pigG.rotateX(Math.PI / 2);
    const pigM = W(new THREE.MeshStandardMaterial({ color: 0xe8a0a0, roughness: 0.5, transparent: true, opacity: 0.9 }));
    const pig = new THREE.InstancedMesh(pigG, pigM, 30);
    for (let i = 0; i < 30; i++) { const x = poi.x + (rnd() - 0.5) * 100, z = poi.z + (rnd() - 0.5) * 100; mm.compose(new THREE.Vector3(x, ground(x, z, poi.y) + 0.08, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rnd() * 6, 0)), new THREE.Vector3(1, 0.8, 1)); pig.setMatrixAt(i, mm); }
    g.add(pig);
    // an old scientific sediment corer, lost
    const corer = new THREE.Group();
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.5, 12), m.steel); tube.position.y = 1.2; corer.add(tube);
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.6, 12), m.orange); head.position.y = 2.5; corer.add(head);
    const cx = poi.x + 12, cz = poi.z - 8; corer.position.set(cx, ground(cx, cz, poi.y) - 0.4, cz); corer.rotation.z = 0.3; g.add(corer);
  },

  // ---------------- destroyer wreck at 6 km
  async destroyer(poi, g, cols, rnd) {
    const m = await mats();
    const gy = ground(poi.x, poi.z, poi.y);
    const L = 110, B = 10.5, D = 6.5;
    const sh = new THREE.Group();
    const hg = shipHull(L, B, D, { segs: 70, bowRake: 0.4 });
    tearNoise(hg, L * 0.5, 3, rnd, 1); // bow torn off
    sh.add(new THREE.Mesh(hg, m.hullGrey));
    const deck = new THREE.Mesh(new THREE.BoxGeometry(B * 0.9, 0.2, L * 0.9), m.hullGrey); deck.position.y = -0.2; sh.add(deck);
    // superstructure, funnels, turrets, torpedo mounts
    const brg = new THREE.Mesh(deform(new THREE.BoxGeometry(6, 5, 10, 4, 4, 6), 0.2, 1, rnd), m.hullGrey); brg.position.set(0, 2.5, 22); sh.add(brg);
    const top = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.5, 5), m.hullGrey); top.position.set(0, 6, 21); sh.add(top);
    for (const z of [5, -8]) { const f = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.7, 7, 16, 2, true), m.hullGrey); f.position.set(0, 3.5, z); f.rotation.x = -0.15; f.scale.z = 1.5; sh.add(f); }
    for (const z of [38, 30, -30, -40]) {
      const tur = new THREE.Group(); tur.position.set(0, 1, z);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 1.2, 18), m.hullGrey); tur.add(base);
      const house = new THREE.Mesh(deform(new THREE.BoxGeometry(3.6, 2.2, 4.4, 3, 2, 3), 0.1, 1, rnd), m.hullGrey); house.position.y = 1.5; tur.add(house);
      for (const s of [-0.6, 0.6]) { const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 6, 10), m.hullGrey); bar.rotation.x = Math.PI / 2 - (rnd() * 0.3); bar.position.set(s, 1.6, z > 0 ? 4.4 : -4.4); tur.add(bar); }
      tur.rotation.y = (z > 0 ? 0 : Math.PI) + (rnd() - 0.5) * 0.8;
      sh.add(tur);
    }
    for (const z of [-2, -18]) { const tt = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 7, 12), m.hullGrey); tt.rotation.z = Math.PI / 2; tt.rotation.y = 0.5; tt.position.set(0, 1.2, z); sh.add(tt); }
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 12, 8), m.hullGrey); mast.position.set(0, 10, 18); mast.rotation.x = 0.6; sh.add(mast);
    sh.rotation.set(0.02, rnd() * 6, 0.12);
    sh.position.set(poi.x, gy + 3.2, poi.z);
    g.add(sh);
    // torn bow nearby, upside down
    const bow = new THREE.Mesh(shipHull(18, B, D, { segs: 16 }), m.hullGrey);
    bow.rotation.set(Math.PI - 0.3, 1.5, 0.2);
    const bx = poi.x + 50, bz = poi.z + 30; bow.position.set(bx, ground(bx, bz, poi.y) + 2, bz);
    g.add(bow);
    cols.push(new BoxCollider(new THREE.Vector3(poi.x, gy + 0.2, poi.z), new THREE.Vector3(B / 2, D / 2 + 1, L / 2), new THREE.Quaternion().setFromEuler(sh.rotation)));
    cols.push(new BoxCollider(new THREE.Vector3().copy(sh.position).add(new THREE.Vector3(0, 5, 22).applyEuler(sh.rotation)), new THREE.Vector3(3.2, 4, 5.5), new THREE.Quaternion().setFromEuler(sh.rotation)));
    cols.push(new SphereCollider(bow.position, 7));
  },

  // ---------------- baited lander at 8 km (with strobe)
  async lander(poi, g, cols, rnd, ctx) {
    const m = await mats();
    const gy = ground(poi.x, poi.z, poi.y);
    const L = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.2, 8), m.steel);
      leg.position.set(Math.cos(a) * 0.9, 1.5, Math.sin(a) * 0.9); leg.rotation.set(Math.sin(a) * 0.3, 0, -Math.cos(a) * 0.3); L.add(leg);
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.06, 12), m.steel); foot.position.set(Math.cos(a) * 1.4, 0.03, Math.sin(a) * 1.4); L.add(foot);
    }
    for (let i = 0; i < 6; i++) { const f = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 14), i % 2 ? m.orange : m.yellow); f.position.set((i % 3 - 1) * 0.6, 3.3 + (i > 2 ? 0.55 : 0), 0); L.add(f); }
    const cage = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6, 3, 3, 3), W(new THREE.MeshStandardMaterial({ color: 0x999999, wireframe: true }))); cage.position.set(0, 0.5, 0); L.add(cage);
    const bait = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), W(new THREE.MeshStandardMaterial({ color: 0x8a7a70 }))); bait.position.set(0, 0.5, 0); L.add(bait);
    const cam = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 12), m.black); cam.position.set(0.3, 2.2, 0); cam.rotation.z = 1; L.add(cam);
    const strobeM = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), strobeM); strobe.position.set(0, 4.2, 0); L.add(strobe);
    const sl = new THREE.PointLight(0xdfefff, 0, 25, 1.5); sl.position.copy(strobe.position); L.add(sl);
    L.position.set(poi.x, gy, poi.z); g.add(L);
    ctx.tick.push((t) => { const on = (t % 2.5) < 0.08; strobeM.color.setScalar(on ? 60 : 0.2); sl.intensity = on ? 40 : 0; });
    cols.push(new BoxCollider(new THREE.Vector3(poi.x, gy + 1.8, poi.z), new THREE.Vector3(1.4, 2, 1.4)));
  },

  // ---------------- Challenger Deep: soft ooze, a commemorative marker
  async deep(poi, g, cols, rnd) {
    const m = await mats();
    const gy = ground(poi.x, poi.z, poi.y);
    const plaque = new THREE.Group();
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.4, 10), m.steel); post.position.y = 0.5; plaque.add(post);
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.55, 0.05), W(new THREE.MeshStandardMaterial({ map: plaqueTexture(), metalness: 0.8, roughness: 0.35 }))); board.position.y = 1.3; plaque.add(board);
    plaque.position.set(poi.x, gy - 0.1, poi.z); plaque.rotation.set(0.1, 0.7, 0.05); g.add(plaque);
    // xenophyophores (giant single-celled organisms) - lumpy fist-sized blobs
    const xg = rock(0.2, 2, rnd, 0.6);
    const xm = W(new THREE.MeshStandardMaterial({ color: 0xbfb49a, roughness: 1 }));
    const xi = new THREE.InstancedMesh(xg, xm, 120);
    const mm = new THREE.Matrix4();
    for (let i = 0; i < 120; i++) { const x = poi.x + (rnd() - 0.5) * 120, z = poi.z + (rnd() - 0.5) * 120; const s = 0.5 + rnd() * 1.5; mm.compose(new THREE.Vector3(x, groundCache(x, z, poi), z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rnd() * 6, 0)), new THREE.Vector3(s, s, s)); xi.setMatrixAt(i, mm); }
    g.add(xi);
  },
};

// sparse cached ground heights (bilinear from a coarse grid around the POI)
const gcache = new Map();
function groundCache(x, z, poi) {
  let c = gcache.get(poi.id);
  const S = 4, R = Math.ceil((poi.r * 2.2) / S);
  if (!c) {
    c = new Float32Array((2 * R + 1) ** 2);
    for (let j = -R; j <= R; j++) for (let i = -R; i <= R; i++) c[(j + R) * (2 * R + 1) + i + R] = ground(poi.x + i * S, poi.z + j * S, poi.y);
    gcache.set(poi.id, c);
  }
  const fx = (x - poi.x) / S + R, fz = (z - poi.z) / S + R;
  const i = Math.max(0, Math.min(2 * R - 1, Math.floor(fx))), j = Math.max(0, Math.min(2 * R - 1, Math.floor(fz)));
  const tx = THREE.MathUtils.clamp(fx - i, 0, 1), tz = THREE.MathUtils.clamp(fz - j, 0, 1);
  const n = 2 * R + 1;
  const a = c[j * n + i], b = c[j * n + i + 1], d = c[(j + 1) * n + i], e = c[(j + 1) * n + i + 1];
  return (a * (1 - tx) + b * tx) * (1 - tz) + (d * (1 - tx) + e * tx) * tz;
}

// branching coral (Lophelia-like), merged tube segments
function coralGeometry(rnd, scale = 1) {
  const parts = [];
  const grow = (p, dir, len, r, depth) => {
    const end = p.clone().addScaledVector(dir, len);
    const g = new THREE.CylinderGeometry(r * 0.75, r, len, 6, 1);
    g.translate(0, len / 2, 0);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir));
    g.translate(p.x, p.y, p.z);
    parts.push(g);
    if (depth <= 0) { const tip = new THREE.SphereGeometry(r * 1.1, 6, 4); tip.translate(end.x, end.y, end.z); parts.push(tip); return; }
    const n = 2 + (rnd() < 0.4 ? 1 : 0);
    for (let i = 0; i < n; i++) {
      const nd = dir.clone().add(new THREE.Vector3((rnd() - 0.5) * 1.3, rnd() * 0.5, (rnd() - 0.5) * 1.3)).normalize();
      grow(end, nd, len * (0.7 + rnd() * 0.2), r * 0.72, depth - 1);
    }
  };
  grow(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0.35 * scale, 0.06 * scale, 4);
  const merged = mergeGeometries(parts.map((p) => { p.deleteAttribute('uv'); return p.index ? p.toNonIndexed() : p; }));
  merged.computeVertexNormals();
  return merged;
}

function fanTexture() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 256;
  const c = cv.getContext('2d');
  c.strokeStyle = '#fff'; c.lineCap = 'round';
  const rnd = mulberry32(5);
  const br = (x, y, a, l, w, d) => {
    const x2 = x + Math.cos(a) * l, y2 = y + Math.sin(a) * l;
    c.lineWidth = w; c.beginPath(); c.moveTo(x, y); c.lineTo(x2, y2); c.stroke();
    if (d > 0) { br(x2, y2, a - 0.3 - rnd() * 0.3, l * 0.78, w * 0.7, d - 1); br(x2, y2, a + 0.3 + rnd() * 0.3, l * 0.78, w * 0.7, d - 1); }
  };
  br(128, 256, -Math.PI / 2, 60, 7, 7);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function matTexture() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 512;
  const c = cv.getContext('2d');
  const rnd = mulberry32(9);
  for (let i = 0; i < 900; i++) {
    const a = rnd() * Math.PI * 2, r = Math.pow(rnd(), 0.7) * 240;
    const x = 256 + Math.cos(a) * r, y = 256 + Math.sin(a) * r;
    const g = c.createRadialGradient(x, y, 0, x, y, 6 + rnd() * 22);
    const col = rnd() < 0.3 ? '230,200,90' : '245,245,235';
    g.addColorStop(0, `rgba(${col},${0.5 * (1 - r / 260)})`); g.addColorStop(1, `rgba(${col},0)`);
    c.fillStyle = g; c.fillRect(x - 30, y - 30, 60, 60);
  }
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function plaqueTexture() {
  const cv = document.createElement('canvas'); cv.width = 512; cv.height = 320;
  const c = cv.getContext('2d');
  c.fillStyle = '#b89a52'; c.fillRect(0, 0, 512, 320);
  c.strokeStyle = '#5a4520'; c.lineWidth = 8; c.strokeRect(12, 12, 488, 296);
  c.fillStyle = '#3a2a10'; c.textAlign = 'center';
  c.font = 'bold 40px "Noto Sans JP", serif'; c.fillText('チャレンジャー海淵', 256, 80);
  c.font = 'bold 30px serif'; c.fillText('CHALLENGER DEEP', 256, 125);
  c.font = '26px serif'; c.fillText('10,925 m', 256, 175);
  c.font = '20px serif'; c.fillText('"The deepest point of Earth\'s oceans"', 256, 225);
  c.fillText('11°22′N 142°35′E', 256, 262);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}

// --------------------------------------------------------------------- manager
export class Props {
  constructor(scene) {
    this.scene = scene;
    this.built = new Map();
    this.loading = new Set();
    this.colliders = [];
    this.tick = [];
    this.buildRadius = 420;
  }
  update(t, st) {
    const p = st.subPos;
    for (const poi of POIS) {
      const d = Math.hypot(poi.x - p.x, poi.y - p.y, poi.z - p.z);
      if (d < this.buildRadius && !this.built.has(poi.id) && !this.loading.has(poi.id)) this._build(poi);
      const g = this.built.get(poi.id);
      if (g) g.visible = d < this.buildRadius * 1.4;
    }
    for (const f of this.tick) f(t, st);
  }
  async _build(poi) {
    this.loading.add(poi.id);
    const g = new THREE.Group(); g.name = poi.id;
    const cols = [];
    const rnd = mulberry32(poi.id.length * 7919 + Math.floor(poi.x));
    try { await builders[poi.id](poi, g, cols, rnd, this); } catch (e) { console.error('prop build', poi.id, e); }
    g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    this.scene.add(g);
    this.built.set(poi.id, g);
    this.colliders.push(...cols);
    this.loading.delete(poi.id);
  }
  // synchronously preload a POI (used by teleport / debug)
  async preload(id) { const poi = POIS.find((p) => p.id === id); if (poi && !this.built.has(id)) await this._build(poi); }
}

// mothership hull silhouette at the surface above the dive start
export async function buildMothership(scene) {
  const m = await mats();
  const g = new THREE.Group();
  const hull = new THREE.Mesh(shipHull(92, 16, 7, { segs: 50 }), m.antifoul);
  hull.material = m.antifoul;
  hull.rotation.x = Math.PI; // shipHull is deck-up with keel down; flip? keep deck at y=0
  hull.rotation.x = 0;
  g.add(hull);
  const top = new THREE.Mesh(shipHull(92, 16.2, 2.2, { segs: 50 }), m.hullGrey); top.position.y = 0.6; top.scale.y = -1; g.add(top);
  // A-frame and umbilical/lift line hanging down
  const line = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 30, 6), m.black); line.position.set(0, -15, -40); g.add(line);
  // propeller + skeg
  const skeg = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3, 8), m.antifoul); skeg.position.set(0, -7.5, -40); g.add(skeg);
  g.position.set(-10, 0.6, 150);
  g.rotation.y = 0.5;
  scene.add(g);
  return g;
}
