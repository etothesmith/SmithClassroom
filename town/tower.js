/* =============================================================================
   GRENADIER TOWN — Exam Prep (town/tower.js). Loads after town/live.js.
   A new 🎓 Exam tab, built for the AP exams (AP Gov: Tue May 4, 2027, 8 AM;
   AP Macro: Fri May 7, 2027, 12 PM) and Florida's course final exams:

   1. Exam Tower: a roguelike climb, one floor per unit. Each floor has 4
      misconception monsters and a unit boss; right answers hit, wrong answers
      cost a heart, streaks crit. Every answer shows the explanation. Potions
      (50/50, hint, heart, skip) are bought with Smithbucks. Relics found in
      chests change your runs (+1 heart, overturn a wrong answer, block a hit…).
      Floor chests drop new tower-only items and pets; clearing a whole course
      earns its Champion trophy. Economics bosses fight with graphs; government
      bosses fight with Supreme Court cases.
   2. Graph Lab (economics): 34 AP-style scenarios on live graphs (supply and
      demand, AD–AS, money market, loanable funds, foreign exchange, Phillips
      curve, PPC). Pick the curve, the direction, and the effect, then watch
      it shift.
   3. Case Files (government): the AP Gov required Supreme Court cases and
      foundational documents, plus Florida civics cases. Read the facts, name
      the case.
   4. Review: every question you miss in town comes back on a spaced schedule
      (10 minutes, 1, 3, 7, 14 days) until you get it right 5 times.
   5. Mock Exam: timed and weighted by the College Board's unit weights, no
      feedback until you submit (like the real thing), then a unit breakdown,
      a rough AP score estimate and every explanation.
   6. Plan: days to each exam and your 3 weakest standards, weighted by how
      much of the exam each unit is.
   No new collections: progress rides on the student's pub doc for the teacher.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T || !T.CIV || !window.LIVE) return;
const {EXT} = T, V = T.CIV;
const {civ, sheet, closeSheet, E, W2, SESS, CLS, bar, day} = V;
const L = a => (S.lang === "es" ? a[1] : a[0]);
const LV = window.LIVE;
const buzz = ms => { try { if (navigator.vibrate) navigator.vibrate(ms); } catch(e){} };
const confetti = () => { if (typeof fireConfetti === "function") fireConfetti(); };
const rnd = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/* ---------------------------------------------------------------- courses and exams */
const COURSES = {
  "ap-econ": {n:["AP Macroeconomics","Macroeconomía AP"], short:["AP Macro","Macro AP"], exam:"2027-05-07T12:00:00", examName:["AP Macroeconomics Exam","Examen AP de Macroeconomía"],
    w:{"ap-m1":7.5, "ap-m2":14.5, "ap-m3":22, "ap-m4":20.5, "ap-m5":25, "ap-m6":11.5}, per:70, champ:"tw_champ_apecon", ap:true, lab:"graph"},
  "ap-gov":  {n:["AP U.S. Government","Gobierno de EE. UU. AP"], short:["AP Gov","Gob. AP"], exam:"2027-05-04T08:00:00", examName:["AP U.S. Government and Politics Exam","Examen AP de Gobierno y Política"],
    w:{"apg-u1":18.5, "apg-u2":30.5, "apg-u3":15.5, "apg-u4":12.5, "apg-u5":23.5}, per:87, champ:"tw_champ_apgov", ap:true, lab:"cases"},
  "econ-h":  {n:["Economics","Economía"], short:["Economics","Economía"], examName:["Economics final exam (CFE)","Examen final de Economía (CFE)"], per:60, champ:"tw_champ_econ", lab:"graph"},
  "us-gov":  {n:["U.S. Government","Gobierno de EE. UU."], short:["U.S. Gov","Gobierno"], examName:["U.S. Government final exam (CFE)","Examen final de Gobierno (CFE)"], per:60, champ:"tw_champ_gov", lab:"cases"}
};
const pack = id => (typeof allPacks === "function" ? allPacks() : []).find(p => p.id === id);
const myCourses = () => { const m = (S.myCourses || []).filter(id => COURSES[id] && pack(id)); return m.length ? m : Object.keys(COURSES).filter(pack); };
const usable = it => it && it.type === "mcq" && it.c && it.c.en && it.c.en.length >= 3;
const unitItems = u => (u.items || []).filter(usable);
function examAt(cid){ const c = COURSES[cid]; if (c.exam) return new Date(c.exam); const d = CLS().cfeDate; return d ? new Date(d + "T08:00:00") : null; }
const daysTo = d => d ? Math.ceil((d - new Date()) / 864e5) : null;

/* ---------------------------------------------------------------- state */
function tw(){ const c = civ(); const s = c.tower = c.tower || {};
  s.best = s.best || {}; s.kit = s.kit || {fifty:1, hint:1, heart:0, skip:0}; s.mock = s.mock || {}; s.rev = s.rev || {}; s.grad = s.grad | 0;
  s.lab = s.lab || {right:0, n:0}; s.cases = s.cases || {right:{}, n:0}; s.stats = s.stats || {floors:0, runs:0, kills:0}; s.days = s.days || {}; return s; }
let BYID = null;
const byId = id => { if (!BYID) { BYID = {}; (typeof allPacks === "function" ? allPacks() : []).forEach(p => p.units.forEach(u => u.items.forEach(it => { BYID[it.id] = it; }))); } return BYID[id]; };

/* ---------------------------------------------------------------- 4. spaced review (fed by every answer in town) */
const BOX_MIN = [0, 10, 1440, 4320, 10080, 20160];           /* minutes until due, by box 1..5 */
window.LIVE_HOOKS = window.LIVE_HOOKS || [];
window.LIVE_HOOKS.push((q, ok, src) => {
  if (!q || !q.id || !byId(q.id) || !SESS()) return; const s = tw(), r = s.rev[q.id], now = Date.now();
  if (!ok) { s.rev[q.id] = {b:1, due:now + BOX_MIN[1] * 6e4}; return; }
  if (!r) return; if (src === "review" || r.due <= now) { r.b++; if (r.b > 5) { delete s.rev[q.id]; s.grad++; if (s.grad >= 25 && T.once("tw:review25", () => T.addItem("tw_review"))) T.toast(W2("🧠 25 missed questions mastered! Memory Palace bust unlocked.","🧠 ¡25 preguntas dominadas! Desbloqueaste el busto del Palacio de la Memoria.")); }
    else r.due = now + BOX_MIN[r.b] * 6e4; }
});
const dueCards = () => { const s = tw(), now = Date.now(); return Object.entries(s.rev).filter(([id, r]) => r.due <= now && byId(id)).map(([id]) => byId(id)); };
window.twReview = function(){
  const due = dueCards().slice(0, 8); if (!due.length) return T.toast(W2("Nothing due. Nice!","Nada pendiente. ¡Bien!"));
  LV.qRun({title:W2("Review","Repaso"), e:"🧠", sub:W2("Missed before. Get it right to move it up.","Fallada antes. Acierta para subirla."), items:due, src:"review"}, right => {
    closeSheet(); T.toast(W2(`🧠 ${right}/${due.length} remembered.`, `🧠 Recordaste ${right}/${due.length}.`)); markDay("review"); T.persist(); paint(); });
};

/* ---------------------------------------------------------------- the monsters */
const MONSTERS = [["👻",["Nominal Ghoul","Espectro Nominal"]],["🦇",["Bat of Bias","Murciélago del Sesgo"]],["🐍",["Sneaky Strawman","Hombre de Paja Sigiloso"]],
  ["🧌",["Troll of Trade-offs","Trol de las Disyuntivas"]],["🕷️",["Spider of Scarcity","Araña de la Escasez"]],["🦂",["Scorpion of Spin","Escorpión de la Manipulación"]],
  ["👹",["Ogre of Opportunity Cost","Ogro del Costo de Oportunidad"]],["🐺",["Wolf of Wild Guesses","Lobo de las Adivinanzas"]],["🧟",["Cramming Zombie","Zombi del Atracón"]],
  ["🐲",["Drake of Doubt","Draco de la Duda"]],["🦖",["Rex of Rote Memory","Rex de la Memoria Mecánica"]],["🐙",["Octopus of Overthinking","Pulpo de Pensar de Más"]]];
const BOSSES = ["🐉","👾","🦑","🗿","🧙","🦁"];
const SKIES = [["#2b2d6e","#7a4fb5"],["#123f5a","#2e8b8b"],["#4a1d3f","#c2456b"],["#1d3b2a","#4f9d5d"],["#3a2a12","#c98b2b"],["#1a1a2e","#5a3fc0"]];
const KIT = {fifty:["🧪",["50/50 potion","Poción 50/50"],4,["Removes 2 wrong answers","Quita 2 respuestas incorrectas"]],
  hint:["💡",["Hint scroll","Pergamino de pista"],3,["Removes 1 wrong answer and names the standard","Quita 1 incorrecta y dice el estándar"]],
  heart:["❤️",["Heart potion","Poción de corazón"],6,["+1 heart (up to your max)","+1 corazón (hasta tu máximo)"]],
  skip:["⏭️",["Skip charm","Amuleto de salto"],5,["Swap the question (1 per run)","Cambia la pregunta (1 por torre)"]]};
const LOOT = {0:["tw_sdlamp","tw_fedpapers","tw_ballot","tw_globe","tw_inkwell"], 1:["tw_phillips","tw_goldbar","tw_bell","tw_column","tw_magna","tw_scales","tw_ticker","tw_rug_map","rl_compass"],
  2:["tw_bullbear","tw_vase","tw_rug_cash","rl_hand","rl_quill","rl_lantern","pet_bull","pet_bear"], 3:["rl_gavel","rl_shield","pet_eagle"]};
function rollLoot(floor){ const r = Math.random() * 100, lvl = Math.min(floor, 6);
  const tier = r < 3 + lvl * 2 ? 3 : r < 15 + lvl * 4 ? 2 : r < 50 + lvl * 3 ? 1 : 0; return rnd(LOOT[tier]); }

/* ---------------------------------------------------------------- 1. the tower run */
const run = () => tw().run;
const has = id => T.has(id);
const critN = () => has("rl_quill") ? 2 : 3;
function startRun(cid, floor){
  const P = pack(cid); if (!P) return; const mhp = 3 + (has("rl_hand") ? 1 : 0);
  tw().run = {cid, floor, room:0, hp:mhp, mhp, combo:0, gold:0, missed:[], loot:[], asked:[], gavel:has("rl_gavel"), shield:has("rl_shield"), skip:false, mon:null, q:null};
  tw().stats.runs++; newRoom(); T.persist(); TSUB = "tower"; paint();
}
function newRoom(){ const r = run(), boss = r.room === 4, u = pack(r.cid).units[r.floor];
  r.mon = boss ? {e:BOSSES[r.floor % BOSSES.length], n:[`Guardian of ${unitName(u, "en")}`, `Guardián de ${unitName(u, "es")}`], hp:5, max:5, boss:true}
               : (m => ({e:m[0], n:m[1], hp:2, max:2}))(MONSTERS[(r.floor * 4 + r.room + r.asked.length) % MONSTERS.length]);
  r.shieldFloor = r.room === 0 ? r.shield : r.shieldFloor; nextQ(); }
