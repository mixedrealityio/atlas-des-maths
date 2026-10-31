// Chapitre 14, page par page. En Chine : 指数函数与对数函数 (seconde, 必修第一册, chapitre 4).
// En France : exponentielle en première, logarithme en terminale.
import * as M from './model.js';
import { X, Y, RULE } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const board = (dist = 32) => ({ target: [X(0.6), Y(2.6), 0], az: 0, el: 3, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 14 · 2nde', title: 'Exponentielle', sub: 'doubler à chaque pas',
    body: `
      <p class="lede">Une quantité qui <b>double</b> à chaque unité de temps suit la fonction <i>x</i> ↦ 2<sup><i>x</i></sup>. Comparez-la à une croissance régulière, <i>y</i> = 2<i>x</i> + 1 (en gris).</p>
      <p>Au début la droite est devant. Mais l’exponentielle finit toujours par la dépasser, puis par la distancer de plus en plus vite : 2<sup>10</sup> ≈ 1 000, 2<sup>20</sup> ≈ 1 000 000.</p>
      ${eq('2<sup><i>x</i>+1</sup> = 2 × 2<sup><i>x</i></sup>')}
      <p>Les puissances s’étendent à tous les réels : 2<sup>0</sup> = 1, 2<sup>−1</sup> = 1/2, 2<sup>1/2</sup> = √2. Et les règles restent les mêmes : <i>a</i><sup><i>x</i>+<i>y</i></sup> = <i>a<sup>x</sup></i> × <i>a<sup>y</sup></i>.</p>
      ${china('指数函数, seconde, avec 对数函数 dans le même chapitre.')}`,
    cam: board(), lit: 'curves', scene: 'grow', look: {},
    fig: '2^x dépasse 2x + 1',
  },
  {
    kicker: '14.1', title: 'La famille aˣ', sub: 'selon la base',
    body: `
      <p class="lede">Pour chaque base <i>a</i> &gt; 0 (avec <i>a</i> ≠ 1), la fonction <i>x</i> ↦ <i>a<sup>x</sup></i> est une <b>fonction exponentielle</b>. Sur la figure, <i>a</i> varie de 0,3 à 3.</p>
      <ul class="rules"><li>toutes passent par le point (0 ; 1), puisque <i>a</i><sup>0</sup> = 1 ;</li><li>si <i>a</i> &gt; 1 elle croît, si 0 &lt; <i>a</i> &lt; 1 elle décroît ;</li><li>elle reste strictement positive : sa courbe ne touche jamais l’axe des <i>x</i>.</li></ul>
      <p>La courbe grise est celle de (1/<i>a</i>)<sup><i>x</i></sup> = <i>a</i><sup>−<i>x</i></sup> : les deux sont symétriques par rapport à l’axe des ordonnées.</p>`,
    cam: board(), lit: 'curves', scene: 'family', look: {},
    fig: 'aˣ et (1/a)ˣ',
  },
  {
    kicker: '14.2', title: 'Le logarithme', sub: 'l’exposant qu’il faut',
    body: `
      <p class="lede">Combien de fois faut-il doubler pour atteindre 8 ? Trois fois, car 2³ = 8. On écrit log₂ 8 = 3.</p>
      ${eq('<i>y</i> = log<sub><i>a</i></sub> <i>x</i>  ⇔  <i>a<sup>y</sup></i> = <i>x</i>')}
      <p>Le logarithme est la <b>fonction réciproque</b> de l’exponentielle. Sa courbe (en bleu) est la symétrique de celle de 2<sup><i>x</i></sup> par rapport à la droite <i>y</i> = <i>x</i> : le point (<i>t</i> ; 2<sup><i>t</i></sup>) et le point (2<sup><i>t</i></sup> ; <i>t</i>) se répondent de part et d’autre.</p>
      <p>Il n’est défini que pour <i>x</i> &gt; 0, vaut 0 en 1, et croît très lentement : log₂ 1 000 000 ≈ 20.</p>`,
    cam: board(), lit: 'curves', scene: 'log', look: {},
    fig: '2ˣ et log₂ x, symétriques',
  },
  {
    kicker: '14.3', title: 'Multiplier en additionnant', sub: 'la règle à calcul',
    body: `
      <p class="lede">La propriété fondamentale du logarithme transforme les produits en sommes :</p>
      ${eq('log(<i>xy</i>) = log <i>x</i> + log <i>y</i>')}
      <p>Sur une <b>règle à calcul</b>, chaque nombre <i>v</i> est gravé à la distance log<sub>10</sub> <i>v</i> du bord. Faire glisser la réglette de log <i>a</i>, c’est ajouter des longueurs ; on lit en face de 1,8 sur la réglette le produit <i>a</i> × 1,8 sur la règle.</p>
      <p>Jusqu’aux calculatrices des années 1970, ingénieurs et scientifiques calculaient ainsi, avec des tables de logarithmes pour plus de précision.</p>
      <p>Autres règles : log(<i>x</i>/<i>y</i>) = log <i>x</i> − log <i>y</i>, log(<i>x<sup>n</sup></i>) = <i>n</i> log <i>x</i>, et le changement de base log<sub><i>a</i></sub> <i>x</i> = ln <i>x</i> / ln <i>a</i>.</p>`,
    cam: { target: [RULE.x0 + RULE.L / 2 + 0.6, RULE.y + 0.2, 0.3], az: 0, el: 14, dist: 30 }, lit: 'rule', scene: 'rule', look: {},
    fig: 'Une règle à calcul',
  },
  {
    kicker: '14.4', title: 'Le nombre e', sub: 'la base naturelle',
    body: `
      <p class="lede">Parmi toutes les exponentielles, une seule a une tangente de pente exactement 1 au point (0 ; 1) : celle de base <b>e</b> ≈ 2,718 (en rouge).</p>
      <p>La pente de <i>a<sup>x</sup></i> en 0 vaut ln <i>a</i> : environ 0,69 pour 2, et 1,10 pour 3. Le nombre e est entre les deux.</p>
      ${eq('(e<sup><i>x</i></sup>)′ = e<sup><i>x</i></sup>    ln = log<sub>e</sub>')}
      <p>On le retrouve aussi comme limite des intérêts composés :</p>
      <table class="data"><tr><th><i>n</i></th><th>(1 + 1/<i>n</i>)<sup><i>n</i></sup></th></tr>${[1, 10, 100, 1000, 100000].map(n => `<tr><td>${n}</td><td>${fr(M.eSeq(n), 5)}</td></tr>`).join('')}</table>`,
    cam: board(28), lit: 'curves', scene: 'e', look: {},
    fig: 'Pentes en 0 : ln 2, 1, ln 3',
  },
];

