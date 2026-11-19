/* =============================================================================
   app.js: the app layer for Smith's Classroom.
   - Installable app (manifest + service worker), with an 📲 button in the top
     bar and a "Get the app" sheet with steps for iPhone/iPad, Android,
     Chromebook/computer, or a one-tap Install button where the browser has one.
   - "What's New" patch notes that pop up once after each update, and can be
     reopened from the Get the app sheet.
   - An "Update ready" bar when a new version has downloaded.
   - Shortcuts: index.html#town and #live open straight to the Town / Live tab.
   ========================================================================== */
(function(){
"use strict";
const APP_VERSION = "3.2";
const es = () => typeof S !== "undefined" && S.lang === "es";
const t = (en, sp) => es() ? sp : en;
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const standalone = () => (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
const ua = navigator.userAgent || "";
const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = /Android/i.test(ua), isCrOS = /CrOS/.test(ua), isSafari = /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(ua);

/* ---------------------------------------------------------------- head tags */
function head(){
  const add = (tag, attrs) => { const el = document.createElement(tag); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v)); document.head.appendChild(el); };
  if (!document.querySelector('link[rel="manifest"]')) add("link", {rel:"manifest", href:"manifest.webmanifest"});
  if (!document.querySelector('link[rel="apple-touch-icon"]')) add("link", {rel:"apple-touch-icon", href:"assets/app/apple-touch-icon.png"});
  if (!document.querySelector('link[rel="icon"]')) add("link", {rel:"icon", type:"image/png", href:"assets/app/icon-192.png"});
  add("meta", {name:"apple-mobile-web-app-title", content:"Smith's"});
  add("meta", {name:"apple-mobile-web-app-status-bar-style", content:"black-translucent"});
  add("meta", {name:"mobile-web-app-capable", content:"yes"});
  const css = document.createElement("style"); css.textContent = `
  .appov{position:fixed;inset:0;z-index:9000;background:rgba(20,16,40,.55);display:flex;align-items:flex-end;justify-content:center;animation:appfade .2s ease-out;backdrop-filter:blur(3px)}
  @media (min-width:700px){.appov{align-items:center}}
  .appsh{background:#FFFDF7;width:min(560px,100%);max-height:88vh;overflow:auto;border-radius:24px 24px 0 0;padding:20px 18px calc(18px + env(safe-area-inset-bottom));box-shadow:0 -10px 40px #0005;animation:appup .28s cubic-bezier(.2,.9,.3,1.2);font-family:'Nunito',system-ui,sans-serif;color:#1d1b2e}
  @media (min-width:700px){.appsh{border-radius:24px;border:3px solid #1d1b2e}}
  .appsh .grab{width:44px;height:5px;border-radius:9px;background:#ddd;margin:-8px auto 10px}
  .appsh h2{margin:4px 0 6px;font:900 24px 'Nunito',sans-serif}.appsh .ey{font:900 12px 'Nunito';letter-spacing:.08em;color:#C8283A;text-transform:uppercase}
  .appsh .new{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1.5px dashed #eee}.appsh .new>span{font-size:28px;line-height:1}.appsh .new b{display:block;font-size:15px}.appsh .new small{color:#555;font-weight:700;font-size:13px}
  .appsh .step{display:flex;gap:12px;align-items:center;background:#F5F3FF;border-radius:14px;padding:10px 12px;margin:8px 0;font-weight:800}.appsh .step i{font-style:normal;background:#1d1b2e;color:#fff;border-radius:50%;min-width:26px;height:26px;display:grid;place-items:center;font-size:13px}
  .appsh .row{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}.appsh .row button{flex:1;min-width:140px}
  .appsh .abtn{border:2.5px solid #1d1b2e;border-radius:14px;padding:12px;font:900 15px 'Nunito',sans-serif;background:#fff;cursor:pointer;box-shadow:0 3px 0 #1d1b2e}
  .appsh .abtn.p{background:#F2B33D}.appsh .abtn:active{transform:translateY(2px);box-shadow:0 1px 0 #1d1b2e}
  .appsh .ok{background:#E7F8EE;color:#1E7A46;border-radius:14px;padding:12px;font-weight:900;text-align:center}
  .appsh .tabs{display:flex;gap:6px;margin:8px 0}.appsh .tabs button{flex:1;border:2px solid #1d1b2e;border-radius:99px;padding:6px;background:#fff;font:800 12px 'Nunito';cursor:pointer}.appsh .tabs button.on{background:#1d1b2e;color:#fff}
  .appsh code{background:#f1eee6;border-radius:6px;padding:2px 6px;font-size:12px;word-break:break-all}
  .appupd{position:fixed;left:50%;bottom:calc(84px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:8999;background:#1d1b2e;color:#fff;border-radius:99px;padding:10px 16px;font:800 14px 'Nunito',sans-serif;box-shadow:0 8px 30px #0006;display:flex;gap:10px;align-items:center;animation:appup .3s}
  .appupd button{background:#F2B33D;border:0;border-radius:99px;padding:6px 12px;font:900 13px 'Nunito';cursor:pointer}
  .appbtn{font-size:16px}
  body.standalone .marquee{padding-top:max(8px, env(safe-area-inset-top))}
  body.standalone .dock{padding-bottom:max(6px, env(safe-area-inset-bottom))}
  @keyframes appup{from{transform:translateY(40px);opacity:0}}@keyframes appfade{from{opacity:0}}
  .appsh .new, .appsh .step{animation:appup .35s backwards}
  ${[1,2,3,4,5,6,7,8,9].map(i => `.appsh .new:nth-child(${i + 2}){animation-delay:${i * 0.04}s}`).join("")}`;
  document.head.appendChild(css);
  if (standalone()) document.body.classList.add("standalone");
}

/* ---------------------------------------------------------------- the sheet */
function open(html){ close(); const ov = document.createElement("div"); ov.className = "appov"; ov.id = "appOv";
  ov.innerHTML = `<div class="appsh" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div>`;
  ov.addEventListener("click", e => { if (e.target === ov) close(); }); document.body.appendChild(ov); }
function close(){ const o = document.getElementById("appOv"); if (o) { o.remove(); if (AUTO) { AUTO = false; markSeen(); } } }
let AUTO = false;
window.appClose = close;

/* ---------------------------------------------------------------- what's new */
const NOTES = [
  ["⚖️", ["Justice Center","Centro de Justicia"], ["A Town Code of fun laws with fines. Find it on the map.","Un Código del pueblo con leyes divertidas y multas. Búscalo en el mapa."]],
  ["🚓", ["Marshals and jail","Alguaciles y cárcel"], ["Marshals write citations and can arrest. In jail? Answer questions to get out sooner.","Los alguaciles multan y arrestan. ¿En la cárcel? Responde preguntas para salir antes."]],
  ["🏛️", ["Sue a classmate","Demanda a un compañero"], ["Settle or go to trial: hire a lawyer, make your case and let a jury of three decide.","Llega a un acuerdo o ve a juicio: contrata abogado y deja que decida un jurado."]],
  ["🔐", ["Locks and break-ins","Cerraduras y allanamientos"], ["When Coach Smith turns them on: buy a lock to protect your cash.","Cuando Coach Smith los active: compra una cerradura para proteger tu dinero."]]
];
function whatsNew(){
  open(`<div class="ey">✨ ${t("What's new","Novedades")} · v${APP_VERSION}</div><h2>${t("Big update!","¡Gran actualización!")}</h2>
    ${NOTES.map(([e, h, d]) => `<div class="new"><span>${e}</span><div><b>${esc(t(h[0], h[1]))}</b><small>${esc(t(d[0], d[1]))}</small></div></div>`).join("")}
    <div class="row">${standalone() ? "" : `<button class="abtn" onclick="appGet()">📲 ${t("Get the app","Obtener la app")}</button>`}<button class="abtn p" onclick="appGo()">🔥 ${t("Let's go!","¡Vamos!")}</button></div>`);
}
const markSeen = () => { try { localStorage.setItem("app.seen", APP_VERSION); } catch(e){} };
window.appWhatsNew = () => { markSeen(); whatsNew(); };
window.appGo = () => { close(); try { if (typeof go === "function") go("town"); setTimeout(() => { if (window.lvOpen && window.TOWN && TOWN.session) lvOpen("live"); }, 400); } catch(e){} };

/* ---------------------------------------------------------------- get the app */
let PROMPT = null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); PROMPT = e; const b = document.getElementById("appBtn"); if (b) b.classList.add("pulse"); });
window.addEventListener("appinstalled", () => { PROMPT = null; try { localStorage.setItem("app.installed", "1"); } catch(e){} toast(t("📲 Installed! Find Smith's on your home screen.","📲 ¡Instalada! Busca Smith's en tu pantalla de inicio.")); });
const PLAT = () => isIOS ? "ios" : isAndroid ? "android" : isCrOS ? "chromebook" : "computer";
let PICK = null;
function steps(p){
  if (p === "ios") return [
    isSafari ? null : t("Open this page in <b>Safari</b> (the compass app).","Abre esta página en <b>Safari</b> (la brújula)."),
    t("Tap the <b>Share</b> button <b>⬆︎</b> (bottom of the screen on iPhone, top on iPad).","Toca <b>Compartir</b> <b>⬆︎</b> (abajo en iPhone, arriba en iPad)."),
    t("Scroll down and tap <b>Add to Home Screen</b> ➕.","Baja y toca <b>Agregar a pantalla de inicio</b> ➕."),
    t("Tap <b>Add</b>. Open <b>Smith's</b> from your home screen.","Toca <b>Agregar</b>. Abre <b>Smith's</b> desde tu pantalla.")].filter(Boolean);
  if (p === "android") return [
    t("Open this page in <b>Chrome</b>.","Abre esta página en <b>Chrome</b>."),
    t("Tap the <b>⋮</b> menu (top right).","Toca el menú <b>⋮</b> (arriba a la derecha)."),
    t("Tap <b>Install app</b> or <b>Add to Home screen</b>.","Toca <b>Instalar app</b> o <b>Agregar a pantalla principal</b>."),
    t("Tap <b>Install</b>. Smith's shows up with your apps.","Toca <b>Instalar</b>. Smith's aparece con tus apps.")];
  if (p === "chromebook") return [
    t("Open this page in <b>Chrome</b>.","Abre esta página en <b>Chrome</b>."),
    t("Click the <b>install icon</b> ⊕ at the right end of the address bar, or open <b>⋮ → Cast, save and share → Install page as app</b>.","Haz clic en el <b>ícono de instalar</b> ⊕ al final de la barra de direcciones, o abre <b>⋮ → Transmitir, guardar y compartir → Instalar página como app</b>."),
    t("Click <b>Install</b>. Find Smith's in your launcher and pin it to the shelf.","Haz clic en <b>Instalar</b>. Búscala en el selector y fíjala en la barra.")];
  return [
    t("Use <b>Chrome</b> or <b>Edge</b>.","Usa <b>Chrome</b> o <b>Edge</b>."),
    t("Click the <b>install icon</b> ⊕ in the address bar (or <b>⋮ → Cast, save and share → Install page as app</b>; in Edge: <b>… → Apps → Install this site as an app</b>).","Haz clic en el <b>ícono de instalar</b> ⊕ en la barra (o <b>⋮ → Transmitir, guardar y compartir → Instalar página como app</b>; en Edge: <b>… → Aplicaciones → Instalar este sitio como aplicación</b>)."),
    t("Click <b>Install</b>. Smith's opens in its own window.","Haz clic en <b>Instalar</b>. Smith's abre en su propia ventana.")];
}
function getApp(){
  const p = PICK || PLAT(), url = location.origin + location.pathname.replace(/[^/]*$/, "");
  if (standalone()) return open(`<div class="ey">📲 ${t("The app","La app")}</div><h2>${t("You're in the app ✅","Estás en la app ✅")}</h2>
    <p>${t("Updates download on their own. When one is ready, a bar pops up: tap <b>Refresh</b>.","Las actualizaciones se descargan solas. Cuando haya una, toca <b>Actualizar</b>.")}</p>
    <div class="row"><button class="abtn" onclick="appWhatsNew()">✨ ${t("What's new","Novedades")}</button><button class="abtn p" onclick="appClose()">OK</button></div>`);
  open(`<div class="ey">📲 ${t("Get the app","Obtener la app")}</div><h2>${t("Put Smith's on your home screen","Pon Smith's en tu pantalla de inicio")}</h2>
    <p style="margin-top:0;color:#555;font-weight:700">${t("Free, no app store needed. Full screen, faster, and your progress comes with you.","Gratis, sin tienda de apps. Pantalla completa, más rápida y con tu progreso.")}</p>
    ${PROMPT ? `<button class="abtn p" style="width:100%;font-size:17px" onclick="appInstall()">⬇️ ${t("Install Smith's Classroom","Instalar Smith's Classroom")}</button><p style="text-align:center;color:#777;font-size:12px">${t("or follow the steps:","o sigue los pasos:")}</p>` : ""}
    <div class="tabs">${[["ios","🍎 iPhone/iPad"],["android","🤖 Android"],["chromebook","💻 Chromebook"],["computer","🖥️ " + t("Computer","Computadora")]].map(([k, l]) => `<button class="${p === k ? "on" : ""}" onclick="appPick('${k}')">${l}</button>`).join("")}</div>
    ${steps(p).map((s, i) => `<div class="step"><i>${i + 1}</i><span>${s}</span></div>`).join("")}
    <p style="font-size:12px;color:#666">${t("Link to share","Enlace para compartir")}: <code>${esc(url)}</code></p>
    <div class="row"><button class="abtn" onclick="appWhatsNew()">✨ ${t("What's new","Novedades")}</button><button class="abtn p" onclick="appClose()">${t("Done","Listo")}</button></div>`);
}
window.appGet = getApp;
window.appPick = k => { PICK = k; getApp(); };
window.appInstall = async () => { if (!PROMPT) return getApp(); PROMPT.prompt(); try { const r = await PROMPT.userChoice; if (r && r.outcome === "accepted") close(); } catch(e){} PROMPT = null; };