const unitName = (u, l) => String((u.title && (u.title[l] || u.title.en)) || u.id).replace(/^.*?·\s*/, "").replace(/\s*\(SS[^)]*\)$/, "");
function nextQ(){ const r = run(), u = pack(r.cid).units[r.floor], c = COURSES[r.cid];
  /* bosses alternate: a graph (economics) or a case (government), then a hard question */
  if (r.mon.boss && r.mon.hp % 2 === 1) { const sp = special(u, c); if (sp) { r.q = sp; return; } }
  let pool = unitItems(u).filter(it => !r.asked.includes(it.id)); if (r.mon.boss) { const hard = pool.filter(it => (it.diff | 0) >= 2); if (hard.length) pool = hard; }
  if (!pool.length) pool = unitItems(u); const it = rnd(pool); r.asked.push(it.id);
  const lang = S.lang === "es" && it.c.es ? "es" : "en"; r.q = {kind:"mcq", id:it.id, order:shuffle([...it.c[lang].keys()]), off:[], done:false};
}
function special(u, c){
  if (c.lab === "graph") { const g = GRAPHS.filter(x => x.std.startsWith(u.id + ".")); if (g.length) return {kind:"graph", gi:GRAPHS.indexOf(rnd(g)), step:0, pick:{}, done:false}; }
  if (c.lab === "cases") { const k = CASES.filter(x => x.std.startsWith(u.id + ".")); if (k.length) { const cs = rnd(k); return {kind:"case", ci:CASES.indexOf(cs), opts:caseOpts(cs), done:false}; } }
  return null;
}
/* resolve one answer in the tower */
function hit(ok, q){
  const r = run(); if (!r) return; const m = r.mon;
  if (ok) { r.combo++; const crit = r.combo >= critN(), dmg = crit ? 2 : 1; m.hp = Math.max(0, m.hp - dmg); fx(crit ? `-${dmg} ${W2("CRIT!","¡CRÍTICO!")}` : `-${dmg}`, crit ? "crit" : "hit"); buzz(crit ? [20, 30, 40] : 25); }
  else if (r.shieldFloor) { r.shieldFloor = false; fx("🛡️ " + W2("Blocked!","¡Bloqueado!"), "block"); r.combo = 0; }
  else { r.hp--; r.combo = 0; fx("💔", "hurt"); buzz([60, 40, 60]); if (q && q.id) r.missed.push(q.id); }
  T.persist();
}
window.twAns = function(k){
  const r = run(); if (!r || !r.q || r.q.done) return; const q = r.q, it = byId(q.id); q.done = true; q.pick = k;
  const ok = it.c.en && q.order[k] === it.a; q.ok = ok; LV.record(it, ok, "tower"); hit(ok, q); paint();
};
window.twGavel = function(){ const r = run(); if (!r || !r.gavel || !r.q || !r.q.done || r.q.ok) return;
  r.gavel = false; r.hp = Math.min(r.mhp, r.hp + 1); r.missed.pop(); r.q.overturned = true; fx("🔨 " + W2("Overturned!","¡Anulado!"), "block"); T.persist(); paint(); };
window.twKit = function(k){
  const r = run(), s = tw(); if (!r || !r.q || r.q.done || r.q.kind !== "mcq") return; if (!(s.kit[k] > 0)) return twShop();
  const it = byId(r.q.id), wrong = r.q.order.map((x, i) => [x, i]).filter(([x, i]) => x !== it.a && !r.q.off.includes(i)).map(([, i]) => i);
  if (k === "fifty") { if (wrong.length < 2) return; shuffle(wrong).slice(0, 2).forEach(i => r.q.off.push(i)); }
  else if (k === "hint") { if (wrong.length) r.q.off.push(rnd(wrong)); r.q.hint = true; }
  else if (k === "heart") { if (r.hp >= r.mhp) return T.toast(W2("Your hearts are full.","Tus corazones están llenos.")); r.hp++; }
  else if (k === "skip") { if (r.skip) return T.toast(W2("One skip per run.","Un salto por torre.")); r.skip = true; nextQ(); }
  s.kit[k]--; T.persist(); paint();
};
window.twNext = function(){
  const r = run(); if (!r) return;
  if (r.hp <= 0) return endRun(false);
  if (r.mon.hp > 0) { nextQ(); return paint(); }
  /* monster down */
  tw().stats.kills++; r.gold += 1 + (has("rl_compass") ? 2 : 0);
  if (!r.mon.boss) { r.room++; newRoom(); return paint(); }
  floorClear();
};
function floorClear(){
  const r = run(), s = tw(), P = pack(r.cid), loot = rollLoot(r.floor + 1); r.loot.push(loot); T.addItem(loot);
  const kit = rnd(Object.keys(KIT)); s.kit[kit] = (s.kit[kit] | 0) + 1; r.gold += 3 + r.floor;
  s.best[r.cid] = Math.max(s.best[r.cid] | 0, r.floor + 1); s.stats.floors++; markDay("floor");
  let champ = false; if (r.floor + 1 >= P.units.length) champ = T.once("tw:champ:" + r.cid, () => T.addItem(COURSES[r.cid].champ));
  T.persist(); confetti(); buzz([40, 60, 120]);
  const I = T.ITEMS[loot] || {}; TSUB = "tower";
  view(`<section class="panel raised twchest"><div class="eyebrow">🏰 ${W2(`Floor ${r.floor + 1} cleared!`, `¡Piso ${r.floor + 1} superado!`)}</div>
    <div class="twbox"><span class="twlid">🎁</span><div class="twprize r${I.r | 0}">${T.itemArt(loot, 110)}</div></div>
    <h2>${E(T.itemName(loot))} ${T.rarityChip(loot)}</h2>${I.perk ? `<p class="twperk">✨ ${W2("Relic power","Poder de reliquia")}: ${E(L([I.perk.en, I.perk.es]))}</p>` : ""}
    <p>+ ${KIT[kit][0]} ${E(L(KIT[kit][1]))} · ${W2("Gold this run","Oro en esta torre")}: ${r.gold}</p>
    ${champ ? `<p class="twchamp">🏆 ${W2(`You beat every floor of ${COURSES[r.cid].short[0]}! Champion trophy added to your house items.`, `¡Superaste todos los pisos de ${COURSES[r.cid].short[1]}! Trofeo de campeón agregado.`)}</p>` : ""}
    ${r.floor + 1 < P.units.length ? `<button class="btn primary wide" onclick="twUp()">⬆️ ${W2(`Climb to floor ${r.floor + 2}`, `Subir al piso ${r.floor + 2}`)} · ${E(unitName(P.units[r.floor + 1], S.lang === "es" ? "es" : "en"))}</button>` : ""}
    <button class="btn wide" onclick="twCashOut()">💰 ${W2(`Leave with ${r.gold} Smithbucks`, `Salir con ${r.gold} Smithbucks`)}</button></section>`);
}
window.twUp = () => { const r = run(); if (!r) return; r.floor++; r.room = 0; r.hp = Math.min(r.mhp, r.hp + 1); newRoom(); T.persist(); paint(); };
window.twCashOut = () => endRun(true);
function endRun(won){
  const r = run(); if (!r) return; const s = tw(), gold = won ? r.gold : Math.floor(r.gold / 2); T.coins(gold); s.run = null;
  r.missed.forEach(id => { if (!s.rev[id]) s.rev[id] = {b:1, due:Date.now() + BOX_MIN[1] * 6e4}; }); T.persist();
  const miss = [...new Set(r.missed)].map(byId).filter(Boolean);
  view(`<section class="panel raised"><div class="eyebrow">${won ? "🏁 " + W2("Run complete","Torre completada") : "💀 " + W2("Out of hearts","Sin corazones")}</div>
    <h2>${W2(`Reached floor ${r.floor + 1}`, `Llegaste al piso ${r.floor + 1}`)} · +${gold} Smithbucks</h2>
    ${!won ? `<p class="muted">${W2("You keep half your gold and every item you found.","Conservas la mitad del oro y todos los objetos.")}</p>` : ""}
    ${r.loot.length ? `<div class="twloot">${r.loot.map(id => `<span title="${E(T.itemName(id))}">${T.itemArt(id, 48)}</span>`).join("")}</div>` : ""}</section>
    ${miss.length ? `<section class="panel"><div class="eyebrow">📖 ${W2("Learn from this run","Aprende de esta torre")} · ${W2("added to Review","agregadas a Repaso")}</div>
      ${miss.map(it => `<div class="twmiss"><b>${E(T.L2(it.q))}</b><p>✅ ${E(it.c[S.lang === "es" && it.c.es ? "es" : "en"][it.a])}</p><small>${E(T.L2(it.why || {en:""}))}</small></div>`).join("")}</section>` : ""}
    <button class="btn primary wide" onclick="twSub('tower')">🏰 ${W2("Back to the tower","Volver a la torre")}</button>`);
}
window.twStart = (cid, f) => startRun(cid, f | 0);
window.twQuit = () => { if (confirm(W2("Leave the tower? You keep half your gold.","¿Salir de la torre? Conservas la mitad del oro."))) endRun(false); };
window.twShop = function(){ const s = tw();
  sheet(`<div class="eyebrow">🧪 ${W2("Tower supplies","Suministros de la torre")} · 💵 ${S.tokens | 0}</div>
    ${Object.entries(KIT).map(([k, x]) => `<div class="tdeal"><span>${x[0]} <b>${E(L(x[1]))}</b> ×${s.kit[k] | 0}<br><small class="muted">${E(L(x[3]))}</small></span><button class="btn" onclick="twBuy('${k}')">${x[2]} 💵</button></div>`).join("")}
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Done","Listo")}</button>`); };
window.twBuy = k => { const x = KIT[k]; if ((S.tokens | 0) < x[2]) return T.toast(W2("Not enough Smithbucks.","No tienes suficientes Smithbucks."));
  T.coins(-x[2]); tw().kit[k] = (tw().kit[k] | 0) + 1; T.persist(); twShop(); if (run()) paint(); };

/* floating damage numbers + sparks */
let FX = [];
function fx(txt, kind){ FX.push({txt, kind, at:Date.now()}); }
function flushFx(){ const sc = document.querySelector(".twscene"); if (!sc) { FX = []; return; }
  FX.forEach(f => { const el = document.createElement("div"); el.className = "twfloat " + f.kind; el.textContent = f.txt; sc.appendChild(el); setTimeout(() => el.remove(), 1200);
    if (f.kind === "hurt") { sc.classList.remove("shake"); void sc.offsetWidth; sc.classList.add("shake"); }
    if (f.kind === "hit" || f.kind === "crit") { const mon = sc.querySelector(".twmon"); if (mon) { mon.classList.remove("ouch"); void mon.offsetWidth; mon.classList.add("ouch"); }
      for (let i = 0; i < (f.kind === "crit" ? 14 : 7); i++) { const p = document.createElement("i"); p.className = "twspark"; const a = Math.random() * 6.28, d = 40 + Math.random() * 60;
        p.style.setProperty("--dx", Math.cos(a) * d + "px"); p.style.setProperty("--dy", Math.sin(a) * d + "px"); p.style.background = f.kind === "crit" ? "#FFD34D" : "#fff"; sc.appendChild(p); setTimeout(() => p.remove(), 700); } } });
  FX = []; }

