/* Grenadier Town — data layer.
   One small "store" interface with two back ends:
     • CloudStore  — Firestore + Auth from vendor/firebase-bundle.js (no CDN)
     • LocalStore  — localStorage + BroadcastChannel (practice mode, one device)
   Everything above the store (accounts, plaza, market, trades) is shared, so
   practice mode exercises the same logic the live Town uses. */
(function(){
"use strict";
const now = () => Date.now();
const rid = (n = 20) => { const a = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"; let s = "";
  const r = crypto.getRandomValues(new Uint8Array(n)); for (const x of r) s += a[x % a.length]; return s; };
const CODE_ABC = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const genCode = () => Array.from(crypto.getRandomValues(new Uint8Array(6)), x => CODE_ABC[x % CODE_ABC.length]).join("");
async function sha(txt){ const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(txt));
  return Array.from(new Uint8Array(b), x => x.toString(16).padStart(2, "0")).join(""); }
const match = (d, where) => (where || []).every(([f, op, v]) => op === "==" ? d[f] === v : op === ">" ? d[f] > v : op === "in" ? v.includes(d[f]) : true);
function applyQuery(rows, o){
  o = o || {}; let r = rows.filter(d => match(d, o.where));
  if (o.orderBy) { const [f, dir] = o.orderBy; r.sort((a, b) => (a[f] > b[f] ? 1 : a[f] < b[f] ? -1 : 0) * (dir === "desc" ? -1 : 1)); }
  if (o.limit) r = r.slice(0, o.limit);
  return r;
}

/* ------------------------------------------------------------------ local */
function LocalStore(){
  const KEY = "town.db";
  const ch = ("BroadcastChannel" in window) ? new BroadcastChannel("smiths-town") : null;
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch(e){ return {}; } };
  let db = read();
  const watchers = new Set();
  const write = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch(e){} fire(); if (ch) ch.postMessage(1); };
  const fire = () => watchers.forEach(w => { try { w(); } catch(e){ console.warn(e); } });
  if (ch) ch.onmessage = () => { db = read(); fire(); };
  window.addEventListener("storage", e => { if (e.key === KEY) { db = read(); fire(); } });
  const col = p => Object.keys(db).filter(k => k.startsWith(p + "/") && k.slice(p.length + 1).indexOf("/") < 0)
                    .map(k => ({id:k.slice(p.length + 1), ...db[k]}));
  /* identity: one per tab in practice mode, so two tabs act like two devices */
  let uid = sessionStorage.getItem("town.uid") || localStorage.getItem("town.uid.last") || ("local-" + rid(10));
  sessionStorage.setItem("town.uid", uid); localStorage.setItem("town.uid.last", uid);
  let teacher = null; try { teacher = JSON.parse(localStorage.getItem("town.teacher") || "null"); } catch(e){}
  return {
    mode:"local",
    ready: Promise.resolve(),
    uid: () => uid,
    newDeviceId(){ uid = "local-" + rid(10); sessionStorage.setItem("town.uid", uid); localStorage.setItem("town.uid.last", uid); },
    teacherUser: () => teacher,
    async teacherSignIn(email){ teacher = {uid:"t-" + email.toLowerCase(), email}; localStorage.setItem("town.teacher", JSON.stringify(teacher)); uid = teacher.uid; return teacher; },
    async teacherSignUp(email){ return this.teacherSignIn(email); },
    async teacherSignOut(){ teacher = null; localStorage.removeItem("town.teacher"); uid = sessionStorage.getItem("town.uid"); },
    async studentAuth(){ if (teacher && uid === teacher.uid) uid = sessionStorage.getItem("town.uid"); return uid; },
    async get(p){ return db[p] ? {...db[p]} : null; },
    async set(p, d, merge){ db = read(); db[p] = merge ? {...(db[p] || {}), ...d} : {...d}; write(); },
    async update(p, d){ db = read(); if (!db[p]) throw new Error("not-found"); db[p] = {...db[p], ...d}; write(); },
    async add(c, d){ db = read(); const id = rid(); db[c + "/" + id] = {...d}; write(); return id; },
    async del(p){ db = read(); delete db[p]; write(); },
    async list(c, o){ return applyQuery(col(c), o); },
    watch(c, o, cb){ const run = () => cb(applyQuery(col(c), o)); watchers.add(run); run(); return () => watchers.delete(run); },
    watchDoc(p, cb){ const run = () => cb(db[p] ? {...db[p]} : null); watchers.add(run); run(); return () => watchers.delete(run); }
  };
}

