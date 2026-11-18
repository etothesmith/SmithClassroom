/* Grenadier Town — catalog: furniture, pets, decor, house styles, quick-chat phrases, emotes, stickers.
   Art lives in v2/assets/town/ (see v2/GEMINI_TOWN_ASSETS.md); every entry has an emoji fallback. */
/* [slot, name, [x%, y%], width % of the room, anchor] — floor items stand on y (bottom), wall items are centred */
window.TOWN_SLOTS = [
  ["bed",   {en:"Bed",      es:"Cama"},      [20, 86], 24, "b"],
  ["sofa",  {en:"Sofa",     es:"Sofá"},      [50, 76], 19, "b"],
  ["table", {en:"Table",    es:"Mesa"},      [75, 84], 13, "b"],
  ["rug",   {en:"Rug",      es:"Alfombra"},  [52, 95], 24, "b"],
  ["lamp",  {en:"Lamp",     es:"Lámpara"},   [90, 80], 8,  "b"],
  ["plant", {en:"Plant",    es:"Planta"},    [6, 96],  9,  "b"],
  ["art",   {en:"Wall art", es:"Cuadro"},    [40, 30], 10, "c"],
  ["wall",  {en:"Wall",     es:"Pared"},     [62, 30], 9,  "c"],
  ["trophy",{en:"Shelf",    es:"Repisa"},    [82, 58], 9,  "b"],
  ["pet",   {en:"Pet",      es:"Mascota"},   [66, 97], 8,  "b"]
];
/* r: rarity 0 common · 1 rare · 2 epic · 3 legendary.  p: shop price in coins (0 = crates and trading only) */
window.TOWN_ITEMS = Object.fromEntries([
  ["bed_basic","bed",0,6,"🛏️","Twin bed","Cama individual"],
  ["bed_bunk","bed",0,9,"🛏️","Bunk bed","Litera"],
  ["bed_canopy","bed",1,0,"🛏️","Canopy bed","Cama con dosel"],
  ["bed_race_car","bed",2,0,"🏎️","Race-car bed","Cama de carro de carreras"],
  ["sofa_basic","sofa",0,6,"🛋️","Gray sofa","Sofá gris"],
  ["sofa_beanbag","sofa",0,4,"🫘","Beanbag","Puf"],
  ["sofa_velvet","sofa",1,0,"🛋️","Velvet couch","Sofá de terciopelo"],
  ["sofa_gamer","sofa",2,0,"🎮","Gamer chair","Silla gamer"],
  ["table_basic","table",0,4,"🪑","Study desk","Escritorio"],
  ["table_coffee","table",0,5,"☕","Coffee table","Mesa de centro"],
  ["table_arcade","table",2,0,"🕹️","Mini arcade cabinet","Mini máquina de arcade"],
  ["table_globe","table",1,0,"🌎","Antique globe","Globo antiguo"],
  ["rug_round","rug",0,3,"🟠","Round rug","Alfombra redonda"],
  ["rug_stripes","rug",0,3,"🟦","Striped rug","Alfombra de rayas"],
  ["rug_grenadier","rug",1,0,"🟥","Grenadiers rug","Alfombra Grenadiers"],
  ["lamp_floor","lamp",0,3,"💡","Floor lamp","Lámpara de pie"],
  ["lamp_lava","lamp",1,0,"🌋","Lava lamp","Lámpara de lava"],
  ["lamp_neon","lamp",2,0,"✨","Neon sign","Letrero de neón"],
  ["plant_fern","plant",0,2,"🪴","Fern","Helecho"],
  ["plant_cactus","plant",0,2,"🌵","Cactus","Cactus"],
  ["plant_bonsai","plant",1,0,"🌳","Bonsai","Bonsái"],
  ["plant_palm","plant",0,4,"🌴","Mini palm","Palmera mini"],
  ["art_poster","art",0,3,"🖼️","Study poster","Póster de estudio"],
  ["art_map","art",0,4,"🗺️","Map of Florida","Mapa de Florida"],
  ["art_supply_demand","art",1,0,"📈","Supply & demand print","Cuadro de oferta y demanda"],
  ["art_we_the_people","art",2,0,"📜","\"We the People\" print","Cuadro \"Nosotros el Pueblo\""],
  ["wall_clock","wall",0,3,"🕰️","Wall clock","Reloj de pared"],
  ["wall_pennant","wall",0,3,"🚩","Grenadiers pennant","Banderín Grenadiers"],
  ["wall_flag","wall",1,0,"🇺🇸","Flag","Bandera"],
  ["wall_dartboard","wall",1,0,"🎯","Dartboard","Diana"],
  ["trophy_books","trophy",0,3,"📚","Book stack","Pila de libros"],
  ["trophy_gavel","trophy",1,0,"⚖️","Golden gavel","Mazo dorado"],
  ["trophy_bell","trophy",2,0,"🔔","Liberty Bell replica","Réplica de la Campana de la Libertad"],
  ["trophy_bull","trophy",2,0,"🐂","Bull-market statue","Estatua del mercado alcista"],
  ["trophy_golden_coin","trophy",3,0,"💵","Giant gold Smithbuck","Smithbuck de oro gigante"],
  ["pet_goldfish","pet",0,5,"🐠","Goldfish","Pez dorado"],
  ["pet_cat","pet",1,0,"🐈","Cat","Gato"],
  ["pet_dog","pet",1,0,"🐕","Dog","Perro"],
  ["pet_parrot","pet",2,0,"🦜","Parrot","Loro"],
  ["pet_tortoise","pet",2,0,"🐢","Gopher tortoise","Tortuga gopher"],
  ["pet_eagle","pet",3,0,"🦅","Bald eagle","Águila calva"],
  ["pet_flamingo","pet",3,0,"🦩","Flamingo","Flamenco"]
].map(([id, slot, r, p, e, en, es]) => [id, {id, slot, r, p, e, name:{en, es}}]));
/* Civic update furniture (art: v2/GEMINI_CLOTHES_AND_ITEMS.md, emoji until then) */
[["bed_loft","bed",0,10,"🪜","Loft bed","Cama alta"],["bed_cloud","bed",2,0,"☁️","Cloud bed","Cama de nube"],
 ["sofa_loveseat","sofa",0,7,"💗","Pink loveseat","Sofá rosa"],["sofa_egg_chair","sofa",1,0,"🥚","Hanging egg chair","Silla colgante"],
 ["table_gaming","table",1,0,"🖥️","Gaming desk","Escritorio gamer"],["table_aquarium","table",2,0,"🐟","Aquarium table","Mesa acuario"],
 ["rug_checker","rug",0,3,"🏁","Checkerboard rug","Alfombra de cuadros"],["rug_galaxy","rug",1,0,"🌌","Galaxy rug","Alfombra galaxia"],
 ["lamp_fairy","lamp",0,3,"✨","Fairy-light lamp","Lámpara de lucecitas"],["lamp_moon","lamp",1,0,"🌙","Moon lamp","Lámpara de luna"],
 ["plant_monstera","plant",0,4,"🌿","Monstera","Monstera"],["plant_cherry","plant",2,0,"🌸","Cherry blossom tree","Cerezo en flor"],
 ["art_photos","art",0,4,"📸","Photo wall","Muro de fotos"],["wall_neon_bolt","wall",2,0,"⚡","Lightning-bolt neon","Neón de rayo"],
 ["trophy_state","trophy",3,0,"🏆","State championship trophy","Trofeo de campeonato estatal"],["pet_bunny","pet",1,0,"🐰","Bunny","Conejo"]
].forEach(([id, slot, r, p, e, en, es]) => { window.TOWN_ITEMS[id] = {id, slot, r, p, e, name:{en, es}}; });
/* products made by student businesses (town/civic.js): not in the shop or crates. cost = supplies */
[["prod_cupcakes","table","🧁","Cupcake tower","Torre de cupcakes",2],["prod_cookie_jar","table","🍪","Cookie jar","Tarro de galletas",2],
 ["prod_bouquet","plant","💐","Bouquet","Ramo de flores",2],["prod_sunflower","plant","🌻","Sunflower pot","Maceta de girasol",2],
 ["prod_painting","art","🖼️","Original painting","Pintura original",3],["prod_sculpture","trophy","🗿","Clay sculpture","Escultura de barro",3],
 ["prod_quilt_rug","rug","🧶","Quilted rug","Alfombra tejida",3],["prod_knit_lamp","lamp","🏮","Paper lantern","Farol de papel",3],
 ["prod_radio","table","📻","Fixed-up radio","Radio reparado",3],["prod_robot","trophy","🤖","Mini robot","Mini robot",4],
 ["prod_smoothie","table","🥤","Smoothie","Batido",1],["prod_fruit_bowl","table","🍓","Fruit bowl","Frutero",2]
].forEach(([id, slot, e, en, es, cost]) => { window.TOWN_ITEMS[id] = {id, slot, r:0, p:0, e, name:{en, es}, biz:true, cost}; });
/* mayor-only furniture: given when a student takes office, never in crates or the shop */
[["mayor_desk","table","🗄️","Mayor's desk","Escritorio del alcalde"],["mayor_flag","wall","🚩","Town flag","Bandera del pueblo"],["mayor_portrait","art","🖼️","Official mayor portrait","Retrato oficial del alcalde"]]
  .forEach(([id, slot, e, en, es]) => { window.TOWN_ITEMS[id] = {id, slot, r:3, p:0, e, name:{en, es}, office:true}; });
