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
]
