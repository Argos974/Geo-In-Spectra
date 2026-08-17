import type { QuizQuestion } from "./types"

export const travauxPratiquesQuiz: QuizQuestion[] = [
  {
    question: "Dans la calculatrice raster QGIS, quelle expression calcule le NDVI à partir de B04 (rouge) et B08 (NIR) ?",
    choices: [
      "(\"B04@1\" - \"B08@1\") / (\"B04@1\" + \"B08@1\")",
      "(\"B08@1\" - \"B04@1\") / (\"B08@1\" + \"B04@1\")",
      "\"B08@1\" / \"B04@1\"",
      "(\"B08@1\" + \"B04@1\") / 2",
    ],
    correctIndex: 1,
    explanation: "NDVI = (NIR − Rouge) / (NIR + Rouge), soit (B08 − B04) / (B08 + B04) sur Sentinel-2.",
  },
  {
    question: "Pourquoi télécharger une image Sentinel-2 de niveau L2A plutôt que L1C pour calculer un indice ?",
    choices: [
      "L2A est gratuite, L1C est payante",
      "L2A est déjà corrigée des effets atmosphériques",
      "L1C n'a pas de bande NIR",
      "Il n'y a aucune différence pour le calcul d'indice",
    ],
    correctIndex: 1,
    explanation: "Le niveau L2A applique une correction atmosphérique, indispensable pour que la réflectance mesurée (et donc l'indice calculé) soit comparable d'une image à l'autre.",
  },
  {
    question: "Dans le TP buffer + intersection, pourquoi créer d'abord un tampon autour des cours d'eau ?",
    choices: [
      "Pour améliorer l'affichage cartographique uniquement",
      "Pour matérialiser la bande réglementaire avant de croiser avec les parcelles",
      "Parce que QGIS l'exige avant toute intersection",
      "Pour convertir les cours d'eau en raster",
    ],
    correctIndex: 1,
    explanation: "Le buffer transforme la ligne du cours d'eau en une zone (ex. 200 m, bande réglementaire), qu'on peut ensuite intersecter avec les parcelles pour savoir lesquelles sont concernées.",
  },
  {
    question: "Pour géoréférencer une image par une grille de coordonnées, la méthode fiable consiste à :",
    choices: [
      "Caler l'image visuellement contre un fond de carte, à l'œil",
      "Placer des points de contrôle sur les intersections de la grille, avec leur coordonnée réelle lue sur les codes affichés",
      "Utiliser directement les coordonnées du centre de l'image",
      "Le géoréférencement ne nécessite jamais de vérification une fois fait",
    ],
    correctIndex: 1,
    explanation: "Chaque intersection de grille est un point de contrôle à coordonnée réelle certaine. Le résultat doit ensuite être vérifié contre une couche de référence indépendante, jamais supposé correct.",
  },
  {
    question: "Le mini-projet final doit combiner au minimum :",
    choices: [
      "Une donnée vecteur seule",
      "Une donnée vecteur, une donnée raster ou indice calculé, et au moins une analyse spatiale",
      "Uniquement des captures d'écran de QGIS",
      "Cinq couches vecteur différentes sans analyse",
    ],
    correctIndex: 1,
    explanation: "L'énoncé demande explicitement de croiser au moins une donnée vecteur, une donnée raster (ou un indice calculé), et une analyse spatiale (buffer, intersection ou jointure).",
  },
  {
    question: "Dans la séance de classification supervisée, pourquoi réserver 30 % des polygones d'entraînement avant de lancer le classifieur ?",
    choices: [
      "Pour accélérer le calcul",
      "Pour disposer d'un jeu de test indépendant, jamais montré au modèle, et évaluer honnêtement sa précision",
      "QGIS l'exige techniquement",
      "Pour réduire la taille du fichier exporté",
    ],
    correctIndex: 1,
    explanation: "Évaluer un classifieur sur les mêmes données que celles utilisées pour l'entraîner donne une précision artificiellement optimiste. Un jeu de test réservé et jamais vu par le modèle est indispensable à une évaluation honnête.",
  },
  {
    question: "Pour vérifier rapidement le CRS et le nombre d'entités d'un GeoPackage sans ouvrir QGIS, on utilise :",
    choices: ["gdalinfo", "ogrinfo", "ffmpeg", "curl"],
    correctIndex: 1,
    explanation: "ogrinfo (GDAL/OGR) inspecte une couche vecteur en ligne de commande : nombre d'entités, CRS, champs. gdalinfo joue le même rôle pour un raster.",
  },
]
