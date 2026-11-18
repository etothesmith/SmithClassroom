/* Smithbucks, today's to-do, certificate pay, knocking and leaving a town (practice mode):
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/life_test.js */
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
  async function page(name){
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message));
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && window.TODAY && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); });
    return p;
  }
  const T = await page('teacher');
  await T.evaluate(() => { localStorage.removeItem('town.db'); });
  const codes = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test');
    const a = await TOWN.net.createClass('Period 4'); const b = await TOWN.net.createClass('Period 6'); return [a.code, b.code]; });
  async function student(first, init, code){
    const p = await page(first);
    const ok = await p.evaluate(async ([code, first, init]) => { S.xp = 300; S.tokens = 40; S.name = first; S.myCourses = ['econ-h']; const r = await TOWN.net.join(code, first, init, '1234');
      if (r.ok) await TOWN.boot(); return r; }, [code, first, init]);
    await p.evaluate(() => { go('town'); }); await p.waitForTimeout(2300);
    return { p, ok };
  }
  const A = await student('Ana', 'R', codes[0]);
  /* to-do pop-up on sign-in */
  const todo = await A.p.evaluate(() => { const b = document.getElementById('certAsk'); return b && !b.classList.contains('hidden') ? b.textContent : ''; });
  check('to-do pops up on sign-in with class work first', /Today's to-do/.test(todo) && /Answer 10 practice questions/.test(todo) && /class work/.test(todo), todo.slice(0, 160));
  await A.p.screenshot({ path: SHOTS + '/life_todo.png' });
  const hud = await A.p.evaluate(() => [document.querySelector('.hudpill[title="Smithbucks"]') ? 'hud' : '', /Smithbucks/.test(document.getElementById('certAsk').textContent) ? 'text' : '']);
  check('currency is Smithbucks', hud.join() === 'hud,text', hud);
  await A.p.evaluate(() => townCloseCard());
  /* answering 10 questions completes the job and pays */
  const pay = await A.p.evaluate(() => { const d = today(); const its = allPacks().find(p => p.id === 'econ-h').units[0].items.slice(0, 10);
    its.forEach(i => { S.prog[i.id] = { seen: 1, right: 1, last: d }; });
    const t0 = S.tokens; todoOpen(); const btn = [...document.querySelectorAll('.kti button')].find(b => /Collect/.test(b.textContent)); btn && btn.click(); return S.tokens - t0; });
  check('10 questions answered → collect pays 3 Smithbucks', pay === 3, pay);
  await A.p.evaluate(() => townCloseCard());
  /* certificates pay */
  const cert = await A.p.evaluate(() => { const t0 = S.tokens; S.certs.push({ code: 'TEST-AG-1', unit: 'Mall Tycoon', course: 'Economics', kind: 'game', src: 'ev:ag-mall_tycoon', date: today(), score: 100 });
    TOWN.CIV.unitPaychecks(); const g = S.tokens - t0; S.certs.push({ code: 'TEST-U-1', unit: 'Unit 2', course: 'Economics', kind: 'challenge', date: today(), score: 90 }); TOWN.CIV.unitPaychecks(); return [g, S.tokens - t0 - g]; });
  check('assignment certificate pays 20, unit certificate 15', cert[0] === 20 && cert[1] === 15, cert);

  /* knocking */
  const B = await student('Ben', 'T', codes[0]);
  await B.p.evaluate(() => townCloseCard());
  await B.p.evaluate(() => { townVisit('ana-r'); }); await B.p.waitForTimeout(600);
  const outside = await B.p.evaluate(() => ({ door: !!document.querySelector('.tdoor'), room: !!document.querySelector('.troom') }));
  check('a classmate can\'t walk in: they see the front door', outside.door && !outside.room, outside);
  await B.p.screenshot({ path: SHOTS + '/life_door.png' });
  await B.p.evaluate(() => townKnock('ana-r')); await A.p.waitForTimeout(900);
  const ask = await A.p.evaluate(() => document.getElementById('certAsk').textContent);
  check('owner gets the knock', /is at your door/.test(ask), ask.slice(0, 80));
  await A.p.screenshot({ path: SHOTS + '/life_knock.png' });
  await A.p.evaluate(() => { const b = [...document.querySelectorAll('#certAsk button')].find(x => /Let them in/.test(x.textContent)); b.click(); });
  await B.p.waitForTimeout(900);
  const inside = await B.p.evaluate(() => !!document.querySelector('.troom'));
  check('after "Let them in", the visitor is inside', inside, inside);
  /* open house */
  const C = await student('Cara', 'L', codes[0]); await C.p.evaluate(() => townCloseCard());
  await A.p.evaluate(() => { townVisit(null); townVisit(TOWN.session.sid); }); await A.p.waitForTimeout(300);
  await A.p.evaluate(() => townDoor('open')); await C.p.waitForTimeout(800);
  await C.p.evaluate(() => townVisit('ana-r')); await C.p.waitForTimeout(600);
  const open = await C.p.evaluate(() => !!document.querySelector('.troom'));
  check('Open house lets anyone in', open, open);
  /* leaving a town */
  const before = await C.p.evaluate(() => ({ xp: S.xp, tok: S.tokens }));
  await C.p.evaluate(async () => { townLeave(); townLeaveClass(); await townLeaveGo(); }); await C.p.waitForTimeout(500);
  const gone = await C.p.evaluate(() => ({ sess: !!TOWN.session, join: !!document.getElementById('jCode') }));
  const pubGone = await A.p.evaluate(async () => !(await TOWN.net.store.get(`classes/${TOWN.session.cid}/pub/cara-l`)));
  check('leaving signs out and removes the house from that street', !gone.sess && gone.join && pubGone, { gone, pubGone });
  const rejoin = await C.p.evaluate(async code => { const r = await TOWN.net.join(code, 'Cara', 'L', '1234'); if (r.ok) await TOWN.boot(); return { r, xp: S.xp, tok: S.tokens, cls: TOWN.session && TOWN.session.className }; }, codes[1]);
  check('joins the right class and keeps XP and Smithbucks', rejoin.r.ok && rejoin.xp === before.xp && rejoin.tok >= before.tok && rejoin.cls === 'Period 6', rejoin);
  await T.evaluate(async c => { townTab('admin'); }, null); await T.waitForTimeout(800);
  /* plaza: weather and time of day draw without errors */
  await tab(A.p);
  async function tab(p){ await p.evaluate(() => townTab('plaza')); await p.waitForTimeout(1200); }
  const wx = await A.p.evaluate(() => [TODAY.weather(), TODAY.SKY().k]);
  await A.p.screenshot({ path: SHOTS + '/life_plaza.png' });
  check('plaza has weather and time of day', !!wx[0] && !!wx[1], wx);
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); console.log(fail ? `${fail} FAILED` : 'all passed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
