// Autopilot / flight control computer.
// Modes (combinable axes, like a real ROV/HOV control system):
//   HDG hold, DEPTH hold, ALT hold (DVL bottom lock), SPEED hold (DVL/water),
//   STATION keep (hover over a point), NAV (waypoint/POI transit with 3-D path),
//   DESCENT profile (automated descent rate control with ballast management), ASCENT (emergency surfacing)
// Plus an obstacle avoidance layer using the forward-looking sonar (OAS).
// All loops are PIDs that output normalised thruster demands; they degrade gracefully
// when sensors fail (e.g. ALT falls back to DEPTH when DVL is lost).
import * as THREE from 'three';
import { raycast, groundHeight, POIS } from '../world/density.js';

class PID {
  constructor(kp, ki, kd, lim = 1, ilim = 0.5) { Object.assign(this, { kp, ki, kd, lim, ilim }); this.i = 0; this.prev = null; }
  reset() { this.i = 0; this.prev = null; }
  step(err, dt, dErr = null) {
    this.i = THREE.MathUtils.clamp(this.i + err * dt * this.ki, -this.ilim, this.ilim);
    const d = dErr !== null ? dErr : this.prev === null ? 0 : (err - this.prev) / dt;
    this.prev = err;
    return THREE.MathUtils.clamp(this.kp * err + this.i + this.kd * d, -this.lim, this.lim);
  }
}

const wrap = (a) => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
export const heading = (yaw) => ((-yaw * 180) / Math.PI % 360 + 360) % 360; // compass deg (0=N=-z)
export const yawFromHeading = (h) => (-h * Math.PI) / 180;

export class Autopilot {
  constructor(sub, sys) {
    this.sub = sub; this.sys = sys;
    this.engaged = false;
    this.hdg = { on: false, target: 0 };
    this.depth = { on: false, target: 50 };
    this.alt = { on: false, target: 8 };
    this.speed = { on: false, target: 1.0 };
    this.station = { on: false, point: new THREE.Vector3() };
    this.nav = { on: false, wp: [], idx: 0, poi: null };
    this.descent = { on: false, rate: 0.6 };
    this.ascent = { on: false };
    this.oas = { on: true, range: 60, threat: 0, bearing: 0, dist: 999, beams: [] };
    this.ballastAuto = true;
    this.pid = {
      yaw: new PID(1.8, 0.05, 2.6), depth: new PID(0.22, 0.012, 0.9, 1, 0.35), vz: new PID(1.6, 0.25, 0.1),
      speed: new PID(0.9, 0.12, 0.2), sway: new PID(0.5, 0.02, 0.9), pitch: new PID(2.2, 0.1, 1.5),
    };
    this.status = 'STBY';
    this.warn = '';
    this.log = [];
    this._scan = 0;
  }

  engage(on = !this.engaged) {
    this.engaged = on;
    if (on) {
      const s = this.sub;
      if (!this.hdg.on && !this.nav.on && !this.station.on) { this.hdg.on = true; this.hdg.target = heading(s.yaw); }
      if (!this.depth.on && !this.alt.on && !this.descent.on && !this.ascent.on) { this.depth.on = true; this.depth.target = Math.round(s.depth); }
      Object.values(this.pid).forEach((p) => p.reset());
    }
  }
  setMode(axis, on, val) {
    const m = this[axis]; if (!m) return;
    m.on = on;
    if (val !== undefined) { if ('target' in m) m.target = val; else if ('rate' in m) m.rate = val; }
    // exclusivity for vertical modes
    if (on && ['depth', 'alt', 'descent', 'ascent'].includes(axis)) for (const k of ['depth', 'alt', 'descent', 'ascent']) if (k !== axis) this[k].on = false;
    if (on && ['hdg', 'nav', 'station'].includes(axis)) for (const k of ['hdg', 'nav', 'station']) if (k !== axis) this[k].on = false;
    if (axis === 'station' && on) this.station.point.copy(this.sub.pos);
    if (on) this.engaged = true;
    this.pid.depth.reset(); this.pid.vz.reset();
  }
  navTo(poi) {
    this.nav.poi = poi;
    // plan: descend along a glide path, approach standoff above the POI
    const s = this.sub.pos;
    const tgt = new THREE.Vector3(poi.x, poi.y + 12, poi.z);
    this.nav.wp = [tgt];
    this.nav.idx = 0;
    this.setMode('nav', true);
    this.depth.on = false; this.alt.on = false; this.descent.on = false;
    this.navVertical = true;
    this.log.push(`NAV → ${poi.name}`);
  }

