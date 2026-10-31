// Nombres complexes : le plan, la multiplication (tourner et agrandir), i, les racines de l'unité, les similitudes.
// Un complexe est un tableau [re, im].
export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const mul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
export const div = (a, b) => { const d = b[0] ** 2 + b[1] ** 2; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
export const mod = a => Math.hypot(a[0], a[1]);
export const arg = a => Math.atan2(a[1], a[0]);
export const expi = (t, r = 1) => [r * Math.cos(t), r * Math.sin(t)];
export const I = [0, 1];

// le point z qui se promène
export const zOf = clock => expi(0.35 + 2 * Math.PI * clock / 16, 1.7 + 0.5 * Math.cos(2 * Math.PI * clock / 7));
// w fixe : module 1,25, argument π/4
export const W = expi(Math.PI / 4, 1.25);

// les racines n-ièmes de l'unité, n de 3 à 8
export const nOf = clock => 3 + Math.floor(((clock % 18) + 18) % 18 / 3);
export const roots = n => Array.from({ length: n }, (_, k) => expi(2 * Math.PI * k / n));

// la similitude z ↦ a z + b, avec a = 0,8 e^{iπ/3} et b = 1,2 + 0,5i, et son point fixe
export const SA = expi(Math.PI / 3, 0.8), SB = [1.2, 0.5];
export const fixed = (a, b) => div(b, [1 - a[0], -a[1]]);
// un petit drapeau : la figure qu'on transforme
export const FLAG = [[0, 0], [0, 1.6], [1, 1.3], [0, 1.0]].map(([x, y]) => [x + 1.8, y - 1.6]);
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
const smooth = x => { const u = clamp(x, 0, 1); return u * u * (3 - 2 * u); };
export const morph = clock => { const ph = ((clock % 10) + 10) % 10 / 10; return ph < 0.6 ? smooth((ph - 0.1) / 0.3) : 1 - smooth((ph - 0.75) / 0.2); };
// a(t), b(t) : de l'identité (a = 1, b = 0) vers la similitude
export const simAt = t => ({ a: [1 + t * (SA[0] - 1), t * SA[1]], b: [t * SB[0], t * SB[1]] });
export const fmt = (z, n = 2) => { const f = x => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ','); return `${f(z[0])} ${z[1] < -1e-9 ? '−' : '+'} ${f(Math.abs(z[1]))} i`; };
