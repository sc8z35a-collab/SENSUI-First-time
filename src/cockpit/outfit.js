// Interior outfitting of the titanium pressure sphere.
//
// Real deep-diving HOVs (Shinkai 6500, Alvin, Limiting Factor, Fendouzhe) are not bare painted
// spheres inside: the titanium is lined with removable insulation / trim panels on a stand-off
// frame, with harnesses in trays, gauges and switch panels bolted to rails, grab handles,
// stowage nets, placards and the pilot's personal kit. This module builds that layer.
//
// The panel lining is a single procedurally generated spherical-shell mesh:
//   - panels are latitude/longitude patches with a bevelled edge and a small pillowing
//   - gaps between panels expose the darker frame (separate backing shell)
//   - every panel skips the viewport cut-outs (with a trim ring around each port)
//   - screw heads at the panel corners are one InstancedMesh
// Everything is baked in the sphere's local frame.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { canvasTexture, placard, FONT, MONO } from './canvasTex.js';

const up = new THREE.Vector3(0, 1, 0);
const dirFrom = (lat, lon) => new THREE.Vector3(Math.cos(lat) * Math.sin(lon), Math.sin(lat), -Math.cos(lat) * Math.cos(lon));

// angular distance from a direction to the nearest viewport axis, minus its half-angle
function portClearance(d, ports) {
  let m = Infinity;
  for (const p of ports) m = Math.min(m, Math.acos(THREE.MathUtils.clamp(d.dot(p.dir), -1, 1)) - p.half);
  return m;
}

