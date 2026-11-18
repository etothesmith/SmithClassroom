/* ============================================================================
   GRENADIER EXPRESS — top-down golf-cart delivery around campus.
   Grab a package: it carries a question, and three buildings get the answers.
   Drive it to the building with the right answer before the clock runs out.
   Drift around corners for a speed boost, and watch out for the bus.
   ========================================================================== */
const RX = [250, 1000, 1750, 2500, 3250], RY = [300, 1100, 1900];   /* road centre lines */
const ROAD = 150, WW = 3500, WH = 2200;
const BUILDINGS = [
  ['b_office', { en: 'Main Office', es: 'Oficina' }], ['b_library', { en: 'Library', es: 'Biblioteca' }], ['b_band', { en: 'Band Room', es: 'Banda' }],
  ['b_stadium', { en: 'Stadium', es: 'Estadio' }], ['b_gym', { en: 'Gym', es: 'Gimnasio' }], ['b_cafeteria', { en: 'Cafeteria', es: 'Cafetería' }],
  ['b_science', { en: 'Science Lab', es: 'Laboratorio' }], ['b_auditorium', { en: 'Auditorium', es: 'Auditorio' }]
];
const GLET = ['A', 'B', 'C'], GCOL = ['#3A86FF', '#FF8C42', '#9B5DE5'];
const SHIFT = 8;
const ZOOM = 0.8, VW = W / ZOOM, VH = H / ZOOM;   /* the camera shows a bit more of campus */            /* packages in a shift */
const GSONG = { bpm: 128,
  bass: [45, 0, 45, 52, 0, 45, 0, 52, 43, 0, 43, 50, 0, 43, 0, 50, 41, 0, 41, 48, 0, 41, 0, 48, 43, 0, 43, 50, 0, 47, 0, 50],
  lead: [69, 0, 72, 0, 76, 0, 74, 72, 0, 0, 67, 0, 69, 0, 0, 0, 65, 0, 69, 0, 72, 0, 74, 0, 71, 0, 67, 0, 0, 0, 0, 0],
  drum: 'k.h.s.hkk.h.s.h.' };

function buildCampus() {
  const blocks = [];
  let n = 0;
  for (let j = 0; j < RY.length - 1; j++) for (let i = 0; i < RX.length - 1; i++) {
    const x0 = RX[i] + ROAD / 2, x1 = RX[i + 1] - ROAD / 2, y0 = RY[j] + ROAD / 2, y1 = RY[j + 1] - ROAD / 2;
    const [spr, name] = BUILDINGS[n++], cx = (x0 + x1) / 2, bottom = y1 - 150, sz = frameSize(spr), h = 400, w = sz.w * h / sz.h;
    blocks.push({ spr, name, x0, x1, y0, y1, cx, bottom, w, h,
      rect: { x: cx - w * 0.42, y: bottom - h * 0.62, w: w * 0.84, h: h * 0.58 },
      door: { x: cx, y: y1 - 62 }, plaza: { x: cx - 170, y: bottom - 20, w: 340, h: y1 - bottom + 20 } });
  }
  return blocks;
}
function onRoad(x, y) {
  for (const r of RY) if (Math.abs(y - r) < ROAD / 2 && x > RX[0] - ROAD / 2 && x < RX[RX.length - 1] + ROAD / 2) return true;
  for (const r of RX) if (Math.abs(x - r) < ROAD / 2 && y > RY[0] - ROAD / 2 && y < RY[RY.length - 1] + ROAD / 2) return true;
  return false;
}
function roadPoint() {
  if (Math.random() < 0.5) return { x: rand(RX[0], RX[RX.length - 1]), y: pick(RY) + rand(-30, 30) };
  return { x: pick(RX) + rand(-30, 30), y: rand(RY[0], RY[RY.length - 1]) };
}

