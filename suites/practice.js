export const PRACTICE = {
  0: [{ q: '(u<sub>n</sub>) est arithmétique, u₃ = 11 et u₇ = 23. Sa raison est', choices: ['3', '4', '12', '2'], answer: 0,
    why: '<p>De u₃ à u₇ il y a 4 pas : 4r = 23 − 11 = 12, donc r = 3.</p>' }],
  1: [{ q: 'Un capital de 1 000 € placé à 4 % par an vaut, au bout de n ans,', choices: ['1 000 + 40n', '1 000 × 1,04ⁿ', '1 000 × 0,04ⁿ', '1 000 × 4ⁿ'], answer: 1,
    why: '<p>Chaque année on multiplie par 1 + 4/100 = 1,04 : suite géométrique de raison 1,04. 1 000 + 40n serait un placement à intérêts simples.</p>' }],
  2: [{ q: 'La suite u<sub>n</sub> = 3 + 1/n (n ≥ 1) converge vers', choices: ['0', '1', '3', '4'], answer: 2,
    why: '<p>1/n tend vers 0 quand n devient grand, donc u<sub>n</sub> tend vers 3.</p>' }],
  3: [{ q: 'u₀ = 1 et u<sub>n+1</sub> = ½ u<sub>n</sub> + 3. Si la suite converge, sa limite ℓ vaut', choices: ['3', '6', '2', '1'], answer: 1,
    why: '<p>ℓ = ½ ℓ + 3, donc ½ ℓ = 3, donc ℓ = 6.</p>' }],
};
