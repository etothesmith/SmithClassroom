/* =============================================================================
   SMITHTOPIA — the bigger world (town/world2.js)
   1. Neighborhoods that open as the class learns: Lake Eola Waterfront
      (fishing with class questions), the Theme Park (speed-round rides) and
      the Space Coast (unit launch missions). They unlock when the class
      averages enough certificates, or when Coach Smith opens them.
   2. Weekly story events: a new storyline every Monday (Hurricane Week, the
      Grenadier Fair, Election Night, Founders' Week, Save Lake Eola, Market
      Madness). The whole class answers questions to reach the goal by Friday.
   3. Needs: Knowledge, Energy, Social and Fun bars, filled by class work and
      town life. A thriving avatar earns more from daily jobs.
   4. Townspeople with quests: Coach Smith, Ms. Pinkerton the landlord, Newsy
      Ned the news anchor and Captain Rosa at the lake.
   5. Collections: the Album (fish, mission patches, ride photos, event and
      quest trophies, seasonal furniture), monthly limited furniture, and pets
      that grow when you feed them.
   6. Town vs. town: postcards from the other periods, Best Town of the Month,
      and the Interstate Trade Post for trading furniture between periods.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T || !T.CIV) return;
const {EXT, TA} = T, V = T.CIV;
const {civ, sheet, closeSheet, cleanText, day, week, hashN, img, bar, CLS, E, W2, C, store, SESS, NET, sub} = V;
const L = a => S.lang === "es" ? a[1] : a[0];
const me = () => SESS() && SESS().sid;
const WA = TA + "world/";
function w2(){ const c = civ(); c.w2 = c.w2 || {}; const w = c.w2;
  w.needs = w.needs || {know:70, energy:80, social:60, fun:60, at:Date.now()};
  w.fish = w.fish || {}; w.patches = w.patches || {}; w.photos = w.photos || {}; w.trophies = w.trophies || {};
  w.q = w.q || {}; w.pets = w.pets || {}; w.daily = w.daily || {}; w.track = w.track || {}; w.cnt = w.cnt || {fish:0, rare:0, rides:0, missions:0};
  if (w.daily.d !== day()) w.daily = {d:day(), casts:0, rides:0, mission:0, snacks:0, slept:0, story:0, fed:{}};
  return w; }

/* ---------------------------------------------------------------- questions from the student's own classes */
const SUBJ = {econ:["ap-econ","econ-h"], gov:["us-gov","ap-gov"]};
const RECENT = [];
function myPacks(){ const W = window.WORLD_TODO, mine = W && W.myCourses ? W.myCourses() : []; const all = typeof allPacks === "function" ? allPacks() : [];
  const m = all.filter(p => mine.includes(p.id)); return m.length ? m : all; }
function pickQ(subj, unitId){
  let packs = myPacks(); if (subj && SUBJ[subj]) { const f = packs.filter(p => SUBJ[subj].includes(p.id)); if (f.length) packs = f; }
  const pool = []; packs.forEach(p => p.units.forEach(u => { if (unitId && u.id !== unitId) return; u.items.forEach(it => { if (it.type === "mcq" && it.c && it.c.en && it.c.en.length >= 3) pool.push(it); }); }));
  if (!pool.length) return null;
  for (let i = 0; i < 8; i++) { const q = pool[Math.floor(Math.random() * pool.length)]; if (!RECENT.includes(q.id) || i === 7) { RECENT.push(q.id); if (RECENT.length > 40) RECENT.shift(); return q; } }
}
/* one question on the sheet; cb(ok). opts: {title, e, timer (seconds), sub} */
function ask(o, cb){
  const q = pickQ(o.subj, o.unit); if (!q) { T.toast(W2("No questions found.","No hay preguntas.")); return cb(false); }
  const opts = q.c[S.lang === "es" && q.c.es ? "es" : "en"], order = [...opts.keys()].sort(() => Math.random() - 0.5);
  window._w2q = {q, order, cb, done:false};
  sheet(`<div class="eyebrow">${o.e || "❓"} ${E(o.title || "")}</div>${o.sub ? `<div class="wsub">${o.sub}</div>` : ""}
    ${o.timer ? `<div class="wtimer"><i id="w2t" style="animation-duration:${o.timer}s"></i></div>` : ""}
    <h2 style="font-size:19px">${E(T.L2(q.q))}</h2>
    <div class="cqopts">${order.map((i, k) => `<button class="btn" onclick="w2Ans(${k})">${E(opts[i])}</button>`).join("")}</div><p id="w2why"></p>`);
  if (o.timer) window._w2q.tm = setTimeout(() => w2Ans(-1), o.timer * 1000);
}
window.w2Ans = function(k){
  const st = window._w2q; if (!st || st.done) return; st.done = true; clearTimeout(st.tm);
  const ok = k >= 0 && st.order[k] === st.q.a;
  document.querySelectorAll(".cqopts button").forEach((b, i) => { b.disabled = true; if (st.order[i] === st.q.a) b.classList.add("primary"); });
  const why = document.getElementById("w2why");
  if (why) why.innerHTML = `<b>${k < 0 ? W2("Time's up!","¡Se acabó el tiempo!") : ok ? W2("Correct!","¡Correcto!") : W2("Not quite.","Casi.")}</b> ${st.q.why ? E(T.L2(st.q.why)) : ""}
    <br><button class="btn primary wide" style="margin-top:10px" onclick="w2Next()">${W2("Continue","Continuar")}</button>`;
  st.ok = ok; bumpNeed("know", ok ? 3 : 1);
};
window.w2Next = () => { const st = window._w2q; window._w2q = null; if (st) st.cb(st.ok); };
/* a run of n questions; cb(right) */
function series(o, n, cb){ let i = 0, right = 0; const step = () => { if (i >= n) return cb(right); i++;
  ask({...o, sub:`${o.sub ? o.sub + " · " : ""}${W2("Question","Pregunta")} ${i}/${n} · ✔ ${right}`}, ok => { if (ok) right++; step(); }); }; step(); }

/* ================================================================ 3. needs */
const NEEDS = {know:["🧠","Knowledge","Conocimiento"], energy:["⚡","Energy","Energía"], social:["💬","Social","Social"], fun:["🎈","Fun","Diversión"]};
const DECAY = {know:18, energy:22, social:16, fun:16};        /* points lost per day */
function needs(){ const w = w2(), n = w.needs, hrs = (Date.now() - (n.at || Date.now())) / 36e5;
  if (hrs > 0.05) { Object.keys(DECAY).forEach(k => { n[k] = Math.max(0, (n[k] == null ? 60 : n[k]) - DECAY[k] * hrs / 24); }); n.at = Date.now(); }
  return n; }
function bumpNeed(k, v){ const n = needs(); n[k] = Math.max(0, Math.min(100, (n[k] || 0) + v)); T.persist(); }
const mood = () => { const n = needs(), a = (n.know + n.energy + n.social + n.fun) / 4;
  return a >= 70 ? {k:"thrive", e:"😄", l:["Thriving","Excelente"], a} : a >= 40 ? {k:"ok", e:"🙂", l:["Doing okay","Bien"], a} : {k:"low", e:"😩", l:["Worn out","Agotado"], a}; };
function needsHtml(full){
  const n = needs(), m = mood();
  return `<div class="wneeds">${Object.entries(NEEDS).map(([k, [e, en, es]]) => `<div class="wneed ${n[k] < 30 ? "low" : ""}" title="${W2(en, es)}"><span>${e}</span>
      <div><small>${W2(en, es)}</small>${bar(n[k] / 100, n[k] < 30 ? "#E4572E" : n[k] >= 70 ? "#3BB273" : "#F2B33D")}</div></div>`).join("")}
    <div class="wmood"><b>${m.e} ${L(m.l)}</b><small>${m.k === "thrive" ? W2("Daily jobs pay +1","Los trabajos diarios pagan +1") : m.k === "low" ? W2("Daily jobs pay −1 until you recharge","Los trabajos diarios pagan −1 hasta que te recargues") : W2("Keep your bars above 70 to thrive","Mantén las barras arriba de 70")}</small></div></div>
    ${full ? `<div class="cmake" style="margin-top:8px">
      <button class="btn" onclick="w2Sleep()">😴 ${W2("Sleep at home (+50 ⚡, once a day)","Dormir en casa (+50 ⚡, una vez al día)")}</button>
      <button class="btn" onclick="w2Snack()">🥤 ${W2("Snack (+15 ⚡, 2 Smithbucks)","Merienda (+15 ⚡, 2 Smithbucks)")}</button></div>
      <p class="muted" style="font-size:12px;margin:6px 0 0">${W2("🧠 grows when you answer questions · 💬 with stickers, trades, chats and visits · 🎈 with the arcade, fishing and rides · ⚡ from sleep, snacks and the café",
        "🧠 crece al responder preguntas · 💬 con calcomanías, intercambios, charlas y visitas · 🎈 con el arcade, la pesca y los juegos · ⚡ con sueño, meriendas y el café")}</p>` : ""}`;
}
window.w2Sleep = function(){ const w = w2(); if (w.daily.slept) return T.toast(W2("You already slept today.","Ya dormiste hoy."));
  const bed = Object.values(T.town().house.slots || {}).some(id => T.ITEMS[id] && T.ITEMS[id].slot === "bed");
  w.daily.slept = 1; bumpNeed("energy", bed ? 50 : 25); T.toast(bed ? W2("😴 A good night's sleep: +50 energy.","😴 Dormiste bien: +50 de energía.") : W2("😴 You slept on the floor: +25 energy. A bed gives +50!","😴 Dormiste en el piso: +25. ¡Una cama da +50!")); T.paintSub(); };
