/* Neighborhoods, story events, needs, townspeople quests, collections/pets and town vs. town (practice mode):
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/world_test.js */
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
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && window.WORLD2 && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); });
    return p;
  }
  const T = await page('teacher');
  await T.evaluate(() => { localStorage.removeItem('town.db'); });
  const codes = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test');
    const a = await TOWN.net.createClass('Period 1'); const b = await TOWN.net.createClass('Period 2'); return [a.code, b.code]; });
  async function student(first, init, code){
    const p = await page(first);
    await p.evaluate(async ([code, first, init]) => { S.xp = 300; S.tokens = 80; S.name = first; S.myCourses = ['econ-h'];
      S.certs = [1, 2].map(i => ({ code: first + i, unit: 'U' + i, course: 'Economics', kind: 'challenge', date: today() }));
      const r = await TOWN.net.join(code, first, init, '1234'); if (r.ok) await TOWN.boot(); }, [code, first, init]);
    await p.evaluate(() => { go('town'); }); await p.waitForTimeout(2400); await p.evaluate(() => townCloseCard());
    return p;
  }
  const solveOne = p => p.evaluate(() => { const st = window._w2q; if (!st) return false; w2Ans(st.order.indexOf(st.q.a)); w2Next(); return true; });
  const solveAll = async p => { for (let i = 0; i < 40; i++) { if (!(await solveOne(p))) break; } };
  const A = await student('Ana', 'R', codes[0]), B = await student('Ben', 'T', codes[0]), Z = await student('Zoe', 'K', codes[1]);

  /* map + districts */
  await A.evaluate(() => townTab('map')); await A.waitForTimeout(500);
  const map = await A.evaluate(() => ({ n: document.querySelectorAll('.wmap .kb').length, locked: document.querySelectorAll('.wmap .kb.locked').length, avg: WORLD2.classAvgCerts() }));
  check('map shows 10 places (incl. Exam Tower); Waterfront open at 2 certs avg, Theme Park and Space locked', map.n === 10 && map.locked === 2 && map.avg >= 2, map);
  await A.screenshot({ path: SHOTS + '/w_map.png', fullPage: true });
  await T.evaluate(async () => { const c = (await TOWN.net.myClasses()).find(x => x.name === 'Period 1'); await TOWN.net.setClass(c.id, { districts: ['park', 'space'] }); });
  await A.waitForTimeout(600);
  check('teacher opens Theme Park and Space Coast early', await A.evaluate(() => WORLD2.isOpen('park') && WORLD2.isOpen('space')));
  /* fishing */
  await A.evaluate(() => w2Go('waterfront')); await A.waitForTimeout(300);
  for (let i = 0; i < 3; i++) { await A.evaluate(() => w2Cast()); await solveOne(A); await A.evaluate(() => townCloseCard()); }
  const fish = await A.evaluate(() => ({ cnt: WORLD2.w2().cnt.fish, kinds: Object.keys(WORLD2.w2().fish).length, casts: WORLD2.w2().daily.casts }));
  check('fishing: right answers land fish into the album', fish.cnt === 3 && fish.kinds >= 1 && fish.casts === 3, fish);
  await A.screenshot({ path: SHOTS + '/w_lake.png', fullPage: true });
  /* ride */
  await A.evaluate(() => w2Go('park')); await A.waitForTimeout(300);
  const t0 = await A.evaluate(() => S.tokens);
  await A.evaluate(() => w2Ride('coaster')); await solveAll(A);
  const ride = await A.evaluate(t0 => ({ photo: WORLD2.w2().photos.coaster, pay: S.tokens - t0, rides: WORLD2.w2().cnt.rides }), t0);
  check('Theme Park ride: 5 timed questions → gold photo + 5 Smithbucks', ride.photo === 3 && ride.pay === 5 && ride.rides === 1, ride);
  await A.evaluate(() => townCloseCard());
  const noTicket = await A.evaluate(() => { const t = S.tokens; w2Ride('drop'); return !window._w2q; });
  check('no ticket left without practice', noTicket);
  /* mission */
  await A.evaluate(() => w2Go('space')); await A.waitForTimeout(300);
  await A.evaluate(() => { document.querySelector('.wmis button').click(); }); await solveAll(A);
  const mis = await A.evaluate(() => ({ patches: Object.keys(WORLD2.w2().patches).length, m: WORLD2.w2().cnt.missions }));
  check('Space Coast mission: 8/8 reaches orbit and earns a patch', mis.patches === 1 && mis.m === 1, mis);
  await A.evaluate(() => townCloseCard()); await A.screenshot({ path: SHOTS + '/w_space.png', fullPage: true });

  /* story event */
  await A.evaluate(() => w2Go(null)); await A.waitForTimeout(300);
  for (let i = 0; i < 4; i++) { await A.evaluate(() => w2Help()); await solveOne(A); await A.waitForTimeout(150); }
  for (let i = 0; i < 3; i++) { await B.evaluate(() => w2Help()); await solveOne(B); await B.waitForTimeout(150); }
  await A.waitForTimeout(500);
  const st = await A.evaluate(() => ({ tot: WORLD2.storyTotal(), tgt: WORLD2.storyTarget(), k: WORLD2.storyOf() }));
  check('story event: both students add to the class total', st.tot === 7, st);
  await A.evaluate(async tgt => { await TOWN.net.store.set(`classes/${TOWN.session.cid}/storypts/${(() => { const d = new Date(); const m = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7)); return `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}-${String(m.getDate()).padStart(2, '0')}`; })()}_ana-r`, { week: (() => { const d = new Date(); const m = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7)); return `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}-${String(m.getDate()).padStart(2, '0')}`; })(), sid: 'ana-r', n: tgt, at: Date.now() }); }, st.tgt);
  await B.waitForTimeout(900);
  const won = await B.evaluate(k => ({ trophy: !!WORLD2.w2().trophies[k], item: TOWN.has(WORLD2.STORIES[k].item) }), st.k);
  check('story goal reached → everyone gets the trophy', won.trophy && won.item, won);
  await A.screenshot({ path: SHOTS + '/w_story.png', fullPage: true });

  /* needs */
  const nd = await B.evaluate(() => { const n = WORLD2.needs(); const e0 = n.energy; w2Snack(); return { e0, e1: WORLD2.needs().energy, k: Object.keys(n).length }; });
  check('needs: snack raises energy', nd.e1 > nd.e0, nd);
  const pay = await B.evaluate(() => { const n = WORLD2.needs(); n.know = n.energy = n.social = n.fun = 95; const c = CIVIC.civ(); CIVIC.rollJobs(); const k = c.jobs.picks[2];
    c.jobs.flags = { ...c.jobs.flags, hall: 1, bank: 1, market: 1, vote: 1, visit: 1, sticker: 1, chat: 1, crate: 1, decorate: 1, trade: 1, make: 1, sell: 1 }; c.bank.bal = 50;
    const t = S.tokens; civCollect(k); return { k, d: S.tokens - t }; });
  check('thriving mood pays +1 on a daily job', pay.d >= 2, pay);

  /* quests */
  await A.evaluate(() => { townTab('plaza'); }); await A.waitForTimeout(600);
  await A.evaluate(() => { const N = WORLD2.NPCS.coach; TOWN.EXT.plazaTap.some(f => f(N.at[0], N.at[1] - 14)); });
  const dlg = await A.evaluate(() => document.getElementById('certAsk').textContent);
  check('tap Coach Smith on the plaza → quest dialogue', /training camp/i.test(dlg), dlg.slice(0, 90));
  await A.screenshot({ path: SHOTS + '/w_npc.png' });
  await A.evaluate(() => w2NpcQuiz('coach')); await solveAll(A); await A.waitForTimeout(400);
  const q1 = await A.evaluate(() => WORLD2.w2().q.coach);
  check('quest step 1 (5 questions) done; step 2 waiting for fish', q1.step === 1, q1);
  await A.evaluate(() => townCloseCard());
  /* finish Captain Rosa entirely */
  const rosa = await A.evaluate(() => { const w = WORLD2.w2(); w.q.rosa = { step: 3, base: null }; return true; });
  await A.evaluate(() => w2NpcQuiz('rosa')); await solveAll(A); await A.waitForTimeout(400);
  const qd = await A.evaluate(() => ({ step: WORLD2.w2().q.rosa.step, ship: TOWN.has('q_ship') }));
  check('finishing a quest gives the exclusive reward item', qd.step === 4 && qd.ship, qd);
  await A.evaluate(() => townCloseCard());

  /* album + seasonal + pets */
  await A.evaluate(() => w2Go('album')); await A.waitForTimeout(300);
  const al = await A.evaluate(() => WORLD2.albumSets().map(s => s.k + ':' + s.have + '/' + s.of).join(' '));
  check('album tracks every collection', /fish:\d+\/16/.test(al) && /season:\d+\/36/.test(al), al);
  await A.screenshot({ path: SHOTS + '/w_album.png', fullPage: true });
  await A.evaluate(() => townTab('shop')); await A.waitForTimeout(300);
  const seas = await A.evaluate(() => [...document.querySelectorAll('.tseason')].length);
  check('the Shop shows only this month\'s 3 seasonal items', seas === 3, seas);
  const pet = await A.evaluate(() => { TOWN.addItem('pet_cat', 1); townVisit(TOWN.session.sid); return true; }); await A.waitForTimeout(400);
  await A.evaluate(() => { const b = [...document.querySelectorAll('.pbtns button')][0]; b && b.click(); }); await solveOne(A); await A.waitForTimeout(300);
  const pg = await A.evaluate(() => WORLD2.w2().pets.pet_cat);
  check('feeding a pet with a right answer = +2 growth', pg === 2, pg);
  await A.screenshot({ path: SHOTS + '/w_house.png', fullPage: true });

  /* town vs town */
  await A.evaluate(() => { townTab('hall'); }); await Z.evaluate(() => { townTab('hall'); }); await A.waitForTimeout(800);
  await A.evaluate(() => { TOWN.addItem('lamp_moon', 1); w2Go('towns'); }); await A.waitForTimeout(500);
  await A.evaluate(async () => { w2List(); document.getElementById('w2Item').value = 'lamp_moon'; document.getElementById('w2Price').value = '12'; await w2ListGo(); });
  await Z.evaluate(() => w2Go('towns')); await Z.waitForTimeout(900);
  const z0 = await Z.evaluate(() => S.tokens), a0 = await A.evaluate(() => S.tokens);
  await Z.evaluate(async () => { const b = [...document.querySelectorAll('.tcardi button')][0]; if (b) b.click(); await new Promise(r => setTimeout(r, 400)); });
  await A.waitForTimeout(900);
  const tr = await Promise.all([Z.evaluate(z0 => ({ d: S.tokens - z0, has: TOWN.has('lamp_moon') }), z0), A.evaluate(a0 => S.tokens - a0, a0)]);
  check('Trade Post: Period 2 buys from Period 1; seller is paid', tr[0].d === -12 && tr[0].has && tr[1] === 12, tr);
  const lg = await Z.evaluate(() => document.querySelectorAll('.cleague tr').length);
  check('Best Town table lists both periods', lg >= 3, lg);
  await Z.screenshot({ path: SHOTS + '/w_towns.png', fullPage: true });
  await T.evaluate(() => townTab('admin')); await T.waitForTimeout(800);
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); console.log(fail ? `${fail} FAILED` : 'all passed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
