// Chapitre 17, page par page. En Chine : 计数原理 (première, 选择性必修第三册, chapitre 6).
// En France : dénombrement en terminale (spécialité).
import * as M from './model.js';
import { ST } from './world.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (st, dx, y, dz, az, el, dist) => ({ target: [ST[st] + dx, y, dz], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 17 · Tle', title: 'Dénombrement', sub: 'le principe multiplicatif',
    body: `
      <p class="lede">Combien de chemins les plus courts mènent du coin bleu au coin rouge de ce quartier, en n’allant que vers la droite (D) ou vers le haut (H) ?</p>
      <p>Chaque chemin fait 7 pas : 4 vers la droite et 3 vers le haut. Il est entièrement décrit par la place des 3 « H » parmi les 7 pas. Il y en a</p>
      ${eq('C(7, 3) = 7 × 6 × 5 / (3 × 2 × 1) = 35')}
      <p>La figure les parcourt tous, l’un après l’autre.</p>
      <p><b>Principe multiplicatif</b> (分步乘法计数原理) : si une tâche se fait en deux étapes, avec <i>m</i> choix pour la première et <i>n</i> pour la seconde, il y a <i>m</i> × <i>n</i> façons de la faire. <b>Principe additif</b> (分类加法) : si on choisit entre deux catégories disjointes, on additionne.</p>
      ${china('计数原理, première année de lycée, avant les probabilités.')}`,
    cam: cam('grid', 2.6, 0, -2, -20, 48, 16), lit: 'grid', scene: 'grid', look: {},
    fig: 'Les 35 chemins du quartier',
  },
  {
    kicker: '17.1', title: 'Permutations', sub: 'ranger dans l’ordre',
    body: `
      <p class="lede">De combien de façons peut-on ranger 4 blocs différents dans 4 cases ? 4 choix pour la première case, puis 3, puis 2, puis 1 :</p>
      ${eq('4! = 4 × 3 × 2 × 1 = 24')}
      <p>Les blocs passent par les 24 rangements possibles. Plus généralement, il y a <i>n</i>! permutations de <i>n</i> objets.</p>
      <p>Si on ne remplit que <i>k</i> cases avec <i>n</i> objets, on obtient les <b>arrangements</b> :</p>
      ${eq('A(<i>n</i>, <i>k</i>) = <i>n</i>(<i>n</i> − 1)…(<i>n</i> − <i>k</i> + 1) = <i>n</i>! / (<i>n</i> − <i>k</i>)!')}
      <p>La factorielle grandit à toute vitesse : 10! = 3 628 800, et 52! (les ordres d’un jeu de cartes) a 68 chiffres.</p>`,
    cam: cam('perm', 2.25, 0.4, 0, -10, 30, 21), lit: 'perm', scene: 'perm', look: {},
    fig: '24 façons de ranger 4 blocs',
  },
  {
    kicker: '17.2', title: 'Combinaisons', sub: 'choisir sans ordre',
    body: `
      <p class="lede">Choisir 2 boules parmi 5, sans tenir compte de l’ordre : {1, 3} est le même choix que {3, 1}.</p>
      <p>Il y a 5 × 4 = 20 façons de les tirer l’une après l’autre, mais chaque paire est comptée 2 fois. D’où</p>
      ${eq('C(5, 2) = 20 / 2 = 10')}
      ${eq('C(<i>n</i>, <i>k</i>) = <i>n</i>! / (<i>k</i>! (<i>n</i> − <i>k</i>)!)')}
      <p>Les boules rouges montrent les 10 paires possibles. Choisir les <i>k</i> qu’on prend, c’est choisir les <i>n</i> − <i>k</i> qu’on laisse : C(<i>n</i>, <i>k</i>) = C(<i>n</i>, <i>n</i> − <i>k</i>).</p>
      <p>En Chine on écrit C<sub>5</sub><sup>2</sup> ; en France aussi on dit « 2 parmi 5 ».</p>`,
    cam: cam('comb', 2.4, 0.6, 0, 0, 22, 21), lit: 'comb', scene: 'comb', look: {},
    fig: '10 paires parmi 5 boules',
  },
  {
    kicker: '17.3', title: 'Le triangle de Yang Hui', sub: 'chaque case, la somme des deux au-dessus',
    body: `
      <p class="lede">Rangez les C(<i>n</i>, <i>k</i>) en triangle : ligne <i>n</i>, position <i>k</i>. Chaque nombre est la somme des deux nombres juste au-dessus (en bleu) :</p>
      ${eq('C(<i>n</i>, <i>k</i>) = C(<i>n</i> − 1, <i>k</i> − 1) + C(<i>n</i> − 1, <i>k</i>)')}
      <p>Pourquoi : parmi <i>n</i> objets, mettons-en un de côté. Soit on le prend, et il reste <i>k</i> − 1 objets à choisir parmi <i>n</i> − 1 ; soit on le laisse, et il en reste <i>k</i> à choisir parmi <i>n</i> − 1.</p>
      <p>Ce triangle est décrit en Chine par <b>Yang Hui</b> (杨辉) en 1261, qui l’attribue à Jia Xian (XIe siècle), quatre siècles avant Pascal. Les manuels chinois l’appellent 杨辉三角.</p>
      <p>La somme de la ligne <i>n</i> vaut 2<sup><i>n</i></sup> : c’est le nombre total de parties d’un ensemble à <i>n</i> éléments.</p>`,
    cam: cam('yang', 0, 0, -0.6, 0, 62, 27), lit: 'yang', scene: 'yang', look: {},
    fig: 'Le triangle de Yang Hui',
  },
  {
    kicker: '17.4', title: 'La formule du binôme', sub: '(a + b)ⁿ',
    body: `
      <p class="lede">Les lignes du triangle sont les coefficients de (<i>a</i> + <i>b</i>)<sup><i>n</i></sup> :</p>
      ${eq('(<i>a</i> + <i>b</i>)<sup><i>n</i></sup> = Σ<sub><i>k</i>=0</sub><sup><i>n</i></sup> C(<i>n</i>, <i>k</i>) <i>a</i><sup><i>n</i>−<i>k</i></sup> <i>b<sup>k</sup></i>')}
      <p>En développant (<i>a</i> + <i>b</i>)(<i>a</i> + <i>b</i>)…(<i>a</i> + <i>b</i>), on choisit <i>a</i> ou <i>b</i> dans chaque parenthèse ; le terme <i>a</i><sup><i>n</i>−<i>k</i></sup><i>b<sup>k</sup></i> apparaît autant de fois qu’il y a de façons de choisir les <i>k</i> parenthèses où l’on prend <i>b</i>.</p>
      <p>Le cube de côté <i>a</i> + <i>b</i> s’ouvre en 8 morceaux : 1 cube <i>a</i>³ (rouge), 3 pavés <i>a</i>²<i>b</i> (bleus), 3 pavés <i>ab</i>² (blancs) et 1 petit cube <i>b</i>³ (gris).</p>
      ${eq('(<i>a</i> + <i>b</i>)³ = <i>a</i>³ + 3<i>a</i>²<i>b</i> + 3<i>ab</i>² + <i>b</i>³')}
      ${china('二项式定理, avec le 杨辉三角 dans la même leçon.')}`,
    cam: cam('cube', 1.5, 1.4, -1.5, -35, 24, 25), lit: 'cube', scene: 'cube', look: {},
    fig: '(a + b)³ en huit morceaux',
  },
];

