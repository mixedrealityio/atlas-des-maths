// Chapitre 1, page par page (programme de 4e : le théorème de Pythagore et sa réciproque).
// À gauche le texte et les graphiques ; à droite la caméra, ce qui est éclairé et ce qui est montré.
import * as M from './model.js';
import { ST } from './world.js';
import { chart, sample, fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const cam = (st, du, dv, h, az, el, dist) => ({ target: [ST[st] + du, h, -dv], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 1 · 4e', title: 'Pythagore', sub: 'le triangle rectangle',
    body: `
      <p class="lede">Un triangle est <b>rectangle</b> quand deux de ses côtés font un angle droit. Ces deux côtés sont les <b>côtés de l’angle droit</b> ; le troisième, en face de l’angle droit, s’appelle l’<b>hypoténuse</b>.</p>
      <p>Sur la table : un triangle de côtés <i>a</i> = 3 et <i>b</i> = 4 carreaux autour de l’angle droit. Son hypoténuse mesure exactement <i>c</i> = 5 carreaux.</p>
      <p>L’hypoténuse est toujours le <b>plus long</b> des trois côtés : elle est en face du plus grand angle. C’est elle qu’on cherche d’abord à repérer dans un exercice.</p>
      <p class="hintline">Faites glisser la figure pour tourner autour. Cliquez sur le triangle.</p>`,
    cam: cam('tri', 1.5, 2, 0, 0, 58, 24), lit: 'tri', scene: 'tri', look: { sq: 0 },
    fig: 'Le triangle 3, 4, 5',
  },
  {
    kicker: '1.1', title: 'Le théorème', sub: 'trois carrés sur trois côtés',
    body: `
      <p class="lede">Construisons un carré sur chaque côté. Le carré posé sur l’hypoténuse a exactement l’aire des deux autres réunis :</p>
      ${eq('<i>a</i>² + <i>b</i>² = <i>c</i>²')}
      <p>Comptez les carreaux : 9 sur le côté 3, 16 sur le côté 4 et 25 sur l’hypoténuse. Et 9 + 16 = 25.</p>
      <table class="data">
        <tr><th>côté</th><th>longueur</th><th>aire du carré</th></tr>
        <tr><td><i>a</i></td><td>3</td><td>9</td></tr>
        <tr><td><i>b</i></td><td>4</td><td>16</td></tr>
        <tr><td><i>c</i> (hypoténuse)</td><td>5</td><td>25 = 9 + 16</td></tr>
      </table>
      <p><b>Théorème de Pythagore.</b> Si un triangle est rectangle, alors le carré de l’hypoténuse est égal à la somme des carrés des deux autres côtés.</p>
      <p class="hintline">Cliquez sur les carrés pour les détacher du triangle.</p>`,
    cam: cam('tri', 1.2, 1.8, 0, -8, 62, 42), lit: 'squares', scene: 'tri', look: { sq: 1 },
    fig: 'Les carrés 9, 16 et 25',
  },
  {
    kicker: '1.2', title: 'Pourquoi c’est vrai', sub: 'une preuve sans calcul',
    body: `
      <p class="lede">Prenez un grand carré de côté <i>a</i> + <i>b</i> = 7 et quatre copies du triangle. Rangez-les de deux façons.</p>
      <p><b>Premier rangement :</b> un triangle dans chaque coin. Il reste au milieu un carré penché de côté <i>c</i> : son aire est <i>c</i>².</p>
      <p><b>Second rangement :</b> les triangles glissent deux par deux pour former deux rectangles. Il reste deux carrés : <i>a</i>² et <i>b</i>².</p>
      <p>Les triangles n’ont ni grandi ni rétréci, et le grand carré non plus. Ce qui reste a donc la même aire dans les deux cas :</p>
      ${eq('<i>c</i>² = <i>a</i>² + <i>b</i>²')}
      <p>Le raisonnement marche pour n’importe quel triangle rectangle : on n’a utilisé que l’angle droit, qui fait que les pièces s’emboîtent.</p>
      <p class="hintline">Les quatre triangles glissent tout seuls. Cliquez dessus pour arrêter le temps.</p>`,
    cam: cam('proof', 3.5, 3.5, 0, 0, 64, 40), lit: 'proof', scene: 'proof', look: {},
    fig: 'Le même carré, rangé deux fois',
  },
  {
    kicker: '1.3', title: 'La preuve chinoise', sub: 'le diagramme de Zhao Shuang',
    body: `
      <p class="lede">En Chine, le théorème s’appelle <b>勾股定理</b>, « théorème du gou et du gu » : le petit côté de l’angle droit est le <i>gou</i> (勾), le grand le <i>gu</i> (股), l’hypoténuse la <i>xian</i> (弦). Le cas 3-4-5 figure déjà dans le <i>Zhoubi suanjing</i>, il y a plus de deux mille ans.</p>
      <p>Au IIIe siècle, <b>Zhao Shuang</b> (赵爽) en donne une preuve par un seul dessin : quatre triangles rectangles tournés autour d’un petit carré remplissent exactement le carré construit sur l’hypoténuse.</p>
      <p>Le petit carré a pour côté <i>b</i> − <i>a</i> = 1. En comptant les aires :</p>
      ${eq('<i>c</i>² = 4 × <i>ab</i>/2 + (<i>b</i> − <i>a</i>)² = 2<i>ab</i> + <i>b</i>² − 2<i>ab</i> + <i>a</i>² = <i>a</i>² + <i>b</i>²')}
      <p>Avec nos nombres : 4 × 6 + 1 = 25 = 5². Ce dessin, le 弦图, a servi d’emblème au Congrès international des mathématiciens de Pékin en 2002.</p>
      <p class="cn">Chine : 勾股定理, 8e année (八年级下册, chapitre 17), où cette preuve est enseignée.</p>`,
    cam: cam('zhao', 0, 0, 0, 0, 62, 34), lit: 'zhao', scene: 'zhao', look: {},
    fig: 'Le 弦图 de Zhao Shuang',
  },
  {
    kicker: '1.4', title: 'Calculer un côté', sub: 'deux cas, une seule égalité',
    body: `
      <p class="lede">Le théorème sert à calculer une longueur quand on connaît les deux autres.</p>
      <p><b>On cherche l’hypoténuse.</b> On additionne les carrés, puis on prend la racine carrée :</p>
      ${eq('<i>c</i> = √(<i>a</i>² + <i>b</i>²) = √(9 + 16) = √25 = 5')}
      <p><b>On cherche un côté de l’angle droit.</b> On soustrait : si <i>c</i> = 5 et <i>a</i> = 3,</p>
      ${eq('<i>b</i> = √(<i>c</i>² − <i>a</i>²) = √(25 − 9) = √16 = 4')}
      <p>Souvent la racine ne tombe pas juste : avec des côtés 1 et 1, l’hypoténuse vaut √2 ≈ 1,414. On donne alors la valeur exacte, puis une valeur approchée.</p>
      <p>Rédaction type : « Le triangle ABC est rectangle en A, donc d’après le théorème de Pythagore, BC² = AB² + AC². »</p>`,
    cam: cam('tri', 1.5, 2, 0, 20, 48, 30), lit: 'tri', scene: 'tri', look: { sq: 1 },
    fig: 'Additionner ou soustraire',
  },
  {
    kicker: '1.5', title: 'La réciproque', sub: 'reconnaître un angle droit',
    body: `
      <p class="lede">Ici deux côtés restent fixes, 3 et 4, et l’angle entre eux s’ouvre et se ferme. Le troisième côté change.</p>
      <p>Si l’angle est aigu, le troisième côté est plus court que 5 : <i>c</i>² &lt; 25. S’il est obtus, il est plus long : <i>c</i>² &gt; 25. L’égalité <i>c</i>² = 9 + 16 n’a lieu <b>que</b> pour l’angle droit.</p>
      <div class="charts">${chart({ x0: 0, x1: 180, y0: 0, y1: 50, xlabel: 'angle entre 3 et 4 (degrés)', ylabel: 'c² (troisième côté au carré)', h: 160,
        label: 'Le carré du troisième côté en fonction de l’angle : il croise 25 à 90 degrés',
        series: [{ pts: sample(M.thirdSq, 0, 180) }, { cls: 'trend', pts: [[0, 25], [180, 25]], tag: [4, 25, '9 + 16 = 25'] }],
        marks: [[90, 25, '90°', 6, 16]], cursors: ['recip'] })}</div>
      <p><b>Réciproque.</b> Si dans un triangle le carré du plus long côté est égal à la somme des carrés des deux autres, alors ce triangle est rectangle.</p>
      <p>Et si l’égalité est fausse, le triangle n’est <b>pas</b> rectangle (c’est la contraposée du théorème).</p>`,
    cam: cam('recip', 1, 2, 0, 0, 62, 30), lit: 'recip', scene: 'recip', look: {},
    fig: 'Deux côtés fixes, un angle qui varie',
  },
  {
    kicker: '1.6', title: 'Dans l’espace', sub: 'la grande diagonale d’un pavé',
    body: `
      <p class="lede">Combien mesure la plus longue tige qu’on peut ranger dans une boîte de 3 × 4 × 12 ? On applique Pythagore deux fois.</p>
      <p><b>Au fond de la boîte,</b> la diagonale est l’hypoténuse d’un triangle rectangle de côtés 3 et 4 :</p>
      ${eq('<i>d</i>² = 3² + 4² = 25, donc <i>d</i> = 5')}
      <p><b>Puis en hauteur,</b> cette diagonale et l’arête verticale de 12 forment un nouvel angle droit :</p>
      ${eq('<i>D</i>² = 5² + 12² = 169, donc <i>D</i> = 13')}
      <p>En une seule formule : <i>D</i>² = <i>L</i>² + <i>l</i>² + <i>h</i>². Les triplets 3-4-5 et 5-12-13 ont des côtés entiers : on les appelle des <b>triplets pythagoriciens</b>.</p>`,
    cam: cam('pave', 0.8, 1, 2.6, -38, 32, 30), lit: 'pave', scene: 'pave', look: {},
    fig: 'Le pavé 3 × 4 × 12',
  },
];

export const PLATES = {
  tri: { text: `Le triangle se lit à partir de l’angle droit, marqué par l’équerre noire. Les deux côtés qui le forment sont <i>a</i> et <i>b</i> ; l’hypoténuse <i>c</i> est en face.`,
    facts: () => [['côtés de l’angle droit', '3 et 4'], ['hypoténuse', '5'], ['périmètre', '3 + 4 + 5 = 12'], ['aire', '3 × 4 ÷ 2 = 6']] },
  squares: { text: `Les trois carrés se détachent. Chacun est quadrillé en carreaux d’une unité : 9, 16 et 25. Les deux petits carrés réunis couvrent exactement le grand.`,
    facts: () => [['a²', '3 × 3 = 9'], ['b²', '4 × 4 = 16'], ['a² + b²', '25'], ['c²', '5 × 5 = 25']] },
  proof: { text: `Les quatre triangles gardent leur forme : ils ne font que glisser. Le grand carré garde aussi son aire. Donc la place qui reste, c² d’un côté, a² + b² de l’autre, est la même.`,
    facts: s => { const t = s.proof; return [['grand carré', '7² = 49'], ['quatre triangles', `4 × 6 = 24`], ['reste', '49 − 24 = 25'], ['rangement', t < 0.5 ? 'un carré penché, c²' : 'deux carrés, a² et b²']]; } },
  recip: { text: `Le troisième côté se calcule pour n’importe quel angle θ avec la formule d’Al-Kashi : c² = a² + b² − 2ab cos θ. Pour θ = 90°, cos θ = 0 et on retrouve Pythagore.`,
    facts: s => [['angle θ', `${fr(s.theta, 0)}°`], ['a² + b²', '25'], ['c²', fr(M.thirdSq(s.theta), 2)], ['c', fr(M.thirdSide(s.theta), 2)], ['rectangle ?', Math.abs(s.theta - 90) < 0.5 ? 'oui' : 'non']] },
  zhao: { text: `Les quatre triangles rectangles (gou 3, gu 4, xian 5) et le petit carré rouge de côté 1. Ensemble, ils couvrent le carré de côté 5.`,
    facts: () => [['quatre triangles', '4 × 3 × 4 / 2 = 24'], ['petit carré', '(4 − 3)² = 1'], ['total', '25 = 5²']] },
  pave: { text: `La grande diagonale (en rouge) est l’hypoténuse d’un triangle rectangle dressé dans la boîte : sa base est la diagonale du fond, son côté vertical est l’arête de 12.`,
    facts: () => [['diagonale du fond', '√(9 + 16) = 5'], ['grande diagonale', '√(25 + 144) = 13'], ['en une formule', '√(9 + 16 + 144) = 13']] },
};
