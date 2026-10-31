export const PRACTICE = {
  0: [{ q: 'Le module et un argument de z = 1 + i sont', choices: ['2 et π/4', '√2 et π/4', '√2 et π/2', '1 et π/4'], answer: 1,
    why: '<p>|z| = √(1 + 1) = √2. Le point (1 ; 1) est sur la diagonale du premier quart : arg z = π/4. Donc 1 + i = √2 e<sup>iπ/4</sup>.</p>' }],
  1: [{ q: '(1 + i)⁸ vaut', choices: ['16', '8i', '−16', '256'], answer: 0,
    why: '<p>(√2 e<sup>iπ/4</sup>)⁸ = (√2)⁸ e<sup>2iπ</sup> = 16 × 1 = 16. Développer à la main serait bien plus long.</p>' }],
  2: [{ q: 'i²⁰²⁶ vaut', choices: ['1', 'i', '−1', '−i'], answer: 2,
    why: '<p>Les puissances de i se répètent de 4 en 4. 2026 = 4 × 506 + 2, donc i²⁰²⁶ = i² = −1.</p>' }],
  3: [{ q: 'Combien de solutions complexes a l’équation z⁶ = 1, et combien sont réelles ?', choices: ['6, dont 2 réelles', '6, dont 1 réelle', '2, toutes réelles', '3, dont 1 réelle'], answer: 0,
    why: '<p>Six racines e<sup>2ikπ/6</sup>, k = 0…5, sommets d’un hexagone régulier. Deux sont sur l’axe réel : 1 (k = 0) et −1 (k = 3).</p>' }],
  4: [{ q: 'Quel est le centre de la similitude z ↦ 2z − 3 ?', choices: ['−3', '3', '3/2', '1'], answer: 1,
    why: '<p>ω = 2ω − 3 donne ω = 3. C’est l’homothétie de centre 3 et de rapport 2 (a = 2 est réel, pas de rotation).</p>' }],
};
