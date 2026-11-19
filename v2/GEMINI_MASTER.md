# Smith's Classroom: the ONE Gemini script

This replaces every earlier Gemini file (`GEMINI_CLOTHES_AND_ITEMS.md`, `GEMINI_DOWNTOWN.md`, `GEMINI_WORLD.md`). Use only this one.

**Everything already works without these images.** The game shows emoji until the art arrives, so you can stop at any step and pick up later.

## ✅ Already done
- Town pack 1 (houses, rooms, plaza, first furniture and pets)
- Civic pack (Town Hall, Bank and Jobs art)
- Clothes sheet 1 (`clothes_tops_1`): pink crop hoodie, lavender cardigan, ruffle blouse, tied flannel, striped tee. These are already in the game.

## How it works
- There are **3 Gemini chats**, and each starts with its own style block. Keep each chat for its own images so the style stays consistent.
- Do the steps **in order**. ⭐ marks the ones students will notice most; if you run low on generations, do those first.
- Save each image with the **exact filename** shown, then send them to Claude. Batches are fine: "here are steps 1–4".
- If Gemini adds words, letters or people where it shouldn't, reply: *"Same image, but remove all text and letters."*

| Chat | Steps | Images |
|---|---|---|
| A: Clothes on mannequins | 1–7 | 7 |
| B: Things (furniture, pets, fish, seasonal, trophies) | 8–15 | 8 |
| C: Places and people | 16–20 | 5 |
| **Total** | | **20** |

---

# CHAT A: Clothes (7 images)
Attach the mannequin picture named in each step. Both pictures, `mannequins_5.png` and `mannequins_4.png`, come with this script. Attach the picture again for every prompt.

**Most important rule:** the mannequins must stay in the same place, at the same size and in the same pose. If Gemini moves them or adds faces or hair, reply: *"Same image, but keep the mannequins exactly where and how they were in my picture: same size, same pose, no faces, no hair. Only add the clothes."*

### Paste this first
```
You are dressing paper-doll mannequins for "Smith's Classroom 2.0", a bright, friendly school game for high-school students in Orlando, Florida. For every image in this chat:

- I attach a picture of identical bald, faceless cartoon mannequins in gray tank tops and gray shorts, standing in a row on a flat magenta #FF00FF background.
- Draw the clothing I describe ON the mannequins, in the same clean cartoon style as the mannequins: thick dark charcoal outlines (#2B2B2B), flat colors with one soft shade tone, a little cloth fold detail.
- Do NOT move, resize, re-pose or redraw the mannequins. Same positions, same size, same pose, arms down at their sides. No faces, no hair, no hats, no accessories, no bags.
- Keep the background flat pure magenta #FF00FF. Nothing in the clothes may use magenta or hot pink (use a soft pastel pink instead when pink is asked for).
- School-appropriate clothing: no low necklines, no very short hems.
- Absolutely no text, letters, numbers, logos or brand marks on any clothing.
- Each mannequin wears ONLY the item I name for it. When I describe a TOP, the gray shorts stay visible below it. When I describe BOTTOMS (pants, skirt or shorts, plus the shoes), the gray tank top stays visible above them.

Reply "ready" and wait.
```

### ⭐ Step 1 → `clothes_tops_2.png`  (attach `mannequins_5.png`)  · girls' tops
- [x] done
```
Dress the 5 mannequins, left to right, each in ONE top:
1. A blush-pink blouse with puffed short sleeves and a small white flower print.
2. An oversized Grenadier-red crewneck sweatshirt with ribbed cuffs and hem, plain (no letters).
3. A pastel-purple satin bomber jacket, zipped halfway, over a white tee, with striped ribbed cuffs.
4. A red-and-gold cheerleading shell top with a gold chevron stripe across the chest (plain, no letters), worn with a matching short red pleated cheer skirt over the shorts.
5. A teal floral wrap dress with short flutter sleeves and a tie at the waist, falling to just below the knee (this one covers the shorts).
```

### Step 2 → `clothes_tops_3.png`  (attach `mannequins_4.png`)  · dresses and layers
- [x] done
```
Dress the 4 mannequins, left to right, each in ONE outfit piece:
1. A red knee-length homecoming dress with short sleeves, a fitted waist with a thin gold belt, and a flared skirt (covers the shorts).
2. A denim pinafore dress (overall-style straps, knee length) worn over a white short-sleeve tee (covers the shorts).
3. A cream knit sweater vest over a light-blue collared shirt with long sleeves.
4. A sage-green zip-up fleece jacket, zipped up.
Keep the gray shorts visible except where a dress covers them.
```

