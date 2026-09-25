// DSV-11 "WADATSUMI" — 6-DOF (simplified) rigid-body dynamics.
//
// Body frame (three.js convention): +x starboard, +y up, -z forward (bow).
// Hydrostatics: weight vs. depth-dependent buoyancy (hull + syntactic-foam compressibility,
// in-situ seawater density), variable ballast tank (VBT), droppable steel weights,
// fore/aft trim, internal flood water. Metacentric restoring moment (CG below CB).
// Hydrodynamics: added mass, quadratic + linear drag per axis, current relative velocity.
// Six electric thrusters with first-order RPM lag and square-law thrust.
import * as THREE from 'three';
import { seawaterDensity, pressureAt, G, currentAt, temperatureAt } from './env.js';
import { density, gradient } from '../world/density.js';

const _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _q = new THREE.Quaternion(), _e = new THREE.Euler(0, 0, 0, 'YXZ');
const _g = [0, 0, 0];

export const SPEC = {
  name: 'DSV-11 わだつみ',
  length: 8.4, beam: 3.0, height: 3.6,
  dryMass: 11800,             // kg incl. pilot & payload
  V0: 11.681 + 0.24,          // m^3 displaced at surface (tuned: neutral with VBT 150 L + weights)
  hullCompress: 3.84e-6,      // fractional volume loss per metre depth
  thermalExp: 6e-5,           // fractional volume change per °C (foam)
  vbtCap: 400,                // L
  vbtFloodRate: 6.0,          // L/s (gravity/pressure flood through valve at full)
  vbtPumpMaxQ: 2.0,           // L/s near surface
  vbtPumpPower: 6000,         // W hydraulic limit
  dropWeightMass: 120,        // kg each, 2 descent + 2 ascent
  BG: 0.26,                   // m metacentric (CB above CG)
  trimMaxOffset: 0.075,       // m CG shift at full trim
  crushDepth: 14200,          // m (collapse), design 11000, test 12650
  designDepth: 11000,
  // added mass fractions
  amSurge: 0.12, amSway: 0.75, amHeave: 0.9,
  Iyaw: 72000, Ipitch: 66000, Iroll: 21000,
  // quadratic drag areas*Cd (m^2)
  cdaSurge: 1.55, cdaSway: 10.5, cdaHeave: 6.4,
  // max thrusts (N)
  thrMain: 3600, thrVert: 2600, thrLat: 1500,
  // thruster electric power at full (W)
  pwrMain: 16000, pwrVert: 11000, pwrLat: 6000,
};

// thruster table: id, label, body position, thrust axis, max thrust, max power
export const THRUSTERS = [
  { id: 'T1', name: '左舷主推進', en: 'PORT MAIN', pos: [-1.35, -0.2, 3.3], axis: [0, 0, -1], max: SPEC.thrMain, pwr: SPEC.pwrMain },
  { id: 'T2', name: '右舷主推進', en: 'STBD MAIN', pos: [1.35, -0.2, 3.3], axis: [0, 0, -1], max: SPEC.thrMain, pwr: SPEC.pwrMain },
  { id: 'T3', name: '前部垂直', en: 'FWD VERT', pos: [0, 0.2, -1.6], axis: [0, 1, 0], max: SPEC.thrVert, pwr: SPEC.pwrVert },
  { id: 'T4', name: '後部垂直', en: 'AFT VERT', pos: [0, 0.2, 2.4], axis: [0, 1, 0], max: SPEC.thrVert, pwr: SPEC.pwrVert },
  { id: 'T5', name: '艦首横', en: 'BOW LAT', pos: [0, -0.3, -3.2], axis: [1, 0, 0], max: SPEC.thrLat, pwr: SPEC.pwrLat },
  { id: 'T6', name: '艦尾横', en: 'STERN LAT', pos: [0, -0.3, 3.6], axis: [1, 0, 0], max: SPEC.thrLat, pwr: SPEC.pwrLat },
];

