/* A refresh returns to the same screen; a new visit opens on the title:
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/refresh_test.js */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';
const results = []; let fail = 0;
const check = (n, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1200, height: 900 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  const errs = [];
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && TOWN.net && window.APP);
  await p.evaluate(() => { localStorage.removeItem('town.db'); localStorage.setItem('app.seen', APP.version); });
  const code = await p.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test'); const c = (await TOWN.net.createClass('P1')).code; TEACHER_OK = false; return c; });
  await p.evaluate(async c => { pickLang('en'); hideTitle(); S.name = 'Ana'; const r = await TOWN.net.join(c, 'Ana', 'R', '1234'); if (r.ok) await TOWN.boot(); go('town'); }, code);
  await p.waitForTimeout(1500); await p.evaluate(() => { townCloseCard(); townTab('live'); lvSub('feud'); });
  await p.reload(); await p.waitForTimeout(3500);
  const st = await p.evaluate(() => ({title:!document.getElementById('title').classList.contains('hidden'), tab:TAB, tt:TOWN.tt, feud:!!document.querySelector('.lvnav button.on') && document.querySelector('.lvnav button.on').textContent}));
  check('refresh in the Town returns to Live › Feud, not the title screen', !st.title && st.tab === 'town' && st.tt === 'live' && /Feud/.test(st.feud), st);
  await p.evaluate(() => { townTab('exam'); twSub('mock'); }); await p.reload(); await p.waitForTimeout(3500);
  const st2 = await p.evaluate(() => ({tab:TAB, tt:TOWN.tt, sub:(document.querySelector('.twnav button.on') || {}).textContent}));
  check('refresh in Exam › Mock exam comes back there', st2.tt === 'exam' && /Mock/.test(st2.sub), st2);
  await p.evaluate(() => go('arcade')); await p.reload(); await p.waitForTimeout(2500);
  check('refresh on the Arcade comes back to the Arcade', await p.evaluate(() => TAB === 'arcade' && document.getElementById('title').classList.contains('hidden')));
  await p.evaluate(() => showTitle()); await p.reload(); await p.waitForTimeout(2500);
  check('refresh while on the title screen stays on the title screen', await p.evaluate(() => !document.getElementById('title').classList.contains('hidden')));
  const p2 = await ctx.newPage(); await p2.goto(BASE + 'index.html'); await p2.waitForTimeout(2500);
  check('a new tab (new visit) opens on the title screen', await p2.evaluate(() => !document.getElementById('title').classList.contains('hidden')));
  check('no page errors', errs.length === 0, errs.slice(0, 3));
  console.log(results.join('\n')); console.log(fail ? `${fail} failed` : 'all passed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