### ⭐ Step 3 → `clothes_tops_4.png`  (attach `mannequins_4.png`)  · guys' tops
- [x] done
```
Dress the 4 mannequins, left to right, each in ONE top:
1. A sleeveless basketball jersey in Grenadier red with gold trim around the neck and arms (plain, NO numbers or letters), worn over a white tee.
2. A green-and-black flannel shirt, unbuttoned, over a plain black tee, sleeves rolled to the elbow.
3. A black zip-up track jacket with two white stripes down each sleeve, zipped up.
4. A navy polo shirt with a white-tipped collar.
Keep the gray shorts visible.
```

### Step 4 → `clothes_tops_5.png`  (attach `mannequins_4.png`)  · guys' and unisex tops
- [x] done
```
Dress the 4 mannequins, left to right, each in ONE top:
1. A green-and-tan camouflage pullover hoodie with the hood down.
2. A short-sleeve button-up shirt in light blue with a palm-leaf print, worn untucked.
3. A white tee under an open short-sleeve black-and-white checkered shirt.
4. A gold-and-black varsity-style puffer vest over a gray long-sleeve tee.
Keep the gray shorts visible.
```

### ⭐ Step 5 → `clothes_bottoms_1.png`  (attach `mannequins_4.png`)  · bottoms
- [x] done
```
Dress the 4 mannequins, left to right, each in ONE pair of bottoms WITH shoes:
1. Medium-blue flare jeans with white platform sneakers.
2. A white pleated tennis skirt (knee length) with white sneakers and short socks.
3. Black leggings with chunky white-and-gray sneakers.
4. Olive-green cargo pants with side pockets and black lace-up boots.
Keep the gray tank tops visible.
```

### Step 6 → `clothes_bottoms_2.png`  (attach `mannequins_4.png`)  · bottoms
- [x] done
```
Dress the 4 mannequins, left to right, each in ONE pair of bottoms WITH shoes:
1. Cream wide-leg trousers with tan ballet flats.
2. A medium-wash denim midi skirt (mid-calf) with brown ankle boots.
3. Soft pastel-pink jogger sweatpants with white slides and white socks.
4. Light-wash straight-leg mom jeans, cuffed at the ankle, with red canvas high-top sneakers.
Keep the gray tank tops visible.
```

### ⭐ Step 7 → `clothes_bottoms_3.png`  (attach `mannequins_4.png`)  · guys' bottoms
- [x] done
```
Dress the 4 mannequins, left to right, each in ONE pair of bottoms WITH shoes:
1. Baggy dark-wash jeans with red-and-white high-top basketball sneakers (no logos).
2. Black basketball shorts (knee length) with white crew socks and black slides.
3. Khaki chino pants with brown leather boat shoes.
4. Green camouflage cargo shorts with gray sneakers and white socks.
Keep the gray tank tops visible.
```

---

# CHAT B: Things (8 images)
No attachments. Start a new chat.

### Paste this first
```
You are drawing game art for "Smith's Classroom 2.0", a bright, friendly school game for high-school students in Orlando, Florida. For every image in this chat:
- A sheet of separate objects in a grid on a flat pure magenta #FF00FF background, each object centered in its own cell, all at the same scale, with plenty of space between them.
- Clean cartoon style: thick dark charcoal outlines (#2B2B2B), flat bright colors with one soft shade tone, seen from a slight three-quarter view.
- Nothing may use magenta or hot pink (use soft pastel pink instead).
- Absolutely no text, letters, numbers or logos. No people.
Reply "ready" and wait.
```

