// Pilot sphere interior (titanium Ø2.1 m pressure hull), built procedurally.
// Rendered as a separate "interior" scene on top of the exterior + volumetric pass.
// The shell discards fragments inside the viewport cones so the ocean shows through.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { pbrMaterial, paintedMaterial, weathered, tex } from '../render/textures.js';
import { canvasTexture, placard, FONT, MONO } from './canvasTex.js';
import { BREAKERS } from '../sim/systems.js';
import { buildOutfit } from './outfit.js';

export const SPHERE_R = 1.05;
export const SPHERE_CENTER = new THREE.Vector3(0, 0.05, -2.3); // body frame
export const EYE = new THREE.Vector3(0, 0.06, 0.2);             // relative to sphere centre (seated pilot, eyes ~0.8 m above deck)
export const EYE_PITCH = -0.19;                                  // natural resting gaze: ~11° down, main viewport centred
export const VIEWPORTS = [
  { dir: new THREE.Vector3(0, -0.24, -1).normalize(), half: 0.52, main: true },
  { dir: new THREE.Vector3(-0.82, -0.28, -0.5).normalize(), half: 0.2 },
  { dir: new THREE.Vector3(0.82, -0.28, -0.5).normalize(), half: 0.2 },
  { dir: new THREE.Vector3(0, -0.93, -0.36).normalize(), half: 0.17 },
];

