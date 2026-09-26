// Multi-function display rendering (Canvas 2D -> textures on the cockpit screens).
// Screens refresh at ~12 Hz each, staggered, for a realistic avionics feel.
import { heading } from '../sim/autopilot.js';
import { pressureAt, temperatureAt, soundSpeed, salinityAt, toBar, zoneName, dissolvedO2 } from '../sim/env.js';
import { POIS } from '../world/density.js';
import { MONO, FONT } from './canvasTex.js';

const C = { bg: '#02070b', grid: '#0c2330', line: '#1d4c63', txt: '#9fe6ff', dim: '#4d8aa3', ok: '#3dff8a', warn: '#ffb000', alarm: '#ff3b30', white: '#e9f7ff', cyan: '#35d7ff', mag: '#ff5ce1' };

function frame(c, w, h, title, right = '') {
  c.fillStyle = C.bg; c.fillRect(0, 0, w, h);
  // subtle scanlines
  c.fillStyle = 'rgba(80,180,220,0.035)';
  for (let y = 0; y < h; y += 3) c.fillRect(0, y, w, 1);
  c.fillStyle = '#062030'; c.fillRect(0, 0, w, 26);
  c.fillStyle = C.cyan; c.font = `bold 18px ${MONO}`; c.textBaseline = 'middle'; c.textAlign = 'left';
  c.fillText(title, 10, 13);
  c.textAlign = 'right'; c.fillStyle = C.dim; c.fillText(right, w - 10, 13);
  c.textAlign = 'left';
}
function txt(c, s, x, y, col = C.txt, size = 16, align = 'left', font = MONO) { c.fillStyle = col; c.font = `bold ${size}px ${font}`; c.textAlign = align; c.textBaseline = 'middle'; c.fillText(s, x, y); }
function bar(c, x, y, w, h, f, col, bgc = '#0a1a22') { c.fillStyle = bgc; c.fillRect(x, y, w, h); c.fillStyle = col; c.fillRect(x, y, w * Math.max(0, Math.min(1, f)), h); c.strokeStyle = C.line; c.lineWidth = 1; c.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1); }
const fmt = (v, d = 0) => (Number.isFinite(v) ? v.toFixed(d) : '---');
const lvlCol = (v, w, a, inv = false) => (inv ? (v < a ? C.alarm : v < w ? C.warn : C.ok) : (v > a ? C.alarm : v > w ? C.warn : C.ok));

export class MFDRenderer {
  constructor(cockpit) {
    this.cp = cockpit;
    this.t = 0;
    this.k = 0;
    this.sonarImg = null;
    this.sonarSweep = 0;
    this.pages = { left: 'NAV', center: 'PFD', right: 'SYS' };
  }

  update(dt, st) {
    this.t += dt;
    this.sonarSweep += dt * 1.6;
    this.k++;
    const order = ['center', 'left', 'right', 'lss', 'cam'];
    // update 2 screens per frame, each screen ~every 2-3 frames
    for (let n = 0; n < 2; n++) {
      const id = order[(this.k * 2 + n) % order.length];
      const m = this.cp.mfd[id];
      if (!m) continue;
      const on = id === 'lss' ? st.sys.powered('LSS') : id === 'cam' ? st.sys.powered('CAM') : st.sys.powered('NAV');
      const c = m.ctx;
      if (!on) { c.fillStyle = '#000'; c.fillRect(0, 0, m.w, m.h); m.tex.needsUpdate = true; m.mesh.material.color.setScalar(1); continue; }
      const page = id === 'lss' ? 'LSS' : id === 'cam' ? 'CAM' : this.pages[id];
      this['draw' + page](c, m.w, m.h, st);
      // flicker on low bus voltage
      m.mesh.material.color.setScalar(st.sys.flash > 0 || (st.sub.floodL > 200 && Math.random() < 0.08) ? 0.4 : 1.25);
      m.tex.needsUpdate = true;
    }
  }

