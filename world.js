/* ============================================================================
   world.js — Smith's Classroom 2.0: the campus.

   Loads after the original page script and avatar.js. It replaces the shell
   (title screen, top bar, navigation, home) with the 2.0 campus, adds the
   Locker (avatar studio), Trophy Hall and the "What's new" welcome, and puts
   each student's own avatar into the arcade. The study engine, question bank,
   certificates and games underneath are unchanged.

   Overrides are assigned onto window (not redeclared) so the original code,
   which calls render(), dock(), paintBar() and friends by name, picks up the
   2.0 versions everywhere.
   ========================================================================== */
const V2 = "v2/assets/";
const WL = (en, es) => (S.lang === "es" ? es : en);
const _o = {render: window.render, dock: window.dock, paintBar: window.paintBar, showTitle: window.showTitle,
  hideTitle: window.hideTitle, viewPack: window.viewPack, viewArcade: window.viewArcade, art: window.art,
  artTag: window.artTag, setLang: window.setLang, upgrade: window.upgrade, viewAssignments: window.viewAssignments,
  showLangPick: window.showLangPick};

/* ---------- courses: art and colour for each class ---------- */
const COURSE_ART = {
  "ap-econ": {banner:"banner_ap_macro", seal:"seal_ap_macro", color:"var(--c-apmacro)", hex:"#1E9E5A", bld:"fed_tower",
              short:{en:"AP Macro",es:"Macro AP"}},
  "econ-h":  {banner:"banner_econ_h",  seal:"seal_econ_h",  color:"var(--c-econh)",  hex:"#F08C2E", bld:"econ_hall",
              short:{en:"Econ Honors",es:"Econ Honores"}},
  "us-gov":  {banner:"banner_gov_h",   seal:"seal_gov_h",   color:"var(--c-govh)",   hex:"#1F3F8F", bld:"capitol",
              short:{en:"Gov Honors",es:"Gob Honores"}},
  "ap-gov":  {banner:"banner_ap_gov",  seal:"seal_ap_gov",  color:"var(--c-apgov)",  hex:"#5B3FA0", bld:"supreme_court",
              short:{en:"AP Gov",es:"Gob AP"}}
};
const courseArt = id => COURSE_ART[id] || {banner:"banner_bulletin", seal:"seal_smiths", color:"var(--hot)", hex:"#C8102E", short:{en:id,es:id}};
const banner = n => `${V2}world/banners/${n}.jpg`;
const seal = n => `${V2}ui/seals/${n}.webp`;
const icon = n => `${V2}ui/icons/ico_${n}.webp`;
const badgeImg = n => `${V2}ui/badges/${n}.webp`;
const npc = p => `${V2}npc/npc_smith_${p}.webp`;
const myCourses = () => { const all = allPacks().map(p => p.id);
  const m = (S.myCourses || []).filter(id => all.includes(id)); return m.length ? m : all; };

/* ---------- state additions (old saves upgrade cleanly) ---------- */
window.upgrade = function(o){
  const out = _o.upgrade(o);
  out.avatar = o.avatar || null; out.myCourses = o.myCourses || []; out.v2seen = o.v2seen || "";
  out.visited = o.visited || {}; out.campusView = o.campusView || "map"; out.usedEs = !!o.usedEs;
  out.skin = o.skin || out.skin;
  return out;
};
/* load() already ran before this file; run the save through the 2.0 upgrade */
S = window.upgrade(S);

/* ---------- the student's avatar ---------- */
let ME = null;                 /* {full, head, key, canvas} for the current avatar */
const AVS = {};                /* game sprites: pose -> dataURL */
function ensureAvatar(){
  if (!S.avatar) { const mm = avFromMoneyMoves(); if (mm) { S.avatar = mm; S.avatarFrom = "mm"; if (!S.skin || S.skin === "smith") S.skin = "me"; save(); } }
}
async function refreshMe(){
  if (!S.avatar) { ME = null; return null; }
  const r = await composeAvatar(S.avatar); ME = r;
  if (r && r.canvas) buildGameSprites(r.canvas);
  paintBar();
  document.querySelectorAll("[data-me]").forEach(el => { const k = el.getAttribute("data-me");
    el.src = k === "head" ? r.head : r.full; });
  return r;
}
/* Trim the 240x600 canvas to the character and make a few posed copies for
   the arcade: a forward lean for running, a tilt for jumping. */
function buildGameSprites(cv){
  const c = cv.getContext("2d"), d = c.getImageData(0, 0, cv.width, cv.height).data;
  let x0 = cv.width, y0 = cv.height, x1 = 0, y1 = 0;
  for (let y = 0; y < cv.height; y += 2) for (let x = 0; x < cv.width; x += 2)
    if (d[(y * cv.width + x) * 4 + 3] > 20) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  if (x1 <= x0) return;
  const w = x1 - x0 + 4, h = y1 - y0 + 4;
  const pose = (rot, flip) => { const pad = Math.ceil(h * 0.18), o = document.createElement("canvas");
    o.width = w + pad * 2; o.height = h + 4; const g = o.getContext("2d");
    g.translate(o.width / 2, o.height); g.rotate(rot * Math.PI / 180); if (flip) g.scale(-1, 1);
    g.drawImage(cv, x0 - 2, y0 - 2, w, h, -w / 2, -h, w, h); return o.toDataURL("image/png"); };
  AVS.idle = pose(0); AVS.cheer = AVS.idle; AVS.hmm = AVS.idle;
  AVS.run = pose(8); AVS.walk = pose(-6); AVS.point = pose(-10);
}
/* Games ask art("run") etc. With "Play as me" on, those are the avatar. */
window.art = function(k){
  if (S.skin === "me" && AVS[k] && POSES.indexOf(k) >= 0) return AVS[k];
  return _o.art(k);
};
/* UI portraits of Coach Smith use the new guide art (games keep pixel art). */
const NPC_POSE = {idle:"wave", point:"point", cheer:"cheer", hmm:"think", walk:"clipboard", run:"thumbs"};
window.artTag = function(k, cls){
  if (NPC_POSE[k]) return `<img src="${npc(NPC_POSE[k])}" alt="" ${cls ? `class="${cls}"` : ""}>`;
  return _o.artTag(k, cls);
};

