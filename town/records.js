/* =============================================================================
   SMITHTOPIA — Gigs, collections, trade bonuses and the weekly certificate (town/records.js, 3.4 phase 5)
   Map tiles:
   💼 Gig Board     classmates hire each other. Pick a scenario (paint my house,
                    tutor me, walk my pets, farmhand for a day, design a logo,
                    deliver groceries, run my shop), set the pay (held in escrow)
                    and a worker takes it. The work is answering questions on the
                    job's subject; the poster approves with a star rating (auto
                    after 24 h). Wanted board: post an item you want with a bounty;
                    whoever has it gets the bounty.
   🏅 Records Hall  collection combos (complete a furniture set, all six shells,
                    a barnyard, every passport stamp, a portfolio…) pay a one-time
                    reward, and every completed furniture set takes 2% off shop
                    prices (max 10%). Merchant bonus: +💵1 for each different
                    classmate you trade with this week (max 5). And the weekly
                    certificate: what you accomplished this week, printable, with
                    a +💵3 bonus for 10+ right answers.
   Firestore: classes/{cid}/gigs, wanted.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN, W = window.WORLD2; if (!T || !T.CIV || !W) return;
const {EXT} = T, V = T.CIV;
const {civ, sheet, closeSheet, day, week, E, W2, C, store, SESS, CLS} = V;
const L = a => S.lang === "es" ? a[1] : a[0];
const me = () => SESS() && SESS().sid, myName = () => SESS() && SESS().name;
const H = 36e5;

const GIGS = {
  paint:  {e:"🎨", l:["Paint my house","Pinta mi casa"], n:3, subj:"econ", d:["Three coats: three questions.","Tres capas: tres preguntas."]},
  tutor:  {e:"📚", l:["Tutor me before the test","Dame tutoría antes del examen"], n:5, subj:"gov", d:["Explain five questions.","Explica cinco preguntas."]},
  pets:   {e:"🐕", l:["Walk my pets","Pasea a mis mascotas"], n:3, d:["A loop around the park.","Una vuelta al parque."]},
  farm:   {e:"🌾", l:["Farmhand for a day","Peón por un día"], n:4, subj:"econ", d:["Feed, water, harvest, haul.","Alimentar, regar, cosechar, cargar."]},
  logo:   {e:"✏️", l:["Design a logo for my business","Diseña un logo para mi negocio"], n:4, d:["Sketch, color, revise, deliver.","Bocetar, colorear, revisar, entregar."]},
  deliver:{e:"📦", l:["Deliver my groceries","Entrega mis compras"], n:3, d:["Three stops across town.","Tres paradas en el pueblo."]},
  shop:   {e:"🏪", l:["Run my shop for an afternoon","Atiende mi tienda una tarde"], n:5, subj:"econ", d:["Five customers.","Cinco clientes."]},
  speech: {e:"🎤", l:["Write my campaign speech","Escribe mi discurso de campaña"], n:5, subj:"gov", d:["Five talking points.","Cinco puntos clave."]}
};
const SHELL_KEYS = ["clam","scallop","star","conch","sanddollar","pearl"];

let GIGL = [], WANT = [], SUBS = [];
const stop = () => { SUBS.forEach(u => { try { u(); } catch(e){} }); SUBS = []; };
let OPEN = null;
const redraw = () => { if (T.isTown() && T.tt === "map" && OPEN) T.paintSub(); };
function watch(){ stop(); if (!SESS()) return;
  SUBS.push(store().watch(`${C()}/gigs`, {}, r => { if (r) { GIGL = r; settleGigs(); redraw(); } }));
  SUBS.push(store().watch(`${C()}/wanted`, {}, r => { if (r) { WANT = r; settleWanted(); redraw(); } }));
  setTimeout(() => { checkCombos(); }, 2500); }
EXT.onSession.push(() => setTimeout(watch, 1200)); EXT.onLeave.push(stop);

/* ---------------------------------------------------------------- the week's stats */
const wk = () => { const c = civ(); if (!c.wk || c.wk.w !== week()) c.wk = {w:week(), right:0, asked:0, gigs:0, trades:0, partners:[], combos:0, earned:0, claimed:false}; return c.wk; };
(window.LIVE_HOOKS = window.LIVE_HOOKS || []).push((q, ok) => { if (!SESS()) return; const w = wk(); w.asked++; if (ok) w.right++; });
const earnedWk = () => { const e = window.ECON && ECON.ec ? ECON.ec() : null, f = e && e.flow && e.flow[week()]; return f ? f.in | 0 : 0; };

