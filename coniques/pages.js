// Chapitre 15, page par page. En Chine : 圆锥曲线的方程 (première, 选择性必修第一册, chapitre 3), un des
// sujets les plus lourds du gaokao. En France, les coniques ont quitté le lycée ; on les retrouve en prépa.
import * as M from './model.js';
import { OX, S } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const board = (dist = 26, tx = 0) => ({ target: [OX + tx * S, 0, 0], az: 0, el: 3, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 15 · 1re', title: 'Les coniques', sub: 'couper un cône',
    body: `
      <p class="lede">Coupez un double cône par un plan. Selon l’inclinaison β du plan, la section (en rouge) prend quatre formes :</p>
      <ul class="rules"><li>plan horizontal : un <b>cercle</b> ;</li><li>plan moins penché que les bords du cône : une <b>ellipse</b>, courbe fermée ;</li><li>plan parallèle à un bord (β = 60° ici) : une <b>parabole</b>, qui s’ouvre à l’infini ;</li><li>plan plus penché : une <b>hyperbole</b>, en deux morceaux, un sur chaque nappe.</li></ul>
      <p>Ces quatre courbes sont les <b>coniques</b>. Les Grecs les étudiaient déjà ; Kepler découvre en 1609 que les planètes décrivent des ellipses, et Newton explique pourquoi.</p>
      <p class="hintline">Faites tourner la figure pour voir la section de côté.</p>
      ${china('圆锥曲线, « courbes du cône », première année du lycée (高二). Les exercices du gaokao sur les coniques sont réputés pour leur difficulté.')}`,
    cam: { target: [0, 0.3, 0], az: 30, el: 18, dist: 20 }, lit: 'plane', scene: 'cone', look: {},
    fig: 'Un cône coupé par un plan',
  },
  {
    kicker: '15.1', title: 'L’ellipse', sub: 'la ficelle du jardinier',
    body: `
      <p class="lede">Plantez deux piquets <i>F</i> et <i>F′</i>, attachez-y une ficelle plus longue que leur écart, et tendez-la avec un crayon : il trace une ellipse.</p>
      ${eq('<i>MF</i> + <i>MF′</i> = 2<i>a</i>')}
      <p>Les deux piquets sont les <b>foyers</b>. Ici 2<i>a</i> = 6, les foyers sont à ±<i>c</i> = ±2 du centre, et le demi-petit axe vaut <i>b</i> = √(<i>a</i>² − <i>c</i>²) = √5.</p>
      ${eq('<i>x</i>²/<i>a</i>² + <i>y</i>²/<i>b</i>² = 1')}
      <p>Propriété optique : un rayon parti de <i>F</i> se réfléchit sur l’ellipse et passe par <i>F′</i>. Dans une salle elliptique, on entend à un foyer ce qui est chuchoté à l’autre.</p>`,
    cam: board(), lit: 'conic', scene: 'ellipse', look: {},
    fig: 'MF + MF′ = 6',
  },
  {
    kicker: '15.2', title: 'L’hyperbole', sub: 'une différence constante',
    body: `
      <p class="lede">L’hyperbole est l’ensemble des points dont la <b>différence</b> des distances aux deux foyers est constante :</p>
      ${eq('|<i>MF</i> − <i>MF′</i>| = 2<i>a</i>')}
      <p>Ici <i>a</i> = 1,5 et <i>c</i> = 2,5, donc <i>b</i> = √(<i>c</i>² − <i>a</i>²) = 2. Elle a deux branches, et elle se rapproche de deux droites, ses <b>asymptotes</b> <i>y</i> = ±(<i>b</i>/<i>a</i>)<i>x</i>.</p>
      ${eq('<i>x</i>²/<i>a</i>² − <i>y</i>²/<i>b</i>² = 1')}
      <p>Application : le système de navigation LORAN mesurait la différence des temps d’arrivée de signaux radio émis par deux stations ; le navire se savait donc sur une hyperbole.</p>`,
    cam: board(), lit: 'conic', scene: 'hyper', look: {},
    fig: '|MF − MF′| = 3',
  },
  {
    kicker: '15.3', title: 'La parabole', sub: 'foyer et directrice',
    body: `
      <p class="lede">La parabole est l’ensemble des points à égale distance d’un point, le <b>foyer</b> <i>F</i>, et d’une droite, la <b>directrice</b> :</p>
      ${eq('<i>MF</i> = <i>MH</i>    <i>y</i>² = 2<i>px</i>')}
      <p>où <i>H</i> est le projeté de <i>M</i> sur la directrice et <i>p</i> la distance du foyer à la directrice (ici <i>p</i> = 2, foyer en (1 ; 0)).</p>
      <p>Propriété optique : les rayons parallèles à l’axe (en gris) se réfléchissent tous vers le foyer. C’est le principe des antennes paraboliques, des fours solaires et des phares de voiture, où l’ampoule placée au foyer envoie un faisceau parallèle.</p>
      ${china('la forme 标准方程 y² = 2px (p &gt; 0) est celle des manuels chinois.')}`,
    cam: board(), lit: 'conic', scene: 'parab', look: {},
    fig: 'MF = MH, et les rayons convergent',
  },
  {
    kicker: '15.4', title: 'L’excentricité', sub: 'une seule famille',
    body: `
      <p class="lede">Les trois coniques n’en font qu’une. En prenant un foyer comme origine, elles ont toutes pour équation polaire</p>
      ${eq('<i>r</i> = <i>p</i> / (1 + <i>e</i> cos θ)')}
      <p>où <i>e</i> est l’<b>excentricité</b> : le rapport constant entre la distance au foyer et la distance à la directrice (le trait gris).</p>
      <table class="data"><tr><th><i>e</i></th><th>conique</th></tr><tr><td>0</td><td>cercle</td></tr><tr><td>entre 0 et 1</td><td>ellipse</td></tr><tr><td>1</td><td>parabole</td></tr><tr><td>plus de 1</td><td>hyperbole</td></tr></table>
      <p>Sur la figure, <i>e</i> monte de 0 à 1,6 : le cercle s’allonge en ellipse, s’ouvre en parabole puis en hyperbole. C’est aussi la forme des trajectoires des comètes : liées au Soleil si <i>e</i> &lt; 1, de passage si <i>e</i> ≥ 1.</p>`,
    cam: board(26, 0.5), lit: 'conic', scene: 'ecc', look: {},
    fig: 'r = p / (1 + e cos θ)',
  },
];

