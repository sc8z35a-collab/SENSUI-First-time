// Particulates + marine life with depth-dependent ecology.
//  - Marine snow: camera-relative wrapped volume, streaks with speed, lit by headlights.
//  - Bubbles from the sub (ballast venting, thrusters near surface).
//  - Fish schools (boids-lite on GPU via instanced vertex animation): sardines (shallow),
//    lanternfish (mesopelagic, photophores), grenadiers (abyssal, near bottom), snailfish (hadal).
//  - Jellyfish (Atolla / Periphylla) with pulsing bells + bioluminescent flashes,
//    siphonophore chains, anglerfish lure, giant squid (rare).
import * as THREE from 'three';
import { applyWater } from '../render/water.js';
import { groundHeight } from './density.js';

const rnd = Math.random;

// ------------------------------------------------------------------ marine snow
export class MarineSnow {
  constructor(scene, count = 9000, box = 26) {
    this.box = box;
    const g = new THREE.BufferGeometry();
    const p = new Float32Array(count * 3), s = new Float32Array(count);
    for (let i = 0; i < count; i++) { p[i * 3] = rnd() * box; p[i * 3 + 1] = rnd() * box; p[i * 3 + 2] = rnd() * box; s[i] = rnd(); }
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    g.setAttribute('seed', new THREE.BufferAttribute(s, 1));
    this.mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: {
        uCam: { value: new THREE.Vector3() }, uBox: { value: box }, uT: { value: 0 }, uVel: { value: new THREE.Vector3() },
        uSpotPos: { value: [new THREE.Vector3(), new THREE.Vector3()] }, uSpotDir: { value: [new THREE.Vector3(), new THREE.Vector3()] }, uSpotI: { value: [0, 0] }, uSpotCos: { value: 0.8 },
        uAmb: { value: new THREE.Vector3() }, uPR: { value: 1 }, uDensity: { value: 1 }, uSilt: { value: 0 },
      },
      vertexShader: /* glsl */`
        attribute float seed; uniform vec3 uCam; uniform float uBox; uniform float uT; uniform vec3 uVel; uniform float uPR; uniform float uDensity;
        uniform vec3 uSpotPos[2]; uniform vec3 uSpotDir[2]; uniform float uSpotI[2]; uniform float uSpotCos; uniform vec3 uAmb; uniform float uSilt;
        varying float vA; varying vec3 vCol;
        void main(){
          vec3 p = position;
          // slow sinking + drift + gentle turbulence
          p.y -= uT * (0.02 + seed * 0.04);
          p.x += sin(uT * 0.3 + seed * 40.0) * 0.3; p.z += cos(uT * 0.25 + seed * 31.0) * 0.3;
          vec3 wp = uCam + mod(p - uCam + uBox * 0.5, uBox) - uBox * 0.5;
          float keep = step(seed, uDensity);
          vec4 mv = viewMatrix * vec4(wp, 1.0);
          float d = -mv.z;
          // lighting from headlights (cone) and ambient
          vec3 L = vec3(0.0);
          for (int i = 0; i < 2; i++) {
            vec3 v = wp - uSpotPos[i]; float l = length(v);
            float c = dot(v / l, uSpotDir[i]);
            L += vec3(1.0, 0.96, 0.9) * uSpotI[i] * smoothstep(uSpotCos, uSpotCos + 0.12, c) / (1.0 + l * l * 0.02) * exp(-l * 0.03);
          }
          L += uAmb * 0.5;
          // forward scatter bias: particles near the view axis glint more
          vCol = L * (0.5 + seed) * vec3(0.85, 0.93, 1.0);
          vA = keep * smoothstep(uBox * 0.5, uBox * 0.3, length(wp - uCam)) * smoothstep(0.25, 1.2, d) * (1.0 + uSilt * 3.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (0.6 + seed * seed * 3.0 + uSilt * 2.0) * uPR * 42.0 / d;
        }`,
      fragmentShader: /* glsl */`varying float vA; varying vec3 vCol;
        void main(){ vec2 c = gl_PointCoord - 0.5; float r = dot(c, c); if (r > 0.25) discard; float a = (1.0 - r * 4.0); gl_FragColor = vec4(vCol * a * vA * 0.6, 1.0); }`,
    });
    this.points = new THREE.Points(g, this.mat);
    this.points.frustumCulled = false;
    scene.add(this.points);
  }
  update(t, camPos, spots, amb, depth, silt) {
    const u = this.mat.uniforms;
    u.uCam.value.copy(camPos); u.uT.value = t;
    for (let i = 0; i < 2; i++) {
      const s = spots[i];
      if (!s || !s.visible) { u.uSpotI.value[i] = 0; continue; }
      s.getWorldPosition(u.uSpotPos.value[i]);
      const tp = new THREE.Vector3(); s.target.getWorldPosition(tp);
      u.uSpotDir.value[i].copy(tp).sub(u.uSpotPos.value[i]).normalize();
      u.uSpotI.value[i] = s.intensity * 0.0012;
      u.uSpotCos.value = Math.cos(s.angle);
    }
    u.uAmb.value.set(amb.r, amb.g, amb.b);
    // snow density peaks in the mesopelagic, never zero
    u.uDensity.value = THREE.MathUtils.clamp(0.25 + Math.min(1, depth / 250) * 0.75, 0, 1);
    u.uSilt.value = silt;
  }
}

