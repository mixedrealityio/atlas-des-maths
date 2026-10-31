import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let page = PAGES[0];
startBook({
  no: 10, PAGES, PLATES, clock0: 0,
  lookKeys: ['exp', 'cos', 'sin', 'lim'],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state(clock, reduced) {
    const key = page.key, n = page.fixed ?? (reduced ? M.ORDERS[key][2] : M.nOf(key, clock));
    return { clock, key, n, x: reduced ? 0.5 : M.xOf(clock) };
  },
  readout(s, p) {
    page = p;
    if (p.scene === 'sin') return `x = ${fr(s.x, 3)}   sin x / x = ${fr(Math.sin(s.x) / s.x, 5)}\n1 − x²/6 = ${fr(1 - s.x * s.x / 6, 5)}`;
    const T = M.taylor(s.key, s.n);
    return `T${s.n}(x) = ${M.fmtPoly(s.key, s.n)}\nen x = 1 : T = ${fr(T(1), 4)}   f = ${fr(M.FN[s.key].f(1), 4)}`;
  },
});
