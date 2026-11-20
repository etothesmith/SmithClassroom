/* =============================================================================
   SMITHTOPIA — the mayor runs city hall (town/mayor.js)
   Loads after town/careers.js and uses its helpers (TOWN.CAR).

   1. City jobs: the mayor reads applications for the 6 public jobs (firefighter,
      marshal, sanitation, park ranger, builder, mail carrier) and hires, turns
      down and fires on their own. Every hire and firing goes on the public record.
      Private-sector jobs and the independent ones (reporter, judge) stay with the
      teacher: a lesson in checks and balances and a free press.
   2. Firing requests: the mayor can ask Coach Smith to fire anyone in any job,
      with a reason. Only the teacher decides; the mayor hears back.
   3. More duties: a daily checklist (applications, workers who stopped showing up
      or have low reviews, town requests, an executive action) and a weekly
      State of the Town address everyone sees.
   Firestore: classes/{cid} staff (public seats only), apps, firereqs, mayoracts.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T || !T.CIV || !T.CAR) return;
const {EXT} = T, V = T.CIV, R = T.CAR;
const {sheet, closeSheet, cleanText, day, week, E, W2, C, store, SESS, CLS} = V;
const L = a => S.lang === "es" ? a[1] : a[0];
const me = () => SESS() && SESS().sid;
const J = j => R.CAREERS[j];
const jt = j => J(j) ? `${J(j).e} ${L(J(j).title)}` : j;
const pub = j => R.PUBLIC.includes(j);
const holderOf = sid => Object.keys(R.CAREERS).find(k => (R.staff()[k] || []).includes(sid)) || null;
const nameOf = sid => R.staffNames()[sid] || (T.pub[sid] && T.pub[sid].name) || "?";

let APPS = [], FREQS = [], WACTS = [], REVS = [], SUBS = [];
const stop = () => { SUBS.forEach(u => { try { u(); } catch(e){} }); SUBS = []; };
const redraw = () => { if (T.isTown() && T.tt === "downtown" && window._carDraw) window._carDraw(); };

/* ---------------------------------------------------------------- data */
function watchAll(){
  stop(); if (!SESS()) return;
  /* everyone: this week's address and the public record */
  SUBS.push(store().watch(`${C()}/mayoracts`, {where:[["week","==",week()]]}, rows => { if (rows) { WACTS = rows.filter(a => a.kind === "address" || a.kind === "staffing"); redraw(); } }));
  if (!R.isMayor()) return;
  SUBS.push(store().watch(`${C()}/apps`, {where:[["status","==","pending"]]}, rows => { if (rows) { APPS = rows.filter(a => pub(a.job)); redraw(); } }));
  let seen = null;
  SUBS.push(store().watch(`${C()}/firereqs`, {where:[["sid","==",me()]]}, rows => { if (!rows) return; FREQS = rows.sort((a, b) => b.at - a.at);
    if (seen) rows.filter(r => r.status !== "open" && seen[r.id] === "open").forEach(r => T.toast(r.status === "fired"
      ? W2(`🗂️ Coach Smith agreed: ${r.workerName} is no longer ${L(J(r.job).title)}.`, `🗂️ Coach Smith aceptó: ${r.workerName} ya no es ${L(J(r.job).title)}.`)
      : W2(`🗂️ Coach Smith decided to keep ${r.workerName} as ${L(J(r.job).title)}.`, `🗂️ Coach Smith decidió mantener a ${r.workerName}.`)));
    seen = Object.fromEntries(rows.map(r => [r.id, r.status])); redraw(); }));
  store().list(`${C()}/reviews`, {where:[["week","==",week()]]}).then(rows => { REVS = rows || []; redraw(); }).catch(() => {});
}
EXT.onSession.push(() => setTimeout(watchAll, 700));
EXT.onLeave.push(stop);
let wasMayor = null;
EXT.onClass.push(() => { if (!SESS()) return; const m = R.isMayor(); if (m !== wasMayor) { wasMayor = m; watchAll(); } });

