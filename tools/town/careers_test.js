/* Town careers, Downtown, town requests and the mayor's office, end to end in practice mode:
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/careers_test.js */
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
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && window.CAREERS && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); });
    return p;
  }
  const T = await page('teacher');
  await T.evaluate(() => { localStorage.removeItem('town.db'); });
  const code = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test'); const r = await TOWN.net.createClass('Period 3'); return r.code; });
  async function student(first, init){
    const p = await page(first);
    const ok = await p.evaluate(async ([code, first, init]) => { S.xp = 300; S.tokens = 60; S.name = first; const r = await TOWN.net.join(code, first, init, '1234');
      if (r.ok) await TOWN.boot(); return r; }, [code, first, init]);
    await p.evaluate(() => { go('town'); }); await p.waitForTimeout(500);
    return { p, ok };
  }
  const A = await student('Ana', 'R'), B = await student('Ben', 'T'), Cc = await student('Cara', 'L');
  const tab = (p, k) => p.evaluate(k => townTab(k), k).then(() => p.waitForTimeout(400));
  const solve = p => p.evaluate(() => { let guard = 40; while (window._carW && guard--) { const st = window._carW; carAns(st.order.indexOf(st.q.a)); if (st.got >= st.need) carFinish(); else carNext(); } });

  /* login pop-up: nobody is hired, so it lists openings */
  const pop = await A.p.evaluate(() => { const b = document.getElementById('certAsk'); return b && !b.classList.contains('hidden') ? b.textContent : ''; });
  check('login to-do shows job openings', /Now hiring/i.test(pop) && /Town Doctor/.test(pop), pop.slice(0, 120));
  await A.p.screenshot({ path: SHOTS + '/car_popup.png' });
  await A.p.evaluate(() => townCloseCard());

  /* Downtown map */
  await tab(A.p, 'downtown');
  const map = await A.p.evaluate(() => ({ n: document.querySelectorAll('.kmap .kb').length, hiring: document.querySelectorAll('.khire').length }));
  check('Downtown shows every building with NOW HIRING signs', map.n >= 17 && map.hiring === 14, map);
  await A.p.screenshot({ path: SHOTS + '/car_downtown.png', fullPage: true });

  /* apply */
  async function apply(p, job){
    await p.evaluate(j => carGo(j), job); await p.waitForTimeout(300);
    await p.evaluate(async j => { carApply(j); document.getElementById('kWhy1').value = 'I want to help my classmates and I am always on time for class.';
      document.getElementById('kWhy2').value = 'I study every day and I am good with people.'; document.getElementById('kRef').value = 'Coach Smith'; await carSend(j); }, job);
  }
  await apply(A.p, 'doctor'); await apply(B.p, 'sanitation'); await apply(Cc.p, 'builder');
  const bad = await A.p.evaluate(async () => { carApply('vet'); document.getElementById('kWhy1').value = 'this job is shit and I want it anyway ok'; document.getElementById('kWhy2').value = 'lots of skills here'; await carSend('vet'); return document.getElementById('kErr').textContent; });
  check('word filter blocks a bad résumé', /isn't allowed/.test(bad), bad);
  await A.p.evaluate(() => townCloseCard());

  /* teacher hires */
  await T.evaluate(async () => { townTab('admin'); }); await T.waitForTimeout(900);
  const apps = await T.evaluate(() => document.querySelectorAll('#aApps .kapp').length);
  check('teacher sees 3 applications with résumés', apps === 3, apps);
  await T.screenshot({ path: SHOTS + '/car_admin.png', fullPage: true });
  await T.evaluate(async () => { const rows = await TOWN.net.store.list(`classes/${TOWN.adminCid}/apps`); for (const a of rows) { await carHire(a.id); await new Promise(r => setTimeout(r, 250)); } });
  await A.p.waitForTimeout(900);
  const hired = await Promise.all([A.p, B.p, Cc.p].map(p => p.evaluate(() => CAREERS.myJob())));
  check('three students hired', hired.join() === 'doctor,sanitation,builder', hired);

  /* Ben gets sick → Ana (doctor) cures him with 5 right answers */
  await B.p.evaluate(async () => { CIVIC.civ().sickChk = ''; CIVIC.civ().sick = { since: Date.now() };
    await TOWN.net.store.set(`classes/${TOWN.session.cid}/cases/sick_test_${TOWN.session.sid}`, { job: 'doctor', kind: 'sick', for: TOWN.session.sid, forName: TOWN.session.name, by: TOWN.session.sid, status: 'open', need: 5, n: 0, at: Date.now() }); });
  await A.p.evaluate(() => carGo('doctor')); await A.p.waitForTimeout(600);
  await A.p.screenshot({ path: SHOTS + '/car_clinic.png', fullPage: true });
  const t0 = await A.p.evaluate(() => S.tokens);
  await A.p.evaluate(() => { const b = [...document.querySelectorAll('.cjob button')].find(x => /Help/.test(x.textContent)); b && b.click(); });
  const need = await A.p.evaluate(() => window._carW && window._carW.need);
  check('a sick patient needs 5 right answers', need === 5, need);
  await A.p.screenshot({ path: SHOTS + '/car_work.png' });
  await solve(A.p); await A.p.waitForTimeout(700);
  const cured = await B.p.evaluate(() => CIVIC.civ().sick);
  const paid = await A.p.evaluate(t0 => S.tokens - t0, t0);
  check('patient is cured and the doctor is paid per case', !cured && paid >= 2, { cured, paid });

  /* the doctor's daily shift */
  const t1 = await A.p.evaluate(() => S.tokens);
  await A.p.evaluate(() => carDuty()); await solve(A.p); await A.p.waitForTimeout(300);
  const shift = await A.p.evaluate(t1 => ({ pay: S.tokens - t1, shifts: CAREERS.car().shifts, done: CAREERS.duty().paid }), t1);
  check('shift pays the salary and counts toward promotion', shift.pay >= 4 && shift.shifts === 1 && shift.done, shift);
  const promo = await A.p.evaluate(() => { const k = CAREERS.car(); k.shifts = 6; return CAREERS.levelOf(k)[1]; });
  check('6 shifts = promotion to Associate', promo === 'Associate', promo);

  /* sanitation: litter on the plaza */
  await tab(B.p, 'plaza'); await B.p.waitForTimeout(600);
  const lit = await B.p.evaluate(() => { const spots = [...Array(6).keys()].map(i => i); return spots.length; });
  const cleaned = await B.p.evaluate(async () => {
    const d = new Date(), pad = n => String(n).padStart(2, '0'), day = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    /* tap the first litter spot through the plaza tap hook */
    const h = s => { let x = 2166136261; for (const ch of s) { x ^= ch.charCodeAt(0); x = Math.imul(x, 16777619); } return x >>> 0; };
    const hh = h(day + ':lit:0' + TOWN.session.cid), x = 320 + (hh % 600), y = 250 + ((hh >> 10) % 250);
    TOWN.EXT.plazaTap.some(f => f(x, y - 10));
    return !!window._carW; });
  await solve(B.p); await B.p.waitForTimeout(500);
  const mask = await B.p.evaluate(async () => { const d = new Date(), pad = n => String(n).padStart(2, '0'), day = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const c = await TOWN.net.store.get(`classes/${TOWN.session.cid}/cases/litter_${day}`); return c && c.mask; });
  check('sanitation crew taps litter on the plaza and cleans it', cleaned && mask === 1, { cleaned, mask, lit });
  await B.p.screenshot({ path: SHOTS + '/car_plaza.png' });

  /* town request → mayor approves → builder builds + donations → landmark */
  await T.evaluate(async () => { await TOWN.net.setClass(TOWN.adminCid, { mayor: { sid: 'ben-t', name: 'Ben T.', eid: 'e1', since: Date.now() }, mayors: [{ sid: 'ben-t', name: 'Ben T.', eid: 'e1', since: Date.now() }] }); });
  await B.p.waitForTimeout(800);
  const may = await B.p.evaluate(() => ({ owned: TOWN.town().owned.mansion, style: TOWN.town().house.style, desk: TOWN.has('mayor_desk'), disc: TOWN.priceOf(TOWN.ITEMS.bed_basic) }));
  check('new mayor gets the Mansion, mayor furniture and the shop discount', may.owned && may.style === 'mansion' && may.desk && may.disc < 6, may);
  await A.p.evaluate(() => carGo('board')); await A.p.waitForTimeout(300);
  await A.p.evaluate(async () => { carPropose(); carPropose2('garden'); document.getElementById('kNote').value = 'We need fresh veggies'; await carPropose3('garden'); });
  await B.p.evaluate(() => carGo('board')); await B.p.waitForTimeout(600);
  await B.p.screenshot({ path: SHOTS + '/car_board.png', fullPage: true });
  await B.p.evaluate(async () => { const r = (await TOWN.net.store.list(`classes/${TOWN.session.cid}/requests`))[0]; await carReqSet(r.id, 'approved'); });
  await Cc.p.evaluate(() => carGo('builder')); await Cc.p.waitForTimeout(700);
  await Cc.p.evaluate(() => carDuty()); await solve(Cc.p); await Cc.p.waitForTimeout(400);
  const prog = await Cc.p.evaluate(async () => (await TOWN.net.store.list(`classes/${TOWN.session.cid}/requests`))[0].n);
  check('builder shift adds blocks to the approved project', prog === 5, prog);
  await A.p.evaluate(async () => { const r = (await TOWN.net.store.list(`classes/${TOWN.session.cid}/requests`))[0];
    await TOWN.net.store.update(`classes/${TOWN.session.cid}/requests/${r.id}`, { n: r.need }); });
  await A.p.waitForTimeout(500);
  for (let i = 0; i < 4; i++) { await A.p.evaluate(async () => { const r = (await TOWN.net.store.list(`classes/${TOWN.session.cid}/requests`))[0]; await carDonate(r.id); }); await A.p.waitForTimeout(250); }
  await A.p.waitForTimeout(600);
  const st = await A.p.evaluate(async () => (await TOWN.net.store.list(`classes/${TOWN.session.cid}/requests`))[0]);
  check('fully built + funded project becomes a landmark', st.status === 'done', { s: st.status, n: st.n, c: st.coins });
  const ribbon = await B.p.evaluate(() => !!TOWN.town().applied[Object.keys(TOWN.town().applied).find(k => k.startsWith('ribbon:'))]);
  check('mayor gets the ribbon-cutting bonus', ribbon, ribbon);

  /* mayor's executive action */
  const h0 = await A.p.evaluate(() => S.tokens);
  await B.p.evaluate(async () => { await carAct('holiday'); }); await A.p.waitForTimeout(800);
  await A.p.evaluate(() => new Promise(r => setTimeout(r, 300)));
  const h1 = await A.p.evaluate(() => S.tokens);
  check('Town Holiday pays everyone', h1 - h0 >= 3, { h0, h1 });
  await B.p.evaluate(() => carGo('mansion')); await B.p.waitForTimeout(400);
  await B.p.screenshot({ path: SHOTS + '/car_mansion.png', fullPage: true });

  /* fire → seat opens */
  await T.evaluate(async () => { window.confirm = () => true; await carFire('builder', 'cara-l'); }); await Cc.p.waitForTimeout(800);
  const fired = await Cc.p.evaluate(() => CAREERS.myJob());
  check('fired student loses the job and the seat reopens', fired === null, fired);

  /* service request: tutor needs a tutor, so it's closed */
  await Cc.p.evaluate(() => carGo('tutor')); await Cc.p.waitForTimeout(300);
  await Cc.p.screenshot({ path: SHOTS + '/car_tutor.png', fullPage: true });

  await T.evaluate(() => townTab('admin')); await T.waitForTimeout(800); await T.screenshot({ path: SHOTS + '/car_admin2.png', fullPage: true });
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); console.log(fail ? `${fail} FAILED` : 'all passed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
