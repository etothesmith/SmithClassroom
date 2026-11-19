/* =============================================================================
   SMITHTOPIA — notifications (town/notify.js, v2.3)

   Every Town pop-up (hired, a patient waiting, a duel, a trade offer, a fire…)
   also lands in a 🔔 inbox, so nothing is missed. Optional extras, each person's
   own choice: a sound, and notifications on this computer (Chromebook, Windows,
   Mac, phones) that show even when Smith's Classroom is in a background tab.
   They work while the site is open in a tab; a closed browser gets nothing.

   Teacher alerts: when Coach Smith is signed in on this device, every class is
   watched for new job applications, low reviews (1–2★), stories to approve,
   laws to review, mayor candidates, impeachment petitions, Marshal reports and
   court claims, and students joining.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T) return;
const {EXT} = T;
const WLx = (en, es) => (typeof WL === "function" ? WL(en, es) : en);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const KEY = "town.notify";
const ST = (() => { try { return Object.assign({sys:false, sound:true, feed:[], seen:0}, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch(e){ return {sys:false, sound:true, feed:[], seen:0}; } })();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(ST)); } catch(e){} };
/* toasts that are errors or hints, not "something happened" */
const SKIP = /^(Couldn't|Could not|No se pudo|You need|Necesitas|You already|Ya |Not enough|No hay|Write a little|Escribe un poco|Pick |Elige |That has|Eso tiene|Keep it|Que sea|Lost connection|Se perdió|Bought:|Compraste:|Sent to|¡Enviado)/;
const can = () => "Notification" in window;
const perm = () => can() ? Notification.permission : "unsupported";

/* ---------------------------------------------------------------- delivery */
let lastSound = 0, AC = null;
function ding(){
  if (!ST.sound || Date.now() - lastSound < 1500) return; lastSound = Date.now();
  try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); const t = AC.currentTime;
    [[880, 0], [1320, 0.11]].forEach(([f, d]) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(0.18, t + d + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.25);
      o.connect(g); g.connect(AC.destination); o.start(t + d); o.stop(t + d + 0.3); });
  } catch(e){}
}
function device(msg){
  if (!ST.sys || perm() !== "granted") return;
  if (!document.hidden && document.hasFocus()) return; /* they're looking at it already */
  const opts = {body:msg, icon:"assets/app/icon-192.png", badge:"assets/app/icon-192.png", tag:"town-" + Date.now(), renotify:false};
  const plain = () => { try { const n = new Notification("Smithtopia", opts); n.onclick = () => { window.focus(); n.close(); }; } catch(e){} };
  if (navigator.serviceWorker && navigator.serviceWorker.getRegistration) navigator.serviceWorker.getRegistration().then(r => r ? r.showNotification("Smithtopia", opts) : plain()).catch(plain);
  else plain();
}
window.TOWN_NOTE = function(msg){
  msg = String(msg || "").trim(); if (!msg || SKIP.test(msg)) return;
  const top = ST.feed[0]; if (top && top.m === msg && Date.now() - top.at < 5000) return;
  ST.feed.unshift({m:msg.slice(0, 220), at:Date.now()}); ST.feed = ST.feed.slice(0, 60); save();
  ding(); device(msg); paintBell();
};
/* teacher alerts: shown as a toast too (which logs them) */
const alert = msg => T.toast(msg);

