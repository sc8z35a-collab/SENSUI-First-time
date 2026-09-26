// Touch controls for landscape smartphones (multi-touch, pointer events).
//
//  ┌──────────────────────────────────────────────────────────────┐
//  │ [HUD top bar]                                                │
//  │                                                              │
//  │   free-look: drag anywhere in the middle (head turn / lean)  │
//  │                                                              │
//  │ (L stick)  surge / yaw               heave rocker   (R stick)│
//  │                                        ▲▼          sway/pitch│
//  └──────────────────────────────────────────────────────────────┘
// Floating sticks: they appear where the thumb lands inside the left/right third zones.
// Tapping (short press without drag) in the look area raycasts the cockpit so the pilot
// can press physical buttons / breakers / MFDs directly.

const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);

class Stick {
  constructor(root, side) {
    this.side = side;
    this.el = document.createElement('div');
    this.el.className = `stick stick-${side}`;
    this.el.innerHTML = '<div class="stick-ring"></div><div class="stick-knob"></div><div class="stick-lbl"></div>';
    root.appendChild(this.el);
    this.knob = this.el.querySelector('.stick-knob');
    this.lbl = this.el.querySelector('.stick-lbl');
    this.id = null; this.x = 0; this.y = 0; this.ox = 0; this.oy = 0; this.R = 64;
    this.home();
  }
  home() {
    const h = innerHeight, w = innerWidth;
    this.R = Math.round(Math.max(44, Math.min(70, h * 0.15)));
    // clear of the side button columns (~62 px) and the bottom edge / gesture bar
    const inset = 62 + this.R + 14;
    this.hx = this.side === 'l' ? inset : w - inset;
    this.hy = h - this.R - 26;
    if (this.id === null) this._place(this.hx, this.hy);
    this.el.style.setProperty('--R', this.R + 'px');
  }
  _place(x, y) { this.ox = x; this.oy = y; this.el.style.transform = `translate(${x}px, ${y}px)`; }
  down(e) { this.id = e.pointerId; this.moved = false; this._place(e.clientX, e.clientY); this.x = this.y = 0; this._knob(); this.el.classList.add('active'); }
  move(e) {
    let dx = e.clientX - this.ox, dy = e.clientY - this.oy;
    const L = Math.hypot(dx, dy);
    // stick base follows the thumb if dragged far (floating stick)
    if (L > this.R * 1.35) { const k = (L - this.R * 1.35) / L; this._place(this.ox + dx * k, this.oy + dy * k); dx *= 1 - k; dy *= 1 - k; }
    const m = Math.min(1, Math.hypot(dx, dy) / this.R);
    const a = Math.atan2(dy, dx);
    // radial dead-zone + cubic-ish response curve for fine control
    const r = m < 0.08 ? 0 : ((m - 0.08) / 0.92) ** 1.6;
    this.x = Math.cos(a) * r; this.y = -Math.sin(a) * r;
    this._knob(dx, dy);
  }
  up() { this.id = null; this.x = this.y = 0; this._knob(); this.el.classList.remove('active'); this._place(this.hx, this.hy); }
  _knob(dx = 0, dy = 0) { const L = Math.hypot(dx, dy), k = L > this.R ? this.R / L : 1; this.knob.style.transform = `translate(${dx * k}px, ${dy * k}px)`; }
}

