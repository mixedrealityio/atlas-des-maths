// Chapitre 7, page par page (programme de 1re et terminale : suites arithmétiques, géométriques, limites, récurrence).
import * as M from './model.js';
import { BX, BY, CX, CY } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const bars = (dist = 26) => ({ target: [BX(5), BY(3.6), 0], az: 0, el: 6, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 7 · 1re', title: 'Les suites', sub: 'arithmétiques : on ajoute',
    body: `
      <p class="lede">Une <b>suite</b> est une liste de nombres numérotés : <i>u</i>₀, <i>u</i>₁, <i>u</i>₂, … Chaque barre est un terme, posée au-dessus de son rang <i>n</i>.</p>
      <p>Ici on part de <i>u</i>₀ = 1 et on <b>ajoute</b> 0,5 à chaque pas (le morceau rouge) : c’est une suite <b>arithmétique</b> de raison <i>r</i> = 0,5.</p>
      ${eq('<i>u</i><sub><i>n</i>+1</sub> = <i>u<sub>n</sub></i> + <i>r</i>    donc    <i>u<sub>n</sub></i> = <i>u</i>₀ + <i>n r</i>')}
      <p>Les sommets des barres sont alignés : une suite arithmétique, c’est une fonction affine regardée seulement aux entiers.</p>
      <p>Somme des termes : (nombre de termes) × (premier + dernier) / 2. Ici <i>u</i>₀ + … + <i>u</i>₁₀ = 11 × (1 + 6) / 2 = ${fr(M.SUM_ARI, 1)}.</p>`,
    cam: bars(), lit: 'terms', scene: 'ari', look: { ari: 1 },
    fig: 'u(n+1) = u(n) + 0,5',
  },
  {
    kicker: '7.1', title: 'Suites géométriques', sub: 'on multiplie',
    body: `
      <p class="lede">Cette fois on <b>multiplie</b> par <i>q</i> = 1,3 à chaque pas : c’est une suite <b>géométrique</b> de raison 1,3, partie de <i>u</i>₀ = 0,5.</p>
      ${eq('<i>u</i><sub><i>n</i>+1</sub> = <i>q u<sub>n</sub></i>    donc    <i>u<sub>n</sub></i> = <i>u</i>₀ <i>q</i><sup><i>n</i></sup>')}
      <p>Le morceau rouge ajouté grandit avec la barre : chaque pas ajoute 30 % de ce qu’il y a déjà. C’est la croissance exponentielle des intérêts composés.</p>
      <p>Si 0 &lt; <i>q</i> &lt; 1, les termes diminuent et tendent vers 0 ; si <i>q</i> &gt; 1, ils explosent.</p>
      <p>Somme : <i>u</i>₀ + … + <i>u<sub>n</sub></i> = <i>u</i>₀ (1 − <i>q</i><sup><i>n</i>+1</sup>) / (1 − <i>q</i>). Ici ${fr(M.SUM_GEO, 2)}.</p>`,
    cam: bars(), lit: 'terms', scene: 'geo', look: { geo: 1 },
    fig: 'u(n+1) = 1,3 × u(n)',
  },
  {
    kicker: '7.2', title: 'La limite', sub: 'aussi près qu’on veut',
    body: `
      <p class="lede">Cette suite saute de part et d’autre de 2, de moins en moins loin : <i>u<sub>n</sub></i> = 2 + 1,5 × (−0,75)<sup><i>n</i></sup>.</p>
      <p>On dit qu’elle <b>converge vers 2</b> : quelle que soit la largeur de la bande rouge autour de 2, tous les termes finissent par y entrer et ne plus en sortir.</p>
      ${eq('∀ε &gt; 0, ∃<i>N</i>, ∀<i>n</i> ≥ <i>N</i>, |<i>u<sub>n</sub></i> − <i>L</i>| &lt; ε')}
      <p>Avec ε = ${fr(M.LIM.eps, 1)}, c’est vrai à partir du rang <i>N</i> = ${M.RANK} (le trait noir). Une bande plus fine demanderait un rang plus grand, mais il en existe toujours un.</p>
      <p>Une suite qui ne converge pas <b>diverge</b> : vers +∞ comme la suite géométrique de la page précédente, ou sans limite du tout, comme (−1)<sup><i>n</i></sup>.</p>`,
    cam: bars(), lit: 'terms', scene: 'lim', look: { lim: 1 },
    fig: 'Une suite qui converge vers 2',
  },
  {
    kicker: '7.3', title: 'Suites récurrentes', sub: 'l’escalier',
    body: `
      <p class="lede">Ici chaque terme se calcule à partir du précédent avec une fonction : <i>u</i><sub><i>n</i>+1</sub> = <i>f</i>(<i>u<sub>n</sub></i>), avec <i>f</i>(<i>x</i>) = √(<i>x</i> + 2) et <i>u</i>₀ = 0,2.</p>
      <p>Pour la dessiner : on monte jusqu’à la courbe de <i>f</i> (on lit <i>u</i>₁), on va horizontalement jusqu’à la droite <i>y</i> = <i>x</i> (pour reporter <i>u</i>₁ sur l’axe), puis on remonte. L’escalier rouge grimpe vers le point où les deux courbes se croisent.</p>
      <p>Si la suite converge vers ℓ et que <i>f</i> est continue, alors ℓ vérifie</p>
      ${eq('ℓ = <i>f</i>(ℓ)    soit    ℓ = √(ℓ + 2)    donc    ℓ = 2')}
      <p>Pour <b>prouver</b> la convergence, on montre souvent par récurrence que la suite est croissante et majorée par 2 : une suite croissante et majorée converge.</p>`,
    cam: { target: [CX(1.45), CY(1.45), 0], az: 0, el: 4, dist: 26 }, lit: 'cobweb', scene: 'rec', look: { rec: 1 },
    fig: 'L’escalier vers ℓ = 2',
  },
];

export const PLATES = {
  terms: { text: `Chaque barre est un terme. Le morceau rouge est ce qui a été ajouté depuis le terme précédent.`,
    facts: s => { const fn = s.page === 'geo' ? M.geo : s.page === 'lim' ? M.lim : M.ari; return [0, 1, 2, 3, 10].map(n => [`u${'₀₁₂₃'[n] ?? '₁₀'}`, fr(fn(n), 3)]); } },
  cobweb: { text: `L’escalier alterne : une marche verticale jusqu’à la courbe de f, une marche horizontale jusqu’à la droite y = x.`,
    facts: () => [0, 1, 2, 3, 6].map(n => [`u${'₀₁₂₃₄₅₆'[n]}`, fr(M.rec(n), 4)]) },
};
