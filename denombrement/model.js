// Dénombrement (计数原理, 选择性必修第三册 chapitre 6) : chemins, permutations, combinaisons,
// triangle de Yang Hui (杨辉三角) et formule du binôme. Fonctions pures.
export const fact = n => n <= 1 ? 1 : n * fact(n - 1);
export const C = (n, k) => k < 0 || k > n ? 0 : Math.round(fact(n) / (fact(k) * fact(n - k)));
export const A = (n, k) => Math.round(fact(n) / fact(n - k));
// toutes les parties à k éléments de {0, …, n − 1}, dans l'ordre lexicographique
export function combos(n, k) { const out = [], cur = []; (function rec(s) { if (cur.length === k) { out.push(cur.slice()); return; } for (let i = s; i < n; i++) { cur.push(i); rec(i + 1); cur.pop(); } })(0); return out; }
// toutes les permutations de {0, …, n − 1}, dans l'ordre lexicographique
export function perms(n) { const out = []; (function rec(a, rest) { if (!rest.length) { out.push(a); return; } rest.forEach((x, i) => rec([...a, x], rest.filter((_, j) => j !== i))); })([], [...Array(n).keys()]); return out; }

// chemins les plus courts sur une grille 4 × 3 : 7 pas dont 3 vers le haut
export const GW = 4, GH = 3;
export const PATHS = combos(GW + GH, GH).map(up => { const s = new Set(up); return [...Array(GW + GH).keys()].map(i => s.has(i) ? 'H' : 'D'); });
export const PERMS = perms(4);
export const COMB = combos(5, 2);
const step = (clock, n, T) => Math.floor(((clock / T) % n + n) % n);
export const pathIdx = clock => step(clock, PATHS.length, 0.9);
export const permIdx = clock => step(clock, PERMS.length, 1.2);
export const permFrac = clock => { const u = (clock / 1.2) % 1; return Math.min(1, u / 0.45); };
export const combIdx = clock => step(clock, COMB.length, 1.3);
// Yang Hui : la case (n ; k) mise en lumière parcourt les lignes 2 à 7
export const CELLS = [...Array(6).keys()].flatMap(i => { const n = i + 2; return [...Array(n - 1).keys()].map(j => [n, j + 1]); });
export const cellIdx = clock => step(clock, CELLS.length, 1.1);
// le cube (a + b)³ avec a = 2, b = 1, qui s'ouvre et se referme
export const CA = 2, CB = 1;
export const sepOf = clock => { const u = 0.5 - 0.5 * Math.cos(2 * Math.PI * clock / 8); return Math.min(1, Math.max(0, (u - 0.15) / 0.6)); };
