/* =============================================================================
   SMITHTOPIA — Justice Center: laws, marshals, jail, court and break-ins (town/justice.js, 3.2 phase 3)
   Map → ⚖️ Justice Center.
   1. Town Code: fun laws the teacher switches on (pay your bills, feed your
      animals, Hat Fridays, no jaywalking…). Each has a fine.
   2. Marshals patrol: they see classmates flagged for late bills or hungry
      animals, write citations with a reason, and can arrest anyone with 3 unpaid
      citations or a break-in report against them.
   3. Jail: a short sentence (max 15 min). Jailed students can't play games or
      break in; they serve time faster by answering questions (−1 min each).
   4. Court: sue a classmate (up to 💵20). The defendant settles for half or goes
      to trial. Each side may hire a classmate as a lawyer, makes a one-line
      argument and answers 5 questions (case strength). Three classmates sit on
      the jury and vote. Loser pays; lawyers get 💵3, jurors 💵1.
   5. Break-ins (teacher must switch on): once a day, answer 5 questions in 75 s;
      4 right (5 with a lock) takes 10% of the target's cash, max 💵10. Fail and
      you're caught: an automatic fine and a jail sentence. Success leaves a
      report marshals can act on for 24 hours.
   Firestore: classes/{cid}/citations, jail, suits, breakins.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN, W = window.WORLD2; if (!T || !T.CIV || !W) return;
const {EXT} = T, V = T.CIV;
const {civ, sheet, closeSheet, day, week, E, W2, C, store, SESS, CLS} = V;
const L = a => S.lang === "es" ? a[1] : a[0];
const me = () => SESS() && SESS().sid, myName = () => SESS() && SESS().name;
const MIN = 6e4, H = 36e5;

const LAWS = {
  bills:  {e:"📬", fine:3, auto:true, l:["Pay your bills on time","Paga tus facturas a tiempo"]},
  farm:   {e:"🐔", fine:2, auto:true, l:["Feed your farm animals every day","Alimenta a tus animales cada día"]},
  hat:    {e:"🎩", fine:1, l:["Hat Fridays: wear a hat on Fridays","Viernes de sombrero"]},
  jaywalk:{e:"🚸", fine:1, l:["No jaywalking downtown","No cruzar fuera del paso peatonal"]},
  grass:  {e:"🌱", fine:1, l:["Keep off the Town Hall grass","No pisar el césped del Ayuntamiento"]},
  litter: {e:"🗑️", fine:2, l:["No littering on the plaza","No tirar basura en la plaza"]},
  noise:  {e:"📢", fine:2, l:["Quiet hours: no shouting in chat","Horas de silencio: no gritar en el chat"]},
  fair:   {e:"🤝", fine:4, l:["Fair trades only: no tricking classmates","Intercambios justos"]},
  pets:   {e:"🐕", fine:1, l:["Pets on a leash in public","Mascotas con correa en público"]},
  breakin:{e:"🔓", fine:8, auto:true, l:["No breaking and entering","Prohibido allanar"]}
};
const DEFAULT_LAWS = ["bills","farm","hat","jaywalk","litter","fair","breakin"];
const SUIT_WHY = {trade:["A trade went wrong","Un intercambio salió mal"], debt:["They owe me Smithbucks","Me deben Smithbucks"], damage:["They damaged my stuff","Dañaron mis cosas"], breakin:["They broke into my house","Entraron a mi casa"], contract:["They broke a job deal","Rompieron un trato de trabajo"]};
const J = () => CLS().justice || {};
const lawsOn = () => (J().laws || DEFAULT_LAWS).filter(k => LAWS[k]);
const breakinsOn = () => J().breakins === true, jailOn = () => J().jail !== false;
const marshals = () => (CLS().staff || {}).marshal || [], judges = () => (CLS().staff || {}).judge || [];
const isMarshal = () => marshals().includes(me()), isJudge = () => judges().includes(me());
const pubName = sid => ((T.pub || {})[sid] || {}).name || "?";

let CITES = [], JAIL = [], SUITS = [], BREAKS = [], SUBS = [];
const stop = () => { SUBS.forEach(u => { try { u(); } catch(e){} }); SUBS = []; };
const redraw = () => { if (T.isTown() && T.tt === "map" && window._jusOpen) T.paintSub(); };
function watch(){ stop(); if (!SESS()) return;
  SUBS.push(store().watch(`${C()}/citations`, {}, rows => { if (!rows) return; CITES = rows; settleCites(); redraw(); }));
  SUBS.push(store().watch(`${C()}/jail`, {}, rows => { if (!rows) return; const was = myJail(); JAIL = rows; jailNotice(was); redraw(); }));
  SUBS.push(store().watch(`${C()}/suits`, {}, rows => { if (!rows) return; SUITS = rows; settleSuits(); redraw(); }));
  SUBS.push(store().watch(`${C()}/breakins`, {where:[["week","==",week()]]}, rows => { if (!rows) return; BREAKS = rows; settleBreaks(); redraw(); })); }
EXT.onSession.push(() => setTimeout(watch, 1000)); EXT.onLeave.push(stop);

/* ---------------------------------------------------------------- jail */
const myJail = () => JAIL.find(j => j.sid === me() && j.until > Date.now()) || null;
window.TOWN_JAILED = () => !!myJail();
const jailBlock = () => { if (!myJail()) return false; T.toast(W2("🔒 You're in jail. Serve your time first (Justice Center).","🔒 Estás en la cárcel. Cumple tu tiempo primero.")); return true; };
function jailNotice(was){ const j = myJail(); if (j && !was) T.toast(W2(`🚓 You've been arrested by ${j.byName || "the Marshal"}: ${j.why}. Answer questions to get out sooner!`, `🚓 Te arrestó ${j.byName || "el alguacil"}: ${j.why}. ¡Responde preguntas para salir antes!`)); }
async function arrest(sid, why, mins, self){ if (!jailOn()) return T.toast(W2("The teacher has jail turned off.","El docente desactivó la cárcel."));
  mins = Math.min(15, Math.max(3, mins | 0));
  await store().set(`${C()}/jail/${sid}`, {sid, name:self ? myName() : pubName(sid), until:Date.now() + mins * MIN, why, by:self ? "" : me(), byName:self ? "" : myName(), self:!!self, served:0, at:Date.now()}); }
