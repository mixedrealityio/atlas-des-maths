// Exercices, un ou deux par page (clés = numéros de page, comme dans PAGES).
const eq = s => `<div class="eq">${s}</div>`;

export const PRACTICE = {
  0: [
    { q: 'En un point où la courbe d’une fonction descend, le nombre dérivé est',
      choices: ['positif', 'négatif', 'nul', 'impossible à dire'], answer: 1,
      why: '<p>Quand la courbe descend, la tangente descend aussi : sa pente est négative. Le nombre dérivé est la pente de la tangente.</p>' },
  ],
  1: [
    { q: 'Pour g(x) = x², le taux d’accroissement entre 1 et 3 vaut',
      choices: ['2', '4', '8', '9'], answer: 1,
      why: `${eq('τ = [g(3) − g(1)] / (3 − 1) = (9 − 1) / 2 = 4')}<p>C’est la pente de la sécante qui joint (1 ; 1) et (3 ; 9).</p>` },
  ],
  2: [
    { q: 'Pour g(x) = x², simplifiez le taux d’accroissement en a. Que vaut g′(a) ?',
      choices: ['a', '2a', 'a²', '2a + h'], answer: 1,
      why: `${eq('[(a + h)² − a²] / h = (2ah + h²) / h = 2a + h')}<p>Quand h tend vers 0, 2a + h tend vers 2a : g′(a) = 2a. 2a + h est le taux, pas encore sa limite.</p>` },
    { q: 'f(2) = 5 et f′(2) = 3. L’équation de la tangente en 2 est',
      choices: ['y = 3x + 5', 'y = 5x + 3', 'y = 3x − 1', 'y = 3x + 2'], answer: 2,
      why: `${eq('y = f′(2)(x − 2) + f(2) = 3(x − 2) + 5 = 3x − 1')}<p>Vérification : en x = 2, y = 6 − 1 = 5, la tangente passe bien par (2 ; 5).</p>` },
  ],
  3: [
    { q: 'La dérivée de h(x) = 4x³ − 5x + 7 est',
      choices: ['12x² − 5', '12x² − 5x', '4x² − 5', '12x³ − 5 + 7'], answer: 0,
      why: '<p>Terme à terme : (4x³)′ = 4 × 3x² = 12x², (−5x)′ = −5 et la constante 7 a pour dérivée 0.</p>' },
  ],
  4: [
    { q: 'f′(x) = (x + 2)(x − 4). Sur quel intervalle f est-elle décroissante ?',
      choices: [']−∞ ; −2]', '[−2 ; 4]', '[4 ; +∞[', '[−4 ; 2]'], answer: 1,
      why: '<p>Un produit de deux facteurs du premier degré est négatif entre ses racines −2 et 4 (le coefficient de x² vaut 1 &gt; 0). Là où f′ ≤ 0, f décroît : sur [−2 ; 4].</p>' },
    { q: 'k(x) = x³ a pour dérivée 3x², qui s’annule en 0. En 0, la fonction k',
      choices: ['a un maximum local', 'a un minimum local', 'n’a pas d’extremum', 'n’est pas dérivable'], answer: 2,
      why: '<p>3x² est positive des deux côtés de 0 : f′ s’annule sans changer de signe. x³ continue de croître, la tangente est horizontale mais ce n’est ni un maximum ni un minimum.</p>' },
  ],
};