  // ---------------------------------------------------------------- primary flight display
  drawPFD(c, w, h, st) {
    const { sub, ap, sys } = st;
    const m = ap.m || {};
    frame(c, w, h, 'PFD  主飛行表示', ap.engaged ? 'AP ' + ap.status : 'MANUAL');
    const cx = w / 2, cy = 150;
    // attitude indicator
    c.save();
    c.beginPath(); c.arc(cx, cy, 95, 0, Math.PI * 2); c.clip();
    c.translate(cx, cy); c.rotate(-sub.roll);
    const pp = sub.pitch * 180 / Math.PI * 3.2;
    c.fillStyle = '#0c3a55'; c.fillRect(-200, -300 + pp, 400, 300);
    c.fillStyle = '#2b1a0c'; c.fillRect(-200, pp, 400, 300);
    c.strokeStyle = C.white; c.lineWidth = 2; c.beginPath(); c.moveTo(-200, pp); c.lineTo(200, pp); c.stroke();
    c.lineWidth = 1.2; c.font = `12px ${MONO}`; c.fillStyle = C.white; c.textAlign = 'center';
    for (let a = -30; a <= 30; a += 5) { if (!a) continue; const y = pp - a * 3.2; const L = a % 10 === 0 ? 30 : 15; c.beginPath(); c.moveTo(-L, y); c.lineTo(L, y); c.stroke(); if (a % 10 === 0) c.fillText(String(Math.abs(a)), L + 14, y); }
    c.restore();
    c.strokeStyle = C.warn; c.lineWidth = 3; c.beginPath(); c.moveTo(cx - 50, cy); c.lineTo(cx - 15, cy); c.lineTo(cx - 8, cy + 8); c.moveTo(cx + 50, cy); c.lineTo(cx + 15, cy); c.lineTo(cx + 8, cy + 8); c.stroke();
    c.strokeStyle = C.line; c.lineWidth = 2; c.beginPath(); c.arc(cx, cy, 95, 0, Math.PI * 2); c.stroke();
    // heading tape
    const hdg = m.hdg ?? heading(sub.yaw);
    c.save(); c.beginPath(); c.rect(cx - 150, 32, 300, 26); c.clip();
    for (let d = -60; d <= 60; d += 5) {
      const hh = Math.round(hdg / 5) * 5 + d;
      const x = cx + (hh - hdg) * 2.5;
      const v = ((hh % 360) + 360) % 360;
      c.strokeStyle = C.txt; c.beginPath(); c.moveTo(x, 58); c.lineTo(x, v % 10 === 0 ? 48 : 53); c.stroke();
      if (v % 30 === 0) txt(c, v === 0 ? 'N' : v === 90 ? 'E' : v === 180 ? 'S' : v === 270 ? 'W' : String(v / 10).padStart(2, '0'), x, 40, C.txt, 13, 'center');
    }
    c.restore();
    txt(c, fmt(hdg).padStart(3, '0') + '°', cx, 70, C.white, 18, 'center');
    if (ap.engaged && (ap.hdg.on || ap.nav.on)) { const bx = cx + (((ap.hdg.target - hdg + 540) % 360) - 180) * 2.5; c.fillStyle = C.mag; c.fillRect(bx - 4, 54, 8, 5); }
    // depth tape (right) & speed (left)
    txt(c, 'DEPTH', w - 58, 44, C.dim, 12, 'center');
    c.fillStyle = '#041620'; c.fillRect(w - 110, 55, 100, 190);
    const dep = m.depth ?? sub.depth;
    for (let k = -4; k <= 4; k++) {
      const dv = Math.round(dep / 10) * 10 + k * 10;
      const y = 150 + (dv - dep) * 2.2;
      if (y < 58 || y > 242) continue;
      c.strokeStyle = C.dim; c.beginPath(); c.moveTo(w - 110, y); c.lineTo(w - 96, y); c.stroke();
      txt(c, String(dv), w - 20, y, C.dim, 13, 'right');
    }
    c.fillStyle = '#000'; c.fillRect(w - 112, 136, 104, 28); c.strokeStyle = C.white; c.strokeRect(w - 112, 136, 104, 28);
    txt(c, fmt(dep, 1), w - 14, 150, sys.sensors.depth ? C.white : C.warn, 18, 'right');
    if (ap.engaged && ap.depth.on) txt(c, '▶' + fmt(ap.depth.target), w - 60, 256, C.mag, 13, 'center');
    const vz = m.vz ?? 0;
    txt(c, (vz >= 0 ? '▼' : '▲') + fmt(Math.abs(vz), 2) + ' m/s', w - 60, 272, Math.abs(vz) > 1.2 ? C.warn : C.txt, 13, 'center');
    // speed
    txt(c, 'SPEED', 58, 44, C.dim, 12, 'center');
    c.fillStyle = '#041620'; c.fillRect(10, 55, 96, 190);
    const u = m.u ?? 0;
    txt(c, fmt(u, 2), 58, 138, C.white, 22, 'center'); txt(c, 'm/s', 58, 160, C.dim, 12, 'center');
    txt(c, fmt(u * 1.944, 1) + ' kt', 58, 182, C.txt, 14, 'center');
    txt(c, 'ALT', 58, 206, C.dim, 12, 'center');
    txt(c, m.dvl ? fmt(m.alt, 1) + ' m' : 'NO LOCK', 58, 226, m.dvl ? (m.alt < 5 ? C.alarm : m.alt < 12 ? C.warn : C.ok) : C.warn, 15, 'center');
    // bottom strip
    const B = sub.trimState;
    txt(c, `BUOY ${B > 0 ? '+' : ''}${fmt(-B, 0)} kg`, 12, h - 44, Math.abs(B) > 150 ? C.warn : C.txt, 14);
    txt(c, `VBT ${fmt(sub.vbt)} L ${sub.vbtFlow > 0 ? '注水' : sub.vbtFlow < 0 ? '排水' : ''}`, 12, h - 24, C.txt, 14);
    txt(c, `TRIM ${fmt(sub.trim * 100)}%`, cx, h - 44, C.txt, 14, 'center');
    txt(c, `WT D${sub.weights.descent} A${sub.weights.ascent}`, cx, h - 24, C.txt, 14, 'center');
    const warn = ap.warn || (ap.oas.threat > 0.3 ? `障害物 ${fmt(ap.oas.dist)} m` : '');
    if (warn) { c.fillStyle = Math.sin(this.t * 8) > 0 ? '#3a0a00' : '#1a0400'; c.fillRect(w - 250, h - 56, 240, 44); txt(c, warn, w - 130, h - 34, C.warn, 15, 'center', FONT); }
    else txt(c, `P ${fmt(toBar(pressureAt(sub.depth)), 1)} bar`, w - 14, h - 34, C.txt, 15, 'right');
  }