window.w2Snack = function(){ const w = w2(); if (w.daily.snacks >= 3) return T.toast(W2("That's enough snacks for today.","Ya fueron suficientes meriendas hoy."));
  if ((S.tokens | 0) < 2) return T.toast(W2("Not enough Smithbucks.","No tienes suficientes Smithbucks."));
  T.coins(-2); w.daily.snacks++; bumpNeed("energy", 15); T.toast("🥤 +15 ⚡"); T.paintSub(); };
/* what fills the bars: watch class work, the arcade and town life */
function trackNeeds(){
  if (!SESS()) return; const w = w2(), tr = w.track, d = day();
  const ans = V.answeredToday(), arc = (S.arcDay && S.arcDay.n) | 0, fed = civ().fed === d;
  if (tr.d !== d) { tr.d = d; tr.ans = ans; tr.arc = arc; tr.fed = false; }
  if (ans > tr.ans) { bumpNeed("know", (ans - tr.ans) * 2); tr.ans = ans; }
  if (arc > tr.arc) { bumpNeed("fun", (arc - tr.arc) * 4); tr.arc = arc; }
  if (fed && !tr.fed) { tr.fed = true; bumpNeed("energy", 30); }
}
setInterval(trackNeeds, 8000);
const wrapNeed = (fn, k, v) => { const o = window[fn]; if (typeof o !== "function") return; window[fn] = function(){ const r = o.apply(this, arguments); try { bumpNeed(k, v); } catch(e){} return r; }; };
wrapNeed("townSticker", "social", 12); wrapNeed("townSendTrade", "social", 15); wrapNeed("townAccept", "social", 15); wrapNeed("townSay", "social", 4);
wrapNeed("townKnock", "social", 6); wrapNeed("townPut", "fun", 4);
/* mood changes daily-job pay */
const _collect = window.civCollect;
if (typeof _collect === "function") window.civCollect = function(k){
  const before = civ().jobs && civ().jobs.paid && civ().jobs.paid[k]; const r = _collect.apply(this, arguments);
  if (!before && civ().jobs.paid[k]) { const m = mood(); if (m.k === "thrive") { T.coins(1); T.toast(W2("😄 Thriving bonus: +1","😄 Bono por estar excelente: +1")); }
    else if (m.k === "low" && (S.tokens | 0) > 0) { T.coins(-1); T.toast(W2("😩 Worn out: −1. Sleep, snack or have some fun to recharge.","😩 Agotado: −1. Duerme, come algo o diviértete.")); } T.persist(); }
  return r; };

/* ================================================================ 1. neighborhoods */
const DISTRICTS = {
  waterfront:{e:"🎣", need:1, l:["Lake Eola Waterfront","Malecón del Lago Eola"], d:["Cast a line: every right answer reels in a fish. Collect all 16.","Lanza el anzuelo: cada respuesta correcta saca un pez. Colecciona los 16."]},
  park:      {e:"🎢", need:2.5, l:["Grenadier Theme Park","Parque de diversiones"], d:["Ride the coasters: speed rounds of 5 questions. Rides take tickets you earn by practicing.","Súbete a las montañas rusas: rondas rápidas de 5 preguntas. Los boletos se ganan practicando."]},
  space:     {e:"🚀", need:4, l:["Space Coast","Costa Espacial"], d:["Launch a mission for each unit. 8 questions fuel 3 rocket stages; earn a mission patch.","Lanza una misión por unidad. 8 preguntas cargan 3 etapas; gana un parche de misión."]}
};
const pubs = () => Object.values(T.pub || {}).filter(p => p && !p.left);
function classAvgCerts(){ const ps = pubs(); if (!ps.length) return (S.certs || []).length;
  const mine = ps.some(p => p.id === me() || p.sid === me()); const tot = ps.reduce((s, p) => s + ((p.w2 && p.w2.certs) | 0), 0) + (mine ? 0 : (S.certs || []).length);
  return tot / Math.max(1, ps.length + (mine ? 0 : 1)); }
const isOpen = k => (CLS().districts || []).includes(k) || classAvgCerts() >= DISTRICTS[k].need;

/* --- Lake Eola: fishing --- */
const fishArt = f => img(`${WA}fish_${f[0]}.webp`, f[1]);
const FISH = [["bluegill","🐟",0,["Bluegill","Mojarra azul"]],["bass","🐟",0,["Largemouth bass","Lobina negra"]],["catfish","🐱",0,["Channel catfish","Bagre de canal"]],["crappie","🐟",0,["Crappie","Crappie"]],
  ["sunfish","🌞",0,["Redear sunfish","Pez sol"]],["tilapia","🐠",0,["Tilapia","Tilapia"]],["boot","🥾",0,["Old boot","Bota vieja"]],["mullet","🐟",1,["Striped mullet","Lisa rayada"]],
  ["gar","🐊",1,["Florida gar","Pejelagarto"]],["peacock","🦚",1,["Peacock bass","Tucunaré"]],["snook","🐟",1,["Snook","Robalo"]],["feather","🪶",1,["Swan feather","Pluma de cisne"]],
  ["redfish","🔴",2,["Redfish","Corvina roja"]],["tarpon","🐋",2,["Tarpon","Sábalo"]],["sturgeon","🦈",2,["Gulf sturgeon","Esturión del golfo"]],["koi","✨",3,["Golden koi","Koi dorado"]]];
