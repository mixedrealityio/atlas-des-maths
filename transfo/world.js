// La figure : un repère dressé comme un tableau, le drapeau F (bleu) et son image (rouge).
// L'image est le même solide que F, placé par la matrice de la transformation.
import * as THREE from 'three';
import { lines, part, shadeMat, V } from '../engine/parts.js';
import { board2d, liveCurve, rod, rodTo, ball, fr } from '../engine/kit.js';
import * as M from './model.js';

export const S = 0.8;
const Z = 0.12;
export const P3 = ([x, y], z = Z) => V(x * S, y * S, z);
const CX = 0.2, CY = 0.7;
const BX0 = -4.2, BX1 = 4.6, BY0 = -3.6, BY1 = 5;                 // centre du tableau, en unités du repère

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let sc = 'axe', st = {};
  const is = (...k) => k.includes(sc);

  const gB = asm('board', root, { title: 'Le repère', sub: 'un repère orthonormé du plan' });
  gB.userData.focus = () => ({ target: [CX * S, CY * S, 0], radius: 3.6 });
  board2d(gB, label, { x0: BX0, x1: BX1, y0: BY0, y1: BY1, X: x => x * S, Y: y => y * S,
    ticksX: [-4, -3, -2, -1, 1, 2, 3, 4], ticksY: [-3, -2, -1, 1, 2, 3, 4] });

  // les drapeaux : une seule géométrie, trois placements
  const shape = new THREE.Shape(M.F.map(([x, y]) => new THREE.Vector2(x * S, y * S)));
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: false });
  const flag = (parent, pal, name, z, opacity = 1) => {
    const g = new THREE.Group(); g.matrixAutoUpdate = false; parent.add(g);
    const mesh = part(g, geo, { pal, tone: 'hi', name, mat: opacity < 1 ? shadeMat(pal, { opacity }) : undefined });
    g.userData.z = z;
    g.userData.mesh = mesh;
    return g;
  };
  const place = (g, m) => { const [a, b, c, d] = m; g.matrix.set(a, b, 0, 0, c, d, 0, 0, 0, 0, 1, g.userData.z, 0, 0, 0, 1); g.matrixWorldNeedsUpdate = true; };

  const gF = asm('F', root, { title: 'La figure F', sub: 'un drapeau sans symétrie' });
  gF.userData.focus = () => ({ target: P3([1.2, 1.2], 0).toArray(), radius: 1.8 });
  const fF = flag(gF, 'blue', 'Figure F', 0.02); place(fF, [1, 0, 0, 1]);

  const gI = asm('img', root, { title: 'L’image F′', sub: 'la figure transformée' });
  gI.userData.focus = () => { const c = M.apply(st.mat || [1, 0, 0, 1], [1.2, 1.2]); return { target: P3(c, 0).toArray(), radius: 2.2 }; };
  const fI = flag(gI, 'red', 'Image F′', 0.07);
  const fM = flag(gI, 'dark', 'Étape intermédiaire', 0.045, 0.55);

  // les traits de construction
  const g = asm('fig', root, { title: 'La construction', sub: 'axes, centre, rayons' });
  g.userData.focus = () => ({ target: [CX * S, CY * S, 0], radius: 3.2 });
  const axes = [rod(g, { r: 0.03, pal: 'ink', name: 'Axe d₁' }), rod(g, { r: 0.03, pal: 'dark', name: 'Axe d₂' })];
  const rays = Array.from({ length: 2 }, () => rod(g, { r: 0.022, pal: 'dark', name: 'Rayon' }));
  const pts = Array.from({ length: 6 }, (_, i) => ball(g, i === 0 ? 'ink' : i === 5 ? 'dark' : i % 2 ? 'blue' : 'red', 'Point', 0.085));
  const arc = liveCurve(g, { n: 48, r: 0.028, pal: 'red', name: 'Angle' });
  const dash = lines(g, new Array(24 * 6).fill(0), '#3a3a3e');
  const sq = lines(g, new Array(12).fill(0), '#26262a');

  const pos = {};
  const L = (k, html, cls) => label(cls, html, () => pos[k] ? P3(pos[k]) : null);
  L('O', '<i>O</i>', 'vec'); L('A', '<i>A</i>', 'vec blue'); L('B', '<i>B</i>', 'vec blue');
  L('A1', '<i>A</i>′', 'vec red'); L('B1', '<i>B</i>′', 'vec red'); L('A2', '<i>A</i>″', 'vec red'); L('Am', '<i>A</i>′', 'vec grey');
  L('d', '<i>d</i>', 'vec'); L('d1', '<i>d</i>₁', 'vec'); L('d2', '<i>d</i>₂', 'vec grey');
  L('Fl', '<i>F</i>', 'vec blue'); L('Fi', '<i>F</i>′', 'vec red'); L('Fii', '<i>F</i>″', 'vec red');
  label('board', '', () => pos.ang ? P3(pos.ang) : null, () => st.angTxt || '');
  label('board', '', () => pos.txt ? P3(pos.txt) : null, () => st.txt || '');

  const dashed = (segs, n = 4) => {   // segs : liste de [p, q], chacun découpé en n tirets (24 en tout)
    const a = dash.geometry.attributes.position.array; a.fill(0); let k = 0;
    for (const [p, q] of segs) for (let i = 0; i < n && k < 24; i++, k++) {
      const t0 = i / n, t1 = (i + 0.55) / n;
      const s0 = P3([p[0] + (q[0] - p[0]) * t0, p[1] + (q[1] - p[1]) * t0], Z + 0.01), s1 = P3([p[0] + (q[0] - p[0]) * t1, p[1] + (q[1] - p[1]) * t1], Z + 0.01);
      a.set([...s0.toArray(), ...s1.toArray()], k * 6);
    }
    dash.geometry.attributes.position.needsUpdate = true; dash.geometry.computeBoundingSphere(); dash.visible = segs.length > 0;
  };
  const square = (P, dirA, dirB, s = 0.22) => {     // petit angle droit en P, côtés selon dirA et dirB (unitaires)
    const a = [P[0] + dirA[0] * s, P[1] + dirA[1] * s], b = [P[0] + dirB[0] * s, P[1] + dirB[1] * s], c = [a[0] + b[0] - P[0], a[1] + b[1] - P[1]];
    sq.geometry.attributes.position.array.set([...P3(a, Z + 0.03).toArray(), ...P3(c, Z + 0.03).toArray(), ...P3(c, Z + 0.03).toArray(), ...P3(b, Z + 0.03).toArray()]);
    sq.geometry.attributes.position.needsUpdate = true; sq.geometry.computeBoundingSphere();
  };
  const arcAt = (a0, a1, r) => arc.set(Array.from({ length: 49 }, (_, k) => { const t = a0 + (a1 - a0) * k / 48; return P3([r * Math.cos(t), r * Math.sin(t)], Z + 0.03); }));
  const reach = u => Math.min(u[0] > 1e-6 ? (BX1 - 0.2) / u[0] : u[0] < -1e-6 ? (BX0 + 0.2) / u[0] : 99, u[1] > 1e-6 ? (BY1 - 0.2) / u[1] : u[1] < -1e-6 ? (BY0 + 0.2) / u[1] : 99);
  const line = (m, phi) => { const u = [Math.cos(phi), Math.sin(phi)], a = reach(u), b = reach([-u[0], -u[1]]); rodTo(m, P3([-b * u[0], -b * u[1]], Z), P3([a * u[0], a * u[1]], Z)); };
  const lineThrough = (m, p) => line(m, Math.atan2(p[1], p[0]));
  const along = (p, k = 0.38) => { const n = M.norm(p) || 1; return [p[0] + p[0] / n * k, p[1] + p[1] / n * k]; };
  const TXT = [-4, 4.6];

  function update(s) {
    sc = s.scene; st = { ...s };
    for (const k in pos) delete pos[k];
    const O = [0, 0];
    let mat = [1, 0, 0, 1], mid = null, onAxes = [], onRays = [], onPts = [0], onArc = false, onSq = false;
    const segs = [];
    pos.O = [-0.35, -0.38]; pts[0].position.copy(P3(O, Z + 0.05));
    pos.Fl = [0.25, 1.2];

    if (is('axe')) {
      mat = M.refl(s.phi);
      line(axes[0], s.phi); onAxes = [0];
      const A1 = M.apply(mat, M.A), m = [(M.A[0] + A1[0]) / 2, (M.A[1] + A1[1]) / 2];
      segs.push([M.A, A1]);
      const u = [Math.cos(s.phi), Math.sin(s.phi)], w = [(M.A[0] - m[0]) / M.dist(M.A, m), (M.A[1] - m[1]) / M.dist(M.A, m)];
      square(m, u, w); onSq = true;
      pts[1].position.copy(P3(M.A, Z + 0.1)); pts[2].position.copy(P3(A1, Z + 0.15)); onPts.push(1, 2);
      pos.A = [M.A[0] + 0.25, M.A[1] + 0.05]; { const n = M.dist(A1, m); pos.A1 = [A1[0] + (A1[0] - m[0]) / n * 0.4, A1[1] + (A1[1] - m[1]) / n * 0.4]; }
      { const r = reach(u) - 0.3; pos.d = [r * u[0] + 0.3, r * u[1] + 0.1]; }
      pos.txt = TXT; st.txt = `dist(<i>A</i>, <i>d</i>) = dist(<i>A</i>′, <i>d</i>) = ${fr(M.distLine(M.A, s.phi))}`;
    }
    if (is('centre', 'rot')) {
      const th = is('centre') ? s.half : s.th;
      mat = M.rot(th);
      const A1 = M.apply(mat, M.A), a0 = Math.atan2(M.A[1], M.A[0]), r = M.norm(M.A);
      if (th > 0.03) { arcAt(a0, a0 + th, r); onArc = true; }
      rodTo(rays[0], P3(O, Z), P3(M.A, Z)); rodTo(rays[1], P3(O, Z), P3(A1, Z)); onRays = [0, 1];
      pts[1].position.copy(P3(M.A, Z + 0.1)); pts[2].position.copy(P3(A1, Z + 0.15)); onPts.push(1, 2);
      pos.A = [M.A[0] + 0.25, M.A[1] - 0.15]; pos.A1 = along(A1, 0.35);
      pos.ang = [0.75 * Math.cos(a0 + th / 2) - 0.1, 0.75 * Math.sin(a0 + th / 2)]; st.angTxt = 'θ';
      pos.txt = TXT;
      if (is('centre')) {
        const B1 = M.apply(mat, M.B); segs.push([M.B, B1]);
        pts[3].position.copy(P3(M.B, Z + 0.1)); pts[4].position.copy(P3(B1, Z + 0.15)); onPts.push(3, 4);
        pos.B = [M.B[0] + 0.25, M.B[1] - 0.3]; pos.B1 = [B1[0] - 0.3, B1[1] + 0.3];
        st.txt = th > Math.PI - 1e-3 ? '<i>O</i> est le milieu de [<i>AA</i>′] et de [<i>BB</i>′]' : `demi-tour : ${fr(M.deg(th), 0)}°`;
      } else st.txt = `<i>OA</i> = <i>OA</i>′ = ${fr(r)}   angle <i>AOA</i>′ = ${fr(M.deg(th), 0)}°`;
    }
    if (is('homo')) {
      mat = M.homo(s.k);
      const A1 = M.apply(mat, M.A), B1 = M.apply(mat, M.B);
      lineThrough(rays[0], M.A); lineThrough(rays[1], M.B); onRays = [0, 1];
      pts[1].position.copy(P3(M.A, Z + 0.1)); pts[2].position.copy(P3(A1, Z + 0.15)); pts[3].position.copy(P3(M.B, Z + 0.1)); pts[4].position.copy(P3(B1, Z + 0.15)); onPts.push(1, 2, 3, 4);
      pos.A = [M.A[0] + 0.15, M.A[1] - 0.35]; pos.B = [M.B[0] + 0.1, M.B[1] - 0.35];
      if (Math.abs(s.k - 1) > 0.15 && Math.abs(s.k) > 0.3) { pos.A1 = [A1[0] + 0.3 * Math.sign(s.k), A1[1] + 0.25]; pos.B1 = [B1[0] + 0.3 * Math.sign(s.k), B1[1] - 0.3]; }
      pos.txt = TXT; st.txt = `<i>k</i> = ${fr(s.k)}   aire(<i>F</i>′) = <i>k</i>² × aire(<i>F</i>) = ${fr(s.k * s.k * M.area(M.F), 3)}`;
    }
    if (is('compo')) {
      const phi2 = M.PHI1 + s.al, s1 = M.refl(M.PHI1), s2 = M.refl(phi2);
      mid = s1; mat = M.mul(s2, s1);
      line(axes[0], M.PHI1); line(axes[1], phi2); onAxes = [0, 1];
      const Am = M.apply(s1, M.A), A2 = M.apply(mat, M.A), a0 = Math.atan2(M.A[1], M.A[0]);
      arcAt(a0, a0 + 2 * s.al, M.norm(M.A)); onArc = true;
      segs.push([M.A, Am], [Am, A2]);
      pts[1].position.copy(P3(M.A, Z + 0.1)); pts[5].position.copy(P3(Am, Z + 0.12)); pts[2].position.copy(P3(A2, Z + 0.15)); onPts.push(1, 2, 5);
      pos.A = [M.A[0] + 0.25, M.A[1] - 0.15]; pos.Am = [Am[0] - 0.4, Am[1] - 0.1]; pos.A2 = along(A2, 0.35);
      { const u1 = [Math.cos(M.PHI1), Math.sin(M.PHI1)], u2 = [Math.cos(phi2), Math.sin(phi2)], r1 = reach(u1) - 0.35, r2 = reach(u2) - 1.1; pos.d1 = [r1 * u1[0] + 0.3, r1 * u1[1]]; pos.d2 = [r2 * u2[0] - 0.4, r2 * u2[1] + 0.15]; }
      pos.ang = [-0.95 * Math.cos(M.PHI1 + s.al / 2) - 0.05, -0.95 * Math.sin(M.PHI1 + s.al / 2)]; st.angTxt = 'α';
      pos.txt = [-4, -3.2]; st.txt = `α = ${fr(M.deg(s.al), 0)}°   angle <i>AOA</i>″ = ${fr(M.deg(M.angle(M.A, A2)), 0)}° = 2α`;
    }
    st.mat = mat;
    place(fI, mat); if (mid) place(fM, mid);
    if (!is('homo') || Math.abs(s.k) > 0.45) pos[is('compo') ? 'Fii' : 'Fi'] = M.apply(mat, [0.3, 1.2]);
    if (is('compo') || is('homo')) delete pos.Fl;
    // visibilité APRÈS rodTo / liveCurve.set
    axes.forEach((r, i) => r.visible = r.visible && onAxes.includes(i));
    rays.forEach((r, i) => r.visible = r.visible && onRays.includes(i));
    pts.forEach((p, i) => p.visible = onPts.includes(i));
    arc.mesh.visible = arc.mesh.visible && onArc; sq.visible = onSq;
    fI.visible = !is('homo') || Math.abs(s.k) > 0.02; fM.visible = !!mid;
    dashed(segs, segs.length > 2 ? 3 : 4);
  }
  return { update, labels };
}
