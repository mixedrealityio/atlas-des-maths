// L'intégrale : l'aire sous f(x) = x²/2 − 2x + 3 sur [0 ; 4], les sommes de rectangles et la primitive F.
export const f = x => x * x / 2 - 2 * x + 3;
export const F = x => x ** 3 / 6 - x * x + 3 * x;           // F' = f, F(0) = 0
export const A = 0, B = 4;
export const EXACT = F(B) - F(A);                              // 20/3
// somme des rectangles à gauche, à n rectangles
export const leftSum = (n, a = A, b = B) => { const h = (b - a) / n; let s = 0; for (let i = 0; i < n; i++) s += f(a + i * h) * h; return s; };
// le nombre de rectangles double : 2, 4, 8, … 64
export const STEPS = [2, 4, 8, 16, 32, 64];
export const nOf = clock => STEPS[Math.floor(((clock % 15) + 15) % 15 / 2.5) % STEPS.length];
// la borne qui avance de 0 à 4
export const xOf = clock => 0.05 + 3.95 * (0.5 - 0.5 * Math.cos(2 * Math.PI * clock / 12));
export const CA = 1, CB = 3;                                    // le calcul de la dernière page
