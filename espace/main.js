import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let scene = 'coords';
startBook({
  no: 16, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, scene, t: reduced ? 0.6 : M.tOf(clock), u: M.inPlane(reduced ? 1 : clock), k: reduced ? 3 : M.kOf(clock) }),
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'coords': return `P(${fr(2 * s.t)} ; ${fr(2 * s.t)} ; ${fr(2 * s.t)})\nDP = ${fr(2 * s.t * Math.sqrt(3), 3)}`;
      case 'normal': return `u = (${s.u.map(c => fr(c)).join(' ; ')})\nn · u = ${fr(Math.abs(M.dot(M.NRM, s.u)) < 1e-9 ? 0 : M.dot(M.NRM, s.u), 3)}`;
      case 'dist': return `d(D, A₁BC₁) = 4/√3 ≈ ${fr(M.DIST, 3)}\nH(4/3 ; 4/3 ; 4/3)`;
      case 'angle': return `dièdre ≈ ${fr(M.deg(M.DIHEDRAL), 1)}°\nangle (DD₁, plan) ≈ ${fr(M.deg(M.LINE_PLANE), 1)}°`;
      case 'section': { const q = M.section(s.k); return `k = ${fr(s.k)}   ${q.length} côtés\naire = ${fr(M.area3(q), 3)}`; }
    }
    return '';
  },
});