function battleHtml(){
  const r = run(), P = pack(r.cid), u = P.units[r.floor], m = r.mon, q = r.q, sky = SKIES[r.floor % SKIES.length];
  const hearts = Array.from({length:r.mhp}, (_, i) => i < r.hp ? "❤️" : "🖤").join("");
  const rooms = [0, 1, 2, 3, 4].map(i => `<i class="${i < r.room ? "done" : i === r.room ? "now" : ""}">${i === 4 ? "👑" : i < r.room ? "✓" : "⚔️"}</i>`).join("");
  const scene = `<div class="twscene" style="--s1:${sky[0]};--s2:${sky[1]}">
    <div class="twhud"><span>${hearts}</span><span>${r.combo >= 2 ? `🔥×${r.combo}` : ""}</span><span>💰 ${r.gold}</span></div>
    <div class="twrooms">${rooms}</div>
    <div class="twmon ${m.boss ? "boss" : ""} ${m.hp <= 0 ? "dead" : ""}"><span>${m.hp <= 0 ? "💥" : m.e}</span></div>
    <div class="twmname">${E(L(m.n))}</div>${bar(m.hp / m.max, m.boss ? "#E5484D" : "#F2B33D")}
    <div class="twfloor">${W2("Floor","Piso")} ${r.floor + 1}/${P.units.length} · ${E(unitName(u, S.lang === "es" ? "es" : "en"))}</div></div>`;
  let card = "";
  if (q.kind === "mcq") { const it = byId(q.id), lang = S.lang === "es" && it.c.es ? "es" : "en", opts = it.c[lang], s = tw(), info = window.STD && it.std ? STD.stdInfo(it.std) : null;
    card = `<section class="panel raised twq">${(q.hint || has("rl_lantern")) && info ? `<p class="lvfocus">💡 ${E(info.code)} · ${E(T.L2(info.topic))}</p>` : ""}
      <h2 style="font-size:18px">${E(T.L2(it.q))}</h2>
      <div class="cqopts">${q.order.map((x, k) => { const off = q.off.includes(k), cls = q.done ? (x === it.a ? "primary" : k === q.pick ? "lvwrong" : "") : "";
        return `<button class="btn ${cls}" ${q.done || off ? "disabled" : ""} style="${off ? "opacity:.3;text-decoration:line-through" : ""}" onclick="twAns(${k})">${E(opts[x])}</button>`; }).join("")}</div>
      ${q.done ? `<p class="lvwhy"><b>${q.ok ? "✅ " + W2("Hit!","¡Golpe!") : q.overturned ? "🔨 " + W2("Overturned.","Anulada.") : "❌ " + W2("Ouch.","¡Auch!")}</b> ${E(T.L2(it.why || {en:""}))}</p>
        ${!q.ok && r.gavel && !q.overturned && r.hp >= 0 ? `<button class="btn wide" onclick="twGavel()">🔨 ${W2("Use the Gavel: overturn this","Usar el Mazo: anular")}</button>` : ""}
        <button class="btn primary wide" onclick="twNext()">${r.hp <= 0 ? "💀 " + W2("See results","Ver resultados") : m.hp <= 0 ? (m.boss ? "🎁 " + W2("Open the chest","Abrir el cofre") : "➡️ " + W2("Next room","Siguiente sala")) : W2("Next","Siguiente") + " →"}</button>`
      : `<div class="twkit">${Object.entries(KIT).map(([k, x]) => `<button class="btn ghost" onclick="twKit('${k}')" title="${E(L(x[1]))}">${x[0]}<small>${s.kit[k] | 0}</small></button>`).join("")}</div>`}</section>`; }
  else if (q.kind === "graph") card = `<section class="panel raised twq"><div class="eyebrow">📊 ${W2("Boss attack: graph","Ataque del jefe: gráfica")}</div>${graphCard(GRAPHS[q.gi], q, "tw")}</section>`;
  else if (q.kind === "case") card = `<section class="panel raised twq"><div class="eyebrow">⚖️ ${W2("Boss attack: case file","Ataque del jefe: caso")}</div>${caseCard(CASES[q.ci], q, "tw")}</section>`;
  return scene + card + `<div class="cyn"><button class="btn ghost" onclick="twShop()">🧪 ${W2("Supplies","Suministros")}</button><button class="btn ghost" onclick="twQuit()">🚪 ${W2("Leave","Salir")}</button></div>`;
}
function towerHome(){
  const s = tw(), lb = Object.values(T.pub || {}).filter(p => p && p.exam && p.exam.tower).map(p => ({n:p.name, f:Object.values(p.exam.tower).reduce((a, b) => a + b, 0)})).sort((a, b) => b.f - a.f).slice(0, 5);
  return `<section class="panel raised twhero"><div class="twtower">${[5, 4, 3, 2, 1, 0].map(i => `<i style="--d:${i * 0.12}s">${i === 5 ? "🚩" : "🪟"}</i>`).join("")}</div>
      <h2>🏰 ${W2("The Exam Tower","La Torre del Examen")}</h2><p class="muted" style="margin:0">${W2("One floor per unit. Four monsters and a boss on every floor. Right answers hit, wrong answers cost a heart, streaks crit. Chests drop tower-only items and relics.","Un piso por unidad. Cuatro monstruos y un jefe por piso. Los aciertos golpean, los errores cuestan un corazón, las rachas son críticas. Los cofres sueltan objetos y reliquias exclusivas.")}</p>
      <div class="twkitbar">${Object.entries(KIT).map(([k, x]) => `<span>${x[0]} ${s.kit[k] | 0}</span>`).join("")}<button class="btn ghost" onclick="twShop()">🧪 ${W2("Supplies","Suministros")}</button></div></section>
    ${myCourses().map(cid => { const P = pack(cid), best = s.best[cid] | 0, n = P.units.length;
      return `<section class="panel"><div class="eyebrow">${E(L(COURSES[cid].n))} · ${W2(`best: floor ${best}/${n}`, `mejor: piso ${best}/${n}`)} ${T.has(COURSES[cid].champ) ? "🏆" : ""}</div>
        <div class="twfloors">${P.units.map((u, i) => `<button class="${i < best ? "done" : ""}" ${i > best ? "disabled" : ""} onclick="twStart('${cid}',${i})"><b>${i + 1}</b><small>${E(unitName(u, S.lang === "es" ? "es" : "en"))}</small>${i < best ? "✓" : i === best ? "▶" : "🔒"}</button>`).join("")}</div></section>`; }).join("")}
    <section class="panel"><div class="eyebrow">✨ ${W2("Your relics","Tus reliquias")}</div>${Object.values(T.ITEMS).filter(i => i.perk).map(i => `<div class="twrelic ${T.has(i.id) ? "on" : ""}">${T.itemArt(i.id, 34)}<div><b>${E(L([i.name.en, i.name.es]))}</b><small>${E(L([i.perk.en, i.perk.es]))}</small></div>${T.has(i.id) ? "✅" : "🔒"}</div>`).join("")}</section>
    ${lb.length ? `<section class="panel"><div class="eyebrow">🏅 ${W2("Highest climbers","Los que más suben")}</div><div class="lvtop">${lb.map((x, i) => `<span>${["🥇","🥈","🥉","4.","5."][i]} ${E(x.n)} <b>${x.f}</b></span>`).join("")}</div></section>` : ""}`;
}

