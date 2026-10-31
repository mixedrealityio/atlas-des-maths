// La figure : cinq solides posés sur la table quadrillée, de gauche à droite. Unités : 1 = un carreau.
import * as THREE from 'three';
import { part, box, lines, shadeMat, V } from '../engine/parts.js';
import { ball } from '../engine/kit.js';
import * as M from './model.js';

export const ST = { pave: 0, cyl: 11, pyr: 22, arch: 33, net: 46 };

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });

  const grid = [];
  for (let x = -4; x <= 54; x++) grid.push(x, 0.001, -6, x, 0.001, 6);
  for (let z = -6; z <= 6; z++) grid.push(-4, 0.001, z, 54, 0.001, z);
  lines(root, grid, '#e4e4e0');
  const outline = (parent, geo, pos, color = '#6c6c72') => { const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 20), new THREE.LineBasicMaterial({ color })); e.userData.noEdge = true; e.position.copy(pos); parent.add(e); return e; };

  // =====================================================================================
  // 0 · le pavé rempli de cubes unités
  const X0 = ST.pave, P = M.PAVE;
  const gP = asm('pave', root, { title: 'Le pavé 4 × 3 × 2', sub: '24 cubes d’une unité' });
  gP.userData.focus = () => ({ target: [X0 + 2, 1, -1.5], radius: 3.2 });
  outline(root, new THREE.BoxGeometry(P.L, P.h, P.l), V(X0 + P.L / 2, P.h / 2, -P.l / 2));
  const cubes = [];
  for (let k = 0; k < P.h; k++) for (let j = 0; j < P.l; j++) for (let i = 0; i < P.L; i++)
    cubes.push(part(gP, box(0.94, 0.94, 0.94, 0.04), { pal: (i + j + k) % 2 ? 'paper' : 'base', tone: 'hi', name: 'Cube unité', pos: [X0 + i + 0.5, k + 0.5, -j - 0.5], ex: [(i - 1.5) * 0.25, k * 0.35, -(j - 1) * 0.25] }));
  label('mark', 'L = 4', () => V(X0 + 2, 0, 0.5));
  label('mark', 'l = 3', () => V(X0 + 4.6, 0, -1.5));
  label('mark', 'h = 2', () => V(X0 - 0.4, 1, 0));

  // =====================================================================================
  // 1 · le cylindre et le prisme qui montent
  const X1 = ST.cyl;
  const gC = asm('cyl', root, { title: 'Cylindre et prisme', sub: 'aire de la base × hauteur' });
  gC.userData.focus = () => ({ target: [X1 + 2, 1.5, 0], radius: 3.6 });
  const cyl = part(gC, new THREE.CylinderGeometry(M.CYL.r, M.CYL.r, 1, 48), { pal: 'blue', tone: 'hi', name: 'Cylindre', mat: shadeMat('blue', { opacity: 0.7 }) });
  const cylBase = part(gC, new THREE.CylinderGeometry(M.CYL.r, M.CYL.r, 0.03, 48), { pal: 'red', tone: 'hi', name: 'Base : disque', pos: [X1, 0.015, 0] });
  const tri = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(M.PRISM.b, 0), new THREE.Vector2(1, M.PRISM.hb)]);
  const prismGeo = new THREE.ExtrudeGeometry(tri, { depth: 1, bevelEnabled: false }); prismGeo.rotateX(-Math.PI / 2);
  const prism = part(gC, prismGeo, { pal: 'paper', tone: 'hi', name: 'Prisme', mat: shadeMat('paper', { opacity: 0.85 }) });
  prism.position.set(X1 + 2.6, 0, 1); prism.userData.home = prism.position.clone();
  let ch = 1;
  label('board', '', () => V(X1 + M.CYL.r + 0.3, ch, 0), () => `h = ${fr(ch, 1)}`);

  // =====================================================================================
  // 2 · trois pyramides qui forment un cube
  const X2 = ST.pyr, a = M.PYR.a;
  const gY = asm('pyr', root, { title: 'Trois pyramides, un cube', sub: 'chacune vaut un tiers' });
  gY.userData.focus = () => ({ target: [X2 + 1.5, 1.5, -1.5], radius: 3.6 });
  // sommet commun S = (a, a, a) en coordonnées du cube ; bases sur les faces x = 0, y = 0, z = 0
  const S = [a, a, a], base = {
    x: [[0, 0, 0], [0, a, 0], [0, a, a], [0, 0, a]], y: [[0, 0, 0], [a, 0, 0], [a, 0, a], [0, 0, a]], z: [[0, 0, 0], [a, 0, 0], [a, a, 0], [0, a, 0]],
  };
  const toW = ([x, y, z]) => [X2 + x, z, -y];          // z du cube vers le haut
  const pyrs = Object.entries(base).map(([k, q], idx) => {
    const tris = [[q[0], q[1], q[2]], [q[0], q[2], q[3]], [q[0], q[1], S], [q[1], q[2], S], [q[2], q[3], S], [q[3], q[0], S]];
    const pos = tris.flat().flatMap(toW);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.computeVertexNormals();
    const mat = shadeMat(['red', 'blue', 'paper'][idx]).clone(); mat.side = THREE.DoubleSide;
    const m = part(gY, g, { pal: 'paper', tone: 'hi', name: 'Pyramide', mat });
    m.userData.dir = k === 'x' ? V(-1, 0, 0) : k === 'y' ? V(0, 0, 1) : V(0, 0, 0);
    return m;
  });
  outline(root, new THREE.BoxGeometry(a, a, a), V(X2 + a / 2, a / 2, -a / 2), '#b4b4b8');

  // =====================================================================================
  // 3 · Archimède : cône, boule, cylindre
  const X3 = ST.arch, r = M.ARCH.r;
  const gA = asm('arch', root, { title: 'Cône, boule, cylindre', sub: 'volumes dans le rapport 1 : 2 : 3' });
  gA.userData.focus = () => ({ target: [X3 + 3, r, 0], radius: 4 });
  part(gA, new THREE.ConeGeometry(r, 2 * r, 48), { pal: 'red', tone: 'hi', name: 'Cône', pos: [X3, r, 0] });
  part(gA, new THREE.SphereGeometry(r, 48, 32), { pal: 'blue', tone: 'hi', name: 'Boule', pos: [X3 + 3, r, 0] });
  part(gA, new THREE.CylinderGeometry(r, r, 2 * r, 48), { pal: 'paper', tone: 'hi', name: 'Cylindre', pos: [X3 + 6, r, 0] });
  [['cône', 0, '1'], ['boule', 3, '2'], ['cylindre', 6, '3']].forEach(([n, dx, q]) => {
    label('mark', n, () => V(X3 + dx, -0.05, r + 0.45));
    label('vec', q, () => V(X3 + dx, 2 * r + 0.55, 0));
  });

  // =====================================================================================
  // 4 · le patron du cube qui se replie
  const X4 = ST.net;
  const gN = asm('net', root, { title: 'Le patron du cube', sub: 'six carrés qui se replient' });
  gN.userData.focus = () => ({ target: [X4 + 0.5, 0.5, -0.5], radius: 2.8 });
  const T = 0.05, face = (parent, pal) => part(parent, new THREE.BoxGeometry(0.98, T, 0.98), { pal, tone: 'hi', name: 'Face' });
  // la face du fond, et quatre charnières sur ses bords ; la sixième face est accrochée à celle de derrière
  const bottom = face(gN, 'red'); bottom.position.set(X4 + 0.5, T / 2, -0.5);
  const hinges = [];
  const hinge = (parent, pos, axis, sign) => { const h = new THREE.Group(); h.position.copy(pos); parent.add(h); hinges.push({ h, axis, sign }); return h; };
  // charnière : le carré part du bord, à plat, et tourne autour de l'axe du bord
  const left = hinge(gN, V(X4, 0, -0.5), 'z', -1); face(left, 'paper').position.set(-0.5, T / 2, 0);
  const right = hinge(gN, V(X4 + 1, 0, -0.5), 'z', 1); face(right, 'paper').position.set(0.5, T / 2, 0);
  const front = hinge(gN, V(X4 + 0.5, 0, 0), 'x', -1); face(front, 'base').position.set(0, T / 2, 0.5);
  const back = hinge(gN, V(X4 + 0.5, 0, -1), 'x', 1); face(back, 'base').position.set(0, T / 2, -0.5);
  const top = hinge(back, V(0, 0, -1), 'x', 1); face(top, 'blue').position.set(0, T / 2, -0.5);
  let ang = 0;
  label('board', '', () => V(X4 + 0.5, 1.7, -0.5), () => `${Math.round(ang)}°`);

  function update(s) {
    cubes.forEach((c, i) => { c.visible = i < s.n; });
    ch = s.h;
    cyl.scale.y = ch; cyl.position.set(X1, ch / 2, 0);
    prism.scale.y = ch; prism.position.set(X1 + 2.4, 0, 1.6);
    pyrs.forEach(m => m.position.copy(m.userData.dir).multiplyScalar(1.4 * s.sep));
    ang = s.fold;
    const rad = ang * Math.PI / 180;
    for (const { h, axis, sign } of hinges) { h.rotation.set(0, 0, 0); h.rotation[axis] = sign * rad; }
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
