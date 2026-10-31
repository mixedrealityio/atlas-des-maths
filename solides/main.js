import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

startBook({
  no: 5, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => reduced ? { n: 24, h: 2, sep: 0.6, fold: 60 } : { n: M.filled(clock), h: M.cylH(clock), sep: M.pyrSep(clock), fold: M.fold(clock) },
  readout(s, page) {
    switch (page.scene) {
      case 'pave': return `cubes posés : ${s.n} / 24\nV = 4 × 3 × 2 = 24`;
      case 'cyl': return `h = ${fr(s.h)}   cylindre ${fr(M.cylV(s.h))}\nprisme ${fr(M.prismV(s.h))}`;
      case 'pyr': return `cube 27 = 3 × 9\npyramide = ⅓ × 9 × 3 = 9`;
      case 'arch': return `r = 1,2\ncône ${fr(M.archV.cone)}   boule ${fr(M.archV.ball)}   cylindre ${fr(M.archV.cyl)}`;
      case 'net': return `pliage ${Math.round(s.fold)}°\n6 faces · 12 arêtes · 8 sommets`;
    }
    return '';
  },
});
