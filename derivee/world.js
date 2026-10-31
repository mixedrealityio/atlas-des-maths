// La figure : deux tableaux de papier dressés l'un au-dessus de l'autre. En haut la courbe de f,
// en bas celle de f'. Les courbes sont des tubes d'encre, les droites des tiges. Chaque nombre vient de model.js.
import * as THREE from 'three';
import { part, box, cyl, lines, shadeMat, V } from '../engine/parts.js';
import { rod, rodTo } from '../engine/kit.js';
import * as M from './model.js';

// repère du tableau du haut (f) et du bas (f')
export const SX = 1.2;
export const X = x => x * SX;
export const YF = y => 1.6 + y * 0.9;
export const YD = y => -4.4 + (y + 1.5) * 0.55;
const Z = 0.1;                                    // les tracés flottent juste devant le papier

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let look = {};
  const on = k => (look[k] || 0) > 0.5;
  const P = (x, y) => V(X(x), y, Z);

  // un tableau : papier, axes, graduations
  function board(parent, Y, y0, y1, ticksY, name, vis = () => true) {
    const xa = X(M.X0 - 0.45), xb = X(M.X1 + 0.35), ya = Y(y0), yb = Y(y1);
    const b = part(parent, box(xb - xa, yb - ya, 0.12, 0.03), { pal: 'board', tone: 'lo', name });
    b.position.set((xa + xb) / 2, (ya + yb) / 2, -0.06); b.userData.home = b.position.clone();
    const ax = [X(M.X0 - 0.3), Y(0), 0.01, X(M.X1 + 0.2), Y(0), 0.01, X(0), ya + 0.1, 0.01, X(0), yb - 0.1, 0.01];
    for (let x = 1; x <= 4; x++) { ax.push(X(x), Y(0) - 0.07, 0.01, X(x), Y(0) + 0.07, 0.01); label('tick', String(x), () => vis() ? V(X(x) + 0.08, Y(0) - 0.22, 0) : null); }
    for (const y of ticksY) { ax.push(X(0) - 0.07, Y(y), 0.01, X(0) + 0.07, Y(y), 0.01); label('tick', String(y), () => vis() ? V(X(0) - 0.12, Y(y), 0) : null); }
    lines(parent, ax, '#57575a');
    return b;
  }
  function curveTube(parent, fn, Y, pal, name, r = 0.045, a = M.X0, b = M.X1) {
    const pts = Array.from({ length: 161 }, (_, i) => { const x = a + (b - a) * i / 160; return V(X(x), Y(fn(x)), Z); });
    return part(parent, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 320, r, 8), { pal, tone: 'hi', name });
  }
  const ball = (parent, pal, name, r = 0.11) => part(parent, new THREE.SphereGeometry(r, 20, 14), { pal, tone: 'hi', name });

  // =====================================================================================
  // le tableau de f
  const gC = asm('curve', root, { title: 'La courbe de f', sub: 'f(x) = x³/3 − 2x² + 3x + 1' });
  gC.userData.focus = () => ({ target: [X(2), YF(1.8), 0], radius: 3.6 });
  board(gC, YF, -1.6, 5, [1, 2, 3, 4], 'Tableau');
  curveTube(gC, M.f, YF, 'ink', 'Courbe de f');
  label('board', '𝒞<sub><i>f</i></sub>', () => V(X(4.45), YF(M.f(4.45)) + 0.2, 0));
  label('axis', '<i>x</i>', () => V(X(M.X1 + 0.3), YF(0) + 0.2, 0));
  label('axis', '<i>y</i>', () => V(X(0) - 0.15, YF(4.9), 0));

  // la tangente qui se promène
  const gT = asm('tangent', root, { title: 'La tangente', sub: 'la droite qui épouse la courbe' });
  const tan = rod(gT, { r: 0.035, pal: 'red', name: 'Tangente' });
  const mBall = ball(gT, 'red', 'Point M');
  let xm = 2;
  label('vec red', '<i>M</i>', () => on('tan') ? V(X(xm) - 0.15, YF(M.f(xm)) + 0.32, Z) : null);
  label('board', '', () => on('tan') && !on('dboard') ? V(X(xm) + 0.5, YF(M.f(xm)) - 0.45, Z) : null, () => `pente ${fr(M.df(xm))}`);

  // la sécante en A, avec son petit triangle h / Δy
  const gS = asm('secant', root, { title: 'La sécante (AM)', sub: 'une pente moyenne' });
  const sec = rod(gS, { r: 0.03, pal: 'blue', name: 'Sécante' });
  const run = rod(gS, { r: 0.018, pal: 'dark', name: 'Écart h' }), rise = rod(gS, { r: 0.018, pal: 'dark', name: 'Écart Δy' });
  const aBall = ball(gS, 'ink', 'Point A'), hBall = ball(gS, 'blue', 'Point M');
  const tanA = rod(gS, { r: 0.022, pal: 'red', name: 'Tangente en A' });
  let h = 1;
  label('vec', '<i>A</i>', () => on('sec') ? V(X(M.A) - 0.1, YF(M.f(M.A)) + 0.32, Z) : null);
  label('vec blue', '<i>M</i>', () => on('sec') && h > 0.25 ? V(X(M.A + h) + 0.05, YF(M.f(M.A + h)) + 0.3, Z) : null);
  label('mark', '', () => on('sec') && h > 0.4 ? V(X(M.A + h / 2), YF(M.f(M.A)) - 0.25, Z) : null, () => `<i>h</i> = ${fr(h)}`);

  // =====================================================================================
  // le tableau de f'
  const gD = asm('deriv', root, { title: 'La courbe de f′', sub: 'la pente de f, point par point' });
  gD.userData.focus = () => ({ target: [X(2), YD(2), 0], radius: 3.2 });
  board(gD, YD, -2, 5.6, [2, 4], 'Tableau', () => on('dboard'));
  curveTube(gD, M.df, YD, 'blue', 'Courbe de f′', 0.04);
  const pBall = ball(gD, 'red', 'Point (x, f′(x))');
  const link = lines(root, [0, 0, 0, 0, 1, 0], '#e5484d');
  link.material.transparent = true; link.material.opacity = 0.7;
  label('board', '𝒞<sub><i>f′</i></sub>', () => on('dboard') ? V(X(4.3), YD(M.df(4.3)) + 0.25, 0) : null);

  // =====================================================================================
  // les extremums : tangentes horizontales
  const gX = asm('extrema', root, { title: 'Les tangentes horizontales', sub: 'là où f′ s’annule' });
  gX.userData.focus = () => ({ target: [X(2), YF(1.8), 0], radius: 3 });
  for (const e of M.EXTREMA) {
    const t = rod(gX, { r: 0.03, pal: 'red', name: 'Tangente horizontale' }); rodTo(t, P(e.x - 0.6, YF(e.y)), P(e.x + 0.6, YF(e.y)));
    ball(gX, 'red', e.kind === 'max' ? 'Maximum local' : 'Minimum local').position.copy(P(e.x, YF(e.y)));
    label('board', e.kind === 'max' ? 'maximum local' : 'minimum local', () => on('var') ? (e.kind === 'max' ? V(X(e.x) - 2.3, YF(e.y) + 0.42, Z) : V(X(e.x) + 0.3, YF(e.y) - 0.75, Z)) : null);
    // sur f', le zéro correspondant
    ball(gX, 'red', 'f′ = 0', 0.09).position.copy(V(X(e.x), YD(0), Z));
  }
  label('mark', '<i>f′</i> &gt; 0', () => on('var') ? V(X(0.35), YD(4.6), Z) : null);
  label('mark', '<i>f′</i> &lt; 0', () => on('var') ? V(X(2), YD(-1.6), Z) : null);
  label('mark', '<i>f′</i> &gt; 0', () => on('var') ? V(X(3.65), YD(4.6), Z) : null);

  const line = (m, x, y, slope, Y, half) => {
    // une droite de pente donnée (dans les unités du graphe) centrée en (x, y), de longueur écran 2·half
    const k = Y(1) - Y(0), d = V(SX, slope * k, 0).normalize().multiplyScalar(half);
    const c = P(x, Y(y)); rodTo(m, c.clone().sub(d), c.clone().add(d));
  };

  function update(s, lk) {
    look = lk;
    gT.visible = on('tan'); gS.visible = on('sec'); gD.visible = on('dboard'); gX.visible = on('var');
    link.visible = on('dboard');
    // la tangente mobile
    xm = s.x;
    mBall.position.copy(P(xm, YF(M.f(xm))));
    line(tan, xm, M.f(xm), M.df(xm), YF, 1.5);
    pBall.position.copy(P(xm, YD(M.df(xm))));
    link.geometry.attributes.position.array.set([X(xm), YF(M.f(xm)), Z, X(xm), YD(M.df(xm)), Z]);
    link.geometry.attributes.position.needsUpdate = true; link.geometry.computeBoundingSphere();
    // la sécante
    h = s.h;
    const a = M.A, fa = M.f(a), fb = M.f(a + h), A = P(a, YF(fa)), B = P(a + h, YF(fb));
    aBall.position.copy(A); hBall.position.copy(B);
    const dir = B.clone().sub(A).normalize();
    rodTo(sec, A.clone().addScaledVector(dir, -1.2), B.clone().addScaledVector(dir, 1.2));
    rodTo(run, A, P(a + h, YF(fa))); rodTo(rise, P(a + h, YF(fa)), B);
    line(tanA, a, fa, M.df(a), YF, 1.3);
    tanA.visible = on('limit');
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
