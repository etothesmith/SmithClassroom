/* v2.3: shop sets + deals, job guide on hire, on-the-job decisions, notifications (students + teacher alerts), practice mode:
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/notify_test.js */
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
    await p.addInitScript(() => { try { if (!localStorage.getItem('town.admTab')) localStorage.setItem('town.admTab', 'all'); } catch(e){} Object.defineProperty(window, 'TOWN_FX', {configurable:true, get(){ return (k, d) => d; }, set(){} }); });
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && window.CAREERS && window.TNOTIFY && window.JOBS2 && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); });
    return p;
  }
  const feed = p => p.evaluate(() => TNOTIFY.state.feed.map(x => x.m));
  const T = await page('teacher');
  await T.evaluate(() => { localStorage.removeItem('town.db'); localStorage.removeItem('town.notify'); });
  const code = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test'); const r = await TOWN.net.createClass('3rd Period Econ'); return r.code; });
  await T.waitForTimeout(4600); /* teacher alerts start */
  check('teacher sees the 🔔 bell', await T.evaluate(() => !!document.getElementById('tnBell')));
  async function student(first, init){
    const p = await page(first);
    await p.evaluate(async ([code, first, init]) => { S.xp = 300; S.tokens = 60; S.name = first; const r = await TOWN.net.join(code, first, init, '1234'); if (r.ok) await TOWN.boot(); }, [code, first, init]);
    await p.evaluate(() => { go('town'); }); await p.waitForTimeout(600); await p.evaluate(() => townCloseCard());
    return p;
  }
  const A = await student('Ana', 'R'), B = await student('Ben', 'T');
  await T.waitForTimeout(1200);
  check('teacher alert: students joined', (await feed(T)).some(m => /Ana.*joined/.test(m)), (await feed(T)).slice(0, 3));
  check('students see the bell', await A.evaluate(() => !!document.getElementById('tnBell')));

  /* shop: sets, filters, deals */
  await A.evaluate(() => townTab('shop')); await A.waitForTimeout(400);
  const shop = await A.evaluate(() => ({chips:document.querySelectorAll('.tchips button').length, deals:document.querySelectorAll('.tdeals .tcardi').length,
    fresh:document.querySelectorAll('.tgridi .tnew').length, total:Object.values(TOWN_ITEMS).filter(i => i.fresh).length}));
  check('shop: filter chips, 4 deals, NEW items listed', shop.chips >= 12 && shop.deals === 4 && shop.fresh >= 20 && shop.total >= 81, shop);
  await A.screenshot({ path: SHOTS + '/v23_shop.png', fullPage: false });
  await A.evaluate(() => townShopF('space')); await A.waitForTimeout(200);
  const space = await A.evaluate(() => [...document.querySelectorAll('.tgridi')[1].querySelectorAll('.tcardi b')].map(b => b.textContent));
  check('space filter shows only space items', space.length === 8 && space.includes('Rocket bed'), space);
  const deal = await A.evaluate(() => { const card = document.querySelector('.tdeals .tcardi'); const id = card.querySelector('button').getAttribute('onclick').match(/'(.+)'/)[1];
    const full = TOWN.priceOf(TOWN_ITEMS[id]); const t0 = S.tokens; townBuyShop(id); return {id, full, paid:t0 - S.tokens, have:TOWN.town().inv[id] | 0}; });
  check('buying a deal costs 30% less', deal.paid === Math.max(1, Math.round(deal.full * 0.7)) && deal.have >= 1, deal);

  /* applying → teacher alert */
  await A.evaluate(async () => { carGo('doctor'); await new Promise(r => setTimeout(r, 300)); carApply('doctor');
    document.getElementById('kWhy1').value = 'I want to help my classmates get better every day.'; document.getElementById('kWhy2').value = 'I study hard and I am kind.';
    document.getElementById('kRef').value = 'Coach Smith'; await carSend('doctor'); });
  await A.waitForTimeout(400);
  const guideBtn = await A.evaluate(() => /How this job works/.test(document.body.textContent));
  check('non-workers can open "How this job works"', guideBtn);
  await T.waitForTimeout(1000);
  check('teacher alert: new job application', (await feed(T)).some(m => /Ana.*applied to be .*Town Doctor/.test(m)), (await feed(T)).slice(0, 3));

  /* hire → guide pops up */
  await T.evaluate(async () => { townTab('admin'); await new Promise(r => setTimeout(r, 700)); const rows = await TOWN.net.store.list(`classes/${TOWN.adminCid}/apps`); for (const a of rows) await carHire(a.id); });
  await A.waitForTimeout(3200);
  const guide = await A.evaluate(() => ({job:CAREERS.myJob(), guide:!!document.querySelector('#certAsk .jguide'), txt:(document.querySelector('#certAsk') || {}).textContent || ''}));
  check('hired → welcome job guide opens', guide.job === 'doctor' && guide.guide && /Welcome to your new job/.test(guide.txt) && /In the real world/.test(guide.txt), {job:guide.job, g:guide.guide});
  await A.screenshot({ path: SHOTS + '/v23_guide.png', fullPage: false });
  check('hire is in the student inbox', (await feed(A)).some(m => /You're hired/.test(m)));

  /* on the job decision */
  await A.evaluate(() => { townCloseCard(); carGo('doctor'); }); await A.waitForTimeout(400);
  check('building shows "On the job today"', await A.evaluate(() => !!document.querySelector('.jonjob button.primary')));
  await A.screenshot({ path: SHOTS + '/v23_onjob.png', fullPage: true });
  const dec = await A.evaluate(() => { const t0 = S.tokens, c0 = CAREERS.car ? 0 : 0; jobDecide(); const D = JOBS2.decOf('doctor'), best = Math.max(...D[1].map(x => x[2]));
    const k = window._jd.findIndex(i => D[1][i][2] === best); const cases0 = TOWN.CAR.car().cases | 0; jobPick(k);
    return {paid:S.tokens - t0, cases:(TOWN.CAR.car().cases | 0) - cases0, why:document.getElementById('jdWhy').textContent.slice(0, 40)}; });
  check('best decision pays +2 and counts as a case', dec.paid === 2 && dec.cases === 1 && /Great call/.test(dec.why), dec);
  const again = await A.evaluate(() => { const t0 = S.tokens; townCloseCard(); jobDecide(); return S.tokens - t0; });
  check('only one decision a day', again === 0);

  /* Ben asks for a check-up → Ana gets notified */
  await B.evaluate(async () => { await TOWN.net.store.set(`classes/${TOWN.session.cid}/cases/checkup_t_${TOWN.session.sid}`, {job:'doctor', kind:'checkup', for:TOWN.session.sid, forName:'Ben T.', by:TOWN.session.sid, status:'open', need:3, n:0, at:Date.now()}); });
  await A.waitForTimeout(1200);
  check('worker notified when a classmate needs them', (await feed(A)).some(m => /Ben T\. needs the Town Doctor/.test(m)), (await feed(A)).slice(0, 3));

  /* Ben leaves Ana a 1-star review → teacher alert */
  const anaSid = await A.evaluate(() => TOWN.session.sid);
  await B.evaluate(async sid => { const wk = TOWN.CIV.week(); await TOWN.net.store.set(`classes/${TOWN.session.cid}/reviews/${wk}_${TOWN.session.sid}_${sid}`, {week:wk, by:TOWN.session.sid, worker:sid, job:'doctor', stars:1, tags:[], note:'never showed up', at:Date.now()}); }, anaSid);
  await T.waitForTimeout(1200);
  check('teacher alert: low review', (await feed(T)).some(m => /Low review.*Town Doctor.*never showed up/.test(m)), (await feed(T)).slice(0, 3));

  /* trade offer → Ana notified */
  await B.evaluate(async sid => { await TOWN.net.offer(sid, '', 'Ana R.', [], 1, [], 0); }, anaSid).catch(e => null);
  await A.waitForTimeout(1200);
  check('trade offer shows up in the inbox', (await feed(A)).some(m => /trade offer/.test(m)), (await feed(A)).slice(0, 3));

  /* the inbox */
  const badge = await A.evaluate(() => (document.querySelector('#tnBell b') || {}).textContent || '');
  check('bell shows an unread count', +badge >= 3, badge);
  await A.evaluate(() => tnOpen()); await A.waitForTimeout(200);
  const inbox = await A.evaluate(() => ({rows:document.querySelectorAll('.tnfeed > div').length, turnOn:/Turn on/.test(document.querySelector('.tnset').textContent), badge:!!document.querySelector('#tnBell b')}));
  check('inbox lists notifications, offers "Turn on", clears the badge', inbox.rows >= 3 && inbox.turnOn && !inbox.badge, inbox);
  await A.screenshot({ path: SHOTS + '/v23_inbox.png', fullPage: false });
  await T.evaluate(() => tnOpen()); await T.waitForTimeout(200);
  await T.screenshot({ path: SHOTS + '/v23_teacher_inbox.png', fullPage: false });
  check('teacher inbox mentions teacher alerts', await T.evaluate(() => /Teacher alerts are on/.test(document.querySelector('#certAsk').textContent)));
  check('errors filtered out of the inbox', !(await feed(A)).some(m => /^Couldn't|^You already/.test(m)));

  check('no page errors', errs.length === 0, errs);
  console.log(results.join('\n')); console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
  await b.close(); process.exit(fail ? 1 : 0);
})();
