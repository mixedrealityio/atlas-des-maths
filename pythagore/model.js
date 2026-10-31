// Pythagore : le triangle 3-4-5, ses trois carrés, la preuve par découpage, la réciproque et la
// diagonale d'un pavé. Fonctions pures ; chaque nombre affiché vient d'ici.

export const A = 3, B = 4;                       // les côtés de l'angle droit
export const C = Math.hypot(A, B);               // l'hypoténuse : 5
export const S = A + B;                          // côté du grand carré de la preuve : 7
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
export const smooth = x => { const u = clamp(x, 0, 1); return u * u * (3 - 2 * u); };

// le triangle dans le plan de la table : angle droit en O
export const O = [0, 0], PA = [A, 0], PB = [0, B];
// les trois carrés, construits vers l'extérieur
export const SQ = {
  a: { pts: [[0, 0], [0, -A], [A, -A], [A, 0]], side: A },
  b: { pts: [[0, 0], [0, B], [-B, B], [-B, 0]], side: B },
  c: { pts: [PA, [A + B, A], [B, A + B], PB], side: C },     // PA + (B, A), PB + (B, A)
};
// centre de chaque carré, pour son étiquette
export const centre = pts => [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];

// ---------- la preuve : quatre copies du triangle dans un carré de côté a + b ----------
// chaque copie : rotation (en quarts de tour) de l'angle droit, et sa position dans les deux rangements
export const COPIES = [
  { rot: 0, p1: [0, 0], p2: [0, A] },
  { rot: 1, p1: [S, 0], p2: [S, 0] },
  { rot: 2, p1: [S, S], p2: [A, S] },
  { rot: 3, p1: [0, S], p2: [A, A] },
];
// les sommets d'une copie : angle droit en p, jambe a le long de R(e_u), jambe b le long de R(e_v)
export function copyPts(k, at) {
  const { rot } = COPIES[k], c = [1, 0, -1, 0][rot], s = [0, 1, 0, -1][rot];
  const R = ([u, v]) => [c * u - s * v, s * u + c * v];
  return [[0, 0], [A, 0], [0, B]].map(q => { const [u, v] = R(q); return [at[0] + u, at[1] + v]; });
}
// t de 0 (rangement 1 : il reste c²) à 1 (rangement 2 : il reste a² et b²), aller-retour
export const PROOF_T = 9;
export function proofT(clock) {
  const ph = ((clock % PROOF_T) + PROOF_T) % PROOF_T / PROOF_T;   // 0..1
  return smooth((ph < 0.5 ? ph : 1 - ph) * 4 - 0.5);                // pauses aux deux bouts
}
export const lerp2 = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
export const area = pts => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;

// ---------- la réciproque : deux côtés 3 et 4, l'angle entre eux varie ----------
export const RECIP_T = 12;
export const theta = clock => 90 + 32 * Math.sin(2 * Math.PI * clock / RECIP_T);   // degrés, de 58° à 122°
export const thirdSq = th => A * A + B * B - 2 * A * B * Math.cos(th * Math.PI / 180);   // Al-Kashi
export const thirdSide = th => Math.sqrt(thirdSq(th));

// ---------- dans l'espace : un pavé 3 × 4 × 12 ----------
export const BOX = { l: 3, w: 4, h: 12 };
export const BOX_FLOOR = Math.hypot(BOX.l, BOX.w);            // 5
export const BOX_DIAG = Math.hypot(BOX_FLOOR, BOX.h);         // 13
export const BOX_SCALE = 0.5;                                  // le pavé est dessiné à moitié
// le point qui monte le long de la diagonale, pour le compteur
export const climb = clock => smooth(((clock / 8) % 1) * 1.25);

// ---------- le diagramme de Zhao Shuang (赵爽弦图, IIIe siècle) ----------
// quatre triangles 3-4-5 autour d'un petit carré de côté b − a = 1 ; triangle 0 : angle droit en (0,5 ; −0,5)
export const ZHAO = (() => { const R0 = [0.5, -0.5], A0 = [0.5, -3.5], B0 = [-3.5, -0.5];
  const rot = ([x, y], k) => { for (let i = 0; i < k; i++) [x, y] = [-y, x]; return [x, y]; };
  return [0, 1, 2, 3].map(k => [R0, A0, B0].map(p => rot(p, k))); })();
export const zhaoT = clock => { const ph = ((clock % 9) + 9) % 9 / 9; return smooth((ph < 0.5 ? ph : 1 - ph) * 4 - 0.6); };
