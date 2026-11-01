import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let scene = 'proj';
startBook({
  no: 20, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state(clock, reduced) {
    return { clock, scene, th: reduced ? Math.PI / 3 : M.thetaOf(clock), vc: reduced ? [-1, 2] : M.vcOf(clock), m: reduced ? [2, 2] : M.mOf(clock), al: reduced ? 2 * Math.PI / 3 : M.alphaOf(clock) };
  },
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'proj': return `OH = ${fr(M.projLen(s.th))}\nu · v = 4 × OH = ${fr(4 * M.projLen(s.th))}`;
      case 'cos': return `θ = ${fr(M.deg(s.th), 1)}°   cos θ = ${fr(Math.cos(s.th), 3)}\nu · v = 12 cos θ = ${fr(12 * Math.cos(s.th))}`;
      case 'coords': return `v = (${fr(s.vc[0])} ; ${fr(s.vc[1])})\nu · v = ${fr(M.dot(M.UC, s.vc))}`;
      case 'level': return `M = (2 ; ${fr(s.m[1])})\nAB · AM = ${fr(M.dot(M.AB, s.m))}`;
      case 'kashi': return `α = ${fr(M.deg(s.al), 1)}°   a = ${fr(M.triDist(s.al), 3)}\n√(b² + c² − 2bc cos α) = ${fr(M.kashi(s.al), 3)}`;
    }
    return '';
  },
});
