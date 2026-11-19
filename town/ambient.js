/* =============================================================================
   GRENADIER TOWN — a living, learning town (town/ambient.js)
   Motion and life on the plaza. Almost everything that moves can be tapped,
   and every tap is a quick bit of class content.
   - Townsfolk walk the sidewalk (shoppers, a skater, a dog walker, a jogger,
     a cyclist). Now and then one says a fact from your units in a speech
     bubble. Tap one for a pop quiz (+1 Smithbuck, 8 a day).
   - The quest townspeople (Coach Smith, Ms. Pinkerton, Newsy Ned) stroll
     around instead of standing still.
   - Fountain of Knowledge: tap the fountain and answer a question to make a
     wish (3 a day): Smithbucks, a crate, or a boost to your needs.
   - Daily Brain Teaser chalkboard: one question for the whole class each day
     (+3 the first time you get it right).
   - The golden Grenadier bird flies over every few minutes. Catch it while
     it's on screen for a double-reward bonus question.
   - Ambient life: birds, butterflies by day, fireflies at night, drifting
     cloud shadows, fountain sparkles, footstep dust, and pets wandering
     inside houses.
   - Optional town sounds (birds, the fountain, rain), synthesized in the
     browser and off by default.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN, W = window.WORLD2; if (!T || !T.CIV || !W) return;
const {EXT} = T, V = T.CIV, {sheet, closeSheet, day, hashN, E, W2, SESS} = V;
const L = a => S.lang === "es" ? a[1] : a[0];
const me = () => SESS() && SESS().sid;
const now = () => performance.now();
let last = now(), DT = 0.016;
function tick(){ const t = now(); DT = Math.min(0.1, (t - last) / 1000); last = t; }
function st(){ const w = W.w2(); w.amb = w.amb && w.amb.d === day() ? w.amb : {d:day(), quiz:0, wish:0, teaser:0, bird:0}; return w.amb; }

/* ---------------------------------------------------------------- facts from the student's classes */
function fact(){
  const q = W.pickQ(); if (!q || !q.why) return null;
  let t = T.L2(q.why).replace(/\s+/g, " ").trim(); const cut = t.search(/[.!?](\s|$)/); if (cut > 20) t = t.slice(0, cut + 1);
  return t.length > 90 ? t.slice(0, 87) + "…" : t;
}
function bubble(cx, x, y, text){
  cx.font = "700 12px 'Nunito', sans-serif"; const words = text.split(" "), lines = []; let line = "";
  words.forEach(w => { if (cx.measureText(line + " " + w).width > 190) { lines.push(line); line = w; } else line = line ? line + " " + w : w; }); if (line) lines.push(line);
  const h = lines.length * 15 + 10, wd = Math.max(...lines.map(l => cx.measureText(l).width)) + 18, bx = Math.max(6, Math.min(954 - wd, x - wd / 2));
  cx.fillStyle = "rgba(255,255,255,.96)"; cx.strokeStyle = "#1d1b2e"; cx.lineWidth = 2; T.rr(cx, bx, y - h, wd, h, 10); cx.fill(); cx.stroke();
  cx.beginPath(); cx.moveTo(x - 6, y); cx.lineTo(x, y + 8); cx.lineTo(x + 6, y); cx.fill();
  cx.fillStyle = "#1d1b2e"; cx.textAlign = "left"; lines.forEach((l, i) => cx.fillText(l, bx + 9, y - h + 18 + i * 15));
}

/* ---------------------------------------------------------------- townsfolk on the sidewalk */
const FOLK = [["🚶","walker",38],["🚶‍♀️","walker",36],["🛹","skater",90],["🏃","jogger",80],["🚴","cyclist",110],["👩‍🦽","roller",50],["🧑‍🍼","stroller",32],["🐕","dog",60]];
const LANE = {y0:186, y1:206, x0:250, x1:700};          /* the sidewalk in front of the shops */
let walkers = [];
function spawn(){ const f = FOLK[Math.floor(Math.random() * FOLK.length)], dir = Math.random() < 0.5 ? 1 : -1;
  walkers.push({e:f[0], v:f[2] * dir * (0.8 + Math.random() * 0.4), x:dir > 0 ? LANE.x0 - 20 : LANE.x1 + 20, y:LANE.y0 + Math.random() * (LANE.y1 - LANE.y0), say:null, sayUntil:0, ph:Math.random() * 6}); }
