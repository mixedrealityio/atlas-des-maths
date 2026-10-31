import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { moveCursors, fr } from '../engine/kit.js';
import * as M from './model.js';

startBook({
  no: 4, PAGES, PLATES, clock0: 0,
  lookKeys: ['red'],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, k: reduced ? 0.5 : M.kSlide(clock), kb: reduced ? -0.6 : M.kButterfly(clock), km: reduced ? 0.6 : M.kM(clock) }),
  readout(s, page) {
    if (page.scene === 'recip') return `AM/AB = ${fr(s.km, 3)}   AN/AC = 0,600\n${M.isPar(s.km, M.K_N) ? 'égaux : (MN) // (BC)' : 'différents : pas parallèles'}`;
    const k = page.scene === 'butterfly' ? -s.kb : s.k;
    return `AM/AB = AN/AC = MN/BC = ${fr(k, 3)}\naire AMN / aire ABC = ${fr(k * k, 3)}`;
  },
  onFrame(s, sheets) { moveCursors(sheets, { len: [s.k, s.k], area: [s.k, s.k * s.k] }); },
});
