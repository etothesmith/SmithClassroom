/* =============================================================================
   SMITHTOPIA — Getting around: cars, the airport and new places (town/travel.js, 3.3 phase 4)
   Map tiles:
   🚗 Auto Dealer   cars with limited weekly stock; weekly gas + insurance on your
                    bills; resale value drops 10% a week (depreciation, floor 40%).
   ✈️ Airport       get a passport (customs quiz), fly to Coach Smith's other
                    periods, sign their guestbook, greet classmates there, collect
                    a passport stamp from every period (+💵10 for all of them).
   🛍️ Mall          a weekly boutique of 6 items; only 3 of each per class and the
                    price climbs as they sell.
   🏖️ Beach         a daily shell hunt (3 questions); rare shells.
   🎭 Theater       Trivia Night: 5 timed questions once a day; the day's top score
                    wins 💵6 the next day.
   🏛️ Museum        donate an item to the class exhibit (+💵2 each new kind);
                    a daily docent question.
   ⚓ Port          invest 💵1–10 in one of this week's 3 ships (safe, medium,
                    risky); voyages come home Monday (risk and return).
   Without a car, each trip to the beach, mall, theater, museum or port costs a
   💵1 bus fare (once per place per day).
   Firestore: classes/{cid}/carbuys, mallbuys, shows, museum, voyages; and on the
   destination class: visas, guestbook, greets.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN, W = window.WORLD2; if (!T || !T.CIV || !W) return;
const {EXT} = T, V = T.CIV;
const {civ, sheet, closeSheet, day, week, E, W2, C, store, SESS, CLS, hashN} = V;
const L = a => S.lang === "es" ? a[1] : a[0];
const me = () => SESS() && SESS().sid, myName = () => SESS() && SESS().name, myCid = () => SESS() && SESS().cid;
const P3 = k => T.artImg(`${T.TA}places3/${k}.webp`, "🏙️");
const H = 36e5, WK = 7 * 864e5;
const hn = s => (hashN ? hashN(s) : [...s].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261));

const CARS = {
  scooter:{e:"🛵", l:["Scooter","Motoneta"], price:15, wk:1, stock:6},
  compact:{e:"🚗", l:["Compact car","Auto compacto"], price:40, wk:2, stock:5},
  pickup: {e:"🛻", l:["Pickup truck","Camioneta"], price:60, wk:3, stock:4},
  ev:     {e:"🔋", l:["Electric car","Auto eléctrico"], price:75, wk:1, stock:3},
  sports: {e:"🏎️", l:["Sports car","Deportivo"], price:120, wk:4, stock:2}
};
const SHELLS = [["clam","🐚",["Clam shell","Almeja"],50],["scallop","🦪",["Scallop","Vieira"],25],["star","⭐",["Starfish","Estrella de mar"],12],["conch","🐌",["Queen conch","Caracol rosado"],8],["sanddollar","🪙",["Sand dollar","Dólar de arena"],4],["pearl","🫧",["Pearl","Perla"],1]];
const SHIPS = {
  sloop:  {e:"⛵", l:["Safe Sloop","Balandra segura"], d:["Coastal run: small, steady returns","Ruta costera: ganancias pequeñas y estables"], outs:[0.9,1.1,1.2,1.2,1.3]},
  freight:{e:"🚢", l:["Cargo Freighter","Carguero"], d:["Trade route: could gain or lose","Ruta comercial: puede ganar o perder"], outs:[0.5,0.8,1.2,1.5,1.8]},
  galleon:{e:"🏴‍☠️", l:["Treasure Galleon","Galeón del tesoro"], d:["High risk: lose it all or triple it","Alto riesgo: perderlo todo o triplicarlo"], outs:[0,0,0.5,2,3]}
};
const SPOTS = ["beach","mall","theater","museum","port"];

let CARB = [], MALLB = [], SHOWS = [], MUSEUM = [], VOY = [], GREETS = [], SUBS = [];
const stop = () => { SUBS.forEach(u => { try { u(); } catch(e){} }); SUBS = []; };
let OPEN = null;
const redraw = () => { if (T.isTown() && T.tt === "map" && OPEN) T.paintSub(); };
function watch(){ stop(); if (!SESS()) return; const wk = week();
  SUBS.push(store().watch(`${C()}/carbuys`, {where:[["week","==",wk]]}, r => { if (r) { CARB = r; redraw(); } }));
  SUBS.push(store().watch(`${C()}/mallbuys`, {where:[["week","==",wk]]}, r => { if (r) { MALLB = r; redraw(); } }));
  SUBS.push(store().watch(`${C()}/shows`, {}, r => { if (r) { SHOWS = r; showPrize(); redraw(); } }));
  SUBS.push(store().watch(`${C()}/museum`, {}, r => { if (r) { MUSEUM = r; redraw(); } }));
  SUBS.push(store().watch(`${C()}/voyages`, {where:[["sid","==",me()]]}, r => { if (r) { VOY = r; voyClaim(); redraw(); } }));
  SUBS.push(store().watch(`${C()}/greets`, {where:[["to","==",me()]]}, r => { if (r) { GREETS = r; greetNote(); redraw(); } }));
  setTimeout(sisterStamp, 1500); }
EXT.onSession.push(() => setTimeout(watch, 1100)); EXT.onLeave.push(stop);

/* ---------------------------------------------------------------- getting there */
const gar = () => { const c = civ(); c.garage = c.garage || {car:null}; return c.garage; };
const myCar = () => gar().car && CARS[gar().car] ? gar().car : null;
function ride(k){ if (myCar()) return `<p class="trv">${CARS[myCar()].e} ${W2("You drove here.","Llegaste manejando.")}</p>`;
  const c = civ(); c.rides = c.rides && c.rides.day === day() ? c.rides : {day:day(), set:{}};
  if (!c.rides.set[k]) { c.rides.set[k] = 1; T.coins(-Math.min(1, S.tokens | 0)); T.persist(); T.toast(W2("🚌 Bus fare: −💵1. A car makes every trip free.","🚌 Pasaje: −💵1. Con auto los viajes son gratis.")); }
  return `<p class="trv">🚌 ${W2("You took the bus (💵1 today).","Tomaste el autobús (💵1 hoy).")}</p>`; }

