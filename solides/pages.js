// Chapitre 5, page par page (cycle 4 : volumes des solides usuels et patrons).
import * as M from './model.js';
import { ST } from './world.js';
import { fr } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const cam = (st, dx, y, dz, az, el, dist) => ({ target: [ST[st] + dx, y, dz], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 5 · cycle 4', title: 'Les solides', sub: 'compter des cubes',
    body: `
      <p class="lede">Mesurer un volume, c’est compter combien de cubes d’une unité on peut ranger dedans.</p>
      <p>Le pavé droit se remplit couche par couche : une couche de 4 × 3 = 12 cubes, et 2 couches. En tout 24 cubes.</p>
      ${eq('<i>V</i> = <i>L</i> × <i>l</i> × <i>h</i> = 4 × 3 × 2 = 24')}
      <p>Les unités suivent : avec des longueurs en cm, le volume est en cm³. Et 1 L = 1 dm³ = 1 000 cm³.</p>
      <p>Pour un cube d’arête <i>a</i> : <i>V</i> = <i>a</i>³, d’où le nom « au cube ».</p>
      <p class="hintline">Cliquez sur le pavé pour écarter ses cubes.</p>`,
    cam: cam('pave', 2, 1, -1.5, -30, 34, 18), lit: 'pave', scene: 'pave', look: {},
    fig: 'Un pavé de 24 cubes',
  },
  {
    kicker: '5.1', title: 'Prismes et cylindres', sub: 'une base qui monte',
    body: `
      <p class="lede">Un prisme droit ou un cylindre, c’est une base qu’on fait monter tout droit. Chaque tranche d’épaisseur 1 a le volume de l’aire de la base.</p>
      ${eq('<i>V</i> = <i>B</i> × <i>h</i>')}
      <p>Pour le cylindre de rayon <i>r</i>, la base est un disque d’aire π<i>r</i>² :</p>
      ${eq('<i>V</i> = π<i>r</i>²<i>h</i>')}
      <p>Ici <i>r</i> = 1,5 : chaque unité de hauteur ajoute π × 2,25 ≈ 7,07 unités de volume. Le prisme à base triangulaire (base 3, hauteur 2, donc <i>B</i> = 3) en ajoute 3.</p>`,
    cam: cam('cyl', 2.3, 1.3, 0.6, -10, 22, 21), lit: 'cyl', scene: 'cyl', look: {},
    fig: 'Le volume monte avec la hauteur',
  },
  {
    kicker: '5.2', title: 'Pyramides et cônes', sub: 'pourquoi un tiers',
    body: `
      <p class="lede">Un cube de côté 3 se découpe en <b>trois pyramides identiques</b>, qui ont toutes le même sommet (un coin du cube) et pour base une face du cube.</p>
      <p>Chacune a donc le tiers du volume du cube : 27 ÷ 3 = 9. Or sa base est un carré d’aire 9 et sa hauteur vaut 3 :</p>
      ${eq('<i>V</i> = ⅓ × <i>B</i> × <i>h</i> = ⅓ × 9 × 3 = 9')}
      <p>La formule vaut pour toutes les pyramides et pour le cône (une pyramide à base ronde) :</p>
      ${eq('<i>V</i><sub>cône</sub> = ⅓ π<i>r</i>²<i>h</i>')}`,
    cam: cam('pyr', 1.2, 1.3, -1.2, -40, 28, 20), lit: 'pyr', scene: 'pyr', look: {},
    fig: 'Un cube en trois pyramides',
  },
  {
    kicker: '5.3', title: 'La boule', sub: 'le théorème d’Archimède',
    body: `
      <p class="lede">Prenez un cylindre de rayon <i>r</i> et de hauteur 2<i>r</i>, la boule qui tient juste dedans, et le cône de même base et même hauteur.</p>
      <p>Archimède a montré que leurs volumes sont dans le rapport <b>1 : 2 : 3</b>. Le cylindre vaut π<i>r</i>² × 2<i>r</i> = 2π<i>r</i>³, donc :</p>
      <table class="data">
        <tr><th>solide</th><th>volume</th></tr>
        <tr><td>cône</td><td>⅔ π<i>r</i>³</td></tr>
        <tr><td>boule</td><td>⁴⁄₃ π<i>r</i>³</td></tr>
        <tr><td>cylindre</td><td>2 π<i>r</i>³</td></tr>
      </table>
      ${eq('<i>V</i><sub>boule</sub> = ⁴⁄₃ π<i>r</i>³')}
      <p>Et la sphère (la surface de la boule) a pour aire 4π<i>r</i>², exactement l’aire latérale du cylindre.</p>`,
    cam: cam('arch', 3, 1.2, 0, 0, 14, 24), lit: 'arch', scene: 'arch', look: {},
    fig: 'Archimède : 1, 2, 3',
  },
  {
    kicker: '5.4', title: 'Le patron', sub: 'déplier un solide à plat',
    body: `
      <p class="lede">Un <b>patron</b> est une figure plane qu’on peut replier pour fabriquer le solide, sans recouvrement.</p>
      <p>Celui-ci est une croix de six carrés : le fond (rouge), quatre côtés qui pivotent autour de ses arêtes, et le couvercle (bleu) accroché à l’un d’eux.</p>
      <p>Le cube a <b>11 patrons</b> différents. Tous ont 6 carrés, mais six carrés ne font pas toujours un patron : quatre carrés autour d’un même sommet, par exemple, se chevaucheraient.</p>
      <p>Pour vérifier un patron, on repère deux faces qui seront opposées : elles ne doivent jamais se toucher sur le dessin.</p>`,
    cam: cam('net', 0.5, 0.4, -0.5, -30, 44, 13), lit: 'net', scene: 'net', look: {},
    fig: 'Un patron qui se replie',
  },
];

export const PLATES = {
  pave: { text: `Les cubes s’écartent : 2 couches de 3 rangées de 4. On compte 4 × 3 × 2 = 24.`, facts: s => [['cubes posés', String(s.n)], ['par couche', '4 × 3 = 12'], ['volume', '24']] },
  cyl: { text: `Le disque rouge est la base. Le volume du cylindre est cette aire multipliée par la hauteur, comme pour une pile de pièces.`, facts: s => [['h', fr(s.h)], ['cylindre π × 1,5² × h', fr(M.cylV(s.h))], ['prisme 3 × h', fr(M.prismV(s.h))]] },
  pyr: { text: `Les trois pyramides se séparent puis se recollent en cube. Elles ont la même base (un carré de 3) et la même hauteur (3), donc le même volume : un tiers du cube.`, facts: () => [['cube', '3³ = 27'], ['chaque pyramide', '27 ÷ 3 = 9'], ['⅓ × B × h', '⅓ × 9 × 3 = 9']] },
  arch: { text: `Avec r = 1,2 : le cylindre vaut 2π × 1,2³, la boule les deux tiers, le cône le tiers.`, facts: () => [['cône', fr(M.archV.cone)], ['boule', fr(M.archV.ball)], ['cylindre', fr(M.archV.cyl)]] },
  net: { text: `Chaque face tourne autour de l’arête qu’elle partage avec la suivante. À 90°, le cube est fermé.`, facts: s => [['angle de pliage', `${Math.round(s.fold)}°`], ['faces', '6'], ['arêtes', '12'], ['sommets', '8']] },
};