function drawFolk(cx){
  if (Math.random() < DT * 0.35 && walkers.length < 5) spawn();
  walkers.forEach(w => { w.x += w.v * DT;
    if (!w.say && Math.random() < DT * 0.05 && !walkers.some(o => o.say)) { const f = fact(); if (f) { w.say = f; w.sayUntil = now() + 6500; } }
    if (w.say && now() > w.sayUntil) w.say = null; });
  walkers = walkers.filter(w => w.x > LANE.x0 - 40 && w.x < LANE.x1 + 40);
  walkers.forEach(w => { const bob = Math.abs(Math.sin(now() / 140 + w.ph)) * 2.5; cx.save(); cx.translate(w.x, w.y - bob); if (w.v > 0) cx.scale(-1, 1);
    cx.font = "26px sans-serif"; cx.textAlign = "center"; cx.fillText(w.e, 0, 0); cx.restore();
  });
}
function drawFolkTalk(cx){ walkers.forEach(w => { if (w.say) bubble(cx, w.x, w.y - 30, "💡 " + w.say); }); }

/* ---------------------------------------------------------------- the quest townspeople stroll */
const ROUTES = {coach:[[420,430],[500,470],[380,480],[460,420]], pinkerton:[[260,470],[320,500],[280,440]], ned:[[760,440],[840,470],[700,480],[800,420]]};
const NPCST = {};
function moveNpcs(){
  Object.entries(ROUTES).forEach(([id, pts]) => { const N = W.NPCS[id]; if (!N || !N.at) return;
    const s = NPCST[id] = NPCST[id] || {i:1, wait:0.3 + Math.random() * 0.7};
    if (s.wait > 0) { s.wait -= DT; return; }
    const [tx, ty] = pts[s.i], dx = tx - N.at[0], dy = ty - N.at[1], d = Math.hypot(dx, dy);
    if (d < 2) { s.i = (s.i + 1) % pts.length; s.wait = 2 + Math.random() * 3; return; }
    const sp = 28 * DT; N.at[0] += dx / d * Math.min(sp, d); N.at[1] += dy / d * Math.min(sp, d); });
}