/* seasonal furniture: in the shop only during its month (season = month number) */
[[1,[["s01_confetti","art","🎉","New Year confetti cannon","Cañón de confeti de Año Nuevo",20],["s01_snowglobe","table","🔮","Snow globe","Bola de nieve",25],["s01_clock","wall","🕛","Countdown clock","Reloj de cuenta regresiva",30]]],
 [2,[["s02_heartlamp","lamp","💗","Heart lamp","Lámpara de corazón",20],["s02_roses","plant","🌹","Rose bouquet","Ramo de rosas",15],["s02_cards","art","💌","Valentine card wall","Muro de tarjetas",20]]],
 [3,[["s03_kite","wall","🪁","Spring kite","Papalote de primavera",15],["s03_tulips","plant","🌷","Tulip pot","Maceta de tulipanes",15],["s03_bracket","art","🏀","Bracket poster","Póster de eliminatorias",25]]],
 [4,[["s04_boots","rug","🥾","Rain boots mat","Tapete de botas",15],["s04_umbrella","lamp","☂️","Umbrella lamp","Lámpara de paraguas",20],["s04_eggs","table","🥚","Painted egg basket","Canasta de huevos pintados",20]]],
 [5,[["s05_gradcap","trophy","🎓","Graduation cap","Birrete de graduación",35],["s05_apcert","art","📜","AP exam survival certificate","Certificado de supervivencia del AP",30],["s05_hibiscus","plant","🌺","Hibiscus","Hibisco",15]]],
 [6,[["s06_beachball","rug","🏖️","Beach towel rug","Tapete de toalla",20],["s06_fan","lamp","🪭","Summer fan","Abanico de verano",15],["s06_icecream","table","🍦","Ice cream cart","Carrito de helados",30]]],
 [7,[["s07_fireworks","art","🎆","Fireworks poster","Póster de fuegos artificiales",25],["s07_flag","wall","🇺🇸","Independence Day flag","Bandera del 4 de julio",20],["s07_grill","table","🍔","Backyard grill","Asador",30]]],
 [8,[["s08_backpack","table","🎒","New backpack","Mochila nueva",20],["s08_pencils","art","✏️","Giant pencil art","Lápiz gigante",15],["s08_planner","wall","🗓️","School-year planner","Agenda escolar",15]]],
 [9,[["s09_football","trophy","🏈","Homecoming football","Balón de homecoming",30],["s09_pennant","wall","🚩","Grenadier pennant","Banderín Grenadier",20],["s09_sunflower","plant","🌻","Sunflowers","Girasoles",15]]],
 [10,[["s10_pumpkin","plant","🎃","Carved pumpkin","Calabaza tallada",20],["s10_candles","lamp","🕯️","Spooky candles","Velas de octubre",20],["s10_bats","wall","🦇","Paper bat garland","Guirnalda de murciélagos",15]]],
 [11,[["s11_pie","table","🥧","Pumpkin pie","Pay de calabaza",15],["s11_wreath","wall","🍂","Autumn wreath","Corona de otoño",20],["s11_quilt","bed","🛏️","Cozy harvest quilt","Edredón de otoño",35]]],
 [12,[["s12_lights","lamp","✨","Winter string lights","Luces de invierno",20],["s12_gingerbread","table","🏠","Gingerbread house","Casita de jengibre",30],["s12_snowman","plant","⛄","Snowman","Muñeco de nieve",25]]]]
  .forEach(([m, list]) => list.forEach(([id, slot, e, en, es, p]) => { window.TOWN_ITEMS[id] = {id, slot, r:m % 3 === 0 ? 2 : 1, p, e, name:{en, es}, season:m}; }));
