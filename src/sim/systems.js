// Onboard systems: electrical, life support, hull integrity, sensors.
// Everything is a simple physical/first-order model so failures propagate naturally:
// a leak adds water -> mass + wet electrics -> ground fault -> breaker trip -> thrusters lost ...
import { pressureAt, temperatureAt, P_ATM } from './env.js';
import { SPEC } from './sub.js';

const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);

export const BREAKERS = [
  { id: 'PROP', name: '推進系', en: 'PROPULSION', bus: 'A', nominal: 0 },
  { id: 'LIGHT', name: '外部照明', en: 'EXT LIGHTS', bus: 'A', nominal: 0 },
  { id: 'HYD', name: '油圧/VBTポンプ', en: 'HYDRAULICS', bus: 'A', nominal: 0 },
  { id: 'SONAR', name: 'ソナー/DVL', en: 'SONAR/DVL', bus: 'B', nominal: 140 },
  { id: 'NAV', name: '航法/自動操縦', en: 'NAV/AP', bus: 'B', nominal: 180 },
  { id: 'LSS', name: '生命維持', en: 'LIFE SUPPORT', bus: 'E', nominal: 160 },
  { id: 'CABIN', name: '艦内照明/空調', en: 'CABIN', bus: 'B', nominal: 220 },
  { id: 'COMMS', name: '水中通話', en: 'UQC COMMS', bus: 'B', nominal: 90 },
  { id: 'HEAT', name: '暖房', en: 'HEATER', bus: 'B', nominal: 0 },
  { id: 'CAM', name: '外部カメラ', en: 'CAMERAS', bus: 'B', nominal: 110 },
];

export const PENETRATORS = [
  { id: 'P1', name: '電力ペネトレータ A', en: 'PWR PENETRATOR A', feeds: ['PROP', 'LIGHT'] },
  { id: 'P2', name: '電力ペネトレータ B', en: 'PWR PENETRATOR B', feeds: ['HYD', 'HEAT'] },
  { id: 'P3', name: '信号ペネトレータ', en: 'SIGNAL PENETRATOR', feeds: ['SONAR', 'CAM', 'COMMS'] },
  { id: 'P4', name: '油圧ライン貫通部', en: 'HYDRAULIC FEEDTHRU', feeds: ['HYD'] },
  { id: 'VP', name: '主観測窓シール', en: 'MAIN VIEWPORT SEAL', feeds: [] },
  { id: 'HATCH', name: 'ハッチシール', en: 'HATCH SEAL', feeds: [] },
];

export class Systems {
  constructor(sub) {
    this.sub = sub;
    // --- electrical: 2 main Li-ion strings (A/B) 48 kWh each @ 300 V nominal, emergency 6 kWh @ 28 V
    this.bat = {
      A: { soc: 1, cap: 48, v: 302, temp: 18, online: true, fault: null, iso: 12 },
      B: { soc: 1, cap: 48, v: 302, temp: 18, online: true, fault: null, iso: 12 },
      E: { soc: 1, cap: 6, v: 28.4, temp: 18, online: true, fault: null, iso: 12 },
    };
    this.cross = false; // cross-tie A<->B bus
    this.breakers = Object.fromEntries(BREAKERS.map((b) => [b.id, { ...b, closed: true, tripped: false, load: 0 }]));
    this.breakers.HEAT.closed = false;
    this.lights = { main: 0.85, flood: 0.6, cabin: 0.35, extFault: 0 }; // cabin dimmed for dive (night-vision friendly)
    this.loads = {};
    this.totalPower = 0;
    // --- life support (sphere ~ 5.6 m^3 free volume, 1 pilot)
    this.cabinVol = 5.6;
    this.o2 = 20.9; this.co2 = 0.05; this.cabinP = 1.013; this.cabinT = 24; this.rh = 48;
    this.o2Bottles = 2 * 2200 * 0.9; // litres of O2 available (2 cylinders)
    this.o2Flow = 0.4;                // L/min set (consumption ~0.35 L/min resting)
    this.o2RegOK = true;
    this.scrubber = { fan: true, canister: 1, spare: 2, fanOK: true };
    this.emergencyO2 = 0;             // hours of emergency rebreather
    this.emergencyMask = false;
    this.pilotStress = 0; this.pilotHealth = 1; this.hypoxia = 0; this.hypercapnia = 0; this.hypothermia = 0;
    // --- hull
    this.hull = { integrity: 1, fatigue: 0, viewportCreep: 0, creak: 0, crack: 0 };
    this.pen = Object.fromEntries(PENETRATORS.map((p) => [p.id, { ...p, leakArea: 0, isolated: false, clamped: 0, leakRate: 0 }]));
    this.fire = { active: false, intensity: 0, loc: null, smoke: 0, suppressant: 2 };
    this.sensors = { depth: true, dvl: true, sonar: true, gyro: true, comms: true, cams: true, depthDrift: 0, gyroDrift: 0 };
    this.comms = { signal: 1, lastContact: 0 };
    this.messages = [];
    this.alarmsAck = new Set();
    this.dead = null;
    this.flash = 0;
  }

