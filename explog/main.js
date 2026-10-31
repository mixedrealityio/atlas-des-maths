import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let scene = 'grow';
startBook({
  no: 14, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, scene, x: reduced ? 2.5 : M.xOf(clock), a: reduced ? 2 : M.aOf(clock), t: reduced ? 0.8 : M.tOf(clock), s: reduced ? 3 : M.sOf(clock) }),
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'grow': return `x = ${fr(s.x)}\n2^x = ${fr(2 ** s.x)}   2x + 1 = ${fr(2 * s.x + 1)}`;
      case 'family': return `a = ${fr(s.a)}\n${s.a > 1 ? 'a > 1 : croissante' : '0 < a < 1 : décroissante'}`;
      case 'log': return `(${fr(s.t)} ; ${fr(2 ** s.t)}) sur 2^x\n(${fr(2 ** s.t)} ; ${fr(s.t)}) sur log₂ x`;
      case 'rule': return `log ${fr(s.s)} + log 1,8 = log ${fr(s.s * 1.8)}\n${fr(s.s)} × 1,8 = ${fr(s.s * 1.8)}`;
      case 'e': return `pentes en 0 : ln 2 = 0,693\nln e = 1   ln 3 = 1,099`;
    }
    return '';
  },
});
