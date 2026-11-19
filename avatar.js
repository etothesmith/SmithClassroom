/* ============================================================================
   avatar.js — the student avatar for Smith's Classroom 2.0

   This is the Money Moves 3.x layered character (4 body shapes x 8 skin
   tones, 16 faces, 52 hairstyles and head coverings, 9 tops and 9 bottoms per
   shape, 24 accessories), moved out of money_moves.html so the whole site
   shares one character. The layer art lives in assets/av3/*.webp; the
   anchor table AV3 and the compositing rules are copied from Money Moves so a
   character built there looks identical here.

   An avatar ("equip") is the same object Money Moves saves:
     {v:3, shape, skin, face, hair, top, bottom, acc:[ids]}
   so a student who already built one in Money Moves gets it automatically.
   ========================================================================== */
const AV3={"b":{"slim-0":[71,149,57,120],"slim-1":[72,150,57,119.8],"slim-2":[71,149,57,119.7],"slim-3":[71,149,57,119.5],"slim-4":[72,150,57,119],"slim-5":[71,149,57,119.5],"slim-6":[72,150,57,119],"slim-7":[72,150,57,120.3],"athletic-0":[72,153,57,120],"athletic-1":[72,153,57,119.3],"athletic-2":[72,153,57,119.1],"athletic-3":[72,153,57,119.5],"athletic-4":[72,153,57,120.1],"athletic-5":[72,153,57,119.7],"athletic-6":[72,153,57,119.9],"athletic-7":[72,153,57,119.3],"curvy-0":[72,158,63,120],"curvy-1":[72,158,63,120.2],"curvy-2":[72,158,63,120.4],"curvy-3":[72,158,63,120.5],"curvy-4":[72,158,63,119.6],"curvy-5":[72,158,63,119.7],"curvy-6":[72,158,63,120.1],"curvy-7":[72,158,63,120.1],"plus-0":[73,162,65,120],"plus-1":[73,162,65,119.6],"plus-2":[73,162,65,119.7],"plus-3":[73,162,65,120.2],"plus-4":[74,163,65,119.9],"plus-5":[74,163,65,120.2],"plus-6":[73,162,65,120.6],"plus-7":[73,162,65,120.8]},"i":{"face-0":[-75,129,141,56],"face-1":[-73,131,141,57],"face-2":[-77,127,141,51],"face-3":[-40,164,141,72],"face-4":[-70,134,141,69],"face-5":[-67,137,141,49],"face-6":[-63,141,141,54],"face-7":[-78,126,141,69],"face-8":[-69,135,141,81],"face-9":[-70,134,141,55],"face-10":[-64,140,141,51],"face-11":[-67,137,141,54],"face-12":[-66,138,141,46],"face-13":[-73,131,141,54],"face-14":[-64,140,141,53],"face-15":[-64,140,141,51],"hair-0":[3,207,141,89],"hair-1":[9,213,141,73],"hair-2":[12,216,141,84],"hair-3":[3,207,141,76],"hair-4":[4,208,141,90],"hair-5":[9,213,141,86],"hair-6":[5,209,141,76],"hair-7":[5,209,141,87],"hair-8":[11,215,141,101],"hair-9":[3,207,141,79],"hair-10":[11,215,141,87],"hair-11":[4,208,141,79],"hair-12":[8,212,141,88],"hair-13":[4,208,141,80],"hair-14":[3,207,141,74],"hair-15":[12,216,141,79],"hair-16":[37.1,153,92,94.5],"hair-17":[29.1,145,92,89],"hair-18":[18.1,134,92,65.5],"hair-19":[4.1,120,92,71.5],"hair-20":[38.1,154,92,54.5],"hair-21":[1.1,117,92,55.5],"hair-22":[5.1,121,92,71.5],"hair-23":[49.1,165,92,59],"hair-24":[20.1,153,90,79.5],"hair-25":[31.1,164,90,94.5],"hair-26":[20.1,153,90,82.5],"hair-27":[19.1,152,90,71.5],"hair-28":[29.1,162,90,55.5],"hair-29":[21.1,154,90,63],"hair-30":[11.1,144,90,68],"hair-31":[63.1,196,90,84],"acch-0":[-79,125,141,67],"acch-1":[-89,115,141,91],"acch-2":[-79,125,141,74],"acch-3":[-82,122,141,88],"acch-4":[-131,73,141,79],"acch-5":[-132,72,141,85],"acch-6":[-127,77,141,86],"acch-7":[-179,25,141,53],"acch-8":[-180,24,141,50],"acch-9":[-180,24,141,44],"acch-10":[-181,23,141,37],"acch-11":[-156,48,141,76],"acch-12":[6,210,141,83],"acch-13":[3,207,141,107],"acch-14":[15,219,141,80],"acch-15":[-25,179,141,77]},"dx":{"0":{"slim":11,"athletic":0,"curvy":3,"plus":-12},"1":{"slim":11,"athletic":0,"curvy":3,"plus":-12},"2":{"slim":11,"athletic":0,"curvy":3,"plus":-12},"3":{"slim":15,"athletic":0,"curvy":9,"plus":-4},"4":{"slim":-8,"athletic":0,"curvy":0,"plus":15},"5":{"slim":8,"athletic":0,"curvy":-1,"plus":-17},"6":{"slim":0,"athletic":0,"curvy":0,"plus":0},"7":{"slim":15,"athletic":0,"curvy":7,"plus":-10}}};
const AV_BASE = "assets/av3/";