  get busOK() {
    const s = this;
    return { A: s.bat.A.online || (s.cross && s.bat.B.online), B: s.bat.B.online || (s.cross && s.bat.A.online), E: s.bat.E.online };
  }
  powered(id) {
    const b = this.breakers[id];
    if (!b.closed || b.tripped) return false;
    const bus = this.busOK;
    if (b.bus === 'E') return bus.E || bus.A || bus.B;
    return bus[b.bus];
  }
  // leak flow through an orifice: Q = Cd*A*sqrt(2*dP/rho)
  static orifice(areaMM2, dP) {
    return 0.62 * areaMM2 * 1e-6 * Math.sqrt(Math.max(0, 2 * dP / 1025)) * 1000; // L/s
  }

  step(dt, env) {
    const sub = this.sub;
    const depth = sub.depth;
    const seaP = pressureAt(depth);
    const dP = seaP - this.cabinP * 1e5;
    const seaT = temperatureAt(depth);

    // ------------------------------------------------ electrical loads
    const L = this.loads;
    const pw = (id) => this.powered(id);
    sub.powerAvail = pw('PROP') ? clamp(0.25 + 0.75 * Math.min(this.bat.A.soc, 1) / 0.25, 0, 1) * (this.bat.A.online || this.cross ? 1 : 0) : 0;
    L.PROP = pw('PROP') ? sub.thrPower : 0;
    L.LIGHT = pw('LIGHT') ? (this.lights.main * 2 * 450 + this.lights.flood * 4 * 180) : 0;
    L.HYD = pw('HYD') ? 250 + (sub.vbtPumpW || 0) + (Math.abs(sub.trimCmd) > 0.01 ? 900 : 0) : 0;
    L.SONAR = pw('SONAR') ? 140 : 0;
    L.NAV = pw('NAV') ? 180 : 0;
    L.LSS = pw('LSS') ? 60 + (this.scrubber.fan && this.scrubber.fanOK ? 110 : 0) : 0;
    L.CABIN = pw('CABIN') ? 90 + this.lights.cabin * 130 : 0;
    L.COMMS = pw('COMMS') ? 90 : 0;
    L.HEAT = pw('HEAT') ? 1800 : 0;
    L.CAM = pw('CAM') ? 110 : 0;
    if (!pw('HYD')) { sub.vbtPumpOK_power = false; } else sub.vbtPumpOK_power = true;
    let sumA = 0, sumB = 0, sumE = 0;
    for (const b of BREAKERS) {
      const w = L[b.id] || 0; this.breakers[b.id].load = w;
      if (b.bus === 'A') sumA += w; else if (b.bus === 'B') sumB += w; else sumE += w;
    }
    // routing: E bus fed from B if available (DC-DC), else from emergency battery
    const bus = this.busOK;
    const drawE = bus.B ? 0 : sumE;
    if (bus.B) sumB += sumE / 0.92;
    if (!this.bat.A.online && this.cross) { sumB += sumA; sumA = 0; }
    if (!this.bat.B.online && this.cross) { sumA += sumB; sumB = 0; }
    if (!this.bat.B.online && !this.cross) sumB = 0;
    if (!this.bat.A.online && !this.cross) sumA = 0;
    this.totalPower = sumA + sumB + drawE;
    this._drain(this.bat.A, sumA, dt, seaT);
    this._drain(this.bat.B, sumB, dt, seaT);
    this._drain(this.bat.E, drawE, dt, seaT);
    this.busA = sumA; this.busB = sumB; this.busE = drawE;

    // ------------------------------------------------ hull
    const H = this.hull;
    const stress = depth / SPEC.designDepth; // 1.0 at design depth
    H.stress = stress;
    H.fatigue += Math.max(0, stress - 0.6) ** 2 * dt * 2e-6 + (env.impact || 0) * 0.0015;
    // acrylic/sapphire viewport creep increases with pressure & cold
    H.viewportCreep += stress * stress * dt * 1.2e-6;
    // creaks: probability rises on pressure change
    H.creak = Math.max(0, H.creak - dt * 2);
    const dz = Math.abs(sub.vel.y);
    if (Math.random() < dt * (0.02 + stress * 0.06 + dz * 0.05 * stress)) H.creak = 0.4 + Math.random() * 0.6 * (0.3 + stress);
    // structural collapse
    const crushMargin = SPEC.crushDepth * (1 - H.fatigue * 3 - (1 - H.integrity) * 0.5 - H.crack * 0.3);
    if (depth > crushMargin && !this.dead) this.dead = 'implosion';
    if (depth > SPEC.designDepth * 1.02) H.integrity -= dt * 0.002 * (depth / SPEC.designDepth - 1) * 40;

    // ------------------------------------------------ leaks / flooding
    let inflow = 0;
    for (const id in this.pen) {
      const p = this.pen[id];
      if (p.leakArea <= 0) { p.leakRate = 0; continue; }
      let area = p.leakArea;
      if (p.isolated && id !== 'VP' && id !== 'HATCH') area *= 0.03;
      if (p.clamped > 0) area *= 1 - p.clamped;
      // leaks grow slowly under high pressure (erosion)
      p.leakArea += p.leakArea * dt * 0.004 * stress * (p.isolated ? 0.1 : 1);
      p.leakRate = Systems.orifice(area, Math.max(0, dP));
      inflow += p.leakRate;
    }
    this.inflow = inflow;
    sub.floodL += inflow * dt;
    // compress cabin air -> cabin pressure rises as water takes volume
    const airVol = Math.max(0.2, this.cabinVol - sub.floodL / 1000);
    this.cabinP = 1.013 * (this.cabinVol / airVol) * (this._airMul ?? 1);
    // wet electrics: water above ~120 L reaches the lower bus bars
    if (sub.floodL > 120) this._wet(dt, (sub.floodL - 120) / 400);
    if (sub.floodL > 2600 && !this.dead) this.dead = 'flooded';

    // ------------------------------------------------ fire
    const F = this.fire;
    if (F.active) {
      F.intensity = Math.min(1, F.intensity + dt * 0.02 * (this.o2 / 21));
      F.smoke = Math.min(1, F.smoke + F.intensity * dt * 0.02);
      this.o2 -= F.intensity * dt * 0.004;
      this.co2 += F.intensity * dt * 0.002;
      this.cabinT += F.intensity * dt * 0.08;
      if (F.loc && this.breakers[F.loc]?.closed && Math.random() < dt * 0.05) this.breakers[F.loc].tripped = true;
      if (this.o2 < 13) { F.intensity -= dt * 0.1; if (F.intensity <= 0) { F.active = false; this.msg('火災は酸素欠乏により鎮火', 'info'); } }
    } else {
      // smoke scrubbed by filter fan
      F.smoke = Math.max(0, F.smoke - dt * (this.scrubber.fan && this.scrubber.fanOK && pw('LSS') ? 0.004 : 0.0005));
    }

    // ------------------------------------------------ life support
    const moles = (this.cabinVol * 1000) / 22.4; // ~250 mol of gas
    const breath = this.emergencyMask ? 0 : 1;
    const metab = (0.35 + this.pilotStress * 0.4) / 60; // L/s O2 consumed
    const o2In = pw('LSS') && this.o2RegOK && this.o2Bottles > 0 ? this.o2Flow / 60 : 0;
    this.o2Bottles = Math.max(0, this.o2Bottles - o2In * dt);
    const volL = airVol * 1000;
    this.o2 += ((o2In - metab * breath) / volL) * 100 * dt;
    // CO2: produced ~0.29 L/min resting; LiOH scrubber removes when fan runs
    const co2Prod = (metab * 0.85) * breath;
    const scrubOn = pw('LSS') && this.scrubber.fan && this.scrubber.fanOK && this.scrubber.canister > 0;
    const eff = scrubOn ? 0.98 * Math.min(1, this.scrubber.canister * 4) : 0;
    const co2Rem = eff * (this.co2 / 100) * volL * 0.0075; // L/s
    this.co2 += ((co2Prod - co2Rem) / volL) * 100 * dt;
    this.scrubber.canister = Math.max(0, this.scrubber.canister - co2Rem * dt / (1.9 * 3600 * 0.29 / 60 * 12));
    this.o2 = clamp(this.o2, 0, 60); this.co2 = clamp(this.co2, 0, 20);
    // thermal: sphere conducts to the sea, heater + electronics + body warm it
    const heatIn = (pw('HEAT') ? 1800 : 0) + this.totalPower * 0.02 + 110 + F.intensity * 8000;
    const heatOut = (this.cabinT - seaT) * 42;
    this.cabinT += ((heatIn - heatOut) / 18000) * dt;
    // humidity rises from respiration, condenses on cold walls
    this.rh = clamp(this.rh + dt * (0.004 + (this.cabinT - seaT) * 0.00008) - (scrubOn ? dt * 0.003 : 0), 20, 100);
    this.condensation = clamp((this.rh - 70) / 25, 0, 1) * clamp((this.cabinT - seaT - 5) / 15, 0, 1);

    // ------------------------------------------------ physiology
    const pO2 = this.o2 * this.cabinP * 10; // kPa-ish (21% at 1 bar = 21 kPa -> *10 hPa..)
    const inspO2 = this.emergencyMask ? 30 : this.o2 * this.cabinP;
    this.hypoxia = clamp(this.hypoxia + dt * (inspO2 < 16 ? (16 - inspO2) * 0.004 : -0.01), 0, 1);
    const inspCO2 = this.emergencyMask ? 0.2 : this.co2 * this.cabinP;
    this.hypercapnia = clamp(this.hypercapnia + dt * (inspCO2 > 2.0 ? (inspCO2 - 2) * 0.0025 : -0.01), 0, 1);
    this.hypothermia = clamp(this.hypothermia + dt * (this.cabinT < 12 ? (12 - this.cabinT) * 0.00015 : -0.002), 0, 1);
    const smokeTox = this.emergencyMask ? 0 : F.smoke;
    this.pilotHealth = clamp(this.pilotHealth - dt * (this.hypoxia * 0.004 + this.hypercapnia * 0.003 + this.hypothermia * 0.002 + smokeTox * 0.003 + (this.cabinP > 3 ? (this.cabinP - 3) * 0.002 : 0)) + dt * 0.0002, 0, 1);
    if (this.emergencyMask) { this.emergencyO2 = Math.max(0, this.emergencyO2 - dt / 3600); if (this.emergencyO2 <= 0) { this.emergencyMask = false; this.msg('緊急呼吸器の酸素が尽きた', 'warn'); } }
    this.pilotStress = clamp(this.pilotStress + dt * (this.activeCautions > 0 ? 0.01 : -0.004), 0, 1);
    if (this.pilotHealth <= 0 && !this.dead) this.dead = this.hypoxia > this.hypercapnia ? 'hypoxia' : 'co2';
    if (this.bat.A.soc <= 0 && this.bat.B.soc <= 0 && this.bat.E.soc <= 0 && !this.dead) this.dead = 'power';

    // ------------------------------------------------ comms (UQC range ~ 12 km slant from support ship above start)
    const slant = Math.hypot(sub.pos.x - 0, sub.pos.y, sub.pos.z - 150);
    this.comms.signal = pw('COMMS') && this.sensors.comms ? clamp(1.25 - slant / 14000, 0, 1) * (0.85 + 0.15 * Math.sin(sub.time * 0.3)) : 0;

    // sensors drift
    if (!this.sensors.depth) this.sensors.depthDrift += dt * 0.35;
    if (!this.sensors.gyro) this.sensors.gyroDrift += dt * 0.0035;
    this.flash = Math.max(0, this.flash - dt * 3);
  }

