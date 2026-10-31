// Les coniques (圆锥曲线, 高二 en Chine) : section d'un cône, ellipse, hyperbole, parabole, excentricité.
const osc = (clock, T, ph = 0) => Math.sin(2 * Math.PI * clock / T + ph);
export const deg = t => t * 180 / Math.PI;

// ---------- le cône : demi-angle 30°, axe vertical ; le plan passe par (0 ; H0 ; 0) et penche de β ----------
export const ALPHA = Math.PI / 6, K = Math.tan(ALPHA), H0 = 0.9, YMAX = 2.6;
export const CRIT = Math.PI / 2 - ALPHA;                          // 60° : le plan est parallèle à une génératrice
export const betaOf = clock => (0.5 - 0.5 * Math.cos(2 * Math.PI * clock / 16)) * 80 * Math.PI / 180;
export const kind = beta => Math.abs(beta - CRIT) < 0.02 ? 'parabole' : beta < CRIT ? (beta < 0.01 ? 'cercle' : 'ellipse') : 'hyperbole';
// points de la section : pour chaque direction φ autour de l'axe, sur chacune des deux nappes
export function section(beta, n = 720) {
  const out = [], tb = Math.tan(beta);
  for (let i = 0; i < n; i++) {
    const phi = 2 * Math.PI * i / n, s = Math.sin(phi), c = Math.cos(phi);
    for (const sign of [1, -1]) {
      const den = 1 - sign * K * s * tb, y = H0 / den;
      if (!isFinite(y) || Math.sign(y) !== sign || Math.abs(y) > YMAX) continue;
      const r = Math.abs(y) * K;
      out.push([r * c, y, r * s]);                                 // (x, hauteur, z)
    }
  }
  return out;
}

// ---------- ellipse : a = 3, c = 2 ----------
export const EL = { a: 3, c: 2 }; EL.b = Math.sqrt(EL.a ** 2 - EL.c ** 2);
export const elAt = t => [EL.a * Math.cos(t), EL.b * Math.sin(t)];
// ---------- hyperbole : a = 1,5, c = 2,5 ----------
export const HY = { a: 1.5, c: 2.5 }; HY.b = Math.sqrt(HY.c ** 2 - HY.a ** 2);
export const hyAt = (u, side = 1) => [side * HY.a * Math.cosh(u), HY.b * Math.sinh(u)];
// ---------- parabole : y² = 2px, foyer (p/2 ; 0), directrice x = −p/2 ----------
export const PA = { p: 2 };
export const paAt = y => [y * y / (2 * PA.p), y];
export const dist = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
export const tOf = clock => 2 * Math.PI * clock / 14;
export const uOf = clock => 1.6 * osc(clock, 10);
export const yOf = clock => 3.2 * osc(clock, 10);
// ---------- excentricité : r = p / (1 + e cos θ), même foyer, même p ----------
export const EP = 1.6;
export const eOf = clock => 0.8 * (1 - Math.cos(2 * Math.PI * clock / 14));   // de 0 à 1,6
export const polar = (e, th) => EP / (1 + e * Math.cos(th));
export const eKind = e => e < 0.02 ? 'cercle' : Math.abs(e - 1) < 0.02 ? 'parabole' : e < 1 ? 'ellipse' : 'hyperbole';