window.jsServe = function(){ const j = myJail(); if (!j) return;
  W.ask({title:W2("Serve time: −1 minute per right answer","Cumple tu condena: −1 minuto por respuesta correcta"), e:"🔒"}, async ok => { closeSheet(); const jj = myJail(); if (!jj) return;
    if (ok) { await store().update(`${C()}/jail/${me()}`, {until:Math.max(Date.now() - 1, jj.until - MIN), served:(jj.served | 0) + 1}).catch(() => {}); T.toast(W2("⏱️ One minute off your sentence.","⏱️ Un minuto menos.")); }
    else T.toast(W2("Not quite. Try another!","Casi. ¡Intenta otra!")); }); };

/* ---------------------------------------------------------------- citations */
const openCites = sid => CITES.filter(c => c.to === sid && c.status === "open");
window.jsCite = function(sid, law){ if (!isMarshal()) return;
  const flag = law ? `<input type="hidden" id="jsLaw" value="${law}">` : `<label class="cform">${W2("Law broken","Ley violada")}<select id="jsLaw">${lawsOn().filter(k => k !== "breakin").map(k => `<option value="${k}">${LAWS[k].e} ${E(L(LAWS[k].l))} (💵${LAWS[k].fine})</option>`).join("")}</select></label>`;
  sheet(`<div class="eyebrow">🚓 ${W2("Write a citation","Escribir una multa")}: ${E(pubName(sid))}</div>${flag}
    <label class="cform">${W2("What happened? (one sentence)","¿Qué pasó? (una oración)")}<input id="jsWhy" maxlength="120"></label><p id="jsErr" class="err"></p>
    <button class="btn primary wide" onclick="jsCiteGo('${sid}')">${W2("Issue citation","Emitir multa")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`); };
window.jsCiteGo = async function(sid){ const law = document.getElementById("jsLaw").value, why = (document.getElementById("jsWhy").value || "").trim(), err = document.getElementById("jsErr");
  if (why.length < 6) { err.textContent = W2("Write what happened.","Escribe lo que pasó."); return; }
  if (window.badShow && window.badShow(err, [why], "citation")) return;
  try { await store().add(`${C()}/citations`, {to:sid, toName:pubName(sid), by:me(), byName:myName(), law, why, fine:LAWS[law].fine, status:"open", week:week(), at:Date.now(), upd:Date.now()});
    closeSheet(); T.toast(W2(`🚓 Citation issued to ${pubName(sid)}.`, `🚓 Multa emitida a ${pubName(sid)}.`)); if (T.CAR) T.CAR.payCase("cite"); }
  catch(e){ console.warn(e); err.textContent = W2("Only marshals can write citations.","Solo los alguaciles pueden multar."); } };
window.jsPay = async function(id){ const c = CITES.find(x => x.id === id); if (!c || c.status !== "open") return;
  if ((S.tokens | 0) < c.fine) return T.toast(W2(`You need 💵${c.fine}.`, `Necesitas 💵${c.fine}.`));
  await store().update(`${C()}/citations/${id}`, {status:"paid", upd:Date.now()}); T.once("cite:" + id, () => T.coins(-c.fine)); T.persist();
  T.toast(W2(`✅ Paid your 💵${c.fine} fine.`, `✅ Pagaste tu multa de 💵${c.fine}.`)); };
window.jsContest = async function(id){ await store().update(`${C()}/citations/${id}`, {status:"contested", upd:Date.now()}).catch(() => {}); T.toast(W2("⚖️ Contested. The judge (or Coach Smith) will decide.","⚖️ Impugnada. El juez decidirá.")); };
window.jsRule = async function(id, uphold){ await store().update(`${C()}/citations/${id}`, {status:uphold ? "open" : "dismissed", ruled:uphold ? "upheld" : "dismissed", ruledBy:myName() || "Coach Smith", upd:Date.now()}).catch(() => {});
  if (isJudge() && T.CAR) T.CAR.payCase("rule"); T.toast(uphold ? W2("Citation upheld: the fine stands.","Multa confirmada.") : W2("Citation dismissed.","Multa anulada.")); };
window.jsDismiss = id => store().update(`${C()}/citations/${id}`, {status:"dismissed", upd:Date.now()}).catch(() => {});
function settleCites(){ let ch = false;
  CITES.filter(c => c.to === me() && c.status === "open").forEach(c => { ch = T.once("citen:" + c.id, () => T.toast(W2(`🚓 You got a citation: ${L(LAWS[c.law].l)} (💵${c.fine}). Pay or contest it at the Justice Center.`, `🚓 Te multaron: ${L(LAWS[c.law].l)} (💵${c.fine}).`))) || ch; });
  CITES.filter(c => c.by === me() && c.status === "paid").forEach(c => { ch = T.once("citepaid:" + c.id, () => { T.coins(1); T.toast(W2(`🚓 ${c.toName} paid their fine. +1 for the Marshal's office.`, `🚓 ${c.toName} pagó su multa. +1.`)); }) || ch; });
  if (ch) T.persist(); }
window.jsArrest = async function(sid, why){ if (!isMarshal()) return; try { await arrest(sid, why, 10); T.toast(W2(`🚓 ${pubName(sid)} is in jail for up to 10 minutes.`, `🚓 ${pubName(sid)} está en la cárcel.`)); if (T.CAR) T.CAR.payCase("arrest"); } catch(e){ T.toast(W2("Couldn't arrest.","No se pudo arrestar.")); } };
window.jsRelease = sid => store().update(`${C()}/jail/${sid}`, {until:Date.now() - 1}).catch(() => {});