  // ---------------------------------------------------------------- navigation / bathymetry
  drawNAV(c, w, h, st) {
    const { sub, ap, sys } = st;
    frame(c, w, h, 'NAV  航法', `RNG ${this.navRange || 400} m`);
    const R = this.navRange || 400;
    const cx = w / 2, cy = h / 2 + 18, sc = (h / 2 - 30) / R;
    // range rings
    c.strokeStyle = C.grid; c.lineWidth = 1;
    for (let r = 1; r <= 4; r++) { c.beginPath(); c.arc(cx, cy, (r / 4) * R * sc, 0, Math.PI * 2); c.stroke(); }
    // heading-up display
    const yaw = sub.yaw;
    const toScr = (x, z) => { const dx = x - sub.pos.x, dz = z - sub.pos.z; const cs = Math.cos(-yaw), sn = Math.sin(-yaw); const rx = dx * cs - dz * sn, rz = dx * sn + dz * cs; return [cx + rx * sc, cy + rz * sc]; };
    // POIs
    for (const p of POIS) {
      const [x, y] = toScr(p.x, p.z);
      const dd = Math.hypot(p.x - sub.pos.x, p.z - sub.pos.z);
      if (dd > R * 1.5) {
        // edge arrow
        const a = Math.atan2(y - cy, x - cx);
        const ex = cx + Math.cos(a) * (h / 2 - 34), ey = cy + Math.sin(a) * (h / 2 - 34);
        c.fillStyle = ap.nav.poi === p ? C.mag : C.dim; c.beginPath(); c.arc(ex, ey, 3, 0, 7); c.fill();
        continue;
      }
      c.strokeStyle = ap.nav.poi === p ? C.mag : C.warn; c.lineWidth = 2;
      c.beginPath(); c.moveTo(x, y - 6); c.lineTo(x + 6, y); c.lineTo(x, y + 6); c.lineTo(x - 6, y); c.closePath(); c.stroke();
      txt(c, p.nameEn.split(' ').slice(0, 2).join(' '), x + 9, y - 8, C.warn, 11);
      txt(c, `${fmt(-p.y)}m`, x + 9, y + 6, C.dim, 11);
    }
    // nav route
    if (ap.nav.on && ap.nav.wp.length) { const wp = ap.nav.wp[ap.nav.idx]; const [x, y] = toScr(wp.x, wp.z); c.strokeStyle = C.mag; c.setLineDash([6, 5]); c.beginPath(); c.moveTo(cx, cy); c.lineTo(x, y); c.stroke(); c.setLineDash([]); }
    // breadcrumb trail
    if (st.trail) { c.fillStyle = C.cyan; for (let i = 0; i < st.trail.length; i += 2) { const [x, y] = toScr(st.trail[i], st.trail[i + 1]); c.fillRect(x - 1, y - 1, 2, 2); } }
    // start / mothership
    { const [x, y] = toScr(0, 150); c.strokeStyle = C.ok; c.strokeRect(x - 5, y - 5, 10, 10); txt(c, 'MOTHERSHIP', x + 8, y, C.ok, 10); }
    // own ship
    c.fillStyle = C.white; c.beginPath(); c.moveTo(cx, cy - 12); c.lineTo(cx + 7, cy + 8); c.lineTo(cx, cy + 4); c.lineTo(cx - 7, cy + 8); c.closePath(); c.fill();
    // velocity vector
    const v = sub.vel; const [vx, vy] = toScr(sub.pos.x + v.x * 60, sub.pos.z + v.z * 60); c.strokeStyle = C.ok; c.beginPath(); c.moveTo(cx, cy); c.lineTo(vx, vy); c.stroke();
    // info
    txt(c, `X ${fmt(sub.pos.x)}  Z ${fmt(sub.pos.z)}`, 10, h - 16, C.dim, 12);
    if (ap.nav.on) txt(c, `→ ${ap.nav.poi?.nameEn || 'WP'}  ${fmt(ap.navDist)} m`, w - 10, h - 16, C.mag, 12, 'right');
    txt(c, `COMMS ${sys.comms.signal > 0 ? (sys.comms.signal * 100).toFixed(0) + '%' : 'LOST'}`, w - 10, 40, sys.comms.signal > 0.2 ? C.ok : C.alarm, 12, 'right');
    txt(c, 'HDG UP', 10, 40, C.dim, 12);
  }

