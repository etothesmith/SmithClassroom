/* =============================================================================
   GRENADIER TOWN — civic life (town/civic.js)
   Adds to town/town.js through its extension points (TOWN.EXT):
     1. Class goals that unlock plaza upgrades, and a period-vs-period league
     2. The Town Bank: savings with interest, loans, a credit score (the
        teacher sets the "Fed" rate)
     3. Economy events the teacher triggers (inflation, tariff, recession,
        boom, supply shock), each with an Econ check question
     4. Elections for mayor and town laws (the teacher tallies, and can strike
        a law down as the Supreme Court)
     5. Student businesses: make products, sell them, split profit with a
        partner
     6. Daily jobs, a visit streak, and Home of the Week
     7. Live plaza quiz the teacher runs from the board, and seasonal decor
   Everything has an emoji fallback until the Gemini art lands in
   v2/assets/town/ (see v2/GEMINI_TOWN_CIVIC.md).
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T) return;
const {EXT, L2, TA} = T;
let PROJ = false, ADMIN_CLS = null;   /* the board view reads the class the teacher is showing */
const NET = () => T.net, SESS = () => T.session, CLS = () => (PROJ && ADMIN_CLS) || T.cls || ADMIN_CLS || {};
const store = () => T.net.store;
const W2 = (en, es) => WL(en, es);
const E = s => esc(String(s == null ? "" : s));
const pad = n => String(n).padStart(2, "0");
const day = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const dayN = (d = new Date()) => Math.floor((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - new Date(2024, 0, 1)) / 864e5);
const week = (d = new Date()) => { const m = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7)); return day(m); };
const lastWeek = () => { const d = new Date(); d.setDate(d.getDate() - 7); return week(d); };
const C = () => "classes/" + SESS().cid;
const hashN = s => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const img = (src, emo, cls) => T.artImg(src, emo, cls === "big");
const sub = u => T.viewSub(u);
const paint = () => { if (T.isTown()) T.paintSub(); };

/* ---------------------------------------------------------------- local state */
function civ(){
  const t = T.town(), c = t.civic = t.civic || {};
  c.bank = c.bank || {bal:0, at:day(), loan:null, credit:650, hist:[]};
  c.jobs = c.jobs || {day:"", picks:[], done:{}, paid:{}, flags:{}};
  c.streak = c.streak || {n:0, last:"", best:0};
  c.xp = c.xp || {};               /* {"wk:<week>": xp at the start of the week, "goal:<id>": xp at goal start} */
  c.biz = c.biz || null;           /* {type, made:{day:n}, sold, rev, cost} */
  c.voted = c.voted || {};
  c.tax = c.tax || 0;              /* coins paid in sales tax (counts toward the class goal) */
  return c;
}
const myXp = () => S.xp | 0;
function xpSince(key){ const c = civ(); if (c.xp[key] == null) { c.xp[key] = myXp(); save(); } return Math.max(0, myXp() - c.xp[key]); }

/* ---------------------------------------------------------------- catalog */
const UPGRADES = {   /* at: [x, feet y] on the 960x540 plaza */
  fountain:  {e:"⛲", en:"Grand fountain", es:"Gran fuente", at:[584, 440], h:150},
  foodtruck: {e:"🚚", en:"Food truck", es:"Camión de comida", at:[872, 440], h:110},
  stage:     {e:"🎤", en:"Stage", es:"Escenario", at:[410, 335], h:120},
  statue:    {e:"🗽", en:"Grenadier statue", es:"Estatua Grenadier", at:[440, 500], h:130},
  balloons:  {e:"🎈", en:"Balloon arch", es:"Arco de globos", at:[650, 250], h:90},
  garden:    {e:"🌷", en:"Flower garden", es:"Jardín", at:[300, 530], h:70},
  arcade:    {e:"🕹️", en:"Arcade cabinet", es:"Máquina de arcade", at:[700, 330], h:100},
  mural:     {e:"🎨", en:"Class mural", es:"Mural de la clase", at:[230, 205], h:90}
};
const EVENTS = {
  inflation: {e:"🎈", en:"Inflation hits!", es:"¡Llega la inflación!", mult:() => 1.3,
    what:{en:"Too much money is chasing too few goods. Shop prices are up 30%.", es:"Demasiado dinero persigue muy pocos bienes. Los precios de la tienda suben 30%."},
    q:{q:{en:"Prices in the shop went up 30%. What happens to the purchasing power of your Smithbucks?", es:"Los precios subieron 30%. ¿Qué pasa con el poder adquisitivo de tus Smithbucks?"},
       c:{en:["It falls: each Smithbuck buys less","It rises: each Smithbuck buys more","It stays the same"], es:["Baja: cada Smithbuck compra menos","Sube: cada Smithbuck compra más","No cambia"]}, a:0}},
  tariff: {e:"🚢", en:"Tariff on imported furniture", es:"Arancel a muebles importados", mult:it => /^(bed|sofa|lamp|table)/.test(it.id) ? 1.5 : 1,
    what:{en:"Beds, sofas, tables and lamps are imported, and a 50% tariff was added to their price.", es:"Camas, sofás, mesas y lámparas son importados y tienen un arancel del 50%."},
    q:{q:{en:"Who usually ends up paying most of a tariff on imported goods?", es:"¿Quién suele pagar la mayor parte de un arancel a productos importados?"},
       c:{en:["Domestic buyers, through higher prices","The foreign government","Nobody, it's free"], es:["Los compradores nacionales, con precios más altos","El gobierno extranjero","Nadie, es gratis"]}, a:0}},
  recession: {e:"📉", en:"Recession", es:"Recesión", mult:() => 0.8, jobs:0.5,
    what:{en:"Spending is down. Stores cut prices 20%, but jobs pay half.", es:"El gasto bajó. Las tiendas bajan 20% los precios, pero los trabajos pagan la mitad."},
    q:{q:{en:"In a recession, which usually goes UP?", es:"En una recesión, ¿qué suele SUBIR?"},
       c:{en:["Unemployment","Real GDP","Business profits"], es:["El desempleo","El PIB real","Las ganancias"]}, a:0}},
  boom: {e:"🚀", en:"Economic boom", es:"Auge económico", mult:() => 1.15, jobs:2,
    what:{en:"Business is great! Jobs pay double, and prices are creeping up 15%.", es:"¡Hay mucho negocio! Los trabajos pagan el doble y los precios suben 15%."},
    q:{q:{en:"During a boom, the Fed is most likely to…", es:"Durante un auge, la Fed probablemente…"},
       c:{en:["Raise interest rates to cool inflation","Cut taxes to zero","Print more money"], es:["Subir las tasas para frenar la inflación","Bajar los impuestos a cero","Imprimir más dinero"]}, a:0}},
  buylocal: {e:"🛍️", en:"Buy Local Week", es:"Semana de comprar local", mult:() => 1,
    what:{en:"Buying from a classmate in the Market gives you 20% of the price back.", es:"Comprar a un compañero en el Mercado te devuelve el 20% del precio."},
    q:{q:{en:"Why might a town encourage people to buy from local businesses?", es:"¿Por qué un pueblo animaría a comprar en negocios locales?"},
       c:{en:["Money spent locally keeps circulating in the town's economy","It makes prices go down everywhere","It stops all imports"], es:["El dinero gastado localmente sigue circulando en la economía del pueblo","Hace que bajen todos los precios","Detiene todas las importaciones"]}, a:0}},
  shock: {e:"🏭", en:"Supply shock", es:"Choque de oferta", mult:it => /^(bed|sofa)/.test(it.id) ? 2 : 1,
    what:{en:"The furniture factory flooded. Beds and sofas are scarce, so their prices doubled.", es:"La fábrica de muebles se inundó. Camas y sofás escasean y su precio se duplicó."},
    q:{q:{en:"A factory shutdown shifts the supply curve for sofas…", es:"El cierre de una fábrica desplaza la curva de oferta de sofás…"},
       c:{en:["Left: less supply, higher price","Right: more supply, lower price","It doesn't move"], es:["A la izquierda: menos oferta, precio más alto","A la derecha: más oferta, precio más bajo","No se mueve"]}, a:0}}
};
const PLANKS = {
  prices:  {e:"🏷️", en:"Lower shop prices", es:"Bajar los precios"},
  park:    {e:"🌳", en:"Build a new park", es:"Construir un parque"},
  crates:  {e:"🎁", en:"Weekly crate giveaway", es:"Cajas gratis cada semana"},
  savings: {e:"🏦", en:"Higher savings interest", es:"Más interés en ahorros"},
  petcap:  {e:"🐶", en:"Fair pet prices", es:"Precios justos de mascotas"},
  study:   {e:"📚", en:"Study groups for everyone", es:"Grupos de estudio para todos"},
  events:  {e:"🎉", en:"More plaza events", es:"Más eventos en la plaza"},
  clean:   {e:"🧹", en:"A cleaner, kinder town", es:"Un pueblo más limpio y amable"}
};
const LAWS = {
  park_tax:    {e:"🌳", en:"Park Tax", es:"Impuesto del parque", what:{en:"10% sales tax on Market sales. The tax counts toward the class goal.", es:"Impuesto del 10% en ventas del Mercado. Cuenta para la meta de la clase."}},
  pet_cap:     {e:"🐶", en:"Pet Price Cap", es:"Tope a mascotas", what:{en:"Pets can't be listed for more than 25 Smithbucks.", es:"Las mascotas no pueden venderse por más de 25 Smithbucks."}},
  save_bonus:  {e:"🏦", en:"Savers' Bonus", es:"Bono de ahorro", what:{en:"The Town Bank pays 1% more interest every week.", es:"El Banco paga 1% más de interés cada semana."}},
  crate_friday:{e:"🎁", en:"Crate Fridays", es:"Viernes de cajas", what:{en:"Every resident gets a crate each Friday.", es:"Cada residente recibe una caja cada viernes."}},
  shop_sale:   {e:"🏷️", en:"Shop Subsidy", es:"Subsidio a la tienda", what:{en:"The town pays 10% of shop prices for you.", es:"El pueblo paga el 10% de los precios de la tienda."}}
};
const BIZ = {
  bakery:  {e:"🧁", en:"Bakery", es:"Panadería", items:["prod_cupcakes","prod_cookie_jar"]},
  flowers: {e:"💐", en:"Flower shop", es:"Florería", items:["prod_bouquet","prod_sunflower"]},
  art:     {e:"🎨", en:"Art studio", es:"Estudio de arte", items:["prod_painting","prod_sculpture"]},
  crafts:  {e:"🧶", en:"Craft shop", es:"Tienda de manualidades", items:["prod_quilt_rug","prod_knit_lamp"]},
  tech:    {e:"🔧", en:"Tech repair", es:"Reparación de tecnología", items:["prod_radio","prod_robot"]},
  smoothie:{e:"🥤", en:"Smoothie bar", es:"Barra de batidos", items:["prod_smoothie","prod_fruit_bowl"]}
};
const START_COST = 10, DAILY_MAKE = 5;
/* questions answered today (any practice, challenge or review) */
const answeredToday = () => { const d = typeof today === "function" ? today() : ""; return Object.values(S.prog || {}).filter(p => p && p.last === d).length; };
const JOBS = {
  answer10:{e:"✏️", en:"Answer 10 practice questions in your classes", es:"Responde 10 preguntas de práctica de tus clases", pay:3, learn:1, check:() => answeredToday() >= 10},
  study:  {e:"📚", en:"Earn 20 XP studying today", es:"Gana 20 XP estudiando hoy", learn:1, check:() => myXp() - (civ().jobs.xp0 || myXp()) >= 20},
  visit:  {e:"🏡", en:"Visit a classmate's house", es:"Visita la casa de un compañero"},
  sticker:{e:"⭐", en:"Leave a sticker on a house", es:"Deja una calcomanía en una casa"},
  chat:   {e:"💬", en:"Say something in Quick chat", es:"Di algo en el chat rápido"},
  bank:   {e:"🏦", en:"Put Smithbucks in the Town Bank", es:"Pon Smithbucks en el Banco"},
  market: {e:"🛒", en:"List or buy something in the Market", es:"Publica o compra algo en el Mercado"},
  vote:   {e:"🏆", en:"Vote for Home of the Week", es:"Vota por la Casa de la Semana"},
  hall:   {e:"🏛️", en:"Check the Town Hall", es:"Visita el Ayuntamiento"},
  buylocal:{e:"🤝", en:"Buy something from a classmate in the Market", es:"Compra algo a un compañero en el Mercado"},
  study50:{e:"🧠", en:"Earn 50 XP today (pays 2)", es:"Gana 50 XP hoy (paga 2)", pay:2, learn:1, check:() => myXp() - (civ().jobs.xp0 || myXp()) >= 50},
  crate:  {e:"🎁", en:"Open a crate", es:"Abre una caja"},
  decorate:{e:"🛋️", en:"Place or move furniture in your house", es:"Pon o mueve un mueble en tu casa"},
  trade:  {e:"🔄", en:"Send or accept a trade", es:"Envía o acepta un intercambio"},
  make:   {e:"🧁", en:"Make a product for a business", es:"Haz un producto para un negocio"},
  sell:   {e:"💰", en:"Sell something in the Market", es:"Vende algo en el Mercado"},
  save:   {e:"🐷", en:"Have 10+ Smithbucks in savings", es:"Ten 10+ Smithbucks en ahorros", check:() => civ().bank.bal >= 10}
};

/* ---------------------------------------------------------------- shared helpers */
const cur = () => { const c = CLS(); return c.event && c.event.id && (!c.event.until || c.event.until > Date.now()) ? c.event : null; };
const laws = () => (CLS().laws || []).filter(k => LAWS[k]);
const hasLaw = k => laws().includes(k);
const fedRate = () => { const r = CLS().econ && CLS().econ.rate; return r == null ? 2 : +r; };
const saveRate = () => fedRate() + (hasLaw("save_bonus") ? 1 : 0);
const jobPay = () => { const e = cur(); return e && EVENTS[e.kind] && EVENTS[e.kind].jobs || 1; };
function flag(k){ const j = civ().jobs; if (j.day !== day()) rollJobs(); j.flags[k] = 1; save(); }
function sheet(html){ const box = document.getElementById("certAsk"); if (!box) return; box.classList.remove("hidden");
  box.innerHTML = `<div class="certask tcard" role="dialog" aria-modal="true">${html}</div>`; }
