// Incident / failure engine.
// Hazard-rate based random faults (rate grows with depth, stress, age, damage) plus
// physically-triggered events (collisions, vent heat, over-depth, flooding cascades).
// Each active fault exposes repair procedures the pilot can execute from the
// damage-control tablet. Procedures take time and some require resources.
import { THRUSTERS } from './sub.js';
import { POIS } from '../world/density.js';

const rnd = Math.random;
const pick = (a) => a[(rnd() * a.length) | 0];

// catalogue: weight (relative likelihood), minDepth, apply(ctx) -> fault object
const CATALOGUE = [
  {
    id: 'leak_pen', w: 1.3, minDepth: 150, apply(c) {
      const pen = pick(['P1', 'P2', 'P3', 'P4']);
      const p = c.sys.pen[pen];
      if (p.leakArea > 0) return null;
      p.leakArea = 0.4 + rnd() * 1.6; // mm^2
      return { kind: 'leak', target: pen, sev: 2, title: `浸水: ${p.name}`, en: `LEAK ${p.en}`, sfx: 'leak', loc: pen };
    },
  },
  {
    id: 'leak_vp', w: 0.35, minDepth: 1500, apply(c) {
      const p = c.sys.pen.VP;
      if (p.leakArea > 0) return null;
      p.leakArea = 0.15 + rnd() * 0.35;
      return { kind: 'leak', target: 'VP', sev: 3, title: '浸水: 主観測窓シールから滲出', en: 'VIEWPORT SEAL WEEP', sfx: 'leak', loc: 'VP' };
    },
  },
  {
    id: 'thr_overheat', w: 1.0, minDepth: 0, apply(c) {
      const t = pick(c.sub.thr.filter((t) => !t.fault));
      if (!t) return null;
      t.temp += 45;
      return { kind: 'thruster', target: t.id, sev: 1, title: `${t.name}スラスター 過熱`, en: `${t.en} OVERTEMP`, note: 'モーター巻線温度上昇。出力を下げるか停止して冷却せよ。' };
    },
  },
  {
    id: 'thr_bearing', w: 0.6, minDepth: 300, apply(c) {
      const t = pick(c.sub.thr.filter((t) => !t.fault));
      if (!t) return null;
      t.fault = 'degraded';
      return { kind: 'thruster', target: t.id, sev: 2, title: `${t.name}スラスター 軸受劣化`, en: `${t.en} BEARING`, sfx: 'grind' };
    },
  },
  {
    id: 'thr_fail', w: 0.45, minDepth: 500, apply(c) {
      const t = pick(c.sub.thr.filter((t) => t.fault !== 'failed'));
      if (!t) return null;
      t.fault = 'failed';
      return { kind: 'thruster', target: t.id, sev: 2, title: `${t.name}スラスター 故障 (モーターコントローラ)`, en: `${t.en} MCU FAULT`, sfx: 'clunk' };
    },
  },
  {
    id: 'ground_fault', w: 0.8, minDepth: 0, apply(c) {
      const ids = ['PROP', 'LIGHT', 'HYD', 'SONAR', 'NAV', 'CAM', 'COMMS'];
      const id = pick(ids);
      const b = c.sys.breakers[id];
      if (!b.closed || b.tripped) return null;
      b.tripped = true;
      return { kind: 'elec', target: id, sev: 1, title: `地絡: ${b.name} ブレーカー トリップ`, en: `GND FAULT ${b.en}`, sfx: 'breaker', auto: true };
    },
  },
  {
    id: 'battery_cell', w: 0.35, minDepth: 800, apply(c) {
      const n = pick(['A', 'B']);
      const b = c.sys.bat[n];
      if (b.fault || !b.online) return null;
      b.fault = 'cell';
      b.temp += 12;
      return { kind: 'battery', target: n, sev: 2, title: `バッテリー${n} セル電圧不均衡・温度上昇`, en: `BATT ${n} CELL IMBAL`, note: '放置すると熱暴走の恐れ。負荷を下げるか系統を切り離せ。' };
    },
  },
  {
    id: 'fire', w: 0.22, minDepth: 400, apply(c) {
      if (c.sys.fire.active) return null;
      const loc = pick(['CABIN', 'NAV', 'SONAR', 'HEAT']);
      c.sys.fire.active = true; c.sys.fire.intensity = 0.08; c.sys.fire.loc = loc;
      return { kind: 'fire', target: loc, sev: 3, title: `電気火災: ${c.sys.breakers[loc].name} 配電盤から発煙`, en: 'ELECTRICAL FIRE', sfx: 'fire' };
    },
  },
  {
    id: 'scrubber_fan', w: 0.5, minDepth: 0, apply(c) {
      if (!c.sys.scrubber.fanOK) return null;
      c.sys.scrubber.fanOK = false;
      return { kind: 'lss', target: 'fan', sev: 2, title: 'CO2スクラバー ファン停止', en: 'SCRUBBER FAN FAIL', note: 'CO2が蓄積する。ファン修理か緊急呼吸器を使用せよ。' };
    },
  },
  {
    id: 'o2_reg', w: 0.35, minDepth: 0, apply(c) {
      if (!c.sys.o2RegOK) return null;
      c.sys.o2RegOK = false;
      return { kind: 'lss', target: 'o2', sev: 2, title: 'O2レギュレーター 固着', en: 'O2 REGULATOR STUCK' };
    },
  },
  {
    id: 'vbt_valve', w: 0.4, minDepth: 200, apply(c) {
      if (!c.sub.vbtValveOK) return null;
      c.sub.vbtValveOK = false;
      c.sub._vbtStuckOpen = true;
      return { kind: 'ballast', target: 'vbt', sev: 3, title: 'VBT注水弁 開固着 — 重くなり続けている！', en: 'VBT FLOOD VALVE STUCK OPEN', sfx: 'clunk', note: 'VBT系統を隔離するか、ウェイト投棄で浮力を確保せよ。' };
    },
  },
  {
    id: 'vbt_pump', w: 0.35, minDepth: 500, apply(c) {
      if (!c.sub.vbtPumpOK) return null;
      c.sub.vbtPumpOK = false;
      return { kind: 'ballast', target: 'pump', sev: 2, title: 'VBT排水ポンプ 故障', en: 'VBT PUMP FAIL' };
    },
  },
  {
    id: 'trim_pump', w: 0.3, minDepth: 0, apply(c) {
      if (!c.sub.trimPumpOK) return null;
      c.sub.trimPumpOK = false;
      return { kind: 'ballast', target: 'trim', sev: 1, title: 'トリムポンプ 故障', en: 'TRIM PUMP FAIL' };
    },
  },
  {
    id: 'depth_sensor', w: 0.3, minDepth: 300, apply(c) {
      if (!c.sys.sensors.depth) return null;
      c.sys.sensors.depth = false;
      return { kind: 'sensor', target: 'depth', sev: 1, title: '深度計 (水晶式圧力計) ドリフト', en: 'DEPTH SENSOR DRIFT', silent: true, note: '深度表示が徐々にずれる。バックアップ深度計と比較せよ。' };
    },
  },
  {
    id: 'gyro', w: 0.3, minDepth: 0, apply(c) {
      if (!c.sys.sensors.gyro) return null;
      c.sys.sensors.gyro = false;
      return { kind: 'sensor', target: 'gyro', sev: 1, title: 'ジャイロコンパス (FOG) 異常', en: 'GYRO FAULT', note: '方位保持が不安定になる。' };
    },
  },
  {
    id: 'dvl', w: 0.35, minDepth: 0, apply(c) {
      if (!c.sys.sensors.dvl) return null;
      c.sys.sensors.dvl = false;
      return { kind: 'sensor', target: 'dvl', sev: 1, title: 'DVL (ドップラー速度計) 信号喪失', en: 'DVL LOST', note: '対地速度・高度保持が不能。' };
    },
  },
  {
    id: 'sonar', w: 0.3, minDepth: 0, apply(c) {
      if (!c.sys.sensors.sonar) return null;
      c.sys.sensors.sonar = false;
      return { kind: 'sensor', target: 'sonar', sev: 1, title: '前方障害物ソナー 故障', en: 'OAS SONAR FAIL' };
    },
  },
  {
    id: 'comms', w: 0.35, minDepth: 0, apply(c) {
      if (!c.sys.sensors.comms) return null;
      c.sys.sensors.comms = false;
      return { kind: 'sensor', target: 'comms', sev: 1, title: '水中通話機 (UQC) 故障 — 母船との交信途絶', en: 'UQC FAIL' };
    },
  },
  {
    id: 'light_implode', w: 0.4, minDepth: 2000, apply(c) {
      if (c.sys.lights.extFault >= 2) return null;
      c.sys.lights.extFault++;
      return { kind: 'light', target: 'ext', sev: 1, title: '外部LEDライト 圧壊', en: 'EXT LAMP IMPLOSION', sfx: 'bang', shake: 0.5, note: 'ランプハウジングが圧壊。衝撃波で船体に振動。' };
    },
  },
  {
    id: 'crack', w: 0.12, minDepth: 5000, apply(c) {
      c.sys.hull.crack += 0.25;
      return { kind: 'hull', target: 'hull', sev: 3, title: '船殻 ひずみゲージ異常値 — 微小亀裂の可能性', en: 'HULL STRAIN ANOMALY', sfx: 'crack', shake: 0.9, note: '圧壊深度が低下した。直ちに浮上を検討せよ。' };
    },
  },
  {
    id: 'turbidity', w: 0.3, minDepth: 1000, apply(c) {
      c.env.turbidity = 1; c.env.turbidityT = 90 + rnd() * 120;
      return { kind: 'env', target: 'current', sev: 1, title: '混濁流 (海底乱泥流) 発生 — 強い海流と視界不良', en: 'TURBIDITY CURRENT', sfx: 'rumble', shake: 0.3, auto: true };
    },
  },
  {
    id: 'quake', w: 0.12, minDepth: 3000, apply(c) {
      c.env.quake = 6 + rnd() * 5;
      return { kind: 'env', target: 'quake', sev: 2, title: '海底地震を検知 — 落石に注意', en: 'SEISMIC EVENT', sfx: 'rumble', shake: 1.0, auto: true };
    },
  },
  {
    id: 'entangle', w: 0.25, minDepth: 0, near: ['wreck', 'destroyer', 'lander'], apply(c) {
      const t = pick(c.sub.thr.filter((t) => t.id === 'T1' || t.id === 'T2' || t.id === 'T4'));
      if (t.jam > 0) return null;
      t.jam = 0.7;
      c.sub.extraMass += 0;
      c.sub.tether = { anchor: c.sub.pos.clone(), len: 6 + rnd() * 4, strength: 0.6 };
      return { kind: 'entangle', target: t.id, sev: 3, title: `${t.name}スラスターに 漁網/ケーブルが絡まった！`, en: 'ENTANGLEMENT', sfx: 'grind', note: '後進・左右に揺すって脱出するか、マニピュレーター投棄で離脱せよ。' };
    },
  },
];

