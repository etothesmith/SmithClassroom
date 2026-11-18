"""Cut the civic-update Gemini sheets (v2/GEMINI_TOWN_CIVIC.md) into v2/assets/town/.
   python3 tools/town/process_civic.py plaza.jpg icons.jpg stalls.jpg products.jpg"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'arcade'))
sys.argv, args = sys.argv[:1], sys.argv[1:]
from PIL import Image
from process_art import key, objects
OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'v2', 'assets', 'town')
SHEETS = [
    (2, [['plaza/fountain', 'plaza/foodtruck', 'plaza/stage', 'plaza/statue'], ['plaza/balloons', 'plaza/garden', 'plaza/arcade', 'plaza/mural']], 360),
    (2, [['civic/town_hall', 'civic/bank', 'civic/job_board'], ['civic/podium', 'civic/mayor_sash', 'civic/streak_flame']], 300),
    (2, [['civic/stall_bakery', 'civic/stall_flowers', 'civic/stall_art'], ['civic/stall_crafts', 'civic/stall_tech', 'civic/stall_smoothie']], 300),
    (3, [['items/prod_cupcakes', 'items/prod_cookie_jar', 'items/prod_bouquet', 'items/prod_sunflower'],
         ['items/prod_painting', 'items/prod_sculpture', 'items/prod_quilt_rug', 'items/prod_knit_lamp'],
         ['items/prod_radio', 'items/prod_robot', 'items/prod_smoothie', 'items/prod_fruit_bowl']], 256)]
for path, (rows, names, size) in zip(args, SHEETS):
    im = Image.open(path).convert('RGB')
    bands = objects(key(im), rows, min_frac=0.004, grow=9)
    for want, got in zip(names, bands):
        assert len(want) == len(got), (path, len(want), [len(b) for b in bands])
        for n, o in zip(want, got):
            img = o['img']; s = size / max(img.size)
            if s < 1: img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
            dst = os.path.join(OUT, n + '.webp'); os.makedirs(os.path.dirname(dst), exist_ok=True)
            img.save(dst, 'WEBP', quality=88, method=6); print(n, img.size)