// collision probe points (body frame) and their radius
const PROBES = [
  [0, 0, -4.1, 0.9], [0, 0, 4.1, 0.7], [-1.45, 0, 0, 0.6], [1.45, 0, 0, 0.6],
  [0, 1.75, 0.5, 0.5], [-1.0, -1.75, -2.4, 0.25], [1.0, -1.75, -2.4, 0.25],
  [-1.0, -1.75, 2.4, 0.25], [1.0, -1.75, 2.4, 0.25], [0, -1.2, -3.5, 0.5], [-1.1, 0.6, -2.8, 0.55], [1.1, 0.6, -2.8, 0.55],
  [-1.35, -0.2, 3.6, 0.5], [1.35, -0.2, 3.6, 0.5],
];

export class Submarine {
  constructor() {
    this.pos = new THREE.Vector3(12, -9, 150);
    this.vel = new THREE.Vector3();          // world m/s
    this.yaw = -0.35; this.pitch = 0; this.roll = 0;
    this.w = new THREE.Vector3();            // body rates: x=pitch rate, y=yaw rate, z=roll rate
    this.quat = new THREE.Quaternion();
    this.vbt = 150;                          // L of water in VBT
    this.vbtCmd = 0;                         // -1 pump out .. +1 flood
    this.vbtValveOK = true; this.vbtPumpOK = true; this.vbtIsolated = false;
    this.trim = 0;                           // -1..1 (positive = bow down)
    this.trimCmd = 0;
    this.trimPumpOK = true;
    this.weights = { descent: 2, ascent: 2 };
    this.floodL = 0;                          // litres of water inside the sphere
    this.thr = THRUSTERS.map((t) => ({ ...t, cmd: 0, rpm: 0, thrust: 0, power: 0, temp: 12, health: 1, fault: null, enabled: true, jam: 0 }));
    this.input = { surge: 0, yaw: 0, heave: 0, sway: 0, pitch: 0 };
    this.powerAvail = 1;                     // 0..1 bus health scaling
    this.thrustLimit = 1;                    // 0..1 power management
    this.contacts = [];                      // collision events this frame
    this.grounded = false;
    this.depth = -this.pos.y;
    this.altitude = 999;
    this.speed = 0;
    this.extraMass = 0;
    this.extForce = new THREE.Vector3();
    this.extTorque = new THREE.Vector3();
    this.currentExtra = 0;
    this.propColliders = [];
    this.siltStir = 0;
    this.time = 0;
    this.maxDepth = 0;
    this.distance = 0;
    this._updateQuat();
  }

  _updateQuat() { _e.set(this.pitch, this.yaw, this.roll, 'YXZ'); this.quat.setFromEuler(_e); }
  forward(out = new THREE.Vector3()) { return out.set(0, 0, -1).applyQuaternion(this.quat); }
  toWorld(p, out = new THREE.Vector3()) { return out.set(p[0], p[1], p[2]).applyQuaternion(this.quat).add(this.pos); }

  get totalMass() {
    return SPEC.dryMass + this.vbt * 1.025 + (this.weights.descent + this.weights.ascent) * SPEC.dropWeightMass + this.floodL * 1.025 + this.extraMass;
  }
  displacedVolume(depth, temp) {
    return SPEC.V0 * (1 - SPEC.hullCompress * depth) * (1 + SPEC.thermalExp * (temp - 20));
  }
  // net buoyancy (N, + = up)
  netBuoyancy(depth = this.depth) {
    const rho = seawaterDensity(depth);
    const V = this.displacedVolume(depth, temperatureAt(depth));
    if (this.pos.y > -1.6) {
      // partially surfaced: buoyancy falls as hull rises out of the water
      const sub = THREE.MathUtils.clamp((-this.pos.y + 1.8) / 3.4, 0.15, 1);
      return rho * V * sub * G - this.totalMass * G;
    }
    return rho * V * G - this.totalMass * G;
  }
  // how many kg the boat is heavy (+) or light (-)
  get trimState() { return -this.netBuoyancy() / G; }

  dropWeight(kind) {
    if (this.weights[kind] > 0) { this.weights[kind]--; return true; }
    return false;
  }

