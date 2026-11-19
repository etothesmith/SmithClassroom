"""Register new clothing layers in avatar.js and money_moves.html.
usage: python3 tools/add_clothes.py   (edit NEW below)"""
import json, base64, re, os
NEW = [  # id, en, es, price, slot, col
 ("top_16_flower_blouse","Pink flower blouse","Blusa rosa de flores",260,"top",15),
 ("top_17_red_crewneck","Grenadier red sweatshirt","Sudadera roja Grenadier",240,"top",16),
 ("top_18_satin_bomber","Purple satin bomber","Chaqueta bomber morada",420,"top",17),
 ("top_19_cheer","Cheer uniform","Uniforme de porrista",380,"top",18),
 ("top_20_wrap_dress","Teal wrap dress","Vestido cruzado verde azulado",450,"top",19),
 ("top_21_homecoming","Homecoming dress","Vestido de homecoming",600,"top",20),
 ("top_22_pinafore","Denim pinafore dress","Vestido pichi de mezclilla",380,"top",21),
 ("top_23_sweater_vest","Sweater vest & collar","Chaleco tejido y camisa",340,"top",22),
 ("top_24_fleece","Sage fleece jacket","Chaqueta polar verde",300,"top",23),
 ("top_25_jersey","Grenadier jersey","Jersey Grenadier",350,"top",24),
 ("top_26_open_flannel","Green flannel","Franela verde",300,"top",25),
 ("top_27_track_jacket","Black track jacket","Chaqueta deportiva negra",320,"top",26),
 ("top_28_polo","Navy polo","Polo azul marino",260,"top",27),
 ("top_29_camo_hoodie","Camo hoodie","Sudadera de camuflaje",340,"top",28),
 ("top_30_palm_shirt","Palm-leaf button-up","Camisa de hojas de palma",280,"top",29),
 ("top_31_checker_shirt","Checkered overshirt","Camisa a cuadros abierta",300,"top",30),
 ("top_32_puffer_vest","Gold puffer vest","Chaleco acolchado dorado",500,"top",31),
 ("bot_12_flare_jeans","Flare jeans","Jeans acampanados",280,"bottom",8),
 ("bot_13_tennis_skirt","Tennis skirt","Falda de tenis",260,"bottom",9),
 ("bot_14_leggings","Black leggings","Leggings negros",220,"bottom",10),
 ("bot_15_cargo_boots","Cargo pants & boots","Pantalón cargo y botas",380,"bottom",11),
 ("bot_16_wide_trousers","Cream wide trousers","Pantalón ancho crema",340,"bottom",12),
 ("bot_17_denim_midi","Denim midi skirt","Falda midi de mezclilla",320,"bottom",13),
 ("bot_18_pink_joggers","Pink joggers","Joggers rosados",240,"bottom",14),
 ("bot_19_mom_jeans","Mom jeans & high-tops","Mom jeans y botines",320,"bottom",15),
 ("bot_20_baggy_jeans","Baggy jeans & kicks","Jeans holgados y tenis",400,"bottom",16),
 ("bot_21_ball_shorts","Basketball shorts","Shorts de básquet",200,"bottom",17),
 ("bot_22_chinos","Khaki chinos","Chinos caqui",300,"bottom",18),
 ("bot_23_camo_shorts","Camo cargo shorts","Shorts cargo de camuflaje",260,"bottom",19),
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