const RAR = [["Common","Común"],["Uncommon","Poco común"],["Rare","Raro"],["Legendary","Legendario"]];
const CASTS = 6;
window.w2Cast = function(){
  const w = w2(); if (w.daily.casts >= CASTS) return T.toast(W2("The fish are done biting today. Come back tomorrow!","Hoy ya no pican. ¡Vuelve mañana!"));
  if (needs().energy < 5) return T.toast(W2("Too tired to fish. Sleep or grab a snack.","Muy cansado para pescar. Duerme o come algo."));
  ask({title:W2("Cast your line","Lanza el anzuelo"), e:"🎣", sub:W2(`Cast ${w.daily.casts + 1} of ${CASTS}`, `Lance ${w.daily.casts + 1} de ${CASTS}`)}, ok => {
    w.daily.casts++; bumpNeed("energy", -5); bumpNeed("fun", 8);
    if (!ok) { closeSheet(); T.toast(W2("It got away! Answer right to land a fish.","¡Se escapó! Responde bien para sacar un pez.")); T.persist(); return T.paintSub(); }
    const streak = w.fishStreak = (w.fishStreak | 0) + 1, r = Math.random() * 100 + Math.min(20, streak * 3);
    const tier = r > 110 ? 3 : r > 92 ? 2 : r > 62 ? 1 : 0, opts = FISH.filter(f => f[2] === tier), f = opts[Math.floor(Math.random() * opts.length)];
    const fresh = !w.fish[f[0]]; w.fish[f[0]] = (w.fish[f[0]] | 0) + 1; w.cnt.fish++; if (tier >= 2) w.cnt.rare++;
    const pay = [1, 2, 4, 10][tier]; T.coins(pay); T.persist(); albumCheck();
    sheet(`<div class="eyebrow">🎣 ${W2("You caught…","Pescaste…")}</div><div class="wcatch"><span>${fishArt(f)}</span><h2>${L(f[3])}</h2>
      <i class="wr r${tier}">${L(RAR[tier])}</i><p>${fresh ? "📔 " + W2("New in your Album!","¡Nuevo en tu Álbum!") : W2(`You have ${w.fish[f[0]]} of these.`, `Tienes ${w.fish[f[0]]}.`)} · +${pay} Smithbucks</p></div>
      <button class="btn primary wide" onclick="townCloseCard();T_w2Paint()">${W2("Nice!","¡Bien!")}</button>`);
  });
};
window.T_w2Paint = () => T.paintSub();
function paintWaterfront(el, back){
  const w = w2(), got = FISH.filter(f => w.fish[f[0]]).length;
  el.innerHTML = `${back}<section class="panel raised wdist wlake">${img(`${WA}waterfront.webp`, "🎣", "big")}<div><div class="eyebrow">${W2("Lake Eola Waterfront","Malecón del Lago Eola")}</div>
      <h2>${W2("Gone fishing","De pesca")}</h2><p class="muted">${W2("Every cast is a question from your classes. Right answers land fish; keep a streak going for rarer catches. The swans are watching.","Cada lance es una pregunta de tus clases. Las respuestas correctas sacan peces; mantén la racha para peces más raros. Los cisnes te observan.")}</p>
      <button class="btn primary" onclick="w2Cast()">🎣 ${W2("Cast","Lanzar")} (${CASTS - w.daily.casts} ${W2("left today","quedan hoy")})</button>
      <p class="muted" style="font-size:12px">${W2(`Fish collected: ${got}/16 · Streak: ${w.fishStreak | 0}`, `Peces: ${got}/16 · Racha: ${w.fishStreak | 0}`)}</p></div></section>
    ${npcCard("rosa")}
    <section class="panel"><div class="eyebrow">📔 ${W2("Your catch","Tu pesca")}</div><div class="walb">${FISH.map(f => `<div class="${w.fish[f[0]] ? "on" : ""} r${f[2]}"><span class="${w.fish[f[0]] ? "" : "wsil"}">${fishArt(f)}</span><small>${w.fish[f[0]] ? L(f[3]) : "???"}</small></div>`).join("")}</div></section>`;
}
/* --- Theme Park: rides --- */
const RIDES = {coaster:["🎢",["The Grenadier Screamer","El Grito Grenadier"],6], drop:["🗼",["Drop Tower","Torre de caída"],5], flume:["🛶",["Log Flume","Troncos acuáticos"],8]};
const tickets = () => { const w = w2(); return 1 + Math.floor(V.answeredToday() / 10) - w.daily.rides; };
window.w2Ride = function(k){
  const R = RIDES[k], w = w2(); if (tickets() <= 0) return T.toast(W2("No tickets left. Answer 10 practice questions in your classes for another ticket.","No quedan boletos. Responde 10 preguntas de práctica para otro boleto."));
  if (needs().energy < 10) return T.toast(W2("Too tired to ride. Sleep or grab a snack.","Muy cansado. Duerme o come algo."));
  w.daily.rides++; bumpNeed("energy", -10); T.persist();
  series({title:L(R[1]), e:R[0], timer:R[2]}, 5, right => {
    const grade = right >= 5 ? 3 : right >= 4 ? 2 : right >= 3 ? 1 : 0, prev = w.photos[k] | 0;
    if (grade > prev) w.photos[k] = grade; w.cnt.rides++; bumpNeed("fun", 22); T.coins(right); T.persist(); albumCheck();
    sheet(`<div class="eyebrow">📸 ${W2("Ride photo","Foto del juego")}</div><div class="wcatch"><span>${R[0]}</span><h2>${L(R[1])}</h2>
      <p>${["😱 " + W2("You screamed the whole way.","Gritaste todo el camino."), "🥉 " + W2("Bronze rider","Jinete de bronce"), "🥈 " + W2("Silver rider","Jinete de plata"), "🥇 " + W2("Gold rider: hands in the air!","Jinete de oro: ¡manos arriba!")][grade]}</p>
      <p>✔ ${right}/5 · +${right} Smithbucks${grade > prev ? " · 📔 " + W2("New best photo!","¡Mejor foto!") : ""}</p></div>
      <button class="btn primary wide" onclick="townCloseCard();T_w2Paint()">${W2("Again!","¡Otra vez!")}</button>`);
  });
};
function paintPark(el, back){
  const w = w2(), t = Math.max(0, tickets());
  el.innerHTML = `${back}<section class="panel raised wdist wpark">${img(`${WA}park.webp`, "🎢", "big")}<div><div class="eyebrow">${W2("Grenadier Theme Park","Parque de diversiones")}</div>
      <h2>🎟️ ${t} ${W2(t === 1 ? "ticket" : "tickets","boleto(s)")}</h2><p class="muted">${W2("Every ride is a timed round of 5 questions. Your score is your ride photo. You get 1 free ticket a day, plus 1 for every 10 practice questions you answer in your classes.",
        "Cada juego es una ronda de 5 preguntas con tiempo. Tu puntaje es tu foto. Tienes 1 boleto gratis al día, más 1 por cada 10 preguntas de práctica.")}</p></div></section>
    <div class="wrides">${Object.entries(RIDES).map(([k, R]) => `<button class="kb" onclick="w2Ride('${k}')">${img(`${WA}ride_${k}.webp`, R[0], "big")}<b>${L(R[1])}</b>
      <small>⏱️ ${R[2]}s · ${["—","🥉","🥈","🥇"][w.photos[k] | 0]} ${W2("best","mejor")}</small></button>`).join("")}</div>
    ${npcCard("ned")}`;
}
/* --- Space Coast: missions --- */
function myUnits(){ const out = []; myPacks().forEach(p => p.units.forEach(u => out.push({id:u.id, t:T.L2(u.title), pack:p.id}))); return out; }
window.w2Mission = function(uid){
  const w = w2(); if (w.daily.mission) return T.toast(W2("One launch a day. Mission control will see you tomorrow!","Un lanzamiento al día. ¡Hasta mañana!"));
  const u = myUnits().find(x => x.id === uid); if (!u) return;
  w.daily.mission = 1; T.persist();
  series({title:`🚀 ${u.t}`, e:"🛰️", unit:uid}, 8, right => {
    const ok = right >= 6, first = ok && !w.patches[uid];
    if (ok) { w.patches[uid] = Math.max(w.patches[uid] | 0, right); w.cnt.missions++; }
    const pay = ok ? (first ? 10 : 4) : 1; T.coins(pay); bumpNeed("know", 10); T.persist(); albumCheck();
    sheet(`<div class="eyebrow">🚀 ${W2("Mission report","Reporte de misión")}</div><div class="wcatch"><span class="${ok ? "wlaunch" : "wboom"}">${ok ? "🚀" : "💥"}</span>
      <h2>${ok ? W2("Orbit reached!","¡Llegaste a órbita!") : W2("Scrubbed launch","Lanzamiento abortado")}</h2>
      <div class="wstages">${[2, 4, 6].map((n, i) => `<i class="${right >= n ? "on" : ""}">${W2("Stage","Etapa")} ${i + 1}</i>`).join("")}</div>
      <p>✔ ${right}/8 · +${pay} Smithbucks${first ? " · 📔 " + W2("Mission patch earned!","¡Parche de misión!") : ""}</p>
      ${ok ? "" : `<p class="muted">${W2("You need 6 right to reach orbit. Study this unit and try again tomorrow.","Necesitas 6 correctas. Estudia la unidad y vuelve mañana.")}</p>`}</div>
      <button class="btn primary wide" onclick="townCloseCard();T_w2Paint()">${W2("Back to the pad","Volver a la plataforma")}</button>`);
  });
};
function paintSpace(el, back){
  const w = w2(), us = myUnits();
  el.innerHTML = `${back}<section class="panel raised wdist wspace">${img(`${WA}space.webp`, "🚀", "big")}<div><div class="eyebrow">${W2("Space Coast","Costa Espacial")}</div>
      <h2>${W2("Mission control","Control de misión")}</h2><p class="muted">${W2("Pick a unit and launch: 8 questions from that unit. 2, 4 and 6 right answers fire the three stages. Reach orbit to earn that unit's mission patch. One launch a day.",
        "Elige una unidad y lanza: 8 preguntas de esa unidad. 2, 4 y 6 correctas encienden las tres etapas. Llega a órbita para ganar el parche. Un lanzamiento al día.")}</p>
      <p>${w.daily.mission ? "✅ " + W2("Today's launch is done.","Lanzamiento de hoy hecho.") : "🟢 " + W2("Launch pad ready.","Plataforma lista.")} · 🎖️ ${Object.keys(w.patches).length}/${us.length} ${W2("patches","parches")}</p></div></section>
    <section class="panel"><div class="eyebrow">🛰️ ${W2("Missions","Misiones")}</div><div class="wmis">${us.map(u => `<button class="${w.patches[u.id] ? "on" : ""}" ${w.daily.mission ? "disabled" : ""} onclick="w2Mission('${u.id}')">
      <span>${w.patches[u.id] ? "🎖️" : "🚀"}</span><b>${E(u.t)}</b><small>${w.patches[u.id] ? W2(`Best ${w.patches[u.id]}/8`, `Mejor ${w.patches[u.id]}/8`) : W2("Not launched","Sin lanzar")}</small></button>`).join("")}</div></section>`;
}

