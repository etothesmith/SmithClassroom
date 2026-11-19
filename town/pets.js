/* =============================================================================
   GRENADIER TOWN — pets 2.0 (town/pets.js)
   - Every pet gets a name (word-filtered), a personality, a happiness meter
     and a growth stage (Baby → Young → Grown).
   - Daily care: feed (from world2), play fetch, and teach tricks. Every action
     is a class question. Eight tricks to learn; a grown pet with all eight
     tricks earns a gold collar.
   - Accessories from the Pet Boutique: bandana, bow, sunglasses, top hat,
     jersey, crown.
   - The Pet Rescue on the Map: adopt common pets for Smithbucks, with a daily
     featured rescue at half price. 22 new species, from hamsters to a dragon.
   - Pick a buddy and it follows you around the plaza with its name and
     accessory, so classmates see it.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN, W = window.WORLD2; if (!T || !T.CIV || !W) return;
const {EXT} = T, V = T.CIV, {sheet, closeSheet, cleanText, day, hashN, bar, E, W2, SESS} = V;
const L = a => S.lang === "es" ? a[1] : a[0];
const me = () => SESS() && SESS().sid;
const PERS = {playful:["🎾","Playful","Juguetón"], sleepy:["😴","Sleepy","Dormilón"], curious:["🔍","Curious","Curioso"], brave:["🦁","Brave","Valiente"], sassy:["💅","Sassy","Coqueto"], goofy:["🤪","Goofy","Payaso"]};
const LINES = {
  playful:[["wants to play again RIGHT NOW!","¡quiere jugar otra vez YA!"],["zooms in three circles.","da tres vueltas a toda velocidad."]],
  sleepy:[["yawns and curls up on your homework.","bosteza y se acurruca en tu tarea."],["falls asleep mid-trick.","se duerme a la mitad del truco."]],
  curious:[["sniffs every corner of the room.","olfatea cada rincón del cuarto."],["tries to read your notes.","intenta leer tus apuntes."]],
  brave:[["guards the front door like a hero.","cuida la puerta como un héroe."],["isn't scared of the vacuum at all.","no le tiene miedo a la aspiradora."]],
  sassy:[["gives you a look like you owe them a treat.","te mira como si le debieras un premio."],["only does tricks when it feels like it.","solo hace trucos cuando quiere."]],
  goofy:[["trips over its own tail and looks proud.","se tropieza con su cola y se ve orgulloso."],["wears a sock as a hat.","usa un calcetín de sombrero."]]};
const TRICKS = [["sit","🪑",["Sit","Sentado"]],["shake","🤝",["Shake","Dame la pata"]],["spin","🌀",["Spin","Gira"]],["roll","🔄",["Roll over","Rueda"]],
  ["highfive","🙌",["High five","Choca esos cinco"]],["dance","💃",["Dance","Baila"]],["playdead","😵",["Play dead","Hazte el muerto"]],["backflip","🤸",["Backflip","Mortal hacia atrás"]]];
const ACC = {bandana:["🧣",3,["Red bandana","Paliacate rojo"]], bow:["🎀",3,["Bow","Moño"]], shades:["🕶️",5,["Sunglasses","Lentes de sol"]],
  jersey:["🎽",6,["Grenadier jersey","Jersey Grenadier"]], tophat:["🎩",8,["Top hat","Sombrero de copa"]], crown:["👑",20,["Crown","Corona"]], collar:["🏅",0,["Gold collar (master trainer)","Collar de oro (gran entrenador)"]]};
const STAGES = [[0,["Baby","Bebé"],0.8],[5,["Young","Joven"],1],[12,["Grown","Adulto"],1.2]];
const stage = n => { let s = STAGES[0]; STAGES.forEach(x => { if (n >= x[0]) s = x; }); return s; };

function st(){ const w = W.w2(); w.petx = w.petx || {}; w.acc = w.acc || []; w.pd = w.pd && w.pd.d === day() ? w.pd : {d:day(), play:{}, teach:{}}; return w; }
const isPet = id => /^pet_/.test(id || "") && T.ITEMS[id];
function myPets(){ const t = T.town(); return [...new Set([...Object.values(t.house.slots || {}).filter(isPet), ...Object.keys(t.inv || {}).filter(id => isPet(id) && t.inv[id] > 0)])]; }
function px(id){ const w = st(); if (!w.petx[id]) w.petx[id] = {name:"", pers:Object.keys(PERS)[hashN(id + me()) % 6], tricks:0, happy:60, at:Date.now(), born:day()};
  const p = w.petx[id], hrs = (Date.now() - (p.at || Date.now())) / 36e5; if (hrs > 0.1) { p.happy = Math.max(0, p.happy - hrs * 1.2); p.at = Date.now(); } return p; }
const nameOf = id => { const p = px(id); return p.name || T.L2(T.ITEMS[id].name); };
const hearts = h => "❤️".repeat(Math.round(h / 20)) + "🤍".repeat(5 - Math.round(h / 20));

/* ---------------------------------------------------------------- naming */
window.petName = function(id){
  const p = px(id), I = T.ITEMS[id], P = PERS[p.pers];
  sheet(`<div class="eyebrow">🐾 ${W2("Name your pet","Ponle nombre a tu mascota")}</div>
    <div class="ppick"><span>${I.e}</span><div><b>${E(T.L2(I.name))}</b><small>${P[0]} ${W2("Personality","Personalidad")}: ${L(P.slice(1))}</small></div></div>
    <label class="cform">${W2("Pet name (up to 14 letters)","Nombre (hasta 14 letras)")}<input id="pName" maxlength="14" value="${E(p.name)}" placeholder="${W2("e.g. Biscuit","ej. Galleta")}"></label>
    <div class="pidea">${["Biscuit","Nugget","Pickles","Mango","Waffles","Sprinkles","Taco","Pepper","Grenadier","Mochi","Noodle","Captain"].map(n => `<button class="btn ghost" onclick="document.getElementById('pName').value='${n}'">${n}</button>`).join("")}</div>
    <p id="pErr" class="terr"></p><button class="btn primary wide" onclick="petNameGo('${id}')">✨ ${W2("Save name","Guardar nombre")}</button>
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Later","Después")}</button>`);
};
window.petNameGo = function(id){
  const v = document.getElementById("pName").value.trim().replace(/\s+/g, " ");
  if (v.length < 2) { document.getElementById("pErr").textContent = W2("At least 2 letters.","Al menos 2 letras."); return; }
  if (!cleanText(v)) { document.getElementById("pErr").textContent = W2("That name has a word that isn't allowed.","Ese nombre tiene una palabra que no se permite."); return; }
  px(id).name = v; T.persist(); T.publishSoon(); closeSheet(); T.toast(W2(`🐾 Say hi to ${v}!`, `🐾 ¡Saluda a ${v}!`)); T.paintSub();
};

