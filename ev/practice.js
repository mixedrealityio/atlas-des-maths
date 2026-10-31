export const PRACTICE = {
  0: [{ q: 'Lequel de ces ensembles est un sous-espace vectoriel de ℝ² ?', choices: ['la droite y = 2x + 1', 'la droite y = 2x', 'le cercle x² + y² = 1', 'le demi-plan y ≥ 0'], answer: 1,
    why: '<p>Seule y = 2x passe par 0 et est stable par combinaisons linéaires. y = 2x + 1 ne contient pas 0 ; le demi-plan n’est pas stable par multiplication par −1.</p>' }],
  1: [{ q: 'u = (1 ; 0 ; 1) et v = (0 ; 1 ; 1). Le vecteur (2 ; 3 ; 5) appartient-il à Vect(u, v) ?', choices: ['Oui : 2u + 3v', 'Oui : 3u + 2v', 'Non'], answer: 0,
    why: '<p>2u + 3v = (2 ; 3 ; 2 + 3) = (2 ; 3 ; 5).</p>' }],
  2: [{ q: 'La famille ((1 ; 2), (2 ; 4)) de ℝ² est', choices: ['libre', 'liée', 'une base de ℝ²'], answer: 1,
    why: '<p>(2 ; 4) = 2 × (1 ; 2) : les deux vecteurs sont colinéaires, la famille est liée et n’engendre qu’une droite.</p>' }],
  3: [{ q: 'Dans ℝ³, une famille de 4 vecteurs est', choices: ['toujours libre', 'toujours liée', 'toujours une base', 'libre ou liée selon les vecteurs'], answer: 1,
    why: '<p>En dimension 3, une famille libre a au plus 3 vecteurs. Avec 4, l’un est forcément combinaison des autres.</p>' }],
  4: [{ q: 'Dans ℝ³, deux plans vectoriels distincts peuvent-ils être supplémentaires ?', choices: ['Oui, toujours', 'Non, jamais', 'Seulement s’ils sont perpendiculaires'], answer: 1,
    why: '<p>2 + 2 = 4 &gt; 3 : leurs dimensions ne s’ajoutent pas à 3, et deux plans de ℝ³ se coupent toujours selon au moins une droite.</p>' }],
};
