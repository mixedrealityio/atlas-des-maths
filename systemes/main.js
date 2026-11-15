import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES, eqText } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let scene = 'poules';
startBook({
  no: 22, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, scene, tx: reduced ? 23 : M.tryOf(clock), th: reduced ? 1.2 : M.thetaOf(clock), m: reduced ? 3 : M.mOf(clock),
    g: reduced ? [1, 1, 1] : M.gaussOf(clock), k: reduced ? 11 : M.kOf(clock) }),
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'poules': { const x = Math.round(s.tx); return `${x} poulets, ${35 - x} lapins\n${M.feet(x)} pattes${M.feet(x) === 94 ? ' : gagné' : ' (il en faut 94)'}`; }
      case 'elim': { const c = M.comb(s.th); return `${fr(Math.cos(s.th))}·(1) + ${fr(Math.sin(s.th))}·(2)\n${eqText(c, ['x', 'y'])}`; }
      case 'cas2': { const d = M.det2(M.L1, M.L2m(s.m)); return `m = ${fr(s.m)}   det = m − 2 = ${fr(d)}\n${Math.abs(d) < 0.02 ? 'droites parallèles' : `solution (${fr(35 - 24 / d, 1)} ; ${fr(24 / d, 1)})`}`; }
      case 'trois': return `det = ${M.det3(M.P1, M.P2, M.P3)} ≠ 0\nsolution (1 ; 2 ; 3)`;
      case 'gauss': { const P = M.gaussPlanes(s.g); return P.map(q => eqText(q)).join('\n'); }
      case 'rang': return `3x + 2z = ${fr(s.k)}\n${Math.abs(s.k - 9) < 0.25 ? 'une droite de solutions' : 'aucune solution'}`;
    }
    return '';
  },
});
