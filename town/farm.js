/* =============================================================================
   SMITHTOPIA — Orange Grove: farms, animals and scarce supplies (town/farm.js, 3.0 phase 2)
   Map → 🌾 Orange Grove.
   1. Farm plots: only 12 per class (scarcity). Buy one, plant crops in 6 beds;
      crops grow in real time, faster when watered (each watering is a class
      question), and wilt if left too long.
   2. Livestock: chickens, ducks, goats, sheep, pigs, cows, bees and horses.
      Feed them every day (a question + the feed cost) and they produce eggs,
      milk, wool, honey and truffles. Three hungry days and they wander off.
   3. Farm Supply: seeds and animals are limited each week for the whole class;
      prices climb as the stock sells out and reset on Monday.
   4. Farmers Market: sell what you grow. Prices fall when the class floods the
      market with one crop and rise when it's scarce (supply and demand).
   5. Farmhands: owners hire classmates who water, harvest and feed for a wage
      the owner pays automatically.
   Firestore: classes/{cid}/farms/{p1..p12}, supply, sales.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN, W = window.WORLD2; if (!T || !T.CIV || !W) return;
const {EXT} = T, V = T.CIV;
const {civ, sheet, closeSheet, day, week, E, W2, C, store, SESS, CLS} = V;
const L = a => S.lang === "es" ? a[1] : a[0];
const me = () => SESS() && SESS().sid;
const PLOTS = 12, BEDS = 6, PLOT_PRICE = 25, H = 36e5;

const CROPS = {
  strawberry:{e:"🍓", l:["Strawberries","Fresas"], hrs:3, seed:2, yield:3, base:3, stock:40},
  tomato:    {e:"🍅", l:["Tomatoes","Tomates"], hrs:4, seed:2, yield:3, base:3, stock:40},
  corn:      {e:"🌽", l:["Corn","Maíz"], hrs:6, seed:2, yield:4, base:2, stock:40},
  sugarcane: {e:"🎋", l:["Sugarcane","Caña de azúcar"], hrs:8, seed:3, yield:4, base:3, stock:30},
  orange:    {e:"🍊", l:["Orange tree","Naranjo"], hrs:12, seed:6, yield:6, base:3, stock:20},
  pumpkin:   {e:"🎃", l:["Pumpkins","Calabazas"], hrs:24, seed:4, yield:2, base:9, stock:20}
};
const ANIMALS = {
  chicken:{e:"🐔", l:["Chicken","Gallina"], cost:10, feed:1, out:"egg", n:2, stock:16},
  duck:   {e:"🦆", l:["Duck","Pato"], cost:8, feed:1, out:"egg", n:1, stock:10},
  goat:   {e:"🐐", l:["Goat","Cabra"], cost:18, feed:1, out:"cheese", n:1, stock:8},
  sheep:  {e:"🐑", l:["Sheep","Oveja"], cost:20, feed:1, out:"wool", n:1, stock:8},
  pig:    {e:"🐖", l:["Pig","Cerdo"], cost:16, feed:2, out:"truffle", n:1, stock:6},
  cow:    {e:"🐄", l:["Cow","Vaca"], cost:30, feed:2, out:"milk", n:2, stock:6},
  bee:    {e:"🐝", l:["Beehive","Colmena"], cost:15, feed:0, out:"honey", n:1, stock:8},
  horse:  {e:"🐴", l:["Horse","Caballo"], cost:40, feed:2, out:null, n:0, stock:4}
};
const GOODS = {egg:{e:"🥚", l:["Eggs","Huevos"], base:2}, milk:{e:"🥛", l:["Milk","Leche"], base:3}, cheese:{e:"🧀", l:["Cheese","Queso"], base:5},
  wool:{e:"🧶", l:["Wool","Lana"], base:5}, truffle:{e:"🍄", l:["Truffles","Trufas"], base:8}, honey:{e:"🍯", l:["Honey","Miel"], base:6}};
const ALL = {...Object.fromEntries(Object.entries(CROPS).map(([k, c]) => [k, {e:c.e, l:c.l, base:c.base}])), ...GOODS};
const FA = (k, e) => `<span class="fart">${T.artImg(`${T.TA}farm/${k}.webp`, e)}</span>`;
const TARGET = 40;                                      /* units a week the market "expects" per good */

