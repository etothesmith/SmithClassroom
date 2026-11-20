const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } }); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('http://localhost:8765/smackdown/index.html'); await p.waitForTimeout(2500);
  const info = await p.evaluate(() => ({state:SMACK.state, bank:SMACK.BANK().length}));
  console.log('boot', info);
  await p.screenshot({ path: '/tmp/smk_gate.png' });
  // quiz flow for 2 humans
  await p.evaluate(() => { SMACK.setHumans(2); SMACK.beginQuiz(); });
  await p.screenshot({ path: '/tmp/smk_q.png' });
  for (let pl = 0; pl < 2; pl++) { for (let i = 0; i < 5; i++) { await p.evaluate(() => { SMACK.answerRight(); }); if (pl === 0 && i === 0) await p.screenshot({ path: '/tmp/smk_q2.png' }); await p.evaluate(() => SMACK.nextQuestion()); } await p.evaluate(() => SMACK.goSelect()); }
  console.log('after quiz', await p.evaluate(() => ({state:SMACK.state, slots:SMACK.slots().map(s => [s.type, s.focus])})));
  await p.waitForTimeout(500); await p.screenshot({ path: '/tmp/smk_select.png' });
  // bots-only match fast-forward
  await p.evaluate(() => SMACK.demo());
  await p.waitForTimeout(3500); await p.screenshot({ path: '/tmp/smk_fight1.png' });
  let res;
  for (let k = 0; k < 40; k++) { res = await p.evaluate(() => { SMACK.step(1800); const G = SMACK.G; return {state:SMACK.state, f:G.frame, pl:G.players.map(p => [p.name, p.stocks, Math.round(p.damage), p.stats.kos, p.stats.falls, p.out])}; }); if (res.state !== 'ARENA_BATTLE') break; if (k === 1) { await p.waitForTimeout(300); await p.screenshot({ path: '/tmp/smk_fight2.png' }); } }
  console.log('result', JSON.stringify(res));
  await p.waitForTimeout(800); await p.screenshot({ path: '/tmp/smk_podium.png' });
  console.log('errors', errs.slice(0, 8));
  await b.close();
})();
