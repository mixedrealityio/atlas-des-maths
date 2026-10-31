// La figure : un tableau debout pour les courbes, et une règle à calcul de bois posée devant.
import * as THREE from 'three';
import { part, box, lines, V } from '../engine/parts.js';
import { board2d, liveCurve, rod, rodTo, ball } from '../engine/kit.js';
import * as M from './model.js';

export const X = x => x * 0.8, Y = y => y * 0.6;
const Z = 0.12, XA = -3.3, XB = 4.6, YA = -3.4, YB = 8.6;
export const RULE = { x0: -3.6, y: -4.4, L: 7.2 };              // la règle : log10(1) … log10(10) sur L

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let sc = 'grow', st = {};
  const is = (...k) => k.includes(sc);

  const gB = asm('board', root, { title: 'Le repère', sub: 'une unité = un carreau' });
  gB.userData.focus = () => ({ target: [X(0.5), Y(2.5), 0], radius: 4 });
  board2d(gB, label, { x0: XA, x1: XB, y0: YA, y1: YB, X, Y, ticksX: [-3, -2, -1, 1, 2, 3, 4], ticksY: [-2, 2, 4, 6, 8], vis: () => !is('rule') });

  const gC = asm('curves', root, { title: 'Les courbes', sub: 'exponentielles et logarithmes' });
  gC.userData.focus = () => ({ target: [X(0.5), Y(2.5), 0], radius: 3.5 });
  const cv = [liveCurve(gC, { n: 220, r: 0.05, pal: 'ink', name: 'Exponentielle' }), liveCurve(gC, { n: 220, r: 0.05, pal: 'blue', name: 'Logarithme' }),
    liveCurve(gC, { n: 220, r: 0.03, pal: 'dark', name: 'Courbe de comparaison' }), liveCurve(gC, { n: 220, r: 0.035, pal: 'red', name: 'e^x' })];
  const diag = lines(gC, [X(-3), Y(-3), Z - 0.02, X(4.4), Y(4.4), Z - 0.02], '#b4b4b8');
  const tans = [0, 1, 2].map(i => rod(gC, { r: 0.018, pal: i === 1 ? 'red' : 'dark', name: 'Tangente en 0' }));
  const p1 = ball(gC, 'ink', 'Point', 0.1), p2 = ball(gC, 'blue', 'Point symétrique', 0.1), p3 = ball(gC, 'dark', 'Point', 0.09);
  const link = lines(gC, [0, 0, 0, 1, 1, 1], '#8a8a8f');
  const one = ball(gC, 'red', 'Le point (0 ; 1)', 0.1); one.position.set(X(0), Y(1), Z + 0.03);
  label('board', '', () => is('grow') ? V(X(st.x) + 0.4, Y(2 ** st.x) + 0.2, Z) : null, () => `2<sup>${fr(st.x, 1)}</sup> = ${fr(2 ** st.x)}`);
  label('mark', '', () => is('grow') ? V(X(st.x) - 1.9, Y(2 * st.x + 1) + 0.1, Z) : null, () => `2·${fr(st.x, 1)} + 1 = ${fr(2 * st.x + 1)}`);
  label('board', '', () => is('family') ? V(X(-3), Y(7.8), Z) : null, () => `<i>a</i> = ${fr(st.a)}`);
  label('vec', '<i>a</i><sup><i>x</i></sup>', () => is('family') ? V(X(st.a > 1 ? Math.min(3.2, M.log(st.a, 7)) : -Math.min(3.2, -M.log(st.a, 7))) + 0.35, Y(7) , Z) : null);
  label('mark', '(1/<i>a</i>)<sup><i>x</i></sup>', () => is('family') ? V(X(st.a > 1 ? -Math.min(3.2, M.log(st.a, 7)) : Math.min(3.2, -M.log(st.a, 7))) - 0.35, Y(7), Z) : null);
  label('vec', '2<sup><i>x</i></sup>', () => is('log') ? V(X(2.6) + 0.3, Y(2 ** 2.6), Z) : null);
  label('vec blue', 'log₂ <i>x</i>', () => is('log') ? V(X(4.4), Y(M.log(2, 4.4)) + 0.35, Z) : null);
  label('mark', '<i>y</i> = <i>x</i>', () => is('log') ? V(X(4.2) + 0.2, Y(4.2) + 0.3, Z) : null);
  ['2<sup><i>x</i></sup>', 'e<sup><i>x</i></sup>', '3<sup><i>x</i></sup>'].forEach((n, i) => label(i === 1 ? 'vec red' : 'mark', n, () => is('e') ? V(X(M.log(M.BASES[i], 7.5)) + (i === 2 ? -0.45 : i === 0 ? 0.35 : 0.1), Y(7.5) + (i === 1 ? 0.35 : 0), Z) : null));

  // ---------- la règle à calcul ----------
  const gR = asm('rule', root, { title: 'La règle à calcul', sub: 'multiplier en additionnant des longueurs' });
  gR.userData.focus = () => ({ target: [RULE.x0 + RULE.L / 2, RULE.y, 0.3], radius: 4 });
  const R = RULE, pos = v => R.x0 + R.L * Math.log10(v);
  const fixed = part(gR, box(R.L + 0.6, 0.55, 0.3, 0.04), { pal: 'base', tone: 'hi', name: 'Règle fixe (D)' });
  fixed.position.set(R.x0 + R.L / 2, R.y - 0.3, 0.2); fixed.userData.home = fixed.position.clone();
  const slide = new THREE.Group(); gR.add(slide);
  const sl = part(slide, box(R.L + 0.6, 0.55, 0.3, 0.04), { pal: 'paper', tone: 'hi', name: 'Réglette mobile (C)' }); sl.position.set(R.x0 + R.L / 2, R.y + 0.3, 0.2);
  const ticks = (y, sign) => { const t = []; for (let v = 1; v <= 10; v += (v < 2 ? 0.1 : v < 5 ? 0.5 : 1)) { const x = pos(v), big = Math.abs(v - Math.round(v)) < 1e-9; t.push(x, y, 0.36, x, y + sign * (big ? 0.2 : 0.1), 0.36); } return t; };
  lines(gR, ticks(R.y - 0.03, -1), '#26262a'); lines(slide, ticks(R.y + 0.03, 1), '#26262a');
  for (let v = 1; v <= 10; v++) {
    label('tick', String(v), () => is('rule') ? V(pos(v) + 0.07, R.y - 0.4, 0.4) : null);
    label('tick', String(v), () => is('rule') ? V(pos(v) + 0.07 + R.L * Math.log10(st.s || 1), R.y + 0.42, 0.4) : null);
  }
  const cur = rod(gR, { r: 0.015, pal: 'red', name: 'Curseur' }), cur0 = rod(gR, { r: 0.015, pal: 'blue', name: 'Le 1 de la réglette' });
  label('vec red', '', () => is('rule') ? V(pos(st.s * M.B_RULE), R.y + 1.05, 0.4) : null, () => `${fr(st.s)} × ${fr(M.B_RULE, 1)} = ${fr(st.s * M.B_RULE)}`);
  label('mark', 'C', () => is('rule') ? V(R.x0 - 0.55 + R.L * Math.log10(st.s || 1), R.y + 0.3, 0.4) : null);
  label('mark', 'D', () => is('rule') ? V(R.x0 - 0.55, R.y - 0.3, 0.4) : null);

  const curve = (f, a = XA + 0.2, b = XB - 0.2) => { const out = []; for (let i = 0; i <= 260; i++) { const x = a + (b - a) * i / 260, y = f(x); if (y > YA + 0.15 && y < YB - 0.15 && isFinite(y)) out.push(V(X(x), Y(y), Z)); else if (out.length) break; } return out; };
  const tanAt0 = (r, k) => { const d = V(0.8, 0.6 * k, 0).normalize().multiplyScalar(2.2); rodTo(r, V(X(0), Y(1), Z + 0.01).sub(d), V(X(0), Y(1), Z + 0.01).add(d)); };

  function update(s) {
    sc = s.scene; st = s;
    gR.visible = is('rule'); gC.visible = !is('rule');
    const hide = c => c.mesh.visible = false;
    cv.forEach(hide); tans.forEach(t => t.visible = false); [p1, p2, p3].forEach(p => p.visible = false); link.visible = false; diag.visible = false;
    const show = (c, f, a, b) => { c.set(curve(f, a, b)); c.mesh.visible = true; };
    if (is('grow')) {
      show(cv[0], x => 2 ** x); show(cv[2], x => 2 * x + 1);
      p1.position.set(X(s.x), Y(2 ** s.x), Z + 0.03); p3.position.set(X(s.x), Y(2 * s.x + 1), Z + 0.03); p1.visible = p3.visible = true;
    }
    if (is('family')) { show(cv[0], x => s.a ** x); show(cv[2], x => (1 / s.a) ** x); }
    if (is('log')) {
      diag.visible = true; show(cv[0], x => 2 ** x); show(cv[1], x => M.log(2, x), 0.02, XB - 0.2);
      const t = s.t, P = [t, 2 ** t];
      p1.position.set(X(P[0]), Y(P[1]), Z + 0.03); p2.position.set(X(P[1]), Y(P[0]), Z + 0.03); p1.visible = p2.visible = true;
      link.geometry.attributes.position.array.set([X(P[0]), Y(P[1]), Z, X(P[1]), Y(P[0]), Z]); link.geometry.attributes.position.needsUpdate = true; link.geometry.computeBoundingSphere(); link.visible = true;
    }
    if (is('e')) {
      M.BASES.forEach((a, i) => { show(cv[i === 1 ? 3 : i === 0 ? 0 : 2], x => a ** x); tanAt0(tans[i], M.slope0(a)); tans[i].visible = true; });
    }
    one.visible = !is('rule');
    if (is('rule')) {
      const dx = R.L * Math.log10(s.s);
      slide.position.x = dx;
      const xr = pos(s.s * M.B_RULE);
      rodTo(cur, V(xr, R.y - 0.7, 0.4), V(xr, R.y + 0.8, 0.4)); rodTo(cur0, V(pos(s.s), R.y - 0.7, 0.4), V(pos(s.s), R.y + 0.8, 0.4));
    }
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