/* ---------------------------------------------------------------- the bell */
function paintBell(){
  const on = !!(T.session || (T.net && T.net.teacher && T.net.teacher()));
  let b = document.getElementById("tnBell");
  if (!on) { if (b) b.remove(); return; }
  if (!b) { b = document.createElement("button"); b.id = "tnBell"; b.type = "button"; b.onclick = () => window.tnOpen(); document.body.appendChild(b); }
  const n = ST.feed.filter(x => x.at > ST.seen).length;
  b.title = WLx("Notifications","Notificaciones"); b.setAttribute("aria-label", b.title + (n ? ` (${n})` : ""));
  b.innerHTML = `🔔${n ? `<b>${n > 9 ? "9+" : n}</b>` : ""}`;
}
const ago = t => { const s = (Date.now() - t) / 1000; return s < 60 ? WLx("just now","ahora") : s < 3600 ? `${Math.floor(s / 60)} min` : s < 86400 ? `${Math.floor(s / 3600)} h` : new Date(t).toLocaleDateString(); };
function sheetHTML(){
  const p = perm(), teacher = T.net && T.net.teacher && T.net.teacher();
  return `<div class="eyebrow">🔔 ${WLx("Notifications","Notificaciones")}</div><h2>${WLx("What's happening","Qué está pasando")}</h2>
    <div class="tnset">
      <div><b>💻 ${WLx("Notifications on this computer","Notificaciones en esta computadora")}</b>
        <small>${p === "unsupported" ? WLx("This browser doesn't support them. Your 🔔 inbox still works.","Este navegador no las permite. Tu buzón 🔔 sí funciona.")
          : p === "denied" ? WLx("Blocked. Click the 🔒 next to the web address → Notifications → Allow, then come back.","Bloqueadas. Toca el 🔒 junto a la dirección → Notificaciones → Permitir, y vuelve.")
          : WLx("Pop up even when this tab is in the background, while Smith's Classroom is open.","Aparecen aunque esta pestaña esté en segundo plano, mientras Smith's Classroom esté abierto.")}</small></div>
      ${p === "unsupported" || p === "denied" ? "" : `<button class="btn ${ST.sys && p === "granted" ? "" : "primary"}" onclick="tnSys()">${ST.sys && p === "granted" ? WLx("Turn off","Desactivar") : WLx("Turn on","Activar")}</button>`}
      <div><b>🔊 ${WLx("Sound","Sonido")}</b><small>${WLx("A little ding when something happens.","Un pequeño sonido cuando pasa algo.")}</small></div>
      <button class="btn" onclick="tnSound()">${ST.sound ? WLx("On","Sí") : WLx("Off","No")}</button>
    </div>
    ${teacher ? `<p class="tnote">🧑‍🏫 ${WLx(`Teacher alerts are on for ${TCLS.length === 1 ? "your class" : (TCLS.length || "your") + " classes"}: applications, low reviews, stories to approve, laws, candidates, petitions, the mayor's firings, word-filter requests, reports and new students.`, `Alertas de docente activas en ${TCLS.length === 1 ? "tu clase" : (TCLS.length || "tus") + " clases"}: solicitudes, malas reseñas, noticias, leyes, candidatos, peticiones, reportes y alumnos nuevos.`)}</p>` : ""}
    <div class="tnfeed">${ST.feed.map(x => `<div class="${x.at > ST.seen ? "new" : ""}"><span>${esc(x.m)}</span><small>${ago(x.at)}</small></div>`).join("")
      || `<p class="muted">${WLx("Nothing yet. When you get hired, a patient needs you, someone sends a trade or a duel, it shows up here.","Nada aún. Cuando te contraten, alguien te necesite o te manden un intercambio o un duelo, aparecerá aquí.")}</p>`}</div>
    <div class="eprow">${ST.feed.length ? `<button class="btn ghost" onclick="tnClear()">${WLx("Clear","Borrar")}</button>` : ""}<button class="btn primary" onclick="townCloseCard()">${WLx("Done","Listo")}</button></div>`;
}
function open(){ const box = document.getElementById("certAsk"); if (!box) return; box.classList.remove("hidden");
  box.innerHTML = `<div class="certask tcard" role="dialog" aria-modal="true">${sheetHTML()}</div>`; }
window.tnOpen = function(){ open(); ST.seen = Date.now(); save(); paintBell(); };
window.tnSound = function(){ ST.sound = !ST.sound; save(); if (ST.sound) { lastSound = 0; ding(); } open(); };
window.tnSys = async function(){
  if (ST.sys && perm() === "granted") { ST.sys = false; save(); return open(); }
  let p = perm(); if (p === "default") { try { p = await Notification.requestPermission(); } catch(e){ p = perm(); } }
  ST.sys = p === "granted"; save(); open();
  if (ST.sys) { const r = navigator.serviceWorker && await navigator.serviceWorker.getRegistration().catch(() => null);
    const m = WLx("🔔 Notifications are on. You'll see them even in another tab.","🔔 Notificaciones activadas. Las verás aunque estés en otra pestaña.");
    try { if (r) r.showNotification("Smithtopia", {body:m, icon:"assets/app/icon-192.png"}); else new Notification("Smithtopia", {body:m}); } catch(e){} }
};
window.tnClear = function(){ ST.feed = []; ST.seen = Date.now(); save(); paintBell(); open(); };