/* ================================================================ 2. weekly story events */
const STORIES = {
  hurricane:{e:"🌀", item:"e_hurricane", t:["Hurricane Week","Semana del huracán"], ch:[
    ["Hurricane Hattie is forming in the Atlantic. The town has five days to get ready.","El huracán Hattie se forma en el Atlántico. El pueblo tiene cinco días para prepararse."],
    ["Stores are running low on water and batteries. Prices are climbing. Stock up the shelters.","Las tiendas se quedan sin agua y baterías. Los precios suben. Abastezcan los refugios."],
    ["Board up the windows and check on neighbors. Every right answer is another plank.","Tapen las ventanas y revisen a los vecinos. Cada respuesta correcta es otra tabla."],
    ["Hattie makes landfall tonight. Is Smithtopia ready?","Hattie toca tierra esta noche. ¿Está listo el pueblo?"],
    ["The storm has passed. Time to see how the town held up.","La tormenta pasó. Veamos cómo resistió el pueblo."]]},
  fair:{e:"🎡", item:"e_fair", t:["The Grenadier Fair","La Feria Grenadier"], ch:[
    ["The Grenadier Fair comes to town on Friday, and every booth still has to be built.","La Feria Grenadier llega el viernes y hay que construir todos los puestos."],
    ["Vendors need permits and price lists. Help them set fair prices.","Los vendedores necesitan permisos y listas de precios. Ayúdalos a fijar precios justos."],
    ["The Ferris wheel arrived in pieces. Every right answer tightens a bolt.","La rueda de la fortuna llegó en piezas. Cada respuesta aprieta un tornillo."],
    ["Tomorrow is opening day. Last push!","Mañana abre la feria. ¡Último esfuerzo!"],
    ["The gates are open! Let's see if the fair is ready.","¡Abrieron las puertas! Veamos si la feria está lista."]]},
  election:{e:"🗳️", item:"e_election", t:["Election Night","Noche electoral"], ch:[
    ["Newsy Ned is planning the biggest Election Night broadcast in town history.","Newsy Ned prepara la transmisión electoral más grande de la historia del pueblo."],
    ["Fact-checkers needed! Every right answer clears up a rumor.","¡Se necesitan verificadores! Cada respuesta correcta aclara un rumor."],
    ["Register voters and set up polling places on the plaza.","Registren votantes e instalen casillas en la plaza."],
    ["Debate night. Know the issues!","Noche de debate. ¡Conozcan los temas!"],
    ["Polls are closed. Was the town ready to count every vote?","Cerraron las casillas. ¿Estuvo listo el pueblo para contar cada voto?"]]},
  founders:{e:"📜", item:"e_founders", t:["Founders' Week","Semana Fundadora"], ch:[
    ["Smithtopia is writing its charter, and the founders need help.","El pueblo escribe su carta fundacional y los fundadores necesitan ayuda."],
    ["What powers should the town have? What rights do townspeople keep?","¿Qué poderes debe tener el pueblo? ¿Qué derechos conservan los vecinos?"],
    ["Checks and balances: nobody should hold all the power.","Pesos y contrapesos: nadie debe tener todo el poder."],
    ["The town meeting votes tomorrow. Make your case.","La asamblea vota mañana. Presenta tu argumento."],
    ["Signing day! Did the charter pass?","¡Día de la firma! ¿Se aprobó la carta?"]]},
  lakes:{e:"🦢", item:"e_lakes", t:["Save Lake Eola","Salvemos el lago Eola"], ch:[
    ["Something is wrong at Lake Eola. The swans are leaving.","Algo pasa en el lago Eola. Los cisnes se van."],
    ["A factory upstream is dumping waste. Who pays for pollution? (Hint: externalities.)","Una fábrica río arriba tira desechos. ¿Quién paga la contaminación? (Pista: externalidades.)"],
    ["Clean-up crews are on the shore. Every right answer pulls out a bag of trash.","Las cuadrillas limpian la orilla. Cada respuesta saca una bolsa de basura."],
    ["The town council debates a fine for polluters.","El concejo debate una multa para quien contamine."],
    ["The water report is in. Did the swans come back?","Llegó el reporte del agua. ¿Volvieron los cisnes?"]]},
  market:{e:"📈", item:"e_market", t:["Market Madness","La locura del mercado"], ch:[
    ["A rumor spreads: sneaker prices are about to triple. Shoppers rush the Market.","Un rumor: los tenis van a triplicar su precio. Todos corren al Mercado."],
    ["Shortages everywhere! Explain supply and demand before panic sets in.","¡Escasez por todos lados! Expliquen la oferta y la demanda antes del pánico."],
    ["The bank sees a run on savings. Calm the town with facts.","El banco ve retiros masivos. Calmen al pueblo con datos."],
    ["Prices start settling. One more push to restore confidence.","Los precios se calman. Un empujón más para recuperar la confianza."],
    ["Did the market recover?","¿Se recuperó el mercado?"]]}
};
const SKEYS = Object.keys(STORIES), PER = 10, DAY_CAP = 8;
const wkIndex = (w = week()) => Math.round((new Date(w + "T12:00") - new Date("2024-01-01T12:00")) / (7 * 864e5));
const storyOf = (w = week()) => SKEYS[((wkIndex(w) % SKEYS.length) + SKEYS.length) % SKEYS.length];
const dow = () => { const d = new Date().getDay(); return d === 0 ? 7 : d; };      /* Mon 1 … Sun 7 */
let PTS = [], LAST = null;
const storyTotal = () => PTS.reduce((s, r) => s + (r.n | 0), 0);
const storyTarget = () => PER * Math.max(3, pubs().length || 1);
const storyOn = () => !CLS().storyOff;
window.w2Help = function(){
  const w = w2(), k = storyOf(), S2 = STORIES[k]; if (!storyOn()) return;
  if (w.daily.story >= DAY_CAP) return T.toast(W2(`You helped ${DAY_CAP} times today. Thank you! Come back tomorrow.`, `Ayudaste ${DAY_CAP} veces hoy. ¡Gracias! Vuelve mañana.`));
  ask({title:L(S2.t), e:S2.e, sub:W2(`Help today: ${w.daily.story}/${DAY_CAP}`, `Ayuda hoy: ${w.daily.story}/${DAY_CAP}`)}, async ok => {
    closeSheet(); w.daily.story++; T.persist();
    if (!ok) { T.toast(W2("Not quite. Try another!","Casi. ¡Intenta otra!")); return T.paintSub(); }
    const id = `${week()}_${me()}`, mine = PTS.find(r => r.id === id), n = ((mine && mine.n) | 0) + 1;
    try { await store().set(`${C()}/storypts/${id}`, {week:week(), sid:me(), n, at:Date.now()}); } catch(e){}
    T.coins(1); T.persist(); T.toast(W2("+1 for the town · +1 Smithbuck","+1 para el pueblo · +1 Smithbuck")); T.paintSub();
  });
};
function storySettle(){
  if (!SESS() || !storyOn()) return; const k = storyOf(), tot = storyTotal(), tgt = storyTarget();
  if (tot >= tgt) T.once("story:" + week(), () => { const S2 = STORIES[k]; T.coins(10); T.town().crates++; T.addItem(S2.item, 1); w2().trophies[k] = (w2().trophies[k] | 0) + 1;
    T.toast(W2(`${S2.e} The town did it! ${L(S2.t)} is a success: +10 Smithbucks, a crate and a trophy.`, `${S2.e} ¡Lo logró el pueblo! ${L(S2.t)}: +10 Smithbucks, una caja y un trofeo.`));
    if (typeof fireConfetti === "function") fireConfetti(); albumCheck(); T.persist(); leagueWin(); });
}
function storyPanel(compact){
  if (!storyOn()) return ""; const k = storyOf(), S2 = STORIES[k], tot = storyTotal(), tgt = storyTarget(), ch = S2.ch[Math.min(4, dow() - 1)], won = tot >= tgt, w = w2();
  const over = dow() >= 6;
  return `<section class="panel wstory ${won ? "won" : ""}"><div class="wsth">${img(`${WA}story_${k}.webp`, S2.e, "big")}<div>
      <div class="eyebrow">📖 ${W2("This week's story","La historia de la semana")} · ${W2("Chapter","Capítulo")} ${Math.min(5, dow())}</div>
      <h2>${L(S2.t)}</h2><p>${won ? "🎉 " + W2("The town reached the goal! Everyone got a crate and a trophy.","¡El pueblo llegó a la meta! Todos recibieron una caja y un trofeo.")
        : over ? W2("The week is over. New story on Monday!","Terminó la semana. ¡Nueva historia el lunes!") : L(ch)}</p></div></div>
    ${bar(tot / tgt, won ? "#3BB273" : "#2F7FD8")}<small>${W2(`Class progress: ${tot}/${tgt} right answers`, `Progreso de la clase: ${tot}/${tgt} respuestas correctas`)}${compact ? "" : ` · ${W2(`You helped ${w.daily.story}/${DAY_CAP} today`, `Ayudaste ${w.daily.story}/${DAY_CAP} hoy`)}`}</small>
    ${!won && !over ? `<button class="btn primary" onclick="${compact ? "townTab('map')" : "w2Help()"}">${S2.e} ${W2("Help the town","Ayudar al pueblo")}</button>` : ""}
    ${LAST && LAST.k === "hurricane" && !LAST.won && !compact ? `<p class="muted">🌀 ${W2("Last week's hurricane left debris on the plaza. The Sanitation crew and Builders can clean it up.","El huracán de la semana pasada dejó escombros en la plaza.")}</p>` : ""}</section>`;
}
async function loadLast(){
  if (!SESS()) return; const d = new Date(); d.setDate(d.getDate() - 7); const lw = week(d);
  try { const rows = await store().list(`${C()}/storypts`, {where:[["week","==",lw]]}); const t = rows.reduce((s, r) => s + (r.n | 0), 0);
    LAST = {k:storyOf(lw), won:t >= storyTarget(), t}; } catch(e){}
}
/* hurricane debris on the plaza after a failed Hurricane Week */
const DEBRIS = [[350,300,"🪵"],[620,330,"🌿"],[800,280,"🪵"],[450,470,"🧱"],[700,480,"🌿"]];
EXT.plazaBack.push(cx => { if (!(LAST && LAST.k === "hurricane" && !LAST.won && dow() <= 3)) return; cx.font = "30px sans-serif"; cx.textAlign = "center"; DEBRIS.forEach(([x, y, e]) => cx.fillText(e, x, y)); });

