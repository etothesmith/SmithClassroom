/* ============================================================================
   Smith's Classroom Arcade — shared core (City Squirrel architecture)

   Each game is one self-contained HTML file built by arcade/build.py:
     ASSETS (atlas + backgrounds, base64)  ->  core.js  ->  <game>.js
   The core gives every game the same pieces City Squirrel uses:
     fixed 60 Hz update with a render-once accumulator, Input (keyboard,
     gamepad, touch, pointer), Audio2 (synthesized SFX + tiny music
     sequencer), drawFrame on a packed atlas, Store, a small UI kit,
     Screens (title / how-to / pause / results) and Touch buttons.
   On top of that, the classroom pieces: questions from the student's own
   courses (missed ones come back), the student's avatar head on the player,
   and rewards paid through WorldLink with a daily cap.
   ========================================================================== */
'use strict';
const W = 1280, H = 720, DT = 1 / 60;

/* ---------------- math ---------------- */
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(rand(a, b + 1));
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const dist = (ax, ay, bx, by) => Math.hypot(bx - ax, by - ay);
const approach = (v, t, d) => v < t ? Math.min(t, v + d) : Math.max(t, v - d);
const angDiff = (a, b) => { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };
const ease = t => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
const easeBack = t => { t = clamp(t, 0, 1); const s = 1.70158; return 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2); };

