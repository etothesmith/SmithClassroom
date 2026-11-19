"""Cut Gemini-dressed mannequins into avatar clothing layers.

usage: python3 tools/extract_clothes.py SHEET.png N top|bottom START_COL [TOP_MAX] [FULL_IDX,..]
  SHEET  Gemini output dressed on mannequins_N.png (N = 4 or 5)
  Writes assets/av3/av-{top|bot}-{shape}-{col}.webp for all 4 shapes and
  ic3-{top|bot}-{col}.webp icons, starting at START_COL.

The mannequin templates are the athletic body (skin 2) scaled 1.9x, one per
400 px cell, body layer origin at (cell*400 + 65 - 48*1.9, 73 - 70*1.9).
"""
import sys, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

AV = "assets/av3/"
SC = 1.9
sheet, N, kind, col0 = sys.argv[1], int(sys.argv[2]), sys.argv[3], int(sys.argv[4])
TOP_MAX = int(sys.argv[5]) if len(sys.argv) > 5 else 400        # raise for dresses
# figures (0-based) wearing full-length pants: keep everything below the waist,
# because skin-colored fabric (khaki, cream) can't be told from bare legs by color
FULL = {int(v) for v in sys.argv[6].split(",") if v} if len(sys.argv) > 6 else set()
g = Image.open(sheet).convert("RGB")
TW = 400 * N
k = g.width / TW                       # Gemini rescale of the template
body = Image.open(AV + "av-body-athletic-2.webp").convert("RGBA")
bA = np.array(body)
bodymask = bA[:, :, 3] > 128