// One lining panel: a (lat0..lat1) x (lon0..lon1) patch at radius r, pushed inward at the centre
// ("pillow") and bevelled towards the edges. Returns null if it would intersect a viewport.
function panelGeometry(lat0, lat1, lon0, lon1, r, { gap = 0.004, bevel = 0.012, pillow = 0.006, seg = 12, ports, portMargin = 0.0, rnd = Math.random }) {
  const dl = gap / r;
  lat0 += dl; lat1 -= dl; lon0 += dl / Math.max(0.2, Math.cos((lat0 + lat1) / 2)); lon1 -= dl / Math.max(0.2, Math.cos((lat0 + lat1) / 2));
  const nu = seg, nv = seg;
  const pos = [], uv = [], idx = [], edge = [], tint = [];
  // each panel is cut from a different part of the "sheet" so dirt/stains never repeat visibly,
  // and has its own slight paint-batch / fading difference
  const ou = rnd() * 8, ov = rnd() * 8, flip = rnd() < 0.5;
  const pt = [0.94 + rnd() * 0.08, rnd(), rnd()]; // brightness, wear amount, grime amount
  const clear = [];
  for (let j = 0; j <= nv; j++) {
    for (let i = 0; i <= nu; i++) {
      const u = i / nu, v = j / nv;
      const lat = lat0 + (lat1 - lat0) * v, lon = lon0 + (lon1 - lon0) * u;
      const d = dirFrom(lat, lon);
      clear.push(portClearance(d, ports) >= portMargin);
      // edge distance in [0..0.5]
      const e = Math.min(u, 1 - u, v, 1 - v);
      const bev = Math.min(1, e * nu / 1.2); // 0 at edge -> 1 inside first segment
      const inset = pillow * Math.sin(Math.PI * u) * Math.sin(Math.PI * v) + bevel * (1 - Math.sqrt(bev)) * -0.35;
      const rr = r - inset - 0.004 * bev;
      pos.push(d.x * rr, d.y * rr, d.z * rr);
      // metric UVs (1 unit ≈ 0.45 m) so texel density is constant over the sphere
      const U = u * (lon1 - lon0) * Math.cos((lat0 + lat1) / 2) * r * 3.3, V = v * (lat1 - lat0) * r * 3.3;
      uv.push(ou + (flip ? V : U), ov + (flip ? U : V));
      // distance to the panel edge in metres (edge wear, handling marks, dirt in the seams)
      edge.push(Math.min(u * (lon1 - lon0) * Math.cos(lat) * r, (1 - u) * (lon1 - lon0) * Math.cos(lat) * r, v * (lat1 - lat0) * r, (1 - v) * (lat1 - lat0) * r));
      tint.push(pt[0], pt[1], pt[2]);
    }
  }
  // drop only the triangles that intrude into a viewport cone (the trim ring hides the jagged edge)
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1;
    // keep a triangle unless it lies completely inside a port; the exact circular edge is cut
    // per-fragment by portDiscard() on the lining material (smooth, no staircase)
    if (clear[a] || clear[b] || clear[c]) idx.push(a, b, c);
    if (clear[b] || clear[d] || clear[c]) idx.push(b, d, c);
  }
  if (!idx.length) return null;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('edge', new THREE.Float32BufferAttribute(edge, 1));
  g.setAttribute('ptint', new THREE.Float32BufferAttribute(tint, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export function buildOutfit(S, { R, ports, mats, dark, floorY }) {
  const out = { handles: [], placards: [] };
  const rLining = R - 0.045;

  // ------------------------------------------------------------------ lining panels
  // Latitude bands (radians). The bottom (below the deck) and the hatch collar are not lined.
  const bands = [
    [-0.62, -0.34, 10], [-0.34, -0.06, 12], [-0.06, 0.22, 12], [0.22, 0.5, 10], [0.5, 0.78, 8], [0.78, 1.12, 5],
  ];
  const panelGeos = [], accentGeos = [];
  const screws = [];
  const rnd = mulberry(4242);
  for (const [la0, la1, n] of bands) {
    for (let k = 0; k < n; k++) {
      // stagger alternate bands like brickwork so seams don't line up (real panel layouts do this)
      const off = (bands.findIndex((b) => b[0] === la0) % 2) * 0.5;
      const lo0 = ((k + off) / n) * Math.PI * 2 - Math.PI, lo1 = ((k + 1 + off) / n) * Math.PI * 2 - Math.PI;
      const g = panelGeometry(la0, la1, lo0, lo1, rLining, { ports, rnd });
      if (!g) continue;
      // a few panels are the darker "service access" type
      (rnd() < 0.12 ? accentGeos : panelGeos).push(g);
      addScrews(screws, la0, la1, lo0, lo1, rLining - 0.004, ports);
    }
  }
  // lining materials: photographic panel PBR, cut exactly at the trim-ring radius
  mats = { ...mats, panel: panelMaterial(mats.panelTex, 0xd8d3c8, ports, 'a'), panelDark: panelMaterial(mats.panelTex, 0x6a6e73, ports, 'b') };
  const lining = new THREE.Mesh(mergeGeometries(panelGeos), mats.panel);
  lining.receiveShadow = true; lining.castShadow = false; lining.name = 'lining';
  S.add(lining);
  if (accentGeos.length) { const acc = new THREE.Mesh(mergeGeometries(accentGeos), mats.panelDark); acc.receiveShadow = true; S.add(acc); }
  // stand-off frame visible in the seams (slightly larger, dark)
  // theta measured from the top: lined band spans lat -0.62..1.12 -> theta 0.45..2.19
  const backing = new THREE.Mesh(new THREE.SphereGeometry(R - 0.03, 96, 48, 0, Math.PI * 2, Math.PI / 2 - 1.12, 1.74), dark);
  backing.material = dark.clone(); backing.material.side = THREE.BackSide;
  backing.material.onBeforeCompile = portDiscard(ports, 0.0);
  backing.material.customProgramCacheKey = () => 'backing-vp';
  S.add(backing);

  // screws (pan-head Torx, stainless)
  const screwGeo = new THREE.CylinderGeometry(0.0045, 0.005, 0.003, 10);
  const screwMesh = new THREE.InstancedMesh(screwGeo, mats.steel, screws.length);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion();
  screws.forEach((p, i) => { q.setFromUnitVectors(up, p.clone().normalize().negate()); m4.compose(p, q, new THREE.Vector3(1, 1, 1)); screwMesh.setMatrixAt(i, m4); });
  S.add(screwMesh);

  // trim rings around the side & lower ports (black anodised, like the real bezels)
  for (const p of ports) {
    const a = p.half + 0.03;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(Math.sin(a) * rLining, p.main ? 0.02 : 0.014, 12, 96), mats.anodised);
    ring.scale.z = 0.6;
    ring.position.copy(p.dir).multiplyScalar(Math.cos(a) * (rLining - 0.004));
    ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.dir);
    S.add(ring);
  }

  // hatch collar (bare machined titanium above the lining, as on real spheres)
  const collarLat = 1.12;
  const collar = new THREE.Mesh(new THREE.SphereGeometry(R - 0.02, 64, 8, 0, Math.PI * 2, 0, Math.PI / 2 - collarLat + 0.01), mats.titanium);
  collar.material = mats.titanium.clone(); collar.material.side = THREE.BackSide;
  S.add(collar);
  const collarEdge = new THREE.Mesh(new THREE.TorusGeometry(Math.cos(collarLat) * rLining, 0.014, 10, 96), mats.anodised);
  collarEdge.rotation.x = Math.PI / 2; collarEdge.position.y = Math.sin(collarLat) * rLining; S.add(collarEdge);

  // ------------------------------------------------------------------ cable trays with harnesses
  // Two horizontal trays at shoulder height running around the sphere (behind the pilot), plus
  // vertical drops to the console. Harnesses are bundled tubes held by velcro straps.
  const trayGeos = [], harness = [];
  for (const lat of [0.3, -0.18]) {
    const pts = [];
    for (let a = 0.95; a <= 2 * Math.PI - 0.95; a += 0.08) pts.push(dirFrom(lat, a).multiplyScalar(rLining - 0.018));
    const curve = new THREE.CatmullRomCurve3(pts);
    const tray = new THREE.TubeGeometry(curve, 120, 0.012, 4, false);
    tray.scale(1, 1.6, 1);
    trayGeos.push(tray);
    for (let c = 0; c < 4; c++) {
      const o = (c - 1.5) * 0.009;
      const cp = pts.map((p) => p.clone().multiplyScalar(1 - 0.015).add(new THREE.Vector3(0, o, 0)));
      harness.push({ geo: new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cp), 120, c === 1 ? 0.006 : 0.0045, 6), orange: c === 1 });
    }
  }
  S.add(new THREE.Mesh(mergeGeometries(trayGeos), mats.anodised));
  const hBlack = harness.filter((h) => !h.orange).map((h) => h.geo), hOr = harness.filter((h) => h.orange).map((h) => h.geo);
  const hb = new THREE.Mesh(mergeGeometries(hBlack), mats.cable); hb.castShadow = true; S.add(hb);
  const ho = new THREE.Mesh(mergeGeometries(hOr), mats.cableOr); ho.castShadow = true; S.add(ho);
  // straps
  const strapGeo = new THREE.TorusGeometry(0.02, 0.003, 4, 12);
  const straps = [];
  for (const lat of [0.3, -0.18]) for (let a = 1.1; a < 2 * Math.PI - 1.1; a += 0.35) straps.push(dirFrom(lat, a).multiplyScalar(rLining - 0.024));
  const strapMesh = new THREE.InstancedMesh(strapGeo, mats.strap, straps.length);
  straps.forEach((p, i) => { q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(-p.z, 0, p.x).normalize()); m4.compose(p, q, new THREE.Vector3(1, 1, 1)); strapMesh.setMatrixAt(i, m4); });
  S.add(strapMesh);

  // ------------------------------------------------------------------ grab handles (overhead & either side of the hatch)
  const handleGeo = (() => {
    const c = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.09, 0, 0), new THREE.Vector3(-0.08, 0.035, 0), new THREE.Vector3(0, 0.045, 0), new THREE.Vector3(0.08, 0.035, 0), new THREE.Vector3(0.09, 0, 0)]);
    return new THREE.TubeGeometry(c, 24, 0.009, 10);
  })();
  for (const [lat, lon] of [[0.95, 0.6], [0.95, -0.6], [0.62, 1.6], [0.62, -1.6], [0.5, 2.5], [0.5, -2.5]]) {
    const d = dirFrom(lat, lon), h = new THREE.Mesh(handleGeo, mats.handle);
    h.position.copy(d).multiplyScalar(rLining - 0.005);
    h.quaternion.setFromUnitVectors(up, d.clone().negate());
    h.rotateY(Math.PI / 2 + lon);
    h.castShadow = true; S.add(h);
  }

  // ------------------------------------------------------------------ placards & markings
  const plac = (text, sub, lat, lon, w = 0.12, h = 0.035, opt = {}) => {
    const t = placard(text, { w: 512, h: Math.round(512 * h / w), sub, bg: opt.bg ?? '#1a1d20', fg: opt.fg ?? '#d8dde2', font: opt.font ?? `bold 52px ${FONT}`, border: opt.border ?? false });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: 0.55, metalness: 0.1 }));
    const d = dirFrom(lat, lon);
    m.position.copy(d).multiplyScalar(rLining - 0.012);
    m.lookAt(0, m.position.y * 0.9, 0);
    S.add(m); out.placards.push(m);
    return m;
  };
  plac('ハッチ開放禁止 — 船内圧確認', 'DO NOT OPEN HATCH UNTIL CABIN P = 1 ATM', 0.72, 0, 0.2, 0.045, { bg: '#b3120f', fg: '#fff' });
  plac('非常用呼吸器', 'EMERGENCY BREATHING APPARATUS', 0.05, 2.0, 0.14, 0.035, { bg: '#f2b400', fg: '#111' });
  plac('消火器', 'FIRE EXTINGUISHER CO2', -0.12, 2.3, 0.1, 0.03, { bg: '#b3120f', fg: '#fff' });
  plac('O2 供給系統', 'OXYGEN — NO OIL / GREASE', 0.08, -2.0, 0.13, 0.035, { bg: '#1f6a3a', fg: '#fff' });
  plac('DSV-11 わだつみ', 'JAMSTEC-TYPE HOV · HULL No. 011', 0.44, 0.9, 0.14, 0.04);
  plac('耐圧殻 Ti-6Al-4V ELI', 'PRESSURE HULL Ø2.10 m · t=102 mm · TEST 12,650 m', 0.44, -0.9, 0.15, 0.04);

  // ------------------------------------------------------------------ pilot kit: first-aid box, stowage net, clipboard, water
  const kit = new THREE.Group(); S.add(kit);
  const fa = new THREE.Mesh(new RoundedBoxGeometry(0.16, 0.1, 0.07, 3, 0.01), mats.firstAid);
  const faFront = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.1), new THREE.MeshStandardMaterial({ map: canvasTexture(256, 160, (c, w, h) => { c.fillStyle = '#e8e6e0'; c.fillRect(0, 0, w, h); c.fillStyle = '#1f8a3a'; c.fillRect(w / 2 - 22, 30, 44, 100); c.fillRect(w / 2 - 50, 58, 100, 44); c.fillStyle = '#111'; c.font = `bold 20px ${FONT}`; c.textAlign = 'center'; c.fillText('FIRST AID 救急', w / 2, 152); }), roughness: 0.6 }));
  faFront.position.z = 0.0351; fa.add(faFront);
  placeOnWall(fa, dirFrom(-0.05, 2.75), rLining - 0.04);
  kit.add(fa);
  // stowage net (tensioned bungee grid) with a water bottle and a clipboard behind it
  const net = new THREE.Group();
  const bottle = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.16, 6, 16), mats.bottle); bottle.position.set(-0.06, 0, -0.03); net.add(bottle);
  const board = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 0.006), mats.clipboard); board.position.set(0.06, 0.01, -0.035); net.add(board);
  const sheet = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.19), new THREE.MeshStandardMaterial({ map: diveLogTexture(), roughness: 0.9 })); sheet.position.set(0.06, 0.0, -0.031); net.add(sheet);
  const bungee = [];
  for (let i = 0; i <= 6; i++) bungee.push(new THREE.BoxGeometry(0.3, 0.004, 0.004).translate(0, -0.12 + i * 0.04, 0));
  for (let i = 0; i <= 7; i++) bungee.push(new THREE.BoxGeometry(0.004, 0.25, 0.004).translate(-0.15 + i * 0.043, 0, 0));
  net.add(new THREE.Mesh(mergeGeometries(bungee), mats.cable));
  placeOnWall(net, dirFrom(0.0, -2.75), rLining - 0.05);
  kit.add(net);

  // ------------------------------------------------------------------ deck details: kick plates and floor light strip
  const kick = new THREE.Mesh(new THREE.CylinderGeometry(Math.sqrt(R * R - floorY * floorY) - 0.03, Math.sqrt(R * R - floorY * floorY) - 0.03, 0.06, 64, 1, true), mats.panelDark);
  kick.material = new THREE.MeshStandardMaterial({ color: 0x2a2d31, map: mats.panelTex.map, normalMap: mats.panelTex.normal, roughnessMap: mats.panelTex.orm, roughness: 1, metalness: 0.2, side: THREE.BackSide });
  kick.position.y = floorY + 0.03; S.add(kick);
  const floorGlow = new THREE.Mesh(new THREE.TorusGeometry(Math.sqrt(R * R - floorY * floorY) - 0.05, 0.004, 4, 96), new THREE.MeshBasicMaterial({ color: 0x0a2a3a, toneMapped: false }));
  floorGlow.rotation.x = Math.PI / 2; floorGlow.position.y = floorY + 0.005; S.add(floorGlow);
  out.floorGlow = floorGlow;

  return out;
}

