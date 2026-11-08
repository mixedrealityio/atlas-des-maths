export const PRACTICE = {
  0: [{ q: 'Par la symétrie d’axe l’axe des abscisses, le point A(3 ; −2) a pour image', choices: ['(−3 ; −2)', '(3 ; 2)', '(−3 ; 2)', '(−2 ; 3)'], answer: 1,
    why: '<p>L’axe des abscisses est la médiatrice de [AA′] : on garde x et on change le signe de y, donc A′(3 ; 2).</p>' }],
  1: [{ q: 'O est le centre de symétrie. A(2 ; 5) a pour image A′(−2 ; −5). Quelle phrase est vraie ?', choices: ['O est le milieu de [AA′]', 'AA′ = OA', 'la figure est retournée', 'A′ est sur l’axe des ordonnées'], answer: 0,
    why: '<p>Le milieu de [AA′] est ((2 − 2)/2 ; (5 − 5)/2) = (0 ; 0) = O. La symétrie centrale est un demi-tour : la figure n’est pas retournée, et AA′ = 2 OA.</p>' }],
  2: [{ q: 'La rotation de centre O et d’angle 90° (sens inverse des aiguilles d’une montre) envoie A(4 ; 1) sur', choices: ['(1 ; 4)', '(−1 ; 4)', '(1 ; −4)', '(−4 ; −1)'], answer: 1,
    why: '<p>Pour 90°, (x ; y) ↦ (−y ; x) : A′(−1 ; 4). Vérification : OA′ = √17 = OA, et 4 × (−1) + 1 × 4 = 0, donc OA et OA′ sont perpendiculaires.</p>' }],
  3: [{ q: 'Un triangle d’aire 6 cm² subit une homothétie de rapport −3. L’aire de son image vaut', choices: ['18 cm²', '−18 cm²', '54 cm²', '2 cm²'], answer: 2,
    why: '<p>Les aires sont multipliées par k² = (−3)² = 9 : 6 × 9 = 54 cm². Le signe de k ne change que le côté du centre où se trouve l’image.</p>' }],
  4: [{ q: 'Deux droites d₁ et d₂ se coupent en O et font un angle de 35°. La symétrie d’axe d₁ suivie de celle d’axe d₂ est', choices: ['la symétrie centrale de centre O', 'la rotation de centre O d’angle 35°', 'la rotation de centre O d’angle 70°', 'une translation'], answer: 2,
    why: '<p>La composée de deux symétries d’axes sécants en O est la rotation de centre O d’angle double de l’angle entre les axes : 2 × 35° = 70°.</p>' }],
};
