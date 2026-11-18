(opts) => {
  const mode = opts.mode, maxT = opts.maxT || 400;
  ARC.press('ok');
  const M = ARC.state; let n = 0, t0 = performance.now(), worst = 0, ups = [];
  while (!M.over && n < 60 * maxT) {
    const d = M.debug();
    if (d.overlay === 'question') {
      if (d.picked < 0 || d.picked === null) { const ans = mode === 'bad' ? (d.qa + 1) % 3 : d.qa; ARC.press('a' + (ans + 1)); }
      else ARC.press('ok');
      ARC.step(5); n += 5; continue;
    }
    if (d.overlay === 'upgrade') { ARC.step(20); ARC.press('a' + (1 + Math.floor(Math.random() * 3))); n += 21; ups.push(JSON.stringify(d.lv)); continue; }
    /* kite: move away from the centroid of nearby monsters, toward the arena middle */
    const foes = M.foes; let ax = 0, ay = 0;
    for (const f of foes) { const dx = M.p.x - f.x, dy = M.p.y - f.y, dd = dx*dx + dy*dy; if (dd < 350*350) { ax += dx / (dd + 1); ay += dy / (dd + 1); } }
    ax += (1280 - M.p.x) * 0.000004; ay += (1500 - M.p.y) * 0.000004;
    const close = foes.some(f => Math.hypot(f.x - M.p.x, f.y - M.p.y) < 170);
    if (!close && M.orbs.length) { let b = null, bd = 1e9; for (const o of M.orbs) { const dd = Math.hypot(o.x - M.p.x, o.y - M.p.y); if (dd < bd) { bd = dd; b = o; } } if (bd < 500) { ax = (b.x - M.p.x) * 0.001; ay = (b.y - M.p.y) * 0.001; } }
    if (mode === 'idle') { ax = 0; ay = 0; }
    Input.virt.left = ax < -1e-6; Input.virt.right = ax > 1e-6; Input.virt.up = ay < -1e-6; Input.virt.down = ay > 1e-6;
    const s = performance.now(); ARC.step(1); worst = Math.max(worst, performance.now() - s); n++;
  }
  ['left','right','up','down'].forEach(k => Input.virt[k] = false);
  const d = M.debug(); ARC.step(150);
  return { mode, sim: (n/60).toFixed(0), wallMs: Math.round(performance.now() - t0), worstStepMs: worst.toFixed(2), t: Math.round(d.t), hp: d.hp, level: d.level, kills: d.kills, foes: d.foes, bossN: d.bossN, won: d.won, over: d.over, lv: d.lv, screen: ARC.screen, paid: ARC.state.paid };
}