### ⭐ Step 8 → `town_items_2.png`
- [x] done
```
Sheet, 4 columns by 4 rows, on a flat #FF00FF magenta background. Sixteen home items for a cozy cartoon house, each centered in its own cell, all at the same scale, drawn from a slight three-quarter view, thick charcoal outlines, flat colors, no text:

Row 1: 1. a wooden loft bed with a ladder and a desk underneath. 2. a fluffy white cloud-shaped bed with a pale-blue blanket. 3. a small soft-pink loveseat. 4. a white wicker hanging egg chair with a cushion, on a stand.
Row 2: 5. a gaming desk with a glowing monitor, keyboard and a gaming chair (screen shows colorful shapes only). 6. a coffee table with a glass aquarium inside full of little fish. 7. a black-and-white checkerboard rug seen at an angle. 8. a round dark-blue galaxy rug with stars and planets.
Row 3: 9. a floor lamp wrapped in warm fairy lights. 10. a glowing crescent-moon lamp on a small stand. 11. a big monstera plant in a white pot. 12. a small cherry blossom tree in a pot, pink blossoms.
Row 4: 13. a wall collage of instant photos and string with clothespins (photos show simple scenes, no people's faces). 14. a yellow lightning-bolt neon sign. 15. a huge shiny gold championship trophy cup on a black base. 16. a cute white bunny sitting.
```

### ⭐ Step 9 → `pets_1.png`  (16 new pets)
- [x] done
```
Sheet, 4 columns by 4 rows. Sixteen cute cartoon pets, each sitting or standing, facing slightly left, same scale (small animals drawn a bit bigger so all read clearly):
Row 1: a golden hamster, a little gray mouse, a fluffy yellow chick, a green tree frog.
Row 2: a snail with a swirly shell, a hedgehog, a white poodle with a fluffy haircut, a black cat with yellow eyes.
Row 3: a pink mini pig, a white pygmy goat, a raccoon, a red fox.
Row 4: a brown owl, a baby alligator, a smiling sloth, a river otter.
```

### ⭐ Step 10 → `pets_2.png`  (rare pets + mayor and quest rewards)
- [x] done
```
Sheet, 4 columns by 3 rows:
Row 1: a peacock with its tail fanned, a white swan, a dolphin jumping, a Florida panther (tan big cat) sitting.
Row 2: a white unicorn with a pastel mane, a friendly green dragon, a big wooden mayor's desk with a gold nameplate (no words), a town flag on a pole (red and gold with a simple star).
Row 3: a framed official portrait with a gold frame showing a simple sun-and-palm-tree painting, a golden coach's whistle on a red lanyard, a big golden antique key, a golden TV microphone.
```

### Step 11 → `trophies.png`  (story-event and quest trophies)
- [x] done
```
Sheet, 4 columns by 2 rows. Eight shiny award objects:
Row 1: a ship in a glass bottle, a trophy topped with a blue hurricane swirl, a blue fair ribbon rosette with a tiny Ferris wheel, a gold badge shaped like a ballot box.
Row 2: an old rolled parchment charter with a wax seal, a small white swan statue, a gold bull statue, a giant gold cup with two handles on a black base.
```

### Step 12 → `fish.png`  (Lake Eola fishing)
- [x] done
```
Sheet, 4 columns by 4 rows. Sixteen catches from Florida lakes and the coast, side view:
Row 1: bluegill, largemouth bass, channel catfish, crappie.
Row 2: redear sunfish, tilapia, an old muddy boot, striped mullet.
Row 3: Florida gar, peacock bass, snook, a white swan feather.
Row 4: redfish, tarpon, Gulf sturgeon, a glowing golden koi.
```

### Step 13 → `seasonal_C.png`  (September–December: these are in the shop NOW, so do this one first)
- [x] done
```
Sheet, 4 columns by 3 rows. Twelve seasonal home decorations:
Row 1: a football with a red bow, a red-and-gold school pennant (no letters), a pot of sunflowers, a carved smiling pumpkin.
Row 2: three spooky candles with drips, a garland of paper bats, a pumpkin pie, an autumn leaf wreath.
Row 3: a cozy patchwork quilt folded on a bed, warm white string lights, a gingerbread house, a smiling snowman.
```

### Step 14 → `seasonal_A.png`  (January–April)
- [x] done
```
Sheet, 4 columns by 3 rows:
Row 1: a confetti cannon bursting, a snow globe with a tiny town inside, a round wall clock showing midnight, a heart-shaped lamp.
Row 2: a bouquet of red roses, a wall of valentine cards, a diamond kite with a ribbon tail, tulips in a pot.
Row 3: a basketball bracket poster with blank lines (no words), yellow rain boots on a mat, an umbrella-shaped lamp, a basket of painted eggs.
```