/* ---------------------------------------------------------------- gigs */
const gpath = id => `${C()}/gigs/${id}`;
const gupd = (id, d) => store().update(gpath(id), {...d, upd:Date.now()});
window.rcPost = function(){
  sheet(`<div class="eyebrow">💼 ${W2("Post a gig","Publicar un trabajo")}</div>
    <label class="cform">${W2("What do you need?","¿Qué necesitas?")}<select id="rcKind">${Object.entries(GIGS).map(([k, g]) => `<option value="${k}">${g.e} ${E(L(g.l))}</option>`).join("")}</select></label>
    <label class="cform">${W2("Details (optional)","Detalles (opcional)")}<input id="rcNote" maxlength="100"></label>
    <label class="cform">${W2("Pay (💵2–15, held until you approve)","Pago (💵2–15, retenido hasta que apruebes)")}<input id="rcPay" type="number" min="2" max="15" value="4"></label><p id="rcErr" class="err"></p>
    <button class="btn primary wide" onclick="rcPostGo()">${W2("Post","Publicar")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`); };
window.rcPostGo = async function(kind, pay, note){ const err = document.getElementById("rcErr");
  kind = kind || document.getElementById("rcKind").value; pay = pay || Math.max(2, Math.min(15, parseInt(document.getElementById("rcPay").value, 10) || 0));
  note = note != null ? note : (document.getElementById("rcNote").value || "").trim();
  if (note && window.badShow && err && window.badShow(err, [note], "gig")) return;
  if ((S.tokens | 0) < pay) { if (err) err.textContent = W2(`You need 💵${pay}.`, `Necesitas 💵${pay}.`); return; }
  if (GIGL.filter(g => g.by === me() && ["open","taken","done"].includes(g.status)).length >= 3) { if (err) err.textContent = W2("You can have 3 open gigs at a time.","Máximo 3 trabajos abiertos."); return; }
  try { const id = await store().add(`${C()}/gigs`, {kind, note, pay, by:me(), byName:myName(), worker:"", workerName:"", status:"open", right:0, stars:0, at:Date.now(), upd:Date.now()});
    T.once("gigpay:" + id, () => T.coins(-pay)); T.persist(); closeSheet(); T.toast(W2(`💼 Posted! 💵${pay} is held until you approve the work.`, `💼 ¡Publicado! 💵${pay} retenidos hasta que apruebes.`)); }
  catch(e){ if (err) err.textContent = W2("Couldn't post.","No se pudo publicar."); } };
window.rcTake = async function(id){ const g = GIGL.find(x => x.id === id); if (!g || g.status !== "open" || g.by === me()) return;
  if (GIGL.filter(x => x.worker === me() && x.status === "taken").length >= 2) return T.toast(W2("Finish your other gigs first (2 at a time).","Termina tus otros trabajos (máx. 2)."));
  await gupd(id, {status:"taken", worker:me(), workerName:myName(), takenAt:Date.now()}); T.toast(W2(`💼 You took the job. Do the work when you're ready.`, `💼 Aceptaste el trabajo.`)); };
window.rcWork = function(id){ const g = GIGL.find(x => x.id === id); if (!g || g.worker !== me() || g.status !== "taken") return; const G = GIGS[g.kind];
  LIVE.qRun({items:LIVE.pickItems(G.n, G.subj ? {subj:G.subj} : {}), title:L(G.l), e:G.e, sub:W2(`for ${g.byName} · 💵${g.pay}`, `para ${g.byName} · 💵${g.pay}`)}, async right => {
    if (right < G.n - 1) return T.toast(W2(`${right}/${G.n}: not good enough to turn in. Try again!`, `${right}/${G.n}: no es suficiente. ¡Intenta otra vez!`));
    await gupd(id, {status:"done", right, doneAt:Date.now()}); T.toast(W2(`✅ Work turned in (${right}/${G.n}). ${g.byName} will review it.`, `✅ Trabajo entregado (${right}/${G.n}).`)); }); };
