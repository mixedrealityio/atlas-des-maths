import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let page = PAGES[0];
startBook({
  no: 11, PAGES, PLATES, clock0: 0,
  lookKeys: ['line', 'plane', 'free', 'w', 'base', 'supp'],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state(clock, reduced) {
    const t = page.free ? 1 : reduced ? 1 : M.tFree(clock);
    return { clock, lam: reduced ? 0.8 : M.lam(clock), lm: reduced ? [0.7, 0.5] : M.lm(clock), w: M.wT(t), x: reduced ? [2.1, 1.6, 0.9] : M.xOf(clock) };
  },
  readout(s, p) {
    page = p;
    switch (p.scene) {
      case 'line': return `λ = ${fr(s.lam)}\nλu = (${M.scale(s.lam, M.U).map(c => fr(c)).join(' ; ')})`;
      case 'plane': return `λ = ${fr(s.lm[0])}   μ = ${fr(s.lm[1])}\nλu + μv est dans le plan`;
      case 'free': { const d = M.det3(M.U, M.VV, s.w); return `det(u, v, w) = ${fr(d, 3)}\n${Math.abs(d) < 1e-3 ? 'famille liée' : 'famille libre'}`; }
      default: { const [a, b, c] = M.coords(s.x, M.U, M.VV, s.w); return `x = ${fr(a)} u + ${fr(b)} v + ${fr(c)} w\ncoordonnées (${fr(a)} ; ${fr(b)} ; ${fr(c)})`; }
    }
  },
});