const closeSheet = () => window.townCloseCard && window.townCloseCard();
function qCard(q, onDone, title){
  const opts = q.c[S.lang === "es" && q.c.es ? "es" : "en"], order = shuffle3(opts.length);
  window._civQ = {q, order, onDone};
  sheet(`<div class="eyebrow">${title || W2("Econ check","Pregunta de economía")}</div><h2 style="font-size:20px">${E(L2(q.q))}</h2>
    <div class="cqopts">${order.map((i, k) => `<button class="btn" onclick="civAnswer(${k})">${E(opts[i])}</button>`).join("")}</div><p id="cqWhy"></p>`);
}
function shuffle3(n){ const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
window.civAnswer = function(k){
  const st = window._civQ; if (!st || st.answered) return; st.answered = true;
  const ok = st.order[k] === st.q.a, btns = document.querySelectorAll(".cqopts button");
  btns.forEach((b, i) => { b.disabled = true; if (st.order[i] === st.q.a) b.classList.add("primary"); });
  const why = document.getElementById("cqWhy");
  if (why) why.innerHTML = `<b>${ok ? W2("Correct!","¡Correcto!") : W2("Not quite.","Casi.")}</b> ${st.q.why ? E(L2(st.q.why)) : ""}
    <br><button class="btn primary wide" style="margin-top:10px" onclick="townCloseCard()">${W2("Done","Listo")}</button>`;
  st.onDone && st.onDone(ok);
};
function bar(t, col){ return `<div class="cbar"><i style="width:${Math.round(Math.min(1, Math.max(0, t)) * 100)}%;background:${col || "var(--gold,#E3A21A)"}"></i></div>`; }

/* ================================================================ 1. class goal + league */
function goal(){ const g = CLS().goal; return g && g.id ? g : null; }
function goalProgress(){
  const g = goal(); if (!g) return {n:0, rows:[]};
  const rows = Object.entries(T.pub).map(([sid, p]) => ({sid, name:p.name, n:p.goal && p.goal.id === g.id ? p.goal.n | 0 : 0}));
  const mine = rows.find(r => r.sid === SESS().sid); if (mine) mine.n = Math.max(mine.n, myGoalN());
  else rows.push({sid:SESS().sid, name:SESS().name, n:myGoalN()});
  return {n:rows.reduce((s, r) => s + r.n, 0), rows:rows.sort((a, b) => b.n - a.n)};
}
function myGoalN(){ const g = goal(); return g ? xpSince("goal:" + g.id) + civ().tax * 20 : 0; }
const goalDone = () => { const g = goal(); return !!g && (g.done || goalProgress().n >= g.target); };
function unlocked(){ const u = new Set(CLS().upgrades || []); const g = goal(); if (g && g.reward && goalDone()) u.add(g.reward); return [...u].filter(k => UPGRADES[k]); }
let _leagueAt = 0, LEAGUE = [];
function leaguePush(){
  const c = CLS(); if (!c.ownerUid || !SESS()) return;
  const wk = week(), pubs = Object.values(T.pub);
  const total = pubs.reduce((s, p) => s + (p.wk && p.wk.w === wk ? p.wk.n | 0 : 0), 0) + (pubs.some(p => p.uid === store().uid()) ? 0 : xpSince("wk:" + wk));
  const n = Math.max(1, pubs.filter(p => p.wk && p.wk.w === wk).length);
  const P = `league/${c.ownerUid}/periods/${SESS().cid}`, row = LEAGUE.find(r => r.id === SESS().cid);
  if (row && row.w === wk && row.total >= total) return;
  if (Date.now() - _leagueAt < 120000) return; _leagueAt = Date.now();
  store().set(P, {name:SESS().className || "", w:wk, total, n, at:Date.now()}, true).catch(e => console.warn("league", e));
}
function paintGoalCard(){
  const g = goal();
  if (!g) return `<section class="panel"><div class="eyebrow">🎯 ${W2("Class goal","Meta de la clase")}</div>
    <p class="muted">${W2("No goal right now. Coach Smith sets one, and when your class reaches it the plaza gets an upgrade.","No hay meta ahora. Coach Smith pone una y, cuando la clase la cumpla, la plaza se mejora.")}</p>${upgradeShelf()}</section>`;
  const pr = goalProgress(), up = UPGRADES[g.reward], done = goalDone();
  return `<section class="panel cgoal ${done ? "done" : ""}"><div class="eyebrow">🎯 ${W2("Class goal","Meta de la clase")}</div>
    <div class="cgoalh">${up ? img(`${TA}plaza/${g.reward}.webp`, up.e, "big") : ""}<div>
      <h2>${W2(`Earn ${g.target.toLocaleString()} XP together`, `Ganen ${g.target.toLocaleString()} XP juntos`)}</h2>
      <p class="muted">${up ? W2(`Reward: a ${up.en} on the plaza, plus a crate for everyone.`, `Premio: ${up.es} en la plaza y una caja para todos.`) : ""}
        ${g.until ? " · " + W2("Ends","Termina") + " " + new Date(g.until).toLocaleDateString() : ""}</p></div></div>
    ${bar(pr.n / g.target, done ? "#3BB273" : null)}
    <p><b>${pr.n.toLocaleString()}</b> / ${g.target.toLocaleString()} XP ${done ? "· 🎉 " + W2("Reached!","¡Logrado!") : ""}</p>
    <div class="cmini">${pr.rows.filter(r => r.n > 0).slice(0, 5).map((r, i) => `<span>${["🥇","🥈","🥉","4.","5."][i]} ${E(r.name)} <b>${r.n}</b></span>`).join("")}</div>
    <p class="muted" style="font-size:12px">${W2("Every XP you earn in Smith's Classroom counts: studying, assignments, games." + (hasLaw("park_tax") ? " Park Tax money counts too." : ""),
      "Cuenta toda la XP que ganes en Smith's Classroom: estudiar, tareas, juegos." + (hasLaw("park_tax") ? " El Impuesto del parque también cuenta." : ""))}</p>
    ${upgradeShelf()}</section>`;
}
function upgradeShelf(){ const u = unlocked(); if (!u.length) return "";
  return `<div class="cups"><small>${W2("Plaza upgrades unlocked:","Mejoras de la plaza:")}</small> ${u.map(k => `<span title="${E(L2(UPGRADES[k]))}">${UPGRADES[k].e} ${E(L2(UPGRADES[k]))}</span>`).join("")}</div>`; }
function paintLeague(){
  const wk = week(), rows = LEAGUE.filter(r => r.w === wk).sort((a, b) => (b.total / b.n) - (a.total / a.n));
  return `<section class="panel"><div class="eyebrow">🏁 ${W2("Period vs. period · this week","Periodo contra periodo · esta semana")}</div>
    ${rows.length ? `<table class="ttab cleague"><tr><th></th><th>${W2("Period","Periodo")}</th><th>${W2("XP per student","XP por estudiante")}</th><th>${W2("Total","Total")}</th></tr>
      ${rows.map((r, i) => `<tr class="${r.id === SESS().cid ? "me" : ""}"><td>${["🥇","🥈","🥉"][i] || i + 1}</td><td>${E(r.name)}</td><td><b>${Math.round(r.total / r.n)}</b></td><td>${r.total.toLocaleString()}</td></tr>`).join("")}</table>`
      : `<p class="muted">${W2("No scores yet this week. Earn XP to put your period on the board!","Aún no hay puntos esta semana. ¡Gana XP para poner a tu periodo en la tabla!")}</p>`}
    <p class="muted" style="font-size:12px">${W2("Ranked by XP per student, so small and big classes compete fairly. Resets every Monday.","Se ordena por XP por estudiante para que compitan justo. Se reinicia cada lunes.")}</p></section>`;
}

/* ================================================================ 2. bank */
function accrue(){
  const b = civ().bank, today = day(); if (b.at === today) return;
  const days = Math.max(0, Math.round((new Date(today) - new Date(b.at)) / 864e5));
  if (days > 0 && b.bal > 0) { const before = b.bal; b.bal = b.bal * Math.pow(1 + saveRate() / 100 / 7, Math.min(days, 60));
    const earned = b.bal - before; if (earned >= 0.01) log("interest", earned); }
  b.at = today;
  /* a loan past due is collected automatically and hurts the credit score */
  if (b.loan && Date.now() > b.loan.due) {
    const owe = loanOwed(); let need = owe;
    const fromSave = Math.min(Math.floor(b.bal), need); b.bal -= fromSave; need -= fromSave;
    const fromCash = Math.min(S.tokens | 0, need); T.coins(-fromCash); need -= fromCash;
    log("late", -owe); b.credit = Math.max(300, b.credit - 60); b.loan = need > 0 ? {...b.loan, amt:need, fee:0, due:Date.now() + 7 * 864e5, late:true} : null;
    T.toast(W2("Your loan was late, so the bank collected it. Credit score −60.", "Tu préstamo se venció y el banco lo cobró. Puntaje de crédito −60."));
  }
  save();
}
function log(k, amt){ const b = civ().bank; b.hist.unshift({k, amt:Math.round(amt * 100) / 100, at:Date.now()}); b.hist = b.hist.slice(0, 12); }
const loanLimit = () => { const c = civ().bank.credit, b = civ().bank.boost; return (c >= 750 ? 40 : c >= 680 ? 30 : c >= 600 ? 20 : 10) + (b && b.until > Date.now() ? b.n : 0); };
const loanRate = () => fedRate() + 3;
function loanOwed(){ const l = civ().bank.loan; if (!l) return 0; const weeks = Math.max(1, Math.ceil((Date.now() - l.at) / (7 * 864e5)));
  return l.amt + Math.ceil(l.amt * l.rate / 100 * weeks) - (l.paid || 0); }
function creditWord(c){ return c >= 750 ? W2("Excellent","Excelente") : c >= 680 ? W2("Good","Bueno") : c >= 600 ? W2("Fair","Regular") : W2("Poor","Bajo"); }
function paintBank(el){
  accrue(); const b = civ().bank, l = b.loan;
  el.innerHTML = `<section class="panel raised cbank">${img(`${TA}civic/bank.webp`, "🏦", "big")}
      <div><div class="eyebrow">${W2("Town Bank","Banco del Pueblo")}</div><h2>${W2("Savings","Ahorros")}: 💵 ${b.bal.toFixed(2)}</h2>
      <p class="muted">${W2(`Interest: ${saveRate()}% a week, added every day.`, `Interés: ${saveRate()}% por semana, se suma cada día.`)}
        ${W2("Coach Smith sets the rate, like the Fed.","Coach Smith fija la tasa, como la Fed.")}</p></div></section>
    <section class="panel"><div class="eyebrow">${W2("Deposit or withdraw","Depositar o retirar")}</div>
      <p class="muted">${W2(`Cash: 💵 ${S.tokens}. Savings grow; cash doesn't.`, `Efectivo: 💵 ${S.tokens}. Los ahorros crecen; el efectivo no.`)}</p>
      <div class="tsell"><input id="bAmt" type="number" min="1" inputmode="numeric" placeholder="${W2("Coins","Monedas")}">
        <button class="btn primary" onclick="civBank('in')">${W2("Deposit","Depositar")}</button><button class="btn" onclick="civBank('out')">${W2("Withdraw","Retirar")}</button></div>
      <p class="muted" style="font-size:12px">${W2(`In 4 weeks, 20 Smithbucks grows to about ${(20 * Math.pow(1 + saveRate() / 700, 28)).toFixed(1)}: that's compound interest.`,
        `En 4 semanas, 20 Smithbucks crecen a unas ${(20 * Math.pow(1 + saveRate() / 700, 28)).toFixed(1)}: eso es interés compuesto.`)}</p></section>
    ${gameMoneyPanel()}
    <section class="panel"><div class="eyebrow">${W2("Loans and credit","Préstamos y crédito")}</div>
      <div class="ccredit"><b>${b.credit}</b><span>${creditWord(b.credit)}</span>${bar((b.credit - 300) / 550, b.credit >= 680 ? "#3BB273" : b.credit >= 600 ? "#E3A21A" : "#E4572E")}</div>
      ${l ? `<p>${W2("You owe","Debes")} <b>💵 ${loanOwed()}</b> · ${W2("due","vence")} ${new Date(l.due).toLocaleDateString()}${l.late ? " ⚠️" : ""}</p>
           <button class="btn primary" onclick="civRepay()">${W2("Pay it back","Pagar")}</button>`
         : `<p class="muted">${W2(`You can borrow up to ${loanLimit()} Smithbucks at ${loanRate()}% a week. Pay it back within 7 days to raise your credit score. Late loans lower it.`,
              `Puedes pedir hasta ${loanLimit()} Smithbucks al ${loanRate()}% por semana. Págalo en 7 días para subir tu puntaje. Si te atrasas, baja.`)}</p>
           <div class="tsell"><input id="lAmt" type="number" min="1" max="${loanLimit()}" inputmode="numeric" placeholder="${W2("Coins","Monedas")}">
           <button class="btn" onclick="civBorrow()">${W2("Borrow","Pedir prestado")}</button></div>`}</section>
    <section class="panel"><div class="eyebrow">${W2("History","Historial")}</div>
      ${b.hist.map(h => `<div class="chist"><span>${{in:"⬇️ " + W2("Deposit","Depósito"), out:"⬆️ " + W2("Withdrawal","Retiro"), interest:"✨ " + W2("Interest","Interés"),
        loan:"💵 " + W2("Loan","Préstamo"), repay:"✅ " + W2("Repaid","Pagado"), late:"⚠️ " + W2("Late, collected","Atrasado, cobrado")}[h.k] || h.k}</span>
        <b>${h.amt > 0 ? "+" : ""}${h.amt}</b><small class="muted">${new Date(h.at).toLocaleDateString()}</small></div>`).join("") || `<p class="muted">—</p>`}</section>`;
}
function gameMoneyPanel(){
  if (typeof window.EARNINGS !== "function") return "";
  const g = window.EARNINGS();
  return `<section class="panel"><div class="eyebrow">💱 ${W2("Game money comes to town","El dinero de los juegos llega al pueblo")}</div>
    <p class="muted">${W2(`Money you earn inside games turns into Town Smithbucks automatically (up to ${g.cap} a day). Spending in a game never costs Town Smithbucks.`,
      `El dinero que ganas en los juegos se convierte solo en Smithbucks del pueblo (hasta ${g.cap} al día). Gastar en un juego nunca cuesta Smithbucks del pueblo.`)}</p>
    ${g.src.map(s => `<div class="chist"><span><b>${E(s.name)}</b> · ${s.unit === "$" ? "$" + s.rate : s.rate + " " + s.unit} = 💵1</span>
      <b>+${s.moved}</b><small class="muted">${s.active ? (s.waiting ? W2(`${s.waiting} waiting for tomorrow`, `${s.waiting} esperan a mañana`) : W2("so far","hasta ahora")) : W2("not played yet","aún no juegas")}</small></div>`).join("")}
    <p class="muted" style="font-size:12px">${W2(`Today: ${g.today}/${g.cap}. The arcade games and assignments already pay Smithbucks straight to you.`, `Hoy: ${g.today}/${g.cap}. Los juegos del arcade y las tareas ya te pagan Smithbucks directamente.`)}</p></section>`;
}
window.civBank = function(dir){
  accrue(); const b = civ().bank, n = parseInt(document.getElementById("bAmt").value, 10);
  if (!(n > 0)) return T.toast(W2("Type how many Smithbucks.","Escribe cuántas Smithbucks."));
  if (dir === "in") { if (n > S.tokens) return T.toast(W2("You don't have that much cash.","No tienes tanto efectivo.")); T.coins(-n); b.bal += n; log("in", n); flag("bank"); }
  else { if (n > Math.floor(b.bal)) return T.toast(W2("Not enough in savings.","No hay suficiente en ahorros.")); b.bal -= n; T.coins(n); log("out", -n); }
  T.persist(); paint();
};
window.civBorrow = function(){
  accrue(); const b = civ().bank, n = parseInt(document.getElementById("lAmt").value, 10);
  if (b.loan) return; if (!(n > 0 && n <= loanLimit())) return T.toast(W2(`You can borrow 1 to ${loanLimit()} Smithbucks.`, `Puedes pedir de 1 a ${loanLimit()} Smithbucks.`));
  if (!confirm(W2(`Borrow ${n} Smithbucks at ${loanRate()}% a week? You'll owe about ${n + Math.ceil(n * loanRate() / 100)} if you repay this week.`,
                  `¿Pedir ${n} Smithbucks al ${loanRate()}% semanal? Deberás unas ${n + Math.ceil(n * loanRate() / 100)} si pagas esta semana.`))) return;
  b.loan = {amt:n, rate:loanRate(), at:Date.now(), due:Date.now() + 7 * 864e5}; T.coins(n); log("loan", n); T.persist(); paint();
};
window.civRepay = function(){
  accrue(); const b = civ().bank, owe = loanOwed(); if (!b.loan) return;
  if (S.tokens < owe) return T.toast(W2(`You need ${owe} Smithbucks in cash (withdraw from savings first).`, `Necesitas ${owe} Smithbucks en efectivo (retira de tus ahorros).`));
  T.coins(-owe); log("repay", -owe); if (!b.loan.late) b.credit = Math.min(850, b.credit + 25); b.loan = null; T.persist(); paint();
  T.toast(W2("Loan repaid! Your credit score went up.", "¡Préstamo pagado! Tu puntaje de crédito subió."));
};

