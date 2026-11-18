"""Smith's Classroom Arcade — art pipeline.

Raw Gemini images (in RAW) -> keyed, sliced sprites -> one packed atlas per game
(arcade/build/<game>_atlas.webp + <game>_atlas.json) plus backgrounds.

Sheets are cut by object shape (connected components), not by a fixed grid,
because Gemini rarely keeps an exact grid. Objects are grouped into rows by
their vertical centre and sorted left to right; names are assigned in that order.
"""
import json, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage

RAW = sys.argv[1] if len(sys.argv) > 1 else '/tmp/arc/raw'
OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'arcade', 'build')
os.makedirs(OUT, exist_ok=True)


def key(im):
    """Remove flat magenta / pink sheet backgrounds and purple cell borders; despill edges."""
    a = np.asarray(im.convert('RGB')).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mag = np.minimum(r, b) - g
    hueok = np.abs(r - b) < 95
    alpha = np.where(hueok, np.clip((130 - mag) / 70, 0, 1), 1.0)
    spill = np.clip(np.minimum(r, b) - g, 0, None) * (1 - alpha)
    out = a.copy(); out[..., 0] -= spill; out[..., 2] -= spill
    return np.dstack([np.clip(out, 0, 255), alpha * 255]).astype(np.uint8)


def objects(rgba, rows, min_frac=0.0015, grow=7):
    """Return [[(crop RGBA image, bbox), ...] per row] cut by connected shape."""
    al = rgba[..., 3] > 110
    lab, n = ndimage.label(ndimage.binary_dilation(al, iterations=grow))
    H, W = al.shape
    items = []
    for i, sl in enumerate(ndimage.find_objects(lab), 1):
        m = (lab == i) & (rgba[..., 3] > 8)
        if m[sl].sum() < min_frac * H * W: continue
        ys, xs = np.nonzero(m[sl]); y0, x0 = sl[0].start + ys.min(), sl[1].start + xs.min()
        y1, x1 = sl[0].start + ys.max() + 1, sl[1].start + xs.max() + 1
        crop = rgba[y0:y1, x0:x1].copy(); crop[..., 3] = np.where(m[y0:y1, x0:x1], crop[..., 3], 0)
        items.append(dict(img=Image.fromarray(crop, 'RGBA'), cy=(y0 + y1) / 2, cx=(x0 + x1) / 2, bottom=y1, box=(x0, y0, x1, y1)))
    # group into rows by centre y
    items.sort(key=lambda o: o['cy'])
    bands = [[] for _ in range(rows)]
    if rows == 1: bands[0] = items
    else:
        ys = np.array([o['cy'] for o in items])
        # k-means-ish split on sorted gaps
        gaps = np.argsort(np.diff(ys))[::-1][:rows - 1]
        cuts = sorted(gaps)
        start = 0
        for k, c in enumerate(cuts + [len(items) - 1]):
            bands[k] = items[start:c + 1]; start = c + 1
    for b in bands: b.sort(key=lambda o: o['cx'])
    return bands


def fit(img, h=None, w=None, maxside=None):
    s = 1.0
    if h: s = h / img.height
    if w: s = min(s, w / img.width) if h else w / img.width
    if maxside: s = min(s, maxside / max(img.size))
    if s == 1.0: return img
    return img.resize((max(1, round(img.width * s)), max(1, round(img.height * s))), Image.LANCZOS)


def head_ball(img):
    """Find the plain gray head ball in a player frame: returns [cx, cy, r] as fractions of the sprite (x of width, y and r of height)."""
    a = np.asarray(img).astype(np.int16)
    r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
    gray = (al > 200) & (np.abs(r - 201) < 34) & (np.abs(g - 204) < 34) & (np.abs(b - 211) < 34) & ((np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b)) < 22)
    lab, n = ndimage.label(gray)
    if not n: return None
    sz = ndimage.sum(gray, lab, range(1, n + 1)); m = lab == (int(np.argmax(sz)) + 1)
    m = ndimage.binary_fill_holes(m)
    ys, xs = np.nonzero(m)
    cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2
    rad = max(xs.max() - xs.min(), ys.max() - ys.min()) / 2
    H, W = m.shape
    return [round(cx / W, 4), round(cy / H, 4), round(rad / H, 4)]


