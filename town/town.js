/* =============================================================================
   GRENADIER TOWN — the shared, live part of Smith's Classroom.
   Plaza (walk around, emotes, quick chat), Homes (a house for every student,
   visits and stickers), Market (list and buy), Trades (both sides agree),
   Shop and Crates (earned by learning), and the teacher's controls.
   Runs on town/net.js: Firebase when town/config.js is filled in, otherwise
   practice mode on one device.
   ========================================================================== */
(function(){
"use strict";
const TA = "v2/assets/town/";
const L2 = o => !o ? "" : typeof o === "string" ? o : (S.lang === "es" ? (o.es || o.en) : o.en);
const ITEMS = window.TOWN_ITEMS, RAR = window.TOWN_RARITY, HOUSES = window.TOWN_HOUSES;
const PLAZA_W = 960, PLAZA_H = 540;
let NET = null;
let SESS = null;                 /* {cid, sid, name, code, className} */
let CLS = null;                  /* live class doc */
let TT = "plaza";                /* sub-tab */
let VISIT = null;                /* sid of the house being visited */
let ADMIN_CID = null;            /* class the teacher is managing */
const BG = new Set();            /* background subscriptions while signed in */
let VIEW_SUBS = [];              /* subscriptions owned by the current view */
let PUB = {};                    /* sid -> public profile */
let MARKET = [], CHAT = [], PLAZA = {}, MY_SALES = [], MY_BUYS = [], T_FROM = [], T_TO = [];
let toastEl = null;
/* extension points used by town/civic.js (Town Hall, Bank, Jobs, businesses, events, plaza quiz) */
const EXT = {tabs:[], onClass:[], onSession:[], priceMult:[], listCheck:[], onSold:[], plazaBack:[], plazaFront:[], plazaTap:[],
             adminPanels:[], streetBadge:[], houseExtra:[], plazaSub:[], banner:[], pubExtra:[], projector:[], onLeave:[], onBuy:[], marketTop:[], nameTag:[], personDraw:[]};
const run = (list, ...a) => list.forEach(f => { try { f(...a); } catch(e){ console.warn("town ext", e); } });

/* ---------------------------------------------------------------- state */
function town(){
  const t = S.town = S.town || {};
  t.inv = t.inv || {}; t.house = t.house || {style:"cottage", slots:{}}; t.house.slots = t.house.slots || {};
  t.owned = t.owned || {cottage:1}; t.applied = t.applied || {}; t.crates = t.crates || 0;
  t.src = t.src || {}; t.stickerDay = t.stickerDay || {}; t.since = t.since || Date.now();
  return t;
}
const has = id => (town().inv[id] || 0) > 0;
const addItem = (id, n = 1) => { const inv = town().inv; inv[id] = Math.max(0, (inv[id] || 0) + n); if (!inv[id]) delete inv[id]; };
const once = (key, fn) => { const a = town().applied; if (a[key]) return false; a[key] = Date.now(); fn(); return true; };
const coins = n => { S.tokens = Math.max(0, (S.tokens | 0) + n); };
const shopMult = () => (CLS && CLS.econ && +CLS.econ.shopMult) || 1;
const priceOf = it => Math.max(1, Math.round(it.p * shopMult() * EXT.priceMult.reduce((m, f) => m * (f(it) || 1), 1)));
const itemName = id => ITEMS[id] ? L2(ITEMS[id].name) : id;
/* Art that hasn't been made yet falls back to an emoji, and is only asked for once per visit */
const MISSING = new Set();
window.townMiss = (el, emo, big) => { MISSING.add(el.getAttribute("src")); el.replaceWith(Object.assign(document.createElement("span"), {className:"tie" + (big ? " big" : ""), textContent:emo})); };
function artImg(src, emo, big){ return MISSING.has(src) ? `<span class="tie${big ? " big" : ""}">${emo}</span>` : `<img src="${src}" alt="" onerror="townMiss(this,'${emo}',${big ? 1 : 0})">`; }
function itemArt(id, size){
  const it = ITEMS[id]; if (!it) return "";
  return `<span class="ti" style="width:${size}px;height:${size}px">${artImg(`${TA}items/${id}.webp`, it.e)}</span>`;
}
function rarityChip(id){ const r = RAR[ITEMS[id] ? ITEMS[id].r : 0]; return `<span class="tr" style="--rc:${r.c}">${L2(r)}</span>`; }
const freeInv = () => { /* items not placed in the house */
  const placed = {}; Object.values(town().house.slots).forEach(id => { if (id) placed[id] = (placed[id] || 0) + 1; });
  const out = {}; Object.entries(town().inv).forEach(([id, n]) => { const f = n - (placed[id] || 0); if (f > 0) out[id] = f; });
  return out;
};
function toast(msg){
  if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "ttoast"; document.body.appendChild(toastEl); }
  toastEl.textContent = msg; toastEl.classList.add("on"); clearTimeout(toastEl._t); toastEl._t = setTimeout(() => toastEl.classList.remove("on"), 3200);
}
function persist(){ save(); publishSoon(); if (typeof paintBar === "function") paintBar(); }

/* ---------------------------------------------------------------- crates earned by learning */
function crateTick(){
  const t = town(), certs = (S.certs || []).length, lvl = levelOf(S.xp);
  if (t.src.certs == null) { t.src.certs = certs; t.src.lvl = lvl; t.crates += 2; save(); return; }   /* welcome gift */
  let got = 0;
  if (certs > t.src.certs) { got += certs - t.src.certs; t.src.certs = certs; }
  if (lvl > t.src.lvl) { got += lvl - t.src.lvl; t.src.lvl = lvl; }
  if (got) { t.crates += got; save(); toast(WL(`+${got} crate${got > 1 ? "s" : ""} for learning! Open in Town → Shop.`, `¡+${got} caja${got > 1 ? "s" : ""} por aprender! Ábrelas en Pueblo → Tienda.`)); }
}
function rollCrate(){
  const r = Math.random(); const tier = r < 0.01 ? 3 : r < 0.10 ? 2 : r < 0.40 ? 1 : 0;
  const pool = Object.values(ITEMS).filter(i => i.r === tier && !i.biz && !i.office); return pool[Math.floor(Math.random() * pool.length)].id;
}

/* ---------------------------------------------------------------- cloud save */
const EXTRA = /^(money-moves-progress|ag\.|arc\.|cfeReviewQuest|cfd2|counsel|smittys|marginal|world\.avatar$)/i;
function packSave(){
  const s = JSON.parse(JSON.stringify(S)); delete s.cfg;
  const extra = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i);
    if (EXTRA.test(k) && k !== "world.avatar") { const v = localStorage.getItem(k); if (v && v.length < 120000) extra[k] = v; } }
  return JSON.stringify({s, extra});
}
let _pushT = null;
function cloudSoon(){ if (!NET || !SESS || NET.mode !== "cloud") return; clearTimeout(_pushT); _pushT = setTimeout(pushNow, 4000); }
/* push right away; resolves true when the account has the latest progress */
async function pushNow(){
  clearTimeout(_pushT); if (!NET || !SESS || NET.mode !== "cloud") return false;
  const blob = packSave(); if (blob.length >= 900000) { console.warn("cloud save too big", blob.length); return false; }
  try { await NET.pushSave(blob); localStorage.setItem("town.cloudAt", String(Date.now())); return true; }
  catch(e){ console.warn("cloud save", e); return false; }
}
/* games in frames (Money Moves, arcade, CFE quest…) save on their own: send those too */
window.addEventListener("storage", e => { if (e.key && EXTRA.test(e.key)) cloudSoon(); });
document.addEventListener("visibilitychange", () => { if (document.hidden && SESS) pushNow(); });
setInterval(() => { if (SESS) cloudSoon(); }, 120000);
const _save0 = window.save;
window.save = function(){ if (window.__wiping) return; S.savedAt = Date.now(); _save0(); cloudSoon(); };
async function pullCloud(){
  if (NET.mode !== "cloud") return;
  const r = await NET.pullSave().catch(() => null);
  const linkKey = "town.linked." + SESS.cid + "." + SESS.sid, linked = localStorage.getItem(linkKey);
  if (!r || !r.save) { localStorage.setItem(linkKey, "1"); cloudSoon(); return; }
  if (linked && (r.at || 0) <= (S.savedAt || 0)) { cloudSoon(); return; }
  try { const {s, extra} = JSON.parse(r.save);
    const keepLang = S.lang;
    const blankLocal = !(S.xp > 0) && !(S.certs || []).length && !Object.keys(S.prog || {}).length && !(S.tokens > 0);
    if (!linked && blankLocal) {
      /* a fresh computer: the account is the whole story */
      S = window.upgrade(s);
      Object.entries(extra || {}).forEach(([k, v]) => { try { localStorage.setItem(k, v); } catch(e){} });
      localStorage.setItem(linkKey, "1");
    } else if (!linked) {
      /* first time this device meets this account: combine, never overwrite */
      const localTown = S.town; merge(s); S = window.upgrade(S);
      S.town = localTown && Object.keys(localTown.inv || {}).length ? localTown : (s.town || localTown);
      /* anything the account has that this computer doesn't (avatar, classes, bank…) comes over */
      Object.keys(s).forEach(k => { const cur = S[k];
        if (cur == null || cur === "" || (typeof cur === "object" && !Array.isArray(cur) && !Object.keys(cur).length)) S[k] = s[k]; });
      Object.entries(extra || {}).forEach(([k, v]) => { const cur = localStorage.getItem(k);
        const done = j => { try { const o = JSON.parse(j); return o && o.progress ? Object.values(o.progress).filter(x => x && x.stage === "done").length : (j || "").length; } catch(e){ return 0; } };
        if (!cur || done(v) > done(cur)) try { localStorage.setItem(k, v); } catch(e){} });
      localStorage.setItem(linkKey, "1");
    } else {
      S = window.upgrade(s);
      Object.entries(extra || {}).forEach(([k, v]) => { try { localStorage.setItem(k, v); } catch(e){} });
    }
    S.lang = keepLang || S.lang;
    window.save(); toast(WL("Your progress was loaded from the cloud.", "Tu progreso se cargó desde la nube."));
    if (typeof refreshMe === "function") refreshMe(); render();
  } catch(e){ console.warn("cloud load", e); }
}

/* ---------------------------------------------------------------- publish my profile */
let _pubT = null;
function publishSoon(){ if (!NET || !SESS) return; clearTimeout(_pubT); _pubT = setTimeout(publishNow, 800); }
function myEq(){ return S.avatar || (typeof avStarter === "function" ? avStarter(0) : null); }
function publishNow(){
  if (!NET || !SESS) return; const t = town();
  const extra = {}; EXT.pubExtra.forEach(f => { try { Object.assign(extra, f()); } catch(e){} });
  NET.publish({eq:myEq(), lvl:levelOf(S.xp), house:{style:t.house.style, slots:t.house.slots}, door:t.house.door || "knock", shelf:Object.keys(freeInv()).slice(0, 40),
               since:t.since, ...extra}).catch(e => console.warn("publish", e));
}

