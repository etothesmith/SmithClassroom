"""Register new clothing layers in avatar.js and money_moves.html.
usage: python3 tools/add_clothes.py   (edit NEW below)"""
import json, base64, re, os
NEW = [  # id, en, es, price, slot, col
 ("top_11_pink_crop_hoodie","Pink crop hoodie","Sudadera corta rosa",280,"top",10),
 ("top_12_lavender_cardigan","Lavender cardigan","Cárdigan lavanda",260,"top",11),
 ("top_13_ruffle_blouse","Ruffle blouse","Blusa con volantes",320,"top",12),
 ("top_14_tied_flannel","Tied plaid flannel","Franela a cuadros anudada",300,"top",13),
 ("top_15_striped_tee","Striped boat-neck tee","Camiseta a rayas",220,"top",14),
]
AV = "assets/av3/"
# avatar.js
p = "avatar.js"; s = open(p).read()
for id_, en, es, price, slot, col in NEW:
    if id_ in s: continue
    arr = "AV_TOPS" if slot == "top" else "AV_BOTTOMS"
    line = f'  ["{id_}",{{en:"{en}",es:"{es}"}},{price},{col}],\n'
    i = s.index(f"const {arr} = [")
    j = s.index("].map(", i)
    s = s[:j].rstrip("\n") + ",\n" + line.rstrip(",\n") + "\n" + s[j:]
open(p, "w").write(s)
# money_moves.html
p = "money_moves.html"; s = open(p).read()
pre = {"top": "top", "bottom": "bot"}
for id_, en, es, price, slot, col in NEW:
    if f"'{id_}'" not in s:
        arr = "const TOPS=[" if slot == "top" else "const BOTTOMS=["
        i = s.index(arr); j = s.index("];", i)
        bonus = max(2, price // 60)
        entry = f",{{id:'{id_}',slot:'{slot}',name:'{en}',price:{price},bonus:{bonus},col:{col}}}" if slot=="top" else f",{{id:'{id_}',slot:'{slot}',name:'{en}',price:{price},col:{col}}}"
        s = s[:j] + entry + s[j:]
    add = {}
    names = [f"av-{pre[slot]}-{sh}-{col}" for sh in ("slim","athletic","curvy","plus")] + [f"ic3-{pre[slot]}-{col}"]
    for n in names:
        b64 = base64.b64encode(open(AV + n + ".webp", "rb").read()).decode()
        key = f'"{n}":"data:image/webp;base64,'
        if key in s:
            k = s.index(key); e = s.index('"', k + len(key))
            s = s[:k] + key + b64 + s[e:]
        else:
            add[n] = "data:image/webp;base64," + b64
    if add:
        k = s.index("window.__MM_ASSETS={") + len("window.__MM_ASSETS={")
        s = s[:k] + ",".join(f'"{n}":"{v}"' for n, v in add.items()) + "," + s[k:]
open(p, "w").write(s)
print("ok")