/* ---------------------------------------------------------------- court */
window.jsSue = function(){ const pubs = Object.entries(T.pub || {}).filter(([sid, p]) => sid !== me() && p.name);
  sheet(`<div class="eyebrow">⚖️ ${W2("File a lawsuit","Presentar una demanda")} · ${W2("filing fee 💵1","cuota 💵1")}</div>
    <label class="cform">${W2("Who are you suing?","¿A quién demandas?")}<select id="jsWho">${pubs.map(([sid, p]) => `<option value="${sid}">${E(p.name)}</option>`).join("")}</select></label>
    <label class="cform">${W2("Why?","¿Por qué?")}<select id="jsKind">${Object.entries(SUIT_WHY).map(([k, l]) => `<option value="${k}">${E(L(l))}</option>`).join("")}</select></label>
    <label class="cform">${W2("Tell the court what happened","Cuéntale al tribunal qué pasó")}<input id="jsWhy" maxlength="140"></label>
    <label class="cform">${W2("Damages you ask for (💵1–20)","Daños que pides (💵1–20)")}<input id="jsAmt" type="number" min="1" max="20" value="5"></label><p id="jsErr" class="err"></p>
    <button class="btn primary wide" onclick="jsSueGo()">${W2("File the case","Presentar")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`); };
window.jsSueGo = async function(){ const b = document.getElementById("jsWho").value, kind = document.getElementById("jsKind").value, why = (document.getElementById("jsWhy").value || "").trim(),
    amt = Math.max(1, Math.min(20, parseInt(document.getElementById("jsAmt").value, 10) || 0)), err = document.getElementById("jsErr");
  if (!b) return; if (why.length < 8) { err.textContent = W2("Explain what happened.","Explica lo que pasó."); return; }
  if (window.badShow && window.badShow(err, [why], "lawsuit")) return;
  if ((S.tokens | 0) < 1) { err.textContent = W2("You need 💵1 for the filing fee.","Necesitas 💵1."); return; }
  if (SUITS.some(s => s.a === me() && s.b === b && ["filed","trial"].includes(s.status))) { err.textContent = W2("You already have an open case against them.","Ya tienes un caso abierto contra esa persona."); return; }
  try { await store().add(`${C()}/suits`, {a:me(), aName:myName(), b, bName:pubName(b), kind, why, amt, status:"filed", la:"", laName:"", lb:"", lbName:"", sa:-1, sb:-1, ta:"", tb:"", jury:{}, winner:"", at:Date.now(), upd:Date.now()});
    T.coins(-1); T.persist(); closeSheet(); T.toast(W2(`⚖️ Case filed: ${myName()} v. ${pubName(b)}.`, `⚖️ Caso presentado: ${myName()} c. ${pubName(b)}.`)); } catch(e){ err.textContent = W2("Couldn't file.","No se pudo presentar."); } };
const sideOf = s => s.a === me() ? "a" : s.b === me() ? "b" : s.la === me() ? "a" : s.lb === me() ? "b" : null;
const upd = (id, d) => store().update(`${C()}/suits/${id}`, {...d, upd:Date.now()});
window.jsSettle = async id => { const s = SUITS.find(x => x.id === id); if (!s || s.b !== me() || s.status !== "filed") return; const half = Math.ceil(s.amt / 2);
  if ((S.tokens | 0) < half) return T.toast(W2(`Settling costs 💵${half}.`, `Llegar a un acuerdo cuesta 💵${half}.`)); await upd(id, {status:"settled", winner:"a"}); };
window.jsTrial = id => upd(id, {status:"trial"});
window.jsDrop = id => upd(id, {status:"dropped"});
window.jsLawyer = function(id){ const s = SUITS.find(x => x.id === id), side = s.a === me() ? "a" : "b"; const busy = [s.a, s.b, s.la, s.lb, ...Object.keys(s.jury || {})];
  const pubs = Object.entries(T.pub || {}).filter(([sid, p]) => p.name && !busy.includes(sid));
  sheet(`<div class="eyebrow">👔 ${W2("Hire a lawyer (💵3 at the end of the trial)","Contratar abogado (💵3 al final)")}</div>
    <p class="muted" style="margin-top:0">${W2("Your lawyer can make your argument and answer the 5 questions for your side.","Tu abogado puede presentar tu argumento y responder las 5 preguntas.")}</p>
    <label class="cform">${W2("Lawyer","Abogado")}<select id="jsL">${pubs.map(([sid, p]) => `<option value="${sid}">${E(p.name)}</option>`).join("")}</select></label>
    <button class="btn primary wide" onclick="jsLawyerGo('${id}','${side}')">${W2("Hire","Contratar")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`); };
window.jsLawyerGo = async (id, side) => { const sid = document.getElementById("jsL").value; if (!sid) return; closeSheet(); await upd(id, {["l" + side]:sid, ["l" + side + "Name"]:pubName(sid)}); T.toast(W2(`👔 ${pubName(sid)} is your lawyer.`, `👔 ${pubName(sid)} es tu abogado.`)); };
window.jsArgue = function(id){ const s = SUITS.find(x => x.id === id), side = sideOf(s); if (!side || s["s" + side] >= 0) return;
  sheet(`<div class="eyebrow">🗣️ ${W2("Make your case","Presenta tu caso")}: ${E(s.aName)} v. ${E(s.bName)}</div>
    <label class="cform">${W2("Your argument to the jury (one or two sentences)","Tu argumento para el jurado")}<input id="jsArg" maxlength="160"></label><p id="jsErr" class="err"></p>
    <p class="muted" style="font-size:13px">${W2("Then answer 5 questions. Each right answer makes your case stronger. The jury sees both arguments and both scores.","Luego responde 5 preguntas. Cada acierto fortalece tu caso.")}</p>
    <button class="btn primary wide" onclick="jsArgueGo('${id}')">${W2("Start","Empezar")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`); };