/* ---------- top bar ---------- */
let _hudBuilt = false;
window.paintBar = function(){
  _o.paintBar();
  const logo = document.getElementById("logoBtn");
  if (logo && !logo.dataset.v2) { logo.dataset.v2 = 1;
    logo.innerHTML = `<img src="${V2}ui/emblem_crest.webp" alt=""><span class="lt">Smith's Classroom</span><span class="v2">2.0</span><small id="tagline"></small>`;
    logo.onclick = () => go("campus"); }
  const bar = document.querySelector(".marquee");
  if (bar && !_hudBuilt) { _hudBuilt = true;
    const hud = document.createElement("div"); hud.className = "hud"; hud.id = "hud";
    bar.insertBefore(hud, document.getElementById("muteBtn")); }
  const hud = document.getElementById("hud"); if (!hud) return;
  const lvl = levelOf(S.xp);
  hud.innerHTML = `
    <span class="hudpill" title="${WL("Coins","Monedas")}"><img src="${icon("coin")}" alt="">${S.tokens}</span>
    <span class="hudpill lvl" title="${WL("Level","Nivel")}"><img src="${icon("xp")}" alt="">${WL("Lv","Nv")} ${lvl}</span>
    <span class="hudpill" title="${WL("Day streak","Racha")}"><img src="${icon("streak")}" alt="">${S.streak || 0}</span>
    <button class="hudme" onclick="go('locker')" aria-label="${WL("My avatar","Mi avatar")}">
      ${ME ? `<img src="${ME.head}" alt="">` : `<img src="${icon("locker")}" alt="">`}</button>`;
};

/* ---------- navigation: five places, one tap each ---------- */
const NAV = () => [
  ["campus",   "world",    WL("Campus","Campus")],
  ["classes",  "classes",  WL("Classes","Clases")],
  ["locker",   "locker",   WL("Locker","Casillero")],
  ["arcade",   "game",     WL("Arcade","Arcade")],
  ["trophies", "trophies", WL("Trophies","Trofeos")]
].concat(TEACHER_OK ? [["teacher", "teacher", WL("Teacher","Docente")]] : []);
function navSection(t){
  if (!t || t === "home" || t === "campus" || t === "assignments" || t === "showprep" || t === "showstudy") return "campus";
  if (t === "classes" || t.indexOf("pack:") === 0 || t.indexOf("unitwork:") === 0 || t.indexOf("coursework:") === 0 ||
      t === "study" || t === "challenge" || ["marginal","moneymoves","counsel2","writing","marketlab","cfereview"].includes(t)) return "classes";
  if (t === "locker" || t === "art") return "locker";
  if (t === "arcade" || t === "smittys") return "arcade";
  if (t === "trophies") return "trophies";
  if (t === "teacher" || t === "gameshow") return "teacher";
  return "campus";
}
window.dock = function(){
  const el = document.getElementById("dock");
  const full = ["gameshow","marginal","moneymoves","counsel2","writing","marketlab","cfereview"].includes(TAB);
  el.style.display = full ? "none" : ""; if (full) { el.innerHTML = ""; return; }
  const cur = navSection(TAB);
  el.innerHTML = NAV().map(([k, ic, l]) =>
    `<button onclick="go('${k}')" ${cur === k ? 'aria-current="page"' : ""}><img src="${icon(ic)}" alt="">${l}</button>`).join("");
};

/* ---------- routing ---------- */
window.render = function(){
  if (!TAB || TAB === "home") TAB = "campus";
  const v2 = {campus:viewCampus, classes:viewClasses, locker:viewLocker, trophies:viewTrophies,
              writing:() => viewFrame("writing"), marketlab:() => viewFrame("marketlab"), cfereview:() => viewFrame("cfereview")}[TAB];
  if (v2) { paintBar(); dock(); v2(); return; }
  _o.render();
};
window.viewHome = function(){ TAB = "campus"; viewCampus(); };