export const PLATES = {
  board: { text: `Le repère des courbes.`, facts: () => [] },
  curves: { text: `Les courbes de la page.`, facts: s => {
    switch (s.scene) {
      case 'grow': return [['x', fr(s.x)], ['2^x', fr(2 ** s.x)], ['2x + 1', fr(2 * s.x + 1)]];
      case 'family': return [['a', fr(s.a)], ['a^1', fr(s.a)], ['a^(−1)', fr(1 / s.a)]];
      case 'log': return [['t', fr(s.t)], ['2^t', fr(2 ** s.t)], ['log₂(2^t)', fr(s.t)]];
      case 'e': return M.BASES.map((a, i) => [`pente de ${['2', 'e', '3'][i]}^x en 0`, fr(M.slope0(a), 4)]);
    }
    return [];
  } },
  rule: { text: `La réglette du haut a glissé de log a. Le 1 de la réglette est au-dessus de a ; sous 1,8, on lit a × 1,8.`,
    facts: s => [['a', fr(s.s)], ['log a + log 1,8', `${fr(Math.log10(s.s), 3)} + ${fr(Math.log10(1.8), 3)}`], ['= log(a × 1,8)', fr(Math.log10(s.s * 1.8), 3)], ['a × 1,8', fr(s.s * 1.8)]] },
};
