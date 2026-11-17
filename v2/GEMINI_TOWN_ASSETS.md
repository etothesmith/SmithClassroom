# Grenadier Town: Gemini art script (8 images)

This pack covers the plaza, the town banner, 8 houses, 8 room interiors, 42 furniture/pet/trophy items, crates and the Town icon.
**8 generations total.** Sprites are grouped onto sheets so you spend as few generations as possible. Send Claude the 8 files; Claude cuts the sheets apart, removes the backgrounds and drops everything into `v2/assets/town/`.

Until the art arrives, the Town already works: every item shows an emoji and the plaza draws a simple placeholder.

---

## How to run it
1. Start a **new Gemini chat**. Paste the **STYLE BLOCK** first, by itself, and wait for Gemini to say it's ready.
2. Then paste each **PROMPT** one at a time, in order. Download each image at full size.
3. Save each download with the **exact filename** shown. Don't rename after Claude cuts them.
4. If a result has words, letters, watermarks, a frame or the wrong background, reply: *"Same image, but remove all text and keep the background pure #FF00FF."* That costs one extra generation, so only do it when needed.

---

## STYLE BLOCK (paste first)

```
You are making game art for "Smith's Classroom 2.0", a bright, friendly school game for high-school students in Orlando, Florida. Every image in this chat must match this style exactly:

- Clean modern cartoon illustration, like a cheerful mobile game. Bold, confident shapes.
- Thick dark charcoal outlines (#2B2B2B) on every object, slightly rounded line ends.
- Flat colors with ONE soft shade tone per color. No gradients, no realistic texture, no photo look.
- Sunny daylight palette. School colors: Grenadier red #C8102E, gold #F2B632, black. Florida touches: palm trees, bright sky, warm brick, stucco.
- Viewpoint for scenes: high three-quarter view looking down (like a top-down town in a cozy life-sim game), so people standing on the ground look natural.
- ABSOLUTELY NO text, letters, numbers, logos, signatures or watermarks anywhere, unless a prompt asks for one single letter.
- When a prompt says "on a #FF00FF background", the background must be one flat, pure magenta #FF00FF with no gradient, no floor, no shadow on the background, no vignette. Nothing in the art itself may use magenta or hot pink.
- When a prompt says "sheet", draw a strict grid of equal invisible cells. Exactly one object per cell, centered, all at the same scale, with generous magenta margin around each object so nothing touches a cell edge or another object.

Reply "ready" and wait for my prompts.
```

---

## PROMPT 1: Plaza background → `plaza_bg.jpg`
*16:9 landscape, 1920×1080 or the largest 16:9 size available. Full scene, no magenta.*

```
Draw the town plaza of "Grenadier Town", a cozy neighborhood next to a Florida high school. 16:9 landscape, high three-quarter top-down view, full-bleed scene with no border.

Layout (this matters, the game puts buttons on top of it):
- Top quarter: a row of cheerful storefront facades (warm brick and pastel stucco) with awnings, palm trees between them, blue sky peeking above. Center top: a gift shop with a big striped red-and-gold awning and a giant wrapped present in the window. 
- Left side: the entrance to a residential street with small houses and a white picket fence, an arch of greenery over the path.
- Right side: an open-air market with three wooden stalls under red, gold and teal awnings, crates of fruit and goods.
- The middle and the entire lower two-thirds: a big, OPEN, empty brick-paved plaza with a circular pattern, perfect for characters to walk around. Keep it uncluttered. A small round fountain slightly below center is fine. A few benches, planters and string lights only along the edges.
- No people, no animals, no vehicles. No text or signs with words.
```

## PROMPT 2: Town banner → `banner_town.jpg`
*Wide banner, about 3.2:1 (1600×500).*

```
Wide panoramic banner, about 3.2 to 1, of Grenadier Town at golden hour: a main street of colorful cartoon houses and shops, palm trees, string lights, a red-and-gold town clock tower in the distance, a few fluffy clouds. Lots of sky on the left third so a title can sit there. No people, no text.
```

## PROMPT 3: Houses sheet → `town_houses_sheet.png`
*Sheet, 4 columns × 2 rows, on #FF00FF. Square-ish, e.g. 2048×1024.*

```
Sheet on a #FF00FF background: 4 columns by 2 rows, 8 cells. In each cell, one small cartoon house exterior seen from a high three-quarter front view, whole house visible, sitting on a small patch of grass with a tiny path. Same scale in every cell. Order, left to right, top row then bottom row:
1. Cozy cottage: cream walls, red roof, flower boxes.
2. Classic red-brick two-story house with white trim.
3. Florida beach house on short stilts: pastel teal siding, white railings, a palm tree.
4. Modern house: flat roof, big glass windows, white and wood panels.
5. Log cabin with a stone chimney and a porch.
6. Treehouse: a cute wooden cabin built in a big oak tree, rope ladder.
7. Penthouse: the rooftop top floor of a sleek tower, glass walls, rooftop garden (just the top section, floating on its grass patch).
8. Grand mansion: white columns, gold trim, red double doors, fountain in front.
No people, no text.
```

## PROMPT 4: Rooms sheet A → `town_rooms_a.png`
*Sheet, 2 columns × 2 rows, overall 16:9 so each cell is 16:9 (e.g. 2048×1152). Full scenes inside each cell, no magenta.*

