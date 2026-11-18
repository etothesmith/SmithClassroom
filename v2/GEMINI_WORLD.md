# The bigger world: Gemini art script (4 images, optional)

Everything already works with emoji. These four images replace the emoji with real art. Run them in the same Gemini chat as the Town art if you can, so the style matches.

Save each result at full size with the exact filename, and send them to Claude.

---

## PROMPT 1 → `world_places.png`
```
Sheet, 4 columns by 3 rows, on a flat #FF00FF magenta background. Twelve small cartoon scenes for a bright, friendly school game, each centered in its own cell at the same scale, slight three-quarter view, thick charcoal outlines, flat colors with one soft shade. No people, no text, no letters, no logos.

Row 1: 1. a town plaza with a fountain. 2. a cozy street of small houses with picket fences. 3. a small downtown block of shops and offices. 4. a lakeside boardwalk with a swan boat, a fishing dock and a fountain in the lake (Lake Eola, Orlando).
Row 2: 5. a colorful theme park with a roller coaster loop. 6. a rocket on a launch pad by the ocean (Space Coast). 7. a little skyline of several towns on a map. 8. an open scrapbook album with photos and stickers.
Row 3: 9. a red-and-yellow roller coaster car on a track. 10. a tall drop tower ride. 11. a log flume boat splashing down. 12. a hurricane swirl over a small town with boarded windows.
```

## PROMPT 2 → `world_story.png`
```
Same style, new sheet, 3 columns by 2 rows on flat #FF00FF magenta, one scene per cell, no people, no text:
1. a hurricane swirl symbol over a palm tree. 2. a county fair with a Ferris wheel and booths. 3. a ballot box with a TV news camera. 4. an old parchment charter with a quill pen. 5. a white swan on a clean blue lake with a recycling sign. 6. a stock market chart arrow going up next to a sneaker.
```

## PROMPT 3 → `world_npcs.png`
```
Same style, new sheet, 4 columns by 1 row on flat #FF00FF magenta. Four friendly cartoon townspeople, full body, standing, facing forward, same height, one per cell, no text:
1. a high school coach in a red cap and red polo with a whistle and a clipboard. 2. a stern but kind elderly landlady with glasses, a cardigan and a big ring of keys. 3. a cheerful TV news anchor in a blue suit holding a microphone. 4. a boat captain in a captain's hat and a yellow raincoat holding a fishing rod.
```

## PROMPT 4 → `world_fish.png`
```
Same style, new sheet, 4 columns by 4 rows on flat #FF00FF magenta. Sixteen Florida lake and coast catches, side view, each centered in its own cell, same scale, no text:
Row 1: bluegill, largemouth bass, channel catfish, crappie. Row 2: redear sunfish, tilapia, an old boot, striped mullet. Row 3: Florida gar, peacock bass, snook, a white swan feather. Row 4: redfish, tarpon, Gulf sturgeon, a glowing golden koi.
```

---

## For Claude: what each cell becomes
Saved as `v2/assets/town/world/<name>.webp`.

| Sheet | Row by row, left → right |
|---|---|
| places | plaza, homes, downtown, waterfront / park, space, towns, album / ride_coaster, ride_drop, ride_flume, (spare) |
| story | story_hurricane, story_fair, story_election / story_founders, story_lakes, story_market |
| npcs | npc_coach, npc_pinkerton, npc_ned, npc_rosa |
| fish | fish_bluegill … fish_koi (same order as `FISH` in town/world2.js) |
