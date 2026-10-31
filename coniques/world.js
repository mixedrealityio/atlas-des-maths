// La figure : à gauche un double cône de verre coupé par un plan ; à droite un tableau où l'on trace
// l'ellipse, l'hyperbole et la parabole avec leurs foyers.
import * as THREE from 'three';
import { part, lines, shadeMat, V } from '../engine/parts.js';
import { board2d, liveCurve, rod, rodTo, ball } from '../engine/kit.js';
import * as M from './model.js';

export const OX = 11, S = 0.72;
const Z = 0.12;
export const B = ([x, y], z = Z) => V(OX + x * S, y * S, z);

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let sc = 'cone', st = {};
  const is = (...k) => k.includes(sc);

  // ---------- le cône ----------
  const gK = asm('cone', root, { title: 'Le double cône', sub: 'demi-angle 30°' });
  gK.userData.focus = () => ({ target: [0, 0.4, 0], radius: 2.8 });
  const R0 = M.YMAX * M.K;
  const cmat = shadeMat('paper', { opacity: 0.3 }).clone(); cmat.side = THREE.DoubleSide; cmat.depthWrite = false;
  for (const s of [1, -1]) {
    const g = new THREE.ConeGeometry(R0, M.YMAX, 64, 1, true); g.rotateX(s > 0 ? Math.PI : 0); g.translate(0, s * M.YMAX / 2, 0);
    const m = part(gK, g, { pal: 'paper', tone: 'lo', name: 'Nappe du cône', mat: cmat }); m.userData.noEdge = true;
    const e = []; for (let i = 0; i < 12; i++) { const t = 2 * Math.PI * i / 12; e.push(0, 0, 0, R0 * Math.cos(t), s * M.YMAX, R0 * Math.sin(t)); }
    lines(gK, e, '#b4b4b8');
    const rim = []; for (let i = 0; i < 64; i++) { const a = 2 * Math.PI * i / 64, b = 2 * Math.PI * (i + 1) / 64; rim.push(R0 * Math.cos(a), s * M.YMAX, R0 * Math.sin(a), R0 * Math.cos(b), s * M.YMAX, R0 * Math.sin(b)); }
    lines(gK, rim, '#8a8a8f');
  }
  lines(gK, [0, -M.YMAX - 0.3, 0, 0, M.YMAX + 0.3, 0], '#d4d4d6');
  const gPl = asm('plane', root, { title: 'Le plan de coupe', sub: 'incliné de β' });
  gPl.userData.focus = () => ({ target: [0, M.H0, 0], radius: 2.6 });
  const pg = new THREE.PlaneGeometry(4.6, 6.4); pg.rotateX(-Math.PI / 2);
  const pmat = shadeMat('blue', { opacity: 0.22 }).clone(); pmat.side = THREE.DoubleSide; pmat.depthWrite = false;
  const plane = part(gPl, pg, { pal: 'blue', tone: 'lo', name: 'Plan', mat: pmat }); plane.userData.noEdge = true;
  const pedge = new THREE.LineSegments(new THREE.EdgesGeometry(pg), new THREE.LineBasicMaterial({ color: '#5b86d6' })); pedge.userData.noEdge = true; plane.add(pedge);
  const N = 1440, dots = new THREE.InstancedMesh(new THREE.SphereGeometry(0.035, 8, 6), shadeMat('red'), N);
  dots.userData.noEdge = true; dots.frustumCulled = false; gK.add(dots);
  const M4 = new THREE.Matrix4();
  label('board', '', () => is('cone') ? V(-0.6, -M.YMAX - 0.55, 0) : null, () => `β = ${Math.round(M.deg(st.beta || 0))}° : ${M.kind(st.beta || 0)}`);

  // ---------- le tableau ----------
  const gB = asm('board', root, { title: 'Le plan du dessin', sub: 'repère orthonormé' });
  gB.userData.focus = () => ({ target: B([0, 0]).toArray(), radius: 3.6 });
  board2d(gB, label, { x0: -5.6, x1: 5.6, y0: -4.3, y1: 4.3, X: x => OX + x * S, Y: y => y * S, ticksX: [-4, -2, 2, 4], ticksY: [-2, 2], vis: () => !is('cone') });
  const gC = asm('conic', root, { title: 'La conique', sub: 'et ses foyers' });
  gC.userData.focus = () => ({ target: B([0, 0]).toArray(), radius: 3.2 });
  const cv = [liveCurve(gC, { n: 220, r: 0.05, pal: 'ink', name: 'Conique' }), liveCurve(gC, { n: 220, r: 0.05, pal: 'ink', name: 'Conique' })];
  const F1 = ball(gC, 'red', 'Foyer F', 0.12), F2 = ball(gC, 'blue', 'Foyer F′', 0.12), P = ball(gC, 'ink', 'Point M', 0.11);
  const s1 = rod(gC, { r: 0.035, pal: 'red', name: 'MF' }), s2 = rod(gC, { r: 0.035, pal: 'blue', name: 'MF′ ou distance à la directrice' });
  const aux = lines(gC, new Array(24).fill(0), '#8a8a8f');
  const rays = [0, 1, 2].map(() => [rod(gC, { r: 0.018, pal: 'dark', name: 'Rayon' }), rod(gC, { r: 0.018, pal: 'dark', name: 'Rayon réfléchi' })]);
  const pos = {};
  label('vec red', '<i>F</i>', () => pos.F1 ? B(pos.F1).add(V(0, -0.35, 0)) : null);
  label('vec blue', '<i>F′</i>', () => pos.F2 ? B(pos.F2).add(V(0, -0.35, 0)) : null);
  label('vec', '<i>M</i>', () => pos.P ? B(pos.P).add(V(0.25, 0.3, 0)) : null);
  label('board', '', () => pos.txt ? B([-5.2, 3.7]).add(V(0, 0, 0)) : null, () => pos.txt || '');
  label('mark', 'directrice', () => is('parab') ? B([-M.PA.p / 2, -3.7]).add(V(-0.75, 0, 0)) : null);
  label('mark', 'asymptotes', () => is('hyper') ? B([4.6, 4.1]) : null);

  const setAux = arr => { const a = aux.geometry.attributes.position.array; a.fill(0); arr.slice(0, 4).forEach((seg, i) => a.set([...B(seg[0], Z - 0.02).toArray(), ...B(seg[1], Z - 0.02).toArray()], i * 6)); aux.geometry.attributes.position.needsUpdate = true; aux.geometry.computeBoundingSphere(); };
  const inB = ([x, y]) => Math.abs(x) < 5.4 && Math.abs(y) < 4.1;
  const path = (f, a, b, n = 220) => { const out = []; for (let i = 0; i <= n; i++) { const p = f(a + (b - a) * i / n); if (p && inB(p)) out.push(B(p)); else if (out.length) break; } return out; };

  function update(s) {
    sc = s.scene; st = s;
    for (const k in pos) delete pos[k];
    gK.visible = gPl.visible = is('cone'); gC.visible = !is('cone');
    // le cône et la section
    plane.rotation.x = -s.beta; plane.position.set(0, M.H0, 0);
    const pts = M.section(s.beta, N / 2); let k = 0;
    for (const [x, y, z] of pts) { if (k >= N) break; M4.makeTranslation(x, y, z); dots.setMatrixAt(k++, M4); }
    dots.count = k; dots.instanceMatrix.needsUpdate = true;
    // le tableau
    cv.forEach(c => c.mesh.visible = false); rays.flat().forEach(r => r.visible = false);
    let f1 = null, f2 = null, p = null, other = null;
    if (is('ellipse')) {
      cv[0].set(path(M.elAt, 0, 2 * Math.PI)); cv[0].mesh.visible = true;
      f1 = [-M.EL.c, 0]; f2 = [M.EL.c, 0]; p = M.elAt(s.t); other = f2;
      pos.txt = `<i>MF</i> + <i>MF′</i> = ${fr(M.dist(p, f1) + M.dist(p, f2))}`;
      setAux([[[-M.EL.a, 0], [M.EL.a, 0]], [[0, -M.EL.b], [0, M.EL.b]]]);
    }
    if (is('hyper')) {
      const fixedPath = (side) => { const out = []; for (let i = 0; i <= 220; i++) { const q = M.hyAt(-2.2 + 4.4 * i / 220, side); if (inB(q)) out.push(B(q)); } return out; };
      cv[0].set(fixedPath(1)); cv[1].set(fixedPath(-1)); cv.forEach(c => c.mesh.visible = true);
      const m = M.HY.b / M.HY.a;
      f1 = [-M.HY.c, 0]; f2 = [M.HY.c, 0]; p = M.hyAt(s.u, 1); other = f2;
      pos.txt = `|<i>MF</i> − <i>MF′</i>| = ${fr(Math.abs(M.dist(p, f1) - M.dist(p, f2)))}`;
      setAux([[[-4.1 / m, -4.1], [4.1 / m, 4.1]], [[-4.1 / m, 4.1], [4.1 / m, -4.1]]]);
    }
    if (is('parab')) {
      const pp = M.PA.p; cv[0].set((() => { const out = []; for (let i = 0; i <= 220; i++) { const q = M.paAt(-4 + 8 * i / 220); if (inB(q)) out.push(B(q)); } return out; })()); cv[0].mesh.visible = true;
      f1 = [pp / 2, 0]; p = M.paAt(s.y); other = [-pp / 2, p[1]];
      pos.txt = `<i>MF</i> = <i>MH</i> = ${fr(M.dist(p, f1))}`;
      setAux([[[-pp / 2, -4.1], [-pp / 2, 4.1]]]);
      [-2.6, 1.4, 3.2].forEach((y, i) => { const q = M.paAt(y); rodTo(rays[i][0], B([5.3, y], Z - 0.01), B(q, Z - 0.01)); rodTo(rays[i][1], B(q, Z - 0.01), B(f1, Z - 0.01)); });
    }
    if (is('ecc')) {
      const e = s.e, out = []; let cut = false;
      const lim = e >= 1 ? Math.acos(-1 / e) - 0.02 : Math.PI;
      for (let i = 0; i <= 260; i++) { const th = -lim + 2 * lim * i / 260, r = M.polar(e, th), q = [r * Math.cos(th), r * Math.sin(th)]; if (r > 0 && inB(q)) out.push(B(q)); else { cut = true; if (out.length && th > 0) break; } }
      if (!cut) out.push(out[0].clone());   // courbe fermée tout entière dans le tableau : on la referme
      cv[0].set(out); cv[0].mesh.visible = true;
      f1 = [0, 0]; pos.txt = `<i>e</i> = ${fr(e)} : ${M.eKind(e)}`;
      setAux([[[M.EP / Math.max(e, 0.3), -4.1], [M.EP / Math.max(e, 0.3), 4.1]]]);
    }
    F1.visible = !!f1; F2.visible = !!f2 && !is('parab'); P.visible = s1.visible = s2.visible = !!p;
    if (f1) { F1.position.copy(B(f1, Z + 0.03)); pos.F1 = f1; }
    if (f2) { F2.position.copy(B(f2, Z + 0.03)); pos.F2 = f2; }
    if (p) { P.position.copy(B(p, Z + 0.04)); pos.P = p; rodTo(s1, B(p, Z + 0.02), B(f1, Z + 0.02)); rodTo(s2, B(p, Z + 0.025), B(other, Z + 0.025)); }
    if (!p) s1.visible = s2.visible = false;
    if (is('ecc')) aux.visible = s.e > 0.02; else aux.visible = true;
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
