# Downtown buildings and landmarks: Gemini art script (2 images)

Downtown already works with emoji. These two sheets replace the emoji with real buildings.
Run them in the same Gemini chat as the Town pack if you still have it, so the style matches.

Save each result at full size with the exact filename, and send both to Claude.

---

## PROMPT 1 → `downtown_buildings.png`
```
Sheet, 4 columns by 4 rows, on a flat #FF00FF magenta background. Sixteen small cartoon town buildings for a bright, friendly school game, each centered in its own cell, all at the same scale, seen from a slight three-quarter view, thick charcoal outlines, flat colors with one soft shade, a little patch of sidewalk under each. No people, no text, no letters, no numbers, no logos. Use simple icons on the signs instead of words.

Row 1: 1. a small clinic with a red cross on the sign. 2. an animal hospital with a paw print on the sign. 3. a newspaper office with a rolled newspaper on the sign. 4. a classic bank with columns and a coin on the sign.
Row 2: 5. a red fire station with an open garage door and a fire truck nose peeking out. 6. a sheriff's office with a gold star on the sign. 7. a courthouse with columns and a scales-of-justice icon. 8. a tutoring center with a stack of books on the sign.
Row 3: 9. a post office with a mailbox in front and an envelope icon. 10. a cozy café with a striped awning and a steaming cup icon. 11. a construction yard with a small crane and stacked bricks. 12. a sanitation depot with a small garbage truck and recycling bins.
Row 4: 13. a park ranger station: a small wooden cabin with trees. 14. a photo studio with a big camera icon. 15. a community bulletin board under a little roof, covered in colorful notes (no writing). 16. a town hall with a clock tower and a flag.
```

## PROMPT 2 → `downtown_landmarks.png`
```
Same style, new sheet, 4 columns by 4 rows on flat #FF00FF magenta. Sixteen town landmarks, each centered in its own cell, same scale, slight three-quarter view, no people, no text:

Row 1: 1. an outdoor basketball court with a hoop. 2. a skate park with ramps. 3. a fenced dog park with a fire hydrant and a ball. 4. a swimming pool with a diving board.
Row 2: 5. a public library building with big windows. 6. a community garden with raised beds and sunflowers. 7. a food court with three little food stands. 8. a tall Wi-Fi tower with signal waves.
Row 3: 9. a bus stop with a bench and a shelter. 10. a solar farm with rows of solar panels. 11. a small movie theater with a marquee of light bulbs (no words). 12. a gym building with a dumbbell icon.
Row 4: 13. a history museum with columns and a vase icon. 14. a petting zoo with a giraffe and a goat behind a fence. 15. a small football field with goalposts. 16. a colorful street mural on a brick wall (abstract shapes only).
```

---

## For Claude: what each cell becomes
Saved as `v2/assets/town/downtown/<name>.webp`.

| Sheet | Row by row, left → right |
|---|---|
| buildings | doctor, vet, reporter, banker / firefighter, marshal, judge, tutor / mail, chef, builder, sanitation / ranger, photographer, board, hall |
| landmarks | land_court, land_skate, land_dogpark, land_pool / land_library, land_garden, land_food, land_wifi / land_bus, land_solar, land_theater, land_gym / land_museum, land_zoo, land_field, land_mural |
