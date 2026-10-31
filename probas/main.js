import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/kit.js';
import * as M from './model.js';

let scene = 'galton';
startBook({
  no: 18, PAGES, PLATES, clock0: 0,
  lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: W.update, labels: W.labels }; },
  state: (clock, reduced) => ({ clock, scene, tc: reduced ? M.CYCLE : ((clock % M.CYCLE) + M.CYCLE) % M.CYCLE, p: reduced ? 0.5 : M.pOf(clock), n: reduced ? 32 : M.nOf(clock), ks: reduced ? 2 : M.kSig(clock) }),
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'galton': { const n = Math.max(0, Math.min(M.NB, Math.floor((s.tc - M.FALL) / M.GAP) + 1)); return `${n} billes arrivées\nP(X = 4) = 70/256 ≈ 0,273`; }
      case 'binom': return `X ∼ B(8 ; ${fr(s.p)})\nP(X = 4) = ${fr(M.binom(8, s.p, 4), 4)}`;
      case 'esp': return `E(X) = ${fr(8 * s.p)}\nσ = ${fr(Math.sqrt(8 * s.p * (1 - s.p)))}`;
      case 'normal': return `n = ${s.n}   μ = ${s.n / 2}   σ = ${fr(Math.sqrt(s.n) / 2)}\nvers N(0 ; 1)`;
      case 'sigma': return `P(|X − μ| ≤ ${s.ks}σ) ≈ ${fr(M.within(s.ks), 4)}`;
    }
    return '';
  },
});