### Step 15 → `seasonal_B.png`  (May–August)
- [x] done
```
Sheet, 4 columns by 3 rows:
Row 1: a graduation cap with a tassel, a rolled certificate with a red ribbon, a red hibiscus flower in a pot, a striped beach towel laid flat.
Row 2: a folding hand fan, an ice cream cart with an umbrella, a fireworks burst poster, a waving American flag on a small pole.
Row 3: a backyard grill with burgers, a new backpack, a giant yellow pencil, a wall planner calendar (blank boxes, no numbers).
```

---

# CHAT C: Places and people (5 images)
No attachments. Start a new chat.

### Paste this first
```
You are drawing game art for "Smith's Classroom 2.0", a bright, friendly school game set in a small town in Orlando, Florida. For every image in this chat:
- Separate scenes or characters in a grid on a flat pure magenta #FF00FF background, each centered in its own cell, all at the same scale.
- Clean cartoon style: thick dark charcoal outlines (#2B2B2B), flat bright colors with one soft shade tone, slight three-quarter view, sunny palm-tree Florida feel.
- Nothing may use magenta or hot pink. No text, letters, numbers or logos anywhere (use simple icons on signs instead of words).
Reply "ready" and wait.
```

### ⭐ Step 16 → `downtown_buildings.png`
- [x] done
```
Sheet, 4 columns by 4 rows, on a flat #FF00FF magenta background. Sixteen small cartoon town buildings for a bright, friendly school game, each centered in its own cell, all at the same scale, seen from a slight three-quarter view, thick charcoal outlines, flat colors with one soft shade, a little patch of sidewalk under each. No people, no text, no letters, no numbers, no logos. Use simple icons on the signs instead of words.

Row 1: 1. a small clinic with a red cross on the sign. 2. an animal hospital with a paw print on the sign. 3. a newspaper office with a rolled newspaper on the sign. 4. a classic bank with columns and a coin on the sign.
Row 2: 5. a red fire station with an open garage door and a fire truck nose peeking out. 6. a sheriff's office with a gold star on the sign. 7. a courthouse with columns and a scales-of-justice icon. 8. a tutoring center with a stack of books on the sign.
Row 3: 9. a post office with a mailbox in front and an envelope icon. 10. a cozy café with a striped awning and a steaming cup icon. 11. a construction yard with a small crane and stacked bricks. 12. a sanitation depot with a small garbage truck and recycling bins.
Row 4: 13. a park ranger station: a small wooden cabin with trees. 14. a photo studio with a big camera icon. 15. a community bulletin board under a little roof, covered in colorful notes (no writing). 16. a town hall with a clock tower and a flag.
```

### ⭐ Step 17 → `world_npcs.png`
- [x] done
```
Same style, new sheet, 4 columns by 1 row on flat #FF00FF magenta. Four friendly cartoon townspeople, full body, standing, facing forward, same height, one per cell, no text:
1. a high school coach in a red cap and red polo with a whistle and a clipboard. 2. a stern but kind elderly landlady with glasses, a cardigan and a big ring of keys. 3. a cheerful TV news anchor in a blue suit holding a microphone. 4. a boat captain in a captain's hat and a yellow raincoat holding a fishing rod.
```

### Step 18 → `world_places.png`
- [x] done
```
Sheet, 4 columns by 3 rows, on a flat #FF00FF magenta background. Twelve small cartoon scenes for a bright, friendly school game, each centered in its own cell at the same scale, slight three-quarter view, thick charcoal outlines, flat colors with one soft shade. No people, no text, no letters, no logos.

Row 1: 1. a town plaza with a fountain. 2. a cozy street of small houses with picket fences. 3. a small downtown block of shops and offices. 4. a lakeside boardwalk with a swan boat, a fishing dock and a fountain in the lake (Lake Eola, Orlando).
Row 2: 5. a colorful theme park with a roller coaster loop. 6. a rocket on a launch pad by the ocean (Space Coast). 7. a little skyline of several towns on a map. 8. an open scrapbook album with photos and stickers.
Row 3: 9. a red-and-yellow roller coaster car on a track. 10. a tall drop tower ride. 11. a log flume boat splashing down. 12. a hurricane swirl over a small town with boarded windows.
```

