// Trigonométrie : le point M qui tourne sur le cercle unité, ses projections et les courbes sinus et cosinus.
export const TURN_T = 14;                                   // secondes par tour
export const theta = clock => (2 * Math.PI * clock / TURN_T) % (2 * Math.PI);
export const deg = t => t * 180 / Math.PI;
export const REMARQ = [
  { t: 0, n: '0', c: '1', s: '0' },
  { t: Math.PI / 6, n: 'π/6', c: '√3/2', s: '1/2' },
  { t: Math.PI / 4, n: 'π/4', c: '√2/2', s: '√2/2' },
  { t: Math.PI / 3, n: 'π/3', c: '1/2', s: '√3/2' },
  { t: Math.PI / 2, n: 'π/2', c: '0', s: '1' },
];
// les images de M par symétrie : −x, π − x, π + x
export const SYM = [{ k: 'neg', f: t => -t, n: '−<i>x</i>' }, { k: 'sup', f: t => Math.PI - t, n: 'π − <i>x</i>' }, { k: 'opp', f: t => Math.PI + t, n: 'π + <i>x</i>' }];
// un angle en radians en écriture « k π / 12 » la plus simple possible, pour l'affichage
export function piStr(t) {
  const k = Math.round(t / (Math.PI / 12));
  if (Math.abs(t - k * Math.PI / 12) > 0.02) return null;
  const g = (a, b) => b ? g(b, a % b) : a, d = g(k, 12) || 12, num = k / d, den = 12 / d;
  if (num === 0) return '0';
  return `${num === 1 ? '' : num}π${den === 1 ? '' : '/' + den}`;
}