  step(dt, sys) {
    this.time += dt;
    const depth = Math.max(0, -this.pos.y);
    this.depth = depth;
    const rho = seawaterDensity(depth);
    const dP = pressureAt(depth) - 101325;

    // ---------------- VBT
    if (!this.vbtIsolated) {
      if (this.vbtCmd > 0 && this.vbtValveOK) {
        // flooding: pressure pushes water in; valve-limited
        const q = SPEC.vbtFloodRate * this.vbtCmd * Math.min(1, 0.25 + Math.sqrt(dP / 2e5));
        this.vbt = Math.min(SPEC.vbtCap, this.vbt + q * dt);
        this.vbtFlow = q;
      } else if (this.vbtCmd < 0 && this.vbtPumpOK && this.powerAvail > 0.2) {
        // pumping out against sea pressure: hydraulic power-limited
        const qLim = (SPEC.vbtPumpPower * 0.62) / Math.max(dP, 1e5) * 1000; // L/s
        const q = Math.min(SPEC.vbtPumpMaxQ, qLim) * -this.vbtCmd;
        this.vbt = Math.max(0, this.vbt - q * dt);
        this.vbtFlow = -q;
        this.vbtPumpW = 800 + SPEC.vbtPumpPower * -this.vbtCmd * Math.min(1, dP / 3e6 + 0.15);
      } else this.vbtFlow = 0;
    } else this.vbtFlow = 0;
    if (!(this.vbtCmd < 0 && this.vbtPumpOK)) this.vbtPumpW = 0;

    // ---------------- trim
    if (this.trimPumpOK && this.powerAvail > 0.2) this.trim = THREE.MathUtils.clamp(this.trim + this.trimCmd * dt * 0.05, -1, 1);

    // ---------------- thrusters
    this._mix(sys);
    let thrPower = 0;
    const fBody = _v.set(0, 0, 0);
    const tBody = _v2.set(0, 0, 0);
    const seaT = temperatureAt(depth);
    for (const t of this.thr) {
      let target = t.enabled && !t.fault ? t.cmd * this.powerAvail * this.thrustLimit : 0;
      if (t.fault === 'degraded') target = t.cmd * 0.45 * this.powerAvail;
      if (t.jam > 0) target *= Math.max(0, 1 - t.jam);
      t.rpm += (target - t.rpm) * Math.min(1, dt / 0.45);
      const s = t.rpm;
      const eff = s >= 0 ? 1 : 0.72;
      t.thrust = t.max * Math.sign(s) * s * s * eff * (rho / 1025);
      t.power = t.pwr * Math.abs(s) ** 3 * (1 + t.jam * 2.5) + (Math.abs(s) > 0.01 ? 60 : 0);
      thrPower += t.power;
      // thermal: motor heat vs. sea cooling
      t.temp += (t.power * 0.0009 - (t.temp - seaT) * 0.02) * dt;
      const ax = t.axis, p = t.pos;
      fBody.x += ax[0] * t.thrust; fBody.y += ax[1] * t.thrust; fBody.z += ax[2] * t.thrust;
      // torque = r x F
      tBody.x += p[1] * ax[2] * t.thrust - p[2] * ax[1] * t.thrust;
      tBody.y += p[2] * ax[0] * t.thrust - p[0] * ax[2] * t.thrust;
      tBody.z += p[0] * ax[1] * t.thrust - p[1] * ax[0] * t.thrust;
    }
    this.thrPower = thrPower;

    // ---------------- hydrodynamics (body frame, relative to current)
    const cur = currentAt(this.pos.x, this.pos.y, this.pos.z, this.time, this.currentExtra);
    const vr = new THREE.Vector3(this.vel.x - cur[0], this.vel.y - cur[1], this.vel.z - cur[2]);
    const qi = this.quat.clone().invert();
    const vb = vr.clone().applyQuaternion(qi);
    const drag = new THREE.Vector3(
      -0.5 * rho * SPEC.cdaSway * vb.x * Math.abs(vb.x) - 120 * vb.x,
      -0.5 * rho * SPEC.cdaHeave * vb.y * Math.abs(vb.y) - 150 * vb.y,
      -0.5 * rho * SPEC.cdaSurge * vb.z * Math.abs(vb.z) - 60 * vb.z,
    );
    fBody.add(drag);
    // world forces
    const M = this.totalMass;
    const fWorld = fBody.clone().applyQuaternion(this.quat);
    const nb = this.netBuoyancy(depth);
    fWorld.y += nb;
    fWorld.add(this.extForce);
    // surface: wave heave
    if (this.pos.y > -4) fWorld.y += Math.sin(this.time * 0.9) * 2500 * (1 + this.pos.y / 4);

    // effective (added) mass per body axis -> approximate in world by projecting
    const am = new THREE.Vector3(SPEC.amSway, SPEC.amHeave, SPEC.amSurge);
    const fb2 = fWorld.clone().applyQuaternion(qi);
    fb2.x /= M * (1 + am.x); fb2.y /= M * (1 + am.y); fb2.z /= M * (1 + am.z);
    const acc = fb2.applyQuaternion(this.quat);
    this.acc = acc.clone();
    this.vel.addScaledVector(acc, dt);

    // ---------------- rotational
    // hydrostatic restoring: righting moment W*BG*sin(angle), trim shifts CG
    const W = M * G;
    const xg = this.trim * SPEC.trimMaxOffset + this.floodL * 0.00002 + (this.cgOffset || 0); // flood water pools forward in the sphere
    const tPitch = -W * SPEC.BG * Math.sin(this.pitch) - W * xg * Math.cos(this.pitch);
    const tRoll = -W * SPEC.BG * Math.sin(this.roll) + (this.rollBias || 0) * W;
    const rates = this.w;
    const Tq = new THREE.Vector3(tBody.x + tPitch, tBody.y, tBody.z + tRoll).add(this.extTorque);
    // damping (quadratic + linear), stronger with speed for yaw (fin effect)
    const sp = Math.abs(vb.z);
    Tq.x += -rates.x * Math.abs(rates.x) * 4.2e5 - rates.x * 3.2e4;
    Tq.y += -rates.y * Math.abs(rates.y) * 3.1e5 - rates.y * (1.6e4 + sp * 2e4);
    Tq.z += -rates.z * Math.abs(rates.z) * 2.0e5 - rates.z * 1.6e4;
    // yaw-induced sway coupling: slight roll into turn
    Tq.z += -rates.y * sp * 3500;
    rates.x += (Tq.x / (SPEC.Ipitch * 1.4)) * dt;
    rates.y += (Tq.y / (SPEC.Iyaw * 1.5)) * dt;
    rates.z += (Tq.z / (SPEC.Iroll * 1.3)) * dt;
    this.pitch += rates.x * dt;
    this.yaw += rates.y * dt;
    this.roll += rates.z * dt;
    this.pitch = THREE.MathUtils.clamp(this.pitch, -1.2, 1.2);
    this.roll = THREE.MathUtils.clamp(this.roll, -1.0, 1.0);
    this._updateQuat();

    const prev = this.pos.clone();
    this.pos.addScaledVector(this.vel, dt);
    // do not fly above surface
    if (this.pos.y > 0.4) { this.pos.y = 0.4; if (this.vel.y > 0) this.vel.y *= 0.3; }

    this._collide(dt);
    this.distance += prev.distanceTo(this.pos);
    this.speed = vb.z * -1; // forward speed through water
    this.vbody = vb;
    this.depth = Math.max(0, -this.pos.y);
    if (this.depth > this.maxDepth) this.maxDepth = this.depth;
    this.extForce.set(0, 0, 0); this.extTorque.set(0, 0, 0);
  }