/* ---------------------------------------------------------------- dealer */
const sold = k => CARB.filter(b => b.model === k).length;
const carLeft = k => Math.max(0, CARS[k].stock - sold(k));
const carPrice = k => Math.round(CARS[k].price * (1 + 0.15 * sold(k)));
const resale = () => { const g = gar(), k = myCar(); if (!k) return 0; const w = Math.floor((Date.now() - (g.bought || Date.now())) / WK); return Math.max(1, Math.floor((g.paid || CARS[k].price) * Math.max(0.4, 0.7 - 0.1 * w))); };
window.trBuyCar = async function(k){ if (myCar()) return T.toast(W2("Sell your car first.","Vende tu auto primero.")); const p = carPrice(k);
  if (!carLeft(k)) return T.toast(W2("Sold out this week. New shipment Monday!","Agotado. ¡Llegan más el lunes!"));
  if ((S.tokens | 0) < p) return T.toast(W2(`You need 💵${p}.`, `Necesitas 💵${p}.`));
  try { await store().add(`${C()}/carbuys`, {week:week(), model:k, sid:me(), at:Date.now()}); T.coins(-p); Object.assign(gar(), {car:k, bought:Date.now(), paid:p}); T.persist(); T.publishSoon && T.publishSoon();
    T.toast(W2(`${CARS[k].e} It's yours! Trips are free now; gas and insurance (💵${CARS[k].wk}) arrive with your weekly bills.`, `${CARS[k].e} ¡Es tuyo! Gas y seguro (💵${CARS[k].wk}) llegan con tus facturas.`)); } catch(e){ T.toast(W2("Couldn't buy right now.","No se pudo comprar.")); } };
window.trSellCar = function(){ const k = myCar(); if (!k) return; const v = resale();
  if (!confirm(W2(`Sell your ${L(CARS[k].l)} for 💵${v}? You paid 💵${gar().paid}.`, `¿Vender tu auto por 💵${v}? Pagaste 💵${gar().paid}.`))) return;
  T.coins(v); Object.assign(gar(), {car:null, bought:0, paid:0}); T.persist(); T.publishSoon && T.publishSoon(); T.toast(W2(`💵 Sold for ${v}. Cars lose value fast: that's depreciation.`, `💵 Vendido por ${v}. Los autos pierden valor: depreciación.`)); };
(window.ECON_BILLS = window.ECON_BILLS || []).push(() => { const k = myCar(); return k ? [{k:"car", e:CARS[k].e, l:["Gas and insurance","Gasolina y seguro"], amt:CARS[k].wk}] : []; });
EXT.pubExtra.push(() => ({car:myCar() || ""}));
EXT.nameTag.push(sid => { const p = (T.pub || {})[sid]; return p && p.car && CARS[p.car] ? CARS[p.car].e : ""; });
function paintDealer(){ const k = myCar();
  return `${k ? `<section class="panel"><div class="eyebrow">🔑 ${W2("Your garage","Tu cochera")}</div><div class="ebill"><span>${CARS[k].e} <b>${E(L(CARS[k].l))}</b> <small class="muted">${W2(`paid 💵${gar().paid} · worth 💵${resale()} now · 💵${CARS[k].wk}/week gas + insurance`, `pagaste 💵${gar().paid} · vale 💵${resale()} · 💵${CARS[k].wk}/semana`)}</small></span><button class="btn" onclick="trSellCar()">${W2("Sell","Vender")}</button></div></section>` : ""}
    <section class="panel"><div class="eyebrow">🚗 ${W2("This week's lot · limited stock · each sale raises the price 15%","Inventario de la semana · limitado · cada venta sube 15%")}</div>
      <div class="fsup">${Object.entries(CARS).map(([m, c]) => `<div><span>${c.e}</span><b>${E(L(c.l))}</b><small>💵${c.wk}/${W2("week to run","semana")}</small><small class="${carLeft(m) < 2 ? "dn" : ""}">${carLeft(m)}/${c.stock} ${W2("left","quedan")}</small><button class="btn" ${!carLeft(m) || k ? "disabled" : ""} onclick="trBuyCar('${m}')">💵${carPrice(m)}</button></div>`).join("")}</div>
      <p class="muted" style="font-size:13px">${W2("A car makes trips free and shows next to your name. But it costs money every week and is worth less every week you own it. Is it worth it for you?","Un auto hace gratis los viajes, pero cuesta cada semana y pierde valor. ¿Te conviene?")}</p></section>`; }

