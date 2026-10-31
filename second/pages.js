// Chapitre 12, page par page. En Chine : 二次函数 (9e année, 九年级上册, chapitre 22) et 基本不等式
// (seconde, 必修第一册, chapitre 2). En France : seconde et première.
import * as M from './model.js';
import { X, Y, RX, RY } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const left = (dist = 30) => ({ target: [X(1), Y(1.6), 0], az: 0, el: 3, dist });
const china = s => `<p class="cn">Chine : ${s}</p>`;

export const PAGES = [
  {
    kicker: 'Chapitre 12 · 2nde', title: 'Le second degré', sub: 'la parabole y = ax²',
    body: `
      <p class="lede">Une <b>fonction du second degré</b> s’écrit <i>f</i>(<i>x</i>) = <i>ax</i>² + <i>bx</i> + <i>c</i> avec <i>a</i> ≠ 0. Sa courbe est une <b>parabole</b>.</p>
      <p>Commençons par la plus simple, <i>y</i> = <i>ax</i>². Le coefficient <i>a</i> varie sur la figure (la parabole grise est <i>y</i> = <i>x</i>²) :</p>
      <ul class="rules"><li>si <i>a</i> &gt; 0, la parabole est tournée vers le haut ; si <i>a</i> &lt; 0, vers le bas ;</li><li>plus |<i>a</i>| est grand, plus elle est étroite.</li></ul>
      <p>Elle est symétrique par rapport à l’axe des ordonnées, et son point le plus bas (ou le plus haut) est l’origine : le <b>sommet</b>.</p>
      ${china('二次函数, 9e année (初三), où ce chapitre occupe un trimestre entier.')}`,
    cam: left(), lit: 'para', scene: 'a', look: {},
    fig: 'y = ax², a variable',
  },
  {
    kicker: '12.1', title: 'Forme canonique', sub: 'déplacer la parabole',
    body: `
      <p class="lede">Toute parabole est une parabole <i>y</i> = <i>ax</i>² déplacée. En complétant le carré :</p>
      ${eq('<i>ax</i>² + <i>bx</i> + <i>c</i> = <i>a</i>(<i>x</i> − α)² + β')}
      <p>avec α = −<i>b</i>/(2<i>a</i>) et β = <i>f</i>(α). Le sommet est le point S(α ; β), et la droite <i>x</i> = α (en rouge) est l’axe de symétrie.</p>
      <p>Exemple : <i>x</i>² − 6<i>x</i> + 5 = (<i>x</i> − 3)² − 9 + 5 = (<i>x</i> − 3)² − 4. Sommet (3 ; −4).</p>
      <p>Sur la figure, la parabole <i>y</i> = (<i>x</i> − <i>h</i>)² + <i>k</i> glisse : c’est toujours la même forme, seul son sommet se déplace.</p>`,
    cam: left(), lit: 'para', scene: 'canon', look: {},
    fig: 'y = (x − h)² + k',
  },
  {
    kicker: '12.2', title: 'Le discriminant', sub: 'combien de racines ?',
    body: `
      <p class="lede">Les <b>racines</b> de <i>ax</i>² + <i>bx</i> + <i>c</i> sont les abscisses des points où la parabole coupe l’axe des <i>x</i>. Leur nombre dépend du <b>discriminant</b> :</p>
      ${eq('Δ = <i>b</i>² − 4<i>ac</i>')}
      <ul class="rules"><li>Δ &gt; 0 : deux racines, <i>x</i> = (−<i>b</i> ± √Δ) / (2<i>a</i>) ;</li><li>Δ = 0 : une racine double, le sommet touche l’axe ;</li><li>Δ &lt; 0 : aucune racine réelle, la parabole reste d’un côté.</li></ul>
      <p>Ici <i>f</i>(<i>x</i>) = <i>x</i>² − 2<i>x</i> + <i>c</i> et <i>c</i> varie : Δ = 4 − 4<i>c</i>. En montant, la parabole décolle de l’axe exactement quand <i>c</i> dépasse 1.</p>
      <p>Si les racines existent, leur somme vaut −<i>b</i>/<i>a</i> et leur produit <i>c</i>/<i>a</i> (relations de Viète, 韦达定理, très utilisées en Chine).</p>`,
    cam: left(), lit: 'para', scene: 'disc', look: {},
    fig: 'Δ positif, nul, négatif',
  },
  {
    kicker: '12.3', title: 'Signe et inéquations', sub: 'lire sur la parabole',
    body: `
      <p class="lede">Résoudre <i>x</i>² − 2<i>x</i> − 3 &lt; 0, c’est chercher où la parabole est <b>sous</b> l’axe des abscisses.</p>
      <p>Les racines sont −1 et 3, car <i>x</i>² − 2<i>x</i> − 3 = (<i>x</i> + 1)(<i>x</i> − 3). Comme <i>a</i> = 1 &gt; 0, la parabole est tournée vers le haut : elle est négative <b>entre</b> les racines.</p>
      ${eq('<i>x</i>² − 2<i>x</i> − 3 &lt; 0  ⇔  −1 &lt; <i>x</i> &lt; 3')}
      <p>Règle générale : un trinôme est du signe de <i>a</i> à l’extérieur des racines, et du signe contraire entre elles. Le point noir parcourt la courbe et annonce son signe.</p>`,
    cam: left(), lit: 'para', scene: 'sign', look: {},
    fig: 'Le segment rouge : f(x) < 0',
  },
  {
    kicker: '12.4', title: 'Optimiser', sub: 'le meilleur enclos',
    body: `
      <p class="lede">Avec 20 m de grillage, on fait un enclos rectangulaire. Si un côté mesure <i>x</i>, l’autre mesure 10 − <i>x</i> et l’aire vaut</p>
      ${eq('<i>A</i>(<i>x</i>) = <i>x</i>(10 − <i>x</i>) = −(<i>x</i> − 5)² + 25')}
      <p>C’est une parabole tournée vers le bas : son sommet donne le maximum. L’aire la plus grande, 25 m², est atteinte pour <i>x</i> = 5 : l’enclos est un <b>carré</b>.</p>
      <p>Regardez le rectangle se déformer pendant que le point rouge parcourt la courbe. C’est le type de « problème concret » (实际问题) qui termine chaque chapitre chinois.</p>`,
    cam: { target: [RX(8.2), RY(4.2), 0], az: 0, el: 3, dist: 30 }, lit: 'enclos', scene: 'opt', look: {},
    fig: 'Aire de l’enclos selon x',
  },
  {
    kicker: '12.5', title: 'Moyennes', sub: 'l’inégalité arithmético-géométrique',
    body: `
      <p class="lede">Pour deux nombres positifs <i>a</i> et <i>b</i>, la moyenne arithmétique dépasse toujours la moyenne géométrique :</p>
      ${eq('√(<i>ab</i>) ≤ (<i>a</i> + <i>b</i>)/2')}
      <p>Preuve en une ligne : (√<i>a</i> − √<i>b</i>)² ≥ 0, et on développe. L’égalité n’a lieu que si <i>a</i> = <i>b</i>.</p>
      <p>Preuve en une image : dans un demi-cercle de diamètre <i>a</i> + <i>b</i>, la hauteur au point de partage vaut √(<i>ab</i>) (triangle rectangle inscrit), et elle ne peut pas dépasser le rayon (<i>a</i> + <i>b</i>)/2. Elle l’atteint quand le point de partage est au milieu.</p>
      <p>C’est la même idée que l’enclos : à somme fixée, le produit est le plus grand quand les deux nombres sont égaux.</p>
      ${china('基本不等式 (« l’inégalité de base »), seconde, 必修第一册 chapitre 2. Elle sert à résoudre des problèmes de maximum sans dérivée.')}`,
    cam: { target: [RX(3), RY(1.8), 0], az: 0, el: 3, dist: 17 }, lit: 'amgm', scene: 'amgm', look: {},
    fig: 'Hauteur √(ab) ≤ rayon (a + b)/2',
  },
];

