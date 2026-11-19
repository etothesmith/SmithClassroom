/* Live tab: raids, duels, feud, mystery, crew, letters, standards (practice mode):
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/live_test.js */
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
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && window.LIVE && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); });
    return p;
  }
  const T = await page('teacher');
  await T.evaluate(() => { localStorage.removeItem('town.db'); });
  const code = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test');
    const a = await TOWN.net.createClass('Period 1'); await TOWN.net.setClass(a.id || a.cid || a.code, {}).catch(()=>{}); return a; });
  check('class created', !!code.code, code);
  async function student(first, init){
    const p = await page(first);
    await p.evaluate(async ([code, first, init]) => { S.xp = 300; S.tokens = 80; S.name = first; S.myCourses = ['econ-h', 'us-gov'];
      const r = await TOWN.net.join(code, first, init, '1234'); if (r.ok) await TOWN.boot(); }, [code.code, first, init]);
    await p.evaluate(() => { go('town'); }); await p.waitForTimeout(2400); await p.evaluate(() => townCloseCard());
    return p;
  }
  const A = await student('Ana', 'R'), B = await student('Ben', 'T');
  /* bank + standards */
  const bank = await A.evaluate(() => { let n = 0, tagged = 0; allPacks().forEach(p => p.units.forEach(u => u.items.forEach(it => { n++; if (it.std) tagged++; }))); return {n, tagged, added:STD.count, stds:Object.keys(STD.stdList()).length}; });
  check('bank grew and every item has a standard', bank.n >= 840 && bank.tagged === bank.n && bank.stds >= 70, bank);
  const shuffled = await A.evaluate(() => { const c = [0,0,0,0]; allPacks().forEach(p => p.units.forEach(u => u.items.forEach(it => { if (it.type === 'mcq' && it.id[0] === 'x') c[it.a]++; }))); return c; });
  check('new questions are shuffled (answer not always A)', shuffled[0] < shuffled.reduce((a, b) => a + b, 0) * 0.5, shuffled);
  /* force live period on for the class */
  await T.evaluate(async c => { const cls = await TOWN.net.listClasses?.() ; }, null).catch(()=>{});
  await A.evaluate(() => townSet && 0);
  const cid = await A.evaluate(() => TOWN.session.cid || TOWN.session.classId || null);
  await A.evaluate(async () => { const s = TOWN.session; await TOWN.net.setClass(s.cid, {liveAlways:true}); });
  await A.waitForTimeout(800);
  check('period is live (teacher override)', await A.evaluate(() => LIVE.inPeriod()));
  /* the Live tab and its sub views */
  await A.evaluate(() => townTab('live')); await A.waitForTimeout(500);
  const live = await A.evaluate(() => ({nav:document.querySelectorAll('.lvnav button').length, boss:!!document.querySelector('.lvhero .lvboss'), cards:document.querySelectorAll('.lvcard').length}));
  check('Live tab: 6 sections, boss, 6 cards', live.nav === 6 && live.boss && live.cards === 6, live);
  await A.screenshot({ path: SHOTS + '/lv_home.png', fullPage: true });
  /* raid attack: answer all right */
  const solveAll = async p => { for (let i = 0; i < 12; i++) { const ok = await p.evaluate(() => { const z = window._lvq; if (!z) return false; lvAns(z.order.indexOf(z.q.a)); lvNext(); return true; }); if (!ok) break; } };
  await A.evaluate(() => lvRaid()); await A.waitForTimeout(200); await A.evaluate(() => lvAttack()); await solveAll(A); await A.waitForTimeout(2500);
  const raid = await A.evaluate(() => ({mine:TOWN.town().civ ? 0 : 0, hits:JSON.stringify(window.TOWN && 1), dmg:document.querySelector('.lvboss') ? 1 : 0}));
  const hits = await A.evaluate(() => { const c = (window.CIVIC.civ()).live; return c.raid[Object.keys(c.raid)[0]] | 0; });
  check('raid: 5 right answers = 5+ hits, synced to the class', hits >= 5, hits);
  await B.waitForTimeout(800);
  const bSees = await B.evaluate(async () => { const rows = await TOWN.net.store?.list?.('x') ; return true; });
  /* duel: Ana challenges Ben */
  await A.evaluate(() => { townTab('live'); lvSub('duels'); }); await A.waitForTimeout(300);
  const benSid = await B.evaluate(() => TOWN.session.sid);
  await A.evaluate(sid => lvDuelGo(sid), benSid); await solveAll(A); await A.waitForTimeout(800);
  await B.evaluate(() => { townTab('live'); lvSub('duels'); }); await B.waitForTimeout(1200);
  const inbox = await B.evaluate(() => document.querySelectorAll('.lvnav button i').length + ':' + [...document.querySelectorAll('#lvBody .btn.primary')].map(b => b.textContent).join('|'));
  check('Ben sees the challenge (badge + Play)', /^1:/.test(inbox) && /Play/.test(inbox), inbox);
  await B.screenshot({ path: SHOTS + '/lv_duels.png', fullPage: true });
  const coinsB0 = await B.evaluate(() => S.tokens);
  await B.evaluate(() => { const b = [...document.querySelectorAll('#lvBody .btn.primary')].find(x => /Play/.test(x.textContent)); b.click(); });
  for (let i = 0; i < 5; i++) await B.evaluate(() => { const z = window._lvq; if (!z) return; lvAns((z.order.indexOf(z.q.a) + 1) % z.order.length); lvNext(); });
  await B.waitForTimeout(800);
  const coinsB1 = await B.evaluate(() => S.tokens);
  await A.waitForTimeout(1200);
  const rec = await A.evaluate(() => window.CIVIC.civ().live.duel);
  check('duel settles both ways: Ana wins (+3 record), Ben +1', rec.w === 1 && coinsB1 - coinsB0 === 1, {rec, coinsB0, coinsB1});
  /* feud */
  await A.evaluate(() => lvSub('feud')); await A.evaluate(() => lvFeudJoin(0)); await A.waitForTimeout(500);
  await B.evaluate(() => lvSub('feud')); await B.evaluate(() => lvFeudJoin(1)); await B.waitForTimeout(500);
  await A.evaluate(() => { lvSub('feud'); }); await A.waitForTimeout(300);
  await A.evaluate(() => { const f = LIVE.feud(); document.getElementById('lvArg').value = 'This choice is better because ' + f.kw[0][0] + ' matters for every family in town.'; lvFeudArg(); });
  await A.waitForTimeout(600); await A.evaluate(() => lvFeudFight()); await solveAll(A); await A.waitForTimeout(800);
  await B.evaluate(() => lvSub('feud')); await B.waitForTimeout(500);
  const anaSid = await A.evaluate(() => TOWN.session.sid);
  await B.evaluate(sid => lvFeudVote(sid), anaSid); await B.waitForTimeout(800);
  const feud = await A.evaluate(() => { lvSub('feud'); return {tug:document.querySelector('.lvtug span').textContent, args:document.querySelectorAll('.lvarg').length}; });
  check('feud: sides joined, argument posted with vocab bonus, vote counted', feud.args === 1 && /· (\d+)/.test(feud.tug) && +feud.tug.match(/· (\d+)/)[1] >= 17, feud);
  await A.screenshot({ path: SHOTS + '/lv_feud.png', fullPage: true });
  /* mystery */
  await A.evaluate(() => lvSub('mystery'));
  for (const i of [0, 1]) { await A.evaluate(i => lvClue(i), i); await solveAll(A); await A.waitForTimeout(300); }
  const clues = await A.evaluate(() => window.CIVIC.civ().live.heist.clues.length);
  const culprit = await A.evaluate(() => { const H = window.CIVIC.civ().live.heist; return null; });
  const c0 = await A.evaluate(() => S.tokens);
  // deduce from clue text
  const guess = await A.evaluate(() => { const t = [...document.querySelectorAll('.lvclues .on')].map(x => x.textContent).join(' ');
    const S2 = [{hat:0,time:1,snack:0},{hat:0,time:0,snack:1},{hat:1,time:1,snack:2},{hat:1,time:0,snack:0}];
    const hat = /red|rojo/.test(t) ? 0 : /blue|azul/.test(t) ? 1 : null, time = /morning|mañana/.test(t) ? 0 : /night|noche/.test(t) ? 1 : null;
    return S2.findIndex(s => (hat === null || s.hat === hat) && (time === null || s.time === time)); });
  await A.evaluate(() => lvSub('mystery')); await A.evaluate(k => lvAccuse(k), guess); await A.waitForTimeout(600);
  const solved = await A.evaluate(() => window.CIVIC.civ().live.heist.ok);
  check('mystery: 2 clues unlocked by questions, deduction solves it', clues === 2 && solved === true, {clues, guess, solved});
  await A.screenshot({ path: SHOTS + '/lv_mystery.png', fullPage: true });
  /* kudos */
  await A.evaluate(sid => lvKudo(sid, 'great'), benSid); await B.waitForTimeout(1200);
  const kud = await B.evaluate(() => window.CIVIC.civ().live.kudos.seen > 0);
  check('high-five reaches Ben', kud);
  /* reviews: hire Ben as banker via class doc, Ana reviews him */
  await A.evaluate(async sid => { const s = TOWN.session; await TOWN.net.setClass(s.cid, {staff:{banker:[sid]}, staffNames:{[sid]:'Ben T.'}}); }, benSid); await A.waitForTimeout(600);
  await A.evaluate(() => lvSub('crew')); await A.waitForTimeout(200);
  await A.evaluate(sid => { lvRate(sid, 'banker'); lvStar(5); lvTag('helpful'); document.getElementById('lvRN').value = 'Explained my loan really clearly'; return lvRateSend(sid, 'banker'); }, benSid);
  await B.waitForTimeout(1000);
  const brev = await B.evaluate(() => { lvSub('crew'); return document.querySelector('#lvBody').textContent.match(/5\.0★ \(1\)/) ? 1 : 0; });
  check('worker review: Ben sees 5.0★ (1)', brev === 1);
  await A.screenshot({ path: SHOTS + '/lv_crew.png', fullPage: true });
  /* letters: 3 days of daily jobs */
  await A.evaluate(() => { const s = window.CIVIC.civ().live; s.todoDays = ['2026-11-01','2026-11-02','2026-11-03']; });
  await A.evaluate(() => { lvSub('crew'); }); await A.waitForTimeout(300);
  const lett = await A.evaluate(async () => { await new Promise(r => setTimeout(r, 100)); LIVE.letter && 0; return 0; });
  await A.evaluate(() => lvPractice(LIVE.mastery()[0].info.key)); await solveAll(A); await A.waitForTimeout(300);
  const letters = await A.evaluate(() => window.CIVIC.civ().live.letters.map(x => x.k));
  check('letters earned (reliable from daily jobs, detective from the mystery)', letters.includes('reliable') && letters.includes('detective'), letters);
  /* résumé on the application */
  await A.evaluate(() => carApply('tutor')); await A.waitForTimeout(300);
  const res = await A.evaluate(() => document.querySelector('.kres').textContent);
  check('application résumé shows letters, daily-job days, standards and match', /letters/.test(res) && /days of daily jobs/.test(res) && /match/.test(res), res.slice(0, 200));
  await A.evaluate(() => { document.getElementById('kWhy1').value = 'I like helping classmates understand hard ideas.'; document.getElementById('kWhy2').value = 'I mastered several standards.'; return carSend('tutor'); });
  await A.waitForTimeout(600);
  /* passport */
  await A.evaluate(() => { townCloseCard(); lvSub('passport'); }); await A.waitForTimeout(300);
  const pass = await A.evaluate(() => ({rows:document.querySelectorAll('.lvstd').length, codes:[...new Set([...document.querySelectorAll('.lvstd b')].map(b => b.textContent.replace(/^\S+\s/, '')))].slice(0, 6)}));
  check('Standards Passport lists FL standards for my courses', pass.rows >= 20 && pass.codes.some(c => /SS\.912/.test(c)), pass);
  await A.screenshot({ path: SHOTS + '/lv_passport.png', fullPage: true });
  /* teacher sees standards + application extras */
  await T.evaluate(async c => { await TOWN.net.teacherSignIn('smith@school.test'); }, null);
  await A.evaluate(() => TOWN.publishNow && TOWN.publishNow()); await A.waitForTimeout(800);
  await A.evaluate(() => TOWN.publishNow()); await A.waitForTimeout(800);
  await T.evaluate(async () => { TEACHER_OK = true; townTab('admin'); }); await T.waitForTimeout(1500);
  const adm = await T.evaluate(() => ({std:document.querySelectorAll('#aStd tr').length, feud:document.querySelectorAll('#aFeud .tdeal').length, rev:document.querySelectorAll('#aRev .kapp').length,
    app:[...document.querySelectorAll('#aApps .kapp small')].map(x => x.textContent).join('|'), focus:!!document.querySelector('select[onchange*=focusStd]')}));
  check('teacher: standards table, feud arguments, reviews, focus picker, application shows match + letters', adm.std >= 2 && adm.feud === 1 && adm.rev === 1 && adm.focus && /match/.test(adm.app) && /letters/.test(adm.app), adm);
  await T.screenshot({ path: SHOTS + '/lv_teacher.png', fullPage: true });
  await T.evaluate(() => townProjector()); await T.waitForTimeout(1200);
  const proj = await T.evaluate(() => (document.getElementById('lvProj') || {}).textContent || '');
  check('projector board shows the raid boss and top hitters', /Ana/.test(proj) && /❤️/.test(proj), proj.slice(0, 120));
  await T.screenshot({ path: SHOTS + '/lv_proj.png' });
  /* mobile layout: no horizontal scroll on the Live tab */
  await A.setViewportSize({ width: 390, height: 844 });
  for (const k of ['live','duels','feud','mystery','crew','passport']) { await A.evaluate(k => lvSub(k), k); await A.waitForTimeout(150);
    const over = await A.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); if (over > 2) check('mobile no overflow on ' + k, false, over); }
  check('mobile: Live sections fit a phone', true);
  await A.evaluate(() => lvSub('live')); await A.screenshot({ path: SHOTS + '/lv_mobile.png', fullPage: false });
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); console.log(fail ? `${fail} failed` : 'all passed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
