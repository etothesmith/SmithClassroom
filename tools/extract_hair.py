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
    def score(fx, fy, dx, dy, step):
        w2, h2 = int(g["W"] * W / g["W"] * fx), int(g["H"] * H / g["H"] * fy)
        m = np.array(Image.fromarray(tmask.astype(np.uint8) * 255).resize((w2, h2))) > 127
        can = np.zeros((H, W), bool)
        ys, xs = max(0, dy), max(0, dx); ye, xe = min(H, dy + h2), min(W, dx + w2)
        can[ys:ye, xs:xe] = m[ys - dy:ye - dy, xs - dx:xe - dx]
        gr = gray[::step, ::step]; cv = can[::step, ::step]
        return (gr & cv).sum() - 1.5 * (gr & ~cv).sum()
    best = None
    for fx in np.arange(0.94, 1.061, 0.02):
        for fy in np.arange(0.94, 1.061, 0.02):
            for dy in range(-36, 37, 6):
                for dx in range(-36, 37, 6):
                    sc = score(fx, fy, dx, dy, 3)
                    if best is None or sc > best[0]: best = (sc, fx, fy, dx, dy)
    _, fx, fy, dx0, dy0 = best
    for dy in range(dy0 - 5, dy0 + 6):
        for dx in range(dx0 - 5, dx0 + 6):
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
        # 2. hair pixels in this cell (components centred in the cell)
        a = alpha.copy(); a[gray] = 0
        cell = np.zeros_like(a, bool); cell[max(0, cy0 - 40):cy1 + 40, max(0, cx0 - 40):cx1 + 40] = True
        lab, n = ndi.label((a > 0.5) & cell)
        keep = np.zeros_like(cell)
        for j, sl in enumerate(ndi.find_objects(lab), 1):
            if sl is None: continue
            ys, xs = sl; area = (lab[sl] == j).sum(); ccy, ccx = (ys.start + ys.stop) / 2, (xs.start + xs.stop) / 2
            if area < 60 or not (cx0 <= ccx < cx1 and cy0 <= ccy < cy1): continue
            keep |= lab == j
        keep = ndi.binary_dilation(keep, iterations=2) & cell
        A = a * keep
        ys, xs = np.where(A > 0.05)
        if not len(ys): print("  ! empty cell", k, cid); continue
        y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
        # 3. de-spill the magenta/gray fringe and save
        col = rgb[y0:y1, x0:x1].copy(); aa = A[y0:y1, x0:x1]
        spill = np.clip(np.minimum(col[..., 0], col[..., 2]) - col[..., 1] - 20, 0, None) * (aa < 0.999)
        col[..., 0] -= spill * 0.85; col[..., 2] -= spill * 0.85
        im = Image.fromarray(np.dstack([np.clip(col, 0, 255), aa * 255]).astype(np.uint8), "RGBA")
        out[f"hair-{cid}"] = [float(round(top - y0, 1)), float(round(chin - y0, 1)), float(round(wid, 1)), float(round(cxp - x0, 1))]
        if not dry: im.save(f"assets/av3/av-hair-{cid}.webp", quality=92, method=6)
        print(f"  hair-{cid}: {im.size} -> {out[f'hair-{cid}']}")
    print(json.dumps(out))
    return out

if __name__ == "__main__":
    main(sys.argv[1], int(sys.argv[2]), "--dry" in sys.argv)
