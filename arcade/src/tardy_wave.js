/* ============================================================================
   TARDY WAVE — a three-lane hallway runner.
   The bell rang. A wave of homework is chasing you to class. Switch lanes,
   jump the clutter, and run through the right Answer Door to push the wave
   back. Four zones (hallway, cafeteria, gym, library), three doors each.
   ========================================================================== */
const PX = 430;                         /* player's screen x */
const LANE_Y = [478, 590, 702];         /* feet y for lanes A (back), B, C (front) */
const LANE_S = [0.78, 0.89, 1.0];       /* depth scale per lane */
const FLOOR_Y = 404;
const LETTERS = ['A', 'B', 'C'];
const LCOL = ['#3A86FF', '#FF8C42', '#9B5DE5'];
const DOFF = [230, 0, -230];          /* doors stand in a diagonal so none hides another */
const ZONES = [
  { key: 'hallway', name: { en: 'The Hallway', es: 'El pasillo' }, floorAt: 540, floor: ['#C9D6E3', '#B4C4D6', '#9FB1C6'],
    obs: [['locker', 'tall', 175], ['wetsign', 'low', 100], ['mop', 'low', 112], ['bags', 'low', 82]] },
  { key: 'cafeteria', name: { en: 'The Cafeteria', es: 'La cafetería' }, floorAt: 600, floor: ['#F4ECD8', '#E6DABE', '#D8C9A6'],
    obs: [['trays', 'tall', 150], ['spaghetti', 'low', 38], ['trashcan', 'low', 108], ['lunchcart', 'tall', 140]] },
  { key: 'gym', name: { en: 'The Gym', es: 'El gimnasio' }, floorAt: 620, floor: ['#E2A869', '#D4945A', '#C4834B'],
    obs: [['ballrack', 'tall', 140], ['dodgeballs', 'low', 84], ['hurdle', 'low', 96], ['gymmat', 'low', 56]] },
  { key: 'library', name: { en: 'The Library', es: 'La biblioteca' }, floorAt: 660, floor: ['#7D8C8C', '#6D7C7C', '#5E6C6C'],
    obs: [['bookcart', 'tall', 150], ['bookshelf', 'tall', 130], ['globe', 'low', 112], ['beanbag', 'low', 84]] }
];
const DOORS_PER_ZONE = 3;
const SONG = { bpm: 152,
  bass: [48, 0, 48, 0, 55, 0, 48, 0, 53, 0, 53, 0, 55, 0, 52, 0],
  lead: [72, 0, 76, 79, 0, 76, 74, 0, 72, 0, 69, 72, 0, 74, 76, 0, 77, 0, 76, 74, 0, 72, 74, 0, 76, 0, 72, 0, 67, 0, 0, 0],
  drum: 'k.h.s.h.k.k.s.h.' };

function laneOfY(y) { let b = 0; for (let i = 1; i < 3; i++) if (Math.abs(y - LANE_Y[i]) < Math.abs(y - LANE_Y[b])) b = i; return b; }
function scaleAtY(y) { return lerp(LANE_S[0], LANE_S[2], (y - LANE_Y[0]) / (LANE_Y[2] - LANE_Y[0])); }