```
Sheet: 2 columns by 2 rows, each cell a 16:9 interior. Each cell is an EMPTY room, like a dollhouse cutaway seen straight-on and slightly from above: back wall filling the top half, floor filling the bottom half, side walls angled in at the edges. Completely empty: NO furniture, NO rugs, NO pictures on the walls, NO people. Just the walls, windows, floor material and baseboards, so the game can place furniture on top. Thin dark gap between cells.
1 (top-left). Cottage room: cream wallpaper with a tiny flower pattern, warm wood floor, one window with curtains.
2 (top-right). Brick house room: exposed red brick back wall, oak floor, tall window.
3 (bottom-left). Beach house room: pale teal shiplap walls, whitewashed floorboards, round porthole window showing the ocean.
4 (bottom-right). Modern room: white walls, one wall of floor-to-ceiling glass with a city view, polished gray concrete floor.
```

## PROMPT 5: Rooms sheet B → `town_rooms_b.png`
*Same format as Prompt 4.*

```
Same format as the last image: 2 by 2 sheet, each cell a 16:9 EMPTY dollhouse-cutaway room, no furniture, no rugs, no wall decorations, no people.
1 (top-left). Log cabin room: round log walls, stone fireplace built into the wall (no fire tools), plank floor.
2 (top-right). Treehouse room: rough wooden plank walls, a round window with leaves outside, tree branch running across the ceiling.
3 (bottom-left). Penthouse room: dark navy walls, a huge window with a night skyline, glossy black floor with gold trim.
4 (bottom-right). Mansion room: tall cream walls with gold-trimmed panels, a chandelier hook in the ceiling (no chandelier), checkered marble floor.
```

## PROMPT 6: Items sheet A → `town_items_a.png`
*Sheet, 4 columns × 4 rows, on #FF00FF, square (2048×2048 or largest square).*

```
Sheet on a #FF00FF background: 4 columns by 4 rows, 16 cells. One game item per cell, centered, three-quarter front view, consistent scale, no shadow on the background. Order, left to right, row by row:
Row 1: 1 twin bed with a red blanket · 2 wooden bunk bed · 3 canopy bed with gold posts and sheer curtains · 4 red race-car shaped kid's bed
Row 2: 5 gray two-seat sofa · 6 big round gold beanbag · 7 deep-purple velvet couch · 8 red-and-black gamer chair
Row 3: 9 simple wooden study desk with a little desk lamp · 10 low round coffee table with a mug · 11 small arcade cabinet with a glowing screen (no text) · 12 antique globe on a wooden stand
Row 4: 13 round orange rug (seen from above at an angle, flat on the ground) · 14 blue-and-white striped rectangular rug · 15 red rug with a gold border and one big gold letter G in the middle · 16 tall floor lamp with a cream shade
```

## PROMPT 7: Items sheet B → `town_items_b.png`
*Same format as Prompt 6.*

```
Same format as the last image: 4 by 4 sheet on a #FF00FF background, one item per cell, centered, same scale, no background shadow. Order:
Row 1: 1 lava lamp with purple and orange blobs · 2 glowing neon sign in the shape of a lightning bolt (no words) · 3 fern in a terracotta pot · 4 small round cactus in a white pot
Row 2: 5 bonsai tree in a shallow blue pot · 6 mini palm tree in a woven basket · 7 framed motivational poster showing a mountain and a rising arrow (no words) · 8 framed map of the state of Florida, simple and colorful
Row 3: 9 framed print of a supply-and-demand graph: two crossing lines, one red and one blue, on cream paper (no labels) · 10 framed old parchment document with fancy unreadable squiggle handwriting and a big curly first line (no real words) · 11 round wall clock · 12 red triangular pennant with one gold letter G
Row 4: 13 United States flag on a short wall pole · 14 dartboard with three darts · 15 stack of three thick books with a bookmark · 16 shiny golden judge's gavel on a small stand
```

## PROMPT 8: Items sheet C → `town_items_c.png`
*Same format as Prompt 6.*

```
Same format: 4 by 4 sheet on a #FF00FF background, one item per cell, centered, same scale, no background shadow. Leave the last three cells (14, 15, 16) completely empty magenta. Order:
Row 1: 1 small replica of the Liberty Bell with its crack, on a wooden stand · 2 bronze charging-bull statue on a marble base · 3 giant shiny gold coin on a small stand, with a star in the middle · 4 goldfish in a round glass bowl
Row 2: 5 orange tabby cat sitting · 6 friendly golden retriever puppy sitting · 7 red-and-blue macaw parrot on a perch · 8 gopher tortoise (Florida's native tortoise)
Row 3: 9 bald eagle perched on a branch, proud pose · 10 pink flamingo standing on one leg · 11 closed treasure crate: wooden box with red-and-gold metal bands and a gold star lock · 12 the same crate bursting open with golden light and sparkles
Row 4: 13 round app icon: a red map pin containing three tiny houses, gold rim, thick outline · 14 empty · 15 empty · 16 empty
```

---

## Filenames Claude will produce (for reference)
- `v2/assets/town/plaza_bg.jpg`, `v2/assets/town/banner_town.jpg`
- `v2/assets/town/houses/house_{cottage,brick,beach,modern,cabin,treehouse,penthouse,mansion}.webp`
- `v2/assets/town/rooms/room_{cottage,brick,beach,modern,cabin,treehouse,penthouse,mansion}.jpg`
- `v2/assets/town/items/<item id>.webp` (42 items, ids in `town/items.js`)
- `v2/assets/town/ui/crate.webp`, `v2/assets/town/ui/crate_open.webp`, `v2/assets/ui/icons/ico_town.webp`
