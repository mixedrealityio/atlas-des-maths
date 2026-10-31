export const PRACTICE = {
  0: [{ q: 'Pour f(x, y) = x² + 3y, que vaut f(2, −1) ?', choices: ['1', '7', '−1', '10'], answer: 0,
    why: '<p>f(2, −1) = 4 + 3 × (−1) = 1.</p>' }],
  1: [{ q: 'Les lignes de niveau de f(x, y) = x² + y² sont', choices: ['des droites', 'des cercles centrés à l’origine', 'des paraboles', 'des hyperboles'], answer: 1,
    why: '<p>x² + y² = c est un cercle de rayon √c (pour c &gt; 0).</p>' }],
  2: [{ q: 'Pour f(x, y) = x²y + sin y, ∂f/∂x vaut', choices: ['2xy', 'x² + cos y', '2xy + cos y', '2x'], answer: 0,
    why: '<p>On dérive par rapport à x en traitant y comme une constante : (x²y)′ = 2xy, et sin y ne dépend pas de x.</p>' }],
  3: [{ q: 'Le gradient de f(x, y) = 3x + 4y vaut', choices: ['(3 ; 4)', '(4 ; 3)', '7', '(x ; y)'], answer: 0,
    why: '<p>∂f/∂x = 3 et ∂f/∂y = 4. Sa longueur, 5, est la pente maximale de ce plan incliné.</p>' }],
  4: [{ q: 'f(x, y) = x² + y² − 2x a un point critique en', choices: ['(0 ; 0)', '(1 ; 0)', '(2 ; 0)', '(0 ; 1)'], answer: 1,
    why: '<p>∂f/∂x = 2x − 2 = 0 et ∂f/∂y = 2y = 0 donnent (1 ; 0). C’est un minimum : f = (x − 1)² + y² − 1.</p>' }],
};
