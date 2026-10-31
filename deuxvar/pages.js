// Chapitre 19, page par page. En Chine : 多元函数微分学, premier cours d'analyse des universités (高等数学, tome 2).
// En France : fin de MPSI et MP/PC.
import * as M from './model.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (az, el, dist, ty = 0.7) => ({ target: [0, ty, 0], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 19 · MPSI+', title: 'Deux variables', sub: 'une surface au-dessus du plan',
    body: `
      <p class="lede">Une fonction de deux variables associe un nombre <i>f</i>(<i>x</i>, <i>y</i>) à chaque point du plan. Sa représentation est une <b>surface</b> : au-dessus du point (<i>x</i> ; <i>y</i>) du plancher, on monte à la hauteur <i>z</i> = <i>f</i>(<i>x</i>, <i>y</i>).</p>
      ${eq('<i>f</i>(<i>x</i>, <i>y</i>) = 1,8 e<sup>−(<i>x</i>² + <i>y</i>²)/2,2</sup> + 0,3<i>x</i>')}
      <p>Ici c’est une colline penchée. Le point rouge se promène sur la surface ; le trait vertical relie son ombre sur le plancher à sa hauteur.</p>
      <p>Exemples concrets : l’altitude d’un terrain en fonction de la longitude et de la latitude, la température dans une plaque, le coût d’une production en fonction de deux quantités.</p>
      ${china('多元函数, au début du second semestre de licence (高等数学 下册). Ce chapitre prolonge la MPSI.')}`,
    cam: cam(-35, 28, 17), lit: 'surface', scene: 'surface', look: {},
    fig: 'La surface z = f(x, y)',
  },
  {
    kicker: '19.1', title: 'Lignes de niveau', sub: 'la carte topographique',
    body: `
      <p class="lede">Coupons la surface par des plans horizontaux <i>z</i> = <i>c</i>. Chaque coupe est une <b>ligne de niveau</b> : l’ensemble des points où <i>f</i>(<i>x</i>, <i>y</i>) = <i>c</i>.</p>
      <p>Projetées sur le plancher (en rouge foncé), elles forment une carte, exactement comme les courbes de niveau d’une carte de randonnée. Là où elles sont serrées, la pente est forte ; là où elles s’écartent, le terrain est presque plat.</p>
      <p>Les lignes tracées correspondent à <i>c</i> = ${M.LEVELS.map(c => fr(c, 2)).join(' ; ')}. Le sommet est au centre des petites boucles, légèrement décalé vers les <i>x</i> positifs à cause du terme 0,3<i>x</i>.</p>`,
    cam: cam(-25, 52, 17, 0.3), lit: 'levels', scene: 'levels', look: {},
    fig: 'Les coupes horizontales de la colline',
  },
  {
    kicker: '19.2', title: 'Dérivées partielles', sub: 'une variable à la fois',
    body: `
      <p class="lede">Fixons <i>y</i> et faisons varier <i>x</i> seulement : on se déplace sur la tranche rouge. La pente de cette tranche est la <b>dérivée partielle</b> par rapport à <i>x</i> :</p>
      ${eq('∂<i>f</i>/∂<i>x</i>(<i>x</i>, <i>y</i>) = lim<sub><i>h</i>→0</sub> [<i>f</i>(<i>x</i> + <i>h</i>, <i>y</i>) − <i>f</i>(<i>x</i>, <i>y</i>)] / <i>h</i>')}
      <p>On la calcule en dérivant comme d’habitude, en traitant <i>y</i> comme une constante. De même, la tranche bleue (<i>x</i> fixé) a pour pente ∂<i>f</i>/∂<i>y</i>.</p>
      <p>Les deux tiges sont les tangentes aux tranches au point <i>M</i>. Elles suffisent à définir le plan tangent à la surface, quand <i>f</i> est assez régulière.</p>`,
    cam: cam(-40, 26, 15), lit: 'partial', scene: 'partial', look: {},
    fig: 'Deux tranches, deux pentes',
  },
  {
    kicker: '19.3', title: 'Le gradient', sub: 'la direction de plus forte pente',
    body: `
      <p class="lede">Le <b>gradient</b> rassemble les deux dérivées partielles en un vecteur du plancher :</p>
      ${eq('∇<i>f</i> = (∂<i>f</i>/∂<i>x</i> ; ∂<i>f</i>/∂<i>y</i>)')}
      <ul class="rules"><li>il pointe dans la direction où <i>f</i> augmente le plus vite (la montée la plus raide) ;</li><li>sa longueur est cette pente maximale ;</li><li>il est perpendiculaire aux lignes de niveau.</li></ul>
      <p>Les petites flèches grises sont le champ de gradient ; la rouge est le gradient au point <i>M</i>. Le carré rouge est le <b>plan tangent</b>, d’équation <i>z</i> = <i>f</i>(<i>a</i>, <i>b</i>) + ∂<sub><i>x</i></sub><i>f</i> (<i>x</i> − <i>a</i>) + ∂<sub><i>y</i></sub><i>f</i> (<i>y</i> − <i>b</i>).</p>
      <p>C’est l’idée de la descente de gradient, utilisée pour entraîner les réseaux de neurones : faire de petits pas dans la direction −∇<i>f</i>.</p>`,
    cam: cam(-30, 34, 16), lit: 'grad', scene: 'grad', look: {},
    fig: 'Champ de gradient et plan tangent',
  },
  {
    kicker: '19.4', title: 'Points critiques', sub: 'sommet ou col',
    body: `
      <p class="lede">Là où le gradient s’annule, le plan tangent est horizontal : c’est un <b>point critique</b>. Le sommet de la colline en est un, en (${fr(M.PEAK[0], 3)} ; 0).</p>
      <p>Mais un point critique n’est pas forcément un extremum. Sur la surface bleue <i>z</i> = (<i>x</i>² − <i>y</i>²)/3, le gradient est nul à l’origine, et pourtant la surface monte dans la direction <i>x</i> et descend dans la direction <i>y</i> : c’est un <b>col</b> (ou point selle), comme une selle de cheval.</p>
      ${eq('∇<i>g</i>(0, 0) = (0 ; 0), mais ni maximum ni minimum')}
      <p>Pour trancher, on étudie les dérivées secondes : c’est le critère de la matrice hessienne, au programme de deuxième année.</p>`,
    cam: cam(-40, 24, 22, 0.1), lit: 'crit', scene: 'saddle', look: {},
    fig: 'Le col z = (x² − y²)/3',
  },
];

