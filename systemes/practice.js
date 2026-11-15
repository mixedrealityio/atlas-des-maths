export const PRACTICE = {
  0: [{ q: 'Dans une cage, 20 têtes et 56 pattes de poulets et de lapins. Combien de lapins ?', choices: ['6', '8', '12', '14'], answer: 1,
    why: '<p>x + y = 20 et 2x + 4y = 56. En retirant 2 × (1) : 2y = 56 − 40 = 16, donc y = 8 lapins et x = 12 poulets (24 + 32 = 56).</p>' }],
  1: [{ q: 'Pour résoudre 3x + 2y = 12 et x − 2y = 4, la combinaison la plus rapide est', choices: ['(1) + (2), qui élimine y', '(1) − (2), qui élimine x', '(1) − 3·(2), qui élimine y'], answer: 0,
    why: '<p>Les coefficients de y sont 2 et −2 : en ajoutant, 4x = 16, donc x = 4, puis y = 0. (1) − 3·(2) éliminerait x, pas y.</p>' }],
  2: [{ q: 'Pour quelle valeur de m le système x + 2y = 3, mx + 6y = 1 n’a-t-il pas de solution unique ?', choices: ['m = 1', 'm = 2', 'm = 3', 'm = 6'], answer: 2,
    why: '<p>Le déterminant vaut 1 × 6 − m × 2 = 6 − 2m, nul pour m = 3. Alors 3x + 6y = 1 est parallèle à 3x + 6y = 9 : aucune solution.</p>' }],
  3: [{ q: 'Le point (2 ; −1 ; 1) est-il solution de x + y + z = 2, x − y = 3, 2x + z = 5 ?', choices: ['Oui', 'Non, il manque la première équation', 'Non, il manque la troisième'], answer: 0,
    why: '<p>2 − 1 + 1 = 2, 2 + 1 = 3, 4 + 1 = 5 : les trois équations sont vérifiées, le point est sur les trois plans.</p>' }],
  4: [{ q: 'Neuf Chapitres, problème 8.1 : 3 gerbes de bon grain, 2 de moyen et 1 de mauvais donnent 39 dou ; 2, 3, 1 donnent 34 ; 1, 2, 3 donnent 26. Combien donne une gerbe de mauvais grain ?', choices: ['2 dou', '2 dou ¾', '4 dou ¼', '9 dou ¼'], answer: 1,
    why: '<p>Le pivot donne une gerbe de bon grain = 9 ¼, de moyen = 4 ¼, de mauvais = 2 ¾ dou. Vérification : 3 × 9,25 + 2 × 4,25 + 2,75 = 39 ; 2 × 9,25 + 3 × 4,25 + 2,75 = 34 ; 9,25 + 2 × 4,25 + 3 × 2,75 = 26.</p>' }],
  5: [{ q: 'Le système x + y + z = 1, x − y = 0, 2x + z = k a une infinité de solutions pour', choices: ['k = 0', 'k = 1', 'k = 2', 'aucune valeur de k'], answer: 1,
    why: '<p>La troisième équation a pour membre de gauche la somme des deux premières : (x + y + z) + (x − y) = 2x + z. Le système est compatible si k = 1 + 0 = 1, et il a alors une droite de solutions ; sinon aucune.</p>' }],
};