// Painted aluminium lining panel. Uses the baked photographic set (albedo / ORM / normal) plus:
//  - per-panel brightness, wear and grime amounts (attribute ptint)
//  - edge wear: paint rubbed to a glossier, slightly darker, dirtier band along the edges where
//    panels are handled and dust collects in the seams (attribute edge, metres)
//  - micro-roughness breakup so specular highlights are never uniform
function panelMaterial(T, color, ports, key) {
  const m = new THREE.MeshStandardMaterial({ color, map: T.map, normalMap: T.normal, roughnessMap: T.orm, aoMap: T.orm, roughness: 1, metalness: 0, aoMapIntensity: 1 });
  m.normalScale.set(1.6, 1.6);
  const discard = portDiscard(ports, 0.03);
  m.onBeforeCompile = (sh) => {
    discard(sh);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float edge; attribute vec3 ptint; varying float vEdge; varying vec3 vPt;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvEdge = edge; vPt = ptint;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vEdge; varying vec3 vPt;')
      .replace('#include <map_fragment>', `#include <map_fragment>
        float edgeBand = 1.0 - smoothstep(0.004, 0.035, vEdge);     // ~3 cm band along the edges
        float seam = 1.0 - smoothstep(0.0, 0.008, vEdge);           // dirt packed right at the seam
        diffuseColor.rgb *= vPt.x;                                   // paint batch / fading
        diffuseColor.rgb *= 1.0 - 0.10 * edgeBand * (0.4 + vPt.y) - 0.45 * seam;
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.93, 0.9, 0.84), vPt.z * 0.5);`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
        roughnessFactor = clamp(roughnessFactor - 0.12 * edgeBand * vPt.y + 0.08 * vPt.z, 0.12, 0.95);`);
  };
  m.customProgramCacheKey = () => 'lining-photo-' + key;
  return m;
}

function placeOnWall(obj, d, r) {
  obj.position.copy(d).multiplyScalar(r);
  obj.lookAt(0, obj.position.y, 0);
}

function addScrews(list, la0, la1, lo0, lo1, r, ports) {
  const mlat = (la1 - la0) * 0.12, mlon = (lo1 - lo0) * 0.1;
  for (const la of [la0 + mlat, la1 - mlat]) for (const lo of [lo0 + mlon, lo1 - mlon]) {
    const d = dirFrom(la, lo);
    if (portClearance(d, ports) > 0.06) list.push(d.multiplyScalar(r));
  }
}

// discard fragments inside viewport cones (for shells that must not cover the ports)
function portDiscard(ports, extra) {
  return (sh) => {
    sh.uniforms.uVp = { value: ports.map((v) => v.dir) };
    sh.uniforms.uVpCos = { value: ports.map((v) => Math.cos(v.half + extra)) };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vLocalP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvLocalP = position;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>\nvarying vec3 vLocalP; uniform vec3 uVp[4]; uniform float uVpCos[4];`)
      .replace('void main() {', 'void main() {\n  vec3 ld = normalize(vLocalP);\n  for (int i = 0; i < 4; i++) if (dot(ld, uVp[i]) > uVpCos[i]) discard;');
  };
}

function diveLogTexture() {
  return canvasTexture(280, 380, (c, w, h) => {
    c.fillStyle = '#f4f1e8'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#222'; c.font = `bold 20px ${FONT}`; c.fillText('潜航記録 DIVE LOG', 14, 30);
    c.font = `13px ${MONO}`;
    const rows = ['DIVE No. 1437', 'PILOT  ______', 'LAUNCH 09:12', 'VBT    150 L', 'WT D2 A2', 'O2  2x2200 L', 'LiOH  1+2', 'BATT A 100% B 100%', '', 'CHECKLIST', '[x] HATCH SEAL', '[x] O2 FLOW 0.4', '[x] SCRUBBER FAN', '[x] UQC CHECK', '[x] LAMPS', '[ ] ______'];
    rows.forEach((r, i) => c.fillText(r, 14, 58 + i * 19));
    c.strokeStyle = '#8aa'; c.lineWidth = 1; for (let y = 64; y < h; y += 19) { c.beginPath(); c.moveTo(10, y + 4); c.lineTo(w - 10, y + 4); c.stroke(); }
  });
}

function mulberry(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
