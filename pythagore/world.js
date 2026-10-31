// La figure : quatre petites scènes posées sur une même table de papier quadrillé, l'une après
// l'autre le long de x. Unités : 1 = un carreau. Chaque nombre vient de model.js.
import * as THREE from 'three';
import { part, box, lines, shadeMat, V } from '../engine/parts.js';
import { slab, slabGeo, rod, rodTo, gridOn, W3 } from '../engine/kit.js';
import * as M from './model.js';

export const ST = { tri: 0, proof: 15, recip: 32, pave: 46, zhao: 60 };
const H = 0.14;                                  // épaisseur des pièces

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let look = {}, clock = 0;
  const ex = g => Math.max(g.userData.explode, 0);
  const shift = (pts, du) => pts.map(([u, v]) => [u + du, v]);

  // la table : un papier quadrillé
  const grid = [];
  for (let x = -7; x <= 66; x++) grid.push(x, 0.001, -10, x, 0.001, 8);
  for (let z = -10; z <= 8; z++) grid.push(-7, 0.001, z, 66, 0.001, z);
  lines(root, grid, '#e4e4e0');

  // =====================================================================================
  // 0–1 · le triangle 3-4-5 et ses trois carrés
  const gT = asm('tri', root, { title: 'Le triangle rectangle', sub: 'côtés 3, 4 et 5' });
  gT.userData.focus = () => ({ target: [1.5, 0, -2], radius: 3.4 });
  slab(gT, [M.O, M.PA, M.PB], { h: H * 1.6, pal: 'dark', name: 'Triangle' });
  // l'équerre de l'angle droit
  slab(gT, [[0.08, 0.08], [0.55, 0.08], [0.55, 0.55], [0.08, 0.55]], { h: 0.02, y: H * 1.6, pal: 'ink', name: 'Angle droit' });
  label('vec', '<i>a</i> = 3', () => W3(M.A / 2, 0.45, H * 2.5));
  label('vec', '<i>b</i> = 4', () => W3(0.5, M.B / 2 - 0.3, H * 2.5));
  label('vec red', '<i>c</i> = 5', () => (look.sq || 0) > 0.5 ? null : W3(M.A / 2 + 0.25, M.B / 2 + 0.2, H * 2.5));

  const gS = asm('squares', root, { title: 'Les trois carrés', sub: '9 + 16 = 25 carreaux' });
  gS.userData.focus = () => ({ target: [1, 0.5, -2], radius: 5.6 });
  const sqs = {};
  for (const [k, pal] of [['a', 'paper'], ['b', 'paper'], ['c', 'red']]) {
    const q = M.SQ[k], [cu, cv] = M.centre(q.pts);
    // vers l'extérieur et un peu vers le haut, quand on le décompose
    const out = k === 'a' ? [0, 0.6, 1.2] : k === 'b' ? [-1.2, 0.6, 0] : [0.85, 0.6, -0.85];
    const g = new THREE.Group(); gS.add(g);
    const s = slab(g, q.pts, { h: H, pal, tone: 'hi', name: `Carré de côté ${k}`, ex: out });
    const [o, p1, , p3] = q.pts;
    const gl = gridOn(s, o, [p1[0] - o[0], p1[1] - o[1]], [p3[0] - o[0], p3[1] - o[1]], Math.round(q.side), H + 0.004, k === 'c' ? '#b8343a' : '#8a8a8f');
    gl.position.set(0, 0, 0);
    sqs[k] = g;
    const n = Math.round(q.side ** 2);
    label('vec', `${k}² = ${n}`, () => (look.sq || 0) > 0.5 ? W3(cu, cv, H + 0.3).add(V(...out).multiplyScalar(ex(gS))) : null);
  }

  // =====================================================================================
  // 2 · la preuve par découpage
  const X2 = ST.proof;
  const gP = asm('proof', root, { title: 'Quatre triangles qui glissent', sub: 'ce qui reste ne change pas d’aire' });
  gP.userData.focus = () => ({ target: [X2 + M.S / 2, 0, -M.S / 2], radius: 5.2 });
  // le cadre du grand carré
  const fr = 0.18;
  for (const pts of [[[-fr, -fr], [M.S + fr, -fr], [M.S + fr, 0], [-fr, 0]], [[-fr, M.S], [M.S + fr, M.S], [M.S + fr, M.S + fr], [-fr, M.S + fr]],
                     [[-fr, 0], [0, 0], [0, M.S], [-fr, M.S]], [[M.S, 0], [M.S + fr, 0], [M.S + fr, M.S], [M.S, M.S]]])
    slab(root, shift(pts, X2), { h: H * 1.8, pal: 'base', tone: 'mid', name: 'Cadre' });
  // les quatre copies : la même géométrie, déplacée
  const copies = M.COPIES.map((c, k) => {
    const m = part(gP, slabGeo(M.copyPts(k, [0, 0]), H), { pal: 'dark', tone: 'hi', name: 'Triangle' });
    return m;
  });
  // les trous, en rouge pâle : c² dans le premier rangement, a² et b² dans le second
  const holeC = slab(root, shift([[M.A, 0], [M.S, M.A], [M.B, M.S], [0, M.B]], X2), { h: 0.02, pal: 'red', tone: 'lo', opacity: 0.55 });
  const holeA = slab(root, shift([[0, 0], [M.A, 0], [M.A, M.A], [0, M.A]], X2), { h: 0.02, pal: 'red', tone: 'lo', opacity: 0.55 });
  const holeB = slab(root, shift([[M.A, M.A], [M.S, M.A], [M.S, M.S], [M.A, M.S]], X2), { h: 0.02, pal: 'red', tone: 'lo', opacity: 0.55 });
  for (const m of [holeC, holeA, holeB]) m.userData.noEdge = true;
  let tP = 0;
  label('vec red', '<i>c</i>²', () => tP < 0.3 ? W3(X2 + M.S / 2, M.S / 2, 0.4) : null);
  label('vec red', '<i>a</i>²', () => tP > 0.7 ? W3(X2 + M.A / 2, M.A / 2, 0.4) : null);
  label('vec red', '<i>b</i>²', () => tP > 0.7 ? W3(X2 + M.A + M.B / 2, M.A + M.B / 2, 0.4) : null);
  label('mark', '<i>a</i> + <i>b</i> = 7', () => W3(X2 + M.S / 2, -0.9, 0.2));

  // =====================================================================================
  // 3 · la réciproque : l'angle entre 3 et 4 varie
  const X3 = ST.recip;
  const gR = asm('recip', root, { title: 'Un angle qui bouge', sub: 'deux côtés fixes, 3 et 4' });
  gR.userData.focus = () => ({ target: [X3 + 1, 0.3, -2], radius: 3.8 });
  const rA = rod(gR, { r: 0.07, pal: 'ink', name: 'Côté 3' }), rB = rod(gR, { r: 0.07, pal: 'ink', name: 'Côté 4' }), rC = rod(gR, { r: 0.07, pal: 'red', name: 'Troisième côté' });
  const knob = () => part(gR, new THREE.SphereGeometry(0.13, 18, 12), { pal: 'paper', tone: 'hi', name: 'Sommet' });
  const kO = knob(), kA = knob(), kB = knob();
  const square90 = slab(gR, [[0.08, 0.08], [0.6, 0.08], [0.6, 0.6], [0.08, 0.6]], { h: 0.02, pal: 'red', tone: 'hi', name: 'Angle droit' });
  let th = 90, pB = W3(0, 0);
  label('vec', '3', () => W3(X3 + M.A / 2, -0.45, 0.2));
  label('vec', '4', () => { const r = th * Math.PI / 180; return W3(X3 + 2 * Math.cos(r) - 0.45 * Math.sin(r), 2 * Math.sin(r) + 0.45 * Math.cos(r), 0.2); });
  label('vec red', '<i>c</i>', () => pB.clone().add(W3(X3 + M.A, 0, 0)).multiplyScalar(0.5).add(V(0.35, 0.2, -0.1)));
  label('board', '', () => W3(X3 + 0.75, 0.75, 0.25), () => `${Math.round(th)}°`);

  // =====================================================================================
  // 4 · le pavé 3 × 4 × 12, dessiné à l'échelle ½
  const X4 = ST.pave, k = M.BOX_SCALE, L = M.BOX.l * k, Wd = M.BOX.w * k, Ht = M.BOX.h * k;
  const gB = asm('pave', root, { title: 'Le pavé 3 × 4 × 12', sub: 'deux fois Pythagore' });
  gB.userData.focus = () => ({ target: [X4 + L / 2, Ht / 2, -Wd / 2], radius: 3.6 });
  const shell = part(gB, box(L, Ht, Wd, 0.01), { pal: 'paper', tone: 'lo', name: 'Pavé', mat: shadeMat('paper', { opacity: 0.28 }) });
  shell.position.set(X4 + L / 2, Ht / 2, -Wd / 2); shell.userData.home = shell.position.clone();
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(L, Ht, Wd)), new THREE.LineBasicMaterial({ color: '#6c6c72' }));
  edges.userData.noEdge = true; edges.position.copy(shell.position); root.add(edges);
  const P0 = W3(X4, 0), P1 = W3(X4 + L, Wd), P2 = W3(X4 + L, Wd, Ht);
  const dFloor = rod(gB, { r: 0.05, pal: 'ink', name: 'Diagonale du fond' }); rodTo(dFloor, P0, P1);
  const dUp = rod(gB, { r: 0.05, pal: 'ink', name: 'Arête' }); rodTo(dUp, P1, P2);
  const dSpace = rod(gB, { r: 0.06, pal: 'red', name: 'Grande diagonale' });
  const bead = part(gB, new THREE.SphereGeometry(0.13, 18, 12), { pal: 'red', tone: 'hi', name: 'Grande diagonale' });
  let cl = 0;
  label('mark', '3', () => W3(X4 + L / 2, -0.35, 0));
  label('mark', '4', () => W3(X4 + L + 0.35, Wd / 2, 0));
  label('vec', '5', () => W3(X4 + L / 2 - 0.3, Wd / 2 + 0.25, 0.1));
  label('mark', '12', () => W3(X4 + L + 0.45, Wd, Ht / 2));
  label('vec red', '13', () => W3(X4 + L / 2 - 0.5, Wd / 2, Ht / 2 + 0.3));

  // =====================================================================================
  // 5 · le diagramme de Zhao Shuang : quatre triangles autour d'un petit carré
  const X5 = ST.zhao;
  const gZ = asm('zhao', root, { title: 'Le diagramme de Zhao Shuang', sub: '赵爽弦图' });
  gZ.userData.focus = () => ({ target: [X5, 0, 0], radius: 3.8 });
  const zt = M.ZHAO.map((tri, k) => {
    const m = part(gZ, slabGeo(tri, H), { pal: k % 2 ? 'dark' : 'base', tone: 'hi', name: 'Triangle rectangle (aire 6)' });
    const c = [(tri[0][0] + tri[1][0] + tri[2][0]) / 3, (tri[0][1] + tri[1][1] + tri[2][1]) / 3];
    return { m, out: [c[0] * 0.9, c[1] * 0.9] };
  });
  slab(gZ, [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]].map(([u, v]) => [X5 + u, v]), { h: 0.04, pal: 'red', tone: 'hi', name: 'Petit carré (b − a)²' });
  const zo = [[0.5, -3.5], [3.5, 0.5], [-0.5, 3.5], [-3.5, -0.5]];
  lines(root, zo.flatMap((p, i) => [X5 + p[0], 0.02, -p[1], X5 + zo[(i + 1) % 4][0], 0.02, -zo[(i + 1) % 4][1]]), '#8a8a8f');
  label('vec', '勾 3', () => W3(X5 + 0.05, -2.2, H * 2));
  label('vec', '股 4', () => W3(X5 - 1.5, -0.95, H * 2));
  label('vec red', '弦 5', () => W3(X5 - 1.9, -2.5, H * 2));

  function update(s, lk) {
    look = lk; clock = s.clock;
    // les carrés montent de la table quand la page les montre
    const q = lk.sq || 0;
    gS.visible = q > 0.02;
    gS.scale.y = Math.max(q, 0.02);
    // la preuve
    tP = s.proof;
    copies.forEach((m, j) => {
      const [u, v] = M.lerp2(M.COPIES[j].p1, M.COPIES[j].p2, tP);
      m.position.set(X2 + u, 0.004 + 0.25 * Math.sin(Math.PI * tP), -v); m.userData.home = m.position.clone();
    });
    holeC.material.uniforms.uOpacity.value = 0.55 * (1 - M.smooth(tP * 3));
    holeA.material.uniforms.uOpacity.value = holeB.material.uniforms.uOpacity.value = 0.55 * M.smooth(tP * 3 - 2);
    // la réciproque
    th = s.theta;
    const r = th * Math.PI / 180, o = W3(X3, 0, 0.1), a = W3(X3 + M.A, 0, 0.1);
    pB = W3(X3 + M.B * Math.cos(r), M.B * Math.sin(r), 0.1);
    rodTo(rA, o, a); rodTo(rB, o, pB); rodTo(rC, a, pB);
    kO.position.copy(o); kA.position.copy(a); kB.position.copy(pB);
    square90.position.set(X3, 0.06, 0); square90.rotation.y = r - Math.PI / 2;
    square90.visible = Math.abs(th - 90) < 2;
    // la diagonale du pavé se trace
    cl = s.climb;
    const end = P0.clone().lerp(P2, cl);
    rodTo(dSpace, P0, end); bead.position.copy(end);
    // Zhao Shuang : les triangles arrivent du dehors
    const zk = 1 - s.zhao;
    zt.forEach(({ m, out }) => { m.position.set(X5 + out[0] * zk * 1.6, 0.25 * Math.sin(Math.PI * s.zhao), -out[1] * zk * 1.6); m.userData.home = m.position.clone(); });
  }
  return { update, labels };
}