/* ---------- campus ---------- */
const BUILDINGS = {
  fed_tower:      {at:[10.88,-2.62,15.54], label:{en:"AP Macro",es:"Macro AP"}, go:"pack:ap-econ", course:"ap-econ"},
  econ_hall:      {at:[32.0,-3.69,15.58], label:{en:"Econ Honors",es:"Econ Honores"}, go:"pack:econ-h", course:"econ-h"},
  capitol:        {at:[53.37,-5.06,15.54], label:{en:"Gov Honors",es:"Gob Honores"}, go:"pack:us-gov", course:"us-gov"},
  supreme_court:  {at:[73.46,1.62,15.5], label:{en:"AP Gov",es:"Gob AP"}, go:"pack:ap-gov", course:"ap-gov"},
  fieldhouse:     {at:[3.62,38.12,15.42], label:{en:"Game Show",es:"Concurso"}, go:"showprep"},
  locker_dorm:    {at:[24.12,33.19,14.71], label:{en:"My Locker",es:"Mi casillero"}, go:"locker"},
  trophy_hall:    {at:[61.38,32.62,15.17], label:{en:"Trophy Hall",es:"Trofeos"}, go:"trophies"},
  market:         {at:[80.58,26.19,15.29], label:{en:"Closet",es:"Clóset"}, go:"locker:top"},
  arcade:         {at:[9.38,65.19,15.08], label:{en:"Arcade",es:"Arcade"}, go:"arcade"},
  writing_center: {at:[31.29,63.69,15.0], label:{en:"Writing Lab",es:"Escritura"}, go:"writing"},
  bulletin:       {at:[53.17,67.0,15.0], label:{en:"Assignments",es:"Tareas"}, go:"assignments"},
  principal:      {at:[75.08,65.56,15.08], label:{en:"Principal",es:"Dirección"}, go:"teacher"}
};
function visit(id){
  const b = BUILDINGS[id]; if (!b) return;
  S.visited[id] = 1; save();
  if (b.go === "teacher" && !TEACHER_OK) return toast(WL("Teachers only. Coach Smith's office.", "Solo docentes. La oficina de Coach Smith."));
  if (b.go.indexOf("locker:") === 0) { LOCKER_TAB = b.go.slice(7); return go("locker"); }
  go(b.go);
}
function dueList(){
  const mine = myCourses();
  return ASSIGNMENTS.filter(a => mine.includes(a.pack) && !(a.done && a.done()));
}
function lastStudied(){
  let best = null;
  allUnits().forEach(u => { if (!myCourses().includes(u.pack.id)) return;
    const r = (S.studied || {})[u.id]; const t = r && (r.last || r.sec) || 0;
    const done = unitChunksComplete(u.id);
    if (t && !done && (!best || t > best.t)) best = {u, t}; });
  return best && best.u;
}
function viewCampus(){
  touchStreak(); ensureAvatar();
  const lvl = levelOf(S.xp), into = S.xp % 250, due = dueList(), next = lastStudied();
  const name = S.name ? esc(S.name) : WL("Grenadier", "Grenadier");
  const mapView = S.campusView !== "list";
  V().innerHTML = `
  <section class="panel raised">
    <div class="greet">
      <div class="me">${ME ? `<img data-me="full" src="${ME.full}" alt="">`
        : `<img src="${npc("wave")}" alt="">`}</div>
      <div style="flex:1;min-width:0">
        <div class="eyebrow">${WL("Level","Nivel")} ${lvl} · ${S.streak || 0} ${WL("day streak","días de racha")}</div>
        <h1>${WL("Welcome back,","¡Hola de nuevo,")} ${name}${WL("!","!")}</h1>
        <div class="meter" style="margin:8px 0 4px"><i style="width:${into / 250 * 100}%"></i></div>
        <small class="muted" style="font-weight:700">${250 - into} XP ${WL("to level","para el nivel")} ${lvl + 1}</small>
        <div class="row" style="margin-top:10px">
          ${next ? `<button class="btn primary" onclick="viewTopics('${next.id}')">▶ ${WL("Keep going:","Continuar:")} ${esc(L(next.title)).replace(/^.*?·\s*/, "")}</button>`
                 : `<button class="btn primary" onclick="go('classes')">▶ ${WL("Pick a class","Elige una clase")}</button>`}
          ${S.avatar ? "" : `<button class="btn red" onclick="go('locker')">✨ ${WL("Build my avatar","Crear mi avatar")}</button>`}
        </div>
      </div>
    </div>
  </section>
  ${due.length ? `<div class="eyebrow" style="margin:6px 2px">📌 ${WL("On the bulletin board","En el tablero")}</div>
    <div class="duestrip">${due.map(a => `<button class="duecard" onclick="TAB='${a.tab}';render()" style="border-left:8px solid ${courseArt(a.pack).hex}">
      <small>${esc(L(courseArt(a.pack).short))} · ${esc(L(a.tag))}</small><b>${esc(a.title)}</b></button>`).join("")}</div>` : ""}
  <div class="row spread" style="margin-top:6px">
    <h2 style="font-size:26px">${WL("Grenadier Campus","Campus Grenadier")}</h2>
    <div class="seg" role="group"><button aria-pressed="${mapView}" onclick="S.campusView='map';save();render()">${WL("Map","Mapa")}</button><button aria-pressed="${!mapView}" onclick="S.campusView='list';save();render()">${WL("List","Lista")}</button></div>
  </div>
  ${mapView ? campusMap(due) : campusList(due)}
  <p class="muted" style="text-align:center;font-size:13px;margin-top:4px">${WL("Tap a building to go inside.","Toca un edificio para entrar.")}</p>`;
  window.scrollTo(0, 0);
}
function bldBadge(id, due){
  const b = BUILDINGS[id];
  if (b.course) { const n = due.filter(a => a.pack === b.course).length; return n ? `<span class="dot">${n}</span>` : ""; }
  if (id === "bulletin" && due.length) return `<span class="dot">${due.length}</span>`;
  if (id === "locker_dorm" && !S.avatar) return `<span class="dot">!</span>`;
  return "";
}
function campusMap(due){
  const mine = myCourses();
  return `<div class="campus">${Object.entries(BUILDINGS).map(([id, b]) => {
    const [x, y, w] = b.at; const off = b.course && !mine.includes(b.course);
    if (id === "principal" && !TEACHER_OK) return `<button class="bld locked" style="left:${x}%;top:${y}%;width:${w}%" onclick="visit('${id}')" aria-label="${esc(L(b.label))}"><img src="${V2}world/buildings/bld_${id}.webp" alt=""></button>`;
    return `<button class="bld ${off ? "locked" : ""}" style="left:${x}%;top:${y}%;width:${w}%" onclick="visit('${id}')" aria-label="${esc(L(b.label))}">
      <img src="${V2}world/buildings/bld_${id}.webp" alt="">${bldBadge(id, due)}
      <span class="tag ${id === "locker_dorm" && !S.avatar ? "hot" : ""}">${esc(L(b.label))}</span></button>`; }).join("")}
    ${ME ? `<div class="mewalk"><img data-me="full" src="${ME.full}" alt=""></div>` : ""}
  </div>`;
}
function campusList(due){
  const sub = {fed_tower:WL("AP Macroeconomics","Macroeconomía AP"), econ_hall:WL("Economics Honors","Economía Honores"),
    capitol:WL("U.S. Government Honors","Gobierno Honores"), supreme_court:WL("AP U.S. Government","Gobierno AP"),
    fieldhouse:WL("Study for Smith's Challenge","Estudia para el concurso"), locker_dorm:WL("Build and dress your avatar","Crea y viste tu avatar"),
    trophy_hall:WL("Certificates, badges, mastery","Certificados, insignias, dominio"), market:WL("Unlock new gear as you level up","Desbloquea ropa al subir de nivel"),
    arcade:WL("Play as your avatar","Juega con tu avatar"), writing_center:WL("FRQ practice with the A.C.E. method","Práctica de FRQ con el método A.C.E."),
    bulletin:WL("Everything assigned to you","Todo lo que tienes asignado"), principal:WL("Teacher tools","Herramientas docentes")};
  return `<div class="listview">${Object.entries(BUILDINGS).filter(([id]) => id !== "principal" || TEACHER_OK).map(([id, b]) =>
    `<button class="place" onclick="visit('${id}')"><img src="${V2}world/buildings/bld_${id}.webp" alt="">
      <span><b>${esc(L(b.label))}</b><small>${sub[id]}</small></span>${bldBadge(id, due).replace('class="dot"', 'class="chip bad" style="margin-left:auto"')}</button>`).join("")}</div>`;
}

/* ---------- classes ---------- */
function packMastery(p){
  let seen = 0, right = 0, total = 0;
  p.units.forEach(u => u.items.forEach(i => { total++; const r = S.prog[i.id]; if (r && r.right) right++; }));
  return total ? Math.round(right / total * 100) : 0;
}
function viewClasses(){
  const all = allPacks(), mine = myCourses(), picked = (S.myCourses || []).length > 0;
  const card = p => { const a = courseArt(p.id), m = packMastery(p), on = mine.includes(p.id);
    const done = p.units.filter(u => unitChunksComplete(u.id)).length;
    const certs = S.certs.filter(c => c.course === L2(p.name, "en") || c.course === L2(p.name, "es")).length;
    return `<div class="course ${on ? "" : "hidden2"}" role="button" tabindex="0" onclick="go('pack:${p.id}')" onkeydown="if(event.key==='Enter')go('pack:${p.id}')">
      <div class="ban" style="background-image:url(${banner(a.banner)})"><h2>${esc(L(p.name))}</h2><img src="${seal(a.seal)}" alt=""></div>
      <div class="body">
        <span class="chip">${p.units.length} ${WL("units","unidades")}</span>
        <span class="chip ${done ? "on" : ""}">${done}/${p.units.length} ${WL("done","listas")}</span>
        <span class="chip warn">★ ${certs}</span>
        <button class="chip ${on && picked ? "bad" : ""}" style="margin-left:auto;cursor:pointer" onclick="event.stopPropagation();toggleMine('${p.id}')">${on && picked ? "✓ " + WL("My class","Mi clase") : "+ " + WL("I take this","La tomo")}</button>
        <div class="bar"><i style="width:${m}%;background:${a.hex}"></i></div>
        <small class="muted" style="font-weight:700">${m}% ${WL("mastered","dominado")}</small>
      </div></div>`; };
  V().innerHTML = `
  <div class="guide" style="margin-top:14px"><img src="${npc("point")}" alt="">
    <div class="bubble">${picked ? WL("Here are your classes. Tap one to study, practice, and earn your certificates.","Aquí están tus clases. Toca una para estudiar, practicar y ganar certificados.")
      : WL("Tap “I take this” on your classes so your campus only shows what you need.","Toca “La tomo” en tus clases para que tu campus muestre solo lo que necesitas.")}</div></div>
  ${all.filter(p => mine.includes(p.id)).map(card).join("")}
  ${picked && all.some(p => !mine.includes(p.id)) ? `<div class="eyebrow" style="margin:18px 2px 0">${WL("Other classes","Otras clases")}</div>
    ${all.filter(p => !mine.includes(p.id)).map(card).join("")}` : ""}`;
  window.scrollTo(0, 0);
}
function toggleMine(id){
  const all = allPacks().map(p => p.id);
  let m = (S.myCourses || []).filter(x => all.includes(x));
  m = m.includes(id) ? m.filter(x => x !== id) : m.concat(id);
  S.myCourses = m; save(); render();
}
/* course page: add the banner and seal on top of the existing course screen */
window.viewPack = function(id){
  _o.viewPack(id);
  const head = document.querySelector(".classhead"); const a = courseArt(id);
  if (head && !head.querySelector(".ban")) {
    const b = document.createElement("div"); b.className = "ban"; b.style.backgroundImage = `url(${banner(a.banner)})`;
    head.prepend(b);
    const s = document.createElement("img"); s.src = seal(a.seal); s.alt = "";
    s.style.cssText = "position:absolute;right:16px;top:64px;width:80px;filter:drop-shadow(0 4px 0 rgba(0,0,0,.2))";
    head.appendChild(s);
  }
  document.querySelectorAll(".unitcard").forEach(c => c.style.setProperty("--cc", a.hex));
};

