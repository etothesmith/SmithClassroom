/* Pets 2.0, house chats and parties (practice mode):
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/pets_test.js */
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
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && window.PETS && window.HOUSELIFE, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); });
    return p;
  }
  const T = await page('teacher');
  await T.evaluate(() => { localStorage.removeItem('town.db'); });
  const code = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test'); return (await TOWN.net.createClass('Period 5')).code; });
  async function student(first, init){
    const p = await page(first);
    await p.evaluate(async ([code, first, init]) => { S.xp = 300; S.tokens = 80; S.name = first; S.myCourses = ['econ-h'];
      const r = await TOWN.net.join(code, first, init, '1234'); if (r.ok) await TOWN.boot(); }, [code, first, init]);
    await p.evaluate(() => { go('town'); }); await p.waitForTimeout(2400); await p.evaluate(() => townCloseCard());
    return p;
  }
  const solveAll = async p => { for (let i = 0; i < 20; i++) { const more = await p.evaluate(() => { const st = window._w2q; if (!st) return false; w2Ans(st.order.indexOf(st.q.a)); w2Next(); return true; }); if (!more) break; } };
  const A = await student('Ana', 'R'), B = await student('Ben', 'T'), C = await student('Cara', 'L');

  /* rescue + adopt + name */
  await A.evaluate(() => w2Go('rescue')); await A.waitForTimeout(400);
  const rescue = await A.evaluate(() => ({ n: PETS.adoptable().length, cards: document.querySelectorAll('.tcardi').length }));
  check('Pet Rescue lists adoptable pets and the boutique', rescue.n >= 10 && rescue.cards >= 15, rescue);
  await A.screenshot({ path: SHOTS + '/p_rescue.png', fullPage: true });
  const t0 = await A.evaluate(() => S.tokens);
  await A.evaluate(() => petAdopt('pet_hedgehog'));
  const named = await A.evaluate(() => { const box = document.getElementById('certAsk'); const shown = /Name your pet/.test(box.textContent);
    document.getElementById('pName').value = 'Sh!t'; petNameGo('pet_hedgehog'); const blocked = /isn't allowed/.test(document.getElementById('pErr').textContent);
    document.getElementById('pName').value = 'Spike'; petNameGo('pet_hedgehog'); return { shown, blocked, name: PETS.petName('pet_hedgehog') }; });
  const paid = await A.evaluate(t0 => t0 - S.tokens, t0);
  check('adopting asks for a name; bad names blocked', named.shown && named.blocked && named.name === 'Spike' && (paid === 12 || paid === 6), { named, paid });
  /* care */
  await A.evaluate(() => { townTab('homes'); townVisit(TOWN.session.sid); }); await A.waitForTimeout(500);
  await A.evaluate(() => petPlay('pet_hedgehog')); await solveAll(A);
  const happy = await A.evaluate(() => PETS.px('pet_hedgehog').happy);
  check('fetch makes the pet happier', happy >= 80, happy);
  await A.evaluate(() => petTeach('pet_hedgehog')); await solveAll(A); await A.waitForTimeout(200);
  const tricks = await A.evaluate(() => PETS.px('pet_hedgehog').tricks);
  check('teaching with 3 right answers learns a trick', tricks === 1, tricks);
  await A.evaluate(() => { petBuyAcc('bow'); petWearGo('pet_hedgehog', 'bow'); petBuddy('pet_hedgehog'); });
  await A.waitForTimeout(400); await A.screenshot({ path: SHOTS + '/p_room.png', fullPage: true });
  const pub = await B.evaluate(async () => { await new Promise(r => setTimeout(r, 1500)); const p = TOWN.pub['ana-r']; return p && p.pet; });
  check('buddy with name and accessory is published for the plaza', pub && pub.n === 'Spike' && pub.a === 'bow', pub);
  await B.evaluate(() => townTab('plaza')); await B.waitForTimeout(400);
  await A.evaluate(() => townTab('plaza')); await A.waitForTimeout(1500);
  await B.screenshot({ path: SHOTS + '/p_plaza.png' });

  /* knock → chat */
  await B.evaluate(() => { townTab('homes'); townVisit('ana-r'); }); await B.waitForTimeout(400);
  const noChat = await B.evaluate(() => !document.getElementById('hcLog'));
  check('no chat from the doorstep', noChat);
  await B.evaluate(() => townKnock('ana-r')); await A.waitForTimeout(900);
  await A.evaluate(() => { const b = [...document.querySelectorAll('#certAsk button')].find(x => /Let them in/.test(x.textContent)); b && b.click(); });
  await B.waitForTimeout(900);
  await A.evaluate(() => { townTab('homes'); townVisit(TOWN.session.sid); }); await A.waitForTimeout(500);
  await B.evaluate(async () => { document.getElementById('hcIn').value = 'Your hedgehog is so cute!'; await hcSend(); });
  await A.waitForTimeout(900);
  const log = await A.evaluate(() => document.getElementById('hcLog').textContent);
  check('inside the house: guest message reaches the owner', /so cute/.test(log) && /came in/.test(log), log.slice(0, 120));
  const bad = await A.evaluate(async () => { await new Promise(r => setTimeout(r, 2600)); document.getElementById('hcIn').value = 'you are a b1tch'; await hcSend(); return document.getElementById('hcErr').textContent; });
  check('word filter blocks bad chat', /isn't allowed/.test(bad), bad);
  await A.evaluate(async () => { await new Promise(r => setTimeout(r, 2600)); document.getElementById('hcIn').value = 'Thanks Ben! Want to study for the test?'; await hcSend(); });
  await B.waitForTimeout(800); await B.screenshot({ path: SHOTS + '/p_chat.png', fullPage: true });
  const bl = await B.evaluate(() => document.getElementById('hcLog').textContent);
  check('owner reply reaches the guest', /study for the test/.test(bl), bl.slice(-80));
  /* party */
  await A.evaluate(() => hcParty()); await C.waitForTimeout(1500);
  const banner = await C.evaluate(() => { townTab('plaza'); return /House parties now/.test(document.body.textContent); });
  await C.evaluate(() => { townTab('homes'); townVisit('ana-r'); }); await C.waitForTimeout(800);
  const inParty = await C.evaluate(() => !!document.querySelector('.troom') && !!document.getElementById('hcLog'));
  await A.waitForTimeout(1200);
  const host = await A.evaluate(() => TOWN.town().house.partyPaid | 0);
  check('party: banner, anyone walks in, host earns per guest', banner && inParty && host >= 1, { banner, inParty, host });
  /* mute */
  await T.evaluate(async () => { const c = (await TOWN.net.myClasses())[0]; await TOWN.net.setClass(c.id, { muted: { 'ben-t': true } }); }); await B.waitForTimeout(800);
  await B.evaluate(() => { townTab('homes'); townVisit('ana-r'); }); await B.waitForTimeout(400);
  const muted = await B.evaluate(() => !document.getElementById('hcIn'));
  check('muted student cannot type in house chats', muted);
  await T.evaluate(() => townTab('admin')); await T.waitForTimeout(900);
  const adm = await T.evaluate(() => document.getElementById('aHchat').textContent);
  check('teacher reads house chats', /so cute/.test(adm) && /study/.test(adm), adm.slice(0, 80));
  await T.screenshot({ path: SHOTS + '/p_admin.png', fullPage: true });
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); console.log(fail ? `${fail} FAILED` : 'all passed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
