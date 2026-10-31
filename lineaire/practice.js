// Exercices, un ou deux par page (clés = numéros de page, comme dans PAGES).
const eq = s => `<div class="eq">${s}</div>`;

export const PRACTICE = {
  0: [
    { q: 'Laquelle de ces applications de ℝ² dans ℝ² est linéaire ?',
      choices: ['(x, y) ↦ (x + 1, y)', '(x, y) ↦ (xy, y)', '(x, y) ↦ (2x − y, 3y)', '(x, y) ↦ (x², y)'], answer: 2,
      why: '<p>Seule la troisième est faite de combinaisons linéaires de x et y sans constante. La première envoie 0 sur (1, 0) : une application linéaire fixe toujours l’origine. Les deux autres contiennent des produits ou des carrés.</p>' },
  ],
  1: [
    { q: 'f est linéaire, f(e₁) = (1 ; 2 ; 0), f(e₂) = (0 ; 1 ; 1), f(e₃) = (3 ; 0 ; 1). Que vaut f(2 ; 1 ; 0) ?',
      choices: ['(2 ; 5 ; 1)', '(2 ; 4 ; 0)', '(5 ; 4 ; 1)', '(2 ; 1 ; 0)'], answer: 0,
      why: `${eq('f(2 ; 1 ; 0) = 2 f(e₁) + 1 f(e₂) = (2 ; 4 ; 0) + (0 ; 1 ; 1) = (2 ; 5 ; 1)')}<p>La troisième colonne n’intervient pas puisque z = 0.</p>` },
  ],
  2: [
    { q: 'det A = 3 et det B = −2 (matrices 3 × 3). Que vaut det(2AB) ?',
      choices: ['−12', '−48', '−6', '12'], answer: 1,
      why: `${eq('det(2AB) = 2³ det A det B = 8 × 3 × (−2) = −48')}<p>Multiplier une matrice 3 × 3 par 2, c’est multiplier ses trois colonnes par 2, donc les volumes par 2³ = 8. L’erreur fréquente est d’oublier le cube.</p>` },
  ],
  3: [
    { q: 'Une application linéaire de ℝ⁴ dans ℝ³ a un noyau de dimension 2. Son rang vaut',
      choices: ['1', '2', '3', '4'], answer: 1,
      why: '<p>Le théorème du rang porte sur l’espace de <b>départ</b> : dim Ker f + rg f = dim ℝ⁴ = 4, donc rg f = 4 − 2 = 2.</p>' },
    { q: 'Une matrice carrée de taille 3 a un noyau réduit à {0}. Alors',
      choices: ['son déterminant est nul', 'elle est inversible', 'son rang vaut 2', 'elle est symétrique'], answer: 1,
      why: '<p>Noyau nul : f est injective, donc rg f = 3 − 0 = 3, donc f est aussi surjective. En dimension finie et entre espaces de même dimension, injective, surjective et bijective sont équivalentes. Et det ≠ 0.</p>' },
  ],
  4: [
    { q: 'A = (2 1 ; 0 3) (matrice 2 × 2). Quelles sont ses valeurs propres ?',
      choices: ['1 et 4', '2 et 3', '0 et 5', '2 et 1'], answer: 1,
      why: '<p>La matrice est triangulaire : ses valeurs propres sont ses coefficients diagonaux. Vérification : leur produit 2 × 3 = 6 = det A, et leur somme 5 = la trace.</p>' },
  ],
};
