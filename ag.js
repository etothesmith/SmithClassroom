/* ============================================================================
   ag.js — the Smith's Classroom 2.0 assignment-game engine.

   Every assignment game follows the same arc, so students learn the shape
   once and spend their attention on the content:
     1. Title      cover art, your role, your avatar
     2. Briefing   Coach Smith explains the job
     3. Lessons    short teaching cards with the key terms
     4. Missions   on-the-job tasks; a wrong answer gets a hint and another
                   try, the second miss shows the answer and why
     5. Final review   one shot per question, 80% to pass, retry if not
     6. Certificate    lands in the Trophy Hall with coins and XP

   Task types: mcq (choose one), num (calculate), sort (put items in
   groups), order (put steps in order). Content lives in ag/<id>.js as
   window.AG_DATA. Progress is saved per game so a student can leave and
   come back.
   ========================================================================== */
(function(){
  const app = document.getElementById("app");
  const id = (new URLSearchParams(location.search).get("g") || "").replace(/[^a-z_]/g, "");
  const me = window.WorldLink ? WorldLink.me() : {};
  let lang = (me.lang === "es") ? "es" : "en";
  const KEY = "ag." + id;
  let D = null, st = null;

  /* ---------- text helpers ---------- */
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const T = o => o == null ? "" : (typeof o === "string" ? o : Array.isArray(o) ? (lang === "es" && o[1] ? o[1] : o[0]) : (o[lang] || o.en || ""));
  const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<span class="term">$1</span>').replace(/\n/g, "<br>");
  const W = (en, es) => lang === "es" ? es : en;
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const npc = p => `v2/assets/npc/npc_smith_${p}.webp`;
  const meImg = () => me.avatar && me.avatar.full ? me.avatar.full : npc("thumbs");

  /* ---------- save ---------- */
  function load(){ try { st = JSON.parse(localStorage.getItem(KEY) || "null"); } catch(e){ st = null; }
    if (!st || st.v !== 1) st = {v:1, stage:"title", i:0, first:{}, boss:{n:0, right:0, i:0}, tries:0}; }
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(st)); } catch(e){} }

  /* ---------- frame ---------- */
  function frame(inner, opts){
    opts = opts || {};
    const total = D.missions.length, done = Math.min(st.i, total);
    app.innerHTML = `
      <div class="bar">
        <span class="t">${esc(T(D.title))}</span>
        ${opts.prog ? `<span class="pill">${opts.prog}</span>` : ""}
        <span class="lang" role="group" aria-label="Language"><button aria-pressed="${lang === "en"}" data-lang="en">EN</button><button aria-pressed="${lang === "es"}" data-lang="es">ES</button></span>
      </div>
      ${opts.bar !== undefined ? `<div class="prog" aria-hidden="true"><i style="width:${opts.bar}%"></i></div>` : ""}
      ${inner}`;
    app.querySelectorAll("[data-lang]").forEach(b => b.onclick = () => { lang = b.dataset.lang; render(); });
    window.scrollTo(0, 0);
  }

  /* ---------- stages ---------- */
  function render(){
    ({title:vTitle, brief:vBrief, lesson:vLesson, mission:vMission, boss:vBoss, done:vDone}[st.stage] || vTitle)();
  }
  function vTitle(){
    frame(`
      <div class="hero"><img class="cv" src="v2/assets/games/covers/${D.cover}.jpg" alt="">
        <div class="ttl"><div class="eyebrow">${esc(T(D.course_label))}</div><h1>${esc(T(D.title))}</h1>
          <div class="muted">${esc(T(D.tagline))}</div></div></div>
      <div class="card">
        <div class="row" style="align-items:flex-end">
          <img src="${meImg()}" alt="" style="height:130px">
          <div style="flex:1;min-width:200px">
            <div class="eyebrow">${W("Your role","Tu papel")}</div>
            <h2 style="font-size:28px">${esc(T(D.role))}</h2>
            <p class="muted" style="margin:6px 0 0">${D.lessons.length} ${W("lessons","lecciones")} · ${D.missions.length} ${W("missions","misiones")} · ${W("final review","repaso final")} · ~${D.minutes || 25} min</p>
          </div>
        </div>
        <button class="btn go wide" style="margin-top:14px" id="go">${st.i || st.stage !== "title" ? W("Continue","Continuar") : W("Start the job","Empezar el trabajo")} →</button>
        ${st.i ? `<button class="btn wide" style="margin-top:8px" id="restart">${W("Start over","Empezar de nuevo")}</button>` : ""}
      </div>`);
    document.getElementById("go").onclick = () => { if (st.stage === "title") st.stage = "brief"; save(); render(); };
    const r = document.getElementById("restart"); if (r) r.onclick = () => { localStorage.removeItem(KEY); load(); st.stage = "brief"; save(); render(); };
  }
  function vBrief(){
    frame(`
      <div class="guide"><img src="${npc("clipboard")}" alt=""><div class="bub">${md(T(D.intro))}</div></div>
      <button class="btn go wide" id="go">${W("Show me what I need to know","Muéstrame lo que necesito saber")} →</button>`, {bar:2});
    document.getElementById("go").onclick = () => { st.stage = "lesson"; st.li = 0; save(); render(); };
  }
  function vLesson(){
    const li = st.li || 0, L = D.lessons[li];
    frame(`
      <div class="card lesson"><div class="eyebrow">${W("Lesson","Lección")} ${li + 1}/${D.lessons.length}</div>
        <h2>${esc(T(L.t))}</h2><p>${md(T(L.b))}</p>
        ${L.ex ? `<div class="fb ok" style="margin-top:8px"><b>${W("Example","Ejemplo")}:</b> ${md(T(L.ex))}</div>` : ""}</div>
      <div class="row">
        ${li ? `<button class="btn" id="back">← ${W("Back","Atrás")}</button>` : ""}
        <button class="btn go" style="flex:1" id="go" disabled>${li + 1 < D.lessons.length ? W("Next lesson","Siguiente lección") : W("Start the missions","Empezar las misiones")} →</button></div>`,
      {bar:2 + (li + 1) / D.lessons.length * 10});
    /* a short read before the button wakes up, so the card isn't skipped */
    const go = document.getElementById("go");
    setTimeout(() => { go.disabled = false; }, Math.min(6000, 1500 + T(L.b).length * 25));
    go.onclick = () => { if (li + 1 < D.lessons.length) st.li = li + 1; else { st.stage = "mission"; st.i = st.i || 0; } save(); render(); };
    const b = document.getElementById("back"); if (b) b.onclick = () => { st.li = li - 1; save(); render(); };
  }
  function vMission(){
    if (st.i >= D.missions.length) { st.stage = "boss"; st.boss = {n:(st.boss && st.boss.n) || 0, right:0, i:0}; save(); return render(); }
    const k = st.i, task = D.missions[k];
    frame(taskShell(task, `${W("Mission","Misión")} ${k + 1}/${D.missions.length}`),
      {bar:12 + k / D.missions.length * 68, prog:`${Object.values(st.first).filter(Boolean).length} ★`});
    let misses = 0;
    mountTask(task, {
      onCheck(ok, show){
        if (ok) {
          if (misses === 0) st.first[k] = true; save();
          show("ok", `<b>${W("Correct!","¡Correcto!")}</b> ${md(T(task.why))}`, W("Next","Siguiente"), () => { st.i = k + 1; save(); render(); });
        } else if (++misses < 2) {
          show("no", `<b>${W("Not yet.","Todavía no.")}</b> ${md(T(task.hint) || W("Look again at the key idea.","Revisa otra vez la idea clave."))}`, W("Try again","Intenta otra vez"), "retry");
        } else {
          st.first[k] = false; save();
          show("bad", `<b>${W("Here's the answer.","Esta es la respuesta.")}</b> ${md(answerText(task))}<br>${md(T(task.why))}`, W("Next","Siguiente"), () => { st.i = k + 1; save(); render(); }, true);
        }
      }
    });
  }
  function vBoss(){
    const B = D.boss, b = st.boss;
    if (b.i === 0 && !b.started) {
      frame(`
        <div class="guide"><img src="${npc("point")}" alt=""><div class="bub">${md(W(
          `**Final review.** ${B.length} questions, one try each. Get **${need()} of ${B.length}** right to earn your certificate. If you fall short, you can review and try again.`,
          `**Repaso final.** ${B.length} preguntas, un intento cada una. Acierta **${need()} de ${B.length}** para ganar tu certificado. Si no llegas, puedes repasar e intentarlo otra vez.`))}</div></div>
        <button class="btn go wide" id="go">${W("I'm ready","Estoy listo")} →</button>`, {bar:82});
      document.getElementById("go").onclick = () => { b.started = true; b.order = shuffle(B.map((_, i) => i)); save(); render(); };
      return;
    }
    if (b.i >= B.length) return bossResult();
    const task = B[b.order[b.i]];
    frame(taskShell(task, `${W("Final review","Repaso final")} ${b.i + 1}/${B.length}`), {bar:82 + b.i / B.length * 16, prog:`${b.right}/${B.length}`});
    mountTask(task, {
      boss:true,
      onCheck(ok, show){
        if (ok) b.right++; b.i++; save();
        show(ok ? "ok" : "bad", ok ? `<b>${W("Correct!","¡Correcto!")}</b> ${md(T(task.why))}`
          : `<b>${W("Not this time.","Esta vez no.")}</b> ${md(answerText(task))}<br>${md(T(task.why))}`, W("Next","Siguiente"), () => render(), !ok);
      }
    });
  }
  const need = () => Math.ceil(D.boss.length * 0.8);
  function bossResult(){
    const b = st.boss, pass = b.right >= need();
    if (pass) { st.stage = "done"; st.score = score(); save(); finish(); return render(); }
    frame(`
      <div class="card" style="text-align:center">
        <img src="${npc("think")}" alt="" style="height:150px">
        <h2 style="font-size:30px">${b.right}/${D.boss.length}</h2>
        <p>${W(`You need ${need()} to pass. Read the lessons again, then retake the review. Your missions are saved.`,
               `Necesitas ${need()} para aprobar. Lee las lecciones otra vez y repite el repaso. Tus misiones están guardadas.`)}</p>
        <div class="row" style="justify-content:center">
          <button class="btn" id="rev">${W("Review the lessons","Repasar las lecciones")}</button>
          <button class="btn go" id="again">${W("Retake the review","Repetir el repaso")} →</button></div></div>`, {bar:98});
    document.getElementById("again").onclick = () => { st.boss = {n:b.n + 1, right:0, i:0}; save(); render(); };
    document.getElementById("rev").onclick = () => { st.boss = {n:b.n + 1, right:0, i:0}; st.stage = "lesson"; st.li = 0; st.i = D.missions.length; save(); render(); };
  }
  function score(){
    const m = D.missions.length, f = Object.values(st.first).filter(Boolean).length;
    return Math.round((f + st.boss.right) / (m + D.boss.length) * 100);
  }
  function finish(){
    if (!window.WorldLink) return;
    WorldLink.award("ag-" + id, 4, 200, T(D.title));
    WorldLink.cert("ag-" + id, {unit: `${D.title.en} · ${D.unit.en}`, course: D.course, score: st.score});
  }
  function vDone(){
    const date = new Date().toLocaleDateString(lang === "es" ? "es-US" : "en-US", {year:"numeric", month:"long", day:"numeric"});
    frame(`
      <div class="cert">
        <div class="eyebrow">Smith's Classroom · ${W("Certificate of Completion","Certificado de finalización")}</div>
        <img class="me" src="${meImg()}" alt="">
        <h1>${esc(me.name || W("Student","Estudiante"))}</h1>
        <p style="font-size:18px;margin:6px 0">${W("completed","completó")} <b>${esc(T(D.title))}</b> · ${esc(T(D.unit))}</p>
        <p class="muted">${W("Score","Puntaje")}: <b>${st.score}%</b> · ${date}</p>
      </div>
      <div class="guide"><img src="${npc("cheer")}" alt=""><div class="bub">${md(W(
        "**Nice work.** This certificate is now in your **Trophy Hall** in Smith's Classroom, with **+4 Smithbucks** and **+200 XP**. Download it there to turn in on Canvas.",
        "**Buen trabajo.** Este certificado ya está en tu **salón de trofeos** de Smith's Classroom, con **+4 Smithbucks** y **+200 XP**. Descárgalo ahí para entregarlo en Canvas."))}</div></div>
      <button class="btn wide" id="again">${W("Play it again (practice)","Jugar otra vez (práctica)")}</button>`, {bar:100});
    document.getElementById("again").onclick = () => { localStorage.removeItem(KEY); load(); st.stage = "brief"; save(); render(); };
  }

  /* ---------- tasks ---------- */
  function taskShell(task, label){
    return `<div class="eyebrow">${label}</div>
      ${task.scene ? `<div class="scene"><img class="me" src="${meImg()}" alt=""><div class="say">${md(T(task.scene))}</div></div>` : ""}
      <div class="card" style="margin-top:0"><div class="q">${md(T(task.q))}</div><div id="task"></div><div id="fb"></div></div>`;
  }
  function answerText(task){
    if (task.type === "mcq") return W("Answer: ","Respuesta: ") + "**" + T(task.c[task.a]) + "**";
    if (task.type === "num") return W("Answer: ","Respuesta: ") + "**" + task.a + (task.unit || "") + "**";
    if (task.type === "sort") return task.items.map(([t, b]) => `${T(t)} → **${T(task.bins[b])}**`).join(" · ");
    if (task.type === "order") return task.steps.map((s, i) => `${i + 1}. ${T(s)}`).join("  ");
    return "";
  }
  function mountTask(task, h){
    const box = document.getElementById("task"), fb = document.getElementById("fb");
    let locked = false;
    const show = (kind, html, label, next, final) => {
      fb.innerHTML = `<div class="fb ${kind}">${html}</div><button class="btn ${next === "retry" ? "" : "go"} wide" style="margin-top:10px" id="nx">${label} ${next === "retry" ? "↺" : "→"}</button>`;
      const nx = document.getElementById("nx");
      nx.onclick = () => { if (next === "retry") { fb.innerHTML = ""; locked = false; reset(); } else next(); };
      nx.focus();
    };
    let reset = () => {};
    const check = ok => { if (locked) return; locked = true; h.onCheck(ok, show); };

    if (task.type === "mcq") {
      const order = shuffle(task.c.map((_, i) => i));
      box.innerHTML = `<div class="opts">${order.map(i => `<button class="opt" data-i="${i}">${md(T(task.c[i]))}</button>`).join("")}</div>`;
      const btns = [...box.querySelectorAll(".opt")];
      reset = () => btns.forEach(b => { b.classList.remove("wrong", "right"); b.disabled = false; });
      btns.forEach(b => b.onclick = () => {
        if (locked) return; const i = +b.dataset.i, ok = i === task.a;
        b.classList.add(ok ? "right" : "wrong");
        if (ok || h.boss) { btns.forEach(x => x.disabled = true); if (!ok) btns.find(x => +x.dataset.i === task.a).classList.add("right"); }
        check(ok);
      });
    }
    else if (task.type === "num") {
      box.innerHTML = `<div class="row"><input class="num" id="nv" inputmode="decimal" autocomplete="off" aria-label="${W("Your answer","Tu respuesta")}">${task.unit ? `<b>${esc(task.unit)}</b>` : ""}
        <button class="btn go" id="ck">${W("Check","Revisar")}</button></div>`;
      const inp = document.getElementById("nv");
      reset = () => { inp.value = ""; inp.focus(); };
      const go = () => { const v = parseFloat(String(inp.value).replace(/[$,%\s]/g, "")); if (isNaN(v)) return inp.focus();
        const tol = task.tol != null ? task.tol : Math.max(0.01, Math.abs(task.a) * 0.005); check(Math.abs(v - task.a) <= tol); };
      document.getElementById("ck").onclick = go; inp.onkeydown = e => { if (e.key === "Enter") go(); };
    }
    else if (task.type === "sort") {
      const place = {}; let pick = null;
      const order = shuffle(task.items.map((_, i) => i));
      const draw = marks => {
        box.innerHTML = `<p class="muted" style="margin:0 0 6px">${W("Tap an item, then tap the group it belongs in.","Toca un elemento y luego el grupo al que pertenece.")}</p>
          <div class="pool">${order.filter(i => place[i] == null).map(i => `<button class="chipx ${pick === i ? "picked" : ""}" data-i="${i}">${md(T(task.items[i][0]))}</button>`).join("") || `<span class="muted">${W("All placed. Check your groups.","Todo colocado. Revisa tus grupos.")}</span>`}</div>
          <div class="bins">${task.bins.map((bn, bi) => `<div class="bin" data-b="${bi}" role="button" tabindex="0"><h4>${esc(T(bn))}</h4>${order.filter(i => place[i] === bi).map(i =>
            `<button class="chipx ${marks ? (task.items[i][1] === bi ? "right" : "wrong") : ""}" data-i="${i}">${md(T(task.items[i][0]))}</button>`).join("")}</div>`).join("")}</div>
          <button class="btn go wide" style="margin-top:10px" id="ck" ${Object.keys(place).length < task.items.length || marks ? "disabled" : ""}>${W("Check","Revisar")}</button>`;
        box.querySelectorAll(".chipx").forEach(c => c.onclick = e => { e.stopPropagation(); if (locked) return; const i = +c.dataset.i;
          const inBin = c.closest(".bin");
          /* holding an item and tapping a group that already has items: drop it there */
          if (inBin && pick != null && pick !== i) { place[pick] = +inBin.dataset.b; pick = null; return draw(); }
          if (place[i] != null) { delete place[i]; pick = i; } else pick = pick === i ? null : i; draw(); });
        box.querySelectorAll(".bin").forEach(bn => bn.onclick = () => { if (locked || pick == null) return; place[pick] = +bn.dataset.b; pick = null; draw(); });
        const ck = document.getElementById("ck");
        ck.onclick = () => { const ok = task.items.every(([, b], i) => place[i] === b); draw(true); check(ok); };
      };
      reset = () => { /* keep the right ones, send the wrong ones back */
        task.items.forEach(([, b], i) => { if (place[i] !== b) delete place[i]; }); pick = null; draw(); };
      draw();
    }
    else if (task.type === "order") {
      let seq = shuffle(task.steps.map((_, i) => i));
      if (seq.every((v, i) => v === i)) seq.reverse();
      const draw = marks => {
        box.innerHTML = `<p class="muted" style="margin:0 0 6px">${W("Use the arrows to put these in order, first to last.","Usa las flechas para ordenarlos, del primero al último.")}</p>
          <div class="steps">${seq.map((s, k) => `<div class="step" style="${marks ? `border-color:${s === k ? "var(--green)" : "var(--red)"}` : ""}">
            <span class="n">${k + 1}</span><span class="tx">${md(T(task.steps[s]))}</span>
            <button data-k="${k}" data-d="-1" aria-label="up" ${k === 0 || marks ? "disabled" : ""}>↑</button><button data-k="${k}" data-d="1" aria-label="down" ${k === seq.length - 1 || marks ? "disabled" : ""}>↓</button></div>`).join("")}</div>
          <button class="btn go wide" style="margin-top:10px" id="ck" ${marks ? "disabled" : ""}>${W("Check","Revisar")}</button>`;
        box.querySelectorAll(".step button").forEach(b => b.onclick = () => { if (locked) return; const k = +b.dataset.k, d = +b.dataset.d;
          [seq[k], seq[k + d]] = [seq[k + d], seq[k]]; draw(); });
        document.getElementById("ck").onclick = () => { const ok = seq.every((v, i) => v === i); draw(true); check(ok); };
      };
      reset = () => draw();
      draw();
    }
  }

  /* ---------- boot ---------- */
  if (!id) { app.innerHTML = `<div class="card"><h2>Smith's Classroom</h2><p>No game chosen.</p></div>`; return; }
  const s = document.createElement("script"); s.src = `ag/${id}.js`;
  s.onload = () => { D = window.AG_DATA; if (!D) return; document.documentElement.style.setProperty("--acc", D.accent || "#C8102E");
    document.title = D.title.en + " · Smith's Classroom"; load(); render(); };
  s.onerror = () => { app.innerHTML = `<div class="card"><h2>Smith's Classroom</h2><p>That game isn't available.</p></div>`; };
  document.body.appendChild(s);
})();
