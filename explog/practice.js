export const PRACTICE = {
  0: [{ q: 'Une population de bactéries double toutes les heures. Au bout de 10 heures, elle est multipliée par', choices: ['20', '100', 'environ 1 000', '10 000'], answer: 2,
    why: '<p>2<sup>10</sup> = 1 024, soit environ mille.</p>' }],
  1: [{ q: 'La fonction x ↦ 0,5<sup>x</sup> est', choices: ['croissante', 'décroissante', 'constante', 'négative pour x &lt; 0'], answer: 1,
    why: '<p>La base 0,5 est entre 0 et 1 : la fonction décroît. Elle reste toujours positive.</p>' }],
  2: [{ q: 'log₃ 81 vaut', choices: ['3', '4', '27', '9'], answer: 1,
    why: '<p>3⁴ = 81, donc log₃ 81 = 4.</p>' }],
  3: [{ q: 'lg 2 ≈ 0,301 et lg 3 ≈ 0,477 (lg = log₁₀). Alors lg 12 ≈', choices: ['0,778', '1,079', '1,431', '0,903'], answer: 1,
    why: '<p>12 = 2² × 3, donc lg 12 = 2 lg 2 + lg 3 ≈ 0,602 + 0,477 = 1,079.</p>' }],
  4: [{ q: 'La dérivée de x ↦ e<sup>2x</sup> est', choices: ['e<sup>2x</sup>', '2e<sup>2x</sup>', '2x e<sup>2x−1</sup>', 'e<sup>2</sup>'], answer: 1,
    why: '<p>(e<sup>u</sup>)′ = u′ e<sup>u</sup> avec u = 2x : on obtient 2e<sup>2x</sup>.</p>' }],
};
