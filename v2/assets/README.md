# Smith's Classroom 2.0 — art pack (Batch 1–3)

Generated with Gemini from the 2.0 asset script, then cleaned for the web:

- **Sprites** (`world/buildings`, `npc`, `avatar`, `games/kart|run|quest`, `ui/emblem_crest`): magenta keyed to transparency, including Gemini's darker shadow ovals and enclosed gaps; edges despilled; stray slivers from neighbouring sheet cells removed. Saved as WebP with alpha.
- **Icons, badges, seals** (`ui/icons|badges|seals`): white background keyed to transparency. WebP.
- **Backgrounds, banners, covers, certificate frame**: optimized JPEG.
- `run_shield` came back magenta (same colour as the key), so its bubble was recoloured blue.
- `world/campus_layout.json` gives each building's position on `world_map.jpg` (percent of the map), measured from the map's actual lots.
- `manifest.json` lists every file with its size and any QA note.

144 files, about 5 MB (down from 21 MB).

Known issues to regenerate later: `badge_streak_7` and `badge_streak_30` are cropped at the sides.