let FARMS = {}, SUP = [], SALES = [], SUBS = [], SUBF = null;
const stop = () => { SUBS.forEach(u => { try { u(); } catch(e){} }); SUBS = []; };
const fpath = p => `${C()}/farms/${p}`;
const myPlot = () => Object.keys(FARMS).find(p => FARMS[p] && FARMS[p].sid === me()) || null;
const handOf = () => Object.keys(FARMS).filter(p => FARMS[p] && (FARMS[p].hands || []).includes(me()));
const redraw = () => { if (T.isTown() && T.tt === "map" && window._farmOpen) T.paintSub(); };
function watch(){ stop(); if (!SESS()) return; const wk = week();
  SUBS.push(store().watch(`${C()}/farms`, {}, rows => { if (!rows) return; FARMS = Object.fromEntries(rows.map(r => [r.id, r])); payHands(); collectWages(); redraw(); }));
  SUBS.push(store().watch(`${C()}/supply`, {where:[["week","==",wk]]}, rows => { if (rows) { SUP = rows; redraw(); } }));
  SUBS.push(store().watch(`${C()}/sales`, {where:[["week","==",wk]]}, rows => { if (rows) { SALES = rows; redraw(); } })); }
EXT.onSession.push(() => setTimeout(watch, 900)); EXT.onLeave.push(stop);

/* ---------------------------------------------------------------- scarcity: weekly supply and market prices */
const bought = k => SUP.filter(s => s.item === k).reduce((a, s) => a + (s.n | 0), 0);
const stockOf = k => (CROPS[k] || ANIMALS[k]).stock;
const left = k => Math.max(0, stockOf(k) - bought(k));
const supplyPrice = k => { const b = CROPS[k] ? CROPS[k].seed : ANIMALS[k].cost; return Math.ceil(b * (1 + bought(k) / stockOf(k))); };
const soldWk = k => SALES.filter(s => s.good === k).reduce((a, s) => a + (s.n | 0), 0);
const mktPrice = k => (window.TOWN_FX ? TOWN_FX("crop", 1) : 1) * ALL[k].base * Math.max(0.4, Math.min(1.6, 1.6 - 1.2 * soldWk(k) / TARGET));

/* ---------------------------------------------------------------- crops */
const stageOf = b => { if (!b || !b.c) return null; const C2 = CROPS[b.c]; if (!C2) return null;
  const need = C2.hrs * H, rate = (1 + Math.min(2, b.w | 0) * 0.5) * (window.TOWN_FX ? TOWN_FX("grow", 1) : 1);           /* each watering (max 2) speeds growth 50% */
  const g = Math.min(1, (Date.now() - b.at) * rate / (need * 2)); const ripeAt = b.at + need * 2 / rate;
  const wilt = g >= 1 && Date.now() - ripeAt > 48 * H;
  return {g, ready:g >= 1, wilt, st:g >= 1 ? 3 : g >= 0.5 ? 2 : 1, mins:Math.max(0, Math.ceil((ripeAt - Date.now()) / 6e4))}; };
async function patch(p, d){ try { await store().update(fpath(p), {...d, by:me(), upd:Date.now()}); } catch(e){ console.warn(e); T.toast(W2("Couldn't save that. Check your connection.","No se pudo guardar.")); throw e; } }
const isOwner = p => FARMS[p] && FARMS[p].sid === me();
function wage(p){ if (isOwner(p)) return {}; const f = FARMS[p], o = {...(f.owed || {})}; o[me()] = (o[me()] | 0) + (f.wage | 0); return {owed:o}; }

