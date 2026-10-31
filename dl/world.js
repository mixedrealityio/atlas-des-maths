// La figure : un tableau debout. La fonction en noir, son polynôme de Taylor en rouge, qui épouse la courbe
// de plus en plus loin de 0 quand l'ordre augmente.
import * as THREE from 'three';
import { V } from '../engine/parts.js';
import { board2d, plotTube, liveCurve, rod, rodTo, ball } from '../engine/kit.js';
import * as M from './model.js';

export const X = x => x * 1.45, Y = y => y * 0.85;
const X0 = -2.7, X1 = 2.7, Y0 = -2.3, Y1 = 5.2;

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let look = {}, st = { key: 'exp', n: 1, x: 1 };
  const on = k => (look[k] || 0) > 0.5;

  const gB = asm('board', root, { title: 'Le repère', sub: 'autour de 0' });
  gB.userData.focus = () => ({ target: [0, Y(1), 0], radius: 3.6 });
  board2d(gB, label, { x0: X0 - 0.2, x1: X1 + 0.3, y0: Y0, y1: Y1 + 0.3, X, Y, ticksX: [-2, -1, 1, 2], ticksY: [-2, -1, 1, 2, 3, 4, 5] });

  const gF = asm('f', root, { title: 'La fonction', sub: 'que l’on veut approcher' });
  gF.userData.focus = () => ({ target: [0, Y(1), 0], radius: 3 });
  const curves = {};
  for (const k of ['exp', 'cos', 'sin']) {
    const lo = k === 'exp' ? X0 : X0, hi = k === 'exp' ? Math.log(Y1) : X1;
    curves[k] = plotTube(gF, M.FN[k].f, X, Y, lo, hi, { pal: 'ink', r: 0.05, name: k });
    label('board', k === 'exp' ? 'e<sup><i>x</i></sup>' : `${k} <i>x</i>`, () => st.key === k ? (k === 'exp' ? V(X(1.45) + 0.55, Y(Math.exp(1.45)), 0.1) : V(X(2.3), Y(M.FN[k].f(2.3)) + 0.35, 0.1)) : null);
  }

  const gT = asm('poly', root, { title: 'Le polynôme de Taylor', sub: 'qui épouse la courbe près de 0' });
  gT.userData.focus = () => ({ target: [0, Y(1), 0], radius: 2.4 });
  const poly = liveCurve(gT, { n: 260, r: 0.04, pal: 'red', name: 'Polynôme de Taylor' });
  const pt0 = ball(gT, 'red', 'Le point de contact (0 ; f(0))', 0.1);
  label('vec red', '', () => V(X(-2.5), Y(4.6), 0.1), () => `<i>T</i><sub>${st.n}</sub>`);

  // sin x / x : le point qui glisse vers 0, la corde jusqu'à l'origine
  const gL = asm('lim', root, { title: 'sin x / x', sub: 'la pente de la corde' });
  gL.userData.focus = () => ({ target: [0, 0, 0], radius: 2.2 });
  rodTo(rod(gL, { r: 0.015, pal: 'dark', name: 'Tangente y = x' }), V(X(-1.2), Y(-1.2), 0.12), V(X(2.2), Y(2.2), 0.12));
  label('mark', '<i>y</i> = <i>x</i>', () => on('lim') ? V(X(2.2) + 0.3, Y(2.2), 0.1) : null);
  const chord = rod(gL, { r: 0.03, pal: 'blue', name: 'Corde de pente sin x / x' }), bx = ball(gL, 'blue', 'Point (x ; sin x)', 0.1);

  function update(s, lk) {
    look = lk; st = s;
    for (const k in curves) curves[k].visible = s.key === k;
    const T = M.taylor(s.key, s.n);
    // la partie du polynôme qui reste dans le tableau, d'un seul tenant autour de 0
    const N = 240, xs = Array.from({ length: N + 1 }, (_, i) => X0 + (X1 - X0) * i / N);
    let i0 = N / 2, i1 = N / 2;
    const inside = x => { const y = T(x); return y >= Y0 && y <= Y1; };
    while (i0 > 0 && inside(xs[i0 - 1])) i0--;
    while (i1 < N && inside(xs[i1 + 1])) i1++;
    poly.set(xs.slice(i0, i1 + 1).map(x => V(X(x), Y(T(x)), 0.14)));
    pt0.position.set(0, Y(M.FN[s.key].f(0)), 0.15);
    gL.visible = on('lim');
    if (on('lim')) { const p = V(X(s.x), Y(Math.sin(s.x)), 0.16); bx.position.copy(p); rodTo(chord, V(0, 0, 0.16), p); }
  }
  return { update, labels };
}