/* ---------------------------------------------------------------- 2. Graph Lab */
const GT = {
  sd: {y:["Price","Precio"], x:["Quantity","Cantidad"], cv:{D:"down", S:"up"}, eq:["D","S"]},
  adas:{y:["Price level","Nivel de precios"], x:["Real GDP","PIB real"], cv:{AD:"down", SRAS:"up", LRAS:"vert"}, eq:["AD","SRAS"]},
  mm: {y:["Nominal interest rate","Tasa de interés nominal"], x:["Quantity of money","Cantidad de dinero"], cv:{MD:"down", MS:"vert"}, eq:["MD","MS"]},
  lf: {y:["Real interest rate","Tasa de interés real"], x:["Quantity of loanable funds","Cantidad de fondos prestables"], cv:{D:"down", S:"up"}, eq:["D","S"]},
  fx: {y:["Price of the dollar (euros)","Precio del dólar (euros)"], x:["Quantity of dollars","Cantidad de dólares"], cv:{D:"down", S:"up"}, eq:["D","S"]},
  pc: {y:["Inflation rate","Tasa de inflación"], x:["Unemployment rate","Tasa de desempleo"], cv:{SRPC:"down", LRPC:"vert"}, eq:null},
  ppc:{y:["Capital goods","Bienes de capital"], x:["Consumer goods","Bienes de consumo"], cv:{PPC:"ppc"}, eq:null}
};
const G = (g, std, c, d, en, es, wen, wes) => ({g, std, c, d, t:[en, es], why:[wen, wes]});
const GRAPHS = [
  G("sd","eh-u1.markets","D",1,"A viral video makes boba tea wildly popular.","Un video viral hace que el té de boba sea muy popular.","Tastes shifted toward boba: more is demanded at every price, so D shifts right and price rises.","Los gustos cambiaron: se demanda más a cada precio, la D se desplaza a la derecha y sube el precio."),
  G("sd","eh-u1.markets","S",-1,"The price of tapioca, an input for boba, rises.","Sube el precio de la tapioca, un insumo del boba.","Higher input costs mean less is supplied at every price: S shifts left, price rises.","Insumos más caros reducen lo ofrecido a cada precio: la S va a la izquierda y sube el precio."),
  G("sd","eh-u1.markets","S",1,"A new machine makes sneakers much cheaper to produce.","Una máquina nueva abarata mucho producir tenis.","Better technology lowers costs: S shifts right and price falls.","Mejor tecnología baja costos: la S va a la derecha y baja el precio."),
  G("sd","eh-u1.markets","D",-1,"Incomes fall, and pizza is a normal good.","Bajan los ingresos y la pizza es un bien normal.","For a normal good, lower income cuts demand: D shifts left, price falls.","En un bien normal, menos ingreso reduce la demanda: la D va a la izquierda y baja el precio."),
  G("sd","eh-u1.markets","D",1,"Hot dogs get cheaper. Show the market for hot dog buns.","Bajan los perros calientes. Muestra el mercado de panes.","Buns are a complement: cheaper hot dogs mean more buns demanded at every price.","Los panes son complementarios: más perros calientes, más demanda de panes."),
  G("sd","eh-u1.markets","S",1,"The government gives corn farmers a subsidy.","El gobierno da un subsidio a los productores de maíz.","A subsidy lowers producers' costs: S shifts right, price falls.","El subsidio baja los costos: la S va a la derecha y baja el precio."),
  G("sd","eh-u1.markets","D",1,"Shoppers expect phone prices to jump next month. Show the market for phones today.","Se espera que los teléfonos suban el próximo mes. Muestra el mercado hoy.","Expecting higher future prices, buyers purchase now: today's D shifts right.","Al esperar precios más altos, compran ahora: la D de hoy va a la derecha."),
  G("adas","ap-m3.fiscal","AD",1,"Congress increases government spending on highways.","El Congreso aumenta el gasto en carreteras.","G is part of AD (C + I + G + Xn): AD shifts right, raising the price level and real GDP.","G es parte de la DA: la DA va a la derecha y suben el nivel de precios y el PIB real."),
  G("adas","ap-m3.ad","AD",-1,"Businesses expect a recession and cut investment.","Las empresas esperan una recesión y recortan inversión.","Less investment (I) shifts AD left: the price level and real GDP fall.","Menos inversión (I) mueve la DA a la izquierda: bajan precios y PIB real."),
  G("adas","ap-m3.as","SRAS",-1,"The price of oil rises sharply.","El precio del petróleo sube mucho.","Higher input costs shift SRAS left: the price level rises while real GDP falls (stagflation).","Insumos más caros mueven la OACP a la izquierda: suben precios y baja el PIB (estanflación)."),
  G("adas","ap-m3.as","SRAS",1,"Nominal wages fall across the economy.","Bajan los salarios nominales en toda la economía.","Lower wages cut production costs: SRAS shifts right, the price level falls, real GDP rises.","Salarios más bajos bajan costos: la OACP va a la derecha, bajan precios y sube el PIB."),
  G("adas","ap-m4.monpol","AD",1,"The Fed buys bonds and interest rates fall. Show the effect on AD.","El Fed compra bonos y bajan las tasas. Muestra el efecto en la DA.","Lower rates boost investment and consumption: AD shifts right.","Tasas más bajas impulsan inversión y consumo: la DA va a la derecha."),
  G("adas","ap-m3.ad","AD",-1,"Europe falls into a recession and buys fewer U.S. exports.","Europa entra en recesión y compra menos exportaciones de EE. UU.","Net exports (Xn) fall, shifting U.S. AD left.","Bajan las exportaciones netas: la DA de EE. UU. va a la izquierda."),
  G("adas","ap-m5.growth5","LRAS",1,"The labor force grows a lot over several years.","La fuerza laboral crece mucho durante varios años.","More resources raise potential output: LRAS shifts right (economic growth).","Más recursos suben el producto potencial: la OALP va a la derecha (crecimiento)."),
  G("adas","ap-m3.ad","AD",1,"Stock prices soar and households feel richer.","Las acciones suben y los hogares se sienten más ricos.","The wealth effect raises consumption: AD shifts right.","El efecto riqueza sube el consumo: la DA va a la derecha."),
  G("adas","ap-m3.fiscal","AD",-1,"Income taxes are raised.","Suben los impuestos sobre la renta.","Higher taxes cut disposable income and consumption: AD shifts left.","Más impuestos bajan el ingreso disponible y el consumo: la DA va a la izquierda."),
  G("mm","ap-m4.monpol","MS",1,"The Fed buys government bonds on the open market.","El Fed compra bonos del gobierno en el mercado abierto.","Buying bonds adds money to the banking system: MS shifts right, the nominal interest rate falls.","Comprar bonos agrega dinero: la OM va a la derecha y baja la tasa nominal."),
  G("mm","ap-m4.monpol","MS",-1,"The Fed sells government bonds.","El Fed vende bonos del gobierno.","Selling bonds pulls money out: MS shifts left, the nominal interest rate rises.","Vender bonos retira dinero: la OM va a la izquierda y sube la tasa nominal."),
  G("mm","ap-m4.monpol","MD",1,"Real GDP grows, so people need more money for purchases.","Crece el PIB real y la gente necesita más dinero para comprar.","More transactions raise money demand: MD shifts right, the interest rate rises.","Más transacciones suben la demanda de dinero: la DM va a la derecha y sube la tasa."),
  G("mm","ap-m4.monpol","MD",-1,"The price level falls.","Baja el nivel de precios.","Cheaper purchases need less money: MD shifts left, the interest rate falls.","Comprar cuesta menos y se necesita menos dinero: la DM va a la izquierda y baja la tasa."),
  G("lf","ap-m4.lf","D",1,"The government runs a bigger budget deficit and borrows more.","El gobierno tiene un déficit mayor y pide más prestado.","Government borrowing raises demand for loanable funds: the real interest rate rises (crowding out).","El endeudamiento público sube la demanda de fondos: sube la tasa real (efecto desplazamiento)."),
  G("lf","ap-m4.lf","S",1,"Households start saving a bigger share of their income.","Los hogares ahorran una mayor parte de su ingreso.","More saving increases the supply of loanable funds: the real interest rate falls.","Más ahorro sube la oferta de fondos: baja la tasa real."),
  G("lf","ap-m4.lf","D",-1,"Businesses turn pessimistic and plan less investment.","Las empresas se vuelven pesimistas y planean invertir menos.","Less planned investment lowers demand for loanable funds: the real interest rate falls.","Menos inversión baja la demanda de fondos: baja la tasa real."),
  G("lf","ap-m4.lf","S",1,"Foreign savers pour money into U.S. bonds.","Ahorradores extranjeros invierten mucho en bonos de EE. UU.","Capital inflows add to the supply of loanable funds: the real interest rate falls.","La entrada de capital sube la oferta de fondos: baja la tasa real."),
  G("fx","ap-m6.fxshift","D",1,"U.S. interest rates rise compared with Europe's. Show the market for dollars.","Las tasas de EE. UU. suben frente a las europeas. Muestra el mercado del dólar.","Foreign savers want U.S. assets, so they demand dollars: the dollar appreciates.","Los extranjeros quieren activos de EE. UU. y demandan dólares: el dólar se aprecia."),
  G("fx","ap-m6.fxshift","S",1,"Americans buy many more Japanese cars. Show the market for dollars.","Los estadounidenses compran muchos más autos japoneses. Muestra el mercado del dólar.","To buy yen, Americans supply dollars: S of dollars shifts right, the dollar depreciates.","Para comprar yenes, ofrecen dólares: la S de dólares va a la derecha y el dólar se deprecia."),
  G("fx","ap-m6.fxshift","D",1,"European tourists flock to Orlando. Show the market for dollars.","Turistas europeos llenan Orlando. Muestra el mercado del dólar.","Tourists need dollars to spend here: D for dollars shifts right, the dollar appreciates.","Los turistas necesitan dólares: la D de dólares va a la derecha y el dólar se aprecia."),
  G("fx","ap-m6.fxshift","D",-1,"U.S. goods become relatively more expensive because of high U.S. inflation. Show demand for dollars.","Los bienes de EE. UU. se encarecen por la inflación. Muestra la demanda de dólares.","Foreigners buy fewer U.S. goods, so they demand fewer dollars: the dollar depreciates. (Supply of dollars also rises.)","Los extranjeros compran menos y demandan menos dólares: el dólar se deprecia. (También sube la oferta.)"),
  G("pc","ap-m5.pc","SRPC",1,"An oil shock causes stagflation.","Un choque petrolero causa estanflación.","A negative supply shock raises both inflation and unemployment: SRPC shifts right.","Un choque de oferta negativo sube inflación y desempleo: la CPCP va a la derecha."),
  G("pc","ap-m5.pc","SRPC",-1,"People come to expect lower inflation.","La gente empieza a esperar menos inflación.","Lower expected inflation shifts SRPC left (down): less inflation at every unemployment rate.","Menor inflación esperada mueve la CPCP a la izquierda: menos inflación a cada desempleo."),
  G("pc","ap-m5.pc","LRPC",-1,"Job-matching apps lower the natural rate of unemployment.","Las apps de empleo bajan la tasa natural de desempleo.","The LRPC sits at the natural rate, so a lower natural rate shifts it left.","La CPLP está en la tasa natural: si baja, se desplaza a la izquierda."),
  G("ppc","ap-m1.growth","PPC",1,"New technology boosts productivity for both goods.","Una nueva tecnología sube la productividad de ambos bienes.","Better technology expands what the economy can make: the PPC shifts outward.","Mejor tecnología amplía lo que se puede producir: la CPP se desplaza hacia afuera."),
  G("ppc","ap-m1.ppc","PPC",-1,"A hurricane destroys factories and farms.","Un huracán destruye fábricas y granjas.","Lost resources shrink the economy's capacity: the PPC shifts inward.","Perder recursos reduce la capacidad: la CPP se desplaza hacia adentro."),
  G("ppc","ap-m1.growth","PPC",1,"Workers become better trained.","Los trabajadores se capacitan mejor.","More human capital raises capacity: the PPC shifts outward.","Más capital humano sube la capacidad: la CPP se desplaza hacia afuera.")
];
/* drawing */
const PX = x => 60 + x * 40, PY = y => 330 - y * 29;
function curveY(kind, c, x){ return kind === "down" ? c - x : x + c; }
function eqOf(cv){ const d = cv.find(v => v.kind === "down"), o = cv.find(v => v.kind !== "down" && v.kind !== "ppc" && v.eq);
  if (!d || !o) return null; if (o.kind === "vert") return {x:o.c, y:d.c - o.c}; const x = (d.c - o.c) / 2; return {x, y:x + o.c}; }
function curvesFor(g, shift, t){
  const D = GT[g]; return Object.entries(D.cv).map(([n, kind]) => { let c = kind === "down" ? 10 : kind === "up" ? 0 : kind === "vert" ? 5 : 7;
    let moved = false; if (shift && shift.c === n) { const amt = 2 * shift.d * t; c = kind === "up" ? c - amt : kind === "ppc" ? c * (1 + 0.18 * shift.d * t) : c + amt; moved = t > 0; }
    return {n, kind, c, moved, eq:D.eq && D.eq.includes(n)}; }); }