/* ---------------------------------------------------------------- student: things with no pop-up of their own */
let SUBS = [];
const stop = () => { SUBS.forEach(u => { try { u(); } catch(e){} }); SUBS = []; };
EXT.onLeave.push(() => { stop(); setTimeout(paintBell, 50); });
EXT.onSession.push(() => {
  stop(); paintBell();
  const N = T.net; if (!N || !N.watchTradesTo) return;
  let wseen = null;
  SUBS.push(N.store.watch(`classes/${T.session.cid}/wordreqs`, {where:[["sid","==",T.session.sid]]}, rows => { if (!rows) return;
    if (wseen) rows.filter(r => r.status !== "open" && wseen[r.id] === "open").forEach(r => T.toast(r.status === "ok"
      ? WLx(`✅ Coach Smith allowed “${r.typed || r.word}”. You can send it now.`, `✅ Coach Smith permitió “${r.typed || r.word}”. Ya puedes enviarlo.`)
      : WLx(`✖ Coach Smith says “${r.typed || r.word}” isn't allowed. Try a different word.`, `✖ Coach Smith dice que “${r.typed || r.word}” no se permite. Usa otra palabra.`)));
    wseen = Object.fromEntries(rows.map(r => [r.id, r.status])); }));
  let seen = null;
  SUBS.push(N.watchTradesTo(rows => { if (!rows) return; const ids = new Set(rows.map(r => r.id));
    if (seen) rows.filter(t => t.status === "offered" && !seen.has(t.id)).slice(0, 2)
      .forEach(t => T.toast(WLx(`🤝 ${t.fromName || "A classmate"} sent you a trade offer. Check Town → Trades.`, `🤝 ${t.fromName || "Un compañero"} te mandó un intercambio. Mira Pueblo → Intercambios.`)));
    seen = ids; }));
});