// ------------------------------------------------------------------ bubbles (world-space pool)
export class Bubbles {
  constructor(scene, n = 1200) {
    this.n = n; this.i = 0;
    const g = new THREE.BufferGeometry();
    this.pos = new Float32Array(n * 3); this.life = new Float32Array(n); this.size = new Float32Array(n);
    this.vel = new Float32Array(n * 3);
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    g.setAttribute('life', new THREE.BufferAttribute(this.life, 1));
    g.setAttribute('size', new THREE.BufferAttribute(this.size, 1));
    this.mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uPR: { value: 1 }, uAmb: { value: new THREE.Vector3(1, 1, 1) }, uLit: { value: 1 } },
      vertexShader: `attribute float life; attribute float size; uniform float uPR; varying float vL;
        void main(){ vL = life; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = life > 0.0 ? size * uPR * 90.0 / -mv.z : 0.0; }`,
      fragmentShader: `varying float vL; uniform vec3 uAmb; uniform float uLit;
        void main(){ vec2 c = gl_PointCoord - 0.5; float r = length(c); if (r > 0.5) discard;
          float rim = smoothstep(0.32, 0.48, r) * smoothstep(0.5, 0.46, r);
          float hl = smoothstep(0.12, 0.0, length(c - vec2(-0.15, -0.15)));
          vec3 col = (uAmb * 0.6 + uLit) * (rim * 0.8 + hl * 2.0);
          gl_FragColor = vec4(col, (rim * 0.7 + hl) * min(1.0, vL)); }`,
    });
    this.points = new THREE.Points(g, this.mat); this.points.frustumCulled = false;
    scene.add(this.points);
  }
  emit(p, v, size = 0.05, life = 6) {
    const i = this.i; this.i = (this.i + 1) % this.n;
    this.pos[i * 3] = p.x; this.pos[i * 3 + 1] = p.y; this.pos[i * 3 + 2] = p.z;
    this.vel[i * 3] = v.x; this.vel[i * 3 + 1] = v.y; this.vel[i * 3 + 2] = v.z;
    this.life[i] = life; this.size[i] = size;
  }
  update(dt, amb, lit) {
    for (let i = 0; i < this.n; i++) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      const j = i * 3;
      // rise to terminal velocity ~0.25 m/s for small bubbles, wobble
      this.vel[j + 1] += (0.25 + this.size[i] * 3 - this.vel[j + 1]) * dt * 2;
      this.vel[j] *= 1 - dt * 1.5; this.vel[j + 2] *= 1 - dt * 1.5;
      this.pos[j] += (this.vel[j] + Math.sin(this.life[i] * 9 + i) * 0.08) * dt;
      this.pos[j + 1] += this.vel[j + 1] * dt;
      this.pos[j + 2] += (this.vel[j + 2] + Math.cos(this.life[i] * 8 + i) * 0.08) * dt;
      if (this.pos[j + 1] > 0) this.life[i] = 0;
    }
    const g = this.points.geometry; g.attributes.position.needsUpdate = true; g.attributes.life.needsUpdate = true; g.attributes.size.needsUpdate = true;
    this.mat.uniforms.uAmb.value.set(amb.r, amb.g, amb.b); this.mat.uniforms.uLit.value = lit;
  }
}

