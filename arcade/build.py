#!/usr/bin/env python3
"""Assemble each arcade game into one self-contained HTML file (City Squirrel style).

    python3 arcade/build.py            # builds arcade/<game>.html for all three games

Each file = page shell + ASSETS (atlas webp + backgrounds as base64 data URLs,
atlas coordinates as JSON) + src/core.js + src/<game>.js. The games load the
hub's question bank (../content.js) and reward bridge (../world-link.js).
"""
import base64, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
B = os.path.join(HERE, 'build')

GAMES = {
    'tardy_wave': {'title': 'Tardy Wave', 'atlas': 'tardy_wave',
                   'img': {'hallway': 'tw_bg_hallway.jpg', 'cafeteria': 'tw_bg_cafeteria.jpg', 'gym': 'tw_bg_gym.jpg', 'library': 'tw_bg_library.jpg'}},
    'grenadier_express': {'title': 'Grenadier Express', 'atlas': 'grenadier_express',
                          'img': {'grass': 'ge_grass.jpg', 'brick': 'ge_brick.jpg'}},
    'misconception_panic': {'title': 'Misconception Panic', 'atlas': 'misconception_panic',
                            'img': {'arena': 'mp_arena.jpg'}},
}

SHELL = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>{title} · Smith's Classroom Arcade</title>
<style>
@font-face{{font-family:"Baloo 2";font-weight:800;font-display:swap;src:url(../fonts/baloo-2-latin-800-normal.woff2) format("woff2")}}
@font-face{{font-family:"Nunito";font-weight:700;font-display:swap;src:url(../fonts/nunito-latin-700-normal.woff2) format("woff2")}}
@font-face{{font-family:"Nunito";font-weight:600;font-display:swap;src:url(../fonts/nunito-latin-600-normal.woff2) format("woff2")}}
html,body{{margin:0;height:100%;background:#1d1a33;overflow:hidden;touch-action:none;-webkit-user-select:none;user-select:none}}
body{{display:flex;align-items:center;justify-content:center}}
canvas{{display:block;background:#000;image-rendering:auto;touch-action:none;outline:none}}
</style></head><body>
<canvas id="cv" width="1280" height="720" tabindex="0"></canvas>
<script src="../content.js"></script>
<script src="../world-link.js"></script>
<script>
const ASSETS = {assets};
</script>
<script>
{core}
</script>
<script>
{game}
</script>
</body></html>
"""


def data_url(path):
    ext = os.path.splitext(path)[1].lower()
    mime = {'.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png'}[ext]
    return 'data:%s;base64,%s' % (mime, base64.b64encode(open(path, 'rb').read()).decode())


def build(gid):
    g = GAMES[gid]
    meta = json.load(open(os.path.join(B, g['atlas'] + '_atlas.json')))
    assets = {'atlas': data_url(os.path.join(B, g['atlas'] + '_atlas.webp')), 'meta': meta,
              'img': {k: data_url(os.path.join(B, v)) for k, v in g['img'].items()}}
    core = open(os.path.join(HERE, 'src', 'core.js')).read()
    game = open(os.path.join(HERE, 'src', gid + '.js')).read()
    html = SHELL.format(title=g['title'], assets=json.dumps(assets, separators=(',', ':')), core=core, game=game)
    out = os.path.join(HERE, gid + '.html')
    open(out, 'w').write(html)
    print('%-22s %6.0f KB' % (gid + '.html', os.path.getsize(out) / 1024))


if __name__ == '__main__':
    for gid in (sys.argv[1:] or GAMES):
        if os.path.exists(os.path.join(HERE, 'src', gid + '.js')):
            build(gid)
