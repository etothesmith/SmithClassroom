/* =============================================================================
   GRENADIER TOWN — Live (town/live.js): reasons to show up, in class and out.
   Loads after town/ambient.js. A new 🔥 Live tab holds everything:

   1. Period Raid: during class (Mon–Fri, 7:00–1:30) the whole class fights a
      daily boss (the Inflation Monster, the Gridlock Golem…). Every right
      answer anywhere in the app hits it (focus-standard answers hit twice).
      Beat it together and everyone who helped gets paid. The boss sleeps
      outside class, so the best time to play is during the period.
   2. Quiz Duels: challenge a classmate to the same 5 questions. Win, tie or
      lose, everyone earns something; a rivalry record keeps score.
   3. Town Feud: a weekly two-sided debate tied to a standard (raise the
      town's minimum wage? term limits for mayor?). Pick a side, fight for it
      with questions, write a one-sentence argument using the unit's vocabulary
      and vote for classmates' best arguments. The winning side's idea passes.
   4. Mystery: a weekly heist. Answer questions to unlock clues, deduce which
      of four suspects did it and accuse (one try).
   5. Crew: high-fives between classmates and star reviews of town workers.
   6. Résumé power: daily work (finishing every daily job, shifts, raids,
      reviews, mysteries, feud arguments) earns recommendation letters, and a
      "Jobs that fit you" list matches careers to the standards you've
      mastered. Letters and the match go on job applications.
   7. Standards Passport: mastery for every Florida / AP standard in your
      courses (from class practice and town questions), with practice buttons.
      Coach Smith sees class mastery by standard and sets a focus standard.
   Firestore: classes/{cid}/raid, duels, feud, feudvotes, kudos, reviews, heist.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T || !T.CIV) return;
const {EXT} = T, V = T.CIV;
const {civ, sheet, closeSheet, cleanText, day, week, hashN, E, W2, C, store, SESS, CLS, bar} = V;
const me = () => SESS() && SESS().sid;
const L = a => (S.lang === "es" ? a[1] : a[0]);
const STDS = () => window.STD;
const W = () => window.WORLD2;
const buzz = ms => { try { if (navigator.vibrate) navigator.vibrate(ms); } catch(e){} };
const confetti = () => { if (typeof fireConfetti === "function") fireConfetti(); };

/* ---------------------------------------------------------------- state */
function lv(){ const c = civ(); const s = c.live = c.live || {};
  s.raid = s.raid || {}; s.duel = s.duel || {w:0, l:0, t:0, vs:{}, sent:{}}; s.letters = s.letters || [];
  s.todoDays = s.todoDays || []; s.std = s.std || {}; s.heist = s.heist || {}; s.feud = s.feud || {}; s.kudos = s.kudos || {sent:{}, seen:0};
  s.raidDays = s.raidDays || []; s.rev = s.rev || {}; return s; }

/* ---------------------------------------------------------------- the class period */
const PERIOD = {from:7 * 60, to:13 * 60 + 30};       /* Colonial's morning schedule */
function inPeriod(){ const c = CLS(); if (c.raidOff) return false; if (c.liveAlways) return true;
  const d = new Date(), m = d.getHours() * 60 + d.getMinutes(), wd = d.getDay(); return wd >= 1 && wd <= 5 && m >= PERIOD.from && m < PERIOD.to; }
const focusStd = () => CLS().focusStd || null;

/* ---------------------------------------------------------------- questions */
function myPacks(){ const all = typeof allPacks === "function" ? allPacks() : []; const mine = (S.myCourses || []);
  const m = all.filter(p => mine.includes(p.id)); return m.length ? m : all; }
let BYID = null;
function byId(id){ if (!BYID) { BYID = {}; (typeof allPacks === "function" ? allPacks() : []).forEach(p => p.units.forEach(u => u.items.forEach(it => { BYID[it.id] = it; }))); } return BYID[id]; }
const usable = it => it && it.type === "mcq" && it.c && it.c.en && it.c.en.length >= 3;
function pickItems(n, o){ o = o || {};
  let pool = []; (o.all ? (typeof allPacks === "function" ? allPacks() : []) : myPacks()).forEach(p => p.units.forEach(u => u.items.forEach(it => { if (usable(it)) pool.push(it); })));
  if (o.std) { const f = pool.filter(it => it.std === o.std); if (f.length >= Math.min(n, 3)) pool = f; }
  if (o.subj) { const ids = {econ:["ap-econ","econ-h"], gov:["us-gov","ap-gov"]}[o.subj]; const f = pool.filter(it => ids && ids.some(pid => (it.std || "").startsWith(packPrefix(pid)))); if (f.length >= n) pool = f; }
  const out = [], seen = new Set(); for (let i = 0; i < 200 && out.length < n && pool.length; i++) { const it = pool[Math.floor(Math.random() * pool.length)]; if (!seen.has(it.id)) { seen.add(it.id); out.push(it); } }
  return out; }
function packPrefix(pid){ return {"ap-econ":"ap-m", "econ-h":"eh-", "us-gov":"gov-", "ap-gov":"apg-"}[pid] || pid; }

/* one question at a time on the sheet; cb(right, ms) */
function qRun(o, cb){
  const items = o.items.filter(usable); if (!items.length) { T.toast(W2("No questions found.","No hay preguntas.")); return cb(0, 0); }
  const run = {i:0, right:0, t0:Date.now()};
  const step = () => {
    if (run.i >= items.length) { window._lvq = null; return cb(run.right, Date.now() - run.t0); }
    const q = items[run.i++], lang = S.lang === "es" && q.c.es ? "es" : "en", opts = q.c[lang], order = [...opts.keys()].sort(() => Math.random() - 0.5);
    window._lvq = {q, order, done:false, run, step, o};
    sheet(`<div class="eyebrow">${o.e || "❓"} ${E(o.title || "")}</div>
      <div class="wsub">${o.sub ? o.sub + " · " : ""}${W2("Question","Pregunta")} ${run.i}/${items.length} · ✔ ${run.right}</div>
      ${o.timer ? `<div class="wtimer"><i id="lvt" style="animation-duration:${o.timer}s"></i></div>` : ""}
      <h2 style="font-size:19px">${E(T.L2(q.q))}</h2><div class="cqopts">${order.map((x, k) => `<button class="btn" onclick="lvAns(${k})">${E(opts[x])}</button>`).join("")}</div>
      <p id="lvWhy" class="lvwhy"></p>`);
    if (o.timer) window._lvq.tm = setTimeout(() => lvAns(-1), o.timer * 1000);
  };
  step();
}
window.lvAns = function(k){
  const z = window._lvq; if (!z || z.done) return; z.done = true; clearTimeout(z.tm);
  const ok = k >= 0 && z.order[k] === z.q.a; if (ok) z.run.right++;
  document.querySelectorAll(".cqopts button").forEach((b, i) => { b.disabled = true; if (z.order[i] === z.q.a) b.classList.add("primary"); else if (i === k) b.classList.add("lvwrong"); });
  onAnswer(z.q, ok, "town");
  const why = document.getElementById("lvWhy");
  if (why) why.innerHTML = `<b>${ok ? "✅ " + W2("Right!","¡Correcto!") : k < 0 ? "⏰ " + W2("Time!","¡Tiempo!") : "❌ " + W2("Not quite.","Casi.")}</b> ${E(T.L2(z.q.why || {en:"", es:""}))}
    <button class="btn primary wide" style="margin-top:8px" onclick="lvNext()">${W2("Next","Siguiente")} →</button>`;
};
window.lvNext = () => { const z = window._lvq; if (z) z.step(); };

/* every right/wrong answer in town flows through here */
function onAnswer(q, ok, src){
  if (!q || !SESS()) return; const s = lv(), k = q.std || (STDS() && STDS().stdOf(q)) || "x";
  const r = s.std[k] = s.std[k] || [0, 0]; r[0]++; if (ok) r[1]++;
  buzz(ok ? 25 : [40, 40, 40]);
  if (ok && inPeriod()) raidHit(k === focusStd() ? 2 : 1);
  (window.LIVE_HOOKS || []).forEach(f => { try { f(q, ok, src); } catch(e){} });
  T.persist();
}
/* the world map's questions (WORLD2 ask) count too */
if (typeof window.w2Ans === "function") { const base = window.w2Ans;
  window.w2Ans = function(k){ const st = window._w2q, open = st && !st.done; const r = base.apply(this, arguments);
    if (open && st.done) { try { onAnswer(st.q, k >= 0 && st.order[k] === st.q.a, "w2"); } catch(e){} } return r; }; }

/* ---------------------------------------------------------------- 7. standards mastery */
function mastery(){
  const L2 = STDS() ? STDS().stdList(myPacks().map(p => p.id)) : {}, s = lv(), out = [];
  Object.values(L2).forEach(({info, items}) => {
    let seen = 0, right = 0; items.forEach(it => { const p = S.prog && S.prog[it.id]; if (p && p.seen) { seen++; if (p.right) right++; } });
    const t = s.std[info.key] || [0, 0]; seen += t[0]; right += t[1];
    out.push({info, n:items.length, seen, right, pct:seen ? Math.round(100 * right / seen) : null, done:seen >= 5 && right / seen >= 0.8});
  });
  return out;
}
const mastered = () => mastery().filter(m => m.done).length;
function subjPct(subj){ const ms = mastery().filter(m => m.seen >= 3 && (!subj || subjOf(m.info) === subj)); if (!ms.length) return null;
  return Math.round(ms.reduce((a, m) => a + m.pct, 0) / ms.length); }
const subjOf = info => /^(ap-econ|econ-h)$/.test(info.pack) ? "econ" : /^(us-gov|ap-gov)$/.test(info.pack) ? "gov" : "other";

