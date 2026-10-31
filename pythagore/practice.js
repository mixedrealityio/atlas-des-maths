// Exercices, un ou deux par page (clés = numéros de page, comme dans PAGES).
const eq = s => `<div class="eq">${s}</div>`;

export const PRACTICE = {
  0: [
    { q: 'Le triangle RST est rectangle en S. Quelle est son hypoténuse ?',
      choices: ['[RS]', '[ST]', '[RT]', 'On ne peut pas savoir'], answer: 2,
      why: '<p>L’hypoténuse est le côté opposé à l’angle droit. L’angle droit est en S, donc le côté opposé est celui qui ne passe pas par S : [RT].</p>' },
  ],
  1: [
    { q: 'Un triangle rectangle a des côtés de l’angle droit de 6 cm et 8 cm. Son hypoténuse mesure',
      choices: ['14 cm', '10 cm', '100 cm', '√14 cm'], answer: 1,
      why: `${eq('<i>c</i>² = 6² + 8² = 36 + 64 = 100, donc <i>c</i> = √100 = 10 cm')}<p>C’est le triangle 3-4-5 agrandi deux fois. 14 cm est l’erreur classique qui additionne les côtés au lieu de leurs carrés.</p>` },
    { q: 'Sur les côtés d’un triangle rectangle, on construit des carrés. Les deux petits ont des aires de 20 cm² et 30 cm². L’aire du grand est',
      choices: ['50 cm²', '600 cm²', '10 cm²', '√50 cm²'], answer: 0,
      why: '<p>Le théorème dit exactement que l’aire du carré sur l’hypoténuse est la somme des deux autres : 20 + 30 = 50 cm². Inutile de calculer les côtés.</p>' },
  ],
  2: [
    { q: 'Dans la preuve, le grand carré a pour côté a + b = 7 et chaque triangle a pour aire 6. Que vaut l’aire qui reste ?',
      choices: ['49', '25', '24', '43'], answer: 1,
      why: `${eq('7² − 4 × 6 = 49 − 24 = 25')}<p>C’est bien <i>c</i>² = 5² dans le premier rangement, et <i>a</i>² + <i>b</i>² = 9 + 16 dans le second.</p>` },
  ],
  3: [
    { q: 'Dans le diagramme de Zhao Shuang construit sur un triangle de côtés 5, 12 et 13, le petit carré central a pour aire',
      choices: ['7', '49', '17', '169'], answer: 1,
      why: '<p>Son côté vaut b − a = 12 − 5 = 7, donc son aire est 49. Vérification : 4 × (5 × 12 / 2) + 49 = 120 + 49 = 169 = 13².</p>' },
  ],
  4: [
    { q: 'Une échelle de 5 m est posée contre un mur vertical, son pied à 1,4 m du mur. À quelle hauteur touche-t-elle le mur ?',
      choices: ['3,6 m', '4,8 m', '5,2 m', '6,4 m'], answer: 1,
      why: `<p>L’échelle est l’hypoténuse (en face de l’angle droit entre le sol et le mur). On cherche un côté de l’angle droit, donc on soustrait :</p>${eq('<i>h</i>² = 5² − 1,4² = 25 − 1,96 = 23,04, donc <i>h</i> = 4,8 m')}` },
    { q: 'Un carré a des côtés de 1. Sa diagonale mesure',
      choices: ['2', '1,5', '√2 ≈ 1,41', '√1 = 1'], answer: 2,
      why: `<p>La diagonale coupe le carré en deux triangles rectangles isocèles de côtés 1 et 1 :</p>${eq('<i>d</i>² = 1² + 1² = 2, donc <i>d</i> = √2 ≈ 1,414')}<p>√2 n’est pas un nombre décimal : on garde la valeur exacte √2.</p>` },
  ],
  5: [
    { q: 'Un triangle a des côtés de 7 cm, 24 cm et 25 cm. Est-il rectangle ?',
      choices: ['Oui, en face du côté de 25 cm', 'Oui, en face du côté de 7 cm', 'Non', 'On ne peut pas savoir sans rapporteur'], answer: 0,
      why: `<p>On compare le carré du plus long côté à la somme des deux autres :</p>${eq('25² = 625 et 7² + 24² = 49 + 576 = 625')}<p>Les deux sont égaux : d’après la réciproque, le triangle est rectangle, et l’angle droit est en face du plus long côté.</p>` },
    { q: 'Un triangle a des côtés 4, 5 et 6. Il est',
      choices: ['rectangle', 'non rectangle, avec un angle obtus', 'non rectangle, avec trois angles aigus', 'impossible à construire'], answer: 2,
      why: `${eq('6² = 36 et 4² + 5² = 16 + 25 = 41')}<p>36 ≠ 41, donc il n’est pas rectangle. Comme 36 &lt; 41, le plus long côté est plus court que pour un angle droit : l’angle en face est aigu, comme sur la figure quand l’angle se ferme.</p>` },
  ],
  6: [
    { q: 'Quelle est la grande diagonale d’un cube de côté 1 ?',
      choices: ['√2', '√3', '2', '3'], answer: 1,
      why: `${eq('<i>D</i>² = 1² + 1² + 1² = 3, donc <i>D</i> = √3 ≈ 1,73')}<p>Deux fois Pythagore : √2 au fond, puis √(2 + 1) en hauteur.</p>` },
  ],
};
