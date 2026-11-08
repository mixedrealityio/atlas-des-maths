// Les transformations du plan (图形的变换) : symétrie axiale (轴对称, 初二), rotation et symétrie centrale
// (旋转, 中心对称, 初三), homothétie (位似, 初三) et composée de deux symétries. Fonctions pures.
export const deg = t => t * 180 / Math.PI;
export const rad = d => d * Math.PI / 180;
const osc = (clock, T, ph = 0) => Math.sin(2 * Math.PI * clock / T + ph);

// la figure F : un petit drapeau, volontairement sans symétrie (on voit s'il est retourné)
export const F = [[0.6, 0.3], [0.9, 0.3], [0.9, 1.3], [1.8, 1.6], [0.9, 1.9], [0.9, 2.1], [0.6, 2.1]];
export const A = F[3], B = F[0];

// une transformation linéaire du plan = une matrice [a, b, c, d] : (x ; y) ↦ (a x + b y ; c x + d y)
export const apply = ([a, b, c, d], [x, y]) => [a * x + b * y, c * x + d * y];
export const refl = phi => [Math.cos(2 * phi), Math.sin(2 * phi), Math.sin(2 * phi), -Math.cos(2 * phi)];  // symétrie d'axe la droite d'angle φ passant par O
export const rot = th => [Math.cos(th), -Math.sin(th), Math.sin(th), Math.cos(th)];
export const homo = k => [k, 0, 0, k];
export const mul = ([a, b, c, d], [e, f, g, h]) => [a * e + b * g, a * f + b * h, c * e + d * g, c * f + d * h];
export const det = ([a, b, c, d]) => a * d - b * c;

export const norm = p => Math.hypot(p[0], p[1]);
export const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
export const distLine = (p, phi) => Math.abs(-Math.sin(phi) * p[0] + Math.cos(phi) * p[1]);   // distance de p à la droite d'angle φ par O
export const area = poly => Math.abs(poly.reduce((s, p, i) => { const q = poly[(i + 1) % poly.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
// angle orienté de p vers q, ramené dans ]−180° ; 180°]
export const angle = (p, q) => { let a = Math.atan2(q[1], q[0]) - Math.atan2(p[1], p[0]); while (a <= -Math.PI) a += 2 * Math.PI; while (a > Math.PI) a -= 2 * Math.PI; return a; };

// page 0 : l'axe d tourne entre 100° et 150° (il ne coupe jamais le drapeau)
export const phiOf = clock => rad(125 + 25 * osc(clock, 14));
// page 1 : le demi-tour s'accomplit, puis reste à 180° (cycle de 10 s)
export const halfOf = clock => { const t = ((clock % 10) + 10) % 10 / 6; return Math.PI * (t >= 1 ? 1 : (1 - Math.cos(Math.PI * t)) / 2); };
// page 2 : rotation de centre O, d'angle θ entre 30° et 150°
export const thetaOf = clock => rad(90 + 60 * osc(clock, 14));
// page 3 : homothétie de centre O, de rapport k entre −1,5 et 2
export const kOf = clock => 0.25 + 1.75 * osc(clock, 16);
// page 4 : deux axes d₁ (fixe, à 100°) et d₂ (à 100° + α), α entre 20° et 60°
export const PHI1 = rad(100);
export const alphaOf = clock => rad(40 + 20 * osc(clock, 14));
