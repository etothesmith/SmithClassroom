"""Make the Gemini template for new hairstyles: 20 blank gray heads (5x4) cut from the
real avatar body, on flat magenta. Gemini draws a hairstyle on each head; tools/extract_hair.py
cuts the hair back out and measures where the head is so the hair lines up on every avatar.

usage: python3 tools/hair_template.py  ->  v2/gemini/hair_template.png
"""
import json, numpy as np
from PIL import Image

COLS, ROWS, CELL = 5, 4, 400
SCALE = 2.1
GRAY = (196, 196, 196)
SRC = "assets/av3/av-body-athletic-4.webp"
HEAD = dict(top=72, chin=153, width=57, cx=120.1)      # AV3.b["athletic-4"]
Y0, Y1 = 64, 194                                        # head, neck and shoulders
TOP_IN_CELL = 112

def geometry():
    """Where each head sits in the template, in template pixels."""
    ox = CELL / 2 - HEAD["cx"] * SCALE
    oy = TOP_IN_CELL - HEAD["top"] * SCALE
    heads = []
    for r in range(ROWS):
        for c in range(COLS):
            x0, y0 = c * CELL, r * CELL
            heads.append(dict(top=y0 + oy + HEAD["top"] * SCALE, chin=y0 + oy + HEAD["chin"] * SCALE,
                              width=HEAD["width"] * SCALE, cx=x0 + ox + HEAD["cx"] * SCALE, ox=x0 + ox, oy=y0 + oy))
    return dict(cols=COLS, rows=ROWS, cell=CELL, scale=SCALE, W=COLS * CELL, H=ROWS * CELL, y0=Y0, y1=Y1, heads=heads)

def silhouette():
    a = np.array(Image.open(SRC).convert("RGBA"))[Y0:Y1, :, 3] > 128
    im = Image.fromarray((a * 255).astype(np.uint8)).resize((int(240 * SCALE), int((Y1 - Y0) * SCALE)), Image.LANCZOS)
    return np.array(im) > 127

if __name__ == "__main__":
    g = geometry(); sil = silhouette(); H, W = sil.shape
    out = np.zeros((g["H"], g["W"], 3), np.uint8); out[:] = (255, 0, 255)
    for h in g["heads"]:
        x, y = int(round(h["ox"])), int(round(h["oy"] + Y0 * SCALE))
        xs0, ys0 = max(0, -x), max(0, -y)
        sub = sil[ys0:min(H, g["H"] - y), xs0:min(W, g["W"] - x)]
        reg = out[y + ys0:y + ys0 + sub.shape[0], x + xs0:x + xs0 + sub.shape[1]]
        reg[sub] = GRAY
    Image.fromarray(out).save("v2/gemini/hair_template.png")
    json.dump(g, open("v2/gemini/hair_template.json", "w"), indent=1)
    print("v2/gemini/hair_template.png", g["W"], "x", g["H"])
