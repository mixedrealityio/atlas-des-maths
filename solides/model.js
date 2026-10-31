// Les solides : volumes du pavé, du cylindre, de la pyramide, de la boule, et le patron du cube. Fonctions pures.
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
export const smooth = x => { const u = clamp(x, 0, 1); return u * u * (3 - 2 * u); };
const phase = (clock, T) => ((clock % T) + T) % T / T;

// pavé 4 × 3 × 2 rempli cube par cube
export const PAVE = { L: 4, l: 3, h: 2 };
export const PAVE_V = PAVE.L * PAVE.l * PAVE.h;                     // 24
export const filled = clock => Math.min(PAVE_V, Math.floor(phase(clock, 14) / 0.8 * (PAVE_V + 1)));

// cylindre de rayon 1,5 qui monte
export const CYL = { r: 1.5 };
export const cylH = clock => 0.3 + 2.7 * smooth(phase(clock, 10) / 0.7);
export const cylV = h => Math.PI * CYL.r ** 2 * h;
// prisme droit à base triangulaire (base 3, hauteur de triangle 2), même hauteur que le cylindre
export const PRISM = { b: 3, hb: 2 };
export const prismV = h => PRISM.b * PRISM.hb / 2 * h;

// le cube de côté 3 coupé en trois pyramides identiques de sommet commun
export const PYR = { a: 3 };
export const pyrV = PYR.a ** 3 / 3;                                   // 9
export const pyrSep = clock => smooth(Math.sin(Math.PI * phase(clock, 9)) * 1.6 - 0.3);

// Archimède : cône, boule et cylindre de même rayon r et de hauteur 2r
export const ARCH = { r: 1.2 };
export const archV = { cone: 2 / 3 * Math.PI * ARCH.r ** 3, ball: 4 / 3 * Math.PI * ARCH.r ** 3, cyl: 2 * Math.PI * ARCH.r ** 3 };

// le patron du cube qui se replie : angle de 0° (à plat) à 90° (fermé)
export const fold = clock => 90 * smooth(Math.sin(Math.PI * phase(clock, 10)) * 1.5 - 0.25);
