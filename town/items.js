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
  ["trophy_golden_coin","trophy",3,0,"🪙","Giant gold coin","Moneda de oro gigante"],
  ["pet_goldfish","pet",0,5,"🐠","Goldfish","Pez dorado"],
  ["pet_cat","pet",1,0,"🐈","Cat","Gato"],
  ["pet_dog","pet",1,0,"🐕","Dog","Perro"],
  ["pet_parrot","pet",2,0,"🦜","Parrot","Loro"],
  ["pet_tortoise","pet",2,0,"🐢","Gopher tortoise","Tortuga gopher"],
  ["pet_eagle","pet",3,0,"🦅","Bald eagle","Águila calva"],
  ["pet_flamingo","pet",3,0,"🦩","Flamingo","Flamenco"]
].map(([id, slot, r, p, e, en, es]) => [id, {id, slot, r, p, e, name:{en, es}}]));
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