// Repair procedures available per fault kind
export function proceduresFor(f, sys, sub) {
  const P = [];
  switch (f.kind) {
    case 'leak': {
      const p = sys.pen[f.target];
      if (f.target !== 'VP' && f.target !== 'HATCH') P.push({ id: 'isolate', label: p.isolated ? '遮断弁を開く' : '遮断弁を閉じる (系統喪失)', time: 4 });
      P.push({ id: 'clamp', label: 'シーリングクランプ増し締め', time: 18 });
      P.push({ id: 'sealant', label: '水中硬化エポキシ注入', time: 35, needs: 'sealant' });
      break;
    }
    case 'thruster':
      P.push({ id: 'reset', label: 'モーターコントローラ再起動', time: 8 });
      P.push({ id: 'disable', label: 'スラスターを切り離す', time: 2 });
      break;
    case 'entangle':
      P.push({ id: 'shake', label: '逆転パルスで振りほどく', time: 12 });
      P.push({ id: 'jettison', label: 'マニピュレーター投棄 (緊急)', time: 3 });
      break;
    case 'elec':
      P.push({ id: 'resetBreaker', label: 'ブレーカー復帰', time: 3 });
      break;
    case 'battery':
      P.push({ id: 'shed', label: '負荷制限 (推進50%)', time: 2 });
      P.push({ id: 'isolateBat', label: `バッテリー${f.target} を切り離し → クロスタイ`, time: 6 });
      P.push({ id: 'balance', label: 'BMS セルバランス実行', time: 40 });
      break;
    case 'fire':
      P.push({ id: 'extinguish', label: `消火器使用 (残${sys.fire.suppressant})`, time: 3 });
      P.push({ id: 'deenergize', label: '該当配電盤を遮断', time: 2 });
      P.push({ id: 'mask', label: sys.emergencyMask ? '緊急呼吸器を外す' : '緊急呼吸器を装着', time: 3 });
      break;
    case 'lss':
      if (f.target === 'fan') P.push({ id: 'fixFan', label: 'ファンモーター交換', time: 45 });
      if (f.target === 'o2') P.push({ id: 'bypassO2', label: 'O2バイパス弁で手動供給', time: 10 }, { id: 'fixReg', label: 'レギュレーター分解整備', time: 60 });
      P.push({ id: 'mask', label: sys.emergencyMask ? '緊急呼吸器を外す' : '緊急呼吸器を装着', time: 3 });
      break;
    case 'ballast':
      if (f.target === 'vbt') P.push({ id: 'isolateVBT', label: 'VBT系統を手動隔離弁で閉鎖', time: 14 }, { id: 'drop', label: '降下用ウェイト投棄', time: 1 });
      if (f.target === 'pump') P.push({ id: 'fixPump', label: 'ポンプ電源系リセット', time: 25 });
      if (f.target === 'trim') P.push({ id: 'fixTrim', label: 'トリムポンプ リセット', time: 20 });
      break;
    case 'sensor':
      if (f.target === 'depth') P.push({ id: 'recal', label: 'バックアップ深度計で再校正', time: 15 });
      else P.push({ id: 'reboot', label: '機器を再起動', time: 20 });
      break;
    case 'light':
      P.push({ id: 'ack', label: '了解 (修理不能)', time: 1 });
      break;
    case 'hull':
      P.push({ id: 'ack', label: '了解 — 浮上を開始', time: 1 });
      break;
    case 'env':
      P.push({ id: 'ack', label: '了解', time: 1 });
      break;
    case 'collision':
      P.push({ id: 'ack', label: '損傷確認', time: 6 });
      break;
    case 'heat':
      P.push({ id: 'ack', label: '了解', time: 1 });
      break;
  }
  return P;
}

