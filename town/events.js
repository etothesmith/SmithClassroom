/* =============================================================================
   SMITHTOPIA — town events, the live news ticker and the look of the day (town/events.js, 3.5)
   1. Event of the day: every school day the class gets one town event that
      changes how things work (Farmers' Market Day: crops sell for +30%;
      Free Transit Day: no bus fares; Mall Madness: −25% at the mall; Harvest
      Moon: animals produce double…). Same event for the whole class; weekends
      are calm. Other modules read window.TOWN_FX(key).
   2. Smithtopia Live: a scrolling ticker on the map with what's happening in
      class right now (verdicts, arrests, gigs paid, farms, visitors, the
      weather and the event).
   3. The look of the day: the page gets sky- and wx- classes so place art is
      tinted for dawn, day, dusk and night, with rain or storm overlays.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T || !T.CIV) return;
const {EXT} = T, V = T.CIV, {day, hashN, E, W2, SESS, CLS} = V;
const L = a => S.lang === "es" ? a[1] : a[0];

const EVENTS = {
  market:  {e:"🧺", l:["Farmers' Market Day","Día del mercado agrícola"], d:["Crops and farm goods sell for 30% more at the Farmers Market.","Los cultivos se venden 30% más caros."], fx:{crop:1.3}, go:"farm"},
  showers: {e:"🌦️", l:["Spring Showers","Lluvias de primavera"], d:["Rain helps the fields: crops grow 50% faster today.","La lluvia ayuda: los cultivos crecen 50% más rápido hoy."], fx:{grow:1.5}, go:"farm", wx:"rain"},
  festival:{e:"🎪", l:["Smithtopia Festival","Festival de Smithtopia"], d:["Free tickets to Trivia Night at the Theater, and the prize doubles.","Boletos gratis para la trivia y el premio se duplica."], fx:{show:0, prize:2}, go:"theater"},
  mall:    {e:"🛍️", l:["Mall Madness","Locura en el centro comercial"], d:["Everything in the mall boutique is 25% off.","Todo en la boutique tiene 25% de descuento."], fx:{mall:0.75}, go:"mall"},
  transit: {e:"🚌", l:["Free Transit Day","Día de transporte gratis"], d:["No bus fares anywhere in town.","Sin pasajes de autobús en todo el pueblo."], fx:{bus:0}, go:null},
  lowtide: {e:"🌊", l:["Low Tide","Marea baja"], d:["Shell hunts find one extra shell.","La búsqueda de conchas encuentra una concha extra."], fx:{shells:1}, go:"beach"},
  jobfair: {e:"💼", l:["Job Fair","Feria de empleo"], d:["Every paid gig gives the worker a +1 bonus from the town.","Cada trabajo pagado da +1 de bono al trabajador."], fx:{gig:1}, go:"gigs"},
  harvest: {e:"🌕", l:["Harvest Moon","Luna de cosecha"], d:["Farm animals produce double when fed today.","Los animales producen el doble al alimentarlos hoy."], fx:{ani:2}, go:"farm"},
  safety:  {e:"🚨", l:["Safety Week","Semana de seguridad"], d:["Extra patrols: no break-ins today, and paying a fine earns back 1.","Patrullas extra: hoy no hay allanamientos y pagar una multa devuelve 1."], fx:{nobreak:1, finerebate:1}, go:"justice"},
  heat:    {e:"☀️", l:["Heat Wave","Ola de calor"], d:["Beach day! One extra shell, but crops grow 20% slower.","¡Día de playa! Una concha extra, pero los cultivos crecen 20% más lento."], fx:{shells:1, grow:0.8}, go:"beach", wx:"sunny"},
  museum:  {e:"🏺", l:["Museum Night","Noche de museo"], d:["Donations pay double, and the docent gives +2.","Las donaciones pagan doble y el guía da +2."], fx:{donate:2, docent:2}, go:"museum"},
  quiet:   {e:"☕", l:["A quiet day in Smithtopia","Un día tranquilo en Smithtopia"], d:["Nothing special: a good day to study and do your shift.","Nada especial: buen día para estudiar y trabajar."], fx:{}, go:null}
};
const KEYS = Object.keys(EVENTS);
function today(){ const d = new Date(), wd = d.getDay(); if (wd === 0 || wd === 6) return null;
  const forced = (CLS() || {}).eventToday; if (forced && forced.day === day() && EVENTS[forced.k]) return {k:forced.k, ...EVENTS[forced.k]};
  const cid = (SESS() && SESS().cid) || "x", k = KEYS[hashN("ev" + cid + day()) % KEYS.length]; return {k, ...EVENTS[k]}; }
window.TOWN_EVENT = today;
/* an event with its own weather (Spring Showers, Heat Wave) sets the plaza's weather too */
if (window.TODAY && TODAY.weather) { const base = TODAY.weather; TODAY.weather = () => { const e = today(); return (e && e.wx) || base(); }; }
window.TOWN_FX = (key, dflt) => { const e = today(); return e && e.fx && e.fx[key] != null ? e.fx[key] : dflt; };

/* ---------------------------------------------------------------- event card + ticker on the map */
EXT.mapTop = EXT.mapTop || []; EXT.mapBadge = EXT.mapBadge || [];
EXT.mapTop.push(() => { const e = today(); if (!e) return `<section class="panel evcard ev-quiet"><span class="eve">🛋️</span><div><div class="eyebrow">${W2("Weekend","Fin de semana")}</div><b>${W2("Smithtopia is resting. Events return Monday.","Smithtopia descansa. Los eventos vuelven el lunes.")}</b></div></section>`;
  return `<section class="panel evcard ev-${e.k}"><span class="eve">${T.artImg(`${T.TA}events/${e.k}.webp`, e.e)}</span><div><div class="eyebrow">${W2("Today in Smithtopia","Hoy en Smithtopia")}</div><b>${E(L(e.l))}</b><p>${E(L(e.d))}</p></div>${e.go ? `<button class="btn primary" onclick="w2Go('${e.go}')">${W2("Go","Ir")} →</button>` : ""}</section>`; });