const AV_SHAPES = [["slim",{en:"Slim",es:"Delgado"}],["athletic",{en:"Athletic",es:"Atlético"}],
                   ["curvy",{en:"Curvy",es:"Curvilíneo"}],["plus",{en:"Plus-size",es:"Talla grande"}]];
const AV_SKIN_NAMES = [{en:"Very fair",es:"Muy claro"},{en:"Light",es:"Claro"},{en:"Light olive",es:"Oliva claro"},
  {en:"Golden tan",es:"Bronceado dorado"},{en:"Medium brown",es:"Moreno medio"},{en:"Warm brown",es:"Moreno cálido"},
  {en:"Deep brown",es:"Moreno oscuro"},{en:"Very deep brown",es:"Moreno muy oscuro"}];
const AV_SKIN_SWATCH = ["#f6dccd","#efc29c","#cdbb83","#e3a65a","#b07a55","#a5603c","#6b402b","#4a2a1e"];
const AV_FACE_NAMES = [["Calm smile","Sonrisa tranquila"],["Confident grin","Sonrisa segura"],["Mustache","Bigote"],
  ["Boxed beard","Barba recortada"],["Full beard","Barba completa"],["Goatee","Perilla"],["Freckles + laugh","Pecas y risa"],
  ["Focused, stubble","Concentrado, barba corta"],["Soft smile, lashes","Sonrisa suave, pestañas"],["Winged liner","Delineado"],
  ["Freckles + big smile","Pecas y gran sonrisa"],["Natural, calm","Natural, tranquilo"],["Bright and cheerful","Alegre"],
  ["Determined","Decidido"],["Friendly","Amigable"],["Chill","Relajado"]].map(([en,es])=>({en,es}));
const AV_HAIR_NAMES = [["Low fade with 360 waves","Desvanecido bajo con ondas 360"],["High-top fade","High-top"],
  ["Fade with curly top","Desvanecido con rizos arriba"],["Taper with part design","Degradado con raya"],["Buzz cut","Rapado"],
  ["Short twists","Twists cortos"],["Cornrows straight back","Trenzas pegadas hacia atrás"],["Zig-zag cornrows","Trenzas en zigzag"],
  ["Short afro","Afro corto"],["Textured crop with fringe","Corte texturizado con flequillo"],["Spiky, blond tips","Puntas rubias"],
  ["Classic side part","Raya al lado"],["Pixie cut","Corte pixie"],["Durag","Durag"],["Kufi","Kufi"],["Patka","Patka"],
  ["Medium afro","Afro mediano"],["Two afro puffs","Dos moños afro"],["Bantu knots","Nudos bantú"],
  ["Box braids with beads","Trenzas con cuentas"],["Knotless braids ponytail","Coleta de trenzas"],["Fulani braids","Trenzas fulani"],
  ["Shoulder-length locs","Locs a los hombros"],["Locs in a high bun","Locs en moño alto"],["Silk press","Alisado"],
  ["Curly 3C","Rizado 3C"],["Long waves","Ondas largas"],["Long straight","Largo y liso"],["Man bun","Moño"],
  ["Curly mullet","Mullet rizado"],["Hijab","Hiyab"],["African-print headwrap","Turbante de estampado africano"]].map(([en,es])=>({en,es}));
