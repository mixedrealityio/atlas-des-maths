// Chapitre 16, page par page. En Chine : 空间向量与立体几何 (première, 选择性必修第一册, chapitre 1).
// En France : géométrie dans l'espace de terminale (vecteur normal, équation de plan, distance).
import * as M from './model.js';
import { W } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (az, el, dist, t = [0, 0.9, 0]) => ({ target: t, az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 16 · Tle', title: 'L’espace en coordonnées', sub: 'le cube ABCD-A₁B₁C₁D₁',
    body: `
      <p class="lede">Les manuels chinois mettent presque tous les problèmes d’espace dans un cube ou un pavé, et y posent un repère. Ici le cube d’arête 2, avec l’origine en <i>D</i>, l’axe <i>x</i> le long de [<i>DA</i>], <i>y</i> le long de [<i>DC</i>] et <i>z</i> le long de [<i>DD</i>₁].</p>
      <p>Chaque sommet a alors des coordonnées simples : <i>A</i>(2 ; 0 ; 0), <i>B</i>(2 ; 2 ; 0), <i>C</i>₁(0 ; 2 ; 2), <i>B</i>₁(2 ; 2 ; 2)…</p>
      <p>Le point <i>P</i> parcourt la grande diagonale [<i>DB</i>₁] : ses trois coordonnées restent égales, <i>P</i>(<i>t</i> ; <i>t</i> ; <i>t</i>). Les traits rouges montrent comment on lit ses coordonnées en projetant sur le sol puis sur les axes.</p>
      ${eq('<i>DP</i> = √(<i>x</i>² + <i>y</i>² + <i>z</i>²)')}
      ${china('la notation ABCD-A₁B₁C₁D₁ et le repère « en D » sont ceux des manuels et du gaokao.')}`,
    cam: cam(-35, 22, 14), lit: 'point', scene: 'coords', look: {},
    fig: 'Le point P(t ; t ; t)',
  },
  {
    kicker: '16.1', title: 'Vecteur normal', sub: 'orthogonal à tout le plan',
    body: `
      <p class="lede">Un <b>vecteur normal</b> à un plan est orthogonal à tous les vecteurs du plan. Il suffit qu’il le soit à deux vecteurs non colinéaires du plan.</p>
      <p>Pour le plan <i>A</i>₁<i>BC</i>₁ (en bleu) : <i>A</i>₁<i>B</i> = (0 ; 2 ; −2) et <i>A</i>₁<i>C</i>₁ = (−2 ; 2 ; 0). On cherche <i>n</i> = (<i>a</i> ; <i>b</i> ; <i>c</i>) avec</p>
      ${eq('<i>n</i> · <i>A</i>₁<i>B</i> = 2<i>b</i> − 2<i>c</i> = 0    <i>n</i> · <i>A</i>₁<i>C</i>₁ = −2<i>a</i> + 2<i>b</i> = 0')}
      <p>d’où <i>n</i> = (1 ; 1 ; 1), qui est la direction de la diagonale <i>DB</i>₁ : la grande diagonale du cube est perpendiculaire au plan <i>A</i>₁<i>BC</i>₁.</p>
      <p>Le vecteur bleu <i>u</i> tourne dans le plan : son produit scalaire avec <i>n</i> reste nul.</p>
      <p>Équation du plan : <i>x</i> + <i>y</i> + <i>z</i> = 4 (on vérifie avec <i>B</i>(2 ; 2 ; 0)).</p>`,
    cam: cam(-35, 22, 14), lit: 'plane', scene: 'normal', look: {},
    fig: 'n = (1 ; 1 ; 1) ⟂ plan A₁BC₁',
  },
  {
    kicker: '16.2', title: 'Distance à un plan', sub: 'projeter sur la normale',
    body: `
      <p class="lede">La distance d’un point <i>D</i> à un plan est la longueur de la perpendiculaire [<i>DH</i>]. Avec un point <i>A</i>₁ du plan et un vecteur normal <i>n</i> :</p>
      ${eq('<i>d</i> = |<i>DA</i>₁ · <i>n</i>| / ‖<i>n</i>‖')}
      <p>Ici <i>DA</i>₁ = (2 ; 0 ; 2), <i>n</i> = (1 ; 1 ; 1), donc <i>d</i> = 4/√3 ≈ ${fr(M.DIST, 3)}.</p>
      <p>Le pied <i>H</i> est sur la diagonale <i>DB</i>₁, aux deux tiers : <i>H</i>(4/3 ; 4/3 ; 4/3). Le plan <i>A</i>₁<i>BC</i>₁ coupe la grande diagonale en trois, son homologue <i>ACD</i>₁ aussi.</p>
      <p>Le produit scalaire projette <i>DA</i>₁ (en gris) sur la direction de <i>n</i> : c’est la composante qui « traverse » le plan.</p>`,
    cam: cam(-25, 18, 13, [0, 0.8, 0]), lit: 'dist', scene: 'dist', look: {},
    fig: 'DH = 4/√3',
  },
  {
    kicker: '16.3', title: 'Angles', sub: 'dièdre, droite et plan',
    body: `
      <p class="lede">L’angle entre deux plans se lit sur leurs vecteurs normaux. Pour le plan <i>A</i>₁<i>BC</i>₁ (normale <i>n</i>) et la base (normale <i>k</i> = (0 ; 0 ; 1)) :</p>
      ${eq('cos θ = |<i>n</i> · <i>k</i>| / (‖<i>n</i>‖ ‖<i>k</i>‖) = 1/√3')}
      <p>soit θ ≈ ${fr(M.deg(M.DIHEDRAL), 1)}°. C’est l’angle <b>dièdre</b> (二面角) entre les deux plans.</p>
      <p>Pour l’angle entre une droite de direction <i>u</i> et un plan, on prend le sinus : sin φ = |<i>u</i> · <i>n</i>| / (‖<i>u</i>‖ ‖<i>n</i>‖). Pour l’arête [<i>DD</i>₁] et le plan <i>A</i>₁<i>BC</i>₁, φ ≈ ${fr(M.deg(M.LINE_PLANE), 1)}°.</p>
      <p>Les deux angles sont complémentaires ici, car la droite (<i>DD</i>₁) est justement perpendiculaire à la base.</p>`,
    cam: cam(-60, 14, 15), lit: 'dihedral', scene: 'angle', look: {},
    fig: 'Le dièdre entre A₁BC₁ et la base',
  },
  {
    kicker: '16.4', title: 'Sections du cube', sub: 'un plan qui traverse',
    body: `
      <p class="lede">Faisons glisser le plan <i>x</i> + <i>y</i> + <i>z</i> = <i>k</i>, toujours perpendiculaire à la diagonale <i>DB</i>₁, de <i>D</i> jusqu’à <i>B</i>₁.</p>
      <ul class="rules"><li>pour <i>k</i> ≤ 2 : un petit <b>triangle équilatéral</b>, qui grandit ;</li><li>pour 2 &lt; <i>k</i> &lt; 4 : un <b>hexagone</b> ;</li><li>pour <i>k</i> = 3 : un hexagone <b>régulier</b>, qui passe par les milieux de six arêtes ;</li><li>pour <i>k</i> ≥ 4 : de nouveau un triangle, qui rapetisse.</li></ul>
      <p>Pour <i>k</i> = 2 et <i>k</i> = 4, on retrouve les triangles <i>ACD</i>₁ et <i>A</i>₁<i>BC</i>₁. Construire une section (截面) est un exercice classique : on cherche les points où le plan coupe chaque arête.</p>`,
    cam: cam(-35, 24, 14), lit: 'section', scene: 'section', look: {},
    fig: 'Le plan x + y + z = k coupe le cube',
  },
];