function shellMaterial(base) {
  base.onBeforeCompile = (sh) => {
    sh.uniforms.uVp = { value: VIEWPORTS.map((v) => v.dir) };
    sh.uniforms.uVpCos = { value: VIEWPORTS.map((v) => Math.cos(v.half)) };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vLocalP;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLocalP = position;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
      varying vec3 vLocalP; uniform vec3 uVp[4]; uniform float uVpCos[4];`)
      .replace('void main() {', `void main() {
      vec3 ld = normalize(vLocalP);
      for (int i = 0; i < 4; i++) if (dot(ld, uVp[i]) > uVpCos[i]) discard;`);
  };
  base.customProgramCacheKey = () => 'shell-vp';
  return base;
}

// quaternion that rotates +Y onto dir
function alignY(dir) { return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir); }
function onSphere(dir, r = SPHERE_R) { return dir.clone().normalize().multiplyScalar(r); }

export class Cockpit {
  constructor(renderer) {
    this.scene = new THREE.Scene();
    this.root = new THREE.Group();         // body-frame (sub pose applied)
    this.sphere = new THREE.Group();       // sphere centre
    this.sphere.position.copy(SPHERE_CENTER);
    this.root.add(this.sphere);
    this.scene.add(this.root);
    const pm = new THREE.PMREMGenerator(renderer);
    this.env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = this.env;
    this.scene.environmentIntensity = 0.35;
    this.animated = [];
    this.leds = {};
    this.gauges = {};
    this.breakerMeshes = {};
    this.mfd = {};
    this.stick = null;
    this.leakPoints = {};
  }

  async build() {
    const S = this.sphere;
    const [paint, brushed, leather, grate, floor, rust, hullM] = await Promise.all([
      paintedMaterial({ color: 0xcfcbc1, repeat: 5, rough: [0.45, 0.62] }),
      pbrMaterial('brushed', { repeat: 2, metal: true, roughness: 1, color: 0xbfc4c8 }),
      pbrMaterial('leather', { repeat: 3, roughness: 1, color: 0x2a2c30 }),
      pbrMaterial('grate', { repeat: 4, metal: true, color: 0x8a8d90 }),
      pbrMaterial('floor', { repeat: 3, metal: true, color: 0x6c7074 }),
      pbrMaterial('rust', { repeat: 1, metal: true }),
      pbrMaterial('hull', { repeat: 2, metal: true, color: 0x9aa0a6 }),
    ]);
    this.mats = { paint, brushed, leather, grate, floor, rust, hullM };
    const darkMetal = weathered(new THREE.MeshStandardMaterial({ color: 0x1c1f23, metalness: 0.7, roughness: 0.42 }), { scale: 5, wear: 0.5, key: 'dm' });
    const black = weathered(new THREE.MeshStandardMaterial({ color: 0x0b0c0e, metalness: 0.2, roughness: 0.55 }), { scale: 6, wear: 0.4, key: 'bk' });
    const blackRubber = new THREE.MeshStandardMaterial({ color: 0x08090a, roughness: 0.9 });
    const titanium = brushed.clone(); titanium.color.set(0xa7a39a); titanium.roughness = 0.9;
    const yellow = weathered(new THREE.MeshStandardMaterial({ color: 0xe0a800, roughness: 0.45, metalness: 0.1 }), { scale: 6, wear: 0.9, key: 'ye' });
    const red = weathered(new THREE.MeshStandardMaterial({ color: 0xa3110e, roughness: 0.35, metalness: 0.2 }), { scale: 5, wear: 0.9, key: 're' });
    const green = weathered(new THREE.MeshStandardMaterial({ color: 0x1d5f36, roughness: 0.4, metalness: 0.3 }), { scale: 4, wear: 1.0, key: 'gr' });
    const cable = weathered(new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.6 }), { scale: 12, wear: 0.5, key: 'cb' });
    const cableOr = weathered(new THREE.MeshStandardMaterial({ color: 0xb04c16, roughness: 0.55 }), { scale: 12, wear: 0.8, key: 'co' });
    const copper = new THREE.MeshStandardMaterial({ color: 0xb87333, metalness: 1, roughness: 0.3 });
    this.darkMetal = darkMetal;

    // ---------------------------------------------------- pressure hull shell
    const shellGeo = new THREE.SphereGeometry(SPHERE_R, 96, 64);
    const shell = new THREE.Mesh(shellGeo, shellMaterial(paint.clone()));
    shell.material.side = THREE.BackSide;
    shell.receiveShadow = true;
    S.add(shell);
    // lower half: padded insulation panels (quilted leather)
    const padGeo = new THREE.SphereGeometry(SPHERE_R - 0.035, 64, 32, 0, Math.PI * 2, Math.PI * 0.58, Math.PI * 0.42);
    const pad = new THREE.Mesh(padGeo, shellMaterial(leather.clone()));
    pad.material.side = THREE.BackSide; pad.receiveShadow = true;
    S.add(pad);
    // interior lining panels, cable trays, handles, placards, pilot kit
    const panelTex = { map: tex('wallpanel_color', { srgb: true }), orm: tex('wallpanel_orm'), normal: tex('wallpanel_normal') };
    this.outfit = buildOutfit(S, {
      R: SPHERE_R, ports: VIEWPORTS, floorY: -0.62, dark: new THREE.MeshStandardMaterial({ color: 0x3a3e43, roughness: 0.8, metalness: 0.3 }),
      mats: {
        panelTex,
        steel: new THREE.MeshStandardMaterial({ color: 0xb8bcc0, metalness: 1, roughness: 0.32 }),
        anodised: new THREE.MeshStandardMaterial({ color: 0x1b1d21, metalness: 0.6, roughness: 0.38 }),
        cable, cableOr, titanium,
        strap: new THREE.MeshStandardMaterial({ color: 0x202226, roughness: 0.95 }),
        handle: new THREE.MeshStandardMaterial({ color: 0xf2b400, roughness: 0.4, metalness: 0.1 }),
        firstAid: new THREE.MeshStandardMaterial({ color: 0xe8e6e0, roughness: 0.6 }),
        bottle: new THREE.MeshPhysicalMaterial({ color: 0x9fc8e8, roughness: 0.15, transparent: true, opacity: 0.7, clearcoat: 1 }),
        clipboard: new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.7 }),
      },
    });

    // ---------------------------------------------------- viewports (bore + frame + glass)
    this.glass = [];
    for (const vp of VIEWPORTS) {
      const q = alignY(vp.dir.clone().negate());
      const rOut = Math.sin(vp.half) * SPHERE_R;
      const depth = vp.main ? 0.22 : 0.16;
      const g = new THREE.Group();
      g.position.copy(onSphere(vp.dir, SPHERE_R * Math.cos(vp.half) + 0.0));
      g.quaternion.copy(q);
      S.add(g);
      // conical bore (titanium seat) going outward (negative local y)
      const bore = new THREE.Mesh(new THREE.CylinderGeometry(rOut * 1.0, rOut * 0.82, depth, 64, 1, true), titanium);
      bore.material = titanium.clone(); bore.material.side = THREE.DoubleSide;
      bore.position.y = -depth / 2;
      g.add(bore);
      // retaining ring with bolts
      const ring = new THREE.Mesh(new THREE.TorusGeometry(rOut * 1.02, vp.main ? 0.03 : 0.022, 12, 96), darkMetal);
      ring.rotation.x = Math.PI / 2; ring.position.y = 0.005; g.add(ring);
      const nb = vp.main ? 24 : 12;
      const boltGeo = new THREE.CylinderGeometry(0.009, 0.009, 0.016, 6);
      const bolts = new THREE.InstancedMesh(boltGeo, brushed, nb);
      const m4 = new THREE.Matrix4();
      for (let i = 0; i < nb; i++) {
        const a = (i / nb) * Math.PI * 2;
        m4.makeTranslation(Math.cos(a) * rOut * 1.02, 0.03, Math.sin(a) * rOut * 1.02);
        bolts.setMatrixAt(i, m4);
      }
      g.add(bolts);
      // glass disc at the outer end: very subtle reflective layer + condensation/droplets
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, metalness: 0, roughness: 0.05, transparent: true, opacity: 0.06, envMapIntensity: 0.6,
        clearcoat: 1, clearcoatRoughness: 0.05, depthWrite: false, side: THREE.DoubleSide,
      });
      glassMat.userData.cond = { value: 0 };
      glassMat.userData.wet = { value: 0 };
      glassMat.onBeforeCompile = (sh) => {
        sh.uniforms.uCond = glassMat.userData.cond; sh.uniforms.uWet = glassMat.userData.wet; sh.uniforms.uT = { value: 0 };
        glassMat.userData.shader = sh;
        sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vUv2;').replace('#include <uv_vertex>', '#include <uv_vertex>\nvUv2 = uv;');
        sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
          varying vec2 vUv2; uniform float uCond; uniform float uWet; uniform float uT;
          float gh(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
          float drops(vec2 uv, float sc){ vec2 g = uv * sc; vec2 i = floor(g); vec2 f = fract(g) - 0.5;
            vec2 o = vec2(gh(i), gh(i + 7.1)) - 0.5; float r = 0.12 + 0.2 * gh(i + 3.3);
            return smoothstep(r, r * 0.6, length(f - o * 0.6)) * step(0.45, gh(i + 1.7)); }`)
          .replace('#include <opaque_fragment>', `
            float fogEdge = smoothstep(0.1, 0.5, length(vUv2 - 0.5));
            float cond = uCond * (0.5 + 0.5 * fogEdge);
            float d = drops(vUv2, 26.0) + drops(vUv2 + 0.37, 47.0) * 0.8;
            vec2 ruv = vUv2 * vec2(18.0, 3.0) + vec2(0.0, uT * 0.12);
            float rivulet = uWet * smoothstep(0.93, 1.0, sin(ruv.x + sin(ruv.y * 4.0 + vUv2.x * 9.0) * 0.8)) ;
            diffuseColor.a = clamp(diffuseColor.a + cond * 0.42 + d * cond * 0.4 + rivulet * 0.25, 0.0, 0.9);
            outgoingLight = mix(outgoingLight, vec3(0.62, 0.66, 0.7) * 0.25, cond * 0.6);
            outgoingLight += (d * cond + rivulet) * 0.12;
            #include <opaque_fragment>`);
      };
      glassMat.customProgramCacheKey = () => 'vpglass';
      const glass = new THREE.Mesh(new THREE.CircleGeometry(rOut * 0.83, 64), glassMat);
      glass.rotation.x = Math.PI / 2; glass.position.y = -depth + 0.002;
      glass.renderOrder = 10;
      g.add(glass);
      this.glass.push(glassMat);
      // thick PMMA frustum: the bevelled side wall of the acrylic seen through the bore
      // (greenish body tint + bright total-internal-reflection band towards grazing angles)
      const edgeMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, side: THREE.BackSide,
        uniforms: { uL: this._acrylicL || (this._acrylicL = { value: 1 }) },
        vertexShader: `varying vec3 vN; varying vec3 vV; varying float vY;
          void main(){ vec4 w = modelMatrix * vec4(position,1.0); vN = normalize(mat3(modelMatrix) * normal); vV = normalize(cameraPosition - w.xyz);
            vY = uv.y; gl_Position = projectionMatrix * viewMatrix * w; }`,
        fragmentShader: `varying vec3 vN; varying vec3 vV; varying float vY; uniform float uL;
          void main(){ float g = 1.0 - abs(dot(normalize(vN), vV)); float tir = pow(g, 3.0);
            float band = smoothstep(0.0, 0.15, vY) * smoothstep(1.0, 0.8, vY);
            vec3 c = mix(vec3(0.05, 0.12, 0.11), vec3(0.55, 0.75, 0.72), tir) * uL;
            gl_FragColor = vec4(c, (0.28 + tir * 0.45) * band); }`,
      });
      const acr = new THREE.Mesh(new THREE.CylinderGeometry(rOut * 0.975, rOut * 0.81, depth * 0.96, 64, 1, true), edgeMat);
      acr.position.y = -depth / 2; acr.renderOrder = 9; g.add(acr);
      // inner (cabin-side) face: fingerprints, wipe smears, fine scratches, faint cabin reflection
      const innerMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, side: THREE.DoubleSide,
        uniforms: { uL: this._acrylicL, uSeed: { value: Math.random() * 10 } },
        vertexShader: `varying vec2 vUv; varying vec3 vN; varying vec3 vV;
          void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position,1.0); vN = normalize(mat3(modelMatrix) * normal); vV = normalize(cameraPosition - w.xyz);
            gl_Position = projectionMatrix * viewMatrix * w; }`,
        fragmentShader: `varying vec2 vUv; varying vec3 vN; varying vec3 vV; uniform float uL; uniform float uSeed;
          float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
          float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
            return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
          float fbm(vec2 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++){ s += a * n(p); p *= 2.03; a *= 0.5; } return s; }
          void main(){
            vec2 p = vUv - 0.5; float r = length(p) * 2.0;
            // smudge patches concentrated near the lower rim (where hands brace)
            float sm = smoothstep(0.55, 0.8, fbm(p * 5.0 + uSeed)) * (0.35 + 0.65 * smoothstep(0.2, 0.9, r)) * (0.6 + 0.4 * smoothstep(0.2, -0.4, p.y));
            // fingerprint ridges inside a few prints
            vec2 fp = (p - vec2(0.28, -0.25)) * 60.0; float ridge = 0.5 + 0.5 * sin(length(fp * vec2(1.0, 0.8)) * 6.0);
            float print = smoothstep(0.9, 0.3, length(p - vec2(0.28, -0.25)) * 14.0) * ridge;
            // circular wipe marks + hairline scratches
            float wipe = smoothstep(0.62, 0.7, fbm(vec2(atan(p.y, p.x) * 3.0, r * 40.0) + uSeed)) * 0.5;
            float scr = smoothstep(0.985, 1.0, n(vec2(dot(p, vec2(0.8, 0.6)) * 900.0, p.y * 4.0 + uSeed))) * 0.7;
            float fres = 0.04 + 0.96 * pow(1.0 - abs(dot(normalize(vN), vV)), 5.0);
            float grime = sm * 0.55 + print * 0.5 + wipe * 0.3 + scr;
            vec3 refl = vec3(0.95, 0.9, 0.82) * (fres * 0.35 + grime * 0.22) * uL;
            float a = clamp(fres * 0.25 + grime * 0.16, 0.0, 0.5) * smoothstep(1.0, 0.94, r);
            gl_FragColor = vec4(refl + vec3(0.02, 0.05, 0.05) * 0.4, a + 0.035); }`,
      });
      const inner = new THREE.Mesh(new THREE.CircleGeometry(rOut * 0.975, 64), innerMat);
      inner.rotation.x = Math.PI / 2; inner.position.y = -0.012; inner.renderOrder = 11; g.add(inner);
      if (vp.main) this.mainVP = g;
    }

    // ---------------------------------------------------- main console (below main viewport)
    const console_ = new THREE.Group();
    console_.position.set(0, -0.42, -0.52);
    console_.rotation.x = -0.55;
    S.add(console_);
    const deck = new THREE.Mesh(new RoundedBoxGeometry(1.25, 0.05, 0.42, 4, 0.02), darkMetal);
    deck.castShadow = deck.receiveShadow = true;
    console_.add(deck);
    this.console = console_;
    // MFDs
    const mkMFD = (name, w, h, pos, rotY, parent, pw = 512, ph = 320) => {
      const t = canvasTexture(pw, ph, (c) => { c.fillStyle = '#000'; c.fillRect(0, 0, pw, ph); });
      const bez = new THREE.Mesh(new RoundedBoxGeometry(w + 0.05, h + 0.05, 0.03, 3, 0.01), black);
      bez.position.copy(pos); bez.rotation.y = rotY;
      parent.add(bez);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, toneMapped: false }));
      scr.position.z = 0.0165;
      bez.add(scr);
      // bezel buttons
      const bgeo = new THREE.BoxGeometry(0.018, 0.012, 0.008);
      for (let i = 0; i < 5; i++) {
        const b = new THREE.Mesh(bgeo, darkMetal);
        b.position.set(-w / 2 + (i + 0.5) * (w / 5), -h / 2 - 0.018, 0.018);
        bez.add(b);
      }
      this.mfd[name] = { tex: t, ctx: t.userData.ctx, w: pw, h: ph, mesh: scr, bez }; scr.userData.action = { type: 'mfd', id: name };
      return bez;
    };
    const mfdTilt = new THREE.Group(); mfdTilt.position.set(0, 0.03, -0.12); mfdTilt.rotation.x = -1.05; console_.add(mfdTilt);
    mkMFD('left', 0.33, 0.21, new THREE.Vector3(-0.39, 0.12, 0.03), 0.28, mfdTilt);
    mkMFD('center', 0.36, 0.225, new THREE.Vector3(0, 0.12, 0), 0, mfdTilt);
    mkMFD('right', 0.33, 0.21, new THREE.Vector3(0.39, 0.12, 0.03), -0.28, mfdTilt);
    // side MFD (life support) on port wall, camera feed on starboard
    const port = new THREE.Group(); port.position.copy(onSphere(new THREE.Vector3(-0.92, -0.05, -0.2), SPHERE_R - 0.16)); port.lookAt(0, -0.05, 0.1); S.add(port);
    mkMFD('lss', 0.28, 0.2, new THREE.Vector3(0, 0, 0), 0, port, 448, 320);
    const stb = new THREE.Group(); stb.position.copy(onSphere(new THREE.Vector3(0.92, -0.05, -0.2), SPHERE_R - 0.16)); stb.lookAt(0, -0.05, 0.1); S.add(stb);
    mkMFD('cam', 0.3, 0.19, new THREE.Vector3(0, 0, 0), 0, stb, 480, 304);

    // push-buttons strip with LEDs on the console deck
    const btnGeo = new THREE.CylinderGeometry(0.011, 0.011, 0.012, 16);
    const ledGeo = new THREE.SphereGeometry(0.0045, 8, 6);
    const btnLabels = ['AP', 'HDG', 'DPT', 'ALT', 'SPD', 'STN', 'NAV', 'OAS', 'LT1', 'LT2', 'VBT', 'TRM', 'ALM', 'CAM'];
    btnLabels.forEach((l, i) => {
      const x = -0.55 + i * 0.085;
      const b = new THREE.Mesh(btnGeo, darkMetal); b.position.set(x, 0.032, 0.14); console_.add(b);
      b.userData.action = { type: 'button', id: l }; (this.buttons ||= {})[l] = b;
      const led = new THREE.Mesh(ledGeo, new THREE.MeshBasicMaterial({ color: 0x111111, toneMapped: false }));
      led.position.set(x, 0.035, 0.11); console_.add(led);
      this.leds[l] = led;
      const lbl = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.014), new THREE.MeshBasicMaterial({ map: placard(l, { w: 128, h: 36, bg: '#15181b', fg: '#cfd6dc', border: false, font: `bold 26px ${MONO}` }), toneMapped: false, transparent: true }));
      lbl.rotation.x = -Math.PI / 2; lbl.position.set(x, 0.0265, 0.17); console_.add(lbl);
      lbl.material.color.setScalar(0.35);
    });
    // master caution / warning annunciators
    const annGeo = new RoundedBoxGeometry(0.07, 0.035, 0.02, 2, 0.004);
    const mkAnn = (txt, col, x) => {
      const t = placard(txt, { w: 160, h: 80, bg: '#1a0000', fg: col, border: false, font: `bold 30px ${FONT}` });
      const m = new THREE.Mesh(annGeo, [darkMetal, darkMetal, darkMetal, darkMetal, new THREE.MeshBasicMaterial({ map: t, toneMapped: false }), darkMetal]);
      m.position.set(x, 0.31, 0.02); m.rotation.x = 0.35;
      mfdTilt.parent.add(m);
      return m;
    };
    this.annWarn = mkAnn('WARNING', '#ff3b30', -0.07);
    this.annCaut = mkAnn('CAUTION', '#ffb000', 0.07);
    this.annWarn.position.set(-0.07, 0.07, -0.25); this.annCaut.position.set(0.07, 0.07, -0.25);
    this.annWarn.rotation.x = -0.4; this.annCaut.rotation.x = -0.4;

    // ---------------------------------------------------- analog backup gauges (depth, O2) around viewport
    const mkGauge = (name, label, max, ticks, pos, lookAt, unit) => {
      const g = new THREE.Group(); g.position.copy(pos); S.add(g); g.lookAt(lookAt);
      const face = canvasTexture(256, 256, (c) => {
        c.fillStyle = '#0d0f11'; c.beginPath(); c.arc(128, 128, 126, 0, 7); c.fill();
        c.strokeStyle = '#e8e2d0'; c.fillStyle = '#e8e2d0'; c.lineWidth = 3;
        c.beginPath(); c.arc(128, 128, 110, Math.PI * 0.75, Math.PI * 2.25); c.stroke();
        for (let i = 0; i <= ticks * 5; i++) {
          const a = Math.PI * 0.75 + (i / (ticks * 5)) * Math.PI * 1.5;
          const L = i % 5 === 0 ? 18 : 9;
          c.lineWidth = i % 5 === 0 ? 3 : 1.5;
          c.beginPath(); c.moveTo(128 + Math.cos(a) * 110, 128 + Math.sin(a) * 110); c.lineTo(128 + Math.cos(a) * (110 - L), 128 + Math.sin(a) * (110 - L)); c.stroke();
          if (i % 5 === 0) { c.font = `bold 20px ${MONO}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(Math.round((i / (ticks * 5)) * max)), 128 + Math.cos(a) * 72, 128 + Math.sin(a) * 72); }
        }
        c.font = `bold 20px ${FONT}`; c.fillStyle = '#f2b400'; c.fillText(label, 128, 170); c.fillStyle = '#9aa'; c.font = `14px ${MONO}`; c.fillText(unit, 128, 192);
      });
      const faceM = new THREE.Mesh(new THREE.CircleGeometry(0.055, 48), new THREE.MeshStandardMaterial({ map: face, roughness: 0.4, emissive: 0xffffff, emissiveMap: face, emissiveIntensity: 0.08 }));
      g.add(faceM);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.057, 0.006, 8, 48), brushed); g.add(rim);
      const needle = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.045, 0.002), new THREE.MeshBasicMaterial({ color: 0xff5a1f, toneMapped: false }));
      needle.geometry.translate(0, 0.02, 0);
      const pivot = new THREE.Group(); pivot.position.z = 0.004; pivot.add(needle); g.add(pivot);
      const cover = new THREE.Mesh(new THREE.CircleGeometry(0.056, 48), new THREE.MeshPhysicalMaterial({ transparent: true, opacity: 0.08, roughness: 0.02, clearcoat: 1, depthWrite: false }));
      cover.position.z = 0.008; g.add(cover);
      this.gauges[name] = { pivot, max };
    };
    const c0 = new THREE.Vector3(0, 0.1, 0.3);
    mkGauge('depth', '深度', 12000, 12, onSphere(new THREE.Vector3(-0.5, 0.05, -0.86), SPHERE_R - 0.07), c0, 'METRES');
    mkGauge('o2', 'O2 流量', 2, 4, onSphere(new THREE.Vector3(0.5, 0.05, -0.86), SPHERE_R - 0.07), c0, 'L/min');
    mkGauge('cabinP', '艦内気圧', 3, 6, onSphere(new THREE.Vector3(0.62, 0.3, -0.72), SPHERE_R - 0.07), c0, 'bar');
    mkGauge('volt', '主母線', 400, 8, onSphere(new THREE.Vector3(-0.62, 0.3, -0.72), SPHERE_R - 0.07), c0, 'VDC');

    // ---------------------------------------------------- overhead breaker panel
    const over = new THREE.Group();
    over.position.copy(onSphere(new THREE.Vector3(0, 1, -0.2), SPHERE_R - 0.11));
    over.lookAt(0, 0, 0.35);
    S.add(over);
    const panel = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.3, 0.05, 3, 0.012), darkMetal);
    over.add(panel);
    const brkGeo = new RoundedBoxGeometry(0.03, 0.05, 0.03, 2, 0.004);
    const leverGeo = new THREE.BoxGeometry(0.012, 0.026, 0.012);
    BREAKERS.forEach((b, i) => {
      const col = i % 5, row = (i / 5) | 0;
      const x = -0.24 + col * 0.12, y = 0.06 - row * 0.13;
      const body = new THREE.Mesh(brkGeo, black); body.position.set(x, y, 0.035); over.add(body);
      const lever = new THREE.Mesh(leverGeo, new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.4 }));
      lever.position.set(0, 0.008, 0.02); body.add(lever);
      const led = new THREE.Mesh(ledGeo, new THREE.MeshBasicMaterial({ color: 0x00ff66, toneMapped: false })); led.position.set(0.024, 0.018, 0.012); body.add(led);
      const lbl = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.022), new THREE.MeshBasicMaterial({ map: placard(b.en, { w: 256, h: 56, bg: '#1b1e21', fg: '#d9dde0', border: false, font: `bold 30px ${MONO}` }), toneMapped: false }));
      lbl.position.set(x, y - 0.045, 0.028); lbl.material.color.setScalar(0.5); over.add(lbl);
      this.breakerMeshes[b.id] = { lever, led }; body.userData.action = { type: 'breaker', id: b.id };
    });
    this.overhead = over;

    // ---------------------------------------------------- overhead cabin light strips
    const stripMat = new THREE.MeshBasicMaterial({ color: 0xfff1dd, toneMapped: false });
    this.stripMat = stripMat;
    for (const sx of [-1, 1]) {
      const strip = new THREE.Mesh(new THREE.CapsuleGeometry(0.012, 0.42, 4, 12), stripMat);
      strip.position.copy(onSphere(new THREE.Vector3(sx * 0.42, 0.88, 0.1), SPHERE_R - 0.03));
      strip.lookAt(0, 0, 0); strip.rotateX(Math.PI / 2);
      S.add(strip);
    }
    this.cabinLights = [];
    for (const sx of [-1, 1]) {
      const l = new THREE.PointLight(0xffeedd, 0.9, 3.2, 1.6);
      l.position.copy(onSphere(new THREE.Vector3(sx * 0.42, 0.88, 0.1), SPHERE_R - 0.12));
      S.add(l); this.cabinLights.push(l);
    }
    // wall-washer LED pucks in the upper tray, aimed down along the lining (grazing light brings
    // out the paint stipple, seams and pillowed panels exactly like cabin lighting in real HOVs)
    this.washers = [];
    for (const [lon, lat] of [[1.9, 0.34], [-1.9, 0.34], [2.7, 0.34], [-2.7, 0.34]]) {
      const d = new THREE.Vector3(Math.cos(lat) * Math.sin(lon), Math.sin(lat), -Math.cos(lat) * Math.cos(lon));
      const w = new THREE.SpotLight(0xffe6c8, 0.6, 1.8, 0.9, 0.9, 2);
      w.position.copy(d).multiplyScalar(SPHERE_R - 0.09);
      const down = new THREE.Vector3(Math.cos(lat - 0.9) * Math.sin(lon), Math.sin(lat - 0.9), -Math.cos(lat - 0.9) * Math.cos(lon)).multiplyScalar(SPHERE_R - 0.06);
      w.target.position.copy(down);
      S.add(w); S.add(w.target); this.washers.push(w);
      const puck = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.01, 16), new THREE.MeshBasicMaterial({ color: 0xfff0dd, toneMapped: false }));
      puck.position.copy(w.position); puck.lookAt(down); puck.rotateX(Math.PI / 2); S.add(puck);
      w.userData.puck = puck;
    }
    const key = new THREE.SpotLight(0xfff0e0, 3.5, 4, 1.0, 0.8, 1.5);
    key.position.set(0, 0.85, 0.3); key.target.position.set(0, -0.4, -0.5);
    key.castShadow = true; key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -0.0005; key.shadow.radius = 4;
    S.add(key); S.add(key.target); this.keyLight = key;
    // screen glow
    this.screenGlow = new THREE.PointLight(0x5fc8ff, 0.35, 1.5, 2);
    this.screenGlow.position.set(0, -0.2, -0.55); S.add(this.screenGlow);
    // red emergency / alarm beacons
    this.alarmLights = [];
    for (const sx of [-1, 1]) {
      const l = new THREE.PointLight(0xff1a0a, 0, 3.5, 1.6);
      l.position.copy(onSphere(new THREE.Vector3(sx * 0.75, 0.55, 0.3), SPHERE_R - 0.1)); S.add(l); this.alarmLights.push(l);
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.025, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x220000, toneMapped: false }));
      lamp.position.copy(onSphere(new THREE.Vector3(sx * 0.75, 0.55, 0.3), SPHERE_R - 0.02)); lamp.lookAt(0, 0, 0); lamp.rotateX(-Math.PI / 2); S.add(lamp);
      this.alarmLights.push(lamp);
    }
    // outside light through the window
    this.seaLight = new THREE.DirectionalLight(0x4fa8d8, 0);
    this.seaLight.position.copy(VIEWPORTS[0].dir).multiplyScalar(-3).negate();
    this.seaLight.target.position.set(0, 0, 0.5);
    S.add(this.seaLight); S.add(this.seaLight.target);
    const hemi = new THREE.HemisphereLight(0x9fb2c4, 0x1a1c20, 0.12); S.add(hemi); this.hemi = hemi;

    // ---------------------------------------------------- pilot seat & floor
    const floorY = -0.62;
    const deckGeo = new THREE.CircleGeometry(Math.sqrt(SPHERE_R ** 2 - floorY ** 2) - 0.02, 48);
    const deckM = new THREE.Mesh(deckGeo, grate); deckM.rotation.x = -Math.PI / 2; deckM.position.y = floorY; deckM.receiveShadow = true; S.add(deckM);
    const seat = new THREE.Group(); seat.position.set(0, -0.5, 0.52); S.add(seat);
    const cushion = new THREE.Mesh(new RoundedBoxGeometry(0.52, 0.1, 0.5, 4, 0.04), leather); cushion.castShadow = true; seat.add(cushion);
    const back = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.62, 0.12, 4, 0.05), leather); back.position.set(0, 0.34, 0.28); back.rotation.x = -0.18; seat.add(back);
    for (const sx of [-1, 1]) {
      const arm = new THREE.Mesh(new RoundedBoxGeometry(0.1, 0.07, 0.42, 3, 0.025), leather); arm.position.set(sx * 0.31, 0.16, -0.02); seat.add(arm);
    }
    // joystick on the right armrest (animated by input)
    const stickBase = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.03, 24), darkMetal); stickBase.position.set(0.31, 0.21, -0.14); seat.add(stickBase);
    const boot = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.04, 16, 1, true), blackRubber); boot.position.y = 0.035; stickBase.add(boot);
    const stick = new THREE.Group(); stick.position.y = 0.02; stickBase.add(stick);
    const grip = new THREE.Mesh(new THREE.CapsuleGeometry(0.018, 0.08, 4, 12), blackRubber); grip.position.y = 0.07; stick.add(grip);
    const trig = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.018, 0.01), red); trig.position.set(0, 0.1, -0.02); stick.add(trig);
    this.stick = stick;
    // left armrest: heave/trim thumbwheel box
    const lbox = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.04, 0.12, 2, 0.01), darkMetal); lbox.position.set(-0.31, 0.215, -0.12); seat.add(lbox);
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.012, 20), blackRubber); wheel.rotation.z = Math.PI / 2; wheel.position.set(0, 0.025, 0); lbox.add(wheel); this.heaveWheel = wheel;

    // ---------------------------------------------------- life-support equipment (port side, aft)
    const lss = new THREE.Group(); lss.position.set(-0.62, -0.38, 0.38); S.add(lss);
    for (let i = 0; i < 2; i++) {
      const cyl = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.42, 8, 24), green); cyl.position.set(-0.04, 0.2, -0.12 + i * 0.17); cyl.rotation.z = -0.15; cyl.castShadow = true; lss.add(cyl);
      const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.06, 12), brushed); valve.position.set(-0.075, 0.49, -0.12 + i * 0.17); lss.add(valve);
      const lab = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.14), new THREE.MeshStandardMaterial({ map: placard('酸素', { w: 128, h: 224, bg: '#f4f4f0', fg: '#1f6a3a', font: `bold 44px "Noto Sans JP"`, sub: 'O2 MED' }), roughness: 0.6 }));
      lab.position.set(0.04, 0.2, -0.12 + i * 0.17); lab.rotation.y = Math.PI / 2; lab.rotation.z = 0.15; lss.add(lab);
    }
    const scrub = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.28, 0.26, 3, 0.02), paint); scrub.position.set(0.05, -0.02, 0.2); scrub.castShadow = true; lss.add(scrub);
    const fanG = new THREE.Group(); fanG.position.set(0.165, 0.02, 0.2); fanG.rotation.z = Math.PI / 2; lss.add(fanG);
    const fanGuard = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.006, 6, 32), darkMetal); fanGuard.rotation.x = Math.PI / 2; fanG.add(fanGuard);
    const blades = new THREE.Group(); fanG.add(blades);
    for (let i = 0; i < 5; i++) { const bl = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.004, 0.022), black); bl.position.x = 0.03; const p = new THREE.Group(); p.rotation.y = (i / 5) * Math.PI * 2; bl.rotation.x = 0.4; p.add(bl); blades.add(p); }
    this.fanBlades = blades;
    const scrubLbl = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.05), new THREE.MeshStandardMaterial({ map: placard('CO2 スクラバー', { w: 320, h: 100, bg: '#e8e0c8', fg: '#222', font: `bold 34px "Noto Sans JP"`, sub: 'LiOH' }) }));
    scrubLbl.position.set(0.05, 0.08, 0.331); lss.add(scrubLbl);

    // fire extinguisher & emergency breathing apparatus (starboard, aft)
    const ext = new THREE.Group(); ext.position.set(0.72, -0.3, 0.42); S.add(ext);
    const extB = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.25, 8, 20), red); extB.castShadow = true; ext.add(extB);
    const extH = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 8, 16, Math.PI), black); extH.position.y = 0.2; ext.add(extH);
    const strap = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.008, 6, 24), black); strap.rotation.x = Math.PI / 2; ext.add(strap);
    this.extinguisher = ext;
    const ebaBox = new THREE.Mesh(new RoundedBoxGeometry(0.18, 0.12, 0.1, 3, 0.02), yellow); ebaBox.position.set(0.7, -0.05, 0.55); ebaBox.lookAt(0, -0.05, 0.3); S.add(ebaBox);
    const ebaLbl = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.05), new THREE.MeshBasicMaterial({ map: placard('緊急呼吸器', { w: 320, h: 100, bg: '#f2b400', fg: '#111', font: `bold 40px "Noto Sans JP"`, sub: 'EMERGENCY BREATHING' }) }));
    ebaLbl.position.z = 0.051; ebaBox.add(ebaLbl);

    // ---------------------------------------------------- penetrators (hull feedthroughs) & cable runs
    const penDirs = {
      P1: new THREE.Vector3(-0.55, -0.55, 0.62), P2: new THREE.Vector3(0.55, -0.55, 0.62),
      P3: new THREE.Vector3(-0.35, 0.3, 0.88), P4: new THREE.Vector3(0.45, -0.75, 0.45),
      VP: VIEWPORTS[0].dir.clone().multiplyScalar(1).add(new THREE.Vector3(0.32, 0.25, 0)), HATCH: new THREE.Vector3(0, 0.98, 0.1),
    };
    for (const id in penDirs) {
      const d = penDirs[id].normalize();
      const p = onSphere(d, SPHERE_R - 0.02);
      this.leakPoints[id] = { pos: p.clone().multiplyScalar((SPHERE_R - 0.06) / SPHERE_R), dir: d.clone().negate() };
      if (id === 'VP' || id === 'HATCH') continue;
      const g = new THREE.Group(); g.position.copy(p); g.quaternion.copy(alignY(d.clone().negate())); S.add(g);
      const boss = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.04, 20), titanium); boss.position.y = 0.02; g.add(boss);
      const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 6), brushed); nut.position.y = 0.055; g.add(nut);
      const lbl = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.02), new THREE.MeshBasicMaterial({ map: placard(id, { w: 96, h: 32, bg: '#f2b400', fg: '#000', font: `bold 24px ${MONO}`, border: false }) }));
      lbl.position.set(0, 0.041, 0.062); g.add(lbl);
      // cable bundle from penetrator along the wall to the console
      const pts = [];
      for (let k = 0; k <= 8; k++) {
        const t = k / 8;
        const dd = d.clone().lerp(new THREE.Vector3(Math.sign(d.x || 1) * 0.3, -0.6, -0.7).normalize(), t).normalize();
        pts.push(onSphere(dd, SPHERE_R - 0.05 - 0.04 * Math.sin(t * Math.PI)).add(new THREE.Vector3(0, 0.02 * Math.sin(t * 9), 0)));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      for (let c = 0; c < 3; c++) {
        const off = new THREE.Vector3((c - 1) * 0.012, 0, 0);
        const cc = new THREE.CatmullRomCurve3(pts.map((q) => q.clone().add(off)));
        const tube = new THREE.Mesh(new THREE.TubeGeometry(cc, 48, c === 1 ? 0.01 : 0.007, 8), c === 1 ? cableOr : cable);
        tube.castShadow = true; S.add(tube);
      }
    }
    // hatch at the top
    const hatch = new THREE.Group(); hatch.position.copy(onSphere(new THREE.Vector3(0, 1, 0.1), SPHERE_R - 0.01)); hatch.quaternion.copy(alignY(new THREE.Vector3(0, -1, -0.1).normalize())); S.add(hatch);
    const hatchRing = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 12, 64), titanium); hatchRing.rotation.x = Math.PI / 2; hatch.add(hatchRing);
    const wheelH = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.012, 8, 32), brushed); wheelH.rotation.x = Math.PI / 2; wheelH.position.y = 0.06; hatch.add(wheelH);
    for (let i = 0; i < 3; i++) { const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.24, 6), brushed); sp.rotation.z = Math.PI / 2; sp.rotation.y = (i / 3) * Math.PI; sp.position.y = 0.06; hatch.add(sp); }
    // handholds
    for (const a of [-2.2, -1.4, 1.4, 2.2]) {
      const dd = new THREE.Vector3(Math.sin(a) * 0.8, 0.55, Math.cos(a) * 0.8).normalize();
      const h = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.009, 8, 20, Math.PI), yellow);
      h.position.copy(onSphere(dd, SPHERE_R - 0.03)); h.lookAt(0, 0, 0); S.add(h);
    }
    // copper bus bars behind a guard (visible sparks origin)
    const bus = new THREE.Group(); bus.position.set(0.45, -0.55, 0.05); S.add(bus);
    for (let i = 0; i < 3; i++) { const bb = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.01, 0.02), copper); bb.position.set(0, i * 0.03, 0); bus.add(bb); }
    this.busBarPos = new THREE.Vector3(0.45, -0.52, 0.05);
    // interior placards / warnings
    const warnP = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.07), new THREE.MeshStandardMaterial({ map: placard('最大運用深度 11,000 m', { w: 512, h: 160, bg: '#f2b400', fg: '#111', font: `bold 46px "Noto Sans JP"`, sub: 'MAX OPERATING DEPTH — DSV-11 WADATSUMI' }), roughness: 0.6 }));
    warnP.position.copy(onSphere(new THREE.Vector3(0, 0.55, -0.83), SPHERE_R - 0.03)); warnP.lookAt(0, 0.1, 0.3); S.add(warnP);

    // ---------------------------------------------------- flood water (inside sphere)
    const waterMat = new THREE.MeshPhysicalMaterial({ color: 0x0b3a44, roughness: 0.08, metalness: 0, transparent: true, opacity: 0.8, envMapIntensity: 1.2, clearcoat: 1 });
    waterMat.onBeforeCompile = (sh) => {
      sh.uniforms.uT = { value: 0 }; waterMat.userData.shader = sh;
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nuniform float uT;').replace('#include <begin_vertex>', `#include <begin_vertex>
        transformed.z += sin(position.x * 22.0 + uT * 3.1) * 0.004 + sin(position.y * 17.0 - uT * 2.3) * 0.004;`);
    };
    this.water = new THREE.Mesh(new THREE.CircleGeometry(1, 64, 0, Math.PI * 2), waterMat);
    this.water.rotation.x = -Math.PI / 2; this.water.visible = false; this.water.renderOrder = 5;
    S.add(this.water);

    // ---------------------------------------------------- particles: spray, sparks, drips, smoke
    this._initParticles();
    this.root.traverse((o) => { if (o.isMesh) { o.frustumCulled = true; } });
    return this;
  }

  _initParticles() {
    const N = 1400;
    const geo = new THREE.BufferGeometry();
    this.pPos = new Float32Array(N * 3); this.pVel = new Float32Array(N * 3); this.pLife = new Float32Array(N); this.pKind = new Float32Array(N); this.pSize = new Float32Array(N);
    geo.setAttribute('position', new THREE.BufferAttribute(this.pPos, 3));
    geo.setAttribute('life', new THREE.BufferAttribute(this.pLife, 1));
    geo.setAttribute('kind', new THREE.BufferAttribute(this.pKind, 1));
    geo.setAttribute('size', new THREE.BufferAttribute(this.pSize, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uPR: { value: 1 } },
      vertexShader: `attribute float life; attribute float kind; attribute float size; varying float vL; varying float vK; uniform float uPR;
        void main(){ vL = life; vK = kind; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mv;
          gl_PointSize = life > 0.0 ? size * uPR * (1.0 / -mv.z) : 0.0; }`,
      fragmentShader: `varying float vL; varying float vK; void main(){ vec2 c = gl_PointCoord - 0.5; float r = length(c); if (r > 0.5 || vL <= 0.0) discard;
        vec3 col; float a;
        if (vK < 0.5) { col = vec3(0.55, 0.7, 0.78) * 0.9; a = smoothstep(0.5, 0.1, r) * 0.55 * min(1.0, vL * 3.0); }
        else if (vK < 1.5) { col = mix(vec3(1.0, 0.5, 0.1), vec3(1.0, 0.95, 0.7), vL) * 18.0; a = smoothstep(0.5, 0.0, r) * vL; }
        else { col = vec3(0.07, 0.065, 0.06); a = smoothstep(0.5, 0.0, r) * 0.35 * min(1.0, vL); }
        gl_FragColor = vec4(col * a, a); }`,
    });
    this.pMat = mat;
    this.smokeMat = mat.clone(); this.smokeMat.blending = THREE.NormalBlending;
    this.particles = new THREE.Points(geo, mat);
    this.particles.frustumCulled = false; this.particles.renderOrder = 20;
    this.sphere.add(this.particles);
    this.pN = N; this.pNext = 0;
  }
  emit(kind, pos, vel, life, size) {
    const i = this.pNext; this.pNext = (this.pNext + 1) % this.pN;
    this.pPos[i * 3] = pos.x; this.pPos[i * 3 + 1] = pos.y; this.pPos[i * 3 + 2] = pos.z;
    this.pVel[i * 3] = vel.x; this.pVel[i * 3 + 1] = vel.y; this.pVel[i * 3 + 2] = vel.z;
    this.pLife[i] = life; this.pKind[i] = kind; this.pSize[i] = size;
  }
  sparks(pos, n = 30) {
    const v = new THREE.Vector3();
    for (let k = 0; k < n; k++) { v.set((Math.random() - 0.5) * 2.5, Math.random() * 2, (Math.random() - 0.5) * 2.5); this.emit(1, pos, v, 0.4 + Math.random() * 0.5, 6 + Math.random() * 6); }
  }

  // per-frame update: mirror systems state onto interior
  update(dt, t, st) {
    const { sub, sys, ap, inc } = st;
    // sub pose
    this.root.position.copy(sub.pos);
    this.root.quaternion.copy(sub.quat);
    // flood water plane: find height h s.t. spherical cap volume = flood (plus sub attitude tilt)
    const V = sub.floodL / 1000;
    if (V > 0.002) {
      const R = SPHERE_R;
      // below the deck grate volume counts first (cap under y=-0.62): solve numerically
      let lo = -R, hi = R;
      for (let i = 0; i < 20; i++) { const m = (lo + hi) / 2; const h = m + R; const vol = Math.PI * h * h * (3 * R - h) / 3; if (vol > V) hi = m; else lo = m; }
      const y = (lo + hi) / 2;
      this.water.visible = true;
      this.water.position.y = y;
      const r = Math.sqrt(Math.max(0.0001, R * R - y * y)) - 0.01;
      this.water.scale.set(r, r, 1);
      // keep level with gravity (counter sub pitch/roll)
      this.water.rotation.set(-Math.PI / 2 - sub.pitch, 0, sub.roll);
      if (this.water.material.userData.shader) this.water.material.userData.shader.uniforms.uT.value = t;
    } else this.water.visible = false;

    // particles: leak sprays
    const tmpV = new THREE.Vector3();
    for (const id in sys.pen) {
      const p = sys.pen[id];
      if (p.leakRate <= 0.0005) continue;
      const lp = this.leakPoints[id];
      const rate = Math.min(60, 4 + p.leakRate * 300);
      const nEmit = Math.floor(rate * dt + Math.random());
      const spd = Math.min(12, 1 + Math.sqrt(p.leakRate) * 8);
      for (let k = 0; k < nEmit; k++) {
        tmpV.copy(lp.dir).multiplyScalar(spd * (0.6 + Math.random() * 0.6)).add(new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)).multiplyScalar(spd * 0.25));
        this.emit(0, lp.pos, tmpV, 0.6 + Math.random() * 0.4, 10 + Math.random() * 18);
      }
    }
    // fire: sparks + smoke puffs near the source
    if (sys.fire.active) {
      if (Math.random() < dt * (4 + sys.fire.intensity * 20)) this.sparks(this.busBarPos, 6 + (Math.random() * 12) | 0);
      if (Math.random() < dt * 20 * sys.fire.intensity) this.emit(2, this.busBarPos, new THREE.Vector3((Math.random() - 0.5) * 0.2, 0.25, (Math.random() - 0.5) * 0.2), 3, 180);
    }
    if (st.sparkBurst) { this.sparks(st.sparkBurst, 40); st.sparkBurst = null; }
    for (let i = 0; i < this.pN; i++) {
      if (this.pLife[i] <= 0) continue;
      const k = this.pKind[i];
      this.pLife[i] -= dt * (k === 2 ? 0.25 : 1);
      const j = i * 3;
      if (k === 0) this.pVel[j + 1] -= 9.8 * dt; else if (k === 1) this.pVel[j + 1] -= 6 * dt; else this.pSize[i] += dt * 30;
      this.pPos[j] += this.pVel[j] * dt; this.pPos[j + 1] += this.pVel[j + 1] * dt; this.pPos[j + 2] += this.pVel[j + 2] * dt;
      const r2 = this.pPos[j] ** 2 + this.pPos[j + 1] ** 2 + this.pPos[j + 2] ** 2;
      if (r2 > (SPHERE_R - 0.04) ** 2 && k !== 2) { this.pLife[i] = k === 0 ? Math.min(this.pLife[i], 0.05) : 0; this.pVel[j] *= -0.2; this.pVel[j + 1] *= -0.2; this.pVel[j + 2] *= -0.2; }
    }
    const g = this.particles.geometry;
    g.attributes.position.needsUpdate = true; g.attributes.life.needsUpdate = true; g.attributes.kind.needsUpdate = true; g.attributes.size.needsUpdate = true;

    // glass condensation + wet rivulets near leaking viewport
    for (const m of this.glass) {
      m.userData.cond.value = sys.condensation;
      m.userData.wet.value = sys.pen.VP.leakRate > 0 ? 1 : 0;
      if (m.userData.shader) m.userData.shader.uniforms.uT.value = t;
    }

    // lighting
    const cabinOn = sys.powered('CABIN');
    const emerg = !cabinOn;
    const L = cabinOn ? sys.lights.cabin : 0;
    const flick = sys.fire.active || (sub.floodL > 150) ? (Math.random() < 0.05 ? 0.2 : 1) : 1;
    for (const l of this.cabinLights) l.intensity = 1.2 * L * flick;
    if (this._acrylicL) this._acrylicL.value = 0.08 + L * 2.2 * flick;
    for (const w of this.washers) { w.intensity = 1.6 * L * flick; w.userData.puck.material.color.setRGB(1, 0.94, 0.86).multiplyScalar(0.05 + L * 6 * flick); }
    this.keyLight.intensity = 3.5 * L * flick;
    this.stripMat.color.setRGB(1, 0.94, 0.86).multiplyScalar((0.1 + L * 2.4) * flick);
    const alarm = st.alarmLevel || 0;
    const pulse = alarm > 0 ? (Math.sin(t * (alarm > 1 ? 9 : 4.5)) * 0.5 + 0.5) : 0;
    const redLvl = Math.max(emerg ? 0.55 : 0, pulse * (alarm > 1 ? 1 : 0.55));
    for (let i = 0; i < this.alarmLights.length; i++) {
      const a = this.alarmLights[i];
      if (a.isLight) a.intensity = redLvl * 1.6;
      else a.material.color.setRGB(0.1 + redLvl * 12, redLvl * 0.6, 0);
    }
    this.hemi.intensity = 0.06 + L * 0.1;
    // sea light through window
    const a = st.ambient;
    const sl = Math.min(1.5, (a.r + a.g + a.b) * 0.5);
    this.seaLight.color.setRGB(a.r * 0.4 + 0.02, a.g * 0.8 + 0.03, a.b + 0.05).multiplyScalar(1);
    this.seaLight.intensity = sl * 0.8 + (st.extLight || 0) * 0.08;
    this.screenGlow.intensity = sys.powered('NAV') ? 0.45 : 0.05;

    // LEDs
    const setLed = (k, on, col = 0x00ff66) => { const m = this.leds[k]; if (!m) return; m.material.color.set(on ? col : 0x0c0c0c); if (on) m.material.color.multiplyScalar(4); };
    setLed('AP', ap.engaged, 0x33ff66); setLed('HDG', ap.hdg.on && ap.engaged); setLed('DPT', ap.depth.on && ap.engaged); setLed('ALT', ap.alt.on && ap.engaged);
    setLed('SPD', ap.speed.on && ap.engaged); setLed('STN', ap.station.on && ap.engaged); setLed('NAV', ap.nav.on && ap.engaged); setLed('OAS', ap.oas.on, ap.oas.threat > 0.3 ? 0xff3300 : 0x00ff66);
    setLed('LT1', sys.lights.main > 0 && sys.powered('LIGHT'), 0xffffff); setLed('LT2', sys.lights.flood > 0 && sys.powered('LIGHT'), 0xffffff);
    setLed('VBT', sub.vbtCmd !== 0, sub.vbtCmd > 0 ? 0x33aaff : 0xffaa00); setLed('TRM', sub.trimCmd !== 0, 0xffaa00);
    setLed('ALM', alarm > 0 && Math.sin(t * 8) > 0, 0xff2200); setLed('CAM', sys.powered('CAM'), 0x33ff66);
    // annunciators
    const warnOn = alarm > 1 && Math.sin(t * 7) > -0.2, cautOn = alarm > 0;
    this.annWarn.material[4].color.setScalar(warnOn ? 6 : 0.15);
    this.annCaut.material[4].color.setScalar(cautOn ? 4 : 0.15);
    // breakers
    for (const id in this.breakerMeshes) {
      const b = sys.breakers[id], m = this.breakerMeshes[id];
      m.lever.position.y = b.closed && !b.tripped ? 0.008 : b.tripped ? 0.0 : -0.008;
      m.led.material.color.set(b.tripped ? 0xff6600 : b.closed && sys.powered(id) ? 0x00ff66 : 0x220000).multiplyScalar(b.tripped && Math.sin(t * 6) < 0 ? 0.2 : 3);
    }
    // gauges
    const needle = (name, v) => { const G = this.gauges[name]; const f = THREE.MathUtils.clamp(v / G.max, 0, 1.02); const target = -(Math.PI * 0.75 + f * Math.PI * 1.5) + Math.PI / 2 + Math.PI; G.pivot.rotation.z += (target - G.pivot.rotation.z) * Math.min(1, dt * 6); };
    needle('depth', sub.depth + sys.sensors.depthDrift * 0.2);
    needle('o2', sys.o2RegOK && sys.o2Bottles > 0 && sys.powered('LSS') ? sys.o2Flow + Math.sin(t * 3) * 0.01 : 0);
    needle('cabinP', sys.cabinP);
    needle('volt', sys.bat.A.online ? sys.bat.A.v : sys.bat.B.online ? sys.bat.B.v : 0);
    // joystick & wheel
    if (this.stick) {
      const inp = st.pilot;
      this.stick.rotation.x += ((inp.surge * 0.35) - this.stick.rotation.x) * Math.min(1, dt * 10);
      this.stick.rotation.z += ((-inp.yaw * 0.35) - this.stick.rotation.z) * Math.min(1, dt * 10);
      this.heaveWheel.rotation.x += inp.heave * dt * 6;
    }
    // scrubber fan
    if (this.fanBlades && sys.scrubber.fan && sys.scrubber.fanOK && sys.powered('LSS')) this.fanBlades.rotation.y += dt * 40;
  }
}