function newShift() {
  const blocks = buildCampus();
  const S = {
    name: 'play', playing: true, blocks, t: 0,
    car: { x: RX[1], y: RY[1] + 40, a: Math.PI / 2, vx: 0, vy: 0, drift: 0, charge: 0, boost: 0, bump: 0, r: 34 },
    cam: { x: 0, y: 0 }, time: 90, pkg: null, order: null, orderT: 0, card: null, delivered: 0, right: 0, wrong: 0, coins: 0,
    traffic: [], props: [], pickups: [], skids: [], walkers: [], msg: null, over: false, endT: 0, shake: 0, combo: 0
  };
  /* decoration + obstacles */
  blocks.forEach(b => {
    [[b.x0 + 60, b.y0 + 70, 'oak'], [b.x1 - 60, b.y0 + 70, 'palm'], [b.x0 + 70, b.y1 - 80, 'bush'], [b.x1 - 70, b.y1 - 80, Math.random() < 0.5 ? 'bush' : 'fountain']]
      .forEach(([x, y, k]) => S.props.push({ k, x, y, r: k === 'fountain' ? 70 : k === 'bush' ? 40 : 34, solid: true }));
    S.props.push({ k: 'bench', x: b.cx - 230, y: b.y1 - 40, r: 30, solid: true }, { k: 'trash', x: b.cx + 230, y: b.y1 - 40, r: 24, solid: true });
    for (let i = 0; i < 2; i++) S.walkers.push({ k: 'student' + i, x: b.cx + rand(-150, 150), y: b.y1 - rand(20, 70), dir: Math.random() < 0.5 ? -1 : 1, b, hop: 0 });
  });
  /* cones on a few roads */
  for (let i = 0; i < 16; i++) { const p = roadPoint(); if (dist(p.x, p.y, S.car.x, S.car.y) > 400) S.props.push({ k: 'cone', x: p.x, y: p.y, r: 18, cone: true }); }
  for (let i = 0; i < 4; i++) { const p = roadPoint(); if (dist(p.x, p.y, S.car.x, S.car.y) > 500) S.props.push({ k: 'barrier', x: p.x, y: p.y, r: 30, solid: true }); }
  for (let i = 0; i < 18; i++) { const p = roadPoint(); S.pickups.push({ k: 'coin', x: p.x, y: p.y }); }

  S.enter = () => {
    Touch.set([{ id: 'drift', x: 1166, y: 600, r: 82, label: Lang.t('DRIFT', 'DERRAPE'), act: 'action' }, { id: 'brake', x: 1010, y: 650, r: 58, label: '■', act: 'down' }],
      { x: 150, y: 580, r: 90 });
    Audio2.play(GSONG); FX.clear();
  };
  S.resume = S.enter; S.quit = () => Game.go(Screens.title(GE));

  function spawnTraffic() {
    const want = 4 + Math.min(6, S.delivered);
    while (S.traffic.length < want) {
      const k = pick(['bus', 'security', 'truck', 'scooter', 'security', 'scooter']);
      const i = randi(0, RX.length - 1), j = randi(0, RY.length - 1);
      if (dist(RX[i], RY[j], S.car.x, S.car.y) < 700) continue;
      S.traffic.push({ k, i, j, ti: i, tj: j, x: RX[i], y: RY[j], a: 0, speed: { bus: 160, truck: 190, security: 250, scooter: 220 }[k], r: k === 'bus' ? 60 : k === 'truck' ? 50 : k === 'scooter' ? 24 : 38, wait: 0, len: { bus: 150, truck: 115, security: 75, scooter: 60 }[k] });
      nextWaypoint(S.traffic[S.traffic.length - 1]);
    }
  }
  function nextWaypoint(v) {
    const opts = [];
    if (v.ti > 0) opts.push([v.ti - 1, v.tj]); if (v.ti < RX.length - 1) opts.push([v.ti + 1, v.tj]);
    if (v.tj > 0) opts.push([v.ti, v.tj - 1]); if (v.tj < RY.length - 1) opts.push([v.ti, v.tj + 1]);
    const fwd = opts.filter(o => !(o[0] === v.i && o[1] === v.j));
    const [ni, nj] = pick(fwd.length ? fwd : opts);
    v.i = v.ti; v.j = v.tj; v.ti = ni; v.tj = nj;
  }
  function newPackage() {
    let p; do { p = roadPoint(); } while (dist(p.x, p.y, S.car.x, S.car.y) < 700);
    S.pkg = { x: p.x, y: p.y };
  }
  function startOrder() {
    const q = Q.next(3);
    /* three buildings, not the closest one every time */
    const picks = shuffle(blocks).slice(0, 3);
    S.order = { q, targets: picks };
    S.card = { q, t: 0 };
    Audio2.sfx('pickup');
  }
  function deliver(bi) {
    const o = S.order, ok = bi === o.q.a; Q.mark(o.q, ok);
    S.delivered++;
    const b = o.targets[bi];
    if (ok) { S.right++; S.combo++; S.time += 15; S.coins += 5; Audio2.sfx('good'); FX.confetti(b.door.x, b.door.y - 80, 40); FX.pop(b.door.x, b.door.y - 140, Lang.t('DELIVERED! +15s', '¡ENTREGADO! +15s'), '#7CFC9A', 36); }
    else { S.wrong++; S.combo = 0; S.time = Math.max(0, S.time - 8); Audio2.sfx('bad'); FX.pop(b.door.x, b.door.y - 140, Lang.t('WRONG BUILDING -8s', 'EDIFICIO EQUIVOCADO -8s'), '#FF8C69', 32); }
    S.msg = { ok, q: o.q, b: o.targets[o.q.a], t: 0 };
    S.order = null;
    if (S.delivered >= SHIFT) return end(true);
    newPackage();
  }
  function end(won) { if (S.over) return; S.over = true; S.won = won; S.endT = 0; Audio2.stop(); if (won) FX.confetti(S.car.x, S.car.y - 100, 80); }
  function finish() {
    const score = S.right * 300 + S.coins * 10 + Math.round(S.time) * (S.won ? 10 : 0);
    Game.go(Screens.results(GE, {
      won: S.won, score,
      title: S.won ? Lang.t('Shift complete!', '¡Turno completo!') : Lang.t('Out of time!', '¡Se acabó el tiempo!'),
      lines: [[Lang.t('Right deliveries', 'Entregas correctas'), S.right + ' / ' + S.delivered], [Lang.t('Coins grabbed', 'Monedas'), S.coins], [Lang.t('Time left', 'Tiempo restante'), Math.max(0, Math.round(S.time)) + 's']],
      coins: Math.floor(S.right / 2) + (S.won ? 1 : 0), xp: S.right * 10 + (S.won ? 20 : 0), badge: S.won && S.right >= 7 ? 'grenadier_express_medal' : null
    }));
  }
  newPackage(); spawnTraffic();

  /* ---------- physics ---------- */
  function collideRect(o, r) {
    const nx = clamp(o.x, r.x, r.x + r.w), ny = clamp(o.y, r.y, r.y + r.h), dx = o.x - nx, dy = o.y - ny, d = Math.hypot(dx, dy);
    if (d >= o.r || d === 0 && !(o.x > r.x && o.x < r.x + r.w && o.y > r.y && o.y < r.y + r.h)) return false;
    let ux, uy, push;
    if (d === 0) { /* centre inside: push out the shortest way */
      const l = o.x - r.x, rr = r.x + r.w - o.x, t = o.y - r.y, b = r.y + r.h - o.y, m = Math.min(l, rr, t, b);
      ux = m === l ? -1 : m === rr ? 1 : 0; uy = m === t ? -1 : m === b ? 1 : 0; push = m + o.r;
    } else { ux = dx / d; uy = dy / d; push = o.r - d; }
    o.x += ux * push; o.y += uy * push; return { ux, uy };
  }
  function bounce(c, n, k) {
    const vn = c.vx * n.ux + c.vy * n.uy; if (vn >= 0) return 0;
    c.vx -= (1 + k) * vn * n.ux; c.vy -= (1 + k) * vn * n.uy; return -vn;
  }
  function updateCar() {
    const c = S.car, fx = Math.sin(c.a), fy = -Math.cos(c.a);
    let fwd = c.vx * fx + c.vy * fy, lat = c.vx * Math.cos(c.a) + c.vy * Math.sin(c.a);
    let steer = (Input.held('right') ? 1 : 0) - (Input.held('left') ? 1 : 0), gas = Input.held('up') ? 1 : 0, brake = Input.held('down');
    /* joystick / gamepad stick: point where you want to go */
    const v = Touch.vec() || (Input.stick && (Input.stick.x || Input.stick.y) ? Input.stick : null);
    if (v && Math.hypot(v.x, v.y) > 0.25) {
      const want = Math.atan2(v.x, -v.y), d = angDiff(c.a, want);
      steer = clamp(d * 2.2, -1, 1); gas = Math.abs(d) < 2.2 ? clamp(Math.hypot(v.x, v.y) * 1.3, 0, 1) : 0;
      if (Math.abs(d) > 2.5 && fwd < 60) { brake = true; }
    }
    const surfaceSlow = onRoad(c.x, c.y) || S.blocks.some(b => inRect(c.x, c.y, b.plaza)) ? 1 : 0.62;
    const top = (520 + (c.boost > 0 ? 220 : 0)) * surfaceSlow;
    const drifting = Input.held('action') && Math.abs(fwd) > 220 && steer !== 0;
    if (drifting) { if (!c.drift) Audio2.sfx('skid'); c.drift += DT; c.charge += DT; }
    else { if (c.drift && c.charge > 0.7) { c.boost = Math.min(1.4, c.charge * 0.8); Audio2.sfx('boost'); FX.pop(c.x, c.y - 70, Lang.t('DRIFT BOOST!', '¡TURBO!'), COL.gold, 30); } c.drift = 0; c.charge = 0; }
    c.boost = Math.max(0, c.boost - DT); c.bump = Math.max(0, c.bump - DT);
    if (gas) fwd += 720 * DT * (c.boost > 0 ? 1.5 : 1);
    if (brake) fwd = fwd > 20 ? fwd - 1300 * DT : Math.max(-220, fwd - 500 * DT);
    if (!gas && !brake) fwd = approach(fwd, 0, 260 * DT);
    if (fwd > top) fwd = approach(fwd, top, 900 * DT);
    const turn = steer * 2.7 * Math.max(0.3, clamp(Math.abs(fwd) / 180, 0, 1)) * (fwd < 0 ? -1 : 1) * (drifting ? 1.35 : 1);
    c.a += turn * DT;
    /* lateral grip: low while drifting so the cart slides */
    const grip = drifting ? 2.2 : 10;
    lat *= Math.exp(-grip * DT);
    const nfx = Math.sin(c.a), nfy = -Math.cos(c.a);
    c.vx = nfx * fwd + Math.cos(c.a) * lat; c.vy = nfy * fwd + Math.sin(c.a) * lat;
    c.x += c.vx * DT; c.y += c.vy * DT;
    if (drifting && S.t % 0.05 < DT) { S.skids.push({ x: c.x - nfx * 40, y: c.y - nfy * 40, a: c.a, t: 0 }); if (S.skids.length > 120) S.skids.shift(); }
    /* world edges and buildings */
    c.x = clamp(c.x, 60, WW - 60); c.y = clamp(c.y, 60, WH - 60);
    for (const b of S.blocks) { const n = collideRect(c, b.rect); if (n) { const hit = bounce(c, n, 0.35); if (hit > 160 && c.bump <= 0) { Audio2.sfx('hit'); S.shake = 0.25; c.bump = 0.5; } } }
    for (const p of S.props) {
      if (p.gone || p.fly) continue;
      const d = dist(c.x, c.y, p.x, p.y);
      if (d < c.r + p.r) {
        if (p.cone) { p.fly = 0.01; p.vx = c.vx * 1.2; p.vy = c.vy * 1.2; Audio2.sfx('pop'); c.vx *= 0.85; c.vy *= 0.85; continue; }
        const n = { ux: (c.x - p.x) / (d || 1), uy: (c.y - p.y) / (d || 1) }; c.x = p.x + n.ux * (c.r + p.r); c.y = p.y + n.uy * (c.r + p.r);
        if (bounce(c, n, 0.4) > 160 && c.bump <= 0) { Audio2.sfx('hit'); S.shake = 0.2; c.bump = 0.5; }
      }
    }
    for (const v of S.traffic) {
      const d = dist(c.x, c.y, v.x, v.y);
      if (d < c.r + v.r) {
        const n = { ux: (c.x - v.x) / (d || 1), uy: (c.y - v.y) / (d || 1) }; c.x = v.x + n.ux * (c.r + v.r); c.y = v.y + n.uy * (c.r + v.r);
        bounce(c, n, 0.5); c.vx += n.ux * 220; c.vy += n.uy * 220;
        if (c.bump <= 0) { c.bump = 1; S.time = Math.max(0, S.time - 2); Audio2.sfx('horn'); Audio2.sfx('hit'); S.shake = 0.35; FX.pop(c.x, c.y - 80, '-2s', '#FF8C69', 34); }
        if (!(S.t - (v.lastWait || -9) < 3)) { v.wait = 0.8; v.lastWait = S.t; }   /* they honk and pause, then carry on */
      }
    }
    S.fwd = fwd; S.drifting = drifting;
  }
  function updateTraffic() {
    spawnTraffic();
    for (const v of S.traffic) {
      const tx = RX[v.ti], ty = RY[v.tj], dx = tx - RX[v.i], dy = ty - RY[v.j], len = Math.hypot(dx, dy) || 1;
      /* drive on the right-hand side of the road */
      const ox = -dy / len * 38, oy = dx / len * 38;
      const gx = tx + ox, gy = ty + oy, d = dist(v.x, v.y, gx, gy);
      if (v.wait > 0) { v.wait -= DT; continue; }
      if (d < 20) { nextWaypoint(v); continue; }
      const sp = v.speed * DT;
      v.x += (gx - v.x) / d * Math.min(sp, d); v.y += (gy - v.y) / d * Math.min(sp, d);
      const want = Math.atan2(gx - v.x, -(gy - v.y)); v.a += angDiff(v.a, want) * Math.min(1, DT * 8);
    }
  }

  S.update = function () {
    if (S.card) {           /* the delivery order card is up: the clock waits */
      S.card.t += DT;
      if (S.card.t > 0.5 && (Input.pressed('ok') || Input.pressed('action') || Input.pointer.released)) { S.card = null; Audio2.sfx('select'); }
      return;
    }
    if (wantsPause()) return Game.go(Screens.pause(GE, S));
    S.t += DT; FX.update(); S.shake = Math.max(0, S.shake - DT);
    if (S.over) { S.endT += DT; if (S.endT > 2) finish(); return; }
    const before = Math.ceil(S.time);
    S.time -= DT; if (S.time <= 10 && Math.ceil(S.time) !== before) Audio2.sfx('tick');
    if (S.time <= 0) { S.time = 0; return end(false); }
    updateCar(); updateTraffic();
    const c = S.car;
    /* package pickup and deliveries */
    if (S.pkg && dist(c.x, c.y, S.pkg.x, S.pkg.y) < 70) { S.pkg = null; startOrder(); }
    if (S.order) S.order.targets.forEach((b, i) => { if (S.order && dist(c.x, c.y, b.door.x, b.door.y) < 75) deliver(i); });
    for (const p of S.pickups) if (!p.gone && dist(c.x, c.y, p.x, p.y) < 55) {
      p.gone = true;
      if (p.k === 'coin') { S.coins++; Audio2.sfx('coin'); } else { S.time += 5; Audio2.sfx('pickup'); FX.pop(p.x, p.y - 50, '+5s', '#7FDBFF', 30); }
    }
    /* respawn pickups now and then */
    if (S.pickups.filter(p => !p.gone).length < 14 && Math.random() < 0.02) { const p = roadPoint(); if (dist(p.x, p.y, c.x, c.y) > 600) S.pickups.push({ k: Math.random() < 0.18 ? 'stopwatch' : 'coin', x: p.x, y: p.y }); }
    if (S.pickups.length > 60) S.pickups = S.pickups.filter(p => !p.gone);
    for (const p of S.props) if (p.fly) { p.fly += DT; p.x += p.vx * DT; p.y += p.vy * DT; p.vx *= 0.96; p.vy *= 0.96; if (p.fly > 1.2) { p.fly = 0; p.vx = p.vy = 0; } }
    for (const w of S.walkers) {
      const d = dist(c.x, c.y, w.x, w.y);
      if (d < 120) { w.hop = 0.3; w.x += (w.x - c.x) / (d || 1) * 200 * DT; }
      else w.x += w.dir * 40 * DT;
      if (w.x < w.b.cx - 200 || w.x > w.b.cx + 200) w.dir *= -1;
      w.x = clamp(w.x, w.b.cx - 210, w.b.cx + 210); w.hop = Math.max(0, w.hop - DT);
    }
    for (const s of S.skids) s.t += DT;
    if (S.msg) { S.msg.t += DT; if (S.msg.t > (S.msg.ok ? 2.5 : 5.5)) S.msg = null; }
    /* camera with a little look-ahead */
    S.cam.x = lerp(S.cam.x, clamp(c.x + c.vx * 0.35 - VW / 2, 0, WW - VW), 0.12);
    S.cam.y = lerp(S.cam.y, clamp(c.y + c.vy * 0.35 - VH / 2, 0, WH - VH), 0.12);
  };

  /* ---------- drawing ---------- */
  let grassPat = null, brickPat = null;
  function drawGround(c) {
    const cx = S.cam.x, cy = S.cam.y;
    if (!grassPat && Art.img.grass) { grassPat = c.createPattern(Art.img.grass, 'repeat'); brickPat = c.createPattern(Art.img.brick, 'repeat'); }
    c.save(); c.scale(ZOOM, ZOOM); c.translate(-cx, -cy);
    c.fillStyle = grassPat || '#6BBF59'; c.fillRect(cx, cy, VW, VH);
    /* plazas */
    c.fillStyle = brickPat || '#B5533C';
    for (const b of S.blocks) { const p = b.plaza; if (p.x + p.w < cx || p.x > cx + VW || p.y + p.h < cy || p.y > cy + VH) continue; c.fillRect(p.x, p.y, p.w, p.h); }
    /* roads */
    c.fillStyle = '#5B5F6E';
    for (const r of RY) c.fillRect(RX[0] - ROAD / 2, r - ROAD / 2, RX[RX.length - 1] - RX[0] + ROAD, ROAD);
    for (const r of RX) c.fillRect(r - ROAD / 2, RY[0] - ROAD / 2, ROAD, RY[RY.length - 1] - RY[0] + ROAD);
    c.fillStyle = '#E8E4D8';
    for (const r of RY) { c.fillRect(RX[0] - ROAD / 2, r - ROAD / 2, RX[RX.length - 1] - RX[0] + ROAD, 5); c.fillRect(RX[0] - ROAD / 2, r + ROAD / 2 - 5, RX[RX.length - 1] - RX[0] + ROAD, 5); }
    for (const r of RX) { c.fillRect(r - ROAD / 2, RY[0] - ROAD / 2, 5, RY[RY.length - 1] - RY[0] + ROAD); c.fillRect(r + ROAD / 2 - 5, RY[0] - ROAD / 2, 5, RY[RY.length - 1] - RY[0] + ROAD); }
    c.fillStyle = '#FFD23F';
    for (const r of RY) for (let x = RX[0]; x < RX[RX.length - 1]; x += 80) if (!RX.some(v => Math.abs(x + 20 - v) < ROAD / 2 + 10) && x > cx - 80 && x < cx + VW) c.fillRect(x, r - 3, 40, 6);
    for (const r of RX) for (let y = RY[0]; y < RY[RY.length - 1]; y += 80) if (!RY.some(v => Math.abs(y + 20 - v) < ROAD / 2 + 10) && y > cy - 80 && y < cy + VH) c.fillRect(r - 3, y, 6, 40);
    /* skid marks */
    for (const s of S.skids) { c.globalAlpha = clamp(1 - s.t / 4, 0, 0.6); drawFrame(c, 'skid', s.x, s.y, { h: 46, rot: s.a, ay: 0.5 }); }
    c.globalAlpha = 1;
    c.restore();
  }
  function visible(x, y, m) { return x > S.cam.x - m && x < S.cam.x + VW + m && y > S.cam.y - m && y < S.cam.y + VH + m; }
  function drawWorld(c) {
    const list = [];
    for (const b of S.blocks) if (visible(b.cx, b.bottom, 500)) list.push({ y: b.bottom, f: () => drawFrame(c, b.spr, b.cx, b.bottom, { h: b.h }) });
    for (const p of S.props) if (!p.gone && visible(p.x, p.y, 150)) {
      const h = { oak: 190, palm: 180, bush: 100, fountain: 160, bench: 60, trash: 70, cone: 46, barrier: 54 }[p.k];
      list.push({ y: p.y, f: () => drawFrame(c, p.k, p.x, p.y + (p.k === 'fountain' ? 70 : p.r * 0.6), { h, rot: p.fly ? p.fly * 9 : 0 }) });
    }
    for (const w of S.walkers) if (visible(w.x, w.y, 100)) list.push({ y: w.y, f: () => drawFrame(c, w.k, w.x, w.y - w.hop * 60, { h: 70, dir: w.dir }) });
    for (const v of S.traffic) if (visible(v.x, v.y, 200)) list.push({ y: v.y, f: () => drawFrame(c, v.k, v.x, v.y, { h: v.len, rot: v.a, ay: 0.5 }) });
    for (const p of S.pickups) if (!p.gone && visible(p.x, p.y, 60)) list.push({ y: p.y, f: () => drawFrame(c, p.k, p.x, p.y + Math.sin(S.t * 5 + p.x) * 4, { h: p.k === 'coin' ? 40 : 52, ay: 0.5 }) });
    if (S.pkg) list.push({ y: S.pkg.y, f: () => { drawFrame(c, 'ring_gold', S.pkg.x, S.pkg.y, { h: 120 + Math.sin(S.t * 6) * 8, ay: 0.5, alpha: 0.8 }); drawFrame(c, 'package', S.pkg.x, S.pkg.y + Math.sin(S.t * 4) * 6 - 10, { h: 64, ay: 0.5 }); } });
    if (S.order) S.order.targets.forEach((b, i) => list.push({ y: b.door.y - 1, f: () => {
      drawFrame(c, 'ring_green', b.door.x, b.door.y, { h: 140 + Math.sin(S.t * 5 + i) * 8, ay: 0.5, alpha: 0.85 });
      const sy = b.bottom - b.h - 20 + Math.sin(S.t * 3 + i) * 6;
      c.fillStyle = GCOL[i]; UI.rr(c, b.cx - 50, sy - 50, 100, 90, 18); c.fill(); c.lineWidth = 5; c.strokeStyle = COL.ink; c.stroke();
      UI.text(c, GLET[i], b.cx, sy - 4, { size: 64, stroke: 6 });
    } }));
    const car = S.car;
    list.push({ y: car.y, f: () => {
      drawFrame(c, S.drifting ? 'cart_drift' : 'cart', car.x, car.y, { h: S.drifting ? 120 : 108, rot: car.a, ay: 0.5, flash: car.bump > 0.5 ? 0.6 : 0 });
      if (S.order) { /* carrying: package on the back seat */ drawFrame(c, 'package', car.x - Math.sin(car.a) * 28, car.y + Math.cos(car.a) * 28, { h: 34, rot: car.a, ay: 0.5 }); }
      if (car.boost > 0) drawFrame(c, 'smoke', car.x - Math.sin(car.a) * 70, car.y + Math.cos(car.a) * 70, { h: 50, ay: 0.5, alpha: 0.7 });
    } });
    list.sort((a, b) => a.y - b.y);
    c.save(); c.scale(ZOOM, ZOOM); c.translate(-S.cam.x, -S.cam.y);
    for (const it of list) it.f();
    FX.draw(c);
    /* arrow toward the target */
    const tgt = targetPoint();
    if (tgt) { const a = Math.atan2(tgt.y - car.y, tgt.x - car.x), d = dist(car.x, car.y, tgt.x, tgt.y);
      if (d > 220) drawFrame(c, 'arrow', car.x + Math.cos(a) * 110, car.y + Math.sin(a) * 110, { h: 46, rot: a, ay: 0.5, alpha: 0.9 }); }
    c.restore();
    /* edge markers for anything off screen: the package (gold) or the three answer buildings */
    const marks = S.pkg ? [{ x: S.pkg.x, y: S.pkg.y, col: COL.gold, l: '📦' }] : S.order ? S.order.targets.map((b, i) => ({ x: b.door.x, y: b.door.y, col: GCOL[i], l: GLET[i] })) : [];
    for (const m of marks) {
      const sx = (m.x - S.cam.x) * ZOOM, sy = (m.y - S.cam.y) * ZOOM;
      if (sx > 30 && sx < W - 30 && sy > 30 && sy < H - 30) continue;
      const cx0 = W / 2, cy0 = H / 2, a = Math.atan2(sy - cy0, sx - cx0), k = Math.min((W / 2 - 46) / Math.abs(Math.cos(a) || 1e-6), (H / 2 - 46) / Math.abs(Math.sin(a) || 1e-6));
      const ex = cx0 + Math.cos(a) * k, ey = cy0 + Math.sin(a) * k;
      c.save(); c.translate(ex, ey); c.rotate(a); c.fillStyle = m.col; c.beginPath(); c.moveTo(34, 0); c.lineTo(8, -20); c.lineTo(8, 20); c.closePath(); c.fill(); c.lineWidth = 4; c.strokeStyle = COL.ink; c.stroke(); c.restore();
      c.fillStyle = m.col; c.beginPath(); c.arc(ex, ey, 24, 0, 7); c.fill(); c.lineWidth = 4; c.strokeStyle = COL.ink; c.stroke();
      UI.text(c, m.l, ex, ey + 2, { size: m.l.length > 1 ? 22 : 28, stroke: m.l.length > 1 ? 0 : 4 });
    }
  }
  function targetPoint() {
    if (S.pkg) return S.pkg;
    return null;
  }
  function drawMinimap(c) {
    const mw = 230, mh = mw * WH / WW, x0 = W - mw - 20, y0 = 90, k = mw / WW;
    c.save(); c.globalAlpha = 0.92; UI.panel(c, x0 - 6, y0 - 6, mw + 12, mh + 12, { r: 12, drop: 4, lw: 4, fill: '#7CC46B' });
    c.fillStyle = '#5B5F6E';
    for (const r of RY) c.fillRect(x0 + (RX[0] - 40) * k, y0 + (r - 40) * k, (RX[RX.length - 1] - RX[0] + 80) * k, 80 * k);
    for (const r of RX) c.fillRect(x0 + (r - 40) * k, y0 + (RY[0] - 40) * k, 80 * k, (RY[RY.length - 1] - RY[0] + 80) * k);
    S.blocks.forEach(b => { const ti = S.order ? S.order.targets.indexOf(b) : -1; c.fillStyle = ti >= 0 ? GCOL[ti] : '#C9B79C'; c.fillRect(x0 + b.rect.x * k, y0 + b.rect.y * k, b.rect.w * k, b.rect.h * k);
      if (ti >= 0) UI.text(c, GLET[ti], x0 + b.cx * k, y0 + (b.rect.y + b.rect.h / 2) * k, { size: 14, stroke: 3 }); });
    if (S.pkg && Math.floor(S.t * 4) % 2) { c.fillStyle = COL.gold; c.beginPath(); c.arc(x0 + S.pkg.x * k, y0 + S.pkg.y * k, 6, 0, 7); c.fill(); }
    c.fillStyle = COL.red; c.beginPath(); c.arc(x0 + S.car.x * k, y0 + S.car.y * k, 5, 0, 7); c.fill(); c.lineWidth = 2; c.strokeStyle = '#fff'; c.stroke();
    c.restore();
  }
  function drawHUD(c) {
    /* clock */
    const low = S.time < 10;
    UI.panel(c, 20, 16, 200, 64, { r: 16, drop: 5, lw: 4, fill: low && Math.floor(S.t * 4) % 2 ? '#FFD0C2' : '#fff' });
    drawFrame(c, 'stopwatch', 54, 49, { h: 46, ay: 0.5 });
    UI.text(c, Math.ceil(S.time) + 's', 92, 50, { size: 36, color: low ? COL.bad : COL.ink, stroke: 0, align: 'left' });
    UI.panel(c, 236, 16, 250, 64, { r: 16, drop: 5, lw: 4 });
    drawFrame(c, 'package', 270, 48, { h: 40, ay: 0.5 });
    UI.text(c, S.right + ' ✓  ' + S.delivered + '/' + SHIFT, 298, 50, { size: 28, color: COL.ink, stroke: 0, align: 'left' });
    drawFrame(c, 'coin', 530, 48, { h: 38, ay: 0.5 }); UI.text(c, String(S.coins), 556, 50, { size: 28, stroke: 5, align: 'left' });
    if (S.order) {
      const o = S.order; UI.panel(c, 20, H - 170, 780, 150, { r: 18, drop: 5, lw: 4 });
      UI.para(c, o.q.q, 36, H - 162, 750, 48, { size: 22, min: 13, weight: 800 });
      o.targets.forEach((b, i) => { const y = H - 108 + i * 30; c.fillStyle = GCOL[i]; UI.rr(c, 36, y, 26, 26, 7); c.fill(); UI.text(c, GLET[i], 49, y + 14, { size: 18, stroke: 0 });
        UI.para(c, o.q.choices[i] + '  → ' + Lang.of(b.name), 70, y, 720, 28, { size: 18, min: 11, align: 'left', weight: 700 }); });
    } else if (S.pkg && !S.msg) {
      UI.text(c, Lang.t('Follow the arrow to the next package!', '¡Sigue la flecha hasta el próximo paquete!'), 410, H - 40, { size: 26, color: '#fff', stroke: 6 });
    }
    if (S.msg) {
      const m = S.msg; UI.panel(c, 20, H - (m.ok ? 90 : 170), 780, m.ok ? 70 : 150, { r: 18, drop: 5, lw: 4, fill: m.ok ? '#D7F8DF' : '#FFE1D9' });
      UI.para(c, (m.ok ? '✓ ' : '✗ ' + Lang.t('It was ', 'Era ') + Lang.of(m.b.name) + ': ') + m.q.choices[m.q.a], 36, H - (m.ok ? 84 : 162), 750, 58, { size: 22, min: 12, weight: 800 });
      if (!m.ok && m.q.why) UI.para(c, m.q.why, 36, H - 102, 750, 76, { size: 18, min: 11, weight: 600, color: '#3D3F55' });
    }
    drawMinimap(c); drawPauseBtn(c);
  }
  function drawCard(c) {
    const k = S.card, o = S.order, a = ease(k.t * 4);
    c.fillStyle = 'rgba(20,16,40,' + 0.5 * a + ')'; c.fillRect(0, 0, W, H);
    c.save(); c.translate(0, (1 - a) * 50);
    UI.panel(c, 150, 60, 980, 600);
    drawFrame(c, 'package', 230, 140, { h: 90, ay: 0.5 });
    UI.text(c, Lang.t('Delivery order!', '¡Pedido de entrega!'), W / 2 + 40, 110, { size: 46, color: COL.gold });
    UI.para(c, o.q.q, 190, 160, 900, 150, { size: 32, min: 17, weight: 800 });
    o.targets.forEach((b, i) => { const y = 330 + i * 92;
      UI.panel(c, 190, y, 900, 80, { r: 16, drop: 4, lw: 4, fill: '#fff' });
      c.fillStyle = GCOL[i]; UI.rr(c, 200, y + 10, 60, 60, 12); c.fill(); UI.text(c, GLET[i], 230, y + 42, { size: 38, stroke: 0 });
      UI.para(c, o.q.choices[i], 272, y + 6, 600, 68, { size: 24, min: 13, align: 'left', weight: 700 });
      drawFrame(c, b.spr, 925, y + 76, { h: 72 }); UI.text(c, Lang.of(b.name), 1030, y + 40, { size: 17, color: COL.ink, stroke: 0 }); });
    UI.text(c, Lang.t('Drive the package to the building with the right answer!', '¡Lleva el paquete al edificio con la respuesta correcta!'), W / 2, 630, { size: 22, color: COL.ink, stroke: 0, font: BODY });
    c.restore();
  }
  S.draw = function (c) {
    c.save(); if (S.shake > 0) c.translate(rand(-1, 1) * S.shake * 20, rand(-1, 1) * S.shake * 20);
    drawGround(c); drawWorld(c); c.restore();
    drawHUD(c); Touch.draw(c);
    if (S.card) drawCard(c);
    if (S.over && S.endT > 0.3) UI.text(c, S.won ? Lang.t('SHIFT DONE!', '¡TURNO TERMINADO!') : Lang.t("TIME'S UP!", '¡SE ACABÓ!'), W / 2, 320, { size: 100, color: S.won ? COL.gold : COL.bad, stroke: 16 });
  };
  S.debug = () => ({ car: { x: S.car.x, y: S.car.y, a: S.car.a, fwd: S.fwd }, time: S.time, pkg: S.pkg, order: S.order ? { a: S.order.q.a, doors: S.order.targets.map(b => b.door) } : null,
    card: !!S.card, delivered: S.delivered, right: S.right, over: S.over, won: S.won, traffic: S.traffic.length });
  return S;
}