export const PLATES = {
  cube: { text: `Le cube d’arête 2 et son repère d’origine D.`, facts: () => [['arête', '2'], ['diagonale d’une face', '2√2'], ['grande diagonale', '2√3 ≈ 3,46']] },
  point: { text: `P se promène sur [DB₁]. Ses coordonnées sont égales.`, facts: s => [['P', `(${fr(2 * s.t)} ; ${fr(2 * s.t)} ; ${fr(2 * s.t)})`], ['DP', fr(2 * s.t * Math.sqrt(3), 3)]] },
  plane: { text: `Le plan A₁BC₁, son vecteur normal n et un vecteur u du plan.`, facts: s => [['n', '(1 ; 1 ; 1)'], ['u', s.u ? s.u.map(c => fr(c)).join(' ; ') : ''], ['n · u', '0'], ['équation', 'x + y + z = 4']] },
  dist: { text: `La perpendiculaire de D au plan, de pied H.`, facts: () => [['DA₁ · n', '4'], ['‖n‖', '√3'], ['distance', `4/√3 ≈ ${fr(M.DIST, 4)}`], ['H', '(4/3 ; 4/3 ; 4/3)']] },
  dihedral: { text: `La base en rouge pâle, sa normale k, et le plan A₁BC₁.`, facts: () => [['cos θ', '1/√3'], ['dièdre θ', `${fr(M.deg(M.DIHEDRAL), 2)}°`], ['angle DD₁, plan', `${fr(M.deg(M.LINE_PLANE), 2)}°`]] },
  section: { text: `La section rouge du cube par le plan x + y + z = k.`, facts: s => { const p = M.section(s.k); return [['k', fr(s.k)], ['côtés', String(p.length)], ['aire', fr(M.area3(p), 3)]]; } },
};