/* ---------------- storage ---------------- */
const Store = {
  pfx: 'arc.',
  get(k, d) { try { const v = localStorage.getItem(this.pfx + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(this.pfx + k, JSON.stringify(v)); } catch (e) {} },
  raw(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
};
const today = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };

/* ---------------- language ---------------- */
const Lang = {
  code: 'en',
  init() { const s = Store.raw('smiths.save'); this.code = (s && s.lang === 'es') ? 'es' : 'en'; },
  t(en, es) { return this.code === 'es' && es ? es : en; },
  of(o) { return o ? (this.code === 'es' && o.es ? o.es : o.en || '') : ''; }
};

/* ---------------- input ---------------- */
const Input = {
  binds: {
    left: ['ArrowLeft', 'KeyA'], right: ['ArrowRight', 'KeyD'], up: ['ArrowUp', 'KeyW'], down: ['ArrowDown', 'KeyS'],
    jump: ['Space', 'KeyZ'], action: ['Space', 'ShiftLeft', 'ShiftRight', 'KeyX'], ok: ['Enter', 'Space', 'NumpadEnter'],
    back: ['Escape', 'Backspace'], pause: ['Escape', 'KeyP'], mute: ['KeyM'],
    a1: ['Digit1', 'Numpad1'], a2: ['Digit2', 'Numpad2'], a3: ['Digit3', 'Numpad3'], a4: ['Digit4', 'Numpad4']
  },
  keys: {}, prev: {}, virt: {}, pad: {},
  pointer: { x: 0, y: 0, down: false, pressed: false, released: false, moved: false, id: null },
  buffer: {},
  usingTouch: false,
  init(canvas) {
    addEventListener('keydown', e => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace'].includes(e.code)) e.preventDefault();
      this.keys[e.code] = true; this.usingTouch = false; Audio2.unlock();
    });
    addEventListener('keyup', e => { this.keys[e.code] = false; });
    addEventListener('blur', () => { this.keys = {}; this.virt = {}; });
    const toGame = e => { const r = canvas.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; };
    canvas.addEventListener('pointerdown', e => {
      e.preventDefault(); Audio2.unlock();
      if (e.pointerType === 'touch') this.usingTouch = true;
      const [x, y] = toGame(e);
      if (Touch.down(e.pointerId, x, y)) return;
      const p = this.pointer; p.x = x; p.y = y; p.down = true; p.pressed = true; p.id = e.pointerId; p.sx = x; p.sy = y; p.t0 = performance.now();
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    });
    canvas.addEventListener('pointermove', e => {
      const [x, y] = toGame(e);
      if (Touch.move(e.pointerId, x, y)) return;
      const p = this.pointer; p.x = x; p.y = y; p.moved = true;
    });
    const up = e => {
      const [x, y] = toGame(e);
      if (Touch.up(e.pointerId)) return;
      const p = this.pointer; if (p.id !== e.pointerId) return; p.x = x; p.y = y; p.down = false; p.released = true; p.id = null;
    };
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('contextmenu', e => e.preventDefault());
  },
  pollPad() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : []; const p = pads && [...pads].find(Boolean);
    const v = {};
    if (p) {
      const ax = p.axes[0] || 0, ay = p.axes[1] || 0, b = i => p.buttons[i] && p.buttons[i].pressed;
      v.left = ax < -0.4 || b(14); v.right = ax > 0.4 || b(15); v.up = ay < -0.4 || b(12); v.down = ay > 0.4 || b(13);
      v.jump = b(0); v.ok = b(0); v.action = b(2) || b(1) || b(7); v.back = b(1); v.pause = b(9);
      v.a1 = b(2); v.a2 = b(3); v.a3 = b(1);
      this.stick = { x: Math.abs(ax) > 0.2 ? ax : 0, y: Math.abs(ay) > 0.2 ? ay : 0 };
    } else this.stick = null;
    this.pad = v;
  },
  held(a) { return !!(this.pad[a] || this.virt[a] || (this.binds[a] || []).some(k => this.keys[k])); },
  pressed(a) { return this.held(a) && !this.prev[a]; },
  released(a) { return !this.held(a) && this.prev[a]; },
  /* a press that happened up to `win` seconds ago still counts (jump buffering) */
  buffered(a, win) { const t = this.buffer[a]; if (t != null && t <= win) { this.buffer[a] = null; return true; } return false; },
  tick() {
    this.pollPad();
    for (const a in this.binds) { if (this.held(a) && !this.prev[a]) this.buffer[a] = 0; else if (this.buffer[a] != null) this.buffer[a] += DT; }
  },
  endFrame() {
    for (const a in this.binds) this.prev[a] = this.held(a);
    for (const a in this.virt) this.prev[a] = this.prev[a] || this.virt[a];
    const p = this.pointer; p.pressed = false; p.released = false; p.moved = false;
    Touch.endFrame();
  },
  /* the pointer was tapped (pressed and released) inside a rect this frame */
  tapped(r) { const p = this.pointer; return p.released && inRect(p.x, p.y, r) && inRect(p.sx, p.sy, r); }
};
const inRect = (x, y, r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;

/* ---------------- touch buttons (City Squirrel style: virtual held keys) ---------------- */
const Touch = {
  btns: [], owners: {}, stick: null, stickOwner: null,
  /* buttons: [{id, x, y, r, label, act}], stick: {x, y, r} (left-thumb joystick) */
  set(btns, stick) { this.btns = btns || []; this.stick = stick || null; this.owners = {}; this.stickOwner = null; Input.virt = {}; },
  find(x, y) { return this.btns.find(b => Math.hypot(x - b.x, y - b.y) <= b.r * 1.15); },
  down(id, x, y) {
    if (!Input.usingTouch) return false;
    const b = this.find(x, y);
    if (b) { this.owners[id] = b; Input.virt[b.act] = true; return true; }
    if (this.stick && x < W * 0.45 && y > H * 0.3) { this.stickOwner = id; this.stick.ox = x; this.stick.oy = y; this.stick.dx = 0; this.stick.dy = 0; return true; }
    return false;
  },
  move(id, x, y) {
    if (this.stickOwner === id) { const s = this.stick, dx = x - s.ox, dy = y - s.oy, m = Math.hypot(dx, dy), R = s.r;
      s.dx = m > R ? dx / m : dx / R; s.dy = m > R ? dy / m : dy / R; return true; }
    return !!this.owners[id];
  },
  up(id) {
    if (this.stickOwner === id) { this.stickOwner = null; this.stick.dx = this.stick.dy = 0; return true; }
    const b = this.owners[id]; if (!b) return false; delete this.owners[id];
    if (!Object.values(this.owners).some(o => o.act === b.act)) Input.virt[b.act] = false; return true;
  },
  endFrame() {},
  vec() { const s = this.stick; return s && this.stickOwner != null ? { x: s.dx, y: s.dy } : null; },
  draw(c) {
    if (!Input.usingTouch) return;
    c.save();
    for (const b of this.btns) {
      const on = Input.virt[b.act];
      c.globalAlpha = on ? 0.85 : 0.55; c.fillStyle = on ? '#FFD23F' : '#ffffff';
      c.beginPath(); c.arc(b.x, b.y, b.r, 0, 7); c.fill(); c.lineWidth = 5; c.strokeStyle = '#2B2D42'; c.stroke();
      c.globalAlpha = 1; UI.text(c, b.label, b.x, b.y + 2, { size: Math.min(b.r * 0.55, b.r * 2.9 / Math.max(3, b.label.length)), color: '#2B2D42', stroke: 0 });
    }
    const s = this.stick;
    if (s) {
      const ox = this.stickOwner != null ? s.ox : s.x, oy = this.stickOwner != null ? s.oy : s.y;
      c.globalAlpha = 0.35; c.fillStyle = '#fff'; c.beginPath(); c.arc(ox, oy, s.r, 0, 7); c.fill();
      c.globalAlpha = 0.8; c.fillStyle = '#FFD23F'; c.beginPath(); c.arc(ox + (s.dx || 0) * s.r, oy + (s.dy || 0) * s.r, s.r * 0.42, 0, 7); c.fill();
      c.lineWidth = 4; c.strokeStyle = '#2B2D42'; c.stroke();
    }
    c.restore();
  }
};

/* ---------------- audio: synthesized SFX + a tiny sequencer ---------------- */
const Audio2 = {
  ctx: null, master: null, muted: false, musicOn: true, song: null, step: 0, nextT: 0,
  init() { this.muted = !!Store.get('muted', false); },
  unlock() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      this.ctx = new AC(); this.master = this.ctx.createGain(); this.master.gain.value = this.muted ? 0 : 0.5; this.master.connect(this.ctx.destination);
      const len = this.ctx.sampleRate * 0.5, buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; this.noise = buf;
    } catch (e) { this.ctx = null; }
  },
  toggleMute() { this.muted = !this.muted; Store.set('muted', this.muted); if (this.master) this.master.gain.value = this.muted ? 0 : 0.5; },
  tone(f0, f1, dur, type, vol, when) {
    const c = this.ctx; if (!c || this.muted) return; const t = when || c.currentTime;
    const o = c.createOscillator(), g = c.createGain(); o.type = type || 'square';
    o.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(vol || 0.2, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + dur + 0.02);
  },
  hiss(dur, vol, hp, when) {
    const c = this.ctx; if (!c || this.muted || !this.noise) return; const t = when || c.currentTime;
    const s = c.createBufferSource(), g = c.createGain(), f = c.createBiquadFilter(); s.buffer = this.noise;
    f.type = 'highpass'; f.frequency.value = hp || 1200; g.gain.setValueAtTime(vol || 0.2, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + dur + 0.02);
  },
  sfx(name) {
    if (!this.ctx || this.muted) return; const t = this.ctx.currentTime;
    switch (name) {
      case 'jump': this.tone(330, 660, 0.14, 'square', 0.12); break;
      case 'land': this.hiss(0.06, 0.08, 800); break;
      case 'coin': this.tone(988, 988, 0.06, 'square', 0.1); this.tone(1319, 1319, 0.12, 'square', 0.1, t + 0.06); break;
      case 'lane': this.tone(520, 700, 0.06, 'triangle', 0.1); break;
      case 'hit': this.tone(180, 60, 0.25, 'sawtooth', 0.18); this.hiss(0.15, 0.12, 400); break;
      case 'good': [523, 659, 784, 1047].forEach((f, i) => this.tone(f, f, 0.12, 'square', 0.11, t + i * 0.07)); break;
      case 'bad': this.tone(300, 150, 0.22, 'square', 0.14); this.tone(220, 110, 0.3, 'square', 0.12, t + 0.15); break;
      case 'boost': this.tone(220, 1200, 0.35, 'sawtooth', 0.1); break;
      case 'click': this.tone(700, 700, 0.04, 'square', 0.07); break;
      case 'select': this.tone(880, 1175, 0.08, 'triangle', 0.12); break;
      case 'pickup': this.tone(660, 1320, 0.1, 'triangle', 0.1); break;
      case 'orb': this.tone(1200 + Math.random() * 300, 1600, 0.05, 'sine', 0.06); break;
      case 'level': [392, 523, 659, 784, 1047].forEach((f, i) => this.tone(f, f, 0.16, 'triangle', 0.13, t + i * 0.08)); break;
      case 'shoot': this.tone(900, 400, 0.06, 'triangle', 0.05); break;
      case 'pop': this.tone(400, 90, 0.1, 'square', 0.08); break;
      case 'boss': [110, 104, 98, 92].forEach((f, i) => this.tone(f, f * 0.98, 0.35, 'sawtooth', 0.14, t + i * 0.3)); break;
      case 'slam': this.hiss(0.25, 0.25, 200); this.tone(120, 50, 0.3, 'square', 0.15); break;
      case 'horn': this.tone(392, 392, 0.18, 'square', 0.1); this.tone(330, 330, 0.18, 'square', 0.1, t + 0.05); break;
      case 'skid': this.hiss(0.18, 0.06, 2500); break;
      case 'win': [523, 659, 784, 659, 784, 1047].forEach((f, i) => this.tone(f, f, 0.2, 'square', 0.12, t + i * 0.12)); break;
      case 'lose': [392, 349, 311, 262].forEach((f, i) => this.tone(f, f, 0.28, 'triangle', 0.14, t + i * 0.2)); break;
      case 'tick': this.tone(1500, 1500, 0.03, 'square', 0.06); break;
    }
  },
  /* songs: {bpm, bass:[midi|0], lead:[midi|0], drum:'k.h.s.h.'} — 16 steps each */
  play(song) { this.song = song; this.step = 0; this.nextT = 0; },
  stop() { this.song = null; },
  tick() {
    const c = this.ctx, s = this.song; if (!c || !s || this.muted || !this.musicOn) return;
    if (this.nextT < c.currentTime) this.nextT = c.currentTime + 0.05;
    const spb = 60 / s.bpm / 4, mf = n => 440 * Math.pow(2, (n - 69) / 12);
    while (this.nextT < c.currentTime + 0.12) {
      const i = this.step % s.bass.length, t = this.nextT;
      const b = s.bass[i]; if (b) this.tone(mf(b), mf(b), spb * 1.6, 'triangle', 0.09, t);
      const l = s.lead[this.step % s.lead.length]; if (l) this.tone(mf(l), mf(l), spb * 0.9, 'square', 0.035, t);
      const d = s.drum[this.step % s.drum.length];
      if (d === 'k') this.tone(140, 45, 0.12, 'sine', 0.22, t); else if (d === 's') this.hiss(0.09, 0.08, 1500, t); else if (d === 'h') this.hiss(0.03, 0.03, 6000, t);
      this.step++; this.nextT += spb;
    }
  }
};

