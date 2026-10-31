// La figure : deux tableaux debout. À gauche le repère des paraboles ; à droite, l'enclos et le demi-cercle
// de l'inégalité arithmético-géométrique.
import * as THREE from 'three';
import { lines, V } from '../engine/parts.js';
import { board2d, liveCurve, sizedBox, setBox, rod, rodTo, ball } from '../engine/kit.js';
import * as M from './model.js';

export const X = x => x * 0.85, Y = y => y * 0.62;
export const OX = 13;                                          // second tableau
export const RX = x => OX + x * 0.62, RY = y => y * 0.62;
const Z = 0.12, XA = -3.6, XB = 5.6, YA = -5.2, YB = 8.4;

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let scene_ = 'a', st = {};
  const is = (...k) => k.includes(scene_);

  // ---------- les paraboles ----------
  const gB = asm('board', root, { title: 'Le repère', sub: 'x de −3 à 5' });
  gB.userData.focus = () => ({ target: [X(1), Y(1.5), 0], radius: 4.2 });
  board2d(gB, label, { x0: XA, x1: XB, y0: YA, y1: YB, X, Y, ticksX: [-3, -2, -1, 1, 2, 3, 4, 5], ticksY: [-4, -2, 2, 4, 6, 8] });
  const gP = asm('para', root, { title: 'La parabole', sub: 'y = ax² + bx + c' });
  gP.userData.focus = () => ({ target: [X(1), Y(1.5), 0], radius: 3.6 });
  const par = liveCurve(gP, { n: 240, r: 0.05, pal: 'ink', name: 'Parabole' });
  const ghost = liveCurve(gP, { n: 200, r: 0.02, pal: 'dark', name: 'y = x²' });
  const vtx = ball(gP, 'red', 'Sommet', 0.12), axis = lines(gP, [0, 0, 0, 0, 1, 0], '#e5484d');
  const r1 = ball(gP, 'blue', 'Racine', 0.12), r2 = ball(gP, 'blue', 'Racine', 0.12);
  const neg = sizedBox(gP, { pal: 'red', tone: 'hi', name: 'Solutions de f(x) < 0' });
  const pt = ball(gP, 'ink', 'Point (x ; f(x))', 0.1), drop = rod(gP, { r: 0.012, pal: 'dark', name: 'Hauteur f(x)' });
  label('vec red', 'S', () => is('canon', 'disc') ? V(X(st.vx) + 0.3, Y(st.vy) - 0.25, Z) : null);
  label('vec blue', '<i>x</i>₁', () => is('disc', 'sign') && st.rts.length === 2 ? V(X(st.rts[0]) - 0.15, Y(0) - 0.4, Z) : null);
  label('vec blue', '<i>x</i>₂', () => is('disc', 'sign') && st.rts.length === 2 ? V(X(st.rts[1]) + 0.15, Y(0) - 0.4, Z) : null);
  label('board', '', () => is('a') ? V(X(3.4), Y(7.4), Z) : null, () => `<i>a</i> = ${fr(st.a)}`);
  label('board', '', () => is('disc') ? V(X(-3.2), Y(7.4), Z) : null, () => `Δ = ${fr(M.delta(1, -2, st.c))}`);
  label('board', '', () => is('sign') ? V(X(st.x) + 0.25, Y(M.g(st.x)) + 0.35, Z) : null, () => M.g(st.x) < -1e-9 ? '<i>f</i>(<i>x</i>) &lt; 0' : '<i>f</i>(<i>x</i>) ≥ 0');

  // ---------- l'enclos et l'aire ----------
  const gR = asm('enclos', root, { title: 'L’enclos', sub: '20 m de grillage' });
  gR.userData.focus = () => ({ target: [RX(5), RY(5), 0], radius: 4 });
  board2d(gR, label, { x0: -0.8, x1: 11, y0: -1.2, y1: 27, X: RX, Y: y => RY(y) * 0.38, ticksX: [2, 4, 6, 8, 10], ticksY: [5, 10, 15, 20, 25], vis: () => is('opt') });
  const AY = y => RY(y) * 0.38;
  const aCurve = liveCurve(gR, { n: 120, r: 0.04, pal: 'blue', name: 'Aire x(10 − x)' });
  aCurve.set(Array.from({ length: 101 }, (_, i) => { const x = i / 10; return V(RX(x), AY(M.area(x)), Z); }));
  const aPt = ball(gR, 'red', 'Point (x ; aire)', 0.12);
  const field = sizedBox(gR, { pal: 'base', tone: 'hi', name: 'L’enclos' });
  const fence = [0, 1, 2, 3].map(() => rod(gR, { r: 0.03, pal: 'ink', name: 'Grillage' }));
  label('mark', '', () => is('opt') ? V(RX(11.9) + st.w * 0.22, AY(0) - 0.35, Z) : null, () => `<i>x</i> = ${fr(st.w, 1)}`);
  label('board', '', () => is('opt') ? V(RX(11.9) + st.w * 0.44 + 0.2, AY(0) + (10 - st.w) * 0.22, Z) : null, () => `10 − <i>x</i> = ${fr(10 - st.w, 1)}`);
  label('vec red', '', () => is('opt') ? V(RX(st.w) + 0.3, AY(M.area(st.w)) + 0.3, Z) : null, () => `${fr(M.area(st.w), 1)} m²`);

  // ---------- le demi-cercle de l'inégalité arithmético-géométrique ----------
  const gG = asm('amgm', root, { title: 'Le demi-cercle', sub: 'diamètre a + b' });
  gG.userData.focus = () => ({ target: [RX(3), RY(2), 0], radius: 3 });
  board2d(gG, label, { x0: -0.8, x1: 6.8, y0: -1.2, y1: 4.4, X: RX, Y: RY, axes: false, vis: () => is('amgm') });
  const semi = liveCurve(gG, { n: 120, r: 0.04, pal: 'ink', name: 'Demi-cercle' });
  semi.set(Array.from({ length: 121 }, (_, i) => { const t = Math.PI * i / 120; return V(RX(3 + 3 * Math.cos(t)), RY(3 * Math.sin(t)), Z); }));
  const diam = rod(gG, { r: 0.03, pal: 'ink', name: 'Diamètre a + b' }); rodTo(diam, V(RX(0), RY(0), Z), V(RX(6), RY(0), Z));
  const radius = rod(gG, { r: 0.04, pal: 'blue', name: 'Rayon (a + b)/2' }), height = rod(gG, { r: 0.045, pal: 'red', name: 'Hauteur √(ab)' });
  const segA = rod(gG, { r: 0.05, pal: 'red', name: 'a' }), segB = rod(gG, { r: 0.05, pal: 'blue', name: 'b' });
  const top = ball(gG, 'red', 'Point du cercle', 0.1);
  label('mark', '<i>a</i>', () => is('amgm') ? V(RX(st.sa / 2), RY(0) - 0.35, Z) : null);
  label('mark', '<i>b</i>', () => is('amgm') ? V(RX(st.sa + (6 - st.sa) / 2), RY(0) - 0.35, Z) : null);
  label('vec red', '√(<i>ab</i>)', () => is('amgm') ? V(RX(st.sa) + 0.5, RY(st.gm / 2), Z) : null);
  label('vec blue', '(<i>a</i> + <i>b</i>)/2', () => is('amgm') ? V(RX(3) - 0.2, RY(3.45), Z) : null);

  const pts = [];
  function curve(f) { pts.length = 0; for (let i = 0; i <= 240; i++) { const x = XA + 0.2 + (XB - XA - 0.4) * i / 240, y = f(x); if (y > YA + 0.15 && y < YB - 0.15) pts.push(V(X(x), Y(y), Z)); else if (pts.length) break; } return pts.slice(); }
  function update(s) {
    scene_ = s.scene;
    const left = is('a', 'canon', 'disc', 'sign');
    gP.visible = left; gR.visible = is('opt'); gG.visible = is('amgm');
    let a = 1, b = 0, c = 0;
    if (is('a')) a = s.a;
    if (is('canon')) { const [h, k] = s.hk; b = -2 * h; c = h * h + k; }
    if (is('disc')) { b = -2; c = s.c; }
    if (is('sign')) { b = -2; c = -3; }
    const vx = -b / (2 * a), vy = a * vx * vx + b * vx + c, rts = M.roots(a, b, c);
    st = { ...s, vx, vy, rts };
    par.set(curve(x => a * x * x + b * x + c));
    ghost.set(curve(x => x * x)); ghost.mesh.visible = is('a', 'canon');
    vtx.position.set(X(vx), Y(vy), Z + 0.02); axis.geometry.attributes.position.array.set([X(vx), Y(YA + 0.3), Z, X(vx), Y(YB - 0.3), Z]); axis.geometry.attributes.position.needsUpdate = true; axis.geometry.computeBoundingSphere();
    vtx.visible = axis.visible = is('canon', 'disc', 'a');
    r1.visible = r2.visible = is('disc', 'sign') && rts.length > 0;
    if (rts.length) { r1.position.set(X(rts[0]), Y(0), Z + 0.03); r2.position.set(X(rts[rts.length - 1]), Y(0), Z + 0.03); }
    setBox(neg, X(-1), X(3), Y(0) - 0.06, Y(0) + 0.06, Z - 0.03, Z + 0.03); neg.visible = is('sign');
    pt.position.set(X(s.x), Y(M.g(s.x)), Z + 0.03); rodTo(drop, V(X(s.x), Y(0), Z), V(X(s.x), Y(M.g(s.x)), Z));
    pt.visible = is('sign'); drop.visible = drop.visible && is('sign');
    // l'enclos, dessiné en haut à gauche de son tableau (échelle 0,22 par mètre)
    const w = s.w, h = 10 - w, k = 0.22, x0 = RX(11.9), y0 = AY(0);
    setBox(field, x0, x0 + w * k * 2, y0, y0 + h * k * 2, Z - 0.05, Z);
    const c4 = [[x0, y0], [x0 + w * k * 2, y0], [x0 + w * k * 2, y0 + h * k * 2], [x0, y0 + h * k * 2]];
    fence.forEach((f, i) => rodTo(f, V(c4[i][0], c4[i][1], Z + 0.05), V(c4[(i + 1) % 4][0], c4[(i + 1) % 4][1], Z + 0.05)));
    aPt.position.set(RX(w), AY(M.area(w)), Z + 0.03);
    // le demi-cercle
    const sa = s.sa, gm = Math.sqrt(sa * (6 - sa));
    st.sa = sa; st.gm = gm;
    rodTo(segA, V(RX(0), RY(0), Z + 0.04), V(RX(sa), RY(0), Z + 0.04)); rodTo(segB, V(RX(sa), RY(0), Z + 0.05), V(RX(6), RY(0), Z + 0.05));
    rodTo(height, V(RX(sa), RY(0), Z + 0.06), V(RX(sa), RY(gm), Z + 0.06)); top.position.set(RX(sa), RY(gm), Z + 0.06);
    rodTo(radius, V(RX(3), RY(0), Z + 0.03), V(RX(3), RY(3), Z + 0.03));
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
