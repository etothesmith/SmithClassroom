"""Rebuild the slim / curvy / plus versions of clothes from the athletic art.

usage: python3 tools/refit_clothes.py
For each garment in REFIT, the athletic layer is reshaped row by row so that the
athletic body's outline (outer edge and the gray base-layer edge) lands on the
target body's outline. Bottoms also lose any pixels drawn over the hands.
"""
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

A = "assets/av3/"
REFIT = {"top": range(10, 32), "bot": range(8, 20)}
SHAPES = ["slim", "curvy", "plus"]
import sys as _s
if "--plus" in _s.argv: SHAPES = ["plus"]

def core_outline(shape):
    """per row: [L, mid, mid, R] of the body without its arms (for bottoms)"""
    al = np.zeros((600, 240), bool)
    for k in range(8): al |= np.array(Image.open(f"{A}av-body-{shape}-{k}.webp").convert("RGBA").resize((240, 600)))[..., 3] > 100
    al &= ~arm_mask(shape); rows = []
    for y in range(600):
        xs = np.where(al[y])[0]
        if not len(xs): rows.append(None); continue
        rows.append([xs.min(), None, None, xs.max()])
    return rows

def outline(shape):
    """per row: [bodyL, grayL, grayR, bodyR] (gray = the base tank/shorts), unioned over all 8 skins"""
    alpha = np.zeros((600, 240), bool); gray = np.zeros((600, 240), bool)
    for s in range(8):
        a = np.array(Image.open(f"{A}av-body-{shape}-{s}.webp").convert("RGBA").resize((240, 600))).astype(int)
        al = a[..., 3] > 128; rgb = a[..., :3]
        g = al & (rgb.max(-1) - rgb.min(-1) < 14) & (rgb.mean(-1) > 90) & (rgb.mean(-1) < 200)
        alpha |= al; gray |= g
    gray = ndi.binary_opening(gray, iterations=1)
    rows = []
    for y in range(600):
        xs = np.where(alpha[y])[0]; gs = np.where(gray[y])[0]
        if not len(xs): rows.append(None); continue
        L, R = xs.min(), xs.max()
        gl, gr = (gs.min(), gs.max()) if len(gs) > 6 else (None, None)
        rows.append([L, gl, gr, R])
    return rows, alpha, gray

def anchors(rows, y):
    r = rows[y]
    if r is None: return None
    L, gl, gr, R = r
    return [L, gl, gr, R] if gl is not None else [L, (L + R) / 2, (L + R) / 2 + 0.01, R]

def smooth_maps(src_rows, dst_rows):
    """target-x -> source-x anchor pairs for every row, smoothed down the body"""
    S, D = np.full((600, 4), np.nan), np.full((600, 4), np.nan)
    for y in range(600):
        a, b = anchors(src_rows, y), anchors(dst_rows, y)
        if a is None or b is None: continue
        if (src_rows[y][1] is None) != (dst_rows[y][1] is None):          # gray in one but not the other: use edges only
            a = [a[0], (a[0] + a[3]) / 2, (a[0] + a[3]) / 2 + .01, a[3]]; b = [b[0], (b[0] + b[3]) / 2, (b[0] + b[3]) / 2 + .01, b[3]]
        S[y], D[y] = a, b
    for arr in (S, D):                                                     # fill gaps (head, feet) from neighbours, then smooth
        for k in range(4):
            col = arr[:, k]; ok = ~np.isnan(col)
            col[~ok] = np.interp(np.where(~ok)[0], np.where(ok)[0], col[ok]); arr[:, k] = ndi.median_filter(col, 9); arr[:, k] = ndi.gaussian_filter1d(arr[:, k], 6)
    return S, D