/* 20 curly styles (Gemini Chat E, cut with tools/extract_hair.py): hair-32 … hair-51 */
AV_HAIR_NAMES.push(...[["Curly undercut", "Rizos con laterales rapados"], ["Curly high-top", "High-top rizado"], ["Big 4C afro", "Afro 4C grande"], ["Tapered afro", "Afro con degradado"], ["Curly frohawk", "Frohawk rizado"], ["3B ringlets, middle part", "Rizos 3B con raya al medio"], ["Long 3A spirals", "Espirales 3A largas"], ["Curly bob", "Bob rizado"], ["Curls with curtain bangs", "Rizos con flequillo cortina"], ["Half-up curly top knot", "Medio moño rizado"], ["Curly pineapple ponytail", "Coleta alta rizada"], ["Curly pigtail puffs", "Coletas afro"], ["Side-swept curls, shaved side", "Rizos de lado con lateral rapado"], ["Twist-out", "Twist-out"], ["Teeny afro (TWA)", "Afro muy corto"], ["Low curly ponytail", "Coleta baja rizada"], ["Big curly bun", "Moño rizado grande"], ["Curly shag", "Shag rizado"], ["Honey-blonde side-part curls", "Rizos rubio miel con raya al lado"], ["Long curls, caramel highlights", "Rizos largos con mechas caramelo"]].map(([en,es])=>({en,es})));
Object.assign(AV3.i, {"hair-32": [63.9, 261.2, 137.9, 100.4], "hair-33": [110.9, 308.2, 137.9, 154.2], "hair-34": [120.9, 318.2, 137.9, 220.0], "hair-35": [100.9, 298.2, 137.9, 149.8], "hair-36": [88.9, 286.2, 137.9, 106.6], "hair-37": [50.9, 248.2, 137.9, 184.4], "hair-38": [60.9, 258.2, 137.9, 173.2], "hair-39": [61.9, 259.2, 137.9, 173.0], "hair-40": [62.9, 260.2, 137.9, 181.8], "hair-41": [108.9, 306.2, 137.9, 156.6], "hair-42": [137.9, 335.2, 137.9, 156.4], "hair-43": [34.9, 232.2, 137.9, 204.2], "hair-44": [78.9, 276.2, 137.9, 150.0], "hair-45": [57.9, 255.2, 137.9, 146.8], "hair-46": [54.9, 252.2, 137.9, 144.6], "hair-47": [40.9, 238.2, 137.9, 155.4], "hair-48": [139.9, 337.2, 137.9, 152.2], "hair-49": [90.9, 288.2, 137.9, 169.0], "hair-50": [67.9, 265.2, 137.9, 175.8], "hair-51": [64.9, 262.2, 137.9, 178.6]});

