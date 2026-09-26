// ABYSSAL DESCENT — game integration.
// Wires simulation (sub / systems / incidents / autopilot), world (terrain, props, life),
// cockpit interior, exterior, render pipeline, audio, touch controls and HUD.
import * as THREE from 'three';
import { Pipeline } from './render/pipeline.js';
import { Terrain } from './world/terrain.js';
import { createTerrainMaterial } from './render/terrainMaterial.js';
import { updateWater, ambientAtDepth, waterUniforms } from './render/water.js';
import { setMaxAnisotropy } from './render/textures.js';
import { Submarine, SPEC } from './sim/sub.js';
import { Systems } from './sim/systems.js';
import { Incidents } from './sim/incidents.js';
import { Autopilot, heading } from './sim/autopilot.js';
import { Cockpit, SPHERE_CENTER, EYE, EYE_PITCH } from './cockpit/cockpit.js';
import { MFDRenderer } from './cockpit/mfd.js';
import { Exterior } from './world/exterior.js';
import { MarineSnow, Bubbles, Life, SPECIES } from './world/life.js';
import { Props, buildMothership } from './world/props.js';
import { POIS, groundHeight, trenchCenterX } from './world/density.js';
import { AudioEngine } from './audio/audio.js';
import { Controls } from './ui/controls.js';
import { HUD } from './ui/hud.js';

const SAVE_KEY = 'abyssal-descent-save-v1';
// graphics presets. LOW is for battery saving / thermal throttling; ULTRA = native resolution.
export const QUALITY = [
  { name: 'LOW', ja: '低', pr: 1.0, shadow: 0, shadowMap: 512, bloom: 3, volSteps: 16, shafts: 8, msaa: 0, snow: 0.35, cockpitShadow: false, aniso: 2 },
  { name: 'HIGH', ja: '高', pr: 1.5, shadow: 1, shadowMap: 1024, bloom: 5, volSteps: 32, shafts: 12, msaa: 4, snow: 0.7, cockpitShadow: true, aniso: 8 },
  { name: 'VERY HIGH', ja: '超高', pr: 2.0, shadow: 1, shadowMap: 2048, bloom: 6, volSteps: 48, shafts: 16, msaa: 4, snow: 1, cockpitShadow: true, aniso: 16 },
  { name: 'ULTRA', ja: '最高', pr: 3.0, shadow: 1, shadowMap: 4096, bloom: 6, volSteps: 64, shafts: 16, msaa: 4, snow: 1, cockpitShadow: true, aniso: 16 },
];
const QKEY = 'ad-quality-v2';
function loadQuality() {
  try { const v = localStorage.getItem(QKEY); if (v !== null && QUALITY[+v]) return +v; } catch { /* ignore */ }
  return 2; // flagship default
}
const H = 1 / 60; // fixed simulation step
const MOTHERSHIP = new THREE.Vector3(-10, 0, 150);
const DEATH = {
  implosion: ['船殻圧壊', 'HULL IMPLOSION', '外殻が水圧に耐えきれず、一瞬で圧壊した。'],
  flooded: ['浸水による水没', 'FLOODED', '耐圧殻内が海水で満たされた。'],
  hypoxia: ['低酸素症', 'HYPOXIA', '艦内の酸素濃度が生存限界を下回った。'],
  co2: ['二酸化炭素中毒', 'CO2 POISONING', 'CO2濃度が致死量に達した。'],
  power: ['全電源喪失', 'TOTAL POWER LOSS', '全バッテリーが枯渇し、生命維持が停止した。'],
};

const _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _zero = new THREE.Vector3(), _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _e = new THREE.Euler();

export class Game {
  constructor(canvas, ui, params) {
    this.canvas = canvas; this.ui = ui; this.params = params;
    this.manual = params.has('manual');
    this.timeScale = 1;
    this.quality = params.has('q') && QUALITY[+params.get('q')] ? +params.get('q') : loadQuality();
    this.state = 'boot';
    this.discovered = new Set();
    this.sampled = new Set();
    this.samples = 0;
    this.lasers = false;
    this.trail = [];
    this.flash = 0; this.shake = 0;
    this.radioQueue = [];
    this._milestones = new Set();
    this._acc = 0;
    this._clock = new THREE.Clock(false);
    this._t = 0;
    this._saveT = 20;
    this._headOff = new THREE.Vector3();
  }