// ------------------------------------------------------------------ fish geometry (procedural, vertex-animated)
function fishGeometry(len = 1, h = 0.25, w = 0.1, tailK = 0.35) {
  // body: lathe-like ellipsoid along -z (head at -z), tail fin at +z
  const g = new THREE.SphereGeometry(0.5, 14, 8);
  g.scale(w * 2, h * 2, len);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const z = p.getZ(i) / len; // -0.5 head .. 0.5 tail
    const taper = z > 0 ? 1 - z * 1.6 : 1 + z * 0.6;
    p.setX(i, p.getX(i) * Math.max(0.08, taper)); p.setY(i, p.getY(i) * Math.max(0.1, taper));
  }
  const tail = new THREE.BufferGeometry();
  const tv = new Float32Array([0, 0, 0.42 * len, 0, h * 0.9, 0.5 * len + tailK * len * 0.6, 0, -h * 0.9, 0.5 * len + tailK * len * 0.6]);
  tail.setAttribute('position', new THREE.BufferAttribute(tv, 3));
  tail.setAttribute('normal', new THREE.BufferAttribute(new Float32Array([1, 0, 0, 1, 0, 0, 1, 0, 0]), 3));
  tail.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 1, 1, 1, 0]), 2));
  const a = g.toNonIndexed();
  const merged = new THREE.BufferGeometry();
  const pa = new Float32Array(a.attributes.position.array.length + 9);
  pa.set(a.attributes.position.array); pa.set(tv, a.attributes.position.array.length);
  const na = new Float32Array(pa.length);
  na.set(a.attributes.normal.array); na.set([1, 0, 0, 1, 0, 0, 1, 0, 0], a.attributes.normal.array.length);
  merged.setAttribute('position', new THREE.BufferAttribute(pa, 3));
  merged.setAttribute('normal', new THREE.BufferAttribute(na, 3));
  merged.userData.len = len;
  return merged;
}

