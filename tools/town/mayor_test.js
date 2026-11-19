/* Mayor runs city hall + Chromebook scrolling (practice mode):
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/mayor_test.js */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';
const SHOTS = process.env.SHOTS || '/tmp';
const results = []; let fail = 0;
const check = (n, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1366, height: 640 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  await ctx.route(/firebaseio|googleapis|gstatic/, r => r.abort());
  const errs = [];
  async function page(name){
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message));
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && window.MAYOR && window.TNOTIFY && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); S.v2seen = '2.0'; });
    return p;
  }
  const feed = p => p.evaluate(() => TNOTIFY.state.feed.map(x => x.m));
  const T = await page('teacher');
  await T.evaluate(() => { localStorage.removeItem('town.db'); localStorage.removeItem('town.notify'); });
  const code = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test'); return (await TOWN.net.createClass('4th Period Econ')).code; });
  await T.waitForTimeout(4600);
  async function student(first, init){
    const p = await page(first);
    await p.evaluate(async ([code, first, init]) => { S.xp = 300; S.tokens = 60; S.name = first; const r = await TOWN.net.join(code, first, init, '1234'); if (r.ok) await TOWN.boot(); }, [code, first, init]);
    await p.evaluate(() => { go('town'); }); await p.waitForTimeout(600); await p.evaluate(() => { townCloseCard(); const w = document.getElementById('whatsnew'); w && w.remove(); });
    return p;
  }
  const A = await student('Ana', 'R');
  const B = await student('Ben', 'T'), Cc = await student('Cara', 'L');
  const sid = p => p.evaluate(() => TOWN.session.sid);
  const [ana, ben, cara] = [await sid(A), await sid(B), await sid(Cc)];

  /* Chromebook: the job application scrolls to its Send button */
  await B.evaluate(() => carGo('firefighter')); await B.waitForTimeout(300);
  await B.evaluate(() => carApply('firefighter')); await B.waitForTimeout(500);
  await B.mouse.move(683, 300); await B.mouse.wheel(0, 3000); await B.waitForTimeout(400);
  const sc = await B.evaluate(() => { const box = document.getElementById('certAsk'), btn = [...box.querySelectorAll('button')].find(x => /Send application/.test(x.textContent)).getBoundingClientRect();
    return {scrolled: box.scrollTop > 0, btnVisible: btn.bottom <= innerHeight && btn.top >= 0}; });
  check('Chromebook: a long application scrolls to the Send button', sc.scrolled && sc.btnVisible, sc);
  check('application says the mayor decides city jobs', await B.evaluate(() => /City job: the Mayor/.test(document.getElementById('certAsk').textContent)));
  const send = async (p, j) => p.evaluate(async j => { carApply(j); document.getElementById('kWhy1').value = 'I want to keep the town safe and help everyone.'; document.getElementById('kWhy2').value = 'I am calm and fast.'; document.getElementById('kRef').value = 'Coach Smith'; await carSend(j); }, j);
  await send(B, 'firefighter'); await send(Cc, 'doctor'); await send(A, 'marshal');

  /* Ana becomes mayor */
  await T.evaluate(async ([cid, ana]) => { await TOWN.net.setClass(cid, {mayor:{sid:ana, name:'Ana R.', since:Date.now(), eid:'e1'}}); }, [await A.evaluate(() => TOWN.session.cid), ana]);
  await A.waitForTimeout(1500); await A.evaluate(() => { townCloseCard(); carGo('mansion'); }); await A.waitForTimeout(800);
  const desk = await A.evaluate(() => ({duty:!!document.querySelector('.myrduty'), apps:[...document.querySelectorAll('.myrapp b')].map(b => b.textContent), jobs:document.querySelectorAll('.myrjob').length}));
  check('mayor sees duties, 6 city jobs, and only city-job applications', desk.duty && desk.jobs === 6 && desk.apps.includes('Ben T.') && !desk.apps.includes('Cara L.'), desk);
  await A.screenshot({ path: SHOTS + '/mayor_desk.png', fullPage: true });
  const self = await A.evaluate(async () => { const a = [...document.querySelectorAll('.myrapp')].find(x => /Ana R\./.test(x.textContent)); a.querySelector('.btn.primary').click(); await new Promise(r => setTimeout(r, 400)); return CAREERS.myJob(); });
  check("mayor can't hire themself", self === null);
  await A.evaluate(async () => { const a = [...document.querySelectorAll('.myrapp')].find(x => /Ben T\./.test(x.textContent)); a.querySelector('.btn.primary').click(); });
  await B.waitForTimeout(3200);
  const bj = await B.evaluate(() => ({job:CAREERS.myJob(), guide:/City job: the Mayor is your boss/.test((document.getElementById('certAsk') || {}).textContent || '')}));
  check('mayor hires Ben as firefighter; his job guide says the mayor is his boss', bj.job === 'firefighter' && bj.guide, bj);
  await A.waitForTimeout(600);
  check('the hire goes on the public record', await A.evaluate(() => /Ben T\. → Firefighter/.test(document.body.textContent)));

  /* the mayor can't touch private jobs directly; asks the teacher */
  await T.waitForTimeout(1200);
  await T.evaluate(async () => { townTab('admin'); await new Promise(r => setTimeout(r, 700)); const rows = await TOWN.net.store.list(`classes/${TOWN.adminCid}/apps`); for (const a of rows.filter(x => x.job === 'doctor')) await carHire(a.id); });
  await Cc.waitForTimeout(1200);
  check('teacher hired Cara as doctor', await Cc.evaluate(() => CAREERS.myJob()) === 'doctor');
  await A.evaluate(async c => { myrAsk('doctor', c); document.getElementById('myrWhy').value = 'She has not seen a single patient in a week.'; await myrAskGo(); }, cara);
  await T.waitForTimeout(1400);
  check('teacher alert: the mayor asks to fire someone', (await feed(T)).some(m => /asks you to fire Cara L\..*Town Doctor/.test(m)), (await feed(T)).slice(0, 2));
  await T.evaluate(async () => { townTab('admin'); await new Promise(r => setTimeout(r, 900)); });
  check('teacher panel lists the request', await T.evaluate(() => /not seen a single patient/.test(document.getElementById('aFire').textContent)));
  await T.screenshot({ path: SHOTS + '/mayor_teacher.png', fullPage: false });
  await T.evaluate(async () => { const rows = await TOWN.net.store.list(`classes/${TOWN.adminCid}/firereqs`); await myrT(rows[0].id, true); });
  await Cc.waitForTimeout(1500); await A.waitForTimeout(500);
  check('teacher fires Cara; she loses the job', await Cc.evaluate(() => CAREERS.myJob()) === null);
  check('mayor is told the decision', (await feed(A)).some(m => /Coach Smith agreed: Cara L\./.test(m)), (await feed(A)).slice(0, 2));

  /* the mayor fires a city worker directly */
  await A.evaluate(async b => { myrFire('firefighter', b); document.getElementById('myrWhy').value = 'Missed every fire drill this week.'; await myrFireGo('firefighter', b); }, ben);
  await B.waitForTimeout(1500);
  check('mayor fires Ben; seat reopens', await B.evaluate(() => CAREERS.myJob()) === null);
  await T.waitForTimeout(800);
  check('teacher sees the mayor’s firing and reason', (await feed(T)).some(m => /Mayor Ana R\. fired Ben T\..*Missed every fire drill/.test(m)), (await feed(T)).slice(0, 2));

  /* State of the Town */
  const t0 = await A.evaluate(() => S.tokens);
  await A.evaluate(async () => { myrAddress(); document.getElementById('myrAddr').value = 'Great week, Smithtopia! Next up: fill the firehouse and finish the skate park.'; await myrAddressGo(); });
  check('State of the Town pays +2', await A.evaluate(() => S.tokens) - t0 === 2);
  await B.waitForTimeout(800); await B.evaluate(() => { townCloseCard(); townTab('plaza'); }); await B.waitForTimeout(400);
  check('everyone sees the State of the Town banner', await B.evaluate(() => /fill the firehouse/.test((document.querySelector('.myraddr') || {}).textContent || '')));
  check('a second address this week is blocked', await A.evaluate(() => { myrAddress(); return !document.getElementById('myrAddr'); }));
  /* word filter: normal phrases pass, a blocked word is shown in red, and the student can ask the teacher */
  const fp = await B.evaluate(() => ["I wish it was easier","someone who really cares","it can happen in school","my therapist","Me gusta el color negro","I like to shoot hoops"].filter(t => badWords(t).length));
  check('no false positives on normal sentences', fp.length === 0, fp);
  await B.evaluate(() => { townCloseCard(); carGo('vet'); }); await B.waitForTimeout(300);
  await B.evaluate(() => { carApply('vet'); document.getElementById('kWhy2').value = 'Pet sitting for neighbors.'; document.getElementById('kRef').value = 'Coach Smith'; });
  await B.evaluate(async () => { const t = document.getElementById('kWhy1'); t.value = 'I love animals and I will not give a shit about the weather.'; await carSend('vet'); });
  const shown = await B.evaluate(() => { const e = document.getElementById('kErr'); return {mark:(e.querySelector('mark.badw') || {}).textContent, ask:!!e.querySelector('.badask')}; });
  check('blocked word is highlighted with an ask-the-teacher button', shown.mark === 'shit' && shown.ask, shown);
  await B.screenshot({ path: SHOTS + '/badword.png', fullPage: false });
  await B.evaluate(() => document.querySelector('#kErr .badask').click()); await B.waitForTimeout(900);
  check('ask button confirms it was sent', await B.evaluate(() => /Sent!/.test(document.querySelector('#kErr .badask').textContent)));
  await T.waitForTimeout(1200);
  check('teacher alert: word-filter request', (await feed(T)).some(m => /Ben T\. says “shit” isn't a bad word/.test(m)), (await feed(T)).slice(0, 2));
  await T.evaluate(async () => { townTab('admin'); await new Promise(r => setTimeout(r, 900)); });
  check('teacher panel lists the word request', await T.evaluate(() => /asks to allow/.test(document.getElementById('aWords').textContent)));
  await T.evaluate(async () => { const rows = await TOWN.net.store.list(`classes/${TOWN.adminCid}/wordreqs`); await tnWord(rows[0].id, true); });
  await B.waitForTimeout(1500);
  check('student hears the word was allowed', (await feed(B)).some(m => /Coach Smith allowed “shit”/.test(m)), (await feed(B)).slice(0, 2));
  const sent = await B.evaluate(async () => { await carSend('vet'); return !document.getElementById('kErr') || !document.querySelector('#kErr mark'); });
  check('after the teacher allows it, the application sends', sent);
  check('no page errors', errs.length === 0, errs);
  console.log(results.join('\n')); console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
  await b.close(); process.exit(fail ? 1 : 0);
})();
