(mode) => {
  ARC.press('ok');
  const S = ARC.state, RXa = [250, 1000, 1750, 2500, 3250], RYa = [300, 1100, 1900];
  const near = (arr, v) => arr.reduce((b, x, i) => Math.abs(x - v) < Math.abs(arr[b] - v) ? i : b, 0);
  function route(from, to, door) {
    /* snap target to a road point */
    let tp = door ? { x: to.x, y: RYa[near(RYa, to.y)] } : to;
    const onRow = RYa.some(y => Math.abs(tp.y - y) < 80);
    const i0 = near(RXa, from.x), j0 = near(RYa, from.y), pts = [];
    const sameRow = RYa.some(y => Math.abs(from.y - y) < 80 && Math.abs(tp.y - y) < 80), sameCol = RXa.some(x => Math.abs(from.x - x) < 80 && Math.abs(tp.x - x) < 80);
    if (sameRow || sameCol) { pts.push(tp, to); return pts; }
    pts.push({ x: RXa[i0], y: RYa[j0] });
    if (onRow) { const jr = near(RYa, tp.y); pts.push({ x: RXa[i0], y: RYa[jr] }, { x: tp.x, y: RYa[jr] }); }
    else { const ic = near(RXa, tp.x); pts.push({ x: RXa[ic], y: RYa[j0] }, { x: RXa[ic], y: tp.y }); }
    pts.push(to); return pts;
  }
  let n = 0, wp = [], lastKey = '', stuck = 0, lastPos = null, t0 = performance.now();
  while (!S.over && n < 60 * 400) {
    if (S.card) { ARC.press('ok'); n++; continue; }
    const d = S.debug(), car = d.car;
    let goal, door = false;
    if (d.order) { const pickI = mode === 'good' ? d.order.a : (d.order.a + 1) % 3; goal = d.order.doors[pickI]; door = true; }
    else goal = d.pkg;
    if (!goal) { ARC.step(1); n++; continue; }
    const key = goal.x + ',' + goal.y;
    if (n % 60 === 0) { if (lastPos && Math.hypot(car.x - lastPos.x, car.y - lastPos.y) < 40) stuck++; else stuck = 0; lastPos = { x: car.x, y: car.y }; }
    if (key !== lastKey || stuck > 2) { wp = route(car, goal, door); lastKey = key; if (stuck > 2) { stuck = 0; for (let k = 0; k < 40; k++) { Input.virt.down = true; Input.virt.up = false; ARC.step(1); n++; } Input.virt.down = false; } }
    while (wp.length > 1 && Math.hypot(wp[0].x - car.x, wp[0].y - car.y) < 70) wp.shift();
    const g = wp[0], want = Math.atan2(g.x - car.x, -(g.y - car.y));
    let da = want - car.a; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
    Input.virt.left = da < -0.08; Input.virt.right = da > 0.08;
    const distG = Math.hypot(g.x - car.x, g.y - car.y);
    Input.virt.up = !(distG < 160 && car.fwd > 300) && !(Math.abs(da) > 1.2 && car.fwd > 330);
    Input.virt.down = (distG < 160 && car.fwd > 300) || (Math.abs(da) > 1.2 && car.fwd > 380);
    ARC.step(1); n++;
  }
  ['left','right','up','down'].forEach(k => Input.virt[k] = false);
  ARC.step(200);
  const d = S.debug();
  return { mode, sim: (n / 60).toFixed(1), wallMs: Math.round(performance.now() - t0), over: d.over, won: d.won, delivered: d.delivered, right: d.right, time: Math.round(d.time), screen: ARC.screen, paid: ARC.state.paid };
}
