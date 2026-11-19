/* Smithtopia civic features, end to end in practice mode (no Firebase):
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/civic_test.js
   One teacher tab and two student tabs share the practice-mode database. */
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
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && window.CIVIC && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); });
    return p;
  }
  const T = await page('teacher');
  await T.evaluate(() => { localStorage.removeItem('town.db'); });
  const code = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test'); const r = await TOWN.net.createClass('Period 2 · AP Macro'); return r.code; });
  check('teacher creates a class', /^[A-Z0-9]{6}$/.test(code), code);
  async function student(first, init, xp){
    const p = await page(first);
    const ok = await p.evaluate(async ([code, first, init, xp]) => { S.xp = xp; S.tokens = 40; S.name = first; const r = await TOWN.net.join(code, first, init, '1234');
      if (r.ok) { await TOWN.boot(); } return r; }, [code, first, init, xp]);
    await p.evaluate(() => { go('town'); }); await p.waitForTimeout(400);
    return { p, ok };
  }
  const A = await student('Ana', 'R', 500), B = await student('Ben', 'T', 800);
  check('two students join', A.ok.ok && B.ok.ok, [A.ok, B.ok]);
  const cid = A.ok.cid;
  await T.evaluate(cid => { TOWN.EXT; window._cid = cid; }, cid);
  const tset = patch => T.evaluate(([cid, patch]) => TOWN.net.setClass(cid, patch), [cid, patch]);
  const tab = (p, k) => p.evaluate(k => townTab(k), k).then(() => p.waitForTimeout(350));

  /* 1. class goal + league */
  await tset({ goal: { id: 'g1', target: 300, reward: 'fountain', start: Date.now(), done: false } });
  await A.p.waitForTimeout(300); await B.p.waitForTimeout(300);
  await A.p.evaluate(() => { S.xp += 120; TOWN.publishNow(); }); await B.p.evaluate(() => { S.xp += 200; TOWN.publishNow(); });
  await A.p.waitForTimeout(500);
  await tab(A.p, 'hall'); await A.p.waitForTimeout(400);
  const gp = await A.p.evaluate(() => CIVIC.goalProgress());
  check('class goal adds everyone\'s XP since the goal started', gp.n === 320, gp);
  const unl = await A.p.evaluate(() => CIVIC.unlocked());
  check('goal reached unlocks the plaza upgrade', unl.includes('fountain'), unl);
  const crA = await A.p.evaluate(() => TOWN.town().crates);
  check('goal reward crate', crA >= 3, crA);
  await A.p.screenshot({ path: SHOTS + '/civic_hall.png', fullPage: true });
  const league = await A.p.evaluate(() => CIVIC.LEAGUE);
  check('league row for this period', league.length === 1 && league[0].total > 0, league);

  /* 2. bank */
  await tab(A.p, 'bank');
  const bank = await A.p.evaluate(() => { document.getElementById('bAmt').value = 20; civBank('in'); const c = CIVIC.civ();
    c.bank.at = '2020-01-01'; CIVIC.accrue(); const after = c.bank.bal; return { bal: after, cash: S.tokens }; });
  check('deposit + interest accrues', bank.bal > 20 && bank.cash === 20, bank);
  const loan = await A.p.evaluate(() => { townTab('bank'); document.getElementById('lAmt').value = 10; window.confirm = () => true; civBorrow(); const owe = CIVIC.loanOwed(); civRepay(); return { owe, credit: CIVIC.civ().bank.credit, loan: CIVIC.civ().bank.loan }; });
  check('loan, repay, credit goes up', loan.owe >= 10 && loan.credit === 675 && !loan.loan, loan);
  await A.p.screenshot({ path: SHOTS + '/civic_bank.png', fullPage: true });

  /* 3. economy event */
  const base = await A.p.evaluate(() => TOWN.priceOf(TOWN.ITEMS.bed_basic));
  await tset({ event: { id: 'e1', kind: 'tariff', start: Date.now(), until: Date.now() + 864e5 } }); await A.p.waitForTimeout(300);
  const tariffed = await A.p.evaluate(() => TOWN.priceOf(TOWN.ITEMS.bed_basic)), pet = await A.p.evaluate(() => TOWN.priceOf(TOWN.ITEMS.pet_goldfish));
  check('tariff raises imported furniture prices only', tariffed > base && pet === 5, { base, tariffed, pet });
  await tab(A.p, 'shop');
  const evq = await A.p.evaluate(() => { civEventQ(); const st = window._civQ; const k = st.order.indexOf(st.q.a); const c0 = S.tokens; civAnswer(k); return S.tokens - c0; });
  check('event question pays 2 coins', evq === 2, evq);
  await A.p.evaluate(() => townCloseCard()); await A.p.screenshot({ path: SHOTS + '/civic_event.png' });

  /* 4. election + law */
  await tset({ election: { id: 'el1', office: 'mayor', phase: 'filing', at: Date.now() } }); await A.p.waitForTimeout(300);
  await tab(A.p, 'hall');
  await A.p.evaluate(async () => { civRun(); civPlank({ dataset: { k: 'park' } }); civPlank({ dataset: { k: 'savings' } }); await civFile(); });
  await tset({ election: { id: 'el1', office: 'mayor', phase: 'voting', at: Date.now() } }); await B.p.waitForTimeout(300);
  await tab(B.p, 'hall'); await B.p.waitForTimeout(300);
  await B.p.evaluate(async () => { window.confirm = () => true; const sid = TOWN.session.sid === 'ana-r' ? 'ben-t' : 'ana-r'; await civVote('ana-r'); });
  const dbl = await B.p.evaluate(async () => { const before = Object.keys(JSON.parse(localStorage.getItem('town.db'))).filter(k => k.includes('/votes/')).length; return before; });
  await B.p.screenshot({ path: SHOTS + '/civic_vote.png', fullPage: true });
  await T.evaluate(async () => { TOWN.EXT; townTab('admin'); }); await T.waitForTimeout(500);
  await T.evaluate(async () => { await civTally(); }); await T.waitForTimeout(500);
  const mayor = await A.p.evaluate(() => TOWN.cls.mayor);
  check('election tallied, mayor elected', mayor && mayor.sid === 'ana-r' && dbl === 1, { mayor, votes: dbl });
  await A.p.evaluate(async () => { await civProposeGo('pet_cap'); }); await A.p.waitForTimeout(200);
  const pid = await B.p.evaluate(async () => { const rows = await TOWN.net.store.list(`classes/${TOWN.session.cid}/proposals`); return rows[0] && rows[0].id; });
  await A.p.evaluate(pid => civLawVote(pid, true), pid); await B.p.evaluate(pid => civLawVote(pid, true), pid);
  await T.evaluate(async pid => { await civLawTally(pid); }, pid); await A.p.waitForTimeout(400);
  const lawOn = await A.p.evaluate(() => TOWN.cls.laws);
  check('law passes and takes effect', (lawOn || []).includes('pet_cap'), lawOn);
  await tab(A.p, 'hall'); await A.p.screenshot({ path: SHOTS + '/civic_laws.png', fullPage: true });
  await T.evaluate(async pid => { window.confirm = () => true; await civStrike(pid); }, pid); await A.p.waitForTimeout(300);
  check('Supreme Court strikes it down', !(await A.p.evaluate(() => TOWN.cls.laws || [])).includes('pet_cap'));

  /* 4b. laws in the mayor's own words + the word filter */
  check('word filter blocks bad words (and disguised ones)', await A.p.evaluate(() => !civCleanText('this is sh1t') && !civCleanText('F.U.C.K') && !civCleanText('pendejo') && civCleanText('Homework-Free Fridays') && civCleanText('Class assets and grass')));
  const cl = await A.p.evaluate(async () => { townTab('hall'); civWriteLaw(); document.getElementById('lwT').value = 'Dumb ass rule'; document.getElementById('lwD').value = 'whatever goes here ok';
    await civWriteLawGo(); const blocked = document.getElementById('lwErr').textContent;
    document.getElementById('lwT').value = 'Homework-Free Fridays'; document.getElementById('lwD').value = 'No new homework is assigned on Fridays.'; await civWriteLawGo();
    const rows = await TOWN.net.store.list(`classes/${TOWN.session.cid}/proposals`); return { blocked, rows: rows.filter(r => r.key === 'custom').map(r => [r.id, r.status, r.title]) }; });
  check('custom law: bad word blocked, clean one goes to review', /allowed/.test(cl.blocked) && cl.rows.length === 1 && cl.rows[0][1] === 'review', cl);
  const cpid = cl.rows[0][0];
  await T.evaluate(async pid => { window.confirm = () => true; window.alert = () => {}; const answers = ['Homework-Free Fridays!', 'No new homework on Fridays, ever.']; window.prompt = () => answers.shift();
    await civEditLaw(pid); await civApprove(pid); }, cpid);
  await B.p.evaluate(pid => civLawVote(pid, true), cpid); await B.p.waitForTimeout(300);
  await T.evaluate(async pid => { await civLawTally(pid); }, cpid); await A.p.waitForTimeout(500);
  const cust = await A.p.evaluate(() => TOWN.cls.customLaws);
  check('teacher edits, approves; class passes it into the town laws', cust && cust[0] && cust[0].title === 'Homework-Free Fridays!', cust);

  /* 4c. impeachment */
  await B.p.evaluate(async () => { townTab('hall'); await civPetitionGo('promise'); });
  await T.evaluate(async () => { window.confirm = () => true; await civImpeach('house'); }); await B.p.waitForTimeout(400);
  const iid = await B.p.evaluate(() => TOWN.cls.impeach.id);
  await B.p.evaluate(id => civLawVote(id + '_house', true), iid); await B.p.waitForTimeout(300);
  await T.evaluate(async () => { await civImpCount('house'); }); await B.p.waitForTimeout(400);
  const ph = await B.p.evaluate(() => TOWN.cls.impeach.phase);
  await tab(A.p, 'hall'); await A.p.screenshot({ path: SHOTS + '/civic_impeach.png', fullPage: true });
  await B.p.evaluate(id => civLawVote(id + '_senate', true), iid); await B.p.waitForTimeout(300);
  await T.evaluate(async () => { await civImpCount('senate'); }); await A.p.waitForTimeout(500);
  const after = await A.p.evaluate(() => ({ mayor: TOWN.cls.mayor, res: TOWN.cls.impeach.result }));
  check('impeached by the House, removed by 2/3 in the trial', ph === 'senate' && !after.mayor && /removed/.test(after.res.en), { ph, after });
  /* put a mayor back for the rest of the test */
  await T.evaluate(async () => { await TOWN.net.setClass(TOWN.adminCid, { mayor: { sid: 'ana-r', name: 'Ana R.', eid: 'el1' } }); });

  /* 5. business + partner payout */
  await tab(A.p, 'jobs');
  await A.p.evaluate(() => { window.confirm = () => true; civStartBiz('bakery'); civPartnerGo('ben-t'); TOWN.publishNow(); }); await B.p.waitForTimeout(1200);
  await tab(B.p, 'jobs'); await B.p.waitForTimeout(300);
  await B.p.evaluate(() => civJoinBiz('ana-r')); await B.p.evaluate(() => TOWN.publishNow()); await A.p.waitForTimeout(1200);
  await A.p.evaluate(() => civMake('prod_cupcakes'));
  await A.p.evaluate(async () => { townTab('market'); await new Promise(r => setTimeout(r, 300)); const s = document.getElementById('mItem'); s.value = 'prod_cupcakes'; document.getElementById('mPrice').value = 12; await townList(); });
  await B.p.waitForTimeout(400);
  const bTok0 = await B.p.evaluate(() => S.tokens);
  await B.p.evaluate(async () => { townTab('market'); await new Promise(r => setTimeout(r, 400)); window.confirm = () => true; const m = TOWN.net && document.querySelector('#mList .btn.primary'); if (m) m.click(); });
  await A.p.waitForTimeout(1200); await B.p.waitForTimeout(1200);
  const biz = await A.p.evaluate(() => CIVIC.civ().biz), bTok1 = await B.p.evaluate(() => S.tokens);
  check('product sold; partner gets half the profit', biz.sold === 1 && biz.rev === 12 && bTok1 - bTok0 === -12 + 5, { biz, bDelta: bTok1 - bTok0 });
  await tab(A.p, 'jobs'); await A.p.screenshot({ path: SHOTS + '/civic_jobs.png', fullPage: true });

  /* 6. jobs + Home of the Week */
  await B.p.evaluate(() => townDoor('open')); await A.p.waitForTimeout(500);
  await A.p.evaluate(async () => { townVisit('ben-t'); await new Promise(r => setTimeout(r, 500)); await civHotw('ben-t'); });
  await A.p.waitForTimeout(300); await A.p.screenshot({ path: SHOTS + '/civic_house.png', fullPage: true });
  const jobs = await A.p.evaluate(() => { const j = CIVIC.civ().jobs; return { picks: j.picks, done: j.picks.map(k => CIVIC.jobDone(k)), flags: j.flags }; });
  check('daily jobs are mostly class work, and still track visit and vote', jobs.picks[0] === 'answer10' && /^study/.test(jobs.picks[1]) && jobs.flags.visit && jobs.flags.vote, jobs);
  const pay = await A.p.evaluate(() => { const j = CIVIC.civ().jobs; const k = j.picks.find(k => CIVIC.jobDone(k)); if (!k) return null; const c0 = S.tokens; civCollect(k); return S.tokens - c0; });
  check('collect a finished job', pay >= 1, pay);
  const again = await A.p.evaluate(async () => { try { await civHotw('ben-t'); } catch(e){} return Object.keys(JSON.parse(localStorage.getItem('town.db'))).filter(k => k.includes('/hotw/')).length; });
  check('one Home of the Week vote per week', again === 1, again);

  /* 7. plaza quiz */
  await tab(A.p, 'plaza');
  await T.evaluate(async () => { const pk = allPacks()[0]; const it = pk.units[0].items.find(i => i.type === 'mcq'); await TOWN.net.setClass(TOWN.adminCid, { quiz: { id: 'q1', phase: 'open', at: Date.now(), q: { q: it.q, c: it.c, a: it.a } } }); });
  await A.p.waitForTimeout(800);
  await A.p.screenshot({ path: SHOTS + '/civic_quiz.png' });
  await A.p.evaluate(async () => { const q = TOWN.cls.quiz; await civQuizAns(q.q.a); }); await T.waitForTimeout(600);
  await T.evaluate(async () => { await civReveal(); }); await A.p.waitForTimeout(600);
  const qz = await A.p.evaluate(() => ({ phase: TOWN.cls.quiz.phase, first: TOWN.cls.quiz.first, paid: !!TOWN.town().applied['quiz:q1'] }));
  check('plaza quiz: answer, reveal, fastest list, coin', qz.phase === 'reveal' && qz.first[0] === 'Ana R.' && qz.paid, qz);
  await A.p.screenshot({ path: SHOTS + '/civic_reveal.png' });
  await T.evaluate(() => { townTab('admin'); }); await T.waitForTimeout(700); await T.screenshot({ path: SHOTS + '/civic_admin.png', fullPage: true });

  /* 8. unit paychecks + shop local */
  const up = await A.p.evaluate(async () => { const t0 = S.tokens;
    S.certs.push({ code: 'X1', unit: 'Macro Unit 2', course: 'AP Economics', score: 90 }); TOWN.CIV.unitPaychecks(); const t1 = S.tokens;
    TOWN.CIV.unitPaychecks(); return [t1 - t0, S.tokens - t1]; });
  check('a new certificate pays 15 Smithbucks, once', up[0] === 15 && up[1] === 0, up);
  const sl = await B.p.evaluate(() => ({ stamps: CIVIC.civ().stamps, flag: CIVIC.civ().jobs.flags.buylocal }));
  check('buying from a classmate stamps the Shop Local card', sl.stamps === 1 && sl.flag === 1, sl);
  await tab(B.p, 'market'); await B.p.screenshot({ path: SHOTS + '/civic_shoplocal.png' });
  check('no page errors', !errs.length, errs);
  console.log(results.join('\n')); console.log(fail ? fail + ' FAILED' : 'all passed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
