// La figure : l'espace R³ (axes gris), trois vecteurs u (rouge), v (bleu), w (noir), la droite et le plan
// qu'ils engendrent, et les chemins qui décomposent un vecteur. (x, y, z) → (x, z, −y) dans la scène.
import * as THREE from 'three';
import { part, lines, arrow, setArrow, shadeMat, V } from '../engine/parts.js';
import { rod, rodTo, ball } from '../engine/kit.js';
import * as M from './model.js';

export const W = ([x, y, z]) => V(x, z, -y);

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let look = {}, st = {};
  const on = k => (look[k] || 0) > 0.5;

  const ax = [];
  for (const e of [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) { const a = W(e.map(c => -1.2 * c)), b = W(e.map(c => 2.4 * c)); ax.push(a.x, a.y, a.z, b.x, b.y, b.z); }
  lines(root, ax, '#b4b4b8');
  part(root, new THREE.SphereGeometry(0.06, 16, 10), { pal: 'ink', tone: 'hi', name: 'Vecteur nul' });
  label('mark', '0', () => W([-0.15, -0.15, -0.15]));

  const O = V(0, 0, 0);
  const vec = (parent, pal, name, r = 0.035) => arrow(parent, pal, { r, head: 0.18, headR: 0.08, name });
  const gV = asm('vecs', root, { title: 'Les vecteurs u, v, w', sub: 'des flèches qui partent de 0' });
  gV.userData.focus = () => ({ target: W([0.7, 0.6, 0.5]).toArray(), radius: 2 });
  const aU = vec(gV, 'red', 'u'), aV = vec(gV, 'blue', 'v'), aW = vec(gV, 'ink', 'w');
  setArrow(aU, O, W(M.U)); setArrow(aV, O, W(M.VV));
  label('vec red', '<i>u</i>', () => W(M.U).multiplyScalar(1.12));
  label('vec blue', '<i>v</i>', () => on('plane') || on('base') || on('supp') || on('free') ? W(M.VV).multiplyScalar(1.15) : null);
  label('vec', '<i>w</i>', () => on('w') ? W(st.w).multiplyScalar(1.12).add(V(0.12, 0.1, 0)) : null);

  // la droite Vect(u)
  const gL = asm('line', root, { title: 'La droite Vect(u)', sub: 'tous les λu' });
  gL.userData.focus = () => ({ target: [0, 0, 0], radius: 2.4 });
  const lineR = rod(gL, { r: 0.018, pal: 'red', name: 'Vect(u)' }); rodTo(lineR, W(M.scale(-1.5, M.U)), W(M.scale(1.6, M.U)));
  const lamB = ball(gL, 'red', 'λu', 0.11);
  label('vec red', '', () => on('line') ? W(M.scale(st.lam ?? 1, M.U)).add(V(0, 0.3, 0)) : null, () => `λ = ${fr(st.lam ?? 1)}`);

  // le plan Vect(u, v)
  const gP = asm('plane', root, { title: 'Le plan Vect(u, v)', sub: 'tous les λu + μv' });
  gP.userData.focus = () => ({ target: [0, 0, 0], radius: 2.6 });
  const quad = (k) => { const c = [[-k, -k], [k, -k], [k, k], [-k, k]].map(([a, b]) => W(M.add(M.scale(a, M.U), M.scale(b, M.VV))));
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute([c[0], c[1], c[2], c[0], c[2], c[3]].flatMap(p => p.toArray()), 3)); g.computeVertexNormals(); return g; };
  const pmat = shadeMat('blue', { opacity: 0.18 }).clone(); pmat.side = THREE.DoubleSide; pmat.depthWrite = false;
  const plane = part(gP, quad(1.25), { pal: 'blue', tone: 'lo', name: 'Vect(u, v)', mat: pmat }); plane.userData.noEdge = true;
  const pg = []; for (let k = -5; k <= 5; k++) { const s = k / 4; for (const [a, b] of [[M.add(M.scale(s, M.U), M.scale(-1.25, M.VV)), M.add(M.scale(s, M.U), M.scale(1.25, M.VV))], [M.add(M.scale(-1.25, M.U), M.scale(s, M.VV)), M.add(M.scale(1.25, M.U), M.scale(s, M.VV))]]) pg.push(...W(a).toArray(), ...W(b).toArray()); }
  lines(gP, pg, '#a9bde4');
  // le chemin λu puis μv jusqu'au point
  const cU = rod(gP, { r: 0.03, pal: 'red', name: 'λu' }), cV = rod(gP, { r: 0.03, pal: 'blue', name: 'μv' }), pB = ball(gP, 'ink', 'λu + μv', 0.1);

  // w et la famille libre ou liée
  const gW = asm('w', root, { title: 'Le vecteur w', sub: 'dans le plan, ou en dehors' });
  gW.userData.focus = () => ({ target: W(M.wT(0.5)).multiplyScalar(0.5).toArray(), radius: 2.2 });
  gW.add(aW);
  const drop = rod(gW, { r: 0.012, pal: 'dark', name: 'Hauteur au-dessus du plan' });

  // la décomposition de x sur une base, ou sur F ⊕ G
  const gX = asm('decomp', root, { title: 'Le vecteur x', sub: 'décomposé' });
  gX.userData.focus = () => ({ target: W(st.x ?? [1, 1, 1]).multiplyScalar(0.5).toArray(), radius: 2.2 });
  const aX = vec(gX, 'ink', 'x', 0.04);
  const p1 = rod(gX, { r: 0.03, pal: 'red', name: 'a u' }), p2 = rod(gX, { r: 0.03, pal: 'blue', name: 'b v' }), p3 = rod(gX, { r: 0.03, pal: 'dark', name: 'c w' });
  const fB = ball(gX, 'blue', 'Composante dans F', 0.09);
  label('vec', '<i>x</i>', () => on('base') || on('supp') ? W(st.x).multiplyScalar(1.1).add(V(0.15, 0.12, 0)) : null);
  label('vec blue', '<i>x<sub>F</sub></i>', () => on('supp') ? W(st.xf).add(V(0, -0.25, 0)) : null);
  label('vec', '<i>x<sub>G</sub></i>', () => on('supp') ? W(st.x).add(W(st.xf)).multiplyScalar(0.5).add(V(0.25, 0, 0)) : null);

  function update(s, lk) {
    look = lk; st = s;
    gL.visible = on('line'); gP.visible = on('plane') || on('free') || on('base') || on('supp');
    aV.visible = gP.visible || on('free');
    gW.visible = on('w'); gX.visible = on('base') || on('supp');
    cU.visible = cV.visible = pB.visible = on('plane');
    lamB.position.copy(W(M.scale(s.lam, M.U)));
    const [l, m] = s.lm, a = W(M.scale(l, M.U)), b = W(M.add(M.scale(l, M.U), M.scale(m, M.VV)));
    rodTo(cU, O, a); rodTo(cV, a, b); pB.position.copy(b);
    if (!on('plane')) cU.visible = cV.visible = pB.visible = false;
    setArrow(aW, O, W(s.w));
    const foot = M.add(M.scale(0.6, M.U), M.scale(0.5, M.VV)); rodTo(drop, W(foot), W(s.w));
    // x : base (u, v, w) ou F ⊕ G avec F = Vect(u, v), G = Vect(w)
    setArrow(aX, O, W(s.x));
    const [ca, cb, cc] = M.coords(s.x, M.U, M.VV, s.w);
    const q1 = M.scale(ca, M.U), q2 = M.add(q1, M.scale(cb, M.VV));
    rodTo(p1, O, W(q1)); rodTo(p2, W(q1), W(q2)); rodTo(p3, W(q2), W(s.x));
    fB.position.copy(W(q2)); fB.visible = on('supp');
    if (on('supp')) { p1.visible = false; rodTo(p2, O, W(q2)); }
    st = { ...s, xf: q2 };
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
