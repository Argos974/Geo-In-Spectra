import type { QuizQuestion } from "./types"

export const fondamentauxQuiz: QuizQuestion[] = [
  {
    question: "Pourquoi ne calcule-t-on jamais une distance directement en degrés de latitude/longitude ?",
    choices: [
      "Parce que les degrés sont une unité angulaire, pas linéaire, donc impossible à additionner directement",
      "Parce qu'un degré de longitude ne représente pas la même distance au sol selon la latitude",
      "Parce que le WGS84 utilisé par le GPS n'est pas compatible avec les calculs de distance",
      "Parce qu'on peut le faire sans problème tant que la zone étudiée reste petite",
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
    choices: [
      "Les surfaces, comme dans une projection équivalente de type Albers",
      "Les angles et les formes localement, comme dans une projection conforme de type Lambert",
      "Les distances le long de certains axes, comme dans une projection équidistante",
      "Un compromis équilibré entre angles, surfaces et distances, sans priorité dominante",
    ],
    correctIndex: 1,
    explanation: "Une projection conforme (comme Lambert conique conforme, utilisée pour Lambert-93) conserve les angles et les formes localement, au prix d'une déformation des surfaces.",
  },
  {
    question: "Une couche cadastrale (parcelles avec propriétaire, surface) est typiquement représentée en :",
    choices: [
      "Raster, car chaque parcelle correspond à un pixel unique dans la grille cadastrale",
      "Vecteur, car chaque parcelle est un polygone géométrique porteur d'attributs",
      "En tableur uniquement, la géométrie n'étant qu'une donnée annexe optionnelle",
      "Toujours en GeoTIFF, le format standard des administrations pour le cadastre",
    ],
    correctIndex: 1,
    explanation: "Les parcelles cadastrales sont des objets géométriques (polygones) porteurs d'attributs : c'est la définition même du vecteur.",
  },
  {
    question: "Quelle est la conséquence la plus fréquente d'une erreur de code EPSG au chargement d'une couche ?",
    choices: [
      "Le logiciel affiche un message d'erreur explicite et refuse purement et simplement d'ouvrir le fichier",
      "La couche s'affiche décalée de plusieurs centaines de mètres, souvent sans aucun message d'erreur visible",
      "Aucune dans la plupart des cas, car les logiciels SIG détectent et corrigent l'EPSG automatiquement",
      "La couche se convertit automatiquement en un format raster non géoréférencé à l'ouverture",
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
      "Le GPS mesure une altitude ellipsoïdale (h), la carte IGN une altitude orthométrique (H) liée au niveau moyen des mers",
      "Le GPS et la carte IGN mesurent tous deux une altitude orthométrique, mais avec des précisions différentes",
      "Le GPS mesure l'altitude par rapport au géoïde local, exactement comme le fait la carte IGN",
      "La carte IGN utilise une altitude ellipsoïdale recalculée, alors que le GPS affiche une altitude brute non corrigée",
    ],
    correctIndex: 0,
    explanation: "h = H + N, où N est l'ondulation du géoïde par rapport à l'ellipsoïde. Un GPS mesure h directement ; une carte topographique affiche H, l'altitude \"vraie\" au sens de l'écoulement de l'eau.",
  },
  {
    question: "Un récepteur GPS calcule sa position à partir de :",
    choices: [
      "Un signal unique capté depuis le satellite le plus proche, dont on déduit directement la position",
      "La distance calculée à plusieurs satellites de position connue, combinée par trilatération",
      "Une triangulation optique réalisée par des stations de référence au sol uniquement",
      "L'orientation fournie par la boussole magnétique intégrée, combinée à l'horloge interne",
    ],
    correctIndex: 1,
    explanation: "Le récepteur mesure le temps de trajet du signal de plusieurs satellites, en déduit la distance à chacun, puis calcule sa position par trilatération (au moins 4 satellites pour lever l'ambiguïté et corriger l'horloge du récepteur).",
  },
  {
    question: "Pourquoi RGF93/ETRS89 est-il préféré à ITRF pour le cadastre et les cartes françaises courantes ?",
    choices: [
      "ITRF ne peut être utilisé qu'à l'échelle mondiale et n'a jamais été officiellement décliné en une réalisation adaptée spécifiquement au territoire français",
      "ETRS89 est \"gelé\" sur la plaque eurasienne : un point français garde pratiquement la même coordonnée dans le temps, contrairement à ITRF qui suit en continu la dérive tectonique réelle",
      "ETRS89 offre une précision de positionnement instantanée nettement supérieure à ITRF, ce dernier étant surtout limité par la densité des stations de mesure au sol",
      "Les deux référentiels appliquent en réalité le même recalcul continu de la dérive tectonique, la distinction de nom relevant surtout d'une convention historique",
    ],
    correctIndex: 1,
    explanation: "ITRF est un référentiel global recalculé en continu, qui suit le mouvement réel de la croûte (~2-3 cm/an en Europe). ETRS89 fixe ce mouvement à une époque de référence (1989), ce qui permet à un cadastre de rester utilisable sans recalcul permanent.",
  },
  {
    question: "En pratique (QGIS, PROJ), la transformation de Helmert à 7 paramètres utilise :",
    choices: [
      "La matrice de rotation trigonométrique complète, résolue par un algorithme itératif non linéaire",
      "Une version linéarisée aux petits angles, les rotations entre référentiels proches étant de l'ordre de la seconde d'arc",
      "Uniquement les trois paramètres de translation, les rotations étant jugées négligeables et ignorées",
      "Un facteur d'échelle unique appliqué globalement, sans aucun terme de translation ni de rotation",
    ],
    correctIndex: 1,
    explanation: "Les rotations entre deux référentiels proches (ex. ITRF et ETRS89) sont de l'ordre de la fraction de seconde d'arc : la formule est linéarisée en une transformation affine résoluble directement par moindres carrés, plutôt que d'utiliser la matrice de rotation complète.",
  },
]
