// DOM HUD for a landscape smartphone. Minimal glass overlay + slide-in "tablet" panels.
// Everything important also exists on the 3-D MFDs; the HUD is the pilot's quick-look helmet
// display + a touch-friendly control tablet (AP / DC / SYS / NAV / LOG).
import { heading } from '../sim/autopilot.js';
import { POIS } from '../world/density.js';
import { proceduresFor } from '../sim/incidents.js';
import { BREAKERS } from '../sim/systems.js';
import { zoneName, pressureAt, toBar, temperatureAt } from '../sim/env.js';
import { SPECIES } from '../world/life.js';

const fmt = (v, d = 0) => (Number.isFinite(v) ? v.toFixed(d) : '---');
const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const sevCls = ['info', 'caut', 'warn', 'alarm'];

export class HUD {
  constructor(root, game) {
    this.g = game;
    this.root = root;
    this.panel = null;
    this._t = 0;
    this._holds = new Set();
    this._build();
  }

  _btn(parent, label, fn, cls = '') {
    const b = h('button', 'hb ' + cls, label);
    b.addEventListener('pointerdown', (e) => { e.stopPropagation(); });
    b.addEventListener('click', (e) => { e.stopPropagation(); this.g.audio.play('button'); navigator.vibrate?.(6); fn(e, b); });
    parent.appendChild(b);
    return b;
  }

  _build() {
    const R = this.root;
    // ---------------------------------------------------------------- top bar
    const L = (this.layer = h('div', 'hud-layer'));
    R.appendChild(L);
    const top = (this.top = h('div', 'hud-top'));
    top.innerHTML = `
      <div class="ht-block ht-depth"><div class="dcol"><span class="k">深度 DEPTH</span><span class="v" id="hDepth">0</span></div><span class="sub" id="hVz"></span><span class="u">m</span></div>
      <div class="ht-block ht-small"><span class="k">方位 HDG</span><span class="v s" id="hHdg">000</span><span class="u">°</span></div>
      <div class="ht-block ht-small"><span class="k">速力 SPD</span><span class="v s" id="hSpd">0.0</span><span class="u">kt</span></div>
      <div class="ht-block ht-small"><span class="k">高度 ALT</span><span class="v s" id="hAlt">---</span><span class="u">m</span></div>
      <div class="ht-block ht-small ht-hide-s"><span class="k">浮力 BUOY</span><span class="v s" id="hBuoy">0</span><span class="u">kg</span></div>
      <div class="ht-block ht-ap" id="hAp"><span class="k">AUTOPILOT</span><span class="v s" id="hApS">MANUAL</span></div>
      <div class="ht-block ht-zone"><span class="k" id="hZone"></span><span class="sub" id="hEnv"></span></div>`;
    L.appendChild(top);
    this.el = {};
    for (const id of ['hDepth', 'hVz', 'hHdg', 'hSpd', 'hAlt', 'hBuoy', 'hAp', 'hApS', 'hZone', 'hEnv']) this.el[id] = top.querySelector('#' + id);

    // ---------------------------------------------------------------- right tool column (tablet tabs)
    const tabs = (this.tabs = h('div', 'hud-tabs'));
    this.tabBtns = {};
    for (const [id, lbl] of [['ap', 'AP<small>自動操縦</small>'], ['dc', 'DC<small>ダメコン</small>'], ['sys', 'SYS<small>システム</small>'], ['nav', 'NAV<small>航法</small>'], ['log', 'LOG<small>記録</small>']]) {
      this.tabBtns[id] = this._btn(tabs, lbl, () => this.toggle(id), 'tab');
    }
    L.appendChild(tabs);

    // ---------------------------------------------------------------- left quick column (lights / ballast / camera)
    const q = (this.quick = h('div', 'hud-quick'));
    this.qLight = this._btn(q, '💡<small>照明</small>', () => this.g.toggleLights());
    this.qFlood = this._hold(q, '注水<small>VBT+</small>', (on) => this.g.vbtManual(on ? 1 : 0), 'blue');
    this.qPump = this._hold(q, '排水<small>VBT−</small>', (on) => this.g.vbtManual(on ? -1 : 0), 'amber');
    this.qFine = this._btn(q, '微速<small>FINE</small>', (e, b) => { this.g.controls.precision = !this.g.controls.precision; });
    this.qView = this._btn(q, '◎<small>視点</small>', () => this.g.controls.recenter());
    this.qFs = this._btn(q, '⛶<small>全画面</small>', () => this.g.requestFullscreen(), 'fs');
    L.appendChild(q);

    // ---------------------------------------------------------------- caution / warning banner
    this.banner = h('div', 'hud-banner');
    this.banner.addEventListener('click', (e) => { e.stopPropagation(); this.g.audio.klaxonMuted = true; this.open('dc'); });
    L.appendChild(this.banner);
    // message ticker
    this.ticker = h('div', 'hud-ticker');
    L.appendChild(this.ticker);
    // repair progress
    this.repairBar = h('div', 'hud-repair', '<div class="rb-l"></div><div class="rb-bar"><i></i></div><button class="hb sm">中止</button>');
    this.repairBar.querySelector('button').addEventListener('click', (e) => { e.stopPropagation(); this.g.inc.cancelRepair(); });
    this.rbL = this.repairBar.querySelector('.rb-l'); this.rbI = this.repairBar.querySelector('i');
    L.appendChild(this.repairBar);
    // time compression indicator
    this.tc = h('div', 'hud-tc');
    L.appendChild(this.tc);
    // crosshair (for cockpit tap targeting)
    this.reticle = h('div', 'hud-reticle');
    L.appendChild(this.reticle);
    // pilot vision effects (hypoxia tunnel, CO2 blur)
    this.vision = h('div', 'hud-vision');
    L.appendChild(this.vision);

    // ---------------------------------------------------------------- panel container
    this.pan = h('div', 'hud-panel');
    this.pan.addEventListener('pointerdown', (e) => e.stopPropagation());
    this.pan.addEventListener('pointermove', (e) => e.stopPropagation());
    L.appendChild(this.pan);
  }