  _drain(b, watts, dt, seaT) {
    if (!b.online) { b.i = 0; return; }
    const kWh = watts * dt / 3.6e6;
    b.soc = Math.max(0, b.soc - kWh / b.cap);
    const nom = b.cap > 10 ? 302 : 28.4;
    const R = b.cap > 10 ? 0.12 : 0.03;
    const ocv = nom * (0.86 + 0.18 * b.soc - 0.04 * Math.exp(-b.soc * 20));
    b.i = watts / Math.max(ocv, 1);
    b.v = ocv - b.i * R * (1 + Math.max(0, 10 - b.temp) * 0.04);
    b.temp += (b.i * b.i * R * 0.00005 - (b.temp - 4 - seaT * 0.5) * 0.004 + (b.fault === 'thermal' ? 0.6 : 0)) * dt;
    if (b.temp > 75 && b.fault !== 'thermal') { b.fault = 'thermal'; this.msg(`バッテリー${b === this.bat.A ? 'A' : b === this.bat.B ? 'B' : 'E'} 熱暴走の兆候`, 'alarm'); }
    if (b.soc <= 0) { b.online = false; this.msg('バッテリー枯渇: 系統オフライン', 'alarm'); }
  }
  _wet(dt, k) {
    // insulation resistance falls, eventually ground faults trip breakers
    for (const n of ['A', 'B']) this.bat[n].iso = Math.max(0.05, this.bat[n].iso - dt * k * 0.3);
    if (Math.random() < dt * k * 0.05) {
      const cands = BREAKERS.filter((b) => this.breakers[b.id].closed && !this.breakers[b.id].tripped);
      if (cands.length) { const b = cands[(Math.random() * cands.length) | 0]; this.breakers[b.id].tripped = true; this.msg(`地絡: ${b.name} ブレーカー トリップ`, 'warn'); }
    }
  }

