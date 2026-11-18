/* ============================================================================
   MISCONCEPTION PANIC — arena survivor in the school gym.
   Misconception monsters pour in. Your chalk, erasers, ruler and textbook
   fire on their own; you move. Monsters drop idea bulbs. Fill the bar to
   level up — answer a question right to pick an upgrade. Survive 5 minutes.
   Which monsters show up depends on your classes (economics vs government).
   ========================================================================== */
const SCALE_BG = 1.6, AW = 1600 * SCALE_BG, AH = 1600 * SCALE_BG;
const BOUND = { x0: AW * 0.1, x1: AW * 0.9, y0: AH * 0.18, y1: AH * 0.96 };
const WIN_T = 300, BOSS_EVERY = 90;
const MONSTERS = {
  blob:    { name: { en: 'Inflation Blob', es: 'Blob de la Inflación' }, hp: 5, tier: 2, sp: 72, h: 92, xp: 'orb_big' },
  dragon:  { name: { en: 'Deficit Dragon', es: 'Dragón del Déficit' }, hp: 2, tier: 1, sp: 112, h: 90, xp: 'orb' },
  moth:    { name: { en: 'Monopoly Moth', es: 'Polilla del Monopolio' }, hp: 1, tier: 0, sp: 150, h: 78, xp: 'orb', flutter: true },
  troll:   { name: { en: 'Tariff Troll', es: 'Trol del Arancel' }, hp: 8, tier: 3, sp: 62, h: 100, xp: 'orb_big' },
  sloth:   { name: { en: 'Filibuster Sloth', es: 'Perezoso del Filibusterismo' }, hp: 8, tier: 3, sp: 60, h: 98, xp: 'orb_big' },
  snake:   { name: { en: 'Gerrymander Snake', es: 'Serpiente del Gerrymandering' }, hp: 1, tier: 0, sp: 150, h: 76, xp: 'orb' },
  gremlin: { name: { en: 'Fake-News Gremlin', es: 'Duende de Noticias Falsas' }, hp: 2, tier: 1, sp: 112, h: 86, xp: 'orb' },
  mummy:   { name: { en: 'Red-Tape Mummy', es: 'Momia de la Burocracia' }, hp: 5, tier: 2, sp: 72, h: 94, xp: 'orb_big' }
};
const BOSSES = { econ: { spr: 'boss_hydra', name: { en: 'Hydra of Hyperinflation', es: 'Hidra de la Hiperinflación' } },
                 gov: { spr: 'boss_golem', name: { en: 'Gridlock Golem', es: 'Gólem del Estancamiento' } } };
const UPGRADES = {
  chalk:  { icon: 'up_chalk', max: 6, name: { en: 'Chalk Toss', es: 'Lanzar tiza' }, desc: { en: 'More chalk, thrown faster', es: 'Más tiza, más rápido' } },
  eraser: { icon: 'up_eraser', max: 5, name: { en: 'Eraser Orbit', es: 'Órbita de borradores' }, desc: { en: 'Erasers circle you and bonk monsters', es: 'Borradores giran a tu alrededor' } },
  ruler:  { icon: 'ruler', max: 5, name: { en: 'Ruler Swipe', es: 'Golpe de regla' }, desc: { en: 'A wide swing in front of you', es: 'Un barrido amplio al frente' } },
  book:   { icon: 'book', max: 5, name: { en: 'Textbook Slam', es: 'Golpe de libro' }, desc: { en: 'A shockwave all around you', es: 'Una onda expansiva a tu alrededor' } },
  speed:  { icon: 'up_speed', max: 5, name: { en: 'Fast Sneakers', es: 'Tenis rápidos' }, desc: { en: '+12% move speed', es: '+12% de velocidad' } },
  calc:   { icon: 'up_calc', max: 5, name: { en: 'Calculator', es: 'Calculadora' }, desc: { en: '+20% damage for everything', es: '+20% de daño en todo' } },
  shield: { icon: 'up_shield', max: 4, name: { en: 'Hall Pass Shield', es: 'Escudo de pase' }, desc: { en: '+1 max heart and heal fully', es: '+1 corazón máximo y te curas' } },
  magnet: { icon: 'magnet', max: 4, name: { en: 'Idea Magnet', es: 'Imán de ideas' }, desc: { en: 'Grab idea bulbs from farther away', es: 'Atrae bombillas desde más lejos' } }
};
const MSONG = { bpm: 140,
  bass: [40, 0, 40, 47, 0, 40, 45, 0, 43, 0, 43, 50, 0, 43, 47, 0, 38, 0, 38, 45, 0, 38, 43, 0, 40, 0, 40, 47, 0, 47, 45, 43],
  lead: [64, 0, 67, 0, 71, 0, 69, 67, 0, 64, 0, 62, 64, 0, 0, 0, 62, 0, 66, 0, 69, 0, 67, 66, 0, 62, 0, 59, 62, 0, 0, 0],
  drum: 'k.hsk.hsk.hsk.ss' };