/* ---------------------------------------------------------------- care: play and tricks */
window.petPlay = function(id){
  const w = st(); if ((w.pd.play[id] | 0) >= 2) return T.toast(W2(`${nameOf(id)} is tired of fetch. Play again tomorrow!`, `${nameOf(id)} se cansó. ¡Juega mañana!`));
  W.ask({title:W2(`Play fetch with ${nameOf(id)}`, `Juega a la pelota con ${nameOf(id)}`), e:"🎾", sub:W2("A right answer is a perfect throw.","Una respuesta correcta es un lanzamiento perfecto.")}, ok => {
    closeSheet(); const p = px(id); w.pd.play[id] = (w.pd.play[id] | 0) + 1; p.happy = Math.min(100, p.happy + (ok ? 25 : 10)); W.bumpNeed("fun", 8); W.bumpNeed("social", 4);
    const line = LINES[p.pers][hashN(day() + id + w.pd.play[id]) % 2]; T.persist(); T.publishSoon();
    T.toast(`${T.ITEMS[id].e} ${nameOf(id)} ${L(line)} ${ok ? "❤️ +25" : "❤️ +10"}`); T.paintSub(); });
};
window.petTeach = function(id){
  const w = st(), p = px(id); if (p.tricks >= TRICKS.length) return T.toast(W2(`${nameOf(id)} knows every trick!`, `¡${nameOf(id)} sabe todos los trucos!`));
  if (w.pd.teach[id]) return T.toast(W2("One lesson a day. Practice makes perfect!","Una lección al día."));
  const tr = TRICKS[p.tricks]; w.pd.teach[id] = 1; T.persist();
  W.series({title:W2(`Teach ${nameOf(id)}: ${tr[2][0]}`, `Enseña a ${nameOf(id)}: ${tr[2][1]}`), e:tr[1]}, 3, right => {
    closeSheet();
    if (right >= 3 || (right === 2 && p.pers !== "sassy")) { p.tricks++; p.happy = Math.min(100, p.happy + 15); T.coins(2);
      T.toast(W2(`${tr[1]} ${nameOf(id)} learned “${tr[2][0]}”! +2 Smithbucks`, `${tr[1]} ¡${nameOf(id)} aprendió “${tr[2][1]}”! +2 Smithbucks`));
      if (p.tricks >= TRICKS.length && stage(W.w2().pets[id] | 0)[0] >= 12) T.once("collar:" + id, () => { if (!w.acc.includes("collar")) w.acc.push("collar"); T.coins(15);
        T.toast(W2("🏅 Master trainer! Gold collar unlocked and +15 Smithbucks.","🏅 ¡Gran entrenador! Collar de oro y +15 Smithbucks.")); }); }
    else T.toast(p.pers === "sassy" ? W2(`💅 ${nameOf(id)} wants all 3 right before showing off.`, `💅 ${nameOf(id)} quiere las 3 correctas.`) : W2(`${right}/3. ${nameOf(id)} needs 2 right to learn it. Try tomorrow!`, `${right}/3. Necesita 2 correctas. ¡Mañana!`));
    T.persist(); T.publishSoon(); T.paintSub(); });
};
window.petTrick = function(id){ const p = px(id); if (!p.tricks) return T.toast(W2("No tricks yet. Teach one!","Aún no sabe trucos. ¡Enséñale!"));
  const tr = TRICKS[Math.floor(Math.random() * p.tricks)]; st().show = {id, tr:tr[0], at:Date.now()}; T.publishSoon();
  T.toast(`${T.ITEMS[id].e} ${nameOf(id)}: ${tr[1]} ${L(tr[2])}!`); };