/* ---------------------------------------------------------------- 1. the period raid */
const BOSSES = [
  {e:"👾", n:["The Inflation Monster","El Monstruo de la Inflación"], l:["It eats the value of every Smithbuck in town!","¡Se come el valor de cada Smithbuck del pueblo!"]},
  {e:"🗿", n:["The Gridlock Golem","El Gólem del Estancamiento"], l:["It jams every bill in Congress. Knowledge unjams it.","Atasca cada ley en el Congreso. El conocimiento lo destraba."]},
  {e:"🐙", n:["The Recession Kraken","El Kraken de la Recesión"], l:["It's dragging real GDP under the lake!","¡Está hundiendo el PIB real en el lago!"]},
  {e:"🐉", n:["The Misinformation Hydra","La Hidra de la Desinformación"], l:["Cut one fake headline and two grow back. Facts beat it.","Cortas un titular falso y salen dos. Los datos la vencen."]},
  {e:"🦖", n:["The Debt-o-saurus","El Deudosaurio"], l:["It grows every time someone pays only the minimum.","Crece cada vez que alguien paga solo el mínimo."]},
  {e:"🧟", n:["The Apathy Zombie","El Zombi de la Apatía"], l:["It convinces people their vote doesn't matter.","Convence a la gente de que su voto no importa."]},
  {e:"🌪️", n:["The Tariff Twister","El Tornado Arancelario"], l:["It's spinning up prices at the port!","¡Está disparando los precios en el puerto!"]}
];
const CK = cid => "classes/" + (cid || (SESS() && SESS().cid) || T.adminCid || "");
const boss = cid => BOSSES[hashN(day() + ":boss:" + CK(cid)) % BOSSES.length];
let RAID = [];                                        /* today's hit docs for the class */
let ROSTER = 0;                                       /* students in the class (from the pub list) */
const classSize = () => Math.max(6, ROSTER, Object.keys(T.pub || {}).length || 0);
const raidHP = () => Math.min(400, 24 + classSize() * 8);
const raidDmg = () => RAID.reduce((a, r) => a + (r.n | 0), 0);
let raidTimer = null;
function raidHit(n){
  const s = lv(), d = day(); s.raid[d] = (s.raid[d] | 0) + n; Object.keys(s.raid).forEach(k => { if (k !== d) delete s.raid[k]; });
  if (!s.raidDays.includes(d)) { s.raidDays.push(d); s.raidDays = s.raidDays.slice(-60); }
  clearTimeout(raidTimer); raidTimer = setTimeout(raidPush, 1500);
}
async function raidPush(){ if (!SESS()) return; const d = day(), n = Math.min(200, lv().raid[d] | 0);
  try { await store().set(`${C()}/raid/${d}_${me()}`, {day:d, sid:me(), name:SESS().name, n, at:Date.now()}); } catch(e){} }
function raidSettle(){
  if (!SESS() || raidDmg() < raidHP()) return; const mine = lv().raid[day()] | 0; if (mine < 3) return;
  if (T.once("raid:" + day(), () => { T.coins(5); lv().raidWins = (lv().raidWins | 0) + 1; })) {
    T.persist(); confetti(); buzz([60, 40, 120]);
    T.toast(W2(`💥 The class beat ${boss().n[0]}! +5 Smithbucks for helping.`, `💥 ¡La clase venció a ${boss().n[1]}! +5 Smithbucks por ayudar.`)); }
}
/* class-work answers count too: right answers in your courses while class is in session */
function rightToday(){ const d = typeof today === "function" ? today() : ""; let n = 0; Object.values(S.prog || {}).forEach(p => { if (p && p.last === d && p.right) n++; }); return n; }
function classworkTick(){ if (!SESS()) return; const s = lv(), d = day(), r = rightToday();
  if (s.cwDay !== d) { s.cwDay = d; s.cwBase = r; return; }
  if (r > (s.cwBase | 0)) { const add = r - s.cwBase; s.cwBase = r; if (inPeriod()) { raidHit(add); T.toast(W2(`⚔️ Your class work hit the boss ×${add}!`, `⚔️ ¡Tu tarea golpeó al jefe ×${add}!`)); } T.persist(); } }
window.lvRaid = function(){
  const b = boss(), hp = raidHP(), dmg = Math.min(hp, raidDmg()), mine = lv().raid[day()] | 0;
  const top = RAID.slice().sort((a, b2) => (b2.n | 0) - (a.n | 0)).slice(0, 5);
  if (!inPeriod()) return sheet(`<div class="lvboss sleep"><span>${b.e}</span><b>💤 ${L(b.n)}</b></div>
    <p>${W2("The boss is asleep. Period Raids open during class: Monday to Friday, 7:00 AM to 1:30 PM.","El jefe está dormido. Las incursiones abren durante clase: lunes a viernes, 7:00 a. m. a 1:30 p. m.")}</p>
    <p class="muted">${W2("Every right answer in class, in your courses or in town, hits the boss. Focus-standard answers hit twice.","Cada respuesta correcta en clase, en tus cursos o en el pueblo, golpea al jefe. Las del estándar de enfoque golpean doble.")}</p>
    <button class="btn wide" onclick="townCloseCard()">${W2("OK","OK")}</button>`);
  if (dmg >= hp) return sheet(`<div class="lvboss down"><span>${b.e}</span><b>💥 ${W2("Defeated!","¡Vencido!")}</b></div>
    <p>${W2(`The class beat ${b.n[0]} today. You hit it ${mine} times.`, `La clase venció a ${b.n[1]} hoy. Lo golpeaste ${mine} veces.`)}</p>${topHtml(top)}<button class="btn wide" onclick="townCloseCard()">OK</button>`);
  const f = focusStd(), fi = f && STDS() ? STDS().stdInfo(f) : null;
  sheet(`<div class="lvboss"><span>${b.e}</span><b>${L(b.n)}</b><small>${L(b.l)}</small></div>
    ${bar(1 - dmg / hp, "#E5484D")}<p class="muted" style="text-align:center;margin:4px 0">❤️ ${hp - dmg}/${hp} · ${W2(`Your hits today: ${mine}`, `Tus golpes hoy: ${mine}`)}</p>
    ${fi ? `<p class="lvfocus">🎯 ${W2("Focus standard (double damage)","Estándar de enfoque (doble daño)")}: <b>${E(fi.code)}</b> · ${E(T.L2(fi.topic))}</p>` : ""}
    <button class="btn primary wide" onclick="lvAttack()">⚔️ ${W2("Attack: 5 questions","Atacar: 5 preguntas")}</button>
    ${topHtml(top)}<button class="btn ghost wide" onclick="townCloseCard()">${W2("Later","Luego")}</button>`);
};
const topHtml = top => top.length ? `<div class="lvtop">${top.map((r, i) => `<span>${["🥇","🥈","🥉","4.","5."][i]} ${E(r.name)} <b>${r.n | 0}</b></span>`).join("")}</div>` : "";
window.lvAttack = function(){
  const f = focusStd(), half = f ? pickItems(3, {std:f, all:true}) : [], rest = pickItems(5 - half.length);
  qRun({title:L(boss().n), e:boss().e, sub:W2("Period Raid","Incursión"), items:half.concat(rest)}, right => {
    W() && W().bumpNeed("fun", 6); T.persist(); raidPush().then(() => setTimeout(raidSettle, 600));
    T.toast(W2(`⚔️ ${right} hit${right === 1 ? "" : "s"} on the boss!`, `⚔️ ¡${right} golpe(s) al jefe!`)); lvRaid(); });
};
/* the boss on the plaza */
EXT.plazaFront.push(cx => { if (!SESS() || CLS().raidOff) return; const b = boss(), hp = raidHP(), dmg = Math.min(hp, raidDmg()), on = inPeriod(), t = performance.now() / 700, x = 910, y = 92;
  cx.save(); cx.textAlign = "center"; cx.globalAlpha = on ? 1 : 0.55;
  cx.font = `${on ? 54 : 44}px sans-serif`; cx.fillText(dmg >= hp ? "💥" : b.e, x, y + (on ? Math.sin(t) * 5 : 0));
  if (!on) { cx.font = "18px sans-serif"; cx.fillText("💤", x + 30, y - 40 + Math.sin(t) * 3); }
  cx.fillStyle = "rgba(20,18,40,.75)"; T.rr(cx, x - 46, y + 10, 92, 10, 5); cx.fill();
  cx.fillStyle = dmg >= hp ? "#3BB273" : "#E5484D"; T.rr(cx, x - 44, y + 12, 88 * (dmg >= hp ? 1 : 1 - dmg / hp), 6, 3); cx.fill();
  cx.font = "800 11px 'Nunito', sans-serif"; cx.fillStyle = "#fff"; cx.strokeStyle = "rgba(0,0,0,.6)"; cx.lineWidth = 3;
  const lab = on ? (dmg >= hp ? W2("Defeated!","¡Vencido!") : W2("LIVE RAID","INCURSIÓN")) : W2("Raid at class time","Incursión en clase");
  cx.strokeText(lab, x, y + 34); cx.fillText(lab, x, y + 34); cx.restore(); });
EXT.plazaTap.push((x, y) => { if (!SESS() || CLS().raidOff || Math.abs(x - 910) > 45 || y < 40 || y > 135) return false; lvRaid(); return true; });