/* col = which art layer; null means the plain base layer drawn on the body */
const AV_TOPS = [
  ["top_00_tank",{en:"Gray tank",es:"Camiseta gris sin mangas"},0,null],
  ["top_01_graphic_tee",{en:"White graphic tee",es:"Camiseta blanca con diseño"},0,0],
  ["top_07_crewneck",{en:"Gray crewneck",es:"Sudadera gris"},120,5],
  ["top_02_varsity_hoodie",{en:"Emerald hoodie",es:"Sudadera esmeralda"},250,1],
  ["top_03_oxford_shirt",{en:"Light-blue oxford",es:"Camisa celeste"},400,2],
  ["top_08_varsity_jacket",{en:"Red varsity jacket",es:"Chaqueta universitaria roja"},600,6],
  ["top_05_puffer_jacket",{en:"Black & gold puffer",es:"Chaqueta acolchada negra y dorada"},850,4],
  ["top_04_wallstreet_blazer",{en:"Navy blazer",es:"Blazer azul marino"},950,3],
  ["top_09_sundress",{en:"Yellow sundress",es:"Vestido amarillo"},300,8],
  ["top_10_denim_jacket",{en:"Denim jacket",es:"Chaqueta de mezclilla"},350,9],
  ["top_06_grad_robe",{en:"Graduation robe",es:"Toga de graduación"},1200,7],
  ["top_11_pink_crop_hoodie",{en:"Pink crop hoodie",es:"Sudadera corta rosa"},280,10],
  ["top_12_lavender_cardigan",{en:"Lavender cardigan",es:"Cárdigan lavanda"},260,11],
  ["top_13_ruffle_blouse",{en:"Ruffle blouse",es:"Blusa con volantes"},320,12],
  ["top_14_tied_flannel",{en:"Tied plaid flannel",es:"Franela a cuadros anudada"},300,13],
  ["top_15_striped_tee",{en:"Striped boat-neck tee",es:"Camiseta a rayas"},220,14],
  ["top_16_flower_blouse",{en:"Pink flower blouse",es:"Blusa rosa de flores"},260,15],
  ["top_17_red_crewneck",{en:"Grenadier red sweatshirt",es:"Sudadera roja Grenadier"},240,16],
  ["top_18_satin_bomber",{en:"Purple satin bomber",es:"Chaqueta bomber morada"},420,17],
  ["top_19_cheer",{en:"Cheer uniform",es:"Uniforme de porrista"},380,18],
  ["top_20_wrap_dress",{en:"Teal wrap dress",es:"Vestido cruzado verde azulado"},450,19],
  ["top_21_homecoming",{en:"Homecoming dress",es:"Vestido de homecoming"},600,20],
  ["top_22_pinafore",{en:"Denim pinafore dress",es:"Vestido pichi de mezclilla"},380,21],
  ["top_23_sweater_vest",{en:"Sweater vest & collar",es:"Chaleco tejido y camisa"},340,22],
  ["top_24_fleece",{en:"Sage fleece jacket",es:"Chaqueta polar verde"},300,23],
  ["top_25_jersey",{en:"Grenadier jersey",es:"Jersey Grenadier"},350,24],
  ["top_26_open_flannel",{en:"Green flannel",es:"Franela verde"},300,25],
  ["top_27_track_jacket",{en:"Black track jacket",es:"Chaqueta deportiva negra"},320,26],
  ["top_28_polo",{en:"Navy polo",es:"Polo azul marino"},260,27],
  ["top_29_camo_hoodie",{en:"Camo hoodie",es:"Sudadera de camuflaje"},340,28],
  ["top_30_palm_shirt",{en:"Palm-leaf button-up",es:"Camisa de hojas de palma"},280,29],
  ["top_31_checker_shirt",{en:"Checkered overshirt",es:"Camisa a cuadros abierta"},300,30],
  ["top_32_puffer_vest",{en:"Gold puffer vest",es:"Chaleco acolchado dorado"},500,31]
].map(([id,name,price,col])=>({id,slot:"top",name,price,col}));
const AV_BOTTOMS = [
  ["bot_01_athletic_shorts",{en:"Gray shorts",es:"Shorts grises"},0,null],
  ["bot_02_jeans_canvas",{en:"Jeans & red sneakers",es:"Jeans y tenis rojos"},0,0],
  ["bot_11_sweatpants",{en:"Gray sweats",es:"Pantalón deportivo gris"},150,7],
  ["bot_03_cargo_canvas",{en:"Khaki joggers",es:"Joggers caqui"},180,1],
  ["bot_09_denim_shorts",{en:"Denim shorts & high-tops",es:"Shorts de mezclilla y botas"},220,5],
  ["bot_05_track_pants",{en:"Track pants & slides",es:"Pantalón de pista y sandalias"},250,2],
  ["bot_10_maxi_skirt",{en:"Maxi skirt",es:"Falda larga"},300,6],
  ["bot_08_plaid_skirt",{en:"Plaid skirt & loafers",es:"Falda a cuadros y mocasines"},400,4],
  ["bot_07_dress_trousers",{en:"Dress trousers",es:"Pantalón de vestir"},600,3],
  ["bot_12_flare_jeans",{en:"Flare jeans",es:"Jeans acampanados"},280,8],
  ["bot_13_tennis_skirt",{en:"Tennis skirt",es:"Falda de tenis"},260,9],
  ["bot_14_leggings",{en:"Black leggings",es:"Leggings negros"},220,10],
  ["bot_15_cargo_boots",{en:"Cargo pants & boots",es:"Pantalón cargo y botas"},380,11],
  ["bot_16_wide_trousers",{en:"Cream wide trousers",es:"Pantalón ancho crema"},340,12],
  ["bot_17_denim_midi",{en:"Denim midi skirt",es:"Falda midi de mezclilla"},320,13],
  ["bot_18_pink_joggers",{en:"Pink joggers",es:"Joggers rosados"},240,14],
  ["bot_19_mom_jeans",{en:"Mom jeans & high-tops",es:"Mom jeans y botines"},320,15],
  ["bot_20_baggy_jeans",{en:"Baggy jeans & kicks",es:"Jeans holgados y tenis"},400,16],
  ["bot_21_ball_shorts",{en:"Basketball shorts",es:"Shorts de básquet"},200,17],
  ["bot_22_chinos",{en:"Khaki chinos",es:"Chinos caqui"},300,18],
  ["bot_23_camo_shorts",{en:"Camo cargo shorts",es:"Shorts cargo de camuflaje"},260,19]
].map(([id,name,price,col])=>({id,slot:"bottom",name,price,col}));
const AV_ACCS = [
  ["acc_10_round_glasses",{en:"Round glasses",es:"Lentes redondos"},120,"eyes","h",0],
  ["acc_11_clear_glasses",{en:"Clear-frame glasses",es:"Lentes transparentes"},120,"eyes","h",1],
  ["acc_12_sunglasses",{en:"Sunglasses",es:"Lentes de sol"},150,"eyes","h",2],
  ["acc_13_aviators",{en:"Gold aviators",es:"Aviadores dorados"},300,"eyes","h",3],
  ["acc_14_small_hoops",{en:"Small hoops",es:"Aretes pequeños"},150,"ears","h",4],
  ["acc_15_big_hoops",{en:"Big hoops",es:"Aretes grandes"},250,"ears","h",5],
  ["acc_16_diamond_studs",{en:"Diamond studs",es:"Aretes de diamante"},700,"ears","h",6],
  ["acc_17_thin_chain",{en:"Thin gold chain",es:"Cadena fina"},300,"neck","h",7],
  ["acc_18_cuban_chain",{en:"Cuban-link chain",es:"Cadena cubana"},900,"neck","h",8],
  ["acc_19_pearls",{en:"Pearl necklace",es:"Collar de perlas"},600,"neck","h",9],
  ["acc_20_dollar_pendant",{en:"$ pendant",es:"Colgante $"},450,"neck","h",10],
  ["acc_01_headphones",{en:"Headphones",es:"Audífonos"},250,"phones","h",11],
  ["acc_21_beanie",{en:"Black beanie",es:"Gorro negro"},60,"hat","h",12],
  ["acc_22_bucket_hat",{en:"Bucket hat",es:"Sombrero de pescador"},80,"hat","h",13],
  ["acc_23_snapback",{en:"Backwards snapback",es:"Gorra al revés"},150,"hat","h",14],
  ["acc_24_headband",{en:"Headband",es:"Diadema"},50,"hat","h",15],
  ["acc_02_gold_watch",{en:"Gold watch",es:"Reloj dorado"},850,"wrist","b",0],
  ["acc_25_smartwatch",{en:"Smartwatch",es:"Reloj inteligente"},400,"wrist","b",1],
  ["acc_26_bracelets",{en:"Beaded bracelets",es:"Pulseras"},90,"wrist2","b",2],
  ["acc_27_backpack",{en:"Backpack",es:"Mochila"},120,"bag","b",3],
  ["acc_28_crossbody",{en:"Crossbody bag",es:"Bolso cruzado"},140,"bag","b",4],
  ["acc_04_briefcase",{en:"Briefcase",es:"Maletín"},650,"hand","b",5],
  ["acc_29_phone",{en:"Phone in hand",es:"Teléfono en mano"},50,"hand","b",6],
  ["acc_30_basketball",{en:"Basketball",es:"Balón de básquet"},40,"hand","b",7]
].map(([id,name,price,group,kind,col])=>({id,slot:"acc",name,price,group,kind,col}));
const AV_ACC_GROUPS = [["eyes",{en:"Glasses",es:"Lentes"}],["ears",{en:"Earrings",es:"Aretes"}],
  ["neck",{en:"Chains",es:"Cadenas"}],["phones",{en:"Headphones",es:"Audífonos"}],["hat",{en:"Hats",es:"Gorros"}],
  ["wrist",{en:"Watches",es:"Relojes"}],["wrist2",{en:"Bracelets",es:"Pulseras"}],["bag",{en:"Bags",es:"Bolsos"}],
  ["hand",{en:"In your hand",es:"En la mano"}]];
