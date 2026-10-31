# Atlas des maths

Un manuel interactif en 3D, du collège à la MPSI, construit sur le moteur d'[Atlas of Physics](https://github.com/nathanliow/atlas-of-physics) (licence MIT).

Dix-neuf chapitres, avec en regard l'année où la notion est enseignée en Chine (manuels 人教版) :

| N° | Chapitre | Niveau (France) | Chine |
|----|----------|-----------------|-------|
| 01 | Pythagore (avec le diagramme de Zhao Shuang) | 4e | 初二 勾股定理 |
| 04 | Thalès | 3e | 初三 相似 |
| 05 | Les solides | cycle 4 | 高一 立体几何初步 |
| 13 | Le cercle (angle inscrit, tangentes, Liu Hui) | 3e | 初三 圆 |
| 12 | Le second degré (et 基本不等式) | 2nde | 初三 二次函数 |
| 14 | Exponentielle et logarithme | 2nde–Tle | 高一 指数函数与对数函数 |
| 06 | Trigonométrie | 1re | 高一 三角函数 |
| 02 | La dérivée | 1re | 高二 导数 |
| 07 | Suites | 1re–Tle | 高二 数列 |
| 15 | Les coniques | (prépa) | 高二 圆锥曲线 |
| 16 | Géométrie dans l'espace | Tle | 高二 空间向量与立体几何 |
| 17 | Dénombrement (triangle de Yang Hui) | Tle | 高二 计数原理 |
| 18 | Probabilités (binomiale, loi normale) | Tle | 高二 随机变量及其分布 |
| 08 | L'intégrale | Tle | université 定积分 |
| 03 | Applications linéaires | MPSI | université 线性代数 |
| 11 | Espaces vectoriels | MPSI | université 线性空间 |
| 09 | Nombres complexes | MPSI | 高一 复数 (bases) |
| 10 | Développements limités | MPSI | université 泰勒公式 |
| 19 | Fonctions de deux variables | MPSI+ | université 多元函数 |

## Structure

```
index.html            sommaire
atlas.css             styles communs
engine/               moteur (rendu papier + encre, livre, couverture) ; kit.js = outils maths
<chapitre>/
  model.js            les maths : chaque nombre affiché vient d'ici
  world.js            la figure 3D
  pages.js            le texte des pages, caméras, décompositions
  practice.js         exercices corrigés
  main.js             branche le tout sur le livre
img/                  images du sommaire
```

## Lancer

N'importe quel serveur statique, depuis ce dossier :

```
python3 -m http.server 8137
```

puis ouvrir http://127.0.0.1:8137/. three.js est chargé depuis jsDelivr.
