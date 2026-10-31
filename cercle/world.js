// La figure : un tableau debout avec un cercle de rayon 3 (centre O). Chaque page y dessine ses propres traits.
import * as THREE from 'three';
import { part, lines, shadeMat, V } from '../engine/parts.js';
import { board2d, liveCurve, rod, rodTo, ball, slabGeo } from '../engine/kit.js';
import * as M from './model.js';

export const S = 0.9;
const Z = 0.12;
export const P3 = ([x, y], z = Z) => V(x * S, y * S, z);

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let sc = 'chord', st = {};
  const is = (...k) => k.includes(sc);

  const gB = asm('board', root, { title: 'Le cercle', sub: 'centre O, rayon 3' });
  gB.userData.focus = () => ({ target: [0, 0, 0], radius: 3.2 });
  board2d(gB, label, { x0: -4.2, x1: 6.6, y0: -4, y1: 4, X: x => x * S, Y: y => y * S, axes: false });
  const circ = liveCurve(gB, { n: 200, r: 0.045, pal: 'ink', name: 'Cercle' });
  circ.set(Array.from({ length: 201 }, (_, i) => P3(M.on(2 * Math.PI * i / 200))));
  ball(gB, 'ink', 'Centre O', 0.09).position.copy(P3([0, 0]));
  label('vec', '<i>O</i>', () => P3([-0.3, -0.35]));

  const g = asm('fig', root, { title: 'La figure', sub: 'les traits de la page' });
  g.userData.focus = () => ({ target: [0, 0, 0], radius: 3 });
  // un stock de tiges, de points et de petits arcs, réutilisés d'une page à l'autre
  const rods = Array.from({ length: 8 }, (_, i) => rod(g, { r: 0.035, pal: i < 3 ? 'red' : i < 5 ? 'blue' : 'dark', name: 'Segment' }));
  const pts = Array.from({ length: 5 }, (_, i) => ball(g, i ? 'red' : 'blue', 'Point', 0.11));
  const arcs = [liveCurve(g, { n: 40, r: 0.03, pal: 'red', name: 'Angle' }), liveCurve(g, { n: 40, r: 0.03, pal: 'blue', name: 'Angle au centre' })];
  const sq = lines(g, new Array(12).fill(0), '#26262a');
  const poly = liveCurve(g, { n: 200, r: 0.03, pal: 'red', name: 'Polygone inscrit' });
  let sector = null;
  const secMat = shadeMat('red', { opacity: 0.55 });

  const pos = {};
  const L = (k, html, cls = 'vec') => label(cls, html, () => pos[k] ? P3(pos[k]) : null);
  L('A', '<i>A</i>'); L('B', '<i>B</i>'); L('P', '<i>P</i>'); L('M', '<i>M</i>'); L('T1', '<i>T</i>'); L('T2', '<i>T′</i>');
  label('board', '', () => pos.ang ? P3(pos.ang) : null, () => st.angTxt || '');
  label('vec blue', '', () => pos.cang ? P3(pos.cang) : null, () => st.cangTxt || '');

  const arcAt = (c, i, cx, a0, a1, r = 0.6) => { c.mesh.visible = true; c.set(Array.from({ length: 41 }, (_, k) => { const t = a0 + (a1 - a0) * k / 40; return P3([cx[0] + r * Math.cos(t), cx[1] + r * Math.sin(t)], Z + 0.02 + i * 0.01); })); };
  const dir = (P, Q) => Math.atan2(Q[1] - P[1], Q[0] - P[0]);
  const angArc = (c, i, P, A, B, r) => { let a = dir(P, A), b = dir(P, B); let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; arcAt(c, i, P, a, a + d, r); return a + d / 2; };
  const square = (P, A, B, s = 0.35) => { // l'équerre de l'angle droit en P, entre les directions PA et PB
    const u = [A[0] - P[0], A[1] - P[1]], v = [B[0] - P[0], B[1] - P[1]], nu = Math.hypot(...u), nv = Math.hypot(...v);
    const a = [P[0] + u[0] / nu * s, P[1] + u[1] / nu * s], b = [P[0] + v[0] / nv * s, P[1] + v[1] / nv * s], c = [a[0] + b[0] - P[0], a[1] + b[1] - P[1]];
    sq.geometry.attributes.position.array.set([...P3(a, Z + 0.03).toArray(), ...P3(c, Z + 0.03).toArray(), ...P3(c, Z + 0.03).toArray(), ...P3(b, Z + 0.03).toArray()]);
    sq.geometry.attributes.position.needsUpdate = true; sq.geometry.computeBoundingSphere(); sq.visible = true;
  };

  function update(s) {
    sc = s.scene; st = { ...s };
    for (const k in pos) delete pos[k];
    let used = 0, usedP = 0; const seg = (a, b, idx) => { const r = rods[idx]; rodTo(r, P3(a), P3(b)); r.userData.on = true; };
    rods.forEach(r => r.userData.on = false); pts.forEach(p => p.userData.on = false);
    const dot = (p, i) => { pts[i].position.copy(P3(p, Z + 0.04)); pts[i].userData.on = true; };
    arcs.forEach(a => a.mesh.visible = false); sq.visible = false; poly.mesh.visible = false;
    if (sector) sector.visible = false;
    const O = [0, 0];
    if (is('chord')) {
      const c = M.chord(s.phi, s.d);
      seg(c.A, c.B, 0); seg(O, c.M, 3); seg(O, c.A, 5); seg(O, c.B, 6);
      dot(c.A, 1); dot(c.B, 2); dot(c.M, 0); square(c.M, O, c.A);
      Object.assign(pos, { A: c.A.map(x => x * 1.12), B: c.B.map(x => x * 1.12), M: [c.M[0] + 0.35, c.M[1] - 0.35] });
    }
    if (is('inscribed', 'semi')) {
      const ta = is('semi') ? Math.PI : M.TA, tb = is('semi') ? 0 : M.TB;
      const A = M.on(ta), B = M.on(tb), P = M.on(s.tp);
      seg(P, A, 0); seg(P, B, 1); dot(A, 1); dot(B, 2); dot(P, 3);
      if (is('inscribed')) { seg(O, A, 3); seg(O, B, 4); const m = angArc(arcs[1], 1, O, A, B, 0.7); pos.cang = [1.25 * Math.cos(m), 1.25 * Math.sin(m)]; st.cangTxt = `${Math.round(M.deg(M.CENTRAL))}°`; }
      else seg(A, B, 5);
      const ang = M.angleAt(P, A, B), m = angArc(arcs[0], 0, P, A, B, 0.7);
      if (is('semi')) square(P, A, B, 0.4);
      pos.ang = [P[0] + 1.25 * Math.cos(m), P[1] + 1.25 * Math.sin(m)]; st.angTxt = `${fr(M.deg(ang), 1)}°`;
      Object.assign(pos, { A: A.map(x => x * 1.13), B: B.map(x => x * 1.13), P: P.map(x => x * 1.12) });
    }
    if (is('tangent')) {
      const P = [s.D, 0], [T1, T2] = M.tangents(s.D);
      seg(P, T1, 0); seg(P, T2, 1); seg(O, T1, 3); seg(O, T2, 4); seg(O, P, 5);
      dot(P, 3); dot(T1, 1); dot(T2, 2); square(T1, O, P, 0.35);
      Object.assign(pos, { P: [P[0] + 0.35, P[1] - 0.35], T1: T1.map(x => x * 1.13), T2: T2.map(x => x * 1.13) });
    }
    if (is('sector')) {
      if (sector) { sector.geometry.dispose(); g.remove(sector); }
      const n = Math.max(2, Math.ceil(s.th / (Math.PI / 60))), poly2 = [[0, 0]];
      for (let k = 0; k <= n; k++) { const t = s.th * k / n; poly2.push([M.R * S * Math.cos(t), M.R * S * Math.sin(t)]); }
      const geo = slabGeo(poly2, 0.06); geo.rotateX(Math.PI / 2);   // le secteur debout, dans le plan du tableau
      sector = part(g, geo, { pal: 'red', tone: 'hi', name: 'Secteur', mat: secMat }); sector.position.z = Z - 0.04;
      seg(O, M.on(0), 3); seg(O, M.on(s.th), 4); arcAt(arcs[0], 0, O, 0, s.th, M.R);
      pos.ang = [0.9 * Math.cos(s.th / 2), 0.9 * Math.sin(s.th / 2)]; st.angTxt = 'θ';
    }
    if (is('liuhui')) {
      poly.set(Array.from({ length: s.n + 1 }, (_, k) => P3(M.on(2 * Math.PI * k / s.n + Math.PI / 2), Z + 0.03)));
      poly.mesh.visible = true;
      pos.ang = [3.8, 3.2]; st.angTxt = `${s.n} côtés`;
    }
    rods.forEach(r => r.visible = r.visible && r.userData.on);
    pts.forEach(p => p.visible = p.userData.on);
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