EXT.mapTop.push(() => { const h = headlines(); if (!h.length) return "";
  const line = h.map(x => `<span>${x}</span>`).join("<i>•</i>");
  return `<div class="ticker" aria-label="${W2("Smithtopia Live","Smithtopia en vivo")}"><b>📡 ${W2("LIVE","EN VIVO")}</b><div class="tkwrap"><div class="tkrun">${line}<i>•</i>${line}</div></div></div>`; });
EXT.mapBadge.push(k => { const e = today(); return e && e.go === k ? `<i class="kq evbadge">${e.e}</i>` : ""; });
function headlines(){ const out = [], now = Date.now(), H24 = 864e5, J = window.JUSTICE, R = window.RECORDS, F = window.FARM, TR = window.TRAVEL, e = today();
  if (e) out.push(`${e.e} ${E(L(e.l))}`);
  const wx = (e && e.wx) || (window.TODAY && TODAY.weather ? TODAY.weather() : null); if (wx) out.push({sunny:W2("☀️ Sunny skies over the plaza","☀️ Cielo despejado"), cloudy:W2("☁️ Cloudy today","☁️ Nublado hoy"), rain:W2("🌧️ Rain on the plaza: grab an umbrella","🌧️ Lluvia en la plaza"), storm:W2("⛈️ Storm warning in Smithtopia","⛈️ Alerta de tormenta"), snow:W2("❄️ Snow in Smithtopia!","❄️ ¡Nieve en Smithtopia!")}[wx] || "");
  if (J) { J.suits.filter(s => s.status === "verdict" && now - (s.upd || 0) < H24).slice(0, 2).forEach(s => out.push(`🏛️ ${W2("Jury rules for","El jurado falla a favor de")} ${E(s.winner === "a" ? s.aName : s.bName)} ${W2("in","en")} ${E(s.aName)} v. ${E(s.bName)}`));
    J.jail.filter(x => x.until > now).slice(0, 2).forEach(x => out.push(`🚓 ${E(x.name)} ${W2("is behind bars","está tras las rejas")}`)); }
  if (R) R.gigs.filter(g => g.status === "paid" && now - (g.upd || 0) < H24).slice(0, 3).forEach(g => out.push(`💼 ${E(g.workerName)} ${W2("finished a job for","terminó un trabajo para")} ${E(g.byName)} ${"★".repeat(g.stars | 0)}`));
  if (R) R.gigs.filter(g => g.status === "open").slice(0, 2).forEach(g => out.push(`📌 ${W2("Help wanted","Se busca ayuda")}: ${E(g.byName)} ${W2("pays","paga")} 💵${g.pay}`));
  if (F) { const n = Object.keys(F.farms || {}).length; if (n) out.push(`🌾 ${n}/12 ${W2("farm plots claimed","terrenos ocupados")}`); }
  if (TR && TR.greets && TR.greets.length) out.push(`✈️ ${E(TR.greets[0].name)} ${W2("flew in from","llegó de")} ${E(TR.greets[0].fromName)}`);
  const m = CLS() && CLS().mayor; if (m && m.name) out.push(`🎖️ ${W2("Mayor","Alcalde")} ${E(m.name)} ${W2("is in office","está en el cargo")}`);
  return out.filter(Boolean); }

/* ---------------------------------------------------------------- the look of the day */
function look(){ const b = document.body; if (!b) return; const sky = window.TODAY && TODAY.SKY ? TODAY.SKY().k : "day", e = today();
  const wx = (e && e.wx) || (window.TODAY && TODAY.weather ? TODAY.weather() : "sunny");
  [...b.classList].filter(c => c.startsWith("sky-") || c.startsWith("wx-")).forEach(c => b.classList.remove(c)); b.classList.add("sky-" + sky, "wx-" + wx); }
setInterval(look, 60e3); setTimeout(look, 1500); EXT.onSession.push(() => setTimeout(look, 500));

/* ---------------------------------------------------------------- teacher: choose today's event */
window.evTPick = k => T.adminSet({eventToday:k ? {k, day:day()} : null});
EXT.adminPanels.push({tab:"overview", html: c => { const cur = c.eventToday && c.eventToday.day === day() ? c.eventToday.k : "";
  return `<section class="panel tadm"><div class="eyebrow">🎪 ${W2("Today's town event","Evento del día")}</div>
    <p class="muted" style="font-size:13px">${W2("Each school day the town rolls an event that changes prices, growth or rewards. You can pick one for today instead (it resets tomorrow).","Cada día escolar el pueblo sortea un evento. Puedes elegir uno para hoy (se reinicia mañana).")}</p>
    <div class="cmake"><button class="btn ${cur ? "" : "primary"}" onclick="evTPick(null)">🎲 ${W2("Random","Al azar")}</button>${KEYS.map(k => `<button class="btn ${cur === k ? "primary" : ""}" onclick="evTPick('${k}')">${EVENTS[k].e} ${E(L(EVENTS[k].l))}</button>`).join("")}</div></section>`; }});
window.EVENTS = {EVENTS, today, headlines};
})();