/* ---------------------------------------------------------------- updates */
function toast(msg){ if (typeof window.toast === "function" && window.toast !== toast) { try { return window.toast(msg); } catch(e){} } }
let WANT_RELOAD = false;
function updateBar(reg){ if (document.getElementById("appUpd")) return; const b = document.createElement("div"); b.className = "appupd"; b.id = "appUpd";
  b.innerHTML = `✨ ${t("A new update is ready","Hay una actualización")} <button>${t("Refresh","Actualizar")}</button>`;
  b.querySelector("button").onclick = () => { WANT_RELOAD = true; if (reg && reg.waiting) reg.waiting.postMessage("skip"); else location.reload(); };
  document.body.appendChild(b); }
function sw(){
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  navigator.serviceWorker.register("sw.js").then(reg => {
    if (reg.waiting && navigator.serviceWorker.controller) updateBar(reg);
    reg.addEventListener("updatefound", () => { const n = reg.installing; if (!n) return;
      n.addEventListener("statechange", () => { if (n.state === "installed" && navigator.serviceWorker.controller) updateBar(reg); }); });
    setInterval(() => reg.update().catch(() => {}), 30 * 60e3);
  }).catch(() => {});
  /* only reload when the student tapped Refresh (a first install also changes the controller) */
  navigator.serviceWorker.addEventListener("controllerchange", () => { if (!WANT_RELOAD) return; WANT_RELOAD = false; location.reload(); });
}

