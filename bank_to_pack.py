#!/usr/bin/env python3
"""
bank_to_pack.py — turn a Python question bank into a pack the app can load.

Your Python file just needs one or more lists of dicts shaped like this:

    GOV_QUESTION_BANK = [
        {"q": "Question text?", "options": ["Right", "Wrong", "Wrong", "Wrong"], "ans": 0},
        ...
    ]

Optional keys you can add to any question:
    "why": "One sentence explaining the answer."
    "q_es", "options_es", "why_es": the Spanish versions
    "diff": 1, 2, or 3

Usage
-----
    python3 bank_to_pack.py my_questions.py
    python3 bank_to_pack.py my_questions.py --course "U.S. Government Honors" --unit "Unit 7 - Review"

It writes my_questions.pack.json next to the input file. In the app, open
Teacher -> Content packs -> Load pack file and pick that .json. Done.

Anything without a Spanish version still loads; the app flags those items as
English-only so you can fill them in later.
"""
import argparse, json, os, re, runpy, sys

def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-") or "pack"

def find_banks(path):
    """Run the file in a sandbox namespace and collect every question list."""
    ns = runpy.run_path(path)
    banks = []
    for name, value in ns.items():
        if name.startswith("_") or not isinstance(value, list) or not value:
            continue
        if all(isinstance(q, dict) and "q" in q and "options" in q for q in value):
            banks.append((name, value))
    return banks

def to_items(bank, prefix):
    items = []
    for i, q in enumerate(bank, 1):
        opts = list(q["options"])
        ans = int(q.get("ans", 0))
        if not 0 <= ans < len(opts):
            print(f"  ! skipped question {i}: 'ans' is out of range")
            continue
        item = {
            "id": f"{prefix}-{i:03d}",
            "type": "mcq",
            "diff": int(q.get("diff", 2)),
            "q": {"en": q["q"]},
            "c": {"en": opts},
            "a": ans,
            "why": {"en": q.get("why", "See the lesson notes for this unit.")},
        }
        if q.get("q_es"):
            item["q"]["es"] = q["q_es"]
        if q.get("options_es") and len(q["options_es"]) == len(opts):
            item["c"]["es"] = list(q["options_es"])
        if q.get("why_es"):
            item["why"]["es"] = q["why_es"]
        items.append(item)
    return items

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("source", help="the .py file holding your question bank")
    ap.add_argument("--course", default=None, help="course name shown in the app")
    ap.add_argument("--unit", default=None, help="unit title shown in the app")
    ap.add_argument("--brief", default="Study notes for this unit go here.",
                    help="the notes students read before the challenge")
    args = ap.parse_args()

    if not os.path.exists(args.source):
        sys.exit(f"No such file: {args.source}")

    banks = find_banks(args.source)
    if not banks:
        sys.exit("Found no question lists. Each entry needs 'q', 'options', and 'ans'.")

    base = os.path.splitext(os.path.basename(args.source))[0]
    course = args.course or base.replace("_", " ").title()
    pack = {"id": slug(course), "color": "#F2B441", "name": {"en": course}, "units": []}

    for name, bank in banks:
        title = args.unit or name.replace("_", " ").title()
        prefix = slug(name)[:12]
        items = to_items(bank, prefix)
        if not items:
            continue
        pack["units"].append({
            "id": f"{pack['id']}-{slug(title)}",
            "title": {"en": title},
            "brief": {"en": args.brief},
            "items": items,
        })
        print(f"  {name}: {len(items)} questions")

    out = os.path.join(os.path.dirname(os.path.abspath(args.source)), base + ".pack.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(pack, f, ensure_ascii=False, indent=1)

    total = sum(len(u["items"]) for u in pack["units"])
    print(f"\nWrote {out}")
    print(f"{total} questions across {len(pack['units'])} unit(s).")
    print("In the app: Teacher -> Content packs -> Load pack file.")

if __name__ == "__main__":
    main()