/* ---------------------------------------------------------------- ambient life */
const FOUNT = {x:585, y:368};
let sparks = [], dust = [], birds = [], flies = [], golden = null, nextGold = now() + 60e3 + Math.random() * 120e3;
function sky(){ return window.TODAY ? TODAY.SKY().k : "day"; }
function wx(){ return window.TODAY ? TODAY.weather() : "sunny"; }
function drawLife(cx){
  const t = now(), night = sky() === "night" || sky() === "dusk", wet = wx() === "rain" || wx() === "storm";
  /* cloud shadows drift across on dry days */
  if (!night && !wet) { cx.fillStyle = "rgba(20,30,60,.06)"; [0, 1].forEach(i => { const x = ((t / 90 + i * 520) % 1400) - 220; cx.beginPath(); cx.ellipse(x, 300 + i * 120, 170, 46, 0, 0, Math.PI * 2); cx.fill(); }); }
  /* fountain spray */
  if (Math.random() < 0.7) sparks.push({x:FOUNT.x + (Math.random() - 0.5) * 6, y:FOUNT.y - 12, vx:(Math.random() - 0.5) * 30, vy:-50 - Math.random() * 30, life:1});
  sparks.forEach(p => { p.x += p.vx * DT; p.y += p.vy * DT; p.vy += 120 * DT; p.life -= DT * 1.3; });
  sparks = sparks.filter(p => p.life > 0 && p.y < FOUNT.y + 14);
  cx.fillStyle = "rgba(190,235,255,.85)"; sparks.forEach(p => { cx.globalAlpha = Math.max(0, p.life); cx.fillRect(p.x, p.y, 2.5, 2.5); }); cx.globalAlpha = 1;
  /* birds overhead by day, fireflies at night, butterflies near the plants */
  if (!night && !wet && Math.random() < DT * 0.08 && birds.length < 3) birds.push({x:-20, y:30 + Math.random() * 90, v:60 + Math.random() * 40, ph:Math.random() * 6});
  birds.forEach(b => { b.x += b.v * DT; }); birds = birds.filter(b => b.x < 990);
  cx.font = "18px sans-serif"; cx.textAlign = "center"; birds.forEach(b => { cx.save(); cx.translate(b.x, b.y + Math.sin(t / 300 + b.ph) * 6); cx.scale(-1, 1 - Math.abs(Math.sin(t / 120 + b.ph)) * 0.35); cx.fillText("🐦", 0, 0); cx.restore(); });
  if (!flies.length) flies = Array.from({length:6}, (_, i) => ({x:250 + i * 120, y:300 + (i % 3) * 70, ph:i}));
  flies.forEach(f => { f.x += Math.sin(t / 900 + f.ph) * 20 * DT; f.y += Math.cos(t / 700 + f.ph * 2) * 14 * DT; });
  if (night) flies.forEach(f => { const a = 0.4 + 0.6 * Math.abs(Math.sin(t / 400 + f.ph)); cx.fillStyle = `rgba(255,240,140,${a})`; cx.beginPath(); cx.arc(f.x, f.y, 3, 0, Math.PI * 2); cx.fill(); });
  else if (!wet) { cx.font = "16px sans-serif"; flies.slice(0, 2).forEach(f => cx.fillText("🦋", 200 + (f.x % 120), 250 + (f.y % 200))); }
  /* footstep dust */
  dust.forEach(d => { d.r += 18 * DT; d.life -= DT * 2; }); dust = dust.filter(d => d.life > 0);
  dust.forEach(d => { cx.fillStyle = `rgba(160,110,80,${d.life * 0.35})`; cx.beginPath(); cx.arc(d.x, d.y, d.r, 0, Math.PI * 2); cx.fill(); });
  /* the golden Grenadier bird */
  if (!golden && t > nextGold && SESS()) golden = {x:-30, y:90 + Math.random() * 120, v:70};
  if (golden) { golden.x += golden.v * DT; const gy = golden.y + Math.sin(t / 250) * 10;
    cx.save(); cx.shadowColor = "#FFD34D"; cx.shadowBlur = 18; cx.font = "30px sans-serif"; cx.translate(golden.x, gy); cx.scale(-1, 1); cx.fillText("🐤", 0, 0); cx.restore();
    cx.fillStyle = "rgba(255,215,80,.9)"; for (let i = 1; i < 5; i++) cx.fillRect(golden.x - i * 9, gy - 8 + Math.sin(t / 90 + i) * 3, 3, 3);
    golden.gy = gy; if (golden.x > 990) { golden = null; nextGold = t + 150e3 + Math.random() * 120e3; } }
}
EXT.personDraw.push((cx, p) => { if (p.moving && Math.random() < 0.35) dust.push({x:p.x + (Math.random() - 0.5) * 14, y:p.y - 2, r:2, life:1}); });