export class Incidents {
  constructor(sub, sys, env) {
    this.sub = sub; this.sys = sys; this.env = env;
    this.active = [];
    this.history = [];
    this.nextId = 1;
    this.rateMul = 1;          // difficulty
    this.clock = 0;
    this.firstScripted = 150;  // seconds: guaranteed first incident
    this.repair = null;        // { fault, proc, t }
    this.shake = 0;
    this.sealant = 2;
    this.cooldown = 40;
  }

  get cautionCount() { return this.active.filter((f) => !f.resolved).length; }

  raise(f) {
    f.id = this.nextId++;
    f.t = this.sub.time;
    f.resolved = false;
    this.active.push(f);
    this.history.push(f);
    if (f.shake) this.shake = Math.max(this.shake, f.shake);
    this.onIncident?.(f);
    return f;
  }

  trigger(id) {
    const c = CATALOGUE.find((x) => x.id === id);
    if (!c) return null;
    const f = c.apply(this);
    return f ? this.raise(f) : null;
  }

  step(dt) {
    const sub = this.sub, sys = this.sys, env = this.env;
    this.clock += dt;
    this.cooldown -= dt;
    this.shake = Math.max(0, this.shake - dt * 0.8);
    const depth = sub.depth;

    // ---- random hazard
    const nearPoi = POIS.find((p) => Math.hypot(p.x - sub.pos.x, p.y - sub.pos.y, p.z - sub.pos.z) < p.r * 1.3);
    const base = 1 / 260; // ~1 incident per 4-5 min
    const depthK = 0.6 + Math.min(2.2, depth / 4000);
    const dmgK = 1 + (1 - sys.hull.integrity) * 3 + sys.hull.fatigue * 50;
    const rate = base * depthK * dmgK * this.rateMul;
    let fire = this.cooldown <= 0 && rnd() < rate * dt;
    if (this.clock > this.firstScripted && this.history.length === 0 && depth > 30) fire = true;
    if (fire && sub.time > 20) {
      const cands = CATALOGUE.filter((c) => depth >= c.minDepth && (!c.near || (nearPoi && c.near.includes(nearPoi.id))));
      let tot = 0; for (const c of cands) tot += c.w * (c.near ? 4 : 1);
      let r = rnd() * tot;
      for (const c of cands) {
        r -= c.w * (c.near ? 4 : 1);
        if (r <= 0) { const f = c.apply(this); if (f) { this.raise(f); this.cooldown = 35 + rnd() * 60; } break; }
      }
    }

    // ---- physical triggers
    for (const ct of sub.contacts) {
      if (ct.impact > 0.35) {
        const e = ct.impact;
        env.impact = (env.impact || 0) + e;
        sys.hull.integrity = Math.max(0, sys.hull.integrity - Math.max(0, e - 0.3) * 0.06);
        this.shake = Math.max(this.shake, Math.min(1, e * 0.8));
        this.onImpact?.(e, ct);
        if (e > 0.8 && this.cooldown < 30) {
          const f = { kind: 'collision', target: 'hull', sev: e > 1.6 ? 3 : 2, title: `衝突！ 衝撃 ${(e * 1.5).toFixed(1)} G 相当`, en: 'COLLISION', auto: false };
          this.raise(f);
          // collision side effects
          if (rnd() < e * 0.35) { const t = pick(sub.thr); t.fault = t.fault || 'degraded'; }
          if (rnd() < e * 0.25) sys.lights.extFault = Math.min(2, sys.lights.extFault + 1);
          if (e > 1.2 && rnd() < 0.5 && depth > 100) this.trigger('leak_pen');
          if (e > 1.0 && rnd() < 0.3) sys.sensors.sonar = false;
          this.cooldown = 30;
        }
      }
    }
    env.impact = 0;

    // thruster overheating -> auto derate/trip
    for (const t of sub.thr) {
      if (t.temp > 95 && t.fault !== 'failed' && t.fault !== 'thermal') {
        t.fault = 'thermal';
        this.raise({ kind: 'thruster', target: t.id, sev: 2, title: `${t.name}スラスター 熱保護停止`, en: `${t.en} THERMAL TRIP`, auto: true });
      }
      if (t.fault === 'thermal' && t.temp < 55) { t.fault = null; this.resolveWhere((f) => f.target === t.id && f.en.includes('THERMAL')); sys.msg(`${t.name}スラスター 冷却完了・復帰`); }
    }
    // hydrothermal vent heat
    const vents = POIS.find((p) => p.id === 'vents');
    const dv = Math.hypot(sub.pos.x - vents.x, sub.pos.z - vents.z);
    if (dv < 60 && sub.pos.y < vents.y + 60) {
      env.ventHeat = Math.max(0, 1 - dv / 60);
      if (env.ventHeat > 0.75 && rnd() < dt * 0.3) {
        sys.hull.integrity -= 0.01;
        if (!this.active.find((f) => f.kind === 'heat' && !f.resolved)) this.raise({ kind: 'heat', target: 'hull', sev: 2, title: '外殻温度 異常上昇 — 熱水噴出孔に近すぎる', en: 'HULL OVERTEMP', sfx: 'alarm' });
      }
    } else env.ventHeat = 0;
    // over-depth warning
    if (depth > 10000 && !this._deepWarn) { this._deepWarn = true; sys.msg('設計深度 11,000 m に接近', 'warn'); }

    // stuck VBT keeps flooding
    if (sub._vbtStuckOpen && !sub.vbtIsolated) sub.vbt = Math.min(400, sub.vbt + 2.2 * dt);
    // tether (entanglement) spring
    if (sub.tether) {
      const T = sub.tether;
      const d = sub.pos.clone().sub(T.anchor);
      const L = d.length();
      if (L > T.len) sub.extForce.addScaledVector(d.normalize(), -(L - T.len) * 9000 * T.strength);
      // wiggling frees it
      const wig = Math.abs(sub.w.y) + Math.abs(sub.speed) * 0.2 + (sub.thr.some((t) => t.rpm < -0.4) ? 0.15 : 0);
      T.strength -= wig * dt * 0.02;
      if (T.strength <= 0) { this._freeTether(); sys.msg('絡まりから脱出した！', 'good'); }
    }
    // environment timers
    if (env.turbidityT > 0) { env.turbidityT -= dt; sub.currentExtra = 0.45 * Math.min(1, env.turbidityT / 20); if (env.turbidityT <= 0) { env.turbidity = 0; sub.currentExtra = 0; this.resolveWhere((f) => f.target === 'current'); } }
    if (env.quake > 0) { env.quake -= dt; this.shake = Math.max(this.shake, 0.35 + 0.3 * Math.sin(sub.time * 23)); if (env.quake <= 0) this.resolveWhere((f) => f.target === 'quake'); }

    // auto-resolve leaks that are fully sealed
    for (const f of this.active) {
      if (f.resolved) continue;
      if (f.kind === 'leak' && sys.pen[f.target].leakArea <= 0) f.resolved = true;
      if (f.kind === 'fire' && !sys.fire.active) f.resolved = true;
      if (f.kind === 'elec' && !sys.breakers[f.target].tripped) f.resolved = true;
      if (f.kind === 'heat' && env.ventHeat < 0.5) f.resolved = true;
    }
    this.active = this.active.filter((f) => !f.resolved || sub.time - f.t < 0.1);

    // ---- repair in progress
    if (this.repair) {
      const R = this.repair;
      R.t += dt;
      if (R.t >= R.proc.time) { this._apply(R.fault, R.proc.id); this.repair = null; }
    }
  }

