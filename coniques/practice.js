export const PRACTICE = {
  0: [{ q: 'Un plan coupe une seule nappe du cône selon une courbe fermée. C’est', choices: ['une hyperbole', 'une parabole', 'une ellipse (ou un cercle)', 'deux droites'], answer: 2,
    why: '<p>Seules l’ellipse et le cercle sont des courbes fermées. La parabole s’ouvre à l’infini, l’hyperbole a deux branches.</p>' }],
  1: [{ q: 'L’ellipse x²/25 + y²/9 = 1 a ses foyers en', choices: ['(±3 ; 0)', '(±4 ; 0)', '(±5 ; 0)', '(0 ; ±4)'], answer: 1,
    why: '<p>a² = 25, b² = 9, donc c² = a² − b² = 16 et c = 4. Le grand axe est horizontal (25 &gt; 9).</p>' }],
  2: [{ q: 'Les asymptotes de x²/4 − y²/9 = 1 sont', choices: ['y = ±(2/3)x', 'y = ±(3/2)x', 'y = ±(9/4)x', 'y = ±x'], answer: 1,
    why: '<p>a = 2, b = 3 : asymptotes y = ±(b/a)x = ±(3/2)x.</p>' }],
  3: [{ q: 'Le foyer de la parabole y² = 8x est', choices: ['(8 ; 0)', '(4 ; 0)', '(2 ; 0)', '(0 ; 2)'], answer: 2,
    why: '<p>y² = 2px avec 2p = 8, donc p = 4 et le foyer est en (p/2 ; 0) = (2 ; 0). La directrice est x = −2.</p>' }],
  4: [{ q: 'Une ellipse a pour demi-grand axe a = 5 et pour demi-distance focale c = 3. Son excentricité vaut', choices: ['0,6', '0,8', '1,67', '0,4'], answer: 0,
    why: '<p>Pour une ellipse, e = c/a = 3/5 = 0,6. Elle est toujours comprise entre 0 et 1.</p>' }],
};
