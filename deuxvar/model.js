// Fonctions de deux variables (多元函数微分学 : début du cours d'analyse des universités chinoises, 高等数学 ;
// en France, MP/PC et fin de MPSI). Fonctions pures.
export const L = 2.5;                                            // le domaine [−L ; L]²
const S2 = 2.2;
export const f = (x, y) => 1.8 * Math.exp(-(x * x + y * y) / S2) + 0.3 * x;
export const fx = (x, y) => -2 * x / S2 * 1.8 * Math.exp(-(x * x + y * y) / S2) + 0.3;
export const fy = (x, y) => -2 * y / S2 * 1.8 * Math.exp(-(x * x + y * y) / S2);
// le col : z = (x² − y²)/3
export const g = (x, y) => (x * x - y * y) / 3;
export const gx = x => 2 * x / 3, gy = (x, y) => -2 * y / 3;
// le sommet de f : fy = 0 ⇒ y = 0 ; fx(x, 0) = 0 se résout par dichotomie
export const PEAK = (() => { let a = 0, b = 1.5; for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (fx(m, 0) > 0) a = m; else b = m; } return [(a + b) / 2, 0]; })();
const osc = (clock, T, ph = 0) => Math.sin(2 * Math.PI * clock / T + ph);
// un point qui se promène sur le domaine
export const ptOf = clock => [1.6 * osc(clock, 13), 1.4 * osc(clock, 9, 1)];
export const LEVELS = [0.25, 0.6, 0.95, 1.3, 1.65, 1.9];
// segments des lignes de niveau (carrés en marche) sur une grille n × n
export function contours(fn, level, n = 50) {
  const segs = [], h = 2 * L / n, P = (i, j) => [-L + i * h, -L + j * h];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const c = [P(i, j), P(i + 1, j), P(i + 1, j + 1), P(i, j + 1)], v = c.map(([x, y]) => fn(x, y) - level), pts = [];
    for (let e = 0; e < 4; e++) { const a = v[e], b = v[(e + 1) % 4]; if ((a < 0) !== (b < 0)) { const t = a / (a - b), p = c[e], q = c[(e + 1) % 4]; pts.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]); } }
    if (pts.length === 2) segs.push(pts); else if (pts.length === 4) segs.push([pts[0], pts[1]], [pts[2], pts[3]]);
  }
  return segs;
}
