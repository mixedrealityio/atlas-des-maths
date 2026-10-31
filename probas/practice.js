export const PRACTICE = {
  0: [{ q: 'Sur une planche de Galton à 4 rangées (probabilité 1/2 à chaque clou), quelle est la probabilité qu’une bille finisse dans la case 2 ?', choices: ['1/4', '3/8', '1/2', '6/4'], answer: 1,
    why: '<p>C(4, 2) = 6 chemins sur 2⁴ = 16 : 6/16 = 3/8.</p>' }],
  1: [{ q: 'On lance 5 fois un dé équilibré. La probabilité d’obtenir exactement deux 6 est', choices: ['C(5, 2)(1/6)²(5/6)³', '(1/6)²', '2/6', 'C(5, 2)(1/6)²'], answer: 0,
    why: '<p>X ∼ B(5 ; 1/6) : P(X = 2) = C(5, 2)(1/6)²(5/6)³ ≈ 0,161.</p>' }],
  2: [{ q: 'X ∼ B(100 ; 0,3). Son espérance et sa variance valent', choices: ['30 et 21', '30 et 9', '0,3 et 0,21', '70 et 21'], answer: 0,
    why: '<p>E = np = 30, V = np(1 − p) = 100 × 0,3 × 0,7 = 21.</p>' }],
  3: [{ q: 'X ∼ N(μ ; σ²). La courbe de sa densité est symétrique par rapport à', choices: ['l’axe des ordonnées', 'la droite x = μ', 'la droite x = σ', 'l’origine'], answer: 1,
    why: '<p>La cloche est centrée sur la moyenne μ.</p>' }],
  4: [{ q: 'Les notes d’un examen suivent N(70 ; 10²). Environ quelle proportion d’élèves a plus de 90 ?', choices: ['2,3 %', '5 %', '16 %', '0,15 %'], answer: 0,
    why: '<p>90 = μ + 2σ. 95,45 % sont entre 50 et 90 ; il reste 4,55 %, partagés en deux queues égales : environ 2,3 % au-dessus de 90.</p>' }],
};
