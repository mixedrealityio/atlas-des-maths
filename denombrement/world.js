// La figure : cinq scènes posées sur la table, de gauche à droite : une grille de rues, quatre blocs à ranger,
// cinq boules à choisir, le triangle de Yang Hui en tuiles, et le cube (a + b)³ qui s'ouvre.
import * as THREE from 'three';
import { part, box, lines, shadeMat, V } from '../engine/parts.js';
import { rod, rodTo, ball, liveCurve } from '../engine/kit.js';
import * as M from './model.js';

export const ST = { grid: 0, perm: 9, comb: 17, yang: 31, cube: 47 };

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};

  const grid = [];
  for (let x = -3; x <= 54; x++) grid.push(x, 0.001, -6, x, 0.001, 6);
  for (let z = -6; z <= 6; z++) grid.push(-3, 0.001, z, 54, 0.001, z);
  lines(root, grid, '#e4e4e0');

  // ---------- 0 · la grille de rues ----------
  const X0 = ST.grid, U = 1.3, G = (i, j, h = 0.08) => V(X0 + i * U, h, -j * U);
  const gG = asm('grid', root, { title: 'La grille 4 × 3', sub: 'chemins les plus courts' });
  gG.userData.focus = () => ({ target: [X0 + 2 * U, 0, -1.5 * U], radius: 3.4 });
  for (let i = 0; i <= M.GW; i++) rodTo(rod(gG, { r: 0.04, pal: 'dark', name: 'Rue' }), G(i, 0), G(i, M.GH));
  for (let j = 0; j <= M.GH; j++) rodTo(rod(gG, { r: 0.04, pal: 'dark', name: 'Rue' }), G(0, j), G(M.GW, j));
  for (let i = 0; i <= M.GW; i++) for (let j = 0; j <= M.GH; j++) part(gG, box(0.9, 0.35 + 0.25 * ((i * 7 + j * 3) % 3), 0.9, 0.05), { pal: 'base', tone: 'mid', name: 'Pâté de maisons', pos: [X0 + (i + 0.5) * U, 0.2, -(j + 0.5) * U] }).visible = i < M.GW && j < M.GH;
  ball(gG, 'blue', 'Départ', 0.13).position.copy(G(0, 0, 0.12)); ball(gG, 'red', 'Arrivée', 0.13).position.copy(G(M.GW, M.GH, 0.12));
  const path = liveCurve(gG, { n: 140, r: 0.08, pal: 'red', name: 'Chemin' });
  label('mark', 'départ', () => G(0, 0).add(V(-0.4, 0, 0.45)));
  label('mark', 'arrivée', () => G(M.GW, M.GH).add(V(0.4, 0, -0.45)));
  label('board', '', () => G(2, M.GH + 0.6, 0.6), () => `chemin ${st.pi + 1} / ${M.PATHS.length} : ${M.PATHS[st.pi || 0].join('')}`);

  // ---------- 1 · quatre blocs à ranger ----------
  const X1 = ST.perm, cols = ['red', 'blue', 'paper', 'dark'], names = ['rouge', 'bleu', 'blanc', 'gris'];
  const gP = asm('perm', root, { title: 'Quatre blocs', sub: '4! = 24 rangements' });
  gP.userData.focus = () => ({ target: [X1 + 2.25, 0.4, 0], radius: 2.6 });
  for (let k = 0; k < 4; k++) { part(gP, box(1.1, 0.04, 1.1, 0.01), { pal: 'board', tone: 'lo', name: 'Case', pos: [X1 + k * 1.5, 0.02, 0] }); label('tick', String(k + 1), () => V(X1 + k * 1.5, 0, 0.85)); }
  const blocks = cols.map((c, i) => part(gP, box(0.9, 0.9, 0.9, 0.08), { pal: c, tone: 'hi', name: `Bloc ${names[i]}` }));
  label('board', '', () => V(X1 + 2.25, 2, 0), () => `rangement ${st.qi + 1} / 24`);

  // ---------- 2 · choisir 2 boules parmi 5 ----------
  const X2 = ST.comb;
  const gC = asm('comb', root, { title: 'Cinq boules', sub: 'en choisir deux' });
  gC.userData.focus = () => ({ target: [X2 + 2.4, 0.6, 0], radius: 2.6 });
  const balls = [0, 1, 2, 3, 4].map(i => { const b = ball(gC, 'paper', `Boule ${i + 1}`, 0.4); label('vec', String(i + 1), () => b.position.clone().add(V(0, 0.65, 0))); return b; });
  label('board', '', () => V(X2 + 2.4, 2.4, 0), () => `choix ${st.ci + 1} / 10 : {${M.COMB[st.ci || 0].map(i => i + 1).join(', ')}}`);

  // ---------- 3 · le triangle de Yang Hui ----------
  const X3 = ST.yang, NR = 8, T = 1.05, cell = (n, k) => V(X3 + (k - n / 2) * T, 0.08, -(NR - 1 - n) * T * 0.9 + 3);
  const gY = asm('yang', root, { title: 'Le triangle de Yang Hui', sub: '杨辉三角, 1261' });
  gY.userData.focus = () => ({ target: [X3, 0, 0], radius: 4.4 });
  const tiles = [];
  for (let n = 0; n < NR; n++) for (let k = 0; k <= n; k++) {
    const m = part(gY, box(0.95, 0.16, 0.85, 0.04), { pal: 'paper', tone: 'mid', name: `C(${n}, ${k})` }); m.position.copy(cell(n, k)); m.userData.home = m.position.clone();
    tiles.push({ n, k, m, mats: { paper: m.material } });
    label('vec', String(M.C(n, k)), () => cell(n, k).add(V(0, 0.25, 0)));
  }
  const matRed = shadeMat('red'), matBlue = shadeMat('blue');
  label('mark', '<i>n</i> = 0', () => cell(0, 0).add(V(-1.6, 0, 0)));
  label('mark', '<i>n</i> = 7', () => cell(7, 0).add(V(-1.2, 0, 0)));

  // ---------- 4 · le cube (a + b)³ ----------
  const X4 = ST.cube, a = M.CA, b = M.CB;
  const gB = asm('cube', root, { title: 'Le cube (a + b)³', sub: 'huit morceaux' });
  gB.userData.focus = () => ({ target: [X4 + 1.5, 1.6, -1.5], radius: 3.4 });
  const pieces = [];
  for (const sx of [0, 1]) for (const sy of [0, 1]) for (const sz of [0, 1]) {
    const w = [sx ? b : a, sy ? b : a, sz ? b : a], o = [sx ? a : 0, sy ? a : 0, sz ? a : 0], na = 3 - sx - sy - sz;
    const pal = ['dark', 'paper', 'blue', 'red'][na];
    const m = part(gB, box(w[0] - 0.03, w[2] - 0.03, w[1] - 0.03, 0.03), { pal, tone: 'hi', name: ['b³', 'ab²', 'a²b', 'a³'][na] });
    pieces.push({ m, home: V(X4 + o[0] + w[0] / 2, o[2] + w[2] / 2, -(o[1] + w[1] / 2)), dir: V(sx - 0.5, sz - 0.2, -(sy - 0.5)).multiplyScalar(1.2) });
  }
  label('mark', '<i>a</i>', () => V(X4 + a / 2, 0, 0.45)); label('mark', '<i>b</i>', () => V(X4 + a + b / 2, 0, 0.45));

  function update(s) {
    st = s;
    // le chemin
    const pts = [G(0, 0, 0.12)]; let i = 0, j = 0;
    for (const d of M.PATHS[s.pi]) { if (d === 'D') i++; else j++; pts.push(G(i, j, 0.12)); }
    const dense = []; pts.forEach((p, k) => { if (k) for (let t = 1; t <= 6; t++) dense.push(pts[k - 1].clone().lerp(p, t / 6)); else dense.push(p); });
    path.set(dense);
    // les blocs : de l'ancien rangement au nouveau
    const cur = M.PERMS[s.qi], prev = M.PERMS[(s.qi + 23) % 24], f = s.qf, e = f * f * (3 - 2 * f);
    cur.forEach((blk, slot) => {
      const from = prev.indexOf(blk), x = X1 + (from + (slot - from) * e) * 1.5, lift = Math.sin(Math.PI * e) * (from === slot ? 0 : 0.9);
      blocks[blk].position.set(x, 0.49 + lift, 0); blocks[blk].userData.home = blocks[blk].position.clone();
    });
    // les boules choisies montent et rougissent
    const ch = M.COMB[s.ci];
    balls.forEach((b, k) => { const on = ch.includes(k); b.position.set(X2 + k * 1.2, 0.4 + (on ? 0.7 : 0), on ? 0.4 : 0); b.material = on ? matRed : shadeMat('paper'); b.userData.home = b.position.clone(); });
    // Yang Hui : la case et ses deux parents
    const [n0, k0] = M.CELLS[s.yi];
    tiles.forEach(t => { const hi = t.n === n0 && t.k === k0, par = t.n === n0 - 1 && (t.k === k0 || t.k === k0 - 1); t.m.material = hi ? matRed : par ? matBlue : t.mats.paper; t.m.position.y = 0.08 + (hi ? 0.25 : par ? 0.12 : 0); });
    // le cube
    pieces.forEach(p => { p.m.position.copy(p.home).addScaledVector(p.dir, s.sep); p.m.userData.home = p.m.position.clone(); });
  }
  return { update, labels };
}