/* ---------------------------------------------------------------- sessions & background watchers */
function stopBg(){ BG.forEach(u => { try { u(); } catch(e){} }); BG.clear(); }
function startBg(){
  stopBg();
  BG.add(NET.watchClass(c => { const was = CLS; CLS = c; onClassDoc(was); }));
  BG.add(NET.watchMySales(rows => { if (rows) { MY_SALES = rows; settleSales(); } }));
  BG.add(NET.watchMyBuys(rows => { if (rows) { MY_BUYS = rows; settleBuys(); } }));
  BG.add(NET.watchTradesFrom(rows => { if (rows) { T_FROM = rows; settleTradesFrom(); if (TT === "trades" && isTown()) paintSub(); } }));
  BG.add(NET.watchTradesTo(rows => { if (rows) { T_TO = rows; settleTradesTo(); badge(); if (TT === "trades" && isTown()) paintSub(); } }));
  BG.add(NET.watchKnocksTo(rows => { if (rows) knocksIn(rows); }));
  BG.add(NET.watchKnocksFrom(rows => { if (!rows) return; const was = KNOCK_OUT; KNOCK_OUT = {}; rows.forEach(k => KNOCK_OUT[k.to] = k);
    rows.forEach(k => { if (k.status === "in" && k.day === dayStr() && (!was[k.to] || was[k.to].status !== "in")) {
      toast(WL(`🚪 ${k.toName || "Your classmate"} let you in!`, `🚪 ¡${k.toName || "Tu compañero"} te dejó pasar!`)); if (VISIT === k.to && isTown()) paintSub(); }
      if (k.status === "no" && (!was[k.to] || was[k.to].status === "knock")) toast(WL(`${k.toName || "They"} can't have visitors right now.`, `${k.toName || "Esa persona"} no puede recibir visitas ahora.`)); }); }));
}
/* ---------------------------------------------------------------- knocking: nobody walks into a house uninvited */
let KNOCK_OUT = {}, KNOCK_SEEN = {};
const dayStr = () => new Date().toISOString().slice(0, 10);
const doorOf = p => (p && p.door) || "knock";
function canEnter(sid){ if (!SESS || sid === SESS.sid) return true; const p = PUB[sid]; if (doorOf(p) === "open" || (p && p.party > Date.now())) return true;
  const k = KNOCK_OUT[sid]; return !!(k && k.status === "in" && k.day === dayStr()); }