### Step 19 → `downtown_landmarks.png`
- [x] done
```
Same style, new sheet, 4 columns by 4 rows on flat #FF00FF magenta. Sixteen town landmarks, each centered in its own cell, same scale, slight three-quarter view, no people, no text:

Row 1: 1. an outdoor basketball court with a hoop. 2. a skate park with ramps. 3. a fenced dog park with a fire hydrant and a ball. 4. a swimming pool with a diving board.
Row 2: 5. a public library building with big windows. 6. a community garden with raised beds and sunflowers. 7. a food court with three little food stands. 8. a tall Wi-Fi tower with signal waves.
Row 3: 9. a bus stop with a bench and a shelter. 10. a solar farm with rows of solar panels. 11. a small movie theater with a marquee of light bulbs (no words). 12. a gym building with a dumbbell icon.
Row 4: 13. a history museum with columns and a vase icon. 14. a petting zoo with a giraffe and a goat behind a fence. 15. a small football field with goalposts. 16. a colorful street mural on a brick wall (abstract shapes only).
```

### Step 20 → `world_story.png`
- [x] done
```
Same style, new sheet, 3 columns by 2 rows on flat #FF00FF magenta, one scene per cell, no people, no text:
1. a hurricane swirl symbol over a palm tree. 2. a county fair with a Ferris wheel and booths. 3. a ballot box with a TV news camera. 4. an old parchment charter with a quill pen. 5. a white swan on a clean blue lake with a recycling sign. 6. a stock market chart arrow going up next to a sneaker.
```

---

### Step 21 → `tower_loot_1.png`  (Exam Tower relics and decor)
- [x] done
```
Same style as the other item sheets: one object per cell, centered, chunky outlines, soft shading, solid magenta (#FF00FF) background, no text, no shadows on the background.
Sheet, 4 columns by 4 rows. Sixteen objects:
Row 1: a single white glove glowing softly gold, a wooden judge's gavel with a gold band, a feather quill pen with a gold tip, a brass compass with a glowing needle.
Row 2: a red paper lantern glowing warmly, a round shield split into three colored sections (red, white, blue), a desk lamp whose shade has an X drawn on it like supply and demand lines, a neon sign shaped like a downward-sloping curve.
Row 3: a shiny gold bar, a small Liberty Bell replica with the crack, a stack of three old leather books tied with string, a white marble Greek column.
Row 4: a rolled parchment scroll with a red wax seal, a small blue ballot box with a slot and a soft glow, a desk globe on a wooden stand, a pair of bookends: a gold bull and a brown bear.
```

### Step 22 → `tower_loot_2.png`  (Exam Tower decor, pets and trophies)
- [x] done
```
Same style as Step 21: one object per cell, magenta (#FF00FF) background, no text.
Sheet, 4 columns by 4 rows. The last row has only two objects; leave the last two cells empty magenta.
Row 1: gold scales of justice, a black sign with a green and red stock ticker arrow, an ancient Greek clay vase with black figures, a round rug printed with a map of the United States.
Row 2: a rectangular rug shaped like a green dollar bill (no numbers or faces), a glass inkwell with a feather, a friendly cartoon bull (pet), a friendly cartoon brown bear (pet).
Row 3: a friendly cartoon bald eagle (pet), a gold medal on a red ribbon, a blue ribbon rosette with a tiny bar chart, a gray folder badge with a gold star.
Row 4: a white marble bust of a thinking head with a glowing brain symbol, a tall gold trophy shaped like a castle tower with a flag on top.
```

### Step 23 → `npc_rosa_fix.png`  (Chat C: fixes Captain Rosa, who came out as a man)
- [x] done
```
Same style as the townspeople sheet. One character only, centered, full body, standing, facing forward, on flat #FF00FF magenta, no text:
Captain Rosa, a friendly middle-aged Latina woman boat captain with dark hair in a low ponytail, a white captain's hat with a navy brim, a yellow raincoat over a navy shirt, navy pants and boots, holding a fishing rod in one hand and waving with the other. Same height and line weight as the coach, the landlady and the news anchor.
```

