// Chapitre 3, page par page (programme de MPSI : applications linéaires, matrices, déterminant, noyau et rang,
// et une ouverture sur les éléments propres). Chaque page déforme l'espace par sa propre matrice.
import * as M from './model.js';
import { W } from './world.js';
import { chart, sample, fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const cam = (az, el, dist, t = [0.7, 0.7, 0.55]) => ({ target: W(t).toArray(), az, el, dist });
const num = x => fr(x, Number.isInteger(x) ? 0 : 1);
// une matrice 3 × 3 en tableau
const mat = (A, name = '') => `<table class="data mat" aria-label="matrice ${name}">${A.map(r => `<tr>${r.map(c => `<td>${num(c)}</td>`).join('')}</tr>`).join('')}</table>`;

export const PAGES = [
  {
    kicker: 'Chapitre 3 · MPSI', title: 'Applications linéaires', sub: 'déformer l’espace en gardant les droites',
    body: `
      <p class="lede">Une application <i>f</i> : ℝ³ → ℝ³ est <b>linéaire</b> si elle respecte les combinaisons linéaires :</p>
      ${eq('<i>f</i>(λ<i>u</i> + μ<i>v</i>) = λ<i>f</i>(<i>u</i>) + μ<i>f</i>(<i>v</i>)')}
      <p>Regardez ce que cela impose à l’espace qui se déforme : l’origine ne bouge pas (<i>f</i>(0) = 0), les droites restent des droites, les parallèles restent parallèles et le quadrillage reste régulier. Le cube unité devient un <b>parallélépipède</b>.</p>
      <p>Ce qui est interdit : translater (l’origine bougerait), courber une droite, ou serrer le quadrillage à un endroit plus qu’à un autre.</p>
      <p class="hintline">L’espace part de l’identité, se déforme, puis revient. Survolez le cube pour arrêter le temps.</p>`,
    cam: cam(38, 24, 17), lit: 'cube', scene: 'morph', look: { m1: 1 }, mat: 'm1',
    fig: 'Le cube unité et son image',
  },
  {
    kicker: '3.1', title: 'La matrice', sub: 'tout est dans l’image de la base',
    body: `
      <p class="lede">Un vecteur s’écrit <i>u</i> = <i>x e</i>₁ + <i>y e</i>₂ + <i>z e</i>₃. Par linéarité,</p>
      ${eq('<i>f</i>(<i>u</i>) = <i>x f</i>(<i>e</i>₁) + <i>y f</i>(<i>e</i>₂) + <i>z f</i>(<i>e</i>₃)')}
      <p>Connaître les trois flèches <i>f</i>(<i>e</i>₁), <i>f</i>(<i>e</i>₂), <i>f</i>(<i>e</i>₃), c’est donc connaître <i>f</i> partout. On les range en <b>colonnes</b> : c’est la matrice de <i>f</i> dans la base canonique.</p>
      ${mat(M.MATS.m1, 'A')}
      <p>Première colonne : <i>f</i>(<i>e</i>₁) = (1,3 ; 0,2 ; 0), la flèche rouge. Deuxième : <i>f</i>(<i>e</i>₂) = (0,6 ; 1,1 ; 0,4), la bleue. Troisième : <i>f</i>(<i>e</i>₃) = (0 ; 0 ; 0,9), la noire.</p>
      <p>Calculer <i>f</i>(<i>u</i>), c’est faire le produit <i>A</i><i>X</i> : chaque coordonnée de l’image est une ligne de <i>A</i> multipliée par la colonne <i>X</i>.</p>`,
    cam: cam(28, 20, 14, [0.7, 0.5, 0.45]), lit: 'basis', scene: 'morph', look: { m1: 1 }, mat: 'm1',
    fig: 'Les colonnes sont des flèches',
  },
  {
    kicker: '3.2', title: 'Le déterminant', sub: 'le facteur de volume',
    body: `
      <p class="lede">Le cube unité a un volume de 1. Son image est un parallélépipède de volume |det <i>A</i>|. Le déterminant dit par combien <i>f</i> multiplie <b>tous</b> les volumes.</p>
      ${mat(M.MATS.m2, 'B')}
      ${eq('det <i>B</i> = 2 × (1 × 1 − 0,3 × 0) − 0,5 × 0 + 0 = 2')}
      <p>Ici les volumes doublent. Pendant la déformation, la matrice vaut <i>I</i> + <i>t</i>(<i>B</i> − <i>I</i>) et son déterminant passe continûment de 1 à 2 :</p>
      <div class="charts">${chart({ x0: 0, x1: 1, y0: 0, y1: 3, xlabel: 't', ylabel: 'volume = det(I + t(B − I))', h: 140,
        label: 'Le volume de l’image du cube en fonction de t : de 1 à 2',
        series: [{ pts: sample(t => M.det(M.lerpMat('m2', t)), 0, 1) }], cursors: ['det'] })}</div>
      <p>Le signe compte aussi : un déterminant négatif retourne l’espace, comme un miroir. Et det(<i>AB</i>) = det <i>A</i> × det <i>B</i> : les facteurs de volume se multiplient.</p>`,
    cam: cam(40, 22, 17, [1, 0.6, 0.6]), lit: 'cube', scene: 'morph', look: { m2: 1 }, mat: 'm2',
    fig: 'Un volume qui double',
  },
  {
    kicker: '3.3', title: 'Noyau et image', sub: 'quand l’espace s’écrase',
    body: `
      <p class="lede">Cette matrice écrase tout l’espace sur le plan <i>z</i> = 0 : le cube devient un hexagone plat, de volume nul.</p>
      ${mat(M.MATS.m3, 'P')}
      <p>L’<b>image</b> Im <i>f</i> est ce qu’on atteint : ici le plan <i>z</i> = 0, de dimension 2. Le <b>noyau</b> Ker <i>f</i> est ce qui est envoyé sur 0 : la droite rouge dirigée par (1 ; 1 ; −2). Vérifiez : <i>P</i> × (1 ; 1 ; −2) = (1 − 1 ; 1 − 1 ; 0) = 0.</p>
      <p><b>Théorème du rang.</b> Ce que <i>f</i> perd et ce qu’elle garde font toute la dimension de départ :</p>
      ${eq('dim Ker <i>f</i> + rg <i>f</i> = 3')}
      <p>Ici 1 + 2 = 3. Et det <i>P</i> = 0 : <i>f</i> n’est pas inversible, deux points distincts sur une même parallèle au noyau ont la même image.</p>`,
    cam: cam(30, 30, 18, [0.4, 0.4, 0.3]), lit: 'kernel', scene: 'morph', look: { m3: 1 }, mat: 'm3',
    fig: 'Une projection sur le plan z = 0',
  },
  {
    kicker: '3.4', title: 'Directions propres', sub: 'pour aller plus loin',
    body: `
      <p class="lede">La plupart des vecteurs tournent quand on applique <i>f</i>. Certains ne font que s’allonger : <i>f</i>(<i>u</i>) = λ<i>u</i>. Ce sont les <b>vecteurs propres</b>, et λ est la <b>valeur propre</b>.</p>
      ${mat(M.MATS.m4, 'S')}
      <p>Pour cette matrice, la droite dirigée par (1 ; 1 ; 0) est étirée trois fois (λ = 3), tandis que (1 ; −1 ; 0) et (0 ; 0 ; 1) ne bougent pas (λ = 1). Le cube s’étire le long de la diagonale rouge.</p>
      ${eq('<i>S</i> (1 ; 1 ; 0) = (3 ; 3 ; 0) = 3 × (1 ; 1 ; 0)')}
      <p>Dans la base de ces trois vecteurs, la matrice devient diagonale : diag(3, 1, 1). Le produit des valeurs propres redonne le déterminant, 3 × 1 × 1 = 3. Cette idée, la <b>réduction</b>, occupe une bonne partie du programme de deuxième année.</p>`,
    cam: cam(10, 34, 22, [0.9, 0.9, 0.4]), lit: 'eigen', scene: 'morph', look: { m4: 1 }, mat: 'm4',
    fig: 'Les directions qui ne tournent pas',
  },
];

export const PLATES = {
  cube: { text: `Les huit sommets du cube sont envoyés par f ; comme f est linéaire, les arêtes restent des segments et les faces des parallélogrammes. Le volume de l’image est |det A|.`,
    facts: s => [['t', fr(s.t)], ['volume de l’image', fr(Math.abs(M.det(s.A)), 3)], ['sommet (1 ; 1 ; 1) ↦', M.apply(s.A, [1, 1, 1]).map(c => fr(c)).join(' ; ')]] },
  basis: { text: `Les trois flèches partent de l’origine : ce sont les colonnes de la matrice. Le parallélépipède est construit sur elles, comme le cube l’était sur e₁, e₂, e₃.`,
    facts: s => [0, 1, 2].map(j => [`f(e${'₁₂₃'[j]})`, M.col(s.A, j).map(c => fr(c)).join(' ; ')]) },
  kernel: { text: `Tous les points de la droite rouge tombent sur l’origine. Plus généralement, deux points dont la différence est dans le noyau ont la même image : c’est pour cela que la projection n’est pas injective.`,
    facts: () => [['Ker f', 'Vect(1 ; 1 ; −2)'], ['Im f', 'le plan z = 0'], ['rang', '2'], ['dim Ker + rang', '1 + 2 = 3'], ['det', '0']] },
  eigen: { text: `Le long de chaque droite propre, f est une simple homothétie de rapport λ. Ces trois droites sont deux à deux orthogonales : c’est un privilège des matrices symétriques réelles (théorème spectral).`,
    facts: () => [['(1 ; 1 ; 0)', 'λ = 3'], ['(1 ; −1 ; 0)', 'λ = 1'], ['(0 ; 0 ; 1)', 'λ = 1'], ['det = produit des λ', '3']] },
};