function drawGraph(cv, g, shift, t, showEq){
  const x = cv.getContext("2d"), D = GT[g], W = cv.width; x.clearRect(0, 0, W, cv.height);
  x.fillStyle = "#fffdf6"; x.fillRect(0, 0, W, cv.height);
  x.strokeStyle = "#1d1b2e"; x.lineWidth = 2.5; x.beginPath(); x.moveTo(PX(0), PY(10.5)); x.lineTo(PX(0), PY(0)); x.lineTo(PX(10.5), PY(0)); x.stroke();
  x.fillStyle = "#1d1b2e"; x.font = "800 13px Nunito, sans-serif"; x.textAlign = "left"; x.fillText(L(D.y), PX(0) + 6, PY(10.5) - 4);
  x.textAlign = "right"; x.fillText(L(D.x), PX(10.5), PY(0) + 26);
  const draw = (cs, style) => cs.forEach(c => { x.save(); x.strokeStyle = style.col(c); x.lineWidth = style.w; if (style.dash) x.setLineDash([6, 5]); x.beginPath();
    if (c.kind === "vert") { x.moveTo(PX(c.c), PY(0)); x.lineTo(PX(c.c), PY(9.6)); }
    else if (c.kind === "ppc") { for (let a = 0; a <= 90; a += 3) { const r = a * Math.PI / 180, px = PX(Math.cos(r) * c.c * 1.25), py = PY(Math.sin(r) * c.c); a ? x.lineTo(px, py) : x.moveTo(px, py); } }
    else { const x0 = Math.max(0.3, c.kind === "down" ? c.c - 9.6 : -c.c + 0.4), x1 = Math.min(9.6, c.kind === "down" ? c.c - 0.4 : 9.6 - c.c); x.moveTo(PX(x0), PY(curveY(c.kind, c.c, x0))); x.lineTo(PX(x1), PY(curveY(c.kind, c.c, x1))); }
    x.stroke(); x.setLineDash([]);
    if (!style.nolabel) { x.fillStyle = style.col(c); x.font = "900 14px Nunito, sans-serif"; x.textAlign = "left";
      const lab = c.n + (c.moved ? "₂" : style.dash ? "₁" : "");
      if (c.kind === "vert") x.fillText(lab, PX(c.c) + 4, PY(9.6) + 4);
      else if (c.kind === "ppc") x.fillText(lab, PX(c.c * 0.62), PY(c.c * 0.8) - 6);
      else { const xe = Math.min(9.6, c.kind === "down" ? c.c - 0.4 : 9.6 - c.c); x.fillText(lab, PX(xe) + 4, PY(curveY(c.kind, c.c, xe)) + (c.kind === "down" ? 12 : -2)); } }
    x.restore(); });
  const COL = {down:"#2F7FD8", up:"#E5484D", vert:"#8A5CD8", ppc:"#1E7A46"};
  const base = curvesFor(g, null, 0), now = curvesFor(g, shift, t);
  if (shift && t > 0) draw(base.filter(c => c.n === shift.c), {col:() => "#b9b4a8", w:2, dash:true});
  draw(now, {col:c => COL[c.kind], w:3});
  if (showEq && D.eq) { [base, t > 0 ? now : null].forEach((cs, i) => { if (!cs) return; const e = eqOf(cs); if (!e || (i === 1 && !shift)) return;
    x.save(); x.strokeStyle = i ? "#1d1b2e" : "#b9b4a8"; x.setLineDash([4, 4]); x.lineWidth = 1.5; x.beginPath(); x.moveTo(PX(0), PY(e.y)); x.lineTo(PX(e.x), PY(e.y)); x.lineTo(PX(e.x), PY(0)); x.stroke(); x.setLineDash([]);
      x.fillStyle = i ? "#F2B33D" : "#ddd"; x.beginPath(); x.arc(PX(e.x), PY(e.y), 6, 0, 7); x.fill(); x.stroke();
      x.fillStyle = "#1d1b2e"; x.font = "800 11px Nunito, sans-serif"; x.textAlign = "right"; x.fillText(i ? "₂" : "₁", PX(0) - 4, PY(e.y) + 4); x.textAlign = "center"; x.fillText(i ? "₂" : "₁", PX(e.x), PY(0) + 13); x.restore(); }); }
}
function yEffect(gr){ const D = GT[gr.g]; if (!D.eq || !D.eq.includes(gr.c)) return null; const a = eqOf(curvesFor(gr.g, null, 0)), b = eqOf(curvesFor(gr.g, gr, 1)); return b.y > a.y + 0.01 ? 1 : b.y < a.y - 0.01 ? -1 : 0; }
/* a graph question card: step 0 pick the curve, 1 the direction, 2 the effect (when there is one) */
function graphCard(gr, q, ctx){
  const D = GT[gr.g], ye = yEffect(gr), names = Object.keys(D.cv), ppc = gr.g === "ppc";
  const dirL = d => ppc ? (d > 0 ? W2("Outward","Hacia afuera") : W2("Inward","Hacia adentro")) : (d > 0 ? W2("Right","Derecha") : W2("Left","Izquierda"));
  let step = "";
  if (q.step === 0) step = names.length === 1 ? (q.step = 1, "") : `<p><b>1.</b> ${W2("Which curve shifts?","¿Qué curva se desplaza?")}</p><div class="cyn">${names.map(n => `<button class="btn" onclick="twG('${ctx}','c','${n}')">${n}</button>`).join("")}</div>`;
  if (q.step === 1) step = `<p><b>${names.length === 1 ? 1 : 2}.</b> ${W2(`Which way does ${q.pick.c || gr.c} shift?`, `¿Hacia dónde se desplaza ${q.pick.c || gr.c}?`)}</p><div class="cyn"><button class="btn" onclick="twG('${ctx}','d',-1)">⬅️ ${dirL(-1)}</button><button class="btn" onclick="twG('${ctx}','d',1)">${dirL(1)} ➡️</button></div>`;
  if (q.step === 2) step = `<p><b>3.</b> ${W2(`What happens to the ${D.y[0].toLowerCase()}?`, `¿Qué pasa con ${D.y[1].toLowerCase()}?`)}</p><div class="cyn"><button class="btn" onclick="twG('${ctx}','y',1)">⬆️ ${W2("Rises","Sube")}</button><button class="btn" onclick="twG('${ctx}','y',-1)">⬇️ ${W2("Falls","Baja")}</button><button class="btn" onclick="twG('${ctx}','y',0)">↔️ ${W2("No change","Igual")}</button></div>`;
  if (q.done) step = `<p class="lvwhy"><b>${q.ok ? "✅ " + W2("Nailed it!","¡Perfecto!") : "❌ " + W2(`Answer: ${gr.c} shifts ${dirL(gr.d).toLowerCase()}${ye != null ? `, and the ${D.y[0].toLowerCase()} ${ye > 0 ? "rises" : ye < 0 ? "falls" : "doesn't change"}` : ""}.`, `Respuesta: ${gr.c} se desplaza ${dirL(gr.d).toLowerCase()}${ye != null ? ` y ${D.y[1].toLowerCase()} ${ye > 0 ? "sube" : ye < 0 ? "baja" : "no cambia"}` : ""}.`)}</b> ${E(L(gr.why))}</p>
    <button class="btn primary wide" onclick="${ctx === "tw" ? "twNext()" : "twLabNext()"}">${W2("Next","Siguiente")} →</button>`;
  return `<p class="twscen">${E(L(gr.t))}</p><canvas class="twgraph" id="twG_${ctx}" width="480" height="370" data-g="${gr.g}"></canvas>${step}`;
}
let ANIM = 0;
function animateGraph(ctx, gr, shift){ const cv = document.getElementById("twG_" + ctx); if (!cv) return; cancelAnimationFrame(ANIM);
  if (!shift) return drawGraph(cv, gr.g, null, 0, true); const t0 = performance.now();
  const step = t => { const k = Math.min(1, (t - t0) / 900), e = 1 - Math.pow(1 - k, 3); drawGraph(cv, gr.g, shift, e, true); if (k < 1 && cv.isConnected) ANIM = requestAnimationFrame(step); };
  ANIM = requestAnimationFrame(step); }
window.twG = function(ctx, kind, v){
  const q = ctx === "tw" ? run() && run().q : LAB.q; if (!q || q.done) return; const gr = GRAPHS[q.gi], ye = yEffect(gr);
  if (kind === "c") { q.pick.c = v; q.step = 1; }
  else if (kind === "d") { q.pick.d = v; q.step = ye != null && q.pick.c === gr.c ? 2 : 3; }
  else if (kind === "y") { q.pick.y = v; q.step = 3; }
  if (q.step === 3) { q.done = true; q.ok = (q.pick.c || gr.c) === gr.c && q.pick.d === gr.d && (ye == null || q.pick.y === ye);
    LV.record({std:gr.std}, q.ok, "graph"); const s = tw(); s.lab.n++; if (q.ok) { s.lab.right++; if (s.lab.right >= 20 && T.once("tw:graph20", () => T.addItem("tw_graph"))) T.toast(W2("📊 20 graphs right! Graph Master ribbon unlocked.","📊 ¡20 gráficas! Desbloqueaste el listón de Maestro de Gráficas.")); }
    if (ctx === "tw") hit(q.ok, null); else if (q.ok) T.coins(1); markDay("lab"); T.persist(); }
  if (ctx === "tw") paint(); else paintLab();
};
let LAB = {q:null, cid:null};
function labNew(){ const cids = myCourses().filter(c => COURSES[c].lab === "graph"), pref = cids.length ? cids : ["ap-econ"];
  const pool = GRAPHS.filter(g => pref.some(c => c === "econ-h" ? g.std.startsWith("eh-") : g.std.startsWith("ap-m"))), list = pool.length ? pool : GRAPHS;
  LAB.q = {kind:"graph", gi:GRAPHS.indexOf(rnd(list)), step:0, pick:{}, done:false}; }
window.twLabNext = () => { if (LAB.kind === "cases") caseNew(); else labNew(); paintLab(); };
function paintLab(){ const el = document.getElementById("twBody"); if (!el || TSUB !== "lab") return; el.innerHTML = labHtml(); afterLab(); }
function afterLab(){ const q = LAB.q; if (q && q.kind === "graph") { const gr = GRAPHS[q.gi]; animateGraph("lab", gr, q.done || q.step === 3 ? {c:gr.c, d:gr.d} : q.step === 2 ? {c:q.pick.c, d:q.pick.d} : null); } }

