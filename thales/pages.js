// Chapitre 4, page par page (programme de 3e : le théorème de Thalès et sa réciproque).
import * as M from './model.js';
import { ST } from './world.js';
import { chart, sample, fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const cam = (st, du, dv, az, el, dist) => ({ target: [ST[st] + du, 0, -dv], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 4 · 3e', title: 'Thalès', sub: 'une parallèle qui glisse',
    body: `
      <p class="lede">Dans le triangle <i>ABC</i>, le point <i>M</i> glisse sur [<i>AB</i>] et <i>N</i> sur [<i>AC</i>], de sorte que la droite (<i>MN</i>) reste <b>parallèle</b> à (<i>BC</i>).</p>
      <p>Quand <i>M</i> parcourt une certaine fraction du chemin de <i>A</i> vers <i>B</i>, <i>N</i> parcourt <b>la même fraction</b> de <i>A</i> vers <i>C</i>, et [<i>MN</i>] mesure cette même fraction de [<i>BC</i>].</p>
      <p><b>Théorème de Thalès.</b> Si <i>M</i> ∈ (<i>AB</i>), <i>N</i> ∈ (<i>AC</i>) et (<i>MN</i>) // (<i>BC</i>), alors</p>
      ${eq('<i>AM</i>/<i>AB</i> = <i>AN</i>/<i>AC</i> = <i>MN</i>/<i>BC</i>')}
      <p>Le compteur en bas à droite calcule les trois rapports en direct : ils restent égaux à chaque instant.</p>
      <p class="hintline">Survolez le triangle pour arrêter la droite et lire les longueurs.</p>`,
    cam: cam('slide', 2, 3, 0, 62, 34), lit: 'tri', scene: 'slide', look: {},
    fig: 'Le triangle ABC et la droite (MN)',
  },
  {
    kicker: '4.1', title: 'Agrandir, réduire', sub: 'le petit triangle est une copie',
    body: `
      <p class="lede">Le triangle rouge <i>AMN</i> a les mêmes angles que <i>ABC</i> : c’est une <b>réduction</b> de rapport <i>k</i> = <i>AM</i>/<i>AB</i>.</p>
      <p>Toutes ses longueurs sont multipliées par <i>k</i>. Mais son aire est multipliée par <i>k</i>² : quand les longueurs sont divisées par 2, l’aire est divisée par 4.</p>
      <div class="charts">${chart({ x0: 0, x1: 1, y0: 0, y1: 1, xlabel: 'rapport k', ylabel: 'longueurs × k, aire × k²', h: 150,
        label: 'Le rapport des longueurs k et celui des aires k carré, en fonction de k',
        series: [{ pts: [[0, 0], [1, 1]], tag: [0.62, 0.66, 'longueurs'] }, { cls: 'trend', pts: sample(k => k * k, 0, 1), tag: [0.7, 0.38, 'aires'] }], cursors: ['len', 'area'] })}</div>
      <p>Dans l’espace, c’est le cube : les volumes d’une réduction de rapport <i>k</i> sont multipliés par <i>k</i>³.</p>`,
    cam: cam('slide', 2, 3, 12, 56, 34), lit: 'tri', scene: 'slide', look: { red: 1 },
    fig: 'Le triangle AMN, réduction de ABC',
  },
  {
    kicker: '4.2', title: 'Le papillon', sub: 'de l’autre côté du sommet',
    body: `
      <p class="lede">Le théorème marche aussi quand <i>M</i> et <i>N</i> sont de l’autre côté de <i>A</i>, sur les prolongements des côtés : la figure ressemble alors à un papillon.</p>
      ${eq('<i>AM</i>/<i>AB</i> = <i>AN</i>/<i>AC</i> = <i>MN</i>/<i>BC</i>')}
      <p>Ici <i>A</i>, <i>B</i>, <i>M</i> sont alignés, ainsi que <i>A</i>, <i>C</i>, <i>N</i>, et (<i>MN</i>) // (<i>BC</i>). Le triangle <i>AMN</i> est un triangle <i>ABC</i> réduit puis retourné d’un demi-tour autour de <i>A</i>.</p>
      <p>Un piège classique : bien écrire les rapports dans le même ordre, les petits côtés (ceux du triangle <i>AMN</i>) en haut.</p>`,
    cam: cam('butterfly', 2, 1.8, 0, 64, 44), lit: 'fly', scene: 'butterfly', look: {},
    fig: 'La configuration papillon',
  },
  {
    kicker: '4.3', title: 'La réciproque', sub: 'prouver que deux droites sont parallèles',
    body: `
      <p class="lede">Ici <i>N</i> est fixé au point où <i>AN</i>/<i>AC</i> = 0,6, et <i>M</i> bouge. La droite (<i>MN</i>) n’est parallèle à (<i>BC</i>) qu’au moment exact où <i>AM</i>/<i>AB</i> vaut aussi 0,6.</p>
      <p><b>Réciproque.</b> Si <i>A</i>, <i>M</i>, <i>B</i> et <i>A</i>, <i>N</i>, <i>C</i> sont alignés <b>dans le même ordre</b> et si</p>
      ${eq('<i>AM</i>/<i>AB</i> = <i>AN</i>/<i>AC</i>')}
      <p>alors (<i>MN</i>) // (<i>BC</i>). Si les deux rapports sont différents, les droites ne sont pas parallèles (contraposée du théorème).</p>
      <p>La condition sur l’ordre compte : sans elle, on pourrait mettre <i>M</i> d’un côté de <i>A</i> et <i>N</i> de l’autre avec des rapports égaux, et les droites ne seraient pas parallèles.</p>`,
    cam: cam('recip', 2, 3, 0, 62, 34), lit: 'recip', scene: 'recip', look: {},
    fig: 'N fixé, M qui glisse',
  },
];

const rows = (km, kn) => {
  const m = M.at(M.B, km), n = M.at(M.C, kn);
  return [['AM / AB', fr(Math.abs(km), 3)], ['AN / AC', fr(Math.abs(kn), 3)], ['MN / BC', fr(M.dist(m, n) / M.BC, 3)], ['MN', fr(M.dist(m, n))], ['BC', fr(M.BC)]];
};
export const PLATES = {
  tri: { text: `Arrêtez la droite et comparez les trois rapports : ils sont égaux. Le triangle AMN est une réduction de ABC de rapport k.`, facts: s => rows(s.k, s.k).concat([['aire AMN / aire ABC', fr(s.k * s.k, 3)]]) },
  fly: { text: `M et N sont sur les prolongements de [AB] et [AC], au-delà de A. Les rapports de longueurs sont toujours égaux.`, facts: s => rows(s.kb, s.kb) },
  recip: { text: `AN/AC reste égal à 0,6 ; AM/AB change. La droite (MN) n’est parallèle à (BC) que lorsque les deux rapports coïncident.`, facts: s => rows(s.km, M.K_N).slice(0, 2).concat([['parallèles ?', M.isPar(s.km, M.K_N) ? 'oui' : 'non']]) },
};
