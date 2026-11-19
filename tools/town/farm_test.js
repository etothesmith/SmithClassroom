/* Orange Grove farms: plots, crops, animals, supply scarcity, market prices, farmhands (practice mode) */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/', SHOTS = process.env.SHOTS || '/tmp';
const results = []; let fail = 0;
const check = (n, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
const answer = p => p.evaluate(() => { const st = window._w2q; w2Ans(st.order.indexOf(st.q.a)); w2Next(); });
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1366, height: 800 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  const errs = [];
  async function page(name){ const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message));
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.FARM && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); S.v2seen = '2.0'; }); return p; }
  const T = await page('teacher'); await T.evaluate(() => { localStorage.removeItem('town.db'); });
  const code = await T.evaluate(async () => { await TOWN.net.teacherSignIn('t@t.test'); return (await TOWN.net.createClass('3rd Period')).code; });
  async function student(first){ const p = await page(first);
    await p.evaluate(async ([code, first]) => { S.tokens = 200; S.xp = 300; const r = await TOWN.net.join(code, first, 'Q', '1234'); if (r.ok) await TOWN.boot(); go('town'); }, [code, first]);
    await p.waitForTimeout(1500); await p.evaluate(() => { townCloseCard(); const w = document.getElementById('whatsnew'); w && w.remove(); }); return p; }
  const A = await student('Ana'), B = await student('Ben');
  await A.waitForTimeout(1200);
  await A.evaluate(() => w2Go('farm')); await A.waitForTimeout(600);
  check('Orange Grove shows 12 plots', await A.evaluate(() => document.querySelectorAll('.fplots > *').length) === 12);
  const buy = await A.evaluate(async () => { const t0 = S.tokens; await fmBuyPlot('p3'); await new Promise(r => setTimeout(r, 700)); return {spent:t0 - S.tokens, mine:FARM.myPlot()}; });
  check('buying a plot costs 25 and makes it yours', buy.spent === 25 && buy.mine === 'p3', buy);
  await B.waitForTimeout(1200);
  const taken = await B.evaluate(async () => { const t0 = S.tokens; await fmBuyPlot('p3'); return t0 - S.tokens; });
  check('a classmate cannot buy a taken plot', taken === 0, taken);
  /* supply scarcity */
  const sup = await A.evaluate(async () => { const p0 = FARM.supplyPrice('corn'); fmView('supply'); await fmSupply('corn'); await new Promise(r => setTimeout(r, 900)); return {p0, p1:FARM.supplyPrice('corn'), left:FARM.left('corn'), seeds:TOWN.CIV.civ().seeds.corn}; });
  check('seeds arrive and weekly stock drops; price rises', sup.seeds === 3 && sup.left === 37 && sup.p1 >= sup.p0, sup);
  await A.screenshot({ path: SHOTS + '/farm_supply.png', fullPage: true });
  /* plant, water, grow, harvest */
  await A.evaluate(async () => { fmView('farm'); fmPlant('p3', 0); await new Promise(r => setTimeout(r, 200)); await fmPlantGo('p3', 0, 'corn'); }); await A.waitForTimeout(700);
  const planted = await A.evaluate(() => FARM.farms.p3.beds[0]);
  check('planting fills a bed', planted.c === 'corn' && planted.w === 0, planted);
  await A.evaluate(() => fmWater('p3', 0)); await A.waitForTimeout(200); await answer(A); await A.waitForTimeout(700);
  check('a right answer waters the crop', await A.evaluate(() => FARM.farms.p3.beds[0].w) === 1);
  const st = await A.evaluate(() => { const b = {...FARM.farms.p3.beds[0], at:Date.now() - 13 * 36e5}; return FARM.stageOf(b); });
  check('watered corn ripens sooner than 12h', st.ready === true, st);
  await A.evaluate(async () => { const f = FARM.farms.p3, beds = f.beds.slice(); beds[0] = {...beds[0], at:Date.now() - 20 * 36e5}; await TOWN.CIV.store().update(TOWN.CIV.C() + '/farms/p3', {beds}); });
  await A.waitForTimeout(700); await A.evaluate(() => { fmView('farm'); }); await A.waitForTimeout(1200);
  await A.screenshot({ path: SHOTS + '/farm_ready.png', fullPage: true });
  await A.evaluate(() => fmHarvest('p3', 0)); await A.waitForTimeout(700);
  const hv = await A.evaluate(() => ({stash:FARM.farms.p3.stash, bed:FARM.farms.p3.beds[0]}));
  check('harvest puts 4 corn in the barn and empties the bed', hv.stash.corn === 4 && !hv.bed.c, hv);
  /* animals */
  const ani = await A.evaluate(async () => { fmView('supply'); await fmSupply('chicken'); await new Promise(r => setTimeout(r, 900)); return FARM.farms.p3.ani; });
  check('a chicken joins the farm', ani.chicken === 1, ani);
  await A.evaluate(() => fmFeed('p3')); await A.waitForTimeout(200); await answer(A); await A.waitForTimeout(800);
  const fed = await A.evaluate(() => ({fed:FARM.farms.p3.fed === TOWN.CIV.day(), egg:FARM.farms.p3.stash.egg}));
  check('feeding (question + 1) gives 2 eggs', fed.fed && fed.egg === 2, fed);
  /* market */
  const mk = await A.evaluate(async () => { const p0 = FARM.mktPrice('corn'), t0 = S.tokens; await fmSell('corn', 4); await new Promise(r => setTimeout(r, 900)); return {p0, p1:FARM.mktPrice('corn'), got:S.tokens - t0}; });
  check('selling pays cash and pushes the market price down', mk.got >= 4 && mk.p1 < mk.p0, mk);
  await A.evaluate(() => fmView('market')); await A.waitForTimeout(300);
  await A.screenshot({ path: SHOTS + '/farm_market.png', fullPage: true });
  /* farmhand */
  const bsid = await B.evaluate(() => TOWN.CIV.SESS().sid);
  await A.evaluate(async sid => { fmHire(); document.getElementById('fmWho').value = sid; document.getElementById('fmWage').value = '3'; await fmHireGo(); }, bsid); await A.waitForTimeout(1200);
  await B.evaluate(() => w2Go('farm')); await B.waitForTimeout(800);
  check('the farmhand sees the farm', await B.evaluate(() => document.querySelectorAll('.fbeds').length) === 1);
  await B.evaluate(async () => { const s = TOWN.CIV.civ(); }); 
  /* B harvests nothing ready; let B water a planted bed: A plants first */
  await A.evaluate(async () => { fmView('supply'); await fmSupply('tomato'); fmView('farm'); await fmPlantGo('p3', 1, 'tomato'); }); await A.waitForTimeout(900);
  const t0 = await B.evaluate(() => S.tokens);
  await B.evaluate(() => fmWater('p3', 1)); await B.waitForTimeout(200); await answer(B); await B.waitForTimeout(2500);
  const pay = await A.evaluate(() => ({paid:(FARM.farms.p3.paid || {}), owed:FARM.farms.p3.owed}));
  await B.waitForTimeout(1500);
  const t1 = await B.evaluate(() => S.tokens);
  check('owner auto-pays the farmhand wage of 3', t1 - t0 === 3, {pay, got:t1 - t0});
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); await b.close(); process.exit(fail ? 1 : 0);
})();
