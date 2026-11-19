/* =============================================================================
   SMITHTOPIA — the Game Hall (town/games.js)
   Two-player games classmates play against each other for Smithbucks:
   Rock Paper Scissors (best of 3), Color Clash (an Uno-style card game),
   Four in a Row, Blackjack 21, Checkers and Chess.

   How a match works
   1. Challenge a classmate: pick the game and a wager (0–25 Smithbucks). Your
      wager is held when you send it and comes back if they decline or you cancel.
   2. They accept (their wager is held too). Before anyone moves, each player
      answers 5 class questions. Whoever gets more right goes first.
   3. Play. The winner takes both wagers; a tie gives each wager back.
   Moves are stored on classes/{cid}/games/{id}; both players' screens follow it.
   Art: v2/assets/town/games/ (Gemini Chat F); simple shapes stand in until then.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T || !T.CIV) return;
const {EXT} = T, V = T.CIV;
const {sheet, closeSheet, E, W2, C, store, SESS} = V;
const GA = T.TA + "games/";
const art = (id, fb) => T.artImg(`${GA}${id}.webp`, fb);
const me = () => SESS() && SESS().sid;
const L = a => S.lang === "es" ? a[1] : a[0];
const WAGERS = [0, 1, 2, 5, 10, 25];

const KINDS = {
  rps:     {e:"✊", ic:"ic_rps",       l:["Rock Paper Scissors","Piedra, papel o tijera"], d:["Best of 3. Pick at the same time.","Al mejor de 3. Elijan al mismo tiempo."]},
  colors:  {e:"🃏", ic:"ic_colors",    l:["Color Clash","Choque de colores"], d:["Match the color or the symbol. First to empty their hand wins.","Combina color o símbolo. Gana quien se quede sin cartas."]},
  four:    {e:"🔴", ic:"ic_four",      l:["Four in a Row","Cuatro en línea"], d:["Drop discs. Four in a row wins.","Suelta fichas. Cuatro en línea gana."]},
  bj:      {e:"🂡", ic:"ic_blackjack", l:["Blackjack 21","Blackjack 21"], d:["Get closer to 21 than your opponent without going over.","Acércate más a 21 que tu rival sin pasarte."]},
  checkers:{e:"⛀", ic:"ic_checkers",  l:["Checkers","Damas"], d:["Jump to capture. Reach the end to become a king.","Salta para capturar. Llega al final para coronar."]},
  chess:   {e:"♞", ic:"ic_chess",     l:["Chess","Ajedrez"], d:["Checkmate the king.","Haz jaque mate al rey."]}
};

/* ---------------------------------------------------------------- seeded randomness (both players get the same deck) */
function rng(seed){ let h = 1779033703 ^ seed.length; for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
  return () => { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
const shuffle = (arr, r) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ================================================================ the six games
   Each game: init(seed, first) → state; render(g, st, mine) → html; and moves via window.gm* handlers.
   "first" is "a" or "b" (the player who moves first). Players are "a" (challenger) and "b". */
const other = p => p === "a" ? "b" : "a";

/* ---------- Four in a Row: 7 columns x 6 rows, row 0 at the top */
const FOUR = {
  init: (seed, first) => ({b:".".repeat(42), t:first}),
  win(b){ const at = (r, c) => r >= 0 && r < 6 && c >= 0 && c < 7 ? b[r * 7 + c] : ".";
    for (let r = 0; r < 6; r++) for (let c = 0; c < 7; c++) { const p = at(r, c); if (p === ".") continue;
      for (const [dr, dc] of [[0,1],[1,0],[1,1],[1,-1]]) if ([1,2,3].every(k => at(r + dr * k, c + dc * k) === p)) return p; }
    return b.includes(".") ? null : "tie"; },
  move(st, p, col){ if (st.t !== p) return null; let r = -1; for (let i = 5; i >= 0; i--) if (st.b[i * 7 + col] === ".") { r = i; break; } if (r < 0) return null;
    const b = st.b.slice(0, r * 7 + col) + p + st.b.slice(r * 7 + col + 1); return {b, t:other(p), last:r * 7 + col}; },
  render(g, st, mine){ const w = this.win(st.b);
    return `<div class="g4">${[...Array(7)].map((_, c) => `<button class="g4col" ${!g.winner && st.t === mine ? `onclick="gmMove(${c})"` : "disabled"}>${[...Array(6)].map((_, r) => { const p = st.b[r * 7 + c];
      return `<span class="g4cell ${st.last === r * 7 + c ? "last" : ""}">${p === "." ? "" : art(p === "a" ? "disc_r" : "disc_y", p === "a" ? "🔴" : "🟡")}</span>`; }).join("")}</button>`).join("")}</div>
      <p class="muted gsub">${W2(`${E(g.aName)} 🔴 · ${E(g.bName)} 🟡`, `${E(g.aName)} 🔴 · ${E(g.bName)} 🟡`)}</p>`; },
  result: st => FOUR.win(st.b)
};

/* ---------- Rock Paper Scissors: best of 3, both pick at once (pa / pb are strings of picks) */
const BEATS = {r:"s", p:"r", s:"p"};
const RPS = {
  init: () => ({}),
  rounds(g){ const pa = g.pa || "", pb = g.pb || "", out = []; for (let i = 0; i < Math.min(pa.length, pb.length); i++) out.push(pa[i] === pb[i] ? "t" : BEATS[pa[i]] === pb[i] ? "a" : "b"); return out; },
  score(g){ const r = this.rounds(g); return {a:r.filter(x => x === "a").length, b:r.filter(x => x === "b").length, r}; },
  result(st, g){ const s = this.score(g); return s.a >= 2 ? "a" : s.b >= 2 ? "b" : s.r.length >= 9 ? "tie" : null; },
  render(g, st, mine){ const s = this.score(g), myp = g["p" + mine] || "", op = g["p" + other(mine)] || "", waiting = myp.length > op.length;
    const ic = {r:["rps_rock","✊"], p:["rps_paper","✋"], s:["rps_scissors","✌️"]};
    return `<div class="grps"><div class="grpsscore"><b>${E(g.aName)}</b> ${s.a} – ${s.b} <b>${E(g.bName)}</b></div>
      <div class="grpsrounds">${s.r.map((w, i) => `<span>${art(ic[(g.pa || "")[i]][0], ic[(g.pa || "")[i]][1])}<i>${w === "t" ? "=" : w === "a" ? "◀" : "▶"}</i>${art(ic[(g.pb || "")[i]][0], ic[(g.pb || "")[i]][1])}</span>`).join("")}</div>
      ${g.winner ? "" : waiting ? `<p class="gwait">⏳ ${W2("Waiting for your opponent to pick…","Esperando a que tu rival elija…")}</p>`
        : `<p><b>${W2(`Round ${s.r.length + 1}: pick one`, `Ronda ${s.r.length + 1}: elige`)}</b></p><div class="grpspick">${Object.entries(ic).map(([k, [id, fb]]) => `<button onclick="gmRps('${k}')">${art(id, fb)}</button>`).join("")}</div>`}</div>`; }
};

/* ---------- Blackjack 21: same seeded deck; first player hits/stands, then the second */
const SUITS = ["♠","♥","♦","♣"], RANKS = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const bjVal = h => { let t = 0, aces = 0; h.forEach(c => { const r = c.slice(0, -1); if (r === "A") { aces++; t += 11; } else t += ["J","Q","K"].includes(r) ? 10 : +r; });
  while (t > 21 && aces) { t -= 10; aces--; } return t; };
const card = (c, hide) => hide ? `<span class="gcard back">${art("card_back", "🂠")}</span>` : `<span class="gcard ${/[♥♦]/.test(c) ? "red" : ""}"><b>${c.slice(0, -1)}</b><i>${c.slice(-1)}</i></span>`;
const BJ = {
  init(seed, first){ const d = shuffle(RANKS.flatMap(r => SUITS.map(s => r + s)), rng(seed)); return {d, i:4, a:[d[0], d[2]], b:[d[1], d[3]], t:first, done:{}, first}; },
  hit(st, p){ if (st.t !== p) return null; const n = {...st, [p]:[...st[p], st.d[st.i]], i:st.i + 1}; if (bjVal(n[p]) >= 21) return BJ.stand(n, p, true); return n; },
  stand(st, p, force){ if (st.t !== p && !force) return null; const done = {...st.done, [p]:1}; return {...st, done, t:done[other(p)] ? null : other(p)}; },
  result(st){ if (!(st.done.a && st.done.b)) return null; const va = bjVal(st.a), vb = bjVal(st.b);
    if (va > 21 && vb > 21) return "tie"; if (va > 21) return "b"; if (vb > 21) return "a"; return va === vb ? "tie" : va > vb ? "a" : "b"; },
  render(g, st, mine){ const over = !!g.winner, op = other(mine);
    const hand = (p, show) => `<div class="gbjhand"><b>${E(p === "a" ? g.aName : g.bName)}</b> ${show ? `<small>${bjVal(st[p])}${bjVal(st[p]) > 21 ? " · " + W2("bust","se pasó") : ""}</small>` : ""}<div>${st[p].map((c, i) => card(c, !show && i > 0)).join("")}</div></div>`;
    return `<div class="gbj">${hand(op, over)}${hand(mine, true)}
      ${over ? "" : st.t === mine ? `<div class="eprow"><button class="btn primary" onclick="gmBj('hit')">${W2("Hit","Pedir")}</button><button class="btn" onclick="gmBj('stand')">${W2("Stand","Plantarse")}</button></div>`
        : `<p class="gwait">⏳ ${st.done[mine] ? W2("You're standing. Waiting for your opponent…","Te plantaste. Esperando a tu rival…") : W2("Your opponent is playing their hand…","Tu rival está jugando su mano…")}</p>`}</div>`; }
};

/* ---------- Color Clash (Uno-style, 2 players). Cards: color r/y/g/b + value 0-9, S (skip), R (reverse), D (draw 2); wild W, wild draw-four F */
const CC_COL = {r:"#E0394B", y:"#F2B33D", g:"#3BB273", b:"#2F7FD8"};
const CC = {
  deck(){ const d = []; for (const c of "rygb") { d.push(c + "0"); for (let n = 1; n <= 9; n++) d.push(c + n, c + n); for (const s of "SRD") d.push(c + s, c + s); } for (let i = 0; i < 4; i++) d.push("xW", "xF"); return d; },
  init(seed, first){ let d = shuffle(CC.deck(), rng(seed)); const a = d.slice(0, 7), b = d.slice(7, 14); d = d.slice(14);
    let k = d.findIndex(c => /^[rygb]\d$/.test(c)); const top = d[k]; d.splice(k, 1); return {d, a, b, top, col:top[0], t:first, drew:0}; },
  ok(st, c){ return c[0] === "x" || c[0] === st.col || c[1] === st.top[1]; },
  draw(st, p, n){ let d = st.d.slice(), hand = st[p].slice();
    for (let i = 0; i < n; i++) { if (!d.length) break; hand.push(d.shift()); } return {...st, d, [p]:hand}; },
  play(st, p, idx, col){ if (st.t !== p) return null; const c = st[p][idx]; if (!c || !CC.ok(st, c)) return null;
    const hand = st[p].filter((_, i) => i !== idx); let n = {...st, [p]:hand, top:c, col:c[0] === "x" ? col : c[0], drew:0};
    const again = "SRDF".includes(c[1]);                           /* in 2 players skip, reverse and draws mean you go again */
    if (c[1] === "D") n = CC.draw(n, other(p), 2); if (c[1] === "F") n = CC.draw(n, other(p), 4);
    n.t = again ? p : other(p); return n; },
  drawOne(st, p){ if (st.t !== p || st.drew) return null; const n = CC.draw(st, p, 1); n.drew = 1; if (!CC.ok(n, n[p][n[p].length - 1])) { n.t = other(p); n.drew = 0; } return n; },
  pass(st, p){ if (st.t !== p || !st.drew) return null; return {...st, t:other(p), drew:0}; },
  result: st => !st.a.length ? "a" : !st.b.length ? "b" : null,
  face(c, small){ const sym = {S:["cc_skip","⊘"], R:["cc_rev","⇄"], D:["cc_draw2","+2"], W:["cc_wild","🌈"], F:["cc_wild","+4"]}[c[1]];
    return `<span class="gcc ${small ? "sm" : ""}" style="--cc:${CC_COL[c[0]] || "#1D1B2E"}">${sym ? `${art(sym[0], sym[1])}${c[1] === "D" ? "<b>+2</b>" : c[1] === "F" ? "<b>+4</b>" : ""}` : `<b>${c[1]}</b>`}</span>`; },
  render(g, st, mine){ const op = other(mine), my = st[mine], turn = !g.winner && st.t === mine;
    return `<div class="gccw"><div class="gccop">${E(mine === "a" ? g.bName : g.aName)}: ${st[op].length} ${W2("cards","cartas")} <span class="gccbacks">${st[op].map(() => `<i></i>`).join("")}</span></div>
      <div class="gcctable"><span class="gccpile">${art("deck", "🂠")}<small>${st.d.length}</small></span>${CC.face(st.top)}<span class="gcccol" style="background:${CC_COL[st.col]}"></span></div>
      <div class="gcchand">${my.map((c, i) => `<button class="${turn && CC.ok(st, c) ? "ok" : ""}" ${turn && CC.ok(st, c) ? `onclick="gmCc(${i})"` : "disabled"}>${CC.face(c)}</button>`).join("")}</div>
      ${turn ? `<div class="eprow">${st.drew ? `<button class="btn" onclick="gmCcPass()">${W2("Pass","Pasar")}</button>` : `<button class="btn" onclick="gmCcDraw()">${W2("Draw a card","Robar carta")}</button>`}</div>`
        : g.winner ? "" : `<p class="gwait">⏳ ${W2("Your opponent's turn…","Turno de tu rival…")}</p>`}</div>`; }
};

/* ---------- Checkers: 8x8, "a" plays red from the bottom, "b" black from the top. Captures are required; multi-jumps continue. */
const CK = {
  init(seed, first){ let b = ""; for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) b += (r + c) % 2 === 1 ? (r < 3 ? "b" : r > 4 ? "a" : ".") : " "; return {b, t:first, chain:-1}; },
  own: (ch, p) => ch.toLowerCase() === p,
  moves(st, p){ const b = st.b, out = [], caps = [];
    for (let i = 0; i < 64; i++) { const ch = b[i]; if (ch === "." || ch === " " || !CK.own(ch, p)) continue; if (st.chain >= 0 && i !== st.chain) continue;
      const r = i >> 3, c = i & 7, king = ch === ch.toUpperCase(), dirs = king ? [-1, 1] : [p === "a" ? -1 : 1];
      for (const dr of dirs) for (const dc of [-1, 1]) { const r1 = r + dr, c1 = c + dc, r2 = r + 2 * dr, c2 = c + 2 * dc;
        if (r1 < 0 || r1 > 7 || c1 < 0 || c1 > 7) continue; const m = b[r1 * 8 + c1];
        if (m === ".") out.push([i, r1 * 8 + c1, -1]);
        else if (m !== " " && !CK.own(m, p) && r2 >= 0 && r2 <= 7 && c2 >= 0 && c2 <= 7 && b[r2 * 8 + c2] === ".") caps.push([i, r2 * 8 + c2, r1 * 8 + c1]); } }
    return caps.length ? caps : st.chain >= 0 ? [] : out; },
  move(st, p, from, to){ if (st.t !== p) return null; const mv = CK.moves(st, p).find(m => m[0] === from && m[1] === to); if (!mv) return null;
    const b = st.b.split(""); let ch = b[from]; b[from] = "."; if (mv[2] >= 0) b[mv[2]] = ".";
    const row = to >> 3; const crowned = ch === p && ((p === "a" && row === 0) || (p === "b" && row === 7)); if (crowned) ch = ch.toUpperCase(); b[to] = ch;
    let n = {b:b.join(""), t:other(p), chain:-1, last:[from, to]};
    if (mv[2] >= 0 && !crowned) { const more = CK.moves({b:n.b, chain:to}, p).filter(m => m[2] >= 0); if (more.length) n = {...n, t:p, chain:to}; }
    return n; },
  result(st){ const has = p => [...st.b].some(ch => ch !== "." && ch !== " " && CK.own(ch, p));
    if (!has("a")) return "b"; if (!has("b")) return "a"; if (!CK.moves(st, st.t).length) return other(st.t); return null; },
  render(g, st, mine){ const flip = mine === "b", sel = SEL, targets = sel >= 0 ? CK.moves(st, mine).filter(m => m[0] === sel).map(m => m[1]) : [], turn = !g.winner && st.t === mine;
    const movable = turn ? new Set(CK.moves(st, mine).map(m => m[0])) : new Set();
    const cells = [...Array(64)].map((_, k) => { const i = flip ? 63 - k : k, ch = st.b[i], dark = ch !== " ";
      const pc = ch === "a" ? art("ck_r", "🔴") : ch === "A" ? art("ck_rk", "♛") : ch === "b" ? art("ck_b", "⚫") : ch === "B" ? art("ck_bk", "♛") : "";
      const click = turn && (movable.has(i) || targets.includes(i)) ? `onclick="gmCk(${i})"` : "";
      return `<span class="gsq ${dark ? "dk" : "lt"} ${sel === i ? "sel" : ""} ${targets.includes(i) ? "tgt" : ""} ${movable.has(i) ? "can" : ""} ${(st.last || []).includes(i) ? "last" : ""} ${ch === "A" || ch === "B" ? "king" : ""}" ${click}>${pc}</span>`; }).join("");
    return `<div class="gboard ck">${cells}</div><p class="muted gsub">${W2(`${E(g.aName)} 🔴 · ${E(g.bName)} ⚫${st.chain >= 0 && turn ? " · Keep jumping!" : ""}`, `${E(g.aName)} 🔴 · ${E(g.bName)} ⚫${st.chain >= 0 && turn ? " · ¡Sigue saltando!" : ""}`)}</p>`; }
};

/* ---------- Chess: full rules (castling, en passant, promotion to a queen, check, checkmate, stalemate, 50 moves, bare kings).
   Board: 64 chars from a8 (index 0) to h1 (63). White = uppercase. "a" (the challenger) plays white unless "b" goes first. */
const CH = {
  init(seed, first){ return {b:"rnbqkbnrpppppppp" + ".".repeat(32) + "PPPPPPPPRNBQKBNR", w:first, t:"w", c:"KQkq", ep:-1, h:0}; },
  side: (st, p) => st.w === p ? "w" : "b",
  isW: ch => ch !== "." && ch === ch.toUpperCase(),
  colorOf: ch => ch === "." ? null : CH.isW(ch) ? "w" : "b",
  attacked(b, sq, by){ const r = sq >> 3, c = sq & 7, at = (rr, cc) => rr >= 0 && rr < 8 && cc >= 0 && cc < 8 ? b[rr * 8 + cc] : null;
    const P = by === "w" ? "P" : "p", N = by === "w" ? "N" : "n", B = by === "w" ? "B" : "b", R = by === "w" ? "R" : "r", Q = by === "w" ? "Q" : "q", K = by === "w" ? "K" : "k";
    const pr = by === "w" ? r + 1 : r - 1; if (at(pr, c - 1) === P || at(pr, c + 1) === P) return true;
    for (const [dr, dc] of [[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]) if (at(r + dr, c + dc) === N) return true;
    for (const [dr, dc] of [[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]]) { if (at(r + dr, c + dc) === K) return true;
      for (let k = 1; k < 8; k++) { const x = at(r + dr * k, c + dc * k); if (x === null) break; if (x === ".") continue;
        if (x === Q || (dr && dc ? x === B : x === R)) return true; break; } }
    return false; },
  pseudo(st){ const b = st.b, me = st.t, out = [], add = (f, t, x) => out.push([f, t, x || ""]);
    for (let i = 0; i < 64; i++) { const ch = b[i]; if (CH.colorOf(ch) !== me) continue; const r = i >> 3, c = i & 7, low = ch.toLowerCase();
      const ray = (dirs, slide) => { for (const [dr, dc] of dirs) for (let k = 1; k < 8; k++) { const rr = r + dr * k, cc = c + dc * k; if (rr < 0 || rr > 7 || cc < 0 || cc > 7) break;
        const t = rr * 8 + cc, x = b[t]; if (x === ".") add(i, t); else { if (CH.colorOf(x) !== me) add(i, t); break; } if (!slide) break; } };
      if (low === "n") ray([[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]], false);
      else if (low === "b") ray([[1,1],[1,-1],[-1,1],[-1,-1]], true);
      else if (low === "r") ray([[1,0],[-1,0],[0,1],[0,-1]], true);
      else if (low === "q") ray([[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]], true);
      else if (low === "k") { ray([[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]], false);
        const opp = me === "w" ? "b" : "w", home = me === "w" ? 60 : 4;
        if (i === home && !CH.attacked(b, home, opp)) {
          if (st.c.includes(me === "w" ? "K" : "k") && b[home + 1] === "." && b[home + 2] === "." && !CH.attacked(b, home + 1, opp)) add(i, home + 2, "O");
          if (st.c.includes(me === "w" ? "Q" : "q") && b[home - 1] === "." && b[home - 2] === "." && b[home - 3] === "." && !CH.attacked(b, home - 1, opp)) add(i, home - 2, "O"); } }
      else if (low === "p") { const dir = me === "w" ? -1 : 1, start = me === "w" ? 6 : 1, one = i + dir * 8;
        if (one >= 0 && one < 64 && b[one] === ".") { add(i, one); if (r === start && b[one + dir * 8] === ".") add(i, one + dir * 8, "2"); }
        for (const dc of [-1, 1]) { const cc = c + dc; if (cc < 0 || cc > 7) continue; const t = (r + dir) * 8 + cc; if (t < 0 || t > 63) continue;
          if (b[t] !== "." && CH.colorOf(b[t]) !== me) add(i, t); else if (t === st.ep) add(i, t, "E"); } } }
    return out; },
  apply(st, [f, t, x]){ const b = st.b.split(""), ch = b[f], me = st.t; let ep = -1, c = st.c, cap = b[t] !== ".";
    b[t] = ch; b[f] = ".";
    if (x === "E") { b[t + (me === "w" ? 8 : -8)] = "."; cap = true; }
    if (x === "2") ep = (f + t) / 2;
    if (x === "O") { if (t > f) { b[t - 1] = b[t + 1]; b[t + 1] = "."; } else { b[t + 1] = b[t - 2]; b[t - 2] = "."; } }
    if ((ch === "P" && t < 8) || (ch === "p" && t > 55)) b[t] = ch === "P" ? "Q" : "q";
    const strip = (sq, s) => { if (f === sq || t === sq) c = c.replace(s, ""); };
    strip(60, /[KQ]/g); strip(4, /[kq]/g); strip(63, "K"); strip(56, "Q"); strip(7, "k"); strip(0, "q");
    return {...st, b:b.join(""), t:me === "w" ? "b" : "w", c, ep, h:(ch.toLowerCase() === "p" || cap) ? 0 : st.h + 1, last:[f, t]}; },
  legal(st){ return CH.pseudo(st).filter(m => { const n = CH.apply(st, m); return !CH.attacked(n.b, n.b.indexOf(st.t === "w" ? "K" : "k"), n.t); }); },
  inCheck: st => CH.attacked(st.b, st.b.indexOf(st.t === "w" ? "K" : "k"), st.t === "w" ? "b" : "w"),
  move(st, p, f, t){ if (CH.side(st, p) !== st.t) return null; const m = CH.legal(st).find(x => x[0] === f && x[1] === t); return m ? CH.apply(st, m) : null; },
  result(st){ const toMove = st.t === "w" ? st.w : other(st.w);
    if (!CH.legal(st).length) return CH.inCheck(st) ? other(toMove) : "tie";
    if (st.h >= 100 || st.b.replace(/[.Kk]/g, "") === "") return "tie"; return null; },
  render(g, st, mine){ const side = CH.side(st, mine), flip = side === "b", sel = SEL, turn = !g.winner && st.t === side;
    const legal = turn ? CH.legal(st) : [], targets = sel >= 0 ? legal.filter(m => m[0] === sel).map(m => m[1]) : [], movable = new Set(legal.map(m => m[0]));
    const U = {K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"};
    const chk = !g.winner && CH.inCheck(st) ? st.b.indexOf(st.t === "w" ? "K" : "k") : -1;
    const cells = [...Array(64)].map((_, k) => { const i = flip ? 63 - k : k, ch = st.b[i], dark = ((i >> 3) + (i & 7)) % 2 === 1;
      const pc = ch === "." ? "" : art(`ch_${CH.isW(ch) ? "w" : "b"}${ch.toLowerCase()}`, U[ch]);
      const click = turn && (movable.has(i) || targets.includes(i)) ? `onclick="gmCh(${i})"` : "";
      return `<span class="gsq ${dark ? "dk" : "lt"} ${sel === i ? "sel" : ""} ${targets.includes(i) ? "tgt" : ""} ${(st.last || []).includes(i) ? "last" : ""} ${chk === i ? "chk" : ""} ${CH.isW(ch) ? "wp" : "bp"}" ${click}>${pc}</span>`; }).join("");
    return `<div class="gboard chess">${cells}</div><p class="muted gsub">${E(st.w === "a" ? g.aName : g.bName)} ♔ · ${E(st.w === "a" ? g.bName : g.aName)} ♚${chk >= 0 ? " · <b>" + W2("Check!","¡Jaque!") + "</b>" : ""}</p>`; }
};
const ENGINE = {rps:RPS, colors:CC, four:FOUR, bj:BJ, checkers:CK, chess:CH};

/* ================================================================ matches */
let GAMES = [], OPEN = null, CUR = null, SEL = -1, SUBS = [], DOCSUB = null;
const role = g => g.a === me() ? "a" : g.b === me() ? "b" : null;
const stOf = g => { try { return g.st ? JSON.parse(g.st) : null; } catch(e){ return null; } };
const gpath = id => `${C()}/games/${id}`;
const stopDoc = () => { if (DOCSUB) { try { DOCSUB(); } catch(e){} DOCSUB = null; } };
const stopAll = () => { SUBS.forEach(u => { try { u(); } catch(e){} }); SUBS = []; stopDoc(); };

/* each player pays and collects their own Smithbucks, once per match */
function settle(g){
  const p = role(g); if (!p) return false; let ch = false;
  if (["declined","canceled"].includes(g.status) && p === "a" && g.wager) ch = T.once("gref:" + g.id, () => { T.coins(g.wager); T.toast(W2(`↩️ Your ${g.wager}-Smithbuck wager came back.`, `↩️ Te devolvieron ${g.wager} Smithbucks.`)); }) || ch;
  if (g.status === "done" && g.winner) ch = T.once("gpay:" + g.id, () => {
    const K = KINDS[g.kind];
    if (g.winner === "tie") { if (g.wager) T.coins(g.wager); T.toast(W2(`🤝 ${L(K.l)} ended in a tie.${g.wager ? " Your wager came back." : ""}`, `🤝 Empate en ${L(K.l)}.${g.wager ? " Te devolvieron tu apuesta." : ""}`)); }
    else if (g.winner === p) { if (g.wager) T.coins(g.wager * 2); T.toast(W2(`🏆 You won ${L(K.l)}!${g.wager ? ` +${g.wager * 2} Smithbucks.` : ""}`, `🏆 ¡Ganaste ${L(K.l)}!${g.wager ? ` +${g.wager * 2} Smithbucks.` : ""}`)); if (typeof fireConfetti === "function") fireConfetti(); }
    else T.toast(W2(`${L(K.l)}: ${p === "a" ? g.bName : g.aName} won this one. Rematch?`, `${L(K.l)}: ganó ${p === "a" ? g.bName : g.aName}. ¿Revancha?`));
    const gs = V.civ(); gs.games = gs.games || {w:0, l:0, t:0}; gs.games[g.winner === "tie" ? "t" : g.winner === p ? "w" : "l"]++;
  }) || ch;
  if (ch) T.persist(); return ch;
}

/* simultaneous picks: whichever screen first sees both picks finishes the match (both write the same result) */
function finalize(g){
  if (g.kind !== "rps" || g.status !== "playing" || g.winner || !role(g)) return;
  const w = RPS.result(null, g); if (w) store().update(gpath(g.id), {status:"done", winner:w, turn:null, upd:Date.now()}).catch(() => {});
}
EXT.onLeave.push(stopAll);
EXT.onSession.push(() => { stopAll(); let seen = null;
  const run = rows => { if (!rows) return; GAMES = rows.filter(g => g.a === me() || g.b === me()).sort((x, y) => (y.upd || y.at) - (x.upd || x.at));
    const st = Object.fromEntries(GAMES.map(g => [g.id, g.status + "|" + g.turn]));
    if (seen) GAMES.forEach(g => { const was = seen[g.id], K = KINDS[g.kind]; if (!K) return;
      if (!was && g.b === me() && g.status === "invited") T.toast(W2(`🎲 ${g.aName} challenged you to ${L(K.l)}${g.wager ? ` for ${g.wager} Smithbucks` : ""}! Town → Games.`, `🎲 ¡${g.aName} te retó a ${L(K.l)}${g.wager ? ` por ${g.wager} Smithbucks` : ""}! Pueblo → Juegos.`));
      else if (was && was !== st[g.id] && g.status === "playing" && g.turn === me() && OPEN !== g.id) T.toast(W2(`🎲 Your move in ${L(K.l)} vs ${role(g) === "a" ? g.bName : g.aName}.`, `🎲 Te toca en ${L(K.l)}.`));
      else if (was && was.startsWith("invited") && g.status === "quiz" && g.a === me()) T.toast(W2(`🎲 ${g.bName} accepted! Answer 5 questions to start ${L(K.l)}.`, `🎲 ¡${g.bName} aceptó! Responde 5 preguntas para empezar.`)); });
    seen = st; GAMES.forEach(settle); GAMES.forEach(finalize); if (T.isTown() && T.tt === "games" && !OPEN) T.paintSub(); };
  SUBS.push(store().watch(`${C()}/games`, {where:[["a","==",me()]]}, rows => { if (rows) { MINE_A = rows; run([...MINE_A, ...MINE_B]); } }));
  SUBS.push(store().watch(`${C()}/games`, {where:[["b","==",me()]]}, rows => { if (rows) { MINE_B = rows; run([...MINE_A, ...MINE_B]); } }));
});
let MINE_A = [], MINE_B = [];

/* ---------------------------------------------------------------- challenge */
window.gmNew = function(kind){
  if (window.TOWN_JAILED && window.TOWN_JAILED()) return T.toast(W2("🔒 No games from jail. Serve your time first.","🔒 No hay juegos en la cárcel."));
  const pubs = Object.entries(T.pub || {}).map(([sid, p]) => ({sid, ...p})).filter(p => p.sid !== me() && p.name).sort((a, b) => a.name.localeCompare(b.name));
  if (!pubs.length) return T.toast(W2("Nobody else is in town yet.","Aún no hay nadie más en el pueblo."));
  window._gmNew = {kind:kind || "rps", wager:0};
  const draw = () => { const n = window._gmNew;
    sheet(`<div class="eyebrow">🎲 ${W2("Challenge a classmate","Reta a un compañero")}</div>
      <div class="gpickk">${Object.entries(KINDS).map(([k, K]) => `<button class="${n.kind === k ? "on" : ""}" onclick="_gmNew.kind='${k}';_gmNewDraw()">${art(K.ic, K.e)}<b>${E(L(K.l))}</b></button>`).join("")}</div>
      <p class="muted" style="margin:6px 0">${E(L(KINDS[n.kind].d))}</p>
      <label class="cform">${W2("Who?","¿Quién?")}<select id="gmWho">${pubs.map(p => `<option value="${p.sid}">${E(p.name)}</option>`).join("")}</select></label>
      <div class="eyebrow" style="margin-top:8px">${W2("Wager","Apuesta")}</div>
      <div class="gwager">${WAGERS.map(w => `<button class="${n.wager === w ? "on" : ""}" ${w > (S.tokens | 0) ? "disabled" : ""} onclick="_gmNew.wager=${w};_gmNewDraw()">${w ? "💵 " + w : W2("Just for fun","Por diversión")}</button>`).join("")}</div>
      <p class="muted" style="font-size:12px">${W2("Your wager is held now and comes back if they say no. Winner takes both. Each of you answers 5 class questions before the game starts.","Tu apuesta se guarda ahora y vuelve si dicen que no. El ganador se lleva ambas. Cada uno responde 5 preguntas antes de empezar.")}</p>
      <p id="gmErr" class="terr"></p>
      <button class="btn primary wide" onclick="gmSend()">📨 ${W2("Send challenge","Enviar reto")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`); };
  window._gmNewDraw = draw; draw();
};
window.gmSend = async function(){
  const n = window._gmNew, sid = document.getElementById("gmWho").value, p = T.pub[sid], err = document.getElementById("gmErr");
  if (n.wager > (S.tokens | 0)) { err.textContent = W2("You don't have that many Smithbucks.","No tienes tantos Smithbucks."); return; }
  if (GAMES.filter(g => ["invited","quiz","playing"].includes(g.status)).length >= 6) { err.textContent = W2("Finish some of your games first (6 at a time).","Termina algunos juegos primero (6 a la vez)."); return; }
  try {
    const id = await store().add(`${C()}/games`, {kind:n.kind, a:me(), b:sid, aName:SESS().name, bName:p.name, wager:n.wager, status:"invited", qa:-1, qb:-1, turn:sid, winner:null, st:"", pa:"", pb:"", at:Date.now(), upd:Date.now()});
    if (n.wager) { T.coins(-n.wager); T.persist(); }
    closeSheet(); T.toast(W2(`📨 Challenge sent to ${p.name}.`, `📨 Reto enviado a ${p.name}.`)); void id;
  } catch(e){ console.warn(e); err.textContent = W2("Couldn't send it right now.","No se pudo enviar."); }
};
window.gmAnswer = async function(id, yes){
  const g = GAMES.find(x => x.id === id); if (!g || g.b !== me() || g.status !== "invited") return;
  if (yes && g.wager > (S.tokens | 0)) return T.toast(W2(`You need ${g.wager} Smithbucks to accept.`, `Necesitas ${g.wager} Smithbucks para aceptar.`));
  try { await store().update(gpath(id), {status:yes ? "quiz" : "declined", turn:null, upd:Date.now()});
    if (yes && g.wager) { T.coins(-g.wager); T.persist(); }
    if (yes) gmOpen(id); else T.toast(W2("Challenge declined.","Reto rechazado."));
  } catch(e){ T.toast(W2("Couldn't do that right now.","No se pudo ahora.")); }
};
window.gmCancel = async function(id){ const g = GAMES.find(x => x.id === id); if (!g || g.a !== me() || g.status !== "invited") return;
  try { await store().update(gpath(id), {status:"canceled", turn:null, upd:Date.now()}); } catch(e){} };

/* ---------------------------------------------------------------- the 5-question gate */
window.gmQuiz = function(id){
  const g = CUR && CUR.id === id ? CUR : GAMES.find(x => x.id === id); const p = g && role(g); if (!p || g.status !== "quiz" || g["q" + p] >= 0) return;
  if (!window.LIVE) return T.toast(W2("Questions aren't loaded yet.","Las preguntas no cargaron."));
  LIVE.qRun({items:LIVE.pickItems(5), title:W2("Warm up: 5 questions","Calentamiento: 5 preguntas"), e:"🎲", sub:L(KINDS[g.kind].l)}, async right => {
    closeSheet();
    try { const fresh = await store().get(gpath(id)), patch = {["q" + p]:right, upd:Date.now()}, oq = fresh && fresh["q" + other(p)];
      if (oq >= 0) {                                       /* both done: more right answers moves first */
        const first = right > oq ? p : oq > right ? other(p) : "a";
        const st = ENGINE[g.kind].init(id, first);
        Object.assign(patch, {status:"playing", st:JSON.stringify(st), turn:g.kind === "rps" ? null : first === "a" ? g.a : g.b});
      }
      await store().update(gpath(id), patch);
      T.toast(W2(`✔ ${right}/5. ${oq >= 0 ? "Game on!" : "Waiting for your opponent to answer theirs."}`, `✔ ${right}/5. ${oq >= 0 ? "¡A jugar!" : "Esperando a que tu rival responda."}`));
    } catch(e){ console.warn(e); T.toast(W2("Couldn't save that.","No se pudo guardar.")); }
  });
};

/* ---------------------------------------------------------------- making a move */
async function commit(g, st, extra){
  const res = g.kind === "rps" ? RPS.result(null, {...g, ...extra}) : ENGINE[g.kind].result(st);
  const turnP = g.kind === "rps" ? null : g.kind === "chess" ? (st.t === "w" ? st.w : other(st.w)) : st.t;
  const patch = {...(extra || {}), upd:Date.now()};
  if (st) patch.st = JSON.stringify(st);
  if (res) Object.assign(patch, {status:"done", winner:res, turn:null}); else patch.turn = turnP ? (turnP === "a" ? g.a : g.b) : null;
  SEL = -1; CUR = {...g, ...patch}; paintGame();
  try { await store().update(gpath(g.id), patch); } catch(e){ console.warn(e); T.toast(W2("Couldn't save your move. Check your connection.","No se pudo guardar tu jugada.")); }
}
const cur = () => { const g = CUR, p = g && role(g), st = g && stOf(g); return g && p && g.status === "playing" && !g.winner ? {g, p, st} : null; };
window.gmMove = c => { const x = cur(); if (!x) return; const n = FOUR.move(x.st, x.p, c); if (n) commit(x.g, n); };
window.gmRps = k => { const x = cur(); if (!x) return; const mine = x.g["p" + x.p] || "", op = x.g["p" + other(x.p)] || ""; if (mine.length > op.length) return; commit(x.g, null, {["p" + x.p]:mine + k}); };
window.gmBj = a => { const x = cur(); if (!x) return; const n = a === "hit" ? BJ.hit(x.st, x.p) : BJ.stand(x.st, x.p); if (n) commit(x.g, n); };
window.gmCc = i => { const x = cur(); if (!x) return; const c = x.st[x.p][i]; if (!c) return;
  if (c[0] === "x") return sheet(`<div class="eyebrow">🌈 ${W2("Pick a color","Elige un color")}</div><div class="gccpick">${Object.entries(CC_COL).map(([k, v]) => `<button style="background:${v}" onclick="townCloseCard();gmCcGo(${i},'${k}')"></button>`).join("")}</div>`);
  gmCcGo(i); };
window.gmCcGo = (i, col) => { const x = cur(); if (!x) return; const n = CC.play(x.st, x.p, i, col); if (n) commit(x.g, n); };
window.gmCcDraw = () => { const x = cur(); if (!x) return; const n = CC.drawOne(x.st, x.p); if (n) commit(x.g, n); };
window.gmCcPass = () => { const x = cur(); if (!x) return; const n = CC.pass(x.st, x.p); if (n) commit(x.g, n); };
window.gmCk = i => { const x = cur(); if (!x) return;
  if (SEL >= 0 && SEL !== i) { const n = CK.move(x.st, x.p, SEL, i); if (n) { if (n.chain >= 0) { SEL = n.chain; } return commit(x.g, n).then(() => { if (n.chain >= 0) { SEL = n.chain; paintGame(); } }); } }
  SEL = SEL === i ? -1 : i; paintGame(); };
window.gmCh = i => { const x = cur(); if (!x) return;
  if (SEL >= 0 && SEL !== i) { const n = CH.move(x.st, x.p, SEL, i); if (n) return commit(x.g, n); }
  SEL = SEL === i || CH.colorOf(x.st.b[i]) !== CH.side(x.st, x.p) ? -1 : i; paintGame(); };
window.gmResign = async function(){ const g = CUR, p = g && role(g); if (!p || g.status !== "playing" || g.winner) return;
  if (!confirm(W2("Resign this game? Your opponent wins.","¿Rendirte? Tu rival gana."))) return;
  try { await store().update(gpath(g.id), {status:"done", winner:other(p), resigned:p, turn:null, upd:Date.now()}); } catch(e){} };
window.gmRematch = async function(){ const g = CUR; if (!g) return; const opp = role(g) === "a" ? g.b : g.a; gmClose(); gmNew(g.kind);
  setTimeout(() => { const s = document.getElementById("gmWho"); if (s) s.value = opp; window._gmNew.wager = Math.min(g.wager, S.tokens | 0); window._gmNewDraw(); const s2 = document.getElementById("gmWho"); if (s2) s2.value = opp; }, 50); };

/* ---------------------------------------------------------------- screens */
window.gmOpen = function(id){ OPEN = id; SEL = -1; stopDoc(); CUR = GAMES.find(x => x.id === id) || null;
  DOCSUB = store().watchDoc(gpath(id), d => { if (!d) return; const was = CUR && CUR.upd; CUR = {...d, id}; settle(CUR); finalize(CUR); if (was !== CUR.upd || !document.querySelector(".gview")) { if (was !== CUR.upd) SEL = -1; paintGame(); } });
  if (T.tt !== "games") townTab("games"); else paintGame(); window.scrollTo(0, 0); };
window.gmClose = function(){ OPEN = null; CUR = null; SEL = -1; stopDoc(); T.paintSub(); };
function paintGame(){
  const el = document.getElementById("tbody"); if (!el || T.tt !== "games" || !OPEN) return;
  const g = CUR; if (!g) { el.innerHTML = `<p class="muted">${W2("Loading…","Cargando…")}</p>`; return; }
  const p = role(g), K = KINDS[g.kind], st = stOf(g), opName = p === "a" ? g.bName : g.aName;
  let body = "";
  if (g.status === "invited") body = `<p class="gwait">⏳ ${p === "a" ? W2(`Waiting for ${E(opName)} to accept…`, `Esperando a que ${E(opName)} acepte…`) : ""}</p>${p === "b" ? `<div class="eprow"><button class="btn primary" onclick="gmAnswer('${g.id}',true)">✅ ${W2("Accept","Aceptar")}${g.wager ? ` (💵 ${g.wager})` : ""}</button><button class="btn ghost" onclick="gmAnswer('${g.id}',false)">${W2("No thanks","No, gracias")}</button></div>` : `<button class="btn ghost" onclick="gmCancel('${g.id}')">${W2("Cancel challenge","Cancelar reto")}</button>`}`;
  else if (g.status === "quiz") body = g["q" + p] < 0 ? `<p>${W2("Before anyone moves, you each answer 5 class questions. More right answers moves first.","Antes de jugar, cada uno responde 5 preguntas. Quien acierte más empieza.")}</p><button class="btn primary" onclick="gmQuiz('${g.id}')">❓ ${W2("Answer my 5 questions","Responder mis 5 preguntas")}</button>`
    : `<p class="gwait">✔ ${g["q" + p]}/5 · ⏳ ${W2(`Waiting for ${E(opName)} to answer their 5…`, `Esperando a que ${E(opName)} responda sus 5…`)}</p>`;
  else if (["declined","canceled"].includes(g.status)) body = `<p class="muted">${g.status === "declined" ? W2("They said no this time.","Dijeron que no esta vez.") : W2("Canceled.","Cancelado.")}</p>`;
  else if (st) body = ENGINE[g.kind].render(g, st, p);
  const done = g.status === "done", res = done ? (g.winner === "tie" ? "🤝 " + W2("It's a tie!","¡Empate!") : g.winner === p ? "🏆 " + W2("You won!","¡Ganaste!") : "😤 " + W2(`${E(opName)} won.`, `Ganó ${E(opName)}.`)) : "";
  const turn = g.status === "playing" && !done ? (g.kind === "rps" ? W2("Pick at the same time","Elijan a la vez") : g.turn === me() ? "👉 " + W2("Your turn","Tu turno") : "⏳ " + W2(`${E(opName)}'s turn`, `Turno de ${E(opName)}`)) : "";
  el.innerHTML = `<div class="gview"><div class="eprow"><button class="btn ghost" onclick="gmClose()">← ${W2("Game Hall","Sala de juegos")}</button></div>
    <section class="panel ghead"><span class="gic">${art(K.ic, K.e)}</span><div><div class="eyebrow">${E(L(K.l))}${g.wager ? ` · 💵 ${g.wager} ${W2("each","c/u")}` : ""}</div>
      <h2>${E(g.aName)} <small>vs</small> ${E(g.bName)}</h2>${turn ? `<p class="gturn ${g.turn === me() ? "mine" : ""}">${turn}</p>` : ""}${res ? `<p class="gres">${res}${g.resigned ? ` <small>(${W2("resigned","se rindió")})</small>` : ""}</p>` : ""}</div></section>
    <section class="panel gplay">${body}</section>
    <div class="eprow">${g.status === "playing" && !done ? `<button class="btn ghost" onclick="gmResign()">🏳️ ${W2("Resign","Rendirse")}</button>` : ""}${done ? `<button class="btn primary" onclick="gmRematch()">🔁 ${W2("Rematch","Revancha")}</button>` : ""}</div></div>`;
}
function paintHall(el){
  if (OPEN) return paintGame();
  const inv = GAMES.filter(g => g.status === "invited" && g.b === me()), act = GAMES.filter(g => ["quiz","playing"].includes(g.status) || (g.status === "invited" && g.a === me()));
  const past = GAMES.filter(g => g.status === "done").slice(0, 8), rec = V.civ().games || {w:0, l:0, t:0};
  const row = g => { const K = KINDS[g.kind] || {e:"🎲", l:["",""]}, op = role(g) === "a" ? g.bName : g.aName;
    const tag = g.status === "invited" ? W2("waiting","esperando") : g.status === "quiz" ? W2("warm-up questions","preguntas") : g.turn === me() ? "👉 " + W2("your turn","tu turno") : g.kind === "rps" ? W2("pick!","¡elige!") : W2("their turn","su turno");
    return `<button class="grow ${g.turn === me() ? "hot" : ""}" onclick="gmOpen('${g.id}')"><span class="gic sm">${art(K.ic, K.e)}</span><span><b>${E(L(K.l))}</b> vs ${E(op)}${g.wager ? ` · 💵 ${g.wager}` : ""}<small>${g.status === "done" ? (g.winner === "tie" ? W2("tie","empate") : g.winner === role(g) ? "🏆 " + W2("won","ganaste") : W2("lost","perdiste")) : tag}</small></span></button>`; };
  el.innerHTML = `<section class="panel raised ghall">${art("hall", "🎲")}<div><div class="eyebrow">${W2("Game Hall","Sala de juegos")}</div><h2>${W2("Challenge a classmate","Reta a un compañero")}</h2>
      <p class="muted" style="margin:0">${W2("Pick a game and a wager. Each of you answers 5 class questions, then play. Winner takes the pot.","Elige un juego y una apuesta. Cada uno responde 5 preguntas y luego juegan. El ganador se lleva todo.")}</p>
      <p class="muted" style="margin:4px 0 0;font-size:13px">🏆 ${rec.w} · 😤 ${rec.l} · 🤝 ${rec.t}</p></div></section>
    ${inv.length ? `<section class="panel ginv"><div class="eyebrow">📨 ${W2("Challenges for you","Retos para ti")}</div>${inv.map(g => `<div class="myrrow"><span>${KINDS[g.kind].e} <b>${E(g.aName)}</b> · ${E(L(KINDS[g.kind].l))}${g.wager ? ` · 💵 ${g.wager}` : ""}</span>
        <span><button class="btn primary" onclick="gmAnswer('${g.id}',true)">${W2("Accept","Aceptar")}</button> <button class="btn ghost" onclick="gmAnswer('${g.id}',false)">✖</button></span></div>`).join("")}</section>` : ""}
    <section class="panel"><div class="ggames">${Object.entries(KINDS).map(([k, K]) => `<button onclick="gmNew('${k}')">${art(K.ic, K.e)}<b>${E(L(K.l))}</b><small>${E(L(K.d))}</small></button>`).join("")}</div></section>
    ${act.length ? `<section class="panel"><div class="eyebrow">🎮 ${W2("Your games","Tus juegos")}</div>${act.map(row).join("")}</section>` : ""}
    ${past.length ? `<section class="panel"><div class="eyebrow">📜 ${W2("Recent results","Resultados recientes")}</div>${past.map(row).join("")}</section>` : ""}`;
}
EXT.tabs.push({key:"games", icon:"🎲", label:() => W2("Games","Juegos"), paint:el => { if (OPEN) paintGame(); else paintHall(el); }});
EXT.onLeave.push(() => { OPEN = null; CUR = null; });
/* a reminder when it's your move */
EXT.banner.push(() => { if (!SESS() || T.tt === "games") return ""; const n = GAMES.filter(g => (g.status === "playing" && g.turn === me()) || (g.status === "invited" && g.b === me()) || (g.status === "quiz" && g["q" + role(g)] < 0)).length;
  return n ? `<section class="panel jban"><b>🎲 ${W2(`${n} game${n > 1 ? "s" : ""} waiting for you`, `${n} juego(s) te esperan`)}</b><button class="btn primary" onclick="townTab('games')">${W2("Play","Jugar")}</button></section>` : ""; });

window.GAMEHALL = {KINDS, ENGINE, FOUR, RPS, BJ, CC, CK, CH, get games(){ return GAMES; }, get cur(){ return CUR; }};
})();
