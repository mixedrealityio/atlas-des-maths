// La figure : un tableau debout. À gauche le cercle trigonométrique (rayon 1, dessiné à 2 unités),
// à droite le graphe où le cercle se déroule en sinusoïde. Chaque nombre vient de model.js.
import * as THREE from 'three';
import { part, lines, V } from '../engine/parts.js';
import { board2d, plotTube, liveCurve, rod, rodTo, ball } from '../engine/kit.js';
import * as M from './model.js';

export const R = 2;                                          // le rayon 1 vaut 2 unités du monde
export const GX = t => 3.2 + t * 0.78;                       // abscisse du graphe pour l'angle t
const Z = 0.1;

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let look = {}, t = 0;
  const on = k => (look[k] || 0) > 0.5;
  const C = (x, y) => V(x * R, y * R, Z);
  const G = (a, y) => V(GX(a), y * R, Z);

  // le tableau, et les deux repères dessinés dessus
  const gB = asm('board', root, { title: 'Le cercle trigonométrique', sub: 'rayon 1, centre O' });
  gB.userData.focus = () => ({ target: [0, 0, 0], radius: 2.8 });
  board2d(gB, label, { x0: -1.45, x1: 1.45, y0: -1.3, y1: 1.35, X: x => x * R, Y: y => y * R, axes: false });
  lines(gB, [-1.25 * R, 0, 0.01, 1.25 * R, 0, 0.01, 0, -1.2 * R, 0.01, 0, 1.2 * R, 0.01], '#57575a');
  const circ = Array.from({ length: 128 }, (_, i) => C(Math.cos(i / 64 * Math.PI), Math.sin(i / 64 * Math.PI)));
  part(gB, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(circ, true), 256, 0.035, 8, true), { pal: 'ink', tone: 'hi', name: 'Cercle' });
  label('mark', '<i>O</i>', () => V(-0.25, -0.25, 0));
  label('mark', '1', () => V(R + 0.15, -0.25, 0));
  label('mark', '1', () => V(-0.2, R + 0.15, 0));
  label('axis', 'cos', () => V(1.25 * R + 0.2, 0.25, 0));
  label('axis', 'sin', () => V(0.35, 1.2 * R + 0.1, 0));

  // le point M, son rayon, son arc et ses projections
  const gM = asm('point', root, { title: 'Le point M', sub: 'cos x et sin x sont ses coordonnées' });
  gM.userData.focus = () => ({ target: [0, 0, 0], radius: 2.6 });
  const ray = rod(gM, { r: 0.03, pal: 'ink', name: 'Rayon OM' });
  const cosR = rod(gM, { r: 0.05, pal: 'blue', name: 'cos x' }), sinR = rod(gM, { r: 0.05, pal: 'red', name: 'sin x' });
  const mB = ball(gM, 'red', 'Point M', 0.12);
  const arc = liveCurve(gM, { n: 120, r: 0.06, pal: 'red', name: 'Arc de longueur x' });
  label('vec red', '<i>M</i>', () => C(Math.cos(t), Math.sin(t)).multiplyScalar(1.13));
  label('vec blue', 'cos <i>x</i>', () => on('proj') ? C(Math.cos(t) / 2, Math.sin(t) < 0 ? 0.12 : -0.12) : null);
  label('vec red', 'sin <i>x</i>', () => on('proj') ? C(Math.cos(t) + (Math.cos(t) < 0 ? -0.2 : 0.2), Math.sin(t) / 2) : null);
  label('board', '', () => C(0.3 * Math.cos(t / 2), 0.3 * Math.sin(t / 2)).add(V(0.2, 0.1, 0)), () => `<i>x</i> = ${fr(t)}`);

  // la courbe déroulée
  const gS = asm('curve', root, { title: 'La sinusoïde', sub: 'le cercle déroulé' });
  gS.userData.focus = () => ({ target: [GX(Math.PI), 0, 0], radius: 3.2 });
  board2d(gS, label, { x0: GX(0) - 0.4, x1: GX(2 * Math.PI) + 0.9, y0: -1.3, y1: 1.35, X: x => x, Y: y => y * R, axes: false });
  const ax = [GX(0), 0, 0.01, GX(2 * Math.PI) + 0.5, 0, 0.01, GX(0), -1.2 * R, 0.01, GX(0), 1.2 * R, 0.01];
  for (const [k, n] of [[1, 'π/2'], [2, 'π'], [3, '3π/2'], [4, '2π']]) { const x = GX(k * Math.PI / 2); ax.push(x, -0.07, 0.01, x, 0.07, 0.01); label('tick', n, () => on('unroll') ? V(x + 0.05, -0.28, 0) : null); }
  lines(gS, ax, '#57575a');
  const sinFull = plotTube(gS, Math.sin, GX, y => y * R, 0, 2 * Math.PI, { pal: 'dark', r: 0.018, name: 'Courbe de sin' });
  const cosFull = plotTube(gS, Math.cos, GX, y => y * R, 0, 2 * Math.PI, { pal: 'blue', r: 0.03, name: 'Courbe de cos' });
  const trace = liveCurve(gS, { n: 200, r: 0.05, pal: 'red', name: 'Courbe de sin' });
  const gB2 = ball(gS, 'red', 'Point (x, sin x)', 0.1);
  const link = lines(root, [0, 0, 0, 1, 0, 0], '#e5484d'); link.material.transparent = true; link.material.opacity = 0.6;
  label('vec red', 'sin', () => on('unroll') ? G(2 * Math.PI + 0.25, Math.sin(2 * Math.PI)).add(V(0, 0.25, 0)) : null);
  label('vec blue', 'cos', () => on('unroll') ? G(2 * Math.PI + 0.25, 1).add(V(0, 0.25, 0)) : null);

  // les angles remarquables
  const gR = asm('remarq', root, { title: 'Les angles remarquables', sub: 'π/6, π/4, π/3' });
  gR.userData.focus = () => ({ target: [R / 2, R / 2, 0], radius: 1.8 });
  for (const r of M.REMARQ) {
    ball(gR, 'ink', `Angle ${r.n}`, 0.08).position.copy(C(Math.cos(r.t), Math.sin(r.t)));
    if (r.t > 0 && r.t < Math.PI / 2) lines(gR, [0, 0, Z, ...C(Math.cos(r.t), Math.sin(r.t)).toArray()], '#9c9ca2');
    label('mark', r.n, () => on('rem') ? C(Math.cos(r.t) * 1.18, Math.sin(r.t) * 1.18) : null);
  }

  // les symétriques
  const gY = asm('sym', root, { title: 'Les angles associés', sub: '−x, π − x, π + x' });
  gY.userData.focus = () => ({ target: [0, 0, 0], radius: 2.6 });
  const symB = M.SYM.map(s => ({ s, b: ball(gY, 'blue', s.n.replace(/<[^>]+>/g, ''), 0.11), r: rod(gY, { r: 0.02, pal: 'blue', name: 'Rayon' }) }));
  M.SYM.forEach((s, i) => label('vec blue', s.n, () => on('sym') ? C(Math.cos(s.f(t)), Math.sin(s.f(t))).multiplyScalar(1.17) : null));
  const symLines = lines(gY, new Array(12).fill(0), '#5b86d6');

  const pts = [];
  function update(st, lk) {
    look = lk; t = st.t;
    gS.visible = on('unroll'); link.visible = on('unroll');
    gR.visible = on('rem'); gY.visible = on('sym');
    cosR.visible = sinR.visible = on('proj');
    const m = C(Math.cos(t), Math.sin(t));
    mB.position.copy(m); rodTo(ray, C(0, 0), m);
    if (on('proj')) { rodTo(cosR, C(0, 0), C(Math.cos(t), 0)); rodTo(sinR, C(Math.cos(t), 0), m); }
    pts.length = 0; for (let i = 0; i <= 60; i++) { const a = t * i / 60; pts.push(C(Math.cos(a) * 1.0, Math.sin(a) * 1.0)); }
    arc.set(t > 0.02 ? pts : []);
    // la courbe se trace jusqu'à x
    const tr = []; for (let i = 0; i <= 120; i++) { const a = t * i / 120; tr.push(G(a, Math.sin(a))); }
    trace.set(t > 0.02 ? tr : []);
    gB2.position.copy(G(t, Math.sin(t)));
    link.geometry.attributes.position.array.set([m.x, m.y, Z, GX(t), m.y, Z]); link.geometry.attributes.position.needsUpdate = true; link.geometry.computeBoundingSphere();
    // symétriques
    const sl = symLines.geometry.attributes.position.array; let k = 0;
    for (const { s, b, r } of symB) { const p = C(Math.cos(s.f(t)), Math.sin(s.f(t))); b.position.copy(p); rodTo(r, C(0, 0), p); }
    const pN = C(Math.cos(-t), Math.sin(-t)), pS = C(Math.cos(Math.PI - t), Math.sin(Math.PI - t));
    for (const p of [m, pN, m, pS]) { sl[k++] = p.x; sl[k++] = p.y; sl[k++] = Z; }
    symLines.geometry.attributes.position.needsUpdate = true; symLines.geometry.computeBoundingSphere();
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
