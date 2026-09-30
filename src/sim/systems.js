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
    this.emergencyO2 = 1.5;           // hours of emergency rebreather (full from the start: the tablet read '0 min')
    this.emergencyMask = false;
    this.pilotStress = 0; this.pilotHealth = 1; this.hypoxia = 0; this.hypercapnia = 0; this.hypothermia = 0;
    // --- hull
    this.hull = { integrity: 1, fatigue: 0, viewportCreep: 0, creak: 0, crack: 0 };
    this.pen = Object.fromEntries(PENETRATORS.map((p) => [p.id, { ...p, leakArea: 0, isolated: false, clamped: 0, leakRate: 0 }]));
    this.fire = { active: false, intensity: 0, loc: null, smoke: 0, suppressant: 2 };
    this.sensors = { depth: true, dvl: true, sonar: true, gyro: true, comms: true, cams: true, depthDrift: 0, gyroDrift: 0 };
    this.comms = { signal: 1, lastContact: 0 };
    this.messages = [];
    this.dead = null;
    this.flash = 0;                   // >0: MFD brown-out flicker (low bus voltage / trips / string loss)
  }

  get busOK() {
    const s = this;
    return { A: s.bat.A.online || (s.cross && s.bat.B.online), B: s.bat.B.online || (s.cross && s.bat.A.online), E: s.bat.E.online };
  }
  powered(id) {
    const b = this.breakers[id];
    if (!b || !b.closed || b.tripped) return false;
    const bus = this.busOK;
    // E bus is fed by DC-DC from bus B only (as modelled in step()), else by the emergency battery
    if (b.bus === 'E') return bus.E || bus.B;
    return bus[b.bus];
  }
  // a penetrator with its isolation valve shut blocks this breaker's feed
  blocked(id) { return PENETRATORS.some((p) => this.pen[p.id].isolated && p.feeds.includes(id)); }
  // state of charge of whatever string actually feeds main bus A/B (honours offline strings + cross-tie)
  busSoc(bus) {
    const own = bus === 'A' ? this.bat.A : this.bat.B, other = bus === 'A' ? this.bat.B : this.bat.A;
    if (own.online) return own.soc;
    if (this.cross && other.online) return other.soc;
    return 0;
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
    const propSoc = this.bat.A.online ? this.bat.A.soc : this.cross && this.bat.B.online ? this.bat.B.soc : 0;
    sub.powerAvail = pw('PROP') && propSoc > 0 ? clamp(0.25 + 0.75 * propSoc / 0.25, 0, 1) : 0;
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
    let sumA = 0, sumB = 0, sumE = 0;
    for (const b of BREAKERS) {
      const w = L[b.id] || 0; this.breakers[b.id].load = w;
      if (b.bus === 'A') sumA += w; else if (b.bus === 'B') sumB += w; else sumE += w;
    }
    // routing: E bus fed from B if available (DC-DC), else from emergency battery
    const bus = this.busOK;
    const drawE = bus.B ? 0 : this.bat.E.online ? sumE : 0;
    if (bus.B) sumB += sumE / 0.92;
    // cross-tie: a dead string's bus is carried by the other one (only if that one is online);
    // before, with both offline + cross-tie the load bounced back onto the offline string A
    if (!this.bat.A.online) { if (this.cross && this.bat.B.online) sumB += sumA; sumA = 0; }
    if (!this.bat.B.online) { if (this.cross && this.bat.A.online) sumA += sumB; sumB = 0; }
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
    env.impact = 0; // consumed here (Incidents accumulates it; it used to be cleared before this read it)
    // acrylic/sapphire viewport creep increases with pressure & cold
    H.viewportCreep += stress * stress * dt * 1.2e-6;
    // creaks: probability rises on pressure change
    H.creak = Math.max(0, H.creak - dt * 2);
    const dz = Math.abs(sub.vel.y);
    if (Math.random() < dt * (0.02 + stress * 0.06 + dz * 0.05 * stress)) H.creak = 0.4 + Math.random() * 0.6 * (0.3 + stress);
    // structural collapse
    const crushMargin = SPEC.crushDepth * (1 - H.fatigue * 3 - (1 - H.integrity) * 0.5 - H.crack * 0.3);
    if (depth > crushMargin && !this.dead) this.dead = 'implosion';
    if (depth > SPEC.designDepth * 1.02) H.integrity = Math.max(0, H.integrity - dt * 0.002 * (depth / SPEC.designDepth - 1) * 40);

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
    // bilge hand pump slowly removes water once the leaks are stopped (flood level could never fall)
    if (inflow < 0.001 && sub.floodL > 0) sub.floodL = Math.max(0, sub.floodL - dt * 0.05);
    // compress cabin air -> cabin pressure rises as water takes volume
    const airVol = Math.max(0.2, this.cabinVol - sub.floodL / 1000);
    this.cabinP = 1.013 * (this.cabinVol / airVol) * (this._airMul ?? 1);
    // wet electrics: water above ~120 L reaches the lower bus bars
    if (sub.floodL > 120) this._wet(dt, (sub.floodL - 120) / 400);
    if (sub.floodL > 2600 && !this.dead) this.dead = 'flooded';

    // ------------------------------------------------ fire
    const F = this.fire;
    if (F.active) {
      // an electrical fire is fed by its energised panel: once de-energised it only smoulders and dies out
      // (growth 0.02*O2/21 used to outrun the 0.012 decay, so a de-energised fire kept growing)
      const fb = F.loc && this.breakers[F.loc];
      const live = !fb || pw(F.loc);
      F.intensity = Math.min(1, F.intensity + dt * (live ? 0.02 * (this.o2 / 21) : -0.015));
      F.smoke = Math.min(1, F.smoke + F.intensity * dt * 0.02);
      this.o2 -= F.intensity * dt * 0.004;
      this.co2 += F.intensity * dt * 0.002;
      this.cabinT += F.intensity * dt * 0.08;
      if (fb && fb.closed && !fb.tripped && Math.random() < dt * 0.05) { fb.tripped = true; this.flash = 0.5; }
      if (this.o2 < 13) F.intensity -= dt * 0.1;
      if (F.intensity <= 0) { F.active = false; F.intensity = 0; this.msg(this.o2 < 13 ? '火災は酸素欠乏により鎮火' : '火災鎮火', 'info'); }
    } else {
      // smoke scrubbed by filter fan
      F.smoke = Math.max(0, F.smoke - dt * (this.scrubber.fan && this.scrubber.fanOK && pw('LSS') ? 0.004 : 0.0005));
    }

    // ------------------------------------------------ life support
    const breath = this.emergencyMask ? 0 : 1;
    const metab = (0.35 + this.pilotStress * 0.4) / 60; // L/s O2 consumed
    // manual bypass valve is mechanical: works without LSS power / with a broken regulator
    const o2In = (this._bypass || (pw('LSS') && this.o2RegOK)) && this.o2Bottles > 0 ? this.o2Flow / 60 : 0;
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
    const inspO2 = this.emergencyMask ? 30 : this.o2 * this.cabinP;
    this.hypoxia = clamp(this.hypoxia + dt * (inspO2 < 16 ? (16 - inspO2) * 0.004 : -0.01), 0, 1);
    const inspCO2 = this.emergencyMask ? 0.2 : this.co2 * this.cabinP;
    this.hypercapnia = clamp(this.hypercapnia + dt * (inspCO2 > 2.0 ? (inspCO2 - 2) * 0.0025 : -0.01), 0, 1);
    this.hypothermia = clamp(this.hypothermia + dt * (this.cabinT < 12 ? (12 - this.cabinT) * 0.00015 : -0.002), 0, 1);
    const smokeTox = this.emergencyMask ? 0 : F.smoke;
    // per-cause damage rates: the dominant one names the death (smoke / cold / pressure all read 'CO2')
    const harm = { hypoxia: this.hypoxia * 0.004, co2: this.hypercapnia * 0.003, hypothermia: this.hypothermia * 0.002, smoke: smokeTox * 0.003, pressure: this.cabinP > 3 ? (this.cabinP - 3) * 0.002 : 0 };
    let dmg = 0; for (const k in harm) dmg += harm[k];
    this.pilotHealth = clamp(this.pilotHealth - dt * dmg + dt * 0.0002, 0, 1);
    if (this.emergencyMask) { this.emergencyO2 = Math.max(0, this.emergencyO2 - dt / 3600); if (this.emergencyO2 <= 0) { this.emergencyMask = false; this.msg('緊急呼吸器の酸素が尽きた', 'warn'); } }
    this.pilotStress = clamp(this.pilotStress + dt * (this.activeCautions > 0 ? 0.01 : -0.004), 0, 1);
    if (this.pilotHealth <= 0 && !this.dead) { let best = 'hypoxia', bv = -1; for (const k in harm) if (harm[k] > bv) { bv = harm[k]; best = k; } this.dead = best; }
    // total power loss = no string can feed anything (offline strings count, not only an exact 0 % SoC)
    const alive = (b) => b.online && b.soc > 0;
    if (!alive(this.bat.A) && !alive(this.bat.B) && !alive(this.bat.E) && !this.dead) this.dead = 'power';

    // ------------------------------------------------ comms (UQC range ~ 12 km slant from support ship above start)
    const slant = Math.hypot(sub.pos.x + 10, sub.pos.y, sub.pos.z - 150); // mothership is at (-10, 0, 150)
    this.comms.signal = pw('COMMS') && this.sensors.comms ? clamp(1.25 - slant / 14000, 0, 1) * (0.85 + 0.15 * Math.sin(sub.time * 0.3)) : 0;

    // sensors drift
    if (!this.sensors.depth) this.sensors.depthDrift += dt * 0.35;
    if (!this.sensors.gyro) this.sensors.gyroDrift += dt * 0.0035;
    this.flash = Math.max(0, this.flash - dt * 3);
  }

  _drain(b, watts, dt, seaT) {
    const name = b === this.bat.A ? 'A' : b === this.bat.B ? 'B' : 'E';
    const cool = (b.temp - 4 - seaT * 0.5) * 0.004;
    if (!b.online) {
      // an offline string still cools towards the sea (it stayed at its cut-off temperature forever);
      // a thermal runaway keeps self-heating inside the pack and only clears once it has cooled right down
      b.i = 0;
      b.temp += ((b.fault === 'thermal' ? 0.25 : 0) - cool * 1.5) * dt;
      if (b.fault === 'thermal' && b.temp < 35) { b.fault = null; this.msg(`バッテリー${name} 冷却完了 — 熱暴走が収まった`, 'info'); }
      return;
    }
    const kWh = watts * dt / 3.6e6;
    b.soc = Math.max(0, b.soc - kWh / b.cap);
    const nom = b.cap > 10 ? 302 : 28.4;
    const R = b.cap > 10 ? 0.12 : 0.03;
    const ocv = nom * (0.86 + 0.18 * b.soc - 0.04 * Math.exp(-b.soc * 20));
    b.i = watts / Math.max(ocv, 1);
    b.v = ocv - b.i * R * (1 + Math.max(0, 10 - b.temp) * 0.04);
    // cell imbalance: the weak cell heats and escalates into a thermal runaway in ~20 min unless the load is
    // shed (slows it ~3x), the string isolated or the BMS balances it (the fault used to have no effect at all)
    let cell = 0;
    if (b.fault === 'cell') {
      b.cellT = (b.cellT || 0) + dt * (this.sub.thrustLimit <= 0.5 ? 0.25 : 1);
      cell = 0.04 + b.cellT * 0.00028 + b.i * 0.0008;
    }
    b.temp += (b.i * b.i * R * 0.00005 - cool + cell + (b.fault === 'thermal' ? 0.6 : 0)) * dt;
    if (b.fault === 'cell' && b.temp > 45 && !b._cellWarn) { b._cellWarn = true; this.msg(`バッテリー${name} 温度上昇中 — セル不均衡`, 'warn'); }
    if (b.temp > 75 && b.fault !== 'thermal') { b.fault = 'thermal'; b._cellWarn = false; b.cellT = 0; this.msg(`バッテリー${name} 熱暴走の兆候`, 'alarm'); }
    if (b.fault === 'thermal' && b.temp > 110 && b.online) { b.online = false; this.flash = 1; this.msg(`バッテリー${name} 過熱保護で自動遮断`, 'alarm'); }
    if (b.soc <= 0) { b.online = false; this.flash = 1; this.msg('バッテリー枯渇: 系統オフライン', 'alarm'); }
    // sagging terminal voltage: MFDs brown out / flicker
    if (b.cap > 10 && watts > 0 && b.v < 272 && Math.random() < dt * 2) this.flash = Math.max(this.flash, 0.15);
  }
  // pilot switch for a main string. Returns false (with a message) when an interlock refuses it.
  setBattery(n, online) {
    const b = this.bat[n];
    if (!b) return false;
    if (online) {
      if (b.soc <= 0) { this.msg(`バッテリー${n} は枯渇している`, 'warn'); return false; }
      // thermal interlock: a string that tripped on runaway stays out until it has cooled
      if (b.fault === 'thermal') { this.msg(`バッテリー${n} 熱暴走インターロック — 冷却まで接続不可 (${Math.round(b.temp)}°C)`, 'warn'); return false; }
    }
    b.online = online;
    this.msg(`バッテリー${n} ${online ? '接続' : '切離'}`, 'warn');
    return true;
  }
  _wet(dt, k) {
    // insulation resistance falls, eventually ground faults trip breakers
    for (const n of ['A', 'B']) this.bat[n].iso = Math.max(0.05, this.bat[n].iso - dt * k * 0.3);
    if (Math.random() < dt * k * 0.05) {
      const cands = BREAKERS.filter((b) => this.breakers[b.id].closed && !this.breakers[b.id].tripped);
      if (cands.length) { const b = cands[(Math.random() * cands.length) | 0]; this.breakers[b.id].tripped = true; this.flash = 0.4; this.msg(`地絡: ${b.name} ブレーカー トリップ`, 'warn'); }
    }
  }

  msg(text, level = 'info') {
    this.record(text, level);
    this.onMessage?.(text, level);
  }
  // log only (no ticker); keeps the 80-entry cap that direct pushes used to bypass
  record(text, level = 'info') {
    this.messages.push({ text, level, t: this.sub.time });
    while (this.messages.length > 80) this.messages.shift();
  }

  // ------------------------------------------------ crew actions
  toggleBreaker(id) {
    const b = this.breakers[id];
    if (!b) return false;
    // a feed-through with its isolation valve shut cannot be re-energised — not via trip -> reset either
    if ((b.tripped || !b.closed) && this.blocked(id)) { this.msg(`${b.name}: 貫通部が隔離中 — 投入不可`, 'warn'); return false; }
    if (b.tripped) { b.tripped = false; b.closed = true; this.msg(`${b.name} ブレーカー リセット`); return true; }
    b.closed = !b.closed;
    this.msg(`${b.name} ブレーカー ${b.closed ? '投入' : '開放'}`);
    return true;
  }
  isolate(id) {
    const p = this.pen[id];
    if (!p || id === 'VP' || id === 'HATCH') return false;
    p.isolated = !p.isolated;
    for (const f of p.feeds) {
      const b = this.breakers[f];
      if (p.isolated) {
        // remember the pre-isolation position once (a breaker behind two isolated penetrators keeps the first)
        if (b.preIso === undefined) b.preIso = b.closed;
        b.closed = false;
      } else if (!this.blocked(f)) {
        // re-open: restore what it was before (an OFF heater used to be switched on), then forget it
        if (b.preIso !== undefined) b.closed = b.preIso;
        delete b.preIso;
      }
    }
    this.msg(`${p.name} ${p.isolated ? '遮断弁 閉' : '遮断弁 開'}`, p.isolated ? 'warn' : 'info');
    return true;
  }
  clampLeak(id, amount) {
    const p = this.pen[id];
    if (!p) return;
    p.clamped = clamp(p.clamped + amount, 0, id === 'VP' ? 0.8 : 0.97);
  }
  extinguish() {
    if (this.fire.suppressant <= 0) { this.msg('消火剤が残っていない', 'warn'); return; }
    this.fire.suppressant--;
    this.msg(`消火器使用 (残${this.fire.suppressant})`);
    if (this.fire.active) {
      this.fire.intensity -= 0.8;
      if (this.fire.intensity <= 0.05) { this.fire.active = false; this.fire.intensity = 0; this.msg('消火完了', 'info'); }
    }
    this.fire.smoke = Math.min(1, this.fire.smoke + 0.15);
    this.co2 = Math.min(20, this.co2 + 0.6); // CO2 extinguisher
  }
  swapCanister() {
    if (this.scrubber.spare <= 0) { this.msg('予備の水酸化リチウムキャニスターが無い', 'warn'); return; }
    this.scrubber.spare--; this.scrubber.canister = 1; this.msg('CO2吸収キャニスター交換完了');
  }
  toggleMask() {
    if (!this.emergencyMask && this.emergencyO2 <= 0) { this.msg('緊急呼吸器は使い切った', 'warn'); return; }
    this.emergencyMask = !this.emergencyMask;
    this.msg(this.emergencyMask ? '緊急呼吸器 装着' : '緊急呼吸器 外した');
  }

  serialize() {
    const o = {};
    for (const k of ['o2', 'co2', 'cabinT', 'rh', 'o2Bottles', 'o2Flow', 'cross', 'emergencyO2', 'emergencyMask', '_bypass', 'pilotHealth', 'pilotStress', 'hypoxia', 'hypercapnia', 'hypothermia', 'o2RegOK']) o[k] = this[k];
    o.messages = this.messages.slice(-40);
    o.bat = JSON.parse(JSON.stringify(this.bat));
    o.hull = { ...this.hull };
    o.scrubber = { ...this.scrubber };
    o.lights = { ...this.lights };
    o.breakers = Object.fromEntries(Object.entries(this.breakers).map(([k, b]) => [k, { closed: b.closed, tripped: b.tripped, preIso: b.preIso }]));
    o.pen = Object.fromEntries(Object.entries(this.pen).map(([k, p]) => [k, { leakArea: p.leakArea, isolated: p.isolated, clamped: p.clamped }]));
    o.fire = { ...this.fire };
    o.sensors = { ...this.sensors };
    return o;
  }
  restore(o) {
    for (const k of ['o2', 'co2', 'cabinT', 'rh', 'o2Bottles', 'o2Flow', 'emergencyO2', 'pilotHealth', 'pilotStress', 'hypoxia', 'hypercapnia', 'hypothermia']) if (Number.isFinite(o[k])) this[k] = o[k];
    // saves from before the rebreather started full: 0 h but never worn means it is still full
    if (o.emergencyO2 === 0 && o._maskUsed === false) this.emergencyO2 = 1.5;
    for (const k of ['cross', 'emergencyMask', '_bypass']) if (o[k] !== undefined) this[k] = !!o[k];
    if (Array.isArray(o.messages)) this.messages = o.messages.filter((m) => m && typeof m.text === 'string').slice(-80);
    if (o.bat) for (const n of ['A', 'B', 'E']) if (o.bat[n]) Object.assign(this.bat[n], o.bat[n]);
    Object.assign(this.hull, o.hull || {}); Object.assign(this.scrubber, o.scrubber || {}); Object.assign(this.lights, o.lights || {});
    for (const k in o.breakers || {}) {
      const b = this.breakers[k], s = o.breakers[k];
      if (!b || !s) continue;
      b.closed = s.closed !== false; b.tripped = !!s.tripped;
      if (typeof s.preIso === 'boolean') b.preIso = s.preIso; else delete b.preIso;
    }
    for (const k in o.pen || {}) if (this.pen[k]) Object.assign(this.pen[k], o.pen[k]);
    Object.assign(this.fire, o.fire || {}); Object.assign(this.sensors, o.sensors || {});
    if (o.o2RegOK !== undefined) this.o2RegOK = o.o2RegOK;
  }
}
