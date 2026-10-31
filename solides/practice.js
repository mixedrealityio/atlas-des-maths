export const PRACTICE = {
  0: [{ q: 'Combien de litres contient un aquarium de 50 cm × 30 cm × 40 cm ?', choices: ['6 L', '60 L', '600 L', '6 000 L'], answer: 1,
    why: '<p>V = 50 × 30 × 40 = 60 000 cm³. Comme 1 L = 1 000 cm³, cela fait 60 L.</p>' }],
  1: [{ q: 'Un cylindre a un rayon de 2 cm et une hauteur de 5 cm. Son volume est', choices: ['20π cm³', '10π cm³', '40π cm³', '100π cm³'], answer: 0,
    why: '<p>V = π × 2² × 5 = 20π ≈ 62,8 cm³. 10π oublie de mettre le rayon au carré.</p>' }],
  2: [{ q: 'Un cône a le même rayon et la même hauteur qu’un cylindre de 90 cm³. Son volume est', choices: ['90 cm³', '45 cm³', '30 cm³', '270 cm³'], answer: 2,
    why: '<p>Même base, même hauteur : le cône vaut le tiers du cylindre, 90 ÷ 3 = 30 cm³.</p>' }],
  3: [{ q: 'Si on double le rayon d’une boule, son volume est multiplié par', choices: ['2', '4', '6', '8'], answer: 3,
    why: '<p>V = ⁴⁄₃πr³ : le rayon est au cube, donc doubler r multiplie V par 2³ = 8. C’est un agrandissement de rapport 2.</p>' }],
  4: [{ q: 'Combien de patrons différents le cube possède-t-il ?', choices: ['6', '8', '11', '24'], answer: 2,
    why: '<p>On en compte 11, en considérant comme identiques deux patrons qui se déduisent l’un de l’autre par rotation ou symétrie.</p>' }],
};