/* ================================================================ 3. economy events */
EXT.priceMult.push(it => { const e = cur(); let m = e && EVENTS[e.kind] ? EVENTS[e.kind].mult(it) : 1; if (hasLaw("shop_sale")) m *= 0.9; return m; });
EXT.banner.push(() => {
  const e = cur(); if (!e || !EVENTS[e.kind]) return "";
  const ev = EVENTS[e.kind], answered = civ().evq && civ().evq[e.id];
  return `<section class="panel cevent"><span class="cevi">${ev.e}</span><div><b>${E(L2(ev))}</b> ${E(L2(ev.what))}</div>
    ${answered ? "" : `<button class="btn primary" onclick="civEventQ()">${W2("Econ check: +2 Smithbucks","Pregunta: +2 Smithbucks")}</button>`}</section>`;
});
window.civEventQ = function(){
  const e = cur(); if (!e) return; const ev = EVENTS[e.kind]; const c = civ(); c.evq = c.evq || {};
  if (c.evq[e.id]) return;
  qCard(ev.q, ok => { c.evq[e.id] = ok ? 1 : -1; if (ok) T.coins(2); T.persist(); setTimeout(() => T.isTown() && T.paintTown(), 0); });
};

/* ================================================================ 4. elections and laws */
const elec = () => { const e = CLS().election; return e && e.id ? e : null; };
let CANDS = [], PROPS = [];
/* ---------------- impeachment ----------------
   Like the Constitution: students petition, the "House" (the class) impeaches
   by a simple majority, then the "Senate" trial needs two-thirds to remove the
   mayor. Coach Smith presides like the Chief Justice and counts every vote. */
