/* Money tab: Exchange, lottery, bills/budget, mortgages (practice mode) */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/', SHOTS = process.env.SHOTS || '/tmp';
const results = []; let fail = 0;
const check = (n, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1366, height: 800 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  const errs = [];
  async function page(name){ const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message));
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.ECON && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); S.v2seen = '2.0'; }); return p; }
  const T = await page('teacher'); await T.evaluate(() => { localStorage.removeItem('town.db'); });
  const code = await T.evaluate(async () => { await TOWN.net.teacherSignIn('t@t.test'); return (await TOWN.net.createClass('3rd Period')).code; });
  async function student(first){ const p = await page(first);
    await p.evaluate(async ([code, first]) => { S.tokens = 200; S.xp = 300; const r = await TOWN.net.join(code, first, 'Q', '1234'); if (r.ok) await TOWN.boot(); go('town'); }, [code, first]);
    await p.waitForTimeout(1500); await p.evaluate(() => { townCloseCard(); const w = document.getElementById('whatsnew'); w && w.remove(); }); return p; }
  const A = await student('Ana'), B = await student('Ben');
  /* exchange */
  const ex = await A.evaluate(() => ({n:ECON.CO.length, same:ECON.price(ECON.CO[0]) > 0, s:ECON.series(ECON.CO[0]).length}));
  const exB = await B.evaluate(() => ECON.price(ECON.CO[0]));
  const exA = await A.evaluate(() => ECON.price(ECON.CO[0]));
  check('8 companies with an hourly price history', ex.n === 8 && ex.s > 1000, ex);
  check('every classmate sees the same price', Math.abs(exA - exB) < 1e-9, [exA, exB]);
  await A.evaluate(() => { townTab('money'); }); await A.waitForTimeout(500);
  check('Money tab shows the Exchange', await A.evaluate(() => document.querySelectorAll('.eco').length) === 8);
  await A.screenshot({ path: SHOTS + '/econ_stocks.png', fullPage: true });
  const buy = await A.evaluate(() => { const t0 = S.tokens; ecTrade('BANK','buy'); document.getElementById('ecN').value = 3; ecGo('BANK','buy'); return {spent:t0 - S.tokens, own:ECON.ec().stk.BANK.n}; });
  check('buying 3 shares takes cash and adds shares', buy.own === 3 && buy.spent > 0, buy);
  const sell = await A.evaluate(() => { const t0 = S.tokens; ecTrade('BANK','sell'); document.getElementById('ecN').value = 1; ecGo('BANK','sell'); return {got:S.tokens - t0, own:ECON.ec().stk.BANK.n}; });
  check('selling a share returns cash (minus fee)', sell.own === 2 && sell.got > 0, sell);
  const boom = await T.evaluate(async () => { TEACHER_OK = true; townTab('admin'); await new Promise(r => setTimeout(r, 900)); ecMood('boom'); await new Promise(r => setTimeout(r, 900)); return true; });
  await A.waitForTimeout(1200);
  check('teacher boom shows on the Exchange', await A.evaluate(() => { townTab('money'); return /Boom/.test(document.querySelector('.eex').textContent); }));
  /* lottery */
  await A.evaluate(() => ecSub('lotto')); await A.waitForTimeout(700);
  const lot = await A.evaluate(async () => { const t0 = S.tokens; ltPick(3); ltPick(7); ltPick(11); await ltBuy(); await new Promise(r => setTimeout(r, 300)); return {spent:t0 - S.tokens}; });
  check('lottery ticket costs 2', lot.spent === 2, lot);
  await B.evaluate(async () => { townTab('money'); ecSub('lotto'); await new Promise(r => setTimeout(r, 600)); ltQuick(); await ltBuy(); });
  await A.waitForTimeout(5500); await A.evaluate(() => ecSub('lotto')); await A.waitForTimeout(900);
  const jp = await A.evaluate(() => document.querySelector('.ejack b').textContent);
  check('jackpot = 60% of 2 tickets (💵2)', /💵2$/.test(jp), jp);
  await A.screenshot({ path: SHOTS + '/econ_lotto.png', fullPage: true });
  const dr = await A.evaluate(() => { const t = [{nums:'1-2-3'},{nums:'4-5-6'}]; const a = ECON.drawn('2026-11-16', t), b2 = ECON.drawn('2026-11-16', t); return {a, same:a.join() === b2.join(), m:ECON.matches('3-7-11', [3,7,11])}; });
  check('drawing is the same for everyone and matches count right', dr.same && dr.a.length === 3 && dr.m === 3, dr);
  /* bills */
  await A.evaluate(() => ecSub('bills')); await A.waitForTimeout(400);
  const bills = await A.evaluate(() => ({n:ECON.ec().bills.items.length, total:ECON.ec().bills.items.reduce((a, b) => a + b.amt, 0)}));
  check('weekly bills arrive (utilities, phone, groceries)', bills.n >= 3 && bills.total >= 4, bills);
  const paid = await A.evaluate(() => { const t0 = S.tokens; blPayAll(); return {spent:t0 - S.tokens, all:ECON.ec().bills.items.every(b => b.paid), flow:ECON.ec().flow[TOWN.CIV.week()]}; });
  check('pay all clears bills and the budget counts them as needs', paid.all && paid.flow.bills === paid.spent, paid);
  const late = await A.evaluate(() => { const e = ECON.ec(); e.bills.items.push({k:'x', e:'x', l:['Test','Test'], amt:3, paid:false}); e.bills.wk = '2000-01-03'; const c0 = TOWN.CIV.civ().bank.credit; ECON.rollBills(); return {late:e.bills.items[0].k, drop:c0 - TOWN.CIV.civ().bank.credit}; });
  check('unpaid bills roll into late fees and cost 15 credit points', late.late === 'late' && late.drop === 15, late);
  await A.screenshot({ path: SHOTS + '/econ_bills.png', fullPage: true });
  /* budget autosave */
  const save = await A.evaluate(() => { blSave(20); const b0 = TOWN.CIV.civ().bank.bal | 0; TOWN.coins(10); return {bank:(TOWN.CIV.civ().bank.bal | 0) - b0}; });
  check('auto-save 20% moves 2 of a 10 paycheck into the bank', save.bank === 2, save);
  /* mortgage */
  await A.evaluate(() => ecSub('mort')); await A.waitForTimeout(300);
  const mort = await A.evaluate(() => { const t0 = S.tokens; mgOffer('mansion'); mgTake('mansion'); const m = ECON.ec().mort; return {down:t0 - S.tokens, owned:!!TOWN.town().owned.mansion, pay:m && m.pay, left:m && m.left, inBills:ECON.ec().bills.items.some(b => b.k === 'mort')}; });
  check('mortgage: 20% down, house owned, payment added to bills', mort.owned && mort.down === Math.ceil(40 * 0.2) && mort.pay > 0 && mort.inBills, mort);
  await A.screenshot({ path: SHOTS + '/econ_mort.png', fullPage: true });
  const fc = await A.evaluate(() => { const e = ECON.ec(); e.mort.missed = 2; e.bills.items.forEach(b => { if (b.k !== 'mort') b.paid = true; else b.paid = false; }); e.bills.wk = '2000-01-03'; ECON.rollBills(); return {mort:ECON.ec().mort, owned:!!TOWN.town().owned.mansion}; });
  check('3 missed mortgage payments → foreclosure', fc.mort === null && !fc.owned, fc);
  check('no page errors', errs.length === 0, errs);
  console.log(results.join('\n')); console.log(fail ? `\n${fail} FAILED` : '\nALL PASS'); await b.close(); process.exit(fail ? 1 : 0);
})();
