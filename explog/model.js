// Exponentielle et logarithme (指数函数与对数函数, seconde en Chine). Fonctions pures.
const osc = (clock, T, ph = 0) => Math.sin(2 * Math.PI * clock / T + ph);
export const log = (a, x) => Math.log(x) / Math.log(a);
// page 0 : x qui avance, 2^x contre 2x + 1
export const xOf = clock => 0.5 + 2.6 * (0.5 - 0.5 * Math.cos(2 * Math.PI * clock / 12));
// page 1 : la base a parcourt 0,3 … 3 (en évitant 1 de justesse)
export const aOf = clock => { const u = osc(clock, 14); const a = Math.exp(1.1 * u); return Math.abs(a - 1) < 0.04 ? 1.04 : a; };
// page 2 : un point (x ; 2^x) et son symétrique (2^x ; x)
export const tOf = clock => 1.2 * osc(clock, 10);
// page 3 : la règle à calcul, a = 2 … 5
export const sOf = clock => 2 + 1.5 * (1 + osc(clock, 12));
export const B_RULE = 1.8;
// page 4 : les pentes en 0 de 2^x, e^x, 3^x
export const BASES = [2, Math.E, 3];
export const slope0 = a => Math.log(a);
// la suite (1 + 1/n)^n → e
export const eSeq = n => (1 + 1 / n) ** n;
