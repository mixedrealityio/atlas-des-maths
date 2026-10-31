export const PRACTICE = {
  0: [{ q: 'Dans un cercle de rayon 5 cm, une corde est à 3 cm du centre. Elle mesure', choices: ['4 cm', '8 cm', '6 cm', '√34 cm'], answer: 1,
    why: '<p>Demi-corde² = 5² − 3² = 16, donc demi-corde = 4 et corde = 8 cm.</p>' }],
  1: [{ q: 'A, B, C sont sur un cercle de centre O et l’angle AOB vaut 100°. L’angle ACB (C sur le grand arc) vaut', choices: ['100°', '50°', '200°', '80°'], answer: 1,
    why: '<p>Angle inscrit = moitié de l’angle au centre qui intercepte le même arc : 100° / 2 = 50°.</p>' }],
  2: [{ q: 'Un triangle ABC est inscrit dans un cercle et [AB] en est un diamètre. AC = 6 et BC = 8. Le rayon vaut', choices: ['5', '7', '10', '14'], answer: 0,
    why: '<p>L’angle en C est droit, donc AB² = 36 + 64 = 100, AB = 10, et le rayon est 5.</p>' }],
  3: [{ q: 'P est à 13 cm du centre d’un cercle de rayon 5 cm. La longueur d’une tangente issue de P est', choices: ['8 cm', '12 cm', '18 cm', '√194 cm'], answer: 1,
    why: '<p>PT² = 13² − 5² = 144, donc PT = 12 cm (triangle 5-12-13).</p>' }],
  4: [{ q: 'L’aire d’un secteur de 60° dans un disque de rayon 6 est', choices: ['6π', '12π', '3π', '36π'], answer: 0,
    why: '<p>60° est un sixième du tour : π × 36 / 6 = 6π.</p>' }],
  5: [{ q: 'Le périmètre de l’hexagone régulier inscrit dans un cercle de rayon 1 vaut', choices: ['6', '2π', '3', '6√3'], answer: 0,
    why: '<p>L’hexagone est formé de six triangles équilatéraux de côté 1 : son périmètre vaut 6, et 6/2 = 3 est la première approximation de π.</p>' }],
};