/* how a worker is doing: shifts, last day worked, this week's reviews */
function perf(sid){
  const pc = T.pub[sid] && T.pub[sid].career, last = pc && pc.last;
  const days = last ? Math.floor((Date.now() - new Date(last + "T12:00").getTime()) / 864e5) : 99;
  const rv = REVS.filter(r => r.worker === sid), avg = rv.length ? rv.reduce((a, r) => a + r.stars, 0) / rv.length : 0;
  return {shifts:pc ? pc.shifts | 0 : 0, lvl:pc ? pc.lvl : "", days, avg, n:rv.length, flag:days >= 3 || (rv.length >= 2 && avg < 3)};
}

/* ---------------------------------------------------------------- hiring and firing (city jobs) */
async function setSeats(job, list, names){
  const c = CLS(), staff = {...(c.staff || {})}; staff[job] = list;
  await store().update(C(), {staff, staffNames:{...(c.staffNames || {}), ...(names || {})}});
}
async function record(text, arg, job, who){
  try { await store().add(`${C()}/mayoracts`, {sid:me(), uid:store().uid(), name:SESS().name, kind:"staffing", arg, job, who, text:text.slice(0, 280), day:day(), week:week(), at:Date.now()}); } catch(e){ console.warn("mayor record", e); }
}
window.myrHire = async function(aid){
  const a = APPS.find(x => x.id === aid); if (!a || !R.isMayor()) return;
  if (a.sid === me()) return T.toast(W2("You can't hire yourself. That's a conflict of interest!","No puedes contratarte a ti mismo: ¡conflicto de interés!"));
  const now = holderOf(a.sid);
  if (now && !pub(now)) return T.toast(W2(`${a.name} already works as ${L(J(now).title)}. Coach Smith has to move them.`, `${a.name} ya trabaja como ${L(J(now).title)}. Coach Smith debe cambiarlo.`));
  const list = (R.staff()[a.job] || []).filter(Boolean);
  if (list.length >= J(a.job).seats) return T.toast(W2(`${L(J(a.job).title)} is full. Fire someone first, or wait for a seat.`, `El puesto está lleno. Despide a alguien primero.`));
  try {
    await store().update(`${C()}/apps/${aid}`, {status:"hired", decidedAt:Date.now(), decidedBy:"mayor"});
    await record(`${a.name} → ${L(J(a.job).title)}`, "hire", a.job, a.sid);
    if (now && now !== a.job) await setSeats(now, (R.staff()[now] || []).filter(x => x !== a.sid));
    await setSeats(a.job, [...list, a.sid], {[a.sid]:a.name});
    T.toast(W2(`✅ You hired ${a.name} as ${L(J(a.job).title)}.`, `✅ Contrataste a ${a.name} como ${L(J(a.job).title)}.`));
  } catch(e){ console.warn(e); T.toast(W2("Couldn't hire right now.","No se pudo contratar.")); }
};
window.myrDeny = async function(aid){
  const a = APPS.find(x => x.id === aid); if (!a) return;
  try { await store().update(`${C()}/apps/${aid}`, {status:"denied", decidedAt:Date.now(), decidedBy:"mayor"}); T.toast(W2("Application turned down.","Solicitud rechazada.")); } catch(e){ T.toast(W2("Couldn't do that right now.","No se pudo ahora.")); }
};
window.myrFire = function(job, sid){
  if (!R.isMayor() || !pub(job)) return;
  sheet(`<div class="eyebrow">🏛️ ${W2("Fire a city worker","Despedir a un trabajador municipal")}</div><h2>${E(nameOf(sid))}</h2><p class="muted" style="margin-top:0">${jt(job)}</p>
    <p>${W2("Firing should be fair and have a real reason. The reason stays between you and Coach Smith; the public record only shows that the seat opened.","Despedir debe ser justo y tener una razón real. La razón queda entre tú y Coach Smith; el registro público solo muestra que el puesto se abrió.")}</p>
    <label class="cform">${W2("Why? (at least a sentence)","¿Por qué? (al menos una oración)")}<textarea id="myrWhy" maxlength="240" rows="3"></textarea></label><p id="myrErr" class="terr"></p>
    <button class="btn primary wide" onclick="myrFireGo('${job}','${sid}')">${W2("Fire","Despedir")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.myrFireGo = async function(job, sid){
  const why = (document.getElementById("myrWhy").value || "").trim(), err = document.getElementById("myrErr");
  if (why.length < 10) { err.textContent = W2("Give a real reason.","Da una razón real."); return; }
  if (badShow(err, [why], "mayor firing")) return;
  try {
    const nm = nameOf(sid);
    /* the reason goes to the teacher as an already-done request, so Coach Smith sees it */
    await store().add(`${C()}/firereqs`, {sid:me(), uid:store().uid(), name:SESS().name, worker:sid, workerName:nm, job, why, status:"open", done:true, at:Date.now()}).catch(() => {});
    await record(`${nm} ✕ ${L(J(job).title)}`, "fire", job, sid);
    await setSeats(job, (R.staff()[job] || []).filter(x => x !== sid));
    closeSheet(); T.toast(W2(`${nameOf(sid)} was let go. The seat is open for applications.`, `${nameOf(sid)} fue despedido. El puesto está abierto.`));
  } catch(e){ console.warn(e); err.textContent = W2("Couldn't do that right now.","No se pudo ahora."); }
};

/* ---------------------------------------------------------------- asking the teacher to fire someone */
window.myrAsk = function(job, sid){
  if (!R.isMayor()) return;
  const all = []; Object.keys(R.CAREERS).forEach(k => (R.staff()[k] || []).filter(Boolean).forEach(s => { if (s !== me()) all.push([k, s]); }));
  if (!all.length) return T.toast(W2("Nobody has a job yet.","Nadie tiene trabajo aún."));
  const pick = job && sid ? `${job}|${sid}` : "";
  sheet(`<div class="eyebrow">🗂️ ${W2("Ask Coach Smith to fire someone","Pedir a Coach Smith que despida a alguien")}</div>
    <p class="muted" style="margin-top:0">${W2("Any job. Coach Smith reads your reason and decides. You'll get a notification either way.","Cualquier trabajo. Coach Smith lee tu razón y decide. Recibirás una notificación.")}</p>
    <label class="cform">${W2("Who?","¿Quién?")}<select id="myrWho">${all.map(([k, s]) => `<option value="${k}|${s}" ${pick === `${k}|${s}` ? "selected" : ""}>${E(nameOf(s))} · ${E(L(J(k).title))}</option>`).join("")}</select></label>
    <label class="cform">${W2("Why? Be specific: what happened, and how often?","¿Por qué? Sé específico: ¿qué pasó y con qué frecuencia?")}<textarea id="myrWhy" maxlength="240" rows="3"></textarea></label><p id="myrErr" class="terr"></p>
    <button class="btn primary wide" onclick="myrAskGo()">📨 ${W2("Send to Coach Smith","Enviar a Coach Smith")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.myrAskGo = async function(){
  const [job, sid] = document.getElementById("myrWho").value.split("|"), why = (document.getElementById("myrWhy").value || "").trim(), err = document.getElementById("myrErr");
  if (why.length < 10) { err.textContent = W2("Explain what happened in at least a sentence.","Explica lo que pasó en al menos una oración."); return; }
  if (badShow(err, [why], "mayor request")) return;
  if (FREQS.some(r => r.worker === sid && r.status === "open" && !r.done)) { err.textContent = W2("You already asked about them. Wait for Coach Smith.","Ya pediste por esa persona. Espera a Coach Smith."); return; }
  try { await store().add(`${C()}/firereqs`, {sid:me(), uid:store().uid(), name:SESS().name, worker:sid, workerName:nameOf(sid), job, why, status:"open", at:Date.now()});
    closeSheet(); T.toast(W2("📨 Sent. Coach Smith will decide.","📨 Enviado. Coach Smith decidirá."));
  } catch(e){ console.warn(e); err.textContent = W2("Couldn't send it right now.","No se pudo enviar."); }
};

/* ---------------------------------------------------------------- State of the Town */
const address = () => WACTS.filter(a => a.kind === "address").sort((a, b) => b.at - a.at)[0];
window.myrAddress = function(){
  if (!R.isMayor()) return; if (address()) return T.toast(W2("You already gave this week's address.","Ya diste el discurso de esta semana."));
  sheet(`<div class="eyebrow">🎤 ${W2("State of the Town","Estado del Pueblo")}</div><h2>${W2("Talk to the whole town","Habla a todo el pueblo")}</h2>
    <p class="muted" style="margin-top:0">${W2("Once a week. What went well, what's next, and what you need from everyone. It shows at the top of Smithtopia all week.","Una vez por semana. Qué salió bien, qué sigue y qué necesitas de todos. Se muestra arriba en Smithtopia toda la semana.")}</p>
    <textarea id="myrAddr" maxlength="280" rows="4" style="width:100%"></textarea><p id="myrErr" class="terr"></p>
    <button class="btn primary wide" onclick="myrAddressGo()">🎤 ${W2("Deliver it","Darlo")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.myrAddressGo = async function(){
  const t = (document.getElementById("myrAddr").value || "").trim(), err = document.getElementById("myrErr");
  if (t.length < 20) { err.textContent = W2("Say a little more (20+ characters).","Di un poco más (20+ caracteres)."); return; }
  if (badShow(err, [t], "State of the Town")) return;
  try { await store().add(`${C()}/mayoracts`, {sid:me(), uid:store().uid(), name:SESS().name, kind:"address", text:t, day:day(), week:week(), at:Date.now()});
    T.coins(2); T.persist(); closeSheet(); T.toast(W2("🎤 Address delivered. +2 Smithbucks.","🎤 Discurso entregado. +2 Smithbucks."));
  } catch(e){ err.textContent = W2("Couldn't post it right now.","No se pudo publicar."); }
};
EXT.banner.push(() => { const a = address(); if (!a || !SESS()) return "";
  return `<section class="panel myraddr"><b>🎤 ${W2("State of the Town","Estado del Pueblo")}</b> <small class="muted">· ${W2("Mayor","Alcalde")} ${E(a.name)}</small><p>“${E(a.text)}”</p></section>`; });

/* ---------------------------------------------------------------- the mayor's desk in the Mansion */
function duties(){
  const flagged = [], s = R.staff();
  R.PUBLIC.forEach(k => (s[k] || []).filter(Boolean).forEach(sid => { const p = perf(sid); if (p.flag) flagged.push([k, sid, p]); }));
  return {apps:APPS.length, flagged, addr:!!address(), open:R.PUBLIC.filter(k => (s[k] || []).filter(Boolean).length < J(k).seats)};
}
EXT.mansion.push(may => {
  const rec = WACTS.filter(a => a.kind === "staffing").sort((a, b) => b.at - a.at).slice(0, 8);
  const record = rec.length ? `<section class="panel"><div class="eyebrow">📜 ${W2("Public record: city jobs this week","Registro público: empleos municipales")}</div>
    ${rec.map(a => `<div class="myrrow"><span>${a.arg === "hire" ? "✅" : "🚪"} ${E(a.text)}</span><small class="muted">${new Date(a.at).toLocaleDateString()}</small></div>`).join("")}</section>` : "";
  if (!may) return record;
  const d = duties(), s = R.staff();
  const check = (ok, txt, btn) => `<li class="${ok ? "ok" : ""}">${ok ? "✅" : "⬜"} ${txt}${!ok && btn ? ` ${btn}` : ""}</li>`;
  return `<section class="panel kshift"><div class="eyebrow">🗓️ ${W2("Mayor's duties","Deberes del alcalde")}</div><ul class="myrduty">
      ${check(!d.apps, d.apps ? W2(`${d.apps} application${d.apps > 1 ? "s" : ""} for city jobs`, `${d.apps} solicitud(es) de empleos municipales`) : W2("City job applications reviewed","Solicitudes revisadas"))}
      ${check(!d.flagged.length, d.flagged.length ? W2(`${d.flagged.length} city worker${d.flagged.length > 1 ? "s" : ""} need a check-in (no shift in 3+ days or low reviews)`, `${d.flagged.length} trabajador(es) necesitan atención`) : W2("City workers are showing up","Los trabajadores municipales cumplen"))}
      ${check(d.addr, W2("State of the Town address this week","Discurso del Estado del Pueblo esta semana"), `<button class="btn" onclick="myrAddress()">🎤 ${W2("Write it (+2)","Escribirlo (+2)")}</button>`)}
      ${check(!d.open.length, d.open.length ? W2(`Open city seats: ${d.open.map(k => J(k).e).join(" ")}`, `Puestos municipales libres: ${d.open.map(k => J(k).e).join(" ")}`) : W2("Every city seat is filled","Todos los puestos municipales están ocupados"))}
    </ul></section>
    <section class="panel"><div class="eyebrow">🏛️ ${W2("City jobs: you hire and fire","Empleos municipales: tú contratas y despides")}</div>
      <p class="muted" style="font-size:13px;margin-top:0">${W2("Doctors, banks, the Gazette and the Court aren't run by the mayor. For those, ask Coach Smith.","Médicos, bancos, la Gaceta y el Juzgado no los dirige el alcalde. Para esos, pide a Coach Smith.")}</p>
      ${R.PUBLIC.map(k => { const hs = (s[k] || []).filter(Boolean);
        return `<div class="myrjob"><b>${jt(k)}</b> <small class="muted">${hs.length}/${J(k).seats}</small>
          ${hs.map(sid => { const p = perf(sid); return `<div class="myrrow"><span>${E(nameOf(sid))} <small class="muted">${p.lvl ? p.lvl + " · " : ""}${p.shifts} ${W2("shifts","turnos")} · ${p.days >= 99 ? W2("never worked","nunca trabajó") : p.days === 0 ? W2("worked today","trabajó hoy") : W2(`${p.days}d ago`, `hace ${p.days}d`)}${p.n ? ` · ${p.avg.toFixed(1)}★ (${p.n})` : ""}</small>${p.flag ? " ⚠️" : ""}</span>
            <button class="btn ghost" onclick="myrFire('${k}','${sid}')">${W2("Fire","Despedir")}</button></div>`; }).join("") || `<p class="muted" style="margin:4px 0">${W2("Nobody yet.","Nadie aún.")}</p>`}</div>`; }).join("")}
    </section>
    <section class="panel"><div class="eyebrow">📨 ${W2("Applications for city jobs","Solicitudes de empleos municipales")} (${APPS.length})</div>
      ${APPS.map(a => { const st = a.stats || {}, now = holderOf(a.sid);
        return `<div class="myrapp"><b>${E(a.name)}</b> → ${jt(a.job)}${now ? ` <small class="muted">(${W2("now","ahora")}: ${E(L(J(now).title))})</small>` : ""}
          <p>“${E(a.why)}”</p><p class="muted">${E(a.skills)}${a.ref ? ` · ${W2("Reference","Referencia")}: ${E(a.ref)}` : ""}</p>
          <small class="muted">⭐ XP ${st.xp | 0} · 🔥 ${st.streak | 0} · 💳 ${st.credit || "—"}${st.match ? ` · ${st.match}% ${W2("match","compatible")}` : ""}</small>
          <div class="eprow"><button class="btn primary" onclick="myrHire('${a.id}')">✅ ${W2("Hire","Contratar")}</button><button class="btn ghost" onclick="myrDeny('${a.id}')">✖ ${W2("Turn down","Rechazar")}</button></div></div>`; }).join("")
        || `<p class="muted">${W2("No applications right now. Open seats show NOW HIRING Downtown.","No hay solicitudes. Los puestos libres muestran SE BUSCA en el Centro.")}</p>`}
    </section>
    <section class="panel"><div class="eyebrow">🗂️ ${W2("Ask Coach Smith to fire someone","Pedir a Coach Smith que despida")}</div>
      <button class="btn" onclick="myrAsk()">📨 ${W2("New request","Nueva solicitud")}</button>
      ${FREQS.filter(r => !r.done).slice(0, 6).map(r => `<div class="myrrow"><span>${E(r.workerName)} · ${E(L(J(r.job).title))}</span><small>${r.status === "open" ? "⏳ " + W2("waiting","esperando") : r.status === "fired" ? "✅ " + W2("fired","despedido") : "✖ " + W2("kept","se queda")}</small></div>`).join("")}
    </section>${record}`;
});
/* a nudge for the mayor when something is waiting */
EXT.banner.push(() => {
  if (!SESS() || !R.isMayor() || !["plaza","downtown","jobs"].includes(T.tt)) return "";
  const d = duties(), n = d.apps + d.flagged.length + (d.addr ? 0 : 1); if (!n) return "";
  return `<section class="panel jban"><b>🎖️ ${W2(`Mayor's desk: ${n} thing${n > 1 ? "s" : ""} need you`, `Escritorio del alcalde: ${n} pendiente(s)`)}</b>
    <button class="btn primary" onclick="carGo('mansion')">${W2("Go to the Mansion","Ir a la Mansión")}</button></section>`;
});

/* ---------------------------------------------------------------- teacher: the mayor's firing requests */
const tc = () => T.adminCid;
window.myrT = async function(id, fire){
  const cid = tc(); const r = await store().get(`classes/${cid}/firereqs/${id}`); if (!r) return;
  if (fire) { const c = (await T.net.myClasses()).find(x => x.id === cid); if (c) { const st = {...(c.staff || {})}; st[r.job] = (st[r.job] || []).filter(x => x !== r.worker); T.adminSet({staff:st}); } }
  await store().update(`classes/${cid}/firereqs/${id}`, {status:fire ? "fired" : "kept", decidedAt:Date.now()}); T.paintAdmin();
};
window.myrTClear = async function(id){ await store().del(`classes/${tc()}/firereqs/${id}`); T.paintAdmin(); };
EXT.adminPanels.push({tab:"people", 
  html: c => `<section class="panel tadm"><div class="eyebrow">🎖️ ${W2("Mayor: firing requests and city firings","Alcalde: solicitudes de despido")}</div>
    <p class="muted" style="font-size:13px">${W2("The mayor hires and fires the 6 city jobs (firefighter, marshal, sanitation, ranger, builder, mail) on their own, with a reason you can see here. For any other job, the mayor asks and you decide.","El alcalde contrata y despide los 6 empleos municipales; para los demás, el alcalde pide y tú decides.")}</p><div id="aFire"></div></section>`,
  after: c => {
    const box = () => document.getElementById("aFire");
    store().list(`classes/${c.id}/firereqs`).then(rows => { const b = box(); if (!b) return; rows.sort((a, z) => z.at - a.at);
      b.innerHTML = rows.slice(0, 20).map(r => `<div class="myrapp"><b>${E(r.workerName)}</b> · ${jt(r.job)} <small class="muted">${W2("from Mayor","del alcalde")} ${E(r.name)} · ${new Date(r.at).toLocaleDateString()}</small>
        <p>“${E(r.why)}”</p>
        ${r.done ? `<small>🏛️ ${W2("The mayor already let them go (city job).","El alcalde ya lo despidió (empleo municipal).")}</small> <button class="btn ghost" onclick="myrTClear('${r.id}')">${W2("Dismiss","Quitar")}</button>`
          : r.status === "open" ? `<div class="eprow"><button class="btn primary" onclick="myrT('${r.id}',true)">${W2("Fire them","Despedir")}</button><button class="btn ghost" onclick="myrT('${r.id}',false)">${W2("Keep them","Mantener")}</button></div>`
          : `<small>${r.status === "fired" ? "✅ " + W2("Fired","Despedido") : "✖ " + W2("Kept","Se quedó")}</small> <button class="btn ghost" onclick="myrTClear('${r.id}')">${W2("Dismiss","Quitar")}</button>`}</div>`).join("")
        || `<p class="muted">${W2("No requests from the mayor.","No hay solicitudes del alcalde.")}</p>`; }).catch(() => {});
  }
});
window.MAYOR = {perf, duties, watchAll};
})();