  // sensor-derived measurements (can be faulty)
  measure() {
    const s = this.sub, sen = this.sys.sensors;
    const m = {};
    m.depth = s.depth + sen.depthDrift;
    m.hdg = heading(s.yaw) + (sen.gyro ? 0 : Math.sin(s.time * 0.05) * 25 + sen.gyroDrift * 57);
    m.yaw = s.yaw - (sen.gyro ? 0 : (Math.sin(s.time * 0.05) * 25 * Math.PI) / 180 + sen.gyroDrift);
    const dvlOK = sen.dvl && this.sys.powered('SONAR');
    m.dvl = dvlOK && s.altitude < 200;
    m.alt = m.dvl ? s.altitude : NaN;
    m.vz = -s.vel.y; // descending positive (depth-rate from pressure derivative)
    const vb = s.vbody || new THREE.Vector3();
    m.u = m.dvl ? -vb.z : -vb.z * 0.9; // forward speed (water-track if no DVL)
    m.v = m.dvl ? vb.x : 0;
    return m;
  }

  // forward-looking obstacle sonar: fan of rays (cheap, spread over frames)
  _sonar(dt) {
    const s = this.sub;
    const ok = this.sys.sensors.sonar && this.sys.powered('SONAR');
    if (!ok) { this.oas.threat = 0; this.oas.beams = []; return; }
    // ping repetition ~30 Hz of sim time (keeps cost constant under time compression)
    this._sonT = (this._sonT || 0) + dt;
    if (this._sonT < 1 / 30 && this.oas.beams.length) return;
    this._sonT = 0;
    const beams = this.oas.beams;
    const NB = 15;
    if (beams.length !== NB) { beams.length = 0; for (let i = 0; i < NB; i++) beams.push({ a: 0, e: 0, d: 999 }); }
    const fwd = new THREE.Vector3();
    for (let k = 0; k < 3; k++) {
      const i = this._scan++ % NB;
      const col = i % 5, row = (i / 5) | 0;
      const az = (col - 2) * 0.22, el = (row - 1) * 0.2 - 0.05;
      fwd.set(Math.sin(az), Math.sin(el), -Math.cos(az)).normalize().applyQuaternion(s.quat);
      const d = raycast(s.pos.x, s.pos.y, s.pos.z, fwd.x, fwd.y, fwd.z, this.oas.range, 0.8);
      beams[i].a = az; beams[i].e = el; beams[i].d = d < 0 ? 999 : d;
    }
    let min = 999, br = 0;
    for (const b of beams) if (b.d < min) { min = b.d; br = b.a; }
    this.oas.dist = min; this.oas.bearing = br;
    const u = Math.max(0.3, s.speed);
    const ttc = min / u;
    this.oas.threat = THREE.MathUtils.clamp(1 - (ttc - 6) / 20, 0, 1) * (min < this.oas.range ? 1 : 0);
  }

  // Onboard bathymetric chart (pre-surveyed multibeam grid): min clearance along the next ~120 m of track.
  _chart(dt) {
    this._chartT = (this._chartT || 0) - dt;
    if (this._chartT > 0) return this.chartFloor;
    this._chartT = 0.5;
    const s = this.sub;
    const v = new THREE.Vector3(s.vel.x, 0, s.vel.z);
    let dir = v.lengthSq() > 0.04 ? v.normalize() : s.forward(new THREE.Vector3()).setY(0).normalize();
    let reach = 120;
    if (this.nav.on && this.nav.wp.length) { const wp = this.nav.wp[this.nav.idx]; const d = new THREE.Vector3(wp.x - s.pos.x, 0, wp.z - s.pos.z); reach = Math.min(120, d.length() + 10); if (d.lengthSq() > 1) dir = d.normalize(); }
    let top = -1e9;
    for (const f of [0, 0.12, 0.3, 0.5, 0.75, 1]) {
      const k = f * reach;
      const x = s.pos.x + dir.x * k, z = s.pos.z + dir.z * k;
      const g = groundHeight(x, z, Math.min(0, s.pos.y + 150));
      if (g > top) top = g;
    }
    this.chartFloor = top; // world y of the highest seabed ahead
    return top;
  }