/* ---------------------------------------------------------------- 3. Case Files */
const K = (k, n, y, fen, fes, hen, hes, std, c, doc) => ({k, n, y, f:[fen, fes], h:[hen, hes], std, c, doc:!!doc});
const CASES = [
  K("marbury","Marbury v. Madison",1803,"William Marbury was appointed a justice of the peace, but his commission was never delivered. He asked the Supreme Court to order it delivered.","William Marbury fue nombrado juez de paz, pero nunca le entregaron su nombramiento. Pidió a la Corte Suprema que ordenara entregarlo.","Established judicial review: courts can strike down laws that conflict with the Constitution.","Estableció la revisión judicial: las cortes pueden anular leyes contrarias a la Constitución.","apg-u2.courts",["ap-gov","us-gov"]),
  K("mcculloch","McCulloch v. Maryland",1819,"Maryland taxed a branch of the national bank, and the bank's cashier refused to pay.","Maryland gravó una sucursal del banco nacional y su cajero se negó a pagar.","Congress has implied powers (necessary and proper clause), and states can't tax the national government (supremacy clause).","El Congreso tiene poderes implícitos y los estados no pueden gravar al gobierno nacional.","apg-u1.federalism",["ap-gov","us-gov"]),
  K("lopez","United States v. Lopez",1995,"A high school student was charged under a federal law for carrying a gun to school.","Un estudiante fue acusado bajo una ley federal por llevar un arma a la escuela.","The commerce clause has limits: carrying a gun near a school isn't economic activity Congress can regulate that way.","La cláusula de comercio tiene límites: portar un arma cerca de una escuela no es actividad económica regulable así.","apg-u1.federalism",["ap-gov"]),
  K("engel","Engel v. Vitale",1962,"A New York school district began each day with a short, voluntary, nondenominational prayer written by state officials.","Un distrito de Nueva York empezaba el día con una breve oración voluntaria escrita por funcionarios estatales.","School-sponsored prayer violates the establishment clause, even if voluntary.","La oración patrocinada por la escuela viola la cláusula de establecimiento, aunque sea voluntaria.","apg-u3.religion",["ap-gov"]),
  K("yoder","Wisconsin v. Yoder",1972,"Amish parents refused to send their children to school after 8th grade, breaking a state attendance law.","Padres amish no enviaron a sus hijos a la escuela después de 8.º grado, violando una ley estatal.","The free exercise clause protected the Amish families; the state's interest didn't outweigh their religious practice.","La cláusula de libre ejercicio protegió a las familias amish.","apg-u3.religion",["ap-gov"]),
  K("tinker","Tinker v. Des Moines",1969,"Students were suspended for wearing black armbands to school to protest the Vietnam War.","Unos alumnos fueron suspendidos por usar brazaletes negros en protesta por la guerra de Vietnam.","Students keep free speech rights at school; symbolic speech is protected unless it substantially disrupts school.","Los alumnos conservan la libertad de expresión; la expresión simbólica se protege si no interrumpe mucho.","apg-u3.speech",["ap-gov","us-gov"]),
  K("schenck","Schenck v. United States",1919,"During World War I, a man mailed leaflets urging men to resist the military draft.","Durante la Primera Guerra Mundial, un hombre envió folletos que pedían resistir el reclutamiento.","Speech creating a 'clear and present danger' can be limited.","La expresión que crea un 'peligro claro y presente' puede limitarse.","apg-u3.speech",["ap-gov","us-gov"]),
  K("nyt","New York Times Co. v. United States",1971,"The government tried to stop newspapers from publishing the Pentagon Papers, a secret history of the Vietnam War.","El gobierno intentó impedir que los periódicos publicaran los Papeles del Pentágono.","Prior restraint of the press faces a heavy burden; the newspapers could publish.","La censura previa enfrenta una carga muy alta; los periódicos pudieron publicar.","apg-u3.speech",["ap-gov"]),
  K("gideon","Gideon v. Wainwright",1963,"A man charged with breaking into a Panama City, Florida pool hall asked for a lawyer and was told the state only provided one in death-penalty cases.","Un hombre acusado de entrar a un salón de billar en Panama City, Florida, pidió un abogado y se lo negaron.","The Sixth Amendment right to counsel applies to the states: poor defendants in felony cases get a lawyer.","El derecho a un abogado de la 6.ª Enmienda aplica a los estados: los acusados pobres reciben abogado.","apg-u3.accused",["ap-gov","us-gov"]),
  K("mcdonald","McDonald v. Chicago",2010,"A Chicago resident challenged the city's ban on keeping handguns at home.","Un residente de Chicago impugnó la prohibición de tener pistolas en casa.","The Second Amendment right to keep and bear arms applies to the states through the 14th Amendment.","El derecho de la 2.ª Enmienda aplica a los estados mediante la 14.ª Enmienda.","apg-u3.incorp",["ap-gov"]),
  K("brown","Brown v. Board of Education",1954,"Black students were assigned to segregated public schools under state laws.","Estudiantes negros eran asignados a escuelas públicas segregadas por ley estatal.","Segregated public schools are inherently unequal and violate the equal protection clause.","Las escuelas segregadas son desiguales por naturaleza y violan la igual protección.","apg-u3.civilrights",["ap-gov","us-gov"]),
  K("baker","Baker v. Carr",1962,"Tennessee hadn't redrawn its legislative districts in 60 years, so city voters had far less voting power than rural voters.","Tennessee no redibujó sus distritos en 60 años y los votantes urbanos tenían mucho menos peso.","Courts can hear redistricting cases, opening the way to 'one person, one vote.'","Las cortes pueden revisar la redistribución de distritos: 'una persona, un voto'.","apg-u2.courts",["ap-gov"]),
  K("shaw","Shaw v. Reno",1993,"North Carolina drew an oddly shaped congressional district based mainly on race.","Carolina del Norte trazó un distrito de forma extraña basado principalmente en la raza.","Districts drawn mainly by race face strict scrutiny under the equal protection clause.","Los distritos trazados por raza enfrentan escrutinio estricto bajo la igual protección.","apg-u5.elections",["ap-gov"]),
  K("citizens","Citizens United v. FEC",2010,"A nonprofit group wanted to air a film criticizing a candidate close to an election, which federal law limited.","Un grupo sin fines de lucro quería transmitir una película crítica de una candidata cerca de la elección.","Corporations and unions may spend unlimited money on independent political ads; it's protected speech.","Empresas y sindicatos pueden gastar sin límite en anuncios independientes; es expresión protegida.","apg-u5.elections",["ap-gov"]),
  K("miranda","Miranda v. Arizona",1966,"A suspect confessed during police questioning without being told he could stay silent or have a lawyer.","Un sospechoso confesó en un interrogatorio sin saber que podía callar o tener abogado.","Police must tell suspects in custody their rights before questioning.","La policía debe informar sus derechos a los detenidos antes de interrogarlos.","gov-u5.cases",["us-gov","ap-gov"]),
  K("mapp","Mapp v. Ohio",1961,"Police searched a woman's home without a valid warrant and used what they found against her.","La policía registró una casa sin orden válida y usó lo encontrado contra la dueña.","Evidence from an illegal search can't be used in state courts (the exclusionary rule).","La evidencia de un registro ilegal no se puede usar en cortes estatales (regla de exclusión).","gov-u5.cases",["us-gov"]),
  K("hazelwood","Hazelwood v. Kuhlmeier",1988,"A principal removed two pages from a school-sponsored student newspaper.","Un director quitó dos páginas de un periódico escolar patrocinado por la escuela.","Schools may edit school-sponsored student speech for legitimate teaching reasons.","Las escuelas pueden editar la expresión patrocinada por razones educativas legítimas.","gov-u5.cases",["us-gov"]),
  K("plessy","Plessy v. Ferguson",1896,"A man was arrested for sitting in a 'whites only' railroad car in Louisiana.","Un hombre fue arrestado por sentarse en un vagón 'solo para blancos' en Luisiana.","Upheld 'separate but equal' segregation; overturned by Brown v. Board in 1954.","Avaló la segregación 'separados pero iguales'; anulado por Brown en 1954.","gov-u5.cases",["us-gov"]),
  K("bushgore","Bush v. Gore",2000,"Florida's presidential vote was razor-close, and the state supreme court ordered a statewide manual recount.","La votación presidencial en Florida fue reñidísima y la corte estatal ordenó un recuento manual.","The U.S. Supreme Court stopped the recount, finding equal protection problems with uneven counting standards.","La Corte Suprema detuvo el recuento por problemas de igual protección con criterios desiguales.","gov-u4.elections",["us-gov"]),
  K("fed10","Federalist No. 10",1787,"Madison's essay on the danger of factions: groups pursuing their own interests against others' rights.","Ensayo de Madison sobre el peligro de las facciones.","A large republic controls the effects of factions better than a small democracy.","Una república grande controla mejor los efectos de las facciones.","apg-u1.fedpapers",["ap-gov"],1),
  K("fed51","Federalist No. 51",1788,"Madison's essay on how to keep each branch from gaining too much power: 'Ambition must be made to counteract ambition.'","Ensayo de Madison sobre cómo evitar que un poder domine: 'la ambición debe contrarrestar a la ambición'.","Separation of powers and checks and balances protect liberty.","La separación de poderes y los pesos y contrapesos protegen la libertad.","apg-u1.fedpapers",["ap-gov"],1),
  K("fed70","Federalist No. 70",1788,"Hamilton's essay arguing for an energetic executive led by one person.","Ensayo de Hamilton a favor de un ejecutivo enérgico a cargo de una sola persona.","A single executive acts quickly and is easier to hold accountable.","Un solo ejecutivo actúa rápido y es más fácil de responsabilizar.","apg-u2.president",["ap-gov"],1),
  K("fed78","Federalist No. 78",1788,"Hamilton's essay calling the judiciary the 'least dangerous' branch.","Ensayo de Hamilton que llama al poder judicial la rama 'menos peligrosa'.","Lifetime appointments keep judges independent, and courts can review laws.","Los cargos vitalicios dan independencia y las cortes pueden revisar leyes.","apg-u2.courts",["ap-gov"],1),
  K("brutus1","Brutus No. 1",1787,"An Anti-Federalist essay warning against the proposed Constitution.","Un ensayo antifederalista que advierte contra la Constitución propuesta.","A large national government would swallow the states and threaten liberty.","Un gobierno nacional grande absorbería a los estados y amenazaría la libertad.","apg-u1.fedpapers",["ap-gov"],1),
  K("birmingham","Letter from Birmingham Jail",1963,"Dr. Martin Luther King Jr. wrote it from jail after being arrested at a nonviolent protest.","El Dr. Martin Luther King Jr. lo escribió en la cárcel tras ser arrestado en una protesta pacífica.","Defends nonviolent civil disobedience against unjust laws and the urgency of civil rights.","Defiende la desobediencia civil pacífica contra leyes injustas.","apg-u3.civilrights",["ap-gov"],1),
  K("articles","Articles of Confederation",1781,"The first plan of U.S. government, with a one-house Congress and no executive.","El primer plan de gobierno de EE. UU., con un Congreso unicameral y sin ejecutivo.","Its weak national government (no power to tax or raise an army) led to the Constitution.","Su gobierno nacional débil llevó a la Constitución.","apg-u1.framing",["ap-gov","us-gov"],1),
  K("declaration","Declaration of Independence",1776,"Lists grievances against King George III and natural rights to life, liberty and the pursuit of happiness.","Enumera agravios contra Jorge III y los derechos naturales a la vida, la libertad y la felicidad.","People may alter or abolish a government that violates their rights (social contract).","El pueblo puede cambiar un gobierno que viola sus derechos (contrato social).","apg-u1.ideals",["ap-gov","us-gov"],1)
];
function caseOpts(cs){ const pool = CASES.filter(x => x.k !== cs.k && x.doc === cs.doc && x.c.some(c => cs.c.includes(c))); return shuffle([cs.k, ...shuffle(pool).slice(0, 3).map(x => x.k)]); }
function caseCard(cs, q, ctx){
  return `<p class="twscen">${cs.doc ? "📜 " + W2("Which document is this?","¿Qué documento es?") : "🗂️ " + W2("Which case is this?","¿Qué caso es?")}</p><blockquote class="twfacts">${E(L(cs.f))}</blockquote>
    <div class="cqopts">${q.opts.map(k => { const x = CASES.find(c => c.k === k), cls = q.done ? (k === cs.k ? "primary" : k === q.pick ? "lvwrong" : "") : "";
      return `<button class="btn ${cls}" ${q.done ? "disabled" : ""} onclick="twCase('${ctx}','${k}')">${E(x.n)}</button>`; }).join("")}</div>
    ${q.done ? `<p class="lvwhy"><b>${q.ok ? "✅" : "❌"} ${E(cs.n)} (${cs.y})</b> ${E(L(cs.h))}</p><button class="btn primary wide" onclick="${ctx === "tw" ? "twNext()" : "twLabNext()"}">${W2("Next","Siguiente")} →</button>` : ""}`; }
window.twCase = function(ctx, k){ const q = ctx === "tw" ? run() && run().q : LAB.q; if (!q || q.done) return; const cs = CASES[q.ci]; q.done = true; q.pick = k; q.ok = k === cs.k;
  LV.record({std:cs.std}, q.ok, "case"); const s = tw(); s.cases.n++; if (q.ok) { s.cases.right[cs.k] = 1; if (Object.keys(s.cases.right).length >= 20 && T.once("tw:cases", () => T.addItem("tw_cases"))) T.toast(W2("🗂️ 20 different cases right! Case Files master badge unlocked.","🗂️ ¡20 casos distintos! Desbloqueaste la insignia de Maestro de Casos.")); }
  if (ctx === "tw") hit(q.ok, null); else if (q.ok) T.coins(1); markDay("lab"); T.persist(); ctx === "tw" ? paint() : paintLab(); };
function caseNew(){ const mine = myCourses(), pool = CASES.filter(x => x.c.some(c => mine.includes(c))), list = pool.length ? pool : CASES, cs = rnd(list);
  LAB.q = {kind:"case", ci:CASES.indexOf(cs), opts:caseOpts(cs), done:false}; }
