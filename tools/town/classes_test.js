/* Teacher class management: add, rename, delete (practice mode):
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/classes_test.js */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';
const results = []; let fail = 0;
const check = (n, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1200, height: 900 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  const errs = [];
  const page = async n => { const p = await ctx.newPage(); p.on('pageerror', e => errs.push(n + ': ' + e.message)); await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && TOWN.net); return p; };
  const T = await page('teacher'); await T.evaluate(() => localStorage.removeItem('town.db'));
  const made = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test'); const a = await TOWN.net.createClass('Period 1'); const b = await TOWN.net.createClass('Period 3'); return {a, b}; });
  const S1 = await page('student');
  await S1.evaluate(async c => { S.name = 'Ana'; const r = await TOWN.net.join(c, 'Ana', 'R', '1234'); if (r.ok) await TOWN.boot(); go('town'); }, made.a.code); await S1.waitForTimeout(1500);
  await T.evaluate(() => { townTab('admin'); }); await T.waitForTimeout(800);
  const btns = await T.evaluate(() => ({classes:document.querySelectorAll('.tclasses button').length, rename:!!document.querySelector('[onclick^="townRenameClass"]'), del:!!document.querySelector('[onclick^="townDeleteClass"]')}));
  check('teacher panel lists both classes with rename and delete', btns.classes === 3 && btns.rename && btns.del, btns);
  /* rename */
  await T.evaluate(() => { window.prompt = () => 'Period 1 · AP Macro'; }); await T.evaluate(cid => townRenameClass(cid), made.a.cid); await T.waitForTimeout(800);
  const ren = await T.evaluate(async c => { const l = await TOWN.net.myClasses(); const code = JSON.parse(localStorage.getItem('town.db'))['codes/' + c]; return {name:l.find(x => x.code === c).name, codeName:code && code.name}; }, made.a.code);
  check('rename updates the class and the join code lookup; code unchanged', ren.name === 'Period 1 · AP Macro' && ren.codeName === 'Period 1 · AP Macro', ren);
  await S1.waitForTimeout(1500); await S1.evaluate(() => { townCloseCard(); townTab('plaza'); });
  const head = await S1.evaluate(() => document.querySelector('.thead .eyebrow').textContent);
  check('students see the new class name', /AP Macro/.test(head), head);
  /* delete: wrong code does nothing, right code deletes */
  await T.evaluate(() => { window.prompt = () => 'NOPE'; }); await T.evaluate(cid => townDeleteClass(cid), made.a.cid); await T.waitForTimeout(500);
  const still = await T.evaluate(async () => (await TOWN.net.myClasses()).length);
  check('delete needs the class code typed to confirm', still === 2, still);
  await T.evaluate(c => { window.prompt = () => c.toLowerCase(); }, made.a.code); await T.evaluate(cid => townDeleteClass(cid), made.a.cid); await T.waitForTimeout(800);
  const after = await T.evaluate(async c => ({n:(await TOWN.net.myClasses()).length, code:!!JSON.parse(localStorage.getItem('town.db'))['codes/' + c], btns:document.querySelectorAll('.tclasses button').length}), made.a.code);
  check('delete removes the class and its code from the panel', after.n === 1 && !after.code && after.btns === 2, after);
  await S1.waitForTimeout(2000);
  const out = await S1.evaluate(() => !TOWN.session);
  check('students in a deleted class are signed out of the town', out);
  const rejoin = await S1.evaluate(async c => (await TOWN.net.join(c, 'Ana', 'R', '1234')).err, made.a.code);
  check('the old code no longer works ("wrong code")', rejoin === 'code', rejoin);
  /* add */
  await T.evaluate(() => { window.prompt = () => 'Period 5 · Gov Honors'; }); await T.evaluate(() => townNewClass()); await T.waitForTimeout(800);
  check('add a new class period', await T.evaluate(async () => (await TOWN.net.myClasses()).some(c => c.name === 'Period 5 · Gov Honors')));
  check('no page errors', errs.length === 0, errs.slice(0, 4));
  console.log(results.join('\n')); console.log(fail ? `${fail} failed` : 'all passed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
