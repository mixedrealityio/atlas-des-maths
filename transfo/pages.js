// Chapitre 21, page par page. En Chine : 轴对称 (初二, 人教版 八年级上册), 旋转 et 中心对称
// (初三, 九年级上册, chapitre 23), 位似 (初三, 九年级下册, chapitre 27). En France : du cycle 3 à la 3e.
import * as M from './model.js';
import { S } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (dist = 24) => ({ target: [0.2 * S, 0.7 * S, 0], az: 0, el: 3, dist });
const pt = p => `(${fr(p[0], 1)} ; ${fr(p[1], 1)})`;

export const PAGES = [
  {
    kicker: 'Chapitre 21 · 3e', title: 'Les transformations', sub: 'déplacer une figure sans la déformer',
    body: `
      <p class="lede">Une <b>transformation</b> du plan associe à chaque point <i>M</i> un point <i>M</i>′, son <b>image</b>. Appliquée à tous les points d’une figure <i>F</i>, elle donne une figure <i>F</i>′.</p>
      <p>Première transformation : la <b>symétrie axiale</b> d’axe <i>d</i>. L’image <i>A</i>′ de <i>A</i> est le point tel que <i>d</i> soit la <b>médiatrice</b> de [<i>AA</i>′] :</p>
      ${eq('[<i>AA</i>′] ⟂ <i>d</i>   et   dist(<i>A</i>, <i>d</i>) = dist(<i>A</i>′, <i>d</i>)')}
      <p>Ici le drapeau bleu <i>F</i> a pour image le drapeau rouge <i>F</i>′ ; l’axe tourne lentement autour de <i>O</i>. Le drapeau est <b>retourné</b> : il pointait vers la droite, son image pointe de l’autre côté. Avec l’axe des ordonnées pour axe, <i>A</i>${pt(M.A)} a pour image <i>A</i>′${pt(M.apply(M.refl(Math.PI / 2), M.A))}.</p>
      <p>Longueurs, angles et aires sont conservés : c’est une <b>isométrie</b>.</p>
      ${china('轴对称 (« symétrie d’axe »), en 初二 (8e année, manuel 人教版 八年级上册, chapitre 13), avec la médiatrice 垂直平分线.')}`,
    cam: cam(), lit: 'img', scene: 'axe', look: {},
    fig: 'Symétrie d’axe d',
  },
  {
    kicker: '21.1', title: 'La symétrie centrale', sub: 'un demi-tour autour d’un point',
    body: `
      <p class="lede">L’image de <i>A</i> par la symétrie de centre <i>O</i> est le point <i>A</i>′ tel que <i>O</i> soit le <b>milieu</b> de [<i>AA</i>′]. En coordonnées, avec <i>O</i> à l’origine :</p>
      ${eq('(<i>x</i> ; <i>y</i>) ↦ (−<i>x</i> ; −<i>y</i>)')}
      <p>La figure montre pourquoi on parle de <b>demi-tour</b> : le drapeau tourne autour de <i>O</i>, et quand l’angle atteint 180° il est exactement à la place du symétrique. <i>A</i>${pt(M.A)} arrive en ${pt(M.apply(M.homo(-1), M.A))}.</p>
      <p>Contrairement à la symétrie axiale, la figure n’est <b>pas retournée</b> : elle a seulement tourné. Une figure est <b>symétrique par rapport à un point</b> si ce demi-tour la laisse en place, comme un parallélogramme autour de son centre.</p>
      ${china('中心对称, en 初三 (manuel 人教版 九年级上册, 23.2), présenté justement comme la rotation de 180°.')}`,
    cam: cam(), lit: 'img', scene: 'centre', look: {},
    fig: 'Symétrie de centre O',
  },
  {
    kicker: '21.2', title: 'La rotation', sub: 'tourner d’un angle autour d’un centre',
    body: `
      <p class="lede">La rotation de centre <i>O</i> et d’angle θ (dans le sens inverse des aiguilles d’une montre) envoie <i>A</i> sur le point <i>A</i>′ tel que</p>
      ${eq('<i>OA</i>′ = <i>OA</i>   et   angle <i>AOA</i>′ = θ')}
      <p><i>A</i>′ reste sur le cercle de centre <i>O</i> passant par <i>A</i> (l’arc rouge). Ici <i>OA</i> = √(1,8² + 1,6²) ≈ ${fr(M.norm(M.A), 3)}.</p>
      <table class="data">
        <tr><th>θ</th><th><i>A</i>′</th></tr>
        ${[30, 90, 150].map(d => `<tr><td>${d}°</td><td>${pt(M.apply(M.rot(M.rad(d)), M.A))}</td></tr>`).join('')}
      </table>
      <p>Pour θ = 90°, (<i>x</i> ; <i>y</i>) ↦ (−<i>y</i> ; <i>x</i>). Pour θ = 180°, on retrouve la symétrie centrale. Une rotation est une isométrie qui ne retourne pas les figures.</p>
      ${china('图形的旋转, en 初三 (九年级上册, 23.1) : 旋转中心 (le centre), 旋转角 (l’angle), et la propriété « 对应点到旋转中心的距离相等 », les points correspondants sont à égale distance du centre.')}`,
    cam: cam(), lit: 'img', scene: 'rot', look: {},
    fig: 'Rotation de centre O, d’angle θ',
  },
  {
    kicker: '21.3', title: 'L’homothétie', sub: 'agrandir et réduire depuis un point',
    body: `
      <p class="lede">L’homothétie de centre <i>O</i> et de rapport <i>k</i> (non nul) envoie <i>A</i> sur le point <i>A</i>′ tel que</p>
      ${eq('<i>OA</i>′ = <i>k</i> <i>OA</i>   (vecteurs)')}
      <p><i>O</i>, <i>A</i> et <i>A</i>′ sont alignés. Si <i>k</i> > 0, <i>A</i>′ est du même côté que <i>A</i> ; si <i>k</i> < 0, de l’autre côté de <i>O</i>, et la figure a fait un demi-tour.</p>
      <table class="data">
        <tr><th><i>k</i></th><th><i>A</i>′</th><th>aire de <i>F</i>′</th></tr>
        ${[2, 0.5, -1.5].map(k => `<tr><td>${fr(k, 1)}</td><td>${pt(M.apply(M.homo(k), M.A))}</td><td>${fr(k * k * M.area(M.F), 4)}</td></tr>`).join('')}
      </table>
      <p>Les longueurs sont multipliées par |<i>k</i>|, les aires par <i>k</i>² (le drapeau a une aire de ${fr(M.area(M.F))}). Les angles sont conservés : <i>F</i>′ est un <b>agrandissement</b> ou une <b>réduction</b> de <i>F</i>, et c’est la configuration de Thalès.</p>
      ${china('位似 (« semblables et placés »), en 初三 (九年级下册, 27.3), à la fin du chapitre sur les figures semblables 相似 ; 位似中心 est le centre, 位似比 le rapport.')}`,
    cam: cam(), lit: 'img', scene: 'homo', look: {},
    fig: 'Homothétie de centre O, de rapport k',
  },
  {
    kicker: '21.4', title: 'Deux symétries font une rotation', sub: 'composer les transformations',
    body: `
      <p class="lede">Faisons subir au drapeau la symétrie d’axe <i>d</i>₁ (il devient le drapeau gris, retourné), puis la symétrie d’axe <i>d</i>₂. Le drapeau <i>F</i>″ obtenu est <b>remis à l’endroit</b> :</p>
      ${eq('deux axes sécants en <i>O</i>, d’angle α  ⟹  rotation de centre <i>O</i> et d’angle 2α')}
      <p>L’arc rouge relie <i>A</i> à <i>A</i>″ : il mesure toujours le double de l’angle entre les axes. Pour α = 30°, la composée est la rotation de 60°.</p>
      <p>Deux retournements s’annulent, il ne reste qu’un mouvement. De même, deux symétries d’axes <b>parallèles</b> donnent une <b>translation</b> de longueur double de l’écart entre les axes.</p>
      ${china('le chapitre 23 du manuel de 初三 se termine par un projet, 课题学习 图案设计 (« concevoir un motif ») : créer des frises et des rosaces en combinant 平移 (translation), 轴对称 et 旋转.')}`,
    cam: cam(), lit: 'img', scene: 'compo', look: {},
    fig: 'Symétrie d’axe d₂ après celle d’axe d₁',
  },
];