/* ---------------------------------------------------------------- the Daily Brain Teaser chalkboard */
const BOARD = {x:640, y:318};
function teaserQ(){ const q = (() => { const all = []; (typeof allPacks === "function" ? allPacks() : []).forEach(p => p.units.forEach(u => u.items.forEach(it => { if (it.type === "mcq" && it.diff >= 2 && it.c && it.c.en && it.c.en.length >= 3) all.push(it); }))); return all[hashN(day() + ":teaser") % Math.max(1, all.length)]; })(); return q; }
function drawBoard(cx){
  const done = st().teaser; cx.save(); cx.translate(BOARD.x, BOARD.y);
  cx.fillStyle = "#6B4B2E"; cx.fillRect(-3, 0, 6, 24); cx.fillRect(-28, 18, 4, 10); cx.fillRect(24, 18, 4, 10);
  cx.fillStyle = "#2E4A3A"; cx.strokeStyle = "#6B4B2E"; cx.lineWidth = 4; T.rr(cx, -46, -40, 92, 46, 6); cx.fill(); cx.stroke();
  cx.fillStyle = "#fff"; cx.font = "800 11px 'Nunito', sans-serif"; cx.textAlign = "center";
  cx.fillText(done ? "✅ " + W2("Solved!","¡Resuelto!") : "🧠 " + W2("Brain Teaser","Reto del día"), 0, -22); cx.fillText(done ? W2("New one tomorrow","Otro mañana") : W2("Tap to try","Toca para jugar"), 0, -8);
  cx.restore();
}
function playTeaser(){
  const s = st(); if (s.teaser) return T.toast(W2("You solved today's Brain Teaser. A new one appears tomorrow!","Ya resolviste el reto de hoy. ¡Mañana hay otro!"));
  const q = teaserQ(); if (!q) return;
  const opts = q.c[S.lang === "es" && q.c.es ? "es" : "en"], order = [...opts.keys()].sort(() => Math.random() - 0.5);
  window._tz = {q, order};
  sheet(`<div class="eyebrow">🧠 ${W2("Daily Brain Teaser","Reto del día")} · ${W2("same question for the whole class","la misma pregunta para toda la clase")}</div>
    <h2 style="font-size:19px">${E(T.L2(q.q))}</h2><div class="cqopts">${order.map((i, k) => `<button class="btn" onclick="ambTeaser(${k})">${E(opts[i])}</button>`).join("")}</div><p id="tzWhy"></p>`);
}
window.ambTeaser = function(k){ const z = window._tz; if (!z || z.done) return; z.done = true; const ok = z.order[k] === z.q.a, s = st();
  document.querySelectorAll(".cqopts button").forEach((b, i) => { b.disabled = true; if (z.order[i] === z.q.a) b.classList.add("primary"); });
  if (ok) { s.teaser = 1; T.coins(3); W.bumpNeed("know", 10); T.persist(); }
  document.getElementById("tzWhy").innerHTML = `<b>${ok ? W2("Correct! +3 Smithbucks","¡Correcto! +3 Smithbucks") : W2("Not this time. Study and try again later today!","Esta vez no. ¡Estudia y vuelve a intentarlo hoy!")}</b> ${z.q.why ? E(T.L2(z.q.why)) : ""}
    <br><button class="btn primary wide" style="margin-top:10px" onclick="townCloseCard()">OK</button>`;
  if (!ok) setTimeout(() => { window._tz = null; }, 100); };