/* ---------------- assets ---------------- */
const Art = { atlas: null, meta: {}, heads: {}, img: {}, ready: false };
function loadAssets(onProgress) {
  const jobs = [['atlas', ASSETS.atlas]].concat(Object.entries(ASSETS.img || {}));
  let done = 0;
  Art.meta = ASSETS.meta; Art.heads = (ASSETS.meta && ASSETS.meta._head) || {};
  return Promise.all(jobs.map(([k, src]) => new Promise(res => {
    const im = new Image();
    im.onload = im.onerror = () => { done++; onProgress && onProgress(done / jobs.length); if (k === 'atlas') Art.atlas = im; else Art.img[k] = im; res(); };
    im.src = src;
  }))).then(() => { Art.ready = true; });
}
/* hit-flash silhouettes: made once per (frame, colour) and cached, so a
   screen full of flashing monsters costs two plain drawImage calls each */
const Tints = new Map();
function tinted(name, color) {
  const key = name + '|' + color; let k = Tints.get(key); if (k) return k;
  const f = Art.meta[name]; k = document.createElement('canvas'); k.width = f[2]; k.height = f[3];
  const x = k.getContext('2d'); x.drawImage(Art.atlas, f[0], f[1], f[2], f[3], 0, 0, f[2], f[3]);
  x.globalCompositeOperation = 'source-in'; x.fillStyle = color; x.fillRect(0, 0, f[2], f[3]);
  Tints.set(key, k); return k;
}
/* a soft ground shadow, drawn once and blitted (cheaper than a path fill per sprite) */
let _shadow = null;
function drawShadow(c, x, y, rx, ry, alpha) {
  if (!_shadow) { _shadow = document.createElement('canvas'); _shadow.width = 64; _shadow.height = 20; const x2 = _shadow.getContext('2d');
    x2.fillStyle = 'rgba(30,25,40,1)'; x2.beginPath(); x2.ellipse(32, 10, 31, 9, 0, 0, 7); x2.fill(); }
  const a = c.globalAlpha; c.globalAlpha = a * (alpha == null ? 0.24 : alpha); c.drawImage(_shadow, x - rx, y - ry, rx * 2, ry * 2); c.globalAlpha = a;
}
/* pre-scaled copies of busy sprites (monsters, coins, bulbs): on machines that
   rasterize in software a 1:1 blit is much cheaper than a scaled draw */
const Scaled = new Map();
function scaledFrame(name, w, h) {
  const k = name + '|' + w + 'x' + h; let cv = Scaled.get(k); if (cv) return cv;
  if (Scaled.size > 400) Scaled.clear();
  const f = Art.meta[name]; cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const x = cv.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(Art.atlas, f[0], f[1], f[2], f[3], 0, 0, w, h);
  Scaled.set(k, cv); return cv;
}
/* drawFrame: anchored bottom-centre by default. o: {h | s, dir, rot, alpha, flash, flashColor, ax, ay, cache} */
function drawFrame(c, name, x, y, o) {
  const f = Art.meta[name]; if (!f || !Art.atlas) return null;
  o = o || {};
  const s = o.h ? o.h / f[3] : (o.w ? o.w / f[2] : (o.s || 1)), w = f[2] * s, h = f[3] * s;
  const ax = o.ax == null ? 0.5 : o.ax, ay = o.ay == null ? 1 : o.ay;
  c.save(); c.translate(x, y);
  if (o.rot) c.rotate(o.rot);
  if (o.dir === -1) c.scale(-1, 1);
  if (o.alpha != null) c.globalAlpha *= o.alpha;
  if (o.cache && !o.rot) {
    const g = Game.scale || 1, pw = Math.max(1, Math.round(w * g)), ph = Math.max(1, Math.round(h * g));
    c.drawImage(scaledFrame(name, pw, ph), -w * ax, -h * ay, w, h);
  } else c.drawImage(Art.atlas, f[0], f[1], f[2], f[3], -w * ax, -h * ay, w, h);
  if (o.flash) { c.globalAlpha *= Math.min(1, o.flash); c.drawImage(tinted(name, o.flashColor || '#fff'), -w * ax, -h * ay, w, h); }
  c.restore();
  return { w, h, s };
}
const frameSize = name => { const f = Art.meta[name]; return f ? { w: f[2], h: f[3] } : { w: 1, h: 1 }; };

