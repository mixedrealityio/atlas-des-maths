import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let scene = 'axe';
startBook({
  no: 21, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state(clock, reduced) {
    return { clock, scene, phi: reduced ? M.rad(120) : M.phiOf(clock), half: reduced ? Math.PI : M.halfOf(clock),
      th: reduced ? Math.PI / 2 : M.thetaOf(clock), k: reduced ? 2 : M.kOf(clock), al: reduced ? Math.PI / 6 : M.alphaOf(clock) };
  },
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'axe': { const A1 = M.apply(M.refl(s.phi), M.A); return `axe d à ${fr(M.deg(s.phi), 1)}°   A′ = (${fr(A1[0])} ; ${fr(A1[1])})\ndist(A, d) = ${fr(M.distLine(M.A, s.phi), 3)} = dist(A′, d)`; }
      case 'centre': { const A1 = M.apply(M.rot(s.half), M.A); return `angle = ${fr(M.deg(s.half), 1)}°\nA′ = (${fr(A1[0])} ; ${fr(A1[1])})`; }
      case 'rot': { const A1 = M.apply(M.rot(s.th), M.A); return `θ = ${fr(M.deg(s.th), 1)}°   A′ = (${fr(A1[0])} ; ${fr(A1[1])})\nOA = ${fr(M.norm(M.A), 3)} = OA′ = ${fr(M.norm(A1), 3)}`; }
      case 'homo': { const A1 = M.apply(M.homo(s.k), M.A); return `k = ${fr(s.k)}   OA′ = |k| × OA = ${fr(M.norm(A1), 3)}\naire(F′) = ${fr(s.k * s.k)} × ${fr(M.area(M.F))} = ${fr(s.k * s.k * M.area(M.F), 3)}`; }
      case 'compo': { const r = M.mul(M.refl(M.PHI1 + s.al), M.refl(M.PHI1)); return `α = ${fr(M.deg(s.al), 1)}°   2α = ${fr(2 * M.deg(s.al), 1)}°\nangle AOA″ = ${fr(M.deg(M.angle(M.A, M.apply(r, M.A))), 1)}°`; }
    }
    return '';
  },
});
