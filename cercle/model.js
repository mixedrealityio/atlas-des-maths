// Le cercle (圆, programme chinois de 9e année) : corde et perpendiculaire, angle inscrit, demi-cercle,
// tangentes, arc et secteur, et le π de Liu Hui. Fonctions pures ; angles en radians.
export const R = 3;
export const deg = t => t * 180 / Math.PI;
export const on = t => [R * Math.cos(t), R * Math.sin(t)];
const osc = (clock, T, ph = 0) => Math.sin(2 * Math.PI * clock / T + ph);

// une corde à distance d du centre, de direction normale φ
export function chord(phi, d) {
  const n = [Math.cos(phi), Math.sin(phi)], t = [-n[1], n[0]], h = Math.sqrt(R * R - d * d);
  return { M: [d * n[0], d * n[1]], A: [d * n[0] + h * t[0], d * n[1] + h * t[1]], B: [d * n[0] - h * t[0], d * n[1] - h * t[1]], half: h };
}
export const chordOf = clock => ({ phi: 1.1 + 0.5 * osc(clock, 17), d: 1.3 + 1.1 * osc(clock, 9) });

// angle inscrit : A et B fixes en bas, P se promène sur le grand arc
export const TA = 200 * Math.PI / 180, TB = 340 * Math.PI / 180;
export const tP = clock => Math.PI / 2 + 1.15 * osc(clock, 12);
export const angleAt = (P, A, B) => { const u = [A[0] - P[0], A[1] - P[1]], v = [B[0] - P[0], B[1] - P[1]]; return Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)); };
export const CENTRAL = TB - TA;                                   // 140°

// tangentes depuis un point extérieur P à distance D
export const DOf = clock => 4.6 + 0.8 * osc(clock, 10);
export const tangents = (D, ang = 0) => { const a = Math.acos(R / D); return [on(ang + a), on(ang - a)]; };
export const tanLen = D => Math.sqrt(D * D - R * R);

// secteur d'angle θ, de 0 à 2π
export const thetaOf = clock => Math.PI * (1 + 0.95 * osc(clock, 12));
export const arcLen = th => R * th;
export const sectorArea = th => R * R * th / 2;

// Liu Hui (刘徽, IIIe siècle) : polygones réguliers inscrits à 6, 12, 24, 48, 96 côtés
export const NS = [6, 12, 24, 48, 96];
export const nOf = clock => NS[Math.floor(((clock % 12.5) + 12.5) % 12.5 / 2.5) % NS.length];
export const halfPerim = n => n * Math.sin(Math.PI / n);           // demi-périmètre pour un rayon 1 → π
export const polyArea = n => n / 2 * Math.sin(2 * Math.PI / n);    // aire pour un rayon 1 → π