window.rcApprove = async (id, stars) => { const g = GIGL.find(x => x.id === id); if (!g || g.by !== me() || g.status !== "done") return; await gupd(id, {status:"paid", stars:Math.max(1, Math.min(5, stars | 0))}); };
window.rcRedo = async id => { const g = GIGL.find(x => x.id === id); if (!g || g.by !== me() || g.status !== "done") return; await gupd(id, {status:"taken", right:0}); T.toast(W2("Sent back for another try.","Devuelto para otro intento.")); };
window.rcClaim = async id => { const g = GIGL.find(x => x.id === id); if (!g || g.worker !== me() || g.status !== "done" || Date.now() - g.doneAt < 24 * H) return; await gupd(id, {status:"paid", stars:3, auto:true}); };
window.rcCancel = async id => { const g = GIGL.find(x => x.id === id); if (!g || g.by !== me() || g.status !== "open") return; await gupd(id, {status:"canceled"}); };
window.rcQuit = async id => { const g = GIGL.find(x => x.id === id); if (!g || g.worker !== me() || g.status !== "taken") return; await gupd(id, {status:"open", worker:"", workerName:""}); };
function settleGigs(){ let ch = false; const o = (k, f) => { ch = T.once(k, f) || ch; };
  GIGL.forEach(g => {
    if (g.by === me() && g.status === "canceled") o("gigref:" + g.id, () => { T.coins(g.pay); T.toast(W2(`↩️ Gig canceled: 💵${g.pay} back.`, `↩️ Trabajo cancelado: 💵${g.pay} de vuelta.`)); });
    if (g.by === me() && g.status === "taken") o("gigtk:" + g.id + g.worker, () => T.toast(W2(`💼 ${g.workerName} took your gig: ${L(GIGS[g.kind].l)}.`, `💼 ${g.workerName} aceptó tu trabajo.`)));
    if (g.by === me() && g.status === "done") o("gigdn:" + g.id + g.doneAt, () => T.toast(W2(`📬 ${g.workerName} finished your gig. Approve it at the Gig Board.`, `📬 ${g.workerName} terminó. Apruébalo en la bolsa de trabajo.`)));
    if (g.worker === me() && g.status === "paid") o("gigwage:" + g.id, () => { T.coins(g.pay); const w = wk(); w.gigs++; const c = civ(); c.gigsDone = (c.gigsDone | 0) + 1; c.gigStars = (c.gigStars | 0) + (g.stars | 0);
      T.toast(W2(`💵 ${g.byName} paid you ${g.pay} for “${L(GIGS[g.kind].l)}” · ${"★".repeat(g.stars)}${"☆".repeat(5 - g.stars)}`, `💵 ${g.byName} te pagó ${g.pay} · ${"★".repeat(g.stars)}`)); }); });
  if (ch) { T.persist(); checkCombos(); } }
const rep = () => { const c = civ(); return c.gigsDone ? (c.gigStars / c.gigsDone).toFixed(1) : "—"; };

/* ---------------------------------------------------------------- wanted board */
window.rcWant = function(){ const ids = Object.values(T.ITEMS).filter(i => i.p > 0 && !i.biz).sort((a, b) => T.itemName(a.id).localeCompare(T.itemName(b.id)));
  sheet(`<div class="eyebrow">📌 ${W2("Post a WANTED ad","Publicar un SE BUSCA")}</div>
    <label class="cform">${W2("Item","Objeto")}<select id="rcItem">${ids.map(i => `<option value="${i.id}">${E(T.itemName(i.id))}</option>`).join("")}</select></label>
    <label class="cform">${W2("Bounty (💵1–30, held until someone delivers)","Recompensa (💵1–30)")}<input id="rcB" type="number" min="1" max="30" value="8"></label><p id="rcErr" class="err"></p>
    <button class="btn primary wide" onclick="rcWantGo()">${W2("Post","Publicar")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`); };
window.rcWantGo = async function(item, bounty){ item = item || document.getElementById("rcItem").value; bounty = bounty || Math.max(1, Math.min(30, parseInt(document.getElementById("rcB").value, 10) || 0));
  if ((S.tokens | 0) < bounty) return T.toast(W2(`You need 💵${bounty}.`, `Necesitas 💵${bounty}.`));
  try { const id = await store().add(`${C()}/wanted`, {item, bounty, by:me(), byName:myName(), filler:"", fillerName:"", status:"open", at:Date.now()}); T.once("wantpay:" + id, () => T.coins(-bounty)); T.persist(); closeSheet();
    T.toast(W2(`📌 Posted. 💵${bounty} goes to whoever brings you a ${T.itemName(item)}.`, `📌 Publicado. 💵${bounty} para quien te traiga ${T.itemName(item)}.`)); } catch(e){} };
