// Chapitre 22, page par page. En Chine : 二元一次方程组 et 三元一次方程组 (7e année, 初一, 七年级下册),
// avec 消元 (代入消元法, 加减消元法) ; le 方程术 des Neuf Chapitres ; 高斯消元 et 秩 à l'université.
// En France : systèmes 2 × 2 et déterminant en seconde, pivot de Gauss et rang en MPSI.
import * as M from './model.js';
import { X, Y, OX } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const board = (dist = 21) => ({ target: [X(22), Y(17), 0], az: 0, el: 3, dist });
const box = (az, el, dist) => ({ target: [OX, 1.5, 0], az, el, dist });

// une équation a x + b y + c z = d écrite à la française, coefficients nuls omis
export function eqText(P, vars = ['x', 'y', 'z']) {
  const n = vars.length, t = [], nice = v => fr(v, Math.abs(v - Math.round(v)) < 5e-3 ? 0 : 2);
  for (let i = 0; i < n; i++) {
    const a = Math.abs(P[i]) < 5e-3 ? 0 : P[i]; if (!a) continue;
    const m = Math.abs(a), c = Math.abs(m - 1) < 5e-3 ? '' : nice(m);
    t.push((t.length ? (a < 0 ? ' − ' : ' + ') : (a < 0 ? '−' : '')) + c + vars[i]);
  }
  const d = Math.abs(P[n]) < 5e-3 ? 0 : P[n];
  return `${t.join('') || '0'} = ${nice(d)}`;
}