/* quest and event rewards: earned, never sold */
[["q_whistle","trophy","📯","Coach's golden whistle","Silbato dorado del coach"],["q_key","art","🗝️","Landlord's golden key","Llave dorada de la casera"],
 ["q_mic","trophy","🎙️","Golden microphone","Micrófono dorado"],["q_ship","table","⛵","Ship in a bottle","Barco en botella"],
 ["e_hurricane","trophy","🌀","Storm Survivor trophy","Trofeo Sobreviviente de la tormenta"],["e_fair","trophy","🎡","Grenadier Fair ribbon","Listón de la Feria Grenadier"],
 ["e_election","trophy","🗳️","Election Night badge","Insignia de Noche Electoral"],["e_founders","art","📜","Founders' Week charter","Carta de la Semana Fundadora"],
 ["e_lakes","plant","🦢","Lake Eola swan","Cisne del lago Eola"],["e_market","trophy","📈","Market Madness bull","Toro de la Locura del Mercado"],
 ["t_besttown","trophy","🏆","Best Town of the Month cup","Copa Mejor Pueblo del Mes"]]
  .forEach(([id, slot, e, en, es]) => { window.TOWN_ITEMS[id] = {id, slot, r:3, p:0, e, name:{en, es}, office:true}; });
/* more pets: adopt common ones at the Pet Rescue (sp = adoption fee), the rest come from crates and trades */
[["pet_hamster","🐹",0,8,"Hamster","Hámster"],["pet_mouse","🐭",0,6,"Mouse","Ratón"],["pet_chick","🐥",0,6,"Chick","Pollito"],["pet_frog","🐸",0,8,"Tree frog","Rana arborícola"],
 ["pet_snail","🐌",0,5,"Snail","Caracol"],["pet_hedgehog","🦔",0,12,"Hedgehog","Erizo"],["pet_poodle","🐩",1,20,"Poodle","Caniche"],["pet_blackcat","🐈‍⬛",1,18,"Black cat","Gato negro"],
 ["pet_pig","🐷",1,16,"Mini pig","Minicerdo"],["pet_goat","🐐",1,16,"Pygmy goat","Cabra enana"],["pet_raccoon","🦝",1,0,"Raccoon","Mapache"],["pet_fox","🦊",1,0,"Fox","Zorro"],
 ["pet_owl","🦉",2,0,"Owl","Búho"],["pet_gator","🐊",2,0,"Baby gator","Caimancito"],["pet_sloth","🦥",2,0,"Sloth","Perezoso"],["pet_otter","🦦",2,0,"River otter","Nutria"],
 ["pet_peacock","🦚",2,0,"Peacock","Pavo real"],["pet_swan","🦢",2,0,"Lake Eola swan","Cisne del lago Eola"],["pet_dolphin","🐬",3,0,"Dolphin","Delfín"],
 ["pet_panther","🐆",3,0,"Florida panther","Pantera de Florida"],["pet_unicorn","🦄",3,0,"Unicorn","Unicornio"],["pet_dragon","🐉",3,0,"Dragon","Dragón"]]
  .forEach(([id, e, r, sp, en, es]) => { window.TOWN_ITEMS[id] = {id, slot:"pet", r, p:0, e, name:{en, es}, ...(sp ? {sp} : {})}; });
