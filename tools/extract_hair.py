"""Cut new hairstyles out of a Gemini sheet drawn on v2/gemini/hair_template.png.

usage: python3 tools/extract_hair.py SHEET.png FIRST_ID [--dry]
  e.g. python3 tools/extract_hair.py curly_hair.png 32
Writes assets/av3/av-hair-<id>.webp for each of the 20 cells (row by row) and prints the
AV3.i anchor entries ("hair-<id>": [top, chin, headWidth, centerX]) to paste into avatar.js.

How: the template's heads are flat gray (196,196,196) on magenta. For each cell we find where
Gemini put the head (best match of the gray silhouette, allowing small shifts and size changes),
call every pixel that is not gray, not magenta and not a blend of the two "hair", soften the
edges, crop, and record where the head sits inside the crop.
"""
import sys, json, numpy as np
from PIL import Image
from scipy import ndimage as ndi
sys.path.insert(0, "tools")
import hair_template as HT

GRAY = np.array(HT.GRAY, float); MAG = np.array([255, 0, 255], float)

def bg_distance(rgb):
    """distance from the gray-to-magenta line: 0 = background or a blend of the two"""
    d = MAG - GRAY; t = np.clip(((rgb - GRAY) @ d) / (d @ d), 0, 1)
    return np.linalg.norm(rgb - (GRAY + t[..., None] * d), axis=-1), t

def main(path, first, dry=False):
    g = HT.geometry()
    img = Image.open(path).convert("RGB"); W, H = img.size
    rgb = np.array(img).astype(float)
    dist, t = bg_distance(rgb)
    gray = (dist < 22) & (t < 0.15)                     # the head template showing through
    alpha = np.clip((dist - 22) / (55 - 22), 0, 1)      # hair is far from gray/magenta
    # 1. register the whole template to the sheet at once (20 heads give plenty of visible gray)
    tpl = np.array(Image.open("v2/gemini/hair_template.png").convert("RGB")).astype(float)
    tmask = (np.abs(tpl - GRAY).sum(-1) < 30)
    Q = max(1, round(W / 1152))                          # search on a ~1152-wide copy, then scale up
    gq = gray[::Q, ::Q]; Hq, Wq = gq.shape
    def score(fx, fy, dx, dy, step):
        w2, h2 = int(Wq * fx), int(Hq * fy); dx //= Q; dy //= Q
        m = np.array(Image.fromarray(tmask.astype(np.uint8) * 255).resize((w2, h2))) > 127
        can = np.zeros((Hq, Wq), bool)
        ys, xs = max(0, dy), max(0, dx); ye, xe = min(Hq, dy + h2), min(Wq, dx + w2)
        can[ys:ye, xs:xe] = m[ys - dy:ye - dy, xs - dx:xe - dx]
        gr = gq[::step, ::step]; cv = can[::step, ::step]
        return (gr & cv).sum() - 1.5 * (gr & ~cv).sum()
    best = None
    for fx in np.arange(0.94, 1.061, 0.02):
        for fy in np.arange(0.94, 1.061, 0.02):
            for dy in range(-36 * Q, 37 * Q, 6 * Q):
                for dx in range(-36 * Q, 37 * Q, 6 * Q):
                    sc = score(fx, fy, dx, dy, 3)
                    if best is None or sc > best[0]: best = (sc, fx, fy, dx, dy)
    _, fx, fy, dx0, dy0 = best
    for dy in range(dy0 - 5 * Q, dy0 + 6 * Q, Q):
        for dx in range(dx0 - 5 * Q, dx0 + 6 * Q, Q):
            sc = score(fx, fy, dx, dy, 1)
            if sc > best[0]: best = (sc, fx, fy, dx, dy)
    _, fx, fy, DX, DY = best
    sx, sy = W / g["W"] * fx, H / g["H"] * fy
    print(f"  sheet fit: scale {fx:.2f} x {fy:.2f}, shift {DX},{DY}")
    out = {}
    for k, h in enumerate(g["heads"]):
        cid = first + k
        r, c = divmod(k, g["cols"])
        cx0, cy0 = int(c * g["cell"] * sx + DX), int(r * g["cell"] * sy + DY)
        cx1, cy1 = int((c + 1) * g["cell"] * sx + DX), int((r + 1) * g["cell"] * sy + DY)
        top, chin, wid, cxp = h["top"] * sy + DY, h["chin"] * sy + DY, h["width"] * sx, h["cx"] * sx + DX
        # 2. hair pixels in this cell: drop thin slivers (the gray/magenta edge), then group nearby
        #    curls into one piece and keep the pieces whose centre is in this cell
        a = alpha.copy(); a[gray] = 0
        cell = np.zeros_like(a, bool); cell[max(0, cy0 - 60):cy1 + 60, max(0, cx0 - 60):cx1 + 60] = True
        raw = (a > 0.5) & cell
        lab0, _ = ndi.label(raw)
        for j, sl in enumerate(ndi.find_objects(lab0), 1):
            if sl is None: continue
            hgt, wd = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
            if (lab0[sl] == j).sum() < 40 or hgt < 7 or wd < 4: raw[sl][lab0[sl] == j] = False
        lab, n = ndi.label(ndi.binary_dilation(raw, iterations=7))
        keep = np.zeros_like(cell)
        for j, sl in enumerate(ndi.find_objects(lab), 1):
            if sl is None: continue
            ys, xs = sl; ccy, ccx = (ys.start + ys.stop) / 2, (xs.start + xs.stop) / 2
            if not (cx0 <= ccx < cx1 and cy0 <= ccy < cy1): continue
            keep |= (lab == j) & raw
        keep = ndi.binary_dilation(keep, iterations=2) & cell
        A = a * keep
        ys, xs = np.where(A > 0.05)
        if not len(ys): print("  ! empty cell", k, cid); continue
        y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
        # 3. de-spill the magenta/gray fringe and save
        col = rgb[y0:y1, x0:x1].copy(); aa = A[y0:y1, x0:x1]
        mag = np.minimum(col[..., 0], col[..., 2]) - col[..., 1]          # how purple/magenta a pixel is
        aa = aa * np.clip(1 - (mag - 25) / 70, 0, 1)                         # magenta fringe fades out
        spill = np.clip(mag, 0, None)
        col[..., 0] -= spill * 0.9; col[..., 2] -= spill * 0.9
        col = np.clip(col, 0, 255)
        im = Image.fromarray(np.dstack([np.clip(col, 0, 255), aa * 255]).astype(np.uint8), "RGBA")
        out[f"hair-{cid}"] = [float(round(top - y0, 1)), float(round(chin - y0, 1)), float(round(wid, 1)), float(round(cxp - x0, 1))]
        if not dry: im.save(f"assets/av3/av-hair-{cid}.webp", quality=92, method=6)
        print(f"  hair-{cid}: {im.size} -> {out[f'hair-{cid}']}")
    print(json.dumps(out))
    return out

if __name__ == "__main__":
    main(sys.argv[1], int(sys.argv[2]), "--dry" in sys.argv)
