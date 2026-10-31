export const PRACTICE = {
  0: [{ q: '∫₀² 3 dx vaut', choices: ['3', '6', '2', '9'], answer: 1,
    why: '<p>Le domaine est un rectangle de largeur 2 et de hauteur 3 : aire 6.</p>' }],
  1: [{ q: 'Pour f croissante sur [a ; b], la somme des rectangles « à gauche » est', choices: ['plus grande que l’intégrale', 'plus petite que l’intégrale', 'égale à l’intégrale'], answer: 1,
    why: '<p>À gauche de chaque bande, f prend sa plus petite valeur sur la bande : chaque rectangle est sous la courbe, la somme sous-estime l’aire.</p>' }],
  2: [{ q: 'Une primitive de f(x) = 3x² + 2x est', choices: ['6x + 2', 'x³ + x²', 'x³ + 2x²', '3x³ + 2x²'], answer: 1,
    why: '<p>(x³ + x²)′ = 3x² + 2x. On vérifie toujours une primitive en la dérivant.</p>' }],
  3: [{ q: '∫₀¹ x² dx vaut', choices: ['1', '1/2', '1/3', '2'], answer: 2,
    why: '<p>F(x) = x³/3 est une primitive de x². F(1) − F(0) = 1/3 − 0 = 1/3.</p>' }],
};