window.rcFill = async function(id){ const w = WANT.find(x => x.id === id); if (!w || w.status !== "open" || w.by === me()) return;
  if (!T.freeInv()[w.item]) return T.toast(W2("You need a spare one (not placed in your house).","Necesitas uno libre (no colocado en tu casa)."));
  await store().update(`${C()}/wanted/${id}`, {status:"filled", filler:me(), fillerName:myName(), filledAt:Date.now()});
  T.once("wantgive:" + id, () => { T.addItem(w.item, -1); T.coins(w.bounty); tradeWith(w.by); }); T.persist(); T.toast(W2(`📦 Delivered! +💵${w.bounty}.`, `📦 ¡Entregado! +💵${w.bounty}.`)); };
window.rcUnwant = async id => { const w = WANT.find(x => x.id === id); if (!w || w.by !== me() || w.status !== "open") return; await store().update(`${C()}/wanted/${id}`, {status:"canceled"}); };
function settleWanted(){ let ch = false;
  WANT.forEach(w => { if (w.by !== me()) return;
    if (w.status === "filled") ch = T.once("wantget:" + w.id, () => { T.addItem(w.item, 1); tradeWith(w.filler); T.toast(W2(`📦 ${w.fillerName} delivered your ${T.itemName(w.item)}!`, `📦 ¡${w.fillerName} entregó tu ${T.itemName(w.item)}!`)); }) || ch;
    if (w.status === "canceled") ch = T.once("wantref:" + w.id, () => T.coins(w.bounty)) || ch; });
  if (ch) T.persist(); }

/* ---------------------------------------------------------------- merchant bonus */
function tradeWith(sid){ if (!sid || sid === me()) return; const w = wk(); w.trades++;
  if (!w.partners.includes(sid) && w.partners.length < 5) { w.partners.push(sid); T.coins(1); T.toast(W2(`🤝 Merchant bonus: +💵1 for trading with a new classmate (${w.partners.length}/5 this week).`, `🤝 Bono de comerciante: +💵1 (${w.partners.length}/5).`)); }
  T.persist(); }
EXT.onSold.push(m => tradeWith(m.buyer));
EXT.onBuy.push(m => tradeWith(m.seller || m.sid));

/* ---------------------------------------------------------------- collection combos */
const ownsSet = set => { const ids = Object.values(T.ITEMS).filter(i => i.set === set).map(i => i.id); return ids.length && ids.every(id => T.has(id)); };
const COMBOS = [
  ...Object.entries(window.TOWN_SETS || {}).map(([k, s]) => ({k:"set_" + k, e:s[0], l:[`${s[1]} set`, `Juego ${s[2]}`], d:["Own every item in the set (−2% shop prices)","Ten todo el juego (−2% en la tienda)"], pay:5, test:() => ownsSet(k), prog:() => { const ids = Object.values(T.ITEMS).filter(i => i.set === k).map(i => i.id); return [ids.filter(T.has).length, ids.length]; }})),
  {k:"shells", e:"🐚", l:["Beachcomber","Buscaconchas"], d:["Find all six kinds of shells","Encuentra los seis tipos de conchas"], pay:8, prog:() => { const s = civ().shells || {}; return [SHELL_KEYS.filter(k => s[k] > 0).length, 6]; }},
  {k:"barn", e:"🐄", l:["Barnyard","Corral"], d:["Raise 4 kinds of farm animals","Cría 4 tipos de animales"], pay:8, prog:() => { const F = window.FARM, p = F && F.myPlot(); return [p ? Object.keys(F.farms[p].ani || {}).length : 0, 4]; }},
  {k:"globe", e:"🌎", l:["Globetrotter","Trotamundos"], d:["Stamp your passport in 3 periods","Sella tu pasaporte en 3 periodos"], pay:10, prog:() => [Object.keys(((civ().passport || {}).stamps) || {}).length, 3]},
  {k:"road", e:"🛣️", l:["Road tripper","Viajero en carretera"], d:["Own a car and a passport","Ten auto y pasaporte"], pay:5, prog:() => [(window.TRAVEL && TRAVEL.myCar() ? 1 : 0) + ((civ().passport || {}).issued ? 1 : 0), 2]},
  {k:"port", e:"📈", l:["Diversified","Diversificado"], d:["Own shares in 3 companies","Ten acciones de 3 empresas"], pay:8, prog:() => { const e = window.ECON && ECON.ec ? ECON.ec() : {}; return [Object.values(e.stk || {}).filter(x => x && x.n > 0).length, 3]; }},
  {k:"patron", e:"🏛️", l:["Museum patron","Mecenas del museo"], d:["Donate 3 items to the museum","Dona 3 objetos al museo"], pay:6, prog:() => [window.TRAVEL ? TRAVEL.museum.filter(m => m.sid === me()).length : 0, 3]},
  {k:"gigpro", e:"💼", l:["Gig pro","Profesional"], d:["Finish 5 paid gigs","Termina 5 trabajos pagados"], pay:10, prog:() => [civ().gigsDone | 0, 5]},
  {k:"merchant", e:"🤝", l:["Merchant","Comerciante"], d:["Trade with 5 different classmates in one week","Comercia con 5 compañeros en una semana"], pay:6, prog:() => [wk().partners.length, 5]}
];
const done = () => { const c = civ(); c.combos = c.combos || {}; return c.combos; };
function checkCombos(){ if (!SESS()) return; let ch = false;
  COMBOS.forEach(cb => { if (done()[cb.k]) return; const ok = cb.test ? cb.test() : (p => p[0] >= p[1])(cb.prog());
    if (ok) { done()[cb.k] = Date.now(); T.coins(cb.pay); wk().combos++; ch = true; T.toast(W2(`🏅 Combo complete: ${L(cb.l)}! +💵${cb.pay}`, `🏅 ¡Combo completo: ${L(cb.l)}! +💵${cb.pay}`)); if (typeof fireConfetti === "function") fireConfetti(); } });
  if (ch) { T.persist(); T.publishSoon && T.publishSoon(); } }
