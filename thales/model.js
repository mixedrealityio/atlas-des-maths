// Thalès : un triangle ABC, une parallèle à (BC) qui glisse, le papillon et la réciproque. Fonctions pures.
export const A = [0, 6], B = [-2, 0], C = [6, 0];
const d = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
export const AB = d(A, B), AC = d(A, C), BC = d(B, C);
export const at = (P, k) => [A[0] + k * (P[0] - A[0]), A[1] + k * (P[1] - A[1])];   // A + k·(P − A)
export const dist = d;
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
const smooth = x => { const u = clamp(x, 0, 1); return u * u * (3 - 2 * u); };
const wave = (clock, T) => 0.5 - 0.5 * Math.cos(2 * Math.PI * clock / T);

// la parallèle glisse : k de 0,25 à 0,95 (M sur [AB]), et de −0,3 à −0,85 pour le papillon
export const kSlide = clock => 0.25 + 0.7 * wave(clock, 12);
export const kButterfly = clock => -0.3 - 0.55 * wave(clock, 12);
// la réciproque : N reste à AN/AC = 0,6, M bouge ; parallèle seulement quand AM/AB = 0,6
export const K_N = 0.6;
export const kM = clock => 0.6 + 0.3 * Math.sin(2 * Math.PI * clock / 10);
export const isPar = (kA, kB) => Math.abs(kA - kB) < 0.01;
export { smooth };
