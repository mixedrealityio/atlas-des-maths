// Chapitre 2 : la dérivée, sur le livre commun.
import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { moveCursors, fr } from '../engine/kit.js';
import * as M from './model.js';

startBook({
  no: 2, PAGES, PLATES, clock0: 0,
  lookKeys: ['tan', 'sec', 'limit', 'dboard', 'var'],
  buildWorld(E) {
    const W = buildWorld(E);
    return { update: (s, look) => W.update(s, look), labels: W.labels };
  },
  state: (clock, reduced) => ({ clock, x: reduced ? 0.5 : M.walk(clock), h: reduced ? 0.5 : M.hOf(clock) }),
  readout(s, page) {
    if (page.scene === 'secant') { const r = M.rate(M.A, s.h); return `a = 0,5   h = ${fr(s.h, 3)}\ntaux τ(h) = ${fr(r, 3)}   f′(a) = 1,25`; }
    return `x = ${fr(s.x)}   f(x) = ${fr(M.f(s.x))}\npente f′(x) = ${fr(M.df(s.x))}`;
  },
  onFrame(s, sheets) {
    moveCursors(sheets, { rate: [s.h, M.rate(M.A, s.h)] });
  },
});
