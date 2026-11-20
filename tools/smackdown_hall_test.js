/* Game Hall → Smackdown: challenge with a wager, review gate, arena overlay, host reports the winner, wagers settle */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';
const results = []; let fail = 0;
const check = (n, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
const solve = p => p.evaluate(async () => { for (let i = 0; i < 12; i++) { const z = window._lvq; if (!z) break; lvAns(z.order.indexOf(z.q.a)); lvNext(); await new Promise(r => setTimeout(r, 30)); } });
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1200, height: 760 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  const errs = [];
  async function page(name){ const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message)); p.on('dialog', d => d.accept());
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.GAMEHALL && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); S.v2seen = '2.0'; }); return p; }
  const T = await page('teacher'); await T.evaluate(() => localStorage.removeItem('town.db'));
  const code = await T.evaluate(async () => { await TOWN.net.teacherSignIn('t@t.test'); return (await TOWN.net.createClass('3rd Period')).code; });
  async function student(first){ const p = await page(first);
    await p.evaluate(async ([code, first]) => { S.tokens = 100; S.xp = 300; const r = await TOWN.net.join(code, first, 'Q', '1234'); if (r.ok) await TOWN.boot(); go('town'); }, [code, first]);
    await p.waitForTimeout(1300); await p.evaluate(() => { townCloseCard(); const w = document.getElementById('whatsnew'); w && w.remove(); }); return p; }
  const A = await student('Ana'), B = await student('Ben');
  await A.waitForTimeout(1500);
  const bsid = await B.evaluate(() => TOWN.CIV.SESS().sid);
  await A.evaluate(async sid => { townTab('games'); gmNew('smack'); _gmNew.wager = 10; _gmNewDraw(); document.getElementById('gmWho').value = sid; await gmSend(); }, bsid);
  await B.waitForTimeout(1200);
  const gid = await B.evaluate(() => GAMEHALL.games[0] && GAMEHALL.games[0].id);
  check('Smackdown challenge arrives', !!gid && await B.evaluate(() => GAMEHALL.games[0].kind === 'smack'));
  await B.evaluate(async id => { await gmAnswer(id, true); }, gid); await B.waitForTimeout(500);
  await B.evaluate(id => gmQuiz(id), gid); await solve(B); await B.waitForTimeout(500);
  await A.evaluate(id => { gmOpen(id); }, gid); await A.waitForTimeout(500); await A.evaluate(id => gmQuiz(id), gid); await solve(A); await A.waitForTimeout(1200);
  check('both reviewed: match is live', await A.evaluate(() => GAMEHALL.cur && GAMEHALL.cur.status === 'playing'));
  await A.screenshot({ path: '/tmp/hall_smack.png' });
  await A.evaluate(id => gmArena(id), gid); await B.evaluate(id => { gmOpen(id); gmArena(id); }, gid);
  const fa = A.frameLocator('#smkOverlay iframe'), fb = B.frameLocator('#smkOverlay iframe');
  const AF = () => A.frames().find(f => /smackdown/.test(f.url())), BF = () => B.frames().find(f => /smackdown/.test(f.url()));
  await A.waitForTimeout(2500);
  await AF().waitForFunction(() => window.SMACK && SMACK.state === 'ONLINE_LOBBY', null, {timeout:8000});
  await BF().waitForFunction(() => window.SMACK && SMACK.state === 'ONLINE_LOBBY' && SMACK.NET.joined, null, {timeout:8000});
  check('both land in the same lobby without retaking the review', await AF().evaluate(() => Object.values(SMACK.NET.seats).filter(Boolean).length === 2));
  await fb.locator('[data-a="nready"]').click(); await A.waitForTimeout(500);
  await A.screenshot({ path: '/tmp/hall_lobby.png' });
  await fa.locator('[data-a="nstart"]').click();
  await BF().waitForFunction(() => SMACK.state === 'ARENA_BATTLE', null, {timeout:6000});
  // make the guest lose fast: host knocks the guest out
  await AF().evaluate(() => { const g = SMACK.G.players[1]; g.stocks = 1; });
  await AF().evaluate(() => { SMACK.step(200); const g = SMACK.G.players[1]; g.x = 2200; SMACK.step(130); });
  await A.waitForTimeout(1500);
  const res = await A.evaluate(id => GAMEHALL.games.find(g => g.id === id), gid);
  check('host reports the winner to the Game Hall', res && res.status === 'done' && res.winner === 'a', res && {status:res.status, winner:res.winner});
  await B.waitForTimeout(1200);
  const pay = {a:await A.evaluate(() => S.tokens), b:await B.evaluate(() => S.tokens)};
  check('wager settles: winner +20, loser paid 10', pay.a === 110 && pay.b === 90, pay);
  await B.evaluate(() => gmArenaClose()); await A.evaluate(() => gmArenaClose()); await A.waitForTimeout(400);
  check('overlay closes', await A.evaluate(() => !document.getElementById('smkOverlay')));
  check('no page errors', errs.length === 0, errs.slice(0, 5));
  console.log(results.join('\n')); await b.close(); process.exit(fail ? 1 : 0);
})();
