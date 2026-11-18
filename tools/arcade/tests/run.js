/* Arcade checks: node tools/arcade/tests/run.js  (needs a server on :8765 from the repo root)
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/arcade/tests/run.js
   1. each game loads with no errors and reaches its title screen
   2. bots play whole runs: right answers should win / go far, wrong answers should lose
   3. rewards land in the world outbox, capped per run
   4. the hub charges 1 coin, opens the frame, pays out, and the game's exit button returns
   5. frame rate with the CPU throttled (Chromebook-ish) stays playable */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const BASE = process.env.BASE || 'http://localhost:8765/';
const bot = n => fs.readFileSync(path.join(__dirname, n), 'utf8');
const results = []; let fail = 0;
const check = (name, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + name + (info ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  async function open(game) {
    const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(BASE + 'arcade/' + game + '.html');
    await p.waitForFunction(() => window.ARC && ARC.screen === 'title', null, { timeout: 20000 });
    return { p, errs };
  }
  async function run(game, file, arg) {
    const { p, errs } = await open(game);
    await p.evaluate(() => localStorage.clear());
    const r = await p.evaluate(`(${bot(file)})(${JSON.stringify(arg)})`);
    r.outbox = await p.evaluate(() => JSON.parse(localStorage.getItem('world.outbox') || '[]'));
    await p.close(); r.errs = errs; return r;
  }
  for (const g of ['tardy_wave', 'grenadier_express', 'misconception_panic']) { const { p, errs } = await open(g); check(g + ' loads clean', !errs.length, errs); await p.close(); }

  let r = await run('tardy_wave', 'tw_bot.js', 'good');
  check('tardy_wave: right answers reach class', r.won && r.right === 12, { right: r.right, sim: r.simSeconds });
  check('tardy_wave: award in outbox, capped at 5', r.outbox.some(e => e.type === 'award' && e.coins <= 5 && e.coins > 0), r.paid);
  r = await run('tardy_wave', 'tw_bot.js', 'bad');
  check('tardy_wave: wrong answers get you caught', !r.won && r.over && r.wrong >= 2 && r.wrong <= 5, { wrong: r.wrong, sim: r.simSeconds });

  r = await run('grenadier_express', 'ge_bot.js', 'good');
  if (r.delivered < 2) r = await run('grenadier_express', 'ge_bot.js', 'good');   /* the bot's driving is crude: one retry */
  check('grenadier_express: deliveries happen and the shift ends', r.over && r.delivered >= 2, { delivered: r.delivered, right: r.right, won: r.won });
  r = await run('grenadier_express', 'ge_bot.js', 'bad');
  check('grenadier_express: wrong buildings never count as right', r.right === 0 && r.delivered >= 1, { delivered: r.delivered });

  r = await run('misconception_panic', 'mp_bot.js', { mode: 'good' });
  check('misconception_panic: levels up through questions and survives a while', r.level >= 5 && r.t >= 60, { t: r.t, level: r.level, kills: r.kills, won: r.won });
  r = await run('misconception_panic', 'mp_bot.js', { mode: 'bad' });
  check('misconception_panic: wrong answers give no power-up choice', r.lv.eraser === 0 && r.lv.ruler === 0 && r.lv.book === 0, r.lv);

  /* hub flow */
  {
    const p = await b.newPage({ viewport: { width: 1366, height: 768 } });
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(BASE + 'index.html');
    await p.waitForFunction(() => typeof playArc3 === 'function', null, { timeout: 20000 });
    await p.evaluate(() => { localStorage.removeItem('world.outbox'); S.tokens = 3; S.arcDay = null; save(); go('arcade'); });
    const cards = await p.evaluate(() => document.querySelectorAll('#view .gcover').length);
    check('hub: three arcade cards', cards === 3, { cards });
    await p.evaluate(() => playArc3('tardy_wave'));
    const fr = await (await p.waitForSelector('#arc3frame')).contentFrame();
    await fr.waitForFunction(() => window.ARC && ARC.screen === 'title', null, { timeout: 20000 });
    const t1 = await p.evaluate(() => S.tokens);
    check('hub: a play costs 1 coin', t1 === 2, { tokens: t1 });
    await fr.evaluate(`(${bot('tw_bot.js')})('good')`);
    await p.waitForTimeout(600);
    const t2 = await p.evaluate(() => ({ tokens: S.tokens, arcDay: S.arcDay }));
    check('hub: game pays coins back through the outbox', t2.tokens > t1 && t2.arcDay && t2.arcDay.n <= 15, t2);
    await fr.evaluate(() => ARC.Game.exit()); await p.waitForTimeout(400);
    const tab = await p.evaluate(() => TAB);
    check('hub: Back to arcade returns to the arcade', tab === 'arcade', { tab });
    check('hub: no page errors', !errs.length, errs);
    await p.close();
  }

  /* frame rate with the CPU throttled 2x and a busy screen */
  for (const g of ['tardy_wave', 'grenadier_express', 'misconception_panic']) {
    const { p } = await open(g);
    await p.evaluate((g) => {
      localStorage.removeItem('arc.' + g + '.quality'); ARC.Game.q = 1; ARC.Game.fit(); ARC.press('ok'); const S = ARC.state;
      if (g === 'misconception_panic') { S.t = 230; S.p.hp = 999; S.lv.chalk = 0; S.xp = -1e9; ARC.step(60 * 30); S.p.hp = 999; S.lv.chalk = 4; S.lv.eraser = 3; S.lv.book = 2; }
      if (g === 'tardy_wave') { S.inv = 1e9; ARC.step(600); }
      if (g === 'grenadier_express') { ARC.Input.virt.up = true; ARC.step(300); }
      setInterval(() => { if (S.p) S.p.hp = 999; if (g === 'tardy_wave') S.inv = 1e9; ARC.Input.virt.left = Math.random() < 0.5; ARC.Input.virt.right = !ARC.Input.virt.left; }, 400);
    }, g);
    const cdp = await p.context().newCDPSession(p);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 2 });
    await p.waitForTimeout(3000);
    const fps = []; for (let i = 0; i < 4; i++) { await p.waitForTimeout(1000); fps.push(Math.round(await p.evaluate(() => ARC.fps))); }
    const avg = fps.reduce((a, x) => a + x, 0) / fps.length;
    check(g + ': playable frame rate at 2x CPU throttle (software canvas)', avg >= 40, { fps, q: await p.evaluate(() => ARC.Game.q) });
    await p.close();
  }
  console.log(results.join('\n'));
  console.log(fail ? fail + ' FAILED' : 'all passed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