def figures(img):
    """per figure: head top, feet bottom and head center x, found from the non-magenta mask"""
    a = np.array(img.convert("RGB")).astype(int)
    m = ~((a[:, :, 0] > 150) & (a[:, :, 1] < 120) & (a[:, :, 2] > 150))
    cols = np.where(m.sum(0) > 3)[0]; runs = []; s0 = p0 = cols[0]
    for c in cols[1:]:
        if c > p0 + 6: runs.append((s0, p0)); s0 = c
        p0 = c
    runs.append((s0, p0)); runs = [r for r in runs if r[1] - r[0] > 20]
    out = []
    for x0, x1 in runs:
        rows = np.where(m[:, x0:x1 + 1].sum(1) > 0)[0]; y0, y1 = rows.min(), rows.max()
        head = m[y0:y0 + max(4, (y1 - y0) // 14), x0:x1 + 1]; hx = np.where(head.sum(0) > 0)[0]
        out.append((y0, y1, x0 + (hx.min() + hx.max()) / 2))
    return out
TF = figures(Image.open(f"v2/gemini/mannequins_{N}.png")); GF = figures(g)
assert len(TF) == N and len(GF) == N, (len(TF), len(GF))
def crop_layer(i, dx=0, dy=0):
    ox = i * 400 + 65 - 48 * SC
    oy = 73 - 70 * SC
    ty0, ty1, tx = TF[i]; gy0, gy1, gx = GF[i]; s = (gy1 - gy0) / (ty1 - ty0)
    X = lambda x: gx + (x - tx) * s + dx; Y = lambda y: gy0 + (y - ty0) * s + dy
    box = (X(ox), Y(oy), X(ox + 240 * SC), Y(oy + 600 * SC))
    return g.transform((240 * 2, 600 * 2), Image.EXTENT, box, Image.BICUBIC, fillcolor=(255, 0, 255)).resize((240, 600), Image.LANCZOS)

def magenta(a):
    return (a[:, :, 0] > 170) & (a[:, :, 1] < 110) & (a[:, :, 2] > 170)

def register(i):
    # align on the legs (below the shorts), which Gemini should not change
    best = None
    for dy in range(-9, 10, 3):
        for dx in range(-9, 10, 3):
            a = np.array(crop_layer(i, dx, dy)).astype(int)
            m = ~magenta(a)
            sc = (m[400:560] == bodymask[400:560]).mean()
            if best is None or sc > best[0]: best = (sc, dx, dy)
    return best

def extract(i):
    full = kind == "bottom" and i in FULL
    sc, dx, dy = register(i)
    a = np.array(crop_layer(i, dx, dy)).astype(int)
    fg = ~magenta(a)
    ref = bA[:, :, :3].astype(int)
    diff = np.abs(a - ref).sum(2)
    r, gg, b = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    lum = a.sum(2) / 3
    skin = (r > gg + 12) & (gg > b + 18) & (r > 120) & (r < 235) & (abs(r - 200) < 45) & (diff < 90)   # skin-colored AND unchanged from the mannequin
    gray = (abs(r - gg) < 14) & (abs(gg - b) < 14) & (lum > 110) & (lum < 185)
    dark = lum < 70
    y = np.arange(600)[:, None] * np.ones((1, 240))
    if kind == "top":
        # shorts begin around y=300 on athletic; gray there is the shorts
        cand = fg & ~skin & ~(gray & (y > 292) & (diff < 60))
        cand &= (y > 135) & (y < TOP_MAX)
    else:
        if full:
            cand = fg & ~(gray & (y < 300) & (diff < 60)) & ~(skin & (y < 300))
        else:
            cand = fg & ~skin & ~(gray & (y < 300) & (diff < 60))
        cand &= (y > 270)
    cand = ndi.binary_opening(cand, iterations=2)
    lab, n = ndi.label(cand)
    if n:
        sizes = ndi.sum(cand, lab, range(1, n + 1))
        keep = np.isin(lab, 1 + np.where(sizes > 150)[0])
    else:
        keep = cand
    keep = ndi.binary_closing(keep, iterations=6 if full else 3)
    keep = ndi.binary_fill_holes(keep)
    # pull in the dark outline around the clothing
    ring = ndi.binary_dilation(keep, iterations=3) & dark & fg
    keep = keep | ring
    keep = ndi.binary_fill_holes(keep)
    # drop skin that got enclosed (e.g. neck opening is already open; this is the midriff)
    if not full:
        keep &= ~(skin & ~ndi.binary_erosion(keep, iterations=2)) | dark
    else:
        # the mannequin's own hands rest at the hips: drop untouched skin there
        hand = skin & (diff < 15) & (y < 395)
        keep &= ~ndi.binary_dilation(hand, iterations=1)
    keep &= fg
    keep = ndi.binary_opening(keep, iterations=1) | (keep & dark)
    # JPEG bleeds magenta into the outline: shave one pixel and despill
    edge = keep & ~ndi.binary_erosion(keep, iterations=1)
    keep &= ~(edge & ~dark)
    spill = (a[:, :, 0] - a[:, :, 1] > 45) & (a[:, :, 2] - a[:, :, 1] > 45)
    near = ~ndi.binary_erosion(keep, iterations=3)
    a[spill & near] = (43, 43, 43)
    alpha = Image.fromarray((keep * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    out = Image.fromarray(a.astype(np.uint8)).convert("RGBA")
    out.putalpha(alpha)
    return out, (sc, dx, dy)

# body-width warp: per row, map athletic silhouette span to the target's
def spans(shape):
    m = np.array(Image.open(AV + f"av-body-{shape}-2.webp"))[:, :, 3] > 128
    out = []
    for yy in range(600):
        xs = np.where(m[yy])[0]
        out.append((xs.min(), xs.max()) if len(xs) else None)
    return out

def vband(shape):
    bb = Image.open(AV + f"av-body-{shape}-2.webp").getbbox()
    return bb[1], bb[3]

A = spans("athletic"); ay0, ay1 = vband("athletic")
def warp(img, shape):
    if shape == "athletic": return img
    T = spans(shape); ty0, ty1 = vband(shape)
    src = np.array(img).astype(float)
    src[:, :, :3] *= src[:, :, 3:4] / 255          # premultiply
    SY = np.zeros((600, 240)); SX = np.zeros((600, 240)); ok = np.zeros((600, 240), bool)
    for yy in range(600):
        sy = ay0 + (yy - ty0) * (ay1 - ay0) / (ty1 - ty0)
        si = int(round(sy))
        if not (0 <= si < 600) or A[si] is None or T[yy] is None: continue
        a0, a1 = A[si]; t0, t1 = T[yy]
        SY[yy] = sy; SX[yy] = a0 + (np.arange(240) - t0) * (a1 - a0) / max(1, t1 - t0); ok[yy] = True
    out = np.stack([ndi.map_coordinates(src[:, :, c], [SY, SX], order=1, cval=0) for c in range(4)], 2)
    out[~ok] = 0
    al = out[:, :, 3:4]
    out[:, :, :3] = np.where(al > 0, out[:, :, :3] * 255 / np.maximum(al, 1), 0)
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))

pre = "top" if kind == "top" else "bot"
for i in range(N):
    lay, reg = extract(i)
    col = col0 + i
    for s in ["slim", "athletic", "curvy", "plus"]:
        warp(lay, s).save(AV + f"av-{pre}-{s}-{col}.webp", quality=90, method=6)
    bb = lay.getbbox()
    c = lay.crop(bb); c.thumbnail((140, 140), Image.LANCZOS)
    ic = Image.new("RGBA", (160, 160)); ic.paste(c, ((160 - c.width) // 2, (160 - c.height) // 2), c)
    ic.save(AV + f"ic3-{pre}-{col}.webp", quality=90, method=6)
    print(i, col, reg, bb)