window.twLabMode = k => { LAB.kind = k; k === "cases" ? caseNew() : labNew(); paintLab(); };
function labHtml(){
  const hasE = myCourses().some(c => COURSES[c].lab === "graph"), hasG = myCourses().some(c => COURSES[c].lab === "cases");
  if (!LAB.kind) LAB.kind = hasE || !hasG ? "graph" : "cases"; if (!LAB.q || (LAB.kind === "graph") !== (LAB.q.kind === "graph")) LAB.kind === "cases" ? caseNew() : labNew();
  const s = tw();
  return `<div class="cyn twmodes"><button class="btn ${LAB.kind === "graph" ? "primary" : ""}" onclick="twLabMode('graph')">📊 ${W2("Graph Lab","Laboratorio de gráficas")}</button><button class="btn ${LAB.kind === "cases" ? "primary" : ""}" onclick="twLabMode('cases')">🗂️ ${W2("Case Files","Expedientes")}</button></div>
    <section class="panel raised twq">${LAB.kind === "graph" ? `<div class="eyebrow">📊 ${W2("AP-style graph practice","Gráficas estilo AP")} · ✔ ${s.lab.right}/${s.lab.n}</div>${graphCard(GRAPHS[LAB.q.gi], LAB.q, "lab")}`
      : `<div class="eyebrow">🗂️ ${W2("Required cases and documents","Casos y documentos obligatorios")} · ${Object.keys(s.cases.right).length}/${CASES.length} ${W2("solved","resueltos")}</div>${caseCard(CASES[LAB.q.ci], LAB.q, "lab")}`}</section>
    <p class="muted" style="font-size:12px;text-align:center">${W2("+1 Smithbuck for every right answer. Graphs and cases count toward your Standards Passport and the Period Raid.","+1 Smithbuck por acierto. Cuentan para tu Pasaporte de estándares y la incursión.")}</p>`;
}

/* ---------------------------------------------------------------- 5. Mock Exam */
let MOCK = null;
const MOCK_N = 20;
function mockPick(cid){ const P = pack(cid), c = COURSES[cid], w = c.w || Object.fromEntries(P.units.map(u => [u.id, 1])), tot = Object.values(w).reduce((a, b) => a + b, 0);
  const counts = P.units.map(u => ({u, n:Math.round(MOCK_N * (w[u.id] || 0) / tot)})); let sum = counts.reduce((a, b) => a + b.n, 0);
  while (sum < MOCK_N) { counts.sort((a, b) => (w[b.u.id] || 0) - (w[a.u.id] || 0))[0].n++; sum++; } while (sum > MOCK_N) { const x = counts.find(k => k.n > 1); x.n--; sum--; }
  const out = []; counts.forEach(({u, n}) => shuffle(unitItems(u)).slice(0, n).forEach(it => out.push({it, u:u.id}))); return shuffle(out); }
window.twMockStart = function(cid){
  const qs = mockPick(cid); if (qs.length < 10) return T.toast(W2("Not enough questions yet.","Aún no hay suficientes preguntas."));
  MOCK = {cid, qs:qs.map(x => ({...x, order:shuffle([...x.it.c[S.lang === "es" && x.it.c.es ? "es" : "en"].keys()]), pick:-1, flag:false})), i:0, end:Date.now() + qs.length * COURSES[cid].per * 1000, done:false};
  TSUB = "mock"; paint(); mockTick();
};
let MT = 0;
function mockTick(){ clearInterval(MT); MT = setInterval(() => { if (!MOCK || MOCK.done) return clearInterval(MT); const left = MOCK.end - Date.now(), el = document.getElementById("twClock");
  if (left <= 0) { clearInterval(MT); return twMockSubmit(true); } if (el) { const m = Math.floor(left / 60000), sec = Math.floor(left % 60000 / 1000); el.textContent = `${m}:${String(sec).padStart(2, "0")}`; el.classList.toggle("low", left < 60000); } }, 500); }
window.twMockPick = k => { if (!MOCK || MOCK.done) return; MOCK.qs[MOCK.i].pick = k; buzz(10); paint(); };
window.twMockGo = i => { if (!MOCK) return; MOCK.i = Math.max(0, Math.min(MOCK.qs.length - 1, i)); paint(); };
window.twMockFlag = () => { if (!MOCK) return; const q = MOCK.qs[MOCK.i]; q.flag = !q.flag; paint(); };
window.twMockSubmit = function(auto){
  if (!MOCK || MOCK.done) return; const blank = MOCK.qs.filter(q => q.pick < 0).length;
  if (!auto && blank && !confirm(W2(`${blank} unanswered. Submit anyway?`, `${blank} sin responder. ¿Enviar de todos modos?`))) return;
  MOCK.done = true; clearInterval(MT); let right = 0; const by = {};
  MOCK.qs.forEach(q => { const ok = q.order[q.pick] === q.it.a; q.ok = ok; if (ok) right++; const b = by[q.u] = by[q.u] || [0, 0]; b[1]++; if (ok) b[0]++; LV.record(q.it, ok, "mock"); });
  const pct = Math.round(100 * right / MOCK.qs.length), s = tw(), m = s.mock[MOCK.cid] = s.mock[MOCK.cid] || {best:0, n:0};
  m.best = Math.max(m.best, pct); m.last = pct; m.n++; m.at = Date.now(); m.by = Object.fromEntries(Object.entries(by).map(([k, v]) => [k, Math.round(100 * v[0] / v[1])]));
  MOCK.pct = pct; MOCK.by = by; MOCK.right = right;
  T.once("tw:mock:" + day(), () => T.coins(5)); if (pct >= 80 && T.once("tw:mock80", () => T.addItem("tw_mock"))) setTimeout(() => T.toast(W2("🥇 80%+ on a mock exam! Honor medal unlocked.","🥇 ¡80%+ en un simulacro! Medalla de honor desbloqueada.")), 500);
  markDay("mock"); T.persist(); if (pct >= 70) confetti(); paint();
};
const apEst = p => p >= 75 ? 5 : p >= 62 ? 4 : p >= 48 ? 3 : p >= 35 ? 2 : 1;
function mockHtml(){
  if (MOCK && !MOCK.done) { const q = MOCK.qs[MOCK.i], it = q.it, lang = S.lang === "es" && it.c.es ? "es" : "en", opts = it.c[lang];
    return `<section class="panel raised twmock"><div class="twmockbar"><b>${E(L(COURSES[MOCK.cid].short))} ${W2("mock exam","simulacro")}</b><span id="twClock" class="twclock">--:--</span></div>
      <div class="twqnav">${MOCK.qs.map((x, i) => `<button class="${i === MOCK.i ? "on" : ""} ${x.pick >= 0 ? "ans" : ""} ${x.flag ? "flag" : ""}" onclick="twMockGo(${i})">${i + 1}</button>`).join("")}</div>
      <p class="muted" style="margin:6px 0">${W2("Question","Pregunta")} ${MOCK.i + 1}/${MOCK.qs.length} · ${W2("no feedback until you submit, like the real exam","sin respuestas hasta enviar, como el examen real")}</p>
      <h2 style="font-size:18px">${E(T.L2(it.q))}</h2>
      <div class="cqopts">${q.order.map((x, k) => `<button class="btn ${q.pick === k ? "primary" : ""}" onclick="twMockPick(${k})">${"ABCDE"[k]}. ${E(opts[x])}</button>`).join("")}</div>
      <div class="cyn"><button class="btn ghost" onclick="twMockGo(${MOCK.i - 1})">← ${W2("Back","Atrás")}</button><button class="btn ghost" onclick="twMockFlag()">${q.flag ? "🚩" : "🏳️"} ${W2("Flag","Marcar")}</button><button class="btn" onclick="twMockGo(${MOCK.i + 1})">${W2("Next","Siguiente")} →</button></div>
      <button class="btn primary wide" onclick="twMockSubmit()">📤 ${W2("Submit exam","Enviar examen")}</button></section>`; }
  if (MOCK && MOCK.done) { const c = COURSES[MOCK.cid], P = pack(MOCK.cid), wrong = MOCK.qs.filter(q => !q.ok);
    return `<section class="panel raised twmockres"><div class="eyebrow">📤 ${E(L(c.short))} ${W2("mock exam results","resultados del simulacro")}</div>
      <div class="twbig">${MOCK.pct}%<small>${MOCK.right}/${MOCK.qs.length}</small></div>
      ${c.ap ? `<p class="twest">${W2("Rough AP score estimate","Estimación aproximada AP")}: <b>${apEst(MOCK.pct)}</b> <small>${W2("(multiple choice only; the real exam also has free-response questions)","(solo opción múltiple; el examen real también tiene preguntas abiertas)")}</small></p>` : `<p class="twest">${W2("Final exam readiness","Preparación para el examen final")}: <b>${MOCK.pct >= 80 ? W2("Ready","Listo") : MOCK.pct >= 60 ? W2("Close","Cerca") : W2("Keep practicing","Sigue practicando")}</b></p>`}
      ${P.units.filter(u => MOCK.by[u.id]).map(u => { const [r, n] = MOCK.by[u.id], p = Math.round(100 * r / n); return `<div class="twunit"><span>${E(unitName(u, S.lang === "es" ? "es" : "en"))}${c.w ? ` <small>(${c.w[u.id]}% ${W2("of exam","del examen")})</small>` : ""}</span>${bar(p / 100, p >= 70 ? "#3BB273" : p < 50 ? "#E5484D" : null)}<b>${r}/${n}</b></div>`; }).join("")}
      <button class="btn primary wide" onclick="twMockStart('${MOCK.cid}')">🔁 ${W2("Take another","Hacer otro")}</button></section>
      ${wrong.length ? `<section class="panel"><div class="eyebrow">📖 ${W2("Review your misses","Repasa tus errores")} · ${W2("added to Review","agregadas a Repaso")}</div>${wrong.map(q => `<div class="twmiss"><b>${E(T.L2(q.it.q))}</b><p>${q.pick >= 0 ? `❌ ${E(q.it.c[S.lang === "es" && q.it.c.es ? "es" : "en"][q.order[q.pick]])}<br>` : ""}✅ ${E(q.it.c[S.lang === "es" && q.it.c.es ? "es" : "en"][q.it.a])}</p><small>${E(T.L2(q.it.why || {en:""}))}</small></div>`).join("")}</section>` : ""}`; }
  const s = tw();
  return `<section class="panel raised"><div class="eyebrow">📝 ${W2("Mock Exam","Simulacro")}</div>
    <p>${W2(`${MOCK_N} questions, timed at real exam pace and weighted by how much of the exam each unit is. No answers shown until you submit. +5 Smithbucks once a day; 80%+ earns the honor medal.`, `${MOCK_N} preguntas al ritmo del examen real y ponderadas por unidad. Sin respuestas hasta enviar. +5 Smithbucks una vez al día; 80%+ gana la medalla.`)}</p></section>
    ${myCourses().map(cid => { const c = COURSES[cid], m = s.mock[cid];
      return `<section class="panel twmockpick"><div><b>${E(L(c.n))}</b><small>⏱️ ${Math.round(MOCK_N * c.per / 60)} ${W2("min","min")}${m ? ` · ${W2("best","mejor")} ${m.best}% · ${W2("last","último")} ${m.last}%` : ""}</small></div><button class="btn primary" onclick="twMockStart('${cid}')">▶ ${W2("Start","Empezar")}</button></section>`; }).join("")}`;
}

/* ---------------------------------------------------------------- 6. countdown and plan */
function weakest(cid, n){ const c = COURSES[cid], P = pack(cid), uw = c.w || Object.fromEntries(P.units.map(u => [u.id, 100 / P.units.length]));
  return LV.mastery().filter(m => m.info.pack === cid).map(m => ({m, score:(100 - (m.pct == null ? 40 : m.pct)) * (uw[m.info.unit] || 5) * (m.seen < 5 ? 1.2 : 1)})).sort((a, b) => b.score - a.score).slice(0, n).map(x => x.m); }
