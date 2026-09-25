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
import { Cockpit, SPHERE_CENTER, EYE } from './cockpit/cockpit.js';
import { MFDRenderer } from './cockpit/mfd.js';
import { Exterior } from './world/exterior.js';
import { MarineSnow, Bubbles, Life, SPECIES } from './world/life.js';
import { Props, buildMothership } from './world/props.js';
import { POIS, groundHeight } from './world/density.js';
import { AudioEngine } from './audio/audio.js';
import { Controls } from './ui/controls.js';
import { HUD } from './ui/hud.js';

const SAVE_KEY = 'abyssal-descent-save-v1';
const H = 1 / 60; // fixed simulation step
const MOTHERSHIP = new THREE.Vector3(-10, 0, 150);
const DEATH = {
  implosion: ['船殻圧壊', 'HULL IMPLOSION', '外殻が水圧に耐えきれず、一瞬で圧壊した。'],
  flooded: ['浸水による水没', 'FLOODED', '耐圧殻内が海水で満たされた。'],
  hypoxia: ['低酸素症', 'HYPOXIA', '艦内の酸素濃度が生存限界を下回った。'],
  co2: ['二酸化炭素中毒', 'CO2 POISONING', 'CO2濃度が致死量に達した。'],
  power: ['全電源喪失', 'TOTAL POWER LOSS', '全バッテリーが枯渇し、生命維持が停止した。'],
};

const _v = new THREE.Vector3(), _q = new THREE.Quaternion(), _e = new THREE.Euler();

export class Game {
  constructor(canvas, ui, params) {
    this.canvas = canvas; this.ui = ui; this.params = params;
    this.manual = params.has('manual');
    this.timeScale = 1;
    this.quality = +(localStorage.getItem('ad-quality') ?? 2);
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
  }

  // ------------------------------------------------------------------ boot
  async boot(progress = () => {}) {
    const r = (this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: this.manual, stencil: false }));
    r.outputColorSpace = THREE.LinearSRGBColorSpace;
    r.toneMapping = THREE.NoToneMapping;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    setMaxAnisotropy(r.capabilities.getMaxAnisotropy());
    this.pipe = new Pipeline(r);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(74, 1, 0.03, 900);
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
    this.snow = new MarineSnow(this.scene, 14000, 28);
    this.bubbles = new Bubbles(this.scene, 2000);
    this.life = new Life(this.scene);
    this.props = new Props(this.scene);
    this.sub.propColliders = this.props.colliders;
    try { this.mothership = await buildMothership(this.scene); } catch (e) { console.warn(e); }

    // UI
    this.controls = new Controls(this.ui, { onTap: (x, y) => this._tap(x, y) });
    this.hud = new HUD(this.ui, this);
    this._wire();
    addEventListener('resize', () => this.resize());
    this.resize();

    // warm up terrain around the start (and around a teleport target in dev mode)
    this._applyDevStart();
    progress(0.7, '海底地形 生成');
    await this._warmTerrain((f) => progress(0.7 + f * 0.28, '海底地形 生成'));
    progress(1, '準備完了');
    this.state = 'title';
    this._clock.start();
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
      const d = +P.get('depth');
      this.sub.pos.set(+(P.get('x') ?? this.sub.pos.x), -d, +(P.get('z') ?? this.sub.pos.z));
      this.sub.vbt = 150;
      const g = groundHeight(this.sub.pos.x, this.sub.pos.z, 0);
      if (this.sub.pos.y < g + 4) this.sub.pos.y = g + 6;
    }
    if (P.has('yaw')) this.sub.yaw = +P.get('yaw');
    this.sub._updateQuat();
    // settle VBT to neutral at the start depth
    if (poi || P.has('depth')) this._neutralise();
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
    const ndc = new THREE.Vector2((x / innerWidth) * 2 - 1, -(y / innerHeight) * 2 + 1);
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
}
