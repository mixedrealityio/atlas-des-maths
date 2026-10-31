// Espaces vectoriels (dans R³) : droites et plans engendrés, familles libres ou liées, bases, supplémentaires.
export const U = [1.6, 0.3, 0.1], VV = [0.3, 1.5, 0.2], WW = [0.3, 0.4, 1.5];
export const add = (...vs) => vs.reduce((a, b) => a.map((c, i) => c + b[i]), [0, 0, 0]);
export const scale = (k, v) => v.map(c => k * c);
export const det3 = (a, b, c) => a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
// résout x = a u + b v + c w (règle de Cramer)
export const coords = (x, u = U, v = VV, w = WW) => { const d = det3(u, v, w); return [det3(x, v, w) / d, det3(u, x, w) / d, det3(u, v, x) / d]; };

const osc = (clock, T, ph = 0) => Math.sin(2 * Math.PI * clock / T + ph);
// un multiple de u qui va et vient
export const lam = clock => 1.3 * osc(clock, 9);
// une combinaison de u et v qui se promène dans le plan
export const lm = clock => [0.9 * osc(clock, 11), 0.9 * osc(clock, 7, 1)];
// la famille (u, v, w_t) : w_t = 0,6u + 0,5v + t·n, t va de 0 (liée) à 1 (libre)
export const NRM = (() => { const c = cross(U, VV), n = Math.hypot(...c); return c.map(x => x / n * 1.3); })();
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
export const tFree = clock => { const s = 0.5 - 0.5 * Math.cos(2 * Math.PI * clock / 10); return clamp((s - 0.25) / 0.5, 0, 1); };
export const wT = t => add(scale(0.6, U), scale(0.5, VV), scale(t, NRM));
// un vecteur x qui se promène dans l'espace, pour les coordonnées et la décomposition
export const xOf = clock => [1.7 + 0.5 * osc(clock, 13), 1.3 + 0.5 * osc(clock, 9, 2), 0.8 + 0.4 * osc(clock, 11, 4)];