window.fmBuyPlot = async function(p){
  if (myPlot()) return T.toast(W2("You already have a farm.","Ya tienes una granja."));
  if (FARMS[p]) return T.toast(W2("Someone already owns that plot.","Alguien ya tiene ese terreno."));
  if ((S.tokens | 0) < PLOT_PRICE) return T.toast(W2(`A plot costs 💵${PLOT_PRICE}.`, `Un terreno cuesta 💵${PLOT_PRICE}.`));
  try { await store().set(fpath(p), {sid:me(), uid:store().uid(), name:SESS().name, beds:Array.from({length:BEDS}, () => ({c:null})), ani:{}, fed:"", hungry:0, hands:[], handNames:{}, wage:2, owed:{}, paid:{}, stash:{}, by:me(), at:Date.now(), upd:Date.now()});
    T.coins(-PLOT_PRICE); T.persist(); T.toast(W2(`🌾 Plot ${p.slice(1)} is yours! Buy seeds at Farm Supply and plant.`, `🌾 ¡El terreno ${p.slice(1)} es tuyo! Compra semillas y siembra.`));
  } catch(e){ T.toast(W2("Someone just bought that plot.","Alguien acaba de comprar ese terreno.")); }
};
window.fmPlant = function(p, i){
  if (!isOwner(p)) return; const seeds = civ().seeds || {}; const have = Object.entries(seeds).filter(([, n]) => n > 0);
  if (!have.length) return T.toast(W2("No seeds. Buy some at Farm Supply.","No tienes semillas. Compra en Suministros."));
  sheet(`<div class="eyebrow">🌱 ${W2("Plant bed","Sembrar cama")} ${i + 1}</div><div class="gpickk">${have.map(([k, n]) => `<button onclick="fmPlantGo('${p}',${i},'${k}')"><span style="font-size:32px">${FA(k + "_3", CROPS[k].e)}</span><b>${E(L(CROPS[k].l))}</b><small>×${n} · ${CROPS[k].hrs * 2}h</small></button>`).join("")}</div>
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.fmPlantGo = async function(p, i, k){ closeSheet(); const seeds = civ().seeds || {}; if (!(seeds[k] > 0)) return;
  const beds = FARMS[p].beds.slice(); if (beds[i] && beds[i].c) return; beds[i] = {c:k, at:Date.now(), w:0};
  await patch(p, {beds}); seeds[k]--; T.persist(); T.toast(W2(`🌱 Planted ${L(CROPS[k].l)}. Water it to grow faster!`, `🌱 Sembraste ${L(CROPS[k].l)}. ¡Riégalo para que crezca más rápido!`)); };
window.fmWater = function(p, i){ const b = FARMS[p] && FARMS[p].beds[i]; if (!b || !b.c || (b.w | 0) >= 2) return;
  W.ask({title:W2("Water the crop","Regar el cultivo"), e:"💧", sub:L(CROPS[b.c].l)}, async ok => { closeSheet(); if (!ok) return T.toast(W2("The watering can tipped over. Try again!","Se cayó la regadera. ¡Intenta otra vez!"));
    const beds = FARMS[p].beds.slice(); beds[i] = {...beds[i], w:(beds[i].w | 0) + 1}; await patch(p, {beds, ...wage(p)}); T.toast(W2("💧 Watered! It grows 50% faster.","💧 ¡Regado! Crece 50% más rápido.")); }); };
window.fmHarvest = async function(p, i){ const f = FARMS[p], b = f && f.beds[i], s = stageOf(b); if (!s || !s.ready) return;
  const C2 = CROPS[b.c], n = s.wilt ? Math.ceil(C2.yield / 2) : C2.yield, beds = f.beds.slice();
  beds[i] = b.c === "orange" && !s.wilt ? {c:"orange", at:Date.now() - CROPS.orange.hrs * H, w:0} : {c:null};       /* trees grow back faster */
  const stash = {...(f.stash || {})}; stash[b.c] = (stash[b.c] | 0) + n;
  await patch(p, {beds, stash, ...wage(p)}); T.toast(W2(`🧺 Harvested ${n} ${L(C2.l)}${s.wilt ? " (some wilted)" : ""}.`, `🧺 Cosechaste ${n} ${L(C2.l)}${s.wilt ? " (algunas se marchitaron)" : ""}.`)); };

/* ---------------------------------------------------------------- animals */
const feedCost = f => Object.entries(f.ani || {}).reduce((a, [k, n]) => a + (ANIMALS[k] ? ANIMALS[k].feed * n : 0), 0);
window.fmFeed = function(p){ const f = FARMS[p]; if (!f || f.fed === day()) return; const cost = feedCost(f);
  if (!Object.keys(f.ani || {}).length) return;
  if (isOwner(p) && (S.tokens | 0) < cost) return T.toast(W2(`Feed costs 💵${cost} today.`, `El alimento cuesta 💵${cost} hoy.`));
  W.ask({title:W2("Feed the animals","Alimentar a los animales"), e:"🌾"}, async ok => { closeSheet(); if (!ok) return T.toast(W2("The animals didn't like that answer. Try again!","¡Intenta otra vez!"));
    const stash = {...(f.stash || {})}; Object.entries(f.ani || {}).forEach(([k, n]) => { const A = ANIMALS[k]; if (A && A.out) stash[A.out] = (stash[A.out] | 0) + A.n * n * (window.TOWN_FX ? TOWN_FX("ani", 1) : 1); });
    const extra = {}; if (!isOwner(p)) { extra.owed = {...(f.owed || {})}; extra.owed[me()] = (extra.owed[me()] | 0) + (f.wage | 0); extra.feedOwed = (f.feedOwed | 0) + cost; }
    await patch(p, {fed:day(), hungry:0, stash, ...extra}); if (isOwner(p) && cost) { T.coins(-cost); T.persist(); }
    T.toast(W2("🥚 Fed! Today's eggs, milk, wool and honey are in the barn.","🥚 ¡Alimentados! Lo de hoy está en el granero.")); }); };
/* a farm left hungry: checked by the owner once a day */
async function hungerCheck(){ const p = myPlot(); if (!p) return; const f = FARMS[p]; if (!Object.keys(f.ani || {}).length || f.fed === day()) return;
  const last = f.lastCheck; if (last === day()) return; const missed = f.fed ? Math.floor((new Date(day()) - new Date(f.fed)) / 864e5) - 1 : 0;
  const d = {lastCheck:day()};
  if (missed >= 3) { const ani = {...f.ani}; const k = Object.keys(ani).sort((a, b) => ANIMALS[b].cost - ANIMALS[a].cost)[0]; ani[k]--; if (!ani[k]) delete ani[k]; d.ani = ani; d.fed = day();
    T.toast(W2(`😢 Your ${L(ANIMALS[k].l)} wandered off after 3 hungry days. Feed your animals every day!`, `😢 Tu ${L(ANIMALS[k].l)} se fue tras 3 días sin comer.`)); }
  await patch(p, d).catch(() => {}); }

/* ---------------------------------------------------------------- Farm Supply (weekly limited stock) */
window.fmSupply = async function(k){
  const isCrop = !!CROPS[k], price = supplyPrice(k), n = isCrop ? 3 : 1, cost = isCrop ? price * n : price, p = myPlot();
  if (!isCrop && !p) return T.toast(W2("Buy a farm plot first.","Primero compra un terreno."));
  if (left(k) < n) return T.toast(W2("Sold out this week. More on Monday!","Agotado esta semana. ¡Más el lunes!"));
  if ((S.tokens | 0) < cost) return T.toast(W2(`You need 💵${cost}.`, `Necesitas 💵${cost}.`));
  try { await store().add(`${C()}/supply`, {week:week(), item:k, n, sid:me(), at:Date.now()});
    T.coins(-cost);
    if (isCrop) { const s = civ().seeds = civ().seeds || {}; s[k] = (s[k] | 0) + n; }
    else { const ani = {...(FARMS[p].ani || {})}; ani[k] = (ani[k] | 0) + 1; await patch(p, {ani}); }
    T.persist(); T.toast(isCrop ? W2(`🌱 Bought 3 ${L(CROPS[k].l)} seeds for 💵${cost}.`, `🌱 Compraste 3 semillas por 💵${cost}.`) : W2(`${ANIMALS[k].e} Welcome to the farm, ${L(ANIMALS[k].l)}!`, `${ANIMALS[k].e} ¡Bienvenido a la granja!`));
  } catch(e){ console.warn(e); T.toast(W2("Couldn't buy right now.","No se pudo comprar.")); }
};

/* ---------------------------------------------------------------- Farmers Market */
window.fmSell = async function(k, n){
  const p = myPlot(); if (!p) return; const f = FARMS[p], have = (f.stash || {})[k] | 0; n = Math.min(n, have); if (n < 1) return;
  let total = 0, sold = soldWk(k); for (let i = 0; i < n; i++) { total += (window.TOWN_FX ? TOWN_FX("crop", 1) : 1) * ALL[k].base * Math.max(0.4, Math.min(1.6, 1.6 - 1.2 * sold / TARGET)); sold++; }
  total = Math.max(1, Math.floor(total));
  try { const stash = {...f.stash}; stash[k] = have - n; if (!stash[k]) delete stash[k];
    await patch(p, {stash}); await store().add(`${C()}/sales`, {week:week(), good:k, n, sid:me(), at:Date.now()});
    T.coins(total); T.persist(); T.toast(W2(`💵 Sold ${n} ${L(ALL[k].l)} for 💵${total}.`, `💵 Vendiste ${n} ${L(ALL[k].l)} por 💵${total}.`));
  } catch(e){}
};

/* ---------------------------------------------------------------- farmhands */
window.fmHire = function(){ const p = myPlot(); if (!p) return; const f = FARMS[p];
  const pubs = Object.entries(T.pub || {}).filter(([sid, x]) => sid !== me() && x.name && !(f.hands || []).includes(sid));
  sheet(`<div class="eyebrow">👩‍🌾 ${W2("Hire a farmhand","Contratar un peón")}</div>
    <p class="muted" style="margin-top:0">${W2("Farmhands water, harvest and feed on your farm. You pay their wage for each task, automatically, from your cash.","Los peones riegan, cosechan y alimentan. Les pagas por tarea, automáticamente.")}</p>
    <label class="cform">${W2("Who?","¿Quién?")}<select id="fmWho">${pubs.map(([sid, x]) => `<option value="${sid}">${E(x.name)}</option>`).join("")}</select></label>
    <label class="cform">${W2("Wage per task","Salario por tarea")}<select id="fmWage">${[1, 2, 3, 4, 5].map(w => `<option ${w === (f.wage | 0) ? "selected" : ""}>${w}</option>`).join("")}</select></label>
    <button class="btn primary wide" onclick="fmHireGo()">${W2("Hire","Contratar")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`); };
window.fmHireGo = async function(){ const p = myPlot(), sid = document.getElementById("fmWho").value, w = parseInt(document.getElementById("fmWage").value, 10) || 2; if (!p || !sid) return;
  const f = FARMS[p]; await patch(p, {hands:[...(f.hands || []), sid].slice(0, 4), handNames:{...(f.handNames || {}), [sid]:(T.pub[sid] || {}).name || "?"}, wage:w}); closeSheet();
  T.toast(W2(`👩‍🌾 Hired ${(T.pub[sid] || {}).name}. They'll see your farm under Orange Grove.`, `👩‍🌾 Contrataste a ${(T.pub[sid] || {}).name}.`)); };
window.fmFire = async function(sid){ const p = myPlot(); if (!p) return; const f = FARMS[p]; await patch(p, {hands:(f.hands || []).filter(x => x !== sid)}); };
/* the owner pays what's owed, as cash allows */
async function payHands(){ const p = myPlot(); if (!p) return; const f = FARMS[p], owed = f.owed || {}, paid = {...(f.paid || {})}, o2 = {...owed}; let spent = 0;
  const feed = f.feedOwed | 0;
  for (const [sid, n] of Object.entries(owed)) { if (n <= 0) continue; const x = Math.min(n, (S.tokens | 0) - spent - feed); if (x <= 0) break; spent += x; o2[sid] = n - x; paid[sid] = (paid[sid] | 0) + x; }
  const feedPay = Math.min(feed, (S.tokens | 0) - spent);
  if (!spent && !feedPay) return; T.coins(-(spent + feedPay)); T.persist();
  await patch(p, {owed:o2, paid, feedOwed:feed - feedPay}).catch(() => {});
  if (spent) T.toast(W2(`👩‍🌾 Paid your farmhands 💵${spent}.`, `👩‍🌾 Pagaste 💵${spent} a tus peones.`)); }
/* a farmhand collects wages the owner has paid */
function collectWages(){ const got = civ().farmPaid = civ().farmPaid || {}; let n = 0;
  handOf().concat(Object.keys(got)).forEach(p => { const f = FARMS[p]; if (!f) return; const total = (f.paid || {})[me()] | 0, had = got[p] | 0; if (total > had) { n += total - had; got[p] = total; } });
  if (n) { T.coins(n); T.persist(); T.toast(W2(`💵 Farm wages: +${n}.`, `💵 Salario de la granja: +${n}.`)); } }

/* ---------------------------------------------------------------- screens */
let FV = "farm";
window.fmView = v => { FV = v; window._tfresh = Date.now(); T.paintSub(); };
function farmCard(p){ const f = FARMS[p], own = f.sid === me(), cost = feedCost(f), fedToday = f.fed === day(), stash = Object.entries(f.stash || {}).filter(([, n]) => n > 0);
  return `<section class="panel"><div class="eyebrow">🌾 ${own ? W2("Your farm","Tu granja") : W2(`${E(f.name)}'s farm (you're a farmhand · 💵${f.wage | 0}/task)`, `Granja de ${E(f.name)} (eres peón · 💵${f.wage | 0}/tarea)`)} · ${W2("plot","terreno")} ${p.slice(1)}</div>
    <div class="fbeds">${f.beds.map((b, i) => { const s = stageOf(b), C2 = b.c && CROPS[b.c];
      return `<div class="fbed ${s && s.ready ? "ready" : ""} ${s && s.wilt ? "wilt" : ""}">${C2 ? `<span class="fcrop">${FA(`${b.c}_${s.st}`, s.st === 1 ? "🌱" : s.st === 2 ? "🌿" : C2.e)}</span><b>${E(L(C2.l))}</b>
        <small>${s.ready ? (s.wilt ? W2("wilting!","¡marchitándose!") : W2("ready!","¡lista!")) : W2(`${s.mins >= 60 ? Math.ceil(s.mins / 60) + "h" : s.mins + "m"} left`, `faltan ${s.mins >= 60 ? Math.ceil(s.mins / 60) + "h" : s.mins + "m"}`)} · 💧${b.w | 0}/2</small>
        ${s.ready ? `<button class="btn primary" onclick="fmHarvest('${p}',${i})">${W2("Harvest","Cosechar")}</button>` : (b.w | 0) < 2 ? `<button class="btn" onclick="fmWater('${p}',${i})">💧 ${W2("Water","Regar")}</button>` : ""}`
        : `<span class="fcrop">${FA("soil", "🟫")}</span><small>${W2("empty","vacía")}</small>${own ? `<button class="btn" onclick="fmPlant('${p}',${i})">🌱 ${W2("Plant","Sembrar")}</button>` : ""}`}</div>`; }).join("")}</div>
    <div class="fani">${Object.entries(f.ani || {}).map(([k, n]) => `<span>${FA(k, ANIMALS[k].e)}×${n}</span>`).join("") || `<span class="muted">${W2("No animals yet.","Sin animales aún.")}</span>`}
      ${Object.keys(f.ani || {}).length ? (fedToday ? `<small>✅ ${W2("fed today","alimentados hoy")}</small>` : `<button class="btn primary" onclick="fmFeed('${p}')">🌾 ${W2(`Feed (💵${cost})`, `Alimentar (💵${cost})`)}</button>`) : ""}</div>
    <div class="fstash"><b>${FA("barn_box", "🏚️")} ${W2("Barn","Granero")}:</b> ${stash.map(([k, n]) => `<span>${FA(k, ALL[k].e)}×${n}</span>`).join("") || `<span class="muted">${W2("empty","vacío")}</span>`}</div>
    ${own ? `<div class="fhands"><b>${FA("farmhand", "👩‍🌾")} ${W2("Farmhands","Peones")}:</b> ${(f.hands || []).map(sid => `<span class="kst">${E((f.handNames || {})[sid] || "?")}${(f.owed || {})[sid] ? ` <small>${W2("owed","debes")} 💵${f.owed[sid]}</small>` : ""} <button class="btn ghost" onclick="fmFire('${sid}')">✖</button></span>`).join("") || `<span class="muted">${W2("none","ninguno")}</span>`}
      ${(f.hands || []).length < 4 ? `<button class="btn" onclick="fmHire()">+ ${W2("Hire","Contratar")}</button>` : ""}</div>` : ""}</section>`; }
function paintFarm(el, back){
  window._farmOpen = true; const p = myPlot(), hands = handOf();
  const nav = [["farm","🌾",W2("My farm","Mi granja")],["supply","🛒",W2("Farm Supply","Suministros")],["market","⚖️",W2("Farmers Market","Mercado agrícola")]];
  let body = "";
  if (FV === "supply") body = `<section class="panel"><div class="eyebrow">🛒 ${W2("Farm Supply · limited stock this week · prices rise as it sells out","Suministros · existencias limitadas · el precio sube al agotarse")}</div>
      <div class="fsup">${Object.entries(CROPS).map(([k, C2]) => `<div><span>${FA(k + "_3", C2.e)}</span><b>${E(L(C2.l))}</b><small>${W2("3 seeds","3 semillas")} · ${C2.hrs * 2}h · ${W2("yield","rinde")} ${C2.yield}</small><small class="${left(k) < 8 ? "dn" : ""}">${left(k)}/${C2.stock} ${W2("left","quedan")}</small><button class="btn" ${left(k) < 3 ? "disabled" : ""} onclick="fmSupply('${k}')">💵${supplyPrice(k) * 3}</button></div>`).join("")}</div>
      <div class="eyebrow" style="margin-top:12px">🐾 ${W2("Animals","Animales")}</div>
      <div class="fsup">${Object.entries(ANIMALS).map(([k, A]) => `<div><span>${FA(k, A.e)}</span><b>${E(L(A.l))}</b><small>${A.out ? `${GOODS[A.out].e}×${A.n}/${W2("day","día")}` : W2("a loyal friend","un amigo fiel")} · ${W2("feed","alimento")} 💵${A.feed}/${W2("day","día")}</small><small class="${left(k) < 3 ? "dn" : ""}">${left(k)}/${A.stock} ${W2("left","quedan")}</small><button class="btn" ${left(k) < 1 || !p ? "disabled" : ""} onclick="fmSupply('${k}')">💵${supplyPrice(k)}</button></div>`).join("")}</div>
      <p class="muted" style="font-size:13px">${W2("Scarcity: the whole class shares one weekly supply. When something is almost gone, it costs more. It restocks every Monday.","Escasez: toda la clase comparte las existencias de la semana. Cuando casi se acaba, cuesta más. Se reabastece cada lunes.")}</p></section>`;
  else if (FV === "market") { const st = p ? FARMS[p].stash || {} : {};
    body = `<section class="panel"><div class="eyebrow">⚖️ ${W2("Farmers Market · prices this week","Mercado agrícola · precios de la semana")}</div>
      ${Object.entries(ALL).map(([k, g]) => { const pr = mktPrice(k), have = st[k] | 0, trend = pr / g.base - 1;
        return `<div class="ebill"><span>${g.e} ${E(L(g.l))} <small class="muted">${W2("sold this week","vendidos")}: ${soldWk(k)}</small></span><b>💵${pr.toFixed(2)}</b><small class="${trend >= 0 ? "up" : "dn"}">${trend >= 0 ? "▲" : "▼"} ${Math.abs(trend * 100).toFixed(0)}%</small>
          ${have ? `<button class="btn" onclick="fmSell('${k}',1)">${W2("Sell 1","Vender 1")}</button><button class="btn primary" onclick="fmSell('${k}',${have})">${W2(`Sell all ${have}`, `Vender ${have}`)}</button>` : ""}</div>`; }).join("")}
      <p class="muted" style="font-size:13px">${W2("Supply and demand: the more of one crop the class sells this week, the lower its price goes. Sell what's scarce, or hold until Monday.","Oferta y demanda: entre más se vende de un cultivo, más baja su precio. Vende lo escaso o espera al lunes.")}</p></section>`; }
  else { const taken = Object.keys(FARMS).length;
    body = (p ? farmCard(p) : `<section class="panel"><div class="eyebrow">🗺️ ${W2(`Farm plots: ${PLOTS - taken} of ${PLOTS} left`, `Terrenos: quedan ${PLOTS - taken} de ${PLOTS}`)}</div>
      <div class="fplots">${Array.from({length:PLOTS}, (_, i) => "p" + (i + 1)).map(k => FARMS[k] ? `<div class="taken">${FA("plot_taken", "🌾")}<small>${E(FARMS[k].name)}</small></div>` : `<button onclick="fmBuyPlot('${k}')">${FA("plot", "🟩")}<small>${W2("Buy","Comprar")} 💵${PLOT_PRICE}</small></button>`).join("")}</div>
      <p class="muted" style="font-size:13px">${W2("Land is limited: once all 12 plots are bought, the only way to farm is to work for someone who has one.","La tierra es limitada: cuando se venden los 12 terrenos, la única forma de cultivar es trabajar para alguien que tenga uno.")}</p></section>`)
      + hands.map(farmCard).join(""); }
  el.innerHTML = `${back}<section class="panel raised ehead">${T.artImg(`${T.TA}places3/barn.webp`, "🌾")}<div><div class="eyebrow">🍊 ${W2("Orange Grove","Orange Grove")}</div><h2>${W2("Farm country","El campo")}</h2>
      <p class="muted" style="margin:0">${W2("Grow crops, raise animals, sell at the market, hire farmhands.","Cultiva, cría animales, vende en el mercado y contrata peones.")}</p></div></section>
    <nav class="tchips">${nav.map(([k, ic, l]) => `<button class="${FV === k ? "on" : ""}" onclick="fmView('${k}')">${ic} ${l}</button>`).join("")}</nav>${body}`;
}
W.MORE.places.push({k:"farm", e:"🌾", l:["Orange Grove Farms","Granjas Orange Grove"], d:["Farms, animals and the Farmers Market","Granjas, animales y el mercado agrícola"]});
W.MORE.views.farm = paintFarm;
EXT.onLeave.push(() => { window._farmOpen = false; });
setInterval(() => { if (SESS()) hungerCheck().catch(() => {}); if (window._farmOpen && T.isTown() && T.tt === "map" && !document.querySelector("#certAsk:not(.hidden)")) T.paintSub(); }, 60e3);
/* a nudge: ripe crops or hungry animals */
EXT.banner.push(() => { const p = myPlot(); if (!p || !SESS() || T.tt === "map") return ""; const f = FARMS[p], ripe = f.beds.filter(b => { const s = stageOf(b); return s && s.ready; }).length, hungry = Object.keys(f.ani || {}).length && f.fed !== day();
  return ripe || hungry ? `<section class="panel jban"><b>🌾 ${[ripe ? W2(`${ripe} crop${ripe > 1 ? "s" : ""} ready`, `${ripe} cultivo(s) listo(s)`) : "", hungry ? W2("animals are hungry","los animales tienen hambre") : ""].filter(Boolean).join(" · ")}</b><button class="btn primary" onclick="w2Go('farm')">${W2("Go to the farm","Ir a la granja")}</button></section>` : ""; });
window.FARM = {CROPS, ANIMALS, GOODS, stageOf, supplyPrice, mktPrice, left, get farms(){ return FARMS; }, myPlot};
})();
