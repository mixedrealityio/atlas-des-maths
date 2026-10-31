// Développements limités : polynômes de Taylor en 0 de exp, cos et sin. Fonctions pures.
const fact = n => n <= 1 ? 1 : n * fact(n - 1);
export const FN = {
  exp: { f: Math.exp, coef: k => 1 / fact(k), name: 'exp' },
  cos: { f: Math.cos, coef: k => k % 2 ? 0 : (-1) ** (k / 2) / fact(k), name: 'cos' },
  sin: { f: Math.sin, coef: k => k % 2 ? (-1) ** ((k - 1) / 2) / fact(k) : 0, name: 'sin' },
};
export const taylor = (key, n) => x => { let s = 0, p = 1; for (let k = 0; k <= n; k++) { s += FN[key].coef(k) * p; p *= x; } return s; };
// l'ordre qui augmente : exp 0 → 6, cos 0 → 8 (pairs), sin 1 → 7 (impairs)
const step = (clock, list, T = 2.2) => list[Math.floor(((clock % (T * list.length)) + T * list.length) % (T * list.length) / T)];
export const ORDERS = { exp: [0, 1, 2, 3, 4, 5, 6], cos: [0, 2, 4, 6, 8], sin: [1, 3, 5, 7] };
export const nOf = (key, clock) => step(clock, ORDERS[key]);
// sin x / x quand x tend vers 0
export const xOf = clock => 0.02 + 1.6 * (0.5 + 0.5 * Math.cos(2 * Math.PI * clock / 10));
export const fmtPoly = (key, n) => {
  const terms = [];
  for (let k = 0; k <= n; k++) {
    const c = FN[key].coef(k); if (!c) continue;
    const den = Math.round(Math.abs(1 / c)), sg = c < 0 ? '−' : '+';
    const mon = k === 0 ? '1' : `${k === 1 ? 'x' : 'x' + '⁰¹²³⁴⁵⁶⁷⁸'[k]}${den > 1 ? '/' + den : ''}`;
    terms.push(terms.length ? `${sg} ${mon}` : (c < 0 ? '−' : '') + mon);
  }
  return terms.join(' ');
};
