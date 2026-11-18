# Grenadier Town, civic update: Gemini art script (4 images)

This pack covers the new Town features: plaza upgrades your class unlocks with goals, the Town Hall, Bank and Job Board pictures, election and badge icons, six business stalls, and twelve products that students make and sell.
It takes **4 generations**. Send Claude the 4 files. Claude cuts the sheets apart, removes the backgrounds and puts everything into `v2/assets/town/`.

You don't have to wait for the art. Every picture already shows an emoji, so the features work today.

---

## How to run it
1. Use the **same Gemini chat** as the first Town pack if you still have it, so the style matches. Otherwise start a new chat and paste the **STYLE BLOCK** first.
2. Paste each **PROMPT** one at a time. Download each image at full size.
3. Save each download with the **exact filename** shown.
4. If a result has words, letters, a watermark, a frame or the wrong background, reply: *"Same image, but remove all text and keep the background pure #FF00FF."*

---

## STYLE BLOCK (paste first, only in a new chat)

```
You are making game art for "Smith's Classroom 2.0", a bright, friendly school game for high-school students in Orlando, Florida. Every image in this chat must match this style exactly:

- Clean modern cartoon illustration, like a cheerful mobile game. Bold, confident shapes.
- Thick dark charcoal outlines (#2B2B2B) on every object, slightly rounded line ends.
- Flat colors with ONE soft shade tone per color. No gradients, no realistic texture, no photo look.
- Sunny daylight palette. School colors: Grenadier red #C8102E, gold #F2B632, black. Florida touches: palm trees, bright sky, warm brick, stucco.
- Viewpoint: high three-quarter view looking slightly down, like objects in a cozy top-down life-sim town.
- ABSOLUTELY NO text, letters, numbers, logos, signatures or watermarks anywhere.
- When a prompt says "on a #FF00FF background", the background must be one flat, pure magenta #FF00FF with no gradient, no floor, no shadow on the background, no vignette. Nothing in the art itself may use magenta or hot pink.
- When a prompt says "sheet", draw a strict grid of equal invisible cells. Exactly one object per cell, centered, all at the same scale, with generous magenta margin around each object so nothing touches a cell edge or another object.

Reply "ready" and wait for my prompts.
```

---

## PROMPT 1: Plaza upgrades → `civic_plaza_sheet.png`
*Sheet, 4 columns × 2 rows, on #FF00FF. Wide, e.g. 2048×1024.*

```
Sheet, 4 columns by 2 rows, on a #FF00FF background. Eight big decorations that get added to a brick town plaza, each standing on its own (no ground patch, no shadow on the background), seen from a high three-quarter view, all at the same scale as each other:

Row 1:
1. A grand three-tier stone fountain with sparkling blue water spraying up, a red-and-gold trim around the basin.
2. A cheerful food truck painted red and gold with a serving window open, an awning, and a few colorful snacks on the counter. Side view angled toward the viewer.
3. A small outdoor stage: wooden platform, red curtains at the back, gold stage lights on a frame, a microphone stand in front.
4. A bronze-gold statue on a stone pedestal of a proud Grenadier soldier mascot in a tall hat, holding a flag (the flag has no writing).

Row 2:
5. An arch of red, gold, white and black balloons standing on two small weighted bases.
6. A raised flower garden bed bursting with tulips, sunflowers and hibiscus, with a small white picket border.
7. A retro arcade cabinet in red and gold with a glowing screen showing simple colorful shapes (no words), and a joystick and buttons.
8. A freestanding painted mural wall on two posts, showing a colorful abstract Florida scene: sun, palm trees, ocean waves, a school building.

No text anywhere, no people.
```

## PROMPT 2: Town Hall, Bank and badges → `civic_icons_sheet.png`
*Sheet, 3 columns × 2 rows, on #FF00FF. e.g. 1536×1024.*