/* ---------------------------------------------------------------- top-bar button, deep links, first run */
function topButton(){
  const mute = document.getElementById("muteBtn"); if (!mute || document.getElementById("appBtn")) return;
  const b = document.createElement("button"); b.id = "appBtn"; b.className = "mutebtn appbtn"; b.title = t("Get the app / What's new","Obtener la app / Novedades"); b.setAttribute("aria-label", b.title);
  b.textContent = standalone() ? "✨" : "📲"; b.onclick = () => standalone() ? whatsNew() : getApp();
  mute.parentNode.insertBefore(b, mute);
}
function deepLink(){
  const h = (location.hash || "").replace("#", ""); if (h !== "town" && h !== "live") return;
  const tryGo = (n) => { if (typeof go !== "function") return n > 0 && setTimeout(() => tryGo(n - 1), 500);
    try { go("town"); if (h === "live") setTimeout(() => { if (window.lvOpen && TOWN.session) lvOpen("live"); }, 900); } catch(e){} };
  setTimeout(() => tryGo(10), 1500);
}
function firstRun(){
  let seen = null; try { seen = localStorage.getItem("app.seen"); } catch(e){}
  if (seen === APP_VERSION || /[?&](proj|board)=/.test(location.search) || (navigator.webdriver && !/[?&]wn=1/.test(location.search))) return;
  /* wait until the title / language / older welcome screens are gone; if one opens on top later, step aside and come back */
  const busy = () => ["title","langpick","certAsk","dance"].some(id => { const el = document.getElementById(id); return el && !el.classList.contains("hidden") && el.getClientRects().length; })
    || !!document.getElementById("whatsnew") || [...document.querySelectorAll('[aria-modal="true"], [role="dialog"]')].some(el => !el.closest("#appOv") && el.getClientRects().length && getComputedStyle(el).visibility !== "hidden");
  let quiet = 0, n = 0; const iv = setInterval(() => { n++;
    try { if (localStorage.getItem("app.seen") === APP_VERSION) return clearInterval(iv); } catch(e){}
    const shown = !!document.getElementById("appOv");
    if (shown && AUTO && busy()) { const o = document.getElementById("appOv"); if (o) o.remove(); quiet = 0; return; }
    if (shown) { if (!AUTO) clearInterval(iv); return; }
    if (busy()) { quiet = 0; return; }
    if (++quiet >= 2) { AUTO = true; whatsNew(); }
    if (n > 400) clearInterval(iv); }, 1200);
}

