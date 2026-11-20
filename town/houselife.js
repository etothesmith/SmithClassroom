/* =============================================================================
   GRENADIER TOWN — life inside houses (town/houselife.js)
   - House chat: once you're inside someone's house (let in, open house, or a
     party), you, the owner and the other guests can type to each other. The
     owner gets a notice when someone writes in their house. Messages go
     through the word filter, follow the class chat switch and mutes, and
     Coach Smith can read and delete every house chat from the teacher panel.
   - House parties: once a day the owner can throw a 30-minute party. The door
     opens to everyone, the party shows up on the plaza, guests get Social and
     a Smithbuck, and the host earns a Smithbuck for each guest (up to 10).
   - A guest list shows who stopped by today.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T || !T.CIV) return;
const {EXT} = T, V = T.CIV, {sheet, closeSheet, cleanText, day, E, W2, C, store, SESS, CLS} = V;
const me = () => SESS() && SESS().sid;
const PARTY_MIN = 30, PARTY_PAY_MAX = 10, MAX_LEN = 140;
let ROOM = null, MSGS = [], ROOM_UNSUB = null, MINE = [], lastSend = 0;
const chatOk = () => CLS().chatOn !== false && !(CLS().muted && CLS().muted[me()]) && !CLS().frozen;
const bump = (k, v) => { if (window.WORLD2) WORLD2.bumpNeed(k, v); };
const fmt = t => new Date(t).toLocaleTimeString([], {hour:"numeric", minute:"2-digit"});

/* ---------------------------------------------------------------- the room */
function enterRoom(sid){
  if (ROOM === sid) return; leaveRoom(); ROOM = sid; MSGS = [];
  ROOM_UNSUB = store().watch(`${C()}/hchat`, {where:[["house","==",sid]]}, rows => { if (!rows || ROOM !== sid) return;
    MSGS = rows.filter(r => r.day === day() || Date.now() - r.at < 3 * 864e5).sort((a, b) => a.at - b.at).slice(-40); drawMsgs(); });
  /* sign the guest list once a day */
  if (sid !== me()) T.once(`guest:${sid}:${day()}`, () => { post(sid, "", "join"); bump("social", 8); }) && T.persist();
}
function leaveRoom(){ if (ROOM_UNSUB) { try { ROOM_UNSUB(); } catch(e){} } ROOM_UNSUB = null; ROOM = null; }
async function post(house, text, kind){
  return store().add(`${C()}/hchat`, {house, sid:me(), name:SESS().name, uid:store().uid(), text:text || "", kind:kind || "msg", day:day(), at:Date.now()});
}
window.hcSend = async function(){
  const box = document.getElementById("hcIn"), err = document.getElementById("hcErr"); if (!box || !ROOM) return;
  const t = box.value.trim().slice(0, MAX_LEN); if (!t) return;
  if (!chatOk()) { err.textContent = W2("Chat is turned off right now.","El chat está apagado ahora."); return; }
  if (Date.now() - lastSend < 2500) { err.textContent = W2("Slow down a little.","Más despacio."); return; }
  if (badShow(err, [t], "house chat")) return;
  lastSend = Date.now(); box.value = ""; err.textContent = "";
  try { await post(ROOM, t, "msg"); bump("social", 3); } catch(e){ err.textContent = W2("Couldn't send it right now.","No se pudo enviar."); }
};
function msgHtml(m){
  if (m.kind === "join") return `<div class="hcsys">🚪 ${E(m.name)} ${W2("came in","entró")} · ${fmt(m.at)}</div>`;
  if (m.kind === "party") return `<div class="hcsys">🎉 ${E(m.name)} ${W2("started a party!","¡empezó una fiesta!")} · ${fmt(m.at)}</div>`;
  return `<div class="hcm ${m.sid === me() ? "me" : ""}"><b>${E(m.name)}</b><span>${E(m.text)}</span><small>${fmt(m.at)}</small></div>`;
}
function drawMsgs(){ const box = document.getElementById("hcLog"); if (!box) return;
  box.innerHTML = MSGS.map(msgHtml).join("") || `<p class="muted" style="text-align:center">${W2("No messages yet. Say hi!","Aún no hay mensajes. ¡Saluda!")}</p>`;
  box.scrollTop = box.scrollHeight;
  const g = document.getElementById("hcGuests"); if (g) { const names = [...new Set(MSGS.filter(m => m.kind === "join" && m.day === day()).map(m => m.name))];
    g.innerHTML = names.length ? `👥 ${W2("Stopped by today","Visitas de hoy")}: ${names.map(E).join(", ")}` : ""; } }
