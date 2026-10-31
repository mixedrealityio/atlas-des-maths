// Chapitre 11, page par page (programme de MPSI : sous-espaces, familles libres, bases, dimension, supplémentaires).
import * as M from './model.js';
import { W } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const cam = (az, el, dist, t = [0.5, 0.5, 0.4]) => ({ target: W(t).toArray(), az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 11 · MPSI', title: 'Espaces vectoriels', sub: 'la droite engendrée par u',
    body: `
      <p class="lede">Un <b>espace vectoriel</b> est un ensemble où l’on sait additionner deux vecteurs et les multiplier par un nombre, avec les règles habituelles. ℝ³ en est l’exemple de base.</p>
      <p>Partons d’un seul vecteur non nul <i>u</i> (en rouge). Tous ses multiples λ<i>u</i> forment une droite passant par 0 : c’est le <b>sous-espace engendré</b> par <i>u</i>.</p>
      ${eq('Vect(<i>u</i>) = { λ<i>u</i> : λ ∈ ℝ }')}
      <p>Le point rouge parcourt cette droite quand λ varie, du côté de <i>u</i> si λ &gt; 0, de l’autre côté si λ &lt; 0. La droite contient toujours 0 (λ = 0) : un sous-espace passe toujours par l’origine.</p>`,
    cam: cam(34, 22, 15), lit: 'line', scene: 'line', look: { line: 1 },
    fig: 'Vect(u) : une droite',
  },
  {
    kicker: '11.1', title: 'Le plan engendré', sub: 'deux directions',
    body: `
      <p class="lede">Avec deux vecteurs <i>u</i> et <i>v</i> non colinéaires, les combinaisons λ<i>u</i> + μ<i>v</i> remplissent un <b>plan</b> passant par 0 (en bleu).</p>
      ${eq('Vect(<i>u</i>, <i>v</i>) = { λ<i>u</i> + μ<i>v</i> : λ, μ ∈ ℝ }')}
      <p>Pour atteindre le point noir, on avance de λ<i>u</i> (segment rouge), puis de μ<i>v</i> (segment bleu). Le quadrillage montre les valeurs entières et demi-entières de λ et μ.</p>
      <p>Un sous-espace est stable par combinaison linéaire : additionner deux vecteurs du plan ou en multiplier un par un nombre ne fait jamais sortir du plan.</p>`,
    cam: cam(30, 26, 16), lit: 'plane', scene: 'plane', look: { plane: 1 },
    fig: 'Vect(u, v) : un plan',
  },
  {
    kicker: '11.2', title: 'Libre ou liée', sub: 'un vecteur de trop ?',
    body: `
      <p class="lede">Ajoutons un troisième vecteur <i>w</i>. Tant qu’il reste <b>dans</b> le plan de <i>u</i> et <i>v</i>, il s’écrit <i>w</i> = 0,6<i>u</i> + 0,5<i>v</i> : il n’apporte aucune direction nouvelle. La famille (<i>u</i>, <i>v</i>, <i>w</i>) est <b>liée</b>.</p>
      <p>Dès qu’il sort du plan, plus aucune combinaison de <i>u</i> et <i>v</i> ne le donne : la famille est <b>libre</b>.</p>
      ${eq('libre ⇔ (λ<i>u</i> + μ<i>v</i> + ν<i>w</i> = 0 ⇒ λ = μ = ν = 0)')}
      <p>Le compteur affiche det(<i>u</i>, <i>v</i>, <i>w</i>), le volume du parallélépipède construit sur les trois vecteurs : il est nul exactement quand <i>w</i> est dans le plan.</p>`,
    cam: cam(55, 14, 15), lit: 'w', scene: 'free', look: { free: 1, w: 1, plane: 0 },
    fig: 'w dans le plan, puis en dehors',
  },
  {
    kicker: '11.3', title: 'Base et coordonnées', sub: 'trois directions suffisent',
    body: `
      <p class="lede">Une famille libre qui engendre tout l’espace est une <b>base</b>. Dans ℝ³, toute base a exactement trois vecteurs : c’est la <b>dimension</b>.</p>
      <p>Dans la base (<i>u</i>, <i>v</i>, <i>w</i>), chaque vecteur <i>x</i> s’écrit d’une seule façon :</p>
      ${eq('<i>x</i> = <i>a u</i> + <i>b v</i> + <i>c w</i>')}
      <p>(<i>a</i> ; <i>b</i> ; <i>c</i>) sont les <b>coordonnées</b> de <i>x</i> dans cette base. Le chemin rouge, bleu puis noir les montre : on avance de <i>a u</i>, puis de <i>b v</i>, puis de <i>c w</i>.</p>
      <p>Elles se calculent en résolvant un système, par exemple avec les formules de Cramer.</p>`,
    cam: cam(25, 34, 18, [1, 0.8, 0.5]), lit: 'decomp', scene: 'base', look: { base: 1, w: 1 }, free: 1,
    fig: 'x dans la base (u, v, w)',
  },
  {
    kicker: '11.4', title: 'Supplémentaires', sub: 'F ⊕ G = ℝ³',
    body: `
      <p class="lede">Le plan <i>F</i> = Vect(<i>u</i>, <i>v</i>) et la droite <i>G</i> = Vect(<i>w</i>) ne se coupent qu’en 0, et leurs dimensions s’ajoutent à 3. On dit qu’ils sont <b>supplémentaires</b> :</p>
      ${eq('ℝ³ = <i>F</i> ⊕ <i>G</i>')}
      <p>Tout vecteur <i>x</i> se décompose alors d’une seule façon en <i>x</i> = <i>x<sub>F</sub></i> + <i>x<sub>G</sub></i>, avec <i>x<sub>F</sub></i> dans le plan (en bleu) et <i>x<sub>G</sub></i> sur la droite (en noir).</p>
      <p>L’application <i>x</i> ↦ <i>x<sub>F</sub></i> est la <b>projection sur <i>F</i> parallèlement à <i>G</i></b> : c’est exactement la projection du chapitre « Applications linéaires ».</p>`,
    cam: cam(25, 34, 18, [1, 0.8, 0.5]), lit: 'decomp', scene: 'supp', look: { supp: 1, w: 1 }, free: 1,
    fig: 'x = x_F + x_G',
  },
];