const AV_CATALOG = Object.fromEntries([...AV_TOPS,...AV_BOTTOMS,...AV_ACCS].map(x=>[x.id,x]));

/* Items unlock by level, so the closet grows as students study. Free items
   and anything a student already bought in Money Moves are always open. */
function avUnlockLevel(item){ return !item || !item.price ? 1 : Math.min(8, 1 + Math.ceil(item.price / 200)); }

/* ---------- Money Moves link ---------- */
function avFromMoneyMoves(){
  try {
    const o = JSON.parse(localStorage.getItem("money-moves-progress-v1") || "null");
    const eq = o && o.inv && o.inv.equip;
    if (!eq || eq.v !== 3 || !AV3.b[eq.shape + "-" + eq.skin]) return null;
    return {v:3, shape:eq.shape, skin:eq.skin, face:eq.face ?? 14, hair:eq.hair ?? null,
            top:AV_CATALOG[eq.top] ? eq.top : "top_01_graphic_tee",
            bottom:AV_CATALOG[eq.bottom] ? eq.bottom : "bot_02_jeans_canvas",
            acc:(eq.acc || []).filter(a => AV_CATALOG[a])};
  } catch(e){ return null; }
}
function avOwnedInMoneyMoves(){
  try {
    const o = JSON.parse(localStorage.getItem("money-moves-progress-v1") || "null");
    const owned = (o && o.inv && o.inv.owned) || {};
    return new Set(Object.keys(owned).filter(k => owned[k]));
  } catch(e){ return new Set(); }
}
function avStarter(i){
  const S8 = [{shape:"athletic",skin:6,face:0,hair:0},{shape:"curvy",skin:4,face:8,hair:19},{shape:"slim",skin:1,face:14,hair:11},
    {shape:"plus",skin:5,face:12,hair:17},{shape:"slim",skin:2,face:9,hair:30},{shape:"athletic",skin:3,face:4,hair:6},
    {shape:"curvy",skin:0,face:10,hair:26},{shape:"plus",skin:7,face:3,hair:22}];
  const s = S8[((i % 8) + 8) % 8];
  return {v:3, ...s, top:"top_01_graphic_tee", bottom:"bot_02_jeans_canvas", acc:[]};
}

