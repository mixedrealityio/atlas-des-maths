// La figure : une surface z = f(x, y) au-dessus d'un plancher quadrillé, ses lignes de niveau, ses tranches,
// son gradient et son plan tangent. (x, y, z) → scène (x, z, −y).
import * as THREE from 'three';
import { part, lines, arrow, setArrow, shadeMat, V } from '../engine/parts.js';
import { rod, rodTo, ball, liveCurve } from '../engine/kit.js';
import * as M from './model.js';

export const W = (x, y, z) => V(x, z, -y);
const N = 64;

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let sc = 'surface', st = {};
  const is = (...k) => k.includes(sc);

  // le plancher et les axes
  const fl = []; for (let k = -5; k <= 5; k++) { const t = k * M.L / 5; fl.push(...W(t, -M.L, 0).toArray(), ...W(t, M.L, 0).toArray(), ...W(-M.L, t, 0).toArray(), ...W(M.L, t, 0).toArray()); }
  lines(root, fl, '#e0e0dc');
  lines(root, [...W(-M.L - 0.4, 0, 0).toArray(), ...W(M.L + 0.6, 0, 0).toArray(), ...W(0, -M.L - 0.4, 0).toArray(), ...W(0, M.L + 0.6, 0).toArray(), ...W(0, 0, 0).toArray(), ...W(0, 0, 2.6).toArray()], '#8a8a8f');
  label('axis', '<i>x</i>', () => W(M.L + 0.85, 0, 0)); label('axis', '<i>y</i>', () => W(0, M.L + 0.85, 0)); label('axis', '<i>z</i>', () => W(0, 0, 2.85));

  // deux surfaces : la colline f et le col g
  const mkSurf = (fn, pal) => {
    const pos = [], idx = [];
    for (let j = 0; j <= N; j++) for (let i = 0; i <= N; i++) { const x = -M.L + 2 * M.L * i / N, y = -M.L + 2 * M.L * j / N; pos.push(...W(x, y, fn(x, y)).toArray()); }
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const a = j * (N + 1) + i, b = a + 1, c = a + N + 1, d = c + 1; idx.push(a, b, d, a, d, c); }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals();
    const mat = shadeMat(pal, { opacity: 0.82 }).clone(); mat.side = THREE.DoubleSide;
    const g = new THREE.Group();
    const m = part(g, geo, { pal, tone: 'mid', name: 'Surface', mat }); m.userData.noEdge = true;
    const wl = [];
    for (let k = 0; k <= 10; k++) { const t = -M.L + 2 * M.L * k / 10; for (let q = 0; q < 40; q++) { const a = -M.L + 2 * M.L * q / 40, b = -M.L + 2 * M.L * (q + 1) / 40; wl.push(...W(t, a, fn(t, a)).toArray(), ...W(t, b, fn(t, b)).toArray(), ...W(a, t, fn(a, t)).toArray(), ...W(b, t, fn(b, t)).toArray()); } }
    lines(g, wl, '#6c6c72');
    return g;
  };
  const gS = asm('surface', root, { title: 'La surface', sub: 'z = f(x, y)' });
  gS.userData.focus = () => ({ target: [0, 0.8, 0], radius: 3.2 });
  const hill = mkSurf(M.f, 'paper'), saddle = mkSurf(M.g, 'blue'); gS.add(hill, saddle);

  // le point, son pied et sa hauteur
  const gP = asm('point', root, { title: 'Le point M', sub: '(x ; y ; f(x, y))' });
  gP.userData.focus = () => ({ target: [0, 0.8, 0], radius: 3 });
  const pB = ball(gP, 'red', 'Point M', 0.09), foot = ball(gP, 'dark', 'Point (x ; y) du plancher', 0.06), stick = rod(gP, { r: 0.02, pal: 'red', name: 'Hauteur f(x, y)' });
  label('board', '', () => is('surface') ? W(st.p[0], st.p[1], M.f(...st.p)).add(V(0.25, 0.35, 0)) : null, () => `<i>f</i> = ${fr(M.f(...st.p))}`);

  // lignes de niveau, au plancher et sur la surface
  const gL = asm('levels', root, { title: 'Les lignes de niveau', sub: 'f(x, y) = constante' });
  gL.userData.focus = () => ({ target: [0, 0.4, 0], radius: 3 });
  const floorL = [], surfL = [];
  for (const lv of M.LEVELS) for (const [a, b] of M.contours(M.f, lv)) { floorL.push(...W(a[0], a[1], 0.01).toArray(), ...W(b[0], b[1], 0.01).toArray()); surfL.push(...W(a[0], a[1], lv + 0.01).toArray(), ...W(b[0], b[1], lv + 0.01).toArray()); }
  lines(gL, floorL, '#b8343a'); lines(gL, surfL, '#e5484d');

  // les tranches et les dérivées partielles
  const gD = asm('partial', root, { title: 'Les tranches', sub: 'x ou y fixé' });
  gD.userData.focus = () => ({ target: [0, 0.8, 0], radius: 3 });
  const cx = liveCurve(gD, { n: 120, r: 0.035, pal: 'red', name: 'Tranche y = constante' }), cy = liveCurve(gD, { n: 120, r: 0.035, pal: 'blue', name: 'Tranche x = constante' });
  const tx = rod(gD, { r: 0.025, pal: 'red', name: 'Pente ∂f/∂x' }), ty = rod(gD, { r: 0.025, pal: 'blue', name: 'Pente ∂f/∂y' });
  label('vec red', '∂<i>f</i>/∂<i>x</i>', () => is('partial') ? W(st.p[0] + 1, st.p[1], M.f(...st.p) + M.fx(...st.p)) : null);
  label('vec blue', '∂<i>f</i>/∂<i>y</i>', () => is('partial') ? W(st.p[0], st.p[1] + 1, M.f(...st.p) + M.fy(...st.p)) : null);

  // le gradient et le plan tangent
  const gGr = asm('grad', root, { title: 'Le gradient', sub: 'la direction de plus forte pente' });
  gGr.userData.focus = () => ({ target: [0, 0.6, 0], radius: 3 });
  const field = [];
  for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) { const x = i, y = j, gx = M.fx(x, y), gy = M.fy(x, y), a = arrow(gGr, 'dark', { r: 0.015, head: 0.1, headR: 0.04, name: 'Gradient' }); setArrow(a, W(x, y, 0.02), W(gx * 0.6, gy * 0.6, 0)); field.push(a); }
  const gA = arrow(gGr, 'red', { r: 0.03, head: 0.16, headR: 0.07, name: 'Gradient en M' });
  const tg = new THREE.PlaneGeometry(1.6, 1.6).rotateX(-Math.PI / 2);
  const tmat = shadeMat('red', { opacity: 0.4 }).clone(); tmat.side = THREE.DoubleSide; tmat.depthWrite = false;
  const tplane = part(gGr, tg, { pal: 'red', tone: 'lo', name: 'Plan tangent', mat: tmat }); tplane.userData.noEdge = true;
  label('vec red', '∇<i>f</i>', () => is('grad') ? W(st.p[0] + M.fx(...st.p) * 0.9, st.p[1] + M.fy(...st.p) * 0.9, 0.15) : null);

  // le point critique : sommet de la colline ou centre du col
  const gC = asm('crit', root, { title: 'Le point critique', sub: 'gradient nul, plan tangent horizontal' });
  gC.userData.focus = () => ({ target: [0, 0.3, 0], radius: 2.6 });
  const hp = part(gC, new THREE.PlaneGeometry(2.2, 2.2).rotateX(-Math.PI / 2), { pal: 'red', tone: 'lo', name: 'Plan tangent horizontal', mat: tmat }); hp.userData.noEdge = true;
  const cB = ball(gC, 'red', 'Point critique', 0.09);

  const sliceX = y0 => Array.from({ length: 121 }, (_, i) => { const x = -M.L + 2 * M.L * i / 120; return W(x, y0, M.f(x, y0) + 0.02); });
  const sliceY = x0 => Array.from({ length: 121 }, (_, i) => { const y = -M.L + 2 * M.L * i / 120; return W(x0, y, M.f(x0, y) + 0.02); });
  function update(s) {
    sc = s.scene; st = s;
    hill.visible = !is('saddle'); saddle.visible = is('saddle');
    gP.visible = !is('levels', 'saddle'); gL.visible = is('levels'); gD.visible = is('partial'); gGr.visible = is('grad'); gC.visible = is('saddle');
    const [x, y] = s.p, z = M.f(x, y), dx = M.fx(x, y), dy = M.fy(x, y);
    pB.position.copy(W(x, y, z)); foot.position.copy(W(x, y, 0)); rodTo(stick, W(x, y, 0), W(x, y, z));
    if (is('partial')) {
      cx.set(sliceX(y)); cy.set(sliceY(x));
      rodTo(tx, W(x - 0.9, y, z - 0.9 * dx), W(x + 0.9, y, z + 0.9 * dx)); rodTo(ty, W(x, y - 0.9, z - 0.9 * dy), W(x, y + 0.9, z + 0.9 * dy));
    }
    if (is('grad')) {
      setArrow(gA, W(x, y, 0.04), W(dx * 0.9, dy * 0.9, 0));
      tplane.position.copy(W(x, y, z));
      // le plan tangent : sa normale est (−fx ; −fy ; 1), soit (−fx, 1, fy) dans la scène
      tplane.quaternion.setFromUnitVectors(V(0, 1, 0), V(-dx, 1, dy).normalize());
    }
    if (is('saddle')) { cB.position.copy(W(0, 0, 0)); hp.position.copy(W(0, 0, 0)); }
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
