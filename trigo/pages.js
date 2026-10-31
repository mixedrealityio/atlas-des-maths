// Chapitre 6, page par page (programme de 1re spécialité : le cercle trigonométrique, cosinus et sinus).
import * as M from './model.js';
import { R, GX } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const circle = (az, el, dist) => ({ target: [0, 0, 0], az, el, dist });
const wide = (az, el, dist) => ({ target: [(GX(2 * Math.PI) - 2.9) / 2 + 0.2, 0, 0], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 6 · 1re', title: 'Trigonométrie', sub: 'le cercle et le radian',
    body: `
      <p class="lede">Le <b>cercle trigonométrique</b> a pour centre l’origine <i>O</i> et pour rayon 1. On le parcourt dans le sens inverse des aiguilles d’une montre, à partir du point (1 ; 0).</p>
      <p>Le point <i>M</i> tourne. L’arc rouge, de (1 ; 0) jusqu’à <i>M</i>, a une longueur <i>x</i> : c’est la mesure de l’angle en <b>radians</b>.</p>
      ${eq('tour complet = 2π rad = 360°')}
      <p>Un radian, c’est l’angle qui découpe sur le cercle un arc de la longueur du rayon, environ 57,3°. Pour convertir : <i>x</i> rad = <i>x</i> × 180/π degrés.</p>
      <p>Comme le point peut faire plusieurs tours, <i>x</i> et <i>x</i> + 2<i>k</i>π repèrent le même point <i>M</i>.</p>`,
    cam: circle(0, 2, 20), lit: 'point', scene: 'turn', look: {},
    fig: 'Le point M fait le tour',
  },
  {
    kicker: '6.1', title: 'Cosinus et sinus', sub: 'les coordonnées de M',
    body: `
      <p class="lede">Par définition, le <b>cosinus</b> et le <b>sinus</b> de <i>x</i> sont les coordonnées du point <i>M</i> :</p>
      ${eq('<i>M</i> = (cos <i>x</i> ; sin <i>x</i>)')}
      <p>Le cosinus se lit sur l’axe horizontal (en bleu), le sinus sur l’axe vertical (en rouge). Ils restent entre −1 et 1.</p>
      <p>Le rayon <i>OM</i>, sa projection horizontale et la verticale forment un triangle rectangle d’hypoténuse 1. Pythagore donne :</p>
      ${eq('cos² <i>x</i> + sin² <i>x</i> = 1')}
      <p>Leurs signes dépendent du quart de cercle : cos <i>x</i> &gt; 0 à droite, sin <i>x</i> &gt; 0 en haut.</p>`,
    cam: circle(0, 2, 20), lit: 'point', scene: 'turn', look: { proj: 1 },
    fig: 'Les projections de M',
  },
  {
    kicker: '6.2', title: 'Les courbes', sub: 'le cercle déroulé',
    body: `
      <p class="lede">Reportons la hauteur de <i>M</i>, c’est-à-dire sin <i>x</i>, en face de chaque valeur de <i>x</i> : le cercle se déroule en une vague, la <b>sinusoïde</b>.</p>
      <p>Quand <i>M</i> a fait un tour, la courbe recommence : sinus et cosinus sont <b>périodiques de période 2π</b>.</p>
      ${eq('sin(<i>x</i> + 2π) = sin <i>x</i>')}
      <p>La courbe du cosinus (en bleu) est la même vague décalée de π/2 vers la gauche : cos <i>x</i> = sin(<i>x</i> + π/2).</p>
      <p>Le sinus est <b>impair</b> (sa courbe est symétrique par rapport à <i>O</i>), le cosinus est <b>pair</b> (symétrique par rapport à l’axe des ordonnées).</p>`,
    cam: wide(0, 2, 34), lit: 'curve', scene: 'turn', look: { proj: 1, unroll: 1 },
    fig: 'Le cercle déroulé en sinusoïde',
  },
  {
    kicker: '6.3', title: 'Valeurs remarquables', sub: 'à connaître par cœur',
    body: `
      <p class="lede">Quelques angles reviennent tout le temps. Leurs cosinus et sinus se retrouvent avec des triangles simples : le demi-carré (π/4) et le demi-triangle équilatéral (π/6 et π/3).</p>
      <table class="data">
        <tr><th><i>x</i></th>${M.REMARQ.map(r => `<th>${r.n}</th>`).join('')}</tr>
        <tr><td>cos <i>x</i></td>${M.REMARQ.map(r => `<td>${r.c}</td>`).join('')}</tr>
        <tr><td>sin <i>x</i></td>${M.REMARQ.map(r => `<td>${r.s}</td>`).join('')}</tr>
      </table>
      <p>Astuce : les sinus de 0, π/6, π/4, π/3, π/2 valent √0/2, √1/2, √2/2, √3/2, √4/2. Les cosinus, c’est la même liste à l’envers.</p>`,
    cam: { target: [R * 0.15, R * 0.1, 0], az: 0, el: 2, dist: 19 }, lit: 'remarq', scene: 'turn', look: { proj: 1, rem: 1 },
    fig: 'π/6, π/4, π/3',
  },
  {
    kicker: '6.4', title: 'Angles associés', sub: 'des symétries du cercle',
    body: `
      <p class="lede">Les points bleus sont les images de <i>M</i> par les symétries du cercle. Leurs coordonnées se déduisent de celles de <i>M</i> :</p>
      <table class="data">
        <tr><th>angle</th><th>symétrie</th><th>cos</th><th>sin</th></tr>
        <tr><td>−<i>x</i></td><td>axe horizontal</td><td>cos <i>x</i></td><td>−sin <i>x</i></td></tr>
        <tr><td>π − <i>x</i></td><td>axe vertical</td><td>−cos <i>x</i></td><td>sin <i>x</i></td></tr>
        <tr><td>π + <i>x</i></td><td>centre <i>O</i></td><td>−cos <i>x</i></td><td>−sin <i>x</i></td></tr>
      </table>
      <p>Inutile d’apprendre ce tableau : il suffit de dessiner le cercle et de regarder où tombe le point.</p>`,
    cam: circle(0, 2, 20), lit: 'sym', scene: 'turn', look: { sym: 1 },
    fig: 'M et ses trois symétriques',
  },
];

