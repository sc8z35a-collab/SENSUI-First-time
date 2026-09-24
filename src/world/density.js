// World geology. A signed-density field (approximately a signed distance in metres,
// positive = solid rock / sediment, negative = water). Shared by main thread (collision,
// sonar, altimeter) and terrain meshing workers, so it must be pure + deterministic.
//
// Geography (y = 0 is sea level, y negative = depth):
//   - Start: continental shelf ~60 m deep, sunlit sand + rock outcrops, an old wreck.
//   - ~250 m east: shelf break. A colossal trench wall drops in cliffs and ledges
//     all the way to a hadal floor at 10 935 m (Challenger Deep depth).
//   - Each ledge hosts a landmark at a characteristic depth (cold-water corals,
//     whale fall, hydrothermal vents, nodule field, destroyer wreck, bait lander).

import { createNoise } from '../core/noise.js';

export const SEED = 20260924;
const N = createNoise(SEED);

export const FLOOR_DEPTH = -10935;

// Profile control points: [horizontal distance from trench axis (m), depth (m)]
// Pairs with a small depth change are ledges; large jumps are cliffs.
const PROFILE = [
  [1600, -75],
  [1510, -170],
  [1450, -600],
  [1370, -625],
  [1320, -1300],
  [1210, -1335],
  [1160, -2400],
  [1040, -2445],
  [990, -4000],
  [850, -4055],
  [800, -6000],
  [700, -6060],
  [650, -8000],
  [560, -8070],
  [470, -10500],
  [300, -10905],
  [0, -10935],
];

export function trenchCenterX(z) {
  return 1850 + 300 * Math.sin(z / 2400) + 120 * Math.sin(z / 830);
}

function smoother(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function smootherD(t) { return 30 * t * t * (t * (t - 2) + 1); }

// returns [height, dh/da]
const _pr = [0, 0];
export function profile(a) {
  if (a >= PROFILE[0][0]) {
    // continental shelf, gently rising away from the trench
    let h = -75 + (a - 1600) * 0.05;
    let g = 0.05;
    if (h > -30) { h = -30; g = 0; }
    _pr[0] = h; _pr[1] = g; return _pr;
  }
  for (let i = 0; i < PROFILE.length - 1; i++) {
    const a0 = PROFILE[i][0], a1 = PROFILE[i + 1][0];
    if (a <= a0 && a >= a1) {
      const h0 = PROFILE[i][1], h1 = PROFILE[i + 1][1];
      const span = a0 - a1;
      const t = (a0 - a) / span;
      _pr[0] = h0 + (h1 - h0) * smoother(t);
      // dh/da = (h1-h0) * s'(t) * dt/da, dt/da = -1/span
      _pr[1] = -(h1 - h0) * smootherD(t) / span;
      return _pr;
    }
  }
  _pr[0] = FLOOR_DEPTH; _pr[1] = 0; return _pr;
}

function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
function sstep(e0, e1, x) { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); }

// ---------------------------------------------------------------------------------
// Points of interest. Each gets a flattened pad in the density field so props sit
// convincingly on the seabed.
// ---------------------------------------------------------------------------------
function poiAt(a, z, depth, side = -1) {
  return { x: trenchCenterX(z) + side * a, z, y: depth };
}

export const POIS = [
  { id: 'wreck', name: '沈没貨物船「第三黎明丸」', nameEn: 'Wreck of the Reimei Maru No.3', ...poiAt(1820, 90, -64), r: 55, desc: '1944年に沈没した貨物船。船体は二つに折れ、珊瑚と魚群の住処になっている。' },
  { id: 'coral', name: '冷水性サンゴの庭', nameEn: 'Cold-water coral garden', ...poiAt(1405, -70, -612), r: 45, desc: 'ロフェリア等の冷水性サンゴが群生する中深層の岩棚。' },
  { id: 'whale', name: '鯨骨生物群集', nameEn: 'Whale fall', ...poiAt(1262, 40, -1322), r: 40, desc: 'マッコウクジラの遺骸。骨を分解するバクテリアマットと特殊な生物群集。' },
  { id: 'vents', name: '熱水噴出孔「ブラックスモーカー」', nameEn: 'Hydrothermal vent field', ...poiAt(1095, -40, -2430), r: 60, desc: '350℃を超える熱水が噴き出すチムニー群。近づき過ぎると船体が損傷する。' },
  { id: 'nodules', name: 'マンガン団塊原', nameEn: 'Manganese nodule field', ...poiAt(918, 60, -4040), r: 60, desc: '数百万年かけて成長した金属団塊が海底一面に転がる深海平原。' },
  { id: 'destroyer', name: '駆逐艦の残骸', nameEn: 'Destroyer wreck', ...poiAt(748, -30, -6045), r: 70, desc: '海戦で沈んだ駆逐艦。世界最深クラスの沈没船。' },
  { id: 'lander', name: '無人観測ランダー', nameEn: 'Baited lander', ...poiAt(610, 20, -8060), r: 40, desc: '研究船が投入した餌付き観測機。深海魚シンカイクサウオが集まる。' },
  { id: 'deep', name: 'チャレンジャー海淵 最深部', nameEn: 'Challenger Deep', ...poiAt(120, 0, -10925), r: 60, desc: '地球上で最も深い場所。水圧は1100気圧を超える。' },
];

