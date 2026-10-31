// Chapitre 13, page par page. En Chine : 圆 (9e année, 九年级上册, chapitre 24). En France, l'essentiel de ce
// chapitre (angle inscrit, tangentes depuis un point) n'est plus au programme du collège.
import * as M from './model.js';
import { S } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (dist = 24, tx = 0) => ({ target: [tx * S, 0, 0], az: 0, el: 3, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 13 · 3e', title: 'Le cercle', sub: 'corde et perpendiculaire',
    body: `
      <p class="lede">Une <b>corde</b> est un segment qui joint deux points du cercle. La perpendiculaire à la corde menée par le centre <i>O</i> la coupe exactement en son <b>milieu</b> <i>M</i>.</p>
      <p>Pourquoi : <i>OA</i> = <i>OB</i> (deux rayons), donc le triangle <i>OAB</i> est isocèle et sa hauteur issue de <i>O</i> est aussi une médiane.</p>
      <p>Le triangle <i>OMA</i> est rectangle en <i>M</i>. Pythagore relie la distance <i>d</i> = <i>OM</i> et la demi-corde :</p>
      ${eq('(<i>AB</i>/2)² + <i>d</i>² = <i>r</i>²')}
      <p>Plus la corde est loin du centre, plus elle est courte. La plus longue est le diamètre (<i>d</i> = 0).</p>
      ${china('垂径定理, « le théorème du diamètre perpendiculaire », 9e année. Un classique des exercices de calcul de longueur.')}`,
    cam: cam(), lit: 'fig', scene: 'chord', look: {},
    fig: 'La perpendiculaire coupe la corde en son milieu',
  },
  {
    kicker: '13.1', title: 'Angle inscrit', sub: 'la moitié de l’angle au centre',
    body: `
      <p class="lede"><i>A</i> et <i>B</i> sont fixes sur le cercle, <i>P</i> se promène sur le grand arc. L’angle <i>APB</i> (en rouge) est un <b>angle inscrit</b> ; l’angle <i>AOB</i> (en bleu) est l’<b>angle au centre</b> qui intercepte le même arc.</p>
      ${eq('angle inscrit = ½ × angle au centre')}
      <p>Ici l’angle au centre vaut 140°, et l’angle en <i>P</i> reste figé à 70° pendant que <i>P</i> bouge. Conséquence : tous les angles inscrits qui interceptent le même arc sont égaux.</p>
      <p>Idée de la preuve : tracer le diamètre issu de <i>P</i> ; il découpe la figure en deux triangles isocèles, et l’angle extérieur d’un triangle isocèle vaut deux fois l’angle à la base.</p>
      ${china('圆周角定理, 9e année.')}`,
    cam: cam(), lit: 'fig', scene: 'inscribed', look: {},
    fig: 'APB reste égal à 70°',
  },
  {
    kicker: '13.2', title: 'Le demi-cercle', sub: 'toujours un angle droit',
    body: `
      <p class="lede">Cas particulier : si [<i>AB</i>] est un <b>diamètre</b>, l’angle au centre est plat (180°), donc tout angle inscrit <i>APB</i> vaut 90°.</p>
      ${eq('<i>P</i> sur le cercle de diamètre [<i>AB</i>]  ⇔  l’angle <i>APB</i> est droit')}
      <p>Réciproquement, le cercle de diamètre [<i>AB</i>] est l’ensemble des points d’où l’on « voit » [<i>AB</i>] sous un angle droit. C’est ce qui servait, au chapitre du second degré, à construire √(<i>ab</i>).</p>
      <p>L’équerre suit <i>P</i> partout sur le cercle : l’angle ne quitte jamais 90°.</p>`,
    cam: cam(), lit: 'fig', scene: 'semi', look: {},
    fig: 'Un angle droit inscrit dans un demi-cercle',
  },
  {
    kicker: '13.3', title: 'Tangentes', sub: 'depuis un point extérieur',
    body: `
      <p class="lede">Une <b>tangente</b> touche le cercle en un seul point <i>T</i>. Elle est perpendiculaire au rayon <i>OT</i>.</p>
      <p>Depuis un point <i>P</i> extérieur, on peut mener exactement deux tangentes, et elles ont la même longueur :</p>
      ${eq('<i>PT</i> = <i>PT′</i> = √(<i>OP</i>² − <i>r</i>²)')}
      <p>Les triangles <i>OTP</i> et <i>OT′P</i> sont rectangles, ont la même hypoténuse <i>OP</i> et un côté égal (le rayon) : ils sont superposables, symétriques par rapport à (<i>OP</i>).</p>
      <p>Construction à la règle et au compas : les points de contact sont sur le cercle de diamètre [<i>OP</i>], grâce à la page précédente.</p>
      ${china('切线长定理 (« théorème de la longueur des tangentes »), 9e année.')}`,
    cam: cam(28, 1.2), lit: 'fig', scene: 'tangent', look: {},
    fig: 'Deux tangentes de même longueur',
  },
  {
    kicker: '13.4', title: 'Arc et secteur', sub: 'des longueurs proportionnelles à l’angle',
    body: `
      <p class="lede">Un <b>secteur</b> est une part de disque, comme une part de tarte. Sa taille est proportionnelle à son angle θ :</p>
      ${eq('longueur de l’arc = <i>r</i> θ    aire du secteur = ½ <i>r</i>² θ')}
      <p>avec θ en radians. Pour θ = 2π on retrouve le périmètre 2π<i>r</i> et l’aire π<i>r</i>² du disque entier.</p>
      <p>En degrés (comme au collège en Chine) : arc = <i>n</i>π<i>r</i>/180 et secteur = <i>n</i>π<i>r</i>²/360 pour un angle de <i>n</i>°.</p>
      <p>Remarque : aire du secteur = ½ × arc × rayon, exactement comme l’aire d’un triangle de base « l’arc » et de hauteur <i>r</i>.</p>`,
    cam: cam(), lit: 'fig', scene: 'sector', look: {},
    fig: 'Un secteur d’angle θ',
  },
  {
    kicker: '13.5', title: 'Le π de Liu Hui', sub: 'découper le cercle',
    body: `
      <p class="lede">Au IIIe siècle, le mathématicien chinois <b>Liu Hui</b> (刘徽) approche le cercle par des polygones réguliers inscrits, en doublant à chaque fois le nombre de côtés : 6, 12, 24, 48, 96…</p>
      <p>Pour un cercle de rayon 1, le demi-périmètre du polygone à <i>n</i> côtés vaut</p>
      ${eq('<i>n</i> sin(π/<i>n</i>)  →  π')}
      <table class="data">
        <tr><th>côtés</th><th>demi-périmètre</th></tr>
        ${M.NS.map(n => `<tr><td>${n}</td><td>${fr(M.halfPerim(n), 5)}</td></tr>`).join('')}
      </table>
      <p>Avec 96 côtés, Liu Hui obtient π ≈ 3,14. Deux siècles plus tard, <b>Zu Chongzhi</b> (祖冲之) prouve que 3,1415926 &lt; π &lt; 3,1415927, une précision inégalée pendant près de mille ans.</p>
      ${china('刘徽割圆术, « la méthode de découpage du cercle », racontée dans les manuels chinois.')}`,
    cam: cam(), lit: 'fig', scene: 'liuhui', look: {},
    fig: 'Des polygones qui épousent le cercle',
  },
];

