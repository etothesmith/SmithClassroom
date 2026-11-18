# Smith's Classroom Arcade 3.0

Three games built the City Squirrel way: each one is a single self-contained HTML page.

| Game | File | Core loop |
|---|---|---|
| Tardy Wave | `tardy_wave.html` | Three-lane hallway runner. Run through the Answer Door with the right answer to push the homework wave back. 4 zones × 3 doors. |
| Grenadier Express | `grenadier_express.html` | Top-down golf cart. Each package is a question; deliver it to the building with the right answer before the clock runs out. 8 packages a shift. |
| Misconception Panic | `misconception_panic.html` | Arena survivor in the gym. Auto-weapons, idea bulbs, and a question at every level-up (right answer = pick a power-up). Survive 5 minutes. |

## Layout

- `src/core.js`: shared engine. It has the fixed 60 Hz loop, Input (keys/gamepad/touch), Audio2 (synth SFX and music), and the atlas `drawFrame`. It also includes Store, the UI kit, Screens, questions from the student's courses (missed ones come back), the avatar head overlay, and WorldLink rewards (5 coins a run max, 15 a day).
- `src/<game>.js`: one file per game.
- `build/`: the processed art (packed atlases with JSON coordinates and backgrounds), made by `tools/arcade/process_art.py` from Gemini's sheets.
- `covers/`: arcade card art, made by `tools/arcade/make_covers.py`.
- `build.py`: assembles `<game>.html` = page shell + art as base64 + core + game.

## Rebuild and test

```
python3 arcade/build.py                       # after editing src/ or build/
python3 -m http.server 8765 &                 # from the repo root
NODE_PATH=$(npm root -g) node tools/arcade/tests/run.js
```

The tests load each game and play whole runs with bots, answering right and then wrong. They check the outbox rewards and the hub flow (coin cost, payout, back button), and measure the frame rate with the CPU throttled.

Testing hooks live on `window.ARC`: `ARC.press(action)`, `ARC.step(n)`, and `ARC.state.debug()`.