const GE = {
  id: 'grenadier_express', color: '#FFD23F', bgColor: '#2EC4B6', music: GSONG,
  title: { en: 'Grenadier Express', es: 'Grenadier Express' },
  tagline: { en: 'Campus delivery. Right answer, right building.', es: 'Entregas en el campus. Respuesta correcta, edificio correcto.' },
  howto: {
    en: ['Drive the golf cart: ↑ gas, ↓ brake / reverse, ← → steer (or WASD). On a touchscreen, drag the left stick where you want to go.',
         'Follow the arrow to the gold ring and grab the package. It comes with a question.',
         'Three buildings light up as A, B and C. Deliver to the building with the right answer: +15 seconds!',
         'Wrong building costs 8 seconds. Bumping the bus or other carts costs 2.',
         'Hold Space (DRIFT) while turning at speed to slide around corners. Let go for a speed boost.',
         'Deliver 8 packages before the clock hits zero to finish your shift. ⏱ adds 5 seconds.'],
    es: ['Maneja el carrito: ↑ acelera, ↓ frena / reversa, ← → gira (o WASD). En pantalla táctil, arrastra el control izquierdo hacia donde quieras ir.',
         'Sigue la flecha hasta el aro dorado y toma el paquete. Trae una pregunta.',
         'Tres edificios se marcan como A, B y C. Entrega en el edificio con la respuesta correcta: ¡+15 segundos!',
         'El edificio equivocado cuesta 8 segundos. Chocar con el autobús u otros carritos cuesta 2.',
         'Mantén Espacio (DERRAPE) al girar rápido para deslizarte. Suelta para un turbo.',
         'Entrega 8 paquetes antes de que el reloj llegue a cero. ⏱ suma 5 segundos.'] },
  play() { return newShift(); },
  titleArt(c, t) {
    const g = Art.img.grass; if (g) { if (!GE._pat) GE._pat = c.createPattern(g, 'repeat'); c.save(); c.translate(-(t * 40) % 256, 0); c.fillStyle = GE._pat; c.fillRect(0, 0, W + 256, H); c.restore(); }
    c.fillStyle = '#5B5F6E'; c.fillRect(0, 520, W, 150); c.fillStyle = '#FFD23F'; for (let x = -((t * 300) % 120); x < W; x += 120) c.fillRect(x, 592, 60, 6);
    drawFrame(c, 'b_office', 180, 520, { h: 330 }); drawFrame(c, 'b_library', 1100, 520, { h: 330 });
    drawFrame(c, 'cart', 300 + ((t * 260) % (W + 400)) - 200, 560, { h: 110, rot: Math.PI / 2, ay: 0.5 });
    drawFrame(c, 'bus', W - ((t * 180) % (W + 500)) + 200, 630, { h: 170, rot: -Math.PI / 2, ay: 0.5 });
  }
};
Game.boot(GE);
