import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

startBook({
  no: 6, PAGES, PLATES, clock0: 0,
  lookKeys: ['proj', 'unroll', 'rem', 'sym'],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, t: reduced ? 2 * Math.PI / 3 : M.theta(clock + 2) }),
  readout(s) {
    const p = M.piStr(s.t);
    return `x = ${fr(s.t, 3)} rad${p ? ` = ${p}` : ''} = ${fr(M.deg(s.t), 1)}°\ncos x = ${fr(Math.cos(s.t), 3)}   sin x = ${fr(Math.sin(s.t), 3)}`;
  },
});
