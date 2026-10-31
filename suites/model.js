// Suites : arithmétique, géométrique, une suite qui converge, et une suite récurrente u(n+1) = f(u(n)).
export const N = 10;                                   // on dessine u0 … u10
export const ARI = { u0: 1, r: 0.5 };
export const GEO = { u0: 0.5, q: 1.3 };
export const LIM = { L: 2, a: 1.5, q: -0.75, eps: 0.3 };
export const ari = n => ARI.u0 + n * ARI.r;
export const geo = n => GEO.u0 * GEO.q ** n;
export const lim = n => LIM.L + LIM.a * LIM.q ** n;
// le rang à partir duquel tous les termes restent dans la bande ]L − ε ; L + ε[
export const RANK = (() => { let n = 0; while (LIM.a * Math.abs(LIM.q) ** n >= LIM.eps) n++; return n; })();
export const SUM_ARI = (N + 1) * (ari(0) + ari(N)) / 2;
export const SUM_GEO = GEO.u0 * (1 - GEO.q ** (N + 1)) / (1 - GEO.q);

// la suite récurrente : u(n+1) = √(u(n) + 2), u0 = 0,2, converge vers 2 (solution de x = √(x + 2))
export const f = x => Math.sqrt(x + 2);
export const U0 = 0.2;
export const rec = n => { let u = U0; for (let k = 0; k < n; k++) u = f(u); return u; };

// combien de termes sont dessinés : ils apparaissent un par un, puis tout recommence
export const shown = (clock, T = 13) => Math.min(N, Math.floor(((clock % T) + T) % T / T / 0.8 * (N + 1)));
