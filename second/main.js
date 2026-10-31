import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let scene = 'a';
startBook({
  no: 12, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, scene, a: reduced ? 1.5 : M.aOf(clock), hk: reduced ? [2, -1] : M.hkOf(clock), c: reduced ? -1 : M.cOf(clock),
    x: reduced ? 1 : M.xOf(clock), w: reduced ? 3.5 : M.wOf(clock), sa: reduced ? 1.8 : M.splitOf(clock) }),
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'canon': { const [h, k] = s.hk; return `y = (x − ${fr(h)})² ${k < 0 ? '−' : '+'} ${fr(Math.abs(k))}\nsommet (${fr(h)} ; ${fr(k)})`; }
      case 'disc': { const d = M.delta(1, -2, s.c), r = M.roots(1, -2, s.c); return `c = ${fr(s.c)}   Δ = ${fr(d)}\n${r.length === 2 ? `deux racines : ${fr(r[0])} et ${fr(r[1])}` : r.length ? 'une racine double' : 'aucune racine réelle'}`; }
      case 'sign': return `x = ${fr(s.x)}   f(x) = ${fr(M.g(s.x))}\nf(x) < 0 ⇔ −1 < x < 3`;
      case 'opt': return `x = ${fr(s.w)} m   aire = ${fr(M.area(s.w))} m²\nmaximum 25 m² pour x = 5`;
      case 'amgm': { const q = M.amgm(s.sa); return `a = ${fr(q.a)}   b = ${fr(q.b)}\n√(ab) = ${fr(q.gm, 3)} ≤ (a + b)/2 = 3`; }
    }
    return `y = ${fr(s.a)} x²\n${s.a > 0 ? 'tournée vers le haut' : 'tournée vers le bas'}`;
  },
});
