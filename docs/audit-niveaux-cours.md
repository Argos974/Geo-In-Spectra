# Audit : équilibre des niveaux dans les modules de cours

Date : 2026-09-11. Contexte : `ContentBlock.heading` peut porter un `level`
(`lycee` | `superieur` | `approfondissement`, voir `src/content/types.ts`) ;
`lib/levelFilter.ts::filterBlocksByLevel` fait hériter chaque bloc du dernier
titre rencontré. Cet audit répond à la question « les cours sont-ils égaux en
contenu et adaptés au niveau ? » sans avoir à relire les ~21 fichiers de
`src/content/` à chaque fois.

## Méthode

Comptage de mots par bloc (paragraphes, listes, callouts, tableaux, formules,
etc.), cumulé par niveau en suivant la même logique d'héritage que
`filterBlocksByLevel` (un bloc placé sous un titre sans niveau explicite, ou
avant tout titre, est compté à part comme « socle », toujours visible). Script
jetable (vitest temporaire, supprimé après usage) important `moduleContent`
depuis `src/content/index.ts`.

## Résultat brut (mots par niveau, nombre de titres entre parenthèses)

| Module | Lycée | Licence/BUT | Master/Rech. | Total L+S+A | Ratio L/S/A |
|---|---:|---:|---:|---:|---|
| fondamentaux | 2042 (9) | 2592 (8) | 1873 (6) | 6507 | 31/40/29 |
| teledetection | 1400 (8) | 2254 (9) | 1014 (4) | 4668 | 30/48/22 |
| indices-spectraux | 1095 (7) | 2426 (9) | 991 (4) | 4512 | 24/54/22 |
| outils-sig | 1026 (7) | 2203 (7) | 1142 (3) | 4371 | 23/50/26 |
| qgis | 1830 (8) | 2103 (9) | 1728 (6) | 5661 | 32/37/31 |
| terrset | 1388 (6) | 2397 (7) | 2585 (6) | 6370 | 22/38/41 |
| programmation-r | 1537 (6) | 2004 (8) | 2429 (7) | 5970 | 26/34/41 |
| vscode | 1133 (6) | 2064 (7) | 1659 (6) | 4856 | 23/43/34 |
| analyse-statistique | 1947 (6) | 2882 (8) | 2931 (8) | 7760 | 25/37/38 |
| algorithmes-spatiaux | 2013 (6) | 4025 (8) | 3548 (6) | 9586 | 21/42/37 |
| systemes-multi-agents | 1348 (6) | 3684 (8) | 2857 (6) | 7889 | 17/47/36 |
| travaux-pratiques (Atelier) | 3456 (12) | 5435 (12) | 4496 (12) | 13387 | 26/41/34 |
| traitements-ia | 1041 (7) | 1253 (6) | 1034 (3) | 3328 | 31/38/31 |
| methodologie *(avant correctif)* | 1051 (4) | 1308 (4) | 917 (2) | 3276 | 32/40/28 |
| projections-avancees | 1148 (6) | 2236 (10) | 929 (4) | 4313 | 27/52/22 |
| cartographie-web | 976 (6) | 1934 (8) | 1106 (4) | 4016 | 24/48/28 |
| statistiques-spatiales | 1052 (6) | 2014 (6) | 957 (3) | 4023 | 26/50/24 |
| photogrammetrie-drones | 1069 (7) | 1778 (8) | 993 (5) | 3840 | 28/46/26 |
| lidar | 1025 (7) | 2035 (9) | 876 (5) | 3936 | 26/52/22 |
| bases-donnees-spatiales | 985 (7) | 1055 (7) | 931 (4) | 2971 | 33/36/31 |
| etudes-de-cas-sectorielles | 951 (6) | 1297 (6) | 938 (4) | 3186 | 30/41/29 |

## Conclusion

**Pas de déséquilibre structurel à corriger.** Deux angles de lecture, deux
résultats différents :

- **Longueur brute** : `algorithmes-spatiaux` (9586 mots) et
  `systemes-multi-agents` (7889) sont ~3× plus longs que
  `bases-donnees-spatiales` (2971) ou `traitements-ia` (3328). Mais l'écart
  reflète le **périmètre du sujet** (algorithmes-spatiaux couvre de nombreux
  algorithmes distincts, methodologie ou etudes-de-cas-sectorielles sont des
  modules volontairement plus resserrés), pas un module bâclé — vérifié en
  comparant le nombre de titres et la densité par section, cohérents d'un
  module à l'autre (~150-500 mots/titre partout).
- **Ratio lycée/superieur/approfondissement** : les modules à forte
  formalisation (systemes-multi-agents 17 % lycée, indices-spectraux et
  lidar ~22-24 % approfondissement) restent volontairement plus légers sur
  un niveau — inspection qualitative (ex. systemes-multi-agents : le lycée
  reste conceptuel — Conway, boids, Schelling en survol — le supérieur
  formalise et passe à NetLogo/Mesa) : c'est une **progression pédagogique
  normale**, pas un niveau négligé. Aucun module ne tombe à zéro contenu sur
  un niveau donné.

**Seul point faible réel identifié** : `methodologie.ts` avait un niveau
`approfondissement` anormalement court (2 titres seulement, contre 3-6
ailleurs). Correctif appliqué : ajout d'une 3ᵉ section « Valoriser un travail :
poster, soutenance, publication » (poster scientifique, soutenance orale,
article — prolonge naturellement la section IMRaD existante). Résultat après
correctif : approfondissement 917 → 1344 mots (3 titres), ratio 32/40/28 →
28/35/36.

## Pour la prochaine fois

Si on ré-audite après de nouveaux ajouts de contenu, relancer le même calcul
(cf. méthode ci-dessus) plutôt que de relire les fichiers un par un — ce
tableau devient obsolète dès qu'un module change significativement de
longueur. Modules ajoutés après cet audit (session en cours, non commités au
moment de l'écriture) : `qgis`, `terrset`, `programmation-r`, `vscode`,
`algorithmes-spatiaux`, `analyse-statistique`, `systemes-multi-agents` —
non pré-existants dans le tableau ci-dessus lors d'un audit antérieur.