/* ---------- assignments: one list, built from the registry ---------- */
ASSIGNMENTS.push(
  {pack:"ap-econ", unit:null, tab:"writing", icon:"✍️", color:"#1E9E5A", title:"FRQ Writing Lab",
   blurb:{en:"Practice AP free-response answers with the A.C.E. method. Five prompts and a downloadable certificate.",
          es:"Practica respuestas de respuesta libre AP con el método A.C.E. Cinco temas y un certificado descargable."},
   tag:{en:"Writing Lab",es:"Laboratorio de escritura"}, done:() => (S.certs || []).some(c => /FRQ|A\.C\.E/i.test(c.unit || ""))},
  {pack:"econ-h", unit:"eh-u1", tab:"marketlab", icon:"🏬", color:"#F08C2E", title:"Who Sets the Price? Market Structures",
   blurb:{en:"Perfect competition, monopolistic competition, oligopoly and monopoly. Sort real businesses and explain why.",
          es:"Competencia perfecta, competencia monopolística, oligopolio y monopolio. Clasifica negocios reales y explica por qué."},
   tag:{en:"Unit 1 Lab",es:"Laboratorio Unidad 1"}, done:() => false},
  {pack:"econ-h", unit:null, tab:"cfereview", icon:"🎟️", color:"#F5C542", title:"CFE Review Quest",
   blurb:{en:"Final exam review for every unit: study cards, boss battles, instant reteaching, and an Exit Ticket to prove mastery. A certificate for each unit and one for the Final Mock CFE.",
          es:"Repaso para el examen final de todas las unidades: tarjetas, batallas contra jefes, repaso inmediato y un Boleto de Salida para demostrar dominio. Un certificado por unidad y otro por el CFE de práctica final."},
   tag:{en:"CFE Review",es:"Repaso del CFE"}, done:() => cfeDone("econ")},
  {pack:"us-gov", unit:null, tab:"cfereview", icon:"🎟️", color:"#F5C542", title:"CFE Review Quest",
   blurb:{en:"Final exam review for every unit: study cards, boss battles, instant reteaching, and an Exit Ticket to prove mastery. A certificate for each unit and one for the Final Mock CFE.",
          es:"Repaso para el examen final de todas las unidades: tarjetas, batallas contra jefes, repaso inmediato y un Boleto de Salida para demostrar dominio. Un certificado por unidad y otro por el CFE de práctica final."},
   tag:{en:"CFE Review",es:"Repaso del CFE"}, done:() => cfeDone("gov")}
);
/* CFE Review Quest saves in this browser under "cfeReviewQuest_v2|<teacher>|<school>",
   one entry per "<student name>|<course>". Done = any student on this device passed that course's Final. */
function cfeDone(course){
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i); if (k.indexOf("cfeReviewQuest_v2|") !== 0) continue;
      const db = JSON.parse(localStorage.getItem(k) || "{}");
      if (Object.keys(db).some(n => n.endsWith("|" + course) && db[n] && db[n].final && db[n].final.passed)) return true;
    }
  } catch(e){}
  return false;
}
window.viewAssignments = function(){
  ASSIGN_UNIT = null; ASSIGN_PACK = null;
  const mine = myCourses();
  V().innerHTML = `
  <section class="panel raised" style="background:url(${banner("banner_bulletin")}) center/cover;min-height:120px;position:relative">
    <div style="background:rgba(255,255,255,.92);display:inline-block;padding:8px 14px;border-radius:14px;border:2.5px solid var(--char)">
      <div class="eyebrow">📌 ${WL("Bulletin board","Tablero")}</div><h1 style="font-size:30px;margin:2px 0">${WL("Assignments","Tareas")}</h1></div>
  </section>
  ${allPacks().filter(p => mine.includes(p.id)).map(p => { const list = assignmentsForPack(p.id); if (!list.length) return "";
    return `<div class="eyebrow" style="margin:18px 2px 0;color:${courseArt(p.id).hex}">${esc(L(p.name))}</div>${list.map(a => assignCard(a, true)).join("")}`; }).join("")}`;
  window.scrollTo(0, 0);
};
function viewFrame(kind){
  const cfg = {writing:{src:"frq_writing_lab.html", t:WL("FRQ Writing Lab","Laboratorio de escritura FRQ"), img:"bld_writing_center"},
               marketlab:{src:"econ_market_structures_assignment.html", t:WL("Market Structures Lab","Laboratorio de estructuras de mercado"), img:"bld_market"},
               cfereview:{src:"cfe_review_quest.html", t:WL("CFE Review Quest","Misión de Repaso: CFE"), img:"bld_writing_center"}}[kind];
  /* CFE Review Quest opens in the same language as the site */
  if (kind === "cfereview") { try { localStorage.setItem("cfeRQ_lang", S.lang === "es" ? "es" : "en"); } catch(e){} }
  V().innerHTML = `
  <div class="eprow"><button class="btn ghost" style="padding:8px 12px;min-height:0" onclick="TAB='${ASSIGN_UNIT ? "unitwork:" + ASSIGN_UNIT : ASSIGN_PACK ? "coursework:" + ASSIGN_PACK : "assignments"}';render()">← ${WL("Back","Volver")}</button>
    <h2 style="font-size:22px;margin-left:6px">${cfg.t}</h2></div>
  <div style="border:2.5px solid var(--char);border-radius:16px;overflow:hidden;box-shadow:0 5px 0 var(--char);background:#fff">
    <iframe src="${cfg.src}" title="${esc(cfg.t)}" style="width:100%;height:max(480px,min(85vh,calc(100vh - 160px)));border:none;display:block"
      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups allow-modals"></iframe></div>
  <p class="muted" style="font-size:12px;text-align:center"><a href="${cfg.src}" target="_blank" rel="noopener">${WL("Open in a new tab","Abrir en pestaña nueva")}</a></p>`;
  window.scrollTo(0, 0);
}
/* Smitty's Chill Grill is an assignment, not an arcade game: don't list it twice */
window.viewArcade = function(){
  _o.viewArcade();
  document.querySelectorAll("#view section.panel").forEach(sec => { if (/smittys/.test(sec.innerHTML) && /Smitty/.test(sec.textContent)) sec.remove(); });
  const v = document.getElementById("view");
  const head = document.createElement("section"); head.className = "panel raised";
  head.style.cssText = `background:url(${banner("banner_arcade")}) center/cover;min-height:120px`;
  head.innerHTML = `<div style="background:rgba(255,255,255,.93);display:inline-flex;gap:12px;align-items:center;padding:8px 14px;border-radius:14px;border:2.5px solid var(--char)">
    ${ME && S.skin === "me" ? `<img src="${ME.head}" alt="" style="width:46px;border-radius:50%;border:2px solid var(--char)">` : ""}
    <div><div class="eyebrow">${S.skin === "me" ? WL("Playing as you","Juegas con tu avatar") : WL("Playing as Coach Smith","Juegas como Coach Smith")}</div>
    <h1 style="font-size:28px;margin:0">${WL("Arcade","Arcade")}</h1>
    ${S.avatar ? `<button class="chip" style="cursor:pointer" onclick="S.skin=S.skin==='me'?'smith':'me';save();render()">${S.skin === "me" ? WL("Switch to Coach Smith","Cambiar a Coach Smith") : WL("Play as my avatar","Jugar con mi avatar")}</button>` : `<button class="chip bad" style="cursor:pointer" onclick="go('locker')">${WL("Build your avatar to play as you","Crea tu avatar para jugar")}</button>`}</div></div>`;
  const first = v.querySelector("h1.big"); if (first) { first.closest("section") ? null : first.remove(); }
  v.prepend(head);
};

