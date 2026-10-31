// La figure : le cube ABCD-A₁B₁C₁D₁ en arêtes d'encre, son repère, le plan A₁BC₁ et ses vecteurs.
// Coordonnées (x, y, z) → scène (y − 1, z, x − 1) : x vient vers nous, y va à droite, z monte.
import * as THREE from 'three';
import { part, lines, arrow, setArrow, shadeMat, V } from '../engine/parts.js';
import { rod, rodTo, ball } from '../engine/kit.js';
import * as M from './model.js';

export const W = ([x, y, z]) => V(y - 1, z, x - 1);
const SUBS = { A: 'A', B: 'B', C: 'C', D: 'D', A1: 'A₁', B1: 'B₁', C1: 'C₁', D1: 'D₁' };

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let sc = 'coords', st = {};
  const is = (...k) => k.includes(sc);

  const gK = asm('cube', root, { title: 'Le cube ABCD-A₁B₁C₁D₁', sub: 'arête 2' });
  gK.userData.focus = () => ({ target: [0, 1, 0], radius: 2.2 });
  for (const [a, b] of M.EDGES) rodTo(rod(gK, { r: 0.025, pal: 'ink', name: 'Arête' }), W(M.V3[a]), W(M.V3[b]));
  const c = M.V3, mid = [1, 1, 1];
  for (const [k, p] of Object.entries(c)) {
    ball(gK, 'paper', `Sommet ${SUBS[k]}`, 0.06).position.copy(W(p));
    const out = M.sub(p, mid); label('vec', `<i>${SUBS[k][0]}</i>${SUBS[k].slice(1)}`, () => W(M.add(p, M.scale(0.22, out))));
  }
  // les axes depuis D
  const ax = arrow(root, 'dark', { r: 0.015, head: 0.12, headR: 0.05, name: 'Axe x' }), ay = arrow(root, 'dark', { r: 0.015, head: 0.12, headR: 0.05, name: 'Axe y' }), az = arrow(root, 'dark', { r: 0.015, head: 0.12, headR: 0.05, name: 'Axe z' });
  setArrow(ax, W([0, 0, 0]), W([3, 0, 0]).sub(W([0, 0, 0]))); setArrow(ay, W([0, 0, 0]), W([0, 3, 0]).sub(W([0, 0, 0]))); setArrow(az, W([0, 0, 0]), W([0, 0, 3]).sub(W([0, 0, 0])));
  label('axis', '<i>x</i>', () => W([3.25, 0, 0])); label('axis', '<i>y</i>', () => W([0, 3.25, 0])); label('axis', '<i>z</i>', () => W([0, 0, 3.25]));

  // page 0 : P sur la diagonale DB₁
  const gP = asm('point', root, { title: 'Le point P', sub: 'sur la diagonale DB₁' });
  gP.userData.focus = () => ({ target: [0, 1, 0], radius: 2 });
  const diag = rod(gP, { r: 0.02, pal: 'dark', name: 'Diagonale DB₁' }); rodTo(diag, W(c.D), W(c.B1));
  const pB = ball(gP, 'red', 'Point P', 0.09), proj = lines(gP, new Array(18).fill(0), '#e5484d');
  label('board', '', () => is('coords') ? W(M.scale(st.t * 2, [1, 1, 1])).add(V(0.25, 0.25, 0)) : null, () => `<i>P</i>(${fr(2 * st.t)} ; ${fr(2 * st.t)} ; ${fr(2 * st.t)})`);

  // le plan A₁BC₁, son vecteur normal, un vecteur du plan
  const gN = asm('plane', root, { title: 'Le plan A₁BC₁', sub: 'et son vecteur normal' });
  gN.userData.focus = () => ({ target: W([4 / 3, 4 / 3, 4 / 3]).toArray(), radius: 2 });
  const tri = new THREE.BufferGeometry(); tri.setAttribute('position', new THREE.Float32BufferAttribute(M.PL.flatMap(p => W(p).toArray()), 3)); tri.computeVertexNormals();
  const tmat = shadeMat('blue', { opacity: 0.35 }).clone(); tmat.side = THREE.DoubleSide; tmat.depthWrite = false;
  part(gN, tri, { pal: 'blue', tone: 'hi', name: 'Plan A₁BC₁', mat: tmat }).userData.noEdge = true;
  lines(gN, [...M.PL, M.PL[0]].flatMap((p, i, a) => i ? [...W(a[i - 1]).toArray(), ...W(p).toArray()] : []), '#3d63a8');
  const G = M.scale(1 / 3, M.PL.reduce(M.add, [0, 0, 0]));
  const nA = arrow(gN, 'red', { r: 0.03, head: 0.16, headR: 0.07, name: 'Vecteur normal n' });
  setArrow(nA, W(G), W(M.add(G, M.scale(0.3, M.NRM))).sub(W(G)));
  const vA = arrow(gN, 'blue', { r: 0.025, head: 0.14, headR: 0.06, name: 'Vecteur du plan u' });
  label('vec red', '<i>n</i>', () => is('normal', 'dist', 'angle') ? W(M.add(G, M.scale(0.34, M.NRM))) : null);
  label('vec blue', '<i>u</i>', () => is('normal') ? W(M.add(G, M.scale(1.15, st.u))) : null);

  // la perpendiculaire DH
  const gD = asm('dist', root, { title: 'La distance de D au plan', sub: 'le long du vecteur normal' });
  gD.userData.focus = () => ({ target: W([0.7, 0.7, 0.7]).toArray(), radius: 1.8 });
  const dh = rod(gD, { r: 0.035, pal: 'red', name: 'Segment DH' }); rodTo(dh, W(c.D), W(M.H));
  ball(gD, 'red', 'Pied H', 0.08).position.copy(W(M.H));
  const da1 = rod(gD, { r: 0.02, pal: 'dark', name: 'Vecteur DA₁' }); rodTo(da1, W(c.D), W(c.A1));
  label('vec red', '<i>H</i>', () => is('dist') ? W(M.H).add(V(0.15, -0.2, 0.15)) : null);

  // l'angle dièdre avec la base
  const gA = asm('dihedral', root, { title: 'L’angle dièdre', sub: 'entre A₁BC₁ et la base' });
  gA.userData.focus = () => ({ target: [0, 0.8, 0], radius: 2.2 });
  const base = new THREE.Mesh(new THREE.PlaneGeometry(2, 2).rotateX(-Math.PI / 2), shadeMat('red', { opacity: 0.18 })); base.material.side = THREE.DoubleSide; base.material.depthWrite = false;
  base.position.copy(W([1, 1, 0])); base.userData.noEdge = true; gA.add(base);
  const kA = arrow(gA, 'dark', { r: 0.025, head: 0.14, headR: 0.06, name: 'Normale à la base k' }); setArrow(kA, W(G), V(0, 1.2, 0));
  label('vec', '<i>k</i>', () => is('angle') ? W(G).add(V(0, 1.4, 0)) : null);
  label('board', '', () => is('angle') ? W(G).add(V(-0.9, 1.5, 0)) : null, () => `${fr(M.deg(M.DIHEDRAL), 1)}°`);

  // la section par x + y + z = k
  const gS = asm('section', root, { title: 'La section', sub: 'x + y + z = k' });
  gS.userData.focus = () => ({ target: [0, 1, 0], radius: 2.2 });
  const sgeo = new THREE.BufferGeometry(); sgeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(6 * 3 * 3), 3));
  const smat = shadeMat('red', { opacity: 0.6 }).clone(); smat.side = THREE.DoubleSide;
  const sec = part(gS, sgeo, { pal: 'red', tone: 'hi', name: 'Section', mat: smat }); sec.frustumCulled = false;
  const sedge = lines(gS, new Array(36).fill(0), '#b8343a');
  label('board', '', () => is('section') ? V(0, 2.75, 0) : null, () => `<i>k</i> = ${fr(st.k)} : ${['', '', '', 'triangle', 'quadrilatère', 'pentagone', 'hexagone'][st.np] || ''}`);

  function update(s) {
    sc = s.scene; st = s;
    gP.visible = is('coords'); gN.visible = is('normal', 'dist', 'angle'); gD.visible = is('dist'); gA.visible = is('angle'); gS.visible = is('section');
    vA.visible = is('normal');
    const p = M.scale(2 * s.t, [1, 1, 1]); pB.position.copy(W(p));
    const pa = proj.geometry.attributes.position.array, q = [[p[0], p[1], 0], [p[0], 0, 0], [0, p[1], 0]];
    pa.set([...W(p).toArray(), ...W(q[0]).toArray(), ...W(q[0]).toArray(), ...W(q[1]).toArray(), ...W(q[0]).toArray(), ...W(q[2]).toArray()]);
    proj.geometry.attributes.position.needsUpdate = true; proj.geometry.computeBoundingSphere();
    if (is('normal')) setArrow(vA, W(G), W(M.add(G, s.u)).sub(W(G)));
    // la section
    const poly = M.section(s.k); st.np = poly.length;
    const arr = sgeo.attributes.position.array; arr.fill(0);
    for (let i = 1; i + 1 < poly.length; i++) arr.set([...W(poly[0]).toArray(), ...W(poly[i]).toArray(), ...W(poly[i + 1]).toArray()], (i - 1) * 9);
    sgeo.attributes.position.needsUpdate = true; sgeo.computeVertexNormals(); sgeo.computeBoundingSphere();
    const ea = sedge.geometry.attributes.position.array; ea.fill(0);
    poly.forEach((v, i) => ea.set([...W(v).toArray(), ...W(poly[(i + 1) % poly.length]).toArray()], i * 6));
    sedge.geometry.attributes.position.needsUpdate = true; sedge.geometry.computeBoundingSphere();
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