export const PLATES = {
  cone: { text: `Le double cône, de demi-angle 30°.`, facts: () => [['demi-angle α', '30°'], ['angle critique 90° − α', '60°']] },
  plane: { text: `Le plan de coupe et la section rouge. Le type de courbe ne dépend que de l’inclinaison β comparée à 60°.`, facts: s => [['β', `${fr(M.deg(s.beta), 1)}°`], ['section', M.kind(s.beta)]] },
  board: { text: `Le tableau, en repère orthonormé.`, facts: () => [] },
  conic: { text: `La conique de la page, ses foyers, et les segments qui la définissent.`,
    facts: s => {
      switch (s.scene) {
        case 'ellipse': { const p = M.elAt(s.t); return [['MF', fr(M.dist(p, [-2, 0]), 3)], ['MF′', fr(M.dist(p, [2, 0]), 3)], ['somme', fr(M.dist(p, [-2, 0]) + M.dist(p, [2, 0]), 3)], ['a, b, c', '3 ; √5 ; 2']]; }
        case 'hyper': { const p = M.hyAt(s.u, 1); return [['MF', fr(M.dist(p, [-2.5, 0]), 3)], ['MF′', fr(M.dist(p, [2.5, 0]), 3)], ['différence', fr(M.dist(p, [-2.5, 0]) - M.dist(p, [2.5, 0]), 3)], ['a, b, c', '1,5 ; 2 ; 2,5']]; }
        case 'parab': { const p = M.paAt(s.y); return [['MF', fr(M.dist(p, [1, 0]), 3)], ['MH', fr(p[0] + 1, 3)], ['p', '2']]; }
        case 'ecc': return [['e', fr(s.e)], ['conique', M.eKind(s.e)]];
      }
      return [];
    } },
};