// fish material: swimming undulation in the vertex shader, instanced per-fish phase
function fishMaterial(color, { metal = 0.6, rough = 0.35, photophores = 0, eyeGlow = 0, lure = 0 } = {}) {
  const m = new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough, side: THREE.DoubleSide });
  m.userData.uT = { value: 0 };
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uT = m.userData.uT;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', `#include <common>
      uniform float uT; varying float vZ; varying vec3 vLP;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        float ph = 0.0;
        #ifdef USE_INSTANCING
          ph = instanceMatrix[3].x * 0.37 + instanceMatrix[3].z * 0.23;
        #endif
        float zz = position.z;
        float sw = sin(uT * 9.0 + ph - zz * 5.0) * 0.12 * smoothstep(-0.3, 0.6, zz);
        transformed.x += sw * (0.5 + zz);
        vZ = zz; vLP = position;`);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
      varying float vZ; varying vec3 vLP; uniform float uT;`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        ${photophores ? `float ph = step(0.85, fract(vZ * 9.0 + 0.5)) * step(vLP.y, -0.02) * smoothstep(0.02, -0.05, abs(vLP.y + 0.04));
          totalEmissiveRadiance += vec3(0.3, 0.7, 1.0) * ph * ${photophores.toFixed(2)};` : ''}
        ${eyeGlow ? `totalEmissiveRadiance += vec3(0.5, 0.9, 1.0) * smoothstep(0.06, 0.0, length(vec2(abs(vLP.x) - 0.03, vLP.y - 0.02))) * step(vLP.z, -0.35) * ${eyeGlow.toFixed(2)};` : ''}`);
  };
  m.customProgramCacheKey = () => `fish${photophores}${eyeGlow}${lure}`;
  return applyWater(m);
}

// ------------------------------------------------------------------ schools
class School {
  constructor(scene, opt) {
    Object.assign(this, opt);
    this.geo = fishGeometry(opt.len, opt.len * opt.hK, opt.len * opt.wK);
    this.mat = fishMaterial(opt.color, opt.mat);
    this.mesh = new THREE.InstancedMesh(this.geo, this.mat, opt.n);
    this.mesh.frustumCulled = false;
    this.mesh.castShadow = false;
    scene.add(this.mesh);
    this.center = new THREE.Vector3();
    this.vel = new THREE.Vector3(1, 0, 0);
    this.fish = [];
    for (let i = 0; i < opt.n; i++) this.fish.push({ o: new THREE.Vector3((rnd() - 0.5), (rnd() - 0.5) * 0.4, (rnd() - 0.5)).multiplyScalar(opt.spread), p: new THREE.Vector3(), v: new THREE.Vector3(), ph: rnd() * 10, s: 0.7 + rnd() * 0.6 });
    this.active = false;
    this.flee = 0;
    this.mesh.visible = false;
    this.m4 = new THREE.Matrix4(); this.q = new THREE.Quaternion();
  }
  spawn(near) {
    const a = rnd() * Math.PI * 2;
    const r = 25 + rnd() * 30;
    this.center.set(near.x + Math.cos(a) * r, near.y + (rnd() - 0.5) * 12, near.z + Math.sin(a) * r);
    if (this.bottom) { const gy = groundHeight(this.center.x, this.center.z, this.center.y + 30, this.center.y - 200); this.center.y = Math.max(this.center.y, gy + 2); if (this.center.y > near.y + 20) this.center.y = near.y; }
    this.center.y = Math.min(this.center.y, -3);
    this.vel.set(Math.cos(a + 1.6), 0, Math.sin(a + 1.6)).multiplyScalar(this.speed);
    for (const f of this.fish) { f.p.copy(this.center).add(f.o); f.v.copy(this.vel); }
    this.active = true; this.mesh.visible = true; this.age = 0;
  }
  update(dt, t, subPos, subVel, lightOn) {
    if (!this.active) return;
    this.age += dt;
    const toSub = this.center.clone().sub(subPos);
    const d = toSub.length();
    // wander
    const wander = new THREE.Vector3(Math.sin(t * 0.13 + this.seed) , Math.sin(t * 0.07 + this.seed * 2) * 0.2, Math.cos(t * 0.11 + this.seed));
    this.vel.addScaledVector(wander, dt * 0.3);
    // flee from the sub (and more if lights are on for light-shy species)
    const scare = this.shy * (lightOn ? 1.6 : 0.6);
    if (d < 18 * scare) { this.vel.addScaledVector(toSub.normalize(), dt * 2.2); this.flee = 1; } else this.flee = Math.max(0, this.flee - dt);
    // curious species approach
    if (this.curious && d > 12 && d < 50) this.vel.addScaledVector(toSub.clone().normalize(), -dt * 0.4);
    // keep near-ish the sub so the player sees them, keep depth band
    if (d > 70) this.vel.addScaledVector(toSub.normalize(), -dt * 0.6);
    const sp = this.speed * (1 + this.flee * 1.8);
    this.vel.y *= 0.96;
    if (this.vel.length() > sp) this.vel.setLength(sp);
    this.center.addScaledVector(this.vel, dt);
    if (this.bottom && ((t * 10) | 0) % 10 === 0) { const gy = groundHeight(this.center.x, this.center.z, this.center.y + 20, this.center.y - 60); if (this.center.y < gy + 1.5) this.center.y = gy + 1.5; if (this.center.y > gy + 6) this.center.y -= dt; }
    if (this.center.y > -2) this.center.y = -2;
    // individuals follow slots with lag
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < this.fish.length; i++) {
      const f = this.fish[i];
      const slot = this.center.clone().add(f.o).add(new THREE.Vector3(Math.sin(t * 0.8 + f.ph) * 0.4, Math.sin(t * 0.6 + f.ph * 1.3) * 0.2, Math.cos(t * 0.7 + f.ph)).multiplyScalar(this.spread * 0.12));
      const want = slot.sub(f.p).multiplyScalar(1.2).add(this.vel);
      f.v.lerp(want, Math.min(1, dt * 2.5));
      f.p.addScaledVector(f.v, dt);
      const dir = f.v.lengthSq() > 1e-4 ? f.v.clone().normalize() : new THREE.Vector3(0, 0, -1);
      const m = new THREE.Matrix4().lookAt(new THREE.Vector3(), dir.clone().negate(), up);
      this.q.setFromRotationMatrix(m);
      this.m4.compose(f.p, this.q, new THREE.Vector3(f.s, f.s, f.s));
      this.mesh.setMatrixAt(i, this.m4);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    this.mat.userData.uT.value = t * (1 + this.flee);
    // despawn if far away
    if (d > 160) { this.active = false; this.mesh.visible = false; }
  }
}

// ------------------------------------------------------------------ jellyfish (bell + tentacles, instanced)
function jellyMaterial(col, glow) {
  const m = new THREE.MeshPhysicalMaterial({ color: col, transparent: true, opacity: 0.55, roughness: 0.15, transmission: 0, side: THREE.DoubleSide, depthWrite: false, emissive: new THREE.Color(glow), emissiveIntensity: 0.0 });
  m.userData.uT = { value: 0 }; m.userData.uFlash = { value: 0 };
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uT = m.userData.uT; sh.uniforms.uFlash = m.userData.uFlash;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nuniform float uT; varying vec3 vLP;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        float ph = 0.0;
        #ifdef USE_INSTANCING
          ph = instanceMatrix[3].x * 0.5 + instanceMatrix[3].z * 0.3;
        #endif
        float pulse = sin(uT * 1.7 + ph);
        float bell = smoothstep(-0.1, 0.5, position.y);
        transformed.xz *= 1.0 + pulse * 0.16 * bell - pulse * 0.08 * (1.0 - bell);
        transformed.y += pulse * 0.05 * bell;
        // tentacles sway
        float tt = smoothstep(0.0, -2.0, position.y);
        transformed.x += sin(uT * 1.1 + position.y * 2.5 + ph) * 0.18 * tt;
        transformed.z += cos(uT * 0.9 + position.y * 2.1 + ph) * 0.18 * tt;
        vLP = position;`);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform float uT; uniform float uFlash; varying vec3 vLP;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        float ring = smoothstep(0.08, 0.0, abs(length(vLP.xz) - 0.42)) * step(0.0, vLP.y);
        float wave = 0.5 + 0.5 * sin(atan(vLP.z, vLP.x) * 8.0 - uT * 6.0);
        totalEmissiveRadiance += emissive * (ring * (0.25 + uFlash * 6.0 * wave) + smoothstep(0.1, 0.5, vLP.y) * 0.08);`);
  };
  m.customProgramCacheKey = () => 'jelly';
  return applyWater(m);
}
function jellyGeometry() {
  const pts = [];
  for (let i = 0; i <= 16; i++) { const t = i / 16; pts.push(new THREE.Vector2(Math.sin(t * Math.PI * 0.55) * 0.5, Math.cos(t * Math.PI * 0.55) * 0.42)); }
  const bell = new THREE.LatheGeometry(pts, 28);
  const parts = [bell.toNonIndexed()];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const tg = new THREE.CylinderGeometry(0.008, 0.004, 2.2, 3, 10, true); tg.translate(Math.cos(a) * 0.4, -1.05, Math.sin(a) * 0.4);
    parts.push(tg.toNonIndexed());
  }
  const oral = new THREE.CylinderGeometry(0.06, 0.02, 0.9, 6, 6, true); oral.translate(0, -0.4, 0); parts.push(oral.toNonIndexed());
  const pos = [], nrm = [];
  for (const p of parts) { pos.push(...p.attributes.position.array); nrm.push(...p.attributes.normal.array); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  return g;
}

// ------------------------------------------------------------------ ecology manager
export class Life {
  constructor(scene) {
    this.scene = scene;
    this.schools = [
      new School(scene, { name: 'sardine', n: 160, len: 0.22, hK: 0.22, wK: 0.1, spread: 7, speed: 1.4, shy: 1, color: 0xb8c8d8, mat: { metal: 0.9, rough: 0.25 }, dmin: 0, dmax: 150, seed: 1 }),
      new School(scene, { name: 'jack', n: 40, len: 0.6, hK: 0.3, wK: 0.12, spread: 9, speed: 1.8, shy: 0.7, color: 0x8fa0a8, mat: { metal: 0.8, rough: 0.3 }, dmin: 10, dmax: 250, seed: 2 }),
      new School(scene, { name: 'lanternfish', n: 120, len: 0.1, hK: 0.25, wK: 0.1, spread: 10, speed: 0.6, shy: 1.4, color: 0x2a3036, mat: { metal: 0.5, rough: 0.4, photophores: 5 }, dmin: 250, dmax: 1400, seed: 3 }),
      new School(scene, { name: 'hatchetfish', n: 40, len: 0.08, hK: 0.8, wK: 0.08, spread: 6, speed: 0.4, shy: 1.2, color: 0xc8d0d8, mat: { metal: 1, rough: 0.15, photophores: 4 }, dmin: 300, dmax: 1500, seed: 4 }),
      new School(scene, { name: 'grenadier', n: 6, len: 0.9, hK: 0.18, wK: 0.1, spread: 12, speed: 0.35, shy: 0.3, bottom: true, curious: true, color: 0x6a6a70, mat: { metal: 0.2, rough: 0.6, eyeGlow: 0.5 }, dmin: 1200, dmax: 6500, seed: 5 }),
      new School(scene, { name: 'snailfish', n: 14, len: 0.25, hK: 0.3, wK: 0.16, spread: 5, speed: 0.25, shy: 0.1, bottom: true, curious: true, color: 0xf0d8d8, mat: { metal: 0, rough: 0.35 }, dmin: 6500, dmax: 8300, seed: 6 }),
      new School(scene, { name: 'amphipod', n: 120, len: 0.04, hK: 0.5, wK: 0.3, spread: 4, speed: 0.3, shy: 0.1, bottom: true, color: 0xe8d8c0, mat: { metal: 0, rough: 0.5 }, dmin: 7000, dmax: 11000, seed: 7 }),
      new School(scene, { name: 'squid', n: 18, len: 0.5, hK: 0.18, wK: 0.18, spread: 8, speed: 1.2, shy: 1.2, color: 0x9a4a40, mat: { metal: 0.1, rough: 0.4, photophores: 1.5 }, dmin: 200, dmax: 900, seed: 8 }),
    ];
    // jellyfish
    this.jellyGeo = jellyGeometry();
    this.jellies = [
      { name: 'atolla', mat: jellyMaterial(0x8a1020, 0xff2a3a), dmin: 500, dmax: 4000, n: 10, scale: 0.35 },
      { name: 'periphylla', mat: jellyMaterial(0x6a1830, 0x60a0ff), dmin: 700, dmax: 6000, n: 10, scale: 0.6 },
      { name: 'moon', mat: jellyMaterial(0xd8e8f0, 0x88ccff), dmin: 0, dmax: 300, n: 14, scale: 0.8 },
    ];
    for (const j of this.jellies) {
      j.mesh = new THREE.InstancedMesh(this.jellyGeo, j.mat, j.n); j.mesh.frustumCulled = false; j.mesh.visible = false; j.mesh.renderOrder = 3;
      j.items = Array.from({ length: j.n }, () => ({ p: new THREE.Vector3(), v: new THREE.Vector3(), rot: rnd() * 6, s: j.scale * (0.6 + rnd() * 0.8) }));
      j.flash = 0;
      scene.add(j.mesh);
    }
    // siphonophore (long glowing chain)
    const segs = 90;
    const sg = new THREE.SphereGeometry(0.06, 8, 6);
    this.siph = new THREE.InstancedMesh(sg, applyWater(new THREE.MeshStandardMaterial({ color: 0xffc8a0, transparent: true, opacity: 0.6, emissive: 0xff8844, emissiveIntensity: 0.5 })), segs);
    this.siph.frustumCulled = false; this.siph.visible = false; scene.add(this.siph);
    this.siphState = { active: false, p: new THREE.Vector3(), dir: new THREE.Vector3(1, 0, 0) };
    // anglerfish with a glowing lure
    this.angler = this._makeAngler(); scene.add(this.angler.g);
    // giant squid (rare)
    this.giant = this._makeGiantSquid(); scene.add(this.giant.g);
    this.timer = 0;
    this.sightings = new Set();
    this.onSighting = null;
  }

  _makeAngler() {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.35, 20, 14), applyWater(new THREE.MeshStandardMaterial({ color: 0x151210, roughness: 0.6 })));
    body.scale.set(0.9, 0.85, 1.2); g.add(body);
    const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 8, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5), applyWater(new THREE.MeshStandardMaterial({ color: 0x0d0b0a, roughness: 0.5 })));
    jaw.position.set(0, -0.08, -0.25); jaw.scale.set(1, 0.7, 1); g.add(jaw);
    const teethM = applyWater(new THREE.MeshStandardMaterial({ color: 0xe8e0d0, roughness: 0.3 }));
    for (let i = 0; i < 14; i++) { const t = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.09, 4), teethM); const a = -1.2 + (i / 13) * 2.4; t.position.set(Math.sin(a) * 0.26, -0.03, -0.3 - Math.cos(a) * 0.12); t.rotation.x = Math.PI; g.add(t); }
    const rod = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.28, -0.1), new THREE.Vector3(0, 0.6, -0.35), new THREE.Vector3(0, 0.55, -0.7)]), 12, 0.012, 5), body.material);
    g.add(rod);
    const lureM = new THREE.MeshBasicMaterial({ color: 0x9fe8ff, toneMapped: false });
    const lure = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 8), lureM); lure.position.set(0, 0.52, -0.72); g.add(lure);
    const light = new THREE.PointLight(0x7fe0ff, 0.6, 3, 2); light.position.copy(lure.position); g.add(light);
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.4, 4), body.material); tail.rotation.x = -Math.PI / 2; tail.position.z = 0.5; tail.scale.x = 0.2; g.add(tail);
    g.visible = false;
    return { g, lureM, light, active: false, p: new THREE.Vector3(), yaw: 0 };
  }
  _makeGiantSquid() {
    const g = new THREE.Group();
    const skin = applyWater(new THREE.MeshStandardMaterial({ color: 0x8a2a20, roughness: 0.45, metalness: 0.1 }));
    const mantle = new THREE.Mesh(new THREE.CapsuleGeometry(0.7, 4, 8, 20), skin); mantle.rotation.x = Math.PI / 2; mantle.position.z = 2.5; g.add(mantle);
    const fin = new THREE.Mesh(new THREE.ConeGeometry(1.4, 1.4, 4), skin); fin.scale.y = 0.08; fin.position.z = 4.8; fin.rotation.x = Math.PI / 2; g.add(fin);
    const eyeM = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.05, metalness: 0.5 });
    for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), eyeM); e.position.set(s * 0.52, 0.1, 0.1); g.add(e); }
    const arms = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const L = i < 2 ? 9 : 4;
      const pts = []; for (let k = 0; k <= 8; k++) pts.push(new THREE.Vector3(Math.cos(a) * 0.3, Math.sin(a) * 0.3, -k / 8 * L));
      const curve = new THREE.CatmullRomCurve3(pts);
      const arm = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.09, 6), skin);
      arm.userData = { a, L, curve, pts };
      g.add(arm); arms.push(arm);
    }
    g.visible = false;
    return { g, arms, active: false, p: new THREE.Vector3(), t: 0 };
  }

  update(dt, t, subPos, subVel, lightOn, depth, st) {
    this.timer -= dt;
    // spawn schools appropriate for the depth
    if (this.timer <= 0) {
      this.timer = 6 + rnd() * 6;
      const cands = this.schools.filter((s) => !s.active && depth >= s.dmin && depth <= s.dmax);
      if (cands.length && this.schools.filter((s) => s.active).length < 4) {
        const s = cands[(rnd() * cands.length) | 0];
        s.spawn(subPos);
        this._sight(s.name);
      }
      // jellies
      for (const j of this.jellies) {
        if (!j.mesh.visible && depth >= j.dmin && depth <= j.dmax && rnd() < 0.4) {
          j.mesh.visible = true;
          for (const it of j.items) { it.p.set(subPos.x + (rnd() - 0.5) * 60, subPos.y + (rnd() - 0.5) * 30, subPos.z + (rnd() - 0.5) * 60); it.p.y = Math.min(it.p.y, -3); }
          this._sight(j.name);
        }
      }
      if (!this.siphState.active && depth > 600 && depth < 3000 && rnd() < 0.15) { this.siphState.active = true; this.siphState.p.set(subPos.x + 25 * (rnd() - 0.5), subPos.y - 5 + rnd() * 10, subPos.z + 25 * (rnd() - 0.5)); this.siph.visible = true; this._sight('siphonophore'); }
      if (!this.angler.active && depth > 1000 && depth < 4000 && rnd() < 0.2) { this.angler.active = true; this.angler.g.visible = true; const f = new THREE.Vector3(0, 0, -1).applyQuaternion(st.subQuat); this.angler.p.copy(subPos).addScaledVector(f, 14).add(new THREE.Vector3((rnd() - 0.5) * 6, -1.5 + rnd() * 3, (rnd() - 0.5) * 6)); this._sight('anglerfish'); }
      if (!this.giant.active && depth > 400 && depth < 1200 && rnd() < 0.05) { this.giant.active = true; this.giant.g.visible = true; this.giant.t = 0; const f = new THREE.Vector3(0, 0, -1).applyQuaternion(st.subQuat); this.giant.p.copy(subPos).addScaledVector(f, 30).add(new THREE.Vector3(-20, -3, 0)); this.giant.dir = new THREE.Vector3(1, 0.05, 0.2).normalize(); this._sight('giantsquid'); }
    }
    for (const s of this.schools) s.update(dt, t, subPos, subVel, lightOn);
    // jellies drift
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3();
    for (const j of this.jellies) {
      if (!j.mesh.visible) continue;
      j.mat.userData.uT.value = t;
      // disturbed by sub -> bioluminescent flash
      let far = 0;
      j.items.forEach((it, i) => {
        const d = it.p.distanceTo(subPos);
        if (d < 6 && j.flash < 0.1) j.flash = 1;
        it.p.y += Math.max(0, Math.sin(t * 1.7 + i)) * dt * 0.12 - dt * 0.02;
        it.p.x += Math.sin(t * 0.1 + i) * dt * 0.05;
        if (d > 90) far++;
        q.setFromEuler(new THREE.Euler(Math.sin(t * 0.2 + i) * 0.2, it.rot, Math.cos(t * 0.17 + i) * 0.2));
        sc.setScalar(it.s);
        m4.compose(it.p, q, sc); j.mesh.setMatrixAt(i, m4);
      });
      j.mesh.instanceMatrix.needsUpdate = true;
      j.flash = Math.max(0, j.flash - dt * 0.35);
      j.mat.userData.uFlash.value = j.flash * (0.6 + 0.4 * Math.sin(t * 20));
      j.mat.emissiveIntensity = 1;
      if (far === j.items.length || depth < j.dmin - 50 || depth > j.dmax + 50) j.mesh.visible = false;
    }
    // siphonophore chain
    if (this.siphState.active) {
      const S = this.siphState;
      S.p.addScaledVector(S.dir, dt * 0.05);
      for (let i = 0; i < this.siph.count; i++) {
        const p = S.p.clone().add(new THREE.Vector3(i * 0.12, Math.sin(i * 0.15 + t * 0.4) * 0.6, Math.cos(i * 0.1 + t * 0.3) * 0.8));
        const s = i < 5 ? 1.8 : 0.6 + Math.sin(i * 1.7) * 0.3;
        m4.compose(p, q.identity(), sc.setScalar(s)); this.siph.setMatrixAt(i, m4);
      }
      this.siph.instanceMatrix.needsUpdate = true;
      this.siph.material.emissiveIntensity = 0.3 + (subPos.distanceTo(S.p) < 8 ? 2 * (0.5 + 0.5 * Math.sin(t * 12)) : 0);
      if (subPos.distanceTo(S.p) > 120) { S.active = false; this.siph.visible = false; }
    }
    // anglerfish hovers & slowly turns toward the sub, lure flickers
    if (this.angler.active) {
      const A = this.angler;
      const to = subPos.clone().sub(A.p);
      A.yaw += (Math.atan2(-to.x, -to.z) - A.yaw) * dt * 0.3;
      A.g.position.copy(A.p).add(new THREE.Vector3(0, Math.sin(t * 0.8) * 0.1, 0));
      A.g.rotation.set(Math.sin(t * 0.5) * 0.05, A.yaw, 0);
      const fl = 0.6 + 0.4 * Math.sin(t * 2.3) * Math.sin(t * 5.1);
      A.lureM.color.setRGB(0.6, 0.9, 1).multiplyScalar(4 + fl * 6); A.light.intensity = 0.4 + fl * 0.5;
      if (to.length() < 4) A.p.addScaledVector(to.normalize(), -dt * 2);
      if (to.length() > 60) { A.active = false; A.g.visible = false; }
    }
    if (this.giant.active) {
      const G = this.giant;
      G.t += dt;
      G.p.addScaledVector(G.dir, dt * 1.1);
      G.g.position.copy(G.p);
      G.g.lookAt(G.p.clone().sub(G.dir));
      G.arms.forEach((arm, i) => { arm.rotation.z = Math.sin(t * 0.9 + i) * 0.08; arm.rotation.x = Math.sin(t * 0.7 + i * 1.3) * 0.12; });
      if (G.t > 60 || G.p.distanceTo(subPos) > 150) { G.active = false; G.g.visible = false; }
    }
  }
  _sight(name) { if (!this.sightings.has(name)) { this.sightings.add(name); this.onSighting?.(name); } }
}

export const SPECIES = {
  sardine: ['マイワシの群れ', 'Sardinops melanostictus'], jack: ['カンパチ', 'Seriola dumerili'],
  lanternfish: ['ハダカイワシ', 'Myctophidae — 発光器で腹側を照らしカウンターイルミネーション'], hatchetfish: ['ムネエソ', 'Argyropelecus — 銀色の鏡のような体'],
  grenadier: ['ソコダラ', 'Coryphaenoides — 深海底の掃除屋'], snailfish: ['マリアナスネイルフィッシュ', 'Pseudoliparis swirei — 最深部の魚類 (8,178 m記録)'],
  amphipod: ['カイコウオオソコエビ', 'Hirondellea gigas — 超深海の端脚類'], squid: ['ホタルイカモドキ類', 'Enoploteuthidae'],
  atolla: ['ムラサキカムリクラゲ', 'Atolla wyvillei — 「警報」の発光'], periphylla: ['クロカムリクラゲ', 'Periphylla periphylla'],
  moon: ['ミズクラゲ', 'Aurelia aurita'], siphonophore: ['管クラゲ (群体)', 'Siphonophorae — 群体生物'],
  anglerfish: ['チョウチンアンコウ', 'Melanocetus johnsonii — 誘引突起の発光'], giantsquid: ['ダイオウイカ', 'Architeuthis dux — 伝説の巨大生物'],
};
