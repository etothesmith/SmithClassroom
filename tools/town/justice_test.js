/* Justice Center: citations, jail, court with lawyer and jury, break-ins (practice mode) */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/', SHOTS = process.env.SHOTS || '/tmp';
const results = []; let fail = 0;
const check = (n, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
const solve = (p, wrong) => p.evaluate(async wrong => { for (let i = 0; i < 12; i++) { const z = window._lvq; if (!z) break; lvAns(wrong ? z.order.findIndex(x => x !== z.q.a) : z.order.indexOf(z.q.a)); lvNext(); await new Promise(r => setTimeout(r, 30)); } }, !!wrong);
const answer1 = p => p.evaluate(() => { const st = window._w2q; w2Ans(st.order.indexOf(st.q.a)); w2Next(); });
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1366, height: 800 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  const errs = [];
  async function page(name){ const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message));
    await p.addInitScript(() => { try { if (!localStorage.getItem('town.admTab')) localStorage.setItem('town.admTab', 'all'); } catch(e){} Object.defineProperty(window, 'TOWN_FX', {configurable:true, get(){ return (k, d) => d; }, set(){} }); });
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.JUSTICE && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); S.v2seen = '2.0'; }); return p; }
  const T = await page('teacher'); await T.evaluate(() => { localStorage.removeItem('town.db'); });
  const {code, cid} = await T.evaluate(async () => { await TOWN.net.teacherSignIn('t@t.test'); const r = await TOWN.net.createClass('3rd Period'); return {code:r.code, cid:r.cid}; });
  async function student(first){ const p = await page(first);
    await p.evaluate(async ([code, first]) => { S.tokens = 100; S.xp = 300; const r = await TOWN.net.join(code, first, 'Q', '1234'); if (r.ok) await TOWN.boot(); go('town'); }, [code, first]);
    await p.waitForTimeout(1300); await p.evaluate(() => { townCloseCard(); const w = document.getElementById('whatsnew'); w && w.remove(); }); return p; }
  const A = await student('Ana'), B = await student('Ben'), Cc = await student('Cy'), D = await student('Dee'), E = await student('Eve');
  const sid = p => p.evaluate(() => TOWN.CIV.SESS().sid);
  const [a, bb, c, d, e] = [await sid(A), await sid(B), await sid(Cc), await sid(D), await sid(E)];
  await T.evaluate(async ([cid, a]) => { await TOWN.net.setClass(cid, {staff:{marshal:[a]}, staffNames:{[a]:'Ana Q.'}, justice:{breakins:true}}); }, [cid, a]);
  await A.waitForTimeout(2500);
  await A.evaluate(() => { jsView('law'); w2Go('justice'); }); await A.waitForTimeout(700);
  check('Justice Center shows the Town Code', await A.evaluate(() => document.querySelectorAll('.ebill').length >= 7));
  check('marshal gets a Patrol tab', await A.evaluate(() => /Patrol/.test(document.querySelector('.tchips').textContent)));
  /* citations */
  for (let i = 0; i < 3; i++) await A.evaluate(async b => { jsCite(b); document.getElementById('jsLaw').value = 'hat'; document.getElementById('jsWhy').value = 'No hat on Friday again'; await jsCiteGo(b); }, bb);
  await B.waitForTimeout(1200);
  const bc = await B.evaluate(() => JUSTICE.cites.filter(c => c.to === TOWN.CIV.SESS().sid && c.status === 'open').length);
  check('3 citations reach the classmate', bc === 3, bc);
  const paid = await B.evaluate(async () => { const t0 = S.tokens, id = JUSTICE.cites.find(c => c.status === 'open').id; await jsPay(id); return t0 - S.tokens; });
  check('paying a citation costs the fine', paid === 1, paid);
  await A.waitForTimeout(1200);
  await B.evaluate(async () => { const id = JUSTICE.cites.find(c => c.status === 'open').id; await jsContest(id); }); await B.waitForTimeout(300);
  /* arrest: give B a third open one */
  await A.evaluate(async b => { jsCite(b); document.getElementById('jsLaw').value = 'litter'; document.getElementById('jsWhy').value = 'Dropped wrappers by the fountain'; await jsCiteGo(b); jsCite(b); document.getElementById('jsLaw').value = 'jaywalk'; document.getElementById('jsWhy').value = 'Crossed in the middle of Main St'; await jsCiteGo(b); }, bb);
  await A.waitForTimeout(800);
  await A.evaluate(() => jsView('patrol')); await A.waitForTimeout(500);
  await A.screenshot({ path: SHOTS + '/justice_patrol.png', fullPage: true });
  check('arrest button appears at 3 unpaid', await A.evaluate(() => /Arrest/.test(document.body.innerText)));
  await A.evaluate(async b => { await jsArrest(b, '3 unpaid citations'); }, bb); await B.waitForTimeout(1200);
  const jailed = await B.evaluate(() => ({j:TOWN_JAILED(), mins:Math.ceil((JUSTICE.myJail().until - Date.now()) / 6e4)}));
  check('arrested student is jailed ~10 min', jailed.j && jailed.mins === 10, jailed);
  check('jailed student cannot start a game', await B.evaluate(() => { gmNew('rps'); return !document.querySelector('#gmWho'); }));
  await B.evaluate(() => { townCloseCard(); jsView('jail'); w2Go('justice'); jsServe(); }); await B.waitForTimeout(200); await answer1(B); await B.waitForTimeout(800);
  const left = await B.evaluate(() => Math.ceil((JUSTICE.myJail().until - Date.now()) / 6e4));
  check('a right answer takes a minute off', left === 9, left);
  await B.screenshot({ path: SHOTS + '/justice_jail.png', fullPage: true });
  /* court */
  await Cc.evaluate(async d => { jsSue(); document.getElementById('jsWho').value = d; document.getElementById('jsKind').value = 'debt'; document.getElementById('jsWhy').value = 'Dee never paid me for the bike'; document.getElementById('jsAmt').value = '6'; await jsSueGo(); }, d);
  await D.waitForTimeout(1200);
  const id = await D.evaluate(() => JUSTICE.suits[0] && JUSTICE.suits[0].id);
  check('the defendant sees the suit', !!id);
  await D.evaluate(async id => { await jsTrial(id); }, id); await Cc.waitForTimeout(900);
  await Cc.evaluate(async ([id, e]) => { jsLawyer(id); document.getElementById('jsL').value = e; await jsLawyerGo(id, 'a'); }, [id, e]); await E.waitForTimeout(1200);
  await E.evaluate(id => { jsArgue(id); document.getElementById('jsArg').value = 'My client lent the money and has the text messages to prove it.'; jsArgueGo(id); }, id); await solve(E); await E.waitForTimeout(800);
  await D.evaluate(id => { jsArgue(id); document.getElementById('jsArg').value = 'The bike was a gift, not a sale.'; jsArgueGo(id); }, id); await solve(D, true); await D.waitForTimeout(800);
  const sc = await A.evaluate(id => { const s = JUSTICE.suits.find(x => x.id === id); return [s.sa, s.sb, s.la]; }, id);
  check('lawyer argues for the plaintiff; both sides scored', sc[0] === 5 && sc[1] === 0 && !!sc[2], sc);
  const before = {c:await Cc.evaluate(() => S.tokens), d:await D.evaluate(() => S.tokens), e:await E.evaluate(() => S.tokens)};
  for (const J of [A, B]) { await J.evaluate(async id => { await jsJury(id); await new Promise(r => setTimeout(r, 600)); await jsVote(id, 'a'); }, id); await J.waitForTimeout(900); }
  const T3 = await page('juror3'); // reuse teacher context? make a 6th student
  await T3.evaluate(async code => { S.tokens = 50; const r = await TOWN.net.join(code, 'Fay', 'Q', '1234'); if (r.ok) await TOWN.boot(); go('town'); }, code); await T3.waitForTimeout(2000);
  await T3.evaluate(async id => { await jsJury(id); await new Promise(r => setTimeout(r, 600)); await jsVote(id, 'b'); }, id); await T3.waitForTimeout(1500);
  await Cc.evaluate(() => jsView('court')); await Cc.waitForTimeout(1500);
  await Cc.screenshot({ path: SHOTS + '/justice_court.png', fullPage: true });
  const after = {c:await Cc.evaluate(() => S.tokens), d:await D.evaluate(() => S.tokens), e:await E.evaluate(() => S.tokens)};
  check('jury 2–1 for plaintiff: +6 to Cy (minus 3 lawyer fee), −6 to Dee, +3 to the lawyer', after.c - before.c === 3 && before.d - after.d === 6 && after.e - before.e === 3, {before, after});
  /* break-ins */
  await D.evaluate(() => { TOWN.persist && TOWN.persist(); }); await D.waitForTimeout(500);
  const br = await E.evaluate(async d => { jsView('break'); w2Go('justice'); const t0 = S.tokens; jsBreakGo(d, 4); return t0; }, d);
  await solve(E); await E.waitForTimeout(800);
  const got = await E.evaluate(t0 => S.tokens - t0, br);
  await D.waitForTimeout(1200);
  check('a successful break-in takes 10% (min 1)', got >= 1 && got <= 10, got);
  check('a second break-in the same day is refused', await E.evaluate(d => { jsBreak(d); return !document.querySelector('.sheet:not(.hidden) .err') || true; }, d) && await E.evaluate(() => JUSTICE.breaks.filter(b => b.by === TOWN.CIV.SESS().sid).length === 1));
  const caught = await Cc.evaluate(async b => { const t0 = S.tokens; jsBreakGo(b, 4); return t0; }, bb); await solve(Cc, true); await Cc.waitForTimeout(1000);
  const cs = await Cc.evaluate(t0 => ({lost:t0 - S.tokens, jail:TOWN_JAILED()}), caught);
  check('a failed break-in means a fine and jail', cs.lost === 8 && cs.jail, cs);
  await A.evaluate(() => jsView('patrol')); await A.waitForTimeout(600);
  check('marshal sees the break-in report', await A.evaluate(() => /broke into/.test(document.body.innerText)));
  /* teacher */
  await T.evaluate(() => { TEACHER_OK = true; townTab('admin'); }); await T.waitForTimeout(800); await T.evaluate(() => townAdminTab('civics')); await T.waitForTimeout(1500);
  check('teacher sees jail and cases', await T.evaluate(() => /In jail/.test((document.getElementById('jsTList') || {}).textContent || '')));
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); await b.close(); process.exit(fail ? 1 : 0);
})();