function knocksIn(rows){
  if (doorOf({door:town().house.door}) === "closed") return;
  const k = rows.filter(r => r.status === "knock" && r.day === dayStr() && Date.now() - r.at < 10 * 60e3 && !KNOCK_SEEN[r.id + r.at]).sort((a, b) => a.at - b.at)[0];
  if (!k) return; KNOCK_SEEN[k.id + k.at] = 1;
  const box = document.getElementById("certAsk"); if (!box || !box.classList.contains("hidden")) { toast(WL(`🚪 ${k.fromName} is knocking at your door.`, `🚪 ${k.fromName} toca a tu puerta.`)); return; }
  box.classList.remove("hidden");
  box.innerHTML = `<div class="certask tcard" role="dialog" aria-modal="true"><div class="eyebrow">🚪 ${WL("Knock knock!","¡Toc, toc!")}</div>
    <h2>${WL(`${esc(k.fromName)} is at your door`, `${esc(k.fromName)} está en tu puerta`)}</h2><p class="muted">${WL("Let them in to see your house today?","¿Le dejas ver tu casa hoy?")}</p>
    <div class="tcardb"><button class="btn primary" onclick="townAnswerKnock('${k.id}','in')">✅ ${WL("Let them in","Dejar pasar")}</button>
    <button class="btn" onclick="townAnswerKnock('${k.id}','no')">${WL("Not now","Ahora no")}</button></div></div>`;
}
window.townAnswerKnock = function(id, st){ townCloseCard(); NET.answerKnock(id, st).catch(() => {}); };
window.townKnock = function(sid){
  const p = PUB[sid] || {}; if (doorOf(p) === "closed") return toast(WL("Do Not Disturb is on at this house.","Esta casa tiene No Molestar."));
  const k = KNOCK_OUT[sid]; if (k && k.status === "knock" && Date.now() - k.at < 60e3) return toast(WL("You just knocked. Give them a minute.","Acabas de tocar. Dale un minuto."));
  NET.knock(sid, p.name).then(() => { toast(WL(`🚪 You knocked on ${p.name || "the"} door.`, `🚪 Tocaste a la puerta de ${p.name || ""}.`)); }).catch(() => toast(WL("Couldn't knock right now.","No se pudo tocar.")));
};
window.townDoor = function(v){ town().house.door = v; persist(); publishNow(); paintSub(); };
function paintDoorstep(el, sid, p){
  const hs = (p.house && p.house.style) || "cottage", door = doorOf(p), k = KNOCK_OUT[sid], waiting = k && k.status === "knock" && k.day === dayStr();
  el.innerHTML = `<div class="eprow"><button class="btn ghost" onclick="townVisit(null)">← ${WL("Street","Calle")}</button>
      <h2 style="margin-left:8px">${WL(`${esc(p.name)}'s house`, `Casa de ${esc(p.name)}`)}</h2></div>
    <section class="panel raised tdoor">${artImg(`${TA}houses/house_${hs}.webp`, "🏠", true)}<div>
      <div class="eyebrow">${door === "closed" ? "⛔ " + WL("Do Not Disturb","No molestar") : "🚪 " + WL("Front door","Puerta principal")}</div>
      <h2>${door === "closed" ? WL("Nobody's taking visitors right now.","Ahora no recibe visitas.") : waiting ? WL("You knocked. Waiting for an answer…","Tocaste. Esperando respuesta…") : WL("Knock to ask if you can come in.","Toca para pedir permiso para entrar.")}</h2>
      <p class="muted">${WL("Houses are private. The owner has to let you in, and the invitation lasts for today.","Las casas son privadas. El dueño tiene que dejarte pasar, y la invitación dura hoy.")}</p>
      ${door !== "closed" ? `<button class="btn primary" onclick="townKnock('${sid}')">✊ ${waiting ? WL("Knock again","Tocar otra vez") : WL("Knock","Tocar")}</button>` : ""}</div></section>
    <div class="tstick">${window.TOWN_STICKERS.map(([kk, e]) => `<button onclick="townSticker('${sid}','${kk}')" aria-label="${kk}">${e}</button>`).join("")}
      <button class="btn primary" onclick="townTrade('${sid}')">🤝 ${WL("Trade","Intercambiar")}</button></div>
    <p class="muted" style="font-size:12px;text-align:center">${WL("You can leave a sticker on the door or offer a trade without going inside.","Puedes dejar una calcomanía en la puerta u ofrecer un intercambio sin entrar.")}</p>
    ${EXT.houseExtra.filter(f => f.doorstep).map(f => f.html(sid) || "").join("")}`;
}
function onClassDoc(was){
  if (!CLS) return;
  const t = town();
  if (CLS.stimulus && CLS.stimulus.id) once("stim:" + CLS.stimulus.id, () => { coins(CLS.stimulus.coins | 0); persist();
    toast(WL(`Stimulus! Coach Smith gave everyone ${CLS.stimulus.coins} Smithbucks.`, `¡Estímulo! Coach Smith dio ${CLS.stimulus.coins} Smithbucks a todos.`)); });
  if (CLS.gift && CLS.gift.id && (CLS.gift.to === "all" || CLS.gift.to === SESS.sid)) once("gift:" + CLS.gift.id, () => { t.crates += CLS.gift.crates | 0; persist();
    toast(WL(`Coach Smith sent you ${CLS.gift.crates} crate(s)!`, `¡Coach Smith te envió ${CLS.gift.crates} caja(s)!`)); });
  run(EXT.onClass, was, CLS);
  if (isTown() && (!was || was.frozen !== CLS.frozen || was.chatOn !== CLS.chatOn || JSON.stringify(was.econ) !== JSON.stringify(CLS.econ) || JSON.stringify(was.muted) !== JSON.stringify(CLS.muted))) paintTown();
}
async function startSession(s){
  SESS = s; town(); crateTick();
  await pullCloud(); startBg(); publishNow();
  run(EXT.onSession, s);
}
async function boot(){
  NET = await window.TOWN_NET; await NET.ready;
  const s = await NET.resume().catch(() => null);
  if (s) await startSession(s);
  if (isTown()) paintTown();
  setInterval(() => { if (SESS) crateTick(); }, 15000);
}

/* ---------------------------------------------------------------- settlement (each side applies its own half, once) */
function settleSales(){
  let changed = false;
  MY_SALES.forEach(m => {
    if (m.status === "sold") changed = once("sold:" + m.id, () => { coins(m.price); run(EXT.onSold, m);
      toast(WL(`${m.buyerName} bought your ${itemName(m.item)} for ${m.price} Smithbucks!`, `¡${m.buyerName} compró tu ${itemName(m.item)} por ${m.price} Smithbucks!`));
      if (!m.settled) NET.settle("market", m.id).catch(() => {}); }) || changed;
    if (m.status === "cancelled") changed = once("ret:" + m.id, () => { if (town().applied["list:" + m.id]) addItem(m.item, 1); }) || changed;
    if (m.status === "undone" && town().applied["sold:" + m.id]) changed = once("undo:s:" + m.id, () => { coins(-m.price); addItem(m.item, 1);
      toast(WL("Coach Smith undid a sale. Your item came back.", "Coach Smith deshizo una venta. Tu artículo regresó.")); }) || changed;
    if (m.status === "undone" && !town().applied["sold:" + m.id]) changed = once("ret:" + m.id, () => { if (town().applied["list:" + m.id]) addItem(m.item, 1); }) || changed;
  });
  if (changed) persist();
}
function settleBuys(){
  let changed = false;
  MY_BUYS.forEach(m => { if (m.status === "undone" && town().applied["buy:" + m.id]) changed = once("undo:b:" + m.id, () => { coins(m.price); addItem(m.item, -1);
    toast(WL("Coach Smith undid a purchase. You got your Smithbucks back.", "Coach Smith deshizo una compra. Recuperaste tus Smithbucks.")); }) || changed; });
  if (changed) persist();
}
function settleTradesFrom(){
  let changed = false;
  T_FROM.forEach(t => {
    if (!town().applied["tgive:" + t.id]) return;                         /* not escrowed on this account */
    if (t.status === "accepted") changed = once("tdone:" + t.id, () => { (t.get || []).forEach(id => addItem(id, 1)); coins(t.cr | 0);
      toast(WL(`${t.toName} accepted your trade!`, `¡${t.toName} aceptó tu intercambio!`)); NET.settle("trades", t.id).catch(() => {}); }) || changed;
    if (t.status === "declined" || t.status === "cancelled") changed = once("tret:" + t.id, () => { (t.give || []).forEach(id => addItem(id, 1)); coins(t.cg | 0);
      if (t.status === "declined") toast(WL(`${t.toName} said no thanks to your trade.`, `${t.toName} rechazó tu intercambio.`)); }) || changed;
    if (t.status === "undone") changed = once("tundo:" + t.id, () => {
      if (town().applied["tdone:" + t.id]) { (t.get || []).forEach(id => addItem(id, -1)); coins(-(t.cr | 0)); }
      if (!town().applied["tret:" + t.id]) { (t.give || []).forEach(id => addItem(id, 1)); coins(t.cg | 0); }
      toast(WL("Coach Smith undid one of your trades.", "Coach Smith deshizo uno de tus intercambios.")); }) || changed;
  });
  if (changed) persist();
}
function settleTradesTo(){
  let changed = false;
  T_TO.forEach(t => { if (t.status === "undone" && town().applied["tacc:" + t.id]) changed = once("tundo:" + t.id, () => {
    (t.give || []).forEach(id => addItem(id, -1)); coins(-(t.cg | 0)); (t.get || []).forEach(id => addItem(id, 1)); coins(t.cr | 0);
    toast(WL("Coach Smith undid one of your trades.", "Coach Smith deshizo uno de tus intercambios.")); }) || changed; });
  if (changed) persist();
}
function badge(){ const n = T_TO.filter(t => t.status === "offered").length; const b = document.getElementById("ttTradeN"); if (b) b.textContent = n ? n : ""; }

/* ---------------------------------------------------------------- view plumbing */
const isTown = () => TAB === "town";
function clearView(){ VIEW_SUBS.forEach(u => { try { u(); } catch(e){} }); VIEW_SUBS = []; stopPlaza(); }
/* called by the router whenever the student leaves the Town tab */
window.townAway = function(){ if (!PL && !VIEW_SUBS.length) return; const wasPlaza = !!PL && TT === "plaza"; clearView(); if (wasPlaza && NET && SESS) NET.leavePlaza(); };
window.viewTown = function(){
  if (!NET) { V().innerHTML = `<section class="panel raised"><p>${WL("Opening the Town…","Abriendo el Pueblo…")}</p></section>`; window.TOWN_NET.then(() => { if (isTown()) paintTown(); }); return; }
  paintTown();
};
function modeBanner(){
  return NET.mode === "local" ? `<div class="tbanner">🧪 ${WL("Practice mode: the Town works on this device only until Coach Smith connects it to the cloud.",
    "Modo práctica: el Pueblo solo funciona en este dispositivo hasta que Coach Smith lo conecte a la nube.")}</div>` : "";
}
function paintTown(){
  clearView();
  if (TT === "admin") return paintAdmin();
  if (!SESS) return paintJoin();
  if (CLS && CLS.frozen) {
    V().innerHTML = `${modeBanner()}<section class="panel raised tfreeze"><img src="${npc("point")}" alt="" onerror="this.remove()">
      <div><div class="eyebrow">${esc(SESS.className || "")}</div><h1>${WL("Eyes up front!","¡Atención al frente!")}</h1>
      <p>${WL("Coach Smith paused the Town for class time. It opens again when he unpauses it.","Coach Smith pausó el Pueblo durante la clase. Se abrirá cuando lo reactive.")}</p></div></section>${teacherLink()}`;
    return;
  }
  const tabs = [["plaza","🏙️",WL("Plaza","Plaza")],["homes","🏡",WL("Homes","Casas")],["market","🛒",WL("Market","Mercado")],
                ["trades","🤝",WL("Trades","Intercambios")],["shop","🎁",WL("Shop & crates","Tienda y cajas")]]
                .concat(EXT.tabs.map(t => [t.key, t.icon, t.label()]));
  V().innerHTML = `${modeBanner()}
  <section class="panel raised thead" style="background-image:url(${TA}banner_town.jpg)">
    <div class="theadin"><div class="eyebrow">${esc(SESS.className || WL("Grenadier Town","Pueblo Grenadier"))}</div>
      <h1>${WL("Grenadier Town","Pueblo Grenadier")}</h1>
      <div class="tme">${esc(SESS.name)} · <img src="${icon("smithbuck")}" alt="">${S.tokens} · 🎁 ${town().crates}
        <button class="tlink" onclick="townLeave()">${WL("Sign out","Cerrar sesión")}</button></div></div>
  </section>
  ${EXT.banner.map(f => { try { return f() || ""; } catch(e){ return ""; } }).join("")}
  <nav class="tsub" role="tablist">${tabs.map(([k, ic, l]) => `<button role="tab" aria-selected="${TT === k}" onclick="townTab('${k}')">${ic} ${l}${k === "trades" ? '<b id="ttTradeN"></b>' : ""}</button>`).join("")}</nav>
  <div id="tbody"></div>${teacherLink()}`;
  badge(); paintSub();
}
function teacherLink(){ return TEACHER_OK ? `<p class="muted" style="text-align:center;margin-top:14px"><button class="btn ghost" onclick="townTab('admin')">🧑‍🏫 ${WL("Teacher: manage the Town","Docente: administrar el Pueblo")}</button></p>` : ""; }
window.townTab = function(k){ if (TT === "plaza" && k !== "plaza" && NET && SESS) NET.leavePlaza(); TT = k; VISIT = null; paintTown(); window.scrollTo(0, 0); };
function paintSub(){
  const el = document.getElementById("tbody"); if (!el) return;
  VIEW_SUBS.forEach(u => { try { u(); } catch(e){} }); VIEW_SUBS = []; stopPlaza();
  const ext = EXT.tabs.find(t => t.key === TT);
  (ext ? ext.paint : {plaza:paintPlaza, homes:paintHomes, market:paintMarket, trades:paintTrades, shop:paintShop}[TT] || paintPlaza)(el);
}

/* ---------------------------------------------------------------- join */
function paintJoin(){
  V().innerHTML = `${modeBanner()}
  <section class="panel raised thead" style="background-image:url(${TA}banner_town.jpg)"><div class="theadin">
    <div class="eyebrow">${WL("Your account","Tu cuenta")}</div><h1>${WL("Grenadier Town","Pueblo Grenadier")}</h1>
    <p>${WL("Your Town ID is your account: it saves your progress, Smithbucks, avatar and games so they follow you to any computer.","Tu ID del pueblo es tu cuenta: guarda tu progreso, Smithbucks, avatar y juegos para que te sigan a cualquier computadora.")}</p></div></section>
  <section class="panel tjoin">
    <h2>${WL("Sign in or create your account","Inicia sesión o crea tu cuenta")}</h2>
    <p class="muted" style="font-size:13px;margin:0">${WL("First time? Use a new PIN and your account is created. Coming back or on a new computer? Use the same name and PIN.","¿Primera vez? Elige un PIN y se crea tu cuenta. ¿Regresas o estás en otra computadora? Usa el mismo nombre y PIN.")}</p>
    <label>${WL("Class code (from Coach Smith)","Código de clase (de Coach Smith)")}<input id="jCode" maxlength="7" autocomplete="off" style="text-transform:uppercase" placeholder="ABC123"></label>
    <div class="tgrid2"><label>${WL("First name","Nombre")}<input id="jFirst" maxlength="20" autocomplete="given-name" value="${esc((S.name || "").split(" ")[0] || "")}"></label>
    <label>${WL("Last initial","Inicial del apellido")}<input id="jInit" maxlength="1" autocomplete="off" value="${esc(((S.name || "").split(" ")[1] || "").charAt(0))}"></label></div>
    <label>${WL("4-digit PIN (make one up and remember it)","PIN de 4 dígitos (invéntalo y recuérdalo)")}<input id="jPin" maxlength="4" inputmode="numeric" type="password" autocomplete="off"></label>
    <p class="muted" style="font-size:13px">${WL("Use your first name and last initial only. Your PIN lets you sign in on another computer and keeps your progress safe.",
      "Usa solo tu nombre y la inicial del apellido. Tu PIN te deja entrar en otra computadora y protege tu progreso.")}</p>
    <button class="btn primary wide" id="jGo">${WL("Sign in","Entrar")}</button>
    <p id="jErr" class="terr" role="alert"></p>
  </section>${teacherLink()}`;
  const go = async () => {
    const code = document.getElementById("jCode").value, first = document.getElementById("jFirst").value.trim(),
          init = document.getElementById("jInit").value.trim(), pin = document.getElementById("jPin").value.trim(), err = document.getElementById("jErr");
    if (!/^[\p{L}][\p{L}'’\- ]{0,19}$/u.test(first) || !/^\p{L}$/u.test(init)) { err.textContent = WL("Type your first name and the first letter of your last name.", "Escribe tu nombre y la primera letra de tu apellido."); return; }
    if (!/^\d{4}$/.test(pin)) { err.textContent = WL("Your PIN is 4 numbers.", "Tu PIN son 4 números."); return; }
    err.textContent = WL("Checking…", "Verificando…");
    try {
      const r = await NET.join(code, first, init, pin);
      if (r.err === "code") { err.textContent = WL("That class code wasn't found. Check it with Coach Smith.", "No se encontró ese código. Verifícalo con Coach Smith."); return; }
      if (r.err === "pin") { err.textContent = WL("That name is taken and the PIN doesn't match. If it's you, ask Coach Smith to reset your PIN.", "Ese nombre ya existe y el PIN no coincide. Si eres tú, pide a Coach Smith que reinicie tu PIN."); return; }
      if (r.err) { err.textContent = WL("Something went wrong. Try again.", "Algo salió mal. Inténtalo de nuevo."); return; }
      if (!S.name) S.name = first;
      await startSession(NET.session()); TT = "plaza"; paintTown();
      pushNow();
      toast(WL(`Signed in as ${first}. Your progress now follows you to any computer.`, `Entraste como ${first}. Tu progreso ahora te sigue a cualquier computadora.`));
    } catch(e){ console.warn(e); err.textContent = WL("Couldn't reach the Town. Check your internet and try again.", "No se pudo conectar. Revisa tu internet e inténtalo de nuevo."); }
  };
  document.getElementById("jGo").onclick = go;
  document.getElementById("jPin").onkeydown = e => { if (e.key === "Enter") go(); };
}
/* Sign out. Progress lives in the account, so on a shared computer we clear
   this browser afterwards (only once the cloud copy is confirmed). */
window.townLeave = function(){
  const box = document.getElementById("certAsk"); if (!box) return;
  box.classList.remove("hidden");
  box.innerHTML = `<div class="certask tcard" role="dialog" aria-modal="true"><h2>${WL("Sign out","Cerrar sesión")}</h2>
    <p>${NET.mode === "cloud" ? WL("Your progress, Smithbucks and games are saved to your account. Sign in on any computer with your class code, name and PIN to pick up where you left off.",
      "Tu progreso, Smithbucks y juegos están guardados en tu cuenta. Entra en cualquier computadora con tu código, nombre y PIN para seguir.") : WL("Practice mode: progress stays on this device.","Modo práctica: el progreso se queda en este dispositivo.")}</p>
    ${NET.mode === "cloud" ? `<button class="btn primary wide" onclick="townSignOut(true)">${WL("Sign out and clear this computer (shared computers)","Cerrar sesión y limpiar esta computadora (compartidas)")}</button>` : ""}
    <button class="btn wide" onclick="townSignOut(false)">${WL("Sign out, keep my progress on this computer","Cerrar sesión y dejar mi progreso aquí")}</button>
    <button class="btn ghost wide" onclick="townLeaveClass()">🚪 ${WL("Leave this town (wrong class code?)","Salir de este pueblo (¿código equivocado?)")}</button>
    <button class="btn ghost wide" onclick="townCloseCard()">${WL("Cancel","Cancelar")}</button><p id="soErr" class="terr"></p></div>`;
};
window.townLeaveClass = function(){
  const box = document.getElementById("certAsk"); if (!box || !SESS) return; box.classList.remove("hidden");
  box.innerHTML = `<div class="certask tcard" role="dialog" aria-modal="true"><div class="eyebrow">🚪 ${WL("Leave this town","Salir de este pueblo")}</div>
    <h2>${esc(SESS.className || "")}</h2>
    <p>${WL("Use this if you joined the wrong class. You keep your XP, Smithbucks, certificates, avatar and items. Your house leaves this town's street, and you'll be signed out so you can join with the right class code.",
      "Úsalo si entraste a la clase equivocada. Conservas tu XP, Smithbucks, certificados, avatar y objetos. Tu casa sale de la calle de este pueblo y se cierra tu sesión para que entres con el código correcto.")}</p>
    <button class="btn red wide" onclick="townLeaveGo()">🚪 ${WL("Leave","Salir")} ${esc(SESS.className || "")}</button>
    <button class="btn ghost wide" onclick="townCloseCard()">${WL("Cancel","Cancelar")}</button></div>`;
};
window.townLeaveGo = async function(){
  save(); try { await pushNow(); } catch(e){}
  try { NET.leavePlaza(); } catch(e){}
  run(EXT.onLeave); stopBg(); await NET.leaveClass(); SESS = null; CLS = null; TT = "plaza"; KNOCK_OUT = {};
  townCloseCard(); toast(WL("You left the town. Join with the right class code.","Saliste del pueblo. Entra con el código correcto."));
  if (isTown()) paintTown(); else if (typeof render === "function") render();
};
window.townSignOut = async function(clear){
  const err = document.getElementById("soErr");
  if (clear) {
    if (err) err.textContent = WL("Saving to your account…","Guardando en tu cuenta…");
    save(); const ok = await pushNow();
    if (!ok) { if (err) err.textContent = WL("Couldn't reach your account, so nothing was cleared. Check the internet and try again.","No se pudo guardar en tu cuenta, así que no se borró nada. Revisa el internet e inténtalo de nuevo."); return; }
  }
  try { NET.leavePlaza(); } catch(e){}
  run(EXT.onLeave); stopBg(); NET.leave(); SESS = null; CLS = null; TT = "plaza";
  if (clear) {
    window.__wiping = true; S = blank();   /* nothing may write the old progress back before the reload */
    const kill = []; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i);
      if (k === "smiths.save" || k === "tokenhall.save" || EXTRA.test(k) || /^town\.(linked|cloudAt|session)/.test(k) || k === "world.outbox") kill.push(k); }
    kill.forEach(k => { try { localStorage.removeItem(k); } catch(e){} });
    try { sessionStorage.clear(); } catch(e){}
    location.reload(); return;
  }
  townCloseCard(); paintTown();
};

/* ---------------------------------------------------------------- plaza */
let PL = null;   /* plaza runtime */
const SPR = {};  /* avKey -> Image */
function sprite(eq){
  if (!eq || typeof composeAvatar !== "function") return null; const k = avKey(eq);
  if (!SPR[k]) { SPR[k] = {img:null}; composeAvatar(eq).then(r => { if (r) { const im = new Image(); im.src = r.full; SPR[k].img = im; } }).catch(() => {}); }
  return SPR[k].img;
}
function stopPlaza(){ if (PL) { cancelAnimationFrame(PL.raf); clearInterval(PL.beat); PL = null; } }
function paintPlaza(el){
  const muted = CLS && CLS.muted && CLS.muted[SESS.sid], chatOn = !CLS || CLS.chatOn !== false;
  el.innerHTML = `
  <div class="tplaza"><canvas id="plz" width="${PLAZA_W}" height="${PLAZA_H}" aria-label="${WL("Town plaza. Tap to walk.","Plaza del pueblo. Toca para caminar.")}"></canvas>
    <div class="tonline" id="tOnline"></div></div>
  <div class="tbar">
    <div class="temotes">${window.TOWN_EMOTES.map(([k, e]) => `<button onclick="townEmote('${k}')" aria-label="${k}">${e}</button>`).join("")}</div>
    <button class="btn primary" id="qcBtn" ${!chatOn || muted ? "disabled" : ""} onclick="townPhrases()">💬 ${chatOn ? (muted ? WL("You're muted","Estás silenciado") : WL("Quick chat","Chat rápido")) : WL("Chat is off","Chat apagado")}</button>
  </div>
  <div id="qcMenu" class="tqc" hidden></div>
  <section class="panel tlog"><div class="eyebrow">${WL("Town chat","Chat del pueblo")}</div><ul id="chatLog"></ul></section>
  <p class="muted" style="font-size:12px;text-align:center">${WL("Tap a classmate to wave, visit their house, or trade. Chat uses ready-made phrases, and everyone sees them in their own language.",
    "Toca a un compañero para saludar, visitar su casa o intercambiar. El chat usa frases listas y cada quien las ve en su idioma.")}</p>`;
  const cv = document.getElementById("plz"), cx = cv.getContext("2d");
  const bg = new Image(); bg.src = TA + "plaza_bg.jpg";
  const me = {x:520 + (Math.random() * 160 - 80), y:440 + Math.random() * 50, tx:null, ty:null};
  PL = {cv, cx, bg, me, others:{}, lastSend:0, pending:false, raf:0, beat:0};
  const send = (extra) => { const t = Date.now(); PL.pending = true;
    if (t - PL.lastSend < (NET.plazaRealtime && NET.plazaRealtime() ? 600 : 2500) && !extra) return;
    PL.lastSend = t; PL.pending = false;
    NET.move({x:Math.round(me.tx ?? me.x), y:Math.round(me.ty ?? me.y), eq:myEq(), ...(extra || {})}).catch(e => toastOnce(e)); };
  PL.send = send;
  send({emote:"wave", emoteAt:Date.now()});
  PL.beat = setInterval(() => { if (PL.pending) send(); else if (Date.now() - PL.lastSend > 30000) send(); }, 1300);
  cv.onclick = ev => {
    const r = cv.getBoundingClientRect(), x = (ev.clientX - r.left) * PLAZA_W / r.width, y = (ev.clientY - r.top) * PLAZA_H / r.height;
    /* tapped a classmate? */
    const hit = Object.entries(PL.others).find(([sid, o]) => Math.abs(o.x - x) < 26 && y > o.y - 95 && y < o.y + 6);
    if (hit) return playerCard(hit[0]);
    if (EXT.plazaTap.some(f => { try { return f(x, y); } catch(e){ return false; } })) return;
    const sign = SIGNS.find(s => Math.abs(s.x - x) < 60 && Math.abs(s.y - y) < 34);
    if (sign) return townTab(sign.go);
    [me.tx, me.ty] = clampWalk(x, y); send();
  };
  VIEW_SUBS.push(NET.watchPlaza(rows => { if (!rows) return;
    const cut = Date.now() - 3 * 60e3, seen = {};
    rows.forEach(p => { if (p.id === SESS.sid || !p.at || p.at < cut) return; seen[p.id] = 1;
      const o = PL.others[p.id] || (PL.others[p.id] = {x:p.x, y:p.y});
      const pub = PUB[p.id], real = pub && pub.uid === p.uid ? pub.name : p.name;
      Object.assign(o, {tx:p.x, ty:p.y, name:real, eq:p.eq, emote:p.emote, emoteAt:p.emoteAt || 0}); });
    Object.keys(PL.others).forEach(k => { if (!seen[k]) delete PL.others[k]; });
    const n = Object.keys(PL.others).length + 1, on = document.getElementById("tOnline");
    if (on) on.textContent = WL(`${n} in town`, `${n} en el pueblo`);
  }));
  VIEW_SUBS.push(NET.watchChat(rows => { if (!rows) return; CHAT = rows; paintChatLog(); }));
  VIEW_SUBS.push(NET.watchPub(rows => { if (rows) rows.forEach(p => PUB[p.id] = p); }));
  run(EXT.plazaSub, el);
  const loop = (t0 => function tick(t){
    if (!PL || !cv.isConnected) { stopPlaza(); return; }
    const dt = Math.min(0.05, (t - (PL.t || t)) / 1000); PL.t = t;
    stepTo(me, dt, 230); Object.values(PL.others).forEach(o => stepTo(o, dt, 230));
    drawPlaza(); PL.raf = requestAnimationFrame(tick);
  })();
  PL.raf = requestAnimationFrame(loop);
}
/* sign spots match the painted plaza: street of houses (left), gift shop (top middle), market stalls (right) */
const SIGNS = [{x:150, y:250, go:"homes", e:"🏡", l:["Homes","Casas"]}, {x:820, y:150, go:"market", e:"🛒", l:["Market","Mercado"]},
               {x:500, y:178, go:"shop", e:"🎁", l:["Shop","Tienda"]}, {x:660, y:110, go:"downtown", e:"🗺️", l:["Downtown","Centro"]}];
/* walkable brick: right of the sidewalk and below the shops */
const clampWalk = (x, y) => { y = Math.max(225, Math.min(PLAZA_H - 12, y)); x = Math.max(y < 330 ? 300 : 250, Math.min(PLAZA_W - 25, x)); return [x, y]; };
function stepTo(o, dt, sp){ if (o.tx == null) return; const dx = o.tx - o.x, dy = o.ty - o.y, d = Math.hypot(dx, dy);
  if (d < 2) { o.x = o.tx; o.y = o.ty; o.moving = false; return; } const k = Math.min(1, sp * dt / d); o.x += dx * k; o.y += dy * k; o.moving = true; o.face = dx < 0 ? -1 : 1; }
function drawPlaza(){
  const {cx, bg} = PL;
  if (bg.complete && bg.naturalWidth) cx.drawImage(bg, 0, 0, PLAZA_W, PLAZA_H);
  else { /* fallback: sky, lawn, brick path, fountain */
    cx.fillStyle = "#8ED1FC"; cx.fillRect(0, 0, PLAZA_W, 150);
    cx.fillStyle = "#7BC86C"; cx.fillRect(0, 150, PLAZA_W, PLAZA_H - 150);
    cx.fillStyle = "#D9A47A"; cx.beginPath(); cx.ellipse(480, 360, 330, 120, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = "#B5502E"; for (let i = 0; i < 6; i++) cx.fillRect(60 + i * 150, 110, 110, 70);
    cx.fillStyle = "#9AA7B8"; cx.beginPath(); cx.ellipse(480, 330, 70, 26, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = "#5BB7F0"; cx.beginPath(); cx.ellipse(480, 326, 54, 18, 0, 0, Math.PI * 2); cx.fill();
  }
  run(EXT.plazaBack, cx);
  SIGNS.forEach(s => { cx.fillStyle = "rgba(255,255,255,.92)"; cx.strokeStyle = "#1d1b2e"; cx.lineWidth = 3;
    rr(cx, s.x - 58, s.y - 22, 116, 40, 12); cx.fill(); cx.stroke();
    cx.fillStyle = "#1d1b2e"; cx.font = "800 18px 'Baloo 2', sans-serif"; cx.textAlign = "center"; cx.fillText(`${s.e} ${S.lang === "es" ? s.l[1] : s.l[0]}`, s.x, s.y + 6); });
  const all = Object.entries(PL.others).map(([sid, o]) => ({...o, sid})).concat([{...PL.me, sid:SESS.sid, name:SESS.name, eq:myEq(), me:true, emote:PL.myEmote, emoteAt:PL.myEmoteAt}]);
  all.sort((a, b) => a.y - b.y).forEach(drawPerson);
  run(EXT.plazaFront, cx);
}
function drawPerson(p){
  const {cx} = PL, im = sprite(p.eq), h = 100, w = h * 0.4, bob = p.moving ? Math.sin(performance.now() / 90) * 2 : 0;
  cx.fillStyle = "rgba(0,0,0,.18)"; cx.beginPath(); cx.ellipse(p.x, p.y, 20, 6, 0, 0, Math.PI * 2); cx.fill();
  if (im && im.complete) { cx.save(); if (p.face === -1) { cx.translate(p.x, 0); cx.scale(-1, 1); cx.translate(-p.x, 0); }
    cx.drawImage(im, p.x - w / 2, p.y - h + bob, w, h); cx.restore(); }
  else { cx.fillStyle = p.me ? "#E3A21A" : "#2F7FD8"; cx.beginPath(); cx.arc(p.x, p.y - 60, 16, 0, Math.PI * 2); cx.fill(); cx.fillRect(p.x - 12, p.y - 44, 24, 40); }
  EXT.personDraw.forEach(f => { try { f(cx, p, p.sid || (p.me && SESS ? SESS.sid : null)); } catch(e){} });
  cx.font = "800 13px 'Nunito', sans-serif"; cx.textAlign = "center";
  const tags = EXT.nameTag.map(f => { try { return f(p.sid) || ""; } catch(e){ return ""; } }).join("");
  const label = (tags ? tags + " " : "") + (p.name || ""); const tw = cx.measureText(label).width + 12;
  cx.fillStyle = p.me ? "#E3A21A" : "rgba(29,27,46,.82)"; rr(cx, p.x - tw / 2, p.y + 4, tw, 19, 9); cx.fill();
  cx.fillStyle = p.me ? "#1d1b2e" : "#fff"; cx.fillText(label, p.x, p.y + 18);
  const said = CHAT.find(c => c.sid === p.sid && Date.now() - c.at < 7000);
  const em = p.emote && Date.now() - (p.emoteAt || 0) < 5000 ? (window.TOWN_EMOTES.find(e => e[0] === p.emote) || [])[1] : null;
  if (said) bubble(p.x, p.y - h - 10, L2(window.TOWN_PHRASE[said.p]) || "…");
  else if (em) { cx.font = "34px sans-serif"; cx.fillText(em, p.x, p.y - h - 6); }
}
function bubble(x, y, text){
  const {cx} = PL; cx.font = "700 15px 'Nunito', sans-serif"; const w = Math.min(260, cx.measureText(text).width + 22);
  x = Math.max(w / 2 + 4, Math.min(PLAZA_W - w / 2 - 4, x));
  cx.fillStyle = "#fff"; cx.strokeStyle = "#1d1b2e"; cx.lineWidth = 2.5; rr(cx, x - w / 2, y - 34, w, 32, 12); cx.fill(); cx.stroke();
  cx.fillStyle = "#1d1b2e"; cx.textAlign = "center"; cx.fillText(text.length > 34 ? text.slice(0, 32) + "…" : text, x, y - 13);
}
function rr(c, x, y, w, h, r){ c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
let _lastErr = 0;
function toastOnce(e){ console.warn(e); if (Date.now() - _lastErr > 8000) { _lastErr = Date.now(); toast(WL("Lost connection to the Town for a moment…", "Se perdió la conexión con el Pueblo por un momento…")); } }
window.townEmote = function(k){ if (!PL) return; PL.myEmote = k; PL.myEmoteAt = Date.now(); PL.send({emote:k, emoteAt:Date.now()}); };
window.townPhrases = function(){
  const m = document.getElementById("qcMenu"); if (!m) return;
  if (!m.hidden) { m.hidden = true; return; }
  m.innerHTML = window.TOWN_PHRASES.map(([en, es, list]) => `<div class="tqcg"><div class="eyebrow">${S.lang === "es" ? es : en}</div>
    ${list.map(([id, a, b]) => `<button onclick="townSay('${id}')">${S.lang === "es" ? b : a}</button>`).join("")}</div>`).join("");
  m.hidden = false;
};
let _lastSay = 0;
window.townSay = function(id){
  const m = document.getElementById("qcMenu"); if (m) m.hidden = true;
  if (Date.now() - _lastSay < 2500) return toast(WL("Slow down a little!", "¡Más despacio!"));
  _lastSay = Date.now(); NET.say(id).catch(e => toast(WL("Chat is paused right now.", "El chat está pausado ahora.")));
};
function paintChatLog(){
  const ul = document.getElementById("chatLog"); if (!ul) return;
  ul.innerHTML = CHAT.slice(0, 12).map(c => `<li><b>${esc(c.name)}</b> ${esc(L2(window.TOWN_PHRASE[c.p]) || "…")}</li>`).join("") ||
    `<li class="muted">${WL("No messages yet. Say hi!","Aún no hay mensajes. ¡Saluda!")}</li>`;
}
function playerCard(sid){
  const p = PUB[sid] || {name:(PL.others[sid] || {}).name}; const box = document.getElementById("certAsk"); if (!box) return;
  box.classList.remove("hidden");
  box.innerHTML = `<div class="certask tcard" role="dialog" aria-modal="true">
    <h2>${esc(p.name || "")}</h2><p class="muted">${WL("Level","Nivel")} ${p.lvl || 1}</p>
    <div class="tcardb">
      <button class="btn" onclick="townWave('${sid}')">👋 ${WL("Wave","Saludar")}</button>
      <button class="btn" onclick="townCloseCard();townVisit('${sid}')">🏡 ${WL("Visit house","Visitar casa")}</button>
      <button class="btn primary" onclick="townCloseCard();townTrade('${sid}')">🤝 ${WL("Trade","Intercambiar")}</button></div>
    <button class="btn ghost wide" onclick="townCloseCard()">${WL("Close","Cerrar")}</button></div>`;
}
window.townCloseCard = () => { const b = document.getElementById("certAsk"); if (b) { b.classList.add("hidden"); b.innerHTML = ""; } };
window.townWave = sid => { townCloseCard(); townEmote("wave"); };

/* ---------------------------------------------------------------- homes */
window.townVisit = function(sid){ TT = "homes"; VISIT = sid; paintTown(); };
function paintHomes(el){
  VIEW_SUBS.push(NET.watchPub(rows => { if (!rows) return; rows.forEach(p => PUB[p.id] = p); if (VISIT) paintHouse(el, VISIT); else paintStreet(el); }));
}
function lots(){ return Object.entries(PUB).map(([sid, p]) => ({sid, ...p})).sort((a, b) => (a.since || 0) - (b.since || 0) || (a.name > b.name ? 1 : -1)); }
function paintStreet(el){
  const list = lots();
  el.innerHTML = `<section class="panel"><div class="eyebrow">${WL("Your class's street","La calle de tu clase")}</div>
    <h2 style="margin:4px 0 12px">${WL("Grenadier Lane","Calle Grenadier")}</h2>
    <div class="tstreet">${list.map((p, i) => { const hs = (p.house && p.house.style) || "cottage", mine = p.sid === SESS.sid;
      return `<button class="thouse ${mine ? "mine" : ""}" onclick="townVisit('${p.sid}')">
        <span class="tlot">#${i + 1}</span>
        ${artImg(`${TA}houses/house_${hs}.webp`, "🏠", true)}
        <b>${esc(p.name || "")}${mine ? ` · ${WL("you","tú")}` : ""}</b>${EXT.streetBadge.map(f => f(p) || "").join("")}</button>`; }).join("") || `<p class="muted">${WL("No houses yet.","Aún no hay casas.")}</p>`}</div></section>`;
}
function paintHouse(el, sid){
  const mine = sid === SESS.sid, p = mine ? {name:SESS.name, house:town().house, eq:myEq()} : PUB[sid];
  if (!p) { el.innerHTML = `<p class="muted">…</p>`; return; }
  if (!mine && !canEnter(sid)) return paintDoorstep(el, sid, p);
  const h = p.house || {style:"cottage", slots:{}}, slots = h.slots || {};
  el.innerHTML = `<div class="eprow"><button class="btn ghost" onclick="townVisit(null)">← ${WL("Street","Calle")}</button>
      <h2 style="margin-left:8px">${mine ? WL("My house","Mi casa") : WL(`${esc(p.name)}'s house`, `Casa de ${esc(p.name)}`)}</h2></div>
    <div class="troom" style="background-image:url(${TA}rooms/room_${{farmhouse:"cottage"}[h.style] || h.style || "cottage"}.jpg)">
      ${window.TOWN_SLOTS.slice().sort((p, q) => (p[0] === "rug" ? -1 : q[0] === "rug" ? 1 : p[2][1] - q[2][1])).map(([slot, nm, [x, y], w, an]) => { const id = slots[slot];
        return `<div class="tslot ${an} ${id ? "on" : ""} ${mine ? "edit" : ""}" style="left:${x}%;top:${y}%;--w:${w}%" ${mine ? `onclick="townPlace('${slot}')"` : ""} title="${esc(L2(nm))}">
          ${id ? `<span class="troomi">${artImg(`${TA}items/${id}.webp`, ITEMS[id] ? ITEMS[id].e : "?")}</span>` : mine ? `<span class="tplus">+</span>` : ""}</div>`; }).join("")}
      <img class="towner" data-eqk="${esc(sid)}" alt="">
    </div>
    ${mine ? `<section class="panel"><div class="eyebrow">${WL("House style","Estilo de casa")}</div><div class="tstyles">${HOUSES.map(hs => {
        const own = town().owned[hs.id], cost = Math.round(hs.p * shopMult());
        return `<button class="${h.style === hs.id ? "on" : ""}" onclick="townStyle('${hs.id}')">${artImg(`${TA}houses/house_${hs.id}.webp`, "🏠")}
          ${L2(hs.name)}<small>${own ? (h.style === hs.id ? WL("Living here","Vives aquí") : WL("Owned","Tuya")) : `💵 ${cost}`}</small></button>`; }).join("")}</div>
        <p class="muted" style="font-size:13px">${WL("Tap a + spot in your room to place furniture from your inventory.","Toca un + en tu cuarto para poner muebles de tu inventario.")}</p></section>
      <section class="panel"><div class="eyebrow">🚪 ${WL("Front door","Puerta principal")}</div><div class="seg" role="group">
        ${[["knock","✊ " + WL("Knock first","Tocar primero")],["open","🚪 " + WL("Open house","Casa abierta")],["closed","⛔ " + WL("Do Not Disturb","No molestar")]].map(([v, l]) =>
          `<button aria-pressed="${doorOf({door:h.door}) === v}" onclick="townDoor('${v}')">${l}</button>`).join("")}</div>
        <p class="muted" style="font-size:12px;margin:6px 0 0">${WL("Knock first: classmates ask, and you choose who comes in. Open house: anyone can walk in today. Do Not Disturb: no knocking.","Tocar primero: tus compañeros piden permiso y tú eliges. Casa abierta: cualquiera puede entrar. No molestar: nadie toca.")}</p></section>`
      : `<div class="tstick">${window.TOWN_STICKERS.map(([k, e]) => `<button onclick="townSticker('${sid}','${k}')" aria-label="${k}">${e}</button>`).join("")}
         <button class="btn primary" onclick="townTrade('${sid}')">🤝 ${WL("Trade","Intercambiar")}</button></div>`}
    <section class="panel"><div class="eyebrow">${WL("Guest stickers","Calcomanías de visitas")}</div><div id="tStk" class="tstk"></div></section>
    ${EXT.houseExtra.map(f => f.html(sid) || "").join("")}`;
  run(EXT.houseExtra.map(f => f.after || (() => {})), sid);
  const im = el.querySelector(".towner"); if (im && p.eq && typeof composeAvatar === "function") composeAvatar(p.eq).then(r => { if (r) im.src = r.full; });
  VIEW_SUBS.push(NET.watchStickers(sid, rows => { const box = document.getElementById("tStk"); if (!box || !rows) return;
    rows.sort((a, b) => b.at - a.at);
    box.innerHTML = rows.slice(0, 24).map(r => `<span title="${esc(r.fromName)}">${(window.TOWN_STICKERS.find(s => s[0] === r.s) || [0, "⭐"])[1]}<small>${esc(r.fromName)}</small></span>`).join("")
      || `<span class="muted">${WL("No stickers yet.","Aún no hay calcomanías.")}</span>`; }));
}
window.townSticker = function(sid, k){
  const day = new Date().toISOString().slice(0, 10), key = day + ":" + sid, t = town();
  if (t.stickerDay[key]) return toast(WL("You already left a sticker here today.", "Ya dejaste una calcomanía aquí hoy."));
  NET.sticker(sid, k).then(() => { t.stickerDay = {[key]:1, ...Object.fromEntries(Object.entries(t.stickerDay).filter(([kk]) => kk.startsWith(day)))}; save();
    toast(WL("Sticker left!", "¡Calcomanía dejada!")); }).catch(() => toast(WL("Couldn't leave a sticker right now.", "No se pudo dejar la calcomanía.")));
};
window.townStyle = function(id){
  const t = town(), hs = HOUSES.find(h => h.id === id), cost = Math.round(hs.p * shopMult());
  if (!t.owned[id]) { if (S.tokens < cost) return toast(WL(`You need ${cost} Smithbucks.`, `Necesitas ${cost} Smithbucks.`));
    if (!confirm(WL(`Buy the ${L2(hs.name)} for ${cost} Smithbucks?`, `¿Comprar ${L2(hs.name)} por ${cost} Smithbucks?`))) return;
    coins(-cost); t.owned[id] = 1; }
  t.house.style = id; persist(); paintTown();
};
window.townPlace = function(slot){
  const free = freeInv(), cur = town().house.slots[slot];
  const opts = Object.keys(free).filter(id => ITEMS[id] && ITEMS[id].slot === slot);
  const box = document.getElementById("certAsk"); box.classList.remove("hidden");
  const nm = L2((window.TOWN_SLOTS.find(s => s[0] === slot) || [0, {en:slot}])[1]);
  box.innerHTML = `<div class="certask tcard" role="dialog" aria-modal="true"><h2>${nm}</h2>
    <div class="tpick">${opts.map(id => `<button onclick="townPut('${slot}','${id}')">${itemArt(id, 56)}<span>${itemName(id)}</span></button>`).join("")
      || `<p class="muted">${WL("Nothing for this spot yet. Buy one in the Shop, open a crate, or trade.","Nada para este lugar. Cómpralo en la Tienda, abre una caja o intercambia.")}</p>`}</div>
    ${cur ? `<button class="btn wide" onclick="townPut('${slot}',null)">${WL("Take it out","Quitarlo")}: ${itemName(cur)}</button>` : ""}
    <button class="btn ghost wide" onclick="townCloseCard()">${WL("Close","Cerrar")}</button></div>`;
};
window.townPut = function(slot, id){ town().house.slots[slot] = id || null; if (!id) delete town().house.slots[slot]; townCloseCard(); persist(); paintSub(); };

/* ---------------------------------------------------------------- shop & crates */
function paintShop(el){
  const t = town(), mo = new Date().getMonth() + 1, forSale = Object.values(ITEMS).filter(i => i.p > 0 && (!i.season || i.season === mo))
    .sort((a, b) => (b.season ? 1 : 0) - (a.season ? 1 : 0));
  el.innerHTML = `<section class="panel tcrates">${artImg(`${TA}ui/crate.webp`, "🎁", true)}
      <div><div class="eyebrow">${WL("Crates","Cajas")}</div><h2>${WL(`You have ${t.crates}`, `Tienes ${t.crates}`)}</h2>
      <p class="muted">${WL("Earn a crate for every certificate and every level up. Rare pets and trophies only come from crates, so trade for the ones you want!",
        "Gana una caja por cada certificado y cada nivel. Las mascotas y trofeos raros solo salen de cajas: ¡intercambia por los que quieras!")}</p>
      <button class="btn primary" ${t.crates ? "" : "disabled"} onclick="townOpenCrate()">${WL("Open a crate","Abrir una caja")}</button></div></section>
    <section class="panel"><div class="eyebrow">${WL("Furniture shop","Tienda de muebles")}${shopMult() !== 1 ? ` · ${WL("prices ×","precios ×")}${shopMult()}` : ""}</div>
      <div class="tgridi">${forSale.map(i => `<div class="tcardi ${i.season ? "tseason" : ""}">${i.season ? `<i class="tlimit">⏳ ${WL("This month only","Solo este mes")}</i>` : ""}${itemArt(i.id, 64)}<b>${L2(i.name)}</b>
        <button class="btn" onclick="townBuyShop('${i.id}')">💵 ${priceOf(i)}</button></div>`).join("")}</div></section>
    <section class="panel"><div class="eyebrow">${WL("My inventory","Mi inventario")}</div><div class="tgridi">${invCards()}</div></section>`;
}
function invCards(){
  const inv = town().inv, free = freeInv();
  return Object.entries(inv).map(([id, n]) => `<div class="tcardi">${itemArt(id, 56)}<b>${itemName(id)}</b>${rarityChip(id)}
    <small class="muted">${n}× · ${WL("free","libre")} ${free[id] || 0}</small></div>`).join("") || `<p class="muted">${WL("Empty. Open a crate!","Vacío. ¡Abre una caja!")}</p>`;
}
window.townBuyShop = function(id){
  const it = ITEMS[id], cost = priceOf(it);
  if (S.tokens < cost) return toast(WL(`You need ${cost} Smithbucks. Study and play to earn more!`, `Necesitas ${cost} Smithbucks. ¡Estudia y juega para ganar más!`));
  coins(-cost); addItem(id, 1); persist(); paintSub(); toast(WL(`Bought: ${L2(it.name)}`, `Compraste: ${L2(it.name)}`));
};
window.townOpenCrate = function(){
  const t = town(); if (!t.crates) return; t.crates--; const id = rollCrate(); addItem(id, 1); persist();
  const r = RAR[ITEMS[id].r], box = document.getElementById("certAsk"); box.classList.remove("hidden");
  box.innerHTML = `<div class="certask tcard tcrate" role="dialog" aria-modal="true" style="--rc:${r.c}">
    <div class="eyebrow" style="color:${r.c}">${L2(r)}</div>${itemArt(id, 120)}<h2>${itemName(id)}</h2>
    <button class="btn primary wide" onclick="townCloseCard();townTab('shop')">${WL("Nice!","¡Genial!")}</button></div>`;
  if (typeof fireConfetti === "function" && ITEMS[id].r >= 2) fireConfetti();
};

/* ---------------------------------------------------------------- market */
function paintMarket(el){
  const ceil = CLS && CLS.econ && CLS.econ.ceiling | 0;
  el.innerHTML = `${EXT.marketTop.map(f => { try { return f() || ""; } catch(e){ return ""; } }).join("")}<section class="panel"><div class="eyebrow">${WL("Sell something","Vende algo")}</div>
      <div class="tsell"><select id="mItem">${Object.entries(freeInv()).map(([id, n]) => `<option value="${id}">${itemName(id)} (${n})</option>`).join("")}</select>
      <input id="mPrice" type="number" min="1" ${ceil ? `max="${ceil}"` : ""} placeholder="${WL("Price","Precio")}" inputmode="numeric">
      <button class="btn primary" onclick="townList()">${WL("List it","Publicar")}</button></div>
      ${ceil ? `<p class="tnote">⚠️ ${WL(`Price ceiling: Coach Smith capped prices at ${ceil} Smithbucks.`, `Precio máximo: Coach Smith limitó los precios a ${ceil} Smithbucks.`)}</p>` : ""}</section>
    <section class="panel"><div class="eyebrow">${WL("For sale","En venta")}</div><div id="mList" class="tgridi"></div></section>
    <section class="panel"><div class="eyebrow">${WL("Recent sales (what things are worth)","Ventas recientes (lo que valen las cosas)")}</div><div id="mHist"></div></section>`;
  VIEW_SUBS.push(NET.watchMarket(rows => { if (!rows) return; MARKET = rows.sort((a, b) => b.at - a.at); paintListings(); }));
  VIEW_SUBS.push(NET.watchSales(SESS.cid, rows => { if (!rows) return; const box = document.getElementById("mHist"); if (!box) return;
    const by = {}; rows.forEach(r => (by[r.item] = by[r.item] || []).push(r));
    box.innerHTML = Object.entries(by).map(([id, l]) => { l.sort((a, b) => b.soldAt - a.soldAt); const avg = Math.round(l.reduce((s, r) => s + r.price, 0) / l.length);
      return `<div class="thist">${itemArt(id, 32)}<b>${itemName(id)}</b><span>${WL("avg","prom.")} 💵${avg}</span><span class="muted">${l.slice(0, 6).map(r => r.price).join(" · ")}</span></div>`; }).join("")
      || `<p class="muted">${WL("No sales yet.","Aún no hay ventas.")}</p>`; }));
}
function paintListings(){
  const box = document.getElementById("mList"); if (!box) return;
  box.innerHTML = MARKET.map(m => { const mine = m.seller === SESS.sid;
    return `<div class="tcardi">${itemArt(m.item, 64)}<b>${itemName(m.item)}</b>${rarityChip(m.item)}<small class="muted">${WL("from","de")} ${esc(m.sellerName)}</small>
      ${mine ? `<button class="btn ghost" onclick="townCancel('${m.id}')">${WL("Take down","Retirar")}</button>`
             : `<button class="btn primary" onclick="townBuy('${m.id}')">💵 ${m.price}</button>`}</div>`; }).join("")
    || `<p class="muted">${WL("Nothing for sale right now. Be the first!","No hay nada en venta. ¡Sé el primero!")}</p>`;
}
window.townList = async function(){
  const id = document.getElementById("mItem").value, price = parseInt(document.getElementById("mPrice").value, 10), ceil = CLS && CLS.econ && CLS.econ.ceiling | 0;
  if (!id || !freeInv()[id]) return toast(WL("Pick something you own (and that isn't in your house).", "Elige algo tuyo (que no esté en tu casa)."));
  if (!(price >= 1 && price <= 999)) return toast(WL("Set a price from 1 to 999 Smithbucks.", "Pon un precio de 1 a 999 Smithbucks."));
  if (ceil && price > ceil) return toast(WL(`The price ceiling is ${ceil} Smithbucks.`, `El precio máximo es ${ceil} Smithbucks.`));
  for (const f of EXT.listCheck) { const msg = f(id, price); if (msg) return toast(msg); }
  addItem(id, -1); save();                                      /* escrow first, so it can't be sold twice */
  try { const lid = await NET.listItem(id, price); town().applied["list:" + lid] = Date.now(); persist(); toast(WL("Listed!", "¡Publicado!")); paintSub(); }
  catch(e){ addItem(id, 1); save(); toast(WL("Couldn't list it right now.", "No se pudo publicar.")); }
};
window.townCancel = id => NET.cancelListing(id).then(() => toast(WL("Taken down. It's back in your inventory.", "Retirado. Volvió a tu inventario."))).catch(() => toast(WL("Couldn't take it down.", "No se pudo retirar.")));
window.townBuy = async function(id){
  const m = MARKET.find(x => x.id === id); if (!m) return;
  if (S.tokens < m.price) return toast(WL(`You need ${m.price} Smithbucks.`, `Necesitas ${m.price} Smithbucks.`));
  if (!confirm(WL(`Buy ${itemName(m.item)} from ${m.sellerName} for ${m.price} Smithbucks?`, `¿Comprar ${itemName(m.item)} a ${m.sellerName} por ${m.price} Smithbucks?`))) return;
  try { const r = await NET.buy(id);
    if (r.err) return toast(WL("Someone bought it first!", "¡Alguien lo compró primero!"));
    once("buy:" + id, () => { coins(-m.price); addItem(m.item, 1); run(EXT.onBuy, m); }); persist();
    toast(WL(`You bought ${itemName(m.item)}!`, `¡Compraste ${itemName(m.item)}!`));
  } catch(e){ toast(WL("Someone bought it first!", "¡Alguien lo compró primero!")); }
};

/* ---------------------------------------------------------------- trades */
let DRAFT_T = null;
window.townTrade = function(sid){ DRAFT_T = {to:sid, give:[], get:[], cg:0, cr:0}; TT = "trades"; paintTown(); };
function paintTrades(el){
  VIEW_SUBS.push(NET.watchPub(rows => { if (rows) rows.forEach(p => PUB[p.id] = p); drawTrades(el); }));
}
function drawTrades(el){
  const nm = sid => esc((PUB[sid] || {}).name || "?");
  const tradeLine = (t, inbox) => `<div class="ttrade"><div><b>${inbox ? nm(t.from) || esc(t.fromName) : esc(t.toName)}</b>
      <div class="tsides"><div><small>${inbox ? WL("They give","Te dan") : WL("You give","Das")}</small>${(t.give || []).map(id => itemArt(id, 40)).join("")}${t.cg ? `<span>💵${t.cg}</span>` : ""}</div>
      <span>⇄</span><div><small>${inbox ? WL("You give","Das") : WL("You get","Recibes")}</small>${(t.get || []).map(id => itemArt(id, 40)).join("")}${t.cr ? `<span>💵${t.cr}</span>` : ""}</div></div></div>
      <div class="tst">${t.status === "offered" ? (inbox ? `<button class="btn primary" onclick="townAccept('${t.id}')">${WL("Accept","Aceptar")}</button>
          <button class="btn ghost" onclick="townDecline('${t.id}')">${WL("No thanks","No, gracias")}</button>` : `<button class="btn ghost" onclick="townCancelTrade('${t.id}')">${WL("Cancel","Cancelar")}</button>`)
        : `<span class="tchip">${{accepted:WL("Done","Hecho"), declined:WL("Declined","Rechazado"), cancelled:WL("Cancelled","Cancelado"), undone:WL("Undone by teacher","Deshecho")}[t.status] || t.status}</span>`}</div></div>`;
  const inbox = T_TO.slice().sort((a, b) => b.at - a.at), sent = T_FROM.slice().sort((a, b) => b.at - a.at);
  el.innerHTML = `${DRAFT_T ? composer() : `<section class="panel"><p>${WL("Start a trade by tapping a classmate in the Plaza or visiting their house.","Empieza un intercambio tocando a un compañero en la Plaza o visitando su casa.")}</p>
      <div class="tpeople">${lots().filter(p => p.sid !== SESS.sid).map(p => `<button class="btn" onclick="townTrade('${p.sid}')">${esc(p.name)}</button>`).join("")}</div></section>`}
    <section class="panel"><div class="eyebrow">${WL("Offers for you","Ofertas para ti")}</div>${inbox.map(t => tradeLine(t, true)).join("") || `<p class="muted">${WL("None yet.","Ninguna.")}</p>`}</section>
    <section class="panel"><div class="eyebrow">${WL("Offers you sent","Ofertas enviadas")}</div>${sent.map(t => tradeLine(t, false)).join("") || `<p class="muted">${WL("None yet.","Ninguna.")}</p>`}</section>`;
}
function composer(){
  const d = DRAFT_T, them = PUB[d.to] || {}, free = freeInv(), theirs = (them.shelf || []).filter(id => ITEMS[id]);
  const pick = (list, side, sel) => list.map(id => `<button class="${sel.includes(id) ? "on" : ""}" onclick="townPick('${side}','${id}')">${itemArt(id, 44)}<span>${itemName(id)}</span></button>`).join("");
  return `<section class="panel tcomp"><div class="eyebrow">${WL("New trade with","Nuevo intercambio con")} ${esc(them.name || "")}</div>
    <div class="tcols"><div><h3>${WL("You give","Das")}</h3><div class="tpick">${pick(Object.keys(free), "give", d.give) || `<p class="muted">${WL("No free items.","Sin artículos libres.")}</p>`}</div>
        <label>💵 <input type="number" min="0" max="50" value="${d.cg}" onchange="DRAFT_SET('cg',this.value)"></label></div>
      <div><h3>${WL("You get","Recibes")}</h3><div class="tpick">${pick(theirs, "get", d.get) || `<p class="muted">${WL("They have nothing to trade yet.","Aún no tiene nada para intercambiar.")}</p>`}</div>
        <label>💵 <input type="number" min="0" max="50" value="${d.cr}" onchange="DRAFT_SET('cr',this.value)"></label></div></div>
    <div class="tcompb"><button class="btn ghost" onclick="DRAFT_SET('x')">${WL("Cancel","Cancelar")}</button>
      <button class="btn primary" onclick="townSendTrade()">${WL("Send offer","Enviar oferta")}</button></div></section>`;
}
window.townPick = function(side, id){ const a = DRAFT_T[side], i = a.indexOf(id); if (i >= 0) a.splice(i, 1); else if (a.length < 4) a.push(id); paintSub(); };
window.DRAFT_SET = function(k, v){ if (k === "x") { DRAFT_T = null; return paintSub(); } DRAFT_T[k] = Math.max(0, Math.min(50, parseInt(v, 10) || 0)); };
window.townSendTrade = async function(){
  const d = DRAFT_T, them = PUB[d.to];
  if (!them) return toast(WL("That classmate isn't in town yet.", "Ese compañero aún no está en el pueblo."));
  if (!d.give.length && !d.cg) return toast(WL("Add something to give.", "Agrega algo para dar."));
  if (!d.get.length && !d.cr) return toast(WL("Ask for something back.", "Pide algo a cambio."));
  if (d.cg > S.tokens) return toast(WL("You don't have that many Smithbucks.", "No tienes tantas Smithbucks."));
  const free = freeInv(); if (d.give.some(id => !free[id])) return toast(WL("One of those items isn't free to trade.", "Uno de esos artículos no está libre."));
  d.give.forEach(id => addItem(id, -1)); coins(-d.cg); save();       /* escrow */
  try { const id = await NET.offer(d.to, them.uid, them.name, d.give, d.cg, d.get, d.cr); town().applied["tgive:" + id] = Date.now();
    DRAFT_T = null; persist(); toast(WL("Offer sent!", "¡Oferta enviada!")); paintSub(); }
  catch(e){ d.give.forEach(id => addItem(id, 1)); coins(d.cg); save(); toast(WL("Couldn't send the offer.", "No se pudo enviar la oferta.")); }
};
window.townAccept = async function(id){
  const t = T_TO.find(x => x.id === id); if (!t) return;
  const free = freeInv(); if ((t.get || []).some(i => !free[i])) return toast(WL("You no longer have one of the items they asked for (or it's in your house).", "Ya no tienes uno de los artículos que pidieron (o está en tu casa)."));
  if ((t.cr | 0) > S.tokens) return toast(WL("You don't have enough Smithbucks for this trade.", "No tienes suficientes Smithbucks."));
  try { await NET.respond(id, "accepted");
    once("tacc:" + id, () => { (t.get || []).forEach(i => addItem(i, -1)); coins(-(t.cr | 0)); (t.give || []).forEach(i => addItem(i, 1)); coins(t.cg | 0); });
    persist(); toast(WL("Trade complete!", "¡Intercambio completado!")); }
  catch(e){ toast(WL("That offer isn't available anymore.", "Esa oferta ya no está disponible.")); }
};
window.townDecline = id => NET.respond(id, "declined").catch(() => {});
window.townCancelTrade = id => NET.respond(id, "cancelled").catch(() => {});

/* ---------------------------------------------------------------- teacher */
function paintAdmin(){
  if (!TEACHER_OK) { TT = "plaza"; return paintTown(); }
  const t = NET.teacher();
  if (!t) {
    V().innerHTML = `${modeBanner()}<section class="panel tjoin"><div class="eyebrow">${WL("Teacher","Docente")}</div><h2>${WL("Sign in to manage the Town","Inicia sesión para administrar el Pueblo")}</h2>
      <label>Email<input id="tEm" type="email" autocomplete="username"></label>
      <label>${WL("Password","Contraseña")}<input id="tPw" type="password" autocomplete="current-password"></label>
      <div class="tgrid2"><button class="btn primary" onclick="townTSign(false)">${WL("Sign in","Entrar")}</button><button class="btn" onclick="townTSign(true)">${WL("Create account","Crear cuenta")}</button></div>
      <button class="btn ghost wide" onclick="townTReset()">🔑 ${WL("Forgot password? Email me a reset link","¿Olvidaste la contraseña? Envíame un enlace")}</button>
      <p id="tErr" class="terr" role="alert"></p><button class="btn ghost wide" onclick="townTab('plaza')">← ${WL("Back to Town","Volver al Pueblo")}</button></section>`;
    return;
  }
  NET.myClasses().then(list => {
    if (!ADMIN_CID && list.length) ADMIN_CID = list[0].id;
    V().innerHTML = `${modeBanner()}<section class="panel raised"><div class="eprow" style="justify-content:space-between;flex-wrap:wrap">
        <div><div class="eyebrow">${WL("Town controls","Controles del Pueblo")} · ${esc(t.email || "")}</div><h1 style="margin:2px 0">${WL("Grenadier Town","Pueblo Grenadier")}</h1></div>
        <div><button class="btn ghost" onclick="townTab('plaza')">← ${WL("Town","Pueblo")}</button> <button class="btn ghost" onclick="townTOut()">${WL("Sign out","Salir")}</button></div></div>
      <div class="tclasses">${list.map(c => `<button class="${c.id === ADMIN_CID ? "on" : ""}" onclick="townAdminPick('${c.id}')">${esc(c.name)}<b>${c.code}</b></button>`).join("")}
        <button onclick="townNewClass()">＋ ${WL("New class period","Nuevo periodo")}</button></div></section>
      <div id="tAdm"></div>`;
    if (ADMIN_CID) paintAdminClass(list.find(c => c.id === ADMIN_CID));
  }).catch(e => { console.warn(e); V().innerHTML = `<p class="terr">${WL("Couldn't load your classes.","No se pudieron cargar tus clases.")}</p>`; });
}
window.townTSign = async function(create){
  const em = document.getElementById("tEm").value.trim(), pw = document.getElementById("tPw").value, err = document.getElementById("tErr");
  try { if (create) await NET.teacherSignUp(em, pw); else await NET.teacherSignIn(em, pw); paintAdmin(); }
  catch(e){ err.textContent = (e && e.code || "").replace("auth/", "") || WL("Sign-in failed.","Error al entrar."); }
};
window.townTReset = async function(){
  const em = document.getElementById("tEm").value.trim(), err = document.getElementById("tErr");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { err.style.color = ""; err.textContent = WL("Type your email above first, then tap the reset button.", "Escribe tu correo arriba y luego toca el botón."); return; }
  err.style.color = ""; err.textContent = WL("Sending…", "Enviando…");
  try { await NET.resetPassword(em); err.style.color = "var(--crt, #2b7a46)";
    err.textContent = WL(`Check ${em} for a reset link (look in spam too). Then come back and sign in with the new password.`, `Revisa ${em} para el enlace (también en spam). Luego vuelve y entra con la nueva contraseña.`); }
  catch(e){ const c = (e && e.code || "").replace("auth/", "");
    err.textContent = c === "practice-mode" ? WL("Password reset needs the Town connected to the cloud.", "Restablecer la contraseña requiere que el Pueblo esté en la nube.")
      : c === "user-not-found" || c === "invalid-email" ? WL("No teacher account uses that email.", "Ninguna cuenta docente usa ese correo.")
      : c === "too-many-requests" ? WL("Too many tries. Wait a few minutes and try again.", "Demasiados intentos. Espera unos minutos.")
      : WL("Couldn't send the email: ", "No se pudo enviar: ") + (c || "error"); }
};
window.townTOut = async () => { await NET.teacherSignOut(); ADMIN_CID = null; paintAdmin(); };
window.townAdminPick = id => { ADMIN_CID = id; paintAdmin(); };
window.townNewClass = async function(){
  const name = prompt(WL("Name this class (for example: Period 2 · AP Macro)", "Nombre de la clase (por ejemplo: Periodo 2 · Macro AP)")); if (!name) return;
  const r = await NET.createClass(name.slice(0, 40)); ADMIN_CID = r.cid; paintAdmin();
};
function paintAdminClass(c){
  const box = document.getElementById("tAdm"); if (!box || !c) return;
  const e = c.econ || {shopMult:1, ceiling:0};
  box.innerHTML = `<section class="panel tadm">
      <div class="tcode"><span>${WL("Class code","Código")}</span><b>${c.code}</b><small>${WL("Students: Town → Join your class","Estudiantes: Pueblo → Únete a tu clase")}</small></div>
      <div class="tsw">
        <button class="btn ${c.frozen ? "primary" : ""}" onclick="townSet('frozen',${!c.frozen})">${c.frozen ? "▶️ " + WL("Unpause the Town","Reanudar el Pueblo") : "⏸️ " + WL("Pause the Town (eyes up front)","Pausar el Pueblo (atención)")}</button>
        <button class="btn" onclick="townSet('chatOn',${!c.chatOn})">${c.chatOn ? "🔇 " + WL("Turn chat off","Apagar chat") : "💬 " + WL("Turn chat on","Encender chat")}</button>
        <button class="btn" onclick="townProjector()">📽️ ${WL("Show the plaza on the board","Mostrar la plaza en el pizarrón")}</button></div></section>
    <section class="panel tadm"><div class="eyebrow">${WL("Economy levers","Palancas económicas")}</div>
      <div class="tlev"><label>${WL("Shop prices ×","Precios de tienda ×")}<input type="number" step="0.25" min="0.25" max="5" value="${e.shopMult}" onchange="townEcon('shopMult',this.value)"></label>
        <label>${WL("Market price ceiling (0 = none)","Precio máximo del mercado (0 = ninguno)")}<input type="number" min="0" max="999" value="${e.ceiling}" onchange="townEcon('ceiling',this.value)"></label>
        <button class="btn" onclick="townStim()">💸 ${WL("Stimulus: give every student Smithbucks","Estímulo: dar Smithbucks a todos")}</button>
        <button class="btn" onclick="townGift()">🎁 ${WL("Give every student a crate","Dar una caja a todos")}</button></div>
      <p class="muted" style="font-size:13px">${WL("Try it in class: raise shop prices (inflation), set a price ceiling below what pets sell for and watch the shortage, or pay a stimulus and watch Market prices climb.",
        "Pruébalo en clase: sube los precios (inflación), pon un precio máximo menor al de las mascotas y observa la escasez, o da un estímulo y mira subir los precios.")}</p></section>
    ${EXT.adminPanels.map(f => f.html(c) || "").join("")}
    <section class="panel tadm"><div class="eyebrow">${WL("Roster","Lista")}</div><div id="tRos">…</div></section>
    <section class="panel tadm"><div class="eyebrow">${WL("Chat log","Registro del chat")}</div><ul id="tChat" class="tlogl"></ul></section>
    <section class="panel tadm"><div class="eyebrow">${WL("Sales and trades","Ventas e intercambios")}</div><div id="tDeals"></div></section>`;
  run(EXT.adminPanels.map(f => f.after || (() => {})), c);
  NET.roster(c.id).then(rows => { const r = document.getElementById("tRos"); if (!r) return;
    r.innerHTML = `<table class="ttab"><tr><th>${WL("Student","Estudiante")}</th><th>${WL("Last save","Último guardado")}</th><th></th></tr>${rows.map(s => `<tr><td>${esc(s.name)}${s.left ? ` <small class="muted">· ${WL("left the class","salió de la clase")} ${new Date(s.left).toLocaleDateString()}</small>` : ""}</td>
      <td>${s.saveAt ? new Date(s.saveAt).toLocaleString() : "—"}</td><td>
      <button class="btn ghost" onclick="townMute('${s.id}')">${(c.muted || {})[s.id] ? WL("Unmute","Activar") : WL("Mute","Silenciar")}</button>
      <button class="btn ghost" onclick="townResetPin('${s.id}','${esc(s.name)}')">${WL("Reset PIN","Reiniciar PIN")}</button>
      <button class="btn ghost" onclick="townRemove('${s.id}','${esc(s.name)}')">${WL("Remove","Quitar")}</button></td></tr>`).join("")}</table>`
      + (rows.length ? "" : `<p class="muted">${WL("No students yet. Share the class code.","Aún no hay estudiantes. Comparte el código.")}</p>`); }).catch(() => {});
  VIEW_SUBS.push(NET.watchClassCol(c.id, "chat", {orderBy:["at","desc"], limit:60}, rows => { const ul = document.getElementById("tChat"); if (!ul || !rows) return;
    ul.innerHTML = rows.map(m => `<li><small>${new Date(m.at).toLocaleTimeString()}</small> <b>${esc(m.name)}</b> ${esc(L2(window.TOWN_PHRASE[m.p]) || m.p)}</li>`).join("") || `<li class="muted">—</li>`; }));
  let SALES = [], TRADES = [];
  const deals = () => { const d = document.getElementById("tDeals"); if (!d) return;
    const all = SALES.map(m => ({k:"market", at:m.soldAt || m.at, id:m.id, st:m.status, txt:`🛒 ${esc(m.buyerName || "—")} ${WL("bought","compró")} ${itemName(m.item)} ${WL("from","de")} ${esc(m.sellerName)} · 💵${m.price}`}))
      .concat(TRADES.map(t => ({k:"trades", at:t.respondedAt || t.at, id:t.id, st:t.status, txt:`🤝 ${esc(t.fromName)} → ${esc(t.toName)}: ${(t.give || []).map(itemName).join(", ")}${t.cg ? " +💵" + t.cg : ""} ⇄ ${(t.get || []).map(itemName).join(", ")}${t.cr ? " +💵" + t.cr : ""}`})))
      .filter(x => x.st === "sold" || x.st === "accepted" || x.st === "undone").sort((a, b) => b.at - a.at).slice(0, 60);
    d.innerHTML = all.map(x => `<div class="tdeal"><span>${x.txt}</span>${x.st === "undone" ? `<span class="tchip">${WL("undone","deshecho")}</span>`
      : `<button class="btn ghost" onclick="townUndo('${x.k}','${x.id}')">↩️ ${WL("Undo","Deshacer")}</button>`}</div>`).join("") || `<p class="muted">—</p>`; };
  VIEW_SUBS.push(NET.watchClassCol(c.id, "market", {}, rows => { if (rows) { SALES = rows; deals(); } }));
  VIEW_SUBS.push(NET.watchClassCol(c.id, "trades", {}, rows => { if (rows) { TRADES = rows; deals(); } }));
}
const adminSet = patch => NET.setClass(ADMIN_CID, patch).then(paintAdmin).catch(e => alert(e.message || e));
window.townSet = (k, v) => adminSet({[k]:v});
window.townEcon = async function(k, v){ const list = await NET.myClasses(), c = list.find(x => x.id === ADMIN_CID);
  const e = {...(c.econ || {shopMult:1, ceiling:0})}; e[k] = k === "ceiling" ? Math.max(0, parseInt(v, 10) || 0) : k === "rate" ? Math.max(0, Math.min(10, +v || 0)) : Math.max(0.25, Math.min(5, +v || 1)); adminSet({econ:e}); };
window.townStim = () => { const n = parseInt(prompt(WL("How many Smithbucks for every student?","¿Cuántos Smithbucks para cada estudiante?"), "5"), 10); if (n > 0 && n <= 100) adminSet({stimulus:{id:Date.now().toString(36), coins:n}}); };
window.townGift = () => { if (confirm(WL("Give every student 1 crate?","¿Dar 1 caja a cada estudiante?"))) adminSet({gift:{id:Date.now().toString(36), crates:1, to:"all"}}); };
window.townMute = async sid => { const list = await NET.myClasses(), c = list.find(x => x.id === ADMIN_CID); const m = {...(c.muted || {})}; if (m[sid]) delete m[sid]; else m[sid] = true; adminSet({muted:m}); };
window.townResetPin = (sid, nm) => { if (confirm(WL(`Reset ${nm}'s PIN? They'll set a new one next time they join.`, `¿Reiniciar el PIN de ${nm}?`))) NET.resetPin(ADMIN_CID, sid).then(() => alert(WL("Done.","Listo."))); };
window.townRemove = (sid, nm) => { if (confirm(WL(`Remove ${nm} from this class? Their cloud save is deleted.`, `¿Quitar a ${nm} de la clase? Se borra su progreso en la nube.`))) NET.removeStudent(ADMIN_CID, sid).then(paintAdmin); };
window.townUndo = (k, id) => { if (confirm(WL("Undo this? Both students get back what they had.", "¿Deshacer? Ambos estudiantes recuperan lo que tenían."))) NET.undo(ADMIN_CID, k, id).catch(e => alert(e.message || e)); };
window.townProjector = function(){
  /* read-only plaza for the board: the teacher watches without walking around */
  const cid = ADMIN_CID; clearView();
  V().innerHTML = `<div class="eprow"><button class="btn ghost" onclick="paintTownAdmin()">← ${WL("Controls","Controles")}</button></div>
    <div class="tplaza"><canvas id="plz" width="${PLAZA_W}" height="${PLAZA_H}"></canvas><div class="tonline" id="tOnline"></div></div>
    <div id="tProjX"></div><section class="panel tlog"><ul id="chatLog"></ul></section>`;
  run(EXT.projector, cid);
  const cv = document.getElementById("plz"), bg = new Image(); bg.src = TA + "plaza_bg.jpg";
  PL = {cv, cx:cv.getContext("2d"), bg, props:{}, me:{x:-999, y:-999}, others:{}, send(){}, raf:0, beat:0};
  VIEW_SUBS.push(NET.watchPlaza(rows => { if (!rows) return; const cut = Date.now() - 3 * 60e3, seen = {};
    rows.forEach(p => { if (!p.at || p.at < cut) return; seen[p.id] = 1; const o = PL.others[p.id] || (PL.others[p.id] = {x:p.x, y:p.y});
      Object.assign(o, {tx:p.x, ty:p.y, name:p.name, eq:p.eq, emote:p.emote, emoteAt:p.emoteAt || 0}); });
    Object.keys(PL.others).forEach(k => { if (!seen[k]) delete PL.others[k]; });
    const on = document.getElementById("tOnline"); if (on) on.textContent = WL(`${Object.keys(PL.others).length} in town`, `${Object.keys(PL.others).length} en el pueblo`); }, cid));
  VIEW_SUBS.push(NET.watchClassCol(cid, "chat", {orderBy:["at","desc"], limit:40}, rows => { if (rows) { CHAT = rows; paintChatLog(); } }));
  const tick = t => { if (!PL || !cv.isConnected) { stopPlaza(); return; } const dt = Math.min(0.05, (t - (PL.t || t)) / 1000); PL.t = t;
    Object.values(PL.others).forEach(o => stepTo(o, dt, 230));
    const keepMe = PL.me; drawPlazaOthers(); PL.me = keepMe; PL.raf = requestAnimationFrame(tick); };
  PL.raf = requestAnimationFrame(tick);
};
window.paintTownAdmin = () => { clearView(); TT = "admin"; paintTown(); };
function drawPlazaOthers(){
  const {cx, bg} = PL;
  if (bg.complete && bg.naturalWidth) cx.drawImage(bg, 0, 0, PLAZA_W, PLAZA_H); else { cx.fillStyle = "#7BC86C"; cx.fillRect(0, 0, PLAZA_W, PLAZA_H); }
  run(EXT.plazaBack, cx);
  Object.entries(PL.others).map(([sid, o]) => ({...o, sid})).sort((a, b) => a.y - b.y).forEach(drawPerson);
  run(EXT.plazaFront, cx);
}

window.TOWN = {boot, get net(){ return NET; }, get session(){ return SESS; }, town, crateTick, pushNow,
  EXT, get cls(){ return CLS; }, get pub(){ return PUB; }, get tt(){ return TT; }, get plaza(){ return PL; }, get adminCid(){ return ADMIN_CID; },
  viewSub: u => VIEW_SUBS.push(u), publishNow, paintSub, paintTown, paintAdmin, toast, coins, persist, once, addItem, has, freeInv, itemArt, itemName, artImg, rarityChip,
  ITEMS, L2, TA, isTown, canEnter, shopMult, priceOf, rr, publishSoon, lots, adminSet: patch => adminSet(patch)};
boot();
})();

/* Campus: your account (the Town ID) at the top of the campus screen */
(function(){
  const _vc = window.viewCampus;
  if (typeof _vc !== "function") return;
  window.viewCampus = function(){
    _vc.apply(this, arguments);
    const v = document.getElementById("view"); if (!v || document.getElementById("townSign")) return;
    const d = document.createElement("section"); d.id = "townSign"; d.className = "panel raised tsign";
    const T = window.TOWN, s = T && T.session, cloud = T && T.net && T.net.mode === "cloud";
    if (s) {
      const at = +localStorage.getItem("town.cloudAt") || 0;
      d.innerHTML = `<div><div class="eyebrow">☁️ ${WL("Your account","Tu cuenta")}</div><h2 style="margin:2px 0">${esc(s.name)} · ${esc(s.className || "")}</h2>
        <p style="margin:0">${cloud ? WL("Your progress, Smithbucks and games follow you to any computer.","Tu progreso, Smithbucks y juegos te siguen a cualquier computadora.") + (at ? ` <span class="muted">· ${WL("saved","guardado")} ${new Date(at).toLocaleTimeString([], {hour:"numeric", minute:"2-digit"})}</span>` : "")
          : WL("Practice mode: saved on this device only.","Modo práctica: solo en este dispositivo.")}</p></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" onclick="go('town')">${WL("Go to Town","Ir al Pueblo")} →</button>
        <button class="btn ghost" onclick="go('town');setTimeout(townLeave,300)">${WL("Sign out","Cerrar sesión")}</button></div>`;
    } else {
      d.innerHTML = `<div><div class="eyebrow">🔐 ${WL("Save your progress","Guarda tu progreso")}</div><h2 style="margin:2px 0">${WL("Sign in with your Town ID","Entra con tu ID del pueblo")}</h2>
        <p style="margin:0">${WL("Use your class code, name and a PIN, and your progress, Smithbucks and games follow you to any computer.","Usa tu código de clase, nombre y un PIN, y tu progreso, Smithbucks y juegos te siguen a cualquier computadora.")}</p></div>
        <button class="btn primary" onclick="go('town')">${WL("Sign in / create account","Entrar / crear cuenta")} →</button>`;
    }
    v.insertBefore(d, v.firstChild);
  };
})();