/* ---------------- one run ---------------- */
function newRun(startZone) {
  startZone = startZone || 0;
  const R = {
    name: 'play', playing: true,
    x: 0, speed: 470, base: 470, zone: startZone, zoneFade: 1, prevZone: startZone,
    lane: 1, y: LANE_Y[1], z: 0, vz: 0, hold: 0, grounded: true,
    trip: 0, inv: 0, boost: 0, anim: 0, cheer: 0,
    wave: 380, waveAnim: 0, creep: 0.01,
    objs: [], genX: 900, doors: [], doorIdx: startZone * DOORS_PER_ZONE, doorsTotal: ZONES.length * DOORS_PER_ZONE,
    nextDoorX: 5200, banner: null, bannerT: 0, feedback: null, coins: 0, right: 0, wrong: 0, t: 0, over: false, endT: 0,
    finishX: null, shake: 0, startZone,
    swipe: null
  };
  R.enter = function () {
    Touch.set([
      { id: 'up', x: 96, y: 500, r: 60, label: '▲', act: 'up' },
      { id: 'down', x: 96, y: 646, r: 60, label: '▼', act: 'down' },
      { id: 'jump', x: 1166, y: 606, r: 86, label: Lang.t('JUMP', 'SALTA'), act: 'jump' }
    ]);
    Audio2.play(SONG); FX.clear();
  };
  R.resume = function () { R.enter(); };
  R.quit = function () { Game.go(Screens.title(TW)); };

  /* ---------- content generation ---------- */
  function addDoorEvent(at) {
    const ev = { x: at, q: null, done: false, chosen: -1, ok: false, t: 0 };
    R.doors.push(ev);
  }
  function generate() {
    while (R.genX < R.x + 2600) {
      const nearDoor = R.doors.some(d => !d.done && R.genX > d.x - 1000 && R.genX < d.x + 350) || (R.nextDoorX && R.genX > R.nextDoorX - 1000 && R.genX < R.nextDoorX + 350);
      if (R.finishX && R.genX > R.finishX - 900) { R.genX += 300; continue; }
      if (!nearDoor) {
        const z = ZONES[R.zone], diff = clamp((R.doorIdx - R.startZone * DOORS_PER_ZONE) / 9 + R.zone * 0.12, 0, 1);
        const r = Math.random();
        if (r < 0.22 + diff * 0.15) {           /* two lanes blocked: one is open */
          const open = randi(0, 2);
          for (let l = 0; l < 3; l++) if (l !== open) { const o = pick(z.obs); R.objs.push({ k: 'obs', name: o[0], kind: o[1], h: o[2], lane: l, x: R.genX + (l === 1 ? 30 : 0) }); }
          coinRow(open, R.genX - 140, 4);
        } else if (r < 0.75) {                  /* one obstacle */
          const o = pick(z.obs), l = randi(0, 2);
          R.objs.push({ k: 'obs', name: o[0], kind: o[1], h: o[2], lane: l, x: R.genX });
          if (Math.random() < 0.6) coinRow((l + randi(1, 2)) % 3, R.genX - 200, 5);
          else if (o[1] === 'low') coinArc(l, R.genX);
        } else coinRow(randi(0, 2), R.genX, 6);
        if (Math.random() < 0.07) R.objs.push({ k: 'pick', name: Math.random() < 0.55 ? 'boost' : 'clock', lane: randi(0, 2), x: R.genX + 260 });
      }
      R.genX += rand(560, 820) - clamp(R.zone * 40 + R.doorIdx * 6, 0, 200);
      if (R.nextDoorX && R.genX > R.nextDoorX - 1000) { addDoorEvent(R.nextDoorX); R.genX = R.nextDoorX + 420; R.nextDoorX = null; }
    }
  }
  function coinRow(lane, x, n) { for (let i = 0; i < n; i++) R.objs.push({ k: 'coin', lane, x: x + i * 70, zc: 0 }); }
  function coinArc(lane, x) { for (let i = 0; i < 5; i++) R.objs.push({ k: 'coin', lane, x: x - 140 + i * 70, zc: Math.sin(i / 4 * Math.PI) * 130 }); }

  /* ---------- per frame ---------- */
  R.update = function () {
    if (wantsPause()) return Game.go(Screens.pause(TW, R));
    R.t += DT; R.anim += DT; R.waveAnim += DT; FX.update();
    if (R.over) { R.endT += DT; if (R.endT > (R.won ? 2.2 : 1.6)) finish(); return; }
    R.zoneFade = Math.min(1, R.zoneFade + DT * 1.2);

    /* controls: lane switch (works mid-air), jump with buffer and hold */
    let swipeUp = false, swipeDown = false, tapJump = false;
    const p = Input.pointer;
    if (p.pressed) R.swipe = { x: p.x, y: p.y, t: 0, used: false };
    if (R.swipe && p.down) { R.swipe.t += DT; const dy = p.y - R.swipe.y; if (!R.swipe.used && Math.abs(dy) > 55) { R.swipe.used = true; if (dy < 0) swipeUp = true; else swipeDown = true; } }
    if (p.released && R.swipe) { if (!R.swipe.used && R.swipe.t < 0.3 && !inRect(p.x, p.y, PAUSE_RECT)) tapJump = true; R.swipe = null; }
    if (R.trip <= 0) {
      if ((Input.pressed('up') || swipeUp) && R.lane > 0) { R.lane--; Audio2.sfx('lane'); }
      if ((Input.pressed('down') || swipeDown) && R.lane < 2) { R.lane++; Audio2.sfx('lane'); }
    }
    if ((Input.buffered('jump', 0.12) || tapJump) && R.grounded && R.trip <= 0) { R.vz = 880; R.grounded = false; R.hold = 0; Audio2.sfx('jump'); }
    if (!R.grounded) {
      const holding = (Input.held('jump')) && R.hold < 0.2 && R.vz > 0;
      R.hold += DT; R.vz -= (holding ? 1300 : 2700) * DT; R.z += R.vz * DT;
      if (R.z <= 0) { R.z = 0; R.vz = 0; R.grounded = true; Audio2.sfx('land'); }
    }
    R.y = approach(R.y, LANE_Y[R.lane], 900 * DT);

    /* speed + the wave */
    R.base = 470 + R.zone * 28 + Math.min(60, R.t * 0.6);
    R.trip = Math.max(0, R.trip - DT); R.inv = Math.max(0, R.inv - DT); R.boost = Math.max(0, R.boost - DT); R.cheer = Math.max(0, R.cheer - DT);
    R.speed = R.base * (R.trip > 0 ? 0.62 : R.boost > 0 ? 1.4 : 1);
    /* the wave creeps up; when it's right behind you, adrenaline lets you pull away a little */
    const creep = R.wave > 300 ? R.creep + R.zone * 0.003 : R.wave > 260 ? 0 : -0.02;
    const waveSpeed = R.base * (1 + creep);
    R.wave = Math.min(560, R.wave + (R.speed - waveSpeed) * DT);
    R.x += R.speed * DT;
    R.shake = Math.max(0, R.shake - DT);
    if (R.wave <= 0) return lose();

    generate();

    /* door events: show the question in time to read it */
    const readDist = R.speed * 8.5;
    for (const d of R.doors) {
      if (!d.q && d.x - R.x < readDist) { d.q = Q.next(3); R.banner = d; R.bannerT = 0; Audio2.sfx('select'); }
      if (!d.done && R.x >= d.x + DOFF[laneOfY(R.y)]) passDoor(d);
      if (d.done) d.t += DT;
    }
    R.bannerT += DT;
    if (R.feedback) { R.feedback.t += DT; if (R.feedback.t > (R.feedback.ok ? 2 : 4.5)) R.feedback = null; }

    /* collisions */
    const pl = laneOfY(R.y), midSwitch = Math.abs(R.y - LANE_Y[pl]) > 40;
    for (const o of R.objs) {
      if (o.gone) continue;
      const dx = o.x - R.x;
      if (dx < -400) { o.gone = true; continue; }
      if (o.lane !== pl || midSwitch) continue;
      if (o.k === 'coin') { if (Math.abs(dx) < 46 && Math.abs(R.z - o.zc) < 90) { o.gone = true; R.coins++; Audio2.sfx('coin'); FX.burst(PX, R.y - 120 - R.z, 5, '#FFD23F', 220, 0.4); } }
      else if (o.k === 'pick') { if (Math.abs(dx) < 60 && R.z < 120) { o.gone = true; pickup(o.name); } }
      else if (o.k === 'obs' && !o.hit) {
        const sz = frameSize(o.name), halfW = sz.w * (o.h / sz.h) * 0.3;
        if (Math.abs(dx) < halfW + 22) {
          const clear = o.kind === 'low' && R.z > o.h * 0.55;
          if (!clear) hitObstacle(o);
        }
      }
    }
    if (R.objs.length > 140) R.objs = R.objs.filter(o => !o.gone);

    /* finish line */
    if (R.finishX && R.x >= R.finishX) win();
  };

  function pickup(n) {
    if (n === 'boost') { R.boost = 2; R.inv = 2.2; Audio2.sfx('boost'); FX.pop(PX, R.y - 220, Lang.t('BOOST!', '¡TURBO!'), COL.gold); }
    else { R.wave = Math.min(560, R.wave + 110); Audio2.sfx('pickup'); FX.pop(PX, R.y - 220, Lang.t('+TIME', '+TIEMPO'), '#7FDBFF'); }
  }
  function hitObstacle(o) {
    if (R.boost > 0) { o.hit = true; o.fly = 1; Audio2.sfx('pop'); FX.burst(PX + 60, R.y - 60, 12, '#fff', 400, 0.5); return; }
    if (R.inv > 0) return;
    o.hit = true; o.fly = 1;
    R.trip = 0.6; R.inv = 1.4; R.shake = 0.3; R.vz = 0; R.z = 0; R.grounded = true;
    Audio2.sfx('hit'); FX.burst(PX + 30, R.y - 70, 14, '#fff', 380, 0.5);
  }
  function passDoor(d) {
    d.done = true; d.t = 0;
    const lane = laneOfY(R.y); d.chosen = lane; d.ok = !!d.q && lane === d.q.a;
    if (d.q) Q.mark(d.q, d.ok);
    R.doorIdx++;
    if (d.ok) {
      R.right++; R.wave = Math.min(560, R.wave + 210); R.boost = 1.4; R.inv = 1.6; R.cheer = 0.8; R.coins += 3;
      Audio2.sfx('good'); FX.confetti(PX + 40, R.y - 160, 30); FX.pop(PX, R.y - 260, Lang.t('CORRECT!', '¡CORRECTO!'), '#7CFC9A', 44);
    } else {
      R.wrong++; R.wave -= 120; R.trip = 0.5; R.inv = 1.4; R.shake = 0.45;
      Audio2.sfx('slam'); Audio2.sfx('bad'); FX.pop(PX, R.y - 260, Lang.t('SLAM!', '¡PUM!'), '#FF8C69', 44);
    }
    R.feedback = { ok: d.ok, q: d.q, t: 0 };
    if (R.banner === d) R.banner = null;
    /* zone change or the next door */
    const doneInZone = R.doorIdx - R.zone * DOORS_PER_ZONE;
    if (doneInZone >= DOORS_PER_ZONE) {
      if (R.zone + 1 < ZONES.length) {
        R.prevZone = R.zone; R.zone++; R.zoneFade = 0;
        Store.set('reached', Math.max(Store.get('reached', 0), R.zone));
        R.objs.push({ k: 'flag', lane: 0, x: d.x + 700 });
        FX.pop(W / 2, 200, ZONES[R.zone].name[Lang.code] || ZONES[R.zone].name.en, COL.gold, 46);
        R.nextDoorX = d.x + R.base * rand(15, 17);
      } else {
        R.finishX = d.x + 1500;
        R.objs.push({ k: 'classroom', lane: 1, x: R.finishX });
      }
    } else R.nextDoorX = d.x + R.base * rand(14, 16.5);
  }
  function lose() { R.over = true; R.won = false; R.endT = 0; R.wave = 0; Audio2.stop(); Audio2.sfx('slam'); R.shake = 0.6; }
  function win() { R.over = true; R.won = true; R.endT = 0; R.cheer = 9; Audio2.stop(); FX.confetti(PX, 300, 90); Store.set('reached', ZONES.length - 1); }
  function finish() {
    const score = Math.round(R.x / 20) + R.coins * 10 + R.right * 250 + (R.won ? 1500 : 0);
    Game.go(Screens.results(TW, {
      won: R.won, score,
      title: R.won ? Lang.t('Made it to class!', '¡Llegaste a clase!') : Lang.t('Caught by the Tardy Wave!', '¡Te atrapó la Ola Tardía!'),
      lines: [[Lang.t('Answer Doors right', 'Puertas correctas'), R.right + ' / ' + (R.right + R.wrong)], [Lang.t('Coins grabbed', 'Monedas'), R.coins],
              [Lang.t('Distance', 'Distancia'), Math.round(R.x / 10) + ' m'], [Lang.t('Farthest zone', 'Zona más lejana'), Lang.of(ZONES[R.zone].name)]],
      coins: Math.floor(R.right / 2) + (R.won ? 2 : 0), xp: R.right * 8 + (R.zone - R.startZone) * 10 + (R.won ? 20 : 0),
      badge: R.won ? 'tardy_wave_on_time' : null,
      again: () => newRun(R.startZone)
    }));
  }

  /* ---------- drawing ---------- */
  function drawBg(c, zi, alpha) {
    const z = ZONES[zi], im = Art.img[z.key]; if (!im) return;
    const k = (FLOOR_Y + 10) / z.floorAt, bw = im.width * k, bh = im.height * k;
    const off = -((R.x * 0.35) % bw);
    c.globalAlpha = alpha;
    for (let x = off; x < W; x += bw - 1) c.drawImage(im, x, 0, bw, bh);
    /* floor */
    const fy = FLOOR_Y;
    let g = z.grad; if (!g) { g = z.grad = c.createLinearGradient(0, fy, 0, H); g.addColorStop(0, z.floor[0]); g.addColorStop(0.5, z.floor[1]); g.addColorStop(1, z.floor[2]); }
    c.fillStyle = g; c.fillRect(0, fy, W, H - fy);
    c.globalAlpha = alpha * 0.35; c.strokeStyle = COL.ink; c.lineWidth = 2; c.beginPath();
    const seam = 180, so = -(R.x % seam);
    for (let x = so - 400; x < W + 400; x += seam) { c.moveTo(x, fy); c.lineTo(x + (x - 640) * 0.45, H); }
    c.stroke();
    c.globalAlpha = alpha * 0.45; c.fillStyle = '#fff'; c.fillRect(0, (LANE_Y[0] + LANE_Y[1]) / 2 - 2, W, 4); c.fillRect(0, (LANE_Y[1] + LANE_Y[2]) / 2 - 2, W, 4);
    c.globalAlpha = 1;
    c.fillStyle = 'rgba(43,45,66,.85)'; c.fillRect(0, fy - 4, W, 8);
  }
  function sx(wx) { return PX + (wx - R.x); }
  function drawObj(c, o) {
    const s = LANE_S[o.lane], x = sx(o.x), y = LANE_Y[o.lane];
    if (x < -300 || x > W + 300) return;
    if (o.k === 'obs') {
      let yy = y, rot = 0, al = 1;
      if (o.fly) { o.fly += DT; const t = o.fly - 1; yy -= 600 * t - 900 * t * t; rot = t * 7; al = clamp(1.5 - t * 1.5, 0, 1); if (al <= 0) { o.gone = true; return; } }
      shadow(c, x, y, 50 * s);
      drawFrame(c, o.name, x + (o.fly ? (o.fly - 1) * 500 : 0), yy, { h: o.h * s, rot, alpha: al });
    } else if (o.k === 'coin') {
      const bob = Math.sin(R.anim * 6 + o.x * 0.01) * 5;
      drawFrame(c, 'coin', x, y - 40 * s - o.zc * s + bob, { h: 46 * s, ay: 0.5, s: 1 });
    } else if (o.k === 'pick') {
      shadow(c, x, y, 30 * s);
      drawFrame(c, o.name, x, y - 70 * s + Math.sin(R.anim * 5) * 8, { h: 74 * s, ay: 0.5 });
    } else if (o.k === 'flag') {
      drawFrame(c, 'flag', x, FLOOR_Y + 60, { h: 150 });
      UI.text(c, Lang.t('CHECKPOINT', 'PUNTO DE CONTROL'), x, FLOOR_Y - 110, { size: 24, color: COL.gold });
    } else if (o.k === 'classroom') {
      drawFrame(c, 'door_open', x + 120, LANE_Y[2] + 10, { h: 420 });
      UI.text(c, Lang.t("ROOM 101 · MR. SMITH", 'SALÓN 101 · SR. SMITH'), x + 120, LANE_Y[2] - 440, { size: 30, color: COL.gold });
    }
  }
  function shadow(c, x, y, r) { drawShadow(c, x, y, r, r * 0.25, 0.22); }
  function drawDoors(c, d, lane) {
    const x = sx(d.x + DOFF[lane]) + 40; if (x < -300 || x > W + 300) return;
    const s = LANE_S[lane], y = LANE_Y[lane] + 6, h = 205 * s;
    let name = 'door';
    if (d.done && d.chosen === lane) name = d.ok ? 'door_open' : 'door_slam';
    else if (d.done && d.q && lane === d.q.a) name = 'door_open';
    drawFrame(c, name, x, y, { h });
    const ps = 30 * s;
    c.fillStyle = LCOL[lane]; UI.rr(c, x - ps, y - h - ps * 1.6, ps * 2, ps * 1.6, 8); c.fill(); c.lineWidth = 3; c.strokeStyle = COL.ink; c.stroke();
    UI.text(c, LETTERS[lane], x, y - h - ps * 0.8, { size: ps * 1.2, stroke: 3 });
  }
  function drawPlayer(c) {
    const s = scaleAtY(R.y) * 0.72, y = R.y - R.z;
    shadow(c, PX, R.y, 46 * s * (1 - Math.min(0.5, R.z / 400)));
    let f;
    if (R.over && !R.won) f = 'trip1';
    else if (R.cheer > 0 && R.grounded) f = Math.floor(R.anim * 6) % 2 ? 'cheer0' : 'cheer1';
    else if (R.trip > 0) f = R.trip > 0.3 ? 'trip0' : 'trip1';
    else if (!R.grounded) f = R.vz > 300 ? 'jump0' : R.vz > 0 ? 'jump1' : R.vz > -400 ? 'jump2' : 'jump3';
    else f = 'run' + (Math.floor(R.anim * R.speed / 45) % 9);
    const blink = R.inv > 0 && R.trip <= 0 && R.boost <= 0 && Math.floor(R.t * 14) % 2 === 0;
    if (R.boost > 0) { c.globalAlpha = 0.35; drawFrame(c, f, PX - 34, y, { s, flash: 1, flashColor: '#FFD23F' }); drawFrame(c, f, PX - 64, y, { s, flash: 1, flashColor: '#FF8C42', alpha: 0.6 }); c.globalAlpha = 1; }
    drawFrame(c, f, PX, y, { s, alpha: blink ? 0.45 : 1 });
    Head.draw(c, f, PX, y, s, 1, blink ? 0.45 : 1);
  }
  function drawWave(c) {
    const right = PX - R.wave + 70, f = 'wave' + (Math.floor(R.waveAnim * 7) % 4), sz = frameSize(f), h = 500, w = sz.w * h / sz.h;
    if (right < -40) return;
    drawFrame(c, f, right - w / 2, H + 20 + Math.sin(R.waveAnim * 3) * 8, { h });
    c.fillStyle = '#DDEFFF'; c.fillRect(0, H - 200, Math.max(0, right - w + 40), 200);
  }
  function drawBanner(c) {
    const d = R.banner; if (!d || !d.q) return;
    const a = ease(R.bannerT * 3), y0 = -170 + a * 180;
    UI.panel(c, 150, y0, 980, 190, { fill: COL.cream, r: 20 });
    const toGo = Math.max(0, (d.x - R.x) / R.speed);
    UI.para(c, d.q.q, 170, y0 + 8, 940, 64, { size: 27, min: 15, weight: 800 });
    for (let i = 0; i < 3; i++) {
      const bx = 170, by = y0 + 76 + i * 36;
      c.fillStyle = LCOL[i]; UI.rr(c, bx, by, 30, 30, 8); c.fill();
      UI.text(c, LETTERS[i], bx + 15, by + 16, { size: 20, stroke: 0 });
      UI.para(c, d.q.choices[i], bx + 40, by, 900, 32, { size: 21, min: 12, align: 'left', weight: 700 });
    }
    if (toGo < 3.2 && Math.floor(R.t * 6) % 2) UI.text(c, Lang.t('DOORS AHEAD!', '¡PUERTAS!'), W / 2, y0 + 210, { size: 30, color: COL.gold });
  }
  function drawFeedback(c) {
    const f = R.feedback; if (!f || !f.q || R.banner) return;
    const a = ease(f.t * 4) * clamp((f.ok ? 2 : 4.5) - f.t, 0, 1) * 2;
    c.save(); c.globalAlpha = clamp(a, 0, 1);
    UI.panel(c, 230, 18, 820, f.ok ? 70 : 150, { fill: f.ok ? '#D7F8DF' : '#FFE1D9' });
    UI.text(c, (f.ok ? '✓ ' : '✗ ') + LETTERS[f.q.a] + ': ' + f.q.choices[f.q.a], W / 2, 52, { size: 24, color: COL.ink, stroke: 0, font: BODY, weight: 800 });
    if (!f.ok && f.q.why) UI.para(c, f.q.why, 250, 76, 780, 84, { size: 20, min: 12, weight: 600, color: '#3D3F55' });
    c.restore();
  }
  function drawHUD(c) {
    if (!R.banner && !R.feedback) {
      /* progress: doors done / total, and how close the wave is */
      UI.panel(c, 20, 16, 380, 66, { r: 16, drop: 5, lw: 4 });
      UI.text(c, Lang.of(ZONES[R.zone].name), 34, 36, { size: 22, color: COL.ink, stroke: 0, align: 'left' });
      for (let i = 0; i < R.doorsTotal; i++) { c.fillStyle = i < R.doorIdx ? COL.gold : '#D8D3C4'; c.beginPath(); c.arc(40 + i * 29, 62, 10, 0, 7); c.fill(); c.lineWidth = 2; c.strokeStyle = COL.ink; c.stroke(); }
    }
    const danger = 1 - clamp(R.wave / 560, 0, 1), hy = R.banner ? 214 : R.feedback ? (R.feedback.ok ? 100 : 180) : 88;
    UI.panel(c, W - 330, hy, 300, 50, { r: 14, drop: 4, lw: 4 });
    drawFrame(c, 'coin', W - 300, hy + 25, { h: 34, ay: 0.5 });
    UI.text(c, String(R.coins), W - 270, hy + 26, { size: 28, color: COL.ink, stroke: 0, align: 'left' });
    UI.text(c, Lang.t('WAVE', 'OLA'), W - 160, hy + 26, { size: 20, color: COL.ink, stroke: 0 });
    UI.bar(c, W - 130, hy + 16, 90, 20, danger, danger > 0.7 ? COL.bad : '#7FDBFF');
    if (danger > 0.75 && Math.floor(R.t * 5) % 2) { c.fillStyle = 'rgba(228,87,46,.18)'; c.fillRect(0, 0, W, H); }
    drawPauseBtn(c);
  }
  R.draw = function (c) {
    c.save();
    if (R.shake > 0) c.translate(rand(-1, 1) * R.shake * 22, rand(-1, 1) * R.shake * 14);
    drawBg(c, R.prevZone, 1); if (R.zoneFade < 1 || R.prevZone !== R.zone) drawBg(c, R.zone, R.zoneFade);
    const pl = laneOfY(R.y);
    for (let lane = 0; lane < 3; lane++) {
      for (const d of R.doors) if (d.x - R.x < 2600 && (!d.done || d.t < 3)) drawDoors(c, d, lane);
      for (const o of R.objs) if (!o.gone && o.lane === lane) drawObj(c, o);
      if (lane === pl) drawPlayer(c);
    }
    drawWave(c);
    FX.draw(c);
    c.restore();
    drawBanner(c); drawFeedback(c); drawHUD(c);
    Touch.draw(c);
    if (R.over && R.endT > 0.4) UI.text(c, R.won ? Lang.t('ON TIME!', '¡A TIEMPO!') : Lang.t('TARDY!', '¡TARDE!'), W / 2, 330, { size: 110, color: R.won ? COL.gold : COL.bad, stroke: 16 });
  };
  R.debug = () => ({ x: R.x, lane: R.lane, wave: R.wave, zone: R.zone, doorIdx: R.doorIdx, right: R.right, wrong: R.wrong, coins: R.coins, over: R.over, won: R.won,
    banner: R.banner && R.banner.q ? { a: R.banner.q.a, x: R.banner.x } : null, nextObs: R.objs.filter(o => !o.gone && o.k === 'obs' && !o.hit && o.x > R.x - 30 && o.x < R.x + 500).map(o => ({ lane: o.lane, dx: o.x - R.x, kind: o.kind })) });
  return R;
}

