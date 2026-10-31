import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let page = 'ari';
startBook({
  no: 7, PAGES, PLATES, clock0: 0,
  lookKeys: ['ari', 'geo', 'lim', 'rec'],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, n: reduced ? M.N : M.shown(clock), get page() { return page; } }),
  readout(s, p) {
    page = p.scene;
    const n = Math.max(s.n, 0);
    switch (p.scene) {
      case 'ari': return `u${n} = 1 + ${n} × 0,5 = ${fr(M.ari(n))}\nraison r = 0,5`;
      case 'geo': return `u${n} = 0,5 × 1,3^${n} = ${fr(M.geo(n), 3)}\nraison q = 1,3`;
      case 'lim': return `u${n} = ${fr(M.lim(n), 3)}   |u${n} − 2| = ${fr(Math.abs(M.lim(n) - 2), 3)}\nε = 0,3 : dans la bande dès n ≥ ${M.RANK}`;
      case 'rec': return `u${n} = ${fr(M.rec(n), 4)}\nlimite ℓ = 2`;
    }
    return '';
  },
});