/* ---------------------------------------------------------------- mall */
const mallItems = () => { const ids = Object.values(T.ITEMS).filter(i => i.p > 0 && !i.biz).map(i => i.id).sort(); const out = [], h0 = hn("mall" + week());
  for (let i = 0; out.length < 6 && i < 50; i++) { const id = ids[hn(h0 + ":" + i) % ids.length]; if (!out.includes(id)) out.push(id); } return out; };
const mallSold = id => MALLB.filter(b => b.item === id).length;
const mallPrice = id => Math.ceil(T.priceOf ? T.priceOf(T.ITEMS[id]) * 1.25 * (1 + 0.2 * mallSold(id)) : T.ITEMS[id].p * 1.25);
window.trMall = async function(id){ const p = mallPrice(id); if (mallSold(id) >= 3) return T.toast(W2("Sold out!","¡Agotado!"));
  if ((S.tokens | 0) < p) return T.toast(W2(`You need 💵${p}.`, `Necesitas 💵${p}.`));
  try { await store().add(`${C()}/mallbuys`, {week:week(), item:id, sid:me(), at:Date.now()}); T.coins(-p); T.addItem(id, 1); T.persist(); T.toast(W2(`🛍️ Bought ${T.itemName(id)}!`, `🛍️ ¡Compraste ${T.itemName(id)}!`)); } catch(e){} };
function paintMall(){ return `<section class="panel"><div class="eyebrow">🛍️ ${W2("Boutique of the week · only 3 of each per class","Boutique de la semana · solo 3 de cada uno")}</div>
  <div class="fsup">${mallItems().map(id => `<div>${T.itemArt(id, 56)}<b>${E(T.itemName(id))}</b><small class="${mallSold(id) >= 2 ? "dn" : ""}">${3 - mallSold(id)}/3 ${W2("left","quedan")}</small><button class="btn" ${mallSold(id) >= 3 ? "disabled" : ""} onclick="trMall('${id}')">💵${mallPrice(id)}</button></div>`).join("")}</div>
  <p class="muted" style="font-size:13px">${W2("Limited supply: once they're gone, they're gone until next week's collection. Resell them on the Market if classmates want them.","Oferta limitada: cuando se acaban, hasta la próxima semana. Revéndelos en el Mercado.")}</p></section>`; }

/* ---------------------------------------------------------------- beach */
const shells = () => { const c = civ(); c.shells = c.shells || {}; return c.shells; };
function pickShell(seed){ const tot = SHELLS.reduce((a, s) => a + s[3], 0); let r = seed % tot; for (const s of SHELLS) { if ((r -= s[3]) < 0) return s; } return SHELLS[0]; }
window.trShells = function(){ const c = civ(); if (c.shellDay === day()) return T.toast(W2("The tide is out until tomorrow.","La marea vuelve mañana."));
  LIVE.qRun({items:LIVE.pickItems(3), title:W2("Shell hunt","Búsqueda de conchas"), e:"🏖️"}, right => { c.shellDay = day(); const got = [];
    for (let i = 0; i < right; i++) { const s = pickShell(hn(me() + day() + i + Math.random())); shells()[s[0]] = (shells()[s[0]] | 0) + 1; got.push(s[1]); }
    T.persist(); T.toast(right ? W2(`🏖️ You found ${got.join(" ")}!`, `🏖️ ¡Encontraste ${got.join(" ")}!`) : W2("Only seaweed today.","Hoy solo algas.")); T.paintSub(); }); };
window.trSellShell = function(k){ const s = SHELLS.find(x => x[0] === k), n = shells()[k] | 0; if (!n) return; const v = Math.max(1, Math.round(10 / s[3] * 5));
  shells()[k] = n - 1; T.coins(Math.min(v, 25)); T.persist(); T.toast(W2(`🐚 Sold a ${L(s[2])} for 💵${Math.min(v, 25)}.`, `🐚 Vendiste por 💵${Math.min(v, 25)}.`)); T.paintSub(); };
