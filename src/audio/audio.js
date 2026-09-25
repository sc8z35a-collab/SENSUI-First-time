// Procedural WebAudio engine — no samples, everything synthesised.
//
// Signal flow:
//   voices ─┬─> dry ───────────────┐
//           └─> sphereVerb (IR) ───┼─> comp -> master -> out
//   exterior sources -> hullLP ────┘   (sounds from outside are heard *through* the titanium hull)
//
// Continuous voices: inverter hum, scrubber fan, 6 thrusters (3 groups), flow noise, leak hiss, VBT pump,
// flooding gurgle, ocean ambience, fire crackle, heartbeat/breathing.
// One-shots: hull creaks & pops, sonar ping, caution chime, warning klaxon, breaker snap, clunk,
// lamp implosion, collision thud, rumble, grinding, radio squelch (+ optional JA speech synthesis).

const rnd = Math.random;

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.voice = true;          // mothership radio via speechSynthesis
    this.klaxonMuted = false;
    this._klaxonT = 0;
    this._pingT = 2;
    this._crackleT = 0;
    this._heartT = 0;
    this._breathT = 0;
    this._lastCreak = 0;
  }

  async start() {
    if (this.ctx) { if (this.ctx.state !== 'running') await this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = (this.ctx = new AC({ latencyHint: 'interactive' }));
    this.master = ctx.createGain(); this.master.gain.value = 0.9;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.knee.value = 12; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.25;
    comp.connect(this.master); this.master.connect(ctx.destination);
    this.dry = ctx.createGain(); this.dry.connect(comp);
    this.verb = ctx.createConvolver(); this.verb.buffer = this._sphereIR(); 
    this.verbIn = ctx.createGain(); this.verbIn.gain.value = 0.35; this.verbIn.connect(this.verb); this.verb.connect(comp);
    // exterior sounds pass through the hull: heavy low-pass + resonant hull mode
    this.hull = ctx.createBiquadFilter(); this.hull.type = 'lowpass'; this.hull.frequency.value = 900; this.hull.Q.value = 0.9;
    const hullRes = ctx.createBiquadFilter(); hullRes.type = 'peaking'; hullRes.frequency.value = 180; hullRes.Q.value = 3; hullRes.gain.value = 6;
    this.hull.connect(hullRes); hullRes.connect(this.dry); hullRes.connect(this.verbIn);
    this.cabin = ctx.createGain(); this.cabin.connect(this.dry); this.cabin.connect(this.verbIn);

    this.white = this._noise('white', 3); this.pink = this._noise('pink', 4); this.brown = this._noise('brown', 5);

    // ---------- continuous voices
    const v = (this.v = {});
    // 400 Hz inverter hum + harmonics
    v.hum = this._osc('sawtooth', 400, 0, this.cabin, { lp: 1400 });
    v.hum2 = this._osc('sine', 120, 0, this.cabin);
    // scrubber fan: broadband + blade pass tone
    v.fan = this._noiseVoice(this.pink, 0, this.cabin, { bp: 1100, q: 0.6 });
    v.fanTone = this._osc('triangle', 145, 0, this.cabin);
    // thrusters (grouped): tonal whine + gear mesh + prop wash noise, all through hull
    v.thr = ['main', 'vert', 'lat'].map((k, i) => ({
      whine: this._osc('sawtooth', 100, 0, this.hull, { lp: 2400 }),
      gear: this._osc('square', 60, 0, this.hull, { lp: 700 }),
      wash: this._noiseVoice(this.brown, 0, this.hull, { lp: 500 + i * 120 }),
    }));
    // flow noise past the hull
    v.flow = this._noiseVoice(this.brown, 0, this.hull, { lp: 300 });
    // ocean ambience (surface slosh, deep rumble)
    v.ocean = this._noiseVoice(this.brown, 0, this.hull, { lp: 180 });
    v.slosh = this._noiseVoice(this.pink, 0, this.hull, { bp: 420, q: 0.5 });
    // leak hiss and spray
    v.leak = this._noiseVoice(this.white, 0, this.cabin, { hp: 2600 });
    v.spray = this._noiseVoice(this.pink, 0, this.cabin, { bp: 1800, q: 0.8 });
    // VBT pump & valve
    v.pump = this._osc('square', 48, 0, this.cabin, { lp: 420 });
    v.pumpN = this._noiseVoice(this.brown, 0, this.cabin, { bp: 260, q: 1.4 });
    v.valve = this._noiseVoice(this.pink, 0, this.hull, { bp: 700, q: 2.5 });
    // interior flood water sloshing
    v.water = this._noiseVoice(this.brown, 0, this.cabin, { bp: 380, q: 0.9 });
    // fire roar
    v.fire = this._noiseVoice(this.brown, 0, this.cabin, { lp: 900 });
    // tinnitus-like whine when hypoxic / after bangs
    v.ring = this._osc('sine', 6200, 0, this.dry);
    this._ringLvl = 0;
  }

  // ------------------------------------------------------------------ building blocks
  _noise(kind, sec) {
    const ctx = this.ctx, n = Math.floor(ctx.sampleRate * sec);
    const b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < n; i++) {
      const w = rnd() * 2 - 1;
      if (kind === 'white') d[i] = w;
      else if (kind === 'pink') {
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
      } else { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
    }
    return b;
  }
  // impulse response of a ~2 m titanium sphere: dense early reflections + ringing hull modes
  _sphereIR() {
    const ctx = this.ctx, sr = ctx.sampleRate, n = Math.floor(sr * 1.4);
    const b = ctx.createBuffer(2, n, sr);
    const modes = [311, 523, 787, 1130, 1660, 2340];
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch);
      for (let i = 0; i < n; i++) {
        const t = i / sr;
        let s = (rnd() * 2 - 1) * Math.exp(-t * 9) * 0.6;
        for (let m = 0; m < modes.length; m++) s += Math.sin(2 * Math.PI * modes[m] * (1 + ch * 0.003) * t + m) * Math.exp(-t * (3.5 + m * 1.6)) * 0.05;
        // periodic flutter from the spherical focusing (~6 ms round trip)
        if (i % Math.floor(sr * 0.0061) < 3) s += Math.exp(-t * 7) * 0.5 * (rnd() - 0.5);
        d[i] = s;
      }
    }
    return b;
  }
  _filterChain(src, dest, o = {}) {
    let node = src;
    const ctx = this.ctx;
    const add = (type, f, q) => { const bq = ctx.createBiquadFilter(); bq.type = type; bq.frequency.value = f; if (q) bq.Q.value = q; node.connect(bq); node = bq; return bq; };
    const filt = {};
    if (o.hp) filt.hp = add('highpass', o.hp, o.q);
    if (o.lp) filt.lp = add('lowpass', o.lp, o.q);
    if (o.bp) filt.bp = add('bandpass', o.bp, o.q);
    const g = ctx.createGain(); g.gain.value = 0; node.connect(g); g.connect(dest);
    return { g, filt };
  }
  _osc(type, f, gain, dest, o = {}) {
    const osc = this.ctx.createOscillator(); osc.type = type; osc.frequency.value = f;
    const { g, filt } = this._filterChain(osc, dest, o); g.gain.value = gain; osc.start();
    return { osc, g, filt };
  }
  _noiseVoice(buf, gain, dest, o = {}) {
    const s = this.ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.loopStart = rnd() * 0.5;
    const { g, filt } = this._filterChain(s, dest, o); g.gain.value = gain; s.start(0, rnd() * buf.duration);
    return { src: s, g, filt };
  }
  _set(param, v, tc = 0.08) { if (param) param.setTargetAtTime(v, this.ctx.currentTime, tc); }
  _env(g, a, peak, d, t0 = this.ctx.currentTime) { g.gain.cancelScheduledValues(t0); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(peak, t0 + a); g.gain.exponentialRampToValueAtTime(0.0001, t0 + a + d); }
  _shot(buf, dest, { gain = 1, a = 0.005, d = 0.3, rate = 1, hp, lp, bp, q, delay = 0 } = {}) {
    const ctx = this.ctx; const s = ctx.createBufferSource(); s.buffer = buf; s.playbackRate.value = rate;
    const { g, filt } = this._filterChain(s, dest, { hp, lp, bp, q });
    const t0 = ctx.currentTime + delay;
    this._env(g, a, gain, d, t0);
    s.start(t0, rnd() * (buf.duration - a - d - 0.1 > 0 ? buf.duration - a - d - 0.1 : 0)); s.stop(t0 + a + d + 0.05);
    return { s, g, filt, t0 };
  }
  _tone(f, dest, { type = 'sine', gain = 0.3, a = 0.005, d = 0.4, delay = 0, slide = 0 } = {}) {
    const ctx = this.ctx; const o = ctx.createOscillator(); o.type = type; o.frequency.value = f;
    const g = ctx.createGain(); o.connect(g); g.connect(dest);
    const t0 = ctx.currentTime + delay;
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, f * slide), t0 + a + d);
    this._env(g, a, gain, d, t0); o.start(t0); o.stop(t0 + a + d + 0.05);
    return o;
  }

  // ------------------------------------------------------------------ one-shots
  play(name, k = 1) {
    if (!this.ctx || !this.enabled) return;
    switch (name) {
      case 'creak': return this.creak(k);
      case 'ping': return this.ping(k);
      case 'chime': this._tone(988, this.cabin, { type: 'triangle', gain: 0.18, d: 0.35 }); this._tone(740, this.cabin, { type: 'triangle', gain: 0.18, d: 0.6, delay: 0.22 }); return;
      case 'warn': for (let i = 0; i < 3; i++) this._tone(1320, this.cabin, { type: 'square', gain: 0.07, d: 0.09, delay: i * 0.16 }); return;
      case 'good': this._tone(660, this.cabin, { type: 'sine', gain: 0.12, d: 0.2 }); this._tone(990, this.cabin, { type: 'sine', gain: 0.12, d: 0.35, delay: 0.12 }); return;
      case 'button': this._tone(2400, this.cabin, { type: 'square', gain: 0.03, a: 0.001, d: 0.025 }); this._shot(this.white, this.cabin, { gain: 0.08, a: 0.001, d: 0.02, hp: 3000 }); return;
      case 'breaker': this._shot(this.white, this.cabin, { gain: 0.6, a: 0.001, d: 0.04, hp: 1800 }); this._tone(210, this.cabin, { type: 'triangle', gain: 0.2, d: 0.08 }); return;
      case 'clunk': this._shot(this.brown, this.hull, { gain: 1.2, a: 0.003, d: 0.5, lp: 260 }); this._tone(72, this.hull, { gain: 0.5, d: 0.5, slide: 0.7 }); this._metal(0.35, 0.8); return;
      case 'drop': this.play('clunk'); this._shot(this.brown, this.hull, { gain: 0.6, a: 0.05, d: 2.5, lp: 160, delay: 0.1 }); return;
      case 'bang': this.bang(k); return;
      case 'thud': this.thud(k); return;
      case 'rumble': this._shot(this.brown, this.hull, { gain: 1.4, a: 1.2, d: 7, lp: 90 }); this._tone(34, this.hull, { gain: 0.5, a: 1, d: 6 }); return;
      case 'grind': for (let i = 0; i < 6; i++) this._tone(90 + rnd() * 40, this.hull, { type: 'sawtooth', gain: 0.12, a: 0.02, d: 0.25, delay: i * 0.2, slide: 0.6 }); return;
      case 'crack': this._shot(this.white, this.hull, { gain: 1.3, a: 0.001, d: 0.12, hp: 600 }); this._metal(1, 2.5); this.creak(1); this._ringLvl = Math.max(this._ringLvl, 0.4); return;
      case 'leak': this._shot(this.white, this.cabin, { gain: 0.5, a: 0.01, d: 0.4, hp: 2000 }); return;
      case 'fire': this._shot(this.white, this.cabin, { gain: 0.5, a: 0.001, d: 0.06, hp: 1500 }); this._shot(this.brown, this.cabin, { gain: 0.5, a: 0.3, d: 1.2, lp: 700 }); return;
      case 'alarm': this.play('warn'); return;
      case 'vent': this._shot(this.pink, this.hull, { gain: 0.8, a: 0.2, d: 3.5, bp: 500, q: 0.6 }); for (let i = 0; i < 20; i++) this._bubble(i * 0.12 + rnd() * 0.1); return;
      case 'extinguish': this._shot(this.white, this.cabin, { gain: 1.1, a: 0.02, d: 2.2, hp: 900 }); return;
      case 'tool': for (let i = 0; i < 4; i++) { this._tone(1800 + rnd() * 900, this.cabin, { type: 'triangle', gain: 0.05, a: 0.001, d: 0.06, delay: i * 0.18 }); this._shot(this.white, this.cabin, { gain: 0.15, a: 0.001, d: 0.03, hp: 4000, delay: i * 0.18 }); } return;
      case 'radio': this._shot(this.white, this.cabin, { gain: 0.25, a: 0.005, d: 0.18, bp: 2200, q: 0.7 }); return;
      case 'surface': this._shot(this.pink, this.hull, { gain: 1.0, a: 0.4, d: 3, bp: 350, q: 0.5 }); return;
      case 'implode': this.bang(3); return;
    }
  }
  _bubble(delay = 0) { const f = 500 + rnd() * 1400; this._tone(f, this.hull, { gain: 0.06, a: 0.002, d: 0.05 + rnd() * 0.05, delay, slide: 1.6 }); }
  // inharmonic ringing of a struck metal structure
  _metal(gain = 0.4, dur = 1.5) {
    const base = 180 + rnd() * 60;
    [1, 1.593, 2.136, 2.296, 2.653, 3.43].forEach((r, i) => this._tone(base * r, this.hull, { gain: gain * 0.12 / (1 + i * 0.4), a: 0.002, d: dur * (1 - i * 0.12) }));
  }
  creak(k = 1) {
    const now = this.ctx.currentTime;
    if (now - this._lastCreak < 0.35) return;
    this._lastCreak = now;
    // metallic groan: narrow resonances sweeping as stress redistributes
    const n = 2 + ((rnd() * 3) | 0);
    for (let i = 0; i < n; i++) {
      const f0 = 70 + rnd() * 160, dur = 0.8 + rnd() * 2.2 * k;
      const { filt } = this._shot(this.pink, this.hull, { gain: 0.9 * k, a: 0.15 + rnd() * 0.3, d: dur, bp: f0, q: 18 + rnd() * 20, delay: i * 0.15 * rnd() });
      filt.bp.frequency.setValueAtTime(f0, now); filt.bp.frequency.linearRampToValueAtTime(f0 * (0.6 + rnd() * 0.6), now + dur);
    }
    // sharp pops / ticks
    const pops = (rnd() * 4 * k) | 0;
    for (let i = 0; i < pops; i++) this._shot(this.white, this.hull, { gain: 0.5 * k, a: 0.001, d: 0.03, hp: 900, delay: 0.3 + rnd() * 1.5 });
  }
  ping(range = 1) {
    // OAS/sonar ping heard through the hull, with the far echo
    this._tone(11500 * 0 + 1450, this.hull, { gain: 0.05, a: 0.003, d: 0.25 });
    this._tone(1450, this.verbIn, { gain: 0.02, a: 0.003, d: 0.5, delay: 0.05 });
    if (range < 1) this._tone(1450, this.hull, { gain: 0.02 * (1 - range), a: 0.01, d: 0.3, delay: 0.2 + range * 0.8 });
  }
  thud(e = 1) {
    const g = Math.min(2, 0.4 + e);
    this._shot(this.brown, this.hull, { gain: g, a: 0.002, d: 0.8 + e * 0.5, lp: 220 });
    this._tone(55, this.hull, { gain: 0.6 * Math.min(1, e), d: 0.9, slide: 0.6 });
    this._metal(Math.min(1, 0.3 + e * 0.4), 1 + e);
    if (e > 1) this._shot(this.white, this.cabin, { gain: 0.3, a: 0.001, d: 0.3, hp: 2500, delay: 0.05 }); // loose items rattle
  }
  bang(k = 1) {
    this._shot(this.white, this.hull, { gain: 1.6, a: 0.001, d: 0.25, lp: 3000 });
    this._shot(this.brown, this.hull, { gain: 2.0, a: 0.002, d: 2.5 * k, lp: 150 });
    this._tone(40, this.hull, { gain: 0.9, d: 2 * k, slide: 0.5 });
    this._metal(1.2, 3);
    this._ringLvl = Math.max(this._ringLvl, 0.6 * Math.min(1, k));
  }
  speak(text) {
    if (!this.voice || !('speechSynthesis' in window)) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP'; u.rate = 1.05; u.pitch = 0.9; u.volume = 0.8;
      const vs = speechSynthesis.getVoices().filter((v) => v.lang?.startsWith('ja'));
      if (vs.length) u.voice = vs[0];
      this.play('radio');
      u.onend = () => this.play('radio');
      speechSynthesis.speak(u);
    } catch { /* ignore */ }
  }

  // ------------------------------------------------------------------ per-frame
  update(dt, st) {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const { sub, sys, inc, ap } = st;
    const v = this.v, S = (p, x, tc) => this._set(p, x, tc);
    const mute = this.enabled && !st.dead ? 1 : 0;
    S(this.master.gain, (st.masterGain ?? 0.9) * mute, 0.3);
    // electrical hum follows bus load
    const pw = Math.min(1, sys.totalPower / 40000);
    const cabinOn = sys.powered('CABIN');
    S(v.hum.g.gain, cabinOn ? 0.006 + pw * 0.01 : 0.002); S(v.hum.osc.frequency, 400 + pw * 6);
    S(v.hum2.g.gain, cabinOn ? 0.012 : 0.003);
    const fanOn = sys.scrubber.fan && sys.scrubber.fanOK && sys.powered('LSS');
    S(v.fan.g.gain, fanOn ? 0.05 : 0, 0.4); S(v.fanTone.g.gain, fanOn ? 0.008 : 0, 0.4);
    // thrusters
    const groups = [[sub.thr[0], sub.thr[1]], [sub.thr[2], sub.thr[3]], [sub.thr[4], sub.thr[5]]];
    groups.forEach((g, i) => {
      const r = Math.max(Math.abs(g[0].rpm), Math.abs(g[1].rpm));
      const jam = Math.max(g[0].jam, g[1].jam), deg = g.some((t) => t.fault === 'degraded') ? 1 : 0;
      const T = v.thr[i];
      S(T.whine.osc.frequency, 70 + r * (i === 0 ? 520 : 430) + jam * 30 * Math.sin(sub.time * 30));
      S(T.whine.g.gain, r ** 1.5 * (i === 0 ? 0.05 : 0.035) * (1 - jam * 0.5));
      S(T.gear.osc.frequency, 30 + r * 140);
      S(T.gear.g.gain, r * 0.02 + deg * r * 0.06 + jam * 0.05);
      S(T.wash.g.gain, r ** 2 * 0.25);
    });
    const spd = Math.abs(sub.speed || 0) + Math.abs(sub.vel.y) * 0.8;
    S(v.flow.g.gain, Math.min(0.6, spd * spd * 0.25)); S(v.flow.filt.lp.frequency, 180 + spd * 380);
    const shallow = Math.exp(-sub.depth / 60);
    S(v.ocean.g.gain, 0.08 + shallow * 0.35 + (st.env?.turbidity ? 0.3 : 0), 0.5);
    S(v.slosh.g.gain, sub.depth < 8 ? 0.1 * (0.6 + 0.4 * Math.sin(sub.time * 0.9)) : 0, 0.3);
    // leaks
    let leak = 0; for (const id in sys.pen) leak += sys.pen[id].leakRate;
    S(v.leak.g.gain, Math.min(0.5, leak * 6)); S(v.spray.g.gain, Math.min(0.35, leak * 3));
    // pump / valve
    const pumping = sub.vbtFlow < 0, flooding = sub.vbtFlow > 0;
    S(v.pump.g.gain, pumping ? 0.03 : 0, 0.15); S(v.pumpN.g.gain, pumping ? 0.08 : 0, 0.15);
    S(v.valve.g.gain, flooding ? 0.12 : 0, 0.2);
    S(v.water.g.gain, sub.floodL > 20 ? Math.min(0.4, sub.floodL / 1500) * (0.6 + 0.4 * Math.sin(sub.time * 1.3)) : 0, 0.3);
    S(v.fire.g.gain, sys.fire.active ? 0.1 + sys.fire.intensity * 0.4 : 0, 0.5);
    this._ringLvl = Math.max(this._ringLvl - dt * 0.08, sys.hypoxia * 0.3);
    S(v.ring.g.gain, this._ringLvl * 0.012, 0.3);

    // hull creaks from the systems model
    if (sys.hull.creak > 0.3 && sys.hull.creak > (this._prevCreak || 0) + 0.2) this.creak(Math.min(1.4, sys.hull.creak));
    this._prevCreak = sys.hull.creak;
    // sonar ping
    this._pingT -= dt;
    if (this._pingT <= 0 && ap.oas.on && sys.powered('SONAR') && sys.sensors.sonar) {
      this._pingT = ap.oas.threat > 0.3 ? 0.9 : 3.2;
      this.ping(Math.min(1, ap.oas.dist / ap.oas.range));
    }
    // fire crackle
    if (sys.fire.active) { this._crackleT -= dt; if (this._crackleT <= 0) { this._crackleT = 0.05 + rnd() * 0.25; this._shot(this.white, this.cabin, { gain: 0.2 + sys.fire.intensity * 0.6, a: 0.001, d: 0.02 + rnd() * 0.03, hp: 1200 + rnd() * 2000 }); } }
    // warning klaxon (repeats until acknowledged)
    const lvl = st.alarmLevel || 0;
    if (lvl >= 2 && !this.klaxonMuted) {
      this._klaxonT -= dt;
      if (this._klaxonT <= 0) { this._klaxonT = 1.1; this._tone(620, this.cabin, { type: 'sawtooth', gain: 0.06, a: 0.02, d: 0.42 }); this._tone(470, this.cabin, { type: 'sawtooth', gain: 0.06, a: 0.02, d: 0.42, delay: 0.5 }); }
    }
    if (lvl < 2) this.klaxonMuted = false;
    // pilot physiology: heartbeat & laboured breathing
    const stress = Math.max(sys.pilotStress * 0.6, 1 - sys.pilotHealth, sys.hypercapnia, sys.hypoxia);
    if (stress > 0.35) {
      this._heartT -= dt;
      if (this._heartT <= 0) { this._heartT = 60 / (70 + stress * 70); this._tone(52, this.dry, { gain: 0.25 * stress, a: 0.01, d: 0.12 }); this._tone(48, this.dry, { gain: 0.18 * stress, a: 0.01, d: 0.12, delay: 0.16 }); }
    }
    if (sys.emergencyMask || sys.hypercapnia > 0.3) {
      this._breathT -= dt;
      if (this._breathT <= 0) { this._breathT = 3.2 - sys.hypercapnia * 1.5; this._shot(this.pink, this.dry, { gain: 0.12, a: 0.6, d: 0.9, bp: 900, q: 0.5 }); this._shot(this.pink, this.dry, { gain: 0.08, a: 0.4, d: 1.1, bp: 600, q: 0.5, delay: 1.5 }); }
    }
  }

  suspend() { this.ctx?.suspend(); }
  resume() { this.ctx?.resume(); }
}
