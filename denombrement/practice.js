export const PRACTICE = {
  0: [{ q: 'Un code est formé de 3 lettres (A à Z) suivies de 2 chiffres. Combien de codes possibles ?', choices: ['26³ + 10²', '26³ × 10²', '26 × 3 × 10 × 2', '36⁵'], answer: 1,
    why: '<p>Cinq étapes indépendantes : 26 × 26 × 26 × 10 × 10 = 1 757 600 codes (principe multiplicatif).</p>' }],
  1: [{ q: 'De combien de façons 5 personnes peuvent-elles s’asseoir sur un banc de 5 places ?', choices: ['25', '120', '3 125', '60'], answer: 1,
    why: '<p>5! = 120.</p>' }],
  2: [{ q: 'Une classe de 30 élèves élit 3 délégués (sans rôles distincts). Nombre de choix possibles ?', choices: ['C(30, 3) = 4 060', 'A(30, 3) = 24 360', '30³', '90'], answer: 0,
    why: '<p>Sans ordre : C(30, 3) = 30 × 29 × 28 / 6 = 4 060. S’il y avait un président, un secrétaire et un trésorier, ce serait A(30, 3).</p>' }],
  3: [{ q: 'Dans le triangle de Yang Hui, quel nombre se trouve sous 10 et 10 dans la ligne 5 ?', choices: ['20', '15', '10', '100'], answer: 0,
    why: '<p>La ligne 5 est 1, 5, 10, 10, 5, 1 ; sous les deux 10, la ligne 6 contient 10 + 10 = 20 = C(6, 3).</p>' }],
  4: [{ q: 'Le coefficient de x² dans (1 + x)⁵ est', choices: ['5', '10', '20', '25'], answer: 1,
    why: '<p>C(5, 2) = 10.</p>' }],
};