function paintBeach(){ const sh = shells();
  return `<section class="panel"><div class="eyebrow">🐚 ${W2("Shell hunt · once a day · each right answer finds a shell","Búsqueda de conchas · una vez al día")}</div>
    <button class="btn primary" ${civ().shellDay === day() ? "disabled" : ""} onclick="trShells()">🏖️ ${W2("Search the shore","Buscar en la orilla")}</button>
    <div class="fsup" style="margin-top:10px">${SHELLS.map(([k, e, l, w]) => `<div><span>${e}</span><b>${E(L(l))}</b><small>${W2("rarity","rareza")} ${w >= 25 ? W2("common","común") : w >= 8 ? W2("uncommon","poco común") : w >= 4 ? W2("rare","rara") : W2("legendary","legendaria")}</small><small>×${sh[k] | 0}</small>${sh[k] ? `<button class="btn" onclick="trSellShell('${k}')">${W2("Sell","Vender")} 💵${Math.min(25, Math.max(1, Math.round(50 / w)))}</button>` : ""}</div>`).join("")}</div>
    <p class="muted" style="font-size:13px">${W2("Rarer shells are worth more: scarcity sets the price.","Las conchas raras valen más: la escasez fija el precio.")}</p></section>`; }

/* ---------------------------------------------------------------- theater */
const showToday = () => SHOWS.filter(s => s.day === day()).sort((a, b) => b.score - a.score || a.at - b.at);
window.trShow = function(){ if (SHOWS.some(s => s.day === day() && s.sid === me())) return T.toast(W2("You already played tonight.","Ya jugaste hoy."));
  if ((S.tokens | 0) < 2) return T.toast(W2("A ticket costs 💵2.","Un boleto cuesta 💵2.")); T.coins(-2); T.persist();
  LIVE.qRun({items:LIVE.pickItems(5), title:W2("Trivia Night","Noche de trivia"), e:"🎭", timer:15}, async (right, ms) => {
    const score = right * 100 + Math.max(0, 75 - Math.round(ms / 1000));
    await store().set(`${C()}/shows/${day()}_${me()}`, {day:day(), sid:me(), name:myName(), score, right, at:Date.now()}).catch(() => {});
    T.toast(W2(`🎭 ${right}/5 · score ${score}. Top score at the end of the day wins 💵6!`, `🎭 ${right}/5 · puntaje ${score}. ¡El mejor del día gana 💵6!`)); }); };
function showPrize(){ const days = [...new Set(SHOWS.map(s => s.day))].filter(d => d < day()); let ch = false;
  days.forEach(d => { const top = SHOWS.filter(s => s.day === d).sort((a, b) => b.score - a.score || a.at - b.at)[0];
    if (top && top.sid === me()) ch = T.once("show:" + d, () => { T.coins(6); T.toast(W2(`🏆 You won Trivia Night on ${d}! +💵6.`, `🏆 ¡Ganaste la Noche de trivia del ${d}! +💵6.`)); }) || ch; });
  if (ch) T.persist(); }
function paintTheater(){ const t = showToday();
  return `<section class="panel"><div class="eyebrow">🎭 ${W2("Trivia Night · ticket 💵2 · 5 questions, 15 seconds each","Noche de trivia · boleto 💵2 · 5 preguntas")}</div>
    <button class="btn primary" ${t.some(s => s.sid === me()) ? "disabled" : ""} onclick="trShow()">🎟️ ${W2("Buy a ticket and play","Comprar boleto y jugar")}</button>
    <div class="eyebrow" style="margin-top:12px">🏆 ${W2("Tonight's leaderboard (winner gets 💵6 tomorrow)","Tabla de hoy (el ganador recibe 💵6 mañana)")}</div>
    ${t.slice(0, 8).map((s, i) => `<div class="ebill"><span>${["🥇","🥈","🥉"][i] || i + 1 + "."} <b>${E(s.name)}</b></span><small>${s.right}/5</small><b>${s.score}</b></div>`).join("") || `<p class="muted">${W2("Nobody has played yet tonight.","Nadie ha jugado hoy.")}</p>`}</section>`; }

/* ---------------------------------------------------------------- museum */
window.trDonate = function(){ const inv = T.freeInv ? T.freeInv() : {}; const ids = Object.keys(inv).filter(id => T.ITEMS[id]);
  if (!ids.length) return T.toast(W2("You don't have a spare item to donate.","No tienes objetos para donar."));
  sheet(`<div class="eyebrow">🏛️ ${W2("Donate to the museum","Donar al museo")}</div><p class="muted" style="margin-top:0">${W2("Your name goes on the exhibit label. First donation of a kind: +💵2.","Tu nombre va en la etiqueta. Primera donación de un tipo: +💵2.")}</p>
    <div class="gpickk">${ids.slice(0, 24).map(id => `<button onclick="trDonateGo('${id}')">${T.itemArt(id, 40)}<b>${E(T.itemName(id))}</b></button>`).join("")}</div><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`); };