/* ---------------- the student's own head on the player ---------------- */
const Head = {
  img: null, faceW: 0.5, cy: 0.536, chin: 0.87, skin: '#E0AC80',
  init() {
    let me = {}; try { me = (window.WorldLink && WorldLink.me()) || {}; } catch (e) {}
    this.name = me.name || '';
    const src = me.avatar && me.avatar.head; if (!src) return;
    const im = new Image();
    im.onload = () => {
      /* the crop is 1.75x the head height; measure the face (skin) width on the
         row through the middle of the face so the face fills the gray ball */
      try {
        const N = 200, k = document.createElement('canvas'); k.width = k.height = N; const x = k.getContext('2d'); x.drawImage(im, 0, 0, N, N);
        const y = Math.round(N * 0.58), row = x.getImageData(0, y, N, 1).data, mid = N / 2;
        const px = i => [row[i * 4], row[i * 4 + 1], row[i * 4 + 2], row[i * 4 + 3]];
        const sk = px(mid); this.skin = 'rgb(' + sk[0] + ',' + sk[1] + ',' + sk[2] + ')';
        const same = i => { const q = px(i); return q[3] > 200 && Math.abs(q[0] - sk[0]) + Math.abs(q[1] - sk[1]) + Math.abs(q[2] - sk[2]) < 90; };
        let l = mid, r = mid; while (l > 0 && same(l - 1)) l--; while (r < N - 1 && same(r + 1)) r++;
        const w = (r - l + 1) / N; if (w > 0.25 && w < 0.75) this.faceW = w; else this.faceW = 0.49;
      } catch (e) {}
      this.img = im;
    };
    im.src = src;
  },
  /* draw over the gray ball of frame `name` drawn at (x, y) with scale s */
  draw(c, name, x, y, s, dir, alpha) {
    const hb = Art.heads[name], f = Art.meta[name]; if (!hb || !f) return;
    const w = f[2] * s, h = f[3] * s, d = dir === -1 ? -1 : 1;
    const cx = x + (hb[0] - 0.5) * w * d, cy = y - h + hb[1] * h, r = hb[2] * h;
    c.save(); if (alpha != null) c.globalAlpha *= alpha;
    if (this.img) {
      const S = (2 * r * 0.96) / this.faceW;
      c.translate(cx, cy); if (d < 0) c.scale(-1, 1);
      /* hide the gray ball, then the head, cut off under the chin (no shirt collar) */
      c.fillStyle = this.skin; c.beginPath(); c.arc(0, 0, r * 0.97, 0, 7); c.fill();
      c.beginPath(); c.rect(-S, -S, 2 * S, S * (this.chin - this.cy) + S); c.clip();
      c.drawImage(this.img, -S / 2, -S * this.cy, S, S);
    } else {
      /* no avatar yet: a friendly face on the ball */
      c.translate(cx, cy); if (d < 0) c.scale(-1, 1);
      c.fillStyle = '#F2C8A0'; c.beginPath(); c.arc(0, 0, r * 1.04, 0, 7); c.fill(); c.lineWidth = Math.max(2, r * 0.1); c.strokeStyle = '#2B2D42'; c.stroke();
      c.fillStyle = '#4A2C1A'; c.beginPath(); c.arc(0, 0, r * 1.06, Math.PI * 1.02, Math.PI * 1.98); c.quadraticCurveTo(0, -r * 0.55, -r * 1.05, -r * 0.15); c.fill(); c.stroke();
      c.fillStyle = '#2B2D42'; c.beginPath(); c.arc(r * 0.22, -r * 0.05, r * 0.11, 0, 7); c.arc(r * 0.58, -r * 0.05, r * 0.11, 0, 7); c.fill();
      c.beginPath(); c.lineWidth = Math.max(2, r * 0.08); c.arc(r * 0.38, r * 0.2, r * 0.25, 0.2, Math.PI - 0.2); c.stroke();
    }
    c.restore();
  }
};

/* ---------------- questions from the student's own classes ---------------- */
const FALLBACK_QS = [
  { id: 'fb1', type: 'mcq', q: { en: 'What is opportunity cost?', es: '¿Qué es el costo de oportunidad?' }, c: { en: ['The value of the next-best option given up', 'The price you pay in money', 'A cost the government sets'], es: ['El valor de la mejor alternativa sacrificada', 'El precio que pagas en dinero', 'Un costo que fija el gobierno'] }, a: 0, why: { en: 'Every choice gives up the next-best alternative.', es: 'Toda elección sacrifica la mejor alternativa.' } },
  { id: 'fb2', type: 'mcq', q: { en: 'How many branches does the U.S. government have?', es: '¿Cuántas ramas tiene el gobierno de EE. UU.?' }, c: { en: ['Three', 'Two', 'Five'], es: ['Tres', 'Dos', 'Cinco'] }, a: 0, why: { en: 'Legislative, executive and judicial.', es: 'Legislativa, ejecutiva y judicial.' } },
  { id: 'fb3', type: 'mcq', q: { en: 'Inflation is…', es: 'La inflación es…' }, c: { en: ['A rise in the overall price level', 'A fall in unemployment', 'A rise in one product\'s price'], es: ['Un aumento del nivel general de precios', 'Una baja del desempleo', 'Un aumento del precio de un producto'] }, a: 0, why: { en: 'Inflation is a general rise in prices across the economy.', es: 'La inflación es un aumento general de los precios.' } },
  { id: 'fb4', type: 'mcq', q: { en: 'Who can veto a bill passed by Congress?', es: '¿Quién puede vetar un proyecto aprobado por el Congreso?' }, c: { en: ['The President', 'The Supreme Court', 'The Speaker of the House'], es: ['El Presidente', 'La Corte Suprema', 'El Presidente de la Cámara'] }, a: 0, why: { en: 'The President signs or vetoes bills.', es: 'El Presidente firma o veta los proyectos.' } },
  { id: 'fb5', type: 'mcq', q: { en: 'When demand rises and supply stays the same, price…', es: 'Si la demanda sube y la oferta no cambia, el precio…' }, c: { en: ['Rises', 'Falls', 'Stays the same'], es: ['Sube', 'Baja', 'No cambia'] }, a: 0, why: { en: 'More buyers chasing the same supply pushes price up.', es: 'Más compradores por la misma oferta suben el precio.' } }
];
const Q = {
  pool: [], courses: [], econ: true, gov: false, recent: [], asked: 0, right: 0, log: [],
  init() {
    const save = Store.raw('smiths.save') || {};
    const packs = typeof PACKS !== 'undefined' ? PACKS : [];
    const ids = packs.map(p => p.id), mine = (save.myCourses || []).filter(id => ids.includes(id));
    this.courses = mine.length ? mine : ids;
    this.pool = [];
    packs.forEach(p => { if (!this.courses.includes(p.id)) return;
      p.units.forEach(u => u.items.forEach(it => {
        if (it.type === 'mcq' && it.c && it.c.en && it.c.en.length >= 3 && it.a != null && it.q)
          this.pool.push({ it, unit: u.title, course: p.id });
      })); });
    if (!this.pool.length) this.pool = FALLBACK_QS.map(it => ({ it, unit: { en: 'Practice', es: 'Práctica' }, course: 'practice' }));
    this.econ = this.courses.some(id => /econ/.test(id)); this.gov = this.courses.some(id => /gov/.test(id));
    if (!this.econ && !this.gov) this.econ = true;
    this.missed = Store.get('missed', []);
    this.asked = 0; this.right = 0; this.log = [];
  },
  /* returns {id, q, choices, a, why, unit} with n choices (correct + n-1 distractors) */
  next(n) {
    n = n || 3;
    let entry = null;
    const missedHere = this.missed.map(id => this.pool.find(p => p.it.id === id)).filter(e => e && !this.recent.includes(e.it.id));
    if (missedHere.length && Math.random() < 0.35) entry = pick(missedHere);
    if (!entry) { const fresh = this.pool.filter(p => !this.recent.includes(p.it.id)); entry = pick(fresh.length ? fresh : this.pool); }
    this.recent.push(entry.it.id); if (this.recent.length > Math.min(40, this.pool.length - 1)) this.recent.shift();
    const it = entry.it, opts = (Lang.code === 'es' && it.c.es && it.c.es.length === it.c.en.length) ? it.c.es : it.c.en;
    const wrong = shuffle(opts.map((t, i) => i).filter(i => i !== it.a)).slice(0, n - 1);
    const order = shuffle([it.a].concat(wrong));
    return { id: it.id, q: Lang.of(it.q), choices: order.map(i => opts[i]), a: order.indexOf(it.a), why: Lang.of(it.why), unit: Lang.of(entry.unit) };
  },
  mark(q, ok) {
    this.asked++; if (ok) this.right++;
    this.log.push({ id: q.id, ok });
    const i = this.missed.indexOf(q.id);
    if (!ok && i < 0) this.missed.push(q.id);
    if (ok && i >= 0) this.missed.splice(i, 1);
    this.missed = this.missed.slice(-60); Store.set('missed', this.missed);
  }
};

