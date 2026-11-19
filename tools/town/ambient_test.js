/* A living, learning plaza (practice mode):
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/ambient_test.js */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';
const SHOTS = process.env.SHOTS || '/tmp';
const results = []; let fail = 0;
const check = (n, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1200, height: 900 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  await ctx.route(/firebaseio|googleapis|gstatic/, r => r.abort());
  const errs = [];
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && window.AMBIENT, null, { timeout: 20000 });
  await p.evaluate(() => { localStorage.removeItem('town.db'); document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); });
  const T = p; const code = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test'); const c = (await TOWN.net.createClass('Period 7')).code; await TOWN.net.teacherSignOut(); TEACHER_OK = false; return c; });
  await p.evaluate(async code => { S.xp = 300; S.tokens = 50; S.myCourses = ['econ-h']; const r = await TOWN.net.join(code, 'Ana', 'R', '1234'); if (r.ok) await TOWN.boot(); go('town'); }, code);
  await p.waitForTimeout(2500); await p.evaluate(() => { townCloseCard(); townTab('plaza'); }); await p.waitForTimeout(800);
  const solve = () => p.evaluate(() => { const st = window._w2q; if (!st) return false; w2Ans(st.order.indexOf(st.q.a)); w2Next(); return true; });

  const npc0 = await p.evaluate(() => [...WORLD2.NPCS.coach.at]); await p.waitForTimeout(5000);
  const npc1 = await p.evaluate(() => [...WORLD2.NPCS.coach.at]);
  check('Coach Smith strolls around the plaza', Math.hypot(npc1[0] - npc0[0], npc1[1] - npc0[1]) > 5, { npc0, npc1 });
  /* townsfolk quiz */
  await p.evaluate(() => { AMBIENT.spawn(); const w = AMBIENT.walkers[AMBIENT.walkers.length - 1]; w.x = 400; w.v = 0.0001; });
  const t0 = await p.evaluate(() => S.tokens);
  await p.evaluate(() => { const w = AMBIENT.walkers[AMBIENT.walkers.length - 1]; TOWN.EXT.plazaTap.some(f => f(w.x, w.y - 10)); });
  const q = await p.evaluate(() => document.getElementById('certAsk').textContent); await p.screenshot({ path: SHOTS + '/a_quiz.png' }); await solve();
  check('tap a townsperson → pop quiz → +1 Smithbuck', /pop quiz/i.test(q) && (await p.evaluate(t0 => S.tokens - t0, t0)) === 1, q.slice(0, 60));
  /* fountain */
  const t1 = await p.evaluate(() => S.tokens + TOWN.town().crates);
  await p.evaluate(() => TOWN.EXT.plazaTap.some(f => f(AMBIENT.FOUNT.x, AMBIENT.FOUNT.y))); await solve();
  const wish = await p.evaluate(() => AMBIENT.st().wish);
  check('fountain of knowledge grants a wish for a right answer', wish === 1, wish);
  /* teaser */
  await p.evaluate(() => TOWN.EXT.plazaTap.some(f => f(AMBIENT.BOARD.x, AMBIENT.BOARD.y - 10)));
  await p.evaluate(() => { const z = window._tz; ambTeaser(z.order.indexOf(z.q.a)); }); await p.evaluate(() => townCloseCard());
  check('daily brain teaser solved once', await p.evaluate(() => AMBIENT.st().teaser === 1));
  /* golden bird */
  await p.evaluate(() => { AMBIENT.golden = { x: 500, y: 150, v: 0.001, gy: 150 }; });
  await p.evaluate(() => TOWN.EXT.plazaTap.some(f => f(500, 140))); await solve();
  check('catch the golden bird → bonus question', await p.evaluate(() => AMBIENT.st().bird === 1));
  /* fact bubble */
  const f = await p.evaluate(() => AMBIENT.fact());
  check('townsfolk share facts from class content', typeof f === 'string' && f.length > 10, f);
  await p.evaluate(() => { townCloseCard(); AMBIENT.spawn(); const w = AMBIENT.walkers[AMBIENT.walkers.length - 1]; w.x = 520; w.say = AMBIENT.fact(); w.sayUntil = performance.now() + 9000; });
  await p.waitForTimeout(600); await p.evaluate(() => document.querySelector('canvas').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
  await p.screenshot({ path: SHOTS + '/a_plaza.png' });
  /* pets in the room */
  await p.evaluate(() => { TOWN.addItem('pet_cat', 1); PETS.px('pet_cat').name = 'Mittens'; townTab('homes'); townVisit(TOWN.session.sid); }); await p.waitForTimeout(800);
  const pets = await p.evaluate(() => document.querySelectorAll('.troom .rpet').length);
  check('pets wander inside the house', pets === 1, pets);
  await p.evaluate(() => document.querySelector('.troom').scrollIntoView()); await p.screenshot({ path: SHOTS + '/a_room.png' });
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); console.log(fail ? `${fail} FAILED` : 'all passed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
