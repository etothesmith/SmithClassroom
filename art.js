/* ============================================================================
   art.js — sprite manifest and loader.

   The art used to live in this file as ~1.4 MB of base64 text, which the
   browser had to download and parse in full before the page could paint.
   On a school connection behind a filtering proxy that is the single most
   likely cause of a stalled or timed-out load: one blocking megabyte-plus
   request with no partial result.

   Now every sprite is a real .png in assets/, and this file is just the map
   from key -> path (about 4 KB). The browser fetches images in parallel,
   caches them individually, and can render the page before they arrive.

   Everything below assumes assets/ sits beside index.html.
   ========================================================================== */

const ART_BASE = "assets/";

/* Game sprites: hero poses, karts, foes, tiles, props. */
const DEFAULT_ART = {
 "smith_idle": "assets/smith_idle.png",
 "smith_point": "assets/smith_point.png",
 "smith_run": "assets/smith_run.png",
 "smith_walk": "assets/smith_walk.png",
 "smith_cheer": "assets/smith_cheer.png",
 "smith_hmm": "assets/smith_hmm.png",
 "hat_idle": "assets/hat_idle.png",
 "hat_run": "assets/hat_run.png",
 "hat_walk": "assets/hat_walk.png",
 "hat_cheer": "assets/hat_cheer.png",
 "tie_idle": "assets/tie_idle.png",
 "tie_run": "assets/tie_run.png",
 "tie_walk": "assets/tie_walk.png",
 "tie_cheer": "assets/tie_cheer.png",
 "foe_gourd": "assets/foe_gourd.png",
 "foe_monkey": "assets/foe_monkey.png",
 "foe_warlock": "assets/foe_warlock.png",
 "foe_enforcer": "assets/foe_enforcer.png",
 "foe_phantom": "assets/foe_phantom.png",
 "kart_cat": "assets/kart_cat.png",
 "kart_saucer": "assets/kart_saucer.png",
 "kart_steam": "assets/kart_steam.png",
 "kart_wizard": "assets/kart_wizard.png",
 "kart_plant": "assets/kart_plant.png",
 "kart_pirate": "assets/kart_pirate.png",
 "kart_player": "assets/kart_player.png",
 "tile_campus": "assets/tile_campus.png",
 "tile_volcanic": "assets/tile_volcanic.png",
 "tile_cosmic": "assets/tile_cosmic.png",
 "prop_hut": "assets/prop_hut.png",
 "prop_volcano": "assets/prop_volcano.png",
 "prop_deck": "assets/prop_deck.png"
};

/* Episode illustrations, one set per course. Loaded on demand as <img>. */
const SMITTY_ART = {
 "econ": {
  "hero": "assets/econ_hero.png",
  "cook": "assets/econ_cook.png",
  "serve": "assets/econ_serve.png",
  "boss_scowl": "assets/econ_boss_scowl.png",
  "boss_yell": "assets/econ_boss_yell.png",
  "boss_inspect": "assets/econ_boss_inspect.png",
  "boss_order": "assets/econ_boss_order.png",
  "think": "assets/econ_think.png",
  "solution": "assets/econ_solution.png",
  "boss_star": "assets/econ_boss_star.png",
  "boss_bad": "assets/econ_boss_bad.png",
  "obj_a": "assets/econ_obj_a.png",
  "obj_b": "assets/econ_obj_b.png",
  "obj_c": "assets/econ_obj_c.png"
 },
 "gov": {
  "hero": "assets/gov_hero.png",
  "cook": "assets/gov_cook.png",
  "serve": "assets/gov_serve.png",
  "boss_scowl": "assets/gov_boss_scowl.png",
  "boss_yell": "assets/gov_boss_yell.png",
  "boss_inspect": "assets/gov_boss_inspect.png",
  "boss_order": "assets/gov_boss_order.png",
  "think": "assets/gov_think.png",
  "solution": "assets/gov_solution.png",
  "boss_star": "assets/gov_boss_star.png",
  "boss_bad": "assets/gov_boss_bad.png",
  "obj_a": "assets/gov_obj_a.png",
  "obj_b": "assets/gov_obj_b.png",
  "obj_c": "assets/gov_obj_c.png"
 }
};

/* ---------------------------------------------------------------------------
   Shared image cache.

   spriteOf() used to build a fresh Image() on every call. With data: URIs
   that was merely wasteful; with real files it means a game can start before
   its sprites have decoded, and the kart map bakes an untextured ground plane
   that never corrects itself. One Image per URL fixes both: the second call
   gets an object that is already complete.
   ------------------------------------------------------------------------- */
const _IMG = Object.create(null);
function artImage(url){
  if (!url) return null;
  let im = _IMG[url];
  if (!im){
    im = new Image();
    im.decoding = "async";
    im.src = url;
    _IMG[url] = im;
  }
  return im;
}

/* Kick the game sprites off after first paint. They are ~600 KB across 32
   files, none of it needed to draw the home screen, and all of it wanted
   before anyone reaches the arcade. Idle time covers that gap without
   competing with the initial render. */
let _warmed = false;
function warmArt(){
  if (_warmed) return;
  _warmed = true;
  const keys = Object.keys(DEFAULT_ART);
  let i = 0;
  const step = () => {
    const until = Date.now() + 12;          /* short slices, never janks a frame */
    while (i < keys.length && Date.now() < until) artImage(DEFAULT_ART[keys[i++]]);
    if (i < keys.length) setTimeout(step, 60);
  };
  setTimeout(step, 400);
}
if (typeof window !== "undefined"){
  if (document.readyState === "complete") warmArt();
  else window.addEventListener("load", warmArt, {once:true});
}