/* ---------------- rewards through WorldLink ---------------- */
const Reward = {
  DAILY_CAP: 15, RUN_CAP: 5,
  left() { const d = Store.get('daily', null); return d && d.d === today() ? Math.max(0, this.DAILY_CAP - d.coins) : this.DAILY_CAP; },
  give(game, coins, xp, label) {
    coins = Math.max(0, Math.min(this.RUN_CAP, coins | 0, this.left()));
    xp = Math.max(0, Math.min(120, xp | 0));
    const d = Store.get('daily', null), cur = d && d.d === today() ? d : { d: today(), coins: 0 };
    cur.coins += coins; Store.set('daily', cur);
    try { if (window.WorldLink && (coins || xp)) WorldLink.award('arc_' + game + '_' + Date.now().toString(36), coins, xp, label); } catch (e) {}
    return { coins, xp };
  },
  badge(id) { try { window.WorldLink && WorldLink.badge(id); } catch (e) {} }
};

/* ---------------- UI kit ---------------- */
const FONT = '"Baloo 2", "Arial Rounded MT Bold", "Trebuchet MS", sans-serif';
const BODY = 'Nunito, "Segoe UI", Arial, sans-serif';
const COL = { ink: '#2B2D42', cream: '#FFF8E7', red: '#C8102E', gold: '#FFD23F', green: '#2EC4B6', good: '#3BB273', bad: '#E4572E', blue: '#3A86FF', purple: '#7B2CBF' };
const UI = {
  text(c, str, x, y, o) {
    o = o || {}; const size = o.size || 32;
    c.font = (o.weight || 800) + ' ' + Math.round(size) + 'px ' + (o.font || FONT);
    c.textAlign = o.align || 'center'; c.textBaseline = o.base || 'middle';
    if (o.stroke !== 0) { c.lineJoin = 'round'; c.lineWidth = o.stroke || Math.max(3, size * 0.16); c.strokeStyle = o.strokeColor || COL.ink; c.strokeText(str, x, y); }
    c.fillStyle = o.color || '#fff'; c.fillText(str, x, y);
  },
  wrap(c, str, maxW) {
    const words = String(str).split(/\s+/), lines = []; let line = '';
    for (const w of words) { const t = line ? line + ' ' + w : w; if (c.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; }
    if (line) lines.push(line); return lines;
  },
  /* wrap text inside a box, shrinking the font until it fits */
  para(c, str, x, y, w, h, o) {
    o = o || {}; let size = o.size || 30; let lines;
    for (; size >= (o.min || 14); size -= 1) {
      c.font = (o.weight || 700) + ' ' + size + 'px ' + (o.font || BODY); lines = this.wrap(c, str, w);
      if (lines.length * size * 1.18 <= h) break;
    }
    const lh = size * 1.18, total = lines.length * lh;
    let yy = o.valign === 'top' ? y : y + (h - total) / 2;
    c.fillStyle = o.color || COL.ink; c.textAlign = o.align || 'center'; c.textBaseline = 'top';
    const xx = o.align === 'left' ? x : x + w / 2;
    for (const l of lines) { c.fillText(l, xx, yy + size * 0.06); yy += lh; }
    return size;
  },
  rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); },
  panel(c, x, y, w, h, o) {
    o = o || {}; const r = o.r == null ? 22 : o.r;
    c.save();
    c.fillStyle = o.shadow || 'rgba(43,45,66,.9)'; this.rr(c, x, y + (o.drop == null ? 7 : o.drop), w, h, r); c.fill();
    c.fillStyle = o.fill || COL.cream; this.rr(c, x, y, w, h, r); c.fill();
    c.lineWidth = o.lw || 5; c.strokeStyle = o.line || COL.ink; c.stroke();
    c.restore();
  },
  button(c, r, label, o) {
    o = o || {}; const hot = o.focus || (Input.pointer.down && inRect(Input.pointer.x, Input.pointer.y, r));
    const press = hot && Input.pointer.down ? 4 : 0;
    c.save(); c.translate(0, press);
    this.panel(c, r.x, r.y, r.w, r.h, { fill: o.fill || (o.focus ? COL.gold : '#fff'), r: o.radius || 18, drop: 7 - press });
    if (o.icon) drawFrame(c, o.icon, r.x + 40, r.y + r.h / 2, { h: r.h * 0.7, ay: 0.5 });
    this.text(c, label, r.x + r.w / 2 + (o.icon ? 22 : 0), r.y + r.h / 2 + 2, { size: o.size || Math.min(34, r.h * 0.5), color: o.color || COL.ink, stroke: 0 });
    c.restore();
  },
  bar(c, x, y, w, h, t, col, o) {
    o = o || {};
    c.save(); c.fillStyle = 'rgba(43,45,66,.85)'; this.rr(c, x, y, w, h, h / 2); c.fill();
    if (t > 0) { c.fillStyle = col; this.rr(c, x + 3, y + 3, Math.max(h - 6, (w - 6) * clamp(t, 0, 1)), h - 6, (h - 6) / 2); c.fill(); }
    c.lineWidth = 3; c.strokeStyle = COL.ink; this.rr(c, x, y, w, h, h / 2); c.stroke(); c.restore();
  }
};

/* A vertical menu that works with keys, gamepad and taps. items: [{label, act, icon}] */
class Menu {
  constructor(items, o) { this.items = items; this.sel = 0; o = o || {}; this.x = o.x || W / 2 - 200; this.y = o.y || 360; this.w = o.w || 400; this.h = o.h || 74; this.gap = o.gap || 20; }
  rect(i) { return { x: this.x, y: this.y + i * (this.h + this.gap), w: this.w, h: this.h }; }
  update() {
    if (Input.pressed('down')) { this.sel = (this.sel + 1) % this.items.length; Audio2.sfx('click'); }
    if (Input.pressed('up')) { this.sel = (this.sel + this.items.length - 1) % this.items.length; Audio2.sfx('click'); }
    for (let i = 0; i < this.items.length; i++) if (Input.tapped(this.rect(i))) { this.sel = i; Audio2.sfx('select'); return this.items[i].act; }
    if (Input.pressed('ok')) { Audio2.sfx('select'); return this.items[this.sel].act; }
    return null;
  }
  draw(c) { this.items.forEach((it, i) => UI.button(c, this.rect(i), typeof it.label === 'function' ? it.label() : it.label, { focus: i === this.sel && !Input.usingTouch, icon: it.icon })); }
}

