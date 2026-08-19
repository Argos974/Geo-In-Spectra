import type { QuizQuestion } from "./types"

export const travauxPratiquesQuiz: QuizQuestion[] = [
  {
    question: "Dans la calculatrice raster QGIS, quelle expression calcule le NDVI à partir de B04 (rouge) et B08 (NIR) ?",
    choices: [
      "(\"B04@1\" - \"B08@1\") / (\"B04@1\" + \"B08@1\")",
      "(\"B08@1\" - \"B04@1\") / (\"B08@1\" + \"B04@1\")",
      "(\"B08@1\" + \"B04@1\") / (\"B08@1\" - \"B04@1\")",
      "(\"B08@1\" - \"B04@1\") / (\"B08@1\" * \"B04@1\")",
    ],
    correctIndex: 1,
    explanation: "NDVI = (NIR − Rouge) / (NIR + Rouge), soit (B08 − B04) / (B08 + B04) sur Sentinel-2.",
  },
  {
    question: "Pourquoi télécharger une image Sentinel-2 de niveau L2A plutôt que L1C pour calculer un indice ?",
    choices: [
      "L2A bénéficie surtout d'un rééchantillonnage à résolution plus fine que L1C, la correction atmosphérique étant appliquée aux deux niveaux",
      "L2A a subi une correction atmosphérique complète, alors que L1C reste en réflectance au sommet de l'atmosphère (TOA)",
      "L1C est déjà exprimée en réflectance de surface, L2A n'ajoutant qu'un masque de nuages plus précis",
      "La différence entre L2A et L1C ne porte que sur le nombre de bandes spectrales disponibles, pas sur la correction atmosphérique",
    ],
    correctIndex: 1,
    explanation: "Le niveau L2A applique une correction atmosphérique, indispensable pour que la réflectance mesurée (et donc l'indice calculé) soit comparable d'une image à l'autre.",
  },
  {
    question: "Dans le TP buffer + intersection, pourquoi créer d'abord un tampon autour des cours d'eau ?",
    choices: [
      "Pour améliorer uniquement le rendu cartographique de la carte finale, sans que cela influence le résultat de l'intersection",
      "Pour matérialiser la bande réglementaire (ex. 200 m) autour du cours d'eau, avant de la croiser avec les parcelles concernées",
      "Parce que l'outil intersection de QGIS refuse par principe de travailler directement sur une géométrie de type ligne",
      "Pour convertir la ligne du cours d'eau en couche raster, seul format accepté par l'outil intersection utilisé ensuite",
    ],
    correctIndex: 1,
    explanation: "Le buffer transforme la ligne du cours d'eau en une zone (ex. 200 m, bande réglementaire), qu'on peut ensuite intersecter avec les parcelles pour savoir lesquelles sont concernées.",
  },
  {
    question: "Pour géoréférencer une image par une grille de coordonnées, la méthode fiable consiste à :",
    choices: [
      "Caler l'image visuellement contre un fond de carte existant, en ajustant à l'œil jusqu'à ce que les routes semblent coïncider",
      "Placer des points de contrôle sur les intersections de la grille, avec leur coordonnée réelle lue sur les codes affichés",
      "Placer des points de contrôle uniquement sur les quatre coins de l'image, puis interpoler linéairement les coordonnées entre eux",
      "Placer un seul point de contrôle au centre de l'image et déduire le reste à partir de l'échelle indiquée dans la légende",
    ],
    correctIndex: 1,
    explanation: "Chaque intersection de grille est un point de contrôle à coordonnée réelle certaine. Le résultat doit ensuite être vérifié contre une couche de référence indépendante, jamais supposé correct.",
  },
  {
    question: "Le mini-projet final doit combiner au minimum :",
    choices: [
      "Une donnée vecteur et une donnée raster, l'analyse spatiale restant optionnelle si la mise en page est particulièrement soignée",
      "Une donnée vecteur, une donnée raster ou un indice calculé, et au moins une analyse spatiale (buffer, intersection ou jointure)",
      "Plusieurs couches vecteur superposées, sans donnée raster ni indice calculé, tant que la carte reste lisible",
      "Une donnée raster ou un indice calculé seul, l'analyse spatiale n'étant demandée qu'en bonus facultatif",
    ],
    correctIndex: 1,
    explanation: "L'énoncé demande explicitement de croiser au moins une donnée vecteur, une donnée raster (ou un indice calculé), et une analyse spatiale (buffer, intersection ou jointure).",
  },
  {
    question: "Dans la séance de classification supervisée, pourquoi réserver 30 % des polygones d'entraînement avant de lancer le classifieur ?",
    choices: [
      "Pour accélérer l'entraînement du classifieur, qui converge plus vite avec un nombre réduit de polygones fournis",
      "Pour disposer d'un jeu de test indépendant, jamais montré au modèle, afin d'évaluer honnêtement sa précision",
      "Parce que l'algorithme de classification de QGIS refuse de s'exécuter au-delà d'un certain nombre de polygones",
      "Pour réduire la taille du fichier de polygones exporté avant de lancer la classification supervisée",
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
  {
    question: "Sur le jeu de données réel Vitrolles, la comparaison mesurée (pas estimée) entre Random Forest et MLP a montré :",
    choices: [
      "Le Random Forest gagne nettement (kappa proche de 0.85), confirmant l'intuition générale sur les petits jeux de données",
      "Le MLP à 50 neurones fait légèrement mieux (kappa 0.673 contre 0.640), contredisant l'intuition générale sur petits jeux de données",
      "Les deux modèles obtiennent un kappa quasi identique autour de 0.5, rendant la comparaison peu concluante sur ce jeu",
      "Le Random Forest gagne, mais seulement de façon marginale (kappa 0.645 contre 0.640), un écart jugé non significatif",
    ],
    correctIndex: 1,
    explanation: "Résultat réel mesuré sur les pixels Vitrolles (labels SCL réels, découpage spatial train/test) : le MLP(50) obtient un kappa légèrement supérieur au Random Forest : la bonne pratique est de toujours mesurer sur son propre jeu, pas de présumer selon une règle générale.",
  },
  {
    question: "Dans la séance radar et interpolation spatiale, pourquoi télécharger une scène Sentinel-1 sur la même zone qu'une image Sentinel-2 déjà utilisée ?",
    choices: [
      "Pour remplacer entièrement l'image optique par la donnée radar, jugée plus fiable sur cette zone particulière",
      "Pour pratiquer séparément deux techniques vues en théorie (SAR, krigeage) sur un terrain déjà familier, plutôt que sur une zone entièrement nouvelle",
      "Parce que Sentinel-1 fournit les métadonnées de géoréférencement manquantes à l'image Sentinel-2 déjà téléchargée",
      "Pour comparer directement la rétrodiffusion radar à la réflectance optique, pixel par pixel, sur la même emprise",
    ],
    correctIndex: 1,
    explanation: "Réutiliser une zone déjà connue (au lieu d'une zone entièrement nouvelle) permet de concentrer l'effort sur la technique elle-même (lecture SAR, variogramme/krigeage), pas sur la découverte d'un nouveau terrain.",
  },
  {
    question: "Dans le bonus « donnée vivante » de la séance 4, interroger OpenStreetMap sur l'emprise exacte du jeu de données Vitrolles illustre surtout :",
    choices: [
      "Qu'OSM offre systématiquement une précision géométrique supérieure à celle d'une image satellite sur toute zone",
      "La différence entre donnée autoritative (Sentinel-2, homogène sur tout le territoire) et donnée participative (OSM, aussi complète que ses contributeurs locaux)",
      "Qu'il devient impossible d'obtenir une donnée vecteur fiable sans passer par un capteur satellite dédié",
      "Que le nombre de bâtiments recensés reste parfaitement stable d'une requête à l'autre, la base OSM étant figée",
    ],
    correctIndex: 1,
    explanation: "Le nombre de bâtiments OSM affiché peut évoluer d'une requête à l'autre (contribution continue) et être plus ou moins complet selon la zone, contrairement à une donnée satellite qui couvre uniformément tout le territoire à chaque passage.",
  },
]
