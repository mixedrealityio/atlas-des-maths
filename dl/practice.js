export const PRACTICE = {
  0: [{ q: 'Le DL à l’ordre 1 en 0 de ln(1 + x) est', choices: ['1 + x + o(x)', 'x + o(x)', '1 − x + o(x)', 'x² + o(x)'], answer: 1,
    why: '<p>ln(1 + 0) = 0 et la dérivée 1/(1 + x) vaut 1 en 0 : ln(1 + x) = 0 + 1·x + o(x).</p>' }],
  1: [{ q: 'Le coefficient de x³ dans le DL de eˣ en 0 est', choices: ['1/3', '1/6', '1/2', '3'], answer: 1,
    why: '<p>C’est f‴(0)/3! = 1/6.</p>' }],
  2: [{ q: 'Le DL à l’ordre 2 en 0 de cos x est', choices: ['1 − x² + o(x²)', '1 − x²/2 + o(x²)', 'x − x²/2 + o(x²)', '1 + x²/2 + o(x²)'], answer: 1,
    why: '<p>cos 0 = 1, cos′(0) = −sin 0 = 0, cos″(0) = −cos 0 = −1, donc le terme d’ordre 2 est −x²/2.</p>' }],
  3: [{ q: 'La limite en 0 de (1 − cos x) / x² vaut', choices: ['0', '1', '1/2', '+∞'], answer: 2,
    why: '<p>1 − cos x = x²/2 + o(x²), donc (1 − cos x)/x² = 1/2 + o(1) → 1/2.</p>' }],
};
