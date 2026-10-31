// La figure : l'espace R³ avec ses axes, le cube unité, et son image par l'application linéaire de la
// page. Les images des vecteurs de base sont des flèches, le plan z = 0 est un quadrillage qui se déforme.
// Coordonnées : (x, y, z) mathématiques → (x, z, −y) dans la scène (z vers le haut).
import * as THREE from 'three';
import { part, cyl, lines, arrow, setArrow, shadeMat, V } from '../engine/parts.js';
import { rod, rodTo } from '../engine/kit.js';
import * as M from './model.js';

export const W = ([x, y, z]) => V(x, z, -y);

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let look = {}, A = M.I;
  const on = k => (look[k] || 0) > 0.5;

  // les axes, de −1,5 à 2,6
  const axes = [];
  for (const e of [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) {
    const a = W(e.map(c => -1.5 * c)), b = W(e.map(c => 2.6 * c));
    axes.push(a.x, a.y, a.z, b.x, b.y, b.z);
    for (let k = 1; k <= 2; k++) { const p = W(e.map(c => k * c)); axes.push(p.x - 0.05, p.y, p.z, p.x + 0.05, p.y, p.z); }
  }
  lines(root, axes, '#6c6c72');
  label('axis', '<i>x</i>', () => W([2.8, 0, 0]));
  label('axis', '<i>y</i>', () => W([0, 2.8, 0]));
  label('axis', '<i>z</i>', () => W([0, 0, 2.8]));
  part(root, new THREE.SphereGeometry(0.06, 16, 10), { pal: 'ink', tone: 'hi', name: 'Origine' });

  // le cube de départ, en pointillés gris
  const ref = [];
  for (const [i, j] of M.EDGES) { const a = W(M.CUBE[i]), b = W(M.CUBE[j]); ref.push(a.x, a.y, a.z, b.x, b.y, b.z); }
  const refLines = lines(root, ref, '#b4b4b8');

  // le quadrillage du plan z = 0, de −2 à 2, déformé à chaque image
  const N = 2, seg = [];
  for (let k = -N; k <= N; k++) seg.push([[k, -N, 0], [k, N, 0]], [[-N, k, 0], [N, k, 0]]);
  const lattice = lines(root, new Array(seg.length * 6).fill(0), '#c9c9cd');

  // l'image du cube : un parallélépipède de papier
  const gC = asm('cube', root, { title: 'L’image du cube', sub: 'un parallélépipède' });
  gC.userData.focus = () => { const c = W(M.apply(A, [0.5, 0.5, 0.5])); return { target: c.toArray(), radius: 1.9 }; };
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(6 * 6 * 3), 3));
  const mat = shadeMat('paper', { opacity: 0.55 }).clone(); mat.side = THREE.DoubleSide;
  const solid = part(gC, geo, { pal: 'paper', tone: 'hi', name: 'Image du cube', mat });
  solid.frustumCulled = false;
  const edges = lines(gC, new Array(M.EDGES.length * 6).fill(0), '#26262a');

  // les images des vecteurs de base
  const gB = asm('basis', root, { title: 'Les colonnes de la matrice', sub: 'les images de e₁, e₂, e₃' });
  gB.userData.focus = () => ({ target: W([0.8, 0.6, 0.5]).toArray(), radius: 1.8 });
  const pals = ['red', 'blue', 'ink'];
  const arrows = pals.map((p, j) => arrow(gB, p, { r: 0.03, head: 0.16, headR: 0.075, name: `f(e${'₁₂₃'[j]})` }));
  const names = ['<i>f</i>(<i>e</i>₁)', '<i>f</i>(<i>e</i>₂)', '<i>f</i>(<i>e</i>₃)'];
  names.forEach((n, j) => label(j === 0 ? 'vec red' : j === 1 ? 'vec blue' : 'vec', n, () => W(M.col(A, j)).multiplyScalar(1).add(W(M.col(A, j)).normalize().multiplyScalar(0.28))));

  // le noyau de la projection (page 3)
  const gK = asm('kernel', root, { title: 'Le noyau', sub: 'la droite écrasée sur 0' });
  gK.userData.focus = () => ({ target: [0, 0, 0], radius: 2.2 });
  const kRod = rod(gK, { r: 0.03, pal: 'red', name: 'Noyau' });
  { const d = M.KER3, n = Math.hypot(...d), u = d.map(c => c / n * 2.2); rodTo(kRod, W(u.map(c => -c)), W(u)); }
  label('vec red', 'Ker <i>f</i>', () => on('m3') ? W(M.KER3.map(c => c / Math.hypot(...M.KER3) * 2.4)) : null);

  // les directions propres (page 4)
  const gE = asm('eigen', root, { title: 'Les directions propres', sub: 'des droites qui ne tournent pas' });
  gE.userData.focus = () => ({ target: [0.5, 0.3, -0.5], radius: 2.4 });
  M.EIGEN4.forEach((e, k) => {
    const r = rod(gE, { r: 0.022, pal: k ? 'dark' : 'red', name: `Direction propre (λ = ${e.l})` });
    const n = Math.hypot(...e.v), u = e.v.map(c => c / n * 2.4); rodTo(r, W(u.map(c => -c)), W(u));
    label(k ? 'mark' : 'vec red', `λ = ${e.l}`, () => on('m4') ? W(u.map(c => c * 1.08)) : null);
  });

  const v3 = new THREE.Vector3();
  function update(s, lk) {
    look = lk;
    A = M.mix({ m1: lk.m1 || 0, m2: lk.m2 || 0, m3: lk.m3 || 0, m4: lk.m4 || 0 }, s.t);
    gK.visible = on('m3'); gE.visible = on('m4');
    // le parallélépipède
    const P = M.CUBE.map(p => W(M.apply(A, p)));
    const pos = geo.attributes.position.array; let k = 0;
    for (const [a, b, c, d] of M.FACES) for (const i of [a, b, c, a, c, d]) { pos[k++] = P[i].x; pos[k++] = P[i].y; pos[k++] = P[i].z; }
    geo.attributes.position.needsUpdate = true; geo.computeVertexNormals(); geo.computeBoundingBox(); geo.computeBoundingSphere();
    const ea = edges.geometry.attributes.position.array; k = 0;
    for (const [i, j] of M.EDGES) for (const p of [P[i], P[j]]) { ea[k++] = p.x; ea[k++] = p.y; ea[k++] = p.z; }
    edges.geometry.attributes.position.needsUpdate = true; edges.geometry.computeBoundingSphere();
    // les flèches
    arrows.forEach((a, j) => setArrow(a, v3.set(0, 0, 0), W(M.col(A, j))));
    // le quadrillage
    const la = lattice.geometry.attributes.position.array; k = 0;
    for (const [p, q] of seg) for (const x of [p, q]) { const w = W(M.apply(A, x)); la[k++] = w.x; la[k++] = w.y; la[k++] = w.z; }
    lattice.geometry.attributes.position.needsUpdate = true; lattice.geometry.computeBoundingSphere();
  }
  return { update, labels, get A() { return A; } };
}
