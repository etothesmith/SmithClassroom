"""Cut Gemini object sheets (magenta background, grid of objects) into transparent webp art.

usage: python3 tools/town/cut_sheets.py SHEET_DIR
Each sheet in SHEETS below is split by connected parts, each part assigned to the grid cell
its center falls in, keyed off magenta with soft edges and de-spill, trimmed, and saved.
"""
import sys, os, shutil, numpy as np
from PIL import Image
from scipy import ndimage as ndi

T = "v2/assets/town/"
ITEMS, DOWN, WORLD = T + "items/", T + "downtown/", T + "world/"
FISH = ["bluegill","bass","catfish","crappie","sunfish","tilapia","boot","mullet","gar","peacock","snook","feather","redfish","tarpon","sturgeon","koi"]
ALIAS = {"tw_champ": ["tw_champ_apecon", "tw_champ_apgov", "tw_champ_econ", "tw_champ_gov"]}
SHEETS = {   # file: (cols, rows, folder, ids, max side)
  "town_items_2.png": (4, 4, ITEMS, "bed_loft bed_cloud sofa_loveseat sofa_egg_chair table_gaming table_aquarium rug_checker rug_galaxy lamp_fairy lamp_moon plant_monstera plant_cherry art_photos wall_neon_bolt trophy_state pet_bunny", 240),
  "tower_loot_1.png": (4, 4, ITEMS, "rl_hand rl_gavel rl_quill rl_compass rl_lantern rl_shield tw_sdlamp tw_phillips tw_goldbar tw_bell tw_fedpapers tw_column tw_magna tw_ballot tw_globe tw_bullbear", 220),
  "tower_loot_2.png": (4, 4, ITEMS, "tw_scales tw_ticker tw_vase tw_rug_map tw_rug_cash tw_inkwell pet_bull pet_bear pet_eagle tw_mock tw_graph tw_cases tw_review tw_champ", 220),
  "pets_1.png": (4, 4, ITEMS, "pet_hamster pet_mouse pet_chick pet_frog pet_snail pet_hedgehog pet_poodle pet_blackcat pet_pig pet_goat pet_raccoon pet_fox pet_owl pet_gator pet_sloth pet_otter", 220),
  "pets_2.png": (4, 3, ITEMS, "pet_peacock pet_swan pet_dolphin pet_panther pet_unicorn pet_dragon mayor_desk mayor_flag mayor_portrait q_whistle q_key q_mic", 220),
  "trophies.png": (4, 2, ITEMS, "q_ship e_hurricane e_fair e_election e_founders e_lakes e_market t_besttown", 220),
  "seasonal_A.png": (4, 3, ITEMS, "s01_confetti s01_snowglobe s01_clock s02_heartlamp s02_roses s02_cards s03_kite s03_tulips s03_bracket s04_boots s04_umbrella s04_eggs", 220),
  "seasonal_B.png": (4, 3, ITEMS, "s05_gradcap s05_apcert s05_hibiscus s06_beachball s06_fan s06_icecream s07_fireworks s07_flag s07_grill s08_backpack s08_pencils s08_planner", 220),
  "seasonal_C.png": (4, 3, ITEMS, "s09_football s09_pennant s09_sunflower s10_pumpkin s10_candles s10_bats s11_pie s11_wreath s11_quilt s12_lights s12_gingerbread s12_snowman", 220),
  "fish.png": (4, 4, WORLD, " ".join("fish_" + f for f in FISH), 200),
  "downtown_buildings.png": (4, 4, DOWN, "doctor vet reporter banker firefighter marshal judge tutor mail chef builder sanitation ranger photographer board hall", 260),
  "downtown_landmarks.png": (4, 4, DOWN, "land_court land_skate land_dogpark land_pool land_library land_garden land_food land_wifi land_bus land_solar land_theater land_gym land_museum land_zoo land_field land_mural", 260),
  "world_places.png": (4, 3, WORLD, "plaza homes downtown waterfront park space towns album ride_coaster ride_drop ride_flume storm", 300),
  "world_story.png": (3, 2, WORLD, "story_hurricane story_fair story_election story_founders story_lakes story_market", 300),
  "world_npcs.png": (4, 1, WORLD, "npc_coach npc_pinkerton npc_ned npc_rosa", 360),
}

def key(img):
    a = np.array(img.convert("RGB")).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mag = np.minimum(r, b) - g                       # how magenta a pixel is
    alpha = np.clip(1 - (mag - 60) / (150 - 60), 0, 1)  # >=150 fully keyed, <=60 fully kept
    # de-spill: pull the magenta cast out of edge and glow pixels
    spill = np.clip(mag - 20, 0, None) * (alpha < 0.999)
    a[..., 0] -= spill * 0.85; a[..., 2] -= spill * 0.85
    a = np.clip(a, 0, 255)
    return a, alpha

def cut(name, cols, rows, folder, ids, side, src):
    ids = ids.split(); img = Image.open(os.path.join(src, name)); W, H = img.size
    rgb, alpha = key(img); solid = alpha > 0.5
    lab, n = ndi.label(ndi.binary_dilation(solid, iterations=6))
    cells = {}
    for k, sl in enumerate(ndi.find_objects(lab), 1):
        if sl is None: continue
        ys, xs = sl; area = (lab[sl] == k).sum()
        if area < 120: continue
        cy, cx = (ys.start + ys.stop) / 2, (xs.start + xs.stop) / 2
        c = min(cols - 1, int(cx / (W / cols))) + cols * min(rows - 1, int(cy / (H / rows)))
        cells.setdefault(c, []).append((ys.start, ys.stop, xs.start, xs.stop))
    os.makedirs(folder, exist_ok=True); done = 0
    for c, id_ in enumerate(ids):
        if c not in cells: print("  ! empty cell", name, c, id_); continue
        y0 = min(b[0] for b in cells[c]); y1 = max(b[1] for b in cells[c]); x0 = min(b[2] for b in cells[c]); x1 = max(b[3] for b in cells[c])
        # keep only this cell's parts
        keep = np.zeros_like(solid)
        for k, sl in enumerate(ndi.find_objects(lab), 1):
            if sl is None: continue
            ys, xs = sl; cy, cx = (ys.start + ys.stop) / 2, (xs.start + xs.stop) / 2
            if min(cols - 1, int(cx / (W / cols))) + cols * min(rows - 1, int(cy / (H / rows))) == c: keep |= lab == k
        al = (alpha * keep)[y0:y1, x0:x1]
        out = np.dstack([rgb[y0:y1, x0:x1], al * 255]).astype(np.uint8)
        im = Image.fromarray(out, "RGBA"); bb = im.getbbox(); im = im.crop(bb)
        im.thumbnail((side, side), Image.LANCZOS)
        pad = Image.new("RGBA", (im.width + 8, im.height + 8)); pad.paste(im, (4, 4))
        pad.save(os.path.join(folder, id_ + ".webp"), quality=90, method=6); done += 1
    print(f"{name}: {done}/{len(ids)}")
    # one champion cup art serves all four courses
    for src_id, copies in ALIAS.items():
        f = os.path.join(folder, src_id + ".webp")
        if src_id in ids and os.path.exists(f):
            for c in copies: shutil.copyfile(f, os.path.join(folder, c + ".webp"))

if __name__ == "__main__":
    src = sys.argv[1]; only = sys.argv[2:] or list(SHEETS)
    for n in only: cut(n, *SHEETS[n], src)