window.jsArgueGo = function(id){ const s = SUITS.find(x => x.id === id), side = sideOf(s), arg = (document.getElementById("jsArg").value || "").trim(), err = document.getElementById("jsErr");
  if (arg.length < 8) { err.textContent = W2("Write your argument.","Escribe tu argumento."); return; }
  if (window.badShow && window.badShow(err, [arg], "court argument")) return; closeSheet();
  LIVE.qRun({items:LIVE.pickItems(5, {subj:"gov"}), title:W2("Case strength: 5 questions","Fuerza del caso: 5 preguntas"), e:"⚖️", sub:`${s.aName} v. ${s.bName}`}, async right => {
    await upd(id, {["s" + side]:right, ["t" + side]:arg}); T.toast(W2(`⚖️ Case strength ${right}/5. Now the jury decides.`, `⚖️ Fuerza ${right}/5. Ahora decide el jurado.`)); }); };
window.jsJury = async id => { const s = SUITS.find(x => x.id === id); if (!s || Object.keys(s.jury || {}).length >= 3) return; await upd(id, {jury:{...(s.jury || {}), [me()]:""}}); T.toast(W2("🗳️ You're on the jury. Vote once both sides make their case.","🗳️ Eres jurado. Vota cuando ambas partes presenten.")); };
window.jsVote = async (id, v) => { const s = SUITS.find(x => x.id === id); if (!s) return; const jury = {...(s.jury || {}), [me()]:v}; const votes = Object.values(jury).filter(Boolean);
  const d = {jury}; if (votes.length >= 3) { d.status = "verdict"; d.winner = votes.filter(x => x === "a").length >= 2 ? "a" : "b"; } await upd(id, d); T.toast(W2("🗳️ Vote recorded. Thank you for serving!","🗳️ Voto registrado. ¡Gracias por servir!")); };
window.jsVoid = id => upd(id, {status:"dropped", voided:true});
/* each person pays and collects their own Smithbucks, once */
function settleSuits(){ let ch = false; const o = (k, f) => { ch = T.once(k, f) || ch; };
  SUITS.forEach(s => { const id = s.id, half = Math.ceil(s.amt / 2);
    if (s.b === me() && s.status === "filed") o("suitn:" + id, () => T.toast(W2(`⚖️ ${s.aName} is suing you for 💵${s.amt}: ${s.why}. Settle or go to trial (Justice Center).`, `⚖️ ${s.aName} te demanda por 💵${s.amt}.`)));
    if ((s.la === me() || s.lb === me()) && ["filed","trial"].includes(s.status)) o("suitl:" + id + me(), () => T.toast(W2(`👔 You were hired as a lawyer in ${s.aName} v. ${s.bName}.`, `👔 Te contrataron como abogado en ${s.aName} c. ${s.bName}.`)));
    if (s.status === "settled") { if (s.b === me()) o("suitpay:" + id, () => T.coins(-half)); if (s.a === me()) o("suitget:" + id, () => { T.coins(half); T.toast(W2(`🤝 ${s.bName} settled: +💵${half}.`, `🤝 ${s.bName} llegó a un acuerdo: +💵${half}.`)); }); }
    if (s.status === "verdict") { const win = s.winner === "a" ? s.a : s.b, lose = s.winner === "a" ? s.b : s.a;
      if (win === me()) o("suitwin:" + id, () => { T.coins(s.amt); T.toast(W2(`🏛️ The jury ruled for you! +💵${s.amt}.`, `🏛️ ¡El jurado falló a tu favor! +💵${s.amt}.`)); if (typeof fireConfetti === "function") fireConfetti(); });
      if (lose === me()) o("suitlose:" + id, () => { T.coins(-s.amt); T.toast(W2(`🏛️ The jury ruled against you: −💵${s.amt}.`, `🏛️ El jurado falló en tu contra: −💵${s.amt}.`)); });
      if (s.a === me() && s.la) o("suitfeeA:" + id, () => T.coins(-3)); if (s.b === me() && s.lb) o("suitfeeB:" + id, () => T.coins(-3));
      if (s.la === me() || s.lb === me()) o("suitlaw:" + id + me(), () => { T.coins(3); T.toast(W2("👔 Lawyer's fee: +💵3.","👔 Honorarios: +💵3.")); });
      if ((s.jury || {})[me()]) o("suitjury:" + id, () => { T.coins(1); T.toast(W2("🗳️ Jury duty pay: +💵1.","🗳️ Pago por jurado: +💵1.")); });
      if (isJudge()) o("suitjudge:" + id, () => T.CAR && T.CAR.payCase("trial")); } });
  if (ch) T.persist(); }