  _altimeter() {
    const s = this.sub;
    // down-looking DVL beams => altitude
    const d = raycast(s.pos.x, s.pos.y - 1.7, s.pos.z, 0, -1, 0, 220, 0.8);
    s.altitude = d < 0 ? 999 : d;
  }

  update(dt, pilotInput) {
    const s = this.sub, sys = this.sys;
    this._altTimer = (this._altTimer || 0) - dt;
    if (this._altTimer <= 0) { this._altimeter(); this._altTimer = 0.1; }
    this._sonar(dt);
    const m = this.measure();
    if (this.engaged) this._chart(dt);
    this.m = m;
    const out = { surge: pilotInput.surge, yaw: pilotInput.yaw, heave: pilotInput.heave, sway: pilotInput.sway, pitch: 0 };
    this.warn = '';
    const navPower = sys.powered('NAV');
    if (!navPower && this.engaged) { this.engaged = false; sys.msg('航法コンピュータ電源喪失 — 自動操縦 解除', 'alarm'); }
    if (!this.engaged) {
      this.status = 'STBY';
      // pitch stabiliser (always-on SAS) via vertical thrusters
      out.pitch = this.pid.pitch.step(-s.pitch, dt, -s.w.x) * 0.5;
      s.input = out;
      return;
    }
    // pilot override: any stick input on an axis pauses that axis loop
    const ovr = (v) => Math.abs(v) > 0.08;
    const tags = [];

    // ---------------- horizontal guidance
    let desiredYaw = null, desiredSurge = null, desiredSway = null;
    if (this.nav.on && this.nav.wp.length) {
      const wp = this.nav.wp[this.nav.idx];
      const dx = wp.x - s.pos.x, dz = wp.z - s.pos.z;
      const hd = Math.hypot(dx, dz);
      desiredYaw = Math.atan2(-dx, -dz);
      // speed schedule: slow down on approach
      const vmax = s.depth > 50 ? 1.6 : 1.3;
      this.speed.target = THREE.MathUtils.clamp(hd / 40, 0.15, vmax);
      desiredSurge = 'speed';
      // vertical: glide to waypoint depth — limit descent angle, keep altitude > 15 m
      if (this.navVertical) {
        const wpDepth = -wp.y;
        this.depth.target = wpDepth;
        this._navVert = true;
      }
      if (hd < 8 && Math.abs(-wp.y - s.depth) < 12) {
        if (this.nav.idx < this.nav.wp.length - 1) this.nav.idx++;
        else {
          sys.msg(`目的地到着: ${this.nav.poi?.name || 'WP'} — 定点保持に移行`, 'good');
          this.setMode('station', true); this.depth.on = true; this.depth.target = s.depth; this._navVert = false; this.nav.on = false;
        }
      }
      tags.push('NAV');
      this.navDist = Math.hypot(dx, dz, -wp.y - s.depth);
    } else if (this.station.on) {
      const p = this.station.point;
      const d = new THREE.Vector3(p.x - s.pos.x, 0, p.z - s.pos.z).applyQuaternion(s.quat.clone().invert());
      // d.z negative = point ahead
      if (m.dvl || s.depth < 30) {
        desiredSurge = THREE.MathUtils.clamp(-d.z * 0.25 - (-s.vbody.z) * 0.9, -0.6, 0.6);
        desiredSway = THREE.MathUtils.clamp(d.x * 0.25 - s.vbody.x * 0.9, -0.6, 0.6);
      } else this.warn = 'STN: DVL無 — 位置保持精度低下';
      if (!this.hdg.on) { this.hdg.target = this.hdg.target ?? heading(s.yaw); }
      desiredYaw = yawFromHeading(this.hdg.target);
      tags.push('STN');
    } else if (this.hdg.on) {
      desiredYaw = yawFromHeading(this.hdg.target);
      tags.push('HDG');
    }
    if (this.speed.on && desiredSurge === null) desiredSurge = 'speed';

    if (desiredYaw !== null && !ovr(pilotInput.yaw)) {
      const e = wrap(desiredYaw - m.yaw);
      // yaw PID: + yaw input = turn right = negative yaw rate
      out.yaw = -this.pid.yaw.step(e, dt, s.w.y) * 1.0;
    }
    if (desiredSurge === 'speed' && !ovr(pilotInput.surge)) {
      const tgt = this.speed.target;
      out.surge = THREE.MathUtils.clamp(0.3 * Math.sign(tgt) * Math.sqrt(Math.abs(tgt) / 1.9) * 2.2 + this.pid.speed.step(tgt - m.u, dt), -1, 1);
      if (!this.nav.on) tags.push('SPD');
    } else if (typeof desiredSurge === 'number' && !ovr(pilotInput.surge)) out.surge = desiredSurge;
    if (desiredSway !== null && !ovr(pilotInput.sway)) out.sway = desiredSway;

    // ---------------- vertical guidance
    let targetVz = null; // desired descent rate (m/s, + down)
    if (this.ascent.on) { targetVz = -1.0; tags.push('ASC'); }
    else if (this.descent.on) {
      targetVz = this.descent.rate;
      if (m.dvl && m.alt < 60) targetVz = Math.min(targetVz, Math.max(0.1, (m.alt - 12) / 60));
      if (m.dvl && m.alt < 14) { this.setMode('alt', true, 10); sys.msg('海底接近 — 高度保持 10 m に移行', 'info'); }
      tags.push('DSC');
    } else if (this.alt.on) {
      if (!m.dvl) { this.warn = 'ALT: DVLボトムロック無 — 深度保持へ'; this.alt.on = false; this.depth.on = true; this.depth.target = Math.round(m.depth); }
      else { const e = m.alt - this.alt.target; targetVz = THREE.MathUtils.clamp(e * 0.12, -0.7, 0.7); tags.push('ALT'); }
    } else if (this.depth.on || this._navVert) {
      let tgtD = this.depth.target;
      // safety floor: never go closer than 10 m above ground when DVL available
      if (m.dvl) tgtD = Math.min(tgtD, m.depth + m.alt - 10);
      if (this.chartFloor !== undefined && sys.powered('NAV')) {
        const clr = this._navVert ? 18 : 10;
        tgtD = Math.min(tgtD, -this.chartFloor - clr);
        if (-this.chartFloor - clr < this.depth.target - 1 && this._navVert) tags.push('TF');
      }
      const e = tgtD - m.depth;
      const vmax = this._navVert ? 1.0 : 0.8;
      targetVz = THREE.MathUtils.clamp(e * 0.08, -vmax, vmax);
      tags.push(this._navVert ? 'VNAV' : 'DPT');
    }
    if (targetVz !== null && !ovr(pilotInput.heave)) {
      // heave thrusters push up for positive heave; descending (vz>0) needs negative heave
      out.heave = -this.pid.vz.step(targetVz - m.vz, dt);
      // automatic ballast management: trim VBT so that thrusters are unloaded on long holds
      if (this.ballastAuto && sys.powered('HYD')) {
        // desired heaviness (kg, + = heavy). Integral term of the heave loop = steady thrust the
        // ballast should take over (heave<0 pushes down => boat is too light => flood).
        const bias = -this.pid.vz.i;
        let wantKg = this.ascent.on ? -150 : this.descent.on ? THREE.MathUtils.clamp(targetVz * 110, 0, 110) : THREE.MathUtils.clamp(-bias * 220, -60, 60);
        if (s.grounded || (m.dvl && m.alt < 4)) wantKg = Math.min(wantKg, -20);
        const err = wantKg - s.trimState;
        s.vbtCmd = Math.abs(err) < 10 ? 0 : THREE.MathUtils.clamp(err / 40, -1, 1);
      }
    }
    if (this.ascent.on && s.trimState > 0 && sys.powered('HYD')) s.vbtCmd = -1;
    // pitch stabiliser
    out.pitch = this.pid.pitch.step(-s.pitch, dt, -s.w.x) * 0.6;

    // ---------------- obstacle avoidance overlay
    if (this.oas.on && this.oas.threat > 0) {
      const th = this.oas.threat;
      out.surge = Math.min(out.surge, 1 - th * 1.4);
      out.yaw += (this.oas.bearing <= 0 ? 1 : -1) * th * 0.7;
      out.heave += th * 0.6;
      tags.push('OAS');
      if (th > 0.6) this.warn = '障害物回避中';
    }
    this.status = tags.join(' ');
    s.input = out;
  }

  serialize() { return { hdg: { ...this.hdg }, depth: { ...this.depth }, alt: { ...this.alt }, speed: { ...this.speed }, engaged: this.engaged }; }
}

export { POIS };