function chatHtml(sid){
  const owner = T.pub[sid] || {}, mine = sid === me();
  return `<section class="panel hchat"><div class="eyebrow">💬 ${mine ? W2("Your house chat","El chat de tu casa") : W2(`Chat in ${owner.name || ""}'s house`, `Chat en la casa de ${owner.name || ""}`)}</div>
    <p class="muted" style="font-size:12px;margin:0 0 6px">${W2("Only people inside this house see this chat. Be kind: Coach Smith can read every chat.","Solo quienes están en esta casa ven este chat. Sé amable: Coach Smith puede leer todos los chats.")}</p>
    <div id="hcLog" class="hclog"></div><div id="hcGuests" class="muted" style="font-size:12px;margin:4px 0"></div>
    ${chatOk() ? `<div class="hcin"><input id="hcIn" maxlength="${MAX_LEN}" placeholder="${W2("Type a message…","Escribe un mensaje…")}" onkeydown="if(event.key==='Enter')hcSend()">
      <button class="btn primary" onclick="hcSend()">${W2("Send","Enviar")}</button></div><p id="hcErr" class="terr"></p>
      <div class="hcquick">${["👋 Hi!","😍 Love your house!","🐾 Cute pet!","🎉 Party time!","📚 Want to study?","😂"].map(q => `<button class="btn ghost" onclick="document.getElementById('hcIn').value=this.textContent;hcSend()">${q}</button>`).join("")}</div>`
      : `<p class="muted">🔇 ${W2("Chat is off right now.","El chat está apagado.")}</p>`}</section>`;
}
/* ---------------------------------------------------------------- parties */
const partyOf = sid => { const p = sid === me() ? {party:T.town().house.party} : T.pub[sid]; return p && p.party > Date.now() ? p.party : 0; };
window.hcParty = async function(){
  const h = T.town().house; if (h.partyDay === day()) return T.toast(W2("One party a day!","¡Una fiesta al día!"));
  if (T.town().house.door === "closed") return T.toast(W2("Turn off Do Not Disturb first.","Primero quita No molestar."));
  h.partyDay = day(); h.party = Date.now() + PARTY_MIN * 6e4; h.partyId = Date.now().toString(36); T.persist(); T.publishNow();
  try { await post(me(), "", "party"); } catch(e){}
  bump("social", 15); bump("fun", 10); T.toast(W2(`🎉 Your party is on for ${PARTY_MIN} minutes! Everyone can walk in.`, `🎉 ¡Tu fiesta dura ${PARTY_MIN} minutos! Todos pueden entrar.`)); T.paintSub();
};
/* host: a Smithbuck per guest during the party */
function payHost(rows){
  const h = T.town().house; if (!h.partyId || !h.party) return; const start = h.party - PARTY_MIN * 6e4; let ch = false, n = 0;
  rows.filter(r => r.kind === "join" && r.at >= start && r.at <= h.party).forEach(r => {
    ch = T.once(`host:${h.partyId}:${r.sid}`, () => { const paid = (h.partyPaid | 0); if (paid >= PARTY_PAY_MAX) return; h.partyPaid = paid + 1; T.coins(1); n++; }) || ch; });
  if (n) T.toast(W2(`🎉 ${n} guest${n > 1 ? "s" : ""} at your party: +${n} Smithbuck${n > 1 ? "s" : ""}`, `🎉 ${n} invitado(s): +${n} Smithbucks`));
  if (ch) T.persist();
}
/* guest: a Smithbuck for going to a party */
function partyGuest(sid){ const until = partyOf(sid); if (!until || sid === me()) return;
  T.once(`party:${sid}:${until}`, () => { T.coins(1); bump("social", 20); bump("fun", 10); T.toast(W2("🎉 You came to the party! +1 Smithbuck","🎉 ¡Llegaste a la fiesta! +1 Smithbuck")); T.persist(); }); }

/* ---------------------------------------------------------------- inside a house */
EXT.houseExtra.push({html: sid => {
  if (!SESS() || !T.canEnter(sid)) return "";
  setTimeout(() => { if (!SESS() || !T.isTown()) return; enterRoom(sid); drawMsgs(); partyGuest(sid); }, 0);
  const mine = sid === me(), until = partyOf(sid);
  return `${until ? `<section class="panel hparty">🎉 <b>${mine ? W2("Your party is on!","¡Tu fiesta está en marcha!") : W2(`${(T.pub[sid] || {}).name || ""}'s party!`, `¡Fiesta de ${(T.pub[sid] || {}).name || ""}!`)}</b>
      <small>${W2(`Ends at ${fmt(until)}`, `Termina a las ${fmt(until)}`)}</small></section>`
    : mine ? `<section class="panel"><button class="btn" onclick="hcParty()">🎉 ${W2(`Throw a party (${PARTY_MIN} min, once a day)`, `Hacer una fiesta (${PARTY_MIN} min, una vez al día)`)}</button>
      <small class="muted"> ${W2("Everyone can walk in. You earn 1 Smithbuck per guest.","Todos pueden entrar. Ganas 1 Smithbuck por invitado.")}</small></section>` : ""}${chatHtml(sid)}`;
}});
EXT.onLeave.push(leaveRoom);
const _visit = window.townVisit;
if (typeof _visit === "function") window.townVisit = function(sid){ if (!sid) leaveRoom(); return _visit.apply(this, arguments); };
const _tab = window.townTab;
if (typeof _tab === "function") window.townTab = function(k){ if (k !== "homes") leaveRoom(); return _tab.apply(this, arguments); };

