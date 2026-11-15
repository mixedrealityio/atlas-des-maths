// Systèmes linéaires (二元一次方程组, 7e année ; 三元一次方程组 ; 方程术 des Neuf Chapitres).
// Chaque nombre affiché dans le chapitre vient d'ici.
const osc = (clock, T, ph = 0) => Math.sin(2 * Math.PI * clock / T + ph);
const smooth = u => { u = Math.min(Math.max(u, 0), 1); return u * u * (3 - 2 * u); };

// ---------- deux équations, deux inconnues : les poulets et les lapins (孙子算经) ----------
// x poulets, y lapins : 35 têtes, 94 pattes
export const L1 = [1, 1, 35], L2 = [2, 4, 94];               // a x + b y = c
export const det2 = (P, Q) => P[0] * Q[1] - P[1] * Q[0];
export function solve2(P, Q) {
  const d = det2(P, Q);
  if (Math.abs(d) < 1e-12) return null;
  return [(P[2] * Q[1] - P[1] * Q[2]) / d, (P[0] * Q[2] - P[2] * Q[0]) / d];
}
export const SOL2 = solve2(L1, L2);                          // (23 ; 12)
export const feet = x => 2 * x + 4 * (35 - x);               // page 0 : x poulets, 35 − x lapins
// page 0 : on essaie x poulets, de 0 à 35
export const tryOf = clock => 17.5 - 17.5 * Math.cos(2 * Math.PI * clock / 16);

// le cadre du tableau (coordonnées mathématiques)
export const BX = [-4, 48], BY = [-4, 38];
// la partie de la droite a x + b y = c dans le rectangle [x0, x1] × [y0, y1]
export function clipLine([a, b, c], x0 = -2, x1 = 47, y0 = -2, y1 = 34) {
  const pts = [], eps = 1e-9, push = p => { if (!pts.some(q => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-7)) pts.push(p); };
  if (Math.abs(b) > eps) for (const x of [x0, x1]) { const y = (c - a * x) / b; if (y >= y0 - eps && y <= y1 + eps) push([x, y]); }
  if (Math.abs(a) > eps) for (const y of [y0, y1]) { const x = (c - b * y) / a; if (x >= x0 - eps && x <= x1 + eps) push([x, y]); }
  return pts.length >= 2 ? [pts[0], pts[1]] : null;
}

// page 1 : la combinaison α·(1) + β·(2), qui tourne autour de la solution
export const thetaOf = clock => Math.PI * (clock / 14 % 1);
export const comb = t => { const al = Math.cos(t), be = Math.sin(t); return L1.map((v, i) => al * v + be * L2[i]); };
// les deux combinaisons qui éliminent une inconnue
export const ELIM_Y = L1.map((v, i) => 4 * v - L2[i]);      // 2x = 46
export const ELIM_X = L1.map((v, i) => 2 * v - L2[i]);      // −2y = −24

// page 2 : x + y = 35 et 2x + m y = 94, m varie ; déterminant m − 2
export const mOf = clock => 2 + 1.8 * osc(clock, 16);
export const L2m = m => [2, m, 94];

// ---------- trois équations, trois inconnues : trois plans ----------
export const P1 = [1, 1, 1, 6], P2 = [2, -1, 1, 3], P3 = [1, 2, -1, 2];   // a x + b y + c z = d
export const sub = (p, q) => p.map((c, i) => c - q[i]);
export const add = (p, q) => p.map((c, i) => c + q[i]);
export const scale = (k, p) => p.map(c => k * c);
export const dot = (p, q) => p.reduce((s, c, i) => s + c * q[i], 0);
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norm = p => Math.hypot(...p);
export const det3 = (A, B, C) => dot(A.slice(0, 3), cross(B.slice(0, 3), C.slice(0, 3)));
export function solve3(A, B, C) {
  const d = det3(A, B, C);
  if (Math.abs(d) < 1e-12) return null;
  const col = k => [A, B, C].map(r => { const q = r.slice(0, 3); q[k] = r[3]; return q; });
  return [0, 1, 2].map(k => { const [a, b, c] = col(k); return det3([...a, 0], [...b, 0], [...c, 0]) / d; });
}
export const SOL3 = solve3(P1, P2, P3);                     // (1 ; 2 ; 3)
// la droite commune à deux plans : un point et une direction
export function meet(A, B) {
  const u = cross(A.slice(0, 3), B.slice(0, 3)), uu = dot(u, u);
  if (uu < 1e-12) return null;
  const nA = A.slice(0, 3), nB = B.slice(0, 3);
  const p = scale(1 / uu, add(scale(A[3], cross(nB, u)), scale(B[3], cross(u, nA))));
  return { p, u };
}

