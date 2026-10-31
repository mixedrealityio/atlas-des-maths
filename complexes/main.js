import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

startBook({
  no: 9, PAGES, PLATES, clock0: 0,
  lookKeys: ['mod', 'mult', 'turn', 'roots', 'sim'],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, z: reduced ? M.expi(0.6, 2) : M.zOf(clock), n: reduced ? 6 : M.nOf(clock), t: reduced ? 1 : M.morph(clock) }),
  readout(s, p) {
    switch (p.scene) {
      case 'mult': { const zw = M.mul(s.z, M.W); return `|zw| = ${fr(M.mod(zw), 3)} = ${fr(M.mod(s.z), 3)} × 1,25\narg zw = arg z + π/4`; }
      case 'turn': return `z = ${M.fmt(s.z)}\niz = ${M.fmt(M.mul(M.I, s.z))}`;
      case 'roots': return `n = ${s.n}\nracines e^(2ikπ/${s.n}), somme = 0`;
      case 'sim': { const { a, b } = M.simAt(s.t); return `a = ${M.fmt(a)}   b = ${M.fmt(b)}\ncentre ω = ${M.fmt(M.fixed(M.SA, M.SB))}`; }
    }
    return `z = ${M.fmt(s.z)}\n|z| = ${fr(M.mod(s.z), 3)}   arg z = ${fr(M.arg(s.z), 3)} rad`;
  },
});