export const PLATES = {
  board: { text: `Le cercle de centre O et de rayon 3.`, facts: () => [['rayon', '3'], ['périmètre', '6π ≈ 18,85'], ['aire', '9π ≈ 28,27']] },
  fig: { text: `Les segments et les angles de la page. Arrêtez le temps pour lire les mesures.`,
    facts: s => {
      switch (s.scene) {
        case 'chord': { const c = M.chord(s.phi, s.d); return [['distance OM', fr(s.d)], ['demi-corde AM', fr(c.half)], ['AM² + OM²', fr(c.half ** 2 + s.d ** 2)], ['r²', '9']]; }
        case 'inscribed': { const a = M.angleAt(M.on(s.tp), M.on(M.TA), M.on(M.TB)); return [['angle au centre', '140°'], ['angle inscrit', `${fr(M.deg(a), 2)}°`]]; }
        case 'semi': return [['angle APB', `${fr(M.deg(M.angleAt(M.on(s.tp), M.on(Math.PI), M.on(0))), 2)}°`]];
        case 'tangent': return [['OP', fr(s.D)], ['PT = PT′', fr(M.tanLen(s.D), 3)], ['√(OP² − 9)', fr(Math.sqrt(s.D ** 2 - 9), 3)]];
        case 'sector': return [['θ', `${fr(s.th, 3)} rad = ${fr(M.deg(s.th), 1)}°`], ['arc 3θ', fr(M.arcLen(s.th), 3)], ['secteur 4,5θ', fr(M.sectorArea(s.th), 3)]];
        case 'liuhui': return [['côtés', String(s.n)], ['demi-périmètre', fr(M.halfPerim(s.n), 6)], ['π', '3,141593']];
      }
      return [];
    } },
};
