/* 3.5: teacher tabs + badges + scroll kept after hire, NPC job cover, map neighborhoods, events, more questions */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/', SHOTS = process.env.SHOTS || '/tmp';
const results = []; let fail = 0;
const check = (n, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1366, height: 800 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  const errs = [];
  async function page(name){ const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message)); p.on('dialog', d => d.accept());
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.EVENTS && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); S.v2seen = '2.0'; }); return p; }
  const T = await page('teacher'); await T.evaluate(() => { localStorage.removeItem('town.db'); localStorage.removeItem('town.admTab'); });
  const codes = await T.evaluate(async () => { await TOWN.net.teacherSignIn('t@t.test'); const a = await TOWN.net.createClass('1st Period'), b = await TOWN.net.createClass('3rd Period'); return [a.code, b.code]; });
  async function student(code, first){ const p = await page(first);
    await p.evaluate(async ([code, first]) => { S.tokens = 100; S.xp = 300; const r = await TOWN.net.join(code, first, 'Q', '1234'); if (r.ok) await TOWN.boot(); go('town'); }, [code, first]);
    await p.waitForTimeout(1300); await p.evaluate(() => { townCloseCard(); const w = document.getElementById('whatsnew'); w && w.remove(); }); return p; }
  const A = await student(codes[0], 'Ana');
  /* questions */
  check('question bank grew by 126', await A.evaluate(() => window.BANK2 && BANK2.count === 126 && PACKS.reduce((a, p) => a + p.units.reduce((b, u) => b + u.items.length, 0), 0) >= 960));
  /* NPC cover */
  await A.evaluate(() => { townTab('downtown'); }); await A.waitForTimeout(800);
  check('downtown shows NPCs in empty jobs', await A.evaluate(() => /Dr\. Rivera/.test(document.body.innerText)));
  await A.evaluate(() => carGo('doctor')); await A.waitForTimeout(500);
  await A.screenshot({ path: SHOTS + '/polish_npc.png', fullPage: true });
  const req = await A.evaluate(async () => { carRequest('checkup'); await new Promise(r => setTimeout(r, 800)); return (window._myCases || []).filter(c => c.status === 'open').length; });
  check('services work with an NPC on duty', req === 1, req);
  await A.evaluate(async () => { const c = window._myCases.find(x => x.status === 'open'); await TOWN.CIV.store().update(TOWN.CIV.C() + '/cases/' + c.id, {at:Date.now() - 4 * 60e3}); });
  await A.waitForTimeout(1500);
  const done = await A.evaluate(() => (window._myCases || []).find(c => c.kind === 'checkup'));
  check('the NPC closes the case after 3 minutes and pays the requester', done && done.status === 'done' && done.worker === 'npc', done && {st:done.status, w:done.worker});
  /* map */
  await A.evaluate(() => { townTab('map'); w2Go(null); }); await A.waitForTimeout(800);
  const map = await A.evaluate(() => ({zones:document.querySelectorAll('.wzone').length, ev:!!document.querySelector('.evcard'), art:[...document.querySelectorAll('.wmap .kb img')].filter(i => /places3|places4/.test(i.src)).length}));
  check('map grouped into neighborhoods with an event card and place art', map.zones >= 5 && map.ev && map.art >= 8, map);
  await A.screenshot({ path: SHOTS + '/polish_map.png', fullPage: true });
  /* apply for a job so the teacher sees a badge */
  await A.evaluate(async () => { const s = TOWN.CIV.SESS(); await TOWN.CIV.store().set(TOWN.CIV.C() + '/apps/vet_' + s.sid, {job:'vet', sid:s.sid, uid:TOWN.CIV.store().uid(), name:s.name, why:'I love animals and science', skills:'Patient', ref:'', status:'pending', at:Date.now(), stats:{}}); });
  /* teacher */
  await T.evaluate(() => { TEACHER_OK = true; townTab('admin'); }); await T.waitForTimeout(1800);
  const t1 = await T.evaluate(() => ({tabs:document.querySelectorAll('.tadmnav button').length, sticky:getComputedStyle(document.querySelector('.tadmbar')).position, badge:[...document.querySelectorAll('.tclasses .tbadge')].filter(x => !x.hidden).map(x => x.textContent), need:document.getElementById('tNeeds').innerText}));
  check('teacher bar is sticky with 7 sections', t1.tabs === 7 && t1.sticky === 'sticky', t1);
  check('class badge and attention list show the job application', t1.badge.includes('1') && /job application/i.test(t1.need), t1);
  await T.screenshot({ path: SHOTS + '/polish_teacher.png' });
  await T.evaluate(() => townAdminTab('people')); await T.waitForTimeout(1200);
  check('Students & jobs section shows only its panels', await T.evaluate(() => !!document.getElementById('aApps') && !document.getElementById('aWords') && /NPC/.test(document.getElementById('aStaff').innerText)));
  await T.screenshot({ path: SHOTS + '/polish_people.png', fullPage: true });
  const y = await T.evaluate(async () => { const btn = [...document.querySelectorAll('#aApps .btn.primary')][0]; btn.scrollIntoView(); window.scrollBy(0, -100); await new Promise(r => setTimeout(r, 200)); const y0 = window.scrollY; window._tAdmUserScroll = false; btn.click(); await new Promise(r => setTimeout(r, 1800)); return {y0, y1:window.scrollY}; });
  check('hiring keeps your place on the page', y.y0 > 300 && Math.abs(y.y1 - y.y0) < 60, y);
  const staffed = await T.evaluate(() => /Ana/.test(document.getElementById('aStaff').innerText));
  check('hired student replaces the NPC', staffed);
  await T.evaluate(() => townAdminPick(document.querySelectorAll('.tclasses button')[1].getAttribute('onclick').match(/'(.+)'/)[1])); await T.waitForTimeout(900);
  check('switching classes keeps the same section', await T.evaluate(() => document.querySelector('.tadmnav .on').textContent.includes('Students')));
  check('teacher can pick today\'s event', await T.evaluate(async () => { townAdminTab('overview'); await new Promise(r => setTimeout(r, 800)); return !!document.querySelector('[onclick^="evTPick"]'); }));
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); await b.close(); process.exit(fail ? 1 : 0);
})();