export class Controls {
  constructor(root, { onTap, onLook } = {}) {
    this.root = root;
    this.layer = document.createElement('div');
    this.layer.id = 'touch';
    root.appendChild(this.layer);
    this.left = new Stick(this.layer, 'l');
    this.right = new Stick(this.layer, 'r');
    this.left.lbl.textContent = '前後 / 旋回';
    this.right.lbl.textContent = '横移動 / 上下';
    // heave rocker (explicit up/down with hold-to-thrust)
    this.rocker = document.createElement('div');
    this.rocker.className = 'rocker';
    this.rocker.innerHTML = '<button data-h="1" aria-label="上昇">▲<small>UP</small></button><button data-h="-1" aria-label="下降">▼<small>DN</small></button>';
    this.layer.appendChild(this.rocker);
    this._placeRocker();
    this.heaveBtn = 0;
    for (const b of this.rocker.querySelectorAll('button')) {
      const h = +b.dataset.h;
      b.addEventListener('pointerdown', (e) => { e.stopPropagation(); e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch { /* ignore */ } this.heaveBtn = h; b.classList.add('on'); navigator.vibrate?.(8); });
      b.addEventListener('contextmenu', (e) => e.preventDefault());
      const rel = () => { if (this.heaveBtn === h) this.heaveBtn = 0; b.classList.remove('on'); };
      b.addEventListener('pointerup', rel); b.addEventListener('pointercancel', rel); b.addEventListener('lostpointercapture', rel);
    }
    this.look = { yaw: 0, pitch: 0, vy: 0, vp: 0, id: null, lx: 0, ly: 0, t0: 0, moved: 0, sx: 0, sy: 0 };
    this.onTap = onTap; this.onLook = onLook;
    this.precision = false; // fine-control mode halves all demands
    this.lookSens = (() => { try { const v = +localStorage.getItem('ad-look'); return v > 0 ? v : 0.0042; } catch { return 0.0042; } })();
    this.enabled = true;

    const el = this.layer;
    el.addEventListener('pointerdown', (e) => this._down(e), { passive: false });
    el.addEventListener('pointermove', (e) => this._move(e), { passive: false });
    el.addEventListener('pointerup', (e) => this._up(e));
    el.addEventListener('pointercancel', (e) => this._up(e, true));
    el.addEventListener('lostpointercapture', (e) => this._up(e, true));
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    const rehome = () => { this.left.home(); this.right.home(); this._placeRocker(); };
    addEventListener('resize', rehome);
    addEventListener('orientationchange', () => setTimeout(rehome, 250));
    document.addEventListener('fullscreenchange', () => setTimeout(rehome, 100));
    // keyboard for desktop testing only
    this.keys = new Set();
    addEventListener('keydown', (e) => this.keys.add(e.code));
    addEventListener('keyup', (e) => this.keys.delete(e.code));
    addEventListener('blur', () => this.reset());
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.reset(); });
  }
  // release everything (app switch, panel open, game over) so no thruster stays latched
  reset() {
    this.keys.clear(); this.left.up(); this.right.up(); this.look.id = null; this.heaveBtn = 0;
    for (const b of this.rocker.querySelectorAll('button')) b.classList.remove('on');
  }
  _placeRocker() {
    // just inside the right stick, above its home position
    const r = this.right, w = 50;
    const x = Math.max(innerWidth * 0.55, r.hx - r.R - w - 18), y = Math.max(innerHeight * 0.36, r.hy - 50 - 3);
    this.rocker.style.transform = `translate(${Math.round(x)}px, ${Math.round(y - 50)}px)`;
  }

  _zone(x) { const w = innerWidth; return x < w * 0.32 ? 'l' : x > w * 0.68 ? 'r' : 'c'; }
  _cap(e) { try { this.layer.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ } }
  _down(e) {
    if (!this.enabled) return;
    e.preventDefault();
    const z = this._zone(e.clientX);
    const lower = e.clientY > innerHeight * 0.4;
    if (z === 'l' && lower && this.left.id === null) { this.left.down(e); this._cap(e); return; }
    if (z === 'r' && lower && this.right.id === null) { this.right.down(e); this._cap(e); return; }
    if (this.look.id === null) {
      const L = this.look; L.id = e.pointerId; L.lx = L.sx = e.clientX; L.ly = L.sy = e.clientY; L.t0 = performance.now(); L.moved = 0;
      this._cap(e);
    }
  }
  _move(e) {
    if (e.pointerId === this.left.id) return this.left.move(e);
    if (e.pointerId === this.right.id) return this.right.move(e);
    const L = this.look;
    if (e.pointerId === L.id) {
      const dx = e.clientX - L.lx, dy = e.clientY - L.ly;
      L.lx = e.clientX; L.ly = e.clientY;
      L.moved += Math.abs(dx) + Math.abs(dy);
      L.yaw = clamp(L.yaw - dx * this.lookSens, -2.0, 2.0);
      L.pitch = clamp(L.pitch - dy * this.lookSens, -1.1, 1.2);
      this.onLook?.();
    }
  }
  _up(e, cancel = false) {
    if (e.pointerId === this.left.id) return this.left.up();
    if (e.pointerId === this.right.id) return this.right.up();
    const L = this.look;
    if (e.pointerId === L.id) {
      L.id = null;
      if (!cancel && L.moved < 14 && performance.now() - L.t0 < 400) this.onTap?.(e.clientX, e.clientY);
    }
  }
  recenter() { this.look.yaw = 0; this.look.pitch = 0; }

  // normalised pilot demand
  read() {
    const k = this.keys;
    const kb = (a, b) => (k.has(a) ? 1 : 0) - (k.has(b) ? 1 : 0);
    const p = this.precision ? 0.4 : 1;
    const surge = clamp(this.left.y + kb('KeyW', 'KeyS'), -1, 1) * p;
    const yaw = clamp(this.left.x + kb('KeyD', 'KeyA'), -1, 1) * p;
    const sway = clamp(this.right.x + kb('KeyE', 'KeyQ'), -1, 1) * p;
    const heave = clamp(this.right.y + this.heaveBtn + kb('KeyR', 'KeyF'), -1, 1) * (this.heaveBtn && !this.right.y ? 1 : p);
    return { surge, yaw, sway, heave };
  }
  get active() { return this.left.id !== null || this.right.id !== null || this.heaveBtn !== 0 || this.keys.size > 0; }
}