/* ------------------------------------------------------------------ cloud */
function CloudStore(cfg){
  const F = window.FBSDK;
  const app = F.initializeApp(cfg);
  const auth = F.getAuth(app);
  /* long-polling fallback helps on school proxies that break streaming */
  const fs = F.initializeFirestore(app, {experimentalAutoDetectLongPolling:true});
  let user = null;
  const ready = new Promise(res => { const off = F.onAuthStateChanged(auth, u => { user = u; res(); }); });
  F.onAuthStateChanged(auth, u => { user = u; });
  const ref = p => F.doc(fs, p);
  const cref = c => F.collection(fs, c);
  const q = (c, o) => { o = o || {}; const parts = [];
    (o.where || []).forEach(([f, op, v]) => parts.push(F.where(f, op, v)));
    if (o.orderBy) parts.push(F.orderBy(o.orderBy[0], o.orderBy[1] || "asc"));
    if (o.limit) parts.push(F.limit(o.limit));
    return F.query(cref(c), ...parts); };
  const rows = snap => snap.docs.map(d => ({id:d.id, ...d.data()}));
  const isTeacher = () => !!(user && !user.isAnonymous);
  /* Realtime Database carries plaza movement: it bills by data, not by reads, so a
     whole class walking around stays inside the free plan. If the school network
     blocks it, the plaza falls back to Firestore at a slower update rate. */
  let rtdb = null, rtdbOk = null;
  if (cfg.databaseURL) { try { rtdb = F.getDatabase(app);
    const off = F.onValue(F.dbRef(rtdb, ".info/connected"), s => { if (s.val() === true) { rtdbOk = true; off(); } });
    setTimeout(() => { if (rtdbOk !== true) { rtdbOk = false; console.warn("town: realtime database unreachable, plaza uses Firestore"); } }, 9000);
  } catch(e){ rtdb = null; } }
  const rt = {
    usable: () => !!rtdb && rtdbOk !== false,
    set: (p, v) => F.dbSet(F.dbRef(rtdb, p), v),
    update: (p, v) => F.dbUpdate(F.dbRef(rtdb, p), v),
    remove: p => F.dbRemove(F.dbRef(rtdb, p)),
    onLeave: p => F.onDisconnect(F.dbRef(rtdb, p)).remove(),
    watch: (p, cb) => F.onValue(F.dbRef(rtdb, p), s => cb(s.val()), e => { console.warn("rtdb", p, e && e.code); cb(null, e); })
  };
  return {
    mode:"cloud", rt,
    ready,
    uid: () => user && user.uid,
    newDeviceId(){},
    teacherUser: () => isTeacher() ? {uid:user.uid, email:user.email} : null,
    async teacherSignIn(email, pw){ const c = await F.signInWithEmailAndPassword(auth, email, pw); user = c.user; return {uid:user.uid, email:user.email}; },
    async teacherSignUp(email, pw){ const c = await F.createUserWithEmailAndPassword(auth, email, pw); user = c.user; return {uid:user.uid, email:user.email}; },
    async teacherSignOut(){ await F.signOut(auth); user = null; },
    resetPassword: email => F.sendPasswordResetEmail(auth, email),
    async studentAuth(){ await ready; if (!user || !user.isAnonymous) { const c = await F.signInAnonymously(auth); user = c.user; } return user.uid; },
    async get(p){ const s = await F.getDoc(ref(p)); return s.exists() ? s.data() : null; },
    set: (p, d, merge) => F.setDoc(ref(p), d, merge ? {merge:true} : undefined),
    update: (p, d) => F.updateDoc(ref(p), d),
    async add(c, d){ const r = await F.addDoc(cref(c), d); return r.id; },
    del: p => F.deleteDoc(ref(p)),
    async list(c, o){ return applyQuery(rows(await F.getDocs(q(c, o))), o); },
    watch(c, o, cb){ return F.onSnapshot(q(c, o), s => cb(applyQuery(rows(s), o)), e => { console.warn("town watch", c, e.code); cb(null, e); }); },
    watchDoc(p, cb){ return F.onSnapshot(ref(p), s => cb(s.exists() ? s.data() : null), e => { console.warn("town watchDoc", p, e.code); }); }
  };
}