  // ------------------------------------------------------------------ boot
  async boot(progress = () => {}) {
    const r = (this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: this.manual, stencil: false }));
    // mobile GPUs drop the context when the app is backgrounded for long: pause, then resume cleanly
    this.canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); this._ctxLost = true; if (this.state === 'play') this.save(); }, false);
    this.canvas.addEventListener('webglcontextrestored', () => { this._ctxLost = false; this.applyQuality(); }, false);
    r.outputColorSpace = THREE.LinearSRGBColorSpace;
    r.toneMapping = THREE.NoToneMapping;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFShadowMap; // PCFSoft was removed in r18x (warned + fell back every boot)
    setMaxAnisotropy(r.capabilities.getMaxAnisotropy());
    this.pipe = new Pipeline(r);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(74, innerWidth / Math.max(1, innerHeight), 0.03, 900);
    this.scene.add(this.camera);
    // down-welling daylight
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x223344, 0.8); this.scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffffff, 2.5); this.sun.position.set(30, 100, 20); this.scene.add(this.sun); this.scene.add(this.sun.target);
    progress(0.05, 'シミュレーション初期化');

    this.sub = new Submarine();
    this.sys = new Systems(this.sub);
    this.env = {};
    this.inc = new Incidents(this.sub, this.sys, this.env);
    this.ap = new Autopilot(this.sub, this.sys);
    this.audio = new AudioEngine();
    progress(0.12, '地形マテリアル読込');
    const tmat = await createTerrainMaterial();
    this.terrain = new Terrain(this.scene, tmat);
    progress(0.3, '耐圧殻内装 構築');
    this.cockpit = await new Cockpit(r).build();
    this.mfd = new MFDRenderer(this.cockpit);
    progress(0.5, '船体外装 構築');
    this.ext = await new Exterior(this.scene).build();
    this.pipe.spots = this.ext.spots;
    progress(0.6, '海洋生物');
    this.snow = new MarineSnow(this.scene, 16000, 28);
    this.bubbles = new Bubbles(this.scene, 2000);
    this.life = new Life(this.scene);
    this.props = new Props(this.scene);
    this.sub.propColliders = this.props.colliders;
    try { this.mothership = await buildMothership(this.scene); } catch (e) { console.warn(e); }

    // UI
    this.controls = new Controls(this.ui, { onTap: (x, y) => this._tap(x, y) });
    this.hud = new HUD(this.ui, this);
    this._wire();
    // resize: debounce + re-read after orientation / fullscreen transitions (innerHeight settles late on Android)
    const onResize = () => { clearTimeout(this._rzT); this.resize(); this._rzT = setTimeout(() => this.resize(), 300); };
    addEventListener('resize', onResize);
    addEventListener('orientationchange', onResize);
    document.addEventListener('fullscreenchange', onResize);
    document.addEventListener('webkitfullscreenchange', onResize);
    window.visualViewport?.addEventListener('resize', onResize);
    this.applyQuality(true);

    // warm up terrain around the start (and around a teleport target in dev mode)
    this._applyDevStart();
    progress(0.7, '海底地形 生成');
    await this._warmTerrain((f) => progress(0.7 + f * 0.28, '海底地形 生成'));
    progress(1, '準備完了');
    this.state = 'title';
    this._clock.start();
    this._clock.getDelta();
    this._loop = this._loop.bind(this);
    if (this.manual) this._manualLoop(); else requestAnimationFrame(this._loop);
    window.__game = this;
    window.__shot = () => { this._render(this._t); return this.canvas.toDataURL('image/jpeg', 0.9); };
  }

  async _warmTerrain(progress) {
    const t0 = performance.now();
    for (let i = 0; i < 400; i++) {
      this.terrain.update(this.sub.pos);
      this.props.update(0, { subPos: this.sub.pos, camPos: this.sub.pos, extLight: 0 });
      await new Promise((r) => setTimeout(r, 30));
      const busy = this.terrain.loading;
      progress(Math.min(1, i / 60));
      if (i > 12 && !busy && this.terrain.meshCount > 10) break;
      if (performance.now() - t0 > 25000) break;
    }
  }

  _applyDevStart() {
    const P = this.params;
    const poi = P.get('poi') && POIS.find((p) => p.id === P.get('poi'));
    if (poi) {
      const a = +(P.get('a') ?? 0.6), d = +(P.get('dist') ?? 28);
      this.sub.pos.set(poi.x + Math.sin(a) * d, poi.y + +(P.get('up') ?? 8), poi.z + Math.cos(a) * d);
      this.sub.yaw = a; // face the POI
      this.sub.vbt = 150;
    } else if (P.has('depth')) {
      // place the boat in open water at the requested depth: walk from the shelf towards the
      // trench axis until the seabed is at least `alt` metres below (default 40 m)
      const d = +P.get('depth'), alt = +(P.get('alt') ?? 40);
      const z = +(P.get('z') ?? this.sub.pos.z);
      let x = P.has('x') ? +P.get('x') : this.sub.pos.x;
      if (!P.has('x')) {
        const cx = trenchCenterX(z);
        for (let i = 0; i < 400 && groundHeight(x, z, 0) > -d - alt; i++) x += (cx - x) > 0 ? 10 : -10;
      }
      this.sub.pos.set(x, -d, z);
      this.sub.vbt = 150;
      const g = groundHeight(x, z, 0);
      if (this.sub.pos.y < g + 4) this.sub.pos.y = g + 6;
      this.sub.yaw = P.has('yaw') ? +P.get('yaw') : -Math.PI / 2; // face the trench (east)
    }
    if (P.has('yaw')) this.sub.yaw = +P.get('yaw');
    this.sub._updateQuat();
    // settle VBT to neutral at the start depth
    if (poi || P.has('depth')) { this._neutralise(); this._devStart = true; }
  }
  _neutralise() {
    const s = this.sub;
    s.depth = -s.pos.y;
    for (let i = 0; i < 40; i++) { const kg = s.trimState; s.vbt = THREE.MathUtils.clamp(s.vbt - kg / 1.025, 0, 400); }
  }

  // ------------------------------------------------------------------ wiring
  _wire() {
    const { inc, sys, audio, hud } = this;
    sys.onMessage = (text, level) => hud.msg(text, level);
    inc.onIncident = (f) => {
      audio.play(f.sev >= 3 ? 'warn' : 'chime');
      if (f.sfx) audio.play(f.sfx);
      hud.msg(`${f.sev >= 3 ? '⚠ WARNING' : 'CAUTION'}: ${f.title}`, f.sev >= 3 ? 'alarm' : 'warn');
      sys.messages.push({ text: f.title, level: f.sev >= 3 ? 'alarm' : 'warn', t: this.sub.time });
      if (this.timeScale > 1) { this.setTimeScale(1); hud.msg('異常発生 — 時間加速を解除', 'warn'); }
      if (f.shake) this.shake = Math.max(this.shake, f.shake);
      if (f.sfx === 'bang' || f.sfx === 'crack') this.flash = Math.max(this.flash, 0.15);
      if (f.kind === 'elec' || f.kind === 'fire') this.cockpit && (this._spark = this.cockpit.busBarPos);
      if (f.kind === 'leak') navigator.vibrate?.([30, 40, 30]);
      if (f.sev >= 2) setTimeout(() => this.radio(this._radioReply(f)), 5000 + Math.random() * 4000);
    };
    inc.onImpact = (e) => { audio.thud(e); this.shake = Math.max(this.shake, Math.min(1.2, e * 0.9)); navigator.vibrate?.(Math.min(200, 40 + e * 80)); if (e > 1) this.flash = Math.max(this.flash, 0.06); };
    inc.onRepairStart = () => audio.play('tool');
    inc.onRepairDone = () => audio.play('good');
    this.life.onSighting = (name) => {
      const s = SPECIES[name];
      if (!s || this.state !== 'play') return;
      hud.msg(`🐟 生物発見: ${s[0]} — ${s[1]}`, 'good');
      sys.messages.push({ text: `生物発見: ${s[0]}`, level: 'good', t: this.sub.time });
      audio.play('good');
    };
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { if (this.state === 'play') this.save(); this.audio.suspend(); } else if (this.state === 'play') this.audio.resume();
    });
  }

  _radioReply(f) {
    const pick = (a) => a[(Math.random() * a.length) | 0];
    switch (f.kind) {
      case 'leak': return pick(['わだつみ、浸水の報告を受けた。浸水量を監視し、必要なら直ちに浮上せよ。', '母船了解。浸水箇所を隔離し、状況を報告せよ。']);
      case 'fire': return '火災了解！ 呼吸器を装着し、配電盤を遮断して消火せよ。';
      case 'hull': return 'ひずみ異常を確認した。これ以上の潜航は許可できない。浮上を開始せよ。';
      case 'ballast': return 'バラスト異常了解。ウェイト投棄の準備をせよ。';
      case 'entangle': return '絡まりか。落ち着いて後進をかけ、振りほどけ。';
      case 'collision': return '衝撃を検知した。船体の損傷を確認せよ。';
      case 'lss': return '生命維持系の異常を了解。CO2濃度に注意せよ。';
      case 'battery': return 'バッテリー異常了解。負荷を下げ、温度を監視せよ。';
      default: return 'わだつみ、こちらかいれい。異常の報告を了解した。';
    }
  }

  radio(text) {
    if (this.sys.comms.signal < 0.15 || this.state !== 'play') return;
    this.hud.msg(`📻 かいれい: ${text}`, 'radio');
    this.sys.messages.push({ text: `かいれい: ${text}`, level: 'radio', t: this.sub.time });
    this.audio.speak(text);
  }

  // ------------------------------------------------------------------ player actions
  setTimeScale(k) {
    if (k > 1 && !this.ap.engaged) { this.hud.msg('時間加速は自動操縦中のみ使用可能', 'warn'); return; }
    if (k > 1 && this.inc.active.some((f) => !f.resolved && f.sev >= 2)) { this.hud.msg('異常対処中は時間加速できない', 'warn'); return; }
    this.timeScale = k;
  }
  toggleLights() {
    const L = this.sys.lights;
    if (!this.sys.powered('LIGHT')) { this.hud.msg('外部照明ブレーカーが開放/トリップしている', 'warn'); return; }
    const on = L.main > 0 || L.flood > 0;
    L.main = on ? 0 : 0.85; L.flood = on ? 0 : 0.6;
    this.audio.play('breaker');
  }
  vbtManual(cmd) {
    if (cmd !== 0 && this.ap.ballastAuto) { this.ap.ballastAuto = false; this.hud.msg('手動バラスト操作 — 自動浮力制御を解除', 'info'); }
    if (cmd < 0 && !this.sys.powered('HYD')) { this.hud.msg('油圧系統に電源がない — 排水不能', 'warn'); }
    this.sub.vbtCmd = cmd;
  }
  dropWeight(kind) {
    if (this.sub.dropWeight(kind)) {
      this.audio.play('drop');
      this.sys.msg(`${kind === 'descent' ? '降下' : '浮上'}用ウェイト ${SPEC.dropWeightMass} kg 投棄`, 'warn');
      this._burst(40, -1.7);
      this.shake = Math.max(this.shake, 0.3);
    } else this.hud.msg('投棄できるウェイトがない', 'warn');
  }
  emergencyBlow() {
    let n = 0;
    while (this.sub.dropWeight('descent')) n++;
    while (this.sub.dropWeight('ascent')) n++;
    if (n) { this.audio.play('drop'); this._burst(80, -1.7); }
    this.sub.vbtIsolated = false; this.sub._vbtStuckOpen = false;
    this.ap.engage(true); this.ap.setMode('ascent', true);
    this.ap.ballastAuto = true;
    this.sys.msg(`緊急浮上！ ウェイト ${n} 個投棄、VBT全排水`, 'alarm');
    this.radio('緊急浮上を確認した。浮上地点に向かう。');
  }
  toggleArm() {
    if (this.sub.manipulatorLost) { this.hud.msg('マニピュレーターは投棄済み', 'warn'); return; }
    if (!this.sys.powered('HYD')) { this.hud.msg('油圧系統に電源がない', 'warn'); return; }
    this.ext.setArm(!this.ext.armTarget);
    this.audio.play('grind');
  }
  navTo(p) {
    this._homeBound = false;
    this.ap.engage(true); this.ap.navTo(p);
    this.sys.msg(`自動航行開始 → ${p.name}`, 'info');
    this.radio(`了解。${p.name}への航行を許可する。`);
  }
  returnHome() {
    this._homeBound = true;
    this.ap.engage(true);
    this.ap.navTo({ id: 'home', name: '母船直下', nameEn: 'Mothership', x: MOTHERSHIP.x, y: -Math.min(40, Math.max(12, this.sub.depth)) - 12, z: MOTHERSHIP.z, r: 30 });
    this.sys.msg('母船直下へ帰還航行開始', 'info');
    this.radio('了解。母船直下で浮上せよ。回収準備に入る。');
  }

  // cockpit touch: ray into the interior scene
  _tap(x, y) {
    if (this.state !== 'play') return;
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(((x - rect.left) / rect.width) * 2 - 1, -((y - rect.top) / rect.height) * 2 + 1);
    const rc = (this._rc ||= new THREE.Raycaster());
    rc.setFromCamera(ndc, this.camera);
    const hits = rc.intersectObjects(this.cockpit.scene.children, true);
    for (const h of hits) {
      let o = h.object;
      while (o && !o.userData.action) o = o.parent;
      if (o) { this._cockpitAction(o.userData.action); return; }
      if (h.distance > 0.2) break; // first real surface blocks the tap
    }
  }
  _cockpitAction(a) {
    const { ap, sys, audio } = this;
    audio.play('button'); navigator.vibrate?.(10);
    if (a.type === 'breaker') { sys.toggleBreaker(a.id); audio.play('breaker'); return; }
    if (a.type === 'mfd') {
      const order = ['PFD', 'NAV', 'SONAR', 'SYS'];
      const cur = this.mfd.pages[a.id];
      if (cur) this.mfd.pages[a.id] = order[(order.indexOf(cur) + 1) % order.length];
      else if (a.id === 'lss') this.hud.open('sys'); else this.hud.open('log');
      return;
    }
    switch (a.id) {
      case 'AP': ap.engage(!ap.engaged); sys.msg(ap.engaged ? '自動操縦 接続' : '自動操縦 解除'); break;
      case 'HDG': ap.setMode('hdg', !ap.hdg.on, Math.round(heading(this.sub.yaw))); break;
      case 'DPT': ap.setMode('depth', !ap.depth.on, Math.round(this.sub.depth)); break;
      case 'ALT': ap.setMode('alt', !ap.alt.on, 8); break;
      case 'SPD': ap.setMode('speed', !ap.speed.on, 0.8); break;
      case 'STN': ap.setMode('station', !ap.station.on); break;
      case 'NAV': this.hud.open('nav'); break;
      case 'OAS': ap.oas.on = !ap.oas.on; sys.msg(`障害物回避 ${ap.oas.on ? 'ON' : 'OFF'}`); break;
      case 'LT1': sys.lights.main = sys.lights.main > 0 ? 0 : 0.85; break;
      case 'LT2': sys.lights.flood = sys.lights.flood > 0 ? 0 : 0.6; break;
      case 'VBT': case 'TRM': this.hud.open('sys'); break;
      case 'ALM': audio.klaxonMuted = true; sys.msg('アラーム消音'); break;
      case 'CAM': this.lasers = !this.lasers; break;
    }
  }

  _burst(n, yOff = 0) {
    const p = new THREE.Vector3();
    for (let i = 0; i < n; i++) {
      p.set((Math.random() - 0.5) * 2, yOff + Math.random() * 0.5, -2 + (Math.random() - 0.5) * 3).applyQuaternion(this.sub.quat).add(this.sub.pos);
      this.bubbles.emit(p, new THREE.Vector3((Math.random() - 0.5) * 0.6, 0.3 + Math.random(), (Math.random() - 0.5) * 0.6), 0.02 + Math.random() * 0.08, 8 + Math.random() * 6);
    }
  }

  // ------------------------------------------------------------------ lifecycle
  start(fromSave) {
    if (this.state === 'play') return;
    this.requestFullscreen(); // must run synchronously inside the tap handler (user activation)
    this.audio.start().catch?.(() => {});
    this.controls.reset();
    if (fromSave) this.load();
    else {
      this.sys.msg('DSV-11 わだつみ 潜航開始。全系統正常。', 'good');
      setTimeout(() => this.radio('わだつみ、こちら母船かいれい。潜航を許可する。良い航海を。'), 2500);
    }
    this.state = 'play';
    this._devStart = false;
    this.inc.clock = 0;
    this._clock.getDelta(); this._acc = 0; // no catch-up burst after the title screen
    this.ui.classList.add('play');
  }
  static isFullscreen() { return !!(document.fullscreenElement || document.webkitFullscreenElement); }
  requestFullscreen() {
    const el = document.documentElement;
    const fs = el.requestFullscreen || el.webkitRequestFullscreen;
    const lock = () => { try { screen.orientation?.lock?.('landscape')?.catch?.(() => {}); } catch { /* ignore */ } };
    if (Game.isFullscreen()) { lock(); return; }
    if (!fs) return;
    try {
      const p = fs.call(el, { navigationUI: 'hide' });
      if (p && p.then) p.then(lock, () => {}); else setTimeout(lock, 200);
    } catch { /* not allowed (no user gesture) */ }
  }
  abort() { this.save(); location.reload(); }

  save() {
    try {
      if (this.state !== 'play' || this.sys.dead) return;
      const d = { v: 1, sub: this.sub.serialize(), sys: this.sys.serialize(), inc: this.inc.serialize(), ap: this.ap.serialize(), disc: [...this.discovered], sampled: [...this.sampled], samples: this.samples, sight: [...this.life.sightings], at: Date.now() };
      localStorage.setItem(SAVE_KEY, JSON.stringify(d));
    } catch (e) { console.warn('save failed', e); }
  }
  static hasSave() { try { const d = JSON.parse(localStorage.getItem(SAVE_KEY)); return d && d.v === 1 ? d : null; } catch { return null; } }
  static clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ } }
  load() {
    const d = Game.hasSave(); if (!d) return;
    try {
      this.sub.restore(d.sub); this.sys.restore(d.sys);
    } catch (e) { console.warn('corrupt save', e); Game.clearSave(); return; }
    this.inc.sealant = d.inc?.sealant ?? 2;
    this.inc.clock = d.inc?.clock ?? 0;
    if (d.ap) { for (const k of ['hdg', 'depth', 'alt', 'speed']) if (d.ap[k]) Object.assign(this.ap[k], d.ap[k]); }
    for (const m of [100, 200, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 10900]) if (this.sub.maxDepth > m) this._milestones.add(m);
    d.disc?.forEach((x) => this.discovered.add(x)); d.sampled?.forEach((x) => this.sampled.add(x)); this.samples = d.samples || 0;
    d.sight?.forEach((x) => this.life.sightings.add(x));
    this.sys.msg('航海記録を読み込みました', 'good');
  }

  resize() {
    const w = innerWidth, h = innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = THREE.MathUtils.clamp(64 * (1.9 / Math.max(1.3, w / h)) + 10, 66, 82);
    this.camera.updateProjectionMatrix();
    const dpr = devicePixelRatio || 1;
    const Q = QUALITY[this.quality] || QUALITY[2];
    const pr = this.params.has('pr') ? +this.params.get('pr') : Math.min(dpr, Q.pr);
    this.pipe.setSize(w, h, pr);
    this._pr = pr;
    const k = pr * h / 400;
    this.cockpit.pMat.uniforms.uPR.value = k;
    this.snow.mat.uniforms.uPR.value = k;
    this.bubbles.mat.uniforms.uPR.value = k;
  }
  setQuality(q) {
    if (!QUALITY[q]) return;
    this.quality = q;
    try { localStorage.setItem(QKEY, String(q)); } catch { /* ignore */ }
    this.applyQuality();
  }
  applyQuality(initial = false) {
    const Q = QUALITY[this.quality] || QUALITY[2];
    const r = this.renderer;
    r.shadowMap.enabled = !!Q.shadow;
    r.shadowMap.needsUpdate = true;
    for (const l of this.ext.lamps) {
      if (l.kind !== 'main') continue;
      l.L.castShadow = !!Q.shadow;
      l.L.shadow.mapSize.set(Q.shadowMap, Q.shadowMap);
      l.L.shadow.map?.dispose(); l.L.shadow.map = null;
    }
    this.cockpit.setShadows?.(Q.cockpitShadow);
    this.pipe.setQuality?.(Q);
    this.snow.setDensityScale?.(Q.snow);
    setMaxAnisotropy(Math.min(Q.aniso, r.capabilities.getMaxAnisotropy()));
    // materials must recompile when shadow on/off changes
    if (!initial) { this.scene.traverse((o) => { if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.needsUpdate = true; }); }); this.cockpit.scene.traverse((o) => { if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.needsUpdate = true; }); }); }
    this.resize();
  }

  // ------------------------------------------------------------------ main loop
  _manualLoop() { const step = () => { this._frame(1 / 20); setTimeout(step, 50); }; step(); }
  _loop() {
    requestAnimationFrame(this._loop);
    const dt = Math.min(0.1, this._clock.getDelta());
    if (this._ctxLost || document.hidden) return;
    try { this._frame(dt); } catch (e) {
      // never let one bad frame kill the loop silently: log once per message
      const k = String(e && e.message);
      if (!(this._errs ||= new Set()).has(k)) { this._errs.add(k); console.error(e); }
    }
  }

  _frame(dt) {
    this._t += dt;
    const t = this._t;
    if (this.state === 'play') {
      this._acc += dt * this.timeScale;
      let n = 0;
      const cap = 60 * 16;
      while (this._acc >= H && n < cap) { this._step(H); this._acc -= H; n++; if (this.state !== 'play') break; }
      if (n >= cap) this._acc = 0;
    } else if (this.state === 'title' && !this._devStart) {
      // idle at the surface beside the mothership: gentle swell
      this.sub.pos.y = -1.5 + Math.sin(t * 0.6) * 0.1;
      this.sub.roll = Math.sin(t * 0.5) * 0.02; this.sub.pitch = Math.sin(t * 0.37) * 0.015;
      this.sub.yaw += dt * 0.004;
      this.sub._updateQuat();
    }
    this._visual(dt, t);
    this._render(t);
  }

  _step(dt) {
    const { sub, sys, inc, ap } = this;
    const pilot = this.controls.read();
    this.pilot = pilot;
    if (this.timeScale > 1 && (Math.abs(pilot.surge) + Math.abs(pilot.yaw) + Math.abs(pilot.heave) + Math.abs(pilot.sway)) > 0.1) this.setTimeScale(1);
    const cap = THREE.MathUtils.clamp(sys.pilotHealth * 1.4 - 0.2, 0, 1);
    ap.update(dt, { surge: pilot.surge * cap, yaw: pilot.yaw * cap, heave: pilot.heave * cap, sway: pilot.sway * cap });
    if (this.env.quake > 0) sub.extForce.add(_v.set((Math.random() - 0.5) * 6000, (Math.random() - 0.5) * 4000, (Math.random() - 0.5) * 6000));
    sub.step(dt, sys);
    sys.activeCautions = inc.cautionCount;
    sys.step(dt, this.env);
    inc.step(dt);
    this.crushMargin = SPEC.crushDepth * (1 - sys.hull.fatigue * 3 - (1 - sys.hull.integrity) * 0.5 - sys.hull.crack * 0.3) - sub.depth;
    sub.siltStir = Math.max(0, sub.siltStir - dt * 0.05);

    for (const p of POIS) {
      const d = Math.hypot(p.x - sub.pos.x, p.y - sub.pos.y, p.z - sub.pos.z);
      if (d < p.r * 0.9 && !this.discovered.has(p.id)) {
        this.discovered.add(p.id);
        sys.msg(`★ 調査地点到達: ${p.name}`, 'good');
        this.audio.play('good');
        setTimeout(() => this.radio(`${p.name}への到達を確認。素晴らしい。映像を記録せよ。`), 3000);
      }
      if (d < p.r * 0.6 && this.ext.armPose > 0.9 && !this.sampled.has(p.id) && sub.altitude < 6) {
        this.sampled.add(p.id); this.samples++;
        sys.msg(`マニピュレーターで試料採取: ${p.name}`, 'good');
        this.audio.play('grind');
      }
    }
    for (const m of [100, 200, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 10900]) {
      if (sub.depth > m && !this._milestones.has(m)) {
        this._milestones.add(m);
        sys.msg(`深度 ${m.toLocaleString()} m 通過`, 'info');
        if (m >= 1000 && m % 1000 === 0) setTimeout(() => this.radio(`深度${m}メートル通過を確認。全系統の状態を報告せよ。`), 1500);
        if (m === 200) sys.msg('太陽光がほぼ届かない薄明層へ。外部照明を点灯せよ。', 'info');
        if (m === 1000) sys.msg('漸深層 — 完全な暗黒の世界', 'info');
        if (m === 10900) this.radio('信じられない…わだつみ、君は地球の最深部にいる。');
      }
    }
    if (this._homeBound && !ap.nav.on && Math.hypot(sub.pos.x - MOTHERSHIP.x, sub.pos.z - MOTHERSHIP.z) < 40) { this._homeBound = false; ap.setMode('ascent', true); sys.msg('母船直下 — 自動浮上', 'good'); }
    if (sub.depth < 1.5 && sub.maxDepth > 30 && (sub.vel.y > -0.05 || (ap.ascent.on && ap.engaged))) this._surface();

    if (sub.vbtFlow < 0 && Math.random() < dt * 25) this._burst(1, -0.5);
    if (sub.vbtFlow > 0 && Math.random() < dt * 10) this._burst(1, 0.9);
    this._trailT = (this._trailT || 0) - dt;
    if (this._trailT <= 0) { this._trailT = 2; this.trail.push(sub.pos.x, sub.pos.z); if (this.trail.length > 800) this.trail.splice(0, 2); }
    this._saveT -= dt;
    if (this._saveT <= 0) { this._saveT = 30; this.save(); }
    if (sys.dead && this.state === 'play') this._die(sys.dead);
  }

  _endCommon() {
    this.controls.reset(); this.hud.releaseHolds(); this.hud.close();
    this.timeScale = 1;
    this.ui.classList.remove('play');
    try { speechSynthesis?.cancel(); } catch { /* ignore */ }
  }
  _surface() {
    if (this.state !== 'play') return;
    this.state = 'end';
    this._endCommon();
    this.audio.play('surface');
    this.onEnd?.('surface', this._stats());
    Game.clearSave();
  }
  _die(cause) {
    if (this.state !== 'play') return;
    this.state = 'end';
    this._endCommon();
    if (cause === 'implosion') { this.audio.play('implode'); this.flash = 1; this.pipe.params.flashColor.set(1, 1, 1); }
    this.onEnd?.(cause, this._stats(), DEATH[cause]);
    Game.clearSave();
  }
  _stats() {
    const s = this.sub;
    return { time: s.time, maxDepth: s.maxDepth, dist: s.distance, species: this.life.sightings.size, speciesTotal: Object.keys(SPECIES).length, pois: this.discovered.size, poisTotal: POIS.length, samples: this.samples, incidents: this.inc.history.length };
  }

  // ------------------------------------------------------------------ visuals
  _visual(dt, t) {
    const { sub, sys, ap, inc } = this;
    const cam = this.camera;
    const L = this.controls.look;
    if (L.id === null) { L.yaw *= 1 - Math.min(1, dt * 0.25); L.pitch *= 1 - Math.min(1, dt * 0.25); }
    const yawL = L.yaw + +(this.params.get('lx') ?? 0), pitchL = EYE_PITCH + L.pitch + +(this.params.get('ly') ?? 0);
    const eye = _v.copy(SPHERE_CENTER).add(EYE);
    // neck/torso kinematics driven by the look offset (not the resting gaze): turning the head
    // swings the eyes ~12 cm around the neck; looking down the pilot leans towards the lower port
    const lp = pitchL - EYE_PITCH;
    eye.x += Math.sin(yawL) * 0.12;
    eye.z -= (1 - Math.cos(yawL)) * 0.05 + Math.max(0, -lp) * 0.16;
    eye.y -= Math.max(0, -lp) * 0.1 - Math.max(0, lp) * 0.03;
    const accB = _v2.copy(sub.acc || _zero).applyQuaternion(_q2.copy(sub.quat).invert());
    this._headOff.lerp(accB.multiplyScalar(-0.04).clampLength(0, 0.06), Math.min(1, dt * 3));
    eye.add(this._headOff);
    eye.y += Math.sin(t * (1.4 + sys.pilotStress * 1.5)) * 0.004 * (1 + sys.hypercapnia * 3);
    cam.position.copy(eye).applyQuaternion(sub.quat).add(sub.pos);
    this.shake = Math.max(0, Math.max(this.shake, inc.shake) - dt * 0.9);
    let rpm = 0; for (const x of sub.thr) rpm = Math.max(rpm, Math.abs(x.rpm));
    const thrV = rpm * 0.004 + (sub.thr.some((x) => x.fault === 'degraded' || x.jam > 0) ? 0.01 : 0);
    const sh = this.shake * 0.03 + thrV;
    _e.set(pitchL + (Math.random() - 0.5) * sh, yawL + (Math.random() - 0.5) * sh, (Math.random() - 0.5) * sh * 0.6, 'YXZ');
    _q.setFromEuler(_e);
    cam.quaternion.copy(sub.quat).multiply(_q);
    cam.updateMatrixWorld();

    updateWater(t, 1 + sub.siltStir * 2 + (this.env.turbidity ? 1.8 : 0) + (this.env.ventHeat || 0) * 1.5);
    const a = ambientAtDepth(cam.position.y);
    this.hemi.color.setRGB(a.r, a.g, a.b); this.hemi.groundColor.setRGB(a.r * 0.1, a.g * 0.15, a.b * 0.2);
    this.sun.color.setRGB(a.r, a.g, a.b);
    this.sun.position.set(cam.position.x + 30, cam.position.y + 100, cam.position.z + 20); this.sun.target.position.copy(cam.position);
    // particle scattering coefficient b (1/m): productive surface layer ~0.04, clear abyssal water ~0.012;
    // hydrothermal plumes and stirred silt raise it again
    this.pipe.params.scatB = 0.012 + 0.028 * Math.exp(-sub.depth / 350) + (this.env.ventHeat || 0) * 0.01;
    this.pipe.params.silt = THREE.MathUtils.clamp(sub.siltStir * 0.6 + (this.env.turbidity ? 0.4 : 0), 0, 1);

    this.ext.update(dt, t, { sub, sys, ap, lasers: this.lasers });
    const extLight = this.ext.extLight;
    this.terrain.update(sub.pos);
    const st = { subPos: sub.pos, camPos: cam.position, extLight, subQuat: sub.quat };
    this.props.update(t, st);
    this.life.update(dt, t, sub.pos, sub.vel, extLight > 0.2, sub.depth, st);
    const sp = (this._snowSpots ||= []); sp.length = 0;
    for (const s of this.ext.spots) if (s.visible && s.intensity > 1) sp.push(s);
    this.snow.update(t, cam.position, sp, a, sub.depth, this.pipe.params.silt);
    this.bubbles.update(dt, a, extLight * 0.5);

    const unresolved = inc.active.filter((f) => !f.resolved);
    const alarmLevel = unresolved.some((f) => f.sev >= 3) || sub.floodL > 60 || sys.fire.active ? 2 : unresolved.length ? 1 : 0;
    this.alarmLevel = alarmLevel;
    const cst = { sub, sys, ap, inc, ambient: a, extLight, pilot: this.pilot || { surge: 0, yaw: 0, heave: 0 }, alarmLevel, sparkBurst: this._spark || null, trail: this.trail };
    this._spark = null;
    this.cockpit.update(dt, t, cst);
    this.mfd.update(dt, cst);
    if (this.state === 'play') {
      this.hud.update(dt);
      this.audio.update(dt, { sub, sys, inc, ap, env: this.env, alarmLevel, dead: sys.dead });
    }

    const P = this.pipe.params;
    this.flash = Math.max(0, this.flash - dt * 1.5);
    P.flash = this.flash;
    P.redAlert = !sys.powered('CABIN') ? 0.8 : alarmLevel > 1 ? 0.25 + 0.25 * Math.sin(t * 6) : 0;
    P.smoke = sys.fire.smoke * 0.8;
    P.fog = (sys.condensation || 0) * 0.35;
    if (this.state === 'end' && sys.dead) this._endT = (this._endT || 0) + dt;
    P.blackout = Math.min(1, THREE.MathUtils.clamp((1 - sys.pilotHealth) * 1.1 - 0.35, 0, 1) + (this._endT ? this._endT * 0.5 : 0));
    P.ca = 0.012 + sys.hypoxia * 0.05 + this.shake * 0.02;
    // eye adaptation: centre-weighted log-average luminance -> exposure for a mid-grey key.
    // Asymmetric like the human eye: light adaptation ~1 s, dark adaptation ~8 s; limited range
    // so the deep ocean stays genuinely dark (you cannot see without the lamps).
    const key = 0.16, target = THREE.MathUtils.clamp(key / Math.max(1e-3, this.pipe.avgLum), 0.45, 2.6);
    const rate = target < P.exposure ? 1.2 : 0.14;
    P.exposure += (target - P.exposure) * (1 - Math.exp(-dt * rate));
    if (!Number.isFinite(P.exposure)) P.exposure = 1;
    P.vignette = 0.55 + sys.hypoxia * 0.4;
    P.grain = 0.035 + (sub.depth > 1000 ? 0.02 : 0);
    // image-based fill ~ indirect bounce of the cabin lamps off the (light) sphere walls
    this.cockpit.scene.environmentIntensity = 0.025 + (sys.powered('CABIN') ? sys.lights.cabin * 0.12 : 0);
  }

  _render(t) { this.pipe.render(this.scene, this.cockpit.scene, this.camera, t); }
}
