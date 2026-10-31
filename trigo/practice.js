export const PRACTICE = {
  0: [{ q: 'Combien vaut 135° en radians ?', choices: ['3π/4', '2π/3', '5π/6', '3π/2'], answer: 0,
    why: '<p>135 × π/180 = 135π/180 = 3π/4.</p>' }],
  1: [{ q: 'On sait que cos x = 0,6 et que sin x &gt; 0. Que vaut sin x ?', choices: ['0,4', '0,8', '0,64', '√0,4'], answer: 1,
    why: '<p>sin² x = 1 − cos² x = 1 − 0,36 = 0,64, donc sin x = ±0,8. Comme sin x &gt; 0, sin x = 0,8.</p>' }],
  2: [{ q: 'Quelle est la période de la fonction x ↦ sin(2x) ?', choices: ['2π', 'π', '4π', 'π/2'], answer: 1,
    why: '<p>sin(2(x + π)) = sin(2x + 2π) = sin(2x). La courbe se répète deux fois plus vite : période π.</p>' }],
  3: [{ q: 'cos(π/3) + sin(π/6) vaut', choices: ['1', '√3', '1/2', '√3/2'], answer: 0,
    why: '<p>cos(π/3) = 1/2 et sin(π/6) = 1/2 : la somme vaut 1.</p>' }],
  4: [{ q: 'cos(5π/6) vaut', choices: ['√3/2', '−√3/2', '1/2', '−1/2'], answer: 1,
    why: '<p>5π/6 = π − π/6 : symétrique de π/6 par rapport à l’axe vertical. Le cosinus change de signe : cos(5π/6) = −cos(π/6) = −√3/2.</p>' }],
};