/* ---------- locker: the avatar studio ---------- */
let LOCKER_TAB = "body", DRAFT = null;
function lockerOwned(){ return avOwnedInMoneyMoves(); }
function itemOpen(item){ return !item.price || lockerOwned().has(item.id) || levelOf(S.xp) >= avUnlockLevel(item); }
function viewLocker(){
  ensureAvatar();
  if (!DRAFT) DRAFT = JSON.parse(JSON.stringify(S.avatar || avStarter(Math.floor(Math.random() * 8))));
  const eq = DRAFT, tabs = [["body",WL("Body","Cuerpo")],["face",WL("Face","Cara")],["hair",WL("Hair","Pelo")],
    ["top",WL("Tops","Arriba")],["bottom",WL("Bottoms","Abajo")],["acc",WL("Extras","Accesorios")]];
  const mm = avFromMoneyMoves();
  V().innerHTML = `
  <h1 class="big" style="margin:16px 0 4px">${WL("My Locker","Mi casillero")}</h1>
  <p class="muted" style="margin:0 0 12px;font-weight:600">${WL("Your avatar goes everywhere with you: the campus, the arcade, and your certificates.","Tu avatar va contigo a todas partes: el campus, el arcade y tus certificados.")}</p>
  <div class="locker">
    <div>
      <div class="stage"><div class="nm">${S.name ? esc(S.name) : WL("Your name","Tu nombre")}</div><img class="full" id="lkFull" alt=""></div>
      <label for="lkName">${WL("Name on your certificates","Nombre en tus certificados")}</label>
      <input id="lkName" type="text" value="${esc(S.name)}" placeholder="${WL("First and last name","Nombre y apellido")}" onchange="S.name=this.value.trim();save();paintBar()">
      <div class="row" style="margin-top:10px">
        <button class="btn primary" style="flex:1" onclick="lockerSave()">✓ ${WL("Save my avatar","Guardar mi avatar")}</button>
        <button class="btn" onclick="lockerRandom()" title="${WL("Surprise me","Sorpréndeme")}">🎲</button>
      </div>
      ${mm ? `<button class="btn ghost wide" style="margin-top:10px" onclick="DRAFT=avFromMoneyMoves();viewLocker()">💵 ${WL("Use my Money Moves character","Usar mi personaje de Money Moves")}</button>` : ""}
      <div class="panel" style="margin-top:12px;padding:12px">
        <div class="eyebrow">${WL("Arcade character","Personaje del arcade")}</div>
        <div class="seg" style="margin-top:6px"><button aria-pressed="${S.skin === "me"}" onclick="S.skin='me';save();viewLocker()">${WL("Me","Yo")}</button><button aria-pressed="${S.skin !== "me"}" onclick="S.skin='smith';save();viewLocker()">Coach Smith</button></div>
      </div>
    </div>
    <div class="panel" style="margin:0">
      <div class="tabs">${tabs.map(([k, l]) => `<button aria-pressed="${LOCKER_TAB === k}" onclick="LOCKER_TAB='${k}';viewLocker()">${l}</button>`).join("")}</div>
      ${lockerTiles(eq)}
      <p class="muted" style="font-size:13px;margin:12px 0 0">🔒 ${WL("Locked gear opens as you level up by studying. Anything you bought in Money Moves is already yours.","La ropa bloqueada se abre al subir de nivel estudiando. Lo que compraste en Money Moves ya es tuyo.")}</p>
    </div>
  </div>`;
  composeAvatar(eq).then(r => { const im = document.getElementById("lkFull"); if (im && r) im.src = r.full; });
  window.scrollTo(0, 0);
}
function tile(on, inner, onclick, cap, locked){
  return `<div><button class="tile ${on ? "on" : ""} ${locked ? "lock" : ""}" onclick="${onclick}" title="${esc(cap)}">${inner}${locked ? `<span class="lk">🔒 ${locked}</span>` : ""}</button><div class="tilecap">${esc(cap)}</div></div>`;
}
function lockerTiles(eq){
  const A = AV_BASE, lvl = WL("Lv ","Nv ");
  if (LOCKER_TAB === "body") return `
    <div class="eyebrow">${WL("Body shape","Tipo de cuerpo")}</div>
    <div class="tiles" style="margin:6px 0 14px">${AV_SHAPES.map(([k, n]) => tile(eq.shape === k, `<img src="${A}ic3-shape-${k}.webp" alt="">`, `DRAFT.shape='${k}';viewLocker()`, L(n))).join("")}</div>
    <div class="eyebrow">${WL("Skin tone","Tono de piel")}</div>
    <div class="tiles" style="margin-top:6px">${AV_SKIN_SWATCH.map((c, i) => tile(eq.skin === i, `<span class="sw" style="background:${c}"></span>`, `DRAFT.skin=${i};viewLocker()`, L(AV_SKIN_NAMES[i]))).join("")}</div>`;
  if (LOCKER_TAB === "face") return `<div class="tiles">${AV_FACE_NAMES.map((n, i) => tile(eq.face === i, `<img src="${A}ic3-face-${i}.webp" alt="">`, `DRAFT.face=${i};viewLocker()`, L(n))).join("")}</div>`;
  if (LOCKER_TAB === "hair") return `<div class="tiles">${tile(eq.hair === null, `<img src="${A}ic3-hair-none.webp" alt="">`, `DRAFT.hair=null;viewLocker()`, WL("None","Ninguno"))}${AV_HAIR_NAMES.map((n, i) => tile(eq.hair === i, `<img src="${A}ic3-hair-${i}.webp" alt="">`, `DRAFT.hair=${i};viewLocker()`, L(n))).join("")}</div>`;
  const clothes = (list, slot) => `<div class="tiles">${list.map(it => { const open = itemOpen(it);
    const img = it.col === null ? `${A}ic3-shape-${eq.shape}.webp` : `${A}ic3-${slot === "top" ? "top" : "bot"}-${it.col}.webp`;
    return tile(eq[slot] === it.id, `<img src="${img}" alt="">`, open ? `DRAFT.${slot}='${it.id}';viewLocker()` : `toast('${WL("Reach level","Llega al nivel")} ${avUnlockLevel(it)} ${WL("to unlock","para desbloquear")}')`, L(it.name), open ? "" : lvl + avUnlockLevel(it)); }).join("")}</div>`;
  if (LOCKER_TAB === "top") return clothes(AV_TOPS, "top");
  if (LOCKER_TAB === "bottom") return clothes(AV_BOTTOMS, "bottom");
  return AV_ACC_GROUPS.map(([g, gn]) => `<div class="eyebrow" style="margin-top:10px">${L(gn)}</div>
    <div class="tiles" style="margin-top:6px">${AV_ACCS.filter(a => a.group === g).map(a => { const open = itemOpen(a), on = (eq.acc || []).includes(a.id);
      return tile(on, `<img src="${A}ic3-${a.kind === "h" ? "acch" : "accb"}-${a.col}.webp" alt="">`, open ? `lockerAcc('${a.id}')` : `toast('${WL("Reach level","Llega al nivel")} ${avUnlockLevel(a)} ${WL("to unlock","para desbloquear")}')`, L(a.name), open ? "" : lvl + avUnlockLevel(a)); }).join("")}</div>`).join("");
}
function lockerAcc(id){
  const it = AV_CATALOG[id]; let acc = (DRAFT.acc || []).slice();
  if (acc.includes(id)) acc = acc.filter(x => x !== id);
  else acc = acc.filter(x => AV_CATALOG[x].group !== it.group).concat(id);
  DRAFT.acc = acc; viewLocker();
}
function lockerRandom(){
  const r = n => Math.floor(Math.random() * n);
  const open = l => l.filter(itemOpen);
  DRAFT = {v:3, shape:AV_SHAPES[r(4)][0], skin:r(8), face:r(16), hair:r(32),
    top:open(AV_TOPS)[r(open(AV_TOPS).length)].id, bottom:open(AV_BOTTOMS)[r(open(AV_BOTTOMS).length)].id, acc:[]};
  viewLocker();
}
function lockerSave(){
  const first = !S.avatar;
  S.avatar = JSON.parse(JSON.stringify(DRAFT)); if (first) S.skin = "me";
  const nm = document.getElementById("lkName"); if (nm) S.name = nm.value.trim();
  save(); refreshMe().then(() => { toast(first ? WL("✨ Avatar created! It's on your campus now.","✨ ¡Avatar creado! Ya está en tu campus.") : WL("✓ Saved","✓ Guardado")); viewLocker(); });
  if (first) award(50, 0);
}

