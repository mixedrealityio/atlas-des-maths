// Chapitre 9, page par page (programme de MPSI : nombres complexes, forme exponentielle, racines de l'unité, similitudes).
import * as M from './model.js';
import { S } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const cam = (dist, tx = 0, ty = 0) => ({ target: [tx * S, ty * S, 0], az: 0, el: 3, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 9 · MPSI', title: 'Nombres complexes', sub: 'des points du plan',
    body: `
      <p class="lede">Un nombre complexe <i>z</i> = <i>a</i> + <i>ib</i>, avec <i>i</i>² = −1, se représente par le point de coordonnées (<i>a</i> ; <i>b</i>) : <i>a</i> est sa partie réelle, <i>b</i> sa partie imaginaire.</p>
      <p>On peut aussi le repérer par sa distance à 0, le <b>module</b> |<i>z</i>|, et par l’angle θ que fait sa flèche avec l’axe réel, un <b>argument</b> :</p>
      ${eq('|<i>z</i>| = √(<i>a</i>² + <i>b</i>²)    <i>z</i> = |<i>z</i>| (cos θ + <i>i</i> sin θ) = |<i>z</i>| e<sup><i>i</i>θ</sup>')}
      <p>La notation e<sup><i>i</i>θ</sup> = cos θ + <i>i</i> sin θ (formule d’Euler) désigne le point du cercle unité (en gris) d’angle θ.</p>
      <p>L’argument n’est défini qu’à 2π près : θ et θ + 2<i>k</i>π repèrent la même direction.</p>`,
    cam: cam(30), lit: 'z', scene: 'z', look: { mod: 1 },
    fig: 'z = a + ib = |z| e^(iθ)',
  },
  {
    kicker: '9.1', title: 'Multiplier', sub: 'tourner et agrandir',
    body: `
      <p class="lede">Additionner deux complexes, c’est ajouter les flèches bout à bout. Les <b>multiplier</b> est plus surprenant :</p>
      ${eq('|<i>zw</i>| = |<i>z</i>| × |<i>w</i>|    arg(<i>zw</i>) = arg <i>z</i> + arg <i>w</i>')}
      <p>Ici <i>w</i> = 1,25 e<sup><i>i</i>π/4</sup> est fixé (en bleu). Multiplier <i>z</i> par <i>w</i>, c’est faire <b>tourner</b> sa flèche de π/4 et l’<b>allonger</b> de 25 %. La flèche rouge <i>zw</i> suit <i>z</i> avec toujours le même décalage.</p>
      <p>En forme exponentielle, c’est la règle des puissances : |<i>z</i>|e<sup><i>i</i>α</sup> × |<i>w</i>|e<sup><i>i</i>β</sup> = |<i>z</i>||<i>w</i>| e<sup><i>i</i>(α + β)</sup>.</p>`,
    cam: cam(30), lit: 'mult', scene: 'mult', look: { mult: 1 },
    fig: 'z × w : tourner de π/4, agrandir de 1,25',
  },
  {
    kicker: '9.2', title: 'Multiplier par i', sub: 'un quart de tour',
    body: `
      <p class="lede"><i>i</i> = e<sup><i>i</i>π/2</sup> a pour module 1 et pour argument π/2. Multiplier par <i>i</i>, c’est donc tourner d’un quart de tour, sans agrandir.</p>
      <p>En multipliant quatre fois de suite, on parcourt les quatre sommets d’un carré : <i>z</i>, <i>iz</i>, −<i>z</i>, −<i>iz</i>, puis on revient à <i>z</i>, car <i>i</i>⁴ = 1.</p>
      ${eq('<i>i</i>² = −1 : deux quarts de tour font un demi-tour')}
      <p>C’est l’image géométrique de la règle <i>i</i>² = −1 : un demi-tour retourne la flèche.</p>`,
    cam: cam(30), lit: 'turn', scene: 'turn', look: { turn: 1 },
    fig: 'z, iz, −z, −iz',
  },
  {
    kicker: '9.3', title: 'Racines de l’unité', sub: 'zⁿ = 1',
    body: `
      <p class="lede">L’équation <i>z<sup>n</sup></i> = 1 a exactement <i>n</i> solutions complexes. Elles ont toutes pour module 1 et sont régulièrement espacées sur le cercle :</p>
      ${eq('ω<sub><i>k</i></sub> = e<sup>2<i>ikπ</i>/<i>n</i></sup>,   <i>k</i> = 0, 1, …, <i>n</i> − 1')}
      <p>Elles forment un <b>polygone régulier</b> à <i>n</i> sommets, dont l’un est 1. Le nombre <i>n</i> change de 3 à 8 sur la figure.</p>
      <p>Leur somme est nulle : le polygone est en équilibre autour de 0. Algébriquement, 1 + ω + … + ω<sup><i>n</i>−1</sup> = (1 − ω<sup><i>n</i></sup>)/(1 − ω) = 0.</p>`,
    cam: cam(22), lit: 'roots', scene: 'roots', look: { roots: 1 },
    fig: 'Les racines n-ièmes de 1',
  },
  {
    kicker: '9.4', title: 'Similitudes', sub: 'z ↦ az + b',
    body: `
      <p class="lede">L’application <i>z</i> ↦ <i>az</i> + <i>b</i> (avec <i>a</i> ≠ 0) transforme toute figure en une figure <b>semblable</b> : elle la tourne de arg <i>a</i>, la multiplie par |<i>a</i>| et la déplace.</p>
      <p>Ici <i>a</i> = 0,8 e<sup><i>i</i>π/3</sup> et <i>b</i> = 1,2 + 0,5<i>i</i>. Le drapeau gris se transforme en le drapeau rouge, tourné de 60° et réduit à 80 %.</p>
      <p>Si <i>a</i> ≠ 1, un seul point ne bouge pas, le <b>centre</b> ω (en bleu) :</p>
      ${eq('ω = <i>a</i>ω + <i>b</i>    ⇔    ω = <i>b</i> / (1 − <i>a</i>)')}
      <p>La similitude est alors une rotation de centre ω composée avec une homothétie de même centre : <i>z</i> − ω ↦ <i>a</i>(<i>z</i> − ω).</p>`,
    cam: cam(24, 1.5, 0.2), lit: 'sim', scene: 'sim', look: { sim: 1 },
    fig: 'Une similitude de rapport 0,8 et d’angle 60°',
  },
];

