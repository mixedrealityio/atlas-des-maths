// Le produit scalaire (平面向量的数量积, programme chinois de seconde, 必修第二册 ch. 6) :
// projection, cosinus, coordonnées, lignes de niveau et formule d'Al-Kashi (余弦定理). Fonctions pures.
export const deg = t => t * 180 / Math.PI;
const osc = (clock, T, ph = 0) => Math.sin(2 * Math.PI * clock / T + ph);
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
export const norm = a => Math.hypot(a[0], a[1]);

// pages 0 et 1 : u fixe sur l'axe, v de longueur 3 qui tourne d'un angle θ ∈ [0,15 ; π − 0,15]
export const U = [4, 0], LV = 3;
export const thetaOf = clock => Math.PI / 2 + (Math.PI / 2 - 0.15) * osc(clock, 14);
export const vOf = th => [LV * Math.cos(th), LV * Math.sin(th)];
export const projLen = th => LV * Math.cos(th);              // OH, mesure algébrique sur la direction de u

// page 2 : en coordonnées, u = (3 ; 1) et v qui se promène
export const UC = [3, 1];
export const vcOf = clock => [-0.5 + 2.4 * Math.cos(2 * Math.PI * clock / 16), 1 + 2 * Math.sin(2 * Math.PI * clock / 16)];

// page 3 : lignes de niveau, A = O, B = (4 ; 0), M sur la droite x = 2
export const AB = [4, 0], XM = 2;
export const mOf = clock => [XM, 1.2 + 2.2 * osc(clock, 10)];
export const LEVELS = [1, 2, 3];                              // les droites x = k : AB · AM = 4k

// page 4 : Al-Kashi, A = O, B = (c ; 0), C = b (cos α ; sin α)
export const B_ = 3, C_ = 4.5;
export const alphaOf = clock => Math.PI / 2 + 0.95 * osc(clock, 14);
export const tri = al => ({ A: [0, 0], B: [C_, 0], C: [B_ * Math.cos(al), B_ * Math.sin(al)] });
export const kashi = al => Math.sqrt(B_ * B_ + C_ * C_ - 2 * B_ * C_ * Math.cos(al));
export const triDist = al => { const { B, C } = tri(al); return Math.hypot(B[0] - C[0], B[1] - C[1]); };