setInterval(checkCombos, 60e3);
EXT.onBuy.push(() => setTimeout(checkCombos, 500));
const setsDone = () => Object.keys(done()).filter(k => k.startsWith("set_")).length;
EXT.priceMult.push(() => 1 - Math.min(0.10, 0.02 * setsDone()));
EXT.pubExtra.push(() => { const w = wk(); return {combos:Object.keys(done()).length, rep:civ().gigsDone ? +(civ().gigStars / civ().gigsDone).toFixed(1) : 0, wk:{w:w.w, right:w.right, gigs:w.gigs, earned:earnedWk()}}; });

/* ---------------------------------------------------------------- weekly certificate */
function stats(){ const w = wk(), J = window.JUSTICE;
  const cites = J ? J.cites.filter(c => c.to === me() && c.week === week()).length : 0;
  const stamps = Object.values(((civ().passport || {}).stamps) || {}).filter(t => t >= new Date(week() + "T00:00:00").getTime()).length;
  return [["✏️", W2("Right answers","Respuestas correctas"), w.right], ["💵", W2("Smithbucks earned","Smithbucks ganados"), earnedWk()], ["💼", W2("Gigs completed","Trabajos completados"), w.gigs],
    ["🤝", W2("Trading partners","Socios comerciales"), w.partners.length], ["🏅", W2("Combos earned","Combos logrados"), w.combos], ["✈️", W2("New passport stamps","Sellos nuevos"), stamps],
    ["⚖️", W2("Citations","Multas"), cites === 0 ? W2("clean record ✨","expediente limpio ✨") : cites]]; }
