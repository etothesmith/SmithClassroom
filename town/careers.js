/* =============================================================================
   GRENADIER TOWN — careers, Downtown, town requests and the mayor's office
   (town/careers.js). Loads after town/civic.js and uses its helpers (TOWN.CIV).

   1. Careers: 14 town jobs (doctor, vet, reporter, banker…). Students apply
      with a résumé; Coach Smith hires and fires from the teacher panel. A fired
      student's seat opens again. Each job has a daily duty (its "shift") and a
      queue of cases from townspeople (a sick patient needs 5 right answers to be
      cured). Pay comes on top of daily jobs and business money, and grows with
      the job level (Trainee → Associate → Senior → Chief), like Sims careers.
   2. Downtown: a map of the buildings where those jobs happen, plus landmarks
      the town builds.
   3. Town requests: residents ask for projects (a skate park, a pool…). The
      mayor approves them, builders build them, residents chip in coins, and
      finished projects become landmarks that pay everyone a daily "town pride"
      bonus.
   4. The mayor's office: a salary, the Mansion and mayor-only furniture, 20%
      off in the shop, executive actions (Town Holiday, Mayor's Challenge,
      proclamations), ribbon cuttings, and a Hall of Mayors.
   Firestore: classes/{cid}/apps, cases, requests, reqvotes, news, mayoracts.
   ========================================================================== */