export const PLATES = {
  vecs: { text: `Les trois vecteurs de départ.`, facts: s => [['u', M.U.map(c => fr(c, 1)).join(' ; ')], ['v', M.VV.map(c => fr(c, 1)).join(' ; ')], ['w', s.w.map(c => fr(c, 2)).join(' ; ')]] },
  line: { text: `La droite rouge est l’ensemble des λu. Le point rouge est λu pour la valeur de λ affichée.`, facts: s => [['λ', fr(s.lam)], ['λu', M.scale(s.lam, M.U).map(c => fr(c)).join(' ; ')]] },
  plane: { text: `Chaque point du plan bleu s’atteint par un unique couple (λ ; μ), puisque u et v ne sont pas colinéaires.`, facts: s => [['λ', fr(s.lm[0])], ['μ', fr(s.lm[1])]] },
  w: { text: `Le trait gris mesure l’écart de w au plan. Nul : famille liée. Non nul : famille libre.`, facts: s => [['det(u, v, w)', fr(M.det3(M.U, M.VV, s.w), 3)], ['famille', Math.abs(M.det3(M.U, M.VV, s.w)) < 1e-3 ? 'liée' : 'libre']] },
  decomp: { text: `Les trois segments colorés ajoutés bout à bout redonnent x.`, facts: s => { const [a, b, c] = M.coords(s.x, M.U, M.VV, s.w); return [['a', fr(a)], ['b', fr(b)], ['c', fr(c)]]; } },
};
