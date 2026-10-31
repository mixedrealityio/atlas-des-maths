// Chapitre 8, page par page (programme de terminale spécialité : intégrale, sommes de Riemann, primitives).
import * as M from './model.js';
import { X, YT, YB } from './world.js';
import { chart, fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const top = dist => ({ target: [X(2), YT(1.6), 0], az: 0, el: 4, dist });
const both = dist => ({ target: [X(2), (YT(1.6) + YB(3.4)) / 2, 0], az: 0, el: 4, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 8 · Terminale', title: 'L’intégrale', sub: 'l’aire sous une courbe',
    body: `
      <p class="lede">La fonction <i>f</i>(<i>x</i>) = <i>x</i>²/2 − 2<i>x</i> + 3 est positive. Entre <i>x</i> = 0 et <i>x</i> = 4, sa courbe, l’axe des abscisses et les deux bornes délimitent un domaine. Son aire est l’<b>intégrale</b> de <i>f</i> de 0 à 4 :</p>
      ${eq('∫<sub>0</sub><sup>4</sup> <i>f</i>(<i>x</i>) d<i>x</i>')}
      <p>L’unité d’aire est le rectangle de 1 sur 1 du repère. Le « d<i>x</i> » rappelle d’où vient l’idée : une somme de bandes très fines, de largeur d<i>x</i> et de hauteur <i>f</i>(<i>x</i>).</p>
      <p>Ici l’aire vaut exactement 20/3 ≈ 6,667 unités. Les pages suivantes montrent comment on l’obtient.</p>`,
    cam: top(26), lit: 'area', scene: 'area', look: {},
    fig: 'L’aire sous la courbe',
  },
  {
    kicker: '8.1', title: 'Des rectangles', sub: 'de plus en plus fins',
    body: `
      <p class="lede">Découpons [0 ; 4] en <i>n</i> bandes égales et remplaçons chaque bande par un rectangle dont la hauteur est la valeur de <i>f</i> à gauche.</p>
      ${eq('<i>S<sub>n</sub></i> = (4/<i>n</i>) × [<i>f</i>(<i>x</i>₀) + <i>f</i>(<i>x</i>₁) + … + <i>f</i>(<i>x</i><sub><i>n</i>−1</sub>)]')}
      <p>Le nombre de rectangles double : 2, 4, 8 … 64. Ils débordent ou laissent des trous, mais de moins en moins.</p>
      <div class="charts">${chart({ x0: 0, x1: 6, y0: 5, y1: 9, xlabel: 'doublements (2, 4, 8 … 64 rectangles)', ylabel: 'somme Sₙ → 20/3', h: 140,
        label: 'Les sommes de rectangles se rapprochent de l’aire exacte quand le nombre de rectangles double',
        series: [{ pts: M.STEPS.map((n, k) => [k + 0.5, M.leftSum(n)]) }, { cls: 'trend', pts: [[0, M.EXACT], [6, M.EXACT]] }],
        marks: M.STEPS.map((n, k) => [k + 0.5, M.leftSum(n), '', 0, 0]), cursors: ['sum'] })}</div>
      <p>Quand <i>n</i> tend vers l’infini, <i>S<sub>n</sub></i> tend vers l’aire. C’est la définition de l’intégrale.</p>`,
    cam: top(26), lit: 'area', scene: 'riemann', look: { riemann: 1 },
    fig: 'Des sommes de rectangles',
  },
  {
    kicker: '8.2', title: 'La primitive', sub: 'le théorème fondamental',
    body: `
      <p class="lede">Faisons avancer la borne de droite : l’aire de 0 à <i>x</i> est une fonction de <i>x</i>, notée <i>F</i>. Sa courbe s’inscrit sur le tableau du bas.</p>
      <p>Quand <i>x</i> avance d’un petit pas h, l’aire grandit d’une bande fine d’environ <i>f</i>(<i>x</i>) × h. Donc la vitesse à laquelle <i>F</i> grandit, c’est <i>f</i> :</p>
      ${eq('<i>F′</i>(<i>x</i>) = <i>f</i>(<i>x</i>)')}
      <p><i>F</i> est une <b>primitive</b> de <i>f</i>. Là où <i>f</i> est grande, <i>F</i> monte vite ; autour de <i>x</i> = 2, où <i>f</i> est la plus basse, <i>F</i> monte plus lentement.</p>
      <p>Ici <i>F</i>(<i>x</i>) = <i>x</i>³/6 − <i>x</i>² + 3<i>x</i> : dérivez-la, on retrouve bien <i>f</i>.</p>`,
    cam: both(40), lit: 'prim', scene: 'prim', look: { prim: 1 },
    fig: 'L’aire accumulée F(x)',
  },
  {
    kicker: '8.3', title: 'Calculer', sub: 'F(b) − F(a)',
    body: `
      <p class="lede">Pour calculer une intégrale, on n’additionne pas de rectangles : on cherche une primitive <i>F</i> et on fait une soustraction.</p>
      ${eq('∫<sub><i>a</i></sub><sup><i>b</i></sup> <i>f</i>(<i>x</i>) d<i>x</i> = <i>F</i>(<i>b</i>) − <i>F</i>(<i>a</i>)')}
      <p>Avec <i>a</i> = 1 et <i>b</i> = 3 : <i>F</i>(3) = 4,5 et <i>F</i>(1) = 13/6, donc</p>
      ${eq('∫<sub>1</sub><sup>3</sup> <i>f</i>(<i>x</i>) d<i>x</i> = 4,5 − 13/6 = 7/3 ≈ 2,333')}
      <p>Sur le tableau du bas, c’est la hauteur du trait rouge : la montée de <i>F</i> entre 1 et 3. Toutes les primitives de <i>f</i> diffèrent d’une constante, qui disparaît dans la soustraction.</p>`,
    cam: both(40), lit: 'area', scene: 'ab', look: { prim: 1, ab: 1 },
    fig: 'L’aire de 1 à 3',
  },
];

export const PLATES = {
  curve: { text: `La courbe de f, une parabole tournée vers le haut, de minimum f(2) = 1.`, facts: () => [['f(0)', '3'], ['f(2)', '1'], ['f(4)', '3']] },
  area: { text: `Les rectangles de papier rouge. Leur aire totale est affichée au milieu ; arrêtez le temps pour la comparer à l’aire exacte.`,
    facts: s => [['rectangles', String(s.page === 'riemann' ? s.n : 64)], ['somme', fr(s.page === 'riemann' ? M.leftSum(s.n) : M.EXACT, 4)], ['aire exacte 20/3', fr(M.EXACT, 4)]] },
  prim: { text: `Chaque point bleu a pour hauteur l’aire rouge à sa verticale. La pente de cette courbe en x est la hauteur f(x) de la courbe du haut.`,
    facts: s => [['x', fr(s.x)], ['F(x)', fr(M.F(s.x), 3)], ['F′(x) = f(x)', fr(M.f(s.x), 3)]] },
};