  msg(text, level = 'info') {
    this.messages.push({ text, level, t: this.sub.time });
    if (this.messages.length > 80) this.messages.shift();
    this.onMessage?.(text, level);
  }

  // ------------------------------------------------ crew actions
  toggleBreaker(id) {
    const b = this.breakers[id];
    if (b.tripped) { b.tripped = false; b.closed = true; this.msg(`${b.name} ブレーカー リセット`); return; }
    b.closed = !b.closed;
    this.msg(`${b.name} ブレーカー ${b.closed ? '投入' : '開放'}`);
  }
  isolate(id) {
    const p = this.pen[id];
    if (id === 'VP' || id === 'HATCH') return false;
    p.isolated = !p.isolated;
    for (const f of p.feeds) { if (p.isolated) this.breakers[f].closed = false; }
    this.msg(`${p.name} ${p.isolated ? '遮断弁 閉' : '遮断弁 開'}`, p.isolated ? 'warn' : 'info');
    return true;
  }
  clampLeak(id, amount) {
    const p = this.pen[id];
    p.clamped = clamp(p.clamped + amount, 0, id === 'VP' ? 0.8 : 0.97);
  }
  extinguish() {
    if (this.fire.suppressant <= 0) { this.msg('消火剤が残っていない', 'warn'); return; }
    this.fire.suppressant--;
    if (this.fire.active) {
      this.fire.intensity -= 0.8;
      if (this.fire.intensity <= 0.05) { this.fire.active = false; this.fire.intensity = 0; this.msg('消火完了', 'info'); }
    }
    this.fire.smoke = Math.min(1, this.fire.smoke + 0.15);
    this.co2 += 0.6; // CO2 extinguisher
  }
  swapCanister() {
    if (this.scrubber.spare <= 0) { this.msg('予備の水酸化リチウムキャニスターが無い', 'warn'); return; }
    this.scrubber.spare--; this.scrubber.canister = 1; this.msg('CO2吸収キャニスター交換完了');
  }
  toggleMask() {
    if (!this.emergencyMask && this.emergencyO2 <= 0) this.emergencyO2 = this.emergencyO2 === 0 && !this._maskUsed ? 1.5 : 0;
    if (!this.emergencyMask && this.emergencyO2 <= 0) { this.msg('緊急呼吸器は使い切った', 'warn'); return; }
    this._maskUsed = true;
    this.emergencyMask = !this.emergencyMask;
    this.msg(this.emergencyMask ? '緊急呼吸器 装着' : '緊急呼吸器 外した');
  }