const titleFor = w => w.right >= 50 ? W2("Scholar of the Week","Erudito de la semana") : w.gigs >= 3 ? W2("Hardest Worker","El más trabajador") : w.partners.length >= 4 ? W2("Master Merchant","Gran comerciante") : w.right >= 20 ? W2("Rising Star","Estrella en ascenso") : W2("Proud Citizen","Ciudadano orgulloso");
window.rcCert = function(){ const w = wk(), s = SESS(), st = stats();
  const d0 = new Date(week() + "T12:00:00"), d1 = new Date(d0); d1.setDate(d1.getDate() + 4);
  const fmt = d => d.toLocaleDateString(S.lang === "es" ? "es" : "en", {month:"long", day:"numeric"});
  sheet(`<div id="rcCertBox" class="rccert"><div class="rcseal">🏅</div><small>${W2("Smithtopia · Weekly Certificate","Smithtopia · Certificado semanal")}</small>
      <h2>${E(titleFor(w))}</h2><p>${W2("presented to","otorgado a")}</p><h1>${E(s.name)}</h1><p>${E(CLS().name || "")} · ${fmt(d0)} – ${fmt(d1)}</p>
      <div class="rcstats">${st.map(([e, l, v]) => `<div><span>${e}</span><b>${E(String(v))}</b><small>${E(l)}</small></div>`).join("")}</div>
      <div class="rcsig"><span>Coach Smith</span><small>${W2("Mayor's office · Town Hall","Alcaldía · Ayuntamiento")}</small></div></div>
    <button class="btn primary wide" onclick="rcPrint()">🖨️ ${W2("Print or save as PDF","Imprimir o guardar PDF")}</button>
    ${w.claimed ? `<p class="muted" style="text-align:center">✅ ${W2("Weekly bonus claimed.","Bono semanal cobrado.")}</p>` : `<button class="btn wide" ${w.right >= 10 ? "" : "disabled"} onclick="rcClaimWeek()">🎁 ${w.right >= 10 ? W2("Claim your +💵3 weekly bonus","Cobra tu bono de +💵3") : W2(`${10 - w.right} more right answers for the +💵3 bonus`, `Faltan ${10 - w.right} respuestas para el bono`)}</button>`}
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Close","Cerrar")}</button>`); };
window.rcClaimWeek = () => { const w = wk(); if (w.claimed || w.right < 10) return; w.claimed = true; T.coins(3); T.persist(); T.toast(W2("🎁 +💵3 weekly bonus!","🎁 ¡Bono semanal de +💵3!")); rcCert(); };
window.rcPrint = () => { const box = document.getElementById("rcCertBox"); if (!box) return; const wv = window.open("", "_blank");
  if (!wv) return window.print(); wv.document.write(`<!doctype html><title>Certificate</title><style>${CERT_CSS}</style><body>${box.outerHTML}<script>setTimeout(()=>print(),300)<\/script></body>`); wv.document.close(); };
const CERT_CSS = `body{font-family:system-ui,sans-serif;margin:0;padding:24px}.rccert{border:8px double #C8102E;border-radius:18px;padding:28px;text-align:center;background:#FFFDF5;max-width:720px;margin:auto}
.rccert h1{font-size:40px;margin:4px 0}.rccert h2{color:#C8102E;margin:6px 0}.rcseal{font-size:48px}.rcstats{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;margin:16px 0}
.rcstats div{border:2px solid #1D1B2E;border-radius:12px;padding:8px;display:grid}.rcstats span{font-size:22px}.rcstats b{font-size:20px}.rcstats small{font-size:11px}.rcsig{margin-top:18px;display:grid}.rcsig span{font-family:cursive;font-size:26px;border-bottom:2px solid #1D1B2E;width:220px;margin:auto}`;

/* ---------------------------------------------------------------- screens */
let GV = "board";
window.rcView = v => { GV = v; window._tfresh = Date.now(); T.paintSub(); };
const stars = n => "★".repeat(n) + "☆".repeat(5 - n);
function gigCard(g){ const G = GIGS[g.kind], mine = g.by === me(), work = g.worker === me(); let act = "";
  if (g.status === "open") act = mine ? `<button class="btn ghost" onclick="rcCancel('${g.id}')">${W2("Cancel","Cancelar")}</button>` : `<button class="btn primary" onclick="rcTake('${g.id}')">${W2("Take the job","Aceptar")}</button>`;
  if (g.status === "taken" && work) act = `<button class="btn primary" onclick="rcWork('${g.id}')">${G.e} ${W2(`Do the work (${G.n} questions)`, `Hacer el trabajo (${G.n} preguntas)`)}</button><button class="btn ghost" onclick="rcQuit('${g.id}')">${W2("Quit","Renunciar")}</button>`;
  if (g.status === "done" && mine) act = `<span>${W2("Rate it:","Califica:")}</span>${[1, 2, 3, 4, 5].map(n => `<button class="btn ghost" onclick="rcApprove('${g.id}',${n})">${n}★</button>`).join("")}<button class="btn" onclick="rcRedo('${g.id}')">${W2("Send back","Devolver")}</button>`;
  if (g.status === "done" && work) act = Date.now() - g.doneAt > 24 * H ? `<button class="btn primary" onclick="rcClaim('${g.id}')">${W2("Collect pay (24 h passed)","Cobrar (pasaron 24 h)")}</button>` : `<small class="muted">${W2("Waiting for approval…","Esperando aprobación…")}</small>`;
  const st = {open:W2("open","abierto"), taken:W2(`taken by ${g.workerName}`, `aceptado por ${g.workerName}`), done:W2(`turned in by ${g.workerName} (${g.right}/${G.n})`, `entregado por ${g.workerName}`), paid:W2(`paid · ${stars(g.stars)}`, `pagado · ${stars(g.stars)}`), canceled:W2("canceled","cancelado")}[g.status];
  return `<div class="rcgig"><span class="rcge">${G.e}</span><div><b>${E(L(G.l))}</b> <small class="muted">${W2("for","para")} ${E(g.byName)}${g.note ? ` · “${E(g.note)}”` : ""}</small><br><small>${E(L(G.d))} · ${st}</small><div class="eprow">${act}</div></div><b class="rcpay">💵${g.pay}</b></div>`; }