export const PAGES = [
  {
    kicker: 'Chapitre 22 · 2nde', title: 'Systèmes d’équations', sub: 'des faisans et des lapins',
    body: `
      <p class="lede">« Dans une cage, des faisans et des lapins : 35 têtes en haut, 94 pattes en bas. Combien de chacun ? » C’est le problème 雉兔同笼 du <i>Sunzi suanjing</i> (孙子算经, vers le V<sup>e</sup> siècle).</p>
      <p>Avec <i>x</i> faisans (ou poulets) et <i>y</i> lapins, on écrit deux équations à deux inconnues :</p>
      ${eq('(1)  <i>x</i> + <i>y</i> = 35<br>(2)  2<i>x</i> + 4<i>y</i> = 94')}
      <p>Chaque équation est une <b>droite</b> du plan : la droite noire contient tous les couples qui ont 35 têtes, la bleue tous ceux qui ont 94 pattes. Le point noir essaie les couples de la droite (1) un par un : seul le point commun aux deux droites convient.</p>
      ${eq('<i>x</i> = 23, <i>y</i> = 12')}
      <p>23 poulets et 12 lapins : 23 × 2 + 12 × 4 = 46 + 48 = 94.</p>
      ${china('鸡兔同笼 est connu de tous les écoliers dès le primaire ; les systèmes 二元一次方程组 sont au programme de 7e année (初一, 七年级下册), deux ans avant la France.')}`,
    cam: board(), lit: 'lines', scene: 'poules', look: {},
    fig: 'Deux droites, un point commun',
  },
  {
    kicker: '22.1', title: 'Éliminer une inconnue', sub: 'substitution et combinaison',
    body: `
      <p class="lede">Résoudre un système, c’est se ramener à <b>une</b> équation à <b>une</b> inconnue : on élimine (消元).</p>
      <p><b>Substitution</b> (代入消元法) : (1) donne <i>y</i> = 35 − <i>x</i>, qu’on remplace dans (2) : 2<i>x</i> + 4(35 − <i>x</i>) = 94, soit −2<i>x</i> = −46.</p>
      <p><b>Combinaison</b> (加减消元法) : on ajoute des multiples des deux équations. Par exemple 4 × (1) − (2) donne 2<i>x</i> = 46, et 2 × (1) − (2) donne −2<i>y</i> = −24.</p>
      <p>Sur la figure, la droite rouge est α·(1) + β·(2) pour α et β qui varient. Elle <b>tourne autour de la solution</b> : toute combinaison des deux équations est vérifiée par (23 ; 12). L’élimination choisit les deux combinaisons les plus simples, la verticale <i>x</i> = 23 et l’horizontale <i>y</i> = 12.</p>
      ${eq('4·(1) − (2) :  2<i>x</i> = 46<br>2·(1) − (2) :  −2<i>y</i> = −24')}`,
    cam: board(), lit: 'comb', scene: 'elim', look: {},
    fig: 'α·(1) + β·(2) tourne autour de la solution',
  },
  {
    kicker: '22.2', title: 'Une, aucune ou une infinité', sub: 'le déterminant',
    body: `
      <p class="lede">Deux droites du plan sont sécantes, parallèles ou confondues. Un système de deux équations a donc <b>une</b> solution, <b>aucune</b> ou une <b>infinité</b>.</p>
      <p>Remplaçons (2) par 2<i>x</i> + <i>my</i> = 94 et faisons varier <i>m</i>. Le système</p>
      ${eq('<i>ax</i> + <i>by</i> = <i>c</i>,  <i>a′x</i> + <i>b′y</i> = <i>c′</i>')}
      <p>a une solution unique si et seulement si son <b>déterminant</b> <i>ab′</i> − <i>a′b</i> n’est pas nul. Ici il vaut <i>m</i> − 2 :</p>
      <ul class="rules"><li>pour <i>m</i> ≠ 2, une solution : <i>y</i> = 24/(<i>m</i> − 2), <i>x</i> = 35 − <i>y</i> ;</li><li>quand <i>m</i> s’approche de 2, le point s’enfuit hors du tableau ;</li><li>pour <i>m</i> = 2, les droites sont parallèles : 2<i>x</i> + 2<i>y</i> = 94 dirait 47 têtes, aucune solution ;</li><li>avec 2<i>x</i> + 2<i>y</i> = 70, les droites seraient confondues : une infinité de solutions.</li></ul>
      <p>C’est le déterminant de deux vecteurs directeurs vu en seconde : nul quand ils sont colinéaires.</p>`,
    cam: board(), lit: 'lines', scene: 'cas2', look: {},
    fig: 'det = m − 2',
  },
  {
    kicker: '22.3', title: 'Trois inconnues', sub: 'trois plans de l’espace',
    body: `
      <p class="lede">Dans l’espace, une équation <i>ax</i> + <i>by</i> + <i>cz</i> = <i>d</i> est un <b>plan</b>. Un système de trois équations à trois inconnues, c’est trois plans :</p>
      ${eq('(1)  <i>x</i> + <i>y</i> + <i>z</i> = 6<br>(2)  2<i>x</i> − <i>y</i> + <i>z</i> = 3<br>(3)  <i>x</i> + 2<i>y</i> − <i>z</i> = 2')}
      <p>Deux plans non parallèles se coupent selon une droite (en noir, celle de (1) et (2)) ; le troisième plan coupe cette droite en un point. Ici ce point est (1 ; 2 ; 3), seule solution du système.</p>
      <p>On le vérifie : 1 + 2 + 3 = 6, 2 − 2 + 3 = 3, 1 + 4 − 3 = 2.</p>
      <p>Comme en dimension 2, il y a une solution unique exactement quand le déterminant des coefficients n’est pas nul ; il vaut ici ${M.det3(M.P1, M.P2, M.P3)}.</p>
      ${china('三元一次方程组 fait suite aux systèmes à deux inconnues dès le 七年级下册 (初一) : « on élimine une inconnue pour revenir à deux ». Les plans viennent plus tard, avec la géométrie analytique de l’université.')}`,
    cam: box(128, 20, 21), lit: 'sol3', scene: 'trois', look: {},
    fig: 'Trois plans, un point commun',
  },
  {
    kicker: '22.4', title: 'Le pivot de Gauss', sub: 'le 方程术 des Neuf Chapitres',
    body: `
      <p class="lede">Méthode du pivot : on garde (1) et on s’en sert pour faire disparaître <i>x</i> des autres équations, puis on recommence avec <i>y</i>.</p>
      ${eq('(2) ← (2) − 2·(1) :  −3<i>y</i> − <i>z</i> = −9<br>(3) ← (3) − (1) :  <i>y</i> − 2<i>z</i> = −4<br>(3) ← 3·(3) + (2) :  −7<i>z</i> = −21')}
      <p>Le système est devenu <b>triangulaire</b> : <i>z</i> = 3, puis <i>y</i> = 2, puis <i>x</i> = 1, en remontant.</p>
      <p>Regardez les plans bouger : chaque opération remplace un plan par un autre qui passe <b>par le même point</b>. Les plans (2) et (3) deviennent parallèles à l’axe des <i>x</i> (l’inconnue <i>x</i> a disparu), puis (3) devient horizontal : <i>z</i> = 3.</p>
      ${china('le chapitre 8 des <i>Neuf Chapitres</i> (九章算术, vers le I<sup>er</sup> siècle) s’appelle 方程 : les coefficients sont posés en colonnes de baguettes à calcul, et la règle 遍乘直除 (« multiplier partout, soustraire directement ») est exactement ce pivot, dix-sept siècles avant Gauss. Liu Hui y ajoute en 263 les règles des nombres négatifs (正负术).')}`,
    cam: box(118, 16, 21), lit: 'sol3', scene: 'gauss', look: {},
    fig: 'Chaque étape garde le point (1 ; 2 ; 3)',
  },
  {
    kicker: '22.5', title: 'Quand les plans ne se croisent pas', sub: 'le rang',
    body: `
      <p class="lede">Si le déterminant est nul, les trois plans n’ont pas un seul point commun. Remplaçons (3) par</p>
      ${eq('3<i>x</i> + 2<i>z</i> = <i>k</i>')}
      <p>Son vecteur normal (3 ; 0 ; 2) est la somme de ceux de (1) et (2) : le déterminant est nul, et le plan (3) est parallèle à la droite commune à (1) et (2), de direction (2 ; 1 ; −3).</p>
      <ul class="rules"><li>pour <i>k</i> ≠ 9, les trois droites d’intersection sont parallèles et forment un <b>prisme</b> : aucune solution ;</li><li>pour <i>k</i> = 9, l’équation (3) est la somme (1) + (2) : les trois plans contiennent la même droite, <b>une infinité</b> de solutions.</li></ul>
      <p>Le pivot le révèle tout seul : il finit sur une ligne 0 = <i>k</i> − 9. Le nombre d’équations vraiment indépendantes s’appelle le <b>rang</b> du système, ici 2.</p>
      ${china('高斯消元 et 矩阵的秩 (rang d’une matrice) ouvrent le cours de 线性代数 en première année d’université, comme le chapitre « systèmes linéaires » de MPSI.')}`,
    cam: box(-63, 24, 21), lit: 'plan3', scene: 'rang', look: {},
    fig: 'Un prisme : aucune solution',
  },
];

