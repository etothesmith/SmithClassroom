/* ============================================================================
   world-link.js — lets a game talk to Smith's Classroom.

   Games live on the same site as Smith's Classroom, so they share its
   browser storage. A game never writes the Smith's Classroom save directly
   (the hub may be open at the same time and would overwrite it). Instead it
   drops events in a small outbox; the hub picks them up, checks them, and
   pays out coins, XP, badges and certificates exactly once per event id.

     WorldLink.me()                 -> {name, lang, avatar:{full, portrait, head}} or {}
     WorldLink.award(id, coins, xp, label)
     WorldLink.cert(id, {unit, course, score})
     WorldLink.badge(id)

   `id` must be stable for the achievement (e.g. "mm-heist-complete"), so
   replaying a level or refreshing the page never pays twice.
   ========================================================================== */
(function(){
  const OUT = "world.outbox", AV = "world.avatar", SAVE = "smiths.save";
  function read(k){ try { return JSON.parse(localStorage.getItem(k) || "null"); } catch(e){ return null; } }
  function push(ev){
    try {
      const box = read(OUT) || [];
      if (box.some(e => e.id === ev.id && e.type === ev.type)) return;
      box.push(Object.assign({at: Date.now(), from: location.pathname.split("/").pop()}, ev));
      localStorage.setItem(OUT, JSON.stringify(box.slice(-200)));
    } catch(e){}
    /* if we're inside the hub, nudge it right away (storage events don't fire
       in the window that wrote, and the hub is our parent) */
    try { if (window.parent && window.parent !== window) window.parent.postMessage({world:"outbox"}, location.origin); } catch(e){}
  }
  window.WorldLink = {
    me(){
      const s = read(SAVE) || {}, a = read(AV) || {};
      return {name: s.name || "", lang: s.lang || "en", avatar: a.full ? a : null};
    },
    award(id, coins, xp, label){ push({type:"award", id, coins: coins | 0, xp: xp | 0, label: label || ""}); },
    cert(id, c){ push({type:"cert", id, unit: c.unit, course: c.course, score: c.score}); },
    badge(id){ push({type:"badge", id}); }
  };
})();