/* ---------------------------------------------------------------- break-ins */
const brokeToday = () => BREAKS.some(b => b.by === me() && b.day === day());
window.jsBreak = function(sid){ if (!breakinsOn() || jailBlock()) return;
  if (brokeToday()) return T.toast(W2("One attempt a day. Lie low until tomorrow.","Un intento al día. Espera a mañana."));
  if (BREAKS.some(b => b.by === me() && b.to === sid)) return T.toast(W2("You already tried their house this week.","Ya intentaste esa casa esta semana."));
  const lock = ((T.pub || {})[sid] || {}).lock, need = lock ? 5 : 4;
  sheet(`<div class="eyebrow">🔓 ${W2("Break in","Allanar")}: ${E(pubName(sid))}'s ${W2("house","casa")}${lock ? " 🔐" : ""}</div>
    <p>${W2(`Answer ${need} of 5 questions right in 75 seconds to pick the lock and take 10% of their cash (max 💵10).`, `Responde ${need} de 5 bien en 75 segundos para llevarte 10% de su efectivo (máx. 💵10).`)}</p>
    <p class="err">${W2(`Fail and you're caught: a 💵${LAWS.breakin.fine} fine and up to 10 minutes in jail. Succeed and the marshals get a report for 24 hours.`, `Si fallas te atrapan: multa de 💵${LAWS.breakin.fine} y hasta 10 minutos de cárcel.`)}</p>
    <button class="btn primary wide" onclick="jsBreakGo('${sid}',${need})">${W2("Try it","Intentarlo")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Walk away","Alejarse")}</button>`); };
window.jsBreakGo = function(sid, need){ closeSheet();
  LIVE.qRun({items:LIVE.pickItems(5), title:W2("Picking the lock…","Forzando la cerradura…"), e:"🔓", sub:pubName(sid)}, async (right, ms) => {
    const ok = right >= need && ms <= 75e3, target = (T.pub || {})[sid] || {}, take = ok ? Math.max(1, Math.min(10, Math.floor((target.cash | 0) * 0.1))) : 0;
    try { await store().set(`${C()}/breakins/${day()}_${me()}`, {by:me(), byName:myName(), to:sid, toName:pubName(sid), ok, take, right, day:day(), week:week(), at:Date.now()}); } catch(e){ return T.toast(W2("Break-ins are off right now.","Los allanamientos están desactivados.")); }
    if (ok) { T.coins(take); T.persist(); T.toast(W2(`💰 You got in and took 💵${take}. The marshals have 24 hours to catch you…`, `💰 Entraste y te llevaste 💵${take}. Los alguaciles tienen 24 horas…`)); }
    else { T.coins(-Math.min(S.tokens | 0, LAWS.breakin.fine)); T.persist(); await arrest(me(), W2("caught breaking in","atrapado allanando"), 10, true).catch(() => {});
      T.toast(W2(`🚨 Caught! ${right}/5${ms > 75e3 ? " (too slow)" : ""}. 💵${LAWS.breakin.fine} fine and jail.`, `🚨 ¡Atrapado! ${right}/5. Multa de 💵${LAWS.breakin.fine} y cárcel.`)); } }); };
window.jsLock = function(){ if (civ().lock) return; if ((S.tokens | 0) < 5) return T.toast(W2("A lock costs 💵5.","Una cerradura cuesta 💵5."));
  T.coins(-5); civ().lock = true; T.persist(); T.toast(W2("🔐 New lock installed. Burglars now need 5 out of 5.","🔐 Cerradura instalada. Ahora necesitan 5 de 5.")); };
function settleBreaks(){ let ch = false;
  BREAKS.filter(b => b.to === me() && b.ok).forEach(b => { ch = T.once("robbed:" + b.id, () => { T.coins(-Math.min(S.tokens | 0, b.take)); T.toast(W2(`🚨 Your house was broken into! −💵${b.take}. Tell a Marshal, or sue at the Justice Center.`, `🚨 ¡Entraron a tu casa! −💵${b.take}. Avisa al alguacil o demanda.`)); }) || ch; });
  BREAKS.filter(b => b.to === me() && !b.ok).forEach(b => { ch = T.once("alarm:" + b.id, () => T.toast(W2(`🔔 Your alarm stopped a break-in by ${b.byName}.`, `🔔 Tu alarma detuvo un allanamiento de ${b.byName}.`))) || ch; });
  if (ch) T.persist(); }
EXT.pubExtra.push(() => { const e = window.ECON && window.ECON.ec ? window.ECON.ec() : null, late = e && e.bills ? e.bills.items.filter(b => b.k === "late" && !b.paid).length : 0;
  const F = window.FARM, p = F && F.myPlot(), f = p && F.farms[p], hungry = !!(f && Object.keys(f.ani || {}).length && f.fed && (new Date(day()) - new Date(f.fed)) / 864e5 >= 2);
  return {lock:!!civ().lock, cash:S.tokens | 0, flags:{bills:late, farm:hungry}}; });

/* ---------------------------------------------------------------- screens */
let JV = "law";
window.jsView = v => { JV = v; window._tfresh = Date.now(); T.paintSub(); };
const cite = (c, mine) => `<div class="ebill"><span>${LAWS[c.law] ? LAWS[c.law].e : "📜"} <b>${E(mine ? L(LAWS[c.law].l) : c.toName)}</b> <small class="muted">${mine ? "" : E(L(LAWS[c.law].l)) + " · "}${E(c.why)} · ${W2("by","por")} ${E(c.byName)}</small></span><b>💵${c.fine}</b>
  ${mine && c.status === "open" ? `<button class="btn primary" onclick="jsPay('${c.id}')">${W2("Pay","Pagar")}</button>${c.ruled ? "" : `<button class="btn" onclick="jsContest('${c.id}')">${W2("Contest","Impugnar")}</button>`}` : `<small>${c.status === "open" ? W2("unpaid","sin pagar") : c.status === "paid" ? "✅" : c.status === "contested" ? "⚖️" : W2("dismissed","anulada")}</small>`}
  ${c.status === "contested" && isJudge() && c.to !== me() ? `<button class="btn" onclick="jsRule('${c.id}',true)">${W2("Uphold","Confirmar")}</button><button class="btn" onclick="jsRule('${c.id}',false)">${W2("Dismiss","Anular")}</button>` : ""}</div>`;
function suitCard(s){ const side = sideOf(s), juror = (s.jury || {})[me()] !== undefined, nj = Object.keys(s.jury || {}).length, st = {filed:W2("filed","presentado"), trial:W2("on trial","en juicio"), settled:W2("settled","acuerdo"), verdict:W2("verdict","veredicto"), dropped:W2("dropped","retirado")}[s.status];
  const parties = !side ? "" : "";
  let act = "";
  if (s.status === "filed" && s.b === me()) act = `<button class="btn" onclick="jsSettle('${s.id}')">🤝 ${W2(`Settle (💵${Math.ceil(s.amt / 2)})`, `Acuerdo (💵${Math.ceil(s.amt / 2)})`)}</button><button class="btn primary" onclick="jsTrial('${s.id}')">⚖️ ${W2("Go to trial","Ir a juicio")}</button>`;
  if (s.status === "filed" && s.a === me()) act = `<button class="btn ghost" onclick="jsDrop('${s.id}')">${W2("Drop the case","Retirar")}</button>`;
  if (s.status === "trial") { if ((s.a === me() && !s.la) || (s.b === me() && !s.lb)) act += `<button class="btn" onclick="jsLawyer('${s.id}')">👔 ${W2("Hire a lawyer","Contratar abogado")}</button>`;
    if (side && s["s" + side] < 0) act += `<button class="btn primary" onclick="jsArgue('${s.id}')">🗣️ ${W2("Make your case","Presentar caso")}</button>`;
    if (!side && !juror && nj < 3) act += `<button class="btn" onclick="jsJury('${s.id}')">🗳️ ${W2("Serve on the jury (+💵1)","Ser jurado (+💵1)")}</button>`;
    if (juror && !(s.jury || {})[me()]) act += s.sa >= 0 && s.sb >= 0 ? `<button class="btn primary" onclick="jsVote('${s.id}','a')">${W2("For","A favor de")} ${E(s.aName)}</button><button class="btn primary" onclick="jsVote('${s.id}','b')">${W2("For","A favor de")} ${E(s.bName)}</button>` : `<small class="muted">${W2("Waiting for both sides to make their case…","Esperando a que ambas partes presenten…")}</small>`; }
  const args = s.status === "trial" || s.status === "verdict" ? `<div class="jsargs"><div><b>${E(s.aName)}${s.laName ? ` <small>👔 ${E(s.laName)}</small>` : ""}</b><p>${s.ta ? "“" + E(s.ta) + "”" : "…"}</p><small>${s.sa >= 0 ? W2(`strength ${s.sa}/5`, `fuerza ${s.sa}/5`) : ""}</small></div>
      <div><b>${E(s.bName)}${s.lbName ? ` <small>👔 ${E(s.lbName)}</small>` : ""}</b><p>${s.tb ? "“" + E(s.tb) + "”" : "…"}</p><small>${s.sb >= 0 ? W2(`strength ${s.sb}/5`, `fuerza ${s.sb}/5`) : ""}</small></div></div>
      <small class="muted">🗳️ ${W2("Jury","Jurado")}: ${nj}/3${s.status === "verdict" ? ` · ${W2("ruled for","falló a favor de")} <b>${E(s.winner === "a" ? s.aName : s.bName)}</b>` : ""}</small>` : "";
  return `<section class="panel jssuit"><div class="eyebrow">⚖️ ${E(s.aName)} v. ${E(s.bName)} · 💵${s.amt} · ${st}</div><p style="margin:4px 0">${E(L(SUIT_WHY[s.kind] || ["",""]))}: ${E(s.why)}</p>${args}<div class="eprow">${act}</div>${parties}</section>`; }
function paintJustice(el, back){ window._jusOpen = true; const j = myJail();
  const nav = [["law","📜",W2("Town Code","Código")],["court","⚖️",W2("Court","Tribunal")],["jail","🔒",W2("Jail","Cárcel")]];
  if (isMarshal()) nav.splice(1, 0, ["patrol","🚓",W2("Patrol","Patrulla")]);
  if (breakinsOn()) nav.push(["break","🔓",W2("Break-ins","Allanamientos")]);
  let body = "";
  if (JV === "patrol" && isMarshal()) { const pubs = Object.entries(T.pub || {}).filter(([sid, p]) => sid !== me() && p.name);
    const flagged = pubs.filter(([sid, p]) => (p.flags && ((p.flags.bills && lawsOn().includes("bills")) || (p.flags.farm && lawsOn().includes("farm")))) );
    const reports = BREAKS.filter(b => b.ok && Date.now() - b.at < 24 * H && !JAIL.some(x => x.sid === b.by && x.at > b.at));
    body = `<section class="panel"><div class="eyebrow">🚨 ${W2("Break-in reports (24 h)","Reportes de allanamiento (24 h)")}</div>${reports.map(b => `<div class="ebill"><span>🔓 <b>${E(b.byName)}</b> ${W2("broke into","entró a")} ${E(b.toName)}'s ${W2("house","casa")}</span><button class="btn primary" onclick="jsArrest('${b.by}','${W2("break-in","allanamiento")}')">🚓 ${W2("Arrest","Arrestar")}</button></div>`).join("") || `<p class="muted">${W2("No reports.","Sin reportes.")}</p>`}</section>
      <section class="panel"><div class="eyebrow">🔎 ${W2("Flagged by the town's records","Señalados por los registros")}</div>${flagged.map(([sid, p]) => `<div class="ebill"><span><b>${E(p.name)}</b> <small class="muted">${[p.flags.bills ? W2(`${p.flags.bills} late bill(s)`, `${p.flags.bills} factura(s) atrasada(s)`) : "", p.flags.farm ? W2("hungry farm animals","animales con hambre") : ""].filter(Boolean).join(" · ")}</small></span>
        ${p.flags.bills ? `<button class="btn" onclick="jsCite('${sid}','bills')">📬 ${W2("Cite","Multar")}</button>` : ""}${p.flags.farm ? `<button class="btn" onclick="jsCite('${sid}','farm')">🐔 ${W2("Cite","Multar")}</button>` : ""}</div>`).join("") || `<p class="muted">${W2("Nobody flagged right now.","Nadie señalado.")}</p>`}</section>
      <section class="panel"><div class="eyebrow">🚓 ${W2("Everyone","Todos")}</div>${pubs.map(([sid, p]) => { const n = openCites(sid).length; return `<div class="ebill"><span><b>${E(p.name)}</b>${n ? ` <small class="dn">${n} ${W2("unpaid","sin pagar")}</small>` : ""}</span><button class="btn" onclick="jsCite('${sid}')">${W2("Write citation","Multar")}</button>${n >= 3 ? `<button class="btn primary" onclick="jsArrest('${sid}','${W2("3 unpaid citations","3 multas sin pagar")}')">🚓 ${W2("Arrest","Arrestar")}</button>` : ""}</div>`; }).join("")}</section>`; }
  else if (JV === "court") { const mine = SUITS.filter(s => [s.a, s.b, s.la, s.lb].includes(me()) || (s.jury || {})[me()] !== undefined).filter(s => s.status !== "dropped");
    const docket = SUITS.filter(s => s.status === "trial" && !mine.includes(s));
    body = `<section class="panel"><div class="eyebrow">⚖️ ${W2("Smithtopia Court","Tribunal de Smithtopia")}</div><p class="muted" style="margin-top:0">${W2("Sue a classmate for up to 💵20. They can settle for half or take it to a jury of three classmates. Each side answers 5 questions to show how strong its case is.","Demanda hasta por 💵20. Pueden llegar a un acuerdo por la mitad o ir a un jurado de tres compañeros.")}</p>
      <button class="btn primary" onclick="jsSue()">📝 ${W2("File a lawsuit","Presentar demanda")}</button></section>${mine.map(suitCard).join("")}
      ${docket.length ? `<div class="eyebrow" style="margin:12px 4px 6px">📋 ${W2("Today's docket: juries needed","Casos del día: se necesitan jurados")}</div>${docket.map(suitCard).join("")}` : ""}
      ${SUITS.filter(s => s.status === "contested").length ? "" : ""}
      ${isJudge() ? `<section class="panel"><div class="eyebrow">👩‍⚖️ ${W2("Contested citations","Multas impugnadas")}</div>${CITES.filter(c => c.status === "contested").map(c => cite(c, false)).join("") || `<p class="muted">${W2("None.","Ninguna.")}</p>`}</section>` : ""}`; }
  else if (JV === "jail") { const inmates = JAIL.filter(x => x.until > Date.now());
    body = (j ? `<section class="panel raised jscell"><div class="eyebrow">🔒 ${W2("You're in jail","Estás en la cárcel")}</div><h2>${Math.ceil((j.until - Date.now()) / MIN)} ${W2("min left","min restantes")}</h2><p>${E(j.why)}${j.byName ? ` · ${W2("arrested by","arrestado por")} ${E(j.byName)}` : ""}</p>
        <button class="btn primary wide" onclick="jsServe()">✏️ ${W2("Answer a question: −1 minute","Responde una pregunta: −1 minuto")}</button></section>` : "")
      + `<section class="panel"><div class="eyebrow">🔒 ${W2("Town jail","Cárcel")}</div>${inmates.map(x => `<div class="ebill"><span>🔒 <b>${E(x.name)}</b> <small class="muted">${E(x.why)}</small></span><small>${Math.ceil((x.until - Date.now()) / MIN)} min</small></div>`).join("") || `<p class="muted">${W2("Empty. Smithtopia is law-abiding today!","Vacía. ¡Hoy todos cumplen la ley!")}</p>`}</section>`; }
  else if (JV === "break" && breakinsOn()) { const pubs = Object.entries(T.pub || {}).filter(([sid, p]) => sid !== me() && p.name);
    body = `<section class="panel"><div class="eyebrow">🔓 ${W2("Break-ins: one try a day","Allanamientos: un intento al día")}</div><p class="muted" style="margin-top:0">${W2("Crime has consequences: fail and you pay a fine and go to jail. Succeed and marshals can still arrest you, and your classmate can sue you.","El crimen tiene consecuencias: si fallas pagas multa y vas a la cárcel.")}</p>
      ${civ().lock ? `<p>🔐 ${W2("Your house has a lock.","Tu casa tiene cerradura.")}</p>` : `<button class="btn" onclick="jsLock()">🔐 ${W2("Buy a lock for your house (💵5)","Comprar cerradura (💵5)")}</button>`}
      <div class="fsup" style="margin-top:10px">${pubs.map(([sid, p]) => `<div><span>${p.lock ? "🔐" : "🏠"}</span><b>${E(p.name)}</b><button class="btn" ${brokeToday() || j ? "disabled" : ""} onclick="jsBreak('${sid}')">${W2("Break in","Allanar")}</button></div>`).join("")}</div></section>`; }
  else { const mine = CITES.filter(c => c.to === me() && c.status !== "dismissed").sort((a, b) => b.at - a.at).slice(0, 12);
    body = `<section class="panel"><div class="eyebrow">📜 ${W2("The Town Code","El Código del pueblo")}</div>${lawsOn().map(k => `<div class="ebill"><span>${LAWS[k].e} ${E(L(LAWS[k].l))}</span><b>💵${LAWS[k].fine}</b></div>`).join("")}
      <p class="muted" style="font-size:13px">${W2(`Marshals enforce these laws: ${marshals().map(pubName).join(", ") || "none hired yet"}. Three unpaid citations can mean jail.`, `Los alguaciles hacen cumplir estas leyes: ${marshals().map(pubName).join(", ") || "aún no hay"}. Tres multas sin pagar pueden significar cárcel.`)}</p></section>
      <section class="panel"><div class="eyebrow">🧾 ${W2("Your citations","Tus multas")}</div>${mine.map(c => cite(c, true)).join("") || `<p class="muted">${W2("A clean record!","¡Expediente limpio!")}</p>`}</section>`; }
  el.innerHTML = `${back}<section class="panel raised ehead">${T.artImg(`${T.TA}places3/jail.webp`, "⚖️")}<div><div class="eyebrow">⚖️ ${W2("Justice Center","Centro de Justicia")}</div><h2>${W2("Law and order","Ley y orden")}</h2>
      <p class="muted" style="margin:0">${j ? W2("🔒 You're serving a sentence.","🔒 Estás cumpliendo una condena.") : W2("Laws, marshals, the court and the town jail.","Leyes, alguaciles, el tribunal y la cárcel.")}</p></div></section>
    <nav class="tchips">${nav.map(([k, ic, l]) => `<button class="${JV === k ? "on" : ""}" onclick="jsView('${k}')">${ic} ${l}</button>`).join("")}</nav>${body}`;
}
W.MORE.places.push({k:"justice", e:"⚖️", l:["Justice Center","Centro de Justicia"], d:["Laws, citations, court and jail","Leyes, multas, tribunal y cárcel"]});
W.MORE.views.justice = paintJustice;
EXT.onLeave.push(() => { window._jusOpen = false; });
EXT.banner.push(() => { if (!SESS()) return ""; const j = myJail(), owe = openCites(me()).length, sued = SUITS.filter(s => s.b === me() && s.status === "filed").length;
  if (!j && !owe && !sued) return "";
  return `<section class="panel jban"><b>${j ? W2(`🔒 In jail: ${Math.ceil((j.until - Date.now()) / MIN)} min left`, `🔒 En la cárcel: ${Math.ceil((j.until - Date.now()) / MIN)} min`) : [owe ? W2(`🚓 ${owe} unpaid citation${owe > 1 ? "s" : ""}`, `🚓 ${owe} multa(s) sin pagar`) : "", sued ? W2("⚖️ You're being sued","⚖️ Te demandaron") : ""].filter(Boolean).join(" · ")}</b><button class="btn primary" onclick="jsView('${j ? "jail" : sued ? "court" : "law"}');w2Go('justice')">${W2("Justice Center","Centro de Justicia")}</button></section>`; });
setInterval(() => { if (window._jusOpen && T.isTown() && T.tt === "map" && !document.querySelector("#certAsk:not(.hidden)") && !window._lvq && !window._w2q) T.paintSub(); }, 30e3);

/* ---------------------------------------------------------------- teacher */
const jset = patch => { window._jsTc = {...(window._jsTc || {}), ...patch}; T.adminSet({justice:window._jsTc}); };
window.jsT = (k, v) => jset({[k]:v});
window.jsTLaw = (k, on) => { const cur = (window._jsTc && window._jsTc.laws) || DEFAULT_LAWS; jset({laws:on ? [...new Set([...cur, k])] : cur.filter(x => x !== k)}); };
window.jsTRelease = (cid, sid) => T.net.store.update(`classes/${cid}/jail/${sid}`, {until:Date.now() - 1}).then(T.paintAdmin).catch(() => {});
window.jsTVoid = (cid, col, id) => T.net.store.update(`classes/${cid}/${col}/${id}`, col === "suits" ? {status:"dropped", voided:true, upd:Date.now()} : {status:"dismissed", upd:Date.now()}).then(T.paintAdmin).catch(() => {});
EXT.adminPanels.push({html: c => { window._jsTc = c.justice || {}; const jj = c.justice || {}, on = jj.laws || DEFAULT_LAWS;
  return `<section class="panel tadm"><div class="eyebrow">⚖️ ${W2("Justice: laws, jail, court, break-ins","Justicia: leyes, cárcel, tribunal, allanamientos")}</div>
    <div class="jslaws">${Object.entries(LAWS).map(([k, l]) => `<label class="etog"><input type="checkbox" ${on.includes(k) ? "checked" : ""} onchange="jsTLaw('${k}',this.checked)"> ${l.e} ${E(L(l.l))} (💵${l.fine})</label>`).join("")}</div>
    <label class="etog"><input type="checkbox" ${jj.jail === false ? "" : "checked"} onchange="jsT('jail',this.checked)"> ${W2("Jail is on (max 15 minutes)","Cárcel activa (máx. 15 min)")}</label>
    <label class="etog"><input type="checkbox" ${jj.breakins ? "checked" : ""} onchange="jsT('breakins',this.checked)"> ${W2("Break-ins are on (off by default)","Allanamientos activos (apagado por defecto)")}</label>
    <div id="jsTList" class="muted" style="font-size:13px">${W2("Loading cases…","Cargando casos…")}</div></section>`; },
  after: async c => { const box = document.getElementById("jsTList"); if (!box) return; const st = T.net.store, cid = c.id;
    try { const [jail, suits, cites] = await Promise.all([st.list(`classes/${cid}/jail`), st.list(`classes/${cid}/suits`), st.list(`classes/${cid}/citations`)]);
      const inm = jail.filter(x => x.until > Date.now()), open = suits.filter(s => ["filed","trial"].includes(s.status)), cont = cites.filter(x => x.status === "contested" || x.status === "open");
      box.innerHTML = `<b>🔒 ${W2("In jail","En la cárcel")}</b>: ${inm.map(x => `${E(x.name)} (${E(x.why)}) <button class="btn ghost" onclick="jsTRelease('${cid}','${x.id}')">${W2("Release","Liberar")}</button>`).join(" ") || "—"}<br>
        <b>⚖️ ${W2("Open cases","Casos abiertos")}</b>: ${open.map(s => `${E(s.aName)} v. ${E(s.bName)} (💵${s.amt}: ${E(s.why)}) <button class="btn ghost" onclick="jsTVoid('${cid}','suits','${s.id}')">${W2("Void","Anular")}</button>`).join(" · ") || "—"}<br>
        <b>🚓 ${W2("Unpaid or contested citations","Multas sin pagar o impugnadas")}</b>: ${cont.map(x => `${E(x.toName)} · ${E(LAWS[x.law] ? L(LAWS[x.law].l) : x.law)} · “${E(x.why)}” ${x.status === "contested" ? "⚖️" : ""} <button class="btn ghost" onclick="jsTVoid('${cid}','citations','${x.id}')">${W2("Dismiss","Anular")}</button>`).join(" · ") || "—"}`;
    } catch(e){ box.textContent = ""; } }});
window.JUSTICE = {LAWS, lawsOn, myJail, get cites(){ return CITES; }, get suits(){ return SUITS; }, get breaks(){ return BREAKS; }, get jail(){ return JAIL; }};
})();
