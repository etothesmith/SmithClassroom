/* Game Hall: rules engines + a full challenge → quiz → play → payout (practice mode):
     python3 -m http.server 8765 &   NODE_PATH=$(npm root -g) node tools/town/games_test.js */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';
const SHOTS = process.env.SHOTS || '/tmp';
const results = []; let fail = 0;
const check = (n, ok, info) => { results.push((ok ? 'PASS ' : 'FAIL ') + n + (info !== undefined ? '  ' + JSON.stringify(info) : '')); if (!ok) fail++; };
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1366, height: 700 } });
  await ctx.route('**/town/config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.TOWN_FIREBASE = null;' }));
  await ctx.route(/firebaseio|googleapis|gstatic/, r => r.abort());
  const errs = [];
  async function page(name){
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message));
    await p.goto(BASE + 'index.html'); await p.waitForFunction(() => window.TOWN && window.GAMEHALL && window.LIVE && TOWN.net, null, { timeout: 20000 });
    await p.evaluate(() => { document.querySelectorAll('body *').forEach(e => { if (/CHOOSE YOUR/i.test(e.textContent) && getComputedStyle(e).position === 'fixed') e.remove(); }); S.v2seen = '2.0'; });
    return p;
  }
  const T = await page('teacher');
  await T.evaluate(() => { localStorage.removeItem('town.db'); localStorage.removeItem('town.notify'); });

  /* ---------- rules engines */
  const eng = await T.evaluate(() => { const G = GAMEHALL, out = {};
    /* four in a row: vertical win */
    let s = G.FOUR.init('x', 'a'); for (const c of [0,1,0,1,0,1,0]) s = G.FOUR.move(s, s.t, c); out.four = G.FOUR.result(s);
    out.fourWrongTurn = G.FOUR.move(G.FOUR.init('x','a'), 'b', 0) === null;
    /* rps */
    out.rps = G.RPS.result(null, {pa:'rr', pb:'ss'}); out.rpsTie = G.RPS.result(null, {pa:'r', pb:'r'});
    /* blackjack: both stand → a result */
    let bj = G.BJ.init('seed1', 'a'); bj = G.BJ.stand(bj, 'a'); bj = G.BJ.stand(bj, 'b'); out.bj = G.BJ.result(bj); out.bjVal = [bj.a, bj.b];
    /* chess: scholar's mate, castling, en passant */
    let c = G.CH.init('x', 'a'); const sq = s2 => (8 - +s2[1]) * 8 + 'abcdefgh'.indexOf(s2[0]);
    const mv = (p, f, t) => { const n = G.CH.move(c, p, sq(f), sq(t)); if (!n) throw new Error('illegal ' + f + t); c = n; };
    mv('a','e2','e4'); mv('b','e7','e5'); mv('a','d1','h5'); mv('b','b8','c6'); mv('a','f1','c4'); mv('b','g8','f6'); mv('a','h5','f7');
    out.mate = G.CH.result(c);
    c = G.CH.init('x','a'); mv('a','e2','e4'); mv('b','a7','a6'); mv('a','g1','f3'); mv('b','a6','a5'); mv('a','f1','e2'); mv('b','a5','a4'); mv('a','e1','g1');
    out.castled = c.b[sq('g1')] === 'K' && c.b[sq('f1')] === 'R';
    c = G.CH.init('x','a'); mv('a','e2','e4'); mv('b','a7','a6'); mv('a','e4','e5'); mv('b','d7','d5'); mv('a','e5','d6');
    out.enPassant = c.b[sq('d5')] === '.' && c.b[sq('d6')] === 'P';
    out.chessIllegal = G.CH.move(G.CH.init('x','a'), 'a', sq('e1'), sq('e2')) === null;
    /* random playouts finish without errors */
    const play = (E, seed, pick) => { let st = E.init(seed, 'a'), n = 0, r = null; while (!(r = E.result(st)) && n++ < 600) { st = pick(st); if (!st) return 'stuck'; } return r || 'long'; };
    let rs = 1; const rnd = () => (rs = (rs * 16807) % 2147483647) / 2147483647;
    out.ckPlay = [1,2,3].map(i => play(G.CK, 's' + i, st => { const m = G.CK.moves(st, st.t); const x = m[Math.floor(rnd() * m.length)]; return G.CK.move(st, st.t, x[0], x[1]); }));
    out.chPlay = [1,2].map(i => play(G.CH, 's' + i, st => { const m = G.CH.legal(st); const x = m[Math.floor(rnd() * m.length)]; const p = st.t === 'w' ? st.w : (st.w === 'a' ? 'b' : 'a'); return G.CH.move(st, p, x[0], x[1]); }));
    out.ccPlay = [1,2,3].map(i => play(G.CC, 's' + i, st => { const p = st.t, ok = st[p].map((c2, k) => [c2, k]).filter(([c2]) => G.CC.ok(st, c2));
      if (ok.length) return G.CC.play(st, p, ok[0][1], 'r'); if (!st.drew) { const n = G.CC.drawOne(st, p); if (n && !n.d.length && !n.drew) return n; return n || G.CC.pass(st, p); } return G.CC.pass(st, p); }));
    out.ccDeck = G.CC.deck().length;
    return out; });
  check('Four in a Row: vertical win, wrong turn blocked', eng.four === 'a' && eng.fourWrongTurn, eng.four);
  check('Rock Paper Scissors: best of 3', eng.rps === 'a' && eng.rpsTie === null);
  check('Blackjack: both stand → a result', ['a','b','tie'].includes(eng.bj), eng.bjVal);
  check("Chess: scholar's mate is checkmate", eng.mate === 'a', eng.mate);
  check('Chess: castling and en passant work; illegal king move blocked', eng.castled && eng.enPassant && eng.chessIllegal, [eng.castled, eng.enPassant, eng.chessIllegal]);
  check('Checkers: random games finish', eng.ckPlay.every(r => ['a','b'].includes(r)), eng.ckPlay);
  check('Chess: random games finish', eng.chPlay.every(r => ['a','b','tie','long'].includes(r)), eng.chPlay);
  check('Color Clash: 108-card deck, random games finish', eng.ccDeck === 108 && eng.ccPlay.every(r => ['a','b','long'].includes(r)), eng.ccPlay);

  /* ---------- a real match between two students */
  const code = await T.evaluate(async () => { TEACHER_OK = true; await TOWN.net.teacherSignIn('smith@school.test'); return (await TOWN.net.createClass('2nd Period')).code; });
  async function student(first, init){
    const p = await page(first);
    await p.evaluate(async ([code, first, init]) => { S.xp = 300; S.tokens = 40; S.name = first; const r = await TOWN.net.join(code, first, init, '1234'); if (r.ok) await TOWN.boot(); }, [code, first, init]);
    await p.evaluate(() => { go('town'); }); await p.waitForTimeout(700); await p.evaluate(() => { townCloseCard(); const w = document.getElementById('whatsnew'); w && w.remove(); });
    return p;
  }
  const A = await student('Ana', 'R'), B = await student('Ben', 'T');
  await A.waitForTimeout(800);
  const benSid = await B.evaluate(() => TOWN.session.sid);
  await A.evaluate(() => townTab('games')); await A.waitForTimeout(400);
  check('Game Hall lists 6 games', await A.evaluate(() => document.querySelectorAll('.ggames button').length) === 6);
  await A.screenshot({ path: SHOTS + '/games_hall.png', fullPage: true });
  const tokens = p => p.evaluate(() => S.tokens);
  const a0 = await tokens(A), b0 = await tokens(B);
  async function challenge(kind, wager){
    await A.evaluate(([k, w, sid]) => { gmNew(k); _gmNew.wager = w; _gmNewDraw(); document.getElementById('gmWho').value = sid; return gmSend(); }, [kind, wager, benSid]);
    await B.waitForTimeout(900);
    return B.evaluate(k => GAMEHALL.games.find(g => g.kind === k && g.status === 'invited').id, kind);
  }
  const solve = p => p.evaluate(async () => { for (let i = 0; i < 12; i++) { const z = window._lvq; if (!z) break; lvAns(z.order.indexOf(z.q.a)); lvNext(); await new Promise(r => setTimeout(r, 30)); } });
  async function start(id){
    await B.evaluate(id => gmAnswer(id, true), id); await B.waitForTimeout(500);
    await A.evaluate(id => gmOpen(id), id); await A.waitForTimeout(500);
    await A.evaluate(id => gmQuiz(id), id); await solve(A); await A.waitForTimeout(600);
    await B.evaluate(id => gmQuiz(id), id); await solve(B); await B.waitForTimeout(900);
  }
  const fid = await challenge('four', 5);
  check('wager held from the challenger', a0 - await tokens(A) === 5);
  check('opponent notified of the challenge', await B.evaluate(() => TNOTIFY.state.feed.some(x => /challenged you to Four in a Row for 5/.test(x.m))));
  await start(fid);
  check('accepting holds the opponent’s wager', b0 - await tokens(B) === 5);
  const st = await A.evaluate(id => { const g = GAMEHALL.cur; return {status:g.status, qa:g.qa, qb:g.qb, turn:g.turn === TOWN.session.sid}; }, fid);
  check('after both answer 5 questions the game starts', st.status === 'playing' && st.qa >= 0 && st.qb >= 0, st);
  await A.evaluate(() => { const t = document.querySelector('.ttoast'); if (t) t.style.display = 'none'; const g = document.querySelector('.gview'); if (g) window.scrollTo(0, g.getBoundingClientRect().top + scrollY - 70); }); await A.waitForTimeout(250); await A.screenshot({ path: SHOTS + '/games_four.png', fullPage: false });
  /* play: whoever moves first, the challenger stacks column 0, the other plays column 1/2 */
  for (let i = 0; i < 12; i++) {
    const done = await A.evaluate(() => GAMEHALL.cur.status === 'done'); if (done) break;
    const aTurn = await A.evaluate(() => GAMEHALL.cur.turn === TOWN.session.sid);
    if (aTurn) await A.evaluate(() => gmMove(0)); else { await B.evaluate(id => { if (!GAMEHALL.cur || GAMEHALL.cur.id !== id) gmOpen(id); }, fid); await B.waitForTimeout(300); await B.evaluate(n => gmMove(n % 2 ? 1 : 2), i); }
    await A.waitForTimeout(500);
  }
  await B.waitForTimeout(800);
  const res = await A.evaluate(() => ({w:GAMEHALL.cur.winner, me:'a'}));
  check('Four in a Row match ends with Ana winning', res.w === 'a', res);
  check('winner collects both wagers', await tokens(A) - a0 === 5, [a0, await tokens(A)]);
  check('loser is down their wager', b0 - await tokens(B) === 5, [b0, await tokens(B)]);
  await A.evaluate(() => { const t = document.querySelector('.ttoast'); if (t) t.style.display = 'none'; const g = document.querySelector('.gview'); if (g) window.scrollTo(0, g.getBoundingClientRect().top + scrollY - 70); }); await A.waitForTimeout(250); await A.screenshot({ path: SHOTS + '/games_four_done.png', fullPage: false });

  /* decline → refund */
  const a1 = await tokens(A); const did = await challenge('chess', 2);
  await B.evaluate(id => gmAnswer(id, false), did); await A.waitForTimeout(900);
  check('declined challenge refunds the wager', await tokens(A) === a1, [a1, await tokens(A)]);

  /* RPS simultaneous picks */
  const rid = await challenge('rps', 0); await start(rid);
  await B.evaluate(id => gmOpen(id), rid); await B.waitForTimeout(400);
  for (const [x, y] of [['r','s'],['p','r']]) { await A.evaluate(k => gmRps(k), x); await B.evaluate(k => gmRps(k), y); await A.waitForTimeout(700); }
  check('Rock Paper Scissors: Ana wins 2–0', await A.evaluate(() => GAMEHALL.cur.winner) === 'a');

  /* chess board renders and a move goes through */
  const cid = await challenge('chess', 0); await start(cid);
  await A.evaluate(id => gmOpen(id), cid); await B.evaluate(id => gmOpen(id), cid); await A.waitForTimeout(500);
  const whoW = await A.evaluate(() => { const st = JSON.parse(GAMEHALL.cur.st); return st.w; });
  const P = whoW === 'a' ? A : B;
  await P.evaluate(() => { gmCh(52); gmCh(36); }); await A.waitForTimeout(800);
  const moved = await A.evaluate(() => JSON.parse(GAMEHALL.cur.st).b[36] === 'P');
  check('Chess: white plays e2-e4 by tapping, both screens update', moved);
  await A.evaluate(() => { const t = document.querySelector('.ttoast'); if (t) t.style.display = 'none'; const g = document.querySelector('.gview'); if (g) window.scrollTo(0, g.getBoundingClientRect().top + scrollY - 70); }); await A.waitForTimeout(250); await A.screenshot({ path: SHOTS + '/games_chess.png', fullPage: false });
  /* color clash renders */
  const ccid = await challenge('colors', 0); await start(ccid); await A.evaluate(id => gmOpen(id), ccid); await A.waitForTimeout(500);
  check('Color Clash: 7 cards in hand', await A.evaluate(() => document.querySelectorAll('.gcchand button').length) === 7);
  await A.evaluate(() => { const t = document.querySelector('.ttoast'); if (t) t.style.display = 'none'; const g = document.querySelector('.gview'); if (g) window.scrollTo(0, g.getBoundingClientRect().top + scrollY - 70); }); await A.waitForTimeout(250); await A.screenshot({ path: SHOTS + '/games_colors.png', fullPage: false });
  const bjid = await challenge('bj', 0); await start(bjid); await A.evaluate(id => gmOpen(id), bjid); await A.waitForTimeout(500);
  await A.evaluate(() => { const t = document.querySelector('.ttoast'); if (t) t.style.display = 'none'; const g = document.querySelector('.gview'); if (g) window.scrollTo(0, g.getBoundingClientRect().top + scrollY - 70); }); await A.waitForTimeout(250); await A.screenshot({ path: SHOTS + '/games_bj.png', fullPage: false });
  const kid = await challenge('checkers', 0); await start(kid); await A.evaluate(id => gmOpen(id), kid); await A.waitForTimeout(500);
  check('Checkers: 24 pieces on the board', await A.evaluate(() => [...JSON.parse(GAMEHALL.cur.st).b].filter(c => /[ab]/i.test(c)).length) === 24);
  await A.evaluate(() => { const t = document.querySelector('.ttoast'); if (t) t.style.display = 'none'; const g = document.querySelector('.gview'); if (g) window.scrollTo(0, g.getBoundingClientRect().top + scrollY - 70); }); await A.waitForTimeout(250); await A.screenshot({ path: SHOTS + '/games_checkers.png', fullPage: false });
  check('no page errors', errs.length === 0, errs);
  console.log(results.join('\n')); console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
  await b.close(); process.exit(fail ? 1 : 0);
})();
