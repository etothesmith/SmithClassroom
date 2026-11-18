/* =============================================================================
   GRENADIER TOWN — Today's to-do and the living plaza (town/today.js)
   1. Every time a student signs in, a to-do card lists today's class work
      (practice questions, study XP, the next assignment due, the unit in
      progress) and town work (daily jobs, their career shift, the mayor's
      desk). Finishing every daily job pays a bonus. The same list is on
      Campus and at the top of the Town.
   2. The plaza follows the clock and the weather: morning light, golden
      afternoons, dusk, night with street lamps, clouds and Orlando's
      afternoon thunderstorms.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T || !T.CIV) return;
const {EXT} = T, V = T.CIV, {civ, sheet, closeSheet, E, W2, SESS, day} = V;
const TODO_BONUS = 3;
const CIV = () => window.CIVIC;

function items(){
  const out = [], C = CIV(); if (!C) return out;
  C.rollJobs(); const j = civ().jobs;
  j.picks.forEach(k => { const J = C.JOBS[k]; if (!J) return;
    const prog = k === "answer10" ? ` (${Math.min(10, V.answeredToday())}/10)` : /^study/.test(k) ? ` (${Math.max(0, V.myXp() - (j.xp0 || V.myXp()))} XP)` : "";
    out.push({k, e:J.e, learn:!!J.learn, t:W2(J.en, J.es) + prog, done:C.jobDone(k), paid:!!j.paid[k],
      go:k === "answer10" || /^study/.test(k) ? "todoStudy()" : null, act:`civCollect('${k}');todoRepaint()`}); });
  const W = window.WORLD_TODO;
  if (W) {
    const due = W.dueList(), a = due[0];
    if (a) out.push({k:"assign", e:a.icon || "📌", learn:true, t:W2(`Assignment: ${a.title}`, `Tarea: ${a.title}`), sub:W2("Earn the certificate for +20 Smithbucks","Gana el certificado: +20 Smithbucks"),
      done:false, go:`todoAssign('${a.tab}')`, more:due.length > 1 ? due.length - 1 : 0});
    const u = W.lastStudied();
    if (u) out.push({k:"unit", e:"📖", learn:true, t:W2(`Keep going: ${L2(u.title).replace(/^.*?·\s*/, "")}`, `Sigue: ${L2(u.title).replace(/^.*?·\s*/, "")}`),
      sub:W2("Finish the unit challenge for a certificate (+15)","Termina el reto de la unidad para un certificado (+15)"), done:false, go:`todoUnit('${u.id}')`});
  }
  const R = window.CAREERS;
  if (R && SESS()) { const job = R.myJob();
    const open = Object.keys(R.CAREERS).filter(k => R.openSeats(k));
    if (!job && open.length) out.push({k:"hire", e:"📢", t:W2(`Now hiring: ${open.length} town job${open.length > 1 ? "s" : ""} open`, `Se busca personal: ${open.length} trabajo(s) disponible(s)`),
      sub:open.slice(0, 4).map(k => R.CAREERS[k].e + " " + W2(R.CAREERS[k].title[0], R.CAREERS[k].title[1])).join(" · "), done:false, opt:true, go:"todoTown(null)"});
    if (job) { const d = R.duty(); out.push({k:"shift", e:R.CAREERS[job].e, t:W2(`Your shift: ${R.CAREERS[job].duty.l[0]}`, `Tu turno: ${R.CAREERS[job].duty.l[1]}`),
      done:d.paid, paid:d.paid, go:`todoTown('${job}')`}); } }
  return out;
}
const L2 = o => T.L2(o);
const count = list => list.filter(i => i.done || i.paid).length;
const need = list => list.filter(i => !i.opt);
function bonus(){
  const C = CIV(); if (!C || !SESS()) return; const j = civ().jobs;
  if (j.picks.length && j.picks.every(k => j.paid[k])) T.once("todo:" + day(), () => { T.coins(TODO_BONUS); T.persist();
    T.toast(W2(`✅ All daily jobs done! Bonus: +${TODO_BONUS} Smithbucks.`, `✅ ¡Todos los trabajos del día! Bono: +${TODO_BONUS} Smithbucks.`)); if (typeof fireConfetti === "function") fireConfetti(); });
}
function listHtml(list){
  return `<div class="kto">${list.map(i => `<div class="kti ${i.done || i.paid ? "done" : ""}"><span>${i.done || i.paid ? "✅" : i.e}</span>
    <div><b>${E(i.t)}</b>${i.sub ? `<small>${E(i.sub)}${i.more ? " · " + W2(`${i.more} more due`, `${i.more} más pendientes`) : ""}</small>` : ""}${i.learn ? `<i class="klearn">${W2("class work","tarea de clase")}</i>` : ""}</div>
    ${i.paid ? "" : i.done && i.act ? `<button class="btn primary" onclick="${i.act}">${W2("Collect","Cobrar")}</button>` : i.go ? `<button class="btn" onclick="${i.go}">${W2("Go","Ir")} →</button>` : ""}</div>`).join("")}</div>`;
}
function card(full){
  const all = items(), list = need(all), n = count(list);
  return `<div class="eyebrow">📋 ${W2("Today's to-do","Pendientes de hoy")} · ${new Date().toLocaleDateString(S.lang === "es" ? "es" : "en", {weekday:"long", month:"short", day:"numeric"})}</div>
    <h2 style="margin:2px 0 4px">${n >= list.length && list.length ? W2("All done for today! 🎉","¡Todo listo por hoy! 🎉") : W2(`${list.length - n} thing${list.length - n === 1 ? "" : "s"} to do`, `${list.length - n} pendiente(s)`)}</h2>
    ${full ? `<p class="muted" style="margin:0 0 6px">${W2(`Class work comes first. Finish all three daily jobs for a +${TODO_BONUS} Smithbucks bonus.`, `Primero la tarea de clase. Termina los tres trabajos del día y gana +${TODO_BONUS} Smithbucks extra.`)}</p>` : ""}
    ${listHtml(all)}`;
}
window.todoOpen = function(){ sheet(card(true) + `<button class="btn ghost wide" onclick="townCloseCard()">${W2("Got it","Entendido")}</button>`); };
window.todoRepaint = function(){ bonus(); const box = document.getElementById("certAsk"); if (box && !box.classList.contains("hidden") && box.querySelector(".kto")) todoOpen(); };
window.todoStudy = function(){ closeSheet(); const W = window.WORLD_TODO, u = W && W.lastStudied();
  if (u && typeof viewTopics === "function") { go("classes"); setTimeout(() => viewTopics(u.id), 50); } else go("classes"); };
window.todoUnit = function(id){ closeSheet(); go("classes"); setTimeout(() => { if (typeof viewTopics === "function") viewTopics(id); }, 50); };
window.todoAssign = function(tab){ closeSheet(); TAB = tab; render(); window.scrollTo(0, 0); };
window.todoTown = function(job){ closeSheet(); go("town"); setTimeout(() => window.carGo && carGo(job), 350); };

/* shown on every sign-in (each time the hub opens with a Town account, and right after joining) */
EXT.onSession.push(() => { setTimeout(() => { if (!SESS() || T.CIV.proj) return; bonus(); todoOpen(); }, 1800); });
setInterval(bonus, 20000);
/* in the Town: a strip above the tabs */
EXT.banner.push(() => { if (!SESS()) return ""; const list = need(items()), n = count(list);
  return `<section class="panel ktodo" onclick="todoOpen()" role="button"><b>📋 ${W2("Today's to-do","Pendientes de hoy")}</b>
    <span class="kdots">${list.map(i => `<i class="${i.done || i.paid ? "on" : ""}" title="${E(i.t)}">${i.done || i.paid ? "✓" : i.e}</i>`).join("")}</span>
    <small>${n}/${list.length}</small><span class="btn">${W2("Open","Abrir")}</span></section>`; });
/* on Campus: the same list under the account card */
const _vc = window.viewCampus;
if (typeof _vc === "function") window.viewCampus = function(){
  _vc.apply(this, arguments);
  if (!SESS()) return; const v = document.getElementById("view"); if (!v || document.getElementById("todoCampus")) return;
  const d = document.createElement("section"); d.id = "todoCampus"; d.className = "panel"; d.innerHTML = card(false);
  const sign = document.getElementById("townSign"); if (sign && sign.nextSibling) v.insertBefore(d, sign.nextSibling); else v.insertBefore(d, v.firstChild);
};

/* ================================================================ the living plaza: time of day and weather */
const SKY = () => { const h = new Date().getHours() + new Date().getMinutes() / 60;
  if (h < 6 || h >= 20.5) return {k:"night", c:"rgba(18,22,60,.48)"};
  if (h < 8) return {k:"dawn", c:"rgba(255,170,90,.14)"};
  if (h < 16.5) return {k:"day", c:null};
  if (h < 18.5) return {k:"golden", c:"rgba(255,180,60,.13)"};
  return {k:"dusk", c:"rgba(120,60,140,.28)"}; };
function weather(){
  const d = day(), h = V.hashN(d + ":wx") % 100, hr = new Date().getHours();
  if (h < 18 && hr >= 13) return "storm";            /* Florida afternoon thunderstorm */
  if (h < 30) return "rain";
  if (h < 55) return "cloudy";
  return "sunny";
}
const WX = {sunny:["☀️","Sunny","Soleado"], cloudy:["⛅","Cloudy","Nublado"], rain:["🌧️","Rain showers","Lluvia"], storm:["⛈️","Afternoon thunderstorm","Tormenta de la tarde"]};
const DROPS = Array.from({length:90}, (_, i) => ({x:(i * 97) % 960, y:(i * 53) % 540, s:6 + (i % 5)}));
const LAMPS = [[300,560],[520,600],[760,560],[940,520],[250,400]];
let flash = 0;
EXT.plazaFront.push(cx => {
  const sky = SKY(), wx = weather(), t = performance.now();
  if (wx === "cloudy" || wx === "rain" || wx === "storm") { cx.fillStyle = wx === "cloudy" ? "rgba(120,130,150,.10)" : "rgba(70,80,100,.22)"; cx.fillRect(0, 0, 960, 540); }
  if (sky.c) { cx.fillStyle = sky.c; cx.fillRect(0, 0, 960, 540); }
  if (sky.k === "night" || sky.k === "dusk") LAMPS.forEach(([x, y]) => { const g = cx.createRadialGradient(x, y - 60, 4, x, y - 60, 90);
    g.addColorStop(0, "rgba(255,220,120,.55)"); g.addColorStop(1, "rgba(255,220,120,0)"); cx.fillStyle = g; cx.fillRect(x - 90, y - 150, 180, 180); });
  if (wx === "rain" || wx === "storm") { cx.strokeStyle = "rgba(220,235,255,.55)"; cx.lineWidth = 2; cx.beginPath();
    DROPS.forEach(p => { const y = (p.y + t * 0.5 * (p.s / 6)) % 560 - 20, x = (p.x + y * 0.15) % 960; cx.moveTo(x, y); cx.lineTo(x + 3, y + p.s * 2); }); cx.stroke();
    if (wx === "storm") { if (Math.random() < 0.002) flash = 1; if (flash > 0) { cx.fillStyle = `rgba(255,255,255,${flash * 0.5})`; cx.fillRect(0, 0, 960, 540); flash -= 0.06; } } }
  const w = WX[wx]; cx.font = "800 15px 'Nunito', sans-serif"; const label = `${w[0]} ${S.lang === "es" ? w[2] : w[1]} · Orlando`;
  const tw = cx.measureText(label).width + 20; cx.fillStyle = "rgba(29,27,46,.78)"; T.rr(cx, 950 - tw, 12, tw, 28, 14); cx.fill();
  cx.fillStyle = "#fff"; cx.textAlign = "center"; cx.fillText(label, 950 - tw / 2, 31);
});
window.TODAY = {items, weather, SKY};
})();