window.petBuddy = function(id){ const w = st(); w.buddy = w.buddy === id ? null : id; T.persist(); T.publishNow();
  T.toast(w.buddy ? W2(`${nameOf(id)} will follow you on the plaza.`, `${nameOf(id)} te seguirá en la plaza.`) : W2("Your buddy stays home.","Tu compañero se queda en casa.")); T.paintSub(); };
window.petWear = function(id){
  const w = st(), p = px(id), own = w.acc;
  sheet(`<div class="eyebrow">🎀 ${W2(`Dress up ${nameOf(id)}`, `Viste a ${nameOf(id)}`)}</div>
    <div class="cpick col">${own.map(k => `<button onclick="petWearGo('${id}','${k}')">${ACC[k][0]} ${L(ACC[k][2])}${p.acc === k ? " ✓" : ""}</button>`).join("")}
    <button onclick="petWearGo('${id}','')">✖ ${W2("Nothing","Nada")}</button></div>
    ${own.length ? "" : `<p class="muted">${W2("Buy accessories at the Pet Boutique (Map → Pet Rescue).","Compra accesorios en la Boutique (Mapa → Rescate de mascotas).")}</p>`}`);
};
window.petWearGo = function(id, k){ px(id).acc = k || null; T.persist(); T.publishSoon(); closeSheet(); T.paintSub(); };

