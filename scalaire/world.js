// La figure : un repère dressé comme un tableau. Chaque page y pose ses vecteurs, ses projections et ses angles.
import * as THREE from 'three';
import { lines, arrow, setArrow, V } from '../engine/parts.js';
import { board2d, liveCurve, rod, rodTo, ball, fr } from '../engine/kit.js';
import * as M from './model.js';

export const S = 0.9;
const Z = 0.12;
export const P3 = ([x, y], z = Z) => V(x * S, y * S, z);

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let sc = 'proj', st = {};
  const is = (...k) => k.includes(sc);

  const gB = asm('board', root, { title: 'Le repère', sub: 'un repère orthonormé du plan' });
  gB.userData.focus = () => ({ target: [0.9 * S, 0.8 * S, 0], radius: 3.4 });
  board2d(gB, label, { x0: -3.8, x1: 5.8, y0: -2.4, y1: 4.4, X: x => x * S, Y: y => y * S,
    ticksX: [-3, -2, -1, 1, 2, 3, 4, 5], ticksY: [-2, -1, 1, 2, 3, 4] });

  const g = asm('fig', root, { title: 'Les vecteurs', sub: 'les traits de la page' });
  g.userData.focus = () => ({ target: [0.9 * S, 0.8 * S, 0], radius: 3 });
  const mk = (pal, name) => arrow(g, pal, { r: 0.04, head: 0.26, headR: 0.11, name });
  const aU = mk('blue', 'Vecteur u'), aV = mk('red', 'Vecteur v');
  const projRod = rod(g, { r: 0.07, pal: 'blue', name: 'Projeté de v sur u' });
  const rods = Array.from({ length: 3 }, () => rod(g, { r: 0.035, pal: 'ink', name: 'Côté' }));
  const pts = Array.from({ length: 3 }, (_, i) => ball(g, i ? 'ink' : 'blue', 'Point', 0.1));
  const arc = liveCurve(g, { n: 40, r: 0.03, pal: 'red', name: 'Angle' });
  const dash = lines(g, new Array(36).fill(0), '#57575a');      // pointillés (jusqu'à 6 tirets)
  const sq = lines(g, new Array(12).fill(0), '#26262a');
  const lev = []; for (const k of M.LEVELS) lev.push(k * S, -2.2 * S, 0.02, k * S, 4.2 * S, 0.02);
  const levL = lines(g, lev, '#9a9aa0');

  const pos = {};
  const L = (k, html, cls = 'vec') => label(cls, html, () => pos[k] ? P3(pos[k]) : null);
  L('u', '<i>u</i>', 'vec blue'); L('v', '<i>v</i>', 'vec red'); L('H', '<i>H</i>'); L('O', '<i>O</i>');
  L('A', '<i>A</i>'); L('B', '<i>B</i>'); L('C', '<i>C</i>'); L('M', '<i>M</i>');
  L('a', '<i>a</i>', 'vec grey'); L('b', '<i>b</i>', 'vec grey'); L('c', '<i>c</i>', 'vec grey');
  label('board', '', () => pos.ang ? P3(pos.ang) : null, () => st.angTxt || '');
  label('board', '', () => pos.txt ? P3(pos.txt) : null, () => st.txt || '');
  for (let i = 0; i < M.LEVELS.length; i++) label('board', '', () => is('level') ? P3([M.LEVELS[i] + 0.12, 3.9]) : null, () => `= ${4 * M.LEVELS[i]}`);

  const dashed = (segs) => {   // segs : liste de [p, q] ; chacun découpé en tirets
    const a = dash.geometry.attributes.position.array; a.fill(0); let k = 0;
    for (const [p, q] of segs) {
      const n = 3;
      for (let i = 0; i < n && k < 6; i++, k++) {
        const t0 = i / n, t1 = (i + 0.6) / n;
        const s0 = P3([p[0] + (q[0] - p[0]) * t0, p[1] + (q[1] - p[1]) * t0], Z + 0.01), s1 = P3([p[0] + (q[0] - p[0]) * t1, p[1] + (q[1] - p[1]) * t1], Z + 0.01);
        a.set([...s0.toArray(), ...s1.toArray()], k * 6);
      }
    }
    dash.geometry.attributes.position.needsUpdate = true; dash.geometry.computeBoundingSphere(); dash.visible = segs.length > 0;
  };
  const square = (P, A, B, s = 0.32) => {
    const u = [A[0] - P[0], A[1] - P[1]], v = [B[0] - P[0], B[1] - P[1]], nu = Math.hypot(...u), nv = Math.hypot(...v);
    const a = [P[0] + u[0] / nu * s, P[1] + u[1] / nu * s], b = [P[0] + v[0] / nv * s, P[1] + v[1] / nv * s], c = [a[0] + b[0] - P[0], a[1] + b[1] - P[1]];
    sq.geometry.attributes.position.array.set([...P3(a, Z + 0.03).toArray(), ...P3(c, Z + 0.03).toArray(), ...P3(c, Z + 0.03).toArray(), ...P3(b, Z + 0.03).toArray()]);
    sq.geometry.attributes.position.needsUpdate = true; sq.geometry.computeBoundingSphere(); sq.visible = true;
  };
  const arcAt = (cx, a0, a1, r = 0.7) => arc.set(Array.from({ length: 41 }, (_, k) => { const t = a0 + (a1 - a0) * k / 40; return P3([cx[0] + r * Math.cos(t), cx[1] + r * Math.sin(t)], Z + 0.03); }));
  const vec = (a, from, to) => setArrow(a, P3(from, Z + 0.05), P3(to, Z + 0.05).sub(P3(from, Z + 0.05)));
  const par = x => x < -1e-9 ? `(${fr(x)})` : fr(x);   // parenthèses autour des négatifs seulement
  const tip = (p, k = 0.35) => { const n = Math.hypot(...p) || 1; return [p[0] + p[0] / n * k, p[1] + p[1] / n * k]; };

  function update(s) {
    sc = s.scene; st = { ...s };
    for (const k in pos) delete pos[k];
    const O = [0, 0];
    // tout éteindre, puis rallumer ce que la page dessine (rodTo, setArrow et liveCurve.set touchent .visible)
    let onRods = [], onPts = [], onArc = false, onProj = false, onU = false, onV = false, onSq = false;
    const segs = [];
    if (is('proj', 'cos')) {
      const v = M.vOf(s.th), h = [M.projLen(s.th), 0];
      vec(aU, O, M.U); vec(aV, O, v); onU = onV = true;
      arcAt(O, 0, s.th, 0.75); onArc = true;
      pos.u = [M.U[0] + 0.1, -0.4]; pos.v = tip(v); pos.O = [-0.35, -0.4];
      pos.ang = [0.95 * Math.cos(s.th / 2) + 0.05, 0.95 * Math.sin(s.th / 2)]; st.angTxt = 'θ';
      if (is('proj')) {
        rodTo(projRod, P3(O, Z + 0.02), P3(h, Z + 0.02)); onProj = true;
        segs.push([v, h]); if (Math.abs(h[0]) > 0.35) { square(h, O, v); onSq = true; }
        pts[0].position.copy(P3(h, Z + 0.06)); onPts.push(0);
        pos.H = [h[0], -0.5];
        pos.txt = [-3.5, 3.6]; st.txt = `<i>u</i> · <i>v</i> = 4 × ${par(h[0])} = ${fr(4 * h[0])}`;
      } else {
        pos.txt = [-3.5, 3.6]; st.txt = `4 × 3 × cos ${fr(M.deg(s.th), 0)}° = ${fr(12 * Math.cos(s.th))}`;
        if (Math.abs(Math.cos(s.th)) < 0.04) { square(O, M.U, v); onSq = true; }
      }
    }
    if (is('coords')) {
      const v = s.vc;
      vec(aU, O, M.UC); vec(aV, O, v); onU = onV = true;
      segs.push([v, [v[0], 0]], [v, [0, v[1]]]);
      pos.u = tip(M.UC); pos.v = tip(v); pos.O = [-0.35, -0.4];
      pos.txt = [-3.5, 3.6]; st.txt = `3 × ${par(v[0])} + 1 × ${par(v[1])} = ${fr(M.dot(M.UC, v))}`;
    }
    if (is('level')) {
      const m = s.m, h = [M.XM, 0];
      vec(aU, O, M.AB); vec(aV, O, m); onU = onV = true;
      segs.push([m, h]); square(h, M.AB, m); onSq = true;
      pts[0].position.copy(P3(h, Z + 0.06)); pts[1].position.copy(P3(m, Z + 0.06)); onPts.push(0, 1);
      pos.A = [-0.35, -0.4]; pos.B = [M.AB[0] + 0.1, -0.45]; pos.H = [h[0] - 0.35, -0.45]; pos.M = [m[0] + 0.3, m[1] + 0.15];
      pos.txt = [-3.5, 3.6]; st.txt = `<i>AB</i> · <i>AM</i> = 4 × 2 = ${fr(M.dot(M.AB, m))}`;
    }
    if (is('kashi')) {
      const { A, B, C } = M.tri(s.al);
      rodTo(rods[0], P3(A), P3(B)); rodTo(rods[1], P3(A), P3(C)); rodTo(rods[2], P3(B), P3(C)); onRods = [0, 1, 2];
      [A, B, C].forEach((p, i) => pts[i].position.copy(P3(p, Z + 0.06))); onPts.push(0, 1, 2);
      arcAt(A, 0, s.al, 0.65); onArc = true;
      pos.A = [-0.4, -0.4]; pos.B = [B[0] + 0.2, -0.4]; pos.C = [C[0] + (C[0] < 0 ? -0.35 : 0.15), C[1] + 0.3];
      pos.c = [B[0] / 2, -0.45]; pos.b = [C[0] / 2 - 0.4 * Math.sin(s.al), C[1] / 2 + 0.4 * Math.cos(s.al)];
      { const d = [C[0] - B[0], C[1] - B[1]], n = Math.hypot(...d), nn = [d[1] / n, -d[0] / n], sg = (nn[0] * (B[0] + C[0]) / 2 + nn[1] * (B[1] + C[1]) / 2) > 0 ? 1 : -1; pos.a = [(B[0] + C[0]) / 2 + 0.4 * sg * nn[0], (B[1] + C[1]) / 2 + 0.4 * sg * nn[1]]; }
      pos.ang = [0.95 * Math.cos(s.al / 2) + 0.05, 0.95 * Math.sin(s.al / 2)]; st.angTxt = 'α';
      pos.txt = [-3.5, 3.6]; st.txt = `<i>a</i>² = 9 + 20,25 − 27 cos α = ${fr(M.kashi(s.al) ** 2)}`;
    }
    // visibilité APRÈS rodTo / setArrow / liveCurve.set
    aU.visible = aU.visible && onU; aV.visible = aV.visible && onV;
    projRod.visible = projRod.visible && onProj;
    rods.forEach((r, i) => r.visible = r.visible && onRods.includes(i));
    pts.forEach((p, i) => p.visible = onPts.includes(i));
    arc.mesh.visible = onArc; sq.visible = onSq; levL.visible = is('level');
    dashed(segs);
  }
  return { update, labels };
}
