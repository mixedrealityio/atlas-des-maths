// La figure : le plan complexe dressé comme un tableau. Les complexes sont des points (et des flèches depuis 0).
import * as THREE from 'three';
import { lines, arrow, setArrow, V } from '../engine/parts.js';
import { board2d, liveCurve, ball } from '../engine/kit.js';
import * as M from './model.js';

export const S = 1.15;                                       // une unité du plan = 1,15 dans la scène
const Z = 0.1;
export const P = ([x, y], z = Z) => V(x * S, y * S, z);

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let look = {}, st = { z: [1, 1] };
  const on = k => (look[k] || 0) > 0.5;

  const gB = asm('plane', root, { title: 'Le plan complexe', sub: 'z = a + ib ↔ le point (a ; b)' });
  gB.userData.focus = () => ({ target: [0, 0, 0], radius: 3.4 });
  board2d(gB, label, { x0: -3.4, x1: 4.4, y0: -3.1, y1: 3.2, X: x => x * S, Y: y => y * S, ticksX: [-3, -2, -1, 1, 2, 3], ticksY: [-2, -1, [1, 'i'], [2, '2i'], [3, '3i']] });
  const unit = []; for (let k = 0; k < 96; k++) { const a = P(M.expi(2 * Math.PI * k / 96), 0.02), b = P(M.expi(2 * Math.PI * (k + 1) / 96), 0.02); unit.push(a.x, a.y, a.z, b.x, b.y, b.z); }
  lines(gB, unit, '#b4b4b8');
  label('axis', 'Re', () => V(4.25 * S, 0.25, 0));
  label('axis', 'Im', () => V(0.35, 3.1 * S, 0));

  const mkArrow = (pal, name) => arrow(root, pal, { r: 0.03, head: 0.18, headR: 0.08, name });
  const pt = (pal, name) => ball(root, pal, name, 0.1);
  // z, son module et son argument
  const gZ = asm('z', root, { title: 'Le point z', sub: 'module et argument' });
  gZ.userData.focus = () => ({ target: P(st.z).multiplyScalar(0.5).toArray(), radius: 2.4 });
  const aZ = arrow(gZ, 'ink', { r: 0.035, head: 0.2, headR: 0.09, name: 'Vecteur z' }), bZ = ball(gZ, 'ink', 'Point z', 0.11);
  const modC = liveCurve(gZ, { n: 120, r: 0.012, pal: 'dark', name: 'Cercle de rayon |z|' });
  const argA = liveCurve(gZ, { n: 60, r: 0.04, pal: 'red', name: 'Argument' });
  const proj = lines(gZ, new Array(12).fill(0), '#8a8a8f');
  label('vec', '<i>z</i>', () => on('roots') || on('sim') ? null : P(st.z).multiplyScalar(1.12).add(V(0.15, 0.1, 0)));
  label('vec red', 'θ', () => on('mod') ? P(M.expi(M.arg(st.z) / 2, 0.85)) : null);
  label('mark', '', () => on('mod') ? P([st.z[0] / 2, -0.3]) : null, () => `<i>a</i> = ${fr(st.z[0])}`);
  label('mark', '', () => on('mod') ? P([st.z[0] + (st.z[0] < 0 ? -0.55 : 0.55), st.z[1] / 2]) : null, () => `<i>b</i> = ${fr(st.z[1])}`);

  // multiplication par w
  const gW = asm('mult', root, { title: 'z × w', sub: 'les modules se multiplient, les arguments s’ajoutent' });
  gW.userData.focus = () => ({ target: [0, 0, 0], radius: 3.4 });
  const aW = arrow(gW, 'blue', { r: 0.03, head: 0.18, headR: 0.08, name: 'w' }), aZW = arrow(gW, 'red', { r: 0.04, head: 0.2, headR: 0.09, name: 'z × w' });
  ball(gW, 'blue', 'w', 0.1).position.copy(P(M.W)); const bZW = ball(gW, 'red', 'z × w', 0.11);
  setArrow(aW, V(0, 0, Z), P(M.W, 0));
  label('vec blue', '<i>w</i>', () => on('mult') ? P(M.W).add(V(0.25, 0.15, 0)) : null);
  label('vec red', '<i>z w</i>', () => on('mult') ? P(M.mul(st.z, M.W)).multiplyScalar(1.1).add(V(0.15, 0.15, 0)) : null);

  // les quarts de tour : z, iz, −z, −iz
  const gI = asm('turn', root, { title: 'Multiplier par i', sub: 'un quart de tour' });
  gI.userData.focus = () => ({ target: [0, 0, 0], radius: 3 });
  const qA = [1, 2, 3].map(k => arrow(gI, 'blue', { r: 0.025, head: 0.16, headR: 0.07, name: ['i z', '−z', '−i z'][k - 1] }));
  const sq = liveCurve(gI, { n: 80, r: 0.015, pal: 'blue', name: 'Le carré z, iz, −z, −iz' });
  ['<i>iz</i>', '−<i>z</i>', '−<i>iz</i>'].forEach((n, k) => label('vec blue', n, () => on('turn') ? P(M.mul(st.z, M.expi((k + 1) * Math.PI / 2))).multiplyScalar(1.15) : null));

  // les racines n-ièmes de l'unité
  const gR = asm('roots', root, { title: 'Les racines n-ièmes de 1', sub: 'un polygone régulier' });
  gR.userData.focus = () => ({ target: [0, 0, 0], radius: 1.8 });
  const rB = Array.from({ length: 8 }, () => ball(gR, 'red', 'Racine', 0.1));
  const poly = liveCurve(gR, { n: 160, r: 0.03, pal: 'red', name: 'Polygone' });
  label('vec red', '1', () => on('roots') ? P([1.25, 0.18]) : null);
  label('board', '', () => on('roots') ? P([-2.6, 2.6]) : null, () => `<i>n</i> = ${st.n}`);

  // la similitude
  const gS = asm('sim', root, { title: 'z ↦ az + b', sub: 'une similitude directe' });
  gS.userData.focus = () => ({ target: [0.8, 0.8, 0], radius: 2.8 });
  const flag0 = liveCurve(gS, { n: 80, r: 0.03, pal: 'dark', name: 'La figure' }), flag1 = liveCurve(gS, { n: 80, r: 0.05, pal: 'red', name: 'Son image' });
  const fB = ball(gS, 'blue', 'Point fixe ω', 0.12);
  label('vec blue', 'ω', () => on('sim') ? P(M.fixed(M.SA, M.SB)).add(V(0.25, -0.25, 0)) : null);

  const closed = pts => pts.concat([pts[0]]).map(p => P(p, 0.12));
  function update(s, lk) {
    look = lk; st = s;
    gZ.visible = !on('roots') && !on('sim');
    gW.visible = on('mult'); gI.visible = on('turn'); gR.visible = on('roots'); gS.visible = on('sim');
    const z = s.z;
    setArrow(aZ, V(0, 0, Z), P(z, 0)); bZ.position.copy(P(z));
    const r = M.mod(z), th = M.arg(z);
    modC.mesh.visible = argA.mesh.visible = proj.visible = on('mod');
    modC.set(Array.from({ length: 97 }, (_, k) => P(M.expi(2 * Math.PI * k / 96, r), 0.05)));
    argA.set(Array.from({ length: 31 }, (_, k) => P(M.expi(th * k / 30, 0.7), 0.08)));
    if (!on('mod')) { modC.mesh.visible = argA.mesh.visible = false; }
    const pa = proj.geometry.attributes.position.array; pa.set([...P(z, 0.03).toArray(), ...P([z[0], 0], 0.03).toArray(), ...P(z, 0.03).toArray(), ...P([0, z[1]], 0.03).toArray()]);
    proj.geometry.attributes.position.needsUpdate = true; proj.geometry.computeBoundingSphere();
    // z w
    const zw = M.mul(z, M.W); setArrow(aZW, V(0, 0, Z), P(zw, 0)); bZW.position.copy(P(zw));
    // quarts de tour
    qA.forEach((a, k) => setArrow(a, V(0, 0, Z), P(M.mul(z, M.expi((k + 1) * Math.PI / 2)), 0)));
    sq.set(closed([0, 1, 2, 3].map(k => M.mul(z, M.expi(k * Math.PI / 2)))));
    // racines
    const R = M.roots(s.n);
    rB.forEach((b, k) => { b.visible = k < s.n; if (k < s.n) b.position.copy(P(R[k], 0.14)); });
    poly.set(closed(R));
    // similitude
    const { a, b } = M.simAt(s.t);
    flag0.set(closed(M.FLAG)); flag1.set(closed(M.FLAG.map(p => M.add(M.mul(a, p), b))));
    fB.position.copy(P(M.fixed(M.SA, M.SB), 0.15));
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
