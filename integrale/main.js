import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { moveCursors, fr } from '../engine/kit.js';
import * as M from './model.js';

let page = 'area';
startBook({
  no: 8, PAGES, PLATES, clock0: 0,
  lookKeys: ['riemann', 'prim', 'ab'],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, n: reduced ? 8 : M.nOf(clock), x: reduced ? 2.5 : M.xOf(clock), get page() { return page; } }),
  readout(s, p) {
    page = p.scene;
    switch (p.scene) {
      case 'riemann': return `${s.n} rectangles : S = ${fr(M.leftSum(s.n), 4)}\naire exacte 20/3 = ${fr(M.EXACT, 4)}`;
      case 'prim': return `x = ${fr(s.x)}   F(x) = ${fr(M.F(s.x), 3)}\nF′(x) = f(x) = ${fr(M.f(s.x), 3)}`;
      case 'ab': return `F(3) − F(1) = 4,5 − 2,167\n= 7/3 ≈ 2,333`;
    }
    return `∫ de 0 à 4 de f = 20/3\n≈ 6,667`;
  },
  onFrame(s, sheets) { const k = M.STEPS.indexOf(s.n); moveCursors(sheets, { sum: [k + 0.5, M.leftSum(s.n)] }); },
});