export const PLATES = {
  plane: { text: `Le plan complexe : l’axe horizontal porte les réels, l’axe vertical les imaginaires purs. Le cercle gris est le cercle unité.`, facts: () => [['1', '(1 ; 0)'], ['i', '(0 ; 1)'], ['i²', '−1']] },
  z: { text: `Les pointillés donnent a et b, l’arc rouge l’argument θ, le cercle gris le module.`,
    facts: s => [['z', M.fmt(s.z)], ['|z|', fr(M.mod(s.z), 3)], ['arg z', `${fr(M.arg(s.z), 3)} rad`]] },
  mult: { text: `Le triangle (0, 1, z) et le triangle (0, w, zw) sont semblables : c’est le même triangle tourné de π/4 et agrandi de 1,25.`,
    facts: s => { const zw = M.mul(s.z, M.W); return [['z', M.fmt(s.z)], ['w', M.fmt(M.W)], ['zw', M.fmt(zw)], ['|z| × |w|', `${fr(M.mod(s.z), 3)} × 1,25 = ${fr(M.mod(zw), 3)}`]]; } },
  turn: { text: `Quatre flèches de même longueur, séparées d’un quart de tour.`, facts: s => [['z', M.fmt(s.z)], ['iz', M.fmt(M.mul(M.I, s.z))], ['i²z = −z', M.fmt(M.mul([-1, 0], s.z))]] },
  roots: { text: `Le polygone régulier des racines n-ièmes de l’unité. Additionnez leurs flèches : elles s’annulent.`,
    facts: s => { const R = M.roots(s.n), sum = R.reduce(M.add, [0, 0]); return [['n', String(s.n)], ['angle entre deux racines', `2π/${s.n}`], ['somme', M.fmt(sum.map(c => Math.abs(c) < 1e-12 ? 0 : c))]]; } },
  sim: { text: `Le drapeau tourne et rétrécit autour du point fixe ω. Les angles et les rapports de longueurs sont conservés.`,
    facts: () => [['a', M.fmt(M.SA, 3)], ['|a|, arg a', '0,8 ; π/3'], ['b', M.fmt(M.SB)], ['ω = b/(1 − a)', M.fmt(M.fixed(M.SA, M.SB), 3)]] },
};