  serialize() {
    const o = {};
    for (const k of ['o2', 'co2', 'cabinT', 'rh', 'o2Bottles', 'o2Flow', 'cross', 'emergencyO2', '_maskUsed', 'pilotHealth']) o[k] = this[k];
    o.bat = JSON.parse(JSON.stringify(this.bat));
    o.hull = { ...this.hull };
    o.scrubber = { ...this.scrubber };
    o.lights = { ...this.lights };
    o.breakers = Object.fromEntries(Object.entries(this.breakers).map(([k, b]) => [k, { closed: b.closed, tripped: b.tripped }]));
    o.pen = Object.fromEntries(Object.entries(this.pen).map(([k, p]) => [k, { leakArea: p.leakArea, isolated: p.isolated, clamped: p.clamped }]));
    o.fire = { ...this.fire };
    o.sensors = { ...this.sensors };
    return o;
  }
  restore(o) {
    for (const k of ['o2', 'co2', 'cabinT', 'rh', 'o2Bottles', 'o2Flow', 'cross', 'emergencyO2', '_maskUsed', 'pilotHealth']) if (o[k] !== undefined) this[k] = o[k];
    Object.assign(this.bat.A, o.bat.A); Object.assign(this.bat.B, o.bat.B); Object.assign(this.bat.E, o.bat.E);
    Object.assign(this.hull, o.hull); Object.assign(this.scrubber, o.scrubber); Object.assign(this.lights, o.lights);
    for (const k in o.breakers) Object.assign(this.breakers[k], o.breakers[k]);
    for (const k in o.pen) Object.assign(this.pen[k], o.pen[k]);
    Object.assign(this.fire, o.fire); Object.assign(this.sensors, o.sensors);
  }
}