// le pivot de Gauss, étape par étape
export const G2 = sub(P2, scale(2, P1));                    // −3y − z = −9
export const G3 = sub(P3, P1);                              //   y − 2z = −4
export const G3b = add(scale(3, G3), G2);                   //      −7z = −21
// page 4 : le temps des trois étapes (4 s chacune, pause, puis retour)
export function gaussOf(clock) {
  const t = clock % 30, f = t < 15 ? t : 30 - t;            // aller puis retour
  return [smooth((f - 1) / 3), smooth((f - 5) / 3), smooth((f - 9) / 3)];
}
export const lerp = (p, q, u) => p.map((c, i) => c + (q[i] - c) * u);
export function gaussPlanes([u1, u2, u3]) {
  const b = lerp(P2, G2, u1), c1 = lerp(P3, G3, u2), c = lerp(c1, G3b, u3);
  return [P1, b, c];
}

// page 5 : le troisième plan 3x + 2z = k, parallèle à la droite commune aux deux premiers
export const kOf = clock => 9 + 4 * osc(clock, 16);
export const Q3 = k => [3, 0, 2, k];
export const SUM12 = add(P1, P2);                           // 3x + 2z = 9

// ---------- un plan dans la boîte [0 ; 4]³ : le polygone de coupe ----------
export const LO = 0, HI = 4;
const CORN = [0, 1, 2, 3, 4, 5, 6, 7].map(i => [i & 1 ? HI : LO, i & 2 ? HI : LO, i & 4 ? HI : LO]);
const EDGES = []; for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = i ^ j; if (d === 1 || d === 2 || d === 4) EDGES.push([i, j]); }
export const BOX_EDGES = EDGES.map(([i, j]) => [CORN[i], CORN[j]]);
export function clipPlane(P) {
  const n = P.slice(0, 3), d = P[3], pts = [];
  for (const [i, j] of EDGES) {
    const p = CORN[i], q = CORN[j], sp = dot(n, p) - d, sq = dot(n, q) - d;
    if (sp * sq > 0 || Math.abs(sp - sq) < 1e-12) continue;
    const x = add(p, scale(sp / (sp - sq), sub(q, p)));
    if (!pts.some(y => norm(sub(x, y)) < 1e-7)) pts.push(x);
  }
  if (pts.length < 3) return [];
  const c = scale(1 / pts.length, pts.reduce(add, [0, 0, 0])), nn = scale(1 / norm(n), n);
  const e1 = (() => { const u = sub(pts[0], c); return scale(1 / norm(u), u); })(), e2 = cross(nn, e1);
  return pts.map(p => ({ p, a: Math.atan2(dot(sub(p, c), e2), dot(sub(p, c), e1)) })).sort((u, v) => u.a - v.a).map(o => o.p);
}
// la partie d'une droite (point p, direction u) dans la boîte
export function clipSeg({ p, u }) {
  let t0 = -1e9, t1 = 1e9;
  for (let k = 0; k < 3; k++) {
    if (Math.abs(u[k]) < 1e-12) { if (p[k] < LO || p[k] > HI) return null; continue; }
    let a = (LO - p[k]) / u[k], b = (HI - p[k]) / u[k]; if (a > b) [a, b] = [b, a];
    t0 = Math.max(t0, a); t1 = Math.min(t1, b);
  }
  return t1 > t0 ? [add(p, scale(t0, u)), add(p, scale(t1, u))] : null;
}
