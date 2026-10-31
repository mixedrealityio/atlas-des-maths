// Géométrie dans l'espace par les vecteurs (空间向量与立体几何, 选择性必修第一册 chapitre 1).
// Le cube ABCD-A₁B₁C₁D₁ d'arête 2, repère d'origine D comme dans les manuels chinois :
// x le long de DA, y le long de DC, z le long de DD₁.
export const V3 = {
  A: [2, 0, 0], B: [2, 2, 0], C: [0, 2, 0], D: [0, 0, 0],
  A1: [2, 0, 2], B1: [2, 2, 2], C1: [0, 2, 2], D1: [0, 0, 2],
};
export const sub = (p, q) => p.map((c, i) => c - q[i]);
export const add = (p, q) => p.map((c, i) => c + q[i]);
export const scale = (k, p) => p.map(c => k * c);
export const dot = (p, q) => p.reduce((s, c, i) => s + c * q[i], 0);
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norm = p => Math.hypot(...p);
export const deg = t => t * 180 / Math.PI;
const osc = (clock, T, ph = 0) => Math.sin(2 * Math.PI * clock / T + ph);

// le plan A₁BC₁ et son vecteur normal
export const PL = [V3.A1, V3.B, V3.C1];
export const NRM = cross(sub(V3.B, V3.A1), sub(V3.C1, V3.A1));          // (4 ; 4 ; 4)
// distance de D au plan, et pied H de la perpendiculaire
export const DIST = Math.abs(dot(sub(V3.D, V3.A1), NRM)) / norm(NRM);   // 4/√3
export const H = (() => { const n = scale(1 / norm(NRM), NRM); return add(V3.D, scale(DIST, n)); })();
// angle dièdre entre le plan A₁BC₁ et la base ABCD (normale (0 ; 0 ; 1))
export const DIHEDRAL = Math.acos(Math.abs(dot(NRM, [0, 0, 1])) / norm(NRM));
// angle entre l'arête DD₁ et le plan A₁BC₁
export const LINE_PLANE = Math.asin(Math.abs(dot([0, 0, 2], NRM)) / (2 * norm(NRM)));

// page 0 : un point P qui parcourt la diagonale DB₁ ; page 1 : un vecteur du plan qui tourne
export const tOf = clock => 0.5 - 0.5 * Math.cos(2 * Math.PI * clock / 10);
export const inPlane = clock => { const a = 2 * Math.PI * clock / 9, u = sub(V3.B, V3.A1), v = sub(V3.C1, V3.A1), e1 = scale(1 / norm(u), u), w = sub(v, scale(dot(v, e1), e1)), e2 = scale(1 / norm(w), w); return add(scale(1.3 * Math.cos(a), e1), scale(1.3 * Math.sin(a), e2)); };
// page 4 : la section du cube par le plan x + y + z = k
export const kOf = clock => 3 + 2.85 * osc(clock, 14);
const EDGES = [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A1', 'B1'], ['B1', 'C1'], ['C1', 'D1'], ['D1', 'A1'], ['A', 'A1'], ['B', 'B1'], ['C', 'C1'], ['D', 'D1']];
export { EDGES };
export function section(k) {
  const pts = [];
  for (const [a, b] of EDGES) {
    const p = V3[a], q = V3[b], sp = p[0] + p[1] + p[2], sq = q[0] + q[1] + q[2];
    if ((sp - k) * (sq - k) > 0 || sp === sq) continue;
    const t = (k - sp) / (sq - sp), x = add(p, scale(t, sub(q, p)));
    if (!pts.some(y => norm(sub(x, y)) < 1e-9)) pts.push(x);
  }
  if (pts.length < 3) return pts;
  const c = scale(1 / pts.length, pts.reduce(add, [0, 0, 0])), e1 = (() => { const u = sub(pts[0], c); return scale(1 / norm(u), u); })(), e2 = cross([1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)], e1);
  return pts.map(p => ({ p, a: Math.atan2(dot(sub(p, c), e2), dot(sub(p, c), e1)) })).sort((u, v) => u.a - v.a).map(o => o.p);
}
// aire d'un polygone plan de l'espace
export const area3 = poly => { let s = [0, 0, 0]; for (let i = 1; i + 1 < poly.length; i++) s = add(s, cross(sub(poly[i], poly[0]), sub(poly[i + 1], poly[0]))); return norm(s) / 2; };