window.trDonateGo = async function(id){ closeSheet(); if (!T.has(id)) return; const first = !MUSEUM.some(m => m.item === id);
  try { await store().add(`${C()}/museum`, {item:id, sid:me(), name:myName(), at:Date.now()}); T.addItem(id, -1); if (first) T.coins(2); T.persist();
    T.toast(first ? W2(`🏛️ ${T.itemName(id)} is now on display! +💵2.`, `🏛️ ¡${T.itemName(id)} está en exhibición! +💵2.`) : W2("🏛️ Thank you for your donation!","🏛️ ¡Gracias por tu donación!")); } catch(e){} };
window.trDocent = function(){ const c = civ(); if (c.docent === day()) return;
  W.ask({title:W2("The docent asks…","El guía pregunta…"), e:"🏛️"}, ok => { closeSheet(); c.docent = day(); if (ok) T.coins(1); T.persist(); T.toast(ok ? W2("🏛️ The docent is impressed. +💵1.","🏛️ ¡El guía está impresionado! +💵1.") : W2("Come back tomorrow for another question.","Vuelve mañana.")); T.paintSub(); }); };
function paintMuseum(){ const ex = [...MUSEUM].sort((a, b) => b.at - a.at);
  return `<section class="panel"><div class="eyebrow">🏛️ ${W2("The class collection","La colección de la clase")} · ${new Set(ex.map(m => m.item)).size} ${W2("kinds on display","tipos en exhibición")}</div>
    <div class="eprow"><button class="btn primary" onclick="trDonate()">🎁 ${W2("Donate an item","Donar un objeto")}</button><button class="btn" ${civ().docent === day() ? "disabled" : ""} onclick="trDocent()">🧑‍🏫 ${W2("Docent's question (+💵1)","Pregunta del guía (+💵1)")}</button></div>
    <div class="trexh">${ex.slice(0, 40).map(m => `<div>${T.itemArt(m.item, 56)}<b>${E(T.itemName(m.item))}</b><small>${W2("gift of","donado por")} ${E(m.name)}</small></div>`).join("") || `<p class="muted">${W2("The halls are empty. Be the first donor!","Las salas están vacías. ¡Sé el primero!")}</p>`}</div></section>`; }

/* ---------------------------------------------------------------- port */
const lastWeek = () => { const d = new Date(week() + "T12:00:00"); d.setDate(d.getDate() - 7); return d.toISOString().slice(0, 10); };
const outcome = (ship, wk) => { const o = SHIPS[ship].outs; return o[hn("voy" + ship + wk) % o.length]; };
window.trInvest = function(ship, amt){ if (VOY.some(v => v.week === week())) return T.toast(W2("One investment a week.","Una inversión por semana."));
  const n = amt || parseInt(prompt(W2("Invest how much? (💵1–10)","¿Cuánto inviertes? (💵1–10)"), "5"), 10); if (!(n >= 1 && n <= 10)) return;
  if ((S.tokens | 0) < n) return T.toast(W2(`You need 💵${n}.`, `Necesitas 💵${n}.`));
  store().set(`${C()}/voyages/${week()}_${me()}`, {week:week(), sid:me(), name:myName(), ship, stake:n, at:Date.now()}).then(() => { T.coins(-n); T.persist(); T.toast(W2(`${SHIPS[ship].e} You staked 💵${n}. The ship returns Monday.`, `${SHIPS[ship].e} Invertiste 💵${n}. El barco vuelve el lunes.`)); }).catch(() => {}); };
function voyClaim(){ let ch = false; VOY.filter(v => v.week < week()).forEach(v => { const m = outcome(v.ship, v.week), got = Math.floor(v.stake * m);
  ch = T.once("voy:" + v.id, () => { if (got) T.coins(got); T.toast(W2(`${SHIPS[v.ship].e} Your ship came home: ×${m} → 💵${got} (staked ${v.stake}).`, `${SHIPS[v.ship].e} Tu barco volvió: ×${m} → 💵${got}.`)); }) || ch; }); if (ch) T.persist(); }
function paintPort(){ const cur = VOY.find(v => v.week === week()), lw = lastWeek();
  return `<section class="panel"><div class="eyebrow">⚓ ${W2("Ships leaving this week · one investment a week (💵1–10)","Barcos de la semana · una inversión (💵1–10)")}</div>
    ${cur ? `<p>✅ ${W2(`You have 💵${cur.stake} on the ${L(SHIPS[cur.ship].l)}. It returns Monday.`, `Tienes 💵${cur.stake} en el ${L(SHIPS[cur.ship].l)}. Vuelve el lunes.`)}</p>` : ""}
    <div class="fsup">${Object.entries(SHIPS).map(([k, s]) => `<div><span>${s.e}</span><b>${E(L(s.l))}</b><small>${E(L(s.d))}</small><small>${W2("last week","semana pasada")}: ×${outcome(k, lw)}</small><button class="btn" ${cur ? "disabled" : ""} onclick="trInvest('${k}')">${W2("Invest","Invertir")}</button></div>`).join("")}</div>
    <p class="muted" style="font-size:13px">${W2("Risk and return: the safe sloop rarely loses, the galleon can triple your money or sink it.","Riesgo y rendimiento: la balandra casi nunca pierde; el galeón puede triplicar o hundir tu dinero.")}</p></section>`; }