def pack(name, sprites, maxw=2048, pad=2):
    """Shelf-pack {key: Image} into one atlas; returns meta {key: [x,y,w,h]}."""
    order = sorted(sprites.items(), key=lambda kv: -kv[1].height)
    x = y = shelf = 0; pos = {}
    for k, im in order:
        if x + im.width > maxw: x = 0; y += shelf + pad; shelf = 0
        pos[k] = (x, y); x += im.width + pad; shelf = max(shelf, im.height)
    H = y + shelf
    atlas = Image.new('RGBA', (maxw, H), (0, 0, 0, 0))
    meta = {}
    for k, im in sprites.items():
        atlas.paste(im, pos[k]); meta[k] = [pos[k][0], pos[k][1], im.width, im.height]
    atlas.save(os.path.join(OUT, name + '_atlas.webp'), quality=88, method=6)
    heads = {k: head_ball(im) for k, im in sprites.items() if k.split('_')[0] in ('run0',) or k.rstrip('0123456789') in ('run', 'jump', 'slide', 'trip', 'cheer', 'walk', 'front', 'hurt')}
    meta['_head'] = {k: v for k, v in heads.items() if v}
    json.dump(meta, open(os.path.join(OUT, name + '_atlas.json'), 'w'))
    print(name, 'atlas', atlas.size, len(meta), 'sprites')
    return meta


def sheet(fname, rows, names, size, grow=7, min_frac=0.0015, baseline=False):
    """Cut a sheet; names is a list of rows (lists of names, None to skip). size(name)->(h,w,maxside)."""
    rgba = key(Image.open(os.path.join(RAW, fname)))
    bands = objects(rgba, rows, min_frac=min_frac, grow=grow)
    out = {}
    for r, (band, nms) in enumerate(zip(bands, names)):
        if len(band) < len([n for n in nms if n]):
            print('  WARN', fname, 'row', r, 'found', len(band), 'expected', len(nms))
        for o, nm in zip(band, nms):
            if not nm: continue
            h, w, mx = size(nm)
            out[nm] = fit(o['img'], h=h, w=w, maxside=mx)
    return out


def seamless_h(img, blend=120):
    """Make a background loop horizontally by cross-fading its right edge into its left."""
    a = np.asarray(img.convert('RGB')).astype(np.float32); W = a.shape[1]
    t = np.linspace(0, 1, blend)[None, :, None]
    a[:, W - blend:] = a[:, W - blend:] * (1 - t) + a[:, :blend] * t
    return Image.fromarray(a[:, :W - blend].clip(0, 255).astype(np.uint8))


def bg(fname, outname, h=720, seamless=False, q=82):
    im = Image.open(os.path.join(RAW, fname)).convert('RGB')
    im = im.resize((round(im.width * h / im.height), h), Image.LANCZOS)
    if seamless: im = seamless_h(im)
    im.save(os.path.join(OUT, outname), quality=q, optimize=True)
    print(outname, im.size)


def tile(fname, box, outname, size=256):
    """Cut a square from a texture sheet and make it tile on both axes (offset cross-fade)."""
    im = Image.open(os.path.join(RAW, fname)).convert('RGB').crop(box).resize((size, size), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32); s = size; h = s // 2
    rolled = np.roll(np.roll(a, h, 0), h, 1)
    yy, xx = np.mgrid[0:s, 0:s]
    d = np.minimum(np.minimum(xx, s - 1 - xx), np.minimum(yy, s - 1 - yy)) / h  # 0 at edges -> 1 centre
    wgt = np.clip(d * 2, 0, 1)[..., None]
    out = a * wgt + rolled * (1 - wgt)
    Image.fromarray(out.clip(0, 255).astype(np.uint8)).save(os.path.join(OUT, outname), quality=85)
    print(outname)