function paintGigs(){ const open = GIGL.filter(g => g.status === "open" && g.by !== me()), mine = GIGL.filter(g => (g.by === me() || g.worker === me()) && !["canceled"].includes(g.status) && !(g.status === "paid" && Date.now() - (g.upd || 0) > 3 * 864e5));
  const wantOpen = WANT.filter(w => w.status === "open");
  const nav = [["board","💼",W2("Gig board","Bolsa de trabajo")],["wanted","📌",W2("Wanted","Se busca")]];
  const body = GV === "wanted" ? `<section class="panel"><div class="eyebrow">📌 ${W2("Wanted board: bring it, get the bounty","Se busca: tráelo y cobra la recompensa")}</div><button class="btn primary" onclick="rcWant()">📌 ${W2("Post a WANTED ad","Publicar SE BUSCA")}</button>
      ${wantOpen.map(w => `<div class="ebill"><span>${T.itemArt(w.item, 36)} <b>${E(T.itemName(w.item))}</b> <small class="muted">${W2("wanted by","lo busca")} ${E(w.byName)}</small></span><b>💵${w.bounty}</b>${w.by === me() ? `<button class="btn ghost" onclick="rcUnwant('${w.id}')">${W2("Cancel","Cancelar")}</button>` : `<button class="btn ${T.freeInv()[w.item] ? "primary" : ""}" ${T.freeInv()[w.item] ? "" : "disabled"} onclick="rcFill('${w.id}')">${W2("Deliver","Entregar")}</button>`}</div>`).join("") || `<p class="muted">${W2("Nobody is looking for anything right now.","Nadie busca nada ahora.")}</p>`}</section>`
    : `<section class="panel"><div class="eyebrow">💼 ${W2("Hire a classmate","Contrata a un compañero")}</div><p class="muted" style="margin-top:0">${W2(`Post a job and its pay. A classmate takes it and does the work by answering questions. You approve and rate it. Your rating as a worker: ${rep()} ★`, `Publica un trabajo. Un compañero lo hace respondiendo preguntas. Tú lo apruebas. Tu calificación: ${rep()} ★`)}</p>
      <button class="btn primary" onclick="rcPost()">➕ ${W2("Post a gig","Publicar trabajo")}</button></section>
      ${mine.length ? `<section class="panel"><div class="eyebrow">📋 ${W2("Your gigs","Tus trabajos")}</div>${mine.map(gigCard).join("")}</section>` : ""}
      <section class="panel"><div class="eyebrow">🔎 ${W2("Open jobs","Trabajos disponibles")}</div>${open.map(gigCard).join("") || `<p class="muted">${W2("No open gigs. Post one!","No hay trabajos. ¡Publica uno!")}</p>`}</section>`;
  return `<nav class="tchips">${nav.map(([k, ic, l]) => `<button class="${GV === k ? "on" : ""}" onclick="rcView('${k}')">${ic} ${l}</button>`).join("")}</nav>${body}`; }
