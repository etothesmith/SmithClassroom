/* Phase 4: cars, airport visits, mall, beach, theater, museum, port (practice mode) */
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
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TRAVEL && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); S.v2seen = '2.0'; }); return p; }
  const T = await page('teacher'); await T.evaluate(() => { localStorage.removeItem('town.db'); });
  const cl = await T.evaluate(async () => { await TOWN.net.teacherSignIn('t@t.test'); const a = await TOWN.net.createClass('1st Period'), b = await TOWN.net.createClass('3rd Period'); return [a.code, b.code]; });
  async function student(code, first){ const p = await page(first);
    await p.evaluate(async ([code, first]) => { S.tokens = 300; S.xp = 300; const r = await TOWN.net.join(code, first, 'Q', '1234'); if (r.ok) await TOWN.boot(); go('town'); }, [code, first]);
    await p.waitForTimeout(1300); await p.evaluate(() => { townCloseCard(); const w = document.getElementById('whatsnew'); w && w.remove(); }); return p; }
  const A = await student(cl[0], 'Ana'), B = await student(cl[1], 'Ben');
  /* dealer */
  await A.evaluate(() => w2Go('dealer')); await A.waitForTimeout(500);
  const car = await A.evaluate(async () => { const t0 = S.tokens, p0 = TRAVEL.carPrice('compact'); await trBuyCar('compact'); await new Promise(r => setTimeout(r, 700)); return {spent:t0 - S.tokens, p0, p1:TRAVEL.carPrice('compact'), mine:TRAVEL.myCar()}; });
  check('buying a car takes the price and raises the next one 15%', car.spent === 40 && car.mine === 'compact' && car.p1 === 46, car);
  check('car shows up in weekly bills', await A.evaluate(() => ECON.billsFor().some(b => b.k === 'car' && b.amt === 2)));
  check('resale starts below the price (depreciation)', await A.evaluate(() => TRAVEL.resale()) === 28);
  await A.screenshot({ path: SHOTS + '/travel_dealer.png', fullPage: true });
  /* bus fare for Ben (no car) */
  const bus = await B.evaluate(async () => { const t0 = S.tokens; w2Go('beach'); await new Promise(r => setTimeout(r, 400)); TOWN.paintSub(); await new Promise(r => setTimeout(r, 300)); return t0 - S.tokens; });
  check('no car: a 💵1 bus fare once per place per day', bus === 1, bus);
  const car0 = await A.evaluate(async () => { const t0 = S.tokens; w2Go('beach'); await new Promise(r => setTimeout(r, 400)); return t0 - S.tokens; });
  check('with a car the trip is free', car0 === 0, car0);
  /* beach */
  await A.evaluate(() => trShells()); await solve(A); await A.waitForTimeout(300);
  const sh = await A.evaluate(() => Object.values(TOWN.CIV.civ().shells).reduce((a, b) => a + b, 0));
  check('shell hunt: 3 right = 3 shells', sh === 3, sh);
  /* theater */
  await A.evaluate(() => w2Go('theater')); await A.waitForTimeout(400);
  await A.evaluate(() => trShow()); await solve(A); await A.waitForTimeout(900);
  const sc = await A.evaluate(() => TRAVEL.shows.find(s => s.sid === TOWN.CIV.SESS().sid));
  check('trivia night score posted', sc && sc.right === 5 && sc.score >= 500, sc);
  /* museum */
  await A.evaluate(() => { TOWN.addItem(Object.keys(TOWN.ITEMS).find(k => TOWN.ITEMS[k].p > 0), 1); w2Go('museum'); }); await A.waitForTimeout(400);
  const don = await A.evaluate(async () => { const id = Object.keys(TOWN.freeInv())[0], t0 = S.tokens; await trDonateGo(id); await new Promise(r => setTimeout(r, 700)); return {got:S.tokens - t0, n:TRAVEL.museum.length}; });
  check('donating puts it on display and pays 💵2', don.got === 2 && don.n === 1, don);
  /* mall */
  await A.evaluate(() => w2Go('mall')); await A.waitForTimeout(400);
  const mall = await A.evaluate(async () => { const id = TRAVEL.mallItems()[0], p = TRAVEL.mallPrice(id), t0 = S.tokens; await trMall(id); await new Promise(r => setTimeout(r, 700)); return {six:TRAVEL.mallItems().length, spent:t0 - S.tokens, p, p1:TRAVEL.mallPrice(id), has:TOWN.has(id)}; });
  check('mall: 6 weekly items, buying adds it and raises the price', mall.six === 6 && mall.spent === mall.p && mall.p1 > mall.p && mall.has, mall);
  /* port */
  await A.evaluate(() => w2Go('port')); await A.waitForTimeout(400);
  const port = await A.evaluate(async () => { const t0 = S.tokens; trInvest('freight', 6); await new Promise(r => setTimeout(r, 700)); return t0 - S.tokens; });
  check('investing in a ship stakes the money', port === 6, port);
  check('outcomes are deterministic per week', await A.evaluate(() => TRAVEL.outcome('galleon', '2026-11-09') === TRAVEL.outcome('galleon', '2026-11-09')));
  await A.screenshot({ path: SHOTS + '/travel_port.png', fullPage: true });
  /* airport */
  await T.evaluate(async () => { TEACHER_OK = true; townTab('admin'); await new Promise(r => setTimeout(r, 900)); await trTRoutes(); });
  await A.waitForTimeout(2500);
  await A.evaluate(() => w2Go('airport')); await A.waitForTimeout(500);
  check('departures list the other period', await A.evaluate(() => /3rd Period/.test(document.body.innerText)));
  await A.evaluate(() => trPassport()); await solve(A); await A.waitForTimeout(300);
  check('passport issued after customs', await A.evaluate(() => !!TRAVEL.pp().issued));
  const bsid = await B.evaluate(() => TOWN.CIV.SESS().sid);
  await A.evaluate(async () => { const s = TOWN.cls.sisters.find(x => x.name === '3rd Period'); await trFly(s.id); }); await A.waitForTimeout(1500);
  check('visiting shows the other class residents', await A.evaluate(() => /Ben/.test(document.body.innerText)));
  await A.evaluate(async b => { await trGreet(b, 'Ben Q.', '👋'); document.getElementById('trGb').value = 'Hello from 1st period!'; await trSign(); }, bsid); await A.waitForTimeout(800);
  await A.screenshot({ path: SHOTS + '/travel_visit.png', fullPage: true });
  await B.waitForTimeout(1500);
  check('the greeting reaches the student in the other class', await B.evaluate(() => TRAVEL.greets.length === 1 && TRAVEL.greets[0].e === '👋'));
  check('stamp collected', await A.evaluate(() => Object.keys(TRAVEL.pp().stamps).length === 1));
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); await b.close(); process.exit(fail ? 1 : 0);
})();