const IMP_WHY = {
  promise: {e:"🤥", en:"Broke a campaign promise", es:"Rompió una promesa de campaña"},
  power:   {e:"👑", en:"Abused the mayor's power", es:"Abusó del poder de la alcaldía"},
  ignore:  {e:"🙉", en:"Ignores what the class wants", es:"Ignora lo que quiere la clase"},
  absent:  {e:"💤", en:"Never shows up or does the job", es:"No aparece ni hace su trabajo"},
  unfair:  {e:"⚖️", en:"Treats people unfairly", es:"Trata a la gente injustamente"}
};
const LW = (en, es) => ({en, es});
const imp = () => { const i = CLS().impeach, m = CLS().mayor; return i && i.id && m && m.sid && i.sid === m.sid ? i : null; };
const impKey = () => { const m = CLS().mayor; return m && m.sid ? "imp_" + (m.eid || m.sid) : null; };
function paintImpeach(){
  const m = CLS().mayor, ci = CLS().impeach;
  if (!m || !m.sid) return ci && ci.phase === "done" && ci.result ? `<section class="panel"><div class="eyebrow">⚖️ ${W2("Impeachment","Juicio político")}</div><p class="tnote">${E(L2(ci.result))}</p></section>` : "";
  const i = imp(), me = SESS().sid, isMayor = m.sid === me, k = impKey(), signed = civ().voted["pet:" + k];
  const last = CLS().impeach && CLS().impeach.sid === m.sid && CLS().impeach.phase === "done" ? CLS().impeach : null;
  let body = "";
  if (i && i.phase === "house") body = `<p><b>${W2("Impeachment vote (the House)","Votación de juicio político (la Cámara)")}</b>: ${W2(`Should ${E(m.name)} be impeached? A simple majority impeaches.`, `¿Se debe acusar a ${E(m.name)}? Basta la mayoría simple.`)}</p>`
    + voteBtns(i.id + "_house", isMayor);
  else if (i && i.phase === "senate") body = `<p class="tnote">⚖️ ${W2(`${E(m.name)} was impeached. Now the trial (the Senate): it takes two-thirds to remove the mayor from office.`, `${E(m.name)} fue acusado. Ahora el juicio (el Senado): se necesitan dos tercios para destituir.`)}</p>`
    + voteBtns(i.id + "_senate", isMayor);
  else if (!isMayor) body = signed ? `<p class="muted">${W2("You signed the petition. Coach Smith decides if there's enough support to hold an impeachment vote.","Firmaste la petición. Coach Smith decide si hay apoyo suficiente para votar.")}</p>`
    : `<button class="btn ghost" onclick="civPetition()">📜 ${W2("Sign a petition to impeach the mayor","Firmar una petición de juicio político")}</button>`;
  if (last && last.result) body = `<p class="muted">${E(L2(last.result))}</p>` + body;
  return `<section class="panel"><div class="eyebrow">⚖️ ${W2("Impeachment","Juicio político")}</div>${body}
    <p class="muted" style="font-size:12px">${W2("Like the U.S. Constitution: the House impeaches by majority, the Senate removes by two-thirds. Votes are secret.","Como en la Constitución de EE. UU.: la Cámara acusa por mayoría y el Senado destituye con dos tercios. El voto es secreto.")}</p></section>`;
}
function voteBtns(pid, isMayor){
  if (isMayor) return `<p class="muted">${W2("You're the one on trial, so you don't vote.","Eres quien está en juicio, así que no votas.")}</p>`;
  if (civ().voted["law:" + pid]) return `<p class="muted">${W2("You voted. Coach Smith will count the votes.","Votaste. Coach Smith contará los votos.")}</p>`;
  return `<span class="cyn"><button class="btn primary" onclick="civLawVote('${pid}',true)">👍 ${W2("Yes","Sí")}</button><button class="btn" onclick="civLawVote('${pid}',false)">👎 ${W2("No","No")}</button></span>`;
}
window.civPetition = function(){
  sheet(`<h2>📜 ${W2("Petition to impeach","Petición de juicio político")}</h2><p class="muted">${W2("Pick the reason. Your signature is private: only Coach Smith sees who signed.","Elige la razón. Tu firma es privada: solo Coach Smith ve quién firmó.")}</p>
    <div class="cpick col">${Object.entries(IMP_WHY).map(([k, w]) => `<button onclick="civPetitionGo('${k}')">${w.e} <b>${E(L2(w))}</b></button>`).join("")}</div>
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.civPetitionGo = async function(why){
  const k = impKey(); if (!k) return;
  try { await store().set(`${C()}/lawvotes/${k}_pet_${SESS().sid}`, {pid:k + "_pet", sid:SESS().sid, v:true, why, at:Date.now()}); } catch(e){}
  civ().voted["pet:" + k] = 1; save(); closeSheet(); T.toast(W2("Petition signed.","Petición firmada.")); paint();
};
function paintElection(){
  const e = elec(), m = CLS().mayor;
  const mayorLine = m && m.sid ? `<div class="cmayor">${img(`${TA}civic/mayor_sash.webp`, "🎖️")}<div><small>${W2("Mayor","Alcalde")}</small><b>${E(m.name)}</b></div></div>` : "";
  if (!e) return `<section class="panel"><div class="eyebrow">🗳️ ${W2("Elections","Elecciones")}</div>${mayorLine}
    <p class="muted">${W2("No election right now. When Coach Smith opens one, you can run for mayor or vote.","No hay elección ahora. Cuando Coach Smith abra una, puedes postularte o votar.")}</p></section>`;
  const mine = CANDS.find(c => c.sid === SESS().sid), voted = civ().voted[e.id];
  let body = "";
  if (e.phase === "filing") body = `<p>${W2("Candidates are signing up now. Voting opens soon.","Los candidatos se están inscribiendo. La votación abre pronto.")}</p>
    ${mine ? `<p class="tnote">✅ ${W2("You're on the ballot.","Estás en la boleta.")} <button class="btn ghost" onclick="civWithdraw()">${W2("Withdraw","Retirarme")}</button></p>`
           : `<button class="btn primary" onclick="civRun()">${W2("Run for mayor","Postularme a alcalde")}</button>`}`;
  else if (e.phase === "voting") body = voted ? `<p class="tnote">🗳️ ${W2("Your vote is in. Results come out when Coach Smith closes the polls.","Tu voto está registrado. Los resultados salen cuando Coach Smith cierre la votación.")}</p>`
    : `<p>${W2("Pick one. Votes are secret: only Coach Smith counts them.","Elige uno. El voto es secreto: solo Coach Smith los cuenta.")}</p>`;
  else if (e.phase === "closed" && e.result) body = `<p class="tnote">🎉 ${W2(`${E(e.result.name)} won with ${e.result.votes} of ${e.result.total} votes.`, `${E(e.result.name)} ganó con ${e.result.votes} de ${e.result.total} votos.`)}</p>
    <div class="cmini">${(e.result.tally || []).map(([n, v]) => `<span>${E(n)} <b>${v}</b></span>`).join("")}</div>`;
  return `<section class="panel"><div class="eyebrow">🗳️ ${W2("Election for mayor","Elección de alcalde")} · ${{filing:W2("sign-ups","inscripciones"), voting:W2("voting","votación"), closed:W2("results","resultados")}[e.phase] || ""}</div>
    ${mayorLine}${body}
    <div class="ccands">${CANDS.map(c => `<div class="ccand">${img(`${TA}civic/podium.webp`, "🎤")}<div><b>${E(c.name)}</b>
      <div class="cplanks">${(c.planks || []).map(k => PLANKS[k] ? `<span>${PLANKS[k].e} ${E(L2(PLANKS[k]))}</span>` : "").join("")}</div></div>
      ${e.phase === "voting" && !voted && c.sid !== SESS().sid ? `<button class="btn primary" onclick="civVote('${c.sid}')">${W2("Vote","Votar")}</button>` : ""}</div>`).join("")
      || (e.phase !== "closed" ? `<p class="muted">${W2("No candidates yet.","Aún no hay candidatos.")}</p>` : "")}</div></section>`;
}
window.civRun = function(){
  const e = elec(); if (!e || e.phase !== "filing") return;
  window._planks = [];
  sheet(`<h2>${W2("Run for mayor","Postúlate a alcalde")}</h2><p class="muted">${W2("Pick the two promises you'll campaign on.","Elige las dos promesas de tu campaña.")}</p>
    <div class="cpick">${Object.entries(PLANKS).map(([k, p]) => `<button data-k="${k}" onclick="civPlank(this)">${p.e} ${E(L2(p))}</button>`).join("")}</div>
    <button class="btn primary wide" onclick="civFile()">${W2("Get on the ballot","Entrar a la boleta")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.civPlank = function(b){ const k = b.dataset.k, a = window._planks, i = a.indexOf(k);
  if (i >= 0) a.splice(i, 1); else { if (a.length >= 2) a.shift(); a.push(k); }
  document.querySelectorAll(".cpick button").forEach(x => x.classList.toggle("on", a.includes(x.dataset.k))); };
window.civFile = async function(){
  const e = elec(), a = window._planks; if (!e || a.length !== 2) return T.toast(W2("Pick two promises.","Elige dos promesas."));
  try { await store().set(`${C()}/candidates/${e.id}_${SESS().sid}`, {eid:e.id, sid:SESS().sid, uid:store().uid(), name:SESS().name, planks:a, at:Date.now()});
    closeSheet(); T.toast(W2("You're on the ballot. Go campaign!","¡Estás en la boleta! ¡A hacer campaña!")); } catch(err){ T.toast(W2("Couldn't sign up right now.","No se pudo inscribir.")); }
};
window.civWithdraw = function(){ const e = elec(); if (e && confirm(W2("Take your name off the ballot?","¿Quitar tu nombre de la boleta?")))
  store().del(`${C()}/candidates/${e.id}_${SESS().sid}`).catch(() => {}); };
window.civVote = async function(sid){
  const e = elec(), c = CANDS.find(x => x.sid === sid); if (!e || !c) return;
  if (!confirm(W2(`Vote for ${c.name}? You can't change it.`, `¿Votar por ${c.name}? No se puede cambiar.`))) return;
  try { await store().set(`${C()}/votes/${e.id}_${SESS().sid}`, {eid:e.id, sid:SESS().sid, for:sid, at:Date.now()});
    civ().voted[e.id] = 1; save(); T.toast(W2("Vote cast!","¡Voto emitido!")); paint(); }
  catch(err){ civ().voted[e.id] = 1; save(); T.toast(W2("You already voted.","Ya votaste.")); paint(); }
};
/* ---------------- student-written laws ----------------
   The mayor can write a law in their own words. It goes to Coach Smith first
   (he can edit, approve for a vote, or reject); nobody else sees it until then.
   A word list blocks inappropriate words before it is even sent. */
const BAD = ("fuck fuk fck shit sht bitch biatch bastard asshole ass arse dick dik cock cok pussy puss cunt cum jizz porn porno sex sexy " +
  "nude nudes naked boob boobs tit tits titty penis vagina dildo horny hoe hoes whore slut thot twat wank wanker prick douche damn goddamn hell crap piss " +
  "nigger nigga niga chink gook spic wetback beaner kike faggot fag fagot dyke tranny retard retarded rape rapist molest pedo pedophile nazi hitler " +
  "kkk kill murder suicide gun guns bomb terrorist weed cocaine meth drunk vape " +
  "puta puto pendejo pendeja chinga chingar chingada verga pinche culo mierda cabron cabrona marica maricon joder coño cono culero zorra perra malparido gonorrea").split(" ");
/* fragments caught inside a single word (never across two words: "wish it" is not a bad word) */
const BAD_STEMS = ["fuck","shit","bitch","nigg","fagg","cunt","whore","slut","rapist","porn","penis","vagin","dildo","pedoph","retard","molest","chinga","pendej","mierd","cabron","culer","asshol","motherf"];
/* real words that contain a fragment */
const ALLOW_WORDS = ["therapist","therapists","retardant","retardants","scunthorpe","shitake","shiitake","cocktail","cockpit","peacock","hancock","dickens","assess","assessment","class","glass","grass","pass","bass","mass","negro","negra"];
const normWord = w => String(w || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[0@4]/g, m => ({"0":"o","@":"a","4":"a"})[m]).replace(/[1!|]/g, "i").replace(/3/g, "e").replace(/[5$]/g, "s").replace(/7/g, "t").replace(/8/g, "b")
  .replace(/[^a-zñ]/g, "").replace(/(.)\1{2,}/g, "$1$1");
function isBad(w, allow){
  if (!w || allow.has(w)) return false; const c = w.replace(/(.)\1+/g, "$1"); if (allow.has(c)) return false;
  return BAD.includes(w) || BAD.includes(c) || BAD.includes(w.replace(/e?s$/, "")) || BAD_STEMS.some(b => c.includes(b.replace(/(.)\1+/g, "$1")));
}
/* the words in t that aren't allowed, as the student typed them */
function badWords(t){
  const allow = new Set([...ALLOW_WORDS, ...(((T.cls || {}).allowWords) || [])]);
  const toks = String(t || "").split(/\s+/).filter(Boolean), hit = [];
  toks.forEach(tok => { if (isBad(normWord(tok), allow)) hit.push(tok); });
  /* spelled out with spaces or dots: "f u c k", "s.h.i.t" */
  let run = [];
  const flush = () => { if (run.length >= 3) { const w = run.map(normWord).join(""); if (isBad(w, allow)) hit.push(run.join(" ")); } run = []; };
  toks.forEach(tok => { const parts = tok.split(/[.\-_*]+/).filter(Boolean);
    if (parts.length > 1 && parts.every(p => normWord(p).length === 1)) { run.push(...parts); return; }
    if (normWord(tok).length === 1) run.push(tok); else flush(); });
  flush();
  return [...new Set(hit)];
}
function cleanText(t){ return !badWords(t).length; }
/* Show which words were blocked, in red, with a way to ask the teacher.
   Returns true when something was blocked. */
const escH = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function badShow(el, texts, where){
  texts = (texts || []).filter(x => x); const words = [...new Set(texts.flatMap(badWords))];
  if (!words.length) { if (el && el.dataset.bad) { el.innerHTML = ""; delete el.dataset.bad; } return false; }
  window._badCtx = {words, text:texts.join(" / ").slice(0, 240), where:where || ""};
  const mark = t => escH(t).split(/(\s+)/).map(p => words.some(w => w.split(" ").includes(p) || w === p) ? `<mark class="badw">${p}</mark>` : p).join("");
  if (el) { el.dataset.bad = 1;
    el.innerHTML = `${W2("This word isn't allowed:","Esta palabra no se permite:")} ${words.map(w => `<mark class="badw">${escH(w)}</mark>`).join(" ")}
      <div class="badctx">${texts.filter(t => badWords(t).length).map(mark).join("<br>")}</div>
      <small>${W2("Change it and send again. If it's a normal word, ask Coach Smith to allow it.","Cámbiala y envía otra vez. Si es una palabra normal, pide a Coach Smith que la permita.")}</small>
      <button type="button" class="btn ghost badask" onclick="badAsk(this)">🙋 ${W2("It's not a bad word: ask Coach Smith","No es una mala palabra: preguntar a Coach Smith")}</button>`; }
  return true;
}
window.badAsk = async function(btn){
  const c = window._badCtx; if (!c || !SESS()) return;
  try { for (const w of c.words.slice(0, 3)) {
      const key = normWord(w.replace(/\s+/g, "")).slice(0, 40); if (!key) continue;
      await store().set(`${C()}/wordreqs/${key}_${SESS().sid}`, {sid:SESS().sid, uid:store().uid(), name:SESS().name, word:key, typed:w.slice(0, 40), text:c.text, where:c.where.slice(0, 40), status:"open", at:Date.now()}); }
    if (btn) { btn.disabled = true; btn.textContent = "📨 " + W2("Sent! You'll get a notification when Coach Smith decides.","¡Enviado! Te avisaremos cuando Coach Smith decida."); }
  } catch(e){ T.toast(W2("Couldn't send it right now.","No se pudo enviar.")); }
};
window.civCleanText = cleanText; window.badWords = badWords; window.badShow = badShow;
const customs = () => (CLS().customLaws || []).filter(l => l && l.id);
function lawInfo(p){ if (p.key === "custom") return {e:"✍️", title:p.title || "", what:p.desc || ""};
  const l = LAWS[p.key] || {e:"📜", en:p.key, what:{en:""}}; return {e:l.e, title:L2(l), what:L2(l.what)}; }
function paintLaws(){
  const m = CLS().mayor, isMayor = m && m.sid === SESS().sid, open = PROPS.filter(p => p.status === "voting"), active = laws();
  const mine = PROPS.filter(p => p.status === "review" && p.sid === SESS().sid);
  const past = PROPS.filter(p => !["voting","review","rejected"].includes(p.status)).sort((a, b) => b.at - a.at).slice(0, 5);
  return `<section class="panel"><div class="eyebrow">📜 ${W2("Town laws","Leyes del pueblo")}</div>
    ${active.length || customs().length ? active.map(k => `<div class="claw on">${LAWS[k].e} <b>${E(L2(LAWS[k]))}</b><span>${E(L2(LAWS[k].what))}</span></div>`).join("")
        + customs().map(l => `<div class="claw on">✍️ <b>${E(l.title)}</b><span>${E(l.desc)}${l.by ? " · " + E(l.by) : ""}</span></div>`).join("") : `<p class="muted">${W2("No laws yet.","Aún no hay leyes.")}</p>`}
    ${mine.map(p => `<div class="claw">✍️ <b>${E(p.title)}</b><span>${E(p.desc)}</span><i>⏳ ${W2("Waiting for Coach Smith to review it before the class votes.","Esperando que Coach Smith la revise antes de que vote la clase.")}</i></div>`).join("")}
    ${open.map(p => { const li = lawInfo(p); return `<div class="claw vote">${li.e} <b>${W2("Proposed","Propuesta")}: ${E(li.title)}</b><span>${E(li.what)} · ${p.teacher ? "Coach Smith" : W2("by Mayor","de la alcaldía:") + " " + E(p.name)}</span>
      ${civ().voted["law:" + p.id] ? `<i>${W2("You voted.","Votaste.")}</i>` : `<span class="cyn"><button class="btn primary" onclick="civLawVote('${p.id}',true)">👍 ${W2("Yes","Sí")}</button><button class="btn" onclick="civLawVote('${p.id}',false)">👎 ${W2("No","No")}</button></span>`}</div>`; }).join("")}
    ${isMayor && !open.length && !mine.length ? `<button class="btn primary" onclick="civPropose()">🖋️ ${W2("Mayor: propose a law","Alcalde: proponer una ley")}</button>` : ""}
    ${past.length ? `<div class="cmini">${past.map(p => `<span>${lawInfo(p).e} ${E(lawInfo(p).title)}: <b>${{passed:W2("passed","aprobada"), failed:W2("failed","rechazada"), struck:W2("struck down by the Court","anulada por la Corte")}[p.status] || p.status}</b>${p.yes != null ? ` (${p.yes}–${p.no})` : ""}</span>`).join("")}</div>` : ""}
    <p class="muted" style="font-size:12px">${W2("The mayor proposes, the class votes (secret ballot), and Coach Smith, as the Supreme Court, can strike a law down.","La alcaldía propone, la clase vota (voto secreto) y Coach Smith, como la Corte Suprema, puede anular una ley.")}</p></section>`;
}
window.civPropose = function(){
  sheet(`<h2>${W2("Propose a law","Proponer una ley")}</h2><div class="cpick col">
    <button onclick="civWriteLaw()">✍️ <b>${W2("Write your own law","Escribe tu propia ley")}</b><small>${W2("In your own words. Coach Smith reviews it before the class votes.","Con tus palabras. Coach Smith la revisa antes de que vote la clase.")}</small></button>${Object.entries(LAWS).filter(([k]) => !laws().includes(k)).map(([k, l]) =>
    `<button onclick="civProposeGo('${k}')">${l.e} <b>${E(L2(l))}</b><small>${E(L2(l.what))}</small></button>`).join("")}</div>
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.civWriteLaw = function(){
  sheet(`<h2>✍️ ${W2("Write a law","Escribe una ley")}</h2>
    <label class="cform">${W2("Name of the law","Nombre de la ley")}<input id="lwT" maxlength="40" placeholder="${W2("Example: Homework-Free Fridays","Ejemplo: Viernes sin tarea")}"></label>
    <label class="cform">${W2("What it does (one or two sentences)","Qué hace (una o dos oraciones)")}<textarea id="lwD" maxlength="140" rows="3"></textarea></label>
    <p class="muted" style="font-size:12px">${W2("Keep it school-appropriate. Coach Smith reviews every law, and can edit it, before the class votes.","Que sea apropiada para la escuela. Coach Smith revisa cada ley, y puede editarla, antes de que vote la clase.")}</p>
    <p id="lwErr" class="terr"></p>
    <button class="btn primary wide" onclick="civWriteLawGo()">${W2("Send to Coach Smith","Enviar a Coach Smith")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.civWriteLawGo = async function(){
  const t = document.getElementById("lwT").value.trim().replace(/\s+/g, " "), d = document.getElementById("lwD").value.trim().replace(/\s+/g, " "), err = document.getElementById("lwErr");
  if (t.length < 3 || d.length < 8) { err.textContent = W2("Give your law a name and say what it does.","Dale un nombre a tu ley y di qué hace."); return; }
  if (badShow(err, [t, d], "law")) return;
  try { await store().add(`${C()}/proposals`, {key:"custom", title:t.slice(0, 40), desc:d.slice(0, 140), sid:SESS().sid, uid:store().uid(), name:SESS().name, status:"review", at:Date.now()});
    closeSheet(); T.toast(W2("Sent! Coach Smith will review it.","¡Enviada! Coach Smith la revisará.")); }
  catch(e){ err.textContent = W2("Only the mayor can propose laws.","Solo la alcaldía puede proponer leyes."); }
};
window.civProposeGo = async function(k){
  try { await store().add(`${C()}/proposals`, {key:k, sid:SESS().sid, uid:store().uid(), name:SESS().name, status:"voting", at:Date.now()});
    closeSheet(); T.toast(W2("Proposed! Your class votes now.","¡Propuesta! Ahora vota la clase.")); } catch(e){ T.toast(W2("Only the mayor can propose laws.","Solo la alcaldía puede proponer leyes.")); }
};
window.civLawVote = async function(pid, v){
  try { await store().set(`${C()}/lawvotes/${pid}_${SESS().sid}`, {pid, sid:SESS().sid, v:!!v, at:Date.now()}); } catch(e){}
  civ().voted["law:" + pid] = 1; save(); T.toast(W2("Vote cast!","¡Voto emitido!")); paint();
};
EXT.listCheck.push((id, price) => hasLaw("pet_cap") && /^pet_/.test(id) && price > 25 ? W2("The Pet Price Cap law limits pets to 25 Smithbucks.", "La ley de tope a mascotas limita el precio a 25 Smithbucks.") : null);
EXT.onSold.push(m => { if (!hasLaw("park_tax")) return; const tax = Math.max(1, Math.round(m.price * 0.1)); T.coins(-tax); civ().tax += tax;
  T.toast(W2(`Park Tax: ${tax} Smithbuck${tax > 1 ? "s" : ""} went to the class goal.`, `Impuesto del parque: ${tax} Smithbuck(s) para la meta de la clase.`)); });

/* ---------------- Town Hall tab */
function paintHall(el){
  flag("hall");
  const draw = () => { el.innerHTML = `<section class="panel raised chall">${img(`${TA}civic/town_hall.webp`, "🏛️", "big")}<div><div class="eyebrow">${E(SESS().className || "")}</div>
      <h2>${W2("Town Hall","Ayuntamiento")}</h2><p class="muted">${W2("Class goals, the period league, elections and laws.","Metas de la clase, la liga de periodos, elecciones y leyes.")}</p></div></section>
    ${paintGoalCard()}${paintLeague()}${paintElection()}${paintImpeach()}${paintLaws()}`; };
  draw();
  sub(NET().watchPub(rows => { if (!rows) return; rows.forEach(p => T.pub[p.id] = p); leaguePush(); draw(); }));
  const c = CLS();
  if (c.ownerUid) sub(store().watch(`league/${c.ownerUid}/periods`, {}, rows => { if (rows) { LEAGUE = rows; draw(); } }));
  const e = elec();
  if (e) sub(store().watch(`${C()}/candidates`, {where:[["eid","==",e.id]]}, rows => { if (rows) { CANDS = rows.sort((a, b) => a.at - b.at); draw(); } }));
  sub(store().watch(`${C()}/proposals`, {}, rows => { if (rows) { PROPS = rows.filter(p => LAWS[p.key] || p.key === "custom"); draw(); } }));
}

/* ================================================================ 5. businesses */
const myBiz = () => civ().biz;
const prodOf = id => Object.entries(BIZ).find(([k, b]) => b.items.includes(id));
function bizPartner(){ const b = myBiz(); if (!b || !b.partner) return null; const p = T.pub[b.partner]; return p && p.bizWith === SESS().sid ? b.partner : null; }
/* someone named me as their partner: their business line becomes mine to make too */
function partnerOf(){ return Object.entries(T.pub).find(([sid, p]) => sid !== SESS().sid && p.biz && p.biz.partner === SESS().sid); }
function paintBiz(){
  const b = myBiz(), inv = partnerOf();
  if (!b) {
    const offer = inv && !(civ().bizWith === inv[0]) ? `<p class="tnote">🤝 ${W2(`${E(inv[1].name)} wants you as a partner in their ${E(L2(BIZ[inv[1].biz.type]))}.`, `${E(inv[1].name)} te quiere de socio en su ${E(L2(BIZ[inv[1].biz.type]))}.`)}
      <button class="btn primary" onclick="civJoinBiz('${inv[0]}')">${W2("Join","Unirme")}</button></p>` : "";
    const working = civ().bizWith && T.pub[civ().bizWith] && T.pub[civ().bizWith].biz ? bizCard(civ().bizWith) : "";
    return `<section class="panel"><div class="eyebrow">🏪 ${W2("Start a business","Empieza un negocio")}</div>${offer}${working}
      <p class="muted">${W2(`Startup cost: ${START_COST} Smithbucks. You buy supplies, make products, and sell them in the Market. Profit = price − cost.`,
        `Costo inicial: ${START_COST} Smithbucks. Compras insumos, haces productos y los vendes en el Mercado. Ganancia = precio − costo.`)}</p>
      <div class="cbiz">${Object.entries(BIZ).map(([k, z]) => `<button onclick="civStartBiz('${k}')">${img(`${TA}civic/stall_${k}.webp`, z.e)}<b>${E(L2(z))}</b>
        <small>${z.items.map(id => T.ITEMS[id] ? T.ITEMS[id].e : "").join(" ")}</small></button>`).join("")}</div></section>`;
  }
  return bizCard(SESS().sid);
}
function bizCard(ownerSid){
  const mine = ownerSid === SESS().sid, b = mine ? myBiz() : T.pub[ownerSid].biz, z = BIZ[b.type]; if (!z) return "";
  const made = (civ().made && civ().made[day()]) || 0, partner = mine ? b.partner : ownerSid, pp = partner && T.pub[partner];
  const st = mine ? myBiz() : (civ().bizStats || {sold:0, rev:0, cost:0});
  return `<section class="panel cbizc">${img(`${TA}civic/stall_${b.type}.webp`, z.e, "big")}<div>
      <div class="eyebrow">${mine ? W2("Your business","Tu negocio") : W2("Partner business","Negocio de tu socio")}</div>
      <h2>${E(mine ? SESS().name : T.pub[ownerSid].name)}'s ${E(L2(z))}</h2>
      <p class="muted">${pp ? W2(`Partner: ${E(pp.name)}${mine && !bizPartner() ? " (waiting for them to join)" : ""}. Profit on every sale is split 50/50.`, `Socio: ${E(pp.name)}${mine && !bizPartner() ? " (esperando que acepte)" : ""}. La ganancia de cada venta se divide 50/50.`)
        : W2("Sole proprietor: you keep all the profit and take all the risk.","Propietario único: te quedas con toda la ganancia y todo el riesgo.")}</p>
      <div class="cstats"><span>${W2("Sold","Vendidos")} <b>${st.sold | 0}</b></span><span>${W2("Revenue","Ingresos")} <b>💵${st.rev | 0}</b></span>
        <span>${W2("Costs","Costos")} <b>💵${st.cost | 0}</b></span><span>${W2("Profit","Ganancia")} <b>💵${(st.rev | 0) - (st.cost | 0)}</b></span></div>
      <div class="cmake">${z.items.map(id => { const it = T.ITEMS[id]; return `<button class="btn" onclick="civMake('${id}')" ${made >= DAILY_MAKE ? "disabled" : ""}>${T.itemArt(id, 40)}
        ${E(T.itemName(id))}<small>${W2("supplies","insumos")} 💵${it.cost}</small></button>`; }).join("")}</div>
      <p class="muted" style="font-size:12px">${W2(`Made today: ${made}/${DAILY_MAKE}. Products go to your inventory; list them in the Market at a price above your cost.`, `Hechos hoy: ${made}/${DAILY_MAKE}. Los productos van a tu inventario; véndelos en el Mercado a más de su costo.`)}</p>
      ${mine && !b.partner ? `<button class="btn ghost" onclick="civPartner()">🤝 ${W2("Add a partner","Agregar socio")}</button>` : ""}
      ${mine ? `<button class="btn ghost" onclick="civCloseBiz()">${W2("Close the business","Cerrar el negocio")}</button>` : ""}</div></section>`;
}
window.civStartBiz = function(k){
  if (S.tokens < START_COST) return T.toast(W2(`You need ${START_COST} Smithbucks to start.`, `Necesitas ${START_COST} Smithbucks para empezar.`));
  if (!confirm(W2(`Open a ${BIZ[k].en} for ${START_COST} Smithbucks?`, `¿Abrir una ${BIZ[k].es} por ${START_COST} Smithbucks?`))) return;
  T.coins(-START_COST); civ().biz = {type:k, sold:0, rev:0, cost:START_COST, partner:null, since:Date.now()}; T.persist(); paint();
};
window.civMake = function(id){
  const it = T.ITEMS[id], c = civ(); c.made = c.made || {}; const n = c.made[day()] || 0;
  if (n >= DAILY_MAKE) return T.toast(W2("Your shop is closed for today. Make more tomorrow!","Tu tienda cerró por hoy. ¡Haz más mañana!"));
  if (S.tokens < it.cost) return T.toast(W2(`Supplies cost ${it.cost} Smithbucks.`, `Los insumos cuestan ${it.cost} Smithbucks.`));
  T.coins(-it.cost); T.addItem(id, 1); c.made = {[day()]:n + 1}; flag("make");
  if (c.biz) c.biz.cost += it.cost; else { c.bizStats = c.bizStats || {sold:0, rev:0, cost:0}; c.bizStats.cost += it.cost; }
  T.persist(); paint(); T.toast(W2(`Made: ${T.itemName(id)}. List it in the Market!`, `Hiciste: ${T.itemName(id)}. ¡Véndelo en el Mercado!`));
};
window.civPartner = function(){
  const list = T.lots().filter(p => p.sid !== SESS().sid);
  sheet(`<h2>${W2("Pick a partner","Elige un socio")}</h2><p class="muted">${W2("A partnership shares the work and splits the profit 50/50.","Una sociedad comparte el trabajo y divide la ganancia 50/50.")}</p>
    <div class="tpeople">${list.map(p => `<button class="btn" onclick="civPartnerGo('${p.sid}')">${E(p.name)}</button>`).join("") || `<p class="muted">—</p>`}</div>
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.civPartnerGo = function(sid){ civ().biz.partner = sid; T.persist(); closeSheet(); paint(); T.toast(W2("Partner invite sent.","Invitación enviada.")); };
window.civJoinBiz = function(owner){ civ().bizWith = owner; T.persist(); paint(); T.toast(W2("You're partners now!","¡Ahora son socios!")); };
window.civCloseBiz = function(){ if (confirm(W2("Close your business? Products you made stay in your inventory.","¿Cerrar tu negocio? Tus productos se quedan en tu inventario."))) { civ().biz = null; T.persist(); paint(); } };
/* a product sold: count it, and send the partner half the profit */
EXT.onSold.push(m => {
  const p = prodOf(m.item); if (!p) return; const c = civ(), it = T.ITEMS[m.item], profit = Math.max(0, m.price - (it.cost || 0));
  const st = c.biz && c.biz.type === p[0] ? c.biz : (c.bizStats = c.bizStats || {sold:0, rev:0, cost:0});
  st.sold = (st.sold | 0) + 1; st.rev = (st.rev | 0) + m.price;
  const to = c.biz && c.biz.type === p[0] ? bizPartner() : c.bizWith && T.pub[c.bizWith] && T.pub[c.bizWith].biz && T.pub[c.bizWith].biz.type === p[0] ? c.bizWith : null;
  const half = Math.floor(profit / 2);
  if (to && half > 0) { T.coins(-half);
    store().add(`${C()}/payouts`, {from:SESS().sid, fromName:SESS().name, to, coins:half, item:m.item, at:Date.now(), settled:false}).catch(e => { T.coins(half); console.warn(e); }); }
});
function settlePayouts(rows){
  let changed = false;
  rows.forEach(r => { changed = T.once("pay:" + r.id, () => { T.coins(r.coins | 0);
    const c = civ(), st = c.biz || (c.bizStats = c.bizStats || {sold:0, rev:0, cost:0}); st.rev = (st.rev | 0) + (r.coins | 0);
    T.toast(W2(`Partner payout: ${r.fromName} sold a ${T.itemName(r.item)}. +${r.coins} Smithbucks.`, `Pago de socio: ${r.fromName} vendió ${T.itemName(r.item)}. +${r.coins} Smithbucks.`));
    if (!r.settled) store().update(`${C()}/payouts/${r.id}`, {settled:true}).catch(() => {}); }) || changed; });
  if (changed) T.persist();
}

/* ================================================================ 6. daily jobs, streak, Home of the Week */
function rollJobs(){
  const j = civ().jobs, d = day(); if (j.day === d) return;
  const town = Object.keys(JOBS).filter(k => !JOBS[k].learn), h = hashN(d + (SESS() ? SESS().sid : ""));
  const picks = ["answer10", h % 3 === 0 ? "study50" : "study", town[h % town.length]];
  Object.assign(j, {day:d, picks, done:{}, paid:{}, flags:{}, xp0:myXp()}); save();
}
function jobDone(k){ const j = civ().jobs; return JOBS[k] && JOBS[k].check ? JOBS[k].check() : !!j.flags[k]; }
function visitStreak(){
  const s = civ().streak, d = day(); if (s.last === d) return;
  const y = new Date(); y.setDate(y.getDate() - 1);
  s.n = s.last === day(y) ? s.n + 1 : 1; s.last = d; s.best = Math.max(s.best, s.n);
  if (s.n % 5 === 0) { T.town().crates++; T.toast(W2(`🔥 ${s.n}-day streak! +1 crate.`, `🔥 ¡Racha de ${s.n} días! +1 caja.`)); }
  /* Crate Fridays law */
  if (hasLaw("crate_friday") && new Date().getDay() === 5) T.once("fri:" + d, () => { T.town().crates++; T.toast(W2("Crate Friday! +1 crate.","¡Viernes de cajas! +1 caja.")); });
  T.persist();
}
function paintJobs(el){
  rollJobs(); const j = civ().jobs, s = civ().streak, pay = jobPay();
  el.innerHTML = `<section class="panel raised cjobs">${img(`${TA}civic/job_board.webp`, "📋", "big")}<div><div class="eyebrow">${W2("Job board","Tablero de trabajos")} · ${new Date().toLocaleDateString()}</div>
      <h2>${W2("Today's jobs","Trabajos de hoy")}</h2><p class="muted">${W2(`Each job pays ${Math.max(1, Math.round(pay))} Smithbuck${pay > 1 ? "s" : ""}. New jobs every day.`, `Cada trabajo paga ${Math.max(1, Math.round(pay))} Smithbuck(s). Trabajos nuevos cada día.`)}</p></div>
      <div class="cstreak">${img(`${TA}civic/streak_flame.webp`, "🔥")}<b>${s.n}</b><small>${W2("day streak","días seguidos")}</small></div></section>
    <section class="panel">${j.picks.map(k => { const d = jobDone(k), paid = j.paid[k];
      return `<div class="cjob ${d ? "done" : ""}"><span>${JOBS[k].e}</span><b>${E(L2(JOBS[k]))}</b>
        ${paid ? `<i>✅ ${W2("Paid","Pagado")}</i>` : d ? `<button class="btn primary" onclick="civCollect('${k}')">${W2("Collect","Cobrar")}</button>` : `<i class="muted">${W2("to do","pendiente")}</i>`}</div>`; }).join("")}
      <p class="muted" style="font-size:12px">${W2("Visit the Town 5 days in a row for a bonus crate.","Visita el Pueblo 5 días seguidos para ganar una caja extra.")}</p></section>
    ${paintBiz()}`;
}
window.civCollect = function(k){
  const j = civ().jobs; if (j.paid[k] || !jobDone(k)) return; j.paid[k] = 1;
  const c = civ(), sick = c.sick && c.sick.since, fed = c.fed === day();
  let n = Math.max(1, Math.round(jobPay() * ((JOBS[k] && JOBS[k].pay) || 1)));
  if (sick) n = Math.max(1, Math.floor(n / 2)); if (fed) n += 1; T.coins(n); T.persist(); paint(); T.toast(W2(`+${n} Smithbuck${n > 1 ? "s" : ""}`, `+${n} Smithbuck(s)`));
};
/* job flags from things that already happen in the Town */
const wrap = (name, k) => { const f = window[name]; if (typeof f !== "function") return; window[name] = function(){ const r = f.apply(this, arguments); flag(k); return r; }; };
wrap("townSticker", "sticker"); wrap("townSay", "chat"); wrap("townList", "market"); wrap("townBuy", "market");
wrap("townOpenCrate", "crate"); wrap("townPut", "decorate"); wrap("townSendTrade", "trade"); wrap("townAccept", "trade");
EXT.onSold.push(() => flag("sell"));

/* Home of the Week */
let HOTW = [], HOTW_LAST = [];
function tally(rows){ const t = {}; rows.forEach(r => { t[r.for] = (t[r.for] || 0) + 1; }); return Object.entries(t).sort((a, b) => b[1] - a[1]); }
function hotwWinner(){ const t = tally(HOTW_LAST); return t.length ? t[0][0] : null; }
function watchHotw(){
  if (!SESS()) return () => {};
  return store().watch(`${C()}/hotw`, {where:[["w","in",[week(), lastWeek()]]]}, rows => { if (!rows || !SESS()) return; HOTW = rows.filter(r => r.w === week()); HOTW_LAST = rows.filter(r => r.w === lastWeek());
    const win = hotwWinner(); if (win === SESS().sid) T.once("hotw:" + lastWeek(), () => { T.town().crates++; T.persist(); T.toast(W2("🏆 Your house won Home of the Week! +1 crate.","🏆 ¡Tu casa ganó Casa de la Semana! +1 caja.")); }); });
}
EXT.streetBadge.push(p => { const s = [];
  if (hotwWinner() === p.sid) s.push(`<span class="cbadge" title="${W2("Home of the Week","Casa de la Semana")}">🏆</span>`);
  if (CLS().mayor && CLS().mayor.sid === p.sid) s.push(`<span class="cbadge" title="${W2("Mayor","Alcalde")}">🎖️</span>`);
  if (p.biz && BIZ[p.biz.type]) s.push(`<span class="cbadge" title="${E(L2(BIZ[p.biz.type]))}">${BIZ[p.biz.type].e}</span>`);
  if (p.streak >= 5) s.push(`<span class="cbadge">🔥${p.streak}</span>`);
  if (p.patron) s.push(`<span class="cbadge" title="${W2("Shops local","Compra local")}">🏅</span>`);
  return s.join(""); });
EXT.houseExtra.push({
  html: sid => { if (!SESS()) return ""; const mine = sid === SESS().sid, votes = tally(HOTW), mineV = HOTW.find(r => r.sid === SESS().sid);
    return `<section class="panel chotw"><div class="eyebrow">🏆 ${W2("Home of the Week","Casa de la Semana")}</div>
      ${mine ? `<p class="muted">${W2(`Your house has ${(votes.find(v => v[0] === sid) || [0, 0])[1]} vote(s) this week. Voting resets Monday; last week's winner gets a crate.`, `Tu casa tiene ${(votes.find(v => v[0] === sid) || [0, 0])[1]} voto(s) esta semana. Se reinicia el lunes; quien gane recibe una caja.`)}</p>`
        : mineV ? `<p class="tnote">${W2(`You voted for ${E((T.pub[mineV.for] || {}).name || "…")} this week.`, `Votaste por ${E((T.pub[mineV.for] || {}).name || "…")} esta semana.`)}</p>`
        : `<button class="btn primary" onclick="civHotw('${sid}')">🏆 ${W2("Vote for this house","Votar por esta casa")}</button>`}</section>`; },
  after: sid => { if (SESS() && sid !== SESS().sid) flag("visit"); }
});
window.civHotw = async function(sid){
  try { await store().set(`${C()}/hotw/${week()}_${SESS().sid}`, {w:week(), sid:SESS().sid, for:sid, at:Date.now()}); flag("vote");
    T.toast(W2("Vote counted!","¡Voto contado!")); paint(); } catch(e){ T.toast(W2("You already voted this week.","Ya votaste esta semana.")); }
};

/* ================================================================ 7. plaza: upgrades, seasons, live quiz */
const PIMG = {};
function plazaImg(k){ if (!(k in PIMG)) { const im = new Image(); im.onerror = () => { PIMG[k] = null; }; im.src = `${TA}plaza/${k}.webp`; PIMG[k] = im; } return PIMG[k]; }
EXT.plazaBack.push(cx => {
  unlocked().forEach(k => { const u = UPGRADES[k], im = plazaImg(k), [x, y] = u.at;
    if (im && im.complete && im.naturalWidth) { const h = u.h, w = im.naturalWidth * h / im.naturalHeight; cx.drawImage(im, x - w / 2, y - h, w, h); }
    else { cx.font = `${Math.round(u.h * 0.6)}px sans-serif`; cx.textAlign = "center"; cx.fillText(u.e, x, y - 6); } });
});
function season(){
  const s = CLS().season; if (s && s !== "auto") return s === "off" ? null : s;
  const m = new Date().getMonth(); return {9:"fall", 10:"harvest", 11:"winter", 1:"hearts", 2:"spring", 3:"spring", 4:"grad"}[m] || null;
}
const SEASONS = {fall:["🎃","🦇"], harvest:["🍂","🍁"], winter:["❄️","❄️"], hearts:["💖","💌"], spring:["🌸","🌼"], grad:["🎓","🎉"], homecoming:["🎖️","🏈"]};
let FALL = null;
EXT.plazaFront.push(cx => {
  const s = season(); if (!s || !SEASONS[s]) return; const [a, b] = SEASONS[s];
  if (!FALL) FALL = Array.from({length:18}, (_, i) => ({x:Math.random() * 960, y:Math.random() * 540, v:20 + Math.random() * 30, k:i % 2}));
  const t = performance.now() / 1000; cx.textAlign = "center";
  if (s === "homecoming") { cx.font = "22px sans-serif"; for (let x = 20; x < 960; x += 48) cx.fillText(x % 96 ? "🔴" : "🟡", x, 22 + Math.sin(x / 70) * 6); }
  cx.font = "22px sans-serif"; cx.globalAlpha = 0.85;
  FALL.forEach(p => { p.y += p.v / 60; if (p.y > 560) { p.y = -20; p.x = Math.random() * 960; } cx.fillText(p.k ? b : a, p.x + Math.sin(t + p.v) * 12, p.y); });
  cx.globalAlpha = 1;
});
/* live plaza quiz: the question shows on everyone's plaza and on the board */
const quiz = () => { const q = CLS().quiz; return q && q.id && Date.now() - (q.at || 0) < 15 * 60e3 ? q : null; };
EXT.plazaFront.push(cx => {
  const q = quiz(); if (!q) return;
  cx.fillStyle = "rgba(29,27,46,.86)"; T.rr(cx, 130, 12, 810, q.phase === "reveal" ? 120 : 92, 16); cx.fill();
  cx.fillStyle = "#FFD23F"; cx.font = "800 16px 'Baloo 2', sans-serif"; cx.textAlign = "left";
  cx.fillText(q.phase === "reveal" ? "✅ " + W2("Answer","Respuesta") : "❓ " + W2("Plaza quiz! Tap to answer","¡Quiz en la plaza! Toca para responder"), 150, 38);
  cx.fillStyle = "#fff"; cx.font = "700 18px 'Nunito', sans-serif";
  const txt = L2(q.q.q); cx.fillText(txt.length > 84 ? txt.slice(0, 82) + "…" : txt, 150, 66);
  if (q.phase === "reveal") { const opts = q.q.c[S.lang === "es" && q.q.c.es ? "es" : "en"]; cx.fillStyle = "#7CFC9A"; cx.fillText("→ " + opts[q.q.a], 150, 94);
    if (q.first && q.first.length) { cx.fillStyle = "#FFD23F"; cx.fillText("⚡ " + q.first.slice(0, 3).join(", "), 150, 120); } }
});
EXT.plazaTap.push((x, y) => { const q = quiz(); if (!q || y > 110 || x < 130 || !SESS()) return false; civQuizOpen(); return true; });
function civQuizOpen(){
  const q = quiz(); if (!q || q.phase !== "open") return; const c = civ(); c.quiz = c.quiz || {};
  if (c.quiz[q.id] != null) return T.toast(W2("You answered. Wait for Coach Smith to reveal it!","Ya respondiste. ¡Espera a que Coach Smith lo revele!"));
  const opts = q.q.c[S.lang === "es" && q.q.c.es ? "es" : "en"];
  sheet(`<div class="eyebrow">❓ ${W2("Plaza quiz","Quiz de la plaza")}</div><h2 style="font-size:20px">${E(L2(q.q.q))}</h2>
    <div class="cqopts">${opts.map((o, i) => `<button class="btn" onclick="civQuizAns(${i})">${["A","B","C","D"][i]}. ${E(o)}</button>`).join("")}</div>`);
}
window.civQuizOpen = civQuizOpen;
window.civQuizAns = async function(i){
  const q = quiz(); if (!q) return; const c = civ(); c.quiz = c.quiz || {}; c.quiz[q.id] = i; save(); closeSheet();
  try { await store().set(`${C()}/buzz/${q.id}_${SESS().sid}`, {qid:q.id, sid:SESS().sid, name:SESS().name, a:i, at:Date.now()}); T.toast(W2("Locked in!","¡Respuesta enviada!")); }
  catch(e){ T.toast(W2("Couldn't send your answer.","No se pudo enviar tu respuesta.")); }
};
function quizReveal(q){
  const c = civ(); c.quiz = c.quiz || {}; const mine = c.quiz[q.id];
  if (mine == null) return;
  T.once("quiz:" + q.id, () => { if (mine === q.q.a) { T.coins(1); T.toast(W2("Plaza quiz: correct! +1 Smithbuck.","Quiz de la plaza: ¡correcto! +1 Smithbuck.")); }
    else T.toast(W2("Plaza quiz: not this time.","Quiz de la plaza: esta vez no.")); T.persist(); });
}

/* ================================================================ class doc, session, publish hooks */
EXT.onClass.push((was, c) => {
  if (!SESS()) return;
  const g = goal(); if (g) xpSince("goal:" + g.id);
  if (was && was.econ && c.econ && (was.econ.rate == null ? 2 : was.econ.rate) !== fedRate()) T.toast(fedRate() > (was.econ.rate == null ? 2 : was.econ.rate)
    ? W2(`Coach Smith raised the interest rate to ${fedRate()}%. Savings earn more; loans cost more.`, `Coach Smith subió la tasa a ${fedRate()}%. Los ahorros ganan más; los préstamos cuestan más.`)
    : W2(`Coach Smith cut the interest rate to ${fedRate()}%. Borrowing is cheaper now.`, `Coach Smith bajó la tasa a ${fedRate()}%. Pedir prestado es más barato.`));
  const e = cur(); if (e && (!was || !was.event || was.event.id !== e.id)) T.toast(`${EVENTS[e.kind].e} ${L2(EVENTS[e.kind])}`);
  if (goalDone()) T.once("goal:" + g.id, () => { T.town().crates++; T.persist();
    T.toast(W2(`🎉 Class goal reached! The ${UPGRADES[g.reward] ? UPGRADES[g.reward].en : "upgrade"} is on the plaza, and you got a crate.`, `🎉 ¡Meta lograda! ${UPGRADES[g.reward] ? UPGRADES[g.reward].es : "La mejora"} está en la plaza y recibiste una caja.`));
    if (typeof fireConfetti === "function") fireConfetti(); });
  const q = c.quiz; if (q && q.id && q.phase === "reveal") quizReveal(q);
  if (q && q.id && q.phase === "open" && (!was || !was.quiz || was.quiz.id !== q.id) && T.isTown() && T.tt === "plaza") setTimeout(civQuizOpen, 300);
  if (T.isTown() && ["hall","bank","jobs"].includes(T.tt) && (!was || JSON.stringify([was.goal, was.election, was.mayor, was.laws, was.customLaws, was.impeach, was.econ, was.event]) !== JSON.stringify([c.goal, c.election, c.mayor, c.laws, c.customLaws, c.impeach, c.econ, c.event]))) T.paintTown();
});
let BGS = [];
EXT.onLeave.push(() => { BGS.forEach(u => { try { u(); } catch(e){} }); BGS = []; });
EXT.onSession.push(() => {
  BGS.forEach(u => { try { u(); } catch(e){} }); BGS = [];
  rollJobs(); visitStreak(); xpSince("wk:" + week()); accrue(); cozyBonus(); unitPaychecks();
  BGS.push(store().watch(`${C()}/payouts`, {where:[["to","==",SESS().sid]]}, rows => { if (rows && SESS()) settlePayouts(rows); }));
  BGS.push(watchHotw());
});
EXT.pubExtra.push(() => {
  const g = goal(), c = civ();
  return {wk:{w:week(), n:xpSince("wk:" + week())}, goal:g ? {id:g.id, n:myGoalN()} : null, streak:c.streak.n,
          biz:c.biz ? {type:c.biz.type, partner:c.biz.partner || null} : null, bizWith:c.bizWith || null, patron:!!T.town().applied.prodset};
});
/* keep my numbers fresh for the class goal and the league while I study */
let _pubXp = -1;   /* only re-publish when XP actually changed (keeps Firestore writes low) */
setInterval(() => { if (SESS() && myXp() !== _pubXp) { _pubXp = myXp(); T.publishSoon(); } }, 180000);

/* ================================================================ unit paychecks + shop local */
/* Finishing a unit (its certificate) pays a paycheck, once per unit. Certificates
   earned before this existed get back pay, up to 60 coins. */
const UNIT_PAY = 15;
/* Every new certificate pays Smithbucks: unit challenges and tests, assignment
   games, writing labs, CFE review and review activities. Certificates earned
   before this got back pay (up to 75). */
const CERT_PAY = {exam:20, game:20, challenge:15, review:5};
const certPay = ct => CERT_PAY[ct.kind] || (ct.src ? 20 : 15);
const certLabel = ct => ct.kind === "game" || ct.src ? W2("assignment","tarea") : ct.kind === "review" ? W2("review","repaso") : W2("unit","unidad");
function unitPaychecks(){
  const c = civ(), certs = S.certs || [];
  if (!c.certPaid) {   /* first run: mark what the old unit paychecks already paid, back-pay the rest */
    c.certPaid = {}; const seen = new Set(Object.keys(c.unitPaid || {}));
    let back = 0, n = 0;
    certs.forEach(ct => { if (!ct.code) return; const k = (ct.course || "") + "|" + (ct.unit || "");
      if (seen.has(k)) { seen.delete(k); c.certPaid[ct.code] = 1; return; }
      c.certPaid[ct.code] = 1; back += certPay(ct); n++; });
    back = Math.min(75, back); save();
    if (back) { T.coins(back); T.persist(); T.toast(W2(`Back pay for ${n} certificate${n > 1 ? "s" : ""}: +${back} Smithbucks!`, `Pago atrasado por ${n} certificado(s): ¡+${back} Smithbucks!`)); }
    return;
  }
  let total = 0, last = null;
  certs.forEach(ct => { if (!ct.code || c.certPaid[ct.code]) return; c.certPaid[ct.code] = Date.now(); total += certPay(ct); last = ct; });
  if (total) { T.coins(total); save(); T.persist();
    T.toast(W2(`🎓 Certificate earned: +${total} Smithbucks (${certLabel(last)} paycheck).`, `🎓 Certificado ganado: +${total} Smithbucks (pago de ${certLabel(last)}).`));
    if (typeof paintBar === "function") paintBar(); }
}
setInterval(unitPaychecks, 15000); setTimeout(unitPaychecks, 2500);

/* Shop local: buying from classmates fills a stamp card (every 5 stamps = a
   crate + 5 coins), collecting one product from every kind of business pays a
   big bonus and a badge, and classmate-made decor in your house pays a small
   "cozy home" bonus every day. During Buy Local Week, 20% comes back. */
const STAMPS = 5, SET_BONUS = 25;
const prodType = id => { const p = prodOf(id); return p ? p[0] : null; };
function setProgress(){ const have = new Set(Object.keys(T.town().inv).map(prodType).filter(Boolean)); return {have, n:have.size, total:Object.keys(BIZ).length}; }
EXT.onBuy.push(m => {
  const c = civ(); flag("buylocal");
  c.stamps = (c.stamps || 0) + 1;
  if (c.stamps % STAMPS === 0) { T.town().crates++; T.coins(5); T.toast(W2("🛍️ Shop Local card full! +1 crate and +5 Smithbucks.","🛍️ ¡Tarjeta llena! +1 caja y +5 Smithbucks.")); }
  const e = cur(); if (e && e.kind === "buylocal") { const back = Math.max(1, Math.round(m.price * 0.2)); T.coins(back); T.toast(W2(`Buy Local Week: +${back} Smithbucks back.`, `Semana local: +${back} Smithbucks de vuelta.`)); }
  const sp = setProgress(); if (sp.n >= sp.total) T.once("prodset", () => { T.coins(SET_BONUS); T.toast(W2(`🏅 You own something from every business in town! +${SET_BONUS} Smithbucks.`, `🏅 ¡Tienes algo de cada negocio del pueblo! +${SET_BONUS} Smithbucks.`)); if (typeof fireConfetti === "function") fireConfetti(); });
});
function cozyBonus(){
  const c = civ(), d = day(); if (c.cozyDay === d) return;
  const mine = c.biz && c.biz.type, slots = Object.values(T.town().house.slots || {});
  const n = Math.min(3, new Set(slots.filter(id => prodType(id) && prodType(id) !== mine)).size);
  c.cozyDay = d; if (n) { T.coins(n); T.toast(W2(`🏡 Cozy home bonus: +${n} Smithbuck${n > 1 ? "s" : ""} for classmate-made decor.`, `🏡 Bono de hogar: +${n} Smithbuck(s) por decoración de tus compañeros.`)); } save();
}
EXT.marketTop.push(() => {
  const c = civ(), st = (c.stamps || 0) % STAMPS, sp = setProgress(), e = cur();
  return `<section class="panel cshop"><div class="eyebrow">🛍️ ${W2("Shop local","Compra local")}${e && e.kind === "buylocal" ? " · " + W2("Buy Local Week: 20% back!","Semana local: ¡20% de vuelta!") : ""}</div>
    <div class="cstamps">${Array.from({length:STAMPS}, (_, i) => `<span class="${i < st ? "on" : ""}">${i < st ? "🛍️" : ""}</span>`).join("")}<small>${W2(`Buy from classmates: every ${STAMPS} purchases = 1 crate + 5 Smithbucks`, `Compra a compañeros: cada ${STAMPS} compras = 1 caja + 5 Smithbucks`)}</small></div>
    <div class="cset">${Object.entries(BIZ).map(([k, z]) => `<span class="${sp.have.has(k) ? "on" : ""}" title="${E(L2(z))}">${z.e}</span>`).join("")}
      <small>${T.town().applied.prodset ? "🏅 " + W2("Collection complete!","¡Colección completa!") : W2(`Own one product from every kind of business: +${SET_BONUS} Smithbucks and a badge (${sp.n}/${sp.total})`, `Ten un producto de cada tipo de negocio: +${SET_BONUS} Smithbucks y una insignia (${sp.n}/${sp.total})`)}</small></div>
    <p class="muted" style="font-size:12px;margin:6px 0 0">${W2("Put classmate-made products in your house for a daily cozy-home bonus (up to 3 Smithbucks a day).","Pon productos de tus compañeros en tu casa para un bono diario (hasta 3 Smithbucks al día).")}</p></section>`;
});

/* ---------------------------------------------------------------- tabs */
EXT.tabs.push({key:"hall", icon:"🏛️", label:() => W2("Town Hall","Ayuntamiento"), paint:paintHall},
              {key:"bank", icon:"🏦", label:() => W2("Bank","Banco"), paint:el => { paintBank(el); }},
              {key:"jobs", icon:"📋", label:() => W2("Jobs","Trabajos"), paint:el => { paintJobs(el);
                sub(NET().watchPub(rows => { if (rows) { rows.forEach(p => T.pub[p.id] = p); if (T.tt === "jobs" && document.getElementById("tbody") === el) paintJobs(el); } })); }});
EXT.plazaSub.push(() => { const q = quiz(); if (q && q.phase === "open" && civ().quiz && civ().quiz[q.id] == null) setTimeout(civQuizOpen, 400); });

/* ================================================================ teacher panels */
let A_BUZZ = [];
EXT.adminPanels.push({
  html: c => {
    const g = c.goal && c.goal.id ? c.goal : null, ev = c.event && c.event.id && (!c.event.until || c.event.until > Date.now()) ? c.event : null, el = c.election && c.election.id ? c.election : null;
    const q = c.quiz && c.quiz.id ? c.quiz : null, rate = c.econ && c.econ.rate != null ? c.econ.rate : 2;
    return `<section class="panel tadm"><div class="eyebrow">🎯 ${W2("Class goal","Meta de la clase")}</div>
      ${g ? `<p>${W2("Current goal","Meta actual")}: <b>${g.target} XP</b> → ${UPGRADES[g.reward] ? UPGRADES[g.reward].e + " " + UPGRADES[g.reward].en : ""} ${g.done ? "✅" : ""}
        <span id="aGoalN" class="muted"></span></p>` : `<p class="muted">${W2("No goal set.","Sin meta.")}</p>`}
      <div class="tlev"><label>${W2("Target XP for the class","XP meta de la clase")}<input id="aGoalT" type="number" min="100" step="100" value="${g ? g.target : 3000}"></label>
        <label>${W2("Plaza reward","Premio en la plaza")}<select id="aGoalR">${Object.entries(UPGRADES).filter(([k]) => !(c.upgrades || []).includes(k)).map(([k, u]) => `<option value="${k}">${u.e} ${u.en}</option>`).join("")}</select></label>
        <button class="btn primary" onclick="civSetGoal()">${g ? W2("Start a new goal","Nueva meta") : W2("Set goal","Poner meta")}</button></div>
      <p class="muted" style="font-size:12px">${W2("Unlocked so far","Desbloqueado")}: ${(c.upgrades || []).map(k => UPGRADES[k] ? UPGRADES[k].e : "").join(" ") || "—"} · ${W2("About 150–300 XP per student a week is a stretch goal.","Unos 150–300 XP por estudiante por semana es una meta exigente.")}</p></section>
    <section class="panel tadm"><div class="eyebrow">📈 ${W2("Economy events and the Fed","Eventos económicos y la Fed")}</div>
      <div class="tlev"><label>${W2("Interest rate (% a week)","Tasa de interés (% semanal)")}<input type="number" min="0" max="10" step="0.5" value="${rate}" onchange="townEcon('rate',this.value)"></label></div>
      <p>${ev ? `${W2("Now","Ahora")}: <b>${EVENTS[ev.kind].e} ${EVENTS[ev.kind].en}</b>${ev.until ? " · " + W2("until","hasta") + " " + new Date(ev.until).toLocaleString() : ""} <button class="btn ghost" onclick="civEvent(null)">${W2("End it","Terminar")}</button>` : W2("No event running.","Ningún evento activo.")}</p>
      <div class="tsw">${Object.entries(EVENTS).map(([k, e]) => `<button class="btn" onclick="civEvent('${k}')">${e.e} ${e.en}</button>`).join("")}</div>
      <p class="muted" style="font-size:12px">${W2("Events last one day. Each one changes Town prices or job pay and asks students an Econ check question (+2 Smithbucks).","Los eventos duran un día. Cambian precios o pagos y hacen una pregunta (+2 Smithbucks).")}</p></section>
    <section class="panel tadm"><div class="eyebrow">🗳️ ${W2("Elections and laws","Elecciones y leyes")}</div>
      <p>${c.mayor && c.mayor.sid ? W2("Mayor","Alcalde") + ": <b>" + E(c.mayor.name) + "</b>" : W2("No mayor yet.","Aún no hay alcalde.")}
        ${el ? ` · ${W2("Election","Elección")}: <b>${el.phase}</b>` : ""}</p>
      <div class="tsw">${!el || el.phase === "closed" ? `<button class="btn" onclick="civElection('filing')">📣 ${W2("Open sign-ups for mayor","Abrir inscripciones")}</button>` : ""}
        ${el && el.phase === "filing" ? `<button class="btn primary" onclick="civElection('voting')">🗳️ ${W2("Open voting","Abrir votación")}</button>` : ""}
        ${el && el.phase === "voting" ? `<button class="btn primary" onclick="civTally()">✅ ${W2("Close polls and count","Cerrar y contar")}</button>` : ""}</div>
      <div id="aImp"></div><div id="aLaws"></div></section>
    <section class="panel tadm"><div class="eyebrow">❓ ${W2("Plaza quiz and decorations","Quiz en la plaza y decoración")}</div>
      <div class="tlev"><label>${W2("Course","Curso")}<select id="aQC">${(typeof allPacks === "function" ? allPacks() : []).map(p => `<option value="${p.id}">${E(L2(p.name))}</option>`).join("")}</select></label>
        <button class="btn primary" onclick="civQuiz()">❓ ${q && q.phase === "open" ? W2("Next question","Siguiente pregunta") : W2("Start a plaza quiz","Empezar un quiz")}</button>
        ${q && q.phase === "open" ? `<button class="btn" onclick="civReveal()">👀 ${W2("Reveal answer","Revelar respuesta")}</button>` : ""}
        <button class="btn ghost" onclick="townProjector()">📽️ ${W2("Show on the board","Mostrar en el pizarrón")}</button></div>
      ${q ? `<p><b>${E(L2(q.q.q))}</b></p><div id="aBuzz" class="muted"></div>` : ""}
      <div class="tlev"><label>${W2("Plaza decorations","Decoración de la plaza")}<select onchange="civSeason(this.value)">${[["auto",W2("Automatic (by month)","Automática (por mes)")],["off",W2("Off","Apagada")],["homecoming","Homecoming"],["fall","🎃"],["harvest","🍂"],["winter","❄️"],["hearts","💖"],["spring","🌸"],["grad","🎓"]]
        .map(([k, l]) => `<option value="${k}" ${(c.season || "auto") === k ? "selected" : ""}>${l}</option>`).join("")}</select></label></div></section>`;
  },
  after: c => {
    /* live counts for the goal and the quiz, and the law tally */
    store().list(`classes/${c.id}/pub`).then(rows => { const g = c.goal; const el = document.getElementById("aGoalN"); if (!g || !el) return;
      const n = rows.reduce((s, p) => s + (p.goal && p.goal.id === g.id ? p.goal.n | 0 : 0), 0); el.textContent = `· ${n} / ${g.target}`;
      if (n >= g.target && !g.done) T.adminSet({goal:{...g, done:true}, upgrades:[...new Set([...(c.upgrades || []), g.reward])]}); }).catch(() => {});
    const q = c.quiz && c.quiz.id ? c.quiz : null;
    if (q) T.viewSub(store().watch(`classes/${c.id}/buzz`, {where:[["qid","==",q.id]]}, rows => { if (!rows) return; A_BUZZ = rows.sort((a, b) => a.at - b.at);
      const el = document.getElementById("aBuzz"); if (!el) return; const right = A_BUZZ.filter(r => r.a === q.q.a);
      el.innerHTML = `${A_BUZZ.length} ${W2("answered","respondieron")} · ${right.length} ${W2("right","correctas")}${right.length ? " · ⚡ " + right.slice(0, 3).map(r => E(r.name)).join(", ") : ""}`; }));
    if (c.mayor && c.mayor.sid) { const k = "imp_" + (c.mayor.eid || c.mayor.sid), i = c.impeach && c.impeach.id && c.impeach.sid === c.mayor.sid && c.impeach.phase !== "done" ? c.impeach : null;
      T.viewSub(store().watch(`classes/${c.id}/lawvotes`, {where:[["pid","==",k + "_pet"]]}, rows => { const box = document.getElementById("aImp"); if (!box || !rows) return;
        const why = {}; rows.forEach(r => { why[r.why] = (why[r.why] || 0) + 1; });
        box.innerHTML = `<div class="tdeal"><span>⚖️ <b>${W2("Impeachment","Juicio político")}</b> · ${rows.length} ${W2("petition signature(s)","firma(s)")}${rows.length ? ": " + Object.entries(why).map(([w, n]) => (IMP_WHY[w] ? IMP_WHY[w].e + " " + IMP_WHY[w].en : w) + " " + n).join(", ") : ""}
          ${i ? ` · <b>${i.phase === "house" ? W2("House vote open","Votación en la Cámara") : W2("Senate trial open","Juicio en el Senado")}</b>` : ""}</span>
          ${!i ? `<button class="btn" onclick="civImpeach('house')">${W2("Open impeachment vote (House)","Abrir votación (Cámara)")}</button>` : ""}
          ${i && i.phase === "house" ? `<button class="btn primary" onclick="civImpCount('house')">${W2("Count House votes","Contar votos de la Cámara")}</button>` : ""}
          ${i && i.phase === "senate" ? `<button class="btn primary" onclick="civImpCount('senate')">${W2("Count trial votes (2/3 to remove)","Contar votos del juicio (2/3)")}</button>` : ""}</div>`; })); }
    T.viewSub(store().watch(`classes/${c.id}/proposals`, {}, rows => { const box = document.getElementById("aLaws"); if (!box || !rows) return;
      const live = p => p.key === "custom" ? (c.customLaws || []).some(l => l.id === p.id) : (c.laws || []).includes(p.key);
      const list = rows.filter(p => LAWS[p.key] || p.key === "custom").sort((a, b) => (b.status === "review") - (a.status === "review") || b.at - a.at).slice(0, 12);
      box.innerHTML = `<button class="btn" onclick="civTeacherLaw()">✍️ ${W2("Write a law","Escribir una ley")}</button>` + list.map(p => { const li = lawInfo(p);
        return `<div class="tdeal"><span>${li.e} <b>${E(li.title)}</b>${p.key === "custom" ? ` <small>${E(li.what)}</small>` : ""} · ${p.teacher ? "Coach Smith" : E(p.name)} · <b>${{review:W2("needs your review","por revisar"), voting:W2("voting","en votación"), passed:W2("passed","aprobada"), failed:W2("failed","rechazada"), struck:W2("struck down","anulada"), rejected:W2("rejected","rechazada")}[p.status] || p.status}</b>${p.yes != null ? ` (${p.yes}–${p.no})` : ""}</span>
        ${p.key === "custom" && ["review","voting"].includes(p.status) || p.key === "custom" && live(p) ? `<button class="btn ghost" onclick="civEditLaw('${p.id}')">✏️ ${W2("Edit","Editar")}</button>` : ""}
        ${p.status === "review" ? `<button class="btn primary" onclick="civApprove('${p.id}')">✅ ${W2("Approve for a vote","Aprobar para votar")}</button><button class="btn ghost" onclick="civReject('${p.id}')">✖ ${W2("Reject","Rechazar")}</button>` : ""}
        ${p.status === "voting" ? `<button class="btn primary" onclick="civLawTally('${p.id}')">${W2("Count votes","Contar votos")}</button>` : ""}
        ${p.status === "passed" && live(p) ? `<button class="btn ghost" onclick="civStrike('${p.id}')">⚖️ ${W2("Strike down","Anular")}</button>` : ""}</div>`; }).join("")
        + (list.length ? "" : `<p class="muted" style="font-size:12px">${W2("When there's a mayor, they can propose laws (from the list or in their own words) for the class to vote on. You can write laws too.","Cuando haya alcalde, podrá proponer leyes (de la lista o con sus palabras) para que la clase vote. Tú también puedes escribir leyes.")}</p>`); }));
  }
});
const tc = () => T.adminCid;
const getCls = async () => (await T.net.myClasses()).find(x => x.id === tc());
window.civSetGoal = function(){
  const t = Math.max(100, parseInt(document.getElementById("aGoalT").value, 10) || 3000), r = document.getElementById("aGoalR").value;
  if (!r) return alert(W2("Every plaza upgrade is unlocked!","¡Todas las mejoras están desbloqueadas!"));
  T.adminSet({goal:{id:Date.now().toString(36), target:t, reward:r, start:Date.now(), done:false}});
};
window.civEvent = k => T.adminSet({event:k ? {id:Date.now().toString(36), kind:k, start:Date.now(), until:Date.now() + 864e5} : null});
window.civSeason = k => T.adminSet({season:k});
window.civElection = async function(phase){
  const c = await getCls(), cur = c.election && c.election.id && c.election.phase !== "closed" ? c.election : null;
  T.adminSet({election:cur ? {...cur, phase} : {id:Date.now().toString(36), office:"mayor", phase, at:Date.now()}});
};
window.civTally = async function(){
  const c = await getCls(), e = c.election; if (!e) return;
  const [votes, cands] = await Promise.all([store().list(`classes/${c.id}/votes`, {where:[["eid","==",e.id]]}), store().list(`classes/${c.id}/candidates`, {where:[["eid","==",e.id]]})]);
  const t = {}; votes.forEach(v => { if (cands.some(x => x.sid === v.for)) t[v.for] = (t[v.for] || 0) + 1; });
  const tally = cands.map(x => [x.name, t[x.sid] || 0, x.sid]).sort((a, b) => b[1] - a[1]);
  if (!tally.length) return alert(W2("Nobody ran.","Nadie se postuló."));
  if (tally.length > 1 && tally[0][1] === tally[1][1] && !confirm(W2("It's a tie! Keep the first candidate who signed up as the winner? (Cancel to keep voting open.)","¡Empate! ¿Gana quien se inscribió primero? (Cancelar para seguir votando.)"))) return;
  const w = tally[0];
  T.adminSet({election:{...e, phase:"closed", result:{sid:w[2], name:w[0], votes:w[1], total:votes.length, tally:tally.map(x => [x[0], x[1]])}},
              mayor:{sid:w[2], name:w[0], since:Date.now(), eid:e.id},
              mayors:[...(c.mayors || []).filter(x => x.eid !== e.id), {sid:w[2], name:w[0], since:Date.now(), eid:e.id}].slice(-30)});
};
window.civLawTally = async function(pid){
  const c = await getCls(), p = (await store().list(`classes/${c.id}/proposals`)).find(x => x.id === pid); if (!p) return;
  const v = await store().list(`classes/${c.id}/lawvotes`, {where:[["pid","==",pid]]});
  const yes = v.filter(x => x.v).length, no = v.length - yes, passed = yes > no;
  await store().update(`classes/${c.id}/proposals/${pid}`, {status:passed ? "passed" : "failed", yes, no});
  if (passed && p.key === "custom") T.adminSet({customLaws:[...(c.customLaws || []).filter(l => l.id !== pid), {id:pid, title:p.title, desc:p.desc, by:p.teacher ? "Coach Smith" : p.name}]});
  else if (passed) T.adminSet({laws:[...new Set([...(c.laws || []), p.key])]}); else T.paintAdmin();
};
window.civStrike = async function(pid){
  if (!confirm(W2("As the Supreme Court, strike this law down?","Como la Corte Suprema, ¿anular esta ley?"))) return;
  const c = await getCls(), p = (await store().list(`classes/${c.id}/proposals`)).find(x => x.id === pid); if (!p) return;
  await store().update(`classes/${c.id}/proposals/${pid}`, {status:"struck"});
  if (p.key === "custom") T.adminSet({customLaws:(c.customLaws || []).filter(l => l.id !== pid)}); else T.adminSet({laws:(c.laws || []).filter(k => k !== p.key)});
};
/* teacher: impeachment */
window.civImpeach = async function(){
  const c = await getCls(); if (!c.mayor || !c.mayor.sid) return;
  if (!confirm(W2(`Open an impeachment vote on Mayor ${c.mayor.name}? The class votes; a simple majority impeaches.`, `¿Abrir votación de juicio político contra ${c.mayor.name}? Basta la mayoría simple.`))) return;
  T.adminSet({impeach:{id:"imp" + Date.now().toString(36), sid:c.mayor.sid, phase:"house", at:Date.now()}});
};
window.civImpCount = async function(stage){
  const c = await getCls(), i = c.impeach; if (!i || !c.mayor) return;
  const v = (await store().list(`classes/${c.id}/lawvotes`, {where:[["pid","==",i.id + "_" + stage]]})).filter(x => x.sid !== c.mayor.sid);
  const yes = v.filter(x => x.v).length, no = v.length - yes, nm = c.mayor.name;
  if (stage === "house") {
    if (yes > no) { alert(W2(`Impeached ${yes}–${no}. Now the trial: the class votes again, and it takes two-thirds to remove.`, `Acusado ${yes}–${no}. Ahora el juicio: la clase vota de nuevo y se necesitan dos tercios.`));
      T.adminSet({impeach:{...i, phase:"senate", house:[yes, no]}}); }
    else T.adminSet({impeach:{...i, phase:"done", house:[yes, no], result:LW(`The House voted ${yes}–${no}: ${nm} was not impeached.`, `La Cámara votó ${yes}–${no}: ${nm} no fue acusado.`)}});
    return;
  }
  const removed = v.length > 0 && yes >= Math.ceil(v.length * 2 / 3);
  if (removed) T.adminSet({mayor:null, impeach:{...i, phase:"done", senate:[yes, no], result:LW(`Impeached and removed: the trial voted ${yes}–${no}. The town needs a new election.`, `Acusado y destituido: el juicio votó ${yes}–${no}. El pueblo necesita una nueva elección.`)}});
  else T.adminSet({impeach:{...i, phase:"done", senate:[yes, no], result:LW(`Impeached but acquitted: the trial voted ${yes}–${no}, short of two-thirds. ${nm} stays mayor.`, `Acusado pero absuelto: el juicio votó ${yes}–${no}, sin los dos tercios. ${nm} sigue como alcalde.`)}});
};
/* teacher: review, edit and write laws */
function askLaw(t0, d0){
  const t = prompt(W2("Name of the law (40 characters max)","Nombre de la ley (máx. 40 caracteres)"), t0 || ""); if (t == null || !t.trim()) return null;
  const d = prompt(W2("What it does (140 characters max)","Qué hace (máx. 140 caracteres)"), d0 || ""); if (d == null || !d.trim()) return null;
  return {title:t.trim().slice(0, 40), desc:d.trim().slice(0, 140)};
}
window.civEditLaw = async function(pid){
  const c = await getCls(), p = (await store().list(`classes/${c.id}/proposals`)).find(x => x.id === pid); if (!p) return;
  const v = askLaw(p.title, p.desc); if (!v) return;
  await store().update(`classes/${c.id}/proposals/${pid}`, v);
  if ((c.customLaws || []).some(l => l.id === pid)) T.adminSet({customLaws:c.customLaws.map(l => l.id === pid ? {...l, ...v} : l)}); else T.paintAdmin();
};
window.civApprove = async pid => { await store().update(`classes/${T.adminCid}/proposals/${pid}`, {status:"voting"}); T.paintAdmin(); };
window.civReject = async pid => { if (confirm(W2("Reject this law? The mayor can write a new one.","¿Rechazar esta ley? La alcaldía puede escribir otra.")))
  { await store().update(`classes/${T.adminCid}/proposals/${pid}`, {status:"rejected"}); T.paintAdmin(); } };
window.civTeacherLaw = async function(){
  const v = askLaw(); if (!v) return;
  const vote = confirm(W2("Put this law to a class vote?\n\nOK = the class votes on it.\nCancel = make it a law right now.","¿Someter esta ley a votación?\n\nAceptar = la clase vota.\nCancelar = es ley ahora mismo."));
  const pid = await store().add(`classes/${T.adminCid}/proposals`, {key:"custom", ...v, teacher:true, sid:"", name:"Coach Smith", status:vote ? "voting" : "passed", at:Date.now()});
  if (vote) T.paintAdmin(); else { const c = await getCls(); T.adminSet({customLaws:[...(c.customLaws || []), {id:pid, ...v, by:"Coach Smith"}]}); }
};
window.civQuiz = async function(){
  const pid = document.getElementById("aQC").value; window._lastQC = pid; const pk = (typeof allPacks === "function" ? allPacks() : []).find(p => p.id === pid); if (!pk) return;
  const pool = []; pk.units.forEach(u => u.items.forEach(it => { if (it.type === "mcq" && it.c && it.c.en && it.c.en.length >= 3) pool.push(it); }));
  const it = pool[Math.floor(Math.random() * pool.length)]; if (!it) return;
  _pbzN = 0; setC({quiz:{id:Date.now().toString(36), phase:"open", at:Date.now(), q:{q:it.q, c:it.c, a:it.a, why:it.why || null}}});
};
window.civReveal = async function(){
  const c = await getCls(), q = c.quiz; if (!q) return;
  const rows = await store().list(`classes/${c.id}/buzz`, {where:[["qid","==",q.id]]});
  const first = rows.filter(r => r.a === q.q.a).sort((a, b) => a.at - b.at).slice(0, 3).map(r => r.name);
  setC({quiz:{...q, phase:"reveal", first, right:rows.filter(r => r.a === q.q.a).length, total:rows.length}});
};

/* the board: watch the class live, and give the teacher quiz buttons under the plaza */
let _pbz = null, _pbzN = 0;
const setC = patch => PROJ ? T.net.setClass(T.adminCid, patch) : T.adminSet(patch);
EXT.projector.push(cid => {
  PROJ = true;
  T.viewSub(() => { PROJ = false; });
  T.viewSub(store().watchDoc(`classes/${cid}`, c => { if (!c) return; ADMIN_CLS = {...c, id:cid}; const box = document.getElementById("tProjX"); if (!box) return;
    const q = c.quiz && c.quiz.id ? c.quiz : null;
    box.innerHTML = `<div class="tsw" style="justify-content:center;margin:10px 0">
      <select id="aQC">${(typeof allPacks === "function" ? allPacks() : []).map(p => `<option value="${p.id}" ${q && window._lastQC === p.id ? "selected" : ""}>${E(L2(p.name))}</option>`).join("")}</select>
      <button class="btn primary" onclick="civQuiz()">❓ ${q && q.phase === "open" ? W2("Next question","Siguiente") : W2("Plaza quiz","Quiz")}</button>
      ${q && q.phase === "open" ? `<button class="btn" onclick="civReveal()">👀 ${W2("Reveal","Revelar")}</button>` : ""}<span id="aBuzz" class="muted"></span></div>`;
    if (q && (!_pbz || _pbz.id !== q.id)) { if (_pbz) _pbz.off();
      _pbz = {id:q.id, off:store().watch(`classes/${cid}/buzz`, {where:[["qid","==",q.id]]}, rows => { if (rows) _pbzN = rows.length; const el = document.getElementById("aBuzz"); if (el) el.textContent = `${_pbzN} ${W2("answered","respondieron")}`; })}; }
    else if (q) { const el = document.getElementById("aBuzz"); if (el) el.textContent = `${_pbzN} ${W2("answered","respondieron")}`; } }));
  T.viewSub(() => { if (_pbz) { _pbz.off(); _pbz = null; } });
});

/* every visit to the hub counts for the weekly league, even outside the Town */
T.CIV = {badWords, badShow, answeredToday, certPay, unitPaychecks, civ, qCard, sheet, closeSheet, cleanText, flag, jobPay, day, week, dayN, hashN, img, bar, CLS, E, W2, C, store, SESS, NET, paint, cur, hasLaw, sub, xpSince, myXp,
  elec, get proj(){ return PROJ; }};
window.CIVIC = {civ, week, goalProgress, unlocked, loanOwed, accrue, rollJobs, jobDone, EVENTS, LAWS, BIZ, UPGRADES, JOBS, get LEAGUE(){ return LEAGUE; }};
})();
