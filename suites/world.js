// La figure : deux tableaux debout. À gauche, les termes en barres (n en abscisse) ; à droite, l'escalier
// de la suite récurrente entre la courbe de f et la droite y = x.
import * as THREE from 'three';
import { lines, V } from '../engine/parts.js';
import { board2d, plotTube, liveCurve, sizedBox, setBox, rod, rodTo, ball } from '../engine/kit.js';
import * as M from './model.js';

export const BX = n => n * 0.75, BY = y => y * 0.75;            // tableau des barres
export const CX0 = 11;
export const CX = x => CX0 + x * 1.9, CY = y => y * 1.9;         // tableau de l'escalier

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let look = {}, vals = [], nShown = 0;
  const on = k => (look[k] || 0) > 0.5;

  // ---------- les barres ----------
  const gT = asm('terms', root, { title: 'Les termes de la suite', sub: 'u₀, u₁, u₂, …' });
  gT.userData.focus = () => ({ target: [BX(5), BY(3), 0], radius: 4.5 });
  board2d(gT, label, { x0: -0.9, x1: M.N + 0.9, y0: -0.8, y1: 8.4, X: BX, Y: BY, ticksX: [0, 2, 4, 6, 8, 10], ticksY: [2, 4, 6, 8] });
  label('axis', '<i>n</i>', () => V(BX(M.N + 0.6), BY(-0.45), 0));
  const bars = Array.from({ length: M.N + 1 }, (_, n) => sizedBox(gT, { pal: 'blue', name: `u${n}` }));
  const caps = Array.from({ length: M.N + 1 }, () => sizedBox(gT, { pal: 'red', name: 'Ce qu’on ajoute' }));
  for (let n = 0; n <= M.N; n++) label('mark', '', () => n <= nShown && vals[n] !== undefined ? V(BX(n), BY(vals[n]) + 0.3, 0.2) : null, () => fr(vals[n] ?? 0, 2));
  // la bande autour de la limite
  const band = sizedBox(gT, { pal: 'red', tone: 'lo', name: 'Bande ]L − ε ; L + ε[', opacity: 0.25 });
  setBox(band, BX(-0.6), BX(M.N + 0.6), BY(M.LIM.L - M.LIM.eps), BY(M.LIM.L + M.LIM.eps), -0.01, 0.31);
  band.userData.noEdge = true;
  const Lr = rod(gT, { r: 0.015, pal: 'red', name: 'Limite L = 2' }); rodTo(Lr, V(BX(-0.6), BY(2), 0.32), V(BX(M.N + 0.6), BY(2), 0.32));
  const rank = rod(gT, { r: 0.02, pal: 'ink', name: 'Rang N' }); rodTo(rank, V(BX(M.RANK - 0.5), BY(0), 0.33), V(BX(M.RANK - 0.5), BY(5), 0.33));
  label('vec red', '<i>L</i> = 2', () => on('lim') ? V(BX(M.N + 0.4), BY(2) + 0.3, 0.3) : null);
  label('board', `à partir du rang ${M.RANK}`, () => on('lim') ? V(BX(M.RANK - 0.4), BY(5.3), 0.3) : null);

  // ---------- l'escalier ----------
  const gC = asm('cobweb', root, { title: 'L’escalier', sub: 'u(n+1) = f(u(n))' });
  gC.userData.focus = () => ({ target: [CX(1.4), CY(1.4), 0], radius: 3.4 });
  board2d(gC, label, { x0: -0.25, x1: 3.1, y0: -0.25, y1: 3.1, X: CX, Y: CY, ticksX: [1, 2, 3], ticksY: [1, 2, 3], vis: () => on('rec') });
  plotTube(gC, M.f, CX, CY, 0, 3, { pal: 'blue', r: 0.045, name: 'Courbe de f' });
  plotTube(gC, x => x, CX, CY, 0, 3, { pal: 'dark', r: 0.025, name: 'Droite y = x' });
  const stair = liveCurve(gC, { n: 240, r: 0.03, pal: 'red', name: 'Escalier' });
  const uB = ball(gC, 'red', 'Terme u(n)', 0.09);
  label('vec blue', '𝒞<sub><i>f</i></sub>', () => on('rec') ? V(CX(2.9), CY(M.f(2.9)) + 0.3, 0.1) : null);
  label('mark', '<i>y</i> = <i>x</i>', () => on('rec') ? V(CX(2.75), CY(2.75) - 0.35, 0.1) : null);
  label('vec red', 'ℓ = 2', () => on('rec') ? V(CX(2), CY(0) - 0.45, 0.1) : null);

  function update(s, lk) {
    look = lk; nShown = s.n;
    gC.visible = on('rec');
    band.visible = Lr.visible = rank.visible = on('lim');
    const w = { ari: lk.ari || 0, geo: lk.geo || 0, lim: lk.lim || 0 }, tot = w.ari + w.geo + w.lim || 1;
    for (let n = 0; n <= M.N; n++) {
      const v = (w.ari * M.ari(n) + w.geo * M.geo(n) + w.lim * M.lim(n)) / tot, prev = n ? (w.ari * M.ari(n - 1) + w.geo * M.geo(n - 1) + w.lim * M.lim(n - 1)) / tot : v;
      vals[n] = v;
      const vis = n <= s.n;
      const up = v >= prev;          // le morceau rouge montre ce qu'on ajoute ; quand le terme baisse, la barre est simplement plus basse
      setBox(bars[n], BX(n) - 0.24, BX(n) + 0.24, 0, BY(up ? prev : v), 0, 0.28);
      setBox(caps[n], BX(n) - 0.24, BX(n) + 0.24, BY(prev), BY(v), 0, 0.28);
      bars[n].visible = bars[n].visible && vis; caps[n].visible = caps[n].visible && vis && n > 0 && up;
    }
    // l'escalier : (u0, 0) → (u0, u1) → (u1, u1) → (u1, u2) …
    const pts = [V(CX(M.U0), CY(0), 0.12)];
    let u = M.U0;
    for (let k = 0; k < Math.max(1, s.n); k++) { const v = M.f(u); pts.push(V(CX(u), CY(v), 0.12), V(CX(v), CY(v), 0.12)); u = v; }
    stair.set(pts); uB.position.copy(V(CX(u), CY(u), 0.12));
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
