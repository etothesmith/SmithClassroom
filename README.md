# Smith's Classroom — tested build

## What to upload

Everything in this folder, keeping the structure exactly as-is:

```
index.html
art.js
content.js
assets/          <- 60 .png files
```

`assets/` must sit beside `index.html`. Drop all four items into the root of
the `SmithClassroom` repo and commit. Nothing else needs to change.

## Still to add

Three music files are referenced by the jukebox but were not in the zip:

- `Where_the_Knowledge_Flows.mp3`
- `Choose_Your_Own_Hero.mp3`
- `The_Final_Frame.mp3`

Put them next to `index.html` when you have them. Until then the jukebox
shows "Can't find <file>" and disables its play button — nothing else breaks,
and the game show still opens normally on a silent title card.

## What changed

**Art moved out of JavaScript.** It was ~1.4 MB of base64 text inside
`art.js`, which the browser had to download and parse in full before the page
could paint. It is now 60 real `.png` files in `assets/`, and `art.js` is a
4 KB map of key to path. Initial download went from 1.33 MB to 219 KB gzipped.

**Missing-art requests removed.** `art()` used to guess a path for any key it
didn't recognise, asking the server for files that were never shipped — the 19
`bg_*` zone backdrops meant a 404 every time a student picked a zone. It now
returns nothing and lets the painted fallback take over.

**Shuttle traffic fixed.** The seven `racer_*` sprites pointed at pose names
that weren't in the art pack, so Campus Shuttle drew pink rectangles instead of
vehicles. They now point at the kart sprites, which exist.

**Sprite cache added.** `spriteOf()` built a fresh `Image` on every call. With
real files that let a game start before its sprites had decoded — harmless for
most draws, but Campus Taxi bakes the ground tile into a texture once, so a
late tile left the map permanently bare. One image per file now.

**`support.js` dropped.** Nothing referenced it; it was a build artefact from
an unrelated tool.

## Test results

Chromium, served over HTTP from a plain static server.

| Check | Result |
|---|---|
| Page errors across all tabs and flows | 0 |
| Failed requests | 0 (except the 3 mp3s above) |
| Smith's Run, Campus Shuttle, Campus Taxi, Smith's Quest, Chalk Brigade | all run, all render, all score |
| Study episodes, flashcards, match, laser, solo jeopardy | pass |
| Practice, exam, certificates, teacher tab, save export | pass |
| Full game show: setup, names, topics, round, buzz, score, quit | pass |
| English and Spanish toggle | pass |

Load time on a throttled connection with 120 ms latency:

| Link speed | Before | After |
|---|---|---|
| 1500 kbps | 11.6 s | 4.5 s |
| 600 kbps | 28.5 s | 10.7 s |
