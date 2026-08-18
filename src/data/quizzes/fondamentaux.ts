import type { QuizQuestion } from "./types"

export const fondamentauxQuiz: QuizQuestion[] = [
  {
    question: "Pourquoi ne calcule-t-on jamais une distance directement en degrés de latitude/longitude ?",
    choices: [
      "Parce que les degrés ne sont pas assez précis",
      "Parce qu'un degré ne représente pas la même distance au sol selon la latitude",
      "Parce que les GPS n'affichent pas de degrés",
      "Ce n'est pas vrai, on peut le faire sans problème",
    ],
    correctIndex: 1,
    explanation: "Les méridiens se rapprochent vers les pôles : un degré de longitude à Marseille ne mesure pas la même distance qu'à l'équateur. Il faut projeter dans un système métrique avant tout calcul.",
  },
  {
    question: "Quel est le code EPSG du système Lambert-93, référence officielle française ?",
    choices: ["EPSG:4326", "EPSG:3857", "EPSG:2154", "EPSG:27700"],
    correctIndex: 2,
    explanation: "EPSG:2154 est Lambert-93, standard officiel français depuis 2006. EPSG:4326 est WGS84 (géographique), EPSG:3857 est Web Mercator.",
  },
  {
    question: "Une projection cartographique conforme conserve en priorité :",
    choices: ["Les surfaces", "Les angles et les formes localement", "Les distances", "Rien, une projection déforme tout de façon égale"],
    correctIndex: 1,
    explanation: "Une projection conforme (comme Lambert conique conforme, utilisée pour Lambert-93) conserve les angles et les formes localement, au prix d'une déformation des surfaces.",
  },
  {
    question: "Une couche cadastrale (parcelles avec propriétaire, surface) est typiquement représentée en :",
    choices: ["Raster", "Vecteur", "Ni l'un ni l'autre, en tableur uniquement", "Toujours en GeoTIFF"],
    correctIndex: 1,
    explanation: "Les parcelles cadastrales sont des objets géométriques (polygones) porteurs d'attributs : c'est la définition même du vecteur.",
  },
  {
    question: "Quelle est la conséquence la plus fréquente d'une erreur de code EPSG au chargement d'une couche ?",
    choices: [
      "Le logiciel refuse de l'ouvrir",
      "La couche apparaît décalée de plusieurs centaines de mètres, parfois sans erreur visible",
      "Aucune, EPSG n'a pas d'effet réel",
      "La couche devient automatiquement raster",
    ],
    correctIndex: 1,
    explanation: "C'est l'erreur la plus fréquente en géomatique : la couche se charge sans message d'erreur mais ses coordonnées sont mal interprétées, produisant un décalage silencieux.",
  },
  {
    question: "Le format GeoTIFF sert principalement à stocker :",
    choices: ["Des données vecteur", "Des données raster géoréférencées", "Des bases de données relationnelles", "Des fichiers de style cartographique"],
    correctIndex: 1,
    explanation: "GeoTIFF est le format raster de référence (imagerie satellite, modèles numériques de terrain) : une image accompagnée de ses informations de géoréférencement.",
  },
  {
    question: "L'altitude affichée par un GPS brut (h) diffère de l'altitude d'une carte IGN (H) parce que :",
    choices: [
      "Le GPS mesure une altitude ellipsoïdale, la carte une altitude orthométrique rattachée au niveau des mers",
      "Le GPS est toujours plus précis que la carte",
      "Il n'y a en réalité aucune différence entre les deux",
      "La carte IGN n'affiche jamais d'altitude",
    ],
    correctIndex: 0,
    explanation: "h = H + N, où N est l'ondulation du géoïde par rapport à l'ellipsoïde. Un GPS mesure h directement ; une carte topographique affiche H, l'altitude \"vraie\" au sens de l'écoulement de l'eau.",
  },
  {
    question: "Un récepteur GPS calcule sa position à partir de :",
    choices: [
      "Un seul satellite, très précis",
      "La distance à plusieurs satellites de position connue (trilatération)",
      "Une triangulation optique avec des stations au sol uniquement",
      "La seule boussole intégrée au récepteur",
    ],
    correctIndex: 1,
    explanation: "Le récepteur mesure le temps de trajet du signal de plusieurs satellites, en déduit la distance à chacun, puis calcule sa position par trilatération (au moins 4 satellites pour lever l'ambiguïté et corriger l'horloge du récepteur).",
  },
  {
    question: "Pourquoi RGF93/ETRS89 est-il préféré à ITRF pour le cadastre et les cartes françaises courantes ?",
    choices: [
      "ITRF n'existe pas en France",
      "ETRS89 est \"gelé\" sur la plaque eurasienne : un point français garde pratiquement la même coordonnée dans le temps, contrairement à ITRF qui suit la dérive tectonique continue",
      "ETRS89 est plus précis qu'ITRF",
      "Il n'y a en réalité aucune différence entre les deux",
    ],
    correctIndex: 1,
    explanation: "ITRF est un référentiel global recalculé en continu, qui suit le mouvement réel de la croûte (~2-3 cm/an en Europe). ETRS89 fixe ce mouvement à une époque de référence (1989), ce qui permet à un cadastre de rester utilisable sans recalcul permanent.",
  },
  {
    question: "En pratique (QGIS, PROJ), la transformation de Helmert à 7 paramètres utilise :",
    choices: [
      "La matrice de rotation complète, exactement comme la formule théorique",
      "Une version linéarisée aux petits angles, car les rotations entre référentiels proches sont minuscules",
      "Aucune rotation, seulement les translations",
      "Un facteur d'échelle uniquement, sans translation ni rotation",
    ],
    correctIndex: 1,
    explanation: "Les rotations entre deux référentiels proches (ex. ITRF et ETRS89) sont de l'ordre de la fraction de seconde d'arc : la formule est linéarisée en une transformation affine résoluble directement par moindres carrés, plutôt que d'utiliser la matrice de rotation complète.",
  },
]
