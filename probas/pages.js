// Chapitre 18, page par page. En Chine : 随机变量及其分布 (première, 选择性必修第三册, chapitre 7),
// avec la loi binomiale (二项分布) et la loi normale (正态分布). En France : terminale (binomiale) et BTS/prépa (normale).
import * as M from './model.js';
import { OX, BX } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const bars = (dist = 24) => ({ target: [BX(4), 3, 0], az: 0, el: 4, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 18 · Tle', title: 'Probabilités', sub: 'la planche de Galton',
    body: `
      <p class="lede">Des billes tombent à travers 8 rangées de clous. À chaque clou, elles partent à gauche ou à droite avec la même probabilité 1/2.</p>
      <p>La case d’arrivée est le nombre <i>X</i> de rebonds à droite, de 0 à 8. C’est une <b>variable aléatoire</b> : sa valeur dépend du hasard.</p>
      <p>Pour finir dans la case <i>k</i>, il faut <i>k</i> « droite » parmi 8 rebonds. Il y a C(8, <i>k</i>) chemins possibles, chacun de probabilité (1/2)<sup>8</sup> :</p>
      ${eq('P(<i>X</i> = <i>k</i>) = C(8, <i>k</i>) / 256')}
      <p>Les cases du milieu ont beaucoup plus de chemins : 70 pour la case 4, un seul pour les cases 0 et 8. Les piles de billes dessinent peu à peu la ligne 8 du triangle de Yang Hui.</p>
      ${china('随机变量及其分布, première année de lycée.')}`,
    cam: { target: [0, 4.9, 0], az: 0, el: 4, dist: 40 }, lit: 'galton', scene: 'galton', look: {},
    fig: '120 billes à travers 8 rangées',
  },
  {
    kicker: '18.1', title: 'La loi binomiale', sub: 'n épreuves, probabilité p',
    body: `
      <p class="lede">On répète <i>n</i> fois, de façon indépendante, une épreuve qui réussit avec probabilité <i>p</i>. Le nombre <i>X</i> de succès suit la <b>loi binomiale</b> B(<i>n</i> ; <i>p</i>) :</p>
      ${eq('P(<i>X</i> = <i>k</i>) = C(<i>n</i>, <i>k</i>) <i>p<sup>k</sup></i> (1 − <i>p</i>)<sup><i>n</i>−<i>k</i></sup>')}
      <p>Ici <i>n</i> = 8 et <i>p</i> varie de 0,2 à 0,8 : c’est une planche de Galton penchée, où les billes partent plus souvent d’un côté. Le diagramme glisse vers la droite quand <i>p</i> grandit, et il est symétrique pour <i>p</i> = 0,5.</p>
      <p>Les hauteurs des barres font toujours 1 au total : c’est la formule du binôme, (<i>p</i> + (1 − <i>p</i>))<sup><i>n</i></sup> = 1.</p>`,
    cam: bars(), lit: 'board', scene: 'binom', look: {},
    fig: 'B(8 ; p) quand p varie',
  },
  {
    kicker: '18.2', title: 'Espérance et écart-type', sub: 'le centre et l’étalement',
    body: `
      <p class="lede">L’<b>espérance</b> <i>E</i>(<i>X</i>) est la valeur moyenne qu’on obtiendrait en répétant l’expérience un très grand nombre de fois. Pour la loi binomiale :</p>
      ${eq('<i>E</i>(<i>X</i>) = <i>np</i>    <i>V</i>(<i>X</i>) = <i>np</i>(1 − <i>p</i>)    σ = √<i>V</i>(<i>X</i>)')}
      <p>Le trait noir marque l’espérance, les traits gris μ − σ et μ + σ. L’écart-type σ mesure de combien les valeurs s’écartent typiquement de la moyenne.</p>
      <p>La variance est la plus grande pour <i>p</i> = 0,5 (σ = √2 ≈ 1,41 ici) : c’est quand le résultat de chaque épreuve est le plus incertain.</p>`,
    cam: bars(), lit: 'board', scene: 'esp', look: {},
    fig: 'μ = np et σ = √(np(1 − p))',
  },
  {
    kicker: '18.3', title: 'La loi normale', sub: 'la courbe en cloche',
    body: `
      <p class="lede">Augmentons le nombre de rangées : <i>n</i> = 4, 8, 16, 32, 64. En centrant (on retire μ) et en réduisant (on divise par σ), les diagrammes de B(<i>n</i> ; 0,5) se rapprochent tous d’une même courbe :</p>
      ${eq('φ(<i>z</i>) = e<sup>−<i>z</i>²/2</sup> / √(2π)')}
      <p>C’est la densité de la <b>loi normale</b> centrée réduite N(0 ; 1), la « courbe en cloche » de Gauss. Ce résultat, le théorème de Moivre-Laplace, explique pourquoi la loi normale apparaît partout : la taille, les erreurs de mesure, les notes… sont des sommes de nombreux petits effets indépendants.</p>
      <p>Pour une loi normale N(μ ; σ²) quelconque, la courbe est la même, décalée de μ et étirée de σ.</p>
      ${china('正态分布 (§7.5), avec la notation N(μ, σ²).')}`,
    cam: bars(), lit: 'board', scene: 'normal', look: {},
    fig: 'Les binomiales tendent vers la cloche',
  },
  {
    kicker: '18.4', title: 'La règle des 3σ', sub: '68 %, 95 %, 99,7 %',
    body: `
      <p class="lede">Pour une variable de loi normale, la probabilité de tomber à moins de 1, 2 ou 3 écarts-types de la moyenne ne dépend pas de μ ni de σ :</p>
      <table class="data"><tr><th>intervalle</th><th>probabilité</th></tr>${[1, 2, 3].map(k => `<tr><td>[μ − ${k === 1 ? '' : k}σ ; μ + ${k === 1 ? '' : k}σ]</td><td>${fr(M.within(k), 4)}</td></tr>`).join('')}</table>
      <p>L’aire rouge sous la courbe grandit de 1σ à 3σ. Au-delà de 3σ, il ne reste que 0,3 % : un tel écart est considéré comme presque impossible.</p>
      <p>Exemple : si des pièces ont une longueur moyenne de 50 mm avec σ = 0,1 mm, presque toutes (99,7 %) mesurent entre 49,7 et 50,3 mm. En contrôle qualité, on parle de « méthode 3σ » (et même de « six sigma »).</p>
      ${china('ces trois valeurs (0,6827, 0,9545, 0,9973) sont données dans le manuel et reviennent dans les exercices du gaokao.')}`,
    cam: bars(), lit: 'board', scene: 'sigma', look: {},
    fig: 'L’aire à moins de kσ de la moyenne',
  },
];

export const PLATES = {
  galton: { text: `La planche : chaque bille rebondit 8 fois. Les nombres au-dessus des piles comptent les billes déjà arrivées.`,
    facts: () => [...Array(9).keys()].map(k => [`case ${k}`, `${M.C(8, k)} chemins sur 256, P = ${fr(M.C(8, k) / 256, 3)}`]) },
  board: { text: `Le diagramme de la page.`, facts: s => {
    if (s.scene === 'binom' || s.scene === 'esp') return [['p', fr(s.p)], ['E(X) = 8p', fr(8 * s.p)], ['σ', fr(Math.sqrt(8 * s.p * (1 - s.p)))], ['P(X = 4)', fr(M.binom(8, s.p, 4), 4)]];
    if (s.scene === 'normal') return [['n', String(s.n)], ['σ = √n / 2', fr(Math.sqrt(s.n) / 2)]];
    return [1, 2, 3].map(k => [`à moins de ${k}σ`, fr(M.within(k), 4)]);
  } },
};