/* ---------------------------------------------------------------- airport and visits */
const pp = () => { const c = civ(); c.passport = c.passport || {issued:0, stamps:{}}; return c.passport; };
const sisters = () => (CLS().sisters || []).filter(s => s.id !== myCid());
let DEST = null, DCLS = null, DPUB = [], DBOOK = [], DSUB = [];
const dstop = () => { DSUB.forEach(u => { try { u(); } catch(e){} }); DSUB = []; };
window.trPassport = function(){ if (pp().issued) return; if ((S.tokens | 0) < 5) return T.toast(W2("A passport costs 💵5.","Un pasaporte cuesta 💵5."));
  LIVE.qRun({items:LIVE.pickItems(3, {subj:"gov"}), title:W2("Customs interview: 2 of 3 to pass","Entrevista de aduana: 2 de 3"), e:"🛂"}, right => {
    if (right < 2) return T.toast(W2(`🛂 ${right}/3. Study up and try again!`, `🛂 ${right}/3. ¡Estudia e intenta otra vez!`));
    T.coins(-5); pp().issued = Date.now(); T.persist(); T.toast(W2("🛂 Passport issued! Pick a destination.","🛂 ¡Pasaporte emitido! Elige un destino.")); T.paintSub(); }); };
window.trFly = async function(id){ const dest = sisters().find(s => s.id === id); if (!dest) return; if (!pp().issued) return T.toast(W2("Get a passport first.","Primero saca tu pasaporte."));
  if (window.TOWN_JAILED && window.TOWN_JAILED()) return T.toast(W2("🔒 You can't fly from jail.","🔒 No puedes volar desde la cárcel."));
  const fare = (CLS().travel || {}).fare != null ? CLS().travel.fare : 3; if ((S.tokens | 0) < fare) return T.toast(W2(`A ticket costs 💵${fare}.`, `El boleto cuesta 💵${fare}.`));
  try { await store().set(`classes/${id}/visas/${store().uid()}`, {sid:me(), name:myName(), from:myCid(), fromName:CLS().name || "", day:day(), at:Date.now()}); }
  catch(e){ console.warn(e); return T.toast(W2("That flight is grounded. Ask Coach Smith to open the airport.","Ese vuelo no sale. Pide al docente abrir el aeropuerto.")); }
  T.coins(-fare); const first = !pp().stamps[id]; pp().stamps[id] = Date.now(); T.persist();
  DEST = dest; AV = "visit"; dwatch(); T.toast(W2(`✈️ Welcome to ${dest.name}!${first ? " 🛂 New passport stamp." : ""}`, `✈️ ¡Bienvenido a ${dest.name}!${first ? " 🛂 Nuevo sello." : ""}`)); sisterStamp(); T.paintSub(); };
function sisterStamp(){ const all = sisters(); if (all.length && all.every(s => pp().stamps[s.id])) { if (T.once("stamps:all", () => { T.coins(10); T.toast(W2("🌎 You've visited every period! +💵10.","🌎 ¡Visitaste todos los periodos! +💵10.")); })) T.persist(); } }
function dwatch(){ dstop(); if (!DEST) return; const id = DEST.id;
  store().get(`classes/${id}`).then(c => { DCLS = c; redraw(); }).catch(() => {});
  DSUB.push(store().watch(`classes/${id}/pub`, {}, r => { if (r) { DPUB = r.filter(p => p.name); redraw(); } }));
  DSUB.push(store().watch(`classes/${id}/guestbook`, {}, r => { if (r) { DBOOK = r.sort((a, b) => b.at - a.at); redraw(); } })); }
window.trHome = () => { dstop(); DEST = null; AV = "air"; T.paintSub(); T.toast(W2("🛬 Home sweet home.","🛬 Hogar dulce hogar.")); };
window.trSign = async function(){ const inp = document.getElementById("trGb"), txt = (inp.value || "").trim(), err = document.getElementById("trErr"); if (txt.length < 3 || !DEST) return;
  if (window.badShow && window.badShow(err, [txt], "guestbook")) return;
  try { await store().add(`classes/${DEST.id}/guestbook`, {sid:me(), name:myName(), from:myCid(), fromName:CLS().name || "", uid:store().uid(), msg:txt.slice(0, 120), at:Date.now()}); inp.value = ""; T.toast(W2("✍️ Signed!","✍️ ¡Firmado!")); } catch(e){ err.textContent = W2("Couldn't sign.","No se pudo firmar."); } };