if __name__ == '__main__':
    # ---------------- Tardy Wave
    S = {}
    S.update(sheet('tw_player.png', 2,
        [['run0', 'run1', 'run2', 'run3', 'run4', 'run5', 'run6', 'run7', 'run8', 'cheer0'],
         ['jump0', 'jump1', 'jump2', 'jump3', 'slide0', 'slide1', 'trip0', 'trip1', 'cheer1']],
        lambda n: (240, None, None)))
    S.update(sheet('tw_wave.png', 1, [['wave0', 'wave1', 'wave2', 'wave3']], lambda n: (520, None, None), grow=3, min_frac=0.02))
    S.update(sheet('tw_obstacles.png', 4,
        [['locker', 'wetsign', 'mop', 'bags'], ['trays', 'spaghetti', 'trashcan', 'lunchcart'],
         ['dodgeballs', 'hurdle', 'gymmat', 'ballrack'], ['bookcart', 'bookshelf', 'globe', 'beanbag']],
        lambda n: (None, None, 220)))
    S.update(sheet('tw_ui.png', 3,
        [['door', 'door_open', 'door_slam', 'banner'], ['coin', 'boost', 'flag', 'clock'], [None, None, None, None]],
        lambda n: (300, None, None) if n.startswith('door') else (None, None, 360 if n == 'banner' else 128)))
    pack('tardy_wave', S)
    for z in ('hallway', 'cafeteria', 'gym', 'library'):
        bg(f'tw_bg_{z}.jpg', f'tw_bg_{z}.jpg', h=720, seamless=True)

    # ---------------- Grenadier Express
    S = {}
    S.update(sheet('ge_vehicles.png', 2,
        [['cart', 'cart_drift', 'bus', 'security'], ['truck', 'scooter', 'student0', 'student1']],
        lambda n: (None, None, {'bus': 300, 'truck': 230, 'cart': 150, 'cart_drift': 170, 'security': 150, 'scooter': 120}.get(n, 90)), grow=4))
    S.update(sheet('ge_buildings.png', 2,
        [['b_library', 'b_gym', 'b_cafeteria', 'b_science'], ['b_office', 'b_auditorium', 'b_band', 'b_stadium']],
        lambda n: (None, 330, None)))
    S.update(sheet('ge_props.png', 4,
        [['cone', 'barrier', 'bench', 'trash'], ['palm', 'oak', 'bush', 'fountain'],
         ['package', 'ring_green', 'ring_gold', 'arrow'], ['coin', 'stopwatch', 'skid', 'smoke']],
        lambda n: (None, None, {'palm': 190, 'oak': 200, 'fountain': 220, 'ring_green': 200, 'ring_gold': 200, 'bush': 140}.get(n, 110)), grow=4))
    pack('grenadier_express', S)
    tile('ge_ground.png', (40, 40, 360, 360), 'ge_grass.jpg')
    tile('ge_ground.png', (730, 60, 1050, 380), 'ge_brick.jpg')

    # ---------------- Misconception Panic
    S = {}
    S.update(sheet('mp_player.png', 2, [['walk0', 'walk1', 'walk2', 'walk3'], ['front0', 'front1', 'hurt', 'cheer']],
        lambda n: (200, None, None)))
    S.update(sheet('mp_monsters_econ.png', 2,
        [['blob0', 'blob1', 'dragon0', 'dragon1'], ['moth0', 'moth1', 'troll0', 'troll1']],
        lambda n: (None, None, 150), grow=4))
    S.update(sheet('mp_monsters_gov.png', 2,
        [['sloth0', 'sloth1', 'snake0', 'snake1'], ['gremlin0', 'gremlin1', 'mummy0', 'mummy1']],
        lambda n: (None, None, 150), grow=4))
    S.update(sheet('mp_bosses.png', 1, [['boss_hydra', 'boss_golem']], lambda n: (None, None, 380)))
    S.update(sheet('mp_fx.png', 4,
        [['chalk', 'eraser', 'book', 'ruler'], ['orb', 'orb_big', 'heart', 'magnet'],
         ['up_speed', 'up_chalk', 'up_eraser', 'up_calc'], ['up_pencil', 'up_shield', 'poof', 'spark']],
        lambda n: (None, None, 120 if n.startswith('up_') else 96)))
    pack('misconception_panic', S)
    Image.open(os.path.join(RAW, 'mp_arena.jpg')).convert('RGB').resize((1600, 1600), Image.LANCZOS).save(os.path.join(OUT, 'mp_arena.jpg'), quality=80)
    Image.open(os.path.join(RAW, 'arcade_backdrop.jpg')).convert('RGB').resize((1280, 714), Image.LANCZOS).save(os.path.join(OUT, 'arcade_backdrop.jpg'), quality=80)