## For Claude: where each sheet goes
| File | Cells → ids (left to right, row by row) |
|---|---|
| clothes_tops_2 … clothes_bottoms_3 | see the mapping table in `GEMINI_CLOTHES_AND_ITEMS.md` (top_16 … bot_23) |
| town_items_2 | bed_loft, bed_cloud, sofa_loveseat, sofa_egg_chair, table_gaming, table_aquarium, rug_checker, rug_galaxy, lamp_fairy, lamp_moon, plant_monstera, plant_cherry, art_photos, wall_neon_bolt, trophy_state, pet_bunny |
| pets_1 | pet_hamster, pet_mouse, pet_chick, pet_frog, pet_snail, pet_hedgehog, pet_poodle, pet_blackcat, pet_pig, pet_goat, pet_raccoon, pet_fox, pet_owl, pet_gator, pet_sloth, pet_otter |
| pets_2 | pet_peacock, pet_swan, pet_dolphin, pet_panther, pet_unicorn, pet_dragon, mayor_desk, mayor_flag, mayor_portrait, q_whistle, q_key, q_mic |
| trophies | q_ship, e_hurricane, e_fair, e_election, e_founders, e_lakes, e_market, t_besttown |
| fish | fish_bluegill … fish_koi (order of `FISH` in town/world2.js) → `v2/assets/town/world/` |
| seasonal_C | s09_football, s09_pennant, s09_sunflower, s10_pumpkin, s10_candles, s10_bats, s11_pie, s11_wreath, s11_quilt, s12_lights, s12_gingerbread, s12_snowman |
| seasonal_A | s01_confetti, s01_snowglobe, s01_clock, s02_heartlamp, s02_roses, s02_cards, s03_kite, s03_tulips, s03_bracket, s04_boots, s04_umbrella, s04_eggs |
| seasonal_B | s05_gradcap, s05_apcert, s05_hibiscus, s06_beachball, s06_fan, s06_icecream, s07_fireworks, s07_flag, s07_grill, s08_backpack, s08_pencils, s08_planner |
| downtown_buildings | doctor, vet, reporter, banker, firefighter, marshal, judge, tutor, mail, chef, builder, sanitation, ranger, photographer, board, hall → `v2/assets/town/downtown/` |
| downtown_landmarks | land_court … land_mural → `v2/assets/town/downtown/` |
| world_npcs | npc_coach, npc_pinkerton, npc_ned, npc_rosa → `v2/assets/town/world/` |
| npc_rosa_fix | npc_rosa (replaces the first version) → `v2/assets/town/world/` |
| tower_loot_1 | rl_hand, rl_gavel, rl_quill, rl_compass, rl_lantern, rl_shield, tw_sdlamp, tw_phillips, tw_goldbar, tw_bell, tw_fedpapers, tw_column, tw_magna, tw_ballot, tw_globe, tw_bullbear |
| tower_loot_2 | tw_scales, tw_ticker, tw_vase, tw_rug_map, tw_rug_cash, tw_inkwell, pet_bull, pet_bear, pet_eagle, tw_mock, tw_graph, tw_cases, tw_review, tw_champ (copied to all 4 champion trophies) |
| world_places | plaza, homes, downtown, waterfront, park, space, towns, album, ride_coaster, ride_drop, ride_flume, (spare) → `v2/assets/town/world/` |
| world_story | story_hurricane, story_fair, story_election, story_founders, story_lakes, story_market → `v2/assets/town/world/` |
Items go to `v2/assets/town/items/<id>.webp`. Cut with `tools/town/process_civic.py`-style slicing (magenta key), and clothes with `tools/extract_clothes.py`.

---

# CHAT D: Smithtopia shop items (3 images)
No attachments. Start a new chat. Each sheet is 5 columns by 4 rows.

### Paste this first
```
You are drawing game art for "Smith's Classroom 2.0", a bright, friendly school game for high-school students in Orlando, Florida. For every image in this chat:
- A sheet of separate objects in a grid on a flat pure magenta #FF00FF background, each object centered in its own cell, all at the same scale, with plenty of space between them.
- Clean cartoon style: thick dark charcoal outlines (#2B2B2B), flat bright colors with one soft shade tone, seen from a slight three-quarter view.
- Nothing may use magenta or hot pink (use soft pastel pink instead).
- Absolutely no text, letters, numbers or logos. No people.
Reply "ready" and wait.
```