/* ---------------- question card (shared by every game) ---------------- */
/* opts: {title, onDone(ok, picked), timer (s, optional), letters, colors} */
class QuestionCard {
  constructor(q, o) { this.q = q; this.o = o || {}; this.sel = 0; this.picked = -1; this.t = 0; this.doneT = 0; this.timer = this.o.timer || 0; }
  rects() {
    const n = this.q.choices.length, top = 330, h = n > 3 ? 72 : 86, gap = 14;
    return this.q.choices.map((_, i) => ({ x: 170, y: top + i * (h + gap), w: 940, h }));
  }
  choose(i) {
    if (this.picked >= 0) return; this.picked = i; const ok = i === this.q.a;
    Q.mark(this.q, ok); Audio2.sfx(ok ? 'good' : 'bad'); this.ok = ok; this.doneT = 0;
    if (this.o.onPick) this.o.onPick(ok);
  }
  update() {
    this.t += DT;
    const n = this.q.choices.length;
    if (this.picked < 0) {
      if (this.timer) { this.timer -= DT; if (this.timer <= 0) { this.choose(-1); return; } }
      if (Input.pressed('down')) { this.sel = (this.sel + 1) % n; Audio2.sfx('click'); }
      if (Input.pressed('up')) { this.sel = (this.sel + n - 1) % n; Audio2.sfx('click'); }
      ['a1', 'a2', 'a3', 'a4'].forEach((a, i) => { if (i < n && Input.pressed(a)) this.choose(i); });
      this.rects().forEach((r, i) => { if (Input.tapped(r)) this.choose(i); });
      if (this.t > 0.35 && Input.pressed('ok') && this.picked < 0) this.choose(this.sel);
    } else {
      this.doneT += DT;
      const minT = this.ok ? 0.9 : 1.6;
      if (this.doneT > minT && (Input.pressed('ok') || Input.pointer.released || this.doneT > (this.ok ? 1.6 : 7))) { this.o.onDone && this.o.onDone(this.ok, this.picked); return 'done'; }
    }
  }
  draw(c) {
    const a = ease(this.t * 4);
    c.save(); c.fillStyle = 'rgba(20,16,40,' + (0.55 * a) + ')'; c.fillRect(0, 0, W, H);
    c.translate(0, (1 - a) * 60); c.globalAlpha = a;
    UI.panel(c, 130, 40, 1020, 640, { fill: COL.cream });
    UI.text(c, this.o.title || Lang.t('Question!', '¡Pregunta!'), W / 2, 84, { size: 40, color: this.o.titleColor || COL.gold });
    if (this.q.unit) UI.text(c, this.q.unit, W / 2, 122, { size: 18, color: '#6B6F80', stroke: 0, font: BODY, weight: 700 });
    UI.para(c, this.q.q, 180, 140, 920, 175, { size: 34, min: 18, weight: 800 });
    const L = ['A', 'B', 'C', 'D'], cols = this.o.colors || ['#3A86FF', '#FF8C42', '#9B5DE5', '#2EC4B6'];
    this.rects().forEach((r, i) => {
      let fill = '#fff';
      if (this.picked >= 0) { if (i === this.q.a) fill = '#BDF2C9'; else if (i === this.picked) fill = '#FFC2B4'; }
      else if (i === this.sel && !Input.usingTouch) fill = '#FFF1B8';
      UI.panel(c, r.x, r.y, r.w, r.h, { fill, r: 16, drop: 5, lw: 4 });
      c.fillStyle = cols[i]; UI.rr(c, r.x + 10, r.y + 10, r.h - 20, r.h - 20, 12); c.fill();
      UI.text(c, (this.o.letters || L)[i], r.x + r.h / 2, r.y + r.h / 2 + 2, { size: r.h * 0.42, stroke: 0 });
      UI.para(c, this.q.choices[i], r.x + r.h + 4, r.y + 6, r.w - r.h - 20, r.h - 12, { size: 26, min: 14, align: 'left', weight: 700 });
      if (this.picked >= 0 && i === this.q.a) UI.text(c, '✓', r.x + r.w - 36, r.y + r.h / 2, { size: 44, color: COL.good, stroke: 4 });
    });
    if (this.timer && this.picked < 0) UI.bar(c, 170, 300, 940, 16, this.timer / this.o.timer, COL.gold);
    if (this.picked >= 0) {
      const y0 = 330 + this.q.choices.length * (this.q.choices.length > 3 ? 86 : 100) + 4;
      UI.text(c, this.ok ? Lang.t('Correct!', '¡Correcto!') : (this.picked < 0 ? Lang.t('Time\'s up!', '¡Se acabó el tiempo!') : Lang.t('Not quite…', 'Casi…')), 300, y0 + 20, { size: 34, color: this.ok ? COL.good : COL.bad });
      if (this.q.why && !this.ok) UI.para(c, this.q.why, 430, y0 - 4, 680, 680 - y0 - 10, { size: 22, min: 13, align: 'left', weight: 600, color: '#3D3F55' });
      if (this.doneT > (this.ok ? 0.9 : 1.6)) UI.text(c, Lang.t('tap / Enter to continue', 'toca / Enter para seguir'), W / 2, 655, { size: 18, color: '#6B6F80', stroke: 0, font: BODY });
    }
    c.restore();
  }
}

/* ---------------- floating text + particles (pooled) ---------------- */
const FX = {
  parts: [], texts: [],
  burst(x, y, n, col, sp, life, size) {
    for (let i = 0; i < n && this.parts.length < 400; i++) { const a = rand(0, 6.283), v = rand(sp * 0.3, sp);
      this.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - sp * 0.3, life: life || 0.6, t: 0, col: col || '#FFD23F', size: size || rand(4, 9), g: 600 }); }
  },
  confetti(x, y, n) { const cols = ['#FFD23F', '#3A86FF', '#FF5D8F', '#2EC4B6', '#C8102E']; for (let i = 0; i < n; i++) this.burst(x, y, 1, pick(cols), 520, 1.1, rand(5, 10)); },
  pop(x, y, str, col, size) { this.texts.push({ x, y, str, col: col || '#fff', size: size || 30, t: 0 }); },
  update() {
    for (let i = this.parts.length - 1; i >= 0; i--) { const p = this.parts[i]; p.t += DT; if (p.t >= p.life) { this.parts.splice(i, 1); continue; }
      p.vy += p.g * DT; p.x += p.vx * DT; p.y += p.vy * DT; }
    for (let i = this.texts.length - 1; i >= 0; i--) { const t = this.texts[i]; t.t += DT; t.y -= 50 * DT; if (t.t > 1) this.texts.splice(i, 1); }
  },
  draw(c, ox, oy) {
    ox = ox || 0; oy = oy || 0;
    for (const p of this.parts) { c.globalAlpha = 1 - p.t / p.life; c.fillStyle = p.col; c.fillRect(p.x - ox - p.size / 2, p.y - oy - p.size / 2, p.size, p.size); }
    c.globalAlpha = 1;
    for (const t of this.texts) { c.globalAlpha = clamp(1.6 - t.t * 1.6, 0, 1); UI.text(c, t.str, t.x - ox, t.y - oy, { size: t.size * (0.8 + easeBack(t.t * 5) * 0.2), color: t.col }); }
    c.globalAlpha = 1;
  },
  clear() { this.parts.length = 0; this.texts.length = 0; }
};

