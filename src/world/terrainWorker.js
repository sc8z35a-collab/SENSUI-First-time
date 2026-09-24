// Terrain meshing worker: naive Surface Nets over the shared density field.
// Produces seamless chunks (identical boundary vertices), analytic normals and
// baked per-vertex ambient occlusion.
import { density } from './density.js';

function mesh(ox, oy, oz, n, v) {
  const S = n + 2; // samples from index 0..n+1 => positions origin + (i-1)*v ... we use -1..n
  // sample indices: s in [0, S] correspond to world i = s-1 in [-1, n+1]
  const SS = S + 1;
  const field = new Float32Array(SS * SS * SS);
  let any = 0, solid = 0;
  for (let k = 0; k < SS; k++) {
    const z = oz + (k - 1) * v;
    for (let j = 0; j < SS; j++) {
      const y = oy + (j - 1) * v;
      for (let i = 0; i < SS; i++) {
        const x = ox + (i - 1) * v;
        const d = density(x, y, z);
        field[i + SS * (j + SS * k)] = d;
        any++; if (d > 0) solid++;
      }
    }
  }
  if (solid === 0 || solid === any) return null;

  // cells c in [0, S) (world cell index c-1 in [-1, n])
  const C = S;
  const cellIndex = new Int32Array(C * C * C).fill(-1);
  const pos = [];
  const idx = (i, j, k) => i + SS * (j + SS * k);
  const corner = new Float32Array(8);
  const cOff = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
  const edges = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
  let vcount = 0;
  for (let k = 0; k < C; k++) for (let j = 0; j < C; j++) for (let i = 0; i < C; i++) {
    let mask = 0;
    for (let c = 0; c < 8; c++) {
      const d = field[idx(i + cOff[c][0], j + cOff[c][1], k + cOff[c][2])];
      corner[c] = d;
      if (d > 0) mask |= 1 << c;
    }
    if (mask === 0 || mask === 255) continue;
    let sx = 0, sy = 0, sz = 0, cnt = 0;
    for (let e = 0; e < 12; e++) {
      const a = edges[e][0], b = edges[e][1];
      const da = corner[a], db = corner[b];
      if ((da > 0) === (db > 0)) continue;
      const t = da / (da - db);
      sx += cOff[a][0] + (cOff[b][0] - cOff[a][0]) * t;
      sy += cOff[a][1] + (cOff[b][1] - cOff[a][1]) * t;
      sz += cOff[a][2] + (cOff[b][2] - cOff[a][2]) * t;
      cnt++;
    }
    cellIndex[i + C * (j + C * k)] = vcount++;
    pos.push(ox + (i - 1 + sx / cnt) * v, oy + (j - 1 + sy / cnt) * v, oz + (k - 1 + sz / cnt) * v);
  }

  // quads for edges whose base sample lies in world [0, n]  => sample index [1, n+1]
  // (one extra ring on the positive side overlaps the neighbour => hides LOD cracks)
  const indices = [];
  const cid = (i, j, k) => cellIndex[i + C * (j + C * k)];
  const lim = n + 1;
  for (let k = 1; k <= lim; k++) for (let j = 1; j <= lim; j++) for (let i = 1; i <= lim; i++) {
    const d0 = field[idx(i, j, k)];
    const s0 = d0 > 0;
    // x edge
    {
      const s1 = field[idx(i + 1, j, k)] > 0;
      if (s0 !== s1) {
        const a = cid(i, j - 1, k - 1), b = cid(i, j, k - 1), c = cid(i, j, k), d = cid(i, j - 1, k);
        if (a >= 0 && b >= 0 && c >= 0 && d >= 0) {
          if (s0) indices.push(a, b, c, a, c, d); else indices.push(a, c, b, a, d, c);
        }
      }
    }
    // y edge
    {
      const s1 = field[idx(i, j + 1, k)] > 0;
      if (s0 !== s1) {
        const a = cid(i - 1, j, k - 1), b = cid(i, j, k - 1), c = cid(i, j, k), d = cid(i - 1, j, k);
        if (a >= 0 && b >= 0 && c >= 0 && d >= 0) {
          if (s0) indices.push(a, c, b, a, d, c); else indices.push(a, b, c, a, c, d);
        }
      }
    }
    // z edge
    {
      const s1 = field[idx(i, j, k + 1)] > 0;
      if (s0 !== s1) {
        const a = cid(i - 1, j - 1, k), b = cid(i, j - 1, k), c = cid(i, j, k), d = cid(i - 1, j, k);
        if (a >= 0 && b >= 0 && c >= 0 && d >= 0) {
          if (s0) indices.push(a, b, c, a, c, d); else indices.push(a, c, b, a, d, c);
        }
      }
    }
  }
  if (indices.length === 0) return null;

  // compact: keep only referenced vertices
  const remap = new Int32Array(vcount).fill(-1);
  let nv = 0;
  for (let q = 0; q < indices.length; q++) { const o = indices[q]; if (remap[o] < 0) remap[o] = nv++; indices[q] = remap[o]; }
  const P = new Float32Array(nv * 3);
  for (let o = 0; o < vcount; o++) {
    const r = remap[o]; if (r < 0) continue;
    P[r * 3] = pos[o * 3]; P[r * 3 + 1] = pos[o * 3 + 1]; P[r * 3 + 2] = pos[o * 3 + 2];
  }
  const Nrm = new Float32Array(nv * 3);
  const AO = new Float32Array(nv);
  const e = 0.4;
  for (let q = 0; q < nv; q++) {
    const x = P[q * 3], y = P[q * 3 + 1], z = P[q * 3 + 2];
    let gx = density(x + e, y, z) - density(x - e, y, z);
    let gy = density(x, y + e, z) - density(x, y - e, z);
    let gz = density(x, y, z + e) - density(x, y, z - e);
    const l = Math.hypot(gx, gy, gz) || 1;
    // outward normal points toward water (decreasing density)
    gx = -gx / l; gy = -gy / l; gz = -gz / l;
    Nrm[q * 3] = gx; Nrm[q * 3 + 1] = gy; Nrm[q * 3 + 2] = gz;
    const s1 = density(x + gx * 1.2, y + gy * 1.2, z + gz * 1.2);
    const s2 = density(x + gx * 3.5, y + gy * 3.5, z + gz * 3.5);
    const s3 = density(x + gx * 9, y + gy * 9, z + gz * 9);
    let ao = Math.min(1, -s1 / 1.2) * 0.35 + Math.min(1, -s2 / 3.5) * 0.35 + Math.min(1, -s3 / 9) * 0.3;
    AO[q] = Math.max(0.05, Math.min(1, ao));
  }
  const I = nv > 65535 ? new Uint32Array(indices) : new Uint16Array(indices);
  return { P, N: Nrm, AO, I };
}

self.onmessage = (ev) => {
  const { id, ox, oy, oz, n, v } = ev.data;
  const r = mesh(ox, oy, oz, n, v);
  if (!r) { self.postMessage({ id, empty: true }); return; }
  self.postMessage({ id, P: r.P, N: r.N, AO: r.AO, I: r.I }, [r.P.buffer, r.N.buffer, r.AO.buffer, r.I.buffer]);
};
