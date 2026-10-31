// Chapitre 10, page par page (programme de MPSI : formule de Taylor-Young, développements limités usuels, limites).
import * as M from './model.js';
import { X, Y } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const cam = (dist, ty = 1.3) => ({ target: [0, Y(ty), 0], az: 0, el: 3, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 10 · MPSI', title: 'Développements limités', sub: 'approcher par une droite',
    body: `
      <p class="lede">Près de 0, la courbe de l’exponentielle ressemble à sa tangente <i>y</i> = 1 + <i>x</i>. C’est le <b>développement limité à l’ordre 1</b> :</p>
      ${eq('e<sup><i>x</i></sup> = 1 + <i>x</i> + o(<i>x</i>)')}
      <p>Le terme o(<i>x</i>), « petit o de <i>x</i> », désigne une erreur négligeable devant <i>x</i> : divisée par <i>x</i>, elle tend vers 0 quand <i>x</i> tend vers 0.</p>
      <p>Mais l’approximation se dégrade vite : en <i>x</i> = 1, la droite donne 2 alors que e ≈ 2,718. Pour faire mieux, on va courber le polynôme.</p>`,
    cam: cam(34), lit: 'poly', scene: 'exp1', look: { exp: 1 }, key: 'exp', fixed: 1,
    fig: 'e^x et sa tangente en 0',
  },
  {
    kicker: '10.1', title: 'Taylor-Young', sub: 'des polynômes de plus en plus collants',
    body: `
      <p class="lede">Le polynôme de Taylor d’ordre <i>n</i> en 0 est le polynôme de degré <i>n</i> qui a, en 0, la même valeur et les mêmes <i>n</i> premières dérivées que <i>f</i> :</p>
      ${eq('<i>T<sub>n</sub></i>(<i>x</i>) = Σ<sub><i>k</i>=0</sub><sup><i>n</i></sup> <i>f</i><sup>(<i>k</i>)</sup>(0) <i>x<sup>k</sup></i> / <i>k</i>!')}
      <p>Pour l’exponentielle, toutes les dérivées valent 1 en 0. Regardez l’ordre monter de 0 à 6 : la courbe rouge épouse la noire de plus en plus loin.</p>
      ${eq('e<sup><i>x</i></sup> = 1 + <i>x</i> + <i>x</i>²/2 + … + <i>x<sup>n</sup></i>/<i>n</i>! + o(<i>x<sup>n</sup></i>)')}
      <p><b>Théorème de Taylor-Young.</b> Si <i>f</i> est de classe C<sup><i>n</i></sup> près de 0, alors <i>f</i>(<i>x</i>) = <i>T<sub>n</sub></i>(<i>x</i>) + o(<i>x<sup>n</sup></i>).</p>`,
    cam: cam(34), lit: 'poly', scene: 'exp', look: { exp: 1 }, key: 'exp',
    fig: 'Les polynômes de Taylor de exp',
  },
  {
    kicker: '10.2', title: 'Les DL usuels', sub: 'cos et sin',
    body: `
      <p class="lede">Le cosinus est pair : son DL ne contient que des puissances paires. Ici l’ordre monte de 0 à 8 et le polynôme rouge s’enroule autour de la courbe.</p>
      ${eq('cos <i>x</i> = 1 − <i>x</i>²/2 + <i>x</i>⁴/24 − … + o(<i>x</i><sup>2<i>n</i></sup>)')}
      ${eq('sin <i>x</i> = <i>x</i> − <i>x</i>³/6 + <i>x</i>⁵/120 − … + o(<i>x</i><sup>2<i>n</i>+1</sup>)')}
      <table class="data">
        <tr><th>fonction</th><th>DL en 0</th></tr>
        <tr><td>e<sup><i>x</i></sup></td><td>1 + <i>x</i> + <i>x</i>²/2 + <i>x</i>³/6</td></tr>
        <tr><td>ln(1 + <i>x</i>)</td><td><i>x</i> − <i>x</i>²/2 + <i>x</i>³/3</td></tr>
        <tr><td>1/(1 − <i>x</i>)</td><td>1 + <i>x</i> + <i>x</i>² + <i>x</i>³</td></tr>
        <tr><td>(1 + <i>x</i>)<sup>α</sup></td><td>1 + α<i>x</i> + α(α − 1)<i>x</i>²/2</td></tr>
      </table>`,
    cam: cam(34, 0.6), lit: 'poly', scene: 'cos', look: { cos: 1 }, key: 'cos',
    fig: 'Les polynômes de Taylor de cos',
  },
  {
    kicker: '10.3', title: 'Calculer une limite', sub: 'sin x / x',
    body: `
      <p class="lede">La limite de sin <i>x</i> / <i>x</i> en 0 est une forme « 0/0 ». Le DL la lève immédiatement :</p>
      ${eq('sin <i>x</i> / <i>x</i> = (<i>x</i> − <i>x</i>³/6 + o(<i>x</i>³)) / <i>x</i> = 1 − <i>x</i>²/6 + o(<i>x</i>²) → 1')}
      <p>Sur la figure, sin <i>x</i> / <i>x</i> est la pente de la corde bleue entre 0 et le point (<i>x</i> ; sin <i>x</i>). Quand le point glisse vers 0, la corde se couche sur la tangente <i>y</i> = <i>x</i>, de pente 1.</p>
      <p>Le DL dit même à quelle vitesse : l’écart à 1 vaut environ <i>x</i>²/6. Pour <i>x</i> = 0,1, sin <i>x</i> / <i>x</i> ≈ 0,99833.</p>`,
    cam: { target: [X(0.6), Y(0.3), 0], az: 0, el: 3, dist: 20 }, lit: 'lim', scene: 'sin', look: { sin: 1, lim: 1 }, key: 'sin',
    fig: 'La pente de la corde tend vers 1',
  },
];

export const PLATES = {
  board: { text: `Le repère, centré sur 0 : un développement limité ne parle que de ce qui se passe près de 0.`, facts: () => [] },
  f: { text: `La fonction qu’on approche, en noir.`, facts: s => [['fonction', s.key], ['f(1)', fr(M.FN[s.key].f(1), 4)]] },
  poly: { text: `Le polynôme de Taylor en rouge. Il a le même contact avec la courbe en 0 jusqu’à l’ordre n.`,
    facts: s => [['ordre n', String(s.n)], ['Tₙ(x)', M.fmtPoly(s.key, s.n)], ['Tₙ(1)', fr(M.taylor(s.key, s.n)(1), 4)], ['f(1)', fr(M.FN[s.key].f(1), 4)]] },
  lim: { text: `La corde bleue relie l’origine au point (x ; sin x). Sa pente est sin x / x.`,
    facts: s => [['x', fr(s.x, 3)], ['sin x / x', fr(Math.sin(s.x) / s.x, 5)], ['1 − x²/6', fr(1 - s.x * s.x / 6, 5)]] },
};
