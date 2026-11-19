/* =============================================================================
   SMITHTOPIA — money gets real (town/economy.js, Smithtopia 3.0 phase 1)
   Town → 💹 Money:
   1. The Smithtopia Exchange: 8 town companies whose prices move every hour
      (a seeded random walk the whole class shares, daily news shocks, and the
      teacher's boom/recession and Fed-rate levers). Buy, sell, collect Friday
      dividends, watch your portfolio.
   2. Weekly lottery: 2-Smithbuck tickets, pick 3 of 20. Friday 1:00 PM draw.
      The jackpot is 60% of ticket sales and rolls over. Shows the real odds and
      expected value (a lesson in probability and the lottery as a regressive tax).
   3. Bills and budget: weekly bills (utilities by house, phone, food, pet care,
      mortgage). Late bills cost a fee and credit points. Autopay, a 50/30/20
      budget, a savings goal and auto-save.
   4. Mortgages: buy any house with 20% down; the rate depends on your credit
      score and the Fed rate; 8 weekly payments with an amortization table;
      3 missed payments and the bank forecloses.
   Firestore: classes/{cid}/lottery (tickets). Everything else is the student's own save.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T || !T.CIV) return;
const {EXT} = T, V = T.CIV;
const {civ, sheet, closeSheet, day, week, E, W2, C, store, SESS, CLS} = V;
const L = a => S.lang === "es" ? a[1] : a[0];
const me = () => SESS() && SESS().sid;
const ec = () => { const c = civ(); c.ec = c.ec || {}; const e = c.ec; e.stk = e.stk || {}; e.bud = e.bud || {goal:50, save:0, autopay:false}; e.flow = e.flow || {}; return e; };
const econ = () => (CLS() && CLS().econ) || {};
const fed = () => { const r = econ().rate; return r == null ? 2 : +r; };
const money = n => (n < 0 ? "−" : "") + "💵" + Math.abs(Math.round(n));
const pct = x => (x >= 0 ? "+" : "") + (x * 100).toFixed(1) + "%";

/* ---------------------------------------------------------------- seeded randomness shared by the class */
function hash(s){ let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
const rnd = s => (hash(s) % 1000000) / 1000000;
const gauss = s => (rnd(s + "a") + rnd(s + "b") + rnd(s + "c") - 1.5) * 1.15;

/* ================================================================ 1. the Exchange */
const CO = [
  {k:"CAFE", e:"☕", l:["Grenadier Café","Café Grenadier"], base:12, vol:.018, div:.03, d:["Food and drinks downtown","Comida y bebidas en el centro"]},
  {k:"FISH", e:"🎣", l:["Lake Eola Fishing Co.","Pesquera Lago Eola"], base:8, vol:.025, div:.02, d:["Fishing and seafood","Pesca y mariscos"]},
  {k:"AUTO", e:"🚗", l:["Smith Motors","Smith Motors"], base:30, vol:.03, div:0, d:["Cars and trucks","Carros y camionetas"]},
  {k:"FARM", e:"🍊", l:["Orange Grove Farms","Granjas Orange Grove"], base:10, vol:.028, div:.02, d:["Oranges, strawberries and corn","Naranjas, fresas y maíz"]},
  {k:"SPACE", e:"🚀", l:["Space Coast Launch","Lanzamientos Costa Espacial"], base:40, vol:.045, div:0, d:["Rockets and satellites (risky!)","Cohetes y satélites (¡riesgoso!)"]},
  {k:"BANK", e:"🏦", l:["Town Bank","Banco del Pueblo"], base:20, vol:.012, div:.04, d:["Loans and savings (steady)","Préstamos y ahorros (estable)"]},
  {k:"NEWS", e:"📰", l:["Gazette Media","Gaceta Medios"], base:6, vol:.022, div:.01, d:["News and ads","Noticias y anuncios"]},
  {k:"AIR", e:"✈️", l:["Smithtopia Air","Smithtopia Air"], base:25, vol:.035, div:0, d:["Flights between towns","Vuelos entre pueblos"]}
];
const NEWS = {
  CAFE:[["Café's new taco special is a hit","El nuevo especial de tacos es un éxito",1],["Cheese prices spike; Café margins shrink","Sube el queso; bajan las ganancias del Café",-1]],
  FISH:[["Record catch at Lake Eola","Pesca récord en el Lago Eola",1],["Algae bloom closes the lake for a week","Algas cierran el lago una semana",-1]],
  AUTO:[["Smith Motors unveils an electric sedan","Smith Motors presenta un sedán eléctrico",1],["Recall: 2,000 cars need new brakes","Retiro: 2,000 carros necesitan frenos nuevos",-1]],
  FARM:[["Perfect weather: bumper orange crop","Clima perfecto: gran cosecha de naranjas",1],["Hurricane damages the groves","Huracán daña los naranjales",-1]],
  SPACE:[["Satellite launch succeeds!","¡Lanzamiento de satélite exitoso!",1],["Rocket test explodes on the pad","Explota un cohete en la prueba",-1]],
  BANK:[["Bank reports record profits","El banco reporta ganancias récord",1],["Rising defaults worry investors","Más impagos preocupan a inversionistas",-1]],
  NEWS:[["Gazette signs a streaming deal","La Gaceta firma un trato de streaming",1],["Advertisers pull out","Se retiran los anunciantes",-1]],
  AIR:[["Holiday travel sets records","Viajes de fiestas rompen récords",1],["Fuel prices soar","Se disparan los precios del combustible",-1]]
};
const EPOCH = Date.UTC(2026, 9, 1) / 36e5;              /* hours */
const hourNow = () => Math.floor(Date.now() / 36e5);
const seed = () => (SESS() && SESS().cid) || "town";
/* a news shock for a company on a given day, or null */
function newsOn(co, d){ const s = seed() + "|n|" + d; if (rnd(s) > 0.45) return null; const k = CO[Math.floor(rnd(s + "c") * CO.length)].k; if (k !== co.k) return null;
  const n = NEWS[k][rnd(s + "w") < 0.55 ? 0 : 1]; return {t:[n[0], n[1]], dir:n[2], mag:0.05 + rnd(s + "m") * 0.08, h:d * 24 + 13}; }
const CACHE = {};
function series(co){
  const now = hourNow(), key = co.k + seed() + "|" + (econ().mood || "") + (econ().moodAt || 0) + "|" + fed();
  let c = CACHE[key]; if (c && c.h === now) return c.p;
  const p = [], moodAt = (econ().moodAt || 0) / 36e5, moodD = econ().mood === "boom" ? 0.0012 : econ().mood === "recession" ? -0.0015 : 0;
  let lp = Math.log(co.base);
  for (let h = EPOCH; h <= now; h++) {
    const d = Math.floor(h / 24);
    let r = 0.00035 + gauss(seed() + co.k + h) * co.vol / 3 - (fed() - 2) * 0.00012 + (h >= moodAt ? moodD * (co.vol / 0.025) : 0);
    r -= (lp - Math.log(co.base)) * 0.002;               /* drifts back toward fair value over time */
    if (h % 24 === 13) { const n = newsOn(co, d); if (n) r += n.dir * n.mag; }
    lp += r; p.push(Math.exp(lp));
  }
  CACHE[key] = {h:now, p}; return p;
}
const price = co => { const s = series(co); return s[s.length - 1]; };
const change = (co, hrs) => { const s = series(co); return s[s.length - 1] / s[Math.max(0, s.length - 1 - hrs)] - 1; };
function spark(co, hrs, w, h){ const s = series(co).slice(-hrs), mn = Math.min(...s), mx = Math.max(...s), up = s[s.length - 1] >= s[0];
  const pts = s.map((v, i) => `${(i / (s.length - 1) * w).toFixed(1)},${(h - (v - mn) / Math.max(mx - mn, 1e-6) * (h - 4) - 2).toFixed(1)}`).join(" ");
  return `<svg class="esp" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${up ? "#2E8B57" : "#C8283A"}" stroke-width="2" stroke-linejoin="round"/></svg>`; }
function headlines(){ const out = [], today = Math.floor(Date.now() / 864e5);
  for (let d = today; d > today - 4; d--) CO.forEach(co => { const n = newsOn(co, d); if (n && n.h <= hourNow()) out.push({co, d, ...n}); });
  return out.slice(0, 5); }
const holdings = () => Object.entries(ec().stk).filter(([, h]) => h.n > 0).map(([k, h]) => ({co:CO.find(c => c.k === k), ...h})).filter(x => x.co);
const portfolio = () => holdings().reduce((a, h) => a + h.n * price(h.co), 0);

window.ecTrade = function(k, dir){
  const co = CO.find(c => c.k === k), p = price(co), h = ec().stk[k] || {n:0, cost:0};
  sheet(`<div class="eyebrow">${co.e} ${E(L(co.l))} · ${W2("price","precio")} 💵${p.toFixed(2)}</div><h2>${dir === "buy" ? W2("Buy shares","Comprar acciones") : W2("Sell shares","Vender acciones")}</h2>
    ${spark(co, 72, 300, 70)}<p class="muted">${E(L(co.d))} · ${co.div ? W2(`Pays ${(co.div * 100).toFixed(0)}% dividend every Friday`, `Paga ${(co.div * 100).toFixed(0)}% de dividendo cada viernes`) : W2("No dividend: you only earn if the price rises","Sin dividendo: solo ganas si sube el precio")}</p>
    <p>${W2("You own","Tienes")} <b>${h.n}</b> ${W2("shares","acciones")}${h.n ? ` · ${W2("avg cost","costo prom.")} 💵${(h.cost / h.n).toFixed(2)}` : ""} · 💵 ${S.tokens | 0} ${W2("cash","efectivo")}</p>
    <label class="cform">${W2("How many shares?","¿Cuántas acciones?")}<input id="ecN" type="number" min="1" value="1" inputmode="numeric" oninput="ecCalc('${k}','${dir}')"></label>
    <p id="ecCost" class="muted"></p><p id="ecErr" class="terr"></p>
    <button class="btn primary wide" onclick="ecGo('${k}','${dir}')">${dir === "buy" ? W2("Buy","Comprar") : W2("Sell","Vender")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
  ecCalc(k, dir);
};
const tradeAmt = (co, n, dir) => dir === "buy" ? Math.ceil(price(co) * n * 1.01) : Math.floor(price(co) * n * 0.99);
window.ecCalc = function(k, dir){ const co = CO.find(c => c.k === k), n = Math.max(0, parseInt(document.getElementById("ecN").value, 10) || 0), el = document.getElementById("ecCost");
  if (el) el.textContent = dir === "buy" ? W2(`Cost: 💵${tradeAmt(co, n, dir)} (includes a 1% broker fee)`, `Costo: 💵${tradeAmt(co, n, dir)} (incluye 1% de comisión)`) : W2(`You get: 💵${tradeAmt(co, n, dir)} (after a 1% broker fee)`, `Recibes: 💵${tradeAmt(co, n, dir)} (menos 1% de comisión)`); };
window.ecGo = function(k, dir){
  const co = CO.find(c => c.k === k), n = parseInt(document.getElementById("ecN").value, 10) || 0, err = document.getElementById("ecErr"), e = ec(), h = e.stk[k] = e.stk[k] || {n:0, cost:0};
  if (n < 1) { err.textContent = W2("Pick at least 1 share.","Elige al menos 1."); return; }
  const amt = tradeAmt(co, n, dir);
  if (dir === "buy") { if (amt > (S.tokens | 0)) { err.textContent = W2("Not enough cash.","No tienes suficiente efectivo."); return; } TAG = "invest"; T.coins(-amt); TAG = null; h.n += n; h.cost += amt; }
  else { if (n > h.n) { err.textContent = W2("You don't own that many.","No tienes tantas."); return; } const basis = h.cost * n / h.n; TAG = "invest"; T.coins(amt); TAG = null; h.n -= n; h.cost -= basis;
    e.realized = (e.realized || 0) + (amt - basis); }
  T.persist(); closeSheet(); T.toast(dir === "buy" ? W2(`📈 Bought ${n} ${co.k} for 💵${amt}.`, `📈 Compraste ${n} ${co.k} por 💵${amt}.`) : W2(`📉 Sold ${n} ${co.k} for 💵${amt}.`, `📉 Vendiste ${n} ${co.k} por 💵${amt}.`)); T.paintSub();
};
function payDividends(){
  const wk = week(), fri = new Date().getDay() >= 5 || new Date().getDay() === 0; if (!fri) return;
  T.once("div:" + wk, () => { const pay = holdings().reduce((a, h) => a + h.n * price(h.co) * (h.co.div || 0), 0); const n = Math.floor(pay);
    if (n > 0) { TAG = "invest"; T.coins(n); TAG = null; T.toast(W2(`💰 Friday dividends from your stocks: +💵${n}.`, `💰 Dividendos del viernes: +💵${n}.`)); } });
}
function paintExchange(el){
  const hs = holdings(), val = portfolio(), cost = hs.reduce((a, h) => a + h.cost, 0), mood = econ().mood;
  el.innerHTML = `<section class="panel eex"><div class="eyebrow">💹 ${W2("The Smithtopia Exchange","La Bolsa de Smithtopia")}${mood ? ` · ${mood === "boom" ? "🐂 " + W2("Boom!","¡Auge!") : "🐻 " + W2("Recession","Recesión")}` : ""} · ${W2("Fed rate","Tasa Fed")} ${fed()}%</div>
      <div class="eport"><div><small>${W2("Your stocks are worth","Tus acciones valen")}</small><b>💵${val.toFixed(0)}</b><small class="${val - cost >= 0 ? "up" : "dn"}">${W2("gain/loss","ganancia/pérdida")} ${money(val - cost)}${cost ? " (" + pct(val / cost - 1) + ")" : ""}</small></div>
        <div><small>${W2("Cash","Efectivo")}</small><b>💵${S.tokens | 0}</b><small>${W2("realized","realizado")} ${money(ec().realized || 0)}</small></div></div></section>
    <section class="panel"><div class="eyebrow">📰 ${W2("Market news","Noticias del mercado")}</div>${headlines().map(n => `<div class="enews ${n.dir > 0 ? "up" : "dn"}">${n.co.e} <b>${E(L(n.t))}</b> <small>${n.co.k} ${n.dir > 0 ? "▲" : "▼"} ${(n.mag * 100).toFixed(0)}%</small></div>`).join("") || `<p class="muted">${W2("A quiet week on the Exchange.","Semana tranquila en la Bolsa.")}</p>`}</section>
    <section class="panel"><div class="eyebrow">🏢 ${W2("Companies","Empresas")} · ${W2("prices update every hour","precios cada hora")}</div>
      ${CO.map(co => { const p = price(co), ch = change(co, 24), h = ec().stk[co.k];
        return `<div class="eco"><span class="ecoi">${co.e}</span><div class="econ"><b>${E(L(co.l))}</b> <small class="muted">${co.k}${co.div ? ` · ${W2("div","div")} ${(co.div * 100).toFixed(0)}%` : ""}</small>${h && h.n ? `<small class="eown">${W2("You own","Tienes")} ${h.n}</small>` : ""}</div>
          ${spark(co, 48, 90, 30)}<div class="ecop"><b>💵${p.toFixed(2)}</b><small class="${ch >= 0 ? "up" : "dn"}">${pct(ch)} ${W2("today","hoy")}</small></div>
          <div class="ecob"><button class="btn primary" onclick="ecTrade('${co.k}','buy')">${W2("Buy","Comprar")}</button>${h && h.n ? `<button class="btn" onclick="ecTrade('${co.k}','sell')">${W2("Sell","Vender")}</button>` : ""}</div></div>`; }).join("")}</section>
    <section class="panel"><div class="eyebrow">📚 ${W2("How the Exchange works","Cómo funciona la Bolsa")}</div><ul class="kperks">
      <li>${W2("Buy low, sell high. A stock is a tiny piece of a company.","Compra barato, vende caro. Una acción es una parte pequeña de una empresa.")}</li>
      <li>${W2("Risky stocks (🚀 ✈️ 🚗) swing more. Steady ones (🏦 ☕) pay dividends. Diversify!","Las riesgosas (🚀 ✈️ 🚗) varían más. Las estables (🏦 ☕) pagan dividendos. ¡Diversifica!")}</li>
      <li>${W2("When the Fed raises rates, stocks usually fall: saving pays more and borrowing costs more.","Cuando la Fed sube tasas, las acciones suelen bajar: ahorrar paga más y pedir prestado cuesta más.")}</li></ul></section>`;
}

/* ================================================================ 2. the lottery */
const TICKET = 2, MAXT = 5, NUMS = 20;
const drawTime = wk => { const d = new Date(wk + "T13:00:00"); d.setDate(d.getDate() + 4); return d.getTime(); };   /* Friday 1:00 PM */
const prevWeek = wk => { const d = new Date(wk + "T12:00:00"); d.setDate(d.getDate() - 7); return day(d); };
const drawn = (wk, tickets) => { const s = seed() + "|lotto|" + wk + "|" + tickets.map(t => t.nums).sort().join(","), out = []; let i = 0;
  while (out.length < 3) { const n = 1 + Math.floor(rnd(s + i++) * NUMS); if (!out.includes(n)) out.push(n); } return out.sort((a, b) => a - b); };
const matches = (nums, win) => nums.split("-").map(Number).filter(n => win.includes(n)).length;
const LOT = {};
async function lotWeek(wk){ if (LOT[wk] && (LOT[wk].at > Date.now() - 5000 || drawTime(wk) < LOT[wk].at)) return LOT[wk];
  const rows = await store().list(`${C()}/lottery`, {where:[["week","==",wk]]}).catch(() => []); LOT[wk] = {rows, at:Date.now()}; return LOT[wk]; }
async function jackpot(wk, depth){
  const w = await lotWeek(wk), sales = w.rows.length * TICKET; let pot = Math.floor(sales * 0.6);
  if ((depth || 0) < 3) { const pw = prevWeek(wk), p = await lotWeek(pw); if (p.rows.length && drawTime(pw) < Date.now()) { const win = drawn(pw, p.rows);
      if (!p.rows.some(t => matches(t.nums, win) === 3)) pot += await jackpot(pw, (depth || 0) + 1); } }
  return pot; }
let PICK = [];
window.ltPick = n => { const i = PICK.indexOf(n); if (i >= 0) PICK.splice(i, 1); else if (PICK.length < 3) PICK.push(n); T.paintSub(); };
window.ltQuick = () => { PICK = []; while (PICK.length < 3) { const n = 1 + Math.floor(Math.random() * NUMS); if (!PICK.includes(n)) PICK.push(n); } T.paintSub(); };
window.ltBuy = async function(){
  const wk = week(); if (Date.now() >= drawTime(wk)) return T.toast(W2("Ticket sales are closed until Monday.","La venta cerró hasta el lunes."));
  if (PICK.length !== 3) return T.toast(W2("Pick 3 numbers.","Elige 3 números."));
  if ((S.tokens | 0) < TICKET) return T.toast(W2("You need 2 Smithbucks.","Necesitas 2 Smithbucks."));
  const mine = (await lotWeek(wk)).rows.filter(t => t.sid === me()); if (mine.length >= MAXT) return T.toast(W2("5 tickets a week is the limit.","El límite es 5 boletos por semana."));
  const nums = PICK.slice().sort((a, b) => a - b).join("-"), n = mine.length + 1;
  try { await store().set(`${C()}/lottery/${wk}_${me()}_${n}`, {week:wk, sid:me(), uid:store().uid(), name:SESS().name, nums, at:Date.now()});
    TAG = "fun"; T.coins(-TICKET); TAG = null; T.persist(); PICK = []; delete LOT[wk]; T.toast(W2(`🎟️ Ticket ${nums}. Drawing Friday at 1:00 PM. Good luck!`, `🎟️ Boleto ${nums}. Sorteo el viernes a la 1:00 PM. ¡Suerte!`)); T.paintSub();
  } catch(e){ console.warn(e); T.toast(W2("Couldn't buy a ticket right now.","No se pudo comprar.")); }
};
async function claimLotto(){
  if (!SESS()) return; const pw = prevWeek(week());
  for (const wk of [pw, week()]) { if (Date.now() < drawTime(wk)) continue; const w = await lotWeek(wk); const mine = w.rows.filter(t => t.sid === me()); if (!mine.length) continue;
    const win = drawn(wk, w.rows), jack = w.rows.filter(t => matches(t.nums, win) === 3), pot = await jackpot(wk);
    mine.forEach(t => { const m = matches(t.nums, win);
      if (m === 3) T.once("lotto:" + t.id, () => { const n = Math.floor(pot / jack.length); TAG = "fun"; T.coins(n); TAG = null; T.toast(W2(`🎉 JACKPOT! Your ticket ${t.nums} won 💵${n}!`, `🎉 ¡PREMIO MAYOR! Tu boleto ${t.nums} ganó 💵${n}!`)); if (typeof fireConfetti === "function") fireConfetti(); });
      else if (m === 2) T.once("lotto:" + t.id, () => { TAG = "fun"; T.coins(3); TAG = null; T.toast(W2(`🎟️ Your ticket ${t.nums} matched 2 numbers: +💵3.`, `🎟️ Tu boleto ${t.nums} acertó 2 números: +💵3.`)); }); }); }
  T.persist();
}
async function paintLottery(el){
  const wk = week(), closed = Date.now() >= drawTime(wk); el.innerHTML = `<p class="muted">${W2("Loading the lottery…","Cargando la lotería…")}</p>`;
  const w = await lotWeek(wk), pot = await jackpot(wk), mine = w.rows.filter(t => t.sid === me());
  const pw = prevWeek(wk), p = await lotWeek(pw), pwin = p.rows.length && drawTime(pw) < Date.now() ? drawn(pw, p.rows) : null;
  const win = closed ? drawn(wk, w.rows) : null, dt = new Date(drawTime(wk));
  const ev = (1 / 1140) * Math.max(pot, 1) + (51 / 1140) * 3 - TICKET;
  if (T.tt !== "money" || SUBT !== "lotto") return;
  el.innerHTML = `<section class="panel elotto"><div class="eyebrow">🎟️ ${W2("Weekly lottery","Lotería semanal")}</div>
      <div class="ejack"><small>${W2("Jackpot","Premio mayor")}</small><b>💵${pot}</b><small>${w.rows.length} ${W2("tickets sold","boletos vendidos")} · ${W2("draw","sorteo")} ${dt.toLocaleDateString([], {weekday:"long"})} ${dt.toLocaleTimeString([], {hour:"numeric", minute:"2-digit"})}</small></div>
      ${win ? `<p class="edraw">${W2("This week's numbers","Números de esta semana")}: ${win.map(n => `<span class="eball">${n}</span>`).join("")}</p>` : ""}
      ${closed ? `<p class="muted">${W2("Sales are closed. New tickets on Monday.","Venta cerrada. Nuevos boletos el lunes.")}</p>` : `
      <p>${W2(`Pick 3 numbers from 1 to ${NUMS}. A ticket costs 💵${TICKET}. Match all 3 to win the jackpot; match 2 for 💵3.`, `Elige 3 números del 1 al ${NUMS}. Cada boleto cuesta 💵${TICKET}. Acierta los 3 para el premio mayor; 2 para 💵3.`)}</p>
      <div class="egrid">${Array.from({length:NUMS}, (_, i) => i + 1).map(n => `<button class="${PICK.includes(n) ? "on" : ""}" onclick="ltPick(${n})">${n}</button>`).join("")}</div>
      <div class="eprow"><button class="btn" onclick="ltQuick()">🎲 ${W2("Quick pick","Al azar")}</button><button class="btn primary" ${PICK.length === 3 && mine.length < MAXT ? "" : "disabled"} onclick="ltBuy()">🎟️ ${W2("Buy ticket","Comprar boleto")} (💵${TICKET})</button></div>`}
      <p class="muted" style="font-size:13px">${W2("Your tickets this week","Tus boletos esta semana")} (${mine.length}/${MAXT}): ${mine.map(t => `<span class="etix ${win ? "m" + matches(t.nums, win) : ""}">${t.nums}</span>`).join(" ") || "—"}</p></section>
    <section class="panel"><div class="eyebrow">🧮 ${W2("The math","Las matemáticas")}</div><ul class="kperks">
      <li>${W2("Odds of the jackpot: 1 in 1,140. Odds of matching 2: about 1 in 22.","Probabilidad del premio mayor: 1 en 1,140. De acertar 2: cerca de 1 en 22.")}</li>
      <li>${W2(`Expected value of one ticket right now: ${money(ev)}. ${ev < 0 ? "On average you lose money on every ticket." : "The rollover makes this week unusual!"}`, `Valor esperado de un boleto ahora: ${money(ev)}. ${ev < 0 ? "En promedio pierdes dinero con cada boleto." : "¡El acumulado hace esta semana especial!"}`)}</li>
      <li>${W2("Only 60% of ticket money comes back as prizes. Economists call lotteries a regressive tax: lower-income players spend a bigger share of their money on them.","Solo el 60% vuelve en premios. Los economistas llaman a la lotería un impuesto regresivo: quien gana menos gasta una parte mayor de su dinero.")}</li></ul></section>
    ${pwin ? `<section class="panel"><div class="eyebrow">📜 ${W2("Last week","La semana pasada")}</div><p>${pwin.map(n => `<span class="eball">${n}</span>`).join("")} · ${(() => { const jw = p.rows.filter(t => matches(t.nums, pwin) === 3); return jw.length ? W2(`Winner${jw.length > 1 ? "s" : ""}: ${E(jw.map(t => t.name).join(", "))}`, `Ganador(es): ${E(jw.map(t => t.name).join(", "))}`) : W2("No jackpot winner: it rolled over!","Sin ganador: ¡se acumuló!"); })()}</p></section>` : ""}`;
}

/* ================================================================ 3. bills and budget */
const UTIL = {cottage:1, brick:2, farmhouse:2, beach:2, modern:3, cabin:2, treehouse:2, penthouse:4, mansion:5};
function billsFor(){
  const t = T.town(), style = (t.house && t.house.style) || "cottage", items = [];
  if (econ().bills === false) return items;
  items.push({k:"util", e:"💡", l:[`Utilities (${style})`, `Servicios (${style})`], amt:UTIL[style] || 1});
  items.push({k:"phone", e:"📱", l:["Phone","Teléfono"], amt:1});
  items.push({k:"food", e:"🛒", l:["Groceries","Comida"], amt:2});
  const pets = window.PETS ? window.PETS.myPets().length : 0; if (pets) items.push({k:"pets", e:"🐾", l:[`Pet care (${pets})`, `Mascotas (${pets})`], amt:pets});
  const m = ec().mort; if (m && m.left > 0) items.push({k:"mort", e:"🏠", l:["Mortgage payment","Pago de hipoteca"], amt:Math.min(m.pay, m.left)});
  return items;
}
function rollBills(){
  if (!SESS()) return; const e = ec(), wk = week(); if (e.bills && e.bills.wk === wk) return;
  let late = 0, missedMort = false;
  if (e.bills) e.bills.items.filter(b => !b.paid).forEach(b => { late += b.amt + 2; if (b.k === "mort") missedMort = true; });
  const items = billsFor();
  late = Math.min(late, 30);
  if (late) { items.unshift({k:"late", e:"⚠️", l:["Overdue bills + late fees","Facturas vencidas + recargos"], amt:late});
    const b = civ().bank; b.credit = Math.max(300, (b.credit || 650) - 15);
    T.toast(W2(`⚠️ You missed last week's bills. Late fees added and your credit score dropped 15 points.`, `⚠️ No pagaste las facturas. Se sumaron recargos y tu crédito bajó 15 puntos.`)); }
  if (missedMort && e.mort) { e.mort.missed = (e.mort.missed | 0) + 1; if (e.mort.missed >= 3) foreclose(); }
  e.bills = {wk, items:items.map(b => ({...b, paid:false}))};
  if (e.bills.items.length && !late) T.toast(W2(`📬 This week's bills are here: 💵${e.bills.items.reduce((a, b) => a + b.amt, 0)}. Money → Bills.`, `📬 Llegaron las facturas: 💵${e.bills.items.reduce((a, b) => a + b.amt, 0)}. Dinero → Facturas.`));
  if (e.bud.autopay) payAll(true); T.persist();
}
function payBill(i, quiet){
  const e = ec(), b = e.bills && e.bills.items[i]; if (!b || b.paid) return false;
  if ((S.tokens | 0) < b.amt) { if (!quiet) T.toast(W2(`You need 💵${b.amt} to pay ${L(b.l)}.`, `Necesitas 💵${b.amt}.`)); return false; }
  TAG = "bills"; T.coins(-b.amt); TAG = null; b.paid = true;
  if (b.k === "mort" && e.mort) { e.mort.left = Math.max(0, e.mort.left - b.amt); e.mort.paidN = (e.mort.paidN | 0) + 1; e.mort.missed = 0;
    if (e.mort.left <= 0) { T.toast(W2("🏠 Mortgage paid off! The house is all yours.","🏠 ¡Hipoteca pagada! La casa es toda tuya.")); const b2 = civ().bank; b2.credit = Math.min(850, (b2.credit || 650) + 30); e.mort = null; } }
  if (e.bills.items.every(x => x.paid)) { const b2 = civ().bank; T.once("billsok:" + e.bills.wk, () => { b2.credit = Math.min(850, (b2.credit || 650) + 5); }); }
  return true;
}
function payAll(quiet){ const e = ec(); if (!e.bills) return; let n = 0; e.bills.items.forEach((_, i) => { if (payBill(i, true)) n++; }); T.persist();
  if (!quiet) T.toast(n ? W2(`✅ Paid ${n} bill${n > 1 ? "s" : ""}. Paying on time raises your credit score.`, `✅ Pagaste ${n} factura(s).`) : W2("Nothing to pay, or not enough cash.","Nada que pagar o no alcanza."));
  if (!quiet) T.paintSub(); }
window.blPay = i => { if (payBill(i)) { T.persist(); T.paintSub(); } };
window.blPayAll = () => payAll(false);
window.blAuto = () => { const b = ec().bud; b.autopay = !b.autopay; T.persist(); T.paintSub(); };
window.blGoal = () => { const v = parseInt(prompt(W2("Savings goal in Smithbucks?","¿Meta de ahorro en Smithbucks?"), String(ec().bud.goal || 50)), 10); if (v > 0) { ec().bud.goal = Math.min(10000, v); T.persist(); T.paintSub(); } };
window.blSave = p => { ec().bud.save = p; T.persist(); T.paintSub(); };
/* money in and out, by week (fed by town.js coins()) */
let TAG = null;
window.TOWN_MONEY = function(n){ if (!SESS() || !n) return; const e = ec(), wk = week(), f = e.flow[wk] = e.flow[wk] || {in:0, bills:0, fun:0, invest:0, other:0, saved:0};
  if (TAG === "bank" || window.TOWN_MONEY_TAG === "bank") return;
  if (n > 0 && !TAG) { f.in += n; const p = e.bud.save | 0;
    if (p > 0 && !TAG) { const amt = Math.floor(n * p / 100); if (amt > 0 && (S.tokens | 0) >= amt) { TAG = "bank"; S.tokens -= amt; civ().bank.bal = (civ().bank.bal | 0) + amt; f.saved += amt; TAG = null; } } }
  else if (n < 0) f[TAG && f[TAG] != null ? TAG : "other"] += -n;
  else if (n > 0 && TAG === "invest") f.invest -= n;
  Object.keys(e.flow).sort().slice(0, -6).forEach(k => delete e.flow[k]); };
function paintBills(el){
  rollBills(); const e = ec(), b = e.bills || {items:[]}, due = b.items.filter(x => !x.paid).reduce((a, x) => a + x.amt, 0), f = e.flow[week()] || {in:0, bills:0, fun:0, invest:0, other:0, saved:0};
  const inc = Math.max(f.in, 1), bank = civ().bank, goal = e.bud.goal || 50, credit = bank.credit || 650;
  const bar = (v, max, c) => `<span class="ebar"><i style="width:${Math.min(100, v / Math.max(max, 1) * 100)}%;background:${c}"></i></span>`;
  el.innerHTML = `<section class="panel"><div class="eyebrow">📬 ${W2("This week's bills","Facturas de esta semana")} · ${W2("due Sunday","vencen el domingo")}</div>
      ${b.items.length ? b.items.map((x, i) => `<div class="ebill ${x.paid ? "paid" : ""}"><span>${x.e} ${E(L(x.l))}</span><b>💵${x.amt}</b>${x.paid ? `<small>✅ ${W2("paid","pagada")}</small>` : `<button class="btn" onclick="blPay(${i})">${W2("Pay","Pagar")}</button>`}</div>`).join("")
        : `<p class="muted">${econ().bills === false ? W2("Coach Smith turned bills off for this class.","Coach Smith desactivó las facturas.") : W2("No bills this week.","Sin facturas esta semana.")}</p>`}
      ${due ? `<div class="eprow"><button class="btn primary" onclick="blPayAll()">${W2(`Pay all (💵${due})`, `Pagar todo (💵${due})`)}</button></div>` : ""}
      <label class="etog"><input type="checkbox" ${e.bud.autopay ? "checked" : ""} onchange="blAuto()"> ${W2("Autopay every Monday (if you have the cash)","Pago automático cada lunes (si tienes efectivo)")}</label>
      <p class="muted" style="font-size:13px">💳 ${W2("Credit score","Puntaje de crédito")} <b>${credit}</b> · ${W2("Pay on time: +5 a week. Miss a week: −15 and a late fee.","A tiempo: +5 por semana. Si no pagas: −15 y recargo.")}</p></section>
    <section class="panel"><div class="eyebrow">📊 ${W2("Budget: this week","Presupuesto: esta semana")}</div>
      <div class="ebud"><div><small>${W2("Money in","Ingresos")}</small><b>💵${f.in}</b></div><div><small>${W2("Bills (needs)","Facturas (necesidades)")}</small><b>💵${f.bills}</b></div><div><small>${W2("Fun and shopping (wants)","Diversión y compras (deseos)")}</small><b>💵${f.fun + f.other}</b></div><div><small>${W2("Saved","Ahorrado")}</small><b>💵${f.saved}</b></div></div>
      <p style="margin:10px 0 4px"><b>${W2("The 50/30/20 rule","La regla 50/30/20")}</b> <small class="muted">${W2("of what you earn","de lo que ganas")}</small></p>
      <div class="e503"><span>${W2("Needs","Necesidades")} ≤ 50%</span>${bar(f.bills, inc * 0.5, "#2F7FD8")}<small>${Math.round(f.bills / inc * 100)}%</small></div>
      <div class="e503"><span>${W2("Wants","Deseos")} ≤ 30%</span>${bar(f.fun + f.other, inc * 0.3, "#E86A2C")}<small>${Math.round((f.fun + f.other) / inc * 100)}%</small></div>
      <div class="e503"><span>${W2("Savings","Ahorro")} ≥ 20%</span>${bar(f.saved, inc * 0.2, "#3BB273")}<small>${Math.round(f.saved / inc * 100)}%</small></div>
      <p style="margin:12px 0 4px"><b>🎯 ${W2("Savings goal","Meta de ahorro")}</b> 💵${bank.bal | 0} / 💵${goal} <button class="btn ghost" onclick="blGoal()">${W2("Change","Cambiar")}</button></p>${bar(bank.bal | 0, goal, "#3BB273")}
      <p style="margin:10px 0 4px"><b>🐷 ${W2("Auto-save","Ahorro automático")}</b>: ${W2("move this much of every paycheck into the bank","pasar esta parte de cada pago al banco")}</p>
      <div class="gwager">${[0, 10, 20, 30].map(p => `<button class="${(e.bud.save | 0) === p ? "on" : ""}" onclick="blSave(${p})">${p}%</button>`).join("")}</div></section>`;
}

/* ================================================================ 4. mortgages */
const TERM = 8;
const creditSpread = c => c >= 750 ? 1 : c >= 680 ? 2 : c >= 600 ? 4 : 6;
const mRate = () => fed() + creditSpread(civ().bank.credit || 650);               /* % per 8-week loan */
const payment = (P, ratePct) => { const i = ratePct / 100 / TERM; return i ? Math.ceil(P * i / (1 - Math.pow(1 + i, -TERM))) : Math.ceil(P / TERM); };
function foreclose(){
  const e = ec(), m = e.mort; if (!m) return; const t = T.town(); delete t.owned[m.house]; if (t.house && t.house.style === m.house) t.house.style = "cottage";
  const b = civ().bank; b.credit = Math.max(300, (b.credit || 650) - 80); e.mort = null; T.persist(); T.publishNow && T.publishNow();
  T.toast(W2("🏚️ Foreclosure: after 3 missed payments the bank took the house back. Your credit dropped 80 points.","🏚️ Embargo: tras 3 pagos sin hacer, el banco recuperó la casa. Tu crédito bajó 80 puntos."));
}
window.mgOffer = function(id){
  const hs = (window.TOWN_HOUSES || []).find(h => h.id === id); if (!hs) return; if (ec().mort) return T.toast(W2("Pay off your current mortgage first.","Paga primero tu hipoteca actual."));
  const priceH = Math.round(hs.p * T.shopMult()), down = Math.ceil(priceH * 0.2), P = priceH - down, r = mRate(), pay = payment(P, r), total = pay * TERM;
  let bal = P, rows = ""; const i = r / 100 / TERM;
  for (let w = 1; w <= TERM; w++) { const int = Math.round(bal * i * 100) / 100, prin = Math.min(bal, pay - int); bal = Math.max(0, bal - prin); rows += `<tr><td>${w}</td><td>💵${pay}</td><td>${int.toFixed(1)}</td><td>${prin.toFixed(1)}</td><td>${bal.toFixed(1)}</td></tr>`; }
  sheet(`<div class="eyebrow">🏦 ${W2("Mortgage offer","Oferta de hipoteca")}</div><h2>${E(L2n(hs.name))}</h2>
    <div class="ebud"><div><small>${W2("Price","Precio")}</small><b>💵${priceH}</b></div><div><small>${W2("Down (20%)","Enganche (20%)")}</small><b>💵${down}</b></div><div><small>${W2("Loan","Préstamo")}</small><b>💵${P}</b></div><div><small>${W2("Rate","Tasa")}</small><b>${r}%</b></div></div>
    <p class="muted">${W2(`${TERM} weekly payments of 💵${pay} (total 💵${total}, interest 💵${total - P}). Your rate = Fed rate ${fed()}% + ${creditSpread(civ().bank.credit || 650)}% for a ${civ().bank.credit || 650} credit score.`, `${TERM} pagos semanales de 💵${pay} (total 💵${total}, interés 💵${total - P}). Tu tasa = Fed ${fed()}% + ${creditSpread(civ().bank.credit || 650)}% por tu crédito.`)}</p>
    <details><summary>${W2("Amortization table","Tabla de amortización")}</summary><table class="eamort"><tr><th>${W2("Week","Sem.")}</th><th>${W2("Pay","Pago")}</th><th>${W2("Interest","Interés")}</th><th>${W2("Principal","Capital")}</th><th>${W2("Owed","Debe")}</th></tr>${rows}</table></details>
    <p class="tnote">⚠️ ${W2("Payments show up in your weekly bills. Miss 3 and the bank forecloses: you lose the house and 80 credit points.","Los pagos llegan en tus facturas semanales. Si fallas 3, el banco embarga: pierdes la casa y 80 puntos de crédito.")}</p>
    <button class="btn primary wide" ${(S.tokens | 0) >= down ? "" : "disabled"} onclick="mgTake('${id}')">${(S.tokens | 0) >= down ? W2(`Sign: pay 💵${down} down`, `Firmar: pagar 💵${down}`) : W2(`You need 💵${down} for the down payment`, `Necesitas 💵${down} de enganche`)}</button>
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Not now","Ahora no")}</button>`);
};
const L2n = n => S.lang === "es" ? n.es : n.en;
window.mgTake = function(id){
  const hs = (window.TOWN_HOUSES || []).find(h => h.id === id); if (!hs || ec().mort) return;
  const priceH = Math.round(hs.p * T.shopMult()), down = Math.ceil(priceH * 0.2), P = priceH - down, r = mRate(), pay = payment(P, r);
  if ((S.tokens | 0) < down) return; TAG = "bills"; T.coins(-down); TAG = null;
  const t = T.town(); t.owned[id] = 1; t.house.style = id;
  ec().mort = {house:id, P, rate:r, pay, left:pay * TERM, paidN:0, missed:0, at:Date.now()};
  const e = ec(); if (e.bills && e.bills.wk === week()) e.bills.items.push({k:"mort", e:"🏠", l:["Mortgage payment","Pago de hipoteca"], amt:pay, paid:false});
  T.persist(); T.publishNow && T.publishNow(); closeSheet(); if (typeof fireConfetti === "function") fireConfetti();
  T.toast(W2(`🏠 Welcome home! You bought the ${hs.name.en} with a mortgage. First payment is in this week's bills.`, `🏠 ¡Bienvenido! Compraste la casa con hipoteca. El primer pago está en tus facturas.`)); T.paintSub();
};
window.mgPayOff = function(){ const m = ec().mort; if (!m) return; if ((S.tokens | 0) < m.left) return T.toast(W2(`You need 💵${m.left} to pay it off.`, `Necesitas 💵${m.left}.`));
  TAG = "bills"; T.coins(-m.left); TAG = null; ec().mort = null; const b = civ().bank; b.credit = Math.min(850, (b.credit || 650) + 30); T.persist(); T.toast(W2("🏠 Paid off early! +30 credit.","🏠 ¡Pagada antes! +30 de crédito.")); T.paintSub(); };
function paintMortgage(el){
  const t = T.town(), m = ec().mort, credit = civ().bank.credit || 650, houses = window.TOWN_HOUSES || [];
  el.innerHTML = `<section class="panel"><div class="eyebrow">🏦 ${W2("Mortgage office","Oficina de hipotecas")}</div>
      <p style="margin:0">${W2(`Buy a house with 20% down and borrow the rest. Your rate today: ${mRate()}% (Fed ${fed()}% + ${creditSpread(credit)}% for credit ${credit}).`, `Compra una casa con 20% de enganche. Tu tasa hoy: ${mRate()}% (Fed ${fed()}% + ${creditSpread(credit)}% por crédito ${credit}).`)}</p>
      ${m ? `<div class="emort"><b>🏠 ${W2("Your mortgage","Tu hipoteca")}: ${E(m.house)}</b><span>${W2("Still owed","Debes")} 💵${m.left} · ${W2("payment","pago")} 💵${m.pay}/${W2("week","sem")} · ${W2("payments made","pagos")} ${m.paidN | 0}/${TERM}${m.missed ? ` · ⚠️ ${W2("missed","sin pagar")} ${m.missed}/3` : ""}</span>
        <button class="btn" onclick="mgPayOff()">${W2(`Pay it all off (💵${m.left})`, `Pagar todo (💵${m.left})`)}</button></div>` : ""}</section>
    <section class="panel"><div class="eyebrow">🏡 ${W2("Houses for sale","Casas en venta")}</div>${houses.filter(h => h.p > 0).map(h => { const own = t.owned[h.id], pr = Math.round(h.p * T.shopMult());
      return `<div class="ebill"><span>${E(L2n(h.name))}</span><b>💵${pr}</b>${own ? `<small>✅ ${W2("yours","tuya")}</small>` : `<button class="btn" ${m ? "disabled" : ""} onclick="mgOffer('${h.id}')">${W2(`Mortgage (💵${Math.ceil(pr * 0.2)} down)`, `Hipoteca (💵${Math.ceil(pr * 0.2)})`)}</button>`}</div>`; }).join("")}</section>
    <section class="panel"><div class="eyebrow">📚 ${W2("Why credit matters","Por qué importa el crédito")}</div><ul class="kperks">
      <li>${W2("A higher credit score means a lower rate, so the same house costs less in the end.","Con mejor crédito la tasa es más baja y la misma casa te cuesta menos.")}</li>
      <li>${W2("When the Fed raises rates, every new mortgage gets more expensive. Ask Coach Smith what the Fed is doing!","Cuando la Fed sube tasas, toda hipoteca nueva cuesta más.")}</li></ul></section>`;
}

/* ================================================================ the Money tab */
let SUBT = "stocks";
window.ecSub = k => { SUBT = k; window._tfresh = Date.now(); T.paintSub(); };
EXT.tabs.push({key:"money", icon:"💹", label:() => W2("Money","Dinero"), paint:el => {
  const nav = [["stocks","💹",W2("Exchange","Bolsa")],["lotto","🎟️",W2("Lottery","Lotería")],["bills","📬",W2("Bills & budget","Facturas y presupuesto")],["mort","🏦",W2("Mortgage","Hipoteca")]];
  const due = (ec().bills || {items:[]}).items.filter(b => !b.paid).length;
  const wrap = document.createElement("div"); wrap.className = "eview";
  el.innerHTML = `<nav class="tchips">${nav.map(([k, ic, l]) => `<button class="${SUBT === k ? "on" : ""}" onclick="ecSub('${k}')">${ic} ${l}${k === "bills" && due ? ` <b class="ebadge">${due}</b>` : ""}</button>`).join("")}</nav>`;
  el.appendChild(wrap);
  ({stocks:paintExchange, lotto:paintLottery, bills:paintBills, mort:paintMortgage}[SUBT] || paintExchange)(wrap);
}});
EXT.banner.push(() => { if (!SESS() || T.tt === "money") return ""; const e = ec(), due = e.bills && e.bills.wk === week() ? e.bills.items.filter(b => !b.paid) : [];
  return due.length ? `<section class="panel jban"><b>📬 ${W2(`${due.length} bill${due.length > 1 ? "s" : ""} due this week (💵${due.reduce((a, b) => a + b.amt, 0)})`, `${due.length} factura(s) por pagar (💵${due.reduce((a, b) => a + b.amt, 0)})`)}</b><button class="btn primary" onclick="townTab('money');ecSub('bills')">${W2("Pay","Pagar")}</button></section>` : ""; });
EXT.onSession.push(() => setTimeout(() => { try { rollBills(); payDividends(); claimLotto(); } catch(e){ console.warn("economy", e); } }, 1500));
setInterval(() => { if (SESS()) { try { payDividends(); claimLotto(); } catch(e){} } }, 5 * 60e3);
/* teacher levers */
window.ecMood = m => { const c = CLS() || {}; T.adminSet({econ:{...(c.econ || {}), mood:m, moodAt:Date.now()}}); };
window.ecBills = on => { const c = CLS() || {}; T.adminSet({econ:{...(c.econ || {}), bills:on}}); };
EXT.adminPanels.push({html: c => { const e = c.econ || {};
  return `<section class="panel tadm"><div class="eyebrow">💹 ${W2("Economy: Exchange, lottery, bills","Economía: bolsa, lotería, facturas")}</div>
    <p class="muted" style="font-size:13px">${W2("Move the stock market for a lesson. The Fed rate is set in Economy levers above and also changes mortgage rates.","Mueve la bolsa para una lección. La tasa Fed también cambia las hipotecas.")}</p>
    <div class="eprow"><button class="btn ${e.mood === "boom" ? "primary" : ""}" onclick="ecMood('boom')">🐂 ${W2("Boom","Auge")}</button><button class="btn ${e.mood === "recession" ? "primary" : ""}" onclick="ecMood('recession')">🐻 ${W2("Recession","Recesión")}</button><button class="btn ${!e.mood ? "primary" : ""}" onclick="ecMood(null)">${W2("Normal","Normal")}</button></div>
    <label class="etog"><input type="checkbox" ${e.bills === false ? "" : "checked"} onchange="ecBills(this.checked)"> ${W2("Weekly bills are on for this class","Facturas semanales activas")}</label></section>`; }, after:() => {}});
window.ECON = {CO, price, series, change, holdings, portfolio, drawn, matches, jackpot, billsFor, rollBills, payment, mRate, ec, newsOn};
})();
