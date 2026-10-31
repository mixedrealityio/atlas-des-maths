import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let scene = 'cone';
startBook({
  no: 15, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, scene, beta: reduced ? 0.5 : M.betaOf(clock), t: reduced ? 1 : M.tOf(clock), u: reduced ? 0.7 : M.uOf(clock), y: reduced ? 2 : M.yOf(clock), e: reduced ? 0.6 : M.eOf(clock) }),
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'cone': return `inclinaison β = ${fr(M.deg(s.beta), 1)}°\nsection : ${M.kind(s.beta)}`;
      case 'ellipse': { const q = M.elAt(s.t); return `MF = ${fr(M.dist(q, [-2, 0]))}   MF′ = ${fr(M.dist(q, [2, 0]))}\nMF + MF′ = 6`; }
      case 'hyper': { const q = M.hyAt(s.u, 1); return `MF = ${fr(M.dist(q, [-2.5, 0]))}   MF′ = ${fr(M.dist(q, [2.5, 0]))}\nMF − MF′ = 3`; }
      case 'parab': { const q = M.paAt(s.y); return `M (${fr(q[0])} ; ${fr(q[1])})\nMF = MH = ${fr(q[0] + 1)}`; }
      case 'ecc': return `e = ${fr(s.e)}\n${M.eKind(s.e)}`;
    }
    return '';
  },
});
