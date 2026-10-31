// Applications linéaires de R³ : quatre matrices, et l'identité qui se déforme vers chacune.
// Matrices en lignes : A[i][j] ; la colonne j est l'image du j-ième vecteur de base. Fonctions pures.

export const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
export const MATS = {
  m1: [[1.3, 0.6, 0], [0.2, 1.1, 0], [0, 0.4, 0.9]],      // une déformation générique
  m2: [[2, 0.5, 0], [0, 1, 0.3], [0, 0, 1]],              // déterminant 2
  m3: [[1, 0, 0.5], [0, 1, 0.5], [0, 0, 0]],              // une projection : rang 2, noyau de dimension 1
  m4: [[2, 1, 0], [1, 2, 0], [0, 0, 1]],                  // symétrique : trois directions propres
};
export const apply = (A, v) => A.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
export const col = (A, j) => A.map(r => r[j]);
export const det = A => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
export const mix = (w, t) => {
  // I + t Σ w_k (A_k − I) : on part de l'identité vers la matrice de la page (ou un mélange entre deux pages)
  const out = I.map(r => r.slice());
  for (const [k, wk] of Object.entries(w)) if (MATS[k] && wk) for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) out[i][j] += t * wk * (MATS[k][i][j] - I[i][j]);
  return out;
};
export const lerpMat = (A, t) => mix({ [A]: 1 }, t);

// le noyau de m3 et les directions propres de m4
export const KER3 = [1, 1, -2];
export const EIGEN4 = [{ v: [1, 1, 0], l: 3 }, { v: [1, -1, 0], l: 1 }, { v: [0, 0, 1], l: 1 }];

// ---------- le temps : on reste sur l'identité, on se déforme, on tient, on revient ----------
export const MORPH_T = 11;
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
const smooth = x => { const u = clamp(x, 0, 1); return u * u * (3 - 2 * u); };
export function morph(clock) {
  const ph = ((clock % MORPH_T) + MORPH_T) % MORPH_T / MORPH_T;
  return ph < 0.62 ? smooth((ph - 0.08) / 0.3) : 1 - smooth((ph - 0.78) / 0.18);
}

// les huit sommets du cube unité et ses six faces (quatre sommets chacune, dans l'ordre)
export const CUBE = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
export const FACES = [[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [2, 3, 7, 6], [1, 2, 6, 5], [0, 4, 7, 3]];
export const EDGES = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