export const PLATES = {
  board: { text: `Un repère orthonormé : les transformations de la page laissent l’origine O en place.`, facts: () => [['origine', 'O (0 ; 0)'], ['unité', '1 carreau']] },
  F: { text: `La figure de départ : un drapeau choisi sans axe de symétrie, pour qu’on voie s’il a été retourné.`, facts: () => [['A (pointe)', '(1,8 ; 1,6)'], ['B (pied)', '(0,6 ; 0,3)'], ['aire', fr(M.area(M.F))]] },
  img: { text: `L’image du drapeau par la transformation de la page.`,
    facts: s => {
      switch (s.scene) {
        case 'axe': return [['axe d', `${fr(M.deg(s.phi), 1)}°`], ['retournée', 'oui'], ['aire', fr(M.area(M.F))]];
        case 'centre': return [['angle', `${fr(M.deg(s.half), 1)}°`], ['retournée', 'non']];
        case 'rot': return [['θ', `${fr(M.deg(s.th), 1)}°`], ['retournée', 'non'], ['aire', fr(M.area(M.F))]];
        case 'homo': return [['k', fr(s.k)], ['longueurs', `× ${fr(Math.abs(s.k))}`], ['aire', fr(s.k * s.k * M.area(M.F), 3)]];
        case 'compo': return [['α', `${fr(M.deg(s.al), 1)}°`], ['rotation', `${fr(2 * M.deg(s.al), 1)}°`], ['retournée', 'non']];
      }
      return [];
    } },
  fig: { text: `Les traits de construction : axes, rayons issus du centre, arcs et segments [AA′].`, facts: () => [['centre', 'O'], ['A', '(1,8 ; 1,6)']] },
};