/* ---------- trophy hall ---------- */
function studySeconds(){ return Object.values(S.studied || {}).reduce((n, r) => n + ((r && r.sec) || 0), 0); }
function courseComplete(p){ return p.units.length && p.units.every(u => unitChunksComplete(u.id)); }
const BADGES2 = () => [
  ["badge_new_recruit", WL("New Recruit","Recluta"), WL("Build your avatar","Crea tu avatar"), !!S.avatar],
  ["badge_explorer", WL("Explorer","Explorador"), WL("Visit 6 campus buildings","Visita 6 edificios"), Object.keys(S.visited || {}).length >= 6],
  ["badge_streak_3", WL("On a Roll","En racha"), WL("3-day streak","Racha de 3 días"), (S.streak || 0) >= 3],
  ["badge_streak_7", WL("Week Warrior","Guerrero semanal"), WL("7-day streak","Racha de 7 días"), (S.streak || 0) >= 7],
  ["badge_streak_30", WL("Unstoppable","Imparable"), WL("30-day streak","Racha de 30 días"), (S.streak || 0) >= 30],
  ["badge_study_hour", WL("Study Hour","Hora de estudio"), WL("Study 60 minutes total","Estudia 60 minutos"), studySeconds() >= 3600],
  ["badge_first_cert", WL("First Certificate","Primer certificado"), WL("Earn any certificate","Gana un certificado"), S.certs.length > 0],
  ["badge_perfect", WL("Perfect Score","Puntaje perfecto"), WL("100% on a challenge or test","100% en un reto o examen"), S.certs.some(c => +c.score === 100)],
  ["badge_course_master", WL("Course Master","Maestro del curso"), WL("Finish every unit in a class","Termina todas las unidades de una clase"), allPacks().some(courseComplete)],
  ["badge_arcade_ace", WL("Arcade Ace","As del arcade"), WL("Reach level 3 in an arcade game","Llega al nivel 3 en un juego"), Object.values(S.arcade || {}).some(v => v >= 3)],
  ["badge_bilingual", WL("Bilingual","Bilingüe"), WL("Study in Spanish and English","Estudia en español e inglés"), !!S.usedEs],
  ["badge_team_player", WL("Career Ready","Listo para la carrera"), WL("Finish Money Moves or Counsel II","Termina Money Moves o Counsel II"), mmPromotions() >= 7 || cd2Promotions() >= 7]
];
function tierFor(m){ return m >= 90 ? ["tier_mastered", WL("Mastered","Dominado")] : m >= 70 ? ["tier_proficient", WL("Proficient","Competente")]
  : m >= 50 ? ["tier_practiced", WL("Practiced","Practicado")] : ["tier_learning", WL("Learning","Aprendiendo")]; }