  _freeTether() {
    this.sub.tether = null;
    for (const t of this.sub.thr) if (t.jam > 0) { t.jam = 0; }
    this.resolveWhere((f) => f.kind === 'entangle');
  }

  resolveWhere(fn) { for (const f of this.active) if (fn(f)) f.resolved = true; }

  startRepair(fault, proc) {
    if (this.repair) return false;
    if (proc.needs === 'sealant' && this.sealant <= 0) { this.sys.msg('エポキシシーラントが残っていない', 'warn'); return false; }
    this.repair = { fault, proc, t: 0 };
    this.onRepairStart?.(fault, proc);
    return true;
  }
  cancelRepair() { this.repair = null; }

  _apply(f, pid) {
    const sub = this.sub, sys = this.sys;
    const ok = (m) => { sys.msg(m, 'good'); };
    switch (pid) {
      case 'isolate': sys.isolate(f.target); break;
      case 'clamp': sys.clampLeak(f.target, 0.35 + rnd() * 0.25); ok('クランプ増し締め完了 — 浸水量低下'); if (sys.pen[f.target].clamped > 0.95 && f.target !== 'VP') { sys.pen[f.target].leakArea = 0; f.resolved = true; } break;
      case 'sealant': this.sealant--; if (rnd() < 0.8 || f.target !== 'VP') { sys.pen[f.target].leakArea = 0; sys.pen[f.target].clamped = 0; f.resolved = true; ok('シーラント硬化 — 浸水停止'); } else { sys.clampLeak(f.target, 0.4); sys.msg('シーラント部分的に効果 — 浸水は減少', 'warn'); } break;
      case 'reset': {
        const t = sub.thr.find((x) => x.id === f.target);
        if (t.fault === 'failed' && rnd() < 0.45) { sys.msg(`${t.name} 再起動失敗 — コントローラ応答なし`, 'warn'); break; }
        if (t.fault === 'degraded' && rnd() < 0.7) { sys.msg(`${t.name} 軸受の異音は消えない (出力制限継続)`, 'warn'); break; }
        t.fault = null; t.temp = Math.min(t.temp, 60); f.resolved = true; ok(`${t.name} スラスター 復帰`); break;
      }
      case 'disable': { const t = sub.thr.find((x) => x.id === f.target); t.enabled = !t.enabled; ok(`${t.name} ${t.enabled ? '再接続' : '切り離し'}`); if (!t.enabled && t.fault === 'thermal') {} break; }
      case 'shake': if (sub.tether) { sub.tether.strength -= 0.35 + rnd() * 0.3; sub.w.y += (rnd() - 0.5) * 0.25; if (sub.tether.strength <= 0) { this._freeTether(); ok('網を振りほどいた！'); } else sys.msg('まだ絡まっている — 繰り返せ', 'warn'); } else f.resolved = true; break;
      case 'jettison': this._freeTether(); sub.extraMass -= 0; sub.manipulatorLost = true; ok('マニピュレーター投棄 — 離脱成功'); break;
      case 'resetBreaker': {
        const b = sys.breakers[f.target];
        if (sub.floodL > 200 && rnd() < 0.6) { sys.msg(`${b.name}: 地絡継続中 — 再トリップ`, 'warn'); break; }
        b.tripped = false; b.closed = true; f.resolved = true; ok(`${b.name} 復電`); break;
      }
      case 'shed': sub.thrustLimit = 0.5; ok('推進出力を50%に制限'); break;
      case 'isolateBat': { const b = sys.bat[f.target]; b.online = false; sys.cross = true; f.resolved = true; ok(`バッテリー${f.target} 切り離し、クロスタイ投入`); break; }
      case 'balance': { const b = sys.bat[f.target]; if (b.fault === 'thermal' && rnd() < 0.5) { sys.msg('熱暴走は止まらない — 切り離せ！', 'alarm'); break; } b.fault = null; b.soc *= 0.94; f.resolved = true; ok('セルバランス完了'); break; }
      case 'extinguish': sys.extinguish(); break;
      case 'deenergize': { const b = sys.breakers[f.target]; if (b) b.closed = false; sys.fire.intensity *= 0.5; ok(`${b?.name} 配電盤 遮断`); break; }
      case 'mask': sys.toggleMask(); break;
      case 'fixFan': sys.scrubber.fanOK = true; f.resolved = true; ok('スクラバーファン 交換完了'); break;
      case 'bypassO2': sys.o2RegOK = true; sys.o2Flow = 0.5; sys._bypass = true; ok('O2 手動バイパス供給中'); f.resolved = true; break;
      case 'fixReg': sys.o2RegOK = true; f.resolved = true; ok('レギュレーター 整備完了'); break;
      case 'isolateVBT': sub.vbtIsolated = true; sub._vbtStuckOpen = false; f.resolved = true; ok('VBT系統を隔離 — 注水停止 (VBT操作不能)'); break;
      case 'drop': if (sub.dropWeight('descent') || sub.dropWeight('ascent')) ok('ウェイト投棄'); break;
      case 'fixPump': if (rnd() < 0.7) { sub.vbtPumpOK = true; f.resolved = true; ok('VBTポンプ 復帰'); } else sys.msg('ポンプ再起動失敗', 'warn'); break;
      case 'fixTrim': sub.trimPumpOK = true; f.resolved = true; ok('トリムポンプ 復帰'); break;
      case 'recal': sys.sensors.depth = true; sys.sensors.depthDrift = 0; f.resolved = true; ok('深度計 再校正完了'); break;
      case 'reboot': if (rnd() < 0.75) { sys.sensors[f.target] = true; sys.sensors.gyroDrift = f.target === 'gyro' ? 0 : sys.sensors.gyroDrift; f.resolved = true; ok('機器 再起動成功'); } else sys.msg('再起動失敗 — 再試行せよ', 'warn'); break;
      case 'ack': f.resolved = true; break;
    }
    this.onRepairDone?.(f, pid);
  }

  serialize() { return { sealant: this.sealant, clock: this.clock, n: this.history.length }; }
}

export const INCIDENT_IDS = CATALOGUE.map((c) => c.id);