/* ---------------- Screens: title / how-to / pause / results ---------------- */
const Screens = {
  /* G: the game definition. Title uses G.titleArt(c, t) and G.title {en, es} */
  title(G) {
    const menu = new Menu([
      { label: () => Lang.t('PLAY', 'JUGAR'), act: 'play' },
      { label: () => Lang.t('How to play', 'Cómo jugar'), act: 'howto' },
      { label: () => Audio2.muted ? Lang.t('Sound: off', 'Sonido: no') : Lang.t('Sound: on', 'Sonido: sí'), act: 'mute' },
      { label: () => Lang.t('Back to arcade', 'Volver al arcade'), act: 'exit' }
    ], { x: W / 2 - 210, y: 372, w: 420, h: 68, gap: 16 });
    let t = 0;
    return {
      name: 'title',
      enter() { Touch.set([]); Audio2.play(G.music); },
      update() {
        t += DT; const a = menu.update();
        if (a === 'play') Game.go(G.levelSelect && Store.get('reached', 0) > 0 ? Screens.levels(G) : G.play());
        if (a === 'howto') Game.go(Screens.howto(G));
        if (a === 'mute') Audio2.toggleMute();
        if (a === 'exit') Game.exit();
      },
      draw(c) {
        G.titleArt(c, t);
        const best = Store.get('best', 0);
        UI.text(c, Lang.of(G.title), W / 2, 150 + Math.sin(t * 2) * 6, { size: 96, color: G.color || COL.gold, stroke: 14 });
        UI.text(c, Lang.of(G.tagline), W / 2, 236, { size: 30, color: '#fff', stroke: 7 });
        if (best) UI.text(c, Lang.t('Best', 'Récord') + ': ' + best, W / 2, 300, { size: 28, color: COL.gold, stroke: 6 });
        menu.draw(c);
        if (Head.name) UI.text(c, Lang.t('Playing as ', 'Juegas como ') + Head.name, W / 2, 700, { size: 20, stroke: 5 });
      }
    };
  },
  levels(G) {
    const reached = Store.get('reached', 0), items = G.levels.map((L, i) => ({ label: () => (i <= reached ? '' : '🔒 ') + Lang.of(L.name), act: i }));
    items.push({ label: () => Lang.t('Back', 'Volver'), act: 'back' });
    const menu = new Menu(items, { x: W / 2 - 230, y: 220, w: 460, h: 64, gap: 14 });
    let t = 0;
    return {
      name: 'levels', enter() { Touch.set([]); },
      update() { t += DT; const a = menu.update();
        if (a === 'back' || Input.pressed('back')) return Game.go(Screens.title(G));
        if (typeof a === 'number') { if (a <= reached) Game.go(G.play(a)); else { Audio2.sfx('bad'); } } },
      draw(c) { G.titleArt(c, t); c.fillStyle = 'rgba(20,16,40,.35)'; c.fillRect(0, 0, W, H);
        UI.text(c, Lang.t(G.levelsTitle ? G.levelsTitle.en : 'Choose a start', G.levelsTitle ? G.levelsTitle.es : 'Elige dónde empezar'), W / 2, 140, { size: 54, color: COL.gold, stroke: 10 }); menu.draw(c); }
    };
  },
  howto(G) {
    let t = 0;
    return {
      name: 'howto', enter() { Touch.set([]); },
      update() { t += DT; if (t > 0.3 && (Input.pressed('ok') || Input.pressed('back') || Input.pointer.released)) Game.go(Screens.title(G)); },
      draw(c) {
        G.titleArt(c, t); c.fillStyle = 'rgba(20,16,40,.45)'; c.fillRect(0, 0, W, H);
        UI.panel(c, 140, 50, 1000, 620);
        UI.text(c, Lang.t('How to play', 'Cómo jugar'), W / 2, 104, { size: 50, color: G.color || COL.gold });
        const lines = Lang.code === 'es' ? G.howto.es : G.howto.en;
        let y = 160;
        lines.forEach(l => { c.font = '700 26px ' + BODY; const ls = UI.wrap(c, l, 880);
          ls.forEach((s, i) => { c.fillStyle = COL.ink; c.textAlign = 'left'; c.textBaseline = 'top'; c.fillText((i ? '   ' : '• ') + s, 190, y); y += 34; }); y += 10; });
        UI.text(c, Lang.t('tap / Enter to go back', 'toca / Enter para volver'), W / 2, 640, { size: 20, color: '#6B6F80', stroke: 0, font: BODY });
      }
    };
  },
  /* stats: {won, score, lines:[[label, value]], coins, xp, again} */
  results(G, st) {
    const best = Store.get('best', 0), isBest = st.score > best;
    if (isBest) Store.set('best', st.score);
    const paid = Reward.give(G.id, st.coins, st.xp, Lang.of(G.title) + (st.won ? ' ✓' : ''));
    if (st.badge) Reward.badge(st.badge);
    Audio2.sfx(st.won ? 'win' : 'lose');
    const menu = new Menu([{ label: () => Lang.t('Play again', 'Otra vez'), act: 'again' }, { label: () => Lang.t('Title screen', 'Inicio'), act: 'title' }, { label: () => Lang.t('Back to arcade', 'Volver al arcade'), act: 'exit' }],
      { x: W / 2 - 200, y: 470, w: 400, h: 58, gap: 12 });
    let t = 0;
    return {
      name: 'results', stats: st, paid,
      enter() { Touch.set([]); if (st.won) FX.confetti(W / 2, 200, 80); },
      update() { t += DT; FX.update(); if (t < 0.6) return; const a = menu.update();
        if (a === 'again') Game.go(st.again ? st.again() : G.play()); if (a === 'title') Game.go(Screens.title(G)); if (a === 'exit') Game.exit(); },
      draw(c) {
        G.titleArt(c, t); c.fillStyle = 'rgba(20,16,40,.5)'; c.fillRect(0, 0, W, H);
        UI.panel(c, 290, 30 + (1 - ease(t * 3)) * 40, 700, 660);
        UI.text(c, st.title || (st.won ? Lang.t('You did it!', '¡Lo lograste!') : Lang.t('Game over', 'Fin del juego')), W / 2, 90, { size: 56, color: st.won ? COL.gold : COL.bad });
        UI.text(c, Lang.t('Score', 'Puntos') + ' ' + st.score, W / 2, 152, { size: 42, color: '#fff' });
        if (isBest) UI.text(c, Lang.t('NEW BEST!', '¡NUEVO RÉCORD!'), W / 2, 194, { size: 26, color: COL.gold, stroke: 6 });
        let y = 236;
        (st.lines || []).forEach(([k, v]) => { c.font = '700 24px ' + BODY; c.fillStyle = COL.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(k, 360, y); c.textAlign = 'right'; c.fillText(String(v), 920, y); y += 34; });
        const pay = (paid.coins ? '+' + paid.coins + ' ' + (paid.coins === 1 ? Lang.t('coin', 'moneda') : Lang.t('coins', 'monedas')) + '  ·  ' : '') + '+' + paid.xp + ' XP';
        UI.text(c, pay, W / 2, 440, { size: 30, color: COL.green, stroke: 6 });
        if (!paid.coins && st.coins > 0 && Reward.left() === 0) UI.text(c, Lang.t('(daily arcade coin limit reached)', '(límite diario de monedas)'), W / 2, 466, { size: 16, color: '#6B6F80', stroke: 0, font: BODY });
        menu.draw(c); FX.draw(c);
      }
    };
  },
  pause(G, under) {
    const menu = new Menu([{ label: () => Lang.t('Resume', 'Seguir'), act: 'resume' }, { label: () => Audio2.muted ? Lang.t('Sound: off', 'Sonido: no') : Lang.t('Sound: on', 'Sonido: sí'), act: 'mute' }, { label: () => Lang.t('Quit run', 'Salir'), act: 'quit' }],
      { x: W / 2 - 180, y: 290, w: 360, h: 66, gap: 16 });
    return {
      name: 'pause', enter() { Touch.set([]); },
      update() { const a = menu.update();
        if (a === 'resume' || Input.pressed('pause')) { Game.cur = under; under.resume && under.resume(); }
        if (a === 'mute') Audio2.toggleMute();
        if (a === 'quit') { under.quit ? under.quit() : Game.go(Screens.title(G)); } },
      draw(c) { under.draw(c); c.fillStyle = 'rgba(20,16,40,.55)'; c.fillRect(0, 0, W, H); UI.text(c, Lang.t('Paused', 'Pausa'), W / 2, 210, { size: 70, color: COL.gold, stroke: 12 }); menu.draw(c); }
    };
  }
};