/* ---------------------------------------------------------------- the pet room (own house) */
function petCard(id){
  const I = T.ITEMS[id], p = px(id), g = W.w2().pets[id] | 0, s = stage(g), nx = STAGES.find(x => x[0] > g), P = PERS[p.pers], w = st(), fed = W.w2().daily.fed[id];
  return `<div class="pcard ${w.buddy === id ? "buddy" : ""}"><div class="pav"><span style="font-size:${Math.round(52 * s[2])}px">${I.e}</span>${p.acc ? `<i>${ACC[p.acc][0]}</i>` : ""}</div>
    <div class="pinfo"><b>${E(nameOf(id))}</b> ${p.name ? "" : `<button class="btn ghost" onclick="petName('${id}')">✏️ ${W2("Name me","Ponme nombre")}</button>`}
      <small>${E(T.L2(I.name))} · ${P[0]} ${L(P.slice(1))} · ${L(s[1])}</small>
      <div class="phearts" title="${W2("Happiness","Felicidad")}">${hearts(p.happy)}</div>
      ${nx ? `<small>${W2("Growth","Crecimiento")} ${g}/${nx[0]}</small>${bar(g / nx[0], "#3BB273")}` : `<small>🌟 ${W2("Fully grown","Adulto")}</small>`}
      <small>${W2("Tricks","Trucos")}: ${TRICKS.slice(0, p.tricks).map(t => t[1]).join(" ") || "—"} (${p.tricks}/${TRICKS.length})</small></div>
    <div class="pbtns"><button class="btn ${fed ? "ghost" : "primary"}" ${fed ? "disabled" : ""} onclick="w2Feed('${id}')">🍖 ${fed ? W2("Fed","Comió") : W2("Feed","Alimentar")}</button>
      <button class="btn" onclick="petPlay('${id}')">🎾 ${W2("Fetch","Pelota")}</button>
      <button class="btn" ${w.pd.teach[id] || p.tricks >= TRICKS.length ? "disabled" : ""} onclick="petTeach('${id}')">🎓 ${W2("Teach","Enseñar")}</button>
      <button class="btn" onclick="petTrick('${id}')">✨ ${W2("Trick","Truco")}</button>
      <button class="btn" onclick="petWear('${id}')">🎀</button>
      <button class="btn ${w.buddy === id ? "primary" : ""}" onclick="petBuddy('${id}')">🚶 ${w.buddy === id ? W2("Buddy","Compañero") : W2("Walk me","Pasear")}</button>
      ${p.name ? `<button class="btn ghost" onclick="petName('${id}')">✏️</button>` : ""}</div></div>`;
}
EXT.houseExtra.push({html: sid => {
  if (sid === me()) { const pets = myPets();
    return `<section class="panel"><div class="eyebrow">🐾 ${W2("Pet room","Cuarto de mascotas")} (${pets.length})</div>
      <p class="muted" style="font-size:12px;margin:0 0 6px">${W2("Feed, play and teach tricks every day. Every action is a question from your classes. Pick a buddy to walk on the plaza.","Alimenta, juega y enseña trucos cada día. Cada acción es una pregunta de tus clases. Elige un compañero para pasear en la plaza.")}</p>
      ${pets.length ? `<div class="pgrid">${pets.map(petCard).join("")}</div>` : `<p class="muted">${W2("No pets yet.","Aún no tienes mascotas.")}</p>`}
      <button class="btn" onclick="go('town');setTimeout(()=>w2Go('rescue'),300)">🏠 ${W2("Visit the Pet Rescue","Ir al Rescate de mascotas")}</button></section>`; }
  const pp = T.pub[sid] && T.pub[sid].pets; if (!pp || !pp.length) return "";
  return `<section class="panel"><div class="eyebrow">🐾 ${W2("Pets who live here","Mascotas de esta casa")}</div><div class="cmini">${pp.map(p => `<span>${p.e}${p.a ? ACC[p.a] ? ACC[p.a][0] : "" : ""} <b>${E(p.n)}</b> <small>${p.t ? "✨" + p.t : ""}</small></span>`).join("")}</div></section>`;
}});

/* ---------------------------------------------------------------- Pet Rescue + Boutique (Map) */
const adoptable = () => Object.values(T.ITEMS).filter(i => i.sp);
const featured = () => { const a = adoptable(); return a[hashN(day() + "rescue") % a.length].id; };
const fee = i => i.id === featured() ? Math.ceil(i.sp / 2) : i.sp;
window.petAdopt = function(id){
  const I = T.ITEMS[id], f = fee(I); if ((S.tokens | 0) < f) return T.toast(W2("Not enough Smithbucks.","No tienes suficientes Smithbucks."));
  if (myPets().length >= 8) return T.toast(W2("Your house is full of pets (8 max).","Tu casa está llena de mascotas (máximo 8)."));
  T.coins(-f); T.addItem(id, 1); px(id); T.persist(); W.bumpNeed("social", 10);
  window.petName(id);
};
window.petBuyAcc = function(k){ const w = st(), A = ACC[k]; if (w.acc.includes(k)) return; if ((S.tokens | 0) < A[1]) return T.toast(W2("Not enough Smithbucks.","No tienes suficientes Smithbucks."));
  T.coins(-A[1]); w.acc.push(k); T.persist(); T.toast(`${A[0]} ${L(A[2])} ✓`); T.paintSub(); };