export const PLATES = {
  board: { text: `Le cercle de centre O et de rayon 1. Le point de départ des angles est (1 ; 0), à droite.`, facts: () => [['rayon', '1'], ['périmètre', '2π ≈ 6,28'], ['1 rad', '≈ 57,3°']] },
  point: { text: `Le point M, repéré par l’angle x. Ses coordonnées sont cos x et sin x.`,
    facts: s => [['x (rad)', fr(s.t, 3)], ['x (degrés)', fr(M.deg(s.t), 1) + '°'], ['cos x', fr(Math.cos(s.t), 3)], ['sin x', fr(Math.sin(s.t), 3)], ['cos² + sin²', fr(Math.cos(s.t) ** 2 + Math.sin(s.t) ** 2, 3)]] },
  curve: { text: `Chaque point de la courbe rouge est à la même hauteur que M au moment où l’angle valait x.`, facts: s => [['x', fr(s.t, 3)], ['sin x', fr(Math.sin(s.t), 3)], ['période', '2π ≈ 6,283']] },
  remarq: { text: `Les cinq angles remarquables du premier quart de cercle.`, facts: () => M.REMARQ.map(r => [r.n, `cos ${r.c} · sin ${r.s}`]) },
  sym: { text: `Les trois symétriques de M : par rapport à l’axe horizontal, à l’axe vertical et au centre.`,
    facts: s => M.SYM.map(y => [y.n.replace(/<[^>]+>/g, ''), `(${fr(Math.cos(y.f(s.t)))} ; ${fr(Math.sin(y.f(s.t)))})`]) },
};