function viewTrophies(){
  const b = BADGES2(), got = b.filter(x => x[3]).length, lvl = levelOf(S.xp);
  const mine = allPacks().filter(p => myCourses().includes(p.id));
  V().innerHTML = `
  <section class="panel raised" style="background:url(${banner("banner_trophies")}) center/cover;min-height:130px">
    <div style="background:rgba(255,255,255,.93);display:inline-flex;gap:12px;align-items:center;padding:10px 14px;border-radius:14px;border:2.5px solid var(--char)">
      ${ME ? `<img src="${ME.head}" alt="" style="width:56px;border-radius:50%;border:2px solid var(--char);background:#FFE7A6">` : ""}
      <div><div class="eyebrow">${WL("Trophy Hall","Salón de trofeos")}</div><h1 style="font-size:28px;margin:0">${WL("Level","Nivel")} ${lvl} · ${S.xp} XP</h1>
      <small class="muted" style="font-weight:700">${got}/${b.length} ${WL("badges","insignias")} · ${S.certs.length} ${WL("certificates","certificados")} · ${S.tokens} ${WL("coins","monedas")}</small></div></div>
  </section>
  <h2 style="font-size:24px;margin:18px 0 8px">${WL("Mastery","Dominio")}</h2>
  <div class="medals">${mine.map(p => { const m = packMastery(p), [img, t] = tierFor(m);
    return `<div class="medal ${m ? "" : "off"}"><img src="${badgeImg(img)}" alt=""><b>${esc(L(courseArt(p.id).short))}</b><small>${t} · ${m}%</small></div>`; }).join("")}</div>
  <h2 style="font-size:24px;margin:18px 0 8px">${WL("Badges","Insignias")}</h2>
  <div class="medals">${b.map(([img, n, d, ok]) => `<div class="medal ${ok ? "" : "off"}"><img src="${badgeImg(img)}" alt=""><b>${n}</b><small>${d}</small></div>`).join("")}</div>
  <h2 style="font-size:24px;margin:18px 0 8px">${WL("Certificates","Certificados")}</h2>
  <section class="panel" style="margin-top:0">${S.certs.length ? S.certs.slice().reverse().map(c => {
      const p = allPacks().find(p => c.course === L2(p.name, "en") || c.course === L2(p.name, "es"));
      return `<div class="certrow"><img src="${seal(courseArt(p && p.id).seal)}" alt=""><div class="t"><b>${esc(c.unit)}</b>
        <small class="muted">${esc(c.course || "")} · ${c.score}% · ${esc(c.date || "")} · ${esc(c.code)}</small></div>
        <button class="btn" onclick="certFromRecord('${c.code}')">⬇ PNG</button></div>`; }).join("")
    : `<div class="guide"><img src="${npc("clipboard")}" alt=""><div class="bubble">${WL("Pass a challenge or a unit test and your certificates will hang here. Download them to turn in.","Aprueba un reto o examen de unidad y tus certificados aparecerán aquí. Descárgalos para entregarlos.")}</div></div>`}</section>
  ${(mmPromotions() || cd2Promotions()) ? `<h2 style="font-size:24px;margin:18px 0 8px">${WL("Career games","Juegos de carrera")}</h2>
    <div class="medals">
      <div class="medal ${mmPromotions() ? "" : "off"}"><img src="${V2}games/covers/cover_money_moves.jpg" alt="" style="width:100%;height:auto;border-radius:10px"><b>Money Moves</b><small>${mmPromotions()}/7</small></div>
      <div class="medal ${cd2Promotions() ? "" : "off"}"><img src="${V2}games/covers/cover_counsel_defense.jpg" alt="" style="width:100%;height:auto;border-radius:10px"><b>Counsel II</b><small>${cd2Promotions()}/7</small></div>
    </div>` : ""}`;
  window.scrollTo(0, 0);
}

/* ---------- certificate, redrawn for 2.0 ---------- */
window.paintCert = function(c, print){
  const W = 2200, H = 1700, cv = document.createElement("canvas"); cv.width = W; cv.height = H; const x = cv.getContext("2d");
  const p = allPacks().find(p => c.course === L2(p.name, "en") || c.course === L2(p.name, "es"));
  const ld = src => new Promise(r => { if (!src) return r(null); const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; });
  Promise.all([ld(`${V2}ui/cert_frame.jpg`), ld(seal(courseArt(p && p.id).seal)), ld(ME && ME.full), ld(`${V2}ui/emblem_crest.webp`),
    document.fonts ? document.fonts.load("800 80px 'Baloo 2'").catch(() => {}) : null]).then(([frame, sl, me, crest]) => {
    x.fillStyle = "#fff"; x.fillRect(0, 0, W, H); if (frame) x.drawImage(frame, 0, 0, W, H);
    x.textAlign = "center"; x.fillStyle = "#2B2B2B";
    if (crest) x.drawImage(crest, W / 2 - 90, 150, 180, 180);
    x.font = "800 40px 'Baloo 2',sans-serif"; x.fillStyle = "#C8102E"; x.fillText("SMITH'S CLASSROOM", W / 2, 380);
    x.font = "800 96px 'Baloo 2',sans-serif"; x.fillStyle = "#2B2B2B"; x.fillText(T_.certTitle, W / 2, 490);
    x.font = "600 34px Nunito,sans-serif"; x.fillStyle = "#6E655B"; x.fillText(T_.certLine, W / 2, 570);
    x.font = "800 110px 'Baloo 2',sans-serif"; x.fillStyle = "#2B2B2B"; x.fillText(c.name || "Student", W / 2, 700);
    x.strokeStyle = "#F2B632"; x.lineWidth = 6; x.beginPath(); x.moveTo(W / 2 - 420, 730); x.lineTo(W / 2 + 420, 730); x.stroke();
    x.font = "700 46px Nunito,sans-serif"; x.fillStyle = "#1E1B18"; x.fillText(c.course || "", W / 2, 820);
    x.font = "600 40px Nunito,sans-serif"; x.fillText(c.unit || "", W / 2, 880);
    x.font = "600 32px Nunito,sans-serif"; x.fillStyle = "#6E655B";
    x.fillText((c.kind === "exam" ? T_.testReview + " · " : c.kind === "review" ? T_.reviewCert + " · " : "") + T_.certOn + " " + c.date, W / 2, 940);
    /* seal sits in the frame's medallion with the score on it */
    if (sl) x.drawImage(sl, W / 2 - 150, 1180, 300, 300);
    x.beginPath(); x.arc(W / 2, 1150, 70, 0, 7); x.fillStyle = "#fff"; x.fill(); x.lineWidth = 6; x.strokeStyle = "#2B2B2B"; x.stroke();
    x.font = "800 52px 'Baloo 2',sans-serif"; x.fillStyle = "#2B2B2B"; x.fillText(c.score + "%", W / 2, 1168);
    x.textAlign = "left"; x.font = "600 30px Nunito,sans-serif"; x.fillStyle = "#6E655B";
    x.fillText(T_.verify + ": " + c.code, 340, 1420);
    x.strokeStyle = "#2B2B2B"; x.lineWidth = 3; x.beginPath(); x.moveTo(340, 1330); x.lineTo(780, 1330); x.stroke();
    x.font = "800 40px 'Baloo 2',sans-serif"; x.fillStyle = "#2B2B2B"; x.fillText("Coach Smith", 340, 1310);
    if (me) { const h = 600, w = me.naturalWidth / me.naturalHeight * h; x.drawImage(me, W - w - 330, H - h - 230, w, h); }
    let url; try { url = cv.toDataURL("image/png"); } catch(e){ url = null; }
    if (!url) return toast("Couldn't draw the certificate here. Open the site from its web address.");
    if (print) { const w = window.open(""); if (!w) { toast("Allow pop-ups to print"); return; }
      w.document.write(`<img src="${url}" style="width:100%" onload="window.print()">`); w.document.close(); }
    else cv.toBlob(b => download(`certificate-${c.code}.png`, b, "image/png"));
  });
};