```
Sheet, 3 columns by 2 rows, on a #FF00FF background. Six objects, each centered in its cell, same visual weight:

Row 1:
1. A small classical town hall building: white columns, red roof, a gold dome on top, wide front steps, two potted palms.
2. A friendly little bank building in warm brick with a gold coin emblem over the door (a plain coin, no symbols or letters), a vault-style round door slightly open showing gold coins inside.
3. A cork job board on two wooden legs with four colorful pinned paper notes (the notes show only simple doodles like a book, a house, a star and a coin, no words) and a red pushpin on each.

Row 2:
4. A wooden election podium with a red-and-gold bunting skirt and a microphone on top, next to a small clear ballot box holding folded paper ballots.
5. A red mayor's sash with gold trim, draped in a loop, with a round gold medal pinned on it (the medal shows a simple star, no letters).
6. A cute cartoon flame badge: a bright orange-and-gold flame with a happy face, inside a round gold badge rim.

No text, no numbers, no people.
```

## PROMPT 3: Business stalls → `civic_stalls_sheet.png`
*Sheet, 3 columns × 2 rows, on #FF00FF. e.g. 1536×1024.*

```
Sheet, 3 columns by 2 rows, on a #FF00FF background. Six small market stalls that students run as businesses, each a wooden stall with a striped awning and a counter, seen from a three-quarter view, same size and same angle, each with a different color awning and its products displayed on the counter. Signs on the stalls show only a picture, never words.

Row 1:
1. Bakery: pink-and-white awning, cupcakes, cookies and a cake stand on the counter, a cupcake picture on the sign.
2. Flower shop: green-and-white awning, buckets of bouquets and sunflowers, a flower picture on the sign.
3. Art studio: purple-and-white awning, an easel with a colorful painting, a palette and brushes, a palette picture on the sign.

Row 2:
4. Craft shop: orange-and-white awning, balls of yarn, a folded quilt and paper lanterns, a yarn-ball picture on the sign.
5. Tech repair: blue-and-white awning, a vintage radio, a little robot, a screwdriver and gears, a wrench picture on the sign.
6. Smoothie bar: teal-and-white awning, a blender, colorful smoothies in cups with straws, fruit, a cup picture on the sign.

No words or letters anywhere.
```

## PROMPT 4: Products → `civic_products_sheet.png`
*Sheet, 4 columns × 3 rows, on #FF00FF. e.g. 2048×1536.*

```
Sheet, 4 columns by 3 rows, on a #FF00FF background. Twelve small home-decor products, each centered in its cell, all drawn at the same scale and from the same slight three-quarter view, as if each sits on a table or floor of a cozy room:

Row 1: 1. a three-level tower of frosted cupcakes on a stand. 2. a glass cookie jar full of chocolate-chip cookies with a red lid. 3. a bouquet of colorful flowers wrapped in kraft paper with a ribbon. 4. a sunflower in a terracotta pot.
Row 2: 5. a framed original painting of a Florida sunset with palm trees, in a gold frame. 6. a small clay sculpture of an abstract swirl on a wooden base. 7. a round quilted patchwork rug in red, gold and teal, seen from above at an angle. 8. a red paper lantern lamp glowing warmly, on a small stand.
Row 3: 9. a vintage tabletop radio in teal with a round dial. 10. a cute little toy robot with antenna and a glowing chest light. 11. a tall smoothie in a clear cup with a straw and a strawberry on the rim. 12. a bowl full of fresh fruit: strawberries, oranges, bananas, grapes.

No text, no labels.
```

---

## Where it all goes (for Claude)
| Sheet | Cells → files |
|---|---|
| `civic_plaza_sheet.png` | `plaza/fountain`, `plaza/foodtruck`, `plaza/stage`, `plaza/statue`, `plaza/balloons`, `plaza/garden`, `plaza/arcade`, `plaza/mural` (.webp) |
| `civic_icons_sheet.png` | `civic/town_hall`, `civic/bank`, `civic/job_board`, `civic/podium`, `civic/mayor_sash`, `civic/streak_flame` |
| `civic_stalls_sheet.png` | `civic/stall_bakery`, `civic/stall_flowers`, `civic/stall_art`, `civic/stall_crafts`, `civic/stall_tech`, `civic/stall_smoothie` |
| `civic_products_sheet.png` | `items/prod_cupcakes`, `prod_cookie_jar`, `prod_bouquet`, `prod_sunflower`, `prod_painting`, `prod_sculpture`, `prod_quilt_rug`, `prod_knit_lamp`, `prod_radio`, `prod_robot`, `prod_smoothie`, `prod_fruit_bowl` |
