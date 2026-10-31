// Chapitre 1 : Pythagore, sur le livre commun.
import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { moveCursors, fr } from '../engine/kit.js';
import * as M from './model.js';

startBook({
  no: 1, PAGES, PLATES, clock0: 0,
  lookKeys: ['sq'],
  buildWorld(E) {
    const W = buildWorld(E);
    return { update: (s, look) => W.update(s, look), labels: W.labels };
  },
  state: (clock, reduced) => {
    const c = reduced ? 0 : clock;
    return { clock: c, proof: reduced ? 0 : M.proofT(c), theta: reduced ? 90 : M.theta(c), climb: reduced ? 1 : M.climb(c), zhao: reduced ? 1 : M.zhaoT(c) };
  },
  readout(s, page) {
    switch (page.scene) {
      case 'tri': return `a² + b² = 9 + 16 = 25\nc² = 5² = 25`;
      case 'proof': return s.proof < 0.5 ? 'reste : un carré c²\n49 − 4 × 6 = 25' : 'reste : deux carrés a² et b²\n9 + 16 = 25';
      case 'recip': { const c2 = M.thirdSq(s.theta); return `angle ${fr(s.theta, 0)}°   c² = ${fr(c2, 1)}\n${Math.abs(s.theta - 90) < 0.5 ? 'c² = 25 : angle droit' : c2 < 25 ? 'c² < 25 : angle aigu' : 'c² > 25 : angle obtus'}`; }
      case 'zhao': return `4 triangles : 4 × 6 = 24\npetit carré : 1   total 25 = 5²`;
      case 'pave': return `fond : √(3² + 4²) = 5\ndiagonale : √(5² + 12²) = 13`;
    }
    return '';
  },
  onFrame(s, sheets) {
    moveCursors(sheets, { recip: [s.theta, M.thirdSq(s.theta)] });
  },
});
