// La dérivée : une seule fonction, ses pentes, ses sécantes et sa dérivée. Fonctions pures.
// f(x) = x³/3 − 2x² + 3x + 1, donc f'(x) = x² − 4x + 3 = (x − 1)(x − 3).

export const f = x => x ** 3 / 3 - 2 * x ** 2 + 3 * x + 1;
export const df = x => x * x - 4 * x + 3;
export const X0 = -0.5, X1 = 4.5;                 // le domaine dessiné
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
const smooth = x => { const u = clamp(x, 0, 1); return u * u * (3 - 2 * u); };

// le taux d'accroissement entre a et a + h
export const rate = (a, h) => (f(a + h) - f(a)) / h;

// ---------- le point qui se promène sur la courbe ----------
export const WALK_T = 16;
export const walk = clock => 2 + 2.3 * Math.sin(2 * Math.PI * clock / WALK_T);

// ---------- la sécante en a = 0,5 : h rétrécit de 2,5 à presque 0, puis recommence ----------
export const A = 0.5;
export const SEC_T = 11;
export function hOf(clock) {
  const ph = ((clock % SEC_T) + SEC_T) % SEC_T / SEC_T;      // 0..1
  return 0.02 + 2.48 * (1 - smooth(ph / 0.75));             // tient à 0,02 sur la fin
}
// la tangente en a : y = f'(a)(x − a) + f(a)
export const tangentAt = a => ({ m: df(a), p: f(a) - df(a) * a });

// ---------- variations ----------
export const EXTREMA = [{ x: 1, kind: 'max' }, { x: 3, kind: 'min' }].map(e => ({ ...e, y: f(e.x) }));
