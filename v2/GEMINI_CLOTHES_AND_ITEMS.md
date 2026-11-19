> **Replaced by `GEMINI_MASTER.md`.** Use that file instead. This one is kept only for its cell-to-id mapping table.

# New clothes and Town items: Gemini art script (9 images)

This pack adds **34 clothing items**: 20 for girls, 10 for guys and 4 extras anyone can wear (sweater vest, fleece, checkered shirt and puffer vest). Students wear them on their avatar in the Locker, Money Moves, the Town and the arcade games. It also adds **16 new furniture pieces and pets** for Town houses.
It takes **9 generations**. Send Claude the 9 files. Claude cuts each outfit off the mannequins, fits it to all four body shapes (slim, athletic, curvy and plus), and adds everything to the game.

The furniture already works now with emoji. The new clothes show up once the art arrives.

---

## How to run it
1. Start a **new Gemini chat** and paste the **STYLE BLOCK** first.
2. For prompts 1 to 8, **attach the mannequin picture named in the prompt** (`mannequins_5.png` or `mannequins_4.png`, sent with this script). Then paste the prompt. Attach the picture again for every prompt.
3. Download each result at full size and save it with the **exact filename** shown.
4. **Most important rule:** the mannequins must stay in the **same place, same size and same pose** as in the attached picture, with the same pink background. If Gemini moves them, makes them bigger, or adds faces or hair, reply: *"Same image, but keep the mannequins exactly where and how they were in my picture: same size, same pose, no faces, no hair. Only add the clothes."*

---

## STYLE BLOCK (paste first)

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

---

## Tops (girls)

### PROMPT 1 → `clothes_tops_1.png`  (attach `mannequins_5.png`)
```
Dress the 5 mannequins, left to right, each in ONE top:
1. A soft pastel-pink cropped hoodie with a kangaroo pocket and drawstrings (it ends just above the shorts).
2. A lavender button-front cardigan worn open over a plain white tee.
3. A white blouse with small ruffles along the neckline and the ends of long sleeves.
4. A red-and-black plaid flannel shirt worn open over a plain white tee, with the shirt ends tied in a knot at the waist.
5. A navy-and-white horizontally striped long-sleeve tee with a boat neckline.
Keep the gray shorts visible.
```

### PROMPT 2 → `clothes_tops_2.png`  (attach `mannequins_5.png`)
```
Dress the 5 mannequins, left to right, each in ONE top:
1. A blush-pink blouse with puffed short sleeves and a small white flower print.
2. An oversized Grenadier-red crewneck sweatshirt with ribbed cuffs and hem, plain (no letters).
3. A pastel-purple satin bomber jacket, zipped halfway, over a white tee, with striped ribbed cuffs.
4. A red-and-gold cheerleading shell top with a gold chevron stripe across the chest (plain, no letters), worn with a matching short red pleated cheer skirt over the shorts.
5. A teal floral wrap dress with short flutter sleeves and a tie at the waist, falling to just below the knee (this one covers the shorts).
```

### PROMPT 3 → `clothes_tops_3.png`  (attach `mannequins_4.png`)
```
Dress the 4 mannequins, left to right, each in ONE outfit piece:
1. A red knee-length homecoming dress with short sleeves, a fitted waist with a thin gold belt, and a flared skirt (covers the shorts).
2. A denim pinafore dress (overall-style straps, knee length) worn over a white short-sleeve tee (covers the shorts).
3. A cream knit sweater vest over a light-blue collared shirt with long sleeves.
4. A sage-green zip-up fleece jacket, zipped up.
Keep the gray shorts visible except where a dress covers them.
```

## Tops (guys)

### PROMPT 4 → `clothes_tops_4.png`  (attach `mannequins_4.png`)
```
Dress the 4 mannequins, left to right, each in ONE top:
1. A sleeveless basketball jersey in Grenadier red with gold trim around the neck and arms (plain, NO numbers or letters), worn over a white tee.
2. A green-and-black flannel shirt, unbuttoned, over a plain black tee, sleeves rolled to the elbow.
3. A black zip-up track jacket with two white stripes down each sleeve, zipped up.
4. A navy polo shirt with a white-tipped collar.
Keep the gray shorts visible.
```

### PROMPT 5 → `clothes_tops_5.png`  (attach `mannequins_4.png`)
```
Dress the 4 mannequins, left to right, each in ONE top:
1. A green-and-tan camouflage pullover hoodie with the hood down.
2. A short-sleeve button-up shirt in light blue with a palm-leaf print, worn untucked.
3. A white tee under an open short-sleeve black-and-white checkered shirt.
4. A gold-and-black varsity-style puffer vest over a gray long-sleeve tee.
Keep the gray shorts visible.
```