/* parties show up on the plaza and in the Town banner */
EXT.banner.push(() => { if (!SESS()) return ""; const now = Date.now();
  const ps = Object.entries(T.pub || {}).filter(([sid, p]) => p && p.party > now && sid !== me());
  if (!ps.length) return "";
  return `<section class="panel hparty">🎉 <b>${W2("House parties now:","Fiestas ahora:")}</b> ${ps.map(([sid, p]) => `<button class="btn" onclick="townTab('homes');setTimeout(()=>townVisit('${sid}'),200)">🏠 ${E(p.name || "")}</button>`).join(" ")}</section>`; });
EXT.pubExtra.push(() => ({party:T.town().house.party > Date.now() ? T.town().house.party : 0}));
EXT.streetBadge.push(p => p && p.party > Date.now() ? `<span class="cbadge" title="${W2("Party!","¡Fiesta!")}">🎉</span>` : "");

/* the owner hears about messages in their house */
let BG = null;
EXT.onSession.push(() => {
  if (BG) { try { BG(); } catch(e){} } let first = true;
  BG = store().watch(`${C()}/hchat`, {where:[["house","==",me()]]}, rows => { if (!rows || !SESS()) return; MINE = rows; payHost(rows);
    if (first) { first = false; rows.forEach(r => T.once("hcseen:" + r.id, () => {})); T.persist(); return; }
    rows.filter(r => r.sid !== me() && r.kind === "msg").forEach(r => T.once("hcseen:" + r.id, () => { if (ROOM !== me()) T.toast(W2(`💬 ${r.name} in your house: “${r.text}”`, `💬 ${r.name} en tu casa: “${r.text}”`)); })); });
});
EXT.onLeave.push(() => { if (BG) { try { BG(); } catch(e){} BG = null; } });

/* ---------------------------------------------------------------- teacher: read and delete house chats */
EXT.adminPanels.push({tab:"safety", 
  html: c => `<section class="panel tadm"><div class="eyebrow">💬 ${W2("House chats","Chats de las casas")}</div>
    <p class="muted" style="font-size:13px">${W2("Students can chat only inside a house they were let into. Newest first. The class chat switch and mutes apply here too.","Los estudiantes solo chatean dentro de una casa donde los dejaron entrar. Lo más nuevo primero. El interruptor de chat y los silencios también aplican.")}</p>
    <div id="aHchat" class="hcadm"></div></section>`,
  after: c => {
    T.viewSub(store().watch(`classes/${c.id}/hchat`, {}, rows => { const box = document.getElementById("aHchat"); if (!box || !rows) return;
      const names = {}; rows.forEach(r => { if (r.house === r.sid) names[r.house] = r.name; });
      box.innerHTML = rows.filter(r => r.kind === "msg").sort((a, b) => b.at - a.at).slice(0, 60).map(r => `<div class="tdeal"><span><small>${new Date(r.at).toLocaleString()} · 🏠 ${E(names[r.house] || r.house)}</small><br><b>${E(r.name)}:</b> ${E(r.text)}</span>
        <button class="btn ghost" onclick="hcDel('${c.id}','${r.id}')">🗑️</button></div>`).join("") || `<p class="muted" style="font-size:13px">${W2("No house chats yet.","Aún no hay chats.")}</p>`; }));
  }
});
window.hcDel = async (cid, id) => { try { await store().del(`classes/${cid}/hchat/${id}`); } catch(e){} };
window.HOUSELIFE = {enterRoom, leaveRoom, get msgs(){ return MSGS; }, partyOf};
})();
