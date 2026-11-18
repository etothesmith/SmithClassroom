"""Add the questions in new_econ.py and new_gov.py to content.js (idempotent: ids are <unit>-x<nn>).
usage: python3 tools/qbank/merge.py"""
import json, subprocess, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from new_econ import Q as QE
from new_gov import Q as QG
add = {}
for unit, rows in {**QE, **QG}.items():
    items = []
    for k, (topic, diff, qen, qes, cen, ces, wen, wes) in enumerate(rows):
        assert len(cen) == len(ces) >= 3, (unit, k)
        a = (k * 3 + len(unit)) % len(cen)          # spread the right answer across positions
        oe = cen[1:]; oe.insert(a, cen[0]); os_ = ces[1:]; os_.insert(a, ces[0])
        it = {"id": f"{unit}-x{k+1:02d}", "type": "mcq", "diff": diff, "q": {"en": qen, "es": qes}, "c": {"en": oe, "es": os_}, "a": a, "why": {"en": wen, "es": wes}}
        if topic: it = {"id": it["id"], "topic": topic, **{k2: v for k2, v in it.items() if k2 != "id"}}
        items.append(it)
    add[unit] = items
open("/tmp/qadd.json", "w").write(json.dumps(add, ensure_ascii=False))
js = r"""
const fs=require('fs');const src=fs.readFileSync('content.js','utf8');global.window={};eval(src+';global.P=PACKS');
const add=JSON.parse(fs.readFileSync('/tmp/qadd.json','utf8'));let n=0;
for(const p of P)for(const u of p.units){const a=add[u.id];if(!a)continue;const have=new Set(u.items.map(i=>i.id));
  const topics=new Set((u.topics||[]).map(t=>t.id));
  for(const it of a){if(it.topic&&topics.size&&!topics.has(it.topic))throw new Error('bad topic '+u.id+' '+it.topic);
    if(have.has(it.id)){const i=u.items.findIndex(x=>x.id===it.id);u.items[i]=it;}else{u.items.push(it);n++;}}
  delete add[u.id];}
if(Object.keys(add).length)throw new Error('unknown units '+Object.keys(add));
fs.writeFileSync('content.js','const PACKS = '+JSON.stringify(P,null,2)+';');console.log('added',n);
"""
print(subprocess.run(["node", "-e", js], capture_output=True, text=True, check=True).stdout)
