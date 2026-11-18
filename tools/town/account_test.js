/* Student accounts: progress follows the Town ID. Simulates the cloud with the
   practice-mode store (mode flipped to "cloud"), so sign-out-and-clear followed
   by signing in again behaves like moving to a new computer.
     NODE_PATH=$(npm root -g) node tools/town/account_test.js */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';
let fail = 0; const out = [];
const check = (n, ok, info) => { out.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1100, height: 900 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  await ctx.route(/firebaseio|googleapis|gstatic/, r => r.abort());
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  const ready = async () => { await p.waitForFunction(() => window.TOWN && TOWN.net); await p.evaluate(() => { TOWN.net.mode = 'cloud';
    document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); }); };
  await p.goto(BASE + 'index.html'); await ready();
  const code = await p.evaluate(async () => { localStorage.clear(); TEACHER_OK = true; await TOWN.net.teacherSignIn('t@t.t'); const r = await TOWN.net.createClass('P3');
    await TOWN.net.teacherSignOut(); TEACHER_OK = false; return r.code; });
  /* computer 1: play, earn, then sign in */
  await p.evaluate(async code => { S.xp = 900; S.tokens = 42; S.name = 'Maya'; S.avatar = avStarter(4); S.prog = { apm101: { seen: 2, right: 1 } }; save();
    localStorage.setItem('money-moves-progress-v1', JSON.stringify({ player: { name: 'Maya' }, progress: { teller: { stage: 'done' } }, money: 812 }));
    localStorage.setItem('arc.tardy_wave.best', '4321');
    const r = await TOWN.net.join(code, 'Maya', 'L', '2468'); await TOWN.boot(); go('town'); return r; }, code);
  await p.waitForTimeout(600);
  await p.evaluate(() => { go('campus'); }); await p.waitForTimeout(400);
  const banner = await p.evaluate(() => (document.getElementById('townSign') || {}).innerText || '');
  check('campus shows the signed-in account', /Maya L\./.test(banner) && /follow you/.test(banner), banner.slice(0, 120));
  await p.screenshot({ path: '/tmp/acct_campus.png' });
  /* sign out and clear (shared computer) */
  await p.evaluate(async () => { go('town'); await new Promise(r => setTimeout(r, 300)); townLeave(); await townSignOut(true); });
  await p.waitForLoadState('load'); await ready(); await p.waitForTimeout(500);
  const cleared = await p.evaluate(() => ({ xp: S.xp, tokens: S.tokens, mm: localStorage.getItem('money-moves-progress-v1'), sess: !!TOWN.session }));
  check('signing out clears the shared computer', cleared.xp === 0 && cleared.tokens === 0 && !cleared.mm && !cleared.sess, cleared);
  /* "computer 2": sign in again */
  await p.evaluate(async code => { await TOWN.net.join(code, 'Maya', 'L', '2468'); await TOWN.boot(); }, code);
  await p.waitForTimeout(800);
  const back = await p.evaluate(() => ({ xp: S.xp, tokens: S.tokens, avatar: !!S.avatar, prog: Object.keys(S.prog || {}).length,
    mm: JSON.parse(localStorage.getItem('money-moves-progress-v1') || 'null'), arc: localStorage.getItem('arc.tardy_wave.best') }));
  check('signing in brings everything back (XP, coins, avatar, study, Money Moves, arcade)', back.xp === 900 && back.tokens >= 42 && back.avatar && back.prog === 1 && back.mm && back.mm.money === 812 && back.arc === '4321', back);
  const wrong = await p.evaluate(async code => { await TOWN.net.leave(); return (await TOWN.net.join(code, 'Maya', 'L', '1111')).err; }, code);
  check('wrong PIN cannot take the account', wrong === 'pin', wrong);
  check('no page errors', !errs.length, errs);
  console.log(out.join('\n')); console.log(fail ? fail + ' FAILED' : 'all passed'); await b.close(); process.exit(fail ? 1 : 0);
})();
