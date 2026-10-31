// Probabilités (随机变量及其分布, 选择性必修第三册 chapitre 7) : planche de Galton, loi binomiale,
// espérance et variance, loi normale et règle des 3σ. Fonctions pures.
import { C } from '../denombrement/model.js';
export { C };
export const binom = (n, p, k) => C(n, k) * p ** k * (1 - p) ** (n - k);
export const phi = x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
// fonction de répartition de la loi normale centrée réduite (approximation d'Abramowitz et Stegun, erreur < 1e-7)
export function Phi(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x)), d = phi(x);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x >= 0 ? 1 - p : p;
}
export const within = k => Phi(k) - Phi(-k);                       // P(μ − kσ ≤ X ≤ μ + kσ)

// ---------- la planche de Galton : 8 rangées de clous, 120 billes par cycle ----------
export const ROWS = 8, NB = 120, GAP = 0.2, FALL = 2.6, CYCLE = NB * GAP + 4;
// un générateur pseudo-aléatoire déterministe : la même suite de rebonds à chaque visite
const hash = i => { let h = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return h >>> 0; };
export const choices = i => [...Array(ROWS)].map((_, r) => (hash(i * 31 + r) & 1));   // 1 = à droite
export const BALLS = [...Array(NB).keys()].map(i => { const c = choices(i), bin = c.reduce((a, b) => a + b, 0); return { c, bin }; });
// rang d'arrivée de chaque bille dans sa case
{ const seen = Array(ROWS + 1).fill(0); for (const b of BALLS) b.slot = seen[b.bin]++; }
export const FINAL = BALLS.reduce((acc, b) => (acc[b.bin]++, acc), Array(ROWS + 1).fill(0));

// ---------- les pages suivantes ----------
const osc = (clock, T, ph = 0) => Math.sin(2 * Math.PI * clock / T + ph);
export const pOf = clock => 0.5 + 0.3 * osc(clock, 12);
export const NS = [4, 8, 16, 32, 64];
export const nOf = clock => NS[Math.floor(((clock % 12.5) + 12.5) % 12.5 / 2.5) % NS.length];
export const kSig = clock => 1 + Math.floor(((clock % 9) + 9) % 9 / 3);         // 1σ, 2σ, 3σ