export const PLATES = {
  board: { text: `Le repère : une unité vaut un carreau.`, facts: () => [] },
  para: { text: `La parabole de la page, son sommet S et son axe de symétrie, ses racines en bleu quand elle coupe l’axe.`,
    facts: s => {
      if (s.scene === 'canon') { const [h, k] = s.hk; return [['sommet', `(${fr(h)} ; ${fr(k)})`], ['forme canonique', `(x − ${fr(h)})² + ${fr(k)}`]]; }
      if (s.scene === 'disc') { const r = M.roots(1, -2, s.c); return [['c', fr(s.c)], ['Δ = 4 − 4c', fr(M.delta(1, -2, s.c))], ['racines', r.length ? r.map(x => fr(x)).join(' et ') : 'aucune']]; }
      if (s.scene === 'sign') return [['x', fr(s.x)], ['f(x)', fr(M.g(s.x))], ['solutions de f(x) < 0', ']−1 ; 3[']];
      return [['a', fr(s.a)], ['ouverture', s.a > 0 ? 'vers le haut' : 'vers le bas']];
    } },
  enclos: { text: `Le rectangle de grillage, de périmètre 20 m, et la courbe de son aire.`, facts: s => [['x', `${fr(s.w)} m`], ['10 − x', `${fr(10 - s.w)} m`], ['aire', `${fr(M.area(s.w))} m²`], ['maximum', '25 m² pour x = 5']] },
  amgm: { text: `Le triangle inscrit dans le demi-cercle est rectangle ; sa hauteur h vérifie h² = ab.`, facts: s => { const q = M.amgm(s.sa); return [['a', fr(q.a)], ['b', fr(q.b)], ['√(ab)', fr(q.gm, 3)], ['(a + b)/2', fr(q.am, 3)]]; } },
};
