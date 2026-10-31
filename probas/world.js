// La figure : à gauche une planche de Galton debout, avec ses clous et ses billes ; à droite un tableau
// pour les diagrammes en barres et la courbe en cloche.
import * as THREE from 'three';
import { part, cyl, zAxis, lines, shadeMat, V } from '../engine/parts.js';
import { board2d, liveCurve, sizedBox, setBox, rod, rodTo } from '../engine/kit.js';
import * as M from './model.js';

export const DX = 0.5, DY = 0.55, TOP = 9.5;                     // pas des clous, hauteur du premier
export const OX = 9;                                              // le tableau des barres
export const BX = x => OX + x, BY = y => y;

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let sc = 'galton', st = {};
  const is = (...k) => k.includes(sc);

  // ---------- la planche ----------
  const gG = asm('galton', root, { title: 'La planche de Galton', sub: '8 rangées de clous' });
  gG.userData.focus = () => ({ target: [0, 5, 0], radius: 5 });
  part(gG, new THREE.BoxGeometry(6, 10.8, 0.1), { pal: 'board', tone: 'lo', name: 'Planche', pos: [0, 5.1, -0.15] });
  for (let r = 0; r < M.ROWS; r++) for (let k = 0; k <= r; k++) part(gG, zAxis(cyl(0.05, 0.4, 10)), { pal: 'ink', tone: 'hi', name: 'Clou', pos: [(k - r / 2) * DX, TOP - r * DY, 0.05] });
  const binY = TOP - M.ROWS * DY;                                  // haut des cases
  for (let j = 0; j <= M.ROWS + 1; j++) { const x = (j - (M.ROWS + 1) / 2) * DX; rodTo(rod(gG, { r: 0.02, pal: 'dark', name: 'Paroi' }), V(x, -0.1, 0.05), V(x, binY - 0.05, 0.05)); }
  rodTo(rod(gG, { r: 0.03, pal: 'dark', name: 'Fond' }), V(-(M.ROWS + 1) / 2 * DX, -0.1, 0.05), V((M.ROWS + 1) / 2 * DX, -0.1, 0.05));
  for (let j = 0; j <= M.ROWS; j++) label('tick', String(j), () => V((j - M.ROWS / 2) * DX + 0.07, -0.4, 0.1));
  const R = 0.07, balls = new THREE.InstancedMesh(new THREE.SphereGeometry(R, 12, 8), shadeMat('red'), M.NB + 2);
  balls.userData.noEdge = true; balls.frustumCulled = false; gG.add(balls);
  const M4 = new THREE.Matrix4();
  const counts = Array(M.ROWS + 1).fill(0);
  for (let j = 0; j <= M.ROWS; j++) label('mark', '', () => is('galton') && counts[j] ? V((j - M.ROWS / 2) * DX, 0.05 + counts[j] * 2 * R * 0.92 + 0.3, 0.15) : null, () => String(counts[j]));

  // ---------- le tableau des barres ----------
  const gB = asm('board', root, { title: 'Le diagramme', sub: 'probabilité de chaque valeur' });
  gB.userData.focus = () => ({ target: [BX(4), 3, 0], radius: 4 });
  board2d(gB, label, { x0: -0.7, x1: 8.8, y0: -0.6, y1: 6.6, X: BX, Y: BY, axes: false });
  lines(gB, [BX(-0.4), 0, 0.01, BX(8.5), 0, 0.01], '#57575a');
  const NBAR = 65, bars = Array.from({ length: NBAR }, () => sizedBox(gB, { pal: 'blue', name: 'P(X = k)' }));
  const bell = liveCurve(gB, { n: 200, r: 0.04, pal: 'red', name: 'Courbe en cloche' });
  const shade = Array.from({ length: 60 }, () => sizedBox(gB, { pal: 'red', tone: 'lo', name: 'Aire sous la courbe', opacity: 0.45 }));
  const mu = rod(gB, { r: 0.025, pal: 'ink', name: 'Espérance μ' }), sigL = rod(gB, { r: 0.015, pal: 'dark', name: 'μ − σ' }), sigR = rod(gB, { r: 0.015, pal: 'dark', name: 'μ + σ' });
  const tk = [];
  for (let k = 0; k <= 8; k++) label('tick', '', () => tk[k] ? V(BX(tk[k][0]), -0.3, 0.1) : null, () => tk[k] ? tk[k][1] : '');
  label('vec', 'μ', () => is('esp') ? V(BX(st.mux), BY(6.2), 0.1) : null);
  label('mark', 'μ − σ', () => is('esp') ? V(BX(st.mux - st.sx) - 0.2, BY(5.6), 0.1) : null);
  label('mark', 'μ + σ', () => is('esp') ? V(BX(st.mux + st.sx) + 0.2, BY(5.6), 0.1) : null);
  label('board', '', () => is('binom', 'esp', 'normal', 'sigma') ? V(BX(0), BY(6.2), 0.1) : null, () => st.title || '');

  function update(s) {
    sc = s.scene; st = s;
    gG.visible = is('galton'); gB.visible = !is('galton');
    // billes
    counts.fill(0);
    const tc = s.tc; let k = 0;
    M.BALLS.forEach((b, i) => {
      const age = tc - i * M.GAP; if (age < 0) return;
      let x, y;
      if (age >= M.FALL) { counts[b.bin]++; x = (b.bin - M.ROWS / 2) * DX; y = -0.1 + R + b.slot * 2 * R * 0.92; if (y > binY - R) return; }
      else {
        const u = age / M.FALL * (M.ROWS + 1.2), r = Math.min(Math.floor(u), M.ROWS), f = Math.min(u - r, 1);
        const right = b.c.slice(0, r).reduce((a, c) => a + c, 0), x0 = (right - r / 2) * DX;
        if (r >= M.ROWS) { x = (b.bin - M.ROWS / 2) * DX; const ys = -0.1 + R + b.slot * 2 * R * 0.92; y = binY + (ys - binY) * Math.min(1, (u - M.ROWS) / 1.2); }
        else { const x1 = x0 + (b.c[r] ? 0.5 : -0.5) * DX; x = x0 + (x1 - x0) * f; y = TOP + 0.45 - r * DY - f * DY + 0.18 * Math.sin(Math.PI * f) - 0.3; }
        if (r === 0 && f < 0.5) y = TOP + 0.45 + (0.5 - f) * 0.6;
      }
      M4.makeTranslation(x, y, 0.08); balls.setMatrixAt(k++, M4);
    });
    balls.count = k; balls.instanceMatrix.needsUpdate = true;
    // barres
    bars.forEach(b => b.visible = false); shade.forEach(b => b.visible = false); bell.mesh.visible = false; mu.visible = sigL.visible = sigR.visible = false;
    tk.length = 0;
    if (is('binom', 'esp')) {
      const n = 8, p = s.p, w = 1, H = 14;
      for (let j = 0; j <= n; j++) { setBox(bars[j], BX(j * w) - 0.38, BX(j * w) + 0.38, 0, BY(H * M.binom(n, p, j)), 0, 0.2); tk[j] = [j * w, String(j)]; }
      st.title = `X ∼ B(8 ; ${fr(p)})`;
      if (is('esp')) {
        const m = n * p, sd = Math.sqrt(n * p * (1 - p)); st.mux = m * w; st.sx = sd * w;
        rodTo(mu, V(BX(m), 0, 0.3), V(BX(m), BY(6), 0.3)); rodTo(sigL, V(BX(m - sd), 0, 0.3), V(BX(m - sd), BY(5.4), 0.3)); rodTo(sigR, V(BX(m + sd), 0, 0.3), V(BX(m + sd), BY(5.4), 0.3));
        st.title = `E(X) = ${fr(m)}   σ = ${fr(sd)}`;
      }
    }
    if (is('normal', 'sigma')) {
      // X centrée réduite : on dessine z de −4 à 4 sur les 8 unités du tableau
      const Z = z => 4 + z, H = 30;
      const n = is('normal') ? s.n : 64, sd = Math.sqrt(n) / 2, m = n / 2;
      if (is('normal')) for (let j = 0; j <= n; j++) { const z = (j - m) / sd, wz = 1 / sd; if (Math.abs(z) > 4.2) continue; setBox(bars[j], BX(Z(z - wz / 2)) + 0.01, BX(Z(z + wz / 2)) - 0.01, 0, BY(H * M.binom(n, 0.5, j) * sd / 2.6), 0, 0.2); }
      bell.set(Array.from({ length: 201 }, (_, i) => { const z = -4 + 8 * i / 200; return V(BX(Z(z)), BY(H * M.phi(z) / 2.6), 0.26); })); bell.mesh.visible = true;
      [-3, -2, -1, 0, 1, 2, 3].forEach((z, i) => tk[i] = [Z(z), z === 0 ? 'μ' : `${z > 0 ? '+' : '−'}${Math.abs(z) === 1 ? '' : Math.abs(z)}σ`]);
      st.title = is('normal') ? `B(${n} ; 0,5) centrée réduite` : `P(μ − ${s.ks}σ ≤ X ≤ μ + ${s.ks}σ) ≈ ${fr(M.within(s.ks), 4)}`;
      if (is('sigma')) { const K = 60, a = -s.ks; for (let i = 0; i < K; i++) { const z0 = a + 2 * s.ks * i / K, z1 = a + 2 * s.ks * (i + 1) / K; setBox(shade[i], BX(Z(z0)), BX(Z(z1)), 0, BY(H * M.phi((z0 + z1) / 2) / 2.6), 0, 0.22); } }
    }
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
