// Chapitre 20, page par page. En Chine : 平面向量的数量积 et 余弦定理 (seconde, 高一, manuel 人教A版 必修第二册,
// chapitre 6 « 平面向量及其应用 »). En France : première, spécialité mathématiques.
import * as M from './model.js';
import { S } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (dist = 25) => ({ target: [0.9 * S, 0.9 * S, 0], az: 0, el: 3, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 20 · 1re', title: 'Le produit scalaire', sub: 'projeter un vecteur sur un autre',
    body: `
      <p class="lede">Le <b>produit scalaire</b> de deux vecteurs <i>u</i> et <i>v</i> est un <b>nombre</b>, pas un vecteur. On projette <i>v</i> orthogonalement sur la droite qui porte <i>u</i> : le pied est <i>H</i>.</p>
      ${eq('<i>u</i> · <i>v</i> = ‖<i>u</i>‖ × <i>OH</i>')}
      <p>où <i>OH</i> est compté <b>positivement</b> si <i>H</i> est du côté de <i>u</i>, <b>négativement</b> sinon. Le segment bleu épais est ce projeté.</p>
      <p>Sur la figure, ‖<i>u</i>‖ = 4 et ‖<i>v</i>‖ = 3. Quand <i>v</i> fait un angle de 60° avec <i>u</i>, <i>OH</i> = 1,5 et <i>u</i> · <i>v</i> = 6. Quand <i>v</i> passe de l’autre côté de la verticale, le produit devient négatif.</p>
      ${china('向量的数量积 (« produit quantité » des vecteurs), en seconde (高一), avec la notion de 投影向量, le vecteur projeté.')}`,
    cam: cam(), lit: 'fig', scene: 'proj', look: {},
    fig: 'u · v = ‖u‖ × OH',
  },
  {
    kicker: '20.1', title: 'Avec le cosinus', sub: 'le signe dit si l’angle est aigu',
    body: `
      <p class="lede">Dans le triangle rectangle, <i>OH</i> = ‖<i>v</i>‖ cos θ, où θ est l’angle entre les deux vecteurs. D’où la formule la plus connue :</p>
      ${eq('<i>u</i> · <i>v</i> = ‖<i>u</i>‖ ‖<i>v</i>‖ cos θ')}
      <table class="data">
        <tr><th>θ</th><th>cos θ</th><th><i>u</i> · <i>v</i> (ici 12 cos θ)</th></tr>
        ${[30, 60, 90, 120, 150].map(d => `<tr><td>${d}°</td><td>${fr(Math.cos(d * Math.PI / 180), 3)}</td><td>${fr(12 * Math.cos(d * Math.PI / 180), 2)}</td></tr>`).join('')}
      </table>
      <p>Angle aigu : produit positif. Angle obtus : produit négatif. Angle droit : produit <b>nul</b>, et c’est le critère d’orthogonalité :</p>
      ${eq('<i>u</i> ⟂ <i>v</i>  ⇔  <i>u</i> · <i>v</i> = 0')}
      <p>Avec <i>v</i> = <i>u</i> : <i>u</i> · <i>u</i> = ‖<i>u</i>‖², le « carré scalaire ».</p>`,
    cam: cam(), lit: 'fig', scene: 'cos', look: {},
    fig: 'u · v = 12 cos θ',
  },
  {
    kicker: '20.2', title: 'En coordonnées', sub: 'multiplier et ajouter',
    body: `
      <p class="lede">Dans un repère orthonormé, si <i>u</i> = (<i>x</i> ; <i>y</i>) et <i>v</i> = (<i>x′</i> ; <i>y′</i>), on multiplie les coordonnées deux à deux et on ajoute :</p>
      ${eq('<i>u</i> · <i>v</i> = <i>x x′</i> + <i>y y′</i>')}
      <p>Ici <i>u</i> = (3 ; 1) est fixe (en bleu) et <i>v</i> (en rouge) se promène. Par exemple, pour <i>v</i> = (−1 ; 2) : <i>u</i> · <i>v</i> = −3 + 2 = −1.</p>
      <p>Combiné avec la formule du cosinus, on obtient l’angle entre deux vecteurs :</p>
      ${eq(`cos θ = −1 / (√10 × √5) ≈ ${fr(-1 / Math.sqrt(50), 4)}`)}
      <p>soit θ ≈ ${fr(M.deg(Math.acos(-1 / Math.sqrt(50))), 1)}°, un angle à peine obtus.</p>
      ${china('数量积的坐标表示, en seconde. Le manuel en déduit aussitôt le critère <i>x x′</i> + <i>y y′</i> = 0 pour deux vecteurs perpendiculaires.')}`,
    cam: cam(), lit: 'fig', scene: 'coords', look: {},
    fig: 'u · v = 3x′ + y′',
  },
  {
    kicker: '20.3', title: 'Lignes de niveau', sub: 'un produit constant, une droite',
    body: `
      <p class="lede">Fixons <i>A</i> et <i>B</i>. Quand <i>M</i> se déplace, <i>AB</i> · <i>AM</i> ne dépend que du projeté <i>H</i> de <i>M</i> sur (<i>AB</i>) :</p>
      ${eq('<i>AB</i> · <i>AM</i> = <i>AB</i> × <i>AH</i>')}
      <p>Ici <i>AB</i> = 4 et <i>M</i> glisse sur la droite verticale <i>x</i> = 2 : le produit reste égal à 8.</p>
      <p>L’ensemble des points <i>M</i> tels que <i>AB</i> · <i>AM</i> = <i>k</i> est donc une <b>droite perpendiculaire</b> à (<i>AB</i>). Les droites grises sont les niveaux 4, 8 et 12.</p>
      <p>Cas <i>k</i> = 0 : la perpendiculaire à (<i>AB</i>) en <i>A</i>. C’est ainsi qu’on écrit l’équation d’une droite de vecteur normal donné : <i>a x</i> + <i>b y</i> + <i>c</i> = 0 a pour vecteur normal (<i>a</i> ; <i>b</i>).</p>`,
    cam: cam(), lit: 'fig', scene: 'level', look: {},
    fig: 'AB · AM = 8 sur toute la droite',
  },
  {
    kicker: '20.4', title: 'Al-Kashi', sub: 'Pythagore pour tous les triangles',
    body: `
      <p class="lede">Dans un triangle <i>ABC</i>, de côtés <i>a</i> = <i>BC</i>, <i>b</i> = <i>AC</i>, <i>c</i> = <i>AB</i> et d’angle α en <i>A</i> :</p>
      ${eq('<i>a</i>² = <i>b</i>² + <i>c</i>² − 2<i>bc</i> cos α')}
      <p>Preuve en une ligne : <i>BC</i> = <i>AC</i> − <i>AB</i>, donc <i>BC</i>² = <i>AC</i>² − 2 <i>AC</i> · <i>AB</i> + <i>AB</i>².</p>
      <p>Sur la figure, <i>b</i> = 3, <i>c</i> = 4,5 et α varie :</p>
      <table class="data">
        <tr><th>α</th><th><i>a</i>²</th><th><i>a</i></th></tr>
        ${[60, 90, 120].map(d => { const a = M.kashi(d * Math.PI / 180); return `<tr><td>${d}°</td><td>${fr(a * a, 2)}</td><td>${fr(a, 3)}</td></tr>`; }).join('')}
      </table>
      <p>Pour α = 90°, cos α = 0 : c’est Pythagore. L’angle obtus allonge le troisième côté, l’angle aigu le raccourcit.</p>
      ${china('余弦定理, « théorème du cosinus », en seconde (必修第二册, 6.4.3), juste après le produit scalaire et avec la loi des sinus 正弦定理. En France on lui donne le nom du savant persan al-Kāshī (XVe siècle).')}`,
    cam: cam(), lit: 'fig', scene: 'kashi', look: {},
    fig: 'a² = b² + c² − 2bc cos α',
  },
];

