// La figure : deux tableaux debout. En haut la courbe de f et l'aire en rectangles de papier ;
// en bas la courbe de la primitive F, qui mesure l'aire accumulée.
import * as THREE from 'three';
import { V } from '../engine/parts.js';
import { board2d, plotTube, sizedBox, setBox, rod, rodTo, ball } from '../engine/kit.js';
import * as M from './model.js';

export const X = x => x * 1.4, YT = y => 0.3 + y * 0.95, YB = y => -4.6 + y * 0.5;
const NMAX = 64;

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let look = {}, cur = { lo: 0, hi: 4 };
  const on = k => (look[k] || 0) > 0.5;

  const gT = asm('curve', root, { title: 'La courbe de f', sub: 'f(x) = x²/2 − 2x + 3' });
  gT.userData.focus = () => ({ target: [X(2), YT(1.6), 0], radius: 3.6 });
  board2d(gT, label, { x0: -0.6, x1: 4.7, y0: -0.35, y1: 3.6, X, Y: YT, ticksX: [1, 2, 3, 4], ticksY: [1, 2, 3] });
  plotTube(gT, M.f, X, YT, -0.2, 4.3, { pal: 'ink', r: 0.045, name: 'Courbe de f' });
  label('board', '𝒞<sub><i>f</i></sub>', () => V(X(4.4), YT(M.f(4.3)) + 0.15, 0.1));

  const gA = asm('area', root, { title: 'L’aire', sub: 'découpée en rectangles' });
  gA.userData.focus = () => ({ target: [X(2), YT(1.2), 0], radius: 3.4 });
  const rects = Array.from({ length: NMAX }, (_, i) => sizedBox(gA, { pal: i % 2 ? 'red' : 'red', tone: 'hi', name: 'Rectangle', opacity: 0.8 }));
  const edgeL = rod(gA, { r: 0.025, pal: 'ink', name: 'Borne' }), edgeR = rod(gA, { r: 0.025, pal: 'ink', name: 'Borne' });
  label('vec red', '', () => V(X((cur.lo + cur.hi) / 2), YT(0.45), 0.3), () => cur.hi - cur.lo > 0.6 ? `${fr(cur.val, 3)}` : '');

  const gF = asm('prim', root, { title: 'La primitive F', sub: 'l’aire accumulée depuis 0' });
  gF.userData.focus = () => ({ target: [X(2), YB(3.3), 0], radius: 3 });
  board2d(gF, label, { x0: -0.6, x1: 4.7, y0: -0.5, y1: 7.5, X, Y: YB, ticksX: [1, 2, 3, 4], ticksY: [2, 4, 6], vis: () => on('prim') });
  plotTube(gF, M.F, X, YB, 0, 4.2, { pal: 'blue', r: 0.04, name: 'Courbe de F' });
  const pB = ball(gF, 'red', 'Point (x ; F(x))', 0.1);
  const link = rod(root, { r: 0.012, pal: 'red', name: 'Lien' });
  const bra = rod(gF, { r: 0.04, pal: 'red', name: 'F(b) − F(a)' }), lvlA = rod(gF, { r: 0.012, pal: 'dark', name: 'F(a)' }), lvlB = rod(gF, { r: 0.012, pal: 'dark', name: 'F(b)' });
  label('board', '𝒞<sub><i>F</i></sub>', () => on('prim') ? V(X(4.25), YB(M.F(4.2)) + 0.2, 0.1) : null);
  label('vec red', '<i>F</i>(<i>b</i>) − <i>F</i>(<i>a</i>)', () => on('ab') ? V(X(M.CB) + 0.95, YB((M.F(M.CA) + M.F(M.CB)) / 2), 0.1) : null);

  function update(s, lk) {
    look = lk;
    gF.visible = on('prim');
    let lo = 0, hi = 4, n = NMAX, left = false;
    if (on('riemann')) { n = s.n; left = true; }
    if (on('prim') && !on('ab')) hi = s.x;
    if (on('ab')) { lo = M.CA; hi = M.CB; }
    const h = (hi - lo) / n; let val = 0;
    rects.forEach((r, i) => {
      if (i >= n) { r.visible = false; return; }
      const x0 = lo + i * h, y = left ? M.f(x0) : M.f(x0 + h / 2);
      val += y * h;
      setBox(r, X(x0) + (n <= 16 ? 0.012 : 0), X(x0 + h) - (n <= 16 ? 0.012 : 0), YT(0), YT(y), -0.02, 0.18);
    });
    cur = { lo, hi, val: left ? val : M.F(hi) - M.F(lo) };
    rodTo(edgeL, V(X(lo), YT(0), 0.2), V(X(lo), YT(M.f(lo)), 0.2)); rodTo(edgeR, V(X(hi), YT(0), 0.2), V(X(hi), YT(M.f(hi)), 0.2));
    // F : le point qui suit la borne, ou l'écart F(b) − F(a)
    pB.position.set(X(hi), YB(M.F(hi)), 0.1);
    rodTo(link, V(X(hi), YT(0), 0.2), V(X(hi), YB(M.F(hi)), 0.2)); link.visible = on('prim');
    bra.visible = lvlA.visible = lvlB.visible = on('ab');
    if (on('ab')) {
      rodTo(bra, V(X(M.CB) + 0.12, YB(M.F(M.CA)), 0.15), V(X(M.CB) + 0.12, YB(M.F(M.CB)), 0.15));
      rodTo(lvlA, V(X(0), YB(M.F(M.CA)), 0.12), V(X(M.CB) + 0.2, YB(M.F(M.CA)), 0.12));
      rodTo(lvlB, V(X(0), YB(M.F(M.CB)), 0.12), V(X(M.CB) + 0.2, YB(M.F(M.CB)), 0.12));
    }
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