/* ---------------------------------------------------------------- 2. duels */
let DUEL_IN = [], DUEL_OUT = [];
const DUEL_DAY = 5;
function classmates(){ return Object.values(T.pub || {}).filter(p => p && p.id && p.id !== me() && p.name).sort((a, b) => String(a.name).localeCompare(b.name)); }
window.lvDuelPick = function(){
  const s = lv(), sent = s.duel.sent[day()] | 0, open = new Set(DUEL_OUT.filter(d => d.status === "open").map(d => d.b));
  if (sent >= DUEL_DAY) return T.toast(W2(`You've sent ${DUEL_DAY} duels today. Come back tomorrow!`, `Ya enviaste ${DUEL_DAY} duelos hoy. ¡Vuelve mañana!`));
  const list = classmates();
  sheet(`<div class="eyebrow">⚔️ ${W2("Quiz Duel","Duelo de preguntas")}</div><h2>${W2("Who do you challenge?","¿A quién retas?")}</h2>
    <p class="muted" style="margin-top:0">${W2("You both get the same 5 questions. Win +3, tie +2, lose +1.","Ambos responden las mismas 5 preguntas. Ganar +3, empatar +2, perder +1.")}</p>
    <div class="lvppl">${list.map(p => `<button class="btn ${open.has(p.id) ? "ghost" : ""}" ${open.has(p.id) ? "disabled" : ""} onclick="lvDuelGo('${p.id}')">${E(p.name)}${open.has(p.id) ? " ⏳" : ""}${rivalTag(p.id)}</button>`).join("")
      || `<p class="muted">${W2("Nobody else has joined the town yet.","Nadie más se ha unido al pueblo.")}</p>`}</div>
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
const rivalTag = sid => { const r = lv().duel.vs[sid]; return r ? ` <small>${r[0]}–${r[1]}</small>` : ""; };
window.lvDuelGo = function(sid){
  const p = T.pub[sid]; if (!p) return; const items = pickItems(5); if (items.length < 5) return T.toast(W2("Not enough questions.","No hay suficientes preguntas."));
  qRun({title:W2(`Duel vs ${p.name}`, `Duelo vs ${p.name}`), e:"⚔️", items}, async (right, ms) => {
    const s = lv(); s.duel.sent[day()] = (s.duel.sent[day()] | 0) + 1; Object.keys(s.duel.sent).forEach(k => { if (k !== day()) delete s.duel.sent[k]; }); T.persist();
    try { await store().add(`${C()}/duels`, {a:me(), aName:SESS().name, b:sid, bName:p.name, qs:items.map(i => i.id), aS:right, aT:Math.round(ms / 1000), bS:-1, bT:0, day:day(), at:Date.now(), status:"open"}); } catch(e){}
    W() && W().bumpNeed("social", 6);
    sheet(`<div class="eyebrow">⚔️ ${W2("Challenge sent!","¡Reto enviado!")}</div><h2>${right}/5</h2>
      <p>${W2(`${p.name} will get the same 5 questions. You'll see the result in your Live inbox.`, `${p.name} recibirá las mismas 5 preguntas. Verás el resultado en tu buzón.`)}</p>
      <button class="btn primary wide" onclick="townCloseCard();lvOpen('duels')">${W2("OK","OK")}</button>`);
  });
};
window.lvDuelAccept = function(id){
  const d = DUEL_IN.find(x => x.id === id); if (!d || d.status !== "open") return;
  const items = d.qs.map(byId).filter(Boolean); if (!items.length) return;
  qRun({title:W2(`Duel vs ${d.aName}`, `Duelo vs ${d.aName}`), e:"⚔️", items}, async (right, ms) => {
    try { await store().update(`${C()}/duels/${id}`, {bS:right, bT:Math.round(ms / 1000), status:"done"}); } catch(e){}
    duelSettle({...d, bS:right, bT:Math.round(ms / 1000), status:"done"}, true);
  });
};
function duelSettle(d, show){
  if (d.status !== "done" || d.aS < 0 || d.bS < 0) return; const amA = d.a === me(), mine = amA ? d.aS : d.bS, theirs = amA ? d.bS : d.aS, other = amA ? d.b : d.a, oname = amA ? d.bName : d.aName;
  const res = mine > theirs ? "w" : mine < theirs ? "l" : "t";
  T.once("duel:" + d.id, () => { const s = lv(), r = s.duel.vs[other] = s.duel.vs[other] || [0, 0, 0];
    if (res === "w") { s.duel.w++; r[0]++; T.coins(3); } else if (res === "l") { s.duel.l++; r[1]++; T.coins(1); } else { s.duel.t++; r[2]++; T.coins(2); }
    T.persist();
    T.toast(res === "w" ? W2(`⚔️ You beat ${oname} ${mine}–${theirs}! +3`, `⚔️ ¡Le ganaste a ${oname} ${mine}–${theirs}! +3`) : res === "l" ? W2(`⚔️ ${oname} won ${theirs}–${mine}. +1 for playing. Rematch?`, `⚔️ ${oname} ganó ${theirs}–${mine}. +1 por jugar. ¿Revancha?`) : W2(`⚔️ Tie with ${oname}, ${mine}–${theirs}! +2`, `⚔️ ¡Empate con ${oname}, ${mine}–${theirs}! +2`));
    if (res === "w") confetti(); });
  if (show) sheet(`<div class="eyebrow">⚔️ ${W2("Duel result","Resultado")}</div><h2>${res === "w" ? "🏆 " + W2("You win!","¡Ganaste!") : res === "l" ? W2(`${oname} wins`, `Gana ${oname}`) : W2("Tie!","¡Empate!")}</h2>
    <p class="lvscore"><b>${E(SESS().name)}</b> ${mine} – ${theirs} <b>${E(oname)}</b></p>
    <button class="btn primary wide" onclick="lvDuelGo('${other}')">🔁 ${W2("Rematch","Revancha")}</button><button class="btn ghost wide" onclick="townCloseCard();T_lvPaint()">OK</button>`);
}
function rival(){ const vs = lv().duel.vs; let best = null; Object.entries(vs).forEach(([sid, r]) => { const n = r[0] + r[1] + r[2]; if (!best || n > best.n) best = {sid, n, r}; }); return best; }

/* ---------------------------------------------------------------- 3. town feud */
const FEUDS = [
  {std:"eh-u1.markets", e:"💵", q:["Should Grenadier Town raise its minimum wage to $20 an hour?","¿Debe Grenadier Town subir su salario mínimo a $20 la hora?"],
   s:[["Yes, raise it","Sí, subirlo"],["No, keep it","No, mantenerlo"]], kw:[["living wage","poverty","spending","demand","ingreso"],["surplus","unemployment","price floor","costs","excedente","desempleo"]],
   both:["Supporters say higher pay lifts families and boosts spending. Opponents say a price floor above equilibrium can cause a surplus of workers (unemployment) and higher prices.","Quienes apoyan dicen que sube el ingreso y el gasto. Quienes se oponen dicen que un precio mínimo sobre el equilibrio puede causar excedente de trabajadores (desempleo) y precios más altos."]},
  {std:"ap-m4.monpol", e:"🏦", q:["Prices are up 6%. Should the Town Bank raise interest rates?","Los precios subieron 6%. ¿Debe el Banco del Pueblo subir las tasas?"],
   s:[["Raise rates now","Subir tasas ya"],["Wait and see","Esperar"]], kw:[["inflation","demand","borrowing","inflación","demanda"],["unemployment","recession","investment","desempleo","recesión"]],
   both:["Raising rates cools borrowing and fights inflation, but can slow growth and cost jobs. Waiting protects jobs, but inflation may stick.","Subir tasas enfría el crédito y frena la inflación, pero puede frenar el crecimiento. Esperar protege empleos, pero la inflación puede quedarse."]},
  {std:"eh-u3.barriers", e:"🚢", q:["Should the town put a tariff on imported phones to protect the new phone factory?","¿Debe el pueblo poner un arancel a teléfonos importados para proteger la nueva fábrica?"],
   s:[["Yes, protect local jobs","Sí, proteger empleos locales"],["No, keep trade free","No, comercio libre"]], kw:[["jobs","infant industry","domestic","empleos"],["prices","consumers","retaliation","comparative advantage","precios","consumidores"]],
   both:["A tariff can protect a young local industry and its jobs. It also raises prices for buyers and can lead other places to retaliate.","Un arancel protege a una industria joven y sus empleos. También sube los precios y puede provocar represalias."]},
  {std:"eh-u2.policy", e:"🏟️", q:["Should the town borrow money to build a new stadium?","¿Debe el pueblo pedir prestado para construir un estadio?"],
   s:[["Build it","Construirlo"],["Don't borrow","No pedir prestado"]], kw:[["jobs","multiplier","spending","tourism","empleos"],["debt","deficit","opportunity cost","taxes","deuda","déficit"]],
   both:["Supporters point to construction jobs and visitors. Critics point to the debt, interest and the opportunity cost of what else the money could fund.","Quienes apoyan hablan de empleos y visitantes. Los críticos hablan de la deuda, los intereses y el costo de oportunidad."]},
  {std:"gov-u4.elections", e:"🗳️", q:["Should 16-year-olds be allowed to vote in town elections?","¿Deben votar los jóvenes de 16 años en las elecciones del pueblo?"],
   s:[["Yes, lower it","Sí, bajarla"],["No, keep 18","No, mantener 18"]], kw:[["participation","taxes","habit","participación"],["26th amendment","maturity","consistency","enmienda"]],
   both:["Supporters say 16-year-olds work, pay taxes and build a voting habit. Opponents point to the 26th Amendment's 18 and say adult responsibilities should come first.","Quienes apoyan dicen que trabajan, pagan impuestos y forman el hábito. Quienes se oponen citan la 26.ª Enmienda y la mayoría de edad."]},
  {std:"apg-u2.president", e:"⏳", q:["Should the mayor be limited to two terms?","¿Debe el alcalde tener un límite de dos periodos?"],
   s:[["Yes, term limits","Sí, límites"],["No, let voters decide","No, que decidan los votantes"]], kw:[["22nd amendment","power","new ideas","enmienda","poder"],["experience","choice","popular sovereignty","experiencia","soberanía popular"]],
   both:["Limits prevent anyone from holding power too long, like the 22nd Amendment. Critics say voters should be free to re-elect someone experienced.","Los límites evitan concentrar el poder, como la 22.ª Enmienda. Los críticos dicen que los votantes deben poder reelegir a alguien con experiencia."]},
  {std:"apg-u3.speech", e:"📰", q:["Can the Gazette print a story the mayor says is unfair?","¿Puede la Gaceta publicar una noticia que el alcalde dice que es injusta?"],
   s:[["Yes, free press","Sí, prensa libre"],["Only if the mayor approves","Solo si el alcalde aprueba"]], kw:[["first amendment","prior restraint","accountability","primera enmienda","censura previa"],["libel","fairness","accuracy","difamación","exactitud"]],
   both:["The First Amendment strongly protects the press from prior restraint. Officials can still sue for libel if a story is false and published with actual malice.","La Primera Enmienda protege a la prensa de la censura previa. Un funcionario puede demandar por difamación si es falso y con malicia real."]},
  {std:"eh-u4.credit", e:"💳", q:["Should students be allowed to get a credit card at 18 without a co-signer?","¿Deben los estudiantes poder tener tarjeta de crédito a los 18 sin codeudor?"],
   s:[["Yes, build credit early","Sí, crear historial"],["No, wait until 21","No, esperar a 21"]], kw:[["credit score","history","responsibility","puntaje","historial"],["interest","debt","apr","minimum payment","interés","deuda"]],
   both:["Early credit can build a strong score if used carefully. High interest and minimum payments can also trap young borrowers in debt.","El crédito temprano puede crear un buen puntaje si se usa bien. El interés alto y el pago mínimo pueden atrapar en deudas."]}
];
const feud = cid => FEUDS[hashN(week() + ":feud:" + CK(cid)) % FEUDS.length];
let FEUD = [], FVOTES = [];
const myFeud = () => FEUD.find(f => f.sid === me());
const kwHit = (f, side, text) => { const t = String(text || "").toLowerCase(); return f.kw[side].some(k => t.includes(k)); };
function feudScore(rows, votes, f){ const sc = [0, 0]; rows.forEach(r => { if (r.side !== 0 && r.side !== 1) return; sc[r.side] += (r.pts | 0) + (r.arg && kwHit(f, r.side, r.arg) ? 5 : 0); });
  votes.forEach(v => { if (v.side === 0 || v.side === 1) sc[v.side] += 2; }); return sc; }
window.lvFeudJoin = async function(side){
  if (myFeud()) return; const f = feud();
  try { await store().set(`${C()}/feud/${week()}_${me()}`, {week:week(), sid:me(), name:SESS().name, side, arg:"", pts:0, at:Date.now()}); } catch(e){ return T.toast(W2("Couldn't join right now.","No se pudo unir.")); }
  T.toast(W2(`You're on team "${f.s[side][0]}". Fight for it!`, `Estás en el equipo "${f.s[side][1]}". ¡Lucha por él!`)); W() && W().bumpNeed("social", 4);
};
window.lvFeudFight = function(){
  const m = myFeud(); if (!m) return; const f = feud();
  qRun({title:L(f.q), e:f.e, sub:W2("Town Feud","Disputa"), items:pickItems(5, {std:f.std, all:true})}, async right => {
    const pts = Math.min(60, (m.pts | 0) + right * 2);
    try { await store().set(`${C()}/feud/${week()}_${me()}`, {...m, pts}, true); } catch(e){}
    T.toast(W2(`+${right * 2} points for your side!`, `¡+${right * 2} puntos para tu lado!`)); closeSheet(); T_lvPaint(); });
};
window.lvFeudArg = async function(){
  const m = myFeud(); if (!m) return; const box = document.getElementById("lvArg"), err = document.getElementById("lvArgErr"), t = (box.value || "").trim().slice(0, 140), f = feud();
  if (t.length < 20) { err.textContent = W2("Write one full sentence with a reason.","Escribe una oración completa con una razón."); return; }
  if (!cleanText(t)) { err.textContent = W2("Keep it school-appropriate.","Mantenlo apropiado."); return; }
  try { await store().set(`${C()}/feud/${week()}_${me()}`, {...m, arg:t, argAt:Date.now()}, true); } catch(e){ err.textContent = W2("Couldn't save it.","No se pudo guardar."); return; }
  T.toast(kwHit(f, m.side, t) ? W2("💡 Strong argument! You used the unit's vocabulary: +5 for your side.","💡 ¡Buen argumento! Usaste el vocabulario: +5 para tu lado.") : W2("Argument posted. Tip: use a key term from the unit for +5.","Argumento publicado. Consejo: usa un término clave para +5."));
};
window.lvFeudVote = async function(sid){
  const r = FEUD.find(x => x.sid === sid); if (!r || sid === me()) return;
  const mineV = FVOTES.filter(v => v.voter === me()); if (mineV.length >= 3) return T.toast(W2("You've used your 3 votes this week.","Ya usaste tus 3 votos de la semana."));
  if (mineV.some(v => v.target === sid)) return;
  try { await store().set(`${C()}/feudvotes/${week()}_${me()}_${sid}`, {week:week(), voter:me(), target:sid, side:r.side, at:Date.now()}); } catch(e){}
  W() && W().bumpNeed("social", 2);
};
async function feudSettleLast(){
  const lw = lastWeek(); if (!SESS() || lv().feud.settled === lw) return;
  try { const rows = await store().list(`${C()}/feud`, {where:[["week","==",lw]]}); const mine = rows.find(r => r.sid === me()); lv().feud.settled = lw;
    if (mine && rows.length >= 2) { const votes = await store().list(`${C()}/feudvotes`, {where:[["week","==",lw]]}); const f = FEUDS[hashN(lw + ":feud:" + CK()) % FEUDS.length], sc = feudScore(rows, votes, f);
      if (sc[mine.side] > sc[1 - mine.side]) T.once("feud:" + lw, () => { T.coins(4); T.toast(W2(`⚖️ Your side won last week's Town Feud (${f.s[mine.side][0]})! +4`, `⚖️ ¡Tu lado ganó la disputa (${f.s[mine.side][1]})! +4`)); });
      if (mine.arg && votes.filter(v => v.target === me()).length >= 3) letter("debater"); }
    T.persist(); } catch(e){}
}
function lastWeek(){ const d = new Date(); d.setDate(d.getDate() - 7); return week(d); }

/* ---------------------------------------------------------------- 4. the weekly mystery */
const SUSPECTS = [
  {e:"🦝", n:"Rocky Raccoon", hat:0, time:1, snack:0},
  {e:"🐿️", n:"Sal the Squirrel", hat:0, time:0, snack:1},
  {e:"🦢", n:"Duchess the Goose", hat:1, time:1, snack:2},
  {e:"🐊", n:"Gus the Gator", hat:1, time:0, snack:0}
];
const HAT = [["a red hat","un sombrero rojo"],["a blue hat","un sombrero azul"]], TIME = [["in the morning","en la mañana"],["at night","de noche"]], SNACK = [["chip crumbs","migas de papitas"],["acorn shells","cáscaras de bellota"],["bread crumbs","migas de pan"]];
const LOOT = [["the fountain's wishing coins","las monedas de la fuente"],["the Mayor's golden key","la llave dorada del alcalde"],["the Bank's vault ledger","el libro de la bóveda del banco"],["Coach Smith's whistle","el silbato de Coach Smith"],["the Gazette's front page","la portada de la Gaceta"],["the Theme Park's golden ticket","el boleto dorado del parque"]];
const heist = cid => { const h = hashN(week() + ":heist:" + CK(cid)); return {culprit:h % 4, loot:LOOT[Math.floor(h / 8) % LOOT.length]}; };
let HEIST = [];
function hState(){ const s = lv(); if (s.heist.week !== week()) s.heist = {week:week(), clues:[], tried:false, ok:false}; return s.heist; }
function clueText(i){ const c = SUSPECTS[heist().culprit];
  return [W2(`A witness saw the thief wearing ${HAT[c.hat][0]}.`, `Un testigo vio al ladrón con ${HAT[c.hat][1]}.`),
          W2(`The security camera caught the thief ${TIME[c.time][0]}.`, `La cámara captó al ladrón ${TIME[c.time][1]}.`),
          W2(`The thief left ${SNACK[c.snack][0]} at the scene.`, `El ladrón dejó ${SNACK[c.snack][1]} en la escena.`)][i]; }
window.lvClue = function(i){ const h = hState(); if (h.clues.includes(i) || h.tried) return;
  qRun({title:W2("Unlock a clue","Desbloquea una pista"), e:"🔎", sub:W2("Get at least 1 of 2 right","Acierta al menos 1 de 2"), items:pickItems(2)}, right => {
    if (right >= 1) { h.clues.push(i); T.persist(); T.toast("🔎 " + clueText(i)); } else T.toast(W2("The trail went cold. Try again!","La pista se enfrió. ¡Intenta otra vez!"));
    closeSheet(); T_lvPaint(); }); };
window.lvAccuse = async function(k){ const h = hState(); if (h.tried) return;
  if (h.clues.length < 2) return T.toast(W2("Find at least 2 clues before you accuse anyone.","Encuentra al menos 2 pistas antes de acusar."));
  h.tried = true; h.ok = k === heist().culprit; T.persist();
  try { await store().set(`${C()}/heist/${week()}_${me()}`, {week:week(), sid:me(), name:SESS().name, ok:h.ok, at:Date.now()}); } catch(e){}
  if (h.ok) { T.once("heist:" + week(), () => { T.coins(4); lv().detective = (lv().detective | 0) + 1; }); letter("detective"); confetti(); T.toast(W2(`🕵️ Case closed! ${SUSPECTS[k].n} did it. +4`, `🕵️ ¡Caso cerrado! Fue ${SUSPECTS[k].n}. +4`)); }
  else T.toast(W2("❌ Wrong suspect! They had an alibi. New case next week.","❌ ¡Sospechoso equivocado! Tenía coartada. Nuevo caso la próxima semana."));
  T_lvPaint(); };

/* ---------------------------------------------------------------- 5. crew: high-fives and reviews */
const KUDOS = {great:["🙌","Great answer!","¡Gran respuesta!"], streak:["🔥","Streak legend","Leyenda de racha"], house:["🏡","Cool house","Casa genial"], study:["📚","Study buddy","Compañero de estudio"], work:["💼","Hard worker","Muy trabajador"], kind:["💛","So kind","Muy amable"]};
const KUDOS_DAY = 5;
let KUD = [];
window.lvKudoPick = function(sid){
  const p = T.pub[sid]; if (!p) return;
  sheet(`<div class="eyebrow">🙌 ${W2("High-five","Choca esos cinco")}</div><h2>${E(p.name)}</h2>
    <div class="lvkg">${Object.entries(KUDOS).map(([k, x]) => `<button class="btn" onclick="lvKudo('${sid}','${k}')">${x[0]} ${E(W2(x[1], x[2]))}</button>`).join("")}</div>
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.lvKudo = async function(sid, k){
  const s = lv(), n = s.kudos.sent[day()] | 0; if (n >= KUDOS_DAY) return T.toast(W2(`${KUDOS_DAY} high-fives a day. Make them count!`, `${KUDOS_DAY} por día. ¡Que cuenten!`));
  const p = T.pub[sid]; if (!p || sid === me()) return;
  s.kudos.sent = {[day()]:n + 1}; T.persist();
  try { await store().add(`${C()}/kudos`, {from:me(), fromName:SESS().name, to:sid, toName:p.name, k, day:day(), week:week(), at:Date.now()}); } catch(e){}
  W() && W().bumpNeed("social", 5); closeSheet(); T.toast(W2(`${KUDOS[k][0]} Sent to ${p.name}!`, `${KUDOS[k][0]} ¡Enviado a ${p.name}!`));
};
function kudosInbox(){ const s = lv(), fresh = KUD.filter(x => x.to === me() && x.at > (s.kudos.seen | 0));
  if (!fresh.length) return; s.kudos.seen = Math.max(...fresh.map(x => x.at)); T.persist();
  fresh.slice(-3).forEach(x => T.toast(`${KUDOS[x.k] ? KUDOS[x.k][0] : "🙌"} ${x.fromName}: ${KUDOS[x.k] ? W2(KUDOS[x.k][1], KUDOS[x.k][2]) : ""}`)); W() && W().bumpNeed("social", 4 * fresh.length); }

/* job reviews */
const RTAGS = {helpful:["🤝","Helpful","Servicial"], fast:["⚡","Fast","Rápido"], friendly:["😊","Friendly","Amable"], smart:["🧠","Knows their stuff","Sabe mucho"], fair:["⚖️","Fair","Justo"]};
let REVS = [];
function workers(){ const c = CLS(), st = c.staff || {}, nm = c.staffNames || {}, R = window.CAREERS, out = [];
  Object.entries(st).forEach(([job, sids]) => (sids || []).filter(Boolean).forEach(sid => { if (sid === me()) return;
    const J = R && R.CAREERS[job]; out.push({sid, job, name:nm[sid] || (T.pub[sid] && T.pub[sid].name) || "?", e:J ? J.e : "💼", title:J ? L(J.title) : job}); }));
  return out; }
window.lvRate = function(sid, job){
  const w = workers().find(x => x.sid === sid && x.job === job); if (!w) return;
  if (lv().rev[week() + sid]) return T.toast(W2("You already reviewed them this week.","Ya lo calificaste esta semana."));
  window._lvr = {stars:0, tags:[]};
  sheet(`<div class="eyebrow">⭐ ${W2("Review a town worker","Califica a un trabajador")}</div><h2>${w.e} ${E(w.name)}</h2><p class="muted" style="margin-top:0">${E(w.title)}</p>
    <div class="lvstars" id="lvStars">${[1,2,3,4,5].map(n => `<button onclick="lvStar(${n})">☆</button>`).join("")}</div>
    <div class="lvkg">${Object.entries(RTAGS).map(([k, x]) => `<button class="btn ghost" id="lvt_${k}" onclick="lvTag('${k}')">${x[0]} ${E(W2(x[1], x[2]))}</button>`).join("")}</div>
    <label class="cform">${W2("Anything else? (optional, kind and specific)","¿Algo más? (opcional, amable y específico)")}<input id="lvRN" maxlength="100"></label><p id="lvRErr" class="terr"></p>
    <button class="btn primary wide" onclick="lvRateSend('${sid}','${job}')">${W2("Send review","Enviar")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.lvStar = n => { window._lvr.stars = n; document.querySelectorAll("#lvStars button").forEach((b, i) => { b.textContent = i < n ? "★" : "☆"; b.classList.toggle("on", i < n); }); };
window.lvTag = k => { const r = window._lvr, i = r.tags.indexOf(k); if (i >= 0) r.tags.splice(i, 1); else r.tags.push(k); const b = document.getElementById("lvt_" + k); if (b) b.classList.toggle("primary", i < 0); };
window.lvRateSend = async function(sid, job){
  const r = window._lvr, note = (document.getElementById("lvRN").value || "").trim(), err = document.getElementById("lvRErr");
  if (!r.stars) { err.textContent = W2("Pick 1 to 5 stars.","Elige de 1 a 5 estrellas."); return; }
  if (note && !cleanText(note)) { err.textContent = W2("Keep it kind and school-appropriate.","Que sea amable y apropiado."); return; }
  try { await store().set(`${C()}/reviews/${week()}_${me()}_${sid}`, {week:week(), by:me(), worker:sid, job, stars:r.stars, tags:r.tags.slice(0, 5), note:note.slice(0, 100), at:Date.now()}); }
  catch(e){ err.textContent = W2("Couldn't send it.","No se pudo enviar."); return; }
  lv().rev[week() + sid] = 1; T.persist(); W() && W().bumpNeed("social", 3); closeSheet(); T.toast(W2("⭐ Thanks! Reviews help Coach Smith and help workers improve.","⭐ ¡Gracias! Las reseñas ayudan a Coach Smith y a los trabajadores."));
};
function myReviews(rows){ const mine = (rows || REVS).filter(r => r.worker === me()); const n = mine.length, avg = n ? mine.reduce((a, r) => a + r.stars, 0) / n : 0;
  const tags = {}; mine.forEach(r => (r.tags || []).forEach(t => tags[t] = (tags[t] | 0) + 1)); return {n, avg, tags}; }
async function employeeOfWeek(){
  const lw = lastWeek(); if (!SESS() || lv().eow === lw || !(window.CAREERS && window.CAREERS.myJob())) return;
  try { const rows = await store().list(`${C()}/reviews`, {where:[["week","==",lw]]}); lv().eow = lw; const m = myReviews(rows);
    if (m.n >= 3 && m.avg >= 4.5) T.once("eow:" + lw, () => { T.coins(5); letter("rated"); T.toast(W2(`🏅 Employee of the Week! ${m.avg.toFixed(1)}★ from ${m.n} reviews. +5`, `🏅 ¡Empleado de la semana! ${m.avg.toFixed(1)}★ de ${m.n} reseñas. +5`)); });
    T.persist(); } catch(e){}
}

/* ---------------------------------------------------------------- 6. letters and job matches */
const LETTERS = {
  reliable: {e:"✅", from:"Coach Smith", t:["finished every daily job on 3 different days. Reliable and ready for responsibility.","terminó todos sus trabajos diarios en 3 días distintos. Confiable y listo para tener responsabilidades."]},
  reliable2:{e:"🌟", from:"Coach Smith", t:["finished every daily job on 10 different days. One of the most dependable people in town.","terminó todos sus trabajos diarios en 10 días distintos. De las personas más confiables del pueblo."]},
  worker:   {e:"💼", from:"Ms. Pinkerton", t:["has worked 5 shifts in town. Shows up and gets it done.","ha trabajado 5 turnos en el pueblo. Llega y cumple."]},
  worker2:  {e:"🏆", from:"Newsy Ned", t:["has worked 15 shifts. A true professional.","ha trabajado 15 turnos. Un verdadero profesional."]},
  scholar:  {e:"🎓", from:"Coach Smith", t:["has mastered 3 course standards. Knows the material.","domina 3 estándares del curso. Conoce el material."]},
  scholar2: {e:"📜", from:"Coach Smith", t:["has mastered 8 course standards. An expert the town can count on.","domina 8 estándares del curso. Un experto confiable."]},
  team:     {e:"⚔️", from:"Coach Smith", t:["helped the class in Period Raids on 3 different days. A team player.","ayudó a la clase en incursiones en 3 días distintos. Juega en equipo."]},
  rated:    {e:"🏅", from:"The Town", t:["was Employee of the Week with excellent reviews from classmates.","fue Empleado de la Semana con excelentes reseñas."]},
  detective:{e:"🕵️", from:"Town Marshal", t:["cracked a town mystery using evidence and logic.","resolvió un misterio del pueblo con evidencia y lógica."]},
  debater:  {e:"🗣️", from:"The Grenadier Gazette", t:["wrote a Town Feud argument classmates voted among the best.","escribió un argumento que sus compañeros votaron entre los mejores."]}
};
function letter(k){ const s = lv(); if (s.letters.some(x => x.k === k)) return false; s.letters.push({k, at:Date.now()}); T.persist();
  setTimeout(() => T.toast(W2(`📜 New recommendation letter from ${LETTERS[k].from}! It's on your résumé now.`, `📜 ¡Nueva carta de recomendación de ${LETTERS[k].from}! Ya está en tu currículum.`)), 900); return true; }
function shiftsTotal(){ const k = civ().career; if (!k) return 0; return (k.shifts | 0) + (k.hist || []).reduce((a, h) => a + (h.shifts | 0), 0); }
function letterCheck(){
  if (!SESS()) return; const s = lv(), j = civ().jobs, d = day();
  if (j && j.picks && j.picks.length && j.picks.every(k => j.paid[k]) && !s.todoDays.includes(d)) { s.todoDays.push(d); s.todoDays = s.todoDays.slice(-120); T.persist(); }
  if (s.todoDays.length >= 3) letter("reliable"); if (s.todoDays.length >= 10) letter("reliable2");
  const sh = shiftsTotal(); if (sh >= 5) letter("worker"); if (sh >= 15) letter("worker2");
  const m = mastered(); if (m >= 3) letter("scholar"); if (m >= 8) letter("scholar2");
  if (s.raidDays.length >= 3) letter("team");
}
function matches(){
  const R = window.CAREERS; if (!R) return []; const s = lv(), cur = R.myJob(), rv = myReviews();
  const econ = subjPct("econ"), gov = subjPct("gov"), any = subjPct(null);
  return Object.entries(R.CAREERS).filter(([k]) => k !== cur).map(([k, J]) => {
    const sp = J.subj === "econ" ? econ : J.subj === "gov" ? gov : any; const why = [];
    let sc = 35; if (sp != null) { sc += Math.round(sp * 0.35); if (sp >= 70) why.push(W2(`${sp}% on ${J.subj === "any" ? "your" : J.subj === "econ" ? "economics" : "government"} standards`, `${sp}% en estándares de ${J.subj === "any" ? "tus cursos" : J.subj === "econ" ? "economía" : "gobierno"}`)); }
    const td = Math.min(15, s.todoDays.length * 2); sc += td; if (s.todoDays.length >= 3) why.push(W2(`${s.todoDays.length} days of daily jobs done`, `${s.todoDays.length} días con trabajos diarios`));
    sc += Math.min(10, s.letters.length * 3); if (s.letters.length) why.push(W2(`${s.letters.length} recommendation letter${s.letters.length > 1 ? "s" : ""}`, `${s.letters.length} carta(s) de recomendación`));
    if (rv.n >= 2 && rv.avg >= 4) { sc += 5; why.push(W2(`${rv.avg.toFixed(1)}★ reviews`, `reseñas de ${rv.avg.toFixed(1)}★`)); }
    if ((k === "marshal" || k === "judge") && (s.detective | 0)) { sc += 4; why.push(W2("solved a mystery","resolvió un misterio")); }
    if (k === "reporter" && s.letters.some(x => x.k === "debater")) { sc += 5; why.push(W2("persuasive writer","escritor persuasivo")); }
    if (k === "tutor" && mastered() >= 3) { sc += 5; }
    return {k, J, sc:Math.min(99, sc), why, open:R.openSeats(k)}; }).sort((a, b) => b.sc - a.sc);
}
/* the résumé on job applications (hook read by careers.js) */
EXT.resumeExtra = EXT.resumeExtra || [];
EXT.resumeExtra.push({
  html: j => { const s = lv(), m = matches().find(x => x.k === j), rv = myReviews();
    return `${s.letters.length ? `<span>📜 ${s.letters.length} ${W2("letters","cartas")}</span>` : ""}<span>✅ ${s.todoDays.length} ${W2("days of daily jobs","días de trabajos")}</span>
      <span>🎓 ${mastered()} ${W2("standards mastered","estándares dominados")}</span>${rv.n ? `<span>⭐ ${rv.avg.toFixed(1)} (${rv.n})</span>` : ""}${m ? `<span class="lvmatch">🎯 ${m.sc}% ${W2("match","compatible")}</span>` : ""}
      ${s.letters.length ? `<div class="lvlet">${s.letters.slice(-3).map(x => `<small>${LETTERS[x.k].e} <b>${LETTERS[x.k].from}:</b> “${E(SESS().name)} ${E(L(LETTERS[x.k].t))}”</small>`).join("")}</div>` : ""}`; },
  stats: j => { const s = lv(), m = matches().find(x => x.k === j), rv = myReviews();
    return {letters:s.letters.map(x => x.k), todoDays:s.todoDays.length, mastered:mastered(), match:m ? m.sc : 0, stars:rv.n ? Math.round(rv.avg * 10) / 10 : 0, reviews:rv.n}; }
});

/* ---------------------------------------------------------------- the Live tab */
let LSUB = "live";
const SUBS = [["live","🔴",["Live","En vivo"]],["duels","⚔️",["Duels","Duelos"]],["feud","⚖️",["Feud","Disputa"]],["mystery","🕵️",["Mystery","Misterio"]],["crew","🙌",["Crew","Equipo"]],["passport","🛂",["Standards","Estándares"]]];
window.lvSub = k => { LSUB = k; T.paintSub(); const n = document.querySelector(".lvnav"); if (n && n.getBoundingClientRect().top < 0) n.scrollIntoView({block:"start"}); };
window.lvOpen = (k) => { if (k) LSUB = k; townTab("live"); setTimeout(() => { const n = document.querySelector(".lvnav"); if (n) n.scrollIntoView({behavior:"smooth", block:"start"}); }, 60); };
window.T_lvPaint = () => { if (T.isTown() && T.tt === "live") T.paintSub(); };
function paintLive(el){
  if (!SESS()) { el.innerHTML = ""; return; }
  T.viewSub(V.NET().watchPub(rows => { if (rows) rows.forEach(p => T.pub[p.id] = p); }));
  const pend = DUEL_IN.filter(d => d.status === "open").length;
  const nav = `<div class="lvnav">${SUBS.map(([k, e, l]) => `<button class="${LSUB === k ? "on" : ""}" onclick="lvSub('${k}')">${e}<span>${L(l)}</span>${k === "duels" && pend ? `<i>${pend}</i>` : ""}</button>`).join("")}</div>`;
  el.innerHTML = nav + `<div id="lvBody">${(VIEWS[LSUB] || VIEWS.live)()}</div>`;
}
const pill = () => inPeriod() ? `<span class="lvlive">● ${W2("LIVE · class is in session","EN VIVO · hay clase")}</span>` : `<span class="lvoff">⏰ ${W2("Raids open Mon–Fri, 7:00–1:30","Incursiones: lun–vie, 7:00–1:30")}</span>`;
const VIEWS = {
  live(){ const b = boss(), hp = raidHP(), dmg = Math.min(hp, raidDmg()), f = focusStd(), fi = f && STDS() ? STDS().stdInfo(f) : null, d = DUEL_IN.filter(x => x.status === "open");
    const fe = feud(), mf = myFeud(), h = hState();
    return `<section class="panel raised lvhero ${inPeriod() ? "on" : ""}">${pill()}
      <div class="lvboss ${dmg >= hp ? "down" : inPeriod() ? "" : "sleep"}" onclick="lvRaid()" role="button"><span>${dmg >= hp ? "💥" : b.e}</span><b>${L(b.n)}</b><small>${L(b.l)}</small></div>
      ${bar(dmg >= hp ? 1 : 1 - dmg / hp, dmg >= hp ? "#3BB273" : "#E5484D")}<p class="muted" style="text-align:center;margin:4px 0 8px">❤️ ${Math.max(0, hp - dmg)}/${hp} · ${W2(`${RAID.length} classmates hitting it today`, `${RAID.length} compañeros lo golpean hoy`)}</p>
      <button class="btn primary wide" onclick="lvRaid()">${inPeriod() ? "⚔️ " + W2("Join the raid","Unirse a la incursión") : "💤 " + W2("How raids work","Cómo funcionan")}</button>
      ${fi ? `<p class="lvfocus">🎯 ${W2("This week's focus standard","Estándar de enfoque")}: <b>${E(fi.code)}</b> · ${E(T.L2(fi.topic))} <button class="btn ghost" onclick="lvPractice('${f}')">${W2("Practice","Practicar")}</button></p>` : ""}</section>
    <div class="lvgrid">
      ${card("⚔️", W2("Duels","Duelos"), d.length ? W2(`${d.length} challenge${d.length > 1 ? "s" : ""} waiting!`, `¡${d.length} reto(s) esperando!`) : W2("Challenge a classmate","Reta a un compañero"), "duels", d.length)}
      ${card(fe.e, W2("Town Feud","Disputa"), mf ? W2(`You're on "${fe.s[mf.side][0]}"`, `Estás con "${fe.s[mf.side][1]}"`) : W2("Pick a side this week","Elige un lado esta semana"), "feud", !mf)}
      ${card("🕵️", W2("Mystery","Misterio"), h.tried ? (h.ok ? W2("Solved! ✅","¡Resuelto! ✅") : W2("New case next week","Nuevo caso la próxima semana")) : W2(`Who stole ${heist().loot[0]}?`, `¿Quién robó ${heist().loot[1]}?`), "mystery", !h.tried)}
      ${card("🙌", W2("Crew","Equipo"), W2("High-fives & worker reviews","Choca cinco y reseñas"), "crew")}
      ${card("🛂", W2("Standards Passport","Pasaporte de estándares"), W2(`${mastered()} mastered`, `${mastered()} dominados`), "passport")}
      ${card("📜", W2("Your résumé power","Tu currículum"), W2(`${lv().letters.length} letters · top match ${(matches()[0] || {sc:0}).sc}%`, `${lv().letters.length} cartas · mejor ${(matches()[0] || {sc:0}).sc}%`), "crew")}
    </div>`; },
  duels(){ const s = lv(), rv = rival(), inc = DUEL_IN.filter(d => d.status === "open"), done = DUEL_IN.concat(DUEL_OUT).filter(d => d.status === "done").sort((a, b) => b.at - a.at).slice(0, 6), wait = DUEL_OUT.filter(d => d.status === "open");
    return `<section class="panel raised"><div class="eyebrow">⚔️ ${W2("Quiz Duels","Duelos de preguntas")}</div>
      <div class="lvrec"><div><b>${s.duel.w}</b><small>${W2("wins","victorias")}</small></div><div><b>${s.duel.t}</b><small>${W2("ties","empates")}</small></div><div><b>${s.duel.l}</b><small>${W2("losses","derrotas")}</small></div></div>
      ${rv ? `<p class="lvrival">🔥 ${W2("Your rival","Tu rival")}: <b>${E((T.pub[rv.sid] || {}).name || "?")}</b> (${rv.r[0]}–${rv.r[1]}${rv.r[2] ? "–" + rv.r[2] : ""}) <button class="btn ghost" onclick="lvDuelGo('${rv.sid}')">${W2("Rematch","Revancha")}</button></p>` : ""}
      <button class="btn primary wide" onclick="lvDuelPick()">⚔️ ${W2("Challenge someone","Retar a alguien")} (${DUEL_DAY - (s.duel.sent[day()] | 0)} ${W2("left today","hoy")})</button></section>
      ${inc.length ? `<section class="panel"><div class="eyebrow">📬 ${W2("Challenges for you","Retos para ti")}</div>${inc.map(d => `<div class="tdeal"><span>⚔️ <b>${E(d.aName)}</b> ${W2("challenged you","te retó")}</span><button class="btn primary" onclick="lvDuelAccept('${d.id}')">${W2("Play","Jugar")}</button></div>`).join("")}</section>` : ""}
      ${wait.length ? `<section class="panel"><div class="eyebrow">⏳ ${W2("Waiting on","Esperando a")}</div>${wait.map(d => `<div class="tdeal"><span>${E(d.bName)} · ${W2("you got","sacaste")} ${d.aS}/5</span></div>`).join("")}</section>` : ""}
      ${done.length ? `<section class="panel"><div class="eyebrow">🏁 ${W2("Recent results","Resultados")}</div>${done.map(d => { const amA = d.a === me(), m = amA ? d.aS : d.bS, t = amA ? d.bS : d.aS;
        return `<div class="tdeal"><span>${m > t ? "🏆" : m < t ? "😤" : "🤝"} ${W2("vs","vs")} <b>${E(amA ? d.bName : d.aName)}</b> ${m}–${t}</span></div>`; }).join("")}</section>` : ""}`; },
  feud(){ const f = feud(), m = myFeud(), sc = feudScore(FEUD, FVOTES, f), tot = Math.max(1, sc[0] + sc[1]), myV = FVOTES.filter(v => v.voter === me());
    const args = FEUD.filter(r => r.arg).map(r => ({...r, v:FVOTES.filter(v => v.target === r.sid).length})).sort((a, b) => b.v - a.v);
    const col = side => args.filter(a => a.side === side).slice(0, 6).map(a => `<div class="lvarg"><p>“${E(a.arg)}”</p><small>— ${E(a.name)} ${kwHit(f, a.side, a.arg) ? "💡" : ""}</small>
      ${a.sid !== me() ? `<button class="btn ${myV.some(v => v.target === a.sid) ? "primary" : "ghost"}" onclick="lvFeudVote('${a.sid}')">👍 ${a.v}</button>` : `<span class="muted">👍 ${a.v}</span>`}</div>`).join("") || `<p class="muted" style="font-size:12px">${W2("No arguments yet.","Aún no hay argumentos.")}</p>`;
    const si = STDS() ? STDS().stdInfo(f.std) : null;
    return `<section class="panel raised"><div class="eyebrow">⚖️ ${W2("This week's Town Feud","La disputa de la semana")}${si ? ` · ${E(si.code)}` : ""}</div><h2>${f.e} ${E(L(f.q))}</h2>
      <p class="lvboth">🧭 ${E(L(f.both))}</p>
      <div class="lvtug"><i style="width:${Math.round(100 * sc[0] / tot)}%"></i><span>${E(L(f.s[0]))} · ${sc[0]}</span><span>${sc[1]} · ${E(L(f.s[1]))}</span></div>
      ${!m ? `<p>${W2("Pick your side. You're locked in for the week.","Elige tu lado. Queda fijo toda la semana.")}</p><div class="cyn"><button class="btn primary" onclick="lvFeudJoin(0)">${E(L(f.s[0]))}</button><button class="btn primary" onclick="lvFeudJoin(1)">${E(L(f.s[1]))}</button></div>`
        : `<p>${W2("Your side","Tu lado")}: <b>${E(L(f.s[m.side]))}</b> · ${W2("your points","tus puntos")}: ${m.pts | 0}</p>
        <button class="btn primary wide" onclick="lvFeudFight()">⚔️ ${W2("Fight for your side: 5 questions","Lucha por tu lado: 5 preguntas")}</button>
        <label class="cform">${W2("Your argument in one sentence (use a key term like","Tu argumento en una oración (usa un término como")} “${E(f.kw[m.side].filter(k => /^[a-z ]+$/.test(k)).slice(0, 2).join("”, “"))}”)
          <textarea id="lvArg" maxlength="140" rows="2">${E(m.arg || "")}</textarea></label><p id="lvArgErr" class="terr"></p>
        <button class="btn wide" onclick="lvFeudArg()">💬 ${m.arg ? W2("Update argument","Actualizar") : W2("Post argument","Publicar")}</button>`}
      <p class="muted" style="font-size:12px">${W2(`3 votes a week for the best arguments (either side). You've used ${myV.length}. The winning side's idea passes on Monday and its team earns +4.`, `3 votos a la semana para los mejores argumentos (de cualquier lado). Usaste ${myV.length}. El lado ganador gana +4 el lunes.`)}</p></section>
      <div class="lvsides"><section class="panel"><div class="eyebrow">${E(L(f.s[0]))}</div>${col(0)}</section><section class="panel"><div class="eyebrow">${E(L(f.s[1]))}</div>${col(1)}</section></div>`; },
  mystery(){ const H = heist(), h = hState(), solved = HEIST.filter(x => x.ok).sort((a, b) => a.at - b.at).slice(0, 5);
    return `<section class="panel raised"><div class="eyebrow">🕵️ ${W2("This week's mystery","El misterio de la semana")}</div>
      <h2>${W2(`Someone stole ${H.loot[0]}!`, `¡Alguien robó ${H.loot[1]}!`)}</h2>
      <p class="muted" style="margin-top:0">${W2("Answer questions to unlock clues. With 2 clues you can name the thief, but you only get one accusation.","Responde para desbloquear pistas. Con 2 pistas puedes nombrar al ladrón, pero solo tienes una acusación.")}</p>
      <div class="lvclues">${[0, 1, 2].map(i => h.clues.includes(i) ? `<div class="on">🔎 ${clueText(i)}</div>` : `<button class="btn" ${h.tried ? "disabled" : ""} onclick="lvClue(${i})">🔒 ${W2(`Clue ${i + 1}: 2 questions`, `Pista ${i + 1}: 2 preguntas`)}</button>`).join("")}</div></section>
      <section class="panel"><div class="eyebrow">👥 ${W2("Suspects","Sospechosos")}</div><div class="lvsus">${SUSPECTS.map((x, k) => `<div class="${h.tried && k === H.culprit ? "guilty" : ""}"><span>${x.e}</span><b>${x.n}</b>
        ${!h.tried ? `<button class="btn ${h.clues.length >= 2 ? "primary" : "ghost"}" onclick="lvAccuse(${k})">${W2("Accuse","Acusar")}</button>` : k === H.culprit ? `<i>${W2("Guilty!","¡Culpable!")}</i>` : ""}</div>`).join("")}</div>
        ${h.tried ? `<p>${h.ok ? "✅ " + W2("You solved it!","¡Lo resolviste!") : "❌ " + W2("Not this time. New case Monday.","Esta vez no. Nuevo caso el lunes.")}</p>` : ""}</section>
      ${solved.length ? `<section class="panel"><div class="eyebrow">🏅 ${W2("First detectives","Primeros detectives")}</div>${solved.map((x, i) => `<div class="tdeal"><span>${i + 1}. ${E(x.name)}</span></div>`).join("")}</section>` : ""}`; },
  crew(){ const ppl = classmates(), s = lv(), wk = KUD.filter(x => x.week === week()), top = {}; wk.forEach(x => top[x.toName] = (top[x.toName] | 0) + 1);
    const wall = Object.entries(top).sort((a, b) => b[1] - a[1]).slice(0, 5), mineK = wk.filter(x => x.to === me()), ws = workers(), rv = myReviews(), ms = matches().slice(0, 3);
    return `<section class="panel raised"><div class="eyebrow">🙌 ${W2("High-fives","Choca esos cinco")} · ${KUDOS_DAY - (s.kudos.sent[day()] | 0)} ${W2("left today","quedan hoy")}</div>
      <div class="lvppl">${ppl.map(p => `<button class="btn" onclick="lvKudoPick('${p.id}')">${E(p.name)}</button>`).join("") || `<p class="muted">${W2("No classmates yet.","Aún no hay compañeros.")}</p>`}</div>
      ${mineK.length ? `<p>💛 ${W2(`You got ${mineK.length} high-five${mineK.length > 1 ? "s" : ""} this week`, `Recibiste ${mineK.length} esta semana`)}: ${[...new Set(mineK.map(x => KUDOS[x.k] ? KUDOS[x.k][0] : "🙌"))].join(" ")}</p>` : ""}
      ${wall.length ? `<div class="lvtop">${wall.map(([n, c], i) => `<span>${["🥇","🥈","🥉","4.","5."][i]} ${E(n)} <b>${c}</b></span>`).join("")}</div>` : ""}</section>
      <section class="panel"><div class="eyebrow">⭐ ${W2("Review a town worker","Califica a un trabajador")}</div>
      ${ws.length ? ws.map(w => `<div class="tdeal"><span>${w.e} <b>${E(w.name)}</b> · ${E(w.title)}</span><button class="btn ${s.rev[week() + w.sid] ? "ghost" : ""}" ${s.rev[week() + w.sid] ? "disabled" : ""} onclick="lvRate('${w.sid}','${w.job}')">${s.rev[week() + w.sid] ? "✓" : "⭐ " + W2("Rate","Calificar")}</button></div>`).join("") : `<p class="muted">${W2("Nobody has been hired yet.","Aún no contratan a nadie.")}</p>`}
      ${rv.n ? `<p>${W2("Your reviews","Tus reseñas")}: <b>${rv.avg.toFixed(1)}★</b> (${rv.n}) ${Object.entries(rv.tags).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([t, n]) => RTAGS[t] ? `${RTAGS[t][0]}×${n}` : "").join(" ")}</p>` : ""}</section>
      <section class="panel"><div class="eyebrow">📜 ${W2("Recommendation letters","Cartas de recomendación")}</div>
      ${s.letters.length ? s.letters.map(x => `<div class="lvletter"><span>${LETTERS[x.k].e}</span><p>“${E(SESS().name)} ${E(L(LETTERS[x.k].t))}”<small>— ${LETTERS[x.k].from}</small></p></div>`).join("")
        : `<p class="muted">${W2("Earn letters by finishing every daily job on 3 days, working shifts, raiding in class, mastering standards, solving mysteries and writing great arguments.","Gana cartas terminando tus trabajos diarios 3 días, trabajando turnos, en incursiones, dominando estándares, resolviendo misterios y escribiendo buenos argumentos.")}</p>`}
      <p class="muted" style="font-size:12px">${W2(`Daily jobs finished on ${s.todoDays.length} day(s). Letters go on every job application automatically.`, `Trabajos diarios completos en ${s.todoDays.length} día(s). Las cartas van en cada solicitud.`)}</p></section>
      <section class="panel"><div class="eyebrow">🎯 ${W2("Jobs that fit you","Trabajos para ti")}</div>${ms.map(m => `<div class="lvjob"><span>${m.J.e}</span><div><b>${E(L(m.J.title))}</b> <i class="lvmatch">${m.sc}%</i><small>${E(m.why.join(" · ") || W2("Practice standards and finish daily jobs to raise your match.","Practica y termina tus trabajos diarios para subir."))}</small></div>
        ${m.open ? `<button class="btn primary" onclick="carApply('${m.k}')">${W2("Apply","Aplicar")}</button>` : `<span class="muted" style="font-size:11px">${W2("full","lleno")}</span>`}</div>`).join("")}</section>`; },
  passport(){ const ms = mastery(), byC = {}; ms.forEach(m => { const c = L(m.info.course); (byC[c] = byC[c] || []).push(m); });
    return `<section class="panel raised"><div class="eyebrow">🛂 ${W2("Standards Passport","Pasaporte de estándares")}</div>
      <p class="muted" style="margin-top:0">${W2("Every question in Smith's Classroom is tied to a Florida or AP standard. A standard gets stamped ✅ when you've tried 5+ questions and get 80% right.","Cada pregunta está ligada a un estándar de Florida o AP. Un estándar recibe sello ✅ cuando intentas 5+ preguntas con 80% de aciertos.")}</p>
      <div class="lvrec"><div><b>${ms.filter(m => m.done).length}</b><small>${W2("stamped","sellados")}</small></div><div><b>${ms.filter(m => m.seen && !m.done).length}</b><small>${W2("in progress","en progreso")}</small></div><div><b>${ms.filter(m => !m.seen).length}</b><small>${W2("not started","sin empezar")}</small></div></div></section>
      ${Object.entries(byC).map(([c, list]) => `<section class="panel"><div class="eyebrow">${E(c)}</div>${list.map(m => `<div class="lvstd ${m.done ? "done" : ""}">
        <div><b>${m.done ? "✅" : m.seen ? "🟡" : "⚪"} ${E(m.info.code)}</b> ${E(T.L2(m.info.topic))}${m.info.key === focusStd() ? ` <i class="lvmatch">🎯 ${W2("focus","enfoque")}</i>` : ""}
        ${bar(m.pct == null ? 0 : m.pct / 100, m.done ? "#3BB273" : m.pct != null && m.pct < 60 ? "#E5484D" : null)}<small>${m.seen ? `${m.pct}% · ${m.right}/${m.seen}` : W2("Not started","Sin empezar")}</small></div>
        <button class="btn ghost" onclick="lvPractice('${m.info.key}')">${W2("Practice","Practicar")}</button></div>`).join("")}</section>`).join("")}`; }
};
const card = (e, t, sub, k, dot) => `<button class="lvcard" onclick="lvSub('${k}')"><span>${e}</span><b>${E(t)}</b><small>${E(sub)}</small>${dot ? `<i></i>` : ""}</button>`;
window.lvPractice = function(key){ const info = STDS() ? STDS().stdInfo(key) : null;
  qRun({title:info ? `${info.code} · ${T.L2(info.topic)}` : W2("Practice","Práctica"), e:"🛂", items:pickItems(5, {std:key, all:true})}, right => {
    closeSheet(); T.toast(W2(`${right}/5 on this standard.`, `${right}/5 en este estándar.`)); letterCheck(); T_lvPaint(); }); };
EXT.tabs.push({key:"live", icon:"🔥", label:() => W2("Live","En vivo"), paint:el => paintLive(el)});

/* ---------------------------------------------------------------- background, banners, to-do */
let BG = [], TICK = null;
EXT.onLeave.push(() => { BG.forEach(u => { try { u(); } catch(e){} }); BG = []; clearInterval(TICK); TICK = null; });
EXT.onSession.push(() => {
  BG.forEach(u => { try { u(); } catch(e){} }); BG = []; clearInterval(TICK); BYID = null;
  const st = store(), c = C(), rp = () => T_lvPaint();
  BG.push(st.watch(`${c}/raid`, {where:[["day","==",day()]]}, rows => { if (rows) { RAID = rows; raidSettle(); } }));
  BG.push(st.watch(`${c}/duels`, {where:[["b","==",me()]]}, rows => { if (!rows) return; const was = DUEL_IN.filter(d => d.status === "open").length; DUEL_IN = rows;
    rows.forEach(d => duelSettle(d, false)); const now = rows.filter(d => d.status === "open").length;
    if (now > was && was >= 0) { const d = rows.filter(x => x.status === "open").sort((a, b) => b.at - a.at)[0]; if (d) T.toast(W2(`⚔️ ${d.aName} challenged you to a duel!`, `⚔️ ¡${d.aName} te retó a un duelo!`)); } rp(); }));
  BG.push(st.watch(`${c}/duels`, {where:[["a","==",me()]]}, rows => { if (!rows) return; DUEL_OUT = rows; rows.forEach(d => duelSettle(d, false)); rp(); }));
  BG.push(st.watch(`${c}/feud`, {where:[["week","==",week()]]}, rows => { if (rows) { FEUD = rows; rp(); } }));
  BG.push(st.watch(`${c}/feudvotes`, {where:[["week","==",week()]]}, rows => { if (rows) { FVOTES = rows; rp(); } }));
  BG.push(st.watch(`${c}/kudos`, {where:[["week","==",week()]]}, rows => { if (rows) { KUD = rows; kudosInbox(); } }));
  BG.push(st.watch(`${c}/reviews`, {where:[["worker","==",me()]]}, rows => { if (rows) REVS = rows; }));
  BG.push(st.watch(`${c}/heist`, {where:[["week","==",week()]]}, rows => { if (rows) HEIST = rows; }));
  st.list(`${c}/pub`).then(r => { ROSTER = (r || []).length; }).catch(() => {});
  classworkTick(); TICK = setInterval(() => { classworkTick(); letterCheck(); }, 15000);
  setTimeout(() => { letterCheck(); feudSettleLast(); employeeOfWeek(); }, 2500);
});
EXT.banner.push(() => { if (!SESS()) return ""; const d = DUEL_IN.filter(x => x.status === "open"), on = inPeriod() && !CLS().raidOff, b = boss(), hp = raidHP(), dmg = Math.min(hp, raidDmg());
  if (!on && !d.length) return "";
  return `<section class="panel lvban ${on ? "on" : ""}" onclick="lvOpen(${d.length && !on ? "'duels'" : "null"})" role="button">${on ? `<span class="lvlive">● LIVE</span> <b>${b.e} ${L(b.n)}</b> <small>${dmg >= hp ? W2("defeated!","¡vencido!") : `❤️ ${hp - dmg}/${hp}`}</small>` : ""}
    ${d.length ? `<span>⚔️ <b>${E(d[0].aName)}</b> ${W2("challenged you!","¡te retó!")}</span>` : ""}<span class="btn">🔥 ${W2("Go","Ir")}</span></section>`; });
EXT.pubExtra.push(() => { const ms = mastery(), std = {}; ms.forEach(m => { if (m.seen >= 3) std[m.info.key] = m.pct; });
  const s = lv(); return {live:{std, letters:s.letters.length, todoDays:s.todoDays.length, duels:[s.duel.w, s.duel.l, s.duel.t]}}; });
if (window.TODAY) { const base = window.TODAY.items; window.TODAY.items = function(){ const out = base(); if (!SESS()) return out;
  if (inPeriod() && !CLS().raidOff) out.push({k:"raid", e:boss().e, learn:true, t:W2(`Period Raid: ${boss().n[0]}`, `Incursión: ${boss().n[1]}`), sub:W2("Hit it 3 times in class to share the reward","Golpéalo 3 veces en clase para la recompensa"), done:(lv().raid[day()] | 0) >= 3, opt:true, go:"todoLive('live')"});
  const d = DUEL_IN.filter(x => x.status === "open"); if (d.length) out.push({k:"duel", e:"⚔️", learn:true, t:W2(`${d[0].aName} challenged you to a duel`, `${d[0].aName} te retó a un duelo`), done:false, opt:true, go:"todoLive('duels')"});
  if (!myFeud()) out.push({k:"feud", e:feud().e, t:W2("Town Feud: pick a side","Disputa: elige un lado"), sub:L(feud().q), done:false, opt:true, go:"todoLive('feud')"});
  const f = focusStd(); if (f && STDS()) { const i = STDS().stdInfo(f); out.push({k:"focus", e:"🎯", learn:true, t:W2(`Focus standard: ${i.code}`, `Estándar de enfoque: ${i.code}`), sub:T.L2(i.topic), done:false, opt:true, go:`todoLive('passport')`}); }
  return out; }; }
window.todoLive = k => { closeSheet(); LSUB = k; if (typeof go === "function") go("town"); setTimeout(() => lvOpen(k), 350); };

/* ---------------------------------------------------------------- the teacher */
const tc = () => T.adminCid;
EXT.adminPanels.push({
  html: c => { const L2 = STDS() ? STDS().stdList() : {};
    return `<section class="panel tadm"><div class="eyebrow">🔥 ${W2("Live: raids, duels, feuds, mysteries","En vivo: incursiones, duelos, disputas, misterios")}</div>
      <p class="muted" style="font-size:13px">${W2("Period Raids run Monday–Friday 7:00–1:30 so students get the most out of logging in during class. Every right answer in class or in town hits the class boss; focus-standard answers hit twice.","Las incursiones son de lunes a viernes 7:00–1:30. Cada respuesta correcta golpea al jefe; las del estándar de enfoque, doble.")}</p>
      <div class="cmake"><button class="btn ${c.raidOff ? "" : "primary"}" onclick="townSet('raidOff', ${!c.raidOff})">⚔️ ${W2("Raids","Incursiones")}: ${c.raidOff ? W2("off","apagadas") : W2("on","encendidas")}</button>
        <button class="btn ${c.liveAlways ? "primary" : ""}" onclick="townSet('liveAlways', ${!c.liveAlways})">⏰ ${c.liveAlways ? W2("Raids open all day","Abiertas todo el día") : W2("Raids during class only","Solo en clase")}</button></div>
      <label class="cform">🎯 ${W2("Focus standard (double raid damage, shows on every student's to-do)","Estándar de enfoque (doble daño, aparece en el to-do)")}
        <select onchange="townSet('focusStd', this.value || null)"><option value="">${W2("— none —","— ninguno —")}</option>${Object.values(L2).sort((a, b) => a.info.key.localeCompare(b.info.key)).map(s => `<option value="${s.info.key}" ${c.focusStd === s.info.key ? "selected" : ""}>${E(s.info.code)} · ${E(s.info.topic.en)} (${s.items.length})</option>`).join("")}</select></label></section>
    <section class="panel tadm"><div class="eyebrow">🛂 ${W2("Standards: class mastery","Estándares: dominio de la clase")}</div><p class="muted" style="font-size:13px">${W2("From class practice and town questions (students with 3+ answers on a standard). Weakest first.","De la práctica y las preguntas del pueblo (alumnos con 3+ respuestas). Los más débiles primero.")}</p><div id="aStd"></div></section>
    <section class="panel tadm"><div class="eyebrow">⚖️ ${W2("Town Feud arguments","Argumentos de la disputa")}</div><div id="aFeud"></div></section>
    <section class="panel tadm"><div class="eyebrow">⭐ ${W2("Worker reviews","Reseñas de trabajadores")}</div><div id="aRev"></div></section>`; },
  after: c => { const cid = c.id;
    store().list(`classes/${cid}/pub`).then(rows => { const box = document.getElementById("aStd"); if (!box) return; const agg = {};
      (rows || []).forEach(p => Object.entries((p.live && p.live.std) || {}).forEach(([k, v]) => { const a = agg[k] = agg[k] || {n:0, sum:0, low:[]}; a.n++; a.sum += v; if (v < 60) a.low.push(p.name); }));
      const list = Object.entries(agg).map(([k, a]) => ({k, info:STDS() ? STDS().stdInfo(k) : {code:k, topic:{en:k}}, avg:Math.round(a.sum / a.n), n:a.n, low:a.low})).sort((a, b) => a.avg - b.avg);
      box.innerHTML = list.length ? `<table class="lvtab"><tr><th>${W2("Standard","Estándar")}</th><th>${W2("Avg","Prom.")}</th><th>${W2("Students","Alumnos")}</th><th>${W2("Below 60%","Bajo 60%")}</th><th></th></tr>${list.map(x => `<tr><td><b>${E(x.info.code)}</b> ${E(x.info.topic.en)}</td><td class="${x.avg < 60 ? "lvbad" : x.avg >= 80 ? "lvgood" : ""}">${x.avg}%</td><td>${x.n}</td><td><small>${E(x.low.slice(0, 6).join(", "))}${x.low.length > 6 ? "…" : ""}</small></td><td><button class="btn ghost" onclick="townSet('focusStd','${x.k}')">🎯</button></td></tr>`).join("")}</table>`
        : `<p class="muted" style="font-size:13px">${W2("No data yet. It fills in as students practice.","Aún no hay datos. Se llena cuando practican.")}</p>`; }).catch(() => {});
    T.viewSub(store().watch(`classes/${cid}/feud`, {}, rows => { const box = document.getElementById("aFeud"); if (!box || !rows) return;
      const now = rows.filter(r => r.week === week() && r.arg); box.innerHTML = now.map(r => `<div class="tdeal"><span><b>${E(r.name)}</b> (${r.side === 0 ? "A" : "B"}): “${E(r.arg)}”</span><button class="btn ghost" onclick="lvTDelArg('${r.id}')">🗑️</button></div>`).join("")
        || `<p class="muted" style="font-size:13px">${W2(`This week: “${feud(cid).q[0]}” No arguments yet.`, `Esta semana: “${feud(cid).q[1]}” Aún no hay argumentos.`)}</p>`; }));
    T.viewSub(store().watch(`classes/${cid}/reviews`, {}, rows => { const box = document.getElementById("aRev"); if (!box || !rows) return; const by = {};
      rows.forEach(r => { const a = by[r.worker] = by[r.worker] || {n:0, s:0, notes:[]}; a.n++; a.s += r.stars; if (r.note) a.notes.push(r); });
      const nm = c.staffNames || {}; box.innerHTML = Object.entries(by).map(([sid, a]) => `<div class="kapp"><b>${E(nm[sid] || sid)} · ${(a.s / a.n).toFixed(1)}★ (${a.n})</b>${a.notes.slice(-4).map(r => `<p>“${E(r.note)}” <button class="btn ghost" onclick="lvTDelRev('${r.id}')">🗑️</button></p>`).join("")}</div>`).join("")
        || `<p class="muted" style="font-size:13px">${W2("No reviews yet.","Aún no hay reseñas.")}</p>`; }));
  }
});
window.lvTDelArg = async id => { try { await store().set(`classes/${tc()}/feud/${id}`, {arg:"", argDel:true}, true); } catch(e){} };
window.lvTDelRev = async id => { try { await store().set(`classes/${tc()}/reviews/${id}`, {note:""}, true); } catch(e){} };
/* the board (projector): today's raid boss */
EXT.projector.push(cid => {
  const draw = () => { const host = document.getElementById("tProjX"); if (!host) return; let box = document.getElementById("lvProj");
    if (!box) { box = document.createElement("div"); box.id = "lvProj"; box.className = "lvproj"; host.parentNode.insertBefore(box, host); }
    const b = boss(cid), hp = raidHP(), dmg = Math.min(hp, raidDmg()), top = RAID.slice().sort((a, c) => (c.n | 0) - (a.n | 0)).slice(0, 3);
    box.innerHTML = `<span>${dmg >= hp ? "💥" : b.e}</span><div><b>${L(b.n)}</b> ${inPeriod() ? "● LIVE" : "💤"}${bar(dmg >= hp ? 1 : 1 - dmg / hp, dmg >= hp ? "#3BB273" : "#E5484D")}<small>❤️ ${Math.max(0, hp - dmg)}/${hp}${top.length ? " · " + top.map(r => `${E(r.name)} ${r.n | 0}`).join(" · ") : ""}</small></div>`; };
  T.viewSub(store().watch(`classes/${cid}/raid`, {where:[["day","==",day()]]}, rows => { if (rows) { RAID = rows; draw(); } }));
  store().list(`classes/${cid}/pub`).then(r => { ROSTER = (r || []).length; draw(); }).catch(() => {});
  const iv = setInterval(draw, 4000); setTimeout(draw, 300); T.viewSub(() => clearInterval(iv));
});

window.LIVE = {record:(q, ok, src) => onAnswer(q, ok, src || "x"), qRun, inPeriod, mastery, matches, letter, LETTERS, boss, feud, FEUDS, stdKeyOf:q => q && q.std, pickItems};
})();
