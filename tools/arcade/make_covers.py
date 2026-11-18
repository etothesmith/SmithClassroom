"""Arcade card covers (960x300) from the game art. Prints where the gray head
ball sits (as % of the cover) so the hub can lay the student's own head on it."""
import json
from PIL import Image, ImageDraw
B = 'arcade/build/'
W, H = 960, 300

def atlas(g):
    return Image.open(B + g + '_atlas.webp').convert('RGBA'), json.load(open(B + g + '_atlas.json'))

def spr(at, name, h, flip=False, rot=0):
    im, m = at; x, y, w, hh = m[name]; s = im.crop((x, y, x + w, y + hh)).resize((max(1, int(w * h / hh)), h), Image.LANCZOS)
    if flip: s = s.transpose(Image.FLIP_LEFT_RIGHT)
    if rot: s = s.rotate(rot, expand=True, resample=Image.BICUBIC)
    return s

def put(c, s, cx, by):
    c.alpha_composite(s, (int(cx - s.width / 2), int(by - s.height)))

def face(im, g, name, cx, by, h):
    """paint a default face on the gray ball and return its % box for the hub's head overlay"""
    m = json.load(open(B + g + '_atlas.json')); x, y, w, hh = m[name]; hb = m['_head'][name]; sw = w * h / hh
    bx, byy, r = cx - sw / 2 + hb[0] * sw, by - h + hb[1] * h, hb[2] * h
    d = ImageDraw.Draw(im)
    d.ellipse((bx - r * 1.04, byy - r * 1.04, bx + r * 1.04, byy + r * 1.04), fill=(242, 200, 160), outline=(43, 45, 66), width=3)
    d.chord((bx - r * 1.06, byy - r * 1.06, bx + r * 1.06, byy + r * 0.5), 180, 360, fill=(74, 44, 26), outline=(43, 45, 66), width=3)
    for ex in (0.22, 0.58): d.ellipse((bx + r * ex - r * 0.11, byy - r * 0.16, bx + r * ex + r * 0.11, byy + r * 0.06), fill=(43, 45, 66))
    d.arc((bx + r * 0.13, byy - r * 0.05, bx + r * 0.63, byy + r * 0.45), 20, 160, fill=(43, 45, 66), width=3)
    S = 2 * r * 0.96 / 0.49
    return dict(left=round((bx - S / 2) / W * 100, 2), top=round((byy - 0.536 * S) / H * 100, 2), w=round(S / W * 100, 2), visH=round(S * 0.87 / H * 100, 2))

out = {}
# Tardy Wave
at = atlas('tardy_wave'); bg = Image.open(B + 'tw_bg_hallway.jpg').convert('RGBA'); k = H / bg.height * 1.25
bg = bg.resize((int(bg.width * k), int(bg.height * k))); t = Image.new('RGBA', (bg.width * 2, bg.height)); t.paste(bg, (0, 0)); t.paste(bg, (bg.width, 0))
c = t.crop((60, 40, 60 + W, 40 + H))
put(c, spr(at, 'wave1', 300), 150, 330); put(c, spr(at, 'run3', 170), 470, 292)
for i in range(4): put(c, spr(at, 'coin', 36), 580 + i * 45, 220)
put(c, spr(at, 'door', 175), 860, 292); put(c, spr(at, 'wetsign', 70), 690, 292)
c = c.convert('RGB'); out['tardy_wave'] = face(c, 'tardy_wave', 'run3', 470, 292, 170); c.save('arcade/covers/tardy_wave.jpg', quality=86)
# Grenadier Express
at = atlas('grenadier_express'); g = Image.open(B + 'ge_grass.jpg').convert('RGBA'); c = Image.new('RGBA', (W, H))
for x in range(0, W, 256):
    for y in range(0, H, 256): c.paste(g, (x, y))
d = ImageDraw.Draw(c); d.rectangle((0, 200, W, 290), fill=(91, 95, 110, 255)); d.rectangle((0, 200, W, 204), fill=(232, 228, 216, 255)); d.rectangle((0, 286, W, 290), fill=(232, 228, 216, 255))
for x in range(0, W, 70): d.rectangle((x, 243, x + 36, 247), fill=(255, 210, 63, 255))
put(c, spr(at, 'b_library', 200), 120, 205); put(c, spr(at, 'b_band', 175), 470, 205); put(c, spr(at, 'b_stadium', 170), 810, 205)
put(c, spr(at, 'oak', 110), 300, 200); put(c, spr(at, 'palm', 100), 640, 200)
put(c, spr(at, 'cart', 90, rot=-90), 380, 280); put(c, spr(at, 'package', 44), 320, 236); put(c, spr(at, 'bus', 110, rot=90), 800, 292); put(c, spr(at, 'cone', 40), 560, 284)
c.convert('RGB').save('arcade/covers/grenadier_express.jpg', quality=86)
# Misconception Panic
at = atlas('misconception_panic'); bg = Image.open(B + 'mp_arena.jpg').convert('RGBA')
c = bg.crop((100, 760, 1500, 1198)).resize((W, H))
put(c, spr(at, 'boss_hydra', 220, flip=True), 790, 290)
for n, x, y in [('blob0', 90, 290), ('snake1', 230, 250), ('moth0', 600, 160), ('gremlin1', 180, 160), ('sloth0', 930, 160), ('troll1', 620, 290)]:
    put(c, spr(at, n, 80, flip=x > 470), x, y)
put(c, spr(at, 'front0', 150), 420, 290); put(c, spr(at, 'chalk', 26), 510, 200); put(c, spr(at, 'orb_big', 30), 330, 280); put(c, spr(at, 'eraser', 34), 350, 180)
c = c.convert('RGB'); out['misconception_panic'] = face(c, 'misconception_panic', 'front0', 420, 290, 150); c.save('arcade/covers/misconception_panic.jpg', quality=86)
print(json.dumps(out))