function planHtml(){
  const s = tw(), due = dueCards().length, d = s.days[day()] || {};
  return `<section class="panel raised twplan"><div class="eyebrow">🎯 ${W2("Today's exam mission","Misión de hoy")}</div>
      ${[["review", "🧠", due ? W2(`Review ${Math.min(8, due)} missed questions`, `Repasa ${Math.min(8, due)} preguntas falladas`) : W2("No missed questions due","Sin repasos pendientes"), "twReview()", !due || d.review],
         ["floor", "🏰", W2("Clear one tower floor","Supera un piso de la torre"), "twSub('tower')", d.floor],
         ["lab", "📊", W2("Solve a graph or case","Resuelve una gráfica o caso"), "twSub('lab')", d.lab],
         ["mock", "📝", W2("Take a mock exam","Haz un simulacro"), "twSub('mock')", d.mock]].map(([k, e, t, go, ok]) => `<button class="twmission ${ok ? "done" : ""}" onclick="${go}"><span>${ok ? "✅" : e}</span>${E(t)}</button>`).join("")}
      <p class="muted" style="font-size:12px">${W2("Finish all four for a +5 Smithbucks study bonus.","Termina las cuatro para un bono de +5 Smithbucks.")}</p></section>
    ${myCourses().map(cid => { const c = COURSES[cid], at = examAt(cid), dd = daysTo(at), w = weakest(cid, 3), m = s.mock[cid];
      return `<section class="panel twcount"><div class="twdays">${dd != null ? `<b>${Math.max(0, dd)}</b><small>${W2("days","días")}</small>` : `<b>?</b><small>${W2("date TBA","fecha pendiente")}</small>`}</div>
        <div class="twcd"><b>${E(L(c.examName))}</b><small>${at ? at.toLocaleDateString(S.lang === "es" ? "es" : "en-US", {weekday:"long", month:"long", day:"numeric", year:"numeric"}) + (c.exam ? (cid === "ap-gov" ? " · 8 AM" : " · 12 PM") : "") : W2("Coach Smith will set the date.","Coach Smith pondrá la fecha.")}</small>
        <small>🏰 ${W2("Tower","Torre")} ${s.best[cid] | 0}/${pack(cid).units.length} · 📝 ${m ? W2(`mock best ${m.best}%`, `mejor simulacro ${m.best}%`) : W2("no mock yet","sin simulacro")}</small>
        ${w.length ? `<div class="twweak">${W2("Focus next","Enfócate en")}: ${w.map(x => `<button class="btn ghost" onclick="lvPractice('${x.info.key}')">${E(T.L2(x.info.topic))} <small>${x.pct == null ? W2("new","nuevo") : x.pct + "%"}</small></button>`).join("")}</div>` : ""}</div></section>`; }).join("")}`;
}
function markDay(k){ const s = tw(), d = day(); s.days = {[d]:{...(s.days[d] || {}), [k]:1}}; const x = s.days[d];
  if ((x.review || !dueCards().length) && x.floor && x.lab && x.mock) T.once("tw:mission:" + d, () => { T.coins(5); setTimeout(() => T.toast(W2("🎯 Exam mission complete! +5 Smithbucks","🎯 ¡Misión completa! +5 Smithbucks")), 400); }); }

/* ---------------------------------------------------------------- the 🎓 Exam tab */
let TSUB = "tower";
const TSUBS = [["tower","🏰",["Tower","Torre"]],["lab","📊",["Lab","Lab"]],["review","🧠",["Review","Repaso"]],["mock","📝",["Mock exam","Simulacro"]],["plan","🎯",["Plan","Plan"]]];
window.twSub = k => { closeSheet(); TSUB = k; paint(); const n = document.querySelector(".twnav"); if (n && n.getBoundingClientRect().top < 0) n.scrollIntoView({block:"start"}); };
window.twOpen = k => { if (k) TSUB = k; if (typeof go === "function" && !T.isTown()) go("town"); setTimeout(() => { townTab("exam"); setTimeout(() => { const n = document.querySelector(".twnav"); if (n) n.scrollIntoView({behavior:"smooth", block:"start"}); }, 60); }, T.isTown() ? 0 : 350); };
function view(html){ const el = document.getElementById("twBody"); if (el) el.innerHTML = html; }
function paint(){ if (T.isTown() && T.tt === "exam") T.paintSub(); }
function reviewHtml(){ const s = tw(), due = dueCards(), all = Object.keys(s.rev).length, boxes = [1, 2, 3, 4, 5].map(b => Object.values(s.rev).filter(r => r.b === b).length);
  return `<section class="panel raised"><div class="eyebrow">🧠 ${W2("Spaced review","Repaso espaciado")}</div>
    <p>${W2("Every question you miss in town, the tower or a mock exam comes back: after 10 minutes, then 1, 3, 7 and 14 days. Get it right 5 times and it graduates.","Cada pregunta que fallas vuelve: a los 10 minutos y luego a 1, 3, 7 y 14 días. Acierta 5 veces y se gradúa.")}</p>
    <div class="twboxes">${boxes.map((n, i) => `<div><b>${n}</b><small>${["10 min","1 d","3 d","7 d","14 d"][i]}</small></div>`).join("")}<div class="grad"><b>${s.grad}</b><small>🎓</small></div></div>
    <button class="btn primary wide" ${due.length ? "" : "disabled"} onclick="twReview()">🧠 ${due.length ? W2(`Review ${Math.min(8, due.length)} now (${due.length} due)`, `Repasar ${Math.min(8, due.length)} ahora (${due.length} pendientes)`) : W2(`Nothing due · ${all} waiting`, `Nada pendiente · ${all} en espera`)}</button></section>`; }
function paintExam(el){
  if (!SESS()) { el.innerHTML = ""; return; }
  T.viewSub(V.NET().watchPub(rows => { if (rows) rows.forEach(p => T.pub[p.id] = p); }));
  const due = dueCards().length, r = run();
  const nav = `<div class="lvnav twnav">${TSUBS.map(([k, e, l]) => `<button class="${TSUB === k ? "on" : ""}" onclick="twSub('${k}')">${e}<span>${L(l)}</span>${k === "review" && due ? `<i>${due}</i>` : k === "tower" && r ? `<i>!</i>` : ""}</button>`).join("")}</div>`;
  const body = TSUB === "tower" ? (r ? battleHtml() : towerHome()) : TSUB === "lab" ? labHtml() : TSUB === "review" ? reviewHtml() : TSUB === "mock" ? mockHtml() : planHtml();
  el.innerHTML = nav + `<div id="twBody">${body}</div>`;
  if (TSUB === "tower" && r && r.q && r.q.kind === "graph") { const gr = GRAPHS[r.q.gi]; animateGraph("tw", gr, r.q.done ? {c:gr.c, d:gr.d} : r.q.step === 2 ? {c:r.q.pick.c, d:r.q.pick.d} : null); }
  if (TSUB === "lab") afterLab();
  if (TSUB === "mock" && MOCK && !MOCK.done) mockTick();
  flushFx();
}
/* the world map gets a door to the tower */
if (window.WORLD2 && window.WORLD2.MORE) { const W = window.WORLD2; W.MORE.places.push({k:"tower", e:"🏰", l:["Exam Tower","Torre del Examen"], d:["Climb a floor per unit, loot chests","Sube un piso por unidad, abre cofres"]});
  W.MORE.views.tower = el => { el.innerHTML = `<section class="panel raised" style="text-align:center"><div style="font-size:64px">🏰</div><h2>${W2("The Exam Tower","La Torre del Examen")}</h2><button class="btn primary wide" onclick="twOpen('tower')">${W2("Enter","Entrar")}</button></section>`; }; }
EXT.tabs.push({key:"exam", icon:"🎓", label:() => W2("Exam","Examen"), paint:el => paintExam(el)});

/* ---------------------------------------------------------------- to-do, pub, teacher */
if (window.TODAY) { const base = window.TODAY.items; window.TODAY.items = function(){ const out = base(); if (!SESS()) return out; const n = dueCards().length, d = tw().days[day()] || {};
  if (n) out.push({k:"review", e:"🧠", learn:true, t:W2(`Review ${Math.min(8, n)} missed questions`, `Repasa ${Math.min(8, n)} preguntas falladas`), sub:W2("They come back until you know them","Vuelven hasta que las sepas"), done:false, opt:true, go:"twFromTodo('review')"});
  out.push({k:"tower", e:"🏰", learn:true, t:W2("Exam Tower: clear a floor","Torre: supera un piso"), sub:W2("Chests drop tower-only items","Los cofres dan objetos exclusivos"), done:!!d.floor, opt:true, go:"twFromTodo('tower')"});
  return out; }; }
window.twFromTodo = k => { closeSheet(); twOpen(k); };
EXT.pubExtra.push(() => { const s = tw(); return {exam:{tower:s.best, mock:Object.fromEntries(Object.entries(s.mock).map(([k, m]) => [k, {best:m.best, last:m.last, n:m.n}])), due:dueCards().length, grad:s.grad, lab:s.lab.right, cases:Object.keys(s.cases.right).length}}; });
EXT.adminPanels.push({
  html: c => `<section class="panel tadm"><div class="eyebrow">🎓 ${W2("Exam prep","Preparación para exámenes")}</div>
    <p class="muted" style="font-size:13px">${W2("AP Gov exam: Tue May 4, 2027, 8 AM. AP Macro exam: Fri May 7, 2027, 12 PM. Set your course final exam date for the honors courses so students see a countdown.","Examen AP de Gobierno: martes 4 de mayo de 2027, 8 AM. AP Macro: viernes 7 de mayo de 2027, 12 PM. Fija la fecha del examen final para los cursos honors.")}</p>
    <label class="cform">📅 ${W2("Course final exam (CFE) date","Fecha del examen final (CFE)")}<input type="date" value="${E(c.cfeDate || "")}" onchange="townSet('cfeDate', this.value || null)"></label><div id="aExam"></div></section>`,
  after: c => { store().list(`classes/${c.id}/pub`).then(rows => { const box = document.getElementById("aExam"); if (!box) return;
    const list = (rows || []).filter(p => p.exam).sort((a, b) => String(a.name).localeCompare(b.name));
    box.innerHTML = list.length ? `<table class="lvtab"><tr><th>${W2("Student","Alumno")}</th><th>🏰 ${W2("Floors","Pisos")}</th><th>📝 ${W2("Mock best / last","Simulacro mejor / último")}</th><th>🧠 ${W2("Due","Pend.")}</th><th>📊/🗂️</th></tr>
      ${list.map(p => { const e = p.exam; return `<tr><td>${E(p.name)}</td><td>${Object.entries(e.tower || {}).map(([k, v]) => `${COURSES[k] ? COURSES[k].short[0] : k} ${v}`).join(" · ") || "—"}</td>
        <td>${Object.entries(e.mock || {}).map(([k, m]) => `<span class="${m.best < 60 ? "lvbad" : m.best >= 80 ? "lvgood" : ""}">${COURSES[k] ? COURSES[k].short[0] : k} ${m.best}% / ${m.last}%</span>`).join("<br>") || "—"}</td><td>${e.due | 0}</td><td>${e.lab | 0} / ${e.cases | 0}</td></tr>`; }).join("")}</table>`
      : `<p class="muted" style="font-size:13px">${W2("No exam prep yet. It fills in as students climb the tower and take mock exams.","Aún no hay datos. Se llena cuando suben la torre y hacen simulacros.")}</p>`; }).catch(() => {}); }
});
const store = () => V.store();
EXT.onSession.push(() => { BYID = null; });

window.TOWER = {mock:() => MOCK, COURSES, GRAPHS, CASES, tw, dueCards, startRun, mockPick, yEffect, apEst, examAt};
})();