/* ---------- title screen ---------- */
window.showTitle = function(){
  if (TEACHER_OK) { TEACHER_OK = false; TAB = "campus"; }
  const t = document.getElementById("title"); t.classList.remove("hidden");
  t.innerHTML = `<img class="v2bg" src="${V2}world/title_bg.jpg" alt=""><div class="veil"></div>
    <img class="hero" src="${npc("wave")}" alt="">
    <div class="top"><div class="v2mark">
      <img class="crest" src="${V2}ui/emblem_crest.webp" alt="">
      <div class="v2word">Smith's <span>Classroom</span></div>
      <span class="v2ribbon">2.0 · ${WL("Brand-new campus","Campus totalmente nuevo")}</span></div></div>
    <div class="bottom"><div class="startmenu">
      <button class="go" id="startBtn" onclick="hideTitle()">▶ ${T_.pressStart}</button>
      <button onclick="showInstructions()">${WL("How it works","Cómo funciona")}</button>
      <button onclick="openTheme()">♪ ${T_.theme}</button>
      <button onclick="showLangPick()">🌐 Language · Idioma</button>
      <button class="tiny" onclick="showCredits()">${T_.credits}</button>
      <button class="tiny" onclick="teacherSignIn()">${T_.teacherSignIn}</button>
    </div></div>`;
};
window.mmNewsCheck = function(){};          /* 2.0's welcome replaces the old Money Moves pop-up */
window.hideTitle = function(){
  const t = document.getElementById("title"); t.classList.add("hidden"); t.scrollTop = 0; window.scrollTo(0, 0);
  if (S.v2seen !== "2.0") setTimeout(showWhatsNew, 250);
};
window.setLang = function(l){ if (l === "es") S.usedEs = true; _o.setLang(l); };

/* ---------- what's new: shown once to every student ---------- */
function showWhatsNew(){
  ensureAvatar();
  const mm = avFromMoneyMoves(), d = document.createElement("div"); d.id = "whatsnew";
  const packs = allPacks(), sel = new Set(S.myCourses || []);
  d.innerHTML = `<div class="card" role="dialog" aria-modal="true" aria-labelledby="wnT">
    <div class="hero"><span class="v2ribbon">Smith's Classroom 2.0</span><img src="${npc("cheer")}" alt=""></div>
    <div class="in">
      <h2 id="wnT">${WL("Welcome to the new campus!","¡Bienvenido al nuevo campus!")}</h2>
      <p class="muted" style="margin:0;font-weight:600">${WL("Everything got rebuilt. Your progress and certificates came with you.","Todo se reconstruyó. Tu progreso y tus certificados vienen contigo.")}</p>
      ${mm ? `<div class="mmfound" style="margin-top:12px"><img id="wnMM" alt=""><div><b>${WL("We found your Money Moves character!","¡Encontramos tu personaje de Money Moves!")}</b><br>
        <span style="font-weight:600">${WL("It's your avatar here now, in every class. Change it any time in your Locker.","Ahora es tu avatar aquí, en todas las clases. Cámbialo cuando quieras en tu casillero.")}</span></div></div>` : ""}
      <ul>
        <li><img src="${icon("locker")}" alt=""><span><b>${WL("Every class can build an avatar","Todas las clases pueden crear un avatar")}</b>${WL("AP Macro, Econ Honors, Gov Honors and AP Gov: 4 body shapes, 8 skin tones, 16 faces, 32 hairstyles and head coverings.","Macro AP, Econ Honores, Gob Honores y Gob AP: 4 tipos de cuerpo, 8 tonos de piel, 16 caras, 32 peinados y cubiertas.")}</span></li>
        <li><img src="${icon("game")}" alt=""><span><b>${WL("Play the arcade as YOU","Juega el arcade como TÚ")}</b>${WL("Your avatar runs, jumps and fights in the arcade games.","Tu avatar corre, salta y pelea en los juegos.")}</span></li>
        <li><img src="${icon("trophies")}" alt=""><span><b>${WL("Unlock gear and badges","Desbloquea ropa e insignias")}</b>${WL("Study to level up. New clothes, glasses and chains open as you go.","Estudia para subir de nivel. Se abren ropa, lentes y cadenas.")}</span></li>
        <li><img src="${icon("world")}" alt=""><span><b>${WL("One campus, every class","Un campus, todas las clases")}</b>${WL("Classes, assignments, the arcade and your trophies are one tap away.","Clases, tareas, el arcade y tus trofeos a un toque.")}</span></li>
      </ul>
      <div class="eyebrow">${WL("Which classes are you taking?","¿Qué clases tomas?")}</div>
      <div class="row" style="margin:8px 0 16px">${packs.map(p => `<button class="chip ${sel.has(p.id) ? "on" : ""}" style="cursor:pointer;font-size:14px;padding:6px 12px" onclick="this.classList.toggle('on')" data-pk="${p.id}">${esc(L(courseArt(p.id).short))}</button>`).join("")}</div>
      <button class="btn primary wide" onclick="closeWhatsNew('${mm ? "campus" : "locker"}')">${mm ? WL("Explore the campus","Explorar el campus") : "✨ " + WL("Build my avatar","Crear mi avatar")}</button>
      <button class="btn ghost wide" style="margin-top:8px" onclick="closeWhatsNew('${mm ? "locker" : "campus"}')">${mm ? WL("Change my avatar","Cambiar mi avatar") : WL("Explore first","Explorar primero")}</button>
    </div></div>`;
  document.body.appendChild(d);
  if (mm) composeAvatar(mm).then(r => { const im = document.getElementById("wnMM"); if (im && r) im.src = r.head; });
}
function closeWhatsNew(to){
  const d = document.getElementById("whatsnew"); if (!d) return;
  const picks = [...d.querySelectorAll("[data-pk].on")].map(b => b.getAttribute("data-pk"));
  if (picks.length) S.myCourses = picks;
  S.v2seen = "2.0"; S.mmNews = typeof MM_VERSION !== "undefined" ? MM_VERSION : S.mmNews; save(); d.remove();
  go(to);
}

/* ---------- boot ---------- */
document.querySelector('meta[name="theme-color"]') && document.querySelector('meta[name="theme-color"]').setAttribute("content", "#FFF4DE");
ensureAvatar();
if (TAB === "home") TAB = "campus";
bootSmiths();
refreshMe();