/* ================================================================ 4. townspeople and quests */
const NPCS = {
  coach:{e:"🧢", n:"Coach Smith", at:[420,430], reward:"q_whistle", pay:15, l:["Training camp","Campamento de entrenamiento"], steps:[
    {say:["Welcome to training camp, Grenadier! Warm up with 5 questions from your classes.","¡Bienvenido al campamento, Grenadier! Calienta con 5 preguntas de tus clases."], t:{k:"quiz", n:5}},
    {say:["Good hustle. Champions rest smart: catch 2 fish at Lake Eola.","Buen esfuerzo. Los campeones descansan bien: pesca 2 peces en el lago Eola."], t:{k:"fish", n:2}},
    {say:["Now aim high. Launch a mission at the Space Coast and reach orbit.","Ahora apunta alto. Lanza una misión en la Costa Espacial y llega a órbita."], t:{k:"mission", n:1}},
    {say:["Final drill: 8 questions in a row. Show me what you've got!","Último ejercicio: 8 preguntas seguidas. ¡Demuéstrame!"], t:{k:"quiz", n:8}}]},
  pinkerton:{e:"👵", n:"Ms. Pinkerton", at:[230,470], reward:"q_key", pay:15, l:["The rent is due","La renta vence"], steps:[
    {say:["Hmph. Another new tenant. Prove you understand money: 4 economics questions.","Hmph. Otro inquilino. Demuestra que entiendes el dinero: 4 preguntas de economía."], t:{k:"quiz", n:4, subj:"econ"}},
    {say:["A responsible tenant has savings. Put 20 Smithbucks in the bank.","Un buen inquilino ahorra. Pon 20 Smithbucks en el banco."], t:{k:"savings", n:20}},
    {say:["Your place looks bare. Put 5 pieces of furniture in your house.","Tu casa se ve vacía. Pon 5 muebles en tu casa."], t:{k:"decor", n:5}},
    {say:["Fine, fine. One last test: 6 economics questions, and I'll give you the golden key.","Bueno, bueno. Una última prueba: 6 preguntas de economía y te doy la llave dorada."], t:{k:"quiz", n:6, subj:"econ"}}]},
  ned:{e:"🎙️", n:"Newsy Ned", at:[760,440], reward:"q_mic", pay:15, l:["Breaking news","Última hora"], steps:[
    {say:["This is Newsy Ned with breaking news! I need a fact-checker. Answer 4 government questions.","¡Newsy Ned con noticias de última hora! Necesito un verificador. Responde 4 preguntas de gobierno."], t:{k:"quiz", n:4, subj:"gov"}},
    {say:["Great work. Head to Town Hall and see what's on the ballot.","Buen trabajo. Ve al Ayuntamiento y mira qué hay en la boleta."], t:{k:"visit", tab:"hall"}},
    {say:["Our viewers love a thrill. Ride something at the Theme Park and report back.","A la audiencia le encanta la emoción. Súbete a un juego del parque y repórtate."], t:{k:"ride", n:1}},
    {say:["Last story of the night: 6 civics questions, live on air!","Última nota de la noche: ¡6 preguntas de civismo en vivo!"], t:{k:"quiz", n:6, subj:"gov"}}]},
  rosa:{e:"⚓", n:"Captain Rosa", at:null, reward:"q_ship", pay:20, l:["The legend of the golden koi","La leyenda del koi dorado"], steps:[
    {say:["Ahoy! They say a golden koi lives in Lake Eola. Start by catching 3 fish.","¡Ahoy! Dicen que un koi dorado vive en el lago Eola. Empieza pescando 3 peces."], t:{k:"fish", n:3}},
    {say:["A sharp mind catches more. Answer 5 questions for me.","Una mente aguda pesca más. Responde 5 preguntas."], t:{k:"quiz", n:5}},
    {say:["Now catch something rare: a redfish, tarpon, sturgeon or better.","Ahora pesca algo raro: corvina roja, sábalo, esturión o mejor."], t:{k:"rare", n:1}},
    {say:["You're a true sailor. One more test: 8 questions, and the ship in a bottle is yours.","Eres un verdadero marinero. Una prueba más: 8 preguntas y el barco en botella es tuyo."], t:{k:"quiz", n:8}}]}
};
function qState(id){ const w = w2(); w.q[id] = w.q[id] || {step:0, base:null}; return w.q[id]; }
function counter(t){ const w = w2(), b = civ().bank || {};
  return {fish:w.cnt.fish, rare:w.cnt.rare, ride:w.cnt.rides, mission:w.cnt.missions, savings:b.bal | 0,
    decor:Object.values(T.town().house.slots || {}).filter(Boolean).length, visit:(w.visits || {})[t.tab] ? 1 : 0}[t.k]; }
function stepDone(id){ const N = NPCS[id], st = qState(id), s = N.steps[st.step]; if (!s) return true; const t = s.t;
  if (t.k === "quiz") return false; if (t.k === "savings" || t.k === "decor") return counter(t) >= t.n; if (t.k === "visit") return counter(t) >= 1;
  if (st.base == null) st.base = counter(t); return counter(t) - st.base >= t.n; }
function stepText(t){ return {quiz:W2(`Answer ${t.n} questions${t.subj === "econ" ? " (economics)" : t.subj === "gov" ? " (government)" : ""}`, `Responde ${t.n} preguntas`),
  fish:W2(`Catch ${t.n} fish`, `Pesca ${t.n} peces`), rare:W2("Catch a rare fish","Pesca un pez raro"), ride:W2("Ride at the Theme Park","Súbete a un juego"),
  mission:W2("Reach orbit on a mission","Llega a órbita en una misión"), savings:W2(`Have ${t.n} Smithbucks in savings`, `Ten ${t.n} Smithbucks ahorrados`),
  decor:W2(`Place ${t.n} pieces of furniture`, `Pon ${t.n} muebles`), visit:W2("Visit Town Hall","Visita el Ayuntamiento")}[t.k] || ""; }
window.w2Npc = function(id){
  const N = NPCS[id], st = qState(id); if (!N) return; bumpNeed("social", 5);
  if (st.step >= N.steps.length) return sheet(`<div class="eyebrow">${N.e} ${N.n}</div><h2>${W2("Thanks again, friend!","¡Gracias otra vez!")}</h2>
    <p>${W2("You finished my quest. Come back next week for the town's new story.","Terminaste mi misión. Vuelve la próxima semana para la nueva historia.")}</p><button class="btn primary wide" onclick="townCloseCard()">👋</button>`);
  const s = N.steps[st.step], t = s.t; if (t.k !== "quiz" && t.k !== "savings" && t.k !== "decor" && t.k !== "visit" && st.base == null) { st.base = counter(t); T.persist(); }
  const ready = stepDone(id);
  sheet(`<div class="wnpc"><span>${img(`${WA}npc_${id}.webp`, N.e)}</span><div><div class="eyebrow">${N.n} · ${L(N.l)} · ${st.step + 1}/${N.steps.length}</div><p class="wsay">“${E(L(s.say))}”</p></div></div>
    <div class="kti ${ready ? "done" : ""}"><span>${ready ? "✅" : "🎯"}</span><div><b>${stepText(t)}</b>${t.k !== "quiz" && t.k !== "visit" ? `<small>${Math.min(t.n, t.k === "savings" || t.k === "decor" ? counter(t) : counter(t) - (st.base | 0))}/${t.n}</small>` : ""}</div></div>
    ${t.k === "quiz" ? `<button class="btn primary wide" onclick="w2NpcQuiz('${id}')">▶ ${W2("Start","Empezar")}</button>` : ready ? `<button class="btn primary wide" onclick="w2NpcNext('${id}')">✅ ${W2("Done! Next","¡Listo! Siguiente")}</button>` : ""}
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Later","Después")}</button>`);
};
window.w2NpcQuiz = function(id){ const N = NPCS[id], t = N.steps[qState(id).step].t;
  series({title:`${N.e} ${N.n}`, e:N.e, subj:t.subj}, t.n, right => { closeSheet();
    if (right >= Math.ceil(t.n * 0.6)) w2NpcNext(id); else T.toast(W2(`${right}/${t.n}. ${N.n} wants at least ${Math.ceil(t.n * 0.6)} right. Try again!`, `${right}/${t.n}. ${N.n} quiere al menos ${Math.ceil(t.n * 0.6)}. ¡Otra vez!`)); }); };
window.w2NpcNext = function(id){
  const N = NPCS[id], st = qState(id); if (st.step < N.steps.length && N.steps[st.step].t.k !== "quiz" && !stepDone(id)) return;
  st.step++; st.base = null; T.coins(3); bumpNeed("social", 8);
  if (st.step >= N.steps.length) { T.coins(N.pay); T.addItem(N.reward, 1); w2().trophies["q_" + id] = 1;
    T.toast(W2(`🎉 Quest complete! ${N.n} gave you the ${T.L2(T.ITEMS[N.reward].name)} and ${N.pay} Smithbucks.`, `🎉 ¡Misión completa! ${N.n} te dio ${T.L2(T.ITEMS[N.reward].name)} y ${N.pay} Smithbucks.`));
    if (typeof fireConfetti === "function") fireConfetti(); albumCheck(); }
  else T.toast(W2("+3 Smithbucks. Next step unlocked!","+3 Smithbucks. ¡Siguiente paso!"));
  T.persist(); closeSheet(); setTimeout(() => w2Npc(id), 250);
};
function npcCard(id){ const N = NPCS[id], st = qState(id), done = st.step >= N.steps.length;
  return `<section class="panel wnpcc" onclick="w2Npc('${id}')" role="button"><span>${img(`${WA}npc_${id}.webp`, N.e)}</span><div><b>${N.n}</b><small>${done ? "✅ " + W2("Quest complete","Misión completa") : `❗ ${L(N.l)} · ${st.step + 1}/${N.steps.length}`}</small></div><span class="btn">${W2("Talk","Hablar")}</span></section>`; }
/* townspeople stand on the plaza (Gemini art, emoji until it loads) */
const NPCIM = {};
function npcIm(id){ let o = NPCIM[id]; if (!o) { o = NPCIM[id] = new Image(); o.src = `${WA}npc_${id}.webp`; } return o.complete && o.naturalWidth ? o : null; }
EXT.plazaFront.push(cx => { if (!SESS()) return; cx.textAlign = "center";
  Object.entries(NPCS).forEach(([id, N]) => { if (!N.at) return; const [x, y] = N.at, st = qState(id), t = performance.now() / 600;
    const im = npcIm(id), H = 92, top = im ? y + 4 - H : y - 40;
    if (im) { const w = H * im.naturalWidth / im.naturalHeight; cx.fillStyle = "rgba(0,0,0,.18)"; cx.beginPath(); cx.ellipse(x, y + 4, w * .42, 6, 0, 0, 7); cx.fill(); cx.drawImage(im, x - w / 2, top, w, H); }
    else { cx.font = "44px sans-serif"; cx.fillText(N.e, x, y); }
    cx.font = "800 13px 'Nunito', sans-serif"; const tw = cx.measureText(N.n).width + 14; cx.fillStyle = "rgba(255,255,255,.92)"; T.rr(cx, x - tw / 2, y + 6, tw, 20, 10); cx.fill();
    cx.fillStyle = "#1d1b2e"; cx.fillText(N.n, x, y + 21);
    if (st.step < N.steps.length) { cx.font = "26px sans-serif"; cx.fillText("❗", x, top - 4 + Math.sin(t) * 4); } }); });