def warp(img, S, D):
    a = np.array(img.convert("RGBA").resize((240, 600))).astype(float)
    pre = a.copy(); pre[..., :3] *= a[..., 3:4] / 255
    out = np.zeros_like(a); xs = np.arange(240, dtype=float)
    for y in range(600):
        d, s = D[y], S[y]
        if not np.all(np.diff(d) > 0) or not np.all(np.diff(s) > 0): d, s = np.sort(d), np.sort(s)
        # outside the body keep the outer segments' scale
        lo = (s[1] - s[0]) / max(d[1] - d[0], 1e-3); hi = (s[3] - s[2]) / max(d[3] - d[2], 1e-3)
        dd = np.concatenate([[d[0] - 200], d, [d[3] + 200]]); ss = np.concatenate([[s[0] - 200 * lo], s, [s[3] + 200 * hi]])
        src = np.interp(xs, dd, ss)
        x0 = np.clip(np.floor(src).astype(int), 0, 239); x1 = np.clip(x0 + 1, 0, 239); f = (src - np.floor(src))[:, None]
        row = pre[y, x0] * (1 - f) + pre[y, x1] * f
        row[(src < 0) | (src > 239)] = 0
        out[y] = row
    al = out[..., 3:4]; rgb = np.where(al > 0, out[..., :3] * 255 / np.maximum(al, 1e-3), 0)
    return Image.fromarray(np.dstack([np.clip(rgb, 0, 255), np.clip(al, 0, 255)]).astype(np.uint8), "RGBA")

def hands(rows, alpha, gray):
    """body pixels outside the gray base layer between the shoulders and the bottom of the shorts: the arms and hands"""
    m = np.zeros((600, 240), bool); ys = np.where(gray.any(1))[0]; y1 = ys.max() if len(ys) else 420
    for y in range(140, y1 + 1):
        r = rows[y]
        if r is None or r[1] is None: continue
        m[y, :max(0, r[1] - 1)] = alpha[y, :max(0, r[1] - 1)]; m[y, r[2] + 2:] = alpha[y, r[2] + 2:]
    return ndi.binary_dilation(m, iterations=1)

def arm_mask(shape="athletic"):
    """the arms and hands: the outer pieces of each body row, where a gap separates them from the torso/legs"""
    al = np.zeros((600, 240), bool)
    for k in range(8): al |= np.array(Image.open(f"{A}av-body-{shape}-{k}.webp").convert("RGBA").resize((240, 600)))[..., 3] > 100
    m = np.zeros_like(al)
    for y in range(150, 440):
        lab, n = ndi.label(al[y])
        if n < 3: continue
        segs = [np.where(lab == j)[0] for j in range(1, n + 1)]
        for sg in (segs[0], segs[-1]):
            if len(sg) < 40: m[y, sg] = True
    return ndi.binary_dilation(m, iterations=2)
ARM = None
def clean_hands(img, mask=None):
    """drop separate specks drawn over the hands: pieces not joined to the garment, at the sides, above the feet"""
    global ARM
    if ARM is None: ARM = arm_mask()
    a = np.array(img.convert("RGBA").resize((240, 600))); a[..., 3][ARM] = 0; solid = a[..., 3] > 40
    lab, n = ndi.label(ndi.binary_dilation(solid, iterations=1))
    for j, sl in enumerate(ndi.find_objects(lab), 1):
        if sl is None: continue
        ys, xs = sl; cy, cx = (ys.start + ys.stop) / 2, (xs.start + xs.stop) / 2; area = (lab[sl] == j).sum()
        if cy < 430 and (cx < 78 or cx > 162) and area < 1500: a[..., 3][lab == j] = 0
    return Image.fromarray(a, "RGBA")

if __name__ == "__main__":
    import sys
    ONLY_WARP = "--warp-only" in sys.argv          # athletic bottoms were already cleaned
    ath = outline("athletic"); hand_ath = hands(*ath)
    MAPS = {sh: smooth_maps(ath[0], outline(sh)[0]) for sh in SHAPES}
    core_a = core_outline("athletic"); BMAPS = {sh: smooth_maps(core_a, core_outline(sh)) for sh in SHAPES}
    if "--bottoms" in sys.argv: REFIT = {"bot": REFIT["bot"]}
    for kind, ids in REFIT.items():
        for i in ids:
            src = Image.open(f"{A}av-{kind}-athletic-{i}.webp")
            if kind == "bot" and not ONLY_WARP: src = clean_hands(src, hand_ath); src.save(f"{A}av-{kind}-athletic-{i}.webp", quality=92, method=6)
            for sh in SHAPES:
                out = warp(src, *(BMAPS if kind == "bot" and sh != "plus" else MAPS)[sh])
                out.save(f"{A}av-{kind}-{sh}-{i}.webp", quality=92, method=6)
            print(kind, i, "done")