/* ---------------------------------------------------------------- taps: townsfolk quiz, fountain wishes, golden bird, chalkboard */
const WISHES = [["💵","coins"],["🎁","crate"],["⚡","energy"],["🎈","fun"],["💵","coins"],["🧠","know"]];
EXT.plazaTap.push((x, y) => {
  if (!SESS()) return false;
  if (golden && Math.abs(golden.x - x) < 34 && Math.abs((golden.gy || golden.y) - 10 - y) < 34) {
    golden = null; nextGold = now() + 150e3 + Math.random() * 120e3; const s = st();
    if (s.bird >= 3) { T.toast(W2("The golden bird winks at you. (3 catches a day)","El pájaro dorado te guiña. (3 al día)")); return true; }
    W.ask({title:W2("You caught the golden Grenadier bird!","¡Atrapaste al pájaro dorado!"), e:"🐤", sub:W2("Answer right for a double reward.","Responde bien para un premio doble.")}, ok => {
      closeSheet(); s.bird++; if (ok) { T.coins(4); W.bumpNeed("fun", 15); T.toast(W2("🐤✨ Golden answer! +4 Smithbucks","🐤✨ ¡Respuesta dorada! +4 Smithbucks")); }
      else T.toast(W2("The bird flew off. Next time!","El pájaro se fue. ¡La próxima!")); T.persist(); });
    return true;
  }
  if (Math.abs(x - BOARD.x) < 50 && y > BOARD.y - 44 && y < BOARD.y + 28) { playTeaser(); return true; }
  if (Math.hypot(x - FOUNT.x, (y - FOUNT.y) * 1.8) < 48) {
    const s = st(); if (s.wish >= 3) { T.toast(W2("The fountain is out of wishes today. Come back tomorrow!","La fuente ya no concede deseos hoy. ¡Vuelve mañana!")); return true; }
    W.ask({title:W2("Fountain of Knowledge","Fuente del Saber"), e:"⛲", sub:W2(`Answer right and make a wish (${3 - s.wish} left today)`, `Responde bien y pide un deseo (quedan ${3 - s.wish} hoy)`)}, ok => {
      closeSheet(); s.wish++;
      if (!ok) { T.toast(W2("💧 Splash! The fountain wants a right answer. Try again later.","💧 ¡Plop! La fuente quiere una respuesta correcta.")); T.persist(); return; }
      const [e, k] = WISHES[Math.floor(Math.random() * WISHES.length)];
      if (k === "coins") { T.coins(3); T.toast(`${e} ${W2("Wish granted: +3 Smithbucks!","Deseo concedido: ¡+3 Smithbucks!")}`); }
      else if (k === "crate") { T.town().crates++; T.toast(`${e} ${W2("Wish granted: a crate!","Deseo concedido: ¡una caja!")}`); }
      else { W.bumpNeed(k, 30); T.toast(`${e} ${W2("Wish granted: +30","Deseo concedido: +30")} ${k === "energy" ? "⚡" : k === "fun" ? "🎈" : "🧠"}`); }
      T.persist(); });
    return true;
  }
  const w = walkers.find(w => Math.abs(w.x - x) < 22 && y > w.y - 36 && y < w.y + 6);
  if (w) { const s = st();
    if (s.quiz >= 8) { T.toast(`${w.e} ${W2("“Have a great day!” (8 pop quizzes a day)","“¡Que tengas buen día!” (8 al día)")}`); return true; }
    w.v *= 0.15; W.ask({title:W2("A townsperson stops you for a pop quiz!","¡Un vecino te detiene para un examen sorpresa!"), e:w.e}, ok => {
      closeSheet(); s.quiz++; w.v *= 6; if (ok) { T.coins(1); W.bumpNeed("social", 5); T.toast(`${w.e} ${W2("“Nice! You know your stuff.” +1 Smithbuck","“¡Bien! Sabes mucho.” +1 Smithbuck")}`); }
      else T.toast(`${w.e} ${W2("“Close! Look it up later.”","“¡Casi! Repásalo después.”")}`); T.persist(); });
    return true; }
  return false;
});
EXT.plazaBack.push(cx => { tick(); moveNpcs(); drawFolk(cx); drawBoard(cx); });
EXT.plazaFront.push(cx => { drawLife(cx); drawFolkTalk(cx); });

/* ---------------------------------------------------------------- pets wander inside houses */
EXT.houseExtra.push({html: sid => {
  setTimeout(() => {
    const room = document.querySelector(".troom"); if (!room || room.querySelector(".rpets")) return;
    let pets = [];
    if (sid === me() && window.PETS) pets = PETS.myPets().slice(0, 3).map(id => ({e:T.ITEMS[id].e, n:PETS.petName(id), a:PETS.px(id).acc}));
    else { const p = T.pub[sid]; pets = ((p && p.pets) || []).slice(0, 3).map(x => ({e:x.e, n:x.n, a:x.a})); }
    if (!pets.length) return; const box = document.createElement("div"); box.className = "rpets";
    box.innerHTML = pets.map((p, i) => `<div class="rpet" style="--d:${14 + i * 5}s;--b:${8 + i * 5}%;--del:-${i * 3}s"><span>${p.e}${p.a && window.PETS && PETS.ACC[p.a] ? `<i>${PETS.ACC[p.a][0]}</i>` : ""}</span><small>${E(p.n)}</small></div>`).join("");
    room.appendChild(box);
  }, 30); return ""; }});