/* ---------------------------------------------------------------- teacher alerts */
let TCLS = [], TSUBS = [], TUID = null;
const tstop = () => { TSUBS.forEach(u => { try { u(); } catch(e){} }); TSUBS = []; };
const job = j => { const C = T.CAR && T.CAR.CAREERS[j]; return C ? `${C.e} ${S.lang === "es" ? C.title[1] : C.title[0]}` : j; };
/* watch a collection; call fire(row) for every row that's new since the first snapshot (and passes keep) */
function watchNew(cid, col, opts, keep, fire, count){
  let seen = null;
  TSUBS.push(T.net.store.watch(`classes/${cid}/${col}`, opts, rows => { if (!rows) return;
    const ok = rows.filter(keep), ids = new Set(ok.map(r => r.id));
    if (seen) ok.filter(r => !seen.has(r.id)).slice(0, 3).forEach(fire); else if (count) count(ok.length);
    seen = ids; }));
}
async function teacherStart(){
  const N = T.net; const t = N && N.teacher && N.teacher(); const uid = t && t.uid;
  if (uid === TUID) return; TUID = uid; tstop(); TCLS = []; paintBell();
  if (!uid) return;
  try { TCLS = await N.myClasses(); } catch(e){ TCLS = []; }
  const waiting = {apps:0, news:0, laws:0};
  let pending = TCLS.length * 3; const summary = () => { if (--pending) return;
    const parts = [waiting.apps && WLx(`${waiting.apps} job application${waiting.apps > 1 ? "s" : ""}`, `${waiting.apps} solicitud(es)`), waiting.news && WLx(`${waiting.news} stor${waiting.news > 1 ? "ies" : "y"} to approve`, `${waiting.news} noticia(s)`), waiting.laws && WLx(`${waiting.laws} law${waiting.laws > 1 ? "s" : ""} to review`, `${waiting.laws} ley(es)`)].filter(Boolean);
    if (parts.length) T.toast(WLx(`🧑‍🏫 Waiting for you: ${parts.join(", ")}. Teacher panel → each class.`, `🧑‍🏫 Te esperan: ${parts.join(", ")}. Panel docente → cada clase.`)); };
  TCLS.forEach(c => {
    const tag = `[${c.name || c.code}]`, cid = c.id;
    watchNew(cid, "apps", {where:[["status","==","pending"]]}, () => true,
      a => alert(WLx(`📨 ${tag} ${a.name} applied to be ${job(a.job)}.`, `📨 ${tag} ${a.name} pidió el puesto de ${job(a.job)}.`)), n => { waiting.apps += n; summary(); });
    watchNew(cid, "news", {where:[["status","==","review"]]}, () => true,
      n => alert(WLx(`📰 ${tag} ${n.name} turned in a Gazette story to approve: “${n.headline || ""}”`, `📰 ${tag} ${n.name} entregó una noticia: “${n.headline || ""}”`)), n => { waiting.news += n; summary(); });
    watchNew(cid, "proposals", {}, p => p.status === "review" || p.status === "voting",
      p => alert(p.status === "review" ? WLx(`📜 ${tag} ${p.name} proposed a new law to review: “${p.title || p.key}”`, `📜 ${tag} ${p.name} propuso una ley: “${p.title || p.key}”`)
        : WLx(`📜 ${tag} ${p.name} put a law up for a vote.`, `📜 ${tag} ${p.name} sometió una ley a votación.`)), n => { waiting.laws += n; summary(); });
    const W = T.CIV && T.CIV.week ? T.CIV.week() : null; if (W)
    watchNew(cid, "reviews", {where:[["week","==",W]]}, r => (r.stars | 0) <= 2,
      async r => { let nm = (c.staffNames || {})[r.worker];
        if (!nm) { try { const p = await T.net.store.get(`classes/${cid}/pub/${r.worker}`); nm = p && p.name; } catch(e){} }
        nm = nm || WLx("a worker","un trabajador");
        alert(WLx(`⚠️ ${tag} Low review: ${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)} for ${nm} (${job(r.job)})${r.note ? ` · “${r.note}”` : ""}`, `⚠️ ${tag} Mala reseña: ${r.stars}★ para ${nm} (${job(r.job)})${r.note ? ` · “${r.note}”` : ""}`)); });
    watchNew(cid, "candidates", {}, () => true, c2 => alert(WLx(`🗳️ ${tag} ${c2.name} is running for mayor.`, `🗳️ ${tag} ${c2.name} se postuló para alcalde.`)));
    watchNew(cid, "lawvotes", {}, v => /_pet$/.test(v.pid || ""), v => alert(WLx(`⚖️ ${tag} Someone signed an impeachment petition${v.why ? `: ${v.why}` : ""}. See the Hall in the teacher panel.`, `⚖️ ${tag} Alguien firmó una petición de juicio político${v.why ? `: ${v.why}` : ""}.`)));
    watchNew(cid, "cases", {where:[["status","==","open"]]}, k => ["report","claim"].includes(k.kind),
      k => alert(k.kind === "report" ? WLx(`📢 ${tag} ${k.forName || "A student"} filed a report with the Marshal.`, `📢 ${tag} ${k.forName || "Un alumno"} presentó un reporte al alguacil.`)
        : WLx(`📜 ${tag} ${k.forName || "A student"} filed a small-claims case.`, `📜 ${tag} ${k.forName || "Un alumno"} presentó un reclamo.`)));
    watchNew(cid, "firereqs", {}, () => true, f => alert(f.done
      ? WLx(`🏛️ ${tag} Mayor ${f.name} fired ${f.workerName} (${job(f.job)}): “${f.why}”`, `🏛️ ${tag} El alcalde ${f.name} despidió a ${f.workerName} (${job(f.job)}): “${f.why}”`)
      : WLx(`🗂️ ${tag} Mayor ${f.name} asks you to fire ${f.workerName} (${job(f.job)}): “${f.why}” Teacher panel → Mayor.`, `🗂️ ${tag} El alcalde ${f.name} pide despedir a ${f.workerName} (${job(f.job)}): “${f.why}”`)));
    watchNew(cid, "wordreqs", {where:[["status","==","open"]]}, () => true,
      w => alert(WLx(`🔤 ${tag} ${w.name} says “${w.typed || w.word}” isn't a bad word (${w.where}). Teacher panel → Word filter.`, `🔤 ${tag} ${w.name} dice que “${w.typed || w.word}” no es mala palabra (${w.where}).`)));
    watchNew(cid, "suits", {where:[["status","==","filed"]]}, () => true, s => alert(WLx(`⚖️ ${tag} ${s.aName} is suing ${s.bName} for 💵${s.amt}: “${s.why}”`, `⚖️ ${tag} ${s.aName} demanda a ${s.bName} por 💵${s.amt}: “${s.why}”`)));
    watchNew(cid, "jail", {}, j => j.until > Date.now(), j => alert(WLx(`🚓 ${tag} ${j.name} is in jail: ${j.why}${j.byName ? ` (by ${j.byName})` : ""}.`, `🚓 ${tag} ${j.name} está en la cárcel: ${j.why}.`)));
    watchNew(cid, "breakins", {}, () => true, b => alert(WLx(`🔓 ${tag} ${b.byName} ${b.ok ? `broke into ${b.toName}'s house (💵${b.take})` : `was caught breaking into ${b.toName}'s house`}.`, `🔓 ${tag} ${b.byName} ${b.ok ? `entró a la casa de ${b.toName}` : `fue atrapado allanando`}.`)));
    watchNew(cid, "students", {}, () => true, s => alert(WLx(`👋 ${tag} ${s.name || "A new student"} joined the town.`, `👋 ${tag} ${s.name || "Un alumno nuevo"} se unió al pueblo.`)));
  });
}
/* sign-in can change at any time: check every few seconds */
setInterval(() => { try { paintBell(); if (T.net) teacherStart(); } catch(e){ console.warn("notify", e); } }, 4000);
setTimeout(() => { try { paintBell(); if (T.net) teacherStart(); } catch(e){} }, 1500);
/* ---------------------------------------------------------------- teacher: word-filter requests */
window.tnWord = async function(id, ok){
  const cid = T.adminCid, st = T.net.store, r = await st.get(`classes/${cid}/wordreqs/${id}`); if (!r) return;
  if (ok) { const c = (await T.net.myClasses()).find(x => x.id === cid); const list = [...new Set([...((c && c.allowWords) || []), r.word])].slice(-300); T.adminSet({allowWords:list}); }
  await st.update(`classes/${cid}/wordreqs/${id}`, {status:ok ? "ok" : "no", decidedAt:Date.now()}); T.paintAdmin();
};
window.tnUnallow = function(w){ T.net.myClasses().then(list => { const k = list.find(x => x.id === T.adminCid); if (!k) return;
  T.adminSet({allowWords:(k.allowWords || []).filter(x => x !== w)}); setTimeout(T.paintAdmin, 300); }); };
