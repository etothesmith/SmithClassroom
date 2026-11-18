/* evaluated in the page: autopilot a full Tardy Wave run. mode: 'good' answers right, 'bad' answers wrong */
(mode) => {
  ARC.press('ok');                       // PLAY
  const R = ARC.state; let n = 0, sloppy = mode === 'sloppy', lastLane = -1, t0 = performance.now();
  while (!R.over && n < 60 * 600) {
    const d = R.debug();
    let target = d.lane;
    if (d.banner && d.banner.x - d.x < 1400) target = (mode === 'good' || (sloppy && Math.random() < 0.0035*0 + (d.banner.x % 3 === 0))) ? d.banner.a : (d.banner.a + 1) % 3;
    else if (!sloppy || Math.random() < 0.5) {
      const ahead = d.nextObs.filter(o => o.dx > 0 && o.dx < 420);
      const mine = ahead.find(o => o.lane === d.lane);
      if (mine && mine.kind === 'tall') { const free = [0,1,2].filter(l => !ahead.some(o => o.lane === l && o.kind === 'tall')).sort((a,b)=>Math.abs(a-d.lane)-Math.abs(b-d.lane)); if (free.length) target = free[0]; }
      if (mine && mine.kind === 'low' && mine.dx < 150 && R.grounded) { Input.virt.jump = true; }
    }
    if (target < d.lane) Input.virt.up = !Input.prev.up; else Input.virt.up = false;
    if (target > d.lane) Input.virt.down = !Input.prev.down; else Input.virt.down = false;
    ARC.step(1); Input.virt.jump = false; n++;
  }
  ARC.step(200);
  const d = R.debug();
  return { mode, steps: n, simSeconds: (n / 60).toFixed(1), wallMs: Math.round(performance.now() - t0), won: d.won, over: d.over, right: d.right, wrong: d.wrong, zone: d.zone, wave: Math.round(d.wave), coins: d.coins,
           screen: ARC.screen, paid: ARC.state.paid, outbox: JSON.parse(localStorage.getItem('world.outbox') || '[]').slice(-1) };
}