window.TOWN_RARITY = [{en:"Common",es:"Común",c:"#8A94A6"},{en:"Rare",es:"Raro",c:"#2F7FD8"},{en:"Epic",es:"Épico",c:"#8A5CD8"},{en:"Legendary",es:"Legendario",c:"#E3A21A"}];
window.TOWN_HOUSES = [
  ["cottage", 0,  "Cottage", "Casita"],
  ["brick",   8,  "Brick house", "Casa de ladrillo"],
  ["farmhouse", 10, "Farmhouse", "Casa de campo"],
  ["beach",   12, "Beach house", "Casa de playa"],
  ["modern",  15, "Modern house", "Casa moderna"],
  ["cabin",   15, "Log cabin", "Cabaña"],
  ["treehouse", 30, "Treehouse", "Casa del árbol"],
  ["penthouse", 50, "Penthouse", "Penthouse"],
  ["mansion", 40, "Mansion", "Mansión"]
].map(([id, p, en, es]) => ({id, p, name:{en, es}}));
window.TOWN_PHRASES = [
  ["Hello", "Saludos", [["hi","Hi!","¡Hola!"],["gm","Good morning!","¡Buenos días!"],["bye","See you later!","¡Nos vemos!"],["brb","Be right back.","Ya vuelvo."],["welcome","Welcome to town!","¡Bienvenido al pueblo!"]]],
  ["Study", "Estudio", [["help","Can someone help me with this unit?","¿Alguien me ayuda con esta unidad?"],["ican","I can help!","¡Yo te ayudo!"],["which","Which unit are you on?","¿En qué unidad estás?"],["together","Let's study together!","¡Estudiemos juntos!"],["cert","I just earned a certificate!","¡Acabo de ganar un certificado!"],["test","Good luck on the test!","¡Suerte en el examen!"]]],
  ["Trade", "Intercambio", [["trade","Want to trade?","¿Quieres intercambiar?"],["selling","I'm selling in the Market!","¡Estoy vendiendo en el Mercado!"],["price","What's your price?","¿Cuál es tu precio?"],["deal","Deal!","¡Trato hecho!"],["nothanks","No thanks.","No, gracias."],["lookingfor","Anyone have a pet to trade?","¿Alguien tiene una mascota para intercambiar?"]]],
  ["Fun", "Diversión", [["gg","GG!","¡Buena partida!"],["nice","Nice job!","¡Buen trabajo!"],["visit","Come visit my house!","¡Visita mi casa!"],["coolhouse","Cool house!","¡Qué casa tan genial!"],["kart","Race you in Campus Kart!","¡Te reto en Campus Kart!"],["wow","Wow!","¡Guau!"],["lol","LOL","JAJA"]]],
  ["Answers", "Respuestas", [["yes","Yes","Sí"],["no","No","No"],["idk","I'm not sure.","No estoy seguro."],["ty","Thank you!","¡Gracias!"],["yw","You're welcome!","¡De nada!"]]]
];
window.TOWN_PHRASE = Object.fromEntries(window.TOWN_PHRASES.flatMap(g => g[2].map(([id, en, es]) => [id, {en, es}])));
window.TOWN_EMOTES = [["wave","👋"],["laugh","😂"],["thumbs","👍"],["fire","🔥"],["party","🎉"],["think","🤔"],["heart","❤️"],["wow","😮"]];
window.TOWN_STICKERS = [["star","⭐"],["heart","💖"],["fire","🔥"],["trophy","🏆"],["cool","😎"],["hundred","💯"],["clap","👏"],["grenadier","🎖️"]];
