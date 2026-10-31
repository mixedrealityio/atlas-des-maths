// Chapitre 2, page par page (programme de 1re spécialité : nombre dérivé, fonction dérivée, variations).
import * as M from './model.js';
import { X, YF, YD } from './world.js';
import { chart, sample, fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const top = (az, el, dist, dx = 0, dy = 0) => ({ target: [X(2) + dx, YF(1.7) + dy, 0], az, el, dist });
const both = (az, el, dist) => ({ target: [X(2), (YF(1.7) + YD(2)) / 2, 0], az, el, dist });
const T = M.tangentAt(M.A);

export const PAGES = [
  {
    kicker: 'Chapitre 2 · 1re', title: 'La dérivée', sub: 'la pente d’une courbe',
    body: `
      <p class="lede">Une droite a une pente : de combien elle monte quand on avance d’une unité. Une courbe, elle, monte plus ou moins vite selon l’endroit. La <b>dérivée</b> mesure cette pente, point par point.</p>
      <p>Sur le tableau, la courbe de</p>
      ${eq('<i>f</i>(<i>x</i>) = <i>x</i>³/3 − 2<i>x</i>² + 3<i>x</i> + 1')}
      <p>Le point <i>M</i> se promène dessus, accompagné de la droite rouge qui « colle » à la courbe en <i>M</i> : la <b>tangente</b>. Sa pente, affichée à côté de <i>M</i>, est le <b>nombre dérivé</b> de <i>f</i> en ce point.</p>
      <p>Quand la courbe monte, la pente est positive ; quand elle descend, négative ; au sommet d’une bosse, elle vaut 0.</p>
      <p class="hintline">Survolez la tangente pour arrêter le point. Cliquez pour la décomposer.</p>`,
    cam: top(0, 4, 34), lit: 'tangent', scene: 'walk', look: { tan: 1 },
    fig: 'Une courbe et sa tangente',
  },
  {
    kicker: '2.1', title: 'Le taux d’accroissement', sub: 'la pente entre deux points',
    body: `
      <p class="lede">Pour mesurer une pente, il faut deux points. Prenons <i>A</i> d’abscisse <i>a</i> = 0,5 et <i>M</i> un peu plus loin, d’abscisse <i>a</i> + <i>h</i>.</p>
      <p>La droite (<i>AM</i>) est une <b>sécante</b>. Sa pente est le <b>taux d’accroissement</b> de <i>f</i> entre <i>a</i> et <i>a</i> + <i>h</i> : la montée divisée par l’avancée.</p>
      ${eq('τ(<i>h</i>) = [<i>f</i>(<i>a</i> + <i>h</i>) − <i>f</i>(<i>a</i>)] / <i>h</i>')}
      <p>Sur la figure, le petit triangle gris montre l’avancée <i>h</i> (horizontale) et la montée <i>f</i>(<i>a</i> + <i>h</i>) − <i>f</i>(<i>a</i>) (verticale).</p>
      <p>Regardez <i>h</i> rétrécir : <i>M</i> glisse vers <i>A</i>, et la sécante tourne. Pour <i>h</i> grand elle descend même, alors que la courbe monte en <i>A</i> : une pente moyenne peut tromper.</p>`,
    cam: top(0, 4, 30, -0.4, 0.3), lit: 'secant', scene: 'secant', look: { sec: 1 },
    fig: 'La sécante (AM)',
  },
  {
    kicker: '2.2', title: 'Le nombre dérivé', sub: 'quand h tend vers 0',
    body: `
      <p class="lede">Quand <i>h</i> devient de plus en plus petit, le taux d’accroissement se rapproche d’un nombre fixe. Ce nombre, c’est le nombre dérivé de <i>f</i> en <i>a</i> :</p>
      ${eq('<i>f′</i>(<i>a</i>) = lim<sub><i>h</i> → 0</sub> [<i>f</i>(<i>a</i> + <i>h</i>) − <i>f</i>(<i>a</i>)] / <i>h</i>')}
      <div class="charts">${chart({ x0: 0, x1: 2.5, y0: -1, y1: 2, xlabel: 'h', ylabel: 'taux τ(h) → f′(0,5) = 1,25', h: 150,
        label: 'Le taux d’accroissement en fonction de h : il tend vers 1,25 quand h tend vers 0',
        series: [{ pts: sample(h => M.rate(M.A, h), 0.001, 2.5) }, { cls: 'trend', pts: [[0, M.df(M.A)], [2.5, M.df(M.A)]] }], cursors: ['rate'] })}</div>
      <p>Ici <i>f′</i>(0,5) = 1,25. La sécante devient la <b>tangente</b> en <i>A</i> (en rouge), la droite de pente <i>f′</i>(<i>a</i>) qui passe par <i>A</i> :</p>
      ${eq(`<i>y</i> = <i>f′</i>(<i>a</i>)(<i>x</i> − <i>a</i>) + <i>f</i>(<i>a</i>)`)}
      <p>Avec nos nombres : <i>y</i> = 1,25(<i>x</i> − 0,5) + ${fr(M.f(M.A), 3)}, soit <i>y</i> = 1,25<i>x</i> + ${fr(T.p, 3)}.</p>`,
    cam: top(0, 4, 26, -0.3, 0.3), lit: 'secant', scene: 'secant', look: { sec: 1, limit: 1 },
    fig: 'La sécante devient la tangente',
  },
  {
    kicker: '2.3', title: 'La fonction dérivée', sub: 'une pente pour chaque x',
    body: `
      <p class="lede">En chaque point, la courbe a une pente. En notant cette pente en fonction de <i>x</i>, on obtient une nouvelle fonction : la <b>fonction dérivée</b> <i>f′</i>.</p>
      <p>Sur le tableau du bas, le point rouge a pour hauteur la pente de la tangente au-dessus de lui. En se promenant, il dessine la courbe de <i>f′</i>.</p>
      <p>On la calcule avec les règles de dérivation, terme à terme :</p>
      <table class="data">
        <tr><th>fonction</th><th>dérivée</th></tr>
        <tr><td><i>x</i><sup><i>n</i></sup></td><td><i>n</i> <i>x</i><sup><i>n</i>−1</sup></td></tr>
        <tr><td><i>k</i> (constante)</td><td>0</td></tr>
        <tr><td><i>k</i> · <i>u</i></td><td><i>k</i> · <i>u′</i></td></tr>
        <tr><td><i>u</i> + <i>v</i></td><td><i>u′</i> + <i>v′</i></td></tr>
      </table>
      ${eq('<i>f′</i>(<i>x</i>) = <i>x</i>² − 4<i>x</i> + 3')}
      <p>Vérification : <i>f′</i>(0,5) = 0,25 − 2 + 3 = 1,25, le nombre trouvé à la page précédente.</p>`,
    cam: both(0, 4, 42), lit: 'deriv', scene: 'walk', look: { tan: 1, dboard: 1 },
    fig: 'La pente de f, reportée en bas',
  },
  {
    kicker: '2.4', title: 'Signe et variations', sub: 'lire f à partir de f′',
    body: `
      <p class="lede">Le signe de la dérivée donne le sens de variation de la fonction :</p>
      <ul class="rules"><li>si <i>f′</i> &gt; 0 sur un intervalle, <i>f</i> y est croissante ;</li><li>si <i>f′</i> &lt; 0, <i>f</i> y est décroissante ;</li><li>là où <i>f′</i> s’annule en changeant de signe, <i>f</i> a un extremum local.</li></ul>
      <p>Ici <i>f′</i>(<i>x</i>) = (<i>x</i> − 1)(<i>x</i> − 3) : elle s’annule en 1 et en 3, et elle est négative entre les deux.</p>
      <table class="data">
        <tr><th><i>x</i></th><th>−∞ … 1</th><th>1 … 3</th><th>3 … +∞</th></tr>
        <tr><td><i>f′</i>(<i>x</i>)</td><td>+</td><td>−</td><td>+</td></tr>
        <tr><td><i>f</i></td><td>↗ jusqu’à ${fr(M.f(1), 2)}</td><td>↘ jusqu’à ${fr(M.f(3), 0)}</td><td>↗</td></tr>
      </table>
      <p>Aux deux extremums, la tangente est horizontale : <i>f</i>(1) = 7/3 ≈ 2,33 est un maximum local, <i>f</i>(3) = 1 un minimum local.</p>`,
    cam: both(0, 6, 42), lit: 'extrema', scene: 'walk', look: { tan: 1, dboard: 1, var: 1 },
    fig: 'Tableau de variations',
  },
];

export const PLATES = {
  curve: { text: `La courbe représentative de f : l’ensemble des points (x ; f(x)). Elle monte jusqu’en x = 1, descend jusqu’en x = 3, puis remonte.`,
    facts: () => [['f(0)', '1'], ['f(1)', '7/3 ≈ 2,33'], ['f(3)', '1'], ['f(4)', `${fr(M.f(4), 2)}`]] },
  tangent: { text: `La tangente en M est la droite qui passe par M avec la pente f′(x<sub>M</sub>). Près de M, la courbe et sa tangente se confondent presque : c’est pour cela qu’on dit que la dérivée mesure la pente de la courbe.`,
    facts: s => { const x = s.x, t = M.tangentAt(x); return [['x<sub>M</sub>', fr(x)], ['f(x<sub>M</sub>)', fr(M.f(x))], ['pente f′(x<sub>M</sub>)', fr(M.df(x))], ['tangente', `y = ${fr(t.m)}x ${t.p < 0 ? '−' : '+'} ${fr(Math.abs(t.p))}`]]; } },
  secant: { text: `La pente de la sécante est la montée Δy divisée par l’avancée h : les deux côtés gris du petit triangle. Arrêtez le temps pour lire les valeurs.`,
    facts: s => { const h = s.h, dy = M.f(M.A + h) - M.f(M.A); return [['a', '0,5'], ['h', fr(h, 3)], ['Δy = f(a + h) − f(a)', fr(dy, 3)], ['τ = Δy / h', fr(dy / h, 3)], ['f′(a)', '1,25']]; } },
  deriv: { text: `Chaque point de cette courbe est la pente d’une tangente de la courbe du haut. Elle passe sous l’axe entre 1 et 3, là où f descend.`,
    facts: s => [['x', fr(s.x)], ['f′(x) = x² − 4x + 3', fr(M.df(s.x))], ['f′ s’annule en', '1 et 3'], ['minimum de f′', 'f′(2) = −1']] },
  extrema: { text: `En x = 1 et x = 3, la tangente est horizontale : f′ = 0. Mais f′ = 0 ne suffit pas : il faut que f′ change de signe pour avoir un extremum (pensez à x³ en 0).`,
    facts: () => [['f′(1)', '0'], ['f(1) maximum local', '7/3 ≈ 2,33'], ['f′(3)', '0'], ['f(3) minimum local', '1']] },
};