  // ---------------------------------------------------------------- sonar (forward-looking) page
  drawSONAR(c, w, h, st) {
    const { ap, sys } = st;
    frame(c, w, h, 'OAS  前方障害物ソナー', `${ap.oas.range} m`);
    const cx = w / 2, cy = h - 16, R = h - 50;
    c.strokeStyle = C.grid;
    for (let r = 1; r <= 4; r++) { c.beginPath(); c.arc(cx, cy, (r / 4) * R, Math.PI * 1.2, Math.PI * 1.8); c.stroke(); }
    if (!sys.sensors.sonar || !sys.powered('SONAR')) { txt(c, 'SONAR FAIL', cx, h / 2, C.alarm, 26, 'center'); return; }
    for (const b of ap.oas.beams) {
      if (b.d > ap.oas.range) continue;
      const a = -Math.PI / 2 + b.a * 1.3;
      const r = (b.d / ap.oas.range) * R;
      const col = b.d < 15 ? C.alarm : b.d < 30 ? C.warn : C.ok;
      c.fillStyle = col; c.globalAlpha = 0.5 + (1 - b.e) * 0.3;
      c.beginPath(); c.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 5 + (1 - b.d / ap.oas.range) * 6, 0, 7); c.fill();
    }
    c.globalAlpha = 1;
    const sw = Math.sin(this.sonarSweep) * 0.3;
    c.strokeStyle = 'rgba(61,255,138,0.5)'; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(-Math.PI / 2 + sw) * R, cy + Math.sin(-Math.PI / 2 + sw) * R); c.stroke();
    txt(c, `MIN ${fmt(ap.oas.dist < 900 ? ap.oas.dist : NaN, 1)} m`, 10, 40, ap.oas.threat > 0.3 ? C.alarm : C.txt, 14);
  }

  // ---------------------------------------------------------------- systems synoptic
  drawSYS(c, w, h, st) {
    const { sub, sys } = st;
    frame(c, w, h, 'SYS  電力/推進', `${fmt(sys.totalPower / 1000, 1)} kW`);
    // batteries
    const bats = [['A', sys.bat.A], ['B', sys.bat.B], ['E', sys.bat.E]];
    bats.forEach(([n, b], i) => {
      const x = 12 + i * 100, y = 36;
      txt(c, `BATT ${n}`, x, y + 6, b.online ? C.txt : C.alarm, 13);
      bar(c, x, y + 16, 88, 14, b.soc, b.soc < 0.15 ? C.alarm : b.soc < 0.3 ? C.warn : C.ok);
      txt(c, `${fmt(b.soc * 100)}%`, x + 44, y + 23, '#001', 11, 'center');
      txt(c, `${fmt(b.v, 0)}V ${fmt(b.temp, 0)}°C`, x, y + 42, b.temp > 55 ? C.alarm : b.fault ? C.warn : C.dim, 12);
    });
    txt(c, sys.cross ? 'X-TIE ON' : 'X-TIE OFF', w - 12, 42, sys.cross ? C.warn : C.dim, 12, 'right');
    // thrusters diagram
    const ox = 60, oy = 130;
    c.strokeStyle = C.line; c.lineWidth = 2;
    c.beginPath(); c.ellipse(ox + 90, oy + 55, 38, 70, 0, 0, Math.PI * 2); c.stroke();
    const tpos = { T1: [ox + 40, oy + 115], T2: [ox + 140, oy + 115], T3: [ox + 90, oy + 20], T4: [ox + 90, oy + 95], T5: [ox + 90, oy - 10], T6: [ox + 90, oy + 130] };
    for (const t of sub.thr) {
      const [x, y] = tpos[t.id];
      const col = !t.enabled ? '#444' : t.fault === 'failed' ? C.alarm : t.fault ? C.warn : t.jam > 0 ? C.alarm : C.ok;
      c.fillStyle = col; c.beginPath(); c.arc(x, y, 9, 0, 7); c.fill();
      txt(c, t.id, x, y, '#000', 10, 'center');
      const rp = t.rpm;
      c.fillStyle = col; c.fillRect(x + 12, y - 2, rp * 22, 4);
    }
    // thruster table
    let y = 130;
    for (const t of sub.thr) {
      const st2 = !t.enabled ? 'OFF' : t.fault === 'failed' ? 'FAIL' : t.fault === 'thermal' ? 'TEMP' : t.fault === 'degraded' ? 'DEGR' : t.jam > 0 ? 'JAM' : 'OK';
      txt(c, `${t.id} ${st2.padEnd(4)} ${fmt(Math.abs(t.rpm) * 1800).padStart(4)}rpm ${fmt(t.temp).padStart(3)}°`, 255, y, st2 === 'OK' ? C.txt : st2 === 'OFF' ? C.dim : C.warn, 13);
      y += 20;
    }
    txt(c, `THR LIM ${fmt(sub.thrustLimit * 100)}%`, 255, y + 6, sub.thrustLimit < 1 ? C.warn : C.dim, 13);
    // hull
    txt(c, `HULL ${fmt(sys.hull.integrity * 100)}%  STRESS ${fmt(sys.hull.stress * 100)}%`, 12, h - 40, lvlCol(sys.hull.integrity, 0.8, 0.5, true), 14);
    txt(c, `FLOOD ${fmt(sub.floodL, 1)} L  (${fmt(sys.inflow * 60, 2)} L/min)`, 12, h - 18, sub.floodL > 5 ? C.alarm : C.ok, 14);
  }

  // ---------------------------------------------------------------- life support (port wall)
  drawLSS(c, w, h, st) {
    const { sys, sub } = st;
    frame(c, w, h, 'LSS  生命維持', `${Math.floor(sub.time / 3600)}:${String(Math.floor(sub.time / 60) % 60).padStart(2, '0')}`);
    const rows = [
      ['O2', `${fmt(sys.o2, 1)} %`, sys.o2 / 30, lvlCol(sys.o2, 19, 17, true)],
      ['CO2', `${fmt(sys.co2, 2)} %`, sys.co2 / 3, lvlCol(sys.co2, 0.5, 1.5)],
      ['気圧', `${fmt(sys.cabinP, 3)} bar`, sys.cabinP / 2, lvlCol(sys.cabinP, 1.1, 1.4)],
      ['温度', `${fmt(sys.cabinT, 1)} °C`, sys.cabinT / 40, sys.cabinT < 12 || sys.cabinT > 35 ? C.warn : C.ok],
      ['湿度', `${fmt(sys.rh)} %`, sys.rh / 100, sys.rh > 85 ? C.warn : C.ok],
    ];
    rows.forEach(([k, v, f, col], i) => { const y = 44 + i * 38; txt(c, k, 12, y, C.txt, 17, 'left', FONT); txt(c, v, w - 12, y, col, 18, 'right'); bar(c, 12, y + 12, w - 24, 7, f, col); });
    const y0 = 44 + 5 * 38;
    txt(c, `O2 BOTTLE ${fmt(sys.o2Bottles)} L  ~${fmt(sys.o2Bottles / Math.max(0.1, sys.o2Flow) / 60, 0)} h`, 12, y0, C.txt, 13);
    txt(c, `LiOH ${fmt(sys.scrubber.canister * 100)}%  SPARE ${sys.scrubber.spare}  FAN ${sys.scrubber.fanOK ? 'OK' : 'FAIL'}`, 12, y0 + 18, sys.scrubber.fanOK ? C.txt : C.alarm, 13);
    txt(c, `PILOT ${fmt(sys.pilotHealth * 100)}%${sys.emergencyMask ? '  [EBA]' : ''}`, 12, y0 + 36, lvlCol(sys.pilotHealth, 0.7, 0.4, true), 13);
  }

  // ---------------------------------------------------------------- external camera / environment page
  drawCAM(c, w, h, st) {
    const { sub } = st;
    const d = sub.depth;
    frame(c, w, h, 'ENV  外部環境', zoneName(d)[1]);
    const rows = [
      ['水圧', `${fmt(toBar(pressureAt(d)), 1)} bar`], ['水温', `${fmt(temperatureAt(d), 2)} °C`],
      ['塩分', `${fmt(salinityAt(d), 2)} PSU`], ['音速', `${fmt(soundSpeed(d), 1)} m/s`], ['溶存O2', `${fmt(dissolvedO2(d), 2)} ml/L`],
    ];
    rows.forEach(([k, v], i) => { txt(c, k, 14, 48 + i * 30, C.dim, 16, 'left', FONT); txt(c, v, w - 14, 48 + i * 30, C.white, 18, 'right'); });
    txt(c, zoneName(d)[0], w / 2, h - 50, C.cyan, 18, 'center', FONT);
    txt(c, `最大到達深度 ${fmt(sub.maxDepth)} m`, w / 2, h - 24, C.txt, 14, 'center', FONT);
  }
}