function paintRecords(){ checkCombos(); const w = wk(), d = done();
  return `<section class="panel raised"><div class="eyebrow">📜 ${W2("This week","Esta semana")}</div><div class="rcstats">${stats().slice(0, 4).map(([e, l, v]) => `<div><span>${e}</span><b>${E(String(v))}</b><small>${E(l)}</small></div>`).join("")}</div>
      <button class="btn primary" onclick="rcCert()">🏅 ${W2("View your weekly certificate","Ver tu certificado semanal")}</button></section>
    <section class="panel"><div class="eyebrow">🏅 ${W2("Collection combos","Combos de colección")} · ${Object.keys(d).length}/${COMBOS.length}${setsDone() ? ` · ${W2(`shop discount −${Math.min(10, setsDone() * 2)}%`, `descuento −${Math.min(10, setsDone() * 2)}%`)}` : ""}</div>
      <div class="rccombos">${COMBOS.map(cb => { const p = cb.prog ? cb.prog() : [0, 1], ok = !!d[cb.k];
        return `<div class="${ok ? "on" : ""}"><span>${cb.e}</span><b>${E(L(cb.l))}</b><small>${E(L(cb.d))}</small><i><em style="width:${Math.min(100, p[0] / p[1] * 100)}%"></em></i><small>${ok ? "✅ " + W2("done","listo") : `${p[0]}/${p[1]} · +💵${cb.pay}`}</small></div>`; }).join("")}</div></section>
    <section class="panel"><div class="eyebrow">🤝 ${W2("Merchant bonus","Bono de comerciante")}</div><p style="margin:0">${W2(`Trade with different classmates this week (Market sales, Wanted deliveries): +💵1 each, up to 5. So far: ${w.partners.length}/5.`, `Comercia con distintos compañeros: +💵1 cada uno, hasta 5. Llevas ${w.partners.length}/5.`)}</p></section>`; }
const PL = {
  gigs:   {e:"💼", l:["Gig Board","Bolsa de trabajo"], d:["Hire classmates or get hired","Contrata o consigue trabajo"], art:"🏢", paint:paintGigs, sub:["Jobs, pay and ratings between classmates.","Trabajos, pagos y calificaciones."]},
  records:{e:"🏅", l:["Records Hall","Salón de récords"], d:["Combos and your weekly certificate","Combos y tu certificado semanal"], art:"🏅", paint:paintRecords, sub:["Collections, bonuses and your certificate.","Colecciones, bonos y tu certificado."]}
};
Object.entries(PL).forEach(([k, p]) => { W.MORE.places.push({k, e:p.e, l:p.l, d:p.d});
  W.MORE.views[k] = (el, back) => { OPEN = k; el.innerHTML = `${back}<section class="panel raised ehead">${T.artImg(`${T.TA}places4/${k}.webp`, p.art)}<div><div class="eyebrow">${p.e} ${E(L(p.l))}</div><h2>${E(L(p.l))}</h2><p class="muted" style="margin:0">${E(L(p.sub))}</p></div></section>${p.paint()}`; }; });
EXT.onLeave.push(() => { OPEN = null; });
EXT.banner.push(() => { if (!SESS()) return ""; const appr = GIGL.filter(g => g.by === me() && g.status === "done").length; if (!appr) return "";
  return `<section class="panel jban"><b>📬 ${W2(`${appr} gig${appr > 1 ? "s" : ""} waiting for your approval`, `${appr} trabajo(s) por aprobar`)}</b><button class="btn primary" onclick="rcView('board');w2Go('gigs')">${W2("Gig Board","Bolsa de trabajo")}</button></section>`; });

/* ---------------------------------------------------------------- teacher: weekly honor roll */
EXT.adminPanels.push({html: () => `<section class="panel tadm"><div class="eyebrow">🏅 ${W2("This week's honor roll","Cuadro de honor de la semana")}</div><div id="rcTRoll" class="muted" style="font-size:13px">${W2("Loading…","Cargando…")}</div></section>`,
  after: async c => { const box = document.getElementById("rcTRoll"); if (!box) return;
    try { const pubs = (await T.net.store.list(`classes/${c.id}/pub`)).filter(p => p.wk && p.wk.w === week());
      const top = (k, l) => { const r = [...pubs].sort((a, b) => (b.wk[k] | 0) - (a.wk[k] | 0)).filter(p => p.wk[k] > 0).slice(0, 3); return `<b>${l}</b>: ${r.map(p => `${E(p.name)} (${p.wk[k]})`).join(", ") || "—"}`; };
      box.innerHTML = [top("right", W2("✏️ Most right answers","✏️ Más respuestas correctas")), top("earned", W2("💵 Top earners","💵 Más ganancias")), top("gigs", W2("💼 Most gigs","💼 Más trabajos"))].join("<br>"); } catch(e){ box.textContent = ""; } }});
window.RECORDS = {GIGS, COMBOS, wk, done, checkCombos, setsDone, get gigs(){ return GIGL; }, get wanted(){ return WANT; }};
})();