EXT.adminPanels.push({
  html: c => `<section class="panel tadm"><div class="eyebrow">🔤 ${WLx("Word filter","Filtro de palabras")}</div>
    <p class="muted" style="font-size:13px">${WLx("When the filter blocks a word, students see it in red and can ask you to allow it. Allowed words work for the whole class.","Cuando el filtro bloquea una palabra, el alumno la ve en rojo y puede pedirte que la permitas. Las palabras permitidas valen para toda la clase.")}</p>
    <div id="aWords"></div>${(c.allowWords || []).length ? `<p style="margin:8px 0 0"><b>${WLx("Allowed","Permitidas")}:</b> ${(c.allowWords || []).map(w => `<span class="kst">${esc(w)} <button class="btn ghost" title="${WLx("Block again","Bloquear otra vez")}" onclick="tnUnallow('${esc(w)}')">✖</button></span>`).join(" ")}</p>` : ""}</section>`,
  after: c => { T.net.store.list(`classes/${c.id}/wordreqs`, {where:[["status","==","open"]]}).then(rows => { const b = document.getElementById("aWords"); if (!b) return;
    b.innerHTML = rows.sort((x, y) => y.at - x.at).map(r => `<div class="myrapp"><b>${esc(r.name)}</b> ${WLx("asks to allow","pide permitir")} <mark class="badw">${esc(r.typed || r.word)}</mark> <small class="muted">${esc(r.where || "")}</small>
      <p class="muted">“${esc(r.text || "")}”</p><div class="eprow"><button class="btn primary" onclick="tnWord('${r.id}',true)">✅ ${WLx("Allow it","Permitir")}</button><button class="btn ghost" onclick="tnWord('${r.id}',false)">✖ ${WLx("Keep it blocked","Mantener bloqueada")}</button></div></div>`).join("")
      || `<p class="muted">${WLx("No requests.","No hay solicitudes.")}</p>`; }).catch(() => {}); }
});
window.TNOTIFY = {state:ST, open:window.tnOpen};
})();