export const PLATES = {
  board: { text: `Un repère orthonormé : les deux axes sont perpendiculaires et ont la même unité, condition pour que u · v = xx′ + yy′.`, facts: () => [['origine', 'O (0 ; 0)'], ['unité', '1 carreau']] },
  fig: { text: `Les vecteurs et les projections de la page. Arrêtez le temps pour lire les mesures.`,
    facts: s => {
      switch (s.scene) {
        case 'proj': return [['‖u‖', '4'], ['‖v‖', '3'], ['OH', fr(M.projLen(s.th))], ['u · v', fr(4 * M.projLen(s.th))]];
        case 'cos': return [['θ', `${fr(M.deg(s.th), 1)}°`], ['cos θ', fr(Math.cos(s.th), 3)], ['u · v = 12 cos θ', fr(12 * Math.cos(s.th))]];
        case 'coords': return [['u', '(3 ; 1)'], ['v', `(${fr(s.vc[0])} ; ${fr(s.vc[1])})`], ['u · v', fr(M.dot(M.UC, s.vc))]];
        case 'level': return [['AB', '(4 ; 0)'], ['AM', `(2 ; ${fr(s.m[1])})`], ['AB · AM', fr(M.dot(M.AB, s.m))]];
        case 'kashi': return [['α', `${fr(M.deg(s.al), 1)}°`], ['a (mesuré)', fr(M.triDist(s.al), 3)], ['√(b² + c² − 2bc cos α)', fr(M.kashi(s.al), 3)]];
      }
      return [];
    } },
};
