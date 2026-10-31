// Chapitre 3 : applications linéaires, sur le livre commun.
import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { moveCursors, fr } from '../engine/kit.js';
import * as M from './model.js';

let W;
startBook({
  no: 3, PAGES, PLATES, clock0: 0,
  lookKeys: ['m1', 'm2', 'm3', 'm4'],
  buildWorld(E) {
    W = buildWorld(E);
    return { update: (s, look) => W.update(s, look), labels: W.labels };
  },
  state: (clock, reduced) => ({ clock, t: reduced ? 1 : M.morph(clock), get A() { return W.A; } }),
  readout(s, page) {
    const A = W.A, d = M.det(A);
    return `t = ${fr(s.t)}   matrice ${page.mat === 'm1' ? 'A' : page.mat === 'm2' ? 'B' : page.mat === 'm3' ? 'P' : 'S'}\nvolume de l’image = |det| = ${fr(Math.abs(d), 3)}`;
  },
  onFrame(s, sheets) {
    moveCursors(sheets, { det: [s.t, M.det(M.lerpMat('m2', s.t))] });
  },
});