/* ---------- compositing (same rules as Money Moves) ---------- */
const _avImg = {};
function avImg(name){
  if (!name) return Promise.resolve(null);
  if (!_avImg[name]) _avImg[name] = new Promise(res => {
    const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null);
    im.src = AV_BASE + name + ".webp?v=3";   /* v3: hairline seams closed, bags separated */
  });
  return _avImg[name];
}
const _avCache = {};
const avKey = eq => [eq.shape,eq.skin,eq.face,eq.hair,eq.top,eq.bottom,...(eq.acc||[]).slice().sort()].join("|");
async function composeAvatar(eq){
  if (!eq) return null;
  const key = avKey(eq); if (_avCache[key]) return _avCache[key];
  const b = AV3.b[eq.shape + "-" + eq.skin]; if (!b) return null;
  const [bt, bc, bw, bx] = b;
  const top = AV_CATALOG[eq.top], bot = AV_CATALOG[eq.bottom];
  const accs = (eq.acc || []).map(id => AV_CATALOG[id]).filter(Boolean);
  const hats = accs.filter(a => a.group === "hat" && a.id !== "acc_24_headband");
  const [bodyIm, botIm, topIm, faceIm, hairIm, ...accIms] = await Promise.all([
    avImg(`av-body-${eq.shape}-${eq.skin}`),
    avImg(bot && bot.col !== null ? `av-bot-${eq.shape}-${bot.col}` : null),
    avImg(top && top.col !== null ? `av-top-${eq.shape}-${top.col}` : null),
    avImg(`av-face-${eq.face ?? 14}`),
    avImg(eq.hair !== null && eq.hair !== undefined ? `av-hair-${eq.hair}` : null),
    ...accs.map(a => avImg(a.kind === "h" ? `av-acch-${a.col}` : `av-accb-${a.col}`))]);
  if (!bodyIm) return null;
  const cv = document.createElement("canvas"); cv.width = 240; cv.height = 600;
  const c = cv.getContext("2d");
  const headRect = (im, id) => { const [t, ch, w, cx] = AV3.i[id]; const sx = bw / w, sy = (bc - bt) / (ch - t);
    return [bx - cx * sx, bc - ch * sy, im.naturalWidth * sx, im.naturalHeight * sy]; };
  c.drawImage(bodyIm, 0, 0, 240, 600);
  if (botIm) c.drawImage(botIm, 0, 0, 240, 600);
  if (topIm) c.drawImage(topIm, 0, 0, 240, 600);
  if (faceIm) c.drawImage(faceIm, ...headRect(faceIm, `face-${eq.face ?? 14}`));
  const accAt = a => accIms[accs.indexOf(a)];
  if (hairIm) {
    /* under a hat, hair above the brim is hidden */
    const hc = document.createElement("canvas"); hc.width = 240; hc.height = 600;
    const h = hc.getContext("2d");
    h.drawImage(hairIm, ...headRect(hairIm, `hair-${eq.hair}`));
    hats.forEach(a => { const im = accAt(a); if (!im) return;
      const [x, y, w, hh] = headRect(im, `acch-${a.col}`); h.clearRect(x + 3, 0, w - 6, y + hh * 0.72); });
    c.drawImage(hc, 0, 0);
  }
  const order = ["eyes","ears","neck","phones","hat","wrist","wrist2","bag","hand"];
  accs.slice().sort((p, q) => order.indexOf(p.group) - order.indexOf(q.group)).forEach(a => {
    const im = accAt(a); if (!im) return;
    if (a.kind === "h") c.drawImage(im, ...headRect(im, `acch-${a.col}`));
    else c.drawImage(im, (AV3.dx[a.col] || {})[eq.shape] || 0, 0, 240, 600);
  });
  try {
    const full = cv.toDataURL("image/png");
    const size = (bc - bt) * 1.75, hx = bx - size / 2, hy = bt - size * 0.25;
    const hc = document.createElement("canvas"); hc.width = 200; hc.height = 200;
    hc.getContext("2d").drawImage(cv, hx, hy, size, size, 0, 0, 200, 200);
    const res = {full, head: hc.toDataURL("image/png"), key, canvas: cv};
    _avCache[key] = res; return res;
  } catch(e){ return null; }
}