window.trGreet = async function(sid, nm, e){ if (!DEST) return; if (!T.once(`greet:${day()}:${DEST.id}:${sid}`, () => {})) return T.toast(W2("You already greeted them today.","Ya saludaste hoy."));
  try { await store().add(`classes/${DEST.id}/greets`, {to:sid, toName:nm, sid:me(), name:myName(), from:myCid(), fromName:CLS().name || "", uid:store().uid(), e, at:Date.now()}); T.persist(); T.toast(W2(`${e} Sent to ${nm}!`, `${e} ¡Enviado a ${nm}!`)); } catch(e2){} };
function greetNote(){ let ch = false; GREETS.forEach(g => { ch = T.once("greetn:" + g.id, () => T.toast(W2(`✈️ ${g.e} ${g.name} from ${g.fromName} says hi!`, `✈️ ${g.e} ¡${g.name} de ${g.fromName} te saluda!`))) || ch; }); if (ch) T.persist(); }
let AV = "air";
function paintAirport(){
  if (AV === "visit" && DEST) { const c = DCLS || {}, m = c.mayor;
    return `<section class="panel raised"><div class="eyebrow">✈️ ${W2("Visiting","De visita en")}</div><h2 style="margin:2px 0">${E(DEST.name)}</h2>
        <p class="muted" style="margin:0">${m && m.name ? W2(`Mayor ${E(m.name)}`, `Alcalde ${E(m.name)}`) + " · " : ""}${DPUB.length} ${W2("residents","residentes")} · ${(c.laws || []).length + (c.customLaws || []).length} ${W2("town laws","leyes")}</p>
        <button class="btn" style="margin-top:8px" onclick="trHome()">🛬 ${W2("Fly home","Volver a casa")}</button></section>
      <section class="panel"><div class="eyebrow">👋 ${W2("Say hi to the locals","Saluda a los locales")}</div>${DPUB.slice(0, 40).map(p => `<div class="ebill"><span><b>${E(p.name)}</b> <small class="muted">Lv ${p.lvl || 1}${p.career ? " · " + E(p.career.job) : ""}${p.car && CARS[p.car] ? " · " + CARS[p.car].e : ""}</small></span>${["👋","🤝","🎉"].map(e => `<button class="btn ghost" onclick="trGreet('${p.id}','${E(p.name).replace(/'/g, "")}','${e}')">${e}</button>`).join("")}</div>`).join("") || `<p class="muted">${W2("Nobody's around.","No hay nadie.")}</p>`}</section>
      <section class="panel"><div class="eyebrow">📖 ${W2("Guestbook","Libro de visitas")}</div><div class="eprow"><input id="trGb" maxlength="120" placeholder="${W2("Leave a friendly note","Deja un mensaje amable")}" style="flex:1"><button class="btn primary" onclick="trSign()">${W2("Sign","Firmar")}</button></div><p id="trErr" class="err"></p>
        ${DBOOK.slice(0, 15).map(g => `<p style="margin:4px 0"><b>${E(g.name)}</b> <small class="muted">${E(g.fromName)}</small>: ${E(g.msg)}</p>`).join("")}</section>`; }
  const P = pp(), fare = (CLS().travel || {}).fare != null ? CLS().travel.fare : 3, sis = sisters();
  return `<section class="panel"><div class="eyebrow">🛂 ${W2("Passport","Pasaporte")}</div>${P.issued ? `<p>${W2("Stamps","Sellos")}: ${sis.map(s => `<span class="kst" style="${P.stamps[s.id] ? "" : "opacity:.35"}">🛂 ${E(s.name)}</span>`).join(" ") || "—"}</p><small class="muted">${W2("Collect every period's stamp: +💵10.","Junta los sellos de todos los periodos: +💵10.")}</small>`
      : `<p>${W2("You need a passport to fly: 💵5 and a short customs interview (2 of 3 right).","Necesitas pasaporte: 💵5 y una entrevista de aduana (2 de 3).")}</p><button class="btn primary" onclick="trPassport()">🛂 ${W2("Apply","Solicitar")}</button>`}</section>
    <section class="panel"><div class="eyebrow">🛫 ${W2(`Departures · 💵${fare} a ticket`, `Salidas · 💵${fare} el boleto`)}</div>
      ${sis.map(s => `<div class="ebill"><span>✈️ <b>${E(s.name)}</b></span><button class="btn" ${P.issued ? "" : "disabled"} onclick="trFly('${s.id}')">${W2("Fly","Volar")}</button></div>`).join("") || `<p class="muted">${W2("No flights yet. Coach Smith opens routes from the teacher panel.","Aún no hay vuelos. El docente abre las rutas.")}</p>`}</section>
    ${GREETS.length ? `<section class="panel"><div class="eyebrow">📬 ${W2("Greetings from travelers","Saludos de viajeros")}</div>${GREETS.sort((a, b) => b.at - a.at).slice(0, 10).map(g => `<p style="margin:4px 0">${g.e} <b>${E(g.name)}</b> <small class="muted">${E(g.fromName)}</small></p>`).join("")}</section>` : ""}`; }