### Step 24 → `hangout_items_1.png`  (Gamer room, Sports fan, Civics)
- [ ] done
```
Sheet, 5 columns by 4 rows, on a flat #FF00FF magenta background. Twenty home items, one per cell, same scale, no text:
Row 1: a DJ booth table with two turntables and a small mixer with glowing blue buttons; a flat-screen TV on a wall mount showing colorful abstract shapes; a black game controller; a gaming headset with glowing teal ear cups; a coiled strip of rainbow LED lights glowing.
Row 2: a mirrored disco ball hanging from a short chain, with sparkles; a giant purple beanbag chair; a rainbow-striped rectangular rug seen at an angle; a small snack vending machine with rows of colorful snacks behind glass; a mini basketball hoop with an orange rim and a small backboard.
Row 3: a rectangular rug that looks like a wooden basketball court with white lines; a brown football on a small wooden stand with a black marker squiggle on it; a white bowling pin with two red stripes; a red-and-gold sports jersey in a wooden frame (no numbers or letters); a wall shelf holding three pairs of colorful sneakers.
Row 4: a short section of red stadium bleachers with three steps; a green ping-pong table with a net and two paddles; a square green turf rug with one white stripe; a rolled-open parchment scroll in a gold frame with a feather quill (only wavy lines, no letters); a framed vintage green banknote with ornate borders (no numbers, no faces).
```

### Step 25 → `hangout_items_2.png`  (Space, Florida beach)
- [ ] done
```
Same style. Sheet, 5 columns by 4 rows, on a flat #FF00FF magenta background. Twenty home items, one per cell, same scale, no text:
Row 1: a kid's bed shaped like a red-and-white rocket ship; a round rug shaped like a blue planet with a ring; a small dome star projector casting little yellow stars; a desk lamp shaped like a silver rocket; a brass telescope on a wooden tripod.
Row 2: a framed poster of a purple galaxy with stars; a small toy astronaut figure in a white suit with a gold mirrored visor (no face showing); a potted alien plant with curly teal leaves and glowing tips; a striped hammock hanging between two short wooden posts; a striped folding beach chair with a small umbrella.
Row 3: a small orange tree with oranges in a terracotta pot; a sandy-colored rug with a starfish and a seashell on it; a glowing pastel-blue jellyfish lamp; a small wooden box full of seashells; a turquoise surfboard with a white hibiscus flower design, standing up.
Row 4: a small bamboo tiki bar with a thatched straw roof; a small white mini fridge with a cold blue glow inside; a big golden throne with red velvet cushions; a low wooden futon with a gray mattress and two pillows; a green sleeping bag rolled out with a pillow and a small lantern.
```

### Step 26 → `hangout_items_3.png`  (Cozy, Creator studio)
- [ ] done
```
Same style. Sheet, 5 columns by 4 rows, on a flat #FF00FF magenta background. Seventeen home items, one per cell, same scale, no text. The last row has only two objects; leave the last three cells empty magenta.
Row 1: a white hanging nest chair shaped like a woven basket with a cushion, on a stand; a fluffy cream shag rug; three small succulents in matching white pots; lucky bamboo stalks in a glass vase with pebbles; a cute red-and-white mushroom-shaped lamp glowing softly.
Row 2: a round mirror with a gold frame; a pastel-pink neon heart sign glowing; a teapot and two teacups on a small tray; a red electric guitar; a black keyboard piano on a stand.
Row 3: a podcast microphone on a desk arm with a foam cover; a wall of colorful vinyl records in square frames; a skateboard deck with a bright flame pattern hanging on the wall; a wooden painting easel holding a canvas with a sunset; a vintage brown film camera with a strap.
Row 4: a small wooden chess table with black and white pieces; a colorful puzzle cube.
```

## For Claude: where Chat D goes
| File | Cells → ids (left to right, row by row) |
|---|---|
| hangout_items_1 | table_dj, wall_tv, trophy_controller, trophy_headphones, lamp_led, lamp_disco, sofa_bean_giant, rug_rainbow, table_vending, wall_hoop, rug_court, trophy_football, trophy_bowling, art_jersey, wall_sneakers, sofa_bleachers, table_pingpong, rug_turf, art_constitution, art_dollar |
| hangout_items_2 | bed_rocket, rug_planet, lamp_star, lamp_rocket, table_telescope, art_space, trophy_astronaut, plant_alien, bed_hammock, sofa_beachchair, plant_orange, rug_sand, lamp_jellyfish, trophy_shell, wall_surfboard, table_tiki, table_minifridge, sofa_throne, bed_futon, bed_campout |
| hangout_items_3 | sofa_hangchair, rug_shag, plant_succulents, plant_bamboo, plant_mushroom, wall_mirror, wall_neon_heart, table_tea, wall_guitar, table_piano, trophy_mic, art_records, art_skate, table_easel, trophy_camera, table_chess, trophy_cube |
