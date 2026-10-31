// La figure : trois triangles en tiges posés sur la table quadrillée. Dans chacun, une droite (MN) glisse.
import * as THREE from 'three';
import { lines, V } from '../engine/parts.js';
import { slab, rod, rodTo, ball, W3 } from '../engine/kit.js';
import * as M from './model.js';

export const ST = { slide: 0, butterfly: 16, recip: 32 };
const Y = 0.12;

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let look = {};
  const on = k => (look[k] || 0) > 0.5;

  const grid = [];
  for (let x = -8; x <= 44; x++) grid.push(x, 0.001, -10, x, 0.001, 8);
  for (let z = -10; z <= 8; z++) grid.push(-8, 0.001, z, 44, 0.001, z);
  lines(root, grid, '#e4e4e0');

  // une station : le triangle ABC, la droite (MN), les points
  function station(X0, key, title, sub, extend) {
    const g = asm(key, root, { title, sub });
    const P = ([u, v]) => W3(X0 + u, v, Y);
    g.userData.focus = () => ({ target: P([2, 3]).toArray(), radius: 4.5 });
    const ab = rod(g, { r: 0.05, name: 'Côté [AB]' }), ac = rod(g, { r: 0.05, name: 'Côté [AC]' }), bc = rod(g, { r: 0.05, name: 'Côté [BC]' });
    rodTo(ab, P(M.A), P(M.B)); rodTo(ac, P(M.A), P(M.C)); rodTo(bc, P(M.B), P(M.C));
    const ext = extend ? [rod(g, { r: 0.025, pal: 'dark', name: 'Prolongement' }), rod(g, { r: 0.025, pal: 'dark', name: 'Prolongement' })] : null;
    const mn = rod(g, { r: 0.06, pal: 'red', name: 'Droite (MN)' });
    for (const [n, p] of [['A', M.A], ['B', M.B], ['C', M.C]]) { ball(g, 'paper', `Point ${n}`, 0.14).position.copy(P(p)); label('vec', `<i>${n}</i>`, () => P([p[0] + (n === 'C' ? 0.45 : n === 'B' ? -0.45 : 0), p[1] + (n === 'A' ? 0.5 : -0.4)])); }
    const bm = ball(g, 'red', 'Point M', 0.13), bn = ball(g, 'red', 'Point N', 0.13);
    let km = 0.5, kn = 0.5;
    label('vec red', '<i>M</i>', () => P(M.at(M.B, km)).add(V(km > 0 ? -0.45 : 0.45, 0, km > 0 ? 0 : -0.45)));
    label('vec red', '<i>N</i>', () => P(M.at(M.C, kn)).add(V(kn > 0 ? 0.45 : -0.45, 0, kn > 0 ? 0 : -0.45)));
    return { g, P, set(a, b) {
      km = a; kn = b;
      const m = P(M.at(M.B, a)), n = P(M.at(M.C, b));
      bm.position.copy(m); bn.position.copy(n); rodTo(mn, m, n);
      if (ext) { rodTo(ext[0], P(M.A), m); rodTo(ext[1], P(M.A), n); }
    } };
  }

  const s1 = station(ST.slide, 'tri', 'La droite (MN) qui glisse', 'toujours parallèle à (BC)');
  // la réduction AMN, en papier rouge, homothétique de ABC de centre A et de rapport k
  const big = slab(s1.g, [M.B, M.C].map(p => [p[0] - M.A[0], p[1] - M.A[1]]).concat([[0, 0]]), { h: 0.04, pal: 'paper', tone: 'lo', name: 'Triangle ABC', opacity: 0.6 });
  big.position.set(ST.slide + M.A[0], 0.002, -M.A[1]);
  const small = slab(s1.g, [M.B, M.C].map(p => [p[0] - M.A[0], p[1] - M.A[1]]).concat([[0, 0]]), { h: 0.1, pal: 'red', tone: 'hi', name: 'Triangle AMN', opacity: 0.75 });
  const s2 = station(ST.butterfly, 'fly', 'Le papillon', 'M et N de l’autre côté de A', true);
  const s3 = station(ST.recip, 'recip', 'Est-ce parallèle ?', 'N fixe, M qui bouge');
  let k = 0.5;
  label('board', '', () => on('red') ? W3(ST.slide + 2, 6.8, 0.5) : null, () => `aire × ${fr(k * k)}`);

  function update(s, lk) {
    look = lk;
    k = s.k;
    s1.set(k, k);
    small.visible = big.visible = on('red');
    small.scale.set(k, 1, k); small.position.set(ST.slide + M.A[0], 0.004 + 0.6 * (look.red || 0) * 0, -M.A[1]);
    s2.set(s.kb, s.kb);
    s3.set(s.km, M.K_N);
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