/* ---------------------------------------------------------------- register the places */
const PLACES = {
  dealer: {e:"🚗", l:["Auto Dealer","Concesionario"], d:["Buy a car: free trips, weekly costs","Compra un auto"], art:"dealer", paint:paintDealer, sub:["Cars lose value every week. Decide if it's worth it.","Los autos pierden valor cada semana."]},
  airport:{e:"✈️", l:["Airport","Aeropuerto"], d:["Fly to Coach Smith's other periods","Vuela a otros periodos"], art:"airport", paint:paintAirport, sub:["Passport, flights and passport stamps.","Pasaporte, vuelos y sellos."]},
  mall:   {e:"🛍️", l:["Mall","Centro comercial"], d:["Limited weekly boutique","Boutique semanal limitada"], art:"mall", paint:paintMall, sub:["New collection every Monday.","Nueva colección cada lunes."]},
  beach:  {e:"🏖️", l:["Beach","Playa"], d:["Daily shell hunt","Búsqueda diaria de conchas"], art:"beach", paint:paintBeach, sub:["Sun, sand and rare shells.","Sol, arena y conchas raras."]},
  theater:{e:"🎭", l:["Theater","Teatro"], d:["Trivia Night: win 💵6","Noche de trivia: gana 💵6"], art:"theater", paint:paintTheater, sub:["Tonight only: Trivia Night!","¡Solo esta noche: trivia!"]},
  museum: {e:"🏛️", l:["Museum","Museo"], d:["Donate to the class exhibit","Dona a la exhibición"], art:"museum", paint:paintMuseum, sub:["The class collection.","La colección de la clase."]},
  port:   {e:"⚓", l:["Port","Puerto"], d:["Invest in a voyage","Invierte en un viaje"], art:"port", paint:paintPort, sub:["Ships leave every week.","Barcos cada semana."]}
};
Object.entries(PLACES).forEach(([k, p]) => { W.MORE.places.push({k, e:p.e, l:p.l, d:p.d});
  W.MORE.views[k] = (el, back) => { OPEN = k; const trip = SPOTS.includes(k) ? ride(k) : "";
    el.innerHTML = `${back}<section class="panel raised ehead">${P3(p.art)}<div><div class="eyebrow">${p.e} ${E(L(p.l))}</div><h2>${E(L(p.l))}</h2><p class="muted" style="margin:0">${E(L(p.sub))}</p>${trip}</div></section>${p.paint()}`; }; });
EXT.onLeave.push(() => { OPEN = null; dstop(); DEST = null; AV = "air"; });

/* ---------------------------------------------------------------- teacher */
window.trTFare = n => { const c = window._trTc || {}; T.adminSet({travel:{...(c.travel || {}), fare:Math.max(0, Math.min(10, n | 0))}}); };
window.trTRoutes = async function(){ const list = await T.net.myClasses(); const sis = list.map(c => ({id:c.id, name:c.name}));
  for (const c of list) await T.net.setClass(c.id, {sisters:sis}).catch(() => {}); T.toast(W2(`✈️ Routes open between ${sis.length} classes.`, `✈️ Rutas abiertas entre ${sis.length} clases.`)); T.paintAdmin(); };
window.trTClose = async function(){ const list = await T.net.myClasses(); for (const c of list) await T.net.setClass(c.id, {sisters:[]}).catch(() => {}); T.paintAdmin(); };
EXT.adminPanels.push({html: c => { window._trTc = c; const t = c.travel || {}, open = (c.sisters || []).length;
  return `<section class="panel tadm"><div class="eyebrow">✈️ ${W2("Airport: visits between your periods","Aeropuerto: visitas entre periodos")}</div>
    <p class="muted" style="font-size:13px">${W2("Students with a passport can fly to your other classes, see who lives there, greet them and sign the guestbook. They can't change anything in another class.","Los alumnos con pasaporte pueden visitar tus otras clases, saludar y firmar el libro. No pueden cambiar nada.")}</p>
    <div class="eprow">${open ? `<button class="btn" onclick="trTClose()">🛑 ${W2("Close all routes","Cerrar rutas")}</button><span class="muted">${W2(`${open} classes connected`, `${open} clases conectadas`)}</span>` : `<button class="btn primary" onclick="trTRoutes()">🛫 ${W2("Open routes between all my classes","Abrir rutas entre mis clases")}</button>`}
      <label>${W2("Ticket price","Precio del boleto")} <select onchange="trTFare(this.value)">${[0, 1, 2, 3, 5].map(n => `<option ${n === (t.fare != null ? t.fare : 3) ? "selected" : ""}>${n}</option>`).join("")}</select></label></div></section>`; }, after:() => {}});
window.TRAVEL = {CARS, SHIPS, SHELLS, myCar, resale, carPrice, mallItems, mallPrice, outcome, pp, get dest(){ return DEST; }, get greets(){ return GREETS; }, get museum(){ return MUSEUM; }, get shows(){ return SHOWS; }};
})();