(function(){
"use strict";
const T = window.TOWN; if (!T || !T.CIV) return;
const {EXT, L2, TA} = T;
const V = T.CIV;
const {civ, sheet, closeSheet, cleanText, day, week, hashN, img, bar, CLS, E, W2, C, store, SESS, NET, paint, sub} = V;
const DT = TA + "downtown/";

/* ---------------------------------------------------------------- catalog */
const SUBJ = {econ:["ap-econ","econ-h"], gov:["us-gov","ap-gov"]};
const CAREERS = {
  doctor:      {e:"🩺", seats:2, pay:4, per:2, subj:"any", place:["Clinic","Clínica"], title:["Town Doctor","Médico del pueblo"],
    what:["Cure sick townspeople. Each patient needs 5 right answers to get well.","Cura a los enfermos del pueblo. Cada paciente necesita 5 respuestas correctas."],
    duty:{kind:"quiz", n:5, l:["Morning rounds: 5 check-up questions","Ronda matutina: 5 preguntas"]}},
  vet:         {e:"🐾", seats:1, pay:3, per:2, subj:"any", place:["Animal Hospital","Veterinaria"], title:["Veterinarian","Veterinario"],
    what:["Give classmates' pets their check-ups (3 right answers each).","Revisa a las mascotas de tus compañeros (3 respuestas correctas cada una)."],
    duty:{kind:"quiz", n:3, l:["Feed and check the animals: 3 questions","Alimenta y revisa a los animales: 3 preguntas"]}},
  reporter:    {e:"📰", seats:2, pay:4, per:2, subj:"gov", place:["The Grenadier Gazette","La Gaceta Grenadier"], title:["Gazette Reporter","Reportero de la Gaceta"],
    what:["Write a news story every day about what's happening in town, and interview classmates.","Escribe una noticia cada día sobre lo que pasa en el pueblo y entrevista a tus compañeros."],
    duty:{kind:"story", n:1, l:["Write today's story","Escribe la noticia de hoy"]}},
  banker:      {e:"🏦", seats:1, pay:4, per:2, subj:"econ", place:["Town Bank","Banco del Pueblo"], title:["Banker","Banquero"],
    what:["Review loan requests (approve or deny) and balance the bank's books.","Revisa solicitudes de préstamo (aprobar o negar) y cuadra los libros del banco."],
    duty:{kind:"quiz", n:4, l:["Balance the books: 4 money questions","Cuadra los libros: 4 preguntas de dinero"]}},
  firefighter: {e:"🚒", seats:2, pay:3, per:3, subj:"any", place:["Fire Station","Estación de bomberos"], title:["Firefighter","Bombero"],
    what:["When a house catches fire, put it out with 5 right answers. Run a drill every day.","Cuando se incendia una casa, apágala con 5 respuestas correctas. Haz un simulacro cada día."],
    duty:{kind:"quiz", n:3, l:["Fire drill: 3 questions","Simulacro: 3 preguntas"]}},
  marshal:     {e:"🚓", seats:2, pay:3, per:2, subj:"gov", place:["Marshal's Office","Oficina del alguacil"], title:["Town Marshal","Alguacil"],
    what:["Handle reports from townspeople, by the book: rights and due process.","Atiende reportes de los vecinos según la ley: derechos y debido proceso."],
    duty:{kind:"quiz", n:3, l:["Patrol: 3 questions on rights and laws","Patrulla: 3 preguntas de derechos y leyes"]}},
  judge:       {e:"⚖️", seats:1, pay:4, per:3, subj:"gov", place:["Courthouse","Juzgado"], title:["Town Judge","Juez"],
    what:["Hear small-claims cases from townspeople and rule on them.","Escucha casos de reclamos menores y dicta sentencia."],
    duty:{kind:"quiz", n:4, l:["Study case law: 4 questions","Estudia jurisprudencia: 4 preguntas"]}},
  tutor:       {e:"📚", seats:2, pay:3, per:3, subj:"any", place:["Tutoring Center","Centro de tutorías"], title:["Tutor","Tutor"],
    what:["Classmates ask for help with a unit; you work 5 questions from it with them.","Tus compañeros piden ayuda con una unidad; tú resuelves 5 preguntas de ella."],
    duty:{kind:"quiz", n:5, l:["Prep session: 5 questions","Preparación: 5 preguntas"]}},
  mail:        {e:"📬", seats:2, pay:3, per:1, subj:"econ", place:["Post Office","Correo"], title:["Mail Carrier","Cartero"],
    what:["Deliver every Market purchase to the buyer's house.","Entrega cada compra del Mercado en la casa del comprador."],
    duty:{kind:"quiz", n:3, l:["Sort the mail: 3 questions","Clasifica el correo: 3 preguntas"]}},
  chef:        {e:"🍳", seats:1, pay:3, per:2, subj:"econ", place:["Grenadier Café","Café Grenadier"], title:["Café Chef","Chef del café"],
    what:["Cook the daily special and fill classmates' orders. Well-fed customers earn more from daily jobs.","Cocina el especial del día y prepara pedidos. Los clientes bien alimentados ganan más."],
    duty:{kind:"quiz", n:3, l:["Cook today's special: 3 questions","Cocina el especial: 3 preguntas"]}},
  builder:     {e:"🏗️", seats:2, pay:3, per:0, subj:"any", place:["Construction Yard","Patio de construcción"], title:["Town Builder","Constructor"],
    what:["Build the projects the town asked for. Every right answer adds a block.","Construye los proyectos que pidió el pueblo. Cada respuesta correcta pone un bloque."],
    duty:{kind:"build", n:5, l:["Build: 5 right answers on a project","Construye: 5 respuestas en un proyecto"]}},
  sanitation:  {e:"🧹", seats:2, pay:3, per:0, subj:"any", place:["Sanitation Dept.","Limpieza"], title:["Sanitation Crew","Equipo de limpieza"],
    what:["Litter shows up on the plaza every day. Tap it and answer a question to clean it up.","Cada día aparece basura en la plaza. Tócala y responde una pregunta para limpiarla."],
    duty:{kind:"litter", n:3, l:["Clean 3 pieces of litter on the plaza","Limpia 3 basuras en la plaza"]}},
  ranger:      {e:"🌳", seats:1, pay:3, per:0, subj:"econ", place:["Grenadier Park","Parque Grenadier"], title:["Park Ranger","Guardaparques"],
    what:["Plant a tree on the plaza every day (4 right answers). The park grows all year.","Planta un árbol en la plaza cada día (4 respuestas). El parque crece todo el año."],
    duty:{kind:"plant", n:4, l:["Plant a tree: 4 questions","Planta un árbol: 4 preguntas"]}},
  photographer:{e:"📸", seats:1, pay:3, per:2, subj:"any", place:["Photo Studio","Estudio de fotos"], title:["Photographer","Fotógrafo"],
    what:["Visit classmates' houses and take photos for the Gazette.","Visita casas de compañeros y toma fotos para la Gaceta."],
    duty:{kind:"photo", n:3, l:["Photograph 3 houses","Fotografía 3 casas"]}}
};
/* Cases townspeople create (or that happen on their own). need = right answers to close it */
const KINDS = {
  sick:     {job:"doctor", e:"🤒", need:5, l:["Sick patient","Paciente enfermo"]},
  checkup:  {job:"doctor", e:"🩺", need:3, ask:1, l:["Check-up","Chequeo"], done:["Clean bill of health! +2 Smithbucks","¡Sano! +2 Smithbucks"], pay:2},
  pet:      {job:"vet", e:"🐶", need:3, ask:1, l:["Pet check-up","Chequeo de mascota"], done:["Your pet is healthy and happy! +2 Smithbucks","¡Tu mascota está sana y feliz! +2 Smithbucks"], pay:2},
  interview:{job:"reporter", e:"🎙️", need:2, ask:1, l:["Interview me for the Gazette","Entrevístame para la Gaceta"], done:["You're in the Gazette! +2 Smithbucks","¡Saliste en la Gaceta! +2 Smithbucks"], pay:2},
  loan:     {job:"banker", e:"💵", need:2, ask:1, l:["Bigger loan request (+20)","Solicitud de préstamo mayor (+20)"], decide:[["approve","✅",["Approve","Aprobar"]],["deny","✖",["Deny","Negar"]]]},
  fire:     {job:"firefighter", e:"🔥", need:5, l:["House fire!","¡Incendio!"], done:["The fire at your house is out. Phew!","Se apagó el incendio en tu casa. ¡Uf!"]},
  report:   {job:"marshal", e:"📢", need:3, ask:1, l:["Report to the Marshal","Reporte al alguacil"], opts:[["noise",["Noise on the plaza","Ruido en la plaza"]],["lost",["Lost item","Objeto perdido"]],["unfair",["Unfair trade","Intercambio injusto"]],["safety",["Safety concern","Problema de seguridad"]]], done:["The Marshal closed your report.","El alguacil cerró tu reporte."]},
  claim:    {job:"judge", e:"📜", need:3, ask:1, l:["Small-claims case","Caso de reclamo menor"], opts:[["trade",["A trade went wrong","Un intercambio salió mal"]],["partner",["My business partner didn't pay","Mi socio no me pagó"]],["price",["I was overcharged","Me cobraron de más"]]],
             decide:[["plaintiff","⚖️",["Rule for the person who filed","A favor de quien demandó"]],["dismiss","🚫",["Dismiss the case","Desestimar el caso"]]]},
  tutor:    {job:"tutor", e:"📚", need:5, ask:1, unit:1, l:["Tutor me in a unit","Tutoría de una unidad"], done:["Your tutor worked through your unit! +3 Smithbucks","¡Tu tutor repasó tu unidad! +3 Smithbucks"], pay:3},
  package:  {job:"mail", e:"📦", need:1, l:["Package to deliver","Paquete por entregar"], done:["📦 Your Market order was delivered! +1 Smithbuck","📦 ¡Llegó tu pedido! +1 Smithbuck"], pay:1},
  order:    {job:"chef", e:"🌮", need:1, ask:1, cost:2, l:["Café order (2 Smithbucks)","Pedido del café (2 Smithbucks)"], done:["😋 Your meal is served: daily jobs pay +1 today!","😋 ¡Tu comida está servida! Los trabajos diarios pagan +1 hoy."]},
  photo:    {job:"photographer", e:"🖼️", need:0, ask:1, l:["Photo shoot at my house","Sesión de fotos en mi casa"], done:["📸 Your house is in the Gazette photo page! +1 Smithbuck","📸 ¡Tu casa salió en la Gaceta! +1 Smithbuck"], pay:1}
};
const PROJECTS = {
  court:   {e:"🏀", need:20, cost:40, l:["Basketball court","Cancha de básquet"]},
  skate:   {e:"🛹", need:20, cost:40, l:["Skate park","Skatepark"]},
  dogpark: {e:"🐕", need:15, cost:30, l:["Dog park","Parque para perros"]},
  pool:    {e:"🏊", need:30, cost:60, l:["Swimming pool","Piscina"]},
  library: {e:"📖", need:25, cost:50, l:["Public library","Biblioteca pública"]},
  garden:  {e:"🌻", need:12, cost:20, l:["Community garden","Huerto comunitario"]},
  food:    {e:"🍔", need:20, cost:40, l:["Food court","Zona de comida"]},
  wifi:    {e:"📶", need:15, cost:30, l:["Free Wi-Fi tower","Torre de Wi-Fi gratis"]},
  bus:     {e:"🚌", need:12, cost:25, l:["Bus stop","Parada de autobús"]},
  solar:   {e:"☀️", need:25, cost:50, l:["Solar farm","Granja solar"]},
  theater: {e:"🎬", need:30, cost:60, l:["Movie theater","Cine"]},
  gym:     {e:"🏋️", need:20, cost:40, l:["Gym","Gimnasio"]},
  museum:  {e:"🏺", need:30, cost:60, l:["History museum","Museo de historia"]},
  zoo:     {e:"🦒", need:30, cost:60, l:["Petting zoo","Granjita"]},
  field:   {e:"🏈", need:25, cost:50, l:["Football field","Campo de fútbol americano"]},
  mural:   {e:"🖌️", need:10, cost:15, l:["Street mural","Mural callejero"]}
};
const LEVELS = [[0,"Trainee","Aprendiz",1],[6,"Associate","Asociado",1.25],[15,"Senior","Sénior",1.5],[30,"Chief","Jefe",2]];
const MAYOR_PAY = 8, RIBBON = 10, PRIDE_MAX = 5;
const PROCLAIM = {study:["📚 Study Week: every unit counts!","📚 Semana de estudio: ¡cada unidad cuenta!"], kind:["🤝 Kindness Day: say something nice to a classmate","🤝 Día de la amabilidad: dile algo bonito a un compañero"],
  local:["🛍️ Shop Local Day: buy from classmates' businesses","🛍️ Día de comprar local: compra a tus compañeros"], clean:["🧹 Clean Town Day: help keep the plaza clean","🧹 Día del pueblo limpio: mantén la plaza limpia"],
  spirit:["🎖️ Grenadier Spirit Day: wear red and gold!","🎖️ Día del espíritu Grenadier: ¡viste rojo y dorado!"], test:["🍀 Good luck on the test, everyone!","🍀 ¡Suerte en el examen a todos!"]};
const L = a => S.lang === "es" ? a[1] : a[0];

/* ---------------------------------------------------------------- state */
const me = () => SESS() && SESS().sid;
const staff = () => CLS().staff || {};
const staffNames = () => CLS().staffNames || {};
const holders = j => (staff()[j] || []).filter(Boolean);
const myJob = () => { const s = staff(); return Object.keys(CAREERS).find(j => (s[j] || []).includes(me())) || null; };
const openSeats = j => Math.max(0, CAREERS[j].seats - holders(j).length);
const isMayor = () => { const m = CLS().mayor; return !!(m && m.sid && m.sid === me()); };
function car(){ const c = civ(); c.career = c.career || {job:null, shifts:0, cases:0, last:"", hist:[], duty:{}, snaps:{}}; c.career.duty = c.career.duty || {}; c.career.snaps = c.career.snaps || {}; return c.career; }
const points = k => (k.shifts | 0) + (k.cases | 0) / 2;
const levelOf = k => { let l = LEVELS[0]; LEVELS.forEach(x => { if (points(k) >= x[0]) l = x; }); return l; };
const nextLevel = k => LEVELS.find(x => x[0] > points(k));
const mult = () => levelOf(car())[3] * V.jobPay();
const jobTitle = (j, k) => `${k ? (S.lang === "es" ? levelOf(k)[2] : levelOf(k)[1]) + " · " : ""}${L(CAREERS[j].title)}`;
function duty(){ const k = car(), d = day(); if (k.duty.day !== d) k.duty = {day:d, n:0, paid:false}; return k.duty; }
let CASES = [], REQS = [], NEWS = [], ACTS = [], VOTES = {}, MYAPPS = [];

/* ---------------------------------------------------------------- questions */
const RECENT = [];
function pool(subj, unitId){
  const packs = (typeof allPacks === "function" ? allPacks() : []);
  const want = unitId ? packs : subj && SUBJ[subj] ? packs.filter(p => SUBJ[subj].includes(p.id)) : packs;
  const out = [], studied = [];
  (want.length ? want : packs).forEach(p => p.units.forEach(u => { if (unitId && u.id !== unitId) return;
    u.items.forEach(it => { if (it.type === "mcq" && it.c && it.c.en && it.c.en.length >= 3) { out.push(it); if (S.studied && S.studied[u.id]) studied.push(it); } }); }));
  return studied.length >= 12 ? studied : out;
}
function pickQ(subj, unitId){
  const p = pool(subj, unitId); if (!p.length) return null;
  for (let i = 0; i < 8; i++) { const q = p[Math.floor(Math.random() * p.length)]; if (!RECENT.includes(q.id) || i === 7) { RECENT.push(q.id); if (RECENT.length > 30) RECENT.shift(); return q; } }
}
/* A run of questions. Right answers count toward `need`; wrong ones don't. */
function work(o){
  const st = window._carW = {...o, got:0, tries:0};
  const show = () => {
    const q = pickQ(st.subj, st.unit); if (!q) { closeSheet(); return T.toast(W2("No questions found.","No hay preguntas.")); }
    const opts = q.c[S.lang === "es" && q.c.es ? "es" : "en"], order = [...opts.keys()].sort(() => Math.random() - 0.5);
    st.q = q; st.order = order; st.answered = false;
    sheet(`<div class="eyebrow">${st.e || "💼"} ${E(st.title)}</div>
      <div class="kprog">${Array.from({length:st.need}, (_, i) => `<span class="${i < st.got ? "on" : ""}">${i < st.got ? "✔" : ""}</span>`).join("")}<small>${st.got}/${st.need}</small></div>
      <h2 style="font-size:19px">${E(L2(q.q))}</h2>
      <div class="cqopts">${order.map((i, k) => `<button class="btn" onclick="carAns(${k})">${E(opts[i])}</button>`).join("")}</div><p id="kWhy"></p>
      <button class="btn ghost wide" onclick="carStop()">${W2("Stop for now","Parar por ahora")}</button>`);
  };
  st.show = show; show();
}
window.carAns = function(k){
  const st = window._carW; if (!st || st.answered) return; st.answered = true; st.tries++;
  const ok = st.order[k] === st.q.a;
  document.querySelectorAll(".cqopts button").forEach((b, i) => { b.disabled = true; if (st.order[i] === st.q.a) b.classList.add("primary"); });
  if (ok) { st.got++; st.onStep && st.onStep(st.got); }
  const done = st.got >= st.need, why = document.getElementById("kWhy");
  if (why) why.innerHTML = `<b>${ok ? W2("Correct!","¡Correcto!") : W2("Not quite.","Casi.")}</b> ${st.q.why ? E(L2(st.q.why)) : ""}
    <br><button class="btn primary wide" style="margin-top:10px" onclick="${done ? "carFinish()" : "carNext()"}">${done ? W2("Finish","Terminar") : W2("Next","Siguiente")}</button>`;
};
window.carNext = () => { const st = window._carW; if (st) st.show(); };
window.carStop = () => { const st = window._carW; window._carW = null; closeSheet(); if (st && st.onStop) st.onStop(st.got); };
window.carFinish = () => { const st = window._carW; window._carW = null; closeSheet(); if (st && st.onDone) st.onDone(st.got); };

/* ---------------------------------------------------------------- pay */
function payShift(){
  const d = duty(), k = car(); if (d.paid) return; d.paid = true;
  k.shifts = (k.shifts | 0) + 1; k.last = day();
  const before = levelOf({...k, shifts:k.shifts - 1});
  const n = Math.max(1, Math.round(CAREERS[k.job].pay * mult())); T.coins(n); T.persist();
  T.toast(W2(`Shift done! Paycheck: +${n} Smithbucks.`, `¡Turno terminado! Pago: +${n} Smithbucks.`));
  promoCheck(before);
}
function payCase(kind){
  const k = car(), j = k.job; if (!j) return 0; const before = levelOf(k);
  k.cases = (k.cases | 0) + 1;
  const base = CAREERS[j].per || 1, n = Math.max(1, Math.round(base * mult())); T.coins(n); T.persist();
  promoCheck(before); return n;
}
function promoCheck(before){
  const now = levelOf(car()); if (now[0] > before[0]) { T.toast(W2(`🎉 Promotion! You're now ${now[1]}. Your pay goes up.`, `🎉 ¡Ascenso! Ahora eres ${now[2]}. Tu pago sube.`)); if (typeof fireConfetti === "function") fireConfetti(); }
}

/* ---------------------------------------------------------------- hired / fired */
function syncCareer(){
  if (!SESS()) return; const k = car(), j = myJob();
  if (j && k.job !== j) {
    if (k.job) k.hist.push({job:k.job, shifts:k.shifts, cases:k.cases, until:Date.now()});
    Object.assign(k, {job:j, since:Date.now(), shifts:0, cases:0, last:"", duty:{}});
    T.persist(); T.toast(W2(`🎉 You're hired! You're the new ${L(CAREERS[j].title)}. Check Downtown for your first shift.`, `🎉 ¡Te contrataron! Eres ${L(CAREERS[j].title)}. Ve al Centro para tu primer turno.`));
    if (typeof fireConfetti === "function") fireConfetti();
    (EXT.onHire || []).forEach(f => { try { f(j); } catch(e){} });
  } else if (!j && k.job) {
    const old = k.job; k.hist.push({job:old, shifts:k.shifts, cases:k.cases, until:Date.now()}); k.job = null; T.persist();
    T.toast(W2(`You're no longer the ${L(CAREERS[old].title)}. You can apply for another job Downtown.`, `Ya no eres ${L(CAREERS[old].title)}. Puedes pedir otro trabajo en el Centro.`));
  }
}

/* ---------------------------------------------------------------- applying */
window.carApply = function(j){
  const c = CAREERS[j]; if (!c || !SESS()) return;
  const k = car(), b = civ().bank, mine = MYAPPS.find(a => a.job === j && a.status === "pending");
  if (myJob() === j) return T.toast(W2("You already have this job.","Ya tienes este trabajo."));
  const past = (k.hist || []).map(h => CAREERS[h.job] ? L(CAREERS[h.job].title) : "").filter(Boolean);
  sheet(`<div class="eyebrow">${c.e} ${W2("Job application","Solicitud de empleo")}</div><h2>${L(c.title)}</h2>
    <p class="muted" style="margin:0">${L(c.what)} · ${W2(`Starts at ${c.pay} Smithbucks a shift`, `Empieza en ${c.pay} Smithbucks por turno`)}${c.per ? W2(` + ${c.per} per case`, ` + ${c.per} por caso`) : ""}</p>
    ${mine ? `<p class="tnote">📨 ${W2("You already applied. Coach Smith will decide. You can update your résumé below.","Ya enviaste tu solicitud. Coach Smith decidirá. Puedes actualizar tu currículum.")}</p>` : ""}
    <div class="kres"><b>📄 ${W2("Your résumé","Tu currículum")}</b>
      <span>⭐ XP ${S.xp | 0}</span><span>🎓 ${(S.certs || []).length} ${W2("certificates","certificados")}</span><span>🔥 ${civ().streak.n} ${W2("day streak","días seguidos")}</span>
      <span>💳 ${W2("Credit","Crédito")} ${b.credit}</span>${civ().biz ? `<span>🏪 ${W2("Business owner","Dueño de negocio")}</span>` : ""}${past.length ? `<span>💼 ${E(past.join(", "))}</span>` : ""}
      ${(EXT.resumeExtra || []).map(f => { try { return f.html(j); } catch(e){ return ""; } }).join("")}</div>
    <label class="cform">${W2("Why do you want this job? (2–3 sentences)","¿Por qué quieres este trabajo? (2–3 oraciones)")}<textarea id="kWhy1" maxlength="240" rows="3">${E(mine ? mine.why : "")}</textarea></label>
    <label class="cform">${W2("What skills or experience make you good at it?","¿Qué habilidades o experiencia tienes para hacerlo bien?")}<textarea id="kWhy2" maxlength="240" rows="3">${E(mine ? mine.skills : "")}</textarea></label>
    <label class="cform">${W2("Reference (a classmate or teacher who'd vouch for you)","Referencia (un compañero o maestro que te recomiende)")}<input id="kRef" maxlength="40" value="${E(mine ? mine.ref : "")}"></label>
    <p id="kErr" class="terr"></p>
    <button class="btn primary wide" onclick="carSend('${j}')">📨 ${W2("Send application","Enviar solicitud")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.carSend = async function(j){
  const why = document.getElementById("kWhy1").value.trim(), skills = document.getElementById("kWhy2").value.trim(), ref = document.getElementById("kRef").value.trim(), err = document.getElementById("kErr");
  if (why.length < 15 || skills.length < 10) { err.textContent = W2("Write a little more so Coach Smith can get to know you.","Escribe un poco más para que Coach Smith te conozca."); return; }
  if (!cleanText(why) || !cleanText(skills) || !cleanText(ref)) { err.textContent = W2("That has a word that isn't allowed. Use school-appropriate words.","Eso tiene una palabra que no se permite."); return; }
  const k = car(), b = civ().bank;
  try {
    await store().set(`${C()}/apps/${j}_${me()}`, {job:j, sid:me(), uid:store().uid(), name:SESS().name, why, skills, ref, status:"pending", at:Date.now(),
      stats:Object.assign({xp:S.xp | 0, certs:(S.certs || []).length, streak:civ().streak.n, credit:b.credit, biz:!!civ().biz, past:(k.hist || []).map(h => h.job).slice(-4)},
        ...(EXT.resumeExtra || []).map(f => { try { return f.stats(j); } catch(e){ return {}; } }))});
    closeSheet(); T.toast(W2("📨 Application sent! Coach Smith reviews applications and does the hiring.","📨 ¡Solicitud enviada! Coach Smith revisa y contrata."));
  } catch(e){ err.textContent = W2("Couldn't send it right now.","No se pudo enviar."); }
};

/* ---------------------------------------------------------------- requests from townspeople (cases) */
async function newCase(kind, extra){
  const K = KINDS[kind]; if (!K || !SESS()) return null;
  const d = {job:K.job, kind, for:me(), forName:SESS().name, by:me(), uid:store().uid(), status:"open", need:K.need, n:0, at:Date.now(), ...(extra || {})};
  if (extra && extra.id) { const id = extra.id; delete d.id; const ex = await store().get(`${C()}/cases/${id}`).catch(() => null); if (ex) return id; await store().set(`${C()}/cases/${id}`, d); return id; }
  return store().add(`${C()}/cases`, d);
}
window.carRequest = function(kind){
  const K = KINDS[kind]; if (!K) return;
  if (!holders(K.job).length) return T.toast(W2(`There's no ${L(CAREERS[K.job].title)} yet. Apply for the job!`, `Aún no hay ${L(CAREERS[K.job].title)}. ¡Pide el trabajo!`));
  if (CASES.some(c => c.kind === kind && c.for === me() && c.status === "open")) return T.toast(W2("You already have one waiting.","Ya tienes una solicitud esperando."));
  if (K.cost && (S.tokens | 0) < K.cost) return T.toast(W2(`That costs ${K.cost} Smithbucks.`, `Cuesta ${K.cost} Smithbucks.`));
  if (K.opts || K.unit) {
    const units = K.unit ? (typeof allUnits === "function" ? allUnits() : []) : [];
    sheet(`<div class="eyebrow">${K.e} ${L(K.l)}</div><h2>${L(CAREERS[K.job].place)}</h2>
      <div class="cpick col">${K.opts ? K.opts.map(([k, l]) => `<button onclick="carReq2('${kind}','${k}')">${E(L(l))}</button>`).join("")
        : units.map(u => `<button onclick="carReq2('${kind}','${u.id}')">${E(L2(u.title))}</button>`).join("")}</div>
      <button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
    return;
  }
  carReq2(kind, null);
};
window.carReq2 = async function(kind, arg){
  const K = KINDS[kind]; closeSheet();
  try {
    if (K.cost) { T.coins(-K.cost); T.persist(); }
    await newCase(kind, {...(arg ? (K.unit ? {unit:arg} : {opt:arg}) : {}), ...(kind === "loan" ? {credit:civ().bank.credit} : {})});
    T.toast(W2(`Request sent to the ${L(CAREERS[K.job].place)}.`, `Solicitud enviada a ${L(CAREERS[K.job].place)}.`)); paint();
  } catch(e){ if (K.cost) { T.coins(K.cost); T.persist(); } T.toast(W2("Couldn't send it right now.","No se pudo enviar.")); }
};
/* the requester's side: apply the result once */
function settleMine(rows){
  let ch = false;
  rows.forEach(c => { if (c.status !== "done") return; const K = KINDS[c.kind]; if (!K) return;
    ch = T.once("case:" + c.id, () => {
      if (c.kind === "sick") { civ().sick = null; T.toast(W2(`🩺 You're cured! Thanks, Dr. ${c.workerName || ""}.`, `🩺 ¡Estás curado! Gracias, Dr. ${c.workerName || ""}.`)); }
      else if (c.kind === "loan") { if (c.result === "approve") { civ().bank.boost = {n:20, until:Date.now() + 7 * 864e5}; T.toast(W2("💵 The banker approved your request: you can borrow 20 more Smithbucks this week.","💵 El banquero aprobó: puedes pedir 20 Smithbucks más esta semana.")); }
        else T.toast(W2("The banker denied your bigger loan. Pay loans on time to raise your credit score.","El banquero negó tu préstamo. Paga a tiempo para subir tu crédito.")); }
      else if (c.kind === "claim") T.toast(c.result === "plaintiff" ? W2(`⚖️ Judge ${c.workerName || ""} ruled in your favor.`, `⚖️ El juez falló a tu favor.`) : W2(`⚖️ Judge ${c.workerName || ""} dismissed your case.`, `⚖️ El juez desestimó tu caso.`));
      else if (c.kind === "order") { civ().fed = day(); T.toast(L(K.done)); }
      else { if (K.pay) T.coins(K.pay); if (K.done) T.toast(L(K.done)); }
    }) || ch; });
  if (ch) T.persist();
}

/* ---------------------------------------------------------------- doing the work */
window.carCase = function(id){
  const c = CASES.find(x => x.id === id), j = myJob(); if (!c || !j || c.job !== j || c.status !== "open") return;
  const K = KINDS[c.kind];
  if (c.kind === "photo") return T.toast(W2(`Visit ${c.forName}'s house and tap 📸 there.`, `Visita la casa de ${c.forName} y toca 📸 ahí.`));
  work({title:`${L(K.l)} · ${c.forName}`, e:K.e, need:Math.max(1, (c.need || K.need) - (c.n | 0)), subj:CAREERS[j].subj, unit:c.unit || null,
    onDone: () => { if (K.decide) return decide(c); closeCase(c, null); },
    onStop: got => { if (got) store().update(`${C()}/cases/${c.id}`, {n:(c.n | 0) + got, worker:me(), workerName:SESS().name}).catch(() => {}); }});
};
function decide(c){
  const K = KINDS[c.kind];
  sheet(`<div class="eyebrow">${K.e} ${L(K.l)}</div><h2>${E(c.forName)}</h2>
    ${c.kind === "loan" ? `<p>${W2("Look at their credit before you decide.","Revisa su crédito antes de decidir.")} <b>${W2("Credit score","Puntaje")}: ${c.credit || "?"}</b></p>` : ""}
    ${c.opt && K.opts ? `<p>${E(L((K.opts.find(o => o[0] === c.opt) || [0, ["", ""]])[1]))}</p>` : ""}
    <div class="cyn">${K.decide.map(([k, e, l]) => `<button class="btn ${k === K.decide[0][0] ? "primary" : ""}" onclick="carDecide('${c.id}','${k}')">${e} ${L(l)}</button>`).join("")}</div>`);
}
window.carDecide = (id, r) => { const c = CASES.find(x => x.id === id); closeSheet(); if (c) closeCase(c, r); };
async function closeCase(c, result){
  try {
    await store().update(`${C()}/cases/${c.id}`, {status:"done", n:c.need, worker:me(), workerName:SESS().name, doneAt:Date.now(), ...(result ? {result} : {})});
    const n = payCase(c.kind); T.toast(W2(`Case closed! +${n} Smithbucks.`, `¡Caso cerrado! +${n} Smithbucks.`)); paint();
  } catch(e){ T.toast(W2("Someone else may have closed it already.","Puede que alguien ya lo cerró.")); }
}
window.carDuty = function(){
  const j = myJob(); if (!j) return; const C2 = CAREERS[j], d = duty();
  if (d.paid) return T.toast(W2("Today's shift is done. Come back tomorrow!","El turno de hoy está hecho. ¡Vuelve mañana!"));
  const kind = C2.duty.kind;
  if (kind === "story") return carStory();
  if (kind === "litter") { T.toast(W2("Go to the Plaza and tap the litter 🥤 to clean it.","Ve a la Plaza y toca la basura 🥤 para limpiarla.")); return townTab("plaza"); }
  if (kind === "photo") { T.toast(W2("Visit classmates' houses (Homes) and tap 📸 Take a photo.","Visita casas (Casas) y toca 📸 Tomar foto.")); return townTab("homes"); }
  if (kind === "build") return carBuildPick();
  work({title:L(C2.duty.l), e:C2.e, need:C2.duty.n - (d.n | 0), subj:C2.subj,
    onStep: () => { d.n = (d.n | 0) + 1; },
    onDone: () => { if (kind === "plant") plantTree(); payShift(); paint(); }, onStop: () => { T.persist(); paint(); }});
};
/* builder */
function carBuildPick(){
  const open = REQS.filter(r => r.status === "approved");
  if (!open.length) { const d = duty(), C2 = CAREERS.builder;
    T.toast(W2("No approved projects yet, so today is training.","Aún no hay proyectos aprobados: hoy es entrenamiento."));
    return work({title:W2("Builder training","Entrenamiento"), e:"🏗️", need:C2.duty.n - (d.n | 0), subj:"any", onStep:() => { d.n = (d.n | 0) + 1; }, onDone:() => { payShift(); paint(); }, onStop:() => { T.persist(); paint(); }}); }
  if (open.length === 1) return carBuild(open[0].id);
  sheet(`<div class="eyebrow">🏗️ ${W2("Pick a project","Elige un proyecto")}</div><div class="cpick col">${open.map(r => { const P = PROJECTS[r.proj] || {};
    return `<button onclick="carBuild('${r.id}')">${P.e || "🏗️"} ${E(P.l ? L(P.l) : r.proj)} <small>${r.n | 0}/${r.need}</small></button>`; }).join("")}</div>`);
}
window.carBuild = function(rid){
  const r = REQS.find(x => x.id === rid); if (!r) return; const P = PROJECTS[r.proj] || {e:"🏗️", l:[r.proj, r.proj]}, d = duty();
  let n = r.n | 0;
  work({title:`${W2("Build","Construir")}: ${L(P.l)}`, e:P.e, need:Math.max(1, Math.min(CAREERS.builder.duty.n - (d.n | 0), r.need - n)), subj:"any",
    onStep: () => { n++; d.n = (d.n | 0) + 1; store().update(`${C()}/requests/${rid}`, {n:Math.min(r.need, n), builders:[...new Set([...(r.builders || []), me()])]}).catch(() => {}); },
    onDone: () => { if (d.n >= CAREERS.builder.duty.n) payShift(); finishProject({...r, n}); paint(); }, onStop: () => { T.persist(); paint(); }});
};
async function finishProject(r){
  if (r.status !== "approved" || (r.n | 0) < r.need || (r.coins | 0) < r.cost) return;
  await store().update(`${C()}/requests/${r.id}`, {status:"done", doneAt:Date.now()}).catch(() => {});
  T.toast(W2(`🎉 The ${L((PROJECTS[r.proj] || {l:[r.proj, r.proj]}).l)} is finished!`, `🎉 ¡Se terminó: ${L((PROJECTS[r.proj] || {l:[r.proj, r.proj]}).l)}!`));
}
/* ranger: the park */
async function plantTree(){
  const P = `${C()}/cases/park`, cur = await store().get(P).catch(() => null);
  await store().set(P, {job:"ranger", kind:"park", by:me(), uid:store().uid(), status:"open", n:((cur && cur.n) | 0) + 1, at:Date.now(), need:0, for:me(), forName:SESS().name}).catch(() => {});
  T.toast(W2("🌳 You planted a tree on the plaza!","🌳 ¡Plantaste un árbol en la plaza!"));
}
/* reporter */
function carStory(){
  sheet(`<div class="eyebrow">📰 ${W2("The Grenadier Gazette","La Gaceta Grenadier")}</div><h2>${W2("Today's story","La noticia de hoy")}</h2>
    <p class="muted">${W2("Report on something real in town: a new business, the election, a law, a landmark, a classmate's great house. Coach Smith approves stories before they're published.",
      "Informa algo real del pueblo: un negocio nuevo, la elección, una ley, una obra, una casa genial. Coach Smith aprueba las noticias antes de publicarlas.")}</p>
    <label class="cform">${W2("Headline","Titular")}<input id="kHead" maxlength="60"></label>
    <label class="cform">${W2("Story","Noticia")}<textarea id="kBody" maxlength="400" rows="5"></textarea></label><p id="kErr" class="terr"></p>
    <button class="btn primary wide" onclick="carSendStory()">📨 ${W2("Send to the editor","Enviar al editor")}</button><button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
}
window.carSendStory = async function(){
  const h = document.getElementById("kHead").value.trim(), b = document.getElementById("kBody").value.trim(), err = document.getElementById("kErr");
  if (h.length < 6 || b.length < 40) { err.textContent = W2("Write a headline and at least two sentences.","Escribe un titular y al menos dos oraciones."); return; }
  if (!cleanText(h) || !cleanText(b)) { err.textContent = W2("That has a word that isn't allowed.","Eso tiene una palabra que no se permite."); return; }
  try { await store().add(`${C()}/news`, {sid:me(), uid:store().uid(), name:SESS().name, headline:h, body:b, status:"review", at:Date.now()});
    closeSheet(); payShift(); paint(); } catch(e){ err.textContent = W2("Couldn't send it right now.","No se pudo enviar."); }
};
/* photographer */
window.carSnap = function(sid){
  const k = car(), d = duty(); if (myJob() !== "photographer" || sid === me()) return;
  const key = day() + ":" + sid; if (k.snaps[key]) return T.toast(W2("You already photographed this house today.","Ya fotografiaste esta casa hoy."));
  k.snaps[key] = 1; Object.keys(k.snaps).forEach(x => { if (!x.startsWith(day())) delete k.snaps[x]; });
  if (!d.paid) { d.n = (d.n | 0) + 1; if (d.n >= CAREERS.photographer.duty.n) payShift(); else { T.persist(); T.toast(W2(`📸 Snap! ${d.n}/${CAREERS.photographer.duty.n} houses today.`, `📸 ¡Clic! ${d.n}/${CAREERS.photographer.duty.n} casas hoy.`)); } }
  const c = CASES.find(x => x.kind === "photo" && x.for === sid && x.status === "open"); if (c) closeCase(c, null);
  T.paintSub();
};
EXT.houseExtra.push({doorstep:true, html: sid => myJob() === "photographer" && SESS() && sid !== me()
  ? `<section class="panel"><button class="btn primary" onclick="carSnap('${sid}')">📸 ${W2("Take a photo for the Gazette","Tomar foto para la Gaceta")}</button></section>` : ""});

/* ---------------------------------------------------------------- things that happen on their own */
function lifeEvents(){
  if (!SESS()) return; const c = civ(), d = day();
  /* getting sick: only when the town has a doctor; heals on its own after 2 days */
  if (c.sick && c.sick.since && Date.now() - c.sick.since > 2 * 864e5) { c.sick = null; T.toast(W2("You feel better now.","Ya te sientes mejor.")); }
  if (!c.sick && holders("doctor").length && myJob() !== "doctor" && c.sickChk !== d) { c.sickChk = d;
    if (hashN(d + ":flu:" + me()) % 100 < 8) { c.sick = {since:Date.now()}; newCase("sick", {id:`sick_${d}_${me()}`}).catch(() => {});
      T.toast(W2("🤒 You caught the Grenadier flu! Daily jobs pay half until a doctor cures you. A doctor has been called.","🤒 ¡Te dio gripe! Los trabajos diarios pagan la mitad hasta que un médico te cure. Ya llamaron al médico.")); } }
  /* pets need a check-up once a week */
  const pet = Object.values(T.town().house.slots || {}).find(id => /^pet_/.test(id || ""));
  if (pet && holders("vet").length && c.petWk !== week()) { c.petWk = week(); newCase("pet", {id:`pet_${week()}_${me()}`, auto:1}).catch(() => {}); }
  V.store && T.persist();
}
/* firefighters on shift spot today's fire */
async function fireCheck(){
  if (myJob() !== "firefighter") return; const d = day(), list = T.lots(); if (list.length < 3) return;
  if (hashN(d + ":fire:" + SESS().cid) % 3 === 0) return;   /* about two fires every three days */
  const p = list[hashN(d + "fire") % list.length], id = `fire_${d}`;
  const ex = await store().get(`${C()}/cases/${id}`).catch(() => null); if (ex) return;
  await store().set(`${C()}/cases/${id}`, {job:"firefighter", kind:"fire", for:p.sid, forName:p.name || "", by:me(), uid:store().uid(), status:"open", need:KINDS.fire.need, n:0, at:Date.now()}).catch(() => {});
}
EXT.onBuy.push(() => { if (holders("mail").length) newCase("package", {auto:1}).catch(() => {}); });

/* ---------------------------------------------------------------- the plaza: litter and the park */
const LITTER = 6, LIT_E = ["🥤","🍌","📄","🥫","🍟","🧃"];
const litterSpots = () => Array.from({length:LITTER}, (_, i) => { const h = hashN(day() + ":lit:" + i + (SESS() ? SESS().cid : ""));
  return {i, x:320 + (h % 600), y:250 + ((h >> 10) % 250), e:LIT_E[i % LIT_E.length]}; });
let LIT = {mask:0}, PARK = 0;
const TREE_AT = [[270,230],[930,260],[300,520],[930,520],[250,380],[880,420],[620,520],[400,240],[770,250],[540,250],[350,450],[850,330]];
EXT.plazaBack.push(cx => {
  if (!PARK) return; cx.font = "38px sans-serif"; cx.textAlign = "center";
  TREE_AT.slice(0, Math.min(PARK, TREE_AT.length)).forEach(([x, y]) => cx.fillText("🌳", x, y));
});
EXT.plazaFront.push(cx => {
  if (!holders("sanitation").length) return; cx.font = "26px sans-serif"; cx.textAlign = "center";
  litterSpots().forEach(s => { if (!(LIT.mask & (1 << s.i))) cx.fillText(s.e, s.x, s.y); });
});
EXT.plazaTap.push((x, y) => {
  if (!holders("sanitation").length) return false;
  const s = litterSpots().find(s => !(LIT.mask & (1 << s.i)) && Math.abs(s.x - x) < 26 && Math.abs(s.y - 10 - y) < 26); if (!s) return false;
  if (myJob() !== "sanitation") { T.toast(W2("Litter! Only the Sanitation crew can clean it up. Want the job? Apply Downtown.","¡Basura! Solo el equipo de limpieza puede recogerla. ¿Quieres el trabajo? Pide en el Centro.")); return true; }
  work({title:W2("Clean up the plaza","Limpiar la plaza"), e:s.e, need:1, subj:"any", onDone: async () => {
    const id = `${C()}/cases/litter_${day()}`, cur = await store().get(id).catch(() => null), mask = ((cur && cur.mask) | 0) | (1 << s.i);
    await store().set(id, {job:"sanitation", kind:"litter", by:me(), uid:store().uid(), status:"open", mask, n:0, need:0, at:Date.now(), for:me(), forName:SESS().name}).catch(() => {});
    LIT.mask = mask; const d = duty();
    if (!d.paid) { d.n = (d.n | 0) + 1; if (d.n >= CAREERS.sanitation.duty.n) payShift(); else { T.persist(); T.toast(W2(`🧹 Clean! ${d.n}/${CAREERS.sanitation.duty.n} today.`, `🧹 ¡Limpio! ${d.n}/${CAREERS.sanitation.duty.n} hoy.`)); } }
    else { T.coins(1); T.persist(); T.toast(W2("🧹 Extra cleanup: +1 Smithbuck.","🧹 Limpieza extra: +1 Smithbuck.")); } }});
  return true;
});
EXT.plazaSub.push(() => {
  sub(store().watch(`${C()}/cases`, {where:[["kind","in",["litter","park"]]]}, rows => { if (!rows) return;
    const l = rows.find(r => r.id === `litter_${day()}`); LIT = {mask:l ? l.mask | 0 : 0}; const p = rows.find(r => r.id === "park"); PARK = p ? p.n | 0 : 0; }));
});

/* ---------------------------------------------------------------- the mayor's office */
function mayorDaily(){
  if (!SESS()) return; const m = CLS().mayor, c = civ();
  if (isMayor()) {
    T.once("mayor:" + (m.eid || m.sid), () => {
      const t = T.town(); t.owned.mansion = 1; t.house.style = "mansion";
      ["mayor_desk","mayor_flag","mayor_portrait"].forEach(id => T.addItem(id, 1)); T.coins(20);
      T.toast(W2("🎖️ Welcome to office, Mayor! You moved into the Mansion, got mayor-only furniture and a 20-Smithbuck signing bonus.","🎖️ ¡Bienvenido, Alcalde! Te mudaste a la Mansión, recibiste muebles exclusivos y 20 Smithbucks."));
      if (typeof fireConfetti === "function") fireConfetti(); T.persist(); T.publishNow(); });
    if (c.mayorPay !== day()) { c.mayorPay = day(); T.coins(MAYOR_PAY); T.persist(); T.toast(W2(`🎖️ Mayor's salary: +${MAYOR_PAY} Smithbucks.`, `🎖️ Salario de alcalde: +${MAYOR_PAY} Smithbucks.`)); }
  }
}
EXT.priceMult.push(() => isMayor() ? 0.8 : 1);
EXT.nameTag.push(sid => { const m = CLS().mayor; if (m && m.sid === sid) return "🎖️"; const s = staff();
  const j = Object.keys(CAREERS).find(k => (s[k] || []).includes(sid)); return j ? CAREERS[j].e : ""; });
EXT.streetBadge.push(p => { const m = CLS().mayor, was = (CLS().mayors || []).some(x => x.sid === p.sid) && !(m && m.sid === p.sid);
  const j = Object.keys(CAREERS).find(k => (staff()[k] || []).includes(p.sid));
  return (m && m.sid === p.sid ? `<span class="cbadge" title="${W2("Mayor's Residence","Residencia del alcalde")}">🏛️</span>` : "")
    + (was ? `<span class="cbadge" title="${W2("Former mayor","Exalcalde")}">🎗️</span>` : "")
    + (j ? `<span class="cbadge" title="${E(L(CAREERS[j].title))}">${CAREERS[j].e}</span>` : ""); });
const todayActs = () => ACTS.filter(a => a.day === day());
window.carAct = async function(kind, arg){
  if (!isMayor()) return; const wk = week();
  if (kind === "holiday" && ACTS.some(a => a.kind === "holiday" && a.week === wk)) return T.toast(W2("You can declare one Town Holiday a week.","Puedes declarar un feriado por semana."));
  if (kind !== "holiday" && todayActs().some(a => a.kind === kind)) return T.toast(W2("You already did that today.","Ya lo hiciste hoy."));
  if (kind === "proclaim" && !arg) return sheet(`<div class="eyebrow">📜 ${W2("Proclamation","Proclamación")}</div><div class="cpick col">${Object.entries(PROCLAIM).map(([k, l]) => `<button onclick="carAct('proclaim','${k}')">${E(L(l))}</button>`).join("")}</div>`);
  closeSheet();
  try { await store().add(`${C()}/mayoracts`, {sid:me(), uid:store().uid(), name:SESS().name, kind, arg:arg || null, day:day(), week:wk, at:Date.now()});
    T.toast({holiday:W2("🎉 Town Holiday declared! Everyone gets a gift today.","🎉 ¡Feriado declarado! Todos reciben un regalo hoy."), challenge:W2("🏆 Mayor's Challenge is on: 30 XP today earns everyone 4 Smithbucks.","🏆 Reto del alcalde: 30 XP hoy = 4 Smithbucks para todos."), proclaim:W2("📜 Proclamation posted.","📜 Proclamación publicada.")}[kind]);
  } catch(e){ T.toast(W2("Couldn't do that right now.","No se pudo ahora.")); }
};
function applyActs(){
  if (!SESS()) return; let ch = false;
  todayActs().forEach(a => {
    if (a.kind === "holiday") ch = T.once("act:" + a.id, () => { T.coins(3); T.town().crates++; T.toast(W2(`🎉 Mayor ${a.name} declared a Town Holiday! +3 Smithbucks and a crate.`, `🎉 ¡El alcalde ${a.name} declaró feriado! +3 Smithbucks y una caja.`)); }) || ch;
    if (a.kind === "challenge" && V.xpSince("mc:" + a.id) >= 30) ch = T.once("act:" + a.id, () => { T.coins(4); T.toast(W2("🏆 You beat the Mayor's Challenge: +4 Smithbucks!","🏆 ¡Superaste el reto del alcalde: +4 Smithbucks!")); }) || ch;
  });
  if (ch) T.persist();
}
setInterval(applyActs, 20000);
EXT.banner.push(() => { const a = todayActs(); if (!a.length || !SESS()) return "";
  const pr = a.find(x => x.kind === "proclaim"), ch = a.find(x => x.kind === "challenge");
  return `<section class="panel kban">${pr && PROCLAIM[pr.arg] ? `<b>${E(L(PROCLAIM[pr.arg]))}</b> <small>· ${W2("Mayor","Alcalde")} ${E(pr.name)}</small>` : ""}
    ${ch ? `<span>🏆 ${W2("Mayor's Challenge: earn 30 XP today for +4 Smithbucks","Reto del alcalde: gana 30 XP hoy y recibe 4 Smithbucks")} (${Math.min(30, V.xpSince("mc:" + ch.id))}/30)</span>` : ""}</section>`; });
/* ribbon cuttings, builder and donor rewards, and the daily town-pride bonus */
function projectRewards(){
  if (!SESS()) return; let ch = false;
  REQS.filter(r => r.status === "done").forEach(r => { const P = PROJECTS[r.proj] || {l:[r.proj, r.proj]};
    if (isMayor()) ch = T.once("ribbon:" + r.id, () => { T.coins(RIBBON); T.toast(W2(`✂️ You cut the ribbon on the ${L(P.l)}: +${RIBBON} Smithbucks.`, `✂️ Cortaste el listón de ${L(P.l)}: +${RIBBON} Smithbucks.`)); }) || ch;
    if ((r.builders || []).includes(me()) || (r.donors || []).includes(me())) ch = T.once("built:" + r.id, () => { T.town().crates++; T.toast(W2(`🏗️ You helped build the ${L(P.l)}! +1 crate.`, `🏗️ ¡Ayudaste a construir ${L(P.l)}! +1 caja.`)); }) || ch;
  });
  const n = Math.min(PRIDE_MAX, REQS.filter(r => r.status === "done").length), c = civ();
  if (n && c.pride !== day()) { c.pride = day(); T.coins(n); ch = true; T.toast(W2(`🏙️ Town pride: +${n} Smithbuck${n > 1 ? "s" : ""} for ${n} landmark${n > 1 ? "s" : ""}.`, `🏙️ Orgullo del pueblo: +${n} Smithbuck(s).`)); }
  if (ch) T.persist();
}

/* ---------------------------------------------------------------- town requests (projects) */
window.carPropose = function(){
  sheet(`<div class="eyebrow">📌 ${W2("Request something for the town","Pide algo para el pueblo")}</div>
    <p class="muted">${W2("The mayor approves requests. Then builders build it and everyone can chip in Smithbucks. Finished projects become landmarks that pay everyone every day.",
      "El alcalde aprueba las solicitudes. Luego los constructores la construyen y todos pueden aportar. Las obras terminadas pagan a todos cada día.")}</p>
    <div class="cbiz">${Object.entries(PROJECTS).map(([k, p]) => `<button onclick="carPropose2('${k}')"><span class="tie big">${p.e}</span><b>${L(p.l)}</b><small>🏗️ ${p.need} · 💵 ${p.cost}</small></button>`).join("")}</div>
    <button class="btn ghost wide" onclick="townCloseCard()">${W2("Cancel","Cancelar")}</button>`);
};
window.carPropose2 = function(k){
  const P = PROJECTS[k];
  if (REQS.some(r => r.proj === k && ["review","approved"].includes(r.status))) { closeSheet(); return T.toast(W2("Someone already asked for that. Give it a 👍 on the board!","Alguien ya lo pidió. ¡Dale 👍 en el tablero!")); }
  sheet(`<div class="eyebrow">${P.e} ${L(P.l)}</div><label class="cform">${W2("Why does the town need it? (optional)","¿Por qué lo necesita el pueblo? (opcional)")}<input id="kNote" maxlength="100"></label><p id="kErr" class="terr"></p>
    <button class="btn primary wide" onclick="carPropose3('${k}')">📌 ${W2("Post the request","Publicar")}</button><button class="btn ghost wide" onclick="carPropose()">← ${W2("Back","Atrás")}</button>`);
};
window.carPropose3 = async function(k){
  const note = document.getElementById("kNote").value.trim(), P = PROJECTS[k];
  if (note && !cleanText(note)) { document.getElementById("kErr").textContent = W2("That has a word that isn't allowed.","Eso tiene una palabra que no se permite."); return; }
  try { await store().add(`${C()}/requests`, {sid:me(), uid:store().uid(), name:SESS().name, proj:k, note, status:"review", n:0, need:P.need, coins:0, cost:P.cost, donors:[], builders:[], at:Date.now()});
    closeSheet(); T.toast(W2("📌 Posted! The mayor will review it.","📌 ¡Publicado! El alcalde lo revisará.")); } catch(e){ T.toast(W2("Couldn't post it right now.","No se pudo publicar.")); }
};
window.carSecond = async function(rid){
  try { await store().set(`${C()}/reqvotes/${rid}_${me()}`, {rid, sid:me(), at:Date.now()}); T.toast("👍"); } catch(e){ T.toast(W2("You already gave this a 👍.","Ya le diste 👍.")); }
};
window.carDonate = async function(rid){
  const r = REQS.find(x => x.id === rid); if (!r) return; const amt = Math.min(5, r.cost - (r.coins | 0));
  if (amt <= 0) return; if ((S.tokens | 0) < amt) return T.toast(W2("Not enough Smithbucks.","No tienes suficientes Smithbucks."));
  T.coins(-amt); T.persist();
  try { await store().update(`${C()}/requests/${rid}`, {coins:(r.coins | 0) + amt, donors:[...new Set([...(r.donors || []), me()])]});
    T.toast(W2(`You chipped in ${amt} Smithbucks. Thank you!`, `Aportaste ${amt} Smithbucks. ¡Gracias!`)); finishProject({...r, coins:(r.coins | 0) + amt}); }
  catch(e){ T.coins(amt); T.persist(); T.toast(W2("Couldn't donate right now.","No se pudo aportar.")); }
};
window.carReqSet = async function(rid, status){
  if (!isMayor() && !T.CIV.proj) return;
  if (status === "approved" && REQS.filter(r => r.status === "approved").length >= 3) return T.toast(W2("Three projects are already being built. Finish one first.","Ya se construyen tres proyectos. Termina uno primero."));
  try { await store().update(`${C()}/requests/${rid}`, {status, by:me(), decidedAt:Date.now()}); T.toast(status === "approved" ? W2("✅ Approved! Builders can start.","✅ ¡Aprobado! Los constructores pueden empezar.") : W2("Declined.","Rechazado.")); }
  catch(e){ T.toast(W2("Couldn't do that right now.","No se pudo ahora.")); }
};

/* ---------------------------------------------------------------- Downtown */
let BLD = null;
const PLACES = () => [
  ...Object.keys(CAREERS).map(k => ({k, e:CAREERS[k].e, l:CAREERS[k].place, job:k})),
  {k:"board", e:"📌", l:["Community Board","Tablero comunitario"]},
  {k:"mansion", e:"🏛️", l:["Mayor's Mansion","Mansión del alcalde"]},
  {k:"hall", e:"🏢", l:["Town Hall","Ayuntamiento"], go:"hall"},
  {k:"bankacct", e:"💰", l:["My bank account","Mi cuenta"], go:"bank"}
];
const openCases = j => CASES.filter(c => c.job === j && c.status === "open" && !["litter","park"].includes(c.kind));
function paintDowntown(el){
  const draw = () => { if (BLD) return paintBuilding(el, BLD);
    const j = myJob(), k = car(), d = duty(), land = REQS.filter(r => r.status === "done"), news = NEWS.filter(n => n.status === "published").sort((a, b) => b.at - a.at)[0];
    el.innerHTML = `<section class="panel raised kdt"><div><div class="eyebrow">🗺️ ${W2("Downtown","Centro")}</div><h2>${W2("Grenadier Town at work","El pueblo trabajando")}</h2>
        <p class="muted">${W2("Every building is a job a classmate can hold. Apply for one, request a service, or ask for a new landmark on the Community Board.","Cada edificio es un trabajo. Pide uno, solicita un servicio, o pide una obra nueva en el Tablero comunitario.")}</p></div>
        ${j ? `<div class="kme">${CAREERS[j].e}<div><small>${W2("Your job","Tu trabajo")}</small><b>${E(jobTitle(j, k))}</b>${bar(d.paid ? 1 : (d.n | 0) / CAREERS[j].duty.n, "#3BB273")}
          <small>${d.paid ? "✅ " + W2("Shift done","Turno hecho") : E(L(CAREERS[j].duty.l))}</small></div><button class="btn primary" onclick="carGo('${j}')">${W2("Go to work","Ir a trabajar")}</button></div>` : ""}</section>
      ${news ? `<section class="panel kpaper"><div class="eyebrow">📰 ${W2("Latest in the Gazette","Lo último en la Gaceta")}</div><b>${E(news.headline)}</b> <small class="muted">${W2("by","por")} ${E(news.name)}</small></section>` : ""}
      <div class="kmap">${PLACES().map(p => { const o = p.job ? openSeats(p.job) : 0, q = p.job ? openCases(p.job).length : p.k === "board" ? REQS.filter(r => r.status === "review").length : 0,
          who = p.job ? holders(p.job).map(s => staffNames()[s] || "").filter(Boolean) : p.k === "mansion" && CLS().mayor && CLS().mayor.sid ? [CLS().mayor.name] : [];
        return `<button class="kb ${p.job && p.job === j ? "mine" : ""}" onclick="${p.go ? `townTab('${p.go}')` : `carGo('${p.k}')`}">
          ${o ? `<i class="khire">${W2("NOW HIRING","SE BUSCA")}</i>` : ""}${q ? `<i class="kq">${q}</i>` : ""}
          ${img(`${DT}${p.k}.webp`, p.e, "big")}<b>${E(L(p.l))}</b><small>${who.length ? E(who.join(", ")) : p.job ? W2("Open job","Puesto libre") : ""}</small></button>`; }).join("")}
        ${land.map(r => { const P = PROJECTS[r.proj] || {e:"🏗️", l:[r.proj, r.proj]}; return `<div class="kb land">${img(`${DT}land_${r.proj}.webp`, P.e, "big")}<b>${E(L(P.l))}</b><small>🏙️ ${W2("Landmark","Obra")}</small></div>`; }).join("")}</div>
      <p class="muted" style="font-size:12px;text-align:center">${W2("Jobs pay every shift on top of daily jobs and your business. Do your shift every day to get promoted: Trainee → Associate → Senior → Chief.","Los trabajos pagan cada turno, además de los trabajos diarios y tu negocio. Haz tu turno cada día para ascender: Aprendiz → Asociado → Sénior → Jefe.")}</p>`;
  };
  window._carDraw = draw; draw();
  watchDowntown(draw);
}
function watchDowntown(draw){
  if (!SESS()) return;
  sub(store().watch(`${C()}/cases`, {where:[["status","==","open"]]}, rows => { if (rows) { CASES = rows; draw(); } }));
  sub(store().watch(`${C()}/requests`, {}, rows => { if (rows) { REQS = rows.sort((a, b) => b.at - a.at); draw(); projectRewards(); } }));
  sub(store().watch(`${C()}/news`, {where:[["status","==","published"]]}, rows => { if (rows) { NEWS = rows; draw(); } }));
  sub(store().watch(`${C()}/reqvotes`, {}, rows => { if (rows) { VOTES = {}; rows.forEach(v => { VOTES[v.rid] = (VOTES[v.rid] || 0) + 1; }); draw(); } }));
  sub(NET().watchPub(rows => { if (rows) rows.forEach(p => T.pub[p.id] = p); }));
}
window.carGo = function(k){ BLD = k; if (T.tt !== "downtown") { townTab("downtown"); } else T.paintSub(); window.scrollTo(0, 0); };
window.carBack = function(){ BLD = null; T.paintSub(); };
function paintBuilding(el, k){
  const back = `<div class="eprow"><button class="btn ghost" onclick="carBack()">← ${W2("Downtown","Centro")}</button></div>`;
  if (k === "board") return paintBoard(el, back);
  if (k === "mansion") return paintMansion(el, back);
  const C2 = CAREERS[k]; if (!C2) { BLD = null; return paintDowntown(el); }
  const mine = myJob() === k, kk = car(), d = duty(), hs = holders(k), q = openCases(k), applied = MYAPPS.find(a => a.job === k && a.status === "pending");
  const services = Object.entries(KINDS).filter(([kind, K]) => K.job === k && K.ask);
  const titleNews = k === "reporter" ? NEWS.filter(n => n.status === "published").sort((a, b) => b.at - a.at).slice(0, 6) : [];
  el.innerHTML = `${back}
    <section class="panel raised kbld">${img(`${DT}${k}.webp`, C2.e, "big")}<div><div class="eyebrow">${E(L(C2.place))}</div><h2>${E(L(C2.title))}</h2>
      <p class="muted" style="margin:0">${E(L(C2.what))}</p>
      <div class="cstats"><span>💰 ${C2.pay} ${W2("Smithbucks a shift","Smithbucks por turno")}${C2.per ? ` + ${C2.per} ${W2("per case","por caso")}` : ""}</span><span>🪑 ${hs.length}/${C2.seats} ${W2("hired","contratados")}</span></div></div></section>
    ${mine ? `<section class="panel kshift"><div class="eyebrow">🗓️ ${W2("Your shift today","Tu turno de hoy")}</div>
        <h3 style="margin:2px 0">${E(jobTitle(k, kk))}</h3>${bar(d.paid ? 1 : (d.n | 0) / C2.duty.n, "#3BB273")}
        <p>${d.paid ? "✅ " + W2("Shift done. See you tomorrow!","Turno hecho. ¡Nos vemos mañana!") : `${E(L(C2.duty.l))} · ${d.n | 0}/${C2.duty.n}`}</p>
        ${d.paid ? "" : `<button class="btn primary" onclick="carDuty()">▶ ${W2("Start my shift","Empezar mi turno")}</button>`}
        <p class="muted" style="font-size:12px">${W2(`Shifts worked: ${kk.shifts | 0} · Cases closed: ${kk.cases | 0}`, `Turnos: ${kk.shifts | 0} · Casos: ${kk.cases | 0}`)}${nextLevel(kk) ? W2(` · Next promotion: ${nextLevel(kk)[1]} at ${nextLevel(kk)[0]} points`, ` · Próximo ascenso: ${nextLevel(kk)[2]} con ${nextLevel(kk)[0]} puntos`) : " · 👑 " + W2("Top level!","¡Nivel máximo!")}</p></section>` : ""}
    ${(mine || q.length) && Object.values(KINDS).some(K => K.job === k) ? `<section class="panel"><div class="eyebrow">📋 ${W2("Waiting for help","Esperando ayuda")} (${q.length})</div>
      ${q.map(c => { const K = KINDS[c.kind] || {e:"•", l:["",""]}; const u = c.unit && typeof findUnit === "function" ? findUnit(c.unit) : null;
        return `<div class="cjob"><span>${K.e}</span><b>${E(L(K.l))} · ${E(c.forName)}${u ? ` <small>${E(L2(u.title))}</small>` : ""}${c.opt && K.opts ? ` <small>${E(L((K.opts.find(o => o[0] === c.opt) || [0, ["",""]])[1]))}</small>` : ""}${c.n ? ` <small>${c.n}/${c.need}</small>` : ""}</b>
          ${mine ? `<button class="btn primary" onclick="carCase('${c.id}')">${c.kind === "photo" ? "📸" : W2("Help","Ayudar")}</button>` : `<i class="muted">${W2("waiting","esperando")}</i>`}</div>`; }).join("") || `<p class="muted">${W2("Nobody needs help right now.","Nadie necesita ayuda ahora.")}</p>`}</section>` : ""}
    ${services.length ? `<section class="panel"><div class="eyebrow">🛎️ ${W2("Services","Servicios")}</div><div class="cmake">${services.map(([kind, K]) => `<button class="btn" onclick="carRequest('${kind}')">${K.e} ${E(L(K.l))}</button>`).join("")}</div>
      ${!hs.length ? `<p class="muted" style="font-size:12px">${W2("Nobody has this job yet, so services are closed.","Nadie tiene este trabajo, así que los servicios están cerrados.")}</p>` : ""}</section>` : ""}
    ${(EXT.jobPanel || []).map(f => { try { return f(k, mine) || ""; } catch(e){ return ""; } }).join("")}
    ${titleNews.length ? `<section class="panel kpaper"><div class="eyebrow">📰 ${W2("The Grenadier Gazette","La Gaceta Grenadier")}</div>${titleNews.map(n => `<article><b>${E(n.headline)}</b><p>${E(n.body)}</p><small class="muted">${W2("by","por")} ${E(n.name)} · ${new Date(n.at).toLocaleDateString()}</small></article>`).join("")}</section>` : ""}
    <section class="panel"><div class="eyebrow">👥 ${W2("Staff","Personal")}</div><div class="cmini">${hs.map(s => `<span>${C2.e} ${E(staffNames()[s] || "")}</span>`).join("") || `<span>${W2("Nobody yet","Nadie aún")}</span>`}</div>
      ${mine ? "" : openSeats(k) ? `<button class="btn primary" onclick="carApply('${k}')">📝 ${applied ? W2("Update my application","Actualizar mi solicitud") : W2("Apply for this job","Pedir este trabajo")}</button>`
        : `<p class="muted" style="font-size:13px">${W2("All seats are filled. If one opens, you'll see NOW HIRING.","Todos los puestos están ocupados. Si se abre uno, verás SE BUSCA.")}</p>`}</section>`;
  if (mine && k === "firefighter") fireCheck();
}
function paintBoard(el, back){
  const may = isMayor(), rv = REQS.filter(r => r.status === "review"), ap = REQS.filter(r => r.status === "approved"), dn = REQS.filter(r => r.status === "done");
  const row = r => { const P = PROJECTS[r.proj] || {e:"🏗️", l:[r.proj, r.proj]};
    return `<div class="kreq">${img(`${DT}land_${r.proj}.webp`, P.e)}<div><b>${E(L(P.l))}</b> <small class="muted">${W2("asked by","pedido por")} ${E(r.name)} · 👍 ${VOTES[r.id] || 0}</small>
      ${r.note ? `<p style="margin:2px 0;font-size:14px">“${E(r.note)}”</p>` : ""}
      ${r.status === "approved" ? `<small>🏗️ ${W2("Built","Construido")} ${r.n | 0}/${r.need}</small>${bar((r.n | 0) / r.need, "#2F7FD8")}<small>💵 ${W2("Funded","Fondos")} ${r.coins | 0}/${r.cost}</small>${bar((r.coins | 0) / r.cost)}` : ""}</div>
      <div class="kreqb">${r.status === "review" ? `<button class="btn ghost" onclick="carSecond('${r.id}')">👍</button>` : ""}
        ${r.status === "review" && may ? `<button class="btn primary" onclick="carReqSet('${r.id}','approved')">✅ ${W2("Approve","Aprobar")}</button><button class="btn ghost" onclick="carReqSet('${r.id}','declined')">✖</button>` : ""}
        ${r.status === "approved" && (r.coins | 0) < r.cost ? `<button class="btn" onclick="carDonate('${r.id}')">💵 ${W2("Chip in 5","Aportar 5")}</button>` : ""}</div></div>`; };
  el.innerHTML = `${back}<section class="panel raised kbld">${img(`${DT}board.webp`, "📌", "big")}<div><div class="eyebrow">${W2("Community Board","Tablero comunitario")}</div>
      <h2>${W2("What should the town build next?","¿Qué debe construir el pueblo?")}</h2><p class="muted" style="margin:0">${W2("Anyone can ask. The mayor approves. Builders build, everyone can chip in Smithbucks, and every finished landmark pays the whole town 1 Smithbuck a day (up to 5).",
        "Cualquiera puede pedir. El alcalde aprueba. Los constructores construyen, todos aportan, y cada obra terminada paga 1 Smithbuck al día a todo el pueblo (hasta 5).")}</p>
      <button class="btn primary" onclick="carPropose()">📌 ${W2("Request a project","Pedir un proyecto")}</button></div></section>
    ${ap.length ? `<section class="panel"><div class="eyebrow">🏗️ ${W2("Being built","En construcción")}</div>${ap.map(row).join("")}</section>` : ""}
    <section class="panel"><div class="eyebrow">🗳️ ${W2("Waiting for the mayor","Esperando al alcalde")}${may ? " · " + W2("you decide!","¡tú decides!") : ""}</div>${rv.map(row).join("") || `<p class="muted">${W2("No requests yet. Be the first!","Aún no hay solicitudes. ¡Sé el primero!")}</p>`}</section>
    ${dn.length ? `<section class="panel"><div class="eyebrow">🏙️ ${W2("Landmarks","Obras terminadas")}</div><div class="cmini">${dn.map(r => { const P = PROJECTS[r.proj] || {e:"🏗️", l:[r.proj, r.proj]}; return `<span>${P.e} ${E(L(P.l))}</span>`; }).join("")}</div></section>` : ""}`;
}
function paintMansion(el, back){
  const m = CLS().mayor, may = isMayor(), past = (CLS().mayors || []).slice().reverse(), e = V.elec && V.elec();
  el.innerHTML = `${back}<section class="panel raised kbld">${img(`${TA}houses/house_mansion.webp`, "🏛️", "big")}<div><div class="eyebrow">${W2("Mayor's Mansion","Mansión del alcalde")}</div>
      <h2>${m && m.sid ? W2(`Mayor ${E(m.name)}`, `Alcalde ${E(m.name)}`) : W2("No mayor yet","Aún no hay alcalde")}</h2>
      <p class="muted" style="margin:0">${m && m.sid ? W2(`In office since ${new Date(m.since).toLocaleDateString()}.`, `En el cargo desde ${new Date(m.since).toLocaleDateString()}.`) : W2("When Coach Smith opens an election, run from Town Hall.","Cuando Coach Smith abra una elección, postúlate en el Ayuntamiento.")}</p></div></section>
    ${may ? `<section class="panel kshift"><div class="eyebrow">🖋️ ${W2("Mayor's desk","Escritorio del alcalde")}</div><div class="cmake">
        <button class="btn primary" onclick="carAct('holiday')">🎉 ${W2("Declare a Town Holiday (1 a week)","Declarar feriado (1 por semana)")}</button>
        <button class="btn" onclick="carAct('challenge')">🏆 ${W2("Mayor's Challenge for today","Reto del alcalde de hoy")}</button>
        <button class="btn" onclick="carAct('proclaim')">📜 ${W2("Proclamation","Proclamación")}</button>
        <button class="btn" onclick="carGo('board')">📌 ${W2("Review town requests","Revisar solicitudes")} (${REQS.filter(r => r.status === "review").length})</button>
        <button class="btn" onclick="townTab('hall')">🖋️ ${W2("Propose a law","Proponer una ley")}</button></div></section>` : ""}
    <section class="panel"><div class="eyebrow">⭐ ${W2("What the mayor gets","Lo que recibe el alcalde")}</div><ul class="kperks">
      <li>💰 ${W2(`A salary: ${MAYOR_PAY} Smithbucks every day in office, plus a 20-Smithbuck signing bonus`, `Un salario: ${MAYOR_PAY} Smithbucks cada día, más 20 de bienvenida`)}</li>
      <li>🏛️ ${W2("The Mansion (yours to keep) and mayor-only furniture: desk, flag and portrait","La Mansión (para siempre) y muebles exclusivos: escritorio, bandera y retrato")}</li>
      <li>🏷️ ${W2("20% off everything in the Shop while in office","20% de descuento en la Tienda durante el cargo")}</li>
      <li>✂️ ${W2(`Ribbon cuttings: +${RIBBON} Smithbucks every time a landmark is finished`, `Cortes de listón: +${RIBBON} Smithbucks por cada obra terminada`)}</li>
      <li>🎉 ${W2("Powers: Town Holidays, the Mayor's Challenge, proclamations, approving town projects and proposing laws","Poderes: feriados, el reto del alcalde, proclamaciones, aprobar obras y proponer leyes")}</li>
      <li>🎖️ ${W2("A 🎖️ over your name on the plaza, and a place in the Hall of Mayors forever","Una 🎖️ sobre tu nombre en la plaza y un lugar en el Salón de Alcaldes")}</li></ul>
      ${e && e.phase === "filing" && !may ? `<button class="btn primary" onclick="townTab('hall')">🗳️ ${W2("Sign-ups are open: run for mayor!","¡Inscripciones abiertas: postúlate!")}</button>` : ""}</section>
    <section class="panel"><div class="eyebrow">🏛️ ${W2("Hall of Mayors","Salón de Alcaldes")}</div><div class="cmini">${past.map(x => `<span>🎖️ ${E(x.name)} <small>${new Date(x.since).toLocaleDateString()}</small></span>`).join("") || `<span>${W2("History starts with the first election.","La historia empieza con la primera elección.")}</span>`}</div></section>`;
}
EXT.tabs.push({key:"downtown", icon:"🗺️", label:() => W2("Downtown","Centro"), paint:el => { paintDowntown(el); }});
EXT.onLeave.push(() => { BLD = null; });

/* ---------------------------------------------------------------- Jobs tab: my career at the top */
EXT.banner.push(() => {
  if (!SESS() || T.tt !== "jobs") return "";
  const j = myJob(), open = Object.keys(CAREERS).filter(k => openSeats(k));
  return `<section class="panel kcar">${j ? `<b>${CAREERS[j].e} ${E(jobTitle(j, car()))}</b> <span class="muted">· ${duty().paid ? "✅ " + W2("shift done","turno hecho") : W2("shift waiting","turno pendiente")}</span>
      <button class="btn primary" onclick="carGo('${j}')">${W2("Go to work","Ir a trabajar")}</button>`
    : `<b>💼 ${W2("Town careers","Carreras del pueblo")}</b> <span class="muted">· ${open.length} ${W2("jobs hiring","trabajos disponibles")}</span><button class="btn primary" onclick="carGo(null)">${W2("See openings","Ver vacantes")}</button>`}</section>`;
});

/* ---------------------------------------------------------------- the login pop-up */
function popup(){
  if (!SESS() || T.CIV.proj) return; const c = civ(), d = day(); if (c.carPop === d) return;
  const j = myJob(), open = Object.keys(CAREERS).filter(k => openSeats(k)), mq = isMayor() ? REQS.filter(r => r.status === "review").length : 0;
  let html = "";
  if (j) { const q = openCases(j).length, du = duty();
    html = `<div class="eyebrow">🗓️ ${W2("Your shift today","Tu turno de hoy")}</div><h2>${CAREERS[j].e} ${E(jobTitle(j, car()))}</h2>
      <ul class="kperks"><li>${du.paid ? "✅" : "⬜"} ${E(L(CAREERS[j].duty.l))}</li>${q ? `<li>📋 ${W2(`${q} townspeople waiting for help`, `${q} vecinos esperan ayuda`)}</li>` : ""}
      ${mq ? `<li>🎖️ ${W2(`${mq} town requests on the mayor's desk`, `${mq} solicitudes en el escritorio del alcalde`)}</li>` : ""}</ul>
      <button class="btn primary wide" onclick="townCloseCard();go('town');setTimeout(()=>carGo('${j}'),350)">${W2("Go to work","Ir a trabajar")} →</button>`;
  } else if (open.length) {
    html = `<div class="eyebrow">📢 ${W2("Now hiring in Grenadier Town","Se busca personal en el Pueblo")}</div><h2>${W2("Get a job!","¡Consigue trabajo!")}</h2>
      <p class="muted">${W2("Town jobs pay every day on top of your daily jobs and business. Send a résumé and Coach Smith picks who gets hired.","Los trabajos del pueblo pagan cada día, además de tus trabajos diarios y tu negocio. Envía tu currículum y Coach Smith elige.")}</p>
      <div class="kopen">${open.slice(0, 8).map(k => `<button onclick="townCloseCard();go('town');setTimeout(()=>carGo('${k}'),350)">${CAREERS[k].e}<b>${E(L(CAREERS[k].title))}</b><small>💰 ${CAREERS[k].pay}/${W2("shift","turno")}</small></button>`).join("")}</div>
      ${mq ? `<p>🎖️ ${W2(`${mq} town requests are on your desk, Mayor.`, `${mq} solicitudes en tu escritorio, Alcalde.`)}</p>` : ""}`;
  } else if (mq) html = `<div class="eyebrow">🎖️ ${W2("Mayor's desk","Escritorio del alcalde")}</div><h2>${W2(`${mq} requests to review`, `${mq} solicitudes por revisar`)}</h2>
      <button class="btn primary wide" onclick="townCloseCard();go('town');setTimeout(()=>carGo('board'),350)">${W2("Review","Revisar")} →</button>`;
  if (!html) return;
  c.carPop = d; T.persist();
  sheet(html + `<button class="btn ghost wide" onclick="townCloseCard()">${W2("Later","Después")}</button>`);
}

/* ---------------------------------------------------------------- session wiring */
let BGS = [];
const stopBgs = () => { BGS.forEach(u => { try { u(); } catch(e){} }); BGS = []; };
EXT.onLeave.push(stopBgs);
EXT.onSession.push(() => {
  stopBgs();
  BGS.push(store().watch(`${C()}/cases`, {where:[["for","==",me()]]}, rows => { if (rows && SESS()) settleMine(rows); }));
  BGS.push(store().watch(`${C()}/apps`, {where:[["sid","==",me()]]}, rows => { if (!rows || !SESS()) return; MYAPPS = rows;
    rows.filter(a => a.status === "denied").forEach(a => T.once("deny:" + a.id + ":" + (a.decidedAt || 0), () => T.toast(W2(`Your application for ${CAREERS[a.job] ? L(CAREERS[a.job].title) : a.job} wasn't picked this time. Try again or apply for another job!`, `Tu solicitud no fue elegida esta vez. ¡Inténtalo de nuevo u otra!`)))); }));
  BGS.push(store().watch(`${C()}/news`, {where:[["sid","==",me()]]}, rows => { if (!rows || !SESS()) return; let ch = false;
    rows.filter(n => n.status === "published").forEach(n => { ch = T.once("pub:" + n.id, () => { T.coins(3); T.toast(W2(`📰 Your story “${n.headline}” was published! +3 Smithbucks.`, `📰 ¡Se publicó tu noticia! +3 Smithbucks.`)); }) || ch; });
    if (ch) T.persist(); }));
  BGS.push(store().watch(`${C()}/mayoracts`, {where:[["day","==",day()]]}, rows => { if (rows) { ACTS = rows.concat(ACTS.filter(a => a.day !== day())); applyActs(); } }));
  store().list(`${C()}/mayoracts`, {where:[["week","==",week()]]}).then(rows => { const ids = new Set(ACTS.map(a => a.id)); rows.forEach(r => { if (!ids.has(r.id)) ACTS.push(r); }); }).catch(() => {});
  let seenR = null, seenC = null;
  BGS.push(store().watch(`${C()}/requests`, {}, rows => { if (!rows) return; REQS = rows.sort((a, b) => b.at - a.at); projectRewards();
    const ids = new Set(rows.map(r => r.id));
    if (seenR && isMayor()) rows.filter(r => r.status === "review" && !seenR.has(r.id) && r.sid !== me()).slice(0, 2).forEach(r => T.toast(W2(`📌 New town request on your desk, Mayor: ${PROJECTS[r.proj] ? L(PROJECTS[r.proj].l) : r.proj} (from ${r.name}).`, `📌 Nueva solicitud en tu escritorio, Alcalde: ${PROJECTS[r.proj] ? L(PROJECTS[r.proj].l) : r.proj} (de ${r.name}).`)));
    seenR = ids; }));
  BGS.push(store().watch(`${C()}/cases`, {where:[["status","==","open"]]}, rows => { if (!rows) return; CASES = rows;
    const j = myJob(), ids = new Set(rows.map(c => c.id));
    if (seenC && j) rows.filter(c => c.job === j && !seenC.has(c.id) && c.for !== me() && KINDS[c.kind] && !["litter","park"].includes(c.kind)).slice(0, 2)
      .forEach(c => T.toast(W2(`${KINDS[c.kind].e} ${c.forName || "Someone"} needs the ${L(CAREERS[j].title)}: ${L(KINDS[c.kind].l)}. Go to work!`, `${KINDS[c.kind].e} ${c.forName || "Alguien"} necesita al ${L(CAREERS[j].title)}: ${L(KINDS[c.kind].l)}. ¡A trabajar!`)));
    seenC = ids; }));
  setTimeout(() => { syncCareer(); lifeEvents(); mayorDaily(); }, 600);
});
EXT.onClass.push((was, c) => {
  if (!SESS()) return; syncCareer(); mayorDaily();
  if (T.isTown() && T.tt === "downtown" && (!was || JSON.stringify([was.staff, was.mayor]) !== JSON.stringify([c.staff, c.mayor])) && window._carDraw) window._carDraw();
});
T.CAR = {CAREERS, KINDS, LEVELS, myJob, car, duty, levelOf, nextLevel, jobTitle, openCases, holders, payCase, promoCheck, L, me};
EXT.pubExtra.push(() => { const k = car(); return {career:k.job ? {job:k.job, lvl:levelOf(k)[1], shifts:k.shifts | 0, cases:k.cases | 0, last:k.last || ""} : null, sick:!!(civ().sick)}; });

/* ================================================================ teacher: careers, applications, stories, requests */
const tc = () => T.adminCid;
EXT.adminPanels.push({
  html: c => `<section class="panel tadm"><div class="eyebrow">💼 ${W2("Town careers","Carreras del pueblo")}</div>
      <p class="muted" style="font-size:13px">${W2("Students apply with a résumé. Hire from the applications below; firing someone opens the seat again. ⚠️ marks someone who hasn't done a shift in 3+ days.",
        "Los estudiantes envían su currículum. Contrata abajo; al despedir a alguien, el puesto se abre. ⚠️ marca a quien no ha trabajado en 3+ días.")}</p>
      <div id="aStaff"></div><div class="eyebrow" style="margin-top:10px">📨 ${W2("Applications","Solicitudes")}</div><div id="aApps"></div></section>
    <section class="panel tadm"><div class="eyebrow">📰 ${W2("Gazette stories to approve","Noticias por aprobar")}</div><div id="aNews"></div></section>
    <section class="panel tadm"><div class="eyebrow">📌 ${W2("Town requests","Solicitudes del pueblo")}</div><div id="aReqs"></div></section>`,
  after: c => {
    const cid = c.id, s = c.staff || {}, names = c.staffNames || {};
    const paintStaff = pubs => { const box = document.getElementById("aStaff"); if (!box) return; const P = {}; (pubs || []).forEach(p => P[p.id] = p);
      box.innerHTML = Object.entries(CAREERS).map(([k, j]) => { const hs = (s[k] || []).filter(Boolean);
        return `<div class="tdeal"><span>${j.e} <b>${j.title[0]}</b> (${hs.length}/${j.seats}) ${hs.map(sid => { const pc = P[sid] && P[sid].career, last = pc && pc.last, stale = !last || (Date.now() - new Date(last + "T12:00").getTime()) > 3 * 864e5;
          return `<span class="kst">${E(names[sid] || P[sid] && P[sid].name || "?")}${pc ? ` <small>${pc.lvl} · ${pc.shifts} ${W2("shifts","turnos")}</small>` : ""}${stale ? " ⚠️" : ""} <button class="btn ghost" onclick="carFire('${k}','${sid}')">${W2("Fire","Despedir")}</button></span>`; }).join(" ")}</span></div>`; }).join(""); };
    store().list(`classes/${cid}/pub`).then(paintStaff).catch(() => paintStaff([]));
    T.viewSub(store().watch(`classes/${cid}/apps`, {where:[["status","==","pending"]]}, rows => { const box = document.getElementById("aApps"); if (!box || !rows) return;
      box.innerHTML = rows.sort((a, b) => a.at - b.at).map(a => { const j = CAREERS[a.job] || {e:"?", title:[a.job]}, st = a.stats || {}, full = (s[a.job] || []).length >= (j.seats || 1);
        return `<div class="kapp"><b>${j.e} ${E(a.name)} → ${j.title[0]}</b>
          <small>⭐ ${st.xp | 0} XP · 🎓 ${st.certs | 0} · 🔥 ${st.streak | 0} · 💳 ${st.credit || "?"}${st.biz ? " · 🏪" : ""}${(st.past || []).length ? " · 💼 " + st.past.map(p => CAREERS[p] ? CAREERS[p].title[0] : p).join(", ") : ""}
            ${st.match != null ? `<br>🎯 ${st.match}% ${W2("match","compatible")} · ✅ ${st.todoDays | 0} ${W2("days of daily jobs","días de trabajos")} · 🎓 ${st.mastered | 0} ${W2("standards","estándares")}${st.reviews ? ` · ⭐ ${st.stars} (${st.reviews})` : ""}${(st.letters || []).length ? ` · 📜 ${st.letters.length} ${W2("letters","cartas")} (${st.letters.map(x => window.LIVE && LIVE.LETTERS[x] ? LIVE.LETTERS[x].e : "").join("")})` : ""}` : ""}</small>
          <p><i>${W2("Why","Por qué")}:</i> ${E(a.why)}</p><p><i>${W2("Skills","Habilidades")}:</i> ${E(a.skills)}</p>${a.ref ? `<p><i>${W2("Reference","Referencia")}:</i> ${E(a.ref)}</p>` : ""}
          <div class="cyn"><button class="btn primary" onclick="carHire('${a.id}')">✅ ${W2("Hire","Contratar")}${full ? " " + W2("(replaces someone)","(reemplaza)") : ""}</button><button class="btn ghost" onclick="carDeny('${a.id}')">✖ ${W2("Not this time","Esta vez no")}</button></div></div>`; }).join("")
        || `<p class="muted" style="font-size:13px">${W2("No applications waiting.","No hay solicitudes pendientes.")}</p>`; }));
    T.viewSub(store().watch(`classes/${cid}/news`, {where:[["status","==","review"]]}, rows => { const box = document.getElementById("aNews"); if (!box || !rows) return;
      box.innerHTML = rows.map(n => `<div class="kapp"><b>${E(n.headline)}</b> <small>${W2("by","por")} ${E(n.name)}</small><p>${E(n.body)}</p>
        <div class="cyn"><button class="btn primary" onclick="carNews('${n.id}','published')">✅ ${W2("Publish","Publicar")}</button><button class="btn ghost" onclick="carNews('${n.id}',null)">🗑️ ${W2("Delete","Borrar")}</button></div></div>`).join("")
        || `<p class="muted" style="font-size:13px">${W2("No stories waiting.","No hay noticias pendientes.")}</p>`; }));
    T.viewSub(store().watch(`classes/${cid}/requests`, {}, rows => { const box = document.getElementById("aReqs"); if (!box || !rows) return;
      box.innerHTML = rows.filter(r => r.status !== "declined").sort((a, b) => b.at - a.at).slice(0, 15).map(r => { const P = PROJECTS[r.proj] || {e:"🏗️", l:[r.proj]};
        return `<div class="tdeal"><span>${P.e} <b>${P.l[0]}</b> · ${E(r.name)} · <b>${r.status}</b>${r.status === "approved" ? ` (🏗️ ${r.n | 0}/${r.need} · 💵 ${r.coins | 0}/${r.cost})` : ""}${r.note ? ` <small>“${E(r.note)}”</small>` : ""}</span>
          ${r.status === "review" ? `<button class="btn primary" onclick="carTReq('${r.id}','approved')">✅</button><button class="btn ghost" onclick="carTReq('${r.id}','declined')">✖</button>` : ""}
          ${r.status === "approved" ? `<button class="btn" onclick="carTReq('${r.id}','done')">🏁 ${W2("Finish now","Terminar ya")}</button>` : ""}</div>`; }).join("")
        || `<p class="muted" style="font-size:13px">${W2("No requests yet.","Aún no hay solicitudes.")}</p>`; }));
  }
});
const getCls = async () => (await T.net.myClasses()).find(x => x.id === tc());
window.carHire = async function(aid){
  const c = await getCls(); if (!c) return; const a = await store().get(`classes/${c.id}/apps/${aid}`); if (!a) return;
  const j = CAREERS[a.job]; const s = {...(c.staff || {})}; Object.keys(s).forEach(k => { s[k] = (s[k] || []).filter(x => x !== a.sid); });
  let list = s[a.job] || [];
  if (list.length >= j.seats) { const out = list[0]; if (!confirm(W2(`${j.title[0]} is full. Replace ${(c.staffNames || {})[out] || "the first hire"}?`, `El puesto está lleno. ¿Reemplazar a ${(c.staffNames || {})[out] || "la primera persona"}?`))) return; list = list.slice(1); }
  s[a.job] = [...list, a.sid];
  await store().update(`classes/${c.id}/apps/${aid}`, {status:"hired", decidedAt:Date.now()});
  T.adminSet({staff:s, staffNames:{...(c.staffNames || {}), [a.sid]:a.name}});
};
window.carDeny = async function(aid){ const c = await getCls(); if (c) await store().update(`classes/${c.id}/apps/${aid}`, {status:"denied", decidedAt:Date.now()}); T.paintAdmin(); };
window.carFire = async function(job, sid){
  const c = await getCls(); if (!c) return; const nm = (c.staffNames || {})[sid] || "";
  if (!confirm(W2(`Fire ${nm} as ${CAREERS[job].title[0]}? The job opens up for applications.`, `¿Despedir a ${nm}? El puesto se abre.`))) return;
  T.adminSet({staff:{...(c.staff || {}), [job]:(c.staff[job] || []).filter(x => x !== sid)}});
};
window.carNews = async function(id, status){ const c = await getCls(); if (!c) return;
  if (status) await store().update(`classes/${c.id}/news/${id}`, {status, pubAt:Date.now()}); else await store().del(`classes/${c.id}/news/${id}`); };
window.carTReq = async function(id, status){ const c = await getCls(); if (!c) return;
  const r = await store().get(`classes/${c.id}/requests/${id}`); if (!r) return;
  await store().update(`classes/${c.id}/requests/${id}`, {status, ...(status === "done" ? {doneAt:Date.now(), n:r.need, coins:Math.max(r.coins | 0, r.cost)} : {decidedAt:Date.now()})}); };

window.CAREERS = {CAREERS, KINDS, PROJECTS, myJob, car, duty, levelOf, openSeats};
})();