/* ---------------- the pause button every play screen shows ---------------- */
const PAUSE_RECT = { x: W - 76, y: 14, w: 60, h: 60 };
function drawPauseBtn(c) {
  UI.panel(c, PAUSE_RECT.x, PAUSE_RECT.y, PAUSE_RECT.w, PAUSE_RECT.h, { r: 14, drop: 4, lw: 4, fill: '#fff' });
  c.fillStyle = COL.ink; c.fillRect(PAUSE_RECT.x + 19, PAUSE_RECT.y + 16, 8, 28); c.fillRect(PAUSE_RECT.x + 33, PAUSE_RECT.y + 16, 8, 28);
}
const wantsPause = () => Input.pressed('pause') || Input.tapped(PAUSE_RECT);

/* ---------------- MAIN ---------------- */
const Game = {
  cur: null, G: null, canvas: null, ctx: null, q: 1, fps: 60, frames: 0, slow: 0, fast: 0, steps: 0, paused: false,
  go(s) { this.cur = s; s.enter && s.enter(); },
  exit() {
    try { if (window.parent && window.parent !== window) { window.parent.postMessage({ arcade: 'exit' }, location.origin); return; } } catch (e) {}
    location.href = '../index.html';
  },
  fit() {
    const cv = this.canvas, vw = innerWidth, vh = innerHeight, s = Math.min(vw / W, vh / H);
    cv.style.width = Math.floor(W * s) + 'px'; cv.style.height = Math.floor(H * s) + 'px';
    /* back buffer: never bigger than the CSS size (Chromebooks are 1366x768) */
    const want = clamp(Math.min(s * (devicePixelRatio || 1), 1) * this.q, 0.5, 1);
    const bw = Math.round(W * want), bh = Math.round(H * want);
    if (cv.width !== bw || cv.height !== bh) { cv.width = bw; cv.height = bh; }
    this.scale = want;
  },
  boot(G) {
    this.G = G; Store.pfx = 'arc.' + G.id + '.';
    Lang.init(); Audio2.init(); Q.init(); Head.init();
    const cv = this.canvas = document.getElementById('cv'); this.ctx = cv.getContext('2d', { alpha: false });
    this.q = Store.get('quality', 1);
    Input.init(cv); this.fit(); addEventListener('resize', () => this.fit());
    document.addEventListener('visibilitychange', () => { if (document.hidden && this.cur && this.cur.playing) this.go(Screens.pause(G, this.cur)); });
    let prog = 0;
    const loading = { name: 'loading', update() {}, draw(c) { c.fillStyle = G.bgColor || '#3A86FF'; c.fillRect(0, 0, W, H);
      UI.text(c, Lang.of(G.title), W / 2, 300, { size: 80, color: COL.gold, stroke: 12 }); UI.bar(c, W / 2 - 250, 400, 500, 30, prog, COL.gold);
      UI.text(c, Lang.t('Loading…', 'Cargando…'), W / 2, 460, { size: 26 }); } };
    this.cur = loading;
    loadAssets(p => prog = p).then(() => { G.init && G.init(); this.go(Screens.title(G)); });
    let last = performance.now(), acc = 0, fpsT = 0, fpsN = 0;
    const loop = now => {
      requestAnimationFrame(loop);
      let dt = (now - last) / 1000; last = now; if (dt > 0.25) dt = 0.25;
      acc += dt; let steps = 0;
      while (acc >= DT && steps < 5) { Input.tick(); this.cur.update(); Audio2.tick(); Input.endFrame(); acc -= DT; steps++; this.steps++; }
      if (steps === 5) acc = 0;
      this.render();
      fpsT += dt; fpsN++;
      if (fpsT >= 1) { this.fps = fpsN / fpsT; fpsT = 0; fpsN = 0;
        /* adaptive quality: drop the back buffer if a slow machine can't keep up */
        if (this.cur && this.cur.playing && this.fps < 45) { this.fast = 0; if (++this.slow >= 2 && this.q > 0.6) { this.q = Math.max(0.6, this.q - 0.2); Store.set('quality', this.q); this.fit(); this.slow = 0; } }
        else { this.slow = 0;
          /* the machine has headroom again (a busy moment passed): step quality back up slowly */
          if (this.cur && this.cur.playing && this.fps >= 58 && this.q < 1) { if (++this.fast >= 8) { this.q = Math.min(1, this.q + 0.2); Store.set('quality', this.q); this.fit(); this.fast = 0; } } else this.fast = 0; } }
    };
    requestAnimationFrame(loop);
  },
  render() {
    const c = this.ctx; c.setTransform(this.scale, 0, 0, this.scale, 0, 0);
    c.imageSmoothingEnabled = true;
    this.cur.draw(c);
    this.frames++;
  }
};

/* test hooks: lets the Playwright checks drive and read the game */
window.ARC = {
  get screen() { return Game.cur && Game.cur.name; },
  get state() { return Game.cur; },
  get fps() { return Game.fps; },
  Q, Game, Input, Store, Head, Reward,
  /* run the simulation n fixed steps without rendering */
  step(n) { for (let i = 0; i < n; i++) { Input.tick(); Game.cur.update(); Input.endFrame(); } },
  press(a, held) { Input.virt[a] = true; if (!held) { Input.tick(); Game.cur.update(); Input.endFrame(); Input.virt[a] = false; Input.prev[a] = false; } },
  release(a) { Input.virt[a] = false; }
};
