// Exterior of DSV-11 "WADATSUMI" as seen from inside the pilot sphere plus its lighting.
// Only parts that are visible through the viewports are modelled in detail: bow frame,
// light booms, manipulator arm with animated joints, sample basket, skids, forward sensor
// pod, thruster ducts (seen from side ports), and the syntactic-foam flotation block edges.
// Lights: 2 narrow main LED arrays (shadow-casting) + 2 wide flood arrays + 2 aft work lamps.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { applyWater } from '../render/water.js';
import { pbrMaterial } from '../render/textures.js';

const W = (m, c = false) => applyWater(m, { caustics: c });

export class Exterior {
  constructor(scene) {
    this.scene = scene;
    this.root = new THREE.Group();
    this.root.name = 'sub-exterior';
    scene.add(this.root);
    this.lamps = [];
    this.spots = [];
    this.arm = null;
    this.armT = 0;
    this.armPose = 0; // 0 stowed, 1 deployed
    this.armTarget = 0;
  }

  async build() {
    const R = this.root;
    const [paint, hull, brushed] = await Promise.all([
      pbrMaterial('paint', { repeat: 2, metal: true, ao: true, color: 0xf0f0ec }),
      pbrMaterial('hull', { repeat: 2, metal: true, color: 0x7d858c }),
      pbrMaterial('brushed', { repeat: 2, metal: true, color: 0xa9aeb2 }),
    ]);
    const foam = W(paint.clone(), true); foam.color.set(0xf3f1ea); foam.roughness = 0.9;
    const foamOrange = W(paint.clone(), true); foamOrange.color.set(0xff6a12);
    const frame = W(hull.clone(), true); frame.color.set(0x3b4046); frame.metalness = 0.8;
    const ti = W(brushed.clone(), true); ti.color.set(0xa8a49a);
    const black = W(new THREE.MeshStandardMaterial({ color: 0x0c0d0f, roughness: 0.55, metalness: 0.3 }));
    const yellow = W(new THREE.MeshStandardMaterial({ color: 0xf2b400, roughness: 0.5, metalness: 0.1 }), true);
    const anodised = W(new THREE.MeshStandardMaterial({ color: 0x1b2a3a, roughness: 0.35, metalness: 0.9 }));
    this.mats = { foam, frame, ti, black };

    // ---------------------------------------------------------------- bow frame + skids
    const tube = (a, b, r, m = frame) => {
      const d = new THREE.Vector3().subVectors(b, a); const L = d.length();
      const c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 16), m);
      c.position.copy(a).addScaledVector(d, 0.5); c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
      R.add(c); return c;
    };
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    // lower skids (long rails), with forward upturn
    for (const s of [-1, 1]) {
      const pts = [V(s * 1.05, -1.78, 3.6), V(s * 1.05, -1.8, 0), V(s * 1.05, -1.78, -2.6), V(s * 1.0, -1.6, -3.5), V(s * 0.95, -1.25, -3.9)];
      const skid = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.07, 12), frame); R.add(skid);
      // uprights
      for (const z of [-2.6, -0.6, 1.6]) tube(V(s * 1.05, -1.78, z), V(s * 1.15, -0.6, z), 0.05);
    }
    // bow crash bar & cross members
    tube(V(-0.95, -1.25, -3.9), V(0.95, -1.25, -3.9), 0.06);
    tube(V(-1.0, -1.6, -3.5), V(1.0, -1.6, -3.5), 0.05);
    tube(V(-1.15, -0.6, -2.6), V(1.15, -0.6, -2.6), 0.05);
    // diagonal braces
    for (const s of [-1, 1]) { tube(V(s * 1.0, -1.6, -3.5), V(s * 1.15, -0.6, -2.6), 0.04); tube(V(s * 0.95, -1.25, -3.9), V(s * 0.6, -1.25, -3.2), 0.04); }

    // ---------------------------------------------------------------- flotation block (edges seen at viewport periphery)
    const foamBlock = new THREE.Mesh(new RoundedBoxGeometry(3.0, 1.6, 5.2, 6, 0.35), foam);
    foamBlock.position.set(0, 1.25, 0.9); R.add(foamBlock);
    // foam cheeks either side of the sphere (seen from side ports)
    for (const s of [-1, 1]) {
      const cheek = new THREE.Mesh(new RoundedBoxGeometry(0.7, 1.9, 2.4, 5, 0.25), foam);
      cheek.position.set(s * 1.55, -0.1, -1.7); R.add(cheek);
      const stripe = new THREE.Mesh(new RoundedBoxGeometry(0.72, 0.18, 2.42, 3, 0.06), foamOrange);
      stripe.position.set(s * 1.55, 0.55, -1.7); R.add(stripe);
    }
    // bow fairing above the sphere
    const nose = new THREE.Mesh(new THREE.SphereGeometry(1.4, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.42), foam);
    nose.scale.set(1.05, 0.55, 1.1); nose.position.set(0, 0.95, -2.3); R.add(nose);
    // pressure-hull sphere outer skin (only the ring around viewports can be seen; the rest is occluded)
    const sphereSkin = new THREE.Mesh(new THREE.SphereGeometry(1.14, 64, 48), ti);
    sphereSkin.position.set(0, 0.05, -2.3); R.add(sphereSkin);
    this.sphereSkin = sphereSkin;
    sphereSkin.material = sphereSkin.material.clone();
    // punch the viewport bores through the outer skin as well
    sphereSkin.material.onBeforeCompile = ((prev) => (sh, r) => {
      prev?.(sh, r);
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vSkinP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvSkinP = position;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vSkinP;').replace('void main() {', `void main() {
        vec3 ld = normalize(vSkinP);
        if (dot(ld, normalize(vec3(0.0, -0.24, -1.0))) > cos(0.47)) discard;
        if (dot(ld, normalize(vec3(-0.82, -0.28, -0.5))) > cos(0.17)) discard;
        if (dot(ld, normalize(vec3(0.82, -0.28, -0.5))) > cos(0.17)) discard;
        if (dot(ld, normalize(vec3(0.0, -0.93, -0.36))) > cos(0.14)) discard;`);
    })(sphereSkin.material.onBeforeCompile);
    sphereSkin.material.customProgramCacheKey = () => 'skin-vp';
    sphereSkin.material.side = THREE.BackSide; // seen from inside the bores only; avoids z-fighting with interior
    sphereSkin.visible = false; // interior shell already occludes; bores rendered by interior

    // ---------------------------------------------------------------- forward sensor pod (DVL / OAS sonar / cameras)
    const pod = new THREE.Group(); pod.position.set(0, -1.2, -3.55); R.add(pod);
    const podBody = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.5, 24), anodised); podBody.rotation.z = Math.PI / 2; pod.add(podBody);
    const sonarHead = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), yellow); sonarHead.rotation.x = -Math.PI / 2; sonarHead.position.set(0, 0.2, 0); pod.add(sonarHead);
    this.sonarHead = sonarHead;
    for (const s of [-1, 1]) {
      const cam = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.22, 20), anodised); cam.rotation.x = Math.PI / 2; cam.position.set(s * 0.38, 0.05, -0.05); pod.add(cam);
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.045, 20), new THREE.MeshStandardMaterial({ color: 0x020408, roughness: 0.02, metalness: 1 })); lens.position.set(s * 0.38, 0.05, -0.161); lens.rotation.y = Math.PI; pod.add(lens);
    }
    // laser scalers (green dots at 10 cm spacing — real ROV/HOV practice)
    this.lasers = [];
    for (const s of [-1, 1]) {
      const l = new THREE.SpotLight(0x22ff44, 0, 25, 0.004, 0, 1); l.position.set(s * 0.05 + 0, -1.05, -3.7);
      l.target.position.set(s * 0.05, -3, -25); R.add(l); R.add(l.target); this.lasers.push(l);
    }

    // ---------------------------------------------------------------- sample basket (front, visible through lower viewport)
    const basket = new THREE.Group(); basket.position.set(0, -1.45, -3.1); R.add(basket);
    const bFrame = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.3, 0.6), W(new THREE.MeshStandardMaterial({ color: 0x2a2d31, roughness: 0.6, metalness: 0.7, wireframe: false })));
    bFrame.geometry = new THREE.EdgesGeometry(bFrame.geometry);
    const edges = new THREE.LineSegments(bFrame.geometry, new THREE.LineBasicMaterial({ color: 0x33373c }));
    basket.add(edges);
    const floor = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.02, 0.6), frame); floor.position.y = -0.15; basket.add(floor);
    // sample tubes (push cores) and bio-boxes
    for (let i = 0; i < 6; i++) {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.42, 14), W(new THREE.MeshPhysicalMaterial({ color: 0xd8f0ff, roughness: 0.1, transmission: 0, transparent: true, opacity: 0.55 })));
      c.position.set(-0.52 + i * 0.07, 0.02, 0.18); basket.add(c);
      const h = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.08, 8), i % 2 ? yellow : foamOrange); h.position.set(-0.52 + i * 0.07, 0.27, 0.18); basket.add(h);
    }
    for (const x of [0.2, 0.46]) { const box = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.2, 0.3, 2, 0.02), W(new THREE.MeshStandardMaterial({ color: 0x1a4a8a, roughness: 0.5 }))); box.position.set(x, -0.04, 0.05); basket.add(box); }
    this.basket = basket;
    this.samples = [];

    // ---------------------------------------------------------------- manipulator arm (7-function, starboard)
    const arm = new THREE.Group(); arm.position.set(0.7, -1.05, -3.2); R.add(arm);
    const seg = (L, r, m = ti) => { const g = new THREE.Group(); const c = new THREE.Mesh(new THREE.CapsuleGeometry(r, L, 6, 16), m); c.rotation.x = Math.PI / 2; c.position.z = -L / 2; g.add(c); return g; };
    const shoulder = new THREE.Group(); arm.add(shoulder);
    const sBase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.16, 20), black); shoulder.add(sBase);
    const upper = seg(0.7, 0.065); shoulder.add(upper);
    const elbow = new THREE.Group(); elbow.position.z = -0.7; upper.add(elbow);
    const eJ = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.14, 16), black); eJ.rotation.z = Math.PI / 2; elbow.add(eJ);
    const fore = seg(0.6, 0.055); elbow.add(fore);
    const wrist = new THREE.Group(); wrist.position.z = -0.6; fore.add(wrist);
    const wJ = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.1, 16), anodised); wJ.rotation.x = Math.PI / 2; wrist.add(wJ);
    const jaws = [];
    for (const s of [-1, 1]) { const j = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.16), ti); j.position.set(s * 0.04, 0, -0.1); wrist.add(j); jaws.push(j); }
    // hydraulic hoses
    const hose = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V(0.02, 0.07, 0), V(0.04, 0.1, -0.3), V(0.03, 0.09, -0.65)]), 20, 0.012, 6), black); upper.add(hose);
    this.arm = { root: arm, shoulder, elbow, wrist, jaws, upper, fore };
    this._armPoses = {
      stowed: { sy: 0.25, sx: 0.55, e: 1.9, w: -0.3, grip: 0 },
      deployed: { sy: -0.25, sx: -0.35, e: 0.9, w: 0.5, grip: 1 },
    };

    // ---------------------------------------------------------------- light booms & lamps
    const lampGeo = new THREE.CylinderGeometry(0.09, 0.1, 0.18, 24);
    const lensGeo = new THREE.CircleGeometry(0.085, 24);
    const mkLamp = (pos, target, kind, idx) => {
      const g = new THREE.Group(); g.position.copy(pos); R.add(g);
      const body = new THREE.Mesh(lampGeo, black); body.rotation.x = Math.PI / 2; g.add(body);
      const lensM = new THREE.MeshBasicMaterial({ color: 0x111111, toneMapped: false });
      const lens = new THREE.Mesh(lensGeo, lensM); lens.position.z = -0.091; lens.rotation.y = Math.PI; g.add(lens);
      g.lookAt(new THREE.Vector3().copy(target).applyMatrix4(R.matrixWorld)); // body frame → lookAt fixed later
      g.userData.target = target;
      const narrow = kind === 'main';
      const L = new THREE.SpotLight(narrow ? 0xfff2e4 : 0xf2f6ff, 0, narrow ? 160 : 90, narrow ? 0.34 : 0.72, narrow ? 0.45 : 0.75, 2);
      L.position.copy(pos); L.target.position.copy(target);
      if (narrow) { L.castShadow = true; L.shadow.mapSize.set(2048, 2048); L.shadow.bias = -0.0004; L.shadow.normalBias = 0.05; L.shadow.camera.near = 0.5; L.shadow.camera.far = 160; L.shadow.radius = 3; }
      R.add(L); R.add(L.target);
      const lamp = { g, L, lensM, kind, idx, max: narrow ? 5200 : 2600, flicker: 0, dead: false };
      this.lamps.push(lamp);
      return lamp;
    };
    // booms
    for (const s of [-1, 1]) tube(V(s * 0.6, -0.95, -3.3), V(s * 1.35, -0.95, -3.1), 0.045);
    mkLamp(V(-1.35, -0.85, -3.15), V(-0.35, -3.5, -30), 'main', 0);
    mkLamp(V(1.35, -0.85, -3.15), V(0.35, -3.5, -30), 'main', 1);
    mkLamp(V(-1.0, -1.45, -3.6), V(-3.5, -6, -16), 'flood', 2);
    mkLamp(V(1.0, -1.45, -3.6), V(3.5, -6, -16), 'flood', 3);
    // orient lamp bodies to their targets in body space
    for (const l of this.lamps) { const m = new THREE.Matrix4().lookAt(l.g.position, l.g.userData.target, new THREE.Vector3(0, 1, 0)); l.g.quaternion.setFromRotationMatrix(m); }
    this.spots = this.lamps.map((l) => l.L);

    // strobe / beacon on top (xenon flasher for recovery) + navigation light
    const strobeM = new THREE.MeshBasicMaterial({ color: 0x111111, toneMapped: false });
    const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), strobeM); strobe.position.set(0, 2.15, 1.8); R.add(strobe);
    this.strobeM = strobeM;
    this.strobeL = new THREE.PointLight(0xe8f0ff, 0, 40, 2); this.strobeL.position.copy(strobe.position); R.add(this.strobeL);

    // aft thruster ducts (visible from the side ports at extreme angles)
    for (const s of [-1, 1]) {
      const duct = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.06, 12, 32), black); duct.position.set(s * 1.35, -0.2, 3.3); R.add(duct);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16), ti); hub.rotation.x = Math.PI / 2; hub.position.copy(duct.position); R.add(hub);
    }
    // descent / ascent drop weights under the belly (visible in the down port)
    this.weightMeshes = [];
    const wGeo = new RoundedBoxGeometry(0.34, 0.2, 0.5, 3, 0.03);
    const wMat = W(new THREE.MeshStandardMaterial({ color: 0x4a4540, roughness: 0.6, metalness: 0.8 }));
    [[-0.45, -1.62, -2.2, 'descent'], [0.45, -1.62, -2.2, 'descent'], [-0.45, -1.62, -1.4, 'ascent'], [0.45, -1.62, -1.4, 'ascent']].forEach(([x, y, z, k]) => {
      const m = new THREE.Mesh(wGeo, wMat); m.position.set(x, y, z); m.userData.kind = k; R.add(m); this.weightMeshes.push(m);
    });
    this.dropping = [];

    R.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    // the sphere skin never needs shadows (hidden)
    return this;
  }

  // visual feedback for dropped weights: they tumble away into the dark
  syncWeights(sub) {
    let d = sub.weights.descent, a = sub.weights.ascent;
    for (const m of this.weightMeshes) {
      if (!m.parent || m.userData.gone) continue;
      const k = m.userData.kind;
      const keep = k === 'descent' ? d-- > 0 : a-- > 0;
      if (!keep) {
        m.userData.gone = true;
        const wp = new THREE.Vector3(); m.getWorldPosition(wp);
        const q = new THREE.Quaternion(); m.getWorldQuaternion(q);
        this.root.remove(m); this.scene.add(m); m.position.copy(wp); m.quaternion.copy(q);
        this.dropping.push({ m, v: new THREE.Vector3(0, -0.3, 0), w: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5), t: 0 });
      }
    }
  }

  setArm(deployed) { this.armTarget = deployed ? 1 : 0; }

  update(dt, t, st) {
    const { sub, sys } = st;
    this.root.position.copy(sub.pos);
    this.root.quaternion.copy(sub.quat);
    this.root.updateMatrixWorld(true);
    // lights: power, level, implosion faults, brownout flicker
    const powered = sys.powered('LIGHT');
    const dead = sys.lights.extFault;
    const brown = sys.bat.A.online ? Math.min(1, 0.5 + sys.bat.A.soc * 4) : 0.6;
    let extLight = 0;
    for (const l of this.lamps) {
      const lvl = l.kind === 'main' ? sys.lights.main : sys.lights.flood;
      // extFault kills lamps in order: flood L, then main R
      l.dead = (dead >= 1 && l.idx === 2) || (dead >= 2 && l.idx === 1);
      l.flicker = Math.max(0, l.flicker - dt);
      if (sub.floodL > 180 && Math.random() < dt * 0.4) l.flicker = 0.12;
      const on = powered && !l.dead && lvl > 0.01 && l.flicker <= 0;
      const I = on ? l.max * lvl * brown : 0;
      l.L.intensity += (I - l.L.intensity) * Math.min(1, dt * 25); // LED driver soft-start
      l.L.visible = l.L.intensity > 1;
      const e = l.L.intensity / l.max;
      l.lensM.color.setRGB(1, 0.97, 0.92).multiplyScalar(0.05 + e * 60);
      extLight += e;
    }
    this.extLight = extLight;
    // lasers
    const lz = st.lasers && powered;
    for (const L of this.lasers) L.intensity = lz ? 900 : 0;
    // strobe: flashes only near the surface / on emergency ascent
    const strobeOn = (sub.depth < 40 || st.ap?.ascent?.on) && (t % 2) < 0.06;
    this.strobeM.color.setScalar(strobeOn ? 80 : 0.1); this.strobeL.intensity = strobeOn ? 300 : 0;
    // sonar head slowly rotates while pinging
    if (this.sonarHead && sys.powered('SONAR') && sys.sensors.sonar) this.sonarHead.rotation.z = Math.sin(t * 1.6) * 0.3;
    // manipulator arm: critically damped interpolation between poses
    if (this.arm) {
      if (sub.manipulatorLost && this.arm.root.parent === this.root) {
        const wp = new THREE.Vector3(); this.arm.root.getWorldPosition(wp);
        this.root.remove(this.arm.root); this.scene.add(this.arm.root); this.arm.root.position.copy(wp); this.arm.root.quaternion.copy(sub.quat);
        this.dropping.push({ m: this.arm.root, v: new THREE.Vector3(0, -0.2, 0), w: new THREE.Vector3(0.2, 0.1, 0.3), t: 0 });
      }
      this.armPose += (this.armTarget - this.armPose) * Math.min(1, dt * 0.8);
      const A = this._armPoses.stowed, B = this._armPoses.deployed, k = this.armPose;
      const lerp = (a, b) => a + (b - a) * k;
      this.arm.shoulder.rotation.set(lerp(A.sx, B.sx), lerp(A.sy, B.sy), 0);
      this.arm.elbow.rotation.x = lerp(A.e, B.e) + Math.sin(t * 0.7) * 0.01 * k;
      this.arm.wrist.rotation.set(lerp(A.w, B.w), 0, Math.sin(t * 0.4) * 0.2 * k);
      const g = 0.02 + 0.03 * Math.max(0, Math.sin(t * 0.8)) * k;
      this.arm.jaws[0].position.x = -0.02 - g; this.arm.jaws[1].position.x = 0.02 + g;
    }
    this.syncWeights(sub);
    for (let i = this.dropping.length - 1; i >= 0; i--) {
      const d = this.dropping[i]; d.t += dt;
      d.v.y = Math.max(-2.2, d.v.y - dt * 1.5);
      d.m.position.addScaledVector(d.v, dt);
      d.m.rotation.x += d.w.x * dt; d.m.rotation.y += d.w.y * dt; d.m.rotation.z += d.w.z * dt;
      if (d.t > 40) { this.scene.remove(d.m); this.dropping.splice(i, 1); }
    }
    return extLight;
  }
}
