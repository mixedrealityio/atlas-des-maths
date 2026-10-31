import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import * as M from './model.js';

startBook({
  no: 17, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => reduced ? { pi: 11, qi: 9, qf: 1, ci: 3, yi: 9, sep: 0.7 }
    : { pi: M.pathIdx(clock), qi: M.permIdx(clock), qf: M.permFrac(clock), ci: M.combIdx(clock), yi: M.cellIdx(clock), sep: M.sepOf(clock) },
  readout(s, p) {
    switch (p.scene) {
      case 'grid': return `chemin ${s.pi + 1} / 35\nC(7, 3) = 35`;
      case 'perm': return `rangement ${s.qi + 1} / 24\n4! = 24`;
      case 'comb': return `choix ${s.ci + 1} / 10\nC(5, 2) = 10`;
      case 'yang': { const [n, k] = M.CELLS[s.yi]; return `C(${n}, ${k}) = ${M.C(n - 1, k - 1)} + ${M.C(n - 1, k)} = ${M.C(n, k)}`; }
      case 'cube': return `(a + b)³ = a³ + 3a²b + 3ab² + b³\n27 = 8 + 12 + 6 + 1`;
    }
    return '';
  },
});
