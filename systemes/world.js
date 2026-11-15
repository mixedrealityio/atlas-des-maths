// La figure : à gauche le tableau des deux droites (poulets et lapins) ; à droite la boîte [0 ; 4]³
// où se coupent trois plans. Coordonnées de l'espace (x, y, z) → scène : x à droite, y vers le fond, z monte.
import * as THREE from 'three';
import { part, lines, arrow, setArrow, shadeMat, V } from '../engine/parts.js';
import { board2d, rod, rodTo, ball, fr } from '../engine/kit.js';
import * as M from './model.js';

// le tableau
export const X = x => x * 0.12, Y = y => y * 0.12;
const Z = 0.1;
const B2 = ([x, y]) => V(X(x), Y(y), Z);
// la boîte
export const OX = 12, S3 = 0.75;
export const W = ([x, y, z]) => V(OX + (x - 2) * S3, z * S3, -(y - 2) * S3);

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let sc = 'poules', st = {};
  const is = (...k) => k.includes(sc);
  const flat = () => is('poules', 'elim', 'cas2');

  // ---------- le tableau ----------
  const gB = asm('board', root, { title: 'Le repère', sub: 'x poulets, y lapins' });
  gB.userData.focus = () => ({ target: [X(22), Y(17), 0], radius: 3.6 });
  board2d(gB, label, { x0: M.BX[0], x1: M.BX[1], y0: M.BY[0], y1: M.BY[1], X, Y, ticksX: [10, 20, 30, 40], ticksY: [10, 20, 30], vis: flat });
  label('axis', '<i>x</i>', () => flat() ? V(X(M.BX[1]) - 0.15, Y(0) + 0.25, Z) : null);
  label('axis', '<i>y</i>', () => flat() ? V(X(0) - 0.1, Y(M.BY[1]) - 0.2, Z) : null);

  const gL = asm('lines', root, { title: 'Les deux droites', sub: 'une par équation' });
  gL.userData.focus = () => ({ target: [X(22), Y(17), 0], radius: 3.4 });
  const d1 = rod(gL, { r: 0.035, pal: 'ink', name: 'Droite (1) : x + y = 35' });
  const d2 = rod(gL, { r: 0.035, pal: 'blue', name: 'Droite (2)' });
  const sol2 = ball(gL, 'red', 'Solution (23 ; 12)', 0.11);
  const s1 = M.clipLine(M.L1); rodTo(d1, B2(s1[0]), B2(s1[1]));
  label('board', '', () => flat() ? V(X(1), Y(37), Z) : null, () => '(1)  <i>x</i> + <i>y</i> = 35');
  label('board', '', () => flat() ? V(X(26), Y(37), Z) : null, () => `<span style="color:#3d63a8">(2)  2<i>x</i> + ${is('cas2') ? fr(st.m, 1) + ' ' : '4'}<i>y</i> = 94</span>`);
  label('vec red', '', () => is('poules', 'elim') || (is('cas2') && st.in2) ? V(X(st.sx ?? 23) + 0.75, Y(st.sy ?? 12) + 0.3, Z) : null,
    () => is('cas2') ? `(${fr(st.sx, 1)} ; ${fr(st.sy, 1)})` : '(23 ; 12)');

  // page 0 : un essai sur la droite (1)
  const gT = asm('essai', root, { title: 'Un essai', sub: 'x poulets, 35 − x lapins' });
  gT.userData.focus = () => ({ target: [X(22), Y(17), 0], radius: 3.2 });
  const tryB = ball(gT, 'ink', 'Essai', 0.1);
  label('board', '', () => is('poules') ? V(X(st.tx) + 0.25, Y(35 - st.tx) + 0.05, Z) : null,
    () => `${st.tx} + ${35 - st.tx} têtes : ${M.feet(st.tx)} pattes`);

  // page 1 : les combinaisons
  const gC = asm('comb', root, { title: 'Combinaison', sub: 'α·(1) + β·(2)' });
  gC.userData.focus = () => ({ target: [X(22), Y(17), 0], radius: 3.2 });
  const dc = rod(gC, { r: 0.03, pal: 'red', name: 'Combinaison α·(1) + β·(2)' });
  const ex = rod(gC, { r: 0.016, pal: 'dark', name: 'x = 23' }), ey = rod(gC, { r: 0.016, pal: 'dark', name: 'y = 12' });
  { const a = M.clipLine(M.ELIM_Y), b = M.clipLine(M.ELIM_X); rodTo(ex, B2(a[0]), B2(a[1])); rodTo(ey, B2(b[0]), B2(b[1])); }
  label('board', '', () => is('elim') ? V(X(23.6), Y(-2.6), Z) : null, () => '<i>x</i> = 23');
  label('board', '', () => is('elim') ? V(X(40), Y(13.6), Z) : null, () => '<i>y</i> = 12');

  // ---------- la boîte et les trois plans ----------
  const gK = asm('box', root, { title: 'La boîte', sub: '0 ≤ x, y, z ≤ 4' });
  gK.userData.focus = () => ({ target: [OX, 1.5, 0], radius: 2.6 });
  const boxL = lines(gK, M.BOX_EDGES.flatMap(([p, q]) => [...W(p).toArray(), ...W(q).toArray()]), '#b4b4b8');
  const axs = ['x', 'y', 'z'].map(n => arrow(gK, 'dark', { r: 0.014, head: 0.12, headR: 0.05, name: `Axe ${n}` }));
  [[4.8, 0, 0], [0, 4.8, 0], [0, 0, 4.8]].forEach((e, i) => setArrow(axs[i], W([0, 0, 0]), W(e).sub(W([0, 0, 0]))));
  const deep = () => !flat();
  label('axis', '<i>x</i>', () => deep() ? W([5.1, 0, 0]) : null);
  label('axis', '<i>y</i>', () => deep() ? W([0, 5.1, 0]) : null);
  label('axis', '<i>z</i>', () => deep() ? W([0, 0, 5.1]) : null);
  label('tick', 'O', () => deep() ? W([0, 0, 0]).add(V(-0.05, -0.15, 0)) : null);

  const PAL = [['dark', '#6c6c72'], ['blue', '#3d63a8'], ['red', '#b8343a']];
  const planes = PAL.map(([pal, ink], k) => {
    const g = asm(`plan${k + 1}`, root, { title: `Le plan (${k + 1})`, sub: 'une équation, un plan' });
    g.userData.focus = () => ({ target: [OX, 1.5, 0], radius: 2.6 });
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(4 * 9), 3));
    const mat = shadeMat(pal, { opacity: 0.32 }).clone(); mat.side = THREE.DoubleSide; mat.depthWrite = false;
    const m = part(g, geo, { pal, tone: 'hi', name: `Plan (${k + 1})`, mat }); m.frustumCulled = false; m.userData.noEdge = true;
    const edge = lines(g, new Array(36).fill(0), ink); edge.frustumCulled = false;
    return { g, geo, edge, poly: [] };
  });
  function setPlane(pl, P) {
    const poly = M.clipPlane(P); pl.poly = poly;
    const a = pl.geo.attributes.position.array; a.fill(0);
    for (let i = 1; i + 1 < poly.length; i++) a.set([...W(poly[0]).toArray(), ...W(poly[i]).toArray(), ...W(poly[i + 1]).toArray()], (i - 1) * 9);
    pl.geo.attributes.position.needsUpdate = true; pl.geo.computeVertexNormals(); pl.geo.computeBoundingSphere();
    const e = pl.edge.geometry.attributes.position.array; e.fill(0);
    poly.forEach((v, i) => e.set([...W(v).toArray(), ...W(poly[(i + 1) % poly.length]).toArray()], i * 6));
    pl.edge.geometry.attributes.position.needsUpdate = true; pl.edge.geometry.computeBoundingSphere();
  }
  // l'étiquette d'un plan : le sommet de son polygone le plus loin dans une direction donnée
  const tagAt = (k, dir) => { const p = planes[k].poly; if (!p.length) return null; let b = p[0]; for (const q of p) if (M.dot(q, dir) > M.dot(b, dir)) b = q; return W(b); };
  const DIRS = [[-1, 1, -0.3], [-1, 1, 1], [1, 1, -1]];
  for (let k = 0; k < 3; k++) label(`vec ${['grey', 'blue', 'red'][k]}`, `(${k + 1})`, () => deep() ? tagAt(k, st.dirs?.[k] || DIRS[k])?.add(V(0, 0.18, 0)) : null);

  // la solution, et les droites communes
  const gS = asm('sol3', root, { title: 'La solution', sub: 'le point commun aux trois plans' });
  gS.userData.focus = () => ({ target: W(M.SOL3).toArray(), radius: 1.6 });
  const sol3 = ball(gS, 'red', 'Solution (1 ; 2 ; 3)', 0.09);
  sol3.position.copy(W(M.SOL3));
  label('vec red', '', () => is('trois', 'gauss') ? W(M.SOL3).add(V(-0.5, 0.22, -0.62)) : null, () => '(1 ; 2 ; 3)');
  const seg = [0, 1, 2].map(k => rod(gS, { r: 0.022, pal: 'ink', name: ['Droite (1) ∩ (2)', 'Droite (1) ∩ (3)', 'Droite (2) ∩ (3)'][k] }));
  const setSeg = (r, A, B) => { const m = M.meet(A, B), s = m && M.clipSeg(m); if (s) rodTo(r, W(s[0]), W(s[1])); else r.visible = false; };
  label('board', '', () => is('rang') ? V(OX - 1.5, 4.3, -1.5) : null, () => Math.abs(st.k - 9) < 0.25 ? 'une droite de solutions' : 'aucune solution : un prisme');

  function update(s) {
    sc = s.scene; st = s;
    // le tableau
    const sl2 = is('cas2') ? M.L2m(s.m) : M.L2, s2 = M.clipLine(sl2);
    if (s2) rodTo(d2, B2(s2[0]), B2(s2[1]));
    const sol = M.solve2(M.L1, sl2);
    st.in2 = !!sol && sol[0] > -2 && sol[0] < 47 && sol[1] > -2 && sol[1] < 34;
    if (sol) { st.sx = sol[0]; st.sy = sol[1]; sol2.position.copy(B2(sol)); }
    st.tx = Math.round(s.tx); tryB.position.copy(B2([st.tx, 35 - st.tx]));
    const c = M.clipLine(M.comb(s.th)); if (c) rodTo(dc, B2(c[0]), B2(c[1]));
    // les plans
    let P = [M.P1, M.P2, M.P3];
    if (is('gauss')) P = M.gaussPlanes(s.g);
    if (is('rang')) P = [M.P1, M.P2, M.Q3(s.k)];
    planes.forEach((pl, k) => setPlane(pl, P[k]));
    st.dirs = is('rang') ? [DIRS[0], DIRS[1], [1, -1, 1]] : is('gauss') && s.g[2] > 0.5 ? [DIRS[0], DIRS[1], [1, -1, 0]] : DIRS;
    setSeg(seg[0], P[0], P[1]); setSeg(seg[1], P[0], P[2]); setSeg(seg[2], P[1], P[2]);

    // visibilité, après rodTo qui la modifie
    gB.visible = gL.visible = flat();
    gT.visible = is('poules'); gC.visible = is('elim');
    sol2.visible = is('poules', 'elim') || (is('cas2') && st.in2);
    d2.visible = d2.visible && !!s2;
    gK.visible = deep(); planes.forEach(pl => { pl.g.visible = deep(); });
    gS.visible = deep(); sol3.visible = is('trois', 'gauss');
    seg[0].visible = seg[0].visible && is('trois', 'rang');
    seg[1].visible = seg[1].visible && is('rang'); seg[2].visible = seg[2].visible && is('rang');
    boxL.visible = deep();
  }
  return { update, labels };
}