## Bottoms (girls and guys)

### PROMPT 6 → `clothes_bottoms_1.png`  (attach `mannequins_4.png`)
```
Dress the 4 mannequins, left to right, each in ONE pair of bottoms WITH shoes:
1. Medium-blue flare jeans with white platform sneakers.
2. A white pleated tennis skirt (knee length) with white sneakers and short socks.
3. Black leggings with chunky white-and-gray sneakers.
4. Olive-green cargo pants with side pockets and black lace-up boots.
Keep the gray tank tops visible.
```

### PROMPT 7 → `clothes_bottoms_2.png`  (attach `mannequins_4.png`)
```
Dress the 4 mannequins, left to right, each in ONE pair of bottoms WITH shoes:
1. Cream wide-leg trousers with tan ballet flats.
2. A medium-wash denim midi skirt (mid-calf) with brown ankle boots.
3. Soft pastel-pink jogger sweatpants with white slides and white socks.
4. Light-wash straight-leg mom jeans, cuffed at the ankle, with red canvas high-top sneakers.
Keep the gray tank tops visible.
```

### PROMPT 8 → `clothes_bottoms_3.png`  (attach `mannequins_4.png`)
```
Dress the 4 mannequins, left to right, each in ONE pair of bottoms WITH shoes:
1. Baggy dark-wash jeans with red-and-white high-top basketball sneakers (no logos).
2. Black basketball shorts (knee length) with white crew socks and black slides.
3. Khaki chino pants with brown leather boat shoes.
4. Green camouflage cargo shorts with gray sneakers and white socks.
Keep the gray tank tops visible.
```

---

## PROMPT 9: Town furniture and pets → `town_items_2.png`
*No attachment. Sheet, 4 columns × 4 rows, on #FF00FF, e.g. 2048×2048.*

If you still have the Gemini chat from the first Town pack, run this one there so the style matches. Otherwise it's fine here.

```
Sheet, 4 columns by 4 rows, on a flat #FF00FF magenta background. Sixteen home items for a cozy cartoon house, each centered in its own cell, all at the same scale, drawn from a slight three-quarter view, thick charcoal outlines, flat colors, no text:

Row 1: 1. a wooden loft bed with a ladder and a desk underneath. 2. a fluffy white cloud-shaped bed with a pale-blue blanket. 3. a small soft-pink loveseat. 4. a white wicker hanging egg chair with a cushion, on a stand.
Row 2: 5. a gaming desk with a glowing monitor, keyboard and a gaming chair (screen shows colorful shapes only). 6. a coffee table with a glass aquarium inside full of little fish. 7. a black-and-white checkerboard rug seen at an angle. 8. a round dark-blue galaxy rug with stars and planets.
Row 3: 9. a floor lamp wrapped in warm fairy lights. 10. a glowing crescent-moon lamp on a small stand. 11. a big monstera plant in a white pot. 12. a small cherry blossom tree in a pot, pink blossoms.
Row 4: 13. a wall collage of instant photos and string with clothespins (photos show simple scenes, no people's faces). 14. a yellow lightning-bolt neon sign. 15. a huge shiny gold championship trophy cup on a black base. 16. a cute white bunny sitting.
```

---

## For Claude: what each cell becomes
| Sheet | Left → right |
|---|---|
| tops_1 | top_11_pink_crop_hoodie · top_12_lavender_cardigan · top_13_ruffle_blouse · top_14_tied_flannel · top_15_striped_tee |
| tops_2 | top_16_puff_blouse · top_17_red_sweatshirt · top_18_bomber · top_19_cheer · top_20_wrap_dress |
| tops_3 | top_21_homecoming_dress · top_22_pinafore · top_23_sweater_vest · top_24_fleece |
| tops_4 | top_25_jersey · top_26_green_flannel · top_27_track_jacket · top_28_polo |
| tops_5 | top_29_camo_hoodie · top_30_palm_shirt · top_31_checker_shirt · top_32_puffer_vest |
| bottoms_1 | bot_12_flare_jeans · bot_13_tennis_skirt · bot_14_leggings · bot_15_olive_cargo |
| bottoms_2 | bot_16_wide_trousers · bot_17_denim_midi · bot_18_pink_joggers · bot_19_mom_jeans |
| bottoms_3 | bot_20_baggy_jeans · bot_21_bball_shorts · bot_22_chinos · bot_23_camo_shorts |
| town_items_2 | bed_loft, bed_cloud, sofa_loveseat, sofa_egg_chair / table_gaming, table_aquarium, rug_checker, rug_galaxy / lamp_fairy, lamp_moon, plant_monstera, plant_cherry / art_photos, wall_neon_bolt, trophy_state, pet_bunny |