export const PLATES = {
  grid: { text: `Le quartier : 4 rues vers la droite, 3 vers le haut.`, facts: s => [['chemin', `${s.pi + 1} / 35`], ['pas', M.PATHS[s.pi].join(' ')]] },
  perm: { text: `Les quatre blocs dans leur rangement actuel.`, facts: s => [['rangement', `${s.qi + 1} / 24`], ['ordre', M.PERMS[s.qi].map(i => ['rouge', 'bleu', 'blanc', 'gris'][i]).join(', ')]] },
  comb: { text: `Les deux boules soulevées forment le choix actuel.`, facts: s => [['choix', `${s.ci + 1} / 10`], ['boules', M.COMB[s.ci].map(i => i + 1).join(' et ')]] },
  yang: { text: `La case rouge est la somme des deux cases bleues au-dessus.`, facts: s => { const [n, k] = M.CELLS[s.yi]; return [[`C(${n}, ${k})`, String(M.C(n, k))], ['= C(n−1, k−1) + C(n−1, k)', `${M.C(n - 1, k - 1)} + ${M.C(n - 1, k)}`]]; } },
  cube: { text: `Avec a = 2 et b = 1 : 8 + 3 × 4 + 3 × 2 + 1 = 27 = 3³.`, facts: () => [['a³', '8'], ['3a²b', '12'], ['3ab²', '6'], ['b³', '1'], ['total', '27 = (2 + 1)³']] },
};
