// Le second degré : paraboles, forme canonique, discriminant, signe, optimisation, et l'inégalité
// arithmético-géométrique (基本不等式). Fonctions pures.
const osc = (clock, T, ph = 0) => Math.sin(2 * Math.PI * clock / T + ph);
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);

// page 0 : y = a x², a va et vient entre −2 et 2 (en évitant 0 de justesse)
export const aOf = clock => { const v = 2 * osc(clock, 12); return Math.abs(v) < 0.15 ? 0.15 * Math.sign(v || 1) : v; };
// page 1 : y = (x − h)² + k, le sommet se promène
export const hkOf = clock => [1 + 1.8 * osc(clock, 11), -1 + 2 * osc(clock, 7, 1)];
// page 2 : y = x² − 2x + c, c va de −3 à 3 ; Δ = 4 − 4c
export const cOf = clock => 3 * osc(clock, 12, -Math.PI / 2);
export const delta = (a, b, c) => b * b - 4 * a * c;
export const roots = (a, b, c) => { const d = delta(a, b, c); if (d < -1e-12) return []; if (Math.abs(d) <= 1e-12) return [-b / (2 * a)]; const s = Math.sqrt(d); return [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((p, q) => p - q); };
// page 3 : x² − 2x − 3 = (x + 1)(x − 3), un point qui parcourt l'axe
export const SIGN = { a: 1, b: -2, c: -3 };
export const g = x => x * x - 2 * x - 3;
export const xOf = clock => 1 + 3.6 * osc(clock, 12);
// page 4 : un enclos rectangulaire avec 20 m de grillage : côtés x et 10 − x, aire x(10 − x)
export const P_ENC = 20;
export const area = x => x * (P_ENC / 2 - x);
export const wOf = clock => 5 + 4.2 * osc(clock, 12);
// page 5 : moyenne arithmétique et moyenne géométrique de a et b, avec a + b = 6
export const SUM = 6;
export const amgm = a => ({ a, b: SUM - a, am: SUM / 2, gm: Math.sqrt(a * (SUM - a)) });
export const splitOf = clock => 3 + 2.6 * osc(clock, 12);
export { clamp };
