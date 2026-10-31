const eq = s => `<div class="eq">${s}</div>`;
export const PRACTICE = {
  0: [
    { q: 'Dans un triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC). AM = 3, AB = 5, BC = 8. Que vaut MN ?',
      choices: ['4,8', '5', '13,3', '2,4'], answer: 0,
      why: `${eq('MN / BC = AM / AB, donc MN = 8 × 3/5 = 4,8')}<p>On part du rapport connu (3/5) et on l’applique au côté parallèle.</p>` },
  ],
  1: [
    { q: 'Une réduction de rapport 1/3 transforme un triangle d’aire 27 cm² en un triangle d’aire',
      choices: ['9 cm²', '3 cm²', '1 cm²', '81 cm²'], answer: 1,
      why: '<p>Les aires sont multipliées par k² = 1/9 : 27 × 1/9 = 3 cm². 9 cm² est l’erreur qui multiplie l’aire par k au lieu de k².</p>' },
  ],
  2: [
    { q: 'Papillon : (MN) // (BC), AM = 2, AB = 5, AN = 3. Que vaut AC ?',
      choices: ['1,2', '7,5', '6', '4'], answer: 1,
      why: `${eq('AM/AB = AN/AC, donc 2/5 = 3/AC, donc AC = 3 × 5/2 = 7,5')}` },
  ],
  3: [
    { q: 'A, M, B et A, N, C sont alignés dans cet ordre. AM = 4, AB = 10, AN = 6, AC = 15. (MN) et (BC) sont-elles parallèles ?',
      choices: ['Oui', 'Non', 'On ne peut pas savoir'], answer: 0,
      why: `${eq('AM/AB = 4/10 = 0,4 et AN/AC = 6/15 = 0,4')}<p>Les rapports sont égaux et les points sont dans le même ordre : d’après la réciproque du théorème de Thalès, (MN) // (BC).</p>` },
  ],
};