export const PLATES = {
  surface: { text: `La surface de la colline, avec son maillage.`, facts: () => [['sommet', `(${fr(M.PEAK[0], 3)} ; 0)`], ['hauteur du sommet', fr(M.f(...M.PEAK), 3)]] },
  point: { text: `Le point M de la surface et son ombre sur le plancher.`, facts: s => [['x', fr(s.p[0])], ['y', fr(s.p[1])], ['f(x, y)', fr(M.f(...s.p), 3)]] },
  levels: { text: `Les lignes de niveau, sur la surface et projetées sur le plancher.`, facts: () => M.LEVELS.map(c => ['niveau', fr(c, 2)]) },
  partial: { text: `Les deux tranches passant par M et leurs tangentes.`, facts: s => [['∂f/∂x', fr(M.fx(...s.p), 3)], ['∂f/∂y', fr(M.fy(...s.p), 3)]] },
  grad: { text: `Le gradient en M et le plan tangent.`, facts: s => [['∇f', `(${fr(M.fx(...s.p), 3)} ; ${fr(M.fy(...s.p), 3)})`], ['pente maximale ‖∇f‖', fr(Math.hypot(M.fx(...s.p), M.fy(...s.p)), 3)]] },
  crit: { text: `Le plan tangent horizontal au col.`, facts: () => [['∇g(0, 0)', '(0 ; 0)'], ['g(x, 0) = x²/3', 'monte'], ['g(0, y) = −y²/3', 'descend']] },
};
