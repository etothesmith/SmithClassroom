/* Phase 5: gigs, wanted board, merchant bonus, combos, weekly certificate (practice mode) */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/', SHOTS = process.env.SHOTS || '/tmp';
const results = []; let fail = 0;
const check = (n, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
const solve = (p, wrong) => p.evaluate(async wrong => { for (let i = 0; i < 12; i++) { const z = window._lvq; if (!z) break; lvAns(wrong ? z.order.findIndex(x => x !== z.q.a) : z.order.indexOf(z.q.a)); lvNext(); await new Promise(r => setTimeout(r, 30)); } }, !!wrong);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1366, height: 800 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  const errs = [];
  async function page(name){ const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message)); p.on('dialog', d => d.accept());
    await p.addInitScript(() => { try { if (!localStorage.getItem('town.admTab')) localStorage.setItem('town.admTab', 'all'); } catch(e){} Object.defineProperty(window, 'TOWN_FX', {configurable:true, get(){ return (k, d) => d; }, set(){} }); });
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.RECORDS && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); S.v2seen = '2.0'; }); return p; }
  const T = await page('teacher'); await T.evaluate(() => { localStorage.removeItem('town.db'); });
  const code = await T.evaluate(async () => { await TOWN.net.teacherSignIn('t@t.test'); return (await TOWN.net.createClass('3rd Period')).code; });
  async function student(first){ const p = await page(first);
    await p.evaluate(async ([code, first]) => { S.tokens = 200; S.xp = 300; const r = await TOWN.net.join(code, first, 'Q', '1234'); if (r.ok) await TOWN.boot(); go('town'); }, [code, first]);
    await p.waitForTimeout(1300); await p.evaluate(() => { townCloseCard(); const w = document.getElementById('whatsnew'); w && w.remove(); }); return p; }
  const A = await student('Ana'), B = await student('Ben');
  await A.waitForTimeout(1500);
  /* gig */
  const post = await A.evaluate(async () => { const t0 = S.tokens; w2Go('gigs'); await new Promise(r => setTimeout(r, 300)); rcPost(); await rcPostGo('tutor', 6, 'Unit 3 test Friday'); await new Promise(r => setTimeout(r, 700)); return {spent:t0 - S.tokens, n:RECORDS.gigs.length}; });
  check('posting a gig holds the pay in escrow', post.spent === 6 && post.n === 1, post);
  await B.waitForTimeout(1000);
  await B.evaluate(async () => { w2Go('gigs'); await new Promise(r => setTimeout(r, 300)); await rcTake(RECORDS.gigs[0].id); }); await B.waitForTimeout(700);
  await B.evaluate(() => rcWork(RECORDS.gigs[0].id)); await solve(B); await B.waitForTimeout(900);
  check('worker turns in the job', await A.evaluate(() => RECORDS.gigs[0].status === 'done'));
  await A.evaluate(() => { w2Go('gigs'); }); await A.waitForTimeout(500);
  await A.screenshot({ path: SHOTS + '/records_gigs.png', fullPage: true });
  const t0 = await B.evaluate(() => S.tokens);
  await A.evaluate(async () => { await rcApprove(RECORDS.gigs[0].id, 5); }); await B.waitForTimeout(1200);
  const paid = await B.evaluate(t0 => ({got:S.tokens - t0, gigs:RECORDS.wk().gigs}), t0);
  check('approval pays the worker and counts the gig', paid.got === 6 && paid.gigs === 1, paid);
  /* cancel refund */
  const ref = await A.evaluate(async () => { const t0 = S.tokens; await rcPostGo('paint', 3, ''); await new Promise(r => setTimeout(r, 600)); const g = RECORDS.gigs.find(x => x.kind === 'paint'); await rcCancel(g.id); await new Promise(r => setTimeout(r, 800)); return t0 - S.tokens; });
  check('canceling an open gig refunds it', ref === 0, ref);
  /* wanted */
  const item = await B.evaluate(() => { const id = Object.keys(TOWN.ITEMS).find(k => TOWN.ITEMS[k].p > 0 && !TOWN.ITEMS[k].biz); TOWN.addItem(id, 1); TOWN.persist(); return id; });
  await A.evaluate(async item => { await rcWantGo(item, 8); }, item); await B.waitForTimeout(1200);
  const fill = await B.evaluate(async () => { const t0 = S.tokens, w = RECORDS.wanted[0]; await rcFill(w.id); await new Promise(r => setTimeout(r, 300)); return {got:S.tokens - t0, partners:RECORDS.wk().partners.length}; });
  check('delivering a wanted item pays the bounty + merchant bonus', fill.got === 9 && fill.partners === 1, fill);
  await A.waitForTimeout(1200);
  check('the poster receives the item', await A.evaluate(item => TOWN.has(item), item));
  /* combos */
  const combo = await A.evaluate(() => { const ids = Object.values(TOWN.ITEMS).filter(i => i.set === 'ocean').map(i => i.id); ids.forEach(id => TOWN.addItem(id, 1)); const t0 = S.tokens, p0 = TOWN.priceOf(TOWN.ITEMS.rug_wave); RECORDS.checkCombos(); return {got:S.tokens - t0, sets:RECORDS.setsDone(), p0, p1:TOWN.priceOf(TOWN.ITEMS.bed_boat)}; });
  check('completing the Ocean set pays 💵5 and unlocks a shop discount', combo.got === 5 && combo.sets === 1, combo);
  check('shells combo progress tracked', await A.evaluate(() => { TOWN.CIV.civ().shells = {clam:1,scallop:1,star:1,conch:1,sanddollar:1,pearl:1}; const t0 = S.tokens; RECORDS.checkCombos(); return S.tokens - t0 === 8; }));
  await A.evaluate(() => w2Go('records')); await A.waitForTimeout(600);
  await A.screenshot({ path: SHOTS + '/records_hall.png', fullPage: true });
  /* certificate */
  const cert = await B.evaluate(() => { const w = RECORDS.wk(); w.right = 12; rcCert(); const ok = !!document.getElementById('rcCertBox'); const t0 = S.tokens; rcClaimWeek(); return {ok, got:S.tokens - t0, again:(rcClaimWeek(), S.tokens - t0)}; });
  check('weekly certificate opens; +💵3 bonus once', cert.ok && cert.got === 3 && cert.again === 3, cert);
  await B.evaluate(() => rcCert()); await B.waitForTimeout(900); await B.screenshot({ path: SHOTS + '/records_cert.png' });
  check('new furniture shows as NEW in the shop', await A.evaluate(() => Object.values(TOWN.ITEMS).filter(i => i.fresh >= 34).length === 24));
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); await b.close(); process.exit(fail ? 1 : 0);
})();