/* the arena pre-scaled to the screen's back-buffer size (redone if quality changes) */
let _arena = null;
function arenaCanvas() {
  const im = Art.img.arena; if (!im) return null;
  const g = Game.scale || 1;
  if (!_arena || _arena.g !== g) { const cv = document.createElement('canvas'); cv.width = Math.round(AW * g); cv.height = Math.round(AH * g);
    cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height); cv.g = g; _arena = cv; }
  return _arena;
}
function monsterPool() {
  const econ = ['blob', 'dragon', 'moth', 'troll'], gov = ['sloth', 'snake', 'gremlin', 'mummy'];
  if (Q.econ && Q.gov) return econ.concat(gov);
  return Q.gov ? gov : econ;
}

function newArena() {
  const M = {
    name: 'play', playing: true, t: 0,
    p: { x: AW / 2, y: AH * 0.62, dir: 1, hp: 5, maxHp: 5, inv: 0, speed: 250, anim: 0, moving: false, face: 0, hurt: 0 },
    lv: { chalk: 1, eraser: 0, ruler: 0, book: 0, speed: 0, calc: 0, shield: 0, magnet: 0 },
    cd: { chalk: 0.5, ruler: 1, book: 2 },
    foes: [], shots: [], orbs: [], drops: [], waves: [], swings: [],
    xp: 0, level: 1, need: 4, kills: 0, cam: { x: 0, y: 0 }, spawnAcc: 0, boss: null, bossN: 0,
    overlay: null, over: false, endT: 0, shake: 0, eraserA: 0, pool: monsterPool(), qRight: 0, qWrong: 0, banner: null
  };
  M.enter = () => { Touch.set([], { x: 150, y: 560, r: 90 }); Audio2.play(MSONG); FX.clear(); };
  M.resume = M.enter; M.quit = () => Game.go(Screens.title(MP));
  const dmgMul = () => 1 + M.lv.calc * 0.2;
  const pickR = () => 90 * (1 + M.lv.magnet * 0.45);

  /* ---------- spatial grid for monster lookups ---------- */
  const CELL = 128, grid = new Map();
  function rebuildGrid() {
    grid.clear();
    for (const f of M.foes) { const k = ((f.x / CELL) | 0) * 1000 + ((f.y / CELL) | 0); let a = grid.get(k); if (!a) grid.set(k, a = []); a.push(f); }
  }
  function near(x, y, r, out) {
    out.length = 0; const c0 = ((x - r) / CELL) | 0, c1 = ((x + r) / CELL) | 0, r0 = ((y - r) / CELL) | 0, r1 = ((y + r) / CELL) | 0;
    for (let cx = c0; cx <= c1; cx++) for (let cy = r0; cy <= r1; cy++) { const a = grid.get(cx * 1000 + cy); if (a) for (const f of a) out.push(f); }
    return out;
  }
  const tmp = [];

  function spawnFoe(kind, boss) {
    const a = rand(0, Math.PI * 2), d = boss ? 650 : rand(720, 900);
    const x = clamp(M.p.x + Math.cos(a) * d, BOUND.x0, BOUND.x1), y = clamp(M.p.y + Math.sin(a) * d, BOUND.y0, BOUND.y1);
    if (boss) {
      const b = Q.gov && (!Q.econ || M.bossN % 2) ? BOSSES.gov : BOSSES.econ, hp = [90, 170, 280][Math.min(2, M.bossN)];
      M.boss = { boss: true, spr: b.spr, bname: b.name, x, y, hp, max: hp, sp: 72, h: 250, r: 70, dmg: 2, flash: 0, vx: 0, vy: 0, charge: 3, dash: 0 };
      M.foes.push(M.boss); M.bossN++;
      M.banner = { str: Lang.of(b.name), t: 0 }; Audio2.sfx('boss'); M.shake = 0.5;
      return;
    }
    const m = MONSTERS[kind], grow = 1 + M.t / 80;
    M.foes.push({ kind, x, y, hp: m.hp * grow, sp: m.sp * rand(0.9, 1.1) * (1 + M.t / 1200), h: m.h, r: m.h * 0.34, dmg: 1, flash: 0, vx: 0, vy: 0, ph: rand(0, 6), kb: 0 });
  }
  function hurtFoe(f, dmg, kx, ky) {
    if (f.dead) return;
    f.hp -= dmg * dmgMul(); f.flash = 0.1;
    if (!f.boss && kx != null) { f.vx += kx * 260; f.vy += ky * 260; f.kb = 0.12; }
    if (f.hp <= 0) killFoe(f);
  }
  function killFoe(f) {
    f.dead = true; M.kills++; Audio2.sfx('pop');
    FX.burst(f.x, f.y - f.h * 0.4, 8, '#fff', 260, 0.4);
    M.waves.push({ x: f.x, y: f.y - f.h * 0.4, t: 0, k: 'poof' });
    if (f.boss) {
      for (let i = 0; i < 18; i++) M.orbs.push({ x: f.x + rand(-120, 120), y: f.y + rand(-80, 80), v: 5, k: 'orb_big' });
      M.drops.push({ k: 'heart', x: f.x, y: f.y }); M.boss = null; Audio2.sfx('win'); M.shake = 0.6; FX.confetti(f.x, f.y - 100, 50);
      M.banner = { str: Lang.t('Boss busted!', '¡Jefe derrotado!'), t: 0 };
    } else {
      const big = MONSTERS[f.kind].xp === 'orb_big';
      M.orbs.push({ x: f.x, y: f.y - 10, v: big ? 3 : 1, k: big ? 'orb_big' : 'orb' });
      const r = Math.random();
      if (r < 0.02) M.drops.push({ k: 'heart', x: f.x, y: f.y }); else if (r < 0.026) M.drops.push({ k: 'magnet', x: f.x, y: f.y });
    }
  }
  function hitPlayer(dmg) {
    const p = M.p; if (p.inv > 0 || M.over) return;
    p.hp -= dmg; p.inv = 1.4; p.hurt = 0.35; M.shake = 0.3; Audio2.sfx('hit');
    /* shove nearby monsters back so you're never pinned */
    for (const f of near(p.x, p.y, 200, tmp)) { if (f.boss || f.dead) continue; const dx = f.x - p.x, dy = f.y - p.y, d = Math.hypot(dx, dy) || 1; f.vx = dx / d * 520; f.vy = dy / d * 520; f.kb = 0.25; }
    M.waves.push({ x: p.x, y: p.y - 30, t: 0, R: 200, k: 'ring' });
    if (p.hp <= 0) { p.hp = 0; M.over = true; M.won = false; M.endT = 0; Audio2.stop(); Audio2.sfx('lose'); }
  }

  /* ---------- level up: question first, then upgrades ---------- */
  function upgradeChoices() {
    const all = Object.keys(UPGRADES).filter(k => M.lv[k] < UPGRADES[k].max);
    const weapons = all.filter(k => ['chalk', 'eraser', 'ruler', 'book'].includes(k));
    let picks = shuffle(all).slice(0, 3);
    if (!picks.some(k => weapons.includes(k)) && weapons.length) picks[0] = pick(weapons);   /* always offer a weapon */
    return picks;
  }
  function applyUpgrade(k) {
    M.lv[k]++;
    if (k === 'shield') { M.p.maxHp++; M.p.hp = M.p.maxHp; }
    if (k === 'speed') M.p.speed = 250 * (1 + M.lv.speed * 0.12);
    Audio2.sfx('level');
  }
  function levelUp() {
    M.level++; M.xp -= M.need; M.need = Math.round(4 + M.level * 3.5 + Math.max(0, M.level - 8) * 2);
    const q = Q.next(3);
    M.overlay = new QuestionCard(q, {
      title: Lang.t('LEVEL UP! Answer to power up', '¡SUBES DE NIVEL! Responde para mejorar'), titleColor: COL.gold,
      onDone: ok => {
        if (ok) { M.qRight++; M.overlay = upgradePicker(upgradeChoices()); }
        else { M.qWrong++; M.p.hp = Math.min(M.p.maxHp, M.p.hp + 1); if (M.lv.chalk < 3) M.lv.chalk++; M.banner = { str: M.lv.chalk <= 3 ? Lang.t('Study snack: +1 heart, +chalk', 'Merienda: +1 corazón, +tiza') : Lang.t('Study snack: +1 heart', 'Merienda: +1 corazón'), t: 0 }; M.overlay = null; Touch.set([], { x: 150, y: 560, r: 90 }); }
      }
    });
    Audio2.sfx('level'); Touch.set([]);
  }
  function upgradePicker(keys) {
    const P = { sel: 0, t: 0 };
    const rect = i => ({ x: 160 + i * 330, y: 200, w: 300, h: 380 });
    P.update = () => {
      P.t += DT; if (P.t < 0.3) return;
      if (Input.pressed('right')) { P.sel = (P.sel + 1) % keys.length; Audio2.sfx('click'); }
      if (Input.pressed('left')) { P.sel = (P.sel + keys.length - 1) % keys.length; Audio2.sfx('click'); }
      let ch = -1;
      ['a1', 'a2', 'a3'].forEach((a, i) => { if (i < keys.length && Input.pressed(a)) ch = i; });
      keys.forEach((k, i) => { if (Input.tapped(rect(i))) ch = i; });
      if (Input.pressed('ok')) ch = P.sel;
      if (ch >= 0) { applyUpgrade(keys[ch]); M.overlay = null; Touch.set([], { x: 150, y: 560, r: 90 }); }
    };
    P.draw = c => {
      c.fillStyle = 'rgba(20,16,40,.6)'; c.fillRect(0, 0, W, H);
      UI.text(c, Lang.t('Correct! Pick a power-up', '¡Correcto! Elige una mejora'), W / 2, 130, { size: 52, color: COL.gold, stroke: 10 });
      keys.forEach((k, i) => {
        const r = rect(i), u = UPGRADES[k], a = easeBack((P.t - i * 0.08) * 3), on = i === P.sel && !Input.usingTouch;
        c.save(); c.translate(r.x + r.w / 2, r.y + r.h / 2); c.scale(a, a); c.translate(-(r.x + r.w / 2), -(r.y + r.h / 2));
        UI.panel(c, r.x, r.y - (on ? 12 : 0), r.w, r.h, { fill: on ? '#FFF1B8' : COL.cream });
        const yy = r.y - (on ? 12 : 0);
        if (u.icon.startsWith('up_')) drawFrame(c, u.icon, r.x + r.w / 2, yy + 145, { h: 120 });
        else { c.fillStyle = '#2B2D42'; c.beginPath(); c.arc(r.x + r.w / 2, yy + 85, 60, 0, 7); c.fill(); c.fillStyle = '#FFD23F'; c.beginPath(); c.arc(r.x + r.w / 2, yy + 85, 52, 0, 7); c.fill(); drawFrame(c, u.icon, r.x + r.w / 2, yy + 85, { h: 70, ay: 0.5 }); }
        UI.text(c, Lang.of(u.name), r.x + r.w / 2, yy + 190, { size: 30, color: COL.ink, stroke: 0 });
        UI.text(c, (M.lv[k] ? Lang.t('Level ', 'Nivel ') + (M.lv[k] + 1) : Lang.t('NEW!', '¡NUEVO!')), r.x + r.w / 2, yy + 228, { size: 22, color: M.lv[k] ? COL.blue : COL.red, stroke: 0 });
        UI.para(c, Lang.of(u.desc), r.x + 20, yy + 250, r.w - 40, 90, { size: 22, min: 14, weight: 700 });
        UI.text(c, String(i + 1), r.x + 30, yy + 30, { size: 26, color: '#6B6F80', stroke: 0 });
        c.restore();
      });
    };
    return P;
  }

  /* ---------- weapons ---------- */
  function nearestFoes(n, range) {
    const out = near(M.p.x, M.p.y, range, tmp).filter(f => !f.dead).map(f => [f, (f.x - M.p.x) ** 2 + (f.y - M.p.y) ** 2]);
    out.sort((a, b) => a[1] - b[1]); return out.slice(0, n).map(a => a[0]);
  }
  function weapons() {
    const p = M.p, L = M.lv;
    /* chalk: aimed at the nearest monsters */
    M.cd.chalk -= DT;
    if (L.chalk && M.cd.chalk <= 0) {
      const n = 1 + Math.floor(L.chalk / 2), targets = nearestFoes(n, 560);
      if (targets.length) {
        M.cd.chalk = Math.max(0.25, 0.75 - L.chalk * 0.08);
        targets.forEach((f, i) => { const a = Math.atan2(f.y - f.h * 0.4 - (p.y - 50), f.x - p.x) + (i ? rand(-0.08, 0.08) : 0);
          M.shots.push({ x: p.x, y: p.y - 50, vx: Math.cos(a) * 760, vy: Math.sin(a) * 760, a, life: 0.9, dmg: 1 + L.chalk * 0.5, pierce: L.chalk >= 4 ? 2 : 0, hit: new Set() }); });
        Audio2.sfx('shoot');
      }
    }
    /* erasers orbit */
    if (L.eraser) {
      M.eraserA += DT * (2.6 + L.eraser * 0.2);
      const R = 100 + L.eraser * 8;
      for (let i = 0; i < L.eraser; i++) {
        const a = M.eraserA + i * Math.PI * 2 / L.eraser, ex = p.x + Math.cos(a) * R, ey = p.y - 45 + Math.sin(a) * R * 0.75;
        for (const f of near(ex, ey, 60, tmp)) if (!f.dead && dist(ex, ey, f.x, f.y - f.h * 0.4) < f.r + 26) {
          f.eh = f.eh || 0; if (M.t - f.eh > 0.35) { f.eh = M.t; hurtFoe(f, 1.2 + L.eraser * 0.3, Math.cos(a), Math.sin(a)); } }
      }
    }
    /* ruler swipe in the direction you face */
    if (L.ruler) {
      M.cd.ruler -= DT;
      if (M.cd.ruler <= 0) {
        M.cd.ruler = Math.max(0.8, 1.7 - L.ruler * 0.15); const R = 150 + L.ruler * 22, fa = p.face;
        M.swings.push({ t: 0, a: fa, R });
        for (const f of near(p.x, p.y, R + 60, tmp)) { if (f.dead) continue; const dx = f.x - p.x, dy = f.y - f.h * 0.4 - (p.y - 45), d = Math.hypot(dx, dy);
          if (d < R + f.r && Math.abs(angDiff(fa, Math.atan2(dy, dx))) < 1.6) hurtFoe(f, 2 + L.ruler * 1.2, dx / (d || 1), dy / (d || 1)); }
        Audio2.sfx('skid');
      }
    }
    /* textbook slam: shockwave around you */
    if (L.book) {
      M.cd.book -= DT;
      if (M.cd.book <= 0) {
        M.cd.book = Math.max(1.6, 3.4 - L.book * 0.3); const R = 170 + L.book * 30;
        M.waves.push({ x: p.x, y: p.y - 30, t: 0, R, k: 'ring' });
        for (const f of near(p.x, p.y, R + 60, tmp)) { if (f.dead) continue; const dx = f.x - p.x, dy = f.y - p.y, d = Math.hypot(dx, dy);
          if (d < R + f.r) hurtFoe(f, 3 + L.book * 1.5, dx / (d || 1), dy / (d || 1)); }
        Audio2.sfx('slam'); M.shake = Math.max(M.shake, 0.12);
      }
    }
  }

  M.update = function () {
    if (M.overlay) { M.overlay.update(); return; }   /* the card's onDone swaps in the upgrade picker or closes */
    if (wantsPause()) return Game.go(Screens.pause(MP, M));
    FX.update();
    if (M.over) { M.endT += DT; if (M.endT > 2) finish(); return; }
    M.t += DT; M.shake = Math.max(0, M.shake - DT);
    if (M.banner) { M.banner.t += DT; if (M.banner.t > 2.6) M.banner = null; }
    if (M.t >= WIN_T) { M.over = true; M.won = true; M.endT = 0; Audio2.stop(); Audio2.sfx('win'); FX.confetti(M.p.x, M.p.y - 100, 90); return; }

    /* move */
    const p = M.p; let mx = (Input.held('right') ? 1 : 0) - (Input.held('left') ? 1 : 0), my = (Input.held('down') ? 1 : 0) - (Input.held('up') ? 1 : 0);
    const v = Touch.vec() || (Input.stick && (Input.stick.x || Input.stick.y) ? Input.stick : null);
    if (v) { mx = v.x; my = v.y; }
    const m = Math.hypot(mx, my);
    if (m > 0.15) { const k = Math.min(1, m) / m; p.x += mx * k * p.speed * DT; p.y += my * k * p.speed * DT; p.face = Math.atan2(my, mx); if (Math.abs(mx) > 0.1) p.dir = mx > 0 ? 1 : -1; p.moving = true; p.anim += DT; }
    else p.moving = false;
    p.x = clamp(p.x, BOUND.x0, BOUND.x1); p.y = clamp(p.y, BOUND.y0, BOUND.y1);
    p.inv = Math.max(0, p.inv - DT); p.hurt = Math.max(0, p.hurt - DT);

    /* spawn */
    const rate = 1.0 + M.t / 70 + (M.t > 200 ? (M.t - 200) / 50 : 0);
    M.spawnAcc += rate * DT;
    /* tougher monster types join as the clock runs */
    const maxTier = M.t < 30 ? 0 : M.t < 70 ? 1 : M.t < 130 ? 2 : 3, kinds = M.pool.filter(k => MONSTERS[k].tier <= maxTier);
    while (M.spawnAcc >= 1) { M.spawnAcc--; if (M.foes.length < 150) spawnFoe(pick(kinds)); }
    if (M.t >= BOSS_EVERY * (M.bossN + 1) && !M.boss && M.bossN < 3) spawnFoe(null, true);

    /* monsters chase */
    rebuildGrid();
    for (const f of M.foes) {
      if (f.dead) continue;
      f.flash = Math.max(0, f.flash - DT); f.ph += DT;
      let dx = p.x - f.x, dy = p.y - f.y; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
      if (f.boss) {
        f.charge -= DT;
        if (f.dash > 0) { f.dash -= DT; f.x += f.vx * DT; f.y += f.vy * DT; }
        else { f.x += dx * f.sp * DT; f.y += dy * f.sp * DT; if (f.charge <= 0) { f.charge = rand(3.5, 5); f.dash = 0.7; f.vx = dx * 340; f.vy = dy * 340; Audio2.sfx('horn'); } }
      } else {
        if (f.kb > 0) { f.kb -= DT; f.x += f.vx * DT; f.y += f.vy * DT; f.vx *= 0.9; f.vy *= 0.9; }
        else {
          let sx = 0, sy = 0;
          if (MONSTERS[f.kind].flutter) { sx = Math.cos(f.ph * 3) * 0.6; sy = Math.sin(f.ph * 4) * 0.6; }
          f.x += (dx + sx) * f.sp * DT; f.y += (dy + sy) * f.sp * DT;
        }
        /* keep them from stacking into one blob */
        for (const o of near(f.x, f.y, 50, tmp)) { if (o === f || o.dead || o.boss) continue; const ox = f.x - o.x, oy = f.y - o.y, od = ox * ox + oy * oy, rr = (f.r + o.r) * 0.8;
          if (od < rr * rr && od > 0.01) { const k = (rr - Math.sqrt(od)) * 0.25 / Math.sqrt(od); f.x += ox * k; f.y += oy * k; } }
      }
      f.x = clamp(f.x, BOUND.x0 - 60, BOUND.x1 + 60); f.y = clamp(f.y, BOUND.y0 - 60, BOUND.y1 + 60);
      if (dist(f.x, f.y, p.x, p.y) < f.r + 30) hitPlayer(f.dmg);
    }
    weapons();

    /* chalk flight */
    for (const s of M.shots) {
      s.life -= DT; s.x += s.vx * DT; s.y += s.vy * DT;
      for (const f of near(s.x, s.y, 80, tmp)) {
        if (f.dead || s.hit.has(f) || s.life <= 0) continue;
        if (dist(s.x, s.y, f.x, f.y - f.h * 0.4) < f.r + 14) { s.hit.add(f); hurtFoe(f, s.dmg, s.vx / 760, s.vy / 760); if (s.pierce-- <= 0) s.life = 0; }
      }
    }
    M.shots = M.shots.filter(s => s.life > 0);
    M.foes = M.foes.filter(f => !f.dead);

    /* idea bulbs fly to you when close */
    const R = pickR();
    for (const o of M.orbs) {
      const d = dist(o.x, o.y, p.x, p.y - 40);
      if (o.pull || d < R) { o.pull = true; const sp = 520 + (o.ps = (o.ps || 0) + DT * 900); o.x += (p.x - o.x) / d * sp * DT; o.y += (p.y - 40 - o.y) / d * sp * DT; }
      if (d < 34) { o.got = true; M.xp += o.v; Audio2.sfx('orb'); }
    }
    M.orbs = M.orbs.filter(o => !o.got);
    if (M.orbs.length > 260) { /* merge the oldest far-away bulbs so slow machines stay smooth */ const old = M.orbs.splice(0, 60); const v = old.reduce((a, o) => a + o.v, 0); M.orbs.push({ x: old[0].x, y: old[0].y, v, k: 'orb_big' }); }
    for (const d of M.drops) if (!d.got && dist(d.x, d.y, p.x, p.y) < 60) {
      d.got = true;
      if (d.k === 'heart') { p.hp = Math.min(p.maxHp, p.hp + 1); Audio2.sfx('pickup'); FX.pop(p.x, p.y - 140, '+♥', '#FF5D8F', 34); }
      else { M.orbs.forEach(o => o.pull = true); Audio2.sfx('boost'); FX.pop(p.x, p.y - 140, Lang.t('MAGNET!', '¡IMÁN!'), COL.gold, 34); }
    }
    M.drops = M.drops.filter(d => !d.got);
    for (const w of M.waves) w.t += DT; M.waves = M.waves.filter(w => w.t < 0.45);
    for (const s of M.swings) s.t += DT; M.swings = M.swings.filter(s => s.t < 0.22);
    if (M.xp >= M.need) levelUp();

    M.cam.x = clamp(p.x - W / 2, 0, AW - W); M.cam.y = clamp(p.y - 40 - H / 2, 0, AH - H);
  };

  function finish() {
    const mins = Math.floor(M.t / 60), secs = Math.floor(M.t % 60);
    const score = Math.floor(M.t) * 10 + M.kills * 5 + M.qRight * 200 + (M.won ? 2000 : 0);
    Game.go(Screens.results(MP, {
      won: M.won, score,
      title: M.won ? Lang.t('Class dismissed! You survived!', '¡Se acabó la clase! ¡Sobreviviste!') : Lang.t('Overwhelmed by misconceptions!', '¡Te ganaron las ideas erróneas!'),
      lines: [[Lang.t('Time survived', 'Tiempo'), mins + ':' + String(secs).padStart(2, '0')], [Lang.t('Monsters busted', 'Monstruos vencidos'), M.kills],
              [Lang.t('Level-up questions right', 'Preguntas correctas'), M.qRight + ' / ' + (M.qRight + M.qWrong)], [Lang.t('Bosses busted', 'Jefes vencidos'), Math.max(0, M.bossN - (M.boss ? 1 : 0))]],
      coins: Math.floor(M.qRight / 2) + (M.won ? 2 : 0), xp: M.qRight * 10 + Math.floor(M.t / 30) * 5 + (M.won ? 20 : 0), badge: M.won ? 'misconception_panic_survivor' : null
    }));
  }

  /* ---------- drawing ---------- */
  M.draw = function (c) {
    const p = M.p, cx = M.cam.x, cy = M.cam.y;
    c.save(); if (M.shake > 0) c.translate(rand(-1, 1) * M.shake * 18, rand(-1, 1) * M.shake * 18);
    const bg = arenaCanvas(); if (bg) { const g = bg.g; c.drawImage(bg, cx * g, cy * g, W * g, H * g, 0, 0, W, H); }
    c.translate(-cx, -cy);
    const vis = (x, y, m) => x > cx - m && x < cx + W + m && y > cy - m && y < cy + H + m;
    for (const w of M.waves) if (w.k === 'ring') { c.globalAlpha = 1 - w.t / 0.45; c.lineWidth = 14; c.strokeStyle = '#FFD23F'; c.beginPath(); c.ellipse(w.x, w.y, w.R * ease(w.t * 3), w.R * 0.75 * ease(w.t * 3), 0, 0, 7); c.stroke(); c.globalAlpha = 1; }
    for (const o of M.orbs) if (vis(o.x, o.y, 40)) drawFrame(c, o.k, o.x, o.y, { h: o.k === 'orb' ? 30 : 40, ay: 0.5, cache: true });
    for (const d of M.drops) if (vis(d.x, d.y, 40)) drawFrame(c, d.k, d.x, d.y - 20 + Math.sin(M.t * 5) * 5, { h: 44, ay: 0.5 });
    /* sort monsters + player by feet y */
    const list = M.foes.filter(f => vis(f.x, f.y, 300));
    list.push(p); list.sort((a, b) => a.y - b.y);
    for (const f of list) {
      if (f === p) { drawPlayer(c); continue; }
      drawShadow(c, f.x, f.y, f.r * 1.1, f.r * 0.32);
      if (f.boss) { drawFrame(c, f.spr, f.x, f.y + Math.sin(f.ph * 4) * 4, { h: f.h, dir: p.x < f.x ? -1 : 1, flash: f.flash > 0 ? 0.7 : 0 }); continue; }
      const fr = f.kind + (Math.floor(f.ph * 6) % 2);
      drawFrame(c, fr, f.x, f.y - (MONSTERS[f.kind].flutter ? 20 + Math.sin(f.ph * 8) * 6 : 0), { h: f.h, dir: p.x < f.x ? -1 : 1, flash: f.flash > 0 ? 0.8 : 0, cache: true });
    }
    for (const s of M.shots) drawFrame(c, 'chalk', s.x, s.y, { h: 22, rot: s.a, ay: 0.5 });
    for (const w of M.waves) if (w.k === 'poof') drawFrame(c, 'poof', w.x, w.y, { h: 60 + w.t * 120, ay: 0.5, alpha: 1 - w.t / 0.45 });
    if (M.lv.eraser) { const R = 100 + M.lv.eraser * 8; for (let i = 0; i < M.lv.eraser; i++) { const a = M.eraserA + i * Math.PI * 2 / M.lv.eraser; drawFrame(c, 'eraser', p.x + Math.cos(a) * R, p.y - 45 + Math.sin(a) * R * 0.75, { h: 44, ay: 0.5, rot: a * 2 }); } }
    for (const s of M.swings) { const k = s.t / 0.22; drawFrame(c, 'ruler', p.x + Math.cos(s.a - 1.2 + k * 2.4) * s.R * 0.7, p.y - 45 + Math.sin(s.a - 1.2 + k * 2.4) * s.R * 0.6, { h: 90, ay: 0.5, rot: s.a - 1.2 + k * 2.4 + Math.PI / 2 });
      c.globalAlpha = 0.35 * (1 - k); c.lineWidth = 18; c.strokeStyle = '#fff'; c.beginPath(); c.arc(p.x, p.y - 45, s.R * 0.7, s.a - 1.2, s.a - 1.2 + k * 2.4); c.stroke(); c.globalAlpha = 1; }
    FX.draw(c);
    c.restore();
    drawHUD(c);
    if (M.overlay) M.overlay.draw(c);
    else Touch.draw(c);
    if (M.over && M.endT > 0.3) UI.text(c, M.won ? Lang.t('YOU SURVIVED!', '¡SOBREVIVISTE!') : Lang.t('OVERWHELMED!', '¡TE GANARON!'), W / 2, 320, { size: 96, color: M.won ? COL.gold : COL.bad, stroke: 16 });
  };
  function drawPlayer(c) {
    const p = M.p, s = 0.6;
    drawShadow(c, p.x, p.y, 34, 10, 0.26);
    const f = M.over && !M.won ? 'hurt' : M.over ? 'cheer' : p.hurt > 0 ? 'hurt' : p.moving ? 'walk' + (Math.floor(p.anim * 9) % 4) : (Math.floor(M.t * 2) % 2 ? 'front0' : 'front1');
    const al = p.inv > 0 && Math.floor(M.t * 14) % 2 ? 0.45 : 1;
    drawFrame(c, f, p.x, p.y, { s, dir: p.dir, alpha: al, flash: p.hurt > 0 ? 0.5 : 0, flashColor: '#FF5D5D' });
    Head.draw(c, f, p.x, p.y, s, p.dir, al);
  }
  function drawHUD(c) {
    const p = M.p;
    /* XP bar across the top */
    UI.bar(c, 20, 14, W - 120, 26, M.xp / M.need, '#7FDBFF');
    UI.text(c, Lang.t('LV ', 'NV ') + M.level, 60, 27, { size: 20, stroke: 4 });
    for (let i = 0; i < p.maxHp; i++) drawFrame(c, 'heart', 40 + i * 44, 92, { h: 38, ay: 0.5, alpha: i < p.hp ? 1 : 0.25 });
    const left = Math.max(0, WIN_T - M.t), mm = Math.floor(left / 60), ss = Math.floor(left % 60);
    UI.text(c, mm + ':' + String(ss).padStart(2, '0'), W / 2, 84, { size: 46, color: left < 30 ? COL.gold : '#fff', stroke: 9 });
    UI.text(c, '✖ ' + M.kills, W - 150, 84, { size: 28, stroke: 6 });
    /* weapons you have */
    let x = 40; for (const k of ['chalk', 'eraser', 'ruler', 'book']) if (M.lv[k]) { c.fillStyle = 'rgba(255,248,231,.92)'; c.beginPath(); c.arc(x, H - 44, 28, 0, 7); c.fill(); c.lineWidth = 3; c.strokeStyle = COL.ink; c.stroke();
      drawFrame(c, k, x, H - 44, { h: 34, ay: 0.5 }); UI.text(c, String(M.lv[k]), x + 22, H - 22, { size: 18, stroke: 4 }); x += 66; }
    if (M.boss) { UI.text(c, Lang.of(M.boss.bname), W / 2, 136, { size: 26, color: '#FF8C69', stroke: 6 }); UI.bar(c, W / 2 - 260, 154, 520, 22, M.boss.hp / M.boss.max, COL.bad); }
    if (M.banner) { const a = clamp(Math.min(M.banner.t * 4, (2.6 - M.banner.t) * 3), 0, 1); c.globalAlpha = a; UI.text(c, M.banner.str, W / 2, 230, { size: 48, color: COL.gold, stroke: 10 }); c.globalAlpha = 1; }
    drawPauseBtn(c);
  }
  M.debug = () => ({ t: M.t, hp: M.p.hp, level: M.level, xp: M.xp, kills: M.kills, foes: M.foes.length, orbs: M.orbs.length, overlay: M.overlay ? (M.overlay.q ? 'question' : 'upgrade') : null,
    qa: M.overlay && M.overlay.q ? M.overlay.q.a : null, picked: M.overlay && M.overlay.q ? M.overlay.picked : null, lv: M.lv, boss: !!M.boss, bossN: M.bossN, over: M.over, won: M.won, px: M.p.x, py: M.p.y });
  return M;
}