EXT.plazaTap.push((x, y) => { if (!SESS()) return false; const hit = Object.entries(NPCS).find(([id, N]) => N.at && Math.abs(N.at[0] - x) < 30 && y < N.at[1] + 10 && y > N.at[1] - (npcIm(id) ? 92 : 44));
  if (!hit) return false; w2Npc(hit[0]); return true; });
const _tab = window.townTab; if (typeof _tab === "function") window.townTab = function(k){ const w = w2(); w.visits = w.visits || {}; w.visits[k] = 1; return _tab.apply(this, arguments); };

/* ================================================================ 5. collections, seasonal items and pets */
const SEASON_NAMES = [["January","enero"],["February","febrero"],["March","marzo"],["April","abril"],["May","mayo"],["June","junio"],["July","julio"],["August","agosto"],["September","septiembre"],["October","octubre"],["November","noviembre"],["December","diciembre"]];
function seasonal(){ return Object.values(T.ITEMS).filter(i => i.season); }
function albumSets(){
  const w = w2(), own = id => T.has(id) || Object.values(T.town().house.slots || {}).includes(id), us = myUnits();
  return [
    {k:"fish", e:"🐟", l:["Lake Eola fish","Peces del lago Eola"], have:FISH.filter(f => w.fish[f[0]]).length, of:FISH.length},
    {k:"patches", e:"🎖️", l:["Mission patches","Parches de misión"], have:us.filter(u => w.patches[u.id]).length, of:us.length},
    {k:"rides", e:"📸", l:["Gold ride photos","Fotos de oro"], have:Object.keys(RIDES).filter(r => (w.photos[r] | 0) >= 3).length, of:3},
    {k:"stories", e:"📖", l:["Story trophies","Trofeos de historias"], have:SKEYS.filter(s => w.trophies[s]).length, of:SKEYS.length},
    {k:"quests", e:"❗", l:["Townspeople quests","Misiones de vecinos"], have:Object.keys(NPCS).filter(n => w.trophies["q_" + n]).length, of:Object.keys(NPCS).length},
    {k:"season", e:"🗓️", l:["Seasonal furniture","Muebles de temporada"], have:seasonal().filter(i => own(i.id)).length, of:seasonal().length}];
}
function albumCheck(){ albumSets().forEach(s => { if (s.of && s.have >= s.of) T.once("album:" + s.k, () => { T.town().crates += 2; T.coins(15);
  T.toast(W2(`📔 Album set complete: ${s.l[0]}! +2 crates and 15 Smithbucks.`, `📔 ¡Colección completa: ${s.l[1]}! +2 cajas y 15 Smithbucks.`)); }); }); }
function paintAlbum(el, back){
  const w = w2(), sets = albumSets(), mo = new Date().getMonth(), own = id => T.has(id) || Object.values(T.town().house.slots || {}).includes(id), us = myUnits();
  el.innerHTML = `${back}<section class="panel raised"><div class="eyebrow">📔 ${W2("My album","Mi álbum")}</div><h2>${W2("Collections","Colecciones")}</h2>
      <p class="muted">${W2("Finish a whole set for 2 crates and 15 Smithbucks.","Completa una colección y gana 2 cajas y 15 Smithbucks.")}</p>
      <div class="wsets">${sets.map(s => `<div class="${s.have >= s.of && s.of ? "on" : ""}"><span>${s.e}</span><b>${L(s.l)}</b>${bar(s.of ? s.have / s.of : 0, s.have >= s.of ? "#3BB273" : null)}<small>${s.have}/${s.of}</small></div>`).join("")}</div></section>
    <section class="panel"><div class="eyebrow">🐟 ${W2("Fish","Peces")}</div><div class="walb">${FISH.map(f => `<div class="${w.fish[f[0]] ? "on" : ""} r${f[2]}"><span class="${w.fish[f[0]] ? "" : "wsil"}">${fishArt(f)}</span><small>${w.fish[f[0]] ? L(f[3]) : "???"}</small></div>`).join("")}</div></section>
    <section class="panel"><div class="eyebrow">🎖️ ${W2("Mission patches","Parches de misión")}</div><div class="walb">${us.map(u => `<div class="${w.patches[u.id] ? "on" : ""}"><span>${w.patches[u.id] ? "🎖️" : "❔"}</span><small>${E(u.t)}</small></div>`).join("")}</div></section>
    <section class="panel"><div class="eyebrow">📸 ${W2("Ride photos","Fotos de juegos")}</div><div class="walb">${Object.entries(RIDES).map(([k, R]) => `<div class="${w.photos[k] ? "on" : ""}"><span class="${w.photos[k] ? "" : "wsil"}">${img(`${WA}ride_${k}.webp`, R[0])}</span><small>${L(R[1])} ${["","🥉","🥈","🥇"][w.photos[k] | 0]}</small></div>`).join("")}</div></section>
    <section class="panel"><div class="eyebrow">🏆 ${W2("Trophies","Trofeos")}</div><div class="walb">${SKEYS.map(k => `<div class="${w.trophies[k] ? "on" : ""}"><span>${w.trophies[k] ? STORIES[k].e : "❔"}</span><small>${L(STORIES[k].t)}</small></div>`).join("")}
      ${Object.entries(NPCS).map(([id, N]) => `<div class="${w.trophies["q_" + id] ? "on" : ""}"><span>${w.trophies["q_" + id] ? T.ITEMS[N.reward].e : "❔"}</span><small>${N.n}</small></div>`).join("")}</div></section>
    <section class="panel"><div class="eyebrow">🗓️ ${W2("Seasonal furniture (in the Shop only during its month)","Muebles de temporada (en la Tienda solo en su mes)")}</div>
      <div class="walb">${seasonal().map(i => `<div class="${own(i.id) ? "on" : ""} ${i.season === mo + 1 ? "now" : ""}"><span>${own(i.id) ? i.e : "❔"}</span><small>${own(i.id) ? E(T.L2(i.name)) : L(SEASON_NAMES[i.season - 1])}</small></div>`).join("")}</div></section>`;
}
/* pets that grow */
const STAGES = [[0,["Baby","Bebé"],0.8],[5,["Young","Joven"],1],[12,["Grown","Adulto"],1.2]];
const petStage = n => { let s = STAGES[0]; STAGES.forEach(x => { if (n >= x[0]) s = x; }); return s; };
window.w2Feed = function(id){
  const w = w2(); if (w.daily.fed[id]) return T.toast(W2("Already fed today. Come back tomorrow!","Ya comió hoy. ¡Vuelve mañana!"));
  ask({title:W2("Feed your pet","Alimenta a tu mascota"), e:T.ITEMS[id] ? T.ITEMS[id].e : "🐾", sub:W2("Answer right to get the good food.","Responde bien para la buena comida.")}, ok => {
    closeSheet(); w.daily.fed[id] = 1; const before = petStage(w.pets[id] | 0);
    w.pets[id] = (w.pets[id] | 0) + (ok ? 2 : 1); bumpNeed("fun", 5); const after = petStage(w.pets[id]);
    if (after[0] > before[0]) { T.coins(10); T.toast(W2(`🎉 Your pet grew up! Now: ${after[1][0]}. +10 Smithbucks.`, `🎉 ¡Tu mascota creció! Ahora: ${after[1][1]}. +10 Smithbucks.`)); }
    else T.toast(ok ? W2("😋 Yum! +2 growth","😋 ¡Rico! +2 crecimiento") : W2("Plain kibble today: +1 growth","Croquetas simples: +1 crecimiento"));
    T.persist(); T.paintSub(); });
};
function petsHtml(){
  const w = w2(), pets = [...new Set([...Object.values(T.town().house.slots || {}).filter(id => id && /^pet_/.test(id)), ...Object.keys(T.town().inv || {}).filter(id => /^pet_/.test(id) && T.town().inv[id] > 0)])];
  if (!pets.length) return `<p class="muted">${W2("No pets yet. Pets come from crates and the Market.","Aún no tienes mascotas. Salen de cajas y del Mercado.")}</p>`;
  return `<div class="wpets">${pets.map(id => { const I = T.ITEMS[id] || {e:"🐾", name:{en:id}}, n = w.pets[id] | 0, s = petStage(n), nx = STAGES.find(x => x[0] > n);
    return `<div><span style="font-size:${Math.round(38 * s[2])}px">${I.e}</span><b>${E(T.L2(I.name))}</b><small>${L(s[1])}${nx ? ` · ${n}/${nx[0]}` : " · ❤️"}</small>
      <button class="btn ${w.daily.fed[id] ? "ghost" : "primary"}" ${w.daily.fed[id] ? "disabled" : ""} onclick="w2Feed('${id}')">🍖 ${w.daily.fed[id] ? W2("Fed","Comió") : W2("Feed","Alimentar")}</button></div>`; }).join("")}</div>`;
}
EXT.houseExtra.push({html: sid => sid === me() ? `<section class="panel"><div class="eyebrow">💚 ${W2("Your needs","Tus necesidades")}</div>${needsHtml(true)}</section>` : ""});

