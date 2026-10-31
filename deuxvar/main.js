import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let scene = 'surface';
startBook({
  no: 19, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, scene, p: reduced ? [-0.9, 0.7] : M.ptOf(clock) }),
  readout(s, p) {
    scene = p.scene;
    const [x, y] = s.p;
    switch (p.scene) {
      case 'levels': return `${M.LEVELS.length} lignes de niveau\nde 0,25 à 1,9`;
      case 'partial': return `M(${fr(x)} ; ${fr(y)})\n∂f/∂x = ${fr(M.fx(x, y), 3)}   ∂f/∂y = ${fr(M.fy(x, y), 3)}`;
      case 'grad': return `∇f = (${fr(M.fx(x, y), 3)} ; ${fr(M.fy(x, y), 3)})\n‖∇f‖ = ${fr(Math.hypot(M.fx(x, y), M.fy(x, y)), 3)}`;
      case 'saddle': return `g(x, y) = (x² − y²)/3\n∇g(0, 0) = (0 ; 0) : col`;
    }
    return `M(${fr(x)} ; ${fr(y)})\nf(x, y) = ${fr(M.f(x, y), 3)}`;
  },
});