/* ---------------- the game definition ---------------- */
const TW = {
  id: 'tardy_wave', color: '#7FDBFF', bgColor: '#3A86FF', music: SONG,
  title: { en: 'Tardy Wave', es: 'Ola Tardía' },
  tagline: { en: 'The bell rang. RUN!', es: 'Sonó el timbre. ¡CORRE!' },
  levelSelect: true, levelsTitle: { en: 'Start from a checkpoint', es: 'Empieza desde un punto de control' },
  levels: ZONES.map(z => ({ name: z.name })),
  howto: {
    en: ['A wave of homework is chasing you to class. If it catches you, you\'re tardy!',
         '↑ / ↓ (or W / S, or swipe) to switch lanes. Space / tap / JUMP to jump; hold it to jump higher.',
         'Jump the low stuff. Lockers, carts and shelves are too tall: switch lanes around them.',
         'Answer Doors: a question appears at the top. Get in the lane of the right answer (A top, B middle, C front) before the doors.',
         'Right door = speed boost and the wave falls back. Wrong door = SLAM, and the wave gains.',
         '⚡ boosts you through anything. ⏰ pushes the wave back. Reach Room 101 to win!'],
    es: ['Una ola de tareas te persigue hasta clase. Si te alcanza, ¡llegas tarde!',
         '↑ / ↓ (o W / S, o desliza) para cambiar de carril. Espacio / toca / SALTA para saltar; mantén para saltar más alto.',
         'Salta lo bajo. Los casilleros, carritos y estantes son muy altos: cambia de carril.',
         'Puertas de respuesta: arriba aparece una pregunta. Ponte en el carril de la respuesta correcta (A arriba, B en medio, C al frente).',
         'Puerta correcta = turbo y la ola se queda atrás. Puerta incorrecta = ¡PUM!, y la ola se acerca.',
         '⚡ te hace atravesar todo. ⏰ aleja la ola. ¡Llega al salón 101 para ganar!'] },
  play(zone) { return newRun(zone || 0); },
  titleArt(c, t) {
    const im = Art.img.hallway; if (im) { const k = H / im.height; const bw = im.width * k, off = -((t * 160) % bw); for (let x = off; x < W; x += bw - 1) c.drawImage(im, x, 0, bw, H); }
    c.fillStyle = 'rgba(58,134,255,.25)'; c.fillRect(0, 0, W, H);
    drawFrame(c, 'wave' + (Math.floor(t * 7) % 4), 180, H + 30, { h: 470 });
    const f = 'run' + (Math.floor(t * 12) % 9); drawFrame(c, f, 1050, 700, { s: 0.9 }); Head.draw(c, f, 1050, 700, 0.9, 1);
  }
};
Game.boot(TW);
