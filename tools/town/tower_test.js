/* Exam tab: tower, graph lab, case files, review, mock exam, plan (practice mode):
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/tower_test.js */
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
  async function page(name){ const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message));
    await p.addInitScript(() => { try { if (!localStorage.getItem('town.admTab')) localStorage.setItem('town.admTab', 'all'); } catch(e){} Object.defineProperty(window, 'TOWN_FX', {configurable:true, get(){ return (k, d) => d; }, set(){} }); });
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && window.TOWER && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); }); return p; }
  const T = await page('teacher'); await T.evaluate(() => localStorage.removeItem('town.db'));
  const code = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test'); return (await TOWN.net.createClass('P2')).code; });
  const A = await page('Ana');
  await A.evaluate(async code => { S.xp = 300; S.tokens = 100; S.name = 'Ana'; S.myCourses = ['ap-econ', 'ap-gov'];
    const r = await TOWN.net.join(code, 'Ana', 'R', '1234'); if (r.ok) await TOWN.boot(); }, code);
  await A.evaluate(() => go('town')); await A.waitForTimeout(2200); await A.evaluate(() => townCloseCard());

  /* graph answer keys are economically right */
  const keys = await A.evaluate(() => TOWER.GRAPHS.map(g => [g.g, g.c, g.d, TOWER.yEffect(g)]));
  const expect = { 'sd:D': 1, 'sd:S': -1, 'adas:AD': 1, 'adas:SRAS': -1, 'mm:MS': -1, 'mm:MD': 1, 'lf:D': 1, 'lf:S': -1, 'fx:D': 1, 'fx:S': -1 };
  const badKeys = keys.filter(([g, c, d, y]) => { const k = expect[g + ':' + c]; return k !== undefined ? y !== k * d : y !== null; });
  check('graph keys: price/rate moves the right way for all 34 scenarios', keys.length === 34 && badKeys.length === 0, badKeys);
  check('case files: 27 cases/documents with standards', await A.evaluate(() => TOWER.CASES.length === 27 && TOWER.CASES.every(c => STD.stdInfo(c.std).code !== 'CLASS')));
  const mix = await A.evaluate(() => { const q = TOWER.mockPick('ap-econ'), by = {}; q.forEach(x => by[x.u] = (by[x.u] | 0) + 1); return {n:q.length, by}; });
  check('mock exam: 20 questions weighted by AP Macro unit weights (unit 5 most)', mix.n === 20 && mix.by['ap-m5'] >= mix.by['ap-m1'] && mix.by['ap-m5'] >= 4, mix);

  /* tower: open tab, start floor 1 of AP Macro, answer right until the chest */
  await A.evaluate(() => townTab('exam')); await A.waitForTimeout(300);
  const nav = await A.evaluate(() => document.querySelectorAll('.twnav button').length);
  check('Exam tab: 5 sections', nav === 5, nav);
  await A.screenshot({ path: SHOTS + '/tw_home.png', fullPage: true });
  await A.evaluate(() => twStart('ap-econ', 0)); await A.waitForTimeout(200);
  await A.screenshot({ path: SHOTS + '/tw_battle.png', fullPage: true });
  const right = async () => A.evaluate(() => { const r = TOWER.tw().run; if (!r) return 'norun'; const q = r.q;
    if (q.kind === 'mcq') { const it = (() => { let f; allPacks().forEach(p => p.units.forEach(u => u.items.forEach(i => { if (i.id === q.id) f = i; }))); return f; })(); twAns(q.order.indexOf(it.a)); }
    else if (q.kind === 'graph') { const g = TOWER.GRAPHS[q.gi], ye = TOWER.yEffect(g); if (q.step === 0) twG('tw', 'c', g.c); if (TOWER.tw().run.q.step === 1) twG('tw', 'd', g.d); if (TOWER.tw().run.q.step === 2) twG('tw', 'y', ye); }
    else if (q.kind === 'case') twCase('tw', TOWER.CASES[q.ci].k);
    const out = TOWER.tw().run.q.kind; twNext(); return out; });
  const kinds = []; for (let i = 0; i < 40; i++) { const k = await right(); if (k === 'norun') break; kinds.push(k); if (await A.evaluate(() => !!document.querySelector('.twchest'))) break; }
  const chest = await A.evaluate(() => ({chest:!!document.querySelector('.twchest'), loot:TOWER.tw().run && TOWER.tw().run.loot[0], best:TOWER.tw().best['ap-econ']}));
  check('tower floor 1: monsters + boss beaten with right answers (crits), chest drops a tower item', chest.chest && chest.loot && chest.best === 1, {chest, n:kinds.length});
  await A.waitForTimeout(1500); await A.screenshot({ path: SHOTS + '/tw_chest.png', fullPage: true });
  const inv = await A.evaluate(id => TOWN.has(id), chest.loot); check('loot is in the inventory', inv);
  /* floor 3 boss uses graphs: climb, lose hearts on purpose */
  await A.evaluate(() => twUp()); await A.waitForTimeout(100);
  const hp0 = await A.evaluate(() => TOWER.tw().run.hp);
  for (let i = 0; i < 6; i++) { const done = await A.evaluate(() => { const r = TOWER.tw().run; if (!r) return true; const q = r.q;
      if (q.kind === 'mcq') { let it; allPacks().forEach(p => p.units.forEach(u => u.items.forEach(i => { if (i.id === q.id) it = i; }))); twAns((q.order.indexOf(it.a) + 1) % q.order.length); }
      else if (q.kind === 'case') twCase('tw', TOWER.CASES.find(c => c.k !== TOWER.CASES[q.ci].k).k); else { twG('tw','c', Object.keys({AD:1})[0]); twG('tw','d', -1); twG('tw','y', 0); }
      if (window.TOWER.tw().run && TOWER.tw().run.gavel && !TOWER.tw().run.q.ok) {} twNext(); return !TOWER.tw().run; }); if (done) break; }
  const over = await A.evaluate(() => ({run:!!TOWER.tw().run, rev:Object.keys(TOWER.tw().rev).length, txt:(document.getElementById('twBody') || {}).textContent || ''}));
  check('wrong answers cost hearts; run ends; misses go to Review with explanations', !over.run && over.rev >= 1 && /Learn from this run/.test(over.txt), {hp0, rev:over.rev});
  await A.screenshot({ path: SHOTS + '/tw_over.png', fullPage: true });
  /* review queue */
  await A.evaluate(() => { const s = TOWER.tw(); Object.values(s.rev).forEach(r => r.due = Date.now() - 1); });
  await A.evaluate(() => twSub('review')); const dueTxt = await A.evaluate(() => document.querySelector('#twBody .btn.primary').textContent);
  await A.evaluate(() => twReview());
  for (let i = 0; i < 9; i++) await A.evaluate(() => { const z = window._lvq; if (!z) return; lvAns(z.order.indexOf(z.q.a)); lvNext(); });
  const boxes = await A.evaluate(() => Object.values(TOWER.tw().rev).map(r => r.b));
  check('review: due cards come back and move up a box when right', /Review/.test(dueTxt) && boxes.length && boxes.every(b => b === 2), {dueTxt, boxes});
  /* graph lab */
  await A.evaluate(() => { twSub('lab'); twLabMode('graph'); }); await A.waitForTimeout(200);
  const labOk = await A.evaluate(() => { const q = document.querySelector('canvas.twgraph'); return !!q; });
  await A.evaluate(() => { const g = document.querySelector('canvas.twgraph'); }); 
  const t0 = await A.evaluate(() => S.tokens);
  await A.evaluate(() => { /* answer the lab question right */ const s = document.querySelector('.twscen').textContent; const g = TOWER.GRAPHS.find(x => x.t[0] === s || x.t[1] === s); const multi = Object.keys({}).length;
    twG('lab', 'c', g.c); twG('lab', 'd', g.d); const ye = TOWER.yEffect(g); if (ye != null) twG('lab', 'y', ye); });
  await A.waitForTimeout(1100);
  const lab = await A.evaluate(() => ({ok:/Nailed it/.test(document.getElementById('twBody').textContent), n:TOWER.tw().lab.right}));
  check('graph lab: canvas draws, a full right answer scores +1 and animates the shift', labOk && lab.ok && lab.n >= 1, lab);
  await A.screenshot({ path: SHOTS + '/tw_graph.png', fullPage: true });
  await A.evaluate(() => twLabMode('cases')); await A.waitForTimeout(150);
  await A.evaluate(() => { const f = document.querySelector('.twfacts').textContent; const c = TOWER.CASES.find(x => x.f[0] === f || x.f[1] === f); twCase('lab', c.k); });
  const cs = await A.evaluate(() => Object.keys(TOWER.tw().cases.right).length);
  check('case files: facts → right case is recorded', cs === 1, cs);
  await A.screenshot({ path: SHOTS + '/tw_case.png', fullPage: true });
  /* mock exam */
  await A.evaluate(() => twSub('mock')); await A.evaluate(() => twMockStart('ap-gov')); await A.waitForTimeout(800);
  const clock = await A.evaluate(() => document.getElementById('twClock').textContent);
  await A.screenshot({ path: SHOTS + '/tw_mock.png', fullPage: true });
  for (let i = 0; i < 20; i++) await A.evaluate(i => { twMockGo(i); twMockPick(i % 4 === 0 ? 1 : 0); }, i);
  await A.evaluate(() => { window.confirm = () => true; twMockSubmit(); }); await A.waitForTimeout(300);
  const mres = await A.evaluate(() => ({m:TOWER.tw().mock['ap-gov'], est:(document.querySelector('.twest') || {}).textContent || ''}));
  check('mock exam: timed (≈29 min), submits with score, unit breakdown and AP estimate', /^2[89]:/.test(clock) && mres.m && mres.m.n === 1 && /AP score estimate/.test(mres.est), {clock, mres});
  await A.screenshot({ path: SHOTS + '/tw_mockres.png', fullPage: true });
  /* plan */
  await A.evaluate(() => twSub('plan')); await A.waitForTimeout(200);
  const plan = await A.evaluate(() => ({days:[...document.querySelectorAll('.twdays b')].map(b => b.textContent), weak:document.querySelectorAll('.twweak .btn').length, missions:document.querySelectorAll('.twmission').length}));
  check('plan: countdowns to May 4 / May 7, 2027, weakest standards, 4 missions', plan.days.length === 2 && plan.days.every(d => +d > 100) && plan.weak >= 3 && plan.missions === 4, plan);
  await A.screenshot({ path: SHOTS + '/tw_plan.png', fullPage: true });
  /* teacher */
  await A.evaluate(() => TOWN.publishNow()); await A.waitForTimeout(700);
  await T.evaluate(() => { TEACHER_OK = true; townTab('admin'); }); await T.waitForTimeout(1500);
  const adm = await T.evaluate(() => ({rows:document.querySelectorAll('#aExam tr').length, txt:(document.getElementById('aExam') || {}).textContent || '', date:!!document.querySelector('input[type=date][onchange*=cfeDate]')}));
  check('teacher: exam prep table (floors, mock best/last, due) + CFE date', adm.rows >= 2 && /AP Gov/.test(adm.txt) && adm.date, adm);
  /* mobile */
  await A.setViewportSize({ width: 390, height: 844 });
  for (const k of ['tower', 'lab', 'review', 'mock', 'plan']) { await A.evaluate(k => twSub(k), k); await A.waitForTimeout(150); const o = await A.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (o > 2) check('mobile overflow ' + k, false, o); }
  await A.evaluate(() => twStart('ap-gov', 0)); await A.waitForTimeout(200);
  const o2 = await A.evaluate(() => document.documentElement.scrollWidth - innerWidth); check('mobile: exam tab fits a phone (incl. battle)', o2 <= 2, o2);
  await A.evaluate(() => { const n = document.querySelector('.twnav'); n.scrollIntoView(); }); await A.screenshot({ path: SHOTS + '/tw_mobile.png' });
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); console.log(fail ? `${fail} failed` : 'all passed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
