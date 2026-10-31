export const PRACTICE = {
  0: [{ q: 'Dans le cube d’arête 2 (origine D), quelles sont les coordonnées du milieu de [A₁C₁] ?', choices: ['(1 ; 1 ; 2)', '(1 ; 1 ; 1)', '(2 ; 1 ; 1)', '(1 ; 2 ; 2)'], answer: 0,
    why: '<p>A₁(2 ; 0 ; 2) et C₁(0 ; 2 ; 2) : le milieu est ((2+0)/2 ; (0+2)/2 ; (2+2)/2) = (1 ; 1 ; 2), le centre de la face du haut.</p>' }],
  1: [{ q: 'Un vecteur normal au plan d’équation 2x − y + 3z = 5 est', choices: ['(2 ; −1 ; 3)', '(2 ; 1 ; 3)', '(5 ; 0 ; 0)', '(−1 ; 3 ; 5)'], answer: 0,
    why: '<p>Les coefficients de x, y, z dans l’équation ax + by + cz = d forment un vecteur normal (a ; b ; c).</p>' }],
  2: [{ q: 'La distance de l’origine au plan x + 2y + 2z = 6 vaut', choices: ['6', '2', '3', '6/5'], answer: 1,
    why: '<p>d = |0 + 0 + 0 − 6| / √(1 + 4 + 4) = 6/3 = 2.</p>' }],
  3: [{ q: 'Deux plans ont pour normales (1 ; 0 ; 0) et (1 ; 1 ; 0). L’angle entre eux vaut', choices: ['30°', '45°', '60°', '90°'], answer: 1,
    why: '<p>cos θ = 1 / (1 × √2) = √2/2, donc θ = 45°.</p>' }],
  4: [{ q: 'Un plan peut-il couper un cube selon un pentagone ?', choices: ['Non, jamais', 'Oui', 'Seulement s’il passe par un sommet'], answer: 1,
    why: '<p>Oui : un plan qui coupe cinq des six faces donne un pentagone. Les sections possibles ont 3, 4, 5 ou 6 côtés (jamais 7, le cube n’a que 6 faces). Les plans perpendiculaires à la diagonale ne donnent que des triangles et des hexagones.</p>' }],
};