/* ================================================================ 6. town vs. town */
let LG = [], MKT = [];
const owner = () => CLS().ownerUid;
const month = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
const prevMonth = () => { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - 1); return month(d); };
const scoreFor = (r, m) => { const mx = r.mx && r.mx.m === m ? r.mx.avg : r.pmx && r.pmx.m === m ? r.pmx.avg : 0;
  const ev = (r.evs || []).filter(w => w.slice(0, 7) === m).length; return Math.round((mx | 0) + ev * 100 + (r.lm | 0) * 25); };
function leagueWin(){ const r = LG.find(x => x.id === SESS().cid); const evs = [...new Set([...((r && r.evs) || []), week()])].slice(-20); pushLeague({evs}); }
let _lgAt = 0;
function pushLeague(extra){
  if (!SESS() || !owner()) return; const r = LG.find(x => x.id === SESS().cid); if (!r) return;    /* the civic league creates the row */
  if (!extra && Date.now() - _lgAt < 120000) return; _lgAt = Date.now();
  const m = month(), ps = pubs(), n = Math.max(1, ps.length), sum = ps.reduce((s, p) => s + ((p.w2 && p.w2.mo && p.w2.mo.m === m) ? p.w2.mo.n | 0 : 0), 0);
  const mx = {m, avg:Math.round(sum / n)}, pmx = r.mx && r.mx.m !== m ? r.mx : (r.pmx || null);
  const d = {mx, ...(pmx ? {pmx} : {}), res:ps.length, dist:Object.keys(DISTRICTS).filter(isOpen).length, mayor:!!(CLS().mayor && CLS().mayor.sid),
    lm:LANDMARKS, story:{k:storyOf(), t:storyTotal(), g:storyTarget()}, ...(extra || {})};
  store().set(`league/${owner()}/periods/${SESS().cid}`, d, true).catch(() => {});
}
let LANDMARKS = 0;
function bestTownCheck(){
  if (!SESS() || new Date().getDate() > 10 || LG.length < 2) return; const pm = prevMonth();
  const ranked = LG.map(r => ({r, s:scoreFor(r, pm)})).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
  if (ranked[0] && ranked[0].r.id === SESS().cid) T.once("besttown:" + pm, () => { T.town().crates++; T.coins(10); T.addItem("t_besttown", 1);
    T.toast(W2("🏆 Your period is Best Town of the Month! +10 Smithbucks, a crate and the cup.","🏆 ¡Tu periodo es el Mejor Pueblo del Mes! +10 Smithbucks, una caja y la copa.")); T.persist(); });
}
window.w2List = function(){
  const free = Object.entries(T.town().inv || {}).filter(([id, n]) => n > 0 && T.ITEMS[id] && !T.ITEMS[id].office);
  if (!free.length) return T.toast(W2("Nothing in your inventory to trade.","No tienes nada para intercambiar."));
  sheet(`<div class="eyebrow">🚚 ${W2("Interstate Trade Post","Puesto de comercio entre pueblos")}</div><h2>${W2("Sell to another period","Vende a otro periodo")}</h2>
    <label class="cform">${W2("Item","Objeto")}<select id="w2Item">${free.map(([id, n]) => `<option value="${id}">${T.ITEMS[id].e} ${E(T.L2(T.ITEMS[id].name))} (×${n})</option>`).join("")}</select></label>
    <label class="cform">${W2("Price (Smithbucks)","Precio (Smithbucks)")}<input id="w2Price" type="number" min="1" max="100" value="10"></label>
    <p class="muted" style="font-size:12px">${W2("Your item leaves your inventory while it's listed. Buyers only see your period, never your name.","Tu objeto sale de tu inventario mientras está a la venta. Los compradores solo ven tu periodo, nunca tu nombre.")}</p>
    <button class="btn primary wide" onclick="w2ListGo()">🚚 ${W2("List it","Publicar")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.w2ListGo = async function(){
  const id = document.getElementById("w2Item").value, price = Math.max(1, Math.min(100, parseInt(document.getElementById("w2Price").value, 10) || 0)), inv = T.town().inv;
  if (!(inv[id] > 0)) return; inv[id]--; T.persist(); closeSheet();
  try { await store().add(`league/${owner()}/market`, {cid:SESS().cid, cname:SESS().className || "", sid:me(), uid:store().uid(), item:id, price, status:"open", at:Date.now()});
    T.toast(W2("🚚 Listed at the Trade Post!","🚚 ¡Publicado en el Puesto de comercio!")); } catch(e){ inv[id]++; T.persist(); T.toast(W2("Couldn't list it right now.","No se pudo publicar.")); }
  T.paintSub();
};
window.w2Buy = async function(lid){
  const l = MKT.find(x => x.id === lid); if (!l || l.status !== "open" || l.cid === SESS().cid) return;
  if ((S.tokens | 0) < l.price) return T.toast(W2("Not enough Smithbucks.","No tienes suficientes Smithbucks."));
  try { await store().update(`league/${owner()}/market/${lid}`, {status:"sold", buyerCid:SESS().cid, buyerName:SESS().className || "", soldAt:Date.now()});
    T.coins(-l.price); T.addItem(l.item, 1); bumpNeed("social", 10); T.persist(); T.toast(W2(`🚚 Bought from ${l.cname}!`, `🚚 ¡Comprado a ${l.cname}!`)); }
  catch(e){ T.toast(W2("Someone else bought it first.","Alguien lo compró primero.")); }
  T.paintSub();
};
window.w2Cancel = async function(lid){ try { await store().update(`league/${owner()}/market/${lid}`, {status:"cancel"}); } catch(e){} };
function settleMarket(){
  if (!SESS()) return; let ch = false;
  MKT.filter(l => l.sid === me() && l.cid === SESS().cid).forEach(l => {
    if (l.status === "sold") ch = T.once("tp:" + l.id, () => { T.coins(l.price); T.toast(W2(`🚚 ${l.buyerName || "Another period"} bought your ${T.L2(T.ITEMS[l.item].name)}: +${l.price} Smithbucks.`, `🚚 ${l.buyerName || "Otro periodo"} compró tu objeto: +${l.price} Smithbucks.`)); }) || ch;
    if (l.status === "cancel") ch = T.once("tp:" + l.id, () => { T.town().inv[l.item] = (T.town().inv[l.item] | 0) + 1; }) || ch; });
  if (ch) T.persist();
}
function paintTowns(el, back){
  const m = month(), pm = prevMonth(), ranked = LG.map(r => ({r, s:scoreFor(r, m)})).sort((a, b) => b.s - a.s), last = LG.map(r => ({r, s:scoreFor(r, pm)})).filter(x => x.s > 0).sort((a, b) => b.s - a.s)[0];
  const open = MKT.filter(l => l.status === "open").sort((a, b) => b.at - a.at), mineL = open.filter(l => l.sid === me() && l.cid === SESS().cid);
  el.innerHTML = `${back}<section class="panel raised"><div class="eyebrow">🏙️ ${W2("Town vs. town","Pueblo contra pueblo")}</div><h2>${W2("Best Town of the Month","Mejor Pueblo del Mes")}</h2>
      <p class="muted">${W2("Score = XP per student this month + 100 for every story event won + 25 per landmark. The winning period gets a cup, a crate and 10 Smithbucks each.","Puntaje = XP por estudiante este mes + 100 por cada historia ganada + 25 por obra. El periodo ganador recibe copa, caja y 10 Smithbucks cada uno.")}</p>
      ${last ? `<p>🏆 ${W2(`Last month's winner: <b>${E(last.r.name)}</b>`, `Ganador del mes pasado: <b>${E(last.r.name)}</b>`)}</p>` : ""}
      <table class="ttab cleague"><tr><th></th><th>${W2("Period","Periodo")}</th><th>${W2("Score","Puntaje")}</th><th>${W2("Postcard","Postal")}</th></tr>
      ${ranked.map((x, i) => `<tr class="${x.r.id === SESS().cid ? "me" : ""}"><td>${["🥇","🥈","🥉"][i] || i + 1}</td><td><b>${E(x.r.name)}</b></td><td>${x.s}</td>
        <td><small>👥 ${x.r.res || x.r.n || "?"} · 🏙️ ${x.r.lm | 0} · 🗺️ ${x.r.dist | 0}/3${x.r.mayor ? " · 🎖️" : ""}${x.r.story ? ` · ${STORIES[x.r.story.k] ? STORIES[x.r.story.k].e : "📖"} ${x.r.story.t}/${x.r.story.g}` : ""}</small></td></tr>`).join("")}</table></section>
    <section class="panel"><div class="eyebrow">🚚 ${W2("Interstate Trade Post","Puesto de comercio entre pueblos")}</div>
      <p class="muted" style="font-size:13px">${W2("Trade furniture with the other periods. Sellers stay anonymous: buyers only see the period.","Intercambia muebles con otros periodos. Los vendedores son anónimos: solo se ve el periodo.")}</p>
      <button class="btn primary" onclick="w2List()">➕ ${W2("Sell something","Vender algo")}</button>
      <div class="tgridi" style="margin-top:8px">${open.filter(l => l.cid !== SESS().cid).map(l => { const I = T.ITEMS[l.item] || {e:"?", name:{en:l.item}};
        return `<div class="tcardi"><span style="font-size:40px">${I.e}</span><b>${E(T.L2(I.name))}</b><small>${E(l.cname)}</small><button class="btn" onclick="w2Buy('${l.id}')">💵 ${l.price}</button></div>`; }).join("")
        || `<p class="muted">${W2("Nothing from other periods yet.","Aún nada de otros periodos.")}</p>`}</div>
      ${mineL.length ? `<div class="eyebrow" style="margin-top:10px">${W2("Your listings","Tus publicaciones")}</div><div class="cmini">${mineL.map(l => `<span>${(T.ITEMS[l.item] || {e:"?"}).e} 💵${l.price} <button class="btn ghost" onclick="w2Cancel('${l.id}')">✖</button></span>`).join("")}</div>` : ""}</section>`;
}

/* ================================================================ the Map */
let SUBV = null;
const PLACES = () => [
  {k:"plaza", e:"⛲", l:["The Plaza","La Plaza"], go:"plaza", d:["Townspeople, quizzes and the fountain","Vecinos, preguntas y la fuente"]},
  {k:"homes", e:"🏡", l:["Grenadier Lane","Calle Grenadier"], go:"homes", d:["Everyone's houses (knock first!)","Las casas de todos (¡toca primero!)"]},
  {k:"downtown", e:"🏢", l:["Downtown","Centro"], go:"downtown", d:["Jobs, services and the Community Board","Trabajos, servicios y el Tablero"]},
  ...Object.entries(DISTRICTS).map(([k, D]) => ({k, e:D.e, l:D.l, d:D.d, district:true})),
  {k:"towns", e:"🏙️", l:["Other towns","Otros pueblos"], d:["Best Town of the Month and the Trade Post","Mejor Pueblo del Mes y el Puesto de comercio"]},
  {k:"album", e:"📔", l:["My album","Mi álbum"], d:["Your collections","Tus colecciones"]}, ...MORE.places];
const MORE = {places:[], views:{}};
function paintMap(el){
  const back = `<div class="eprow"><button class="btn ghost" onclick="w2Go(null)">← ${W2("Map","Mapa")}</button></div>`;
  if (SUBV === "waterfront" && isOpen("waterfront")) return paintWaterfront(el, back);
  if (SUBV === "park" && isOpen("park")) return paintPark(el, back);
  if (SUBV === "space" && isOpen("space")) return paintSpace(el, back);
  if (SUBV === "towns") return paintTowns(el, back);
  if (SUBV === "album") return paintAlbum(el, back);
  if (SUBV && MORE.views[SUBV]) return MORE.views[SUBV](el, back);
  SUBV = null; const avg = classAvgCerts();
  el.innerHTML = `<section class="panel raised"><div class="eyebrow">🧭 ${W2("Map of Smithtopia","Mapa de Smithtopia")}</div><h2>${W2("Where to?","¿A dónde?")}</h2>
      <div style="margin-top:6px">${needsHtml(false)}</div></section>
    ${storyPanel(false)}
    <div class="kmap wmap">${PLACES().map(p => { const lock = p.district && !isOpen(p.k), need = p.district ? DISTRICTS[p.k].need : 0;
      return `<button class="kb ${lock ? "locked" : ""}" onclick="${p.go ? `townTab('${p.go}')` : lock ? `w2Locked('${p.k}')` : `w2Go('${p.k}')`}">
        ${lock ? `<i class="khire wlock">🔒 ${W2("LOCKED","CERRADO")}</i>` : ""}${img(`${WA}${p.k}.webp`, p.e, "big")}<b>${L(p.l)}</b>
        <small>${lock ? W2(`Opens when the class averages ${need} certificates (now ${avg.toFixed(1)})`, `Abre cuando la clase promedie ${need} certificados (ahora ${avg.toFixed(1)})`) : L(p.d)}</small>
        ${lock ? bar(avg / need) : ""}</button>`; }).join("")}</div>
    <section class="panel"><div class="eyebrow">👥 ${W2("Townspeople","Vecinos")}</div>${Object.keys(NPCS).filter(id => NPCS[id].at).map(npcCard).join("")}
      <p class="muted" style="font-size:12px">${W2("Captain Rosa is down at Lake Eola.","La capitana Rosa está en el lago Eola.")}</p></section>`;
}
window.w2Locked = k => T.toast(W2(`${L(DISTRICTS[k].l)} opens when your class averages ${DISTRICTS[k].need} certificates per student. Every certificate counts!`, `${L(DISTRICTS[k].l)} abre cuando la clase promedie ${DISTRICTS[k].need} certificados por estudiante. ¡Cada certificado cuenta!`));
window.w2Go = function(k){ window._tfresh = Date.now(); SUBV = k; if (T.tt !== "map") townTab("map"); else T.paintSub(); window.scrollTo(0, 0); };
EXT.tabs.push({key:"map", icon:"🧭", label:() => W2("Map","Mapa"), paint:el => { paintMap(el); }});
EXT.onLeave.push(() => { SUBV = null; });

/* ---------------------------------------------------------------- banners, pub, to-do, admin */
EXT.banner.push(() => { if (!SESS() || T.tt === "map") return ""; const k = storyOf(), S2 = STORIES[k], tot = storyTotal(), tgt = storyTarget(), m = mood();
  return `<section class="panel wbanner" onclick="w2Go(null)" role="button">${storyOn() ? `<span>${S2.e} <b>${L(S2.t)}</b> <small>${tot}/${tgt}</small></span>` : ""}
    <span>${m.e} <b>${L(m.l)}</b></span>${Object.entries(NEEDS).map(([kk, [e]]) => `<span class="wmini ${needs()[kk] < 30 ? "low" : ""}">${e}${Math.round(needs()[kk])}</span>`).join("")}<span class="btn">🧭 ${W2("Map","Mapa")}</span></section>`; });
EXT.pubExtra.push(() => ({w2:{certs:(S.certs || []).length, mo:{m:month(), n:V.xpSince("mo:" + month())}, fish:Object.keys(w2().fish).length}}));
let BGS = [];
EXT.onLeave.push(() => { BGS.forEach(u => { try { u(); } catch(e){} }); BGS = []; });
EXT.onSession.push(() => {
  BGS.forEach(u => { try { u(); } catch(e){} }); BGS = [];
  BGS.push(store().watch(`${C()}/storypts`, {where:[["week","==",week()]]}, rows => { if (rows) { PTS = rows; storySettle(); } }));
  BGS.push(store().watch(`${C()}/requests`, {}, rows => { if (rows) LANDMARKS = rows.filter(r => r.status === "done").length; }));
  if (owner()) BGS.push(store().watch(`league/${owner()}/periods`, {}, rows => { if (rows) { LG = rows; pushLeague(); bestTownCheck(); } }));
  if (owner()) BGS.push(store().watch(`league/${owner()}/market`, {}, rows => { if (!rows) return; const was = MKT.length; MKT = rows; settleMarket();
    if (was && T.isTown() && T.tt === "map" && SUBV === "towns") setTimeout(() => T.paintSub(), 0); }));
  loadLast(); setTimeout(() => { trackNeeds(); albumCheck(); }, 800);
});
/* to-do: today's story chapter */
if (window.TODAY) { const base = window.TODAY.items; window.TODAY.items = function(){ const out = base(); if (SESS() && storyOn() && dow() <= 5) { const S2 = STORIES[storyOf()], w = w2();
  out.push({k:"story", e:S2.e, learn:true, t:W2(`Story: ${S2.t[0]} (${w.daily.story}/${DAY_CAP} today)`, `Historia: ${S2.t[1]} (${w.daily.story}/${DAY_CAP} hoy)`), sub:L(S2.ch[Math.min(4, dow() - 1)]),
    done:w.daily.story >= 3, opt:true, go:"todoStory()"}); } return out; }; }
window.todoStory = function(){ closeSheet(); go("town"); setTimeout(() => w2Go(null), 350); };
/* teacher */
EXT.adminPanels.push({
  html: c => `<section class="panel tadm"><div class="eyebrow">🧭 ${W2("World","Mundo")}</div>
    <p class="muted" style="font-size:13px">${W2("Neighborhoods open on their own when the class averages enough certificates (Waterfront 1, Theme Park 2.5, Space Coast 4). You can open one early.","Los barrios abren solos cuando la clase promedia suficientes certificados (Malecón 1, Parque 2.5, Costa Espacial 4). Puedes abrirlos antes.")}</p>
    <div class="cmake">${Object.entries(DISTRICTS).map(([k, D]) => { const on = (c.districts || []).includes(k);
      return `<button class="btn ${on ? "primary" : ""}" onclick="w2TDist('${k}')">${D.e} ${D.l[0]}: ${on ? W2("open","abierto") : W2("auto","automático")}</button>`; }).join("")}
      <button class="btn ${c.storyOff ? "" : "primary"}" onclick="townSet('storyOff', ${!c.storyOff})">📖 ${W2("Weekly story events","Historias semanales")}: ${c.storyOff ? W2("off","apagadas") : W2("on","encendidas")}</button></div>
    <p class="muted" style="font-size:12px">${W2(`This week: ${STORIES[storyOf()].t[0]}. Goal: ${PER} right answers per student, from Monday to Friday.`, `Esta semana: ${STORIES[storyOf()].t[1]}. Meta: ${PER} respuestas por estudiante, de lunes a viernes.`)}</p></section>`,
  after: () => {}
});
window.w2TDist = async function(k){ const c = (await T.net.myClasses()).find(x => x.id === T.adminCid); if (!c) return; const d = new Set(c.districts || []); d.has(k) ? d.delete(k) : d.add(k); townSet("districts", [...d]); };

window.WORLD2 = {MORE, ask, series, pickQ, myUnits, w2, needs, mood, isOpen, classAvgCerts, storyOf, storyTotal, storyTarget, NPCS, FISH, albumSets, petStage, scoreFor, DISTRICTS, STORIES, bumpNeed};
})();
