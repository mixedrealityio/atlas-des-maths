import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let scene = 'chord';
startBook({
  no: 13, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state(clock, reduced) {
    const c = reduced ? { phi: 1.1, d: 1.6 } : M.chordOf(clock);
    return { clock, scene, ...c, tp: reduced ? 2.1 : M.tP(clock), D: reduced ? 5 : M.DOf(clock), th: reduced ? 2.2 : M.thetaOf(clock), n: reduced ? 12 : M.nOf(clock) };
  },
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'chord': { const c = M.chord(s.phi, s.d); return `OM = ${fr(s.d)}   AM = MB = ${fr(c.half)}\nAM² + OM² = ${fr(c.half ** 2 + s.d ** 2)} = r²`; }
      case 'inscribed': return `angle APB = ${fr(M.deg(M.angleAt(M.on(s.tp), M.on(M.TA), M.on(M.TB))), 2)}°\nangle AOB = 140°`;
      case 'semi': return `angle APB = ${fr(M.deg(M.angleAt(M.on(s.tp), M.on(Math.PI), M.on(0))), 2)}°\n[AB] diamètre`;
      case 'tangent': return `OP = ${fr(s.D)}   r = 3\nPT = PT′ = ${fr(M.tanLen(s.D), 3)}`;
      case 'sector': return `θ = ${fr(s.th, 3)} rad = ${fr(M.deg(s.th), 1)}°\narc = ${fr(M.arcLen(s.th), 3)}   aire = ${fr(M.sectorArea(s.th), 3)}`;
      case 'liuhui': return `${s.n} côtés\ndemi-périmètre (r = 1) = ${fr(M.halfPerim(s.n), 6)}`;
    }
    return '';
  },
});