const MP = {
  id: 'misconception_panic', color: '#FF8C42', bgColor: '#7B2CBF', music: MSONG,
  title: { en: 'Misconception Panic', es: 'Pánico de Ideas Erróneas' },
  tagline: { en: 'Survive the gym. Bust the myths.', es: 'Sobrevive en el gimnasio. Destruye los mitos.' },
  howto: {
    en: ['Move with arrows / WASD (or drag the left stick). Your chalk, erasers, ruler and textbook attack on their own.',
         'Monsters are misconceptions from your classes. Bust them to drop 💡 idea bulbs.',
         'Fill the bar to level up. Answer the question right to pick a power-up (1, 2 or 3).',
         'Wrong answer? You see the explanation and get a small study snack (+1 heart) instead.',
         'A boss shows up every 90 seconds. ♥ hearts heal you; the magnet pulls in every bulb.',
         'Survive 5 minutes to win!'],
    es: ['Muévete con flechas / WASD (o arrastra el control izquierdo). Tu tiza, borradores, regla y libro atacan solos.',
         'Los monstruos son ideas erróneas de tus clases. Véncelos para soltar 💡 bombillas.',
         'Llena la barra para subir de nivel. Responde bien la pregunta para elegir una mejora (1, 2 o 3).',
         '¿Respuesta incorrecta? Ves la explicación y recibes una merienda (+1 corazón).',
         'Cada 90 segundos aparece un jefe. Los ♥ te curan; el imán atrae todas las bombillas.',
         '¡Sobrevive 5 minutos para ganar!'] },
  play() { return newArena(); },
  titleArt(c, t) {
    const bg = Art.img.arena; if (bg) c.drawImage(bg, 200 + Math.sin(t * 0.3) * 80, 500, 1200, 675, 0, 0, W, H);
    c.fillStyle = 'rgba(123,44,191,.25)'; c.fillRect(0, 0, W, H);
    const pool = Q.gov && !Q.econ ? ['sloth', 'snake', 'gremlin', 'mummy'] : Q.econ && !Q.gov ? ['blob', 'dragon', 'moth', 'troll'] : ['blob', 'snake', 'moth', 'gremlin'];
    pool.forEach((k, i) => drawFrame(c, k + (Math.floor(t * 5 + i) % 2), 120 + i * 90 + (i > 1 ? 820 : 0), 690 - (i % 2) * 40, { h: 120, dir: i > 1 ? -1 : 1 }));
    const f = 'front' + (Math.floor(t * 2) % 2); drawFrame(c, f, 230, 560, { s: 0.75 }); Head.draw(c, f, 230, 560, 0.75, 1);
    drawFrame(c, Q.gov && !Q.econ ? 'boss_golem' : 'boss_hydra', 1080, 560, { h: 300, dir: -1 });
  }
};
Game.boot(MP);