/* ---------------------------------------------------------------- town sounds (synthesized, off by default) */
let AC = null, nodes = [], sndOn = false;
try { sndOn = localStorage.getItem("town.sounds") === "1"; } catch(e){}
function noise(ac){ const b = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const s = ac.createBufferSource(); s.buffer = b; s.loop = true; return s; }
function startSound(){
  if (AC) return; try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){ return; }
  const g = AC.createGain(); g.gain.value = 0.05; g.connect(AC.destination);
  const n = noise(AC), f = AC.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 1800; f.Q.value = 0.6; n.connect(f); f.connect(g); n.start(); nodes.push(n);
  const chirp = () => { if (!AC || !T.isTown() || T.tt !== "plaza") return; const n2 = sky() === "night" ? "night" : "day"; if (n2 === "night" || wx() === "storm") return;
    const o = AC.createOscillator(), og = AC.createGain(), t0 = AC.currentTime; o.type = "sine"; o.frequency.setValueAtTime(2600 + Math.random() * 1200, t0);
    o.frequency.exponentialRampToValueAtTime(3800 + Math.random() * 900, t0 + 0.08); og.gain.setValueAtTime(0.0001, t0); og.gain.exponentialRampToValueAtTime(0.05, t0 + 0.02); og.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
    o.connect(og); og.connect(AC.destination); o.start(t0); o.stop(t0 + 0.16); };
  nodes.push({stop:(() => { const iv = setInterval(() => { if (Math.random() < 0.5) { chirp(); setTimeout(chirp, 160); } }, 1700); return () => clearInterval(iv); })()});
  const rainG = AC.createGain(); rainG.gain.value = 0; rainG.connect(AC.destination); const rn = noise(AC), rf = AC.createBiquadFilter(); rf.type = "lowpass"; rf.frequency.value = 900; rn.connect(rf); rf.connect(rainG); rn.start(); nodes.push(rn);
  const rv = setInterval(() => { if (AC) rainG.gain.value = (wx() === "rain" || wx() === "storm") && T.tt === "plaza" ? 0.08 : 0; g.gain.value = T.isTown() && T.tt === "plaza" ? 0.05 : 0; }, 1000);
  nodes.push({stop:() => clearInterval(rv)});
}
function stopSound(){ nodes.forEach(n => { try { typeof n.stop === "function" && n.stop(); } catch(e){} }); nodes = []; if (AC) { try { AC.close(); } catch(e){} } AC = null; }
window.ambSound = function(){ sndOn = !sndOn; try { localStorage.setItem("town.sounds", sndOn ? "1" : "0"); } catch(e){} if (sndOn) startSound(); else stopSound(); T.paintSub(); };
EXT.banner.push(() => SESS() && T.tt === "plaza" ? `<section class="panel amb"><span>🧠 ${W2("Tap the townsfolk, the fountain, the chalkboard and the golden bird to learn and earn.","Toca a los vecinos, la fuente, el pizarrón y el pájaro dorado para aprender y ganar.")}</span>
  <small>${W2(`Pop quizzes ${st().quiz}/8 · Wishes ${st().wish}/3 · Teaser ${st().teaser ? "✅" : "⬜"}`, `Exámenes ${st().quiz}/8 · Deseos ${st().wish}/3 · Reto ${st().teaser ? "✅" : "⬜"}`)}</small>
  <button class="btn ghost" onclick="ambSound()">${sndOn ? "🔊" : "🔈"} ${W2("Town sounds","Sonidos")}</button></section>` : "");
document.addEventListener("pointerdown", () => { if (sndOn && !AC) startSound(); }, {once:false, passive:true});

window.AMBIENT = {get walkers(){ return walkers; }, spawn, FOUNT, BOARD, st, get golden(){ return golden; }, set golden(v){ golden = v; }, fact, teaserQ};
})();