function paintRescue(el, back){
  const fid = featured(), w = st();
  el.innerHTML = `${back}<section class="panel raised wdist"><span class="pbig">🏠</span><div><div class="eyebrow">${W2("Grenadier Pet Rescue","Rescate de mascotas Grenadier")}</div>
      <h2>${W2("Adopt a friend","Adopta un amigo")}</h2><p class="muted">${W2("Every pet here needs a home. Each one has its own personality, and you get to name it. Rarer pets (owls, gators, dragons…) only come from crates and trades.",
        "Cada mascota necesita un hogar. Cada una tiene su personalidad y tú eliges su nombre. Las más raras (búhos, caimanes, dragones…) solo salen de cajas e intercambios.")}</p></div></section>
    <section class="panel"><div class="eyebrow">⭐ ${W2("Today's featured rescue: half price!","Rescate destacado de hoy: ¡mitad de precio!")}</div>
      <div class="tgridi">${adoptable().map(i => { const P = PERS[Object.keys(PERS)[hashN(i.id + me()) % 6]];
        return `<div class="tcardi ${i.id === fid ? "tseason" : ""}">${i.id === fid ? `<i class="tlimit">⭐ ${W2("Featured","Destacado")}</i>` : ""}<span style="font-size:46px">${i.e}</span><b>${E(T.L2(i.name))}</b>
          <small>${P[0]} ${L(P.slice(1))}</small><button class="btn" onclick="petAdopt('${i.id}')">🏠 ${fee(i)}</button></div>`; }).join("")}</div></section>
    <section class="panel"><div class="eyebrow">🎀 ${W2("Pet Boutique","Boutique de mascotas")}</div><div class="tgridi">${Object.entries(ACC).filter(([k, A]) => A[1]).map(([k, A]) =>
      `<div class="tcardi"><span style="font-size:40px">${A[0]}</span><b>${L(A[2])}</b>${w.acc.includes(k) ? `<small>✓ ${W2("Owned","Tuyo")}</small>` : `<button class="btn" onclick="petBuyAcc('${k}')">💵 ${A[1]}</button>`}</div>`).join("")}
      <div class="tcardi"><span style="font-size:40px">🏅</span><b>${L(ACC.collar[2])}</b><small>${w.acc.includes("collar") ? "✓" : W2("Teach a grown pet all 8 tricks","Enseña los 8 trucos a una mascota adulta")}</small></div></div></section>`;
}
W.MORE.places.push({k:"rescue", e:"🐾", l:["Pet Rescue","Rescate de mascotas"], d:["Adopt pets, buy accessories","Adopta mascotas y compra accesorios"]});
W.MORE.views.rescue = paintRescue;

/* ---------------------------------------------------------------- the plaza: buddies walk with their owners */
EXT.pubExtra.push(() => { const w = st(), pets = myPets().map(id => { const p = px(id); return {id, e:T.ITEMS[id].e, n:nameOf(id), a:p.acc || null, t:p.tricks, s:W.w2().pets[id] | 0}; });
  const b = w.buddy && pets.find(p => p.id === w.buddy); return {pets, pet:b || null, petShow:w.show && Date.now() - w.show.at < 8000 ? w.show : null}; });
EXT.personDraw.push((cx, p, sid) => {
  const pub = sid === me() ? null : T.pub[sid]; let b;
  if (sid === me()) { const w = st(); b = w.buddy && myPets().includes(w.buddy) ? {e:T.ITEMS[w.buddy].e, n:nameOf(w.buddy), a:px(w.buddy).acc, s:W.w2().pets[w.buddy] | 0} : null; }
  else b = pub && pub.pet; if (!b) return;
  const sc = stage(b.s | 0)[2], t = performance.now() / 260, hop = Math.abs(Math.sin(t + (sid || "").length)) * (p.moving ? 6 : 2), x = p.x + 34 * (p.face === -1 ? 1 : -1), y = p.y - 4 - hop;
  const show = sid === me() ? st().show : pub && pub.petShow, spin = show && Date.now() - show.at < 3000;
  cx.save(); cx.translate(x, y); if (spin && show.tr === "spin") cx.rotate(performance.now() / 150); if (spin && show.tr === "backflip") cx.rotate(-performance.now() / 120);
  cx.font = `${Math.round(30 * sc)}px sans-serif`; cx.textAlign = "center"; cx.fillText(b.e, 0, 0);
  if (b.a && ACC[b.a]) { cx.font = `${Math.round(15 * sc)}px sans-serif`; cx.fillText(ACC[b.a][0], 6, -22 * sc); } cx.restore();
  cx.font = "800 10px 'Nunito', sans-serif"; cx.textAlign = "center"; cx.fillStyle = "rgba(255,255,255,.9)"; const tw = cx.measureText(b.n).width + 8;
  T.rr(cx, x - tw / 2, p.y + 2, tw, 13, 6); cx.fill(); cx.fillStyle = "#1d1b2e"; cx.fillText(b.n, x, p.y + 12);
});
/* name a pet the first time you see it */
setInterval(() => { if (!SESS() || !T.isTown()) return; const box = document.getElementById("certAsk"); if (!box || !box.classList.contains("hidden")) return;
  const id = myPets().find(i => !px(i).name && !st().asked?.[i]); if (!id) return; const w = st(); w.asked = w.asked || {}; w.asked[id] = 1; T.persist(); nameOf(id); }, 6000);

window.PETS = {px, myPets, petName:nameOf, stage, TRICKS, ACC, PERS, featured, adoptable};
})();