// ---------------------------------------------------------------------------------
// Density field
// ---------------------------------------------------------------------------------
export function density(x, y, z) {
  const cx = trenchCenterX(z);
  const r = x - cx;
  const side = r > 0 ? 1 : 0;
  let a = Math.abs(r);

  // big buttresses & gullies that vary with depth
  const warp = N.fbm3(x * 0.0042, y * 0.0021, z * 0.0042, 3) * 75;
  // ledge meander along the trench
  const meander = N.fbm2(z * 0.0016 + side * 13.1, y * 0.0003, 2) * 90;
  a += warp + meander;

  const pr = profile(a);
  let h = pr[0];
  const g = pr[1];
  const slopeNorm = Math.sqrt(1 + g * g);
  const steep = clamp(Math.abs(g) / 1.6, 0, 1); // 0 flat .. 1 cliff

  // gentle undulation & sand ripples on flats
  const flatAmt = 1 - steep;
  if (flatAmt > 0.01) {
    h += flatAmt * (N.fbm2(x * 0.012, z * 0.012, 4) * 5.5
      + Math.sin(x * 0.55 + N.noise2(x * 0.03, z * 0.03) * 3.0) * 0.18);
  }

  let d = (h - y) / slopeNorm;

  // 3D rock: crags + overhangs on cliffs, sparse outcrops/boulders on flats
  const nearSurf = Math.abs(d) < 60;
  if (nearSurf) {
    const f = N.fbm3(x * 0.021, y * 0.021, z * 0.021, 4);
    const rid = N.ridge3(x * 0.045, y * 0.06, z * 0.045, 3);
    const cliffRock = (f * 16 + rid * 9 - 3) * steep;
    // outcrops on the flats: thresholded noise
    const o = N.fbm3(x * 0.03, y * 0.05, z * 0.03, 3);
    const outcrop = Math.max(0, o - 0.18) * 30 * flatAmt;
    const fine = N.noise3(x * 0.22, y * 0.22, z * 0.22) * 0.55;
    d += cliffRock + outcrop + fine;
  }

  // flattened pads for landmarks
  for (let i = 0; i < POIS.length; i++) {
    const p = POIS[i];
    const dx = x - p.x, dz = z - p.z;
    const hd2 = dx * dx + dz * dz;
    const R = p.r;
    if (hd2 < R * R * 4) {
      const dy = y - p.y;
      if (dy > -140 && dy < 140) {
        const hd = Math.sqrt(hd2);
        const w = sstep(R * 1.9, R * 0.9, hd) * sstep(140, 70, Math.abs(dy));
        const pad = (p.y + N.fbm2(x * 0.05, z * 0.05, 3) * 0.8) - y;
        d = d + (pad - d) * w;
      }
    }
  }
  return d;
}

// gradient (unnormalised) by central differences
export function gradient(x, y, z, e = 0.35, out = [0, 0, 0]) {
  out[0] = density(x + e, y, z) - density(x - e, y, z);
  out[1] = density(x, y + e, z) - density(x, y - e, z);
  out[2] = density(x, y, z + e) - density(x, y, z - e);
  const l = Math.hypot(out[0], out[1], out[2]) || 1;
  out[0] /= l; out[1] /= l; out[2] /= l;
  return out;
}

// Ray march through the field. Returns hit distance or -1.
export function raycast(ox, oy, oz, dx, dy, dz, maxDist, minStep = 0.4) {
  let t = 0;
  let prevD = density(ox, oy, oz);
  if (prevD > 0) return 0;
  while (t < maxDist) {
    const step = Math.max(minStep, -prevD * 0.7);
    const nt = Math.min(maxDist, t + step);
    const d = density(ox + dx * nt, oy + dy * nt, oz + dz * nt);
    if (d > 0) {
      // bisect
      let lo = t, hi = nt;
      for (let i = 0; i < 6; i++) {
        const m = (lo + hi) * 0.5;
        if (density(ox + dx * m, oy + dy * m, oz + dz * m) > 0) hi = m; else lo = m;
      }
      return (lo + hi) * 0.5;
    }
    prevD = d; t = nt;
    if (nt >= maxDist) break;
  }
  return -1;
}

// find seabed height at (x,z) scanning down from yTop
export function groundHeight(x, z, yTop = 0, yBottom = FLOOR_DEPTH - 50) {
  let y = yTop;
  let step = 4;
  let prev = density(x, y, z);
  if (prev > 0) return y;
  while (y > yBottom) {
    const ny = y - Math.max(step, -prev * 0.8);
    const d = density(x, ny, z);
    if (d > 0) {
      let lo = ny, hi = y;
      for (let i = 0; i < 12; i++) {
        const m = (lo + hi) * 0.5;
        if (density(x, m, z) > 0) lo = m; else hi = m;
      }
      return (lo + hi) * 0.5;
    }
    prev = d; y = ny;
  }
  return yBottom;
}

// Quick conservative test whether a box can contain the surface.
// Returns 0 = may contain surface, 1 = all solid, -1 = all water.
export function classifyBox(x0, y0, z0, size) {
  // sample coarse profile heights over the box area (expanded for warp+noise)
  let hmin = Infinity, hmax = -Infinity;
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    for (let k = 0; k <= steps; k++) {
      const x = x0 + (size * i) / steps, z = z0 + (size * k) / steps;
      const cx = trenchCenterX(z);
      const a = Math.abs(x - cx);
      // warp + meander max ~ 75 + 90 (fbm rarely reaches 1)
      for (let da = -170; da <= 170; da += 34) {
        const h = profile(Math.max(0, a + da))[0];
        if (h < hmin) hmin = h;
        if (h > hmax) hmax = h;
      }
    }
  }
  const margin = 45;
  if (y0 > hmax + margin) return -1;
  if (y0 + size < hmin - margin) return 1;
  return 0;
}