/* ------------------------------------------------------------------ API */
const SESS_KEY = "town.session";
function API(store){
  let sess = null; try { sess = JSON.parse(localStorage.getItem(SESS_KEY) || "null"); } catch(e){}
  if (store.mode === "local") { try { const s2 = JSON.parse(sessionStorage.getItem(SESS_KEY) || "null"); if (s2) sess = s2; } catch(e){} }
  const keep = s => { sess = s; const j = JSON.stringify(s);
    if (s) { localStorage.setItem(SESS_KEY, j); sessionStorage.setItem(SESS_KEY, j); } else { localStorage.removeItem(SESS_KEY); sessionStorage.removeItem(SESS_KEY); } };
  const C = () => sess && "classes/" + sess.cid;
  const slug = name => name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    store, mode:store.mode, ready:store.ready, now, sha, genCode, slug,
    session: () => sess,
    /* ---------- teacher ---------- */
    teacher: () => store.teacherUser(),
    teacherSignIn: (e, p) => store.teacherSignIn(e, p),
    teacherSignUp: (e, p) => store.teacherSignUp(e, p),
    teacherSignOut: () => store.teacherSignOut(),
    resetPassword: email => store.resetPassword ? store.resetPassword(email) : Promise.reject({code:"auth/practice-mode"}),
    async createClass(name){
      const t = store.teacherUser(); if (!t) throw new Error("teacher-only");
      let code; for (let i = 0; i < 6; i++) { code = genCode(); if (!(await store.get("codes/" + code))) break; }
      const cid = await store.add("classes", {ownerUid:t.uid, name, code, created:now(), frozen:false, chatOn:true, muted:{},
        econ:{shopMult:1, ceiling:0}, stimulus:null, gift:null});
      await store.set("codes/" + code, {cid, ownerUid:t.uid, name});
      if (store.rt && store.rt.usable()) await store.rt.set(`owner/${cid}`, t.uid).catch(e => console.warn("rtdb owner", e));
      return {cid, code};
    },
    /* rename: the class doc and the code lookup students join with */
    async renameClass(cid, name){
      const t = store.teacherUser(); if (!t) throw new Error("teacher-only");
      const c = await store.get("classes/" + cid); if (!c) throw new Error("not-found");
      await store.update("classes/" + cid, {name});
      if (c.code) { await store.del("codes/" + c.code).catch(() => {}); await store.set("codes/" + c.code, {cid, ownerUid:t.uid, name}); }
    },
    /* delete: the code stops working and the class disappears from the list;
       students in it are signed out of the town the next time it loads */
    async deleteClass(cid){
      const t = store.teacherUser(); if (!t) throw new Error("teacher-only");
      const c = await store.get("classes/" + cid); if (!c) return;
      if (c.code) await store.del("codes/" + c.code).catch(() => {});
      await store.del("classes/" + cid);
    },
    async myClasses(){ const t = store.teacherUser(); if (!t) return [];
      const r = await store.list("classes", {where:[["ownerUid","==",t.uid]]}); return r.sort((a, b) => (a.created || 0) - (b.created || 0)); },
    async setClass(cid, patch){ await store.update("classes/" + cid, patch);
      if ("frozen" in patch && store.rt && store.rt.usable()) {
        const t = store.teacherUser(); await store.rt.set(`owner/${cid}`, t.uid).catch(() => {});
        await store.rt.set(`ctl/${cid}/frozen`, !!patch.frozen).catch(e => console.warn("rtdb freeze", e)); } },
    roster: cid => store.list("classes/" + cid + "/students", {orderBy:["name","asc"]}),
    async resetPin(cid, sid){ await store.update(`classes/${cid}/students/${sid}`, {pinHash:null, uid:null}); },
    async removeStudent(cid, sid){
      await store.del(`classes/${cid}/students/${sid}`); await store.del(`classes/${cid}/pub/${sid}`);
      try { await store.del(`classes/${cid}/plaza/${sid}`); } catch(e){} },
    /* ---------- students ---------- */
    async lookup(code){ code = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (code.length !== 6) return null; await store.studentAuth(); const c = await store.get("codes/" + code); return c ? {...c, code} : null; },
    /* Join or come back. A name is claimed by a PIN: the device that set it is
       remembered, and any other device has to prove the PIN to take over. */
    async join(code, first, initial, pin){
      const info = await this.lookup(code); if (!info) return {err:"code"};
      const uid = await store.studentAuth();
      const name = (first.trim() + " " + initial.trim().charAt(0).toUpperCase() + ".").trim();
      const sid = slug(name); if (!sid) return {err:"name"};
      const cid = info.cid, P = `classes/${cid}/students/${sid}`;
      await store.set(`classes/${cid}/members/${uid}`, {sid, at:now()});
      const hash = await sha(`${cid}|${sid}|${pin}`);
      let rec = null; try { rec = await store.get(P); } catch(e){ rec = "locked"; }
      if (rec === null) {
        await store.set(P, {uid, name, pinHash:hash, created:now(), save:null, saveAt:0});
      } else {
        /* existing student: prove the PIN (or set one if the teacher reset it) */
        if (rec !== "locked" && rec.pinHash && rec.pinHash !== hash) return {err:"pin"};
        try { await store.update(P, {uid, pinProof:hash, left:null, ...(rec !== "locked" && !rec.pinHash ? {pinHash:hash} : {})}); }
        catch(e){ return {err:"pin"}; }
        rec = await store.get(P);
        if (!rec || rec.uid !== uid || (rec.pinHash && rec.pinHash !== hash)) return {err:"pin"};
      }
      await store.set(`classes/${cid}/members/${uid}`, {sid, at:now()});
      keep({cid, sid, name, code:info.code, className:info.name});
      return {ok:true, cid, sid, name};
    },
    leave(){ keep(null); },
    /* joined the wrong class: mark the record as left, take the house off the street, sign out.
       Progress lives in the student's own save, so it comes along to the right class. */
    async leaveClass(){ if (!sess) return; const s = sess;
      try { await store.update(`classes/${s.cid}/students/${s.sid}`, {left:now()}); } catch(e){}
      try { await store.del(`classes/${s.cid}/pub/${s.sid}`); } catch(e){}
      keep(null); },
    /* ---------- knocking ---------- */
    knock: (to, toName) => store.set(`${C()}/knocks/${to}_${sess.sid}`, {to, toName:toName || "", from:sess.sid, fromName:sess.name, uid:store.uid(), status:"knock", day:new Date().toISOString().slice(0, 10), at:now()}),
    answerKnock: (id, status) => store.update(`${C()}/knocks/${id}`, {status, respondedAt:now()}),
    watchKnocksTo: cb => store.watch(`${C()}/knocks`, {where:[["to","==",sess.sid]]}, cb),
    watchKnocksFrom: cb => store.watch(`${C()}/knocks`, {where:[["from","==",sess.sid]]}, cb),
    async resume(){ if (!sess) return null; await store.studentAuth();
      try { const r = await store.get(`${C()}/students/${sess.sid}`); if (!r || r.uid !== store.uid()) { keep(null); return null; } }
      catch(e){ keep(null); return null; }
      await store.set(`${C()}/members/${store.uid()}`, {sid:sess.sid, at:now()}, true);
      return sess; },
    /* ---------- cloud save ---------- */
    async pushSave(save){ if (!sess) return; await store.update(`${C()}/students/${sess.sid}`, {save, saveAt:now()}); },
    async pullSave(){ if (!sess) return null; const r = await store.get(`${C()}/students/${sess.sid}`); return r ? {save:r.save, at:r.saveAt} : null; },
    /* ---------- class / public profiles ---------- */
    watchClass: cb => store.watchDoc(C(), cb),
    async publish(pub){ if (!sess) return; await store.set(`${C()}/pub/${sess.sid}`, {...pub, uid:store.uid(), name:sess.name, at:now()}, true); },
    watchPub: cb => store.watch(`${C()}/pub`, {}, cb),
    /* ---------- plaza ---------- */
    plazaRealtime: () => !!(store.rt && store.rt.usable()),
    move(d){ const row = {...d, sid:sess.sid, uid:store.uid(), name:sess.name, at:now()};
      if (store.rt && store.rt.usable()) { const P = `plaza/${sess.cid}/${store.uid()}`;
        if (!this._onLeave) { this._onLeave = true; store.rt.onLeave(P); }
        Object.keys(row).forEach(k => row[k] === undefined && delete row[k]); return store.rt.set(P, row); }
      return store.set(`${C()}/plaza/${sess.sid}`, row, true); },
    watchPlaza(cb, cid){ cid = cid || sess.cid;
      if (store.rt && store.rt.usable()) return store.rt.watch(`plaza/${cid}`, v => cb(v ? Object.entries(v).map(([uid, p]) => ({...p, uid, id:p.sid})) : []));
      return store.watch(`classes/${cid}/plaza`, {where:[["at",">",now() - 10 * 60e3]]}, cb); },
    leavePlaza(){ if (!sess) return Promise.resolve();
      if (store.rt && store.rt.usable()) return store.rt.remove(`plaza/${sess.cid}/${store.uid()}`).catch(() => {});
      return store.set(`${C()}/plaza/${sess.sid}`, {at:0, uid:store.uid(), name:sess.name}, true).catch(() => {}); },
    say: p => store.add(`${C()}/chat`, {sid:sess.sid, uid:store.uid(), name:sess.name, p, at:now()}),
    watchChat: cb => store.watch(`${C()}/chat`, {orderBy:["at","desc"], limit:40}, cb),
    /* ---------- homes ---------- */
    sticker: (to, s) => store.add(`${C()}/stickers`, {to, from:sess.sid, fromName:sess.name, uid:store.uid(), s, at:now()}),
    watchStickers: (sid, cb) => store.watch(`${C()}/stickers`, {where:[["to","==",sid]]}, cb),
    /* ---------- market ---------- */
    listItem: (item, price) => store.add(`${C()}/market`, {seller:sess.sid, sellerUid:store.uid(), sellerName:sess.name, item, price,
      status:"open", at:now(), buyer:null, buyerUid:null, buyerName:null, soldAt:0, settled:false}),
    watchMarket: cb => store.watch(`${C()}/market`, {where:[["status","==","open"]]}, cb),
    watchMySales: cb => store.watch(`${C()}/market`, {where:[["seller","==",sess.sid]]}, cb),
    watchMyBuys: cb => store.watch(`${C()}/market`, {where:[["buyer","==",sess.sid]]}, cb),
    watchSales: (cid, cb) => store.watch(`classes/${cid}/market`, {where:[["status","==","sold"]]}, cb),
    async buy(id){ const P = `${C()}/market/${id}`; const m = await store.get(P);
      if (!m || m.status !== "open") return {err:"gone"};
      await store.update(P, {status:"sold", buyer:sess.sid, buyerUid:store.uid(), buyerName:sess.name, soldAt:now()});
      return {ok:true, m}; },
    cancelListing: id => store.update(`${C()}/market/${id}`, {status:"cancelled"}),
    settle: (kind, id, patch) => store.update(`${C()}/${kind}/${id}`, patch || {settled:true}),
    /* ---------- trades ---------- */
    offer: (to, toUid, toName, give, cg, get, cr) => store.add(`${C()}/trades`, {from:sess.sid, fromUid:store.uid(), fromName:sess.name,
      to, toUid, toName, give, cg, get, cr, status:"offered", at:now(), settled:false}),
    watchTradesFrom: cb => store.watch(`${C()}/trades`, {where:[["from","==",sess.sid]]}, cb),
    watchTradesTo: cb => store.watch(`${C()}/trades`, {where:[["to","==",sess.sid]]}, cb),
    respond: (id, status) => store.update(`${C()}/trades/${id}`, {status, respondedAt:now()}),
    /* ---------- teacher views ---------- */
    watchClassCol: (cid, col, opts, cb) => store.watch(`classes/${cid}/${col}`, opts, cb),
    undo: (cid, kind, id) => store.update(`classes/${cid}/${kind}/${id}`, {status:"undone", undoneAt:now()})
  };
}

/* ------------------------------------------------------------------ boot */
let resolveNet; window.TOWN_NET = new Promise(r => resolveNet = r);
function start(){
  const cfg = window.TOWN_FIREBASE;
  const inPreview = /claude\.ai|claudeusercontent|anthropic/.test(location.hostname) || location.protocol === "blob:";
  if (cfg && !inPreview) {
    const go = () => { try { resolveNet(API(CloudStore(cfg))); } catch(e){ console.warn("town: cloud failed, practice mode", e); resolveNet(API(LocalStore())); } };
    if (window.FBSDK) go();
    else {
      window.addEventListener("fbsdk-ready", go, {once:true});
      const s = document.createElement("script"); s.src = "vendor/firebase-bundle.js"; s.async = true;
      s.onerror = () => { console.warn("town: SDK failed to load, practice mode"); resolveNet(API(LocalStore())); };
      document.head.appendChild(s);
    }
  } else resolveNet(API(LocalStore()));
}
start();
})();