  // command mixer: pilot / autopilot demands -> thruster commands
  _mix() {
    const u = this.input;
    const c = (x) => THREE.MathUtils.clamp(x, -1, 1);
    const [t1, t2, t3, t4, t5, t6] = this.thr;
    t1.cmd = c(u.surge + u.yaw * 0.55);
    t2.cmd = c(u.surge - u.yaw * 0.55);
    t3.cmd = c(u.heave - u.pitch * 0.6);
    t4.cmd = c(u.heave + u.pitch * 0.6);
    t5.cmd = c(u.sway + u.yaw * 0.6);
    t6.cmd = c(u.sway - u.yaw * 0.6);
    // yaw: T1 forward & T2 back rotates bow to starboard? (+yaw input = turn right)
    // three.js yaw is CCW about +y, so turning right = negative yaw rate; T1 (port) pushes
    // forward, T2 back => clockwise from above = right turn. Bow thruster pushes bow to +x (stbd) = right.
  }

  _collide(dt) {
    this.contacts.length = 0;
    this.grounded = false;
    const center = density(this.pos.x, this.pos.y, this.pos.z);
    let nearProp = false;
    for (const c of this.propColliders) {
      if (c.center.distanceToSquared(this.pos) < (c.radius + 7) ** 2) { nearProp = true; break; }
    }
    if (center < -9 && !nearProp) { this.nearTerrain = false; return; }
    this.nearTerrain = true;
    const p = new THREE.Vector3();
    for (const pr of PROBES) {
      this.toWorld(pr, p);
      let d = density(p.x, p.y, p.z) + pr[3];
      let n = null;
      if (d > 0) { gradient(p.x, p.y, p.z, 0.3, _g); n = new THREE.Vector3(-_g[0], -_g[1], -_g[2]); }
      // props (spheres + oriented boxes)
      if (nearProp) {
        for (const c of this.propColliders) {
          const r = c.test(p, pr[3]);
          if (r && r.depth > (d > 0 ? d : 0)) { d = r.depth; n = r.normal; }
        }
      }
      if (d > 0 && n) {
        const vn = this.vel.dot(n);
        this.pos.addScaledVector(n, d * 0.8);
        if (vn < 0) {
          const impact = -vn;
          this.vel.addScaledVector(n, -vn * 1.08);
          // friction on tangential velocity
          const vt = this.vel.clone().addScaledVector(n, -this.vel.dot(n));
          this.vel.addScaledVector(vt, -Math.min(1, dt * 3.5));
          this.contacts.push({ point: p.clone(), normal: n.clone(), impact, probe: pr });
          // angular kick from off-centre hits
          const arm = new THREE.Vector3(pr[0], pr[1], pr[2]);
          const nb = n.clone().applyQuaternion(this.quat.clone().invert());
          const tq = arm.cross(nb).multiplyScalar(impact * 2.2);
          this.w.x += tq.x * 0.05; this.w.y += tq.y * 0.03; this.w.z += tq.z * 0.05;
        }
        if (pr[1] < -1.5 && n.y > 0.5) this.grounded = true;
        this.siltStir = Math.min(1, this.siltStir + (0.05 + this.vel.length() * 0.4) * dt * 6);
      }
    }
  }

  serialize() {
    return {
      pos: this.pos.toArray(), vel: this.vel.toArray(), yaw: this.yaw, pitch: this.pitch, roll: this.roll,
      vbt: this.vbt, trim: this.trim, weights: { ...this.weights }, floodL: this.floodL, time: this.time, maxDepth: this.maxDepth, distance: this.distance,
      thr: this.thr.map((t) => ({ health: t.health, fault: t.fault, enabled: t.enabled, jam: t.jam, temp: t.temp })),
    };
  }
  restore(s) {
    this.pos.fromArray(s.pos); this.vel.fromArray(s.vel); this.yaw = s.yaw; this.pitch = s.pitch; this.roll = s.roll;
    this.vbt = s.vbt; this.trim = s.trim; this.weights = { ...s.weights }; this.floodL = s.floodL; this.time = s.time; this.maxDepth = s.maxDepth; this.distance = s.distance || 0;
    s.thr?.forEach((t, i) => Object.assign(this.thr[i], t));
    this._updateQuat();
  }
}