  _hold(parent, label, fn, cls = '') {
    const b = h('button', 'hb ' + cls, label);
    const on = (e) => { e.stopPropagation(); e.preventDefault(); try { b.setPointerCapture?.(e.pointerId); } catch { /* ignore */ } b.classList.add('on'); fn(true); this._holds.add(off); navigator.vibrate?.(8); };
    const off = () => { this._holds.delete(off); if (!b.classList.contains('on')) return; b.classList.remove('on'); fn(false); };
    b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off); b.addEventListener('pointercancel', off); b.addEventListener('lostpointercapture', off);
    b.addEventListener('contextmenu', (e) => e.preventDefault());
    parent.appendChild(b);
    return b;
  }
  releaseHolds() { for (const off of [...this._holds]) off(); }

  toggle(id) { if (this.panel === id) this.close(); else this.open(id); }
  open(id) {
    if (this.panel !== id) this.releaseHolds();
    this.g.controls?.reset();
    this.panel = id;
    this.pan.className = 'hud-panel open p-' + id;
    for (const k in this.tabBtns) this.tabBtns[k].classList.toggle('on', k === id);
    this._render(true);
  }
  close() { this.releaseHolds(); this.panel = null; this._key = null; this.pan.className = 'hud-panel'; this.pan.innerHTML = ''; this._lives?.clear(); for (const k in this.tabBtns) this.tabBtns[k].classList.remove('on'); }

  // ---------------------------------------------------------------- per-frame
  update(dt) {
    const g = this.g, { sub, sys, ap, inc } = g;
    this._t += dt;
    const m = ap.m || {};
    const E = this.el;
    const dep = m.depth ?? sub.depth;
    E.hDepth.textContent = dep < 100 ? fmt(dep, 1) : fmt(dep).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const vz = -sub.vel.y;
    E.hVz.textContent = `${vz >= 0 ? '▼' : '▲'} ${fmt(Math.abs(vz), 2)} m/s`;
    E.hVz.className = 'sub' + (Math.abs(vz) > 1.2 ? ' warn' : '');
    E.hHdg.textContent = fmt(m.hdg ?? heading(sub.yaw)).padStart(3, '0');
    E.hSpd.textContent = fmt((m.u ?? sub.speed) * 1.944, 1);
    E.hAlt.textContent = m.dvl ? fmt(m.alt, 1) : '---';
    E.hAlt.className = 'v s' + (m.dvl && m.alt < 5 ? ' alarm' : m.dvl && m.alt < 12 ? ' warn' : '');
    const B = -sub.trimState;
    E.hBuoy.textContent = (B > 0 ? '+' : '') + fmt(B);
    E.hBuoy.className = 'v s' + (Math.abs(B) > 200 ? ' warn' : '');
    E.hApS.textContent = ap.engaged ? ap.status || 'ENG' : 'MANUAL';
    E.hAp.classList.toggle('on', ap.engaged);
    const z = zoneName(sub.depth);
    E.hZone.textContent = z[0];
    E.hEnv.textContent = `${fmt(toBar(pressureAt(sub.depth)), 0)} bar · ${fmt(temperatureAt(sub.depth), 1)}°C`;
    this.qLight.classList.toggle('on', sys.powered('LIGHT') && sys.lights.main > 0);
    this.qFine.classList.toggle('on', g.controls.precision);
    this.qFlood.classList.toggle('run', sub.vbtFlow > 0); this.qPump.classList.toggle('run', sub.vbtFlow < 0);

    // banner: most severe unresolved fault
    const act = inc.active.filter((f) => !f.resolved).sort((a, b) => b.sev - a.sev);
    if (act.length) {
      const f = act[0];
      this.banner.className = 'hud-banner show ' + sevCls[f.sev] + (Math.sin(this._t * 8) > 0 && f.sev >= 3 ? ' blink' : '');
      const txt = `<b>${f.sev >= 3 ? 'WARNING' : 'CAUTION'}</b> ${f.title}${act.length > 1 ? ` <i>+${act.length - 1}</i>` : ''}<span>タップで対処 ▶</span>`;
      if (this._bannerTxt !== txt) { this.banner.innerHTML = txt; this._bannerTxt = txt; }
    } else this.banner.className = 'hud-banner';

    // repair bar
    if (inc.repair) {
      const R = inc.repair;
      this.repairBar.classList.add('show');
      const lbl = `作業中: ${R.proc.label}`;
      if (this._rbl !== lbl) { this.rbL.textContent = lbl; this._rbl = lbl; }
      this.rbI.style.width = `${Math.min(100, (R.t / R.proc.time) * 100).toFixed(1)}%`;
    } else this.repairBar.classList.remove('show');

    this.tc.textContent = g.timeScale > 1 ? `▶▶ ×${g.timeScale}` : '';
    this.tc.classList.toggle('show', g.timeScale > 1);

    // vision: hypoxia tunnel + hypercapnia darkening + stress pulse
    const hyp = Math.max(sys.hypoxia, sys.hypercapnia * 0.8, 1 - sys.pilotHealth);
    this.vision.style.opacity = Math.min(1, hyp * 1.2).toFixed(3);
    this.vision.style.setProperty('--pulse', (0.9 + 0.1 * Math.sin(this._t * (4 + hyp * 6))).toFixed(3));

    // panels refresh at ~6 Hz
    this._pt = (this._pt || 0) - dt;
    if (this.panel && this._pt <= 0) { this._pt = 0.16; this._render(false); }
  }

  msg(text, level = 'info') {
    const e = h('div', 'tk ' + level, text);
    this.ticker.prepend(e);
    while (this.ticker.children.length > 4) this.ticker.lastChild.remove();
    setTimeout(() => e.classList.add('fade'), 6000);
    setTimeout(() => e.remove(), 7000);
  }

  // ---------------------------------------------------------------- panel rendering
  // Panels are rebuilt only when structure changes (key), otherwise values are patched in place.
  _render(force) {
    const id = this.panel;
    const fn = this['_p_' + id];
    if (!fn) return;
    const key = fn.call(this, null);
    if (force || key !== this._key) {
      this._key = key;
      this.releaseHolds();
      const sc = this.pan.querySelector('.pn-body')?.scrollTop || 0; // keep scroll position across rebuilds
      this._lives?.clear();
      this.pan.innerHTML = '';
      const hdr = h('div', 'pn-hdr');
      hdr.innerHTML = `<b>${{ ap: 'AUTOPILOT 自動操縦', dc: 'DAMAGE CONTROL ダメージコントロール', sys: 'SYSTEMS 電力・生命維持・バラスト', nav: 'NAVIGATION 航法・目的地', log: 'LOG 航海記録・生物図鑑' }[id]}</b>`;
      this._btn(hdr, '✕', () => this.close(), 'x');
      this.pan.appendChild(hdr);
      const body = h('div', 'pn-body'); this.pan.appendChild(body);
      fn.call(this, body);
      this._patch();
      if (!force) body.scrollTop = sc;
    } else fn.call(this, undefined);
  }

  // helpers producing live-updating elements
  _row(parent, label, cls = '') { const r = h('div', 'pr ' + cls); r.appendChild(h('span', 'pl', label)); const v = h('span', 'pv'); r.appendChild(v); parent.appendChild(r); return v; }
  _grp(parent, title) { const g = h('div', 'pg'); if (title) g.appendChild(h('div', 'pgt', title)); parent.appendChild(g); return g; }
  _live(el, fn) { (this._lives ||= new Map()).set(el, fn); }
  _patch() { if (!this._lives) return; for (const [el, fn] of this._lives) { if (!el.isConnected) { this._lives.delete(el); continue; } fn(el); } }

  // ---------------- AP
  _p_ap(body) {
    const { ap, sub } = this.g;
    if (body === null) return 'ap' + (ap.nav.on ? 1 : 0);
    if (body === undefined) return this._patch();
    const top = this._grp(body);
    const eng = this._btn(top, '', () => { ap.engage(!ap.engaged); this.g.sys.msg(ap.engaged ? '自動操縦 接続' : '自動操縦 解除', 'info'); }, 'big');
    this._live(eng, (e) => { e.innerHTML = ap.engaged ? 'AP 接続中 <small>ENGAGED — タップで解除</small>' : 'AP 待機 <small>STBY — タップで接続</small>'; e.classList.toggle('on', ap.engaged); });
    const st = h('div', 'ap-status'); top.appendChild(st);
    this._live(st, (e) => { e.innerHTML = `<b>${ap.engaged ? ap.status : 'MANUAL'}</b> ${ap.warn ? `<em>${ap.warn}</em>` : ''}`; });

    const grid = h('div', 'ap-grid'); body.appendChild(grid);
    const axis = (name, label, unit, key, step, big, min, max, fmtd = 0) => {
      const c = h('div', 'ap-ax'); grid.appendChild(c);
      const t = this._btn(c, label, () => { const m = ap[key]; const on = !m.on; if (on && key === 'hdg') m.target = Math.round(heading(sub.yaw)); if (on && key === 'depth') m.target = Math.round(sub.depth); if (on && key === 'alt') m.target = Math.max(3, Math.round(ap.m?.dvl ? ap.m.alt : 10)); ap.setMode(key, on); }, 'axb');
      this._live(t, (e) => e.classList.toggle('on', ap[key].on && ap.engaged));
      const v = h('div', 'ap-v'); c.appendChild(v);
      this._live(v, (e) => { const m = ap[key]; const val = 'target' in m ? m.target : m.rate; e.textContent = `${fmt(val, fmtd)} ${unit}`; });
      const row = h('div', 'ap-adj'); c.appendChild(row);
      const adj = (d) => { const m = ap[key]; const f = 'target' in m ? 'target' : 'rate'; let x = m[f] + d; if (key === 'hdg') x = (x + 360) % 360; else x = Math.min(max, Math.max(min, x)); m[f] = +x.toFixed(2); };
      this._btn(row, '−' + big, () => adj(-big), 'sm'); this._btn(row, '−' + step, () => adj(-step), 'sm');
      this._btn(row, '+' + step, () => adj(step), 'sm'); this._btn(row, '+' + big, () => adj(big), 'sm');
    };
    axis('hdg', 'HDG 方位保持', '°', 'hdg', 5, 45, 0, 360);
    axis('depth', 'DEPTH 深度保持', 'm', 'depth', 10, 500, 0, 11500);
    axis('alt', 'ALT 高度保持', 'm', 'alt', 1, 10, 2, 150);
    axis('speed', 'SPD 速力保持', 'm/s', 'speed', 0.1, 0.5, -0.8, 1.9, 1);
    axis('descent', 'DESCENT 自動潜航', 'm/s', 'descent', 0.1, 0.3, 0.1, 1.2, 1);
    const misc = this._grp(body, 'MODES');
    const mm = h('div', 'btnrow'); misc.appendChild(mm);
    const tog = (label, fn, onFn, cls) => { const b = this._btn(mm, label, fn, cls); this._live(b, (e) => e.classList.toggle('on', onFn())); };
    tog('STATION 定点保持', () => ap.setMode('station', !ap.station.on), () => ap.station.on && ap.engaged);
    tog('ASCENT 自動浮上', () => ap.setMode('ascent', !ap.ascent.on), () => ap.ascent.on && ap.engaged, 'amber');
    tog('OAS 障害物回避', () => { ap.oas.on = !ap.oas.on; }, () => ap.oas.on);
    tog('AUTO BALLAST 自動浮力', () => { ap.ballastAuto = !ap.ballastAuto; }, () => ap.ballastAuto);
    const tcRow = this._grp(body, 'TIME COMPRESSION 時間加速 (自動操縦中のみ)');
    const tr = h('div', 'btnrow'); tcRow.appendChild(tr);
    for (const k of [1, 2, 4, 8, 16]) { const b = this._btn(tr, '×' + k, () => this.g.setTimeScale(k), 'sm'); this._live(b, (e) => e.classList.toggle('on', this.g.timeScale === k)); }
  }

  // ---------------- DC
  _p_dc(body) {
    const { inc, sys, sub } = this.g;
    const act = inc.active.filter((f) => !f.resolved);
    if (body === null) return 'dc' + act.map((f) => f.id + ':' + proceduresFor(f, sys, sub).map((p) => p.label).join('/')).join(',') + (inc.repair ? 'R' : '');
    if (body === undefined) return this._patch();
    const sum = this._grp(body);
    const s = h('div', 'dc-sum'); sum.appendChild(s);
    this._live(s, (e) => { e.innerHTML = `浸水 <b class="${sub.floodL > 5 ? 'alarm' : ''}">${fmt(sub.floodL, 1)} L</b> (${fmt(sys.inflow * 60, 2)} L/min) · 船殻 <b class="${sys.hull.integrity < 0.8 ? 'warn' : ''}">${fmt(sys.hull.integrity * 100)}%</b> · 圧壊余裕 <b>${fmt(this.g.crushMargin)} m</b> · シーラント ${inc.sealant} · 消火器 ${sys.fire.suppressant}`; });
    if (!act.length) { body.appendChild(h('div', 'empty', '異常なし — ALL SYSTEMS NOMINAL')); }
    for (const f of act) {
      const c = h('div', 'dc-card ' + sevCls[f.sev]); body.appendChild(c);
      c.appendChild(h('div', 'dc-t', `<b>${f.sev >= 3 ? 'WARNING' : 'CAUTION'}</b> ${f.title}<small>${f.en} · T+${fmt(sub.time - f.t)}s</small>`));
      if (f.note) c.appendChild(h('div', 'dc-n', f.note));
      const row = h('div', 'btnrow'); c.appendChild(row);
      for (const p of proceduresFor(f, sys, sub)) {
        const b = this._btn(row, `${p.label}<small>${p.time}s${p.needs ? ' · 要シーラント' : ''}</small>`, () => { if (inc.startRepair(f, p)) { this.g.audio.play('tool'); } }, 'proc');
        if (inc.repair) b.disabled = true;
      }
    }
    // emergency actions always available
    const em = this._grp(body, 'EMERGENCY 緊急操作');
    const er = h('div', 'btnrow'); em.appendChild(er);
    this._guard(er, '降下ウェイト投棄', () => this.g.dropWeight('descent'), () => `残 ${sub.weights.descent}`);
    this._guard(er, '浮上ウェイト投棄', () => this.g.dropWeight('ascent'), () => `残 ${sub.weights.ascent}`);
    this._guard(er, '緊急浮上 (全投棄)', () => this.g.emergencyBlow(), () => 'EMERG');
    const mk = this._btn(er, '', () => sys.toggleMask(), 'amber');
    this._live(mk, (e) => { e.innerHTML = `${sys.emergencyMask ? '呼吸器を外す' : '緊急呼吸器'}<small>${fmt(sys.emergencyO2 * 60)} min</small>`; e.classList.toggle('on', sys.emergencyMask); });
    const kl = this._btn(er, 'アラーム消音<small>SILENCE</small>', () => { this.g.audio.klaxonMuted = true; });
  }
  _guard(parent, label, fn, sub) {
    // two-step guarded switch (flip cover, then press) — like real jettison switches
    const b = this._btn(parent, '', () => {
      if (b.dataset.armed === '1') { b.dataset.armed = '0'; fn(); } else { b.dataset.armed = '1'; setTimeout(() => { b.dataset.armed = '0'; }, 3000); }
    }, 'guard');
    this._live(b, (e) => { e.innerHTML = `${e.dataset.armed === '1' ? '⚠ もう一度押して実行' : label}<small>${sub()}</small>`; e.classList.toggle('armed', e.dataset.armed === '1'); });
    return b;
  }

  // ---------------- SYS
  _p_sys(body) {
    const { sys, sub } = this.g;
    if (body === null) return 'sys';
    if (body === undefined) return this._patch();
    // batteries
    const bg = this._grp(body, 'POWER 電源 (Li-ion 300V ×2 / 非常用 28V)');
    const bats = h('div', 'bats'); bg.appendChild(bats);
    for (const n of ['A', 'B', 'E']) {
      const c = h('div', 'bat'); bats.appendChild(c);
      this._live(c, (e) => {
        const b = sys.bat[n];
        e.className = 'bat' + (!b.online ? ' off' : b.fault ? ' warn' : '');
        e.innerHTML = `<b>BATT ${n}</b><div class="bar"><i style="width:${b.soc * 100}%"></i></div><span>${fmt(b.soc * 100, 1)}% · ${fmt(b.v)}V · ${fmt(b.temp)}°C</span><span>${fmt((n === 'A' ? sys.busA : n === 'B' ? sys.busB : sys.busE) / 1000, 2)} kW ${b.fault ? '· ' + b.fault.toUpperCase() : ''}</span>`;
      });
    }
    const pr = h('div', 'btnrow'); bg.appendChild(pr);
    const xt = this._btn(pr, '', () => { sys.cross = !sys.cross; sys.msg(`クロスタイ ${sys.cross ? '投入' : '開放'}`); }, 'amber');
    this._live(xt, (e) => { e.innerHTML = `X-TIE<small>${sys.cross ? 'ON 連系' : 'OFF'}</small>`; e.classList.toggle('on', sys.cross); });
    for (const n of ['A', 'B']) { const b = this._btn(pr, '', () => { sys.bat[n].online = !sys.bat[n].online; sys.msg(`バッテリー${n} ${sys.bat[n].online ? '接続' : '切離'}`, 'warn'); }); this._live(b, (e) => { e.innerHTML = `BATT ${n}<small>${sys.bat[n].online ? 'ONLINE' : 'OFFLINE'}</small>`; e.classList.toggle('on', sys.bat[n].online); }); }
    const tl = this._btn(pr, '', () => { sub.thrustLimit = sub.thrustLimit >= 1 ? 0.5 : sub.thrustLimit >= 0.5 ? 0.25 : 1; }); this._live(tl, (e) => { e.innerHTML = `推進制限<small>${fmt(sub.thrustLimit * 100)}%</small>`; });
    const tot = h('div', 'pr'); bg.appendChild(tot); this._live(tot, (e) => { const kwh = (sys.bat.A.soc * sys.bat.A.cap + sys.bat.B.soc * sys.bat.B.cap); e.innerHTML = `総負荷 <b>${fmt(sys.totalPower / 1000, 2)} kW</b> · 残エネルギー ${fmt(kwh, 1)} kWh · 推定残時間 <b>${fmt(kwh / Math.max(0.3, sys.totalPower / 1000), 1)} h</b>`; });

    // breakers
    const bk = this._grp(body, 'BREAKERS 配電盤');
    const grid = h('div', 'brk'); bk.appendChild(grid);
    for (const B of BREAKERS) {
      const b = this._btn(grid, '', () => { sys.toggleBreaker(B.id); this.g.audio.play('breaker'); });
      this._live(b, (e) => { const s = sys.breakers[B.id]; e.className = 'hb brkb' + (s.tripped ? ' trip' : s.closed ? ' on' : ''); e.innerHTML = `${B.name}<small>${B.en} · ${s.tripped ? 'TRIP' : s.closed ? fmt(s.load) + ' W' : 'OPEN'}</small>`; });
    }
    // lights
    const lg = this._grp(body, 'LIGHTS 照明');
    const lr = h('div', 'btnrow'); lg.appendChild(lr);
    for (const [k, l] of [['main', '主照明 SPOT'], ['flood', '投光 FLOOD'], ['cabin', '艦内 CABIN']]) {
      const b = this._btn(lr, '', () => { const v = sys.lights[k]; sys.lights[k] = v >= 1 ? 0 : v >= 0.6 ? 1 : v >= 0.3 ? 0.6 : 0.3; });
      this._live(b, (e) => { e.innerHTML = `${l}<small>${fmt(sys.lights[k] * 100)}%</small>`; e.classList.toggle('on', sys.lights[k] > 0); });
    }
    const lz = this._btn(lr, '', () => { this.g.lasers = !this.g.lasers; }); this._live(lz, (e) => { e.innerHTML = `レーザースケール<small>${this.g.lasers ? 'ON' : 'OFF'}</small>`; e.classList.toggle('on', this.g.lasers); });

    // ballast & trim
    const ba = this._grp(body, 'BALLAST / TRIM バラスト・トリム');
    const bs = h('div', 'pr'); ba.appendChild(bs);
    this._live(bs, (e) => { e.innerHTML = `VBT <b>${fmt(sub.vbt)} / 400 L</b> ${sub.vbtIsolated ? '<em>ISOLATED</em>' : ''} · 流量 ${fmt(sub.vbtFlow, 2)} L/s · 余剰浮力 <b>${fmt(-sub.trimState)} kg</b> · トリム ${fmt(sub.trim * 100)}% · ピッチ ${fmt(sub.pitch * 57.3, 1)}°`; });
    const br = h('div', 'btnrow'); ba.appendChild(br);
    this._hold(br, '注水 FLOOD', (on) => this.g.vbtManual(on ? 1 : 0), 'blue');
    this._hold(br, '排水 PUMP', (on) => this.g.vbtManual(on ? -1 : 0), 'amber');
    this._hold(br, 'トリム 艦首↓', (on) => { sub.trimCmd = on ? 1 : 0; });
    this._hold(br, 'トリム 艦首↑', (on) => { sub.trimCmd = on ? -1 : 0; });
    const ab = this._btn(br, '', () => { this.g.ap.ballastAuto = !this.g.ap.ballastAuto; }); this._live(ab, (e) => { e.innerHTML = `自動浮力<small>${this.g.ap.ballastAuto ? 'AUTO' : 'MAN'}</small>`; e.classList.toggle('on', this.g.ap.ballastAuto); });
    const arm = this._btn(br, '', () => this.g.toggleArm()); this._live(arm, (e) => { e.innerHTML = `マニピュレーター<small>${sub.manipulatorLost ? 'LOST' : this.g.ext.armTarget ? 'DEPLOYED' : 'STOWED'}</small>`; e.classList.toggle('on', !!this.g.ext.armTarget); });

    // life support
    const ls = this._grp(body, 'LIFE SUPPORT 生命維持');
    const l1 = h('div', 'pr'); ls.appendChild(l1);
    this._live(l1, (e) => { e.innerHTML = `O2 <b class="${sys.o2 < 19 ? 'warn' : ''}">${fmt(sys.o2, 2)}%</b> · CO2 <b class="${sys.co2 > 0.5 ? 'warn' : ''}">${fmt(sys.co2, 2)}%</b> · 気圧 ${fmt(sys.cabinP, 3)} bar · ${fmt(sys.cabinT, 1)}°C · 湿度 ${fmt(sys.rh)}% · O2残 ${fmt(sys.o2Bottles)} L · LiOH ${fmt(sys.scrubber.canister * 100)}% (予備${sys.scrubber.spare}) · 体調 <b class="${sys.pilotHealth < 0.7 ? 'warn' : ''}">${fmt(sys.pilotHealth * 100)}%</b>`; });
    const lr2 = h('div', 'btnrow'); ls.appendChild(lr2);
    this._btn(lr2, 'O2流量 −', () => { sys.o2Flow = Math.max(0, +(sys.o2Flow - 0.05).toFixed(2)); }, 'sm');
    const of = h('span', 'pv'); lr2.appendChild(of); this._live(of, (e) => { e.textContent = `${fmt(sys.o2Flow, 2)} L/min`; });
    this._btn(lr2, 'O2流量 +', () => { sys.o2Flow = Math.min(2, +(sys.o2Flow + 0.05).toFixed(2)); }, 'sm');
    this._btn(lr2, 'キャニスター交換', () => { sys.swapCanister(); this.g.audio.play('tool'); });
    const fan = this._btn(lr2, '', () => { sys.scrubber.fan = !sys.scrubber.fan; }); this._live(fan, (e) => { e.innerHTML = `スクラバーファン<small>${!sys.scrubber.fanOK ? 'FAIL' : sys.scrubber.fan ? 'ON' : 'OFF'}</small>`; e.classList.toggle('on', sys.scrubber.fan && sys.scrubber.fanOK); });
    const ht = this._btn(lr2, '', () => sys.toggleBreaker('HEAT')); this._live(ht, (e) => { e.innerHTML = `暖房<small>${sys.powered('HEAT') ? 'ON 1.8kW' : 'OFF'}</small>`; e.classList.toggle('on', sys.powered('HEAT')); });
  }

  // ---------------- NAV
  _p_nav(body) {
    const { ap, sub } = this.g;
    if (body === null) return 'nav' + (ap.nav.poi?.id || '');
    if (body === undefined) return this._patch();
    const info = this._grp(body);
    const st = h('div', 'pr'); info.appendChild(st);
    this._live(st, (e) => { e.innerHTML = ap.nav.on ? `目的地 <b>${ap.nav.poi?.name}</b> · 残距離 <b>${fmt(ap.navDist)} m</b> · 到着予想 ${fmt(ap.navDist / Math.max(0.2, sub.speed) / 60, 1)} 分` : `現在位置 X ${fmt(sub.pos.x)} / Z ${fmt(sub.pos.z)} · 母船まで ${fmt(Math.hypot(sub.pos.x, sub.pos.z - 150))} m · 最大深度 ${fmt(sub.maxDepth)} m`; });
    const list = h('div', 'poi-list'); body.appendChild(list);
    for (const p of POIS) {
      const c = h('div', 'poi' + (ap.nav.poi === p && ap.nav.on ? ' on' : '') + (this.g.discovered.has(p.id) ? ' found' : '')); list.appendChild(c);
      const d = h('div', 'poi-d'); c.appendChild(d);
      this._live(d, (e) => { const dist = Math.hypot(p.x - sub.pos.x, p.y - sub.pos.y, p.z - sub.pos.z); e.innerHTML = `<b>${p.name}</b><small>${p.nameEn}</small><span>深度 ${fmt(-p.y)} m · 距離 ${fmt(dist)} m${this.g.discovered.has(p.id) ? ' · ✔ 調査済' : ''}</span><p>${p.desc}</p>`; });
      this._btn(c, ap.nav.poi === p && ap.nav.on ? '航行中' : '自動航行', () => { this.g.navTo(p); this._key = null; }, 'go');
    }
    const home = h('div', 'poi'); list.appendChild(home);
    home.appendChild(h('div', 'poi-d', '<b>母船「かいれい」直下へ浮上</b><small>Return to mothership</small><p>母船の直下まで移動し、自動浮上する。</p>'));
    this._btn(home, '帰還', () => { this.g.returnHome(); this._key = null; }, 'go amber');
  }

  // ---------------- LOG
  _p_log(body) {
    const g = this.g;
    if (body === null) return 'log' + g.sys.messages.length + ':' + g.life.sightings.size;
    if (body === undefined) return this._patch();
    const s = this._grp(body, `STATS 潜航記録`);
    const st = h('div', 'pr'); s.appendChild(st);
    this._live(st, (e) => { const t = g.sub.time; e.innerHTML = `潜航時間 <b>${Math.floor(t / 3600)}:${String(Math.floor(t / 60) % 60).padStart(2, '0')}:${String(Math.floor(t) % 60).padStart(2, '0')}</b> · 最大深度 <b>${fmt(g.sub.maxDepth)} m</b> · 航走距離 ${fmt(g.sub.distance)} m · 発見 ${g.life.sightings.size}/${Object.keys(SPECIES).length} 種 · 調査地点 ${g.discovered.size}/${POIS.length} · 採取試料 ${g.samples}`; });
    const sp = this._grp(body, 'SPECIES 生物図鑑');
    const grid = h('div', 'species'); sp.appendChild(grid);
    for (const k in SPECIES) {
      const seen = g.life.sightings.has(k);
      grid.appendChild(h('div', 'spc' + (seen ? ' seen' : ''), seen ? `<b>${SPECIES[k][0]}</b><small>${SPECIES[k][1]}</small>` : '<b>？？？</b><small>未発見</small>'));
    }
    const lg = this._grp(body, 'MESSAGES 通信・イベント');
    const ul = h('div', 'msgs'); lg.appendChild(ul);
    for (const m of g.sys.messages.slice(-40).reverse()) ul.appendChild(h('div', 'm ' + m.level, `<i>T+${fmt(m.t)}s</i> ${m.text}`));
    const set = this._grp(body, 'SETTINGS 設定');
    const sr = h('div', 'btnrow'); set.appendChild(sr);
    const snd = this._btn(sr, '', () => { g.audio.enabled = !g.audio.enabled; }); this._live(snd, (e) => { e.innerHTML = `サウンド<small>${g.audio.enabled ? 'ON' : 'OFF'}</small>`; });
    const vo = this._btn(sr, '', () => { g.audio.voice = !g.audio.voice; }); this._live(vo, (e) => { e.innerHTML = `母船音声<small>${g.audio.voice ? 'ON' : 'OFF'}</small>`; });
    const df = this._btn(sr, '', () => { const L = [0.5, 1, 2]; g.inc.rateMul = L[(L.indexOf(g.inc.rateMul) + 1) % L.length]; }); this._live(df, (e) => { e.innerHTML = `トラブル頻度<small>${{ 0.5: '低', 1: '標準', 2: '高' }[g.inc.rateMul] || g.inc.rateMul}</small>`; });
    const q = this._btn(sr, '', () => { g.quality = (g.quality + 1) % 3; g.applyQuality(); }); this._live(q, (e) => { e.innerHTML = `画質<small>${['高', '超高', '最高 (ネイティブ)'][g.quality]}</small>`; });
    const ls = this._btn(sr, '', () => { const L = [0.003, 0.0042, 0.006]; g.controls.lookSens = L[(L.indexOf(g.controls.lookSens) + 1) % L.length]; }); this._live(ls, (e) => { e.innerHTML = `視点感度<small>${{ 0.003: '低', 0.0042: '中', 0.006: '高' }[g.controls.lookSens]}</small>`; });
    this._btn(sr, 'セーブ<small>SAVE</small>', () => { g.save(); g.sys.msg('航海記録を保存しました', 'good'); });
    this._guard(sr, '潜航を中止してタイトルへ', () => g.abort(), () => 'ABORT');
  }
}