const sys3 = P => P.map((q, i) => [`(${i + 1})`, eqText(q)]);
export const PLATES = {
  board: { text: `Le repère : x poulets en abscisse, y lapins en ordonnée.`, facts: () => [['une graduation', '10 animaux']] },
  lines: { text: `Les deux droites du système ; leur point commun est la solution.`, facts: s => s.scene === 'cas2'
    ? [['(1)', 'x + y = 35'], ['(2)', `2x + ${fr(s.m)}y = 94`], ['déterminant', fr(s.m - 2)]]
    : [['(1)', 'x + y = 35'], ['(2)', '2x + 4y = 94'], ['déterminant', String(M.det2(M.L1, M.L2))], ['solution', '(23 ; 12)']] },
  essai: { text: `Un couple de la droite (1) : 35 têtes, mais combien de pattes ?`, facts: s => { const x = Math.round(s.tx); return [['poulets', String(x)], ['lapins', String(35 - x)], ['pattes', String(M.feet(x))]]; } },
  comb: { text: `La combinaison α·(1) + β·(2), et les deux droites qu’on obtient en éliminant une inconnue.`, facts: s => [['α', fr(Math.cos(s.th))], ['β', fr(Math.sin(s.th))], ['équation', eqText(M.comb(s.th), ['x', 'y'])], ['passe par', '(23 ; 12)']] },
  box: { text: `La boîte 0 ≤ x, y, z ≤ 4 dans laquelle on dessine les plans.`, facts: () => [['côté', '4']] },
  plan1: { text: `Le plan (1), en gris.`, facts: () => [['équation', 'x + y + z = 6'], ['vecteur normal', '(1 ; 1 ; 1)']] },
  plan2: { text: `Le plan (2), en bleu.`, facts: s => [['équation', s.scene === 'gauss' ? eqText(M.gaussPlanes(s.g)[1]) : '2x − y + z = 3']] },
  plan3: { text: `Le plan (3), en rouge.`, facts: s => [['équation', s.scene === 'rang' ? `3x + 2z = ${fr(s.k)}` : s.scene === 'gauss' ? eqText(M.gaussPlanes(s.g)[2]) : 'x + 2y − z = 2']] },
  sol3: { text: `Le point commun aux trois plans, et la droite commune aux plans (1) et (2).`, facts: s => [...sys3(s.scene === 'gauss' ? M.gaussPlanes(s.g) : [M.P1, M.P2, M.P3]), ['solution', '(1 ; 2 ; 3)']] },
};