/* ---------------------------------------------------------------- stay put on refresh
   A refresh brings you back to the screen you were on (and the Town tab, Live or
   Exam section) instead of the title screen. Kept per browser tab (sessionStorage),
   so a brand-new visit still opens on the title. Teacher screens are never restored. */
const RKEY = "sc.resume";
let RESUME = null; try { RESUME = JSON.parse(sessionStorage.getItem(RKEY) || "null"); } catch(e){}
const rget = () => { try { return JSON.parse(sessionStorage.getItem(RKEY) || "{}") || {}; } catch(e){ return {}; } };
const rset = patch => { try { sessionStorage.setItem(RKEY, JSON.stringify(Object.assign(rget(), patch))); } catch(e){} };
const SAFE = {home:"home", classes:"classes", assignments:"assignments", town:"town", locker:"locker", arcade:"arcade", trophies:"trophies", art:"art",
  study:"classes", showstudy:"classes", showprep:"classes", gameshow:"classes"};
function wrap(name, fn){ const base = window[name]; if (typeof base !== "function" || base.__rs) return; const w = function(){ try { fn.apply(this, arguments); } catch(e){} return base.apply(this, arguments); }; w.__rs = true; window[name] = w; }
function track(){
  wrap("go", tab => { if (SAFE[tab]) rset({tab:SAFE[tab]}); });
  wrap("townTab", tt => { if (tt && tt !== "admin") rset({tt}); });
  wrap("lvSub", k => rset({lv:k}));
  wrap("twSub", k => rset({tw:k}));
  wrap("showTitle", () => rset({tab:null}));
  wrap("hideTitle", () => { const r = rget(); if (!r.tab) rset({tab:"home"}); });
}
function resume(){
  const r = RESUME; RESUME = null;
  if (!r || !r.tab || !SAFE[r.tab] || typeof go !== "function" || typeof hideTitle !== "function") return;
  if (typeof S !== "undefined" && !S.langChosen) return;
  try { hideTitle(); go(SAFE[r.tab]); } catch(e){ return; }
  if (r.tab !== "town" || !r.tt) return;
  let n = 0; const iv = setInterval(() => { n++;
    if (window.TOWN && TOWN.session && document.querySelector("nav.tsub")) { clearInterval(iv);
      try { if (r.tt !== "plaza") townTab(r.tt); if (r.tt === "live" && r.lv && window.lvSub) lvSub(r.lv); if (r.tt === "exam" && r.tw && window.twSub) twSub(r.tw); window.scrollTo(0, 0); } catch(e){} }
    else if (n > 40) clearInterval(iv); }, 150);
}

function boot(){ head(); topButton(); sw(); deepLink(); firstRun(); track();
  /* the language switch re-renders text; keep the button title current */
  ["btnEN","btnES"].forEach(id => { const el = document.getElementById(id); if (el) el.addEventListener("click", () => { const b = document.getElementById("appBtn"); if (b) b.title = t("Get the app / What's new","Obtener la app / Novedades"); }); }); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
window.addEventListener("load", () => setTimeout(() => { if (!/^#(town|live)$/.test(location.hash)) resume(); }, 60));
window.APP = {version:APP_VERSION, whatsNew, getApp, standalone};
})();
