import type { QuizQuestion } from "./types"

export const outilsSigQuiz: QuizQuestion[] = [
  {
    question: "Quelle opération spatiale ne garde que la partie commune entre deux couches ?",
    choices: [
      "Le buffer, qui crée une zone tampon autour des entités à une distance donnée",
      "L'intersection, qui ne conserve que la zone commune aux deux couches",
      "L'union ou le dissolve, qui fusionne les entités de plusieurs couches",
      "Le clip, qui découpe une couche selon l'emprise d'une autre couche",
    ],
    correctIndex: 1,
    explanation: "L'intersection ne conserve que la zone commune (ex. parcelles agricoles qui recoupent une zone inondable). Le buffer crée une zone tampon, l'union fusionne, le clip découpe selon une emprise.",
  },
  {
    question: "Un buffer de \"200\" appliqué sur une couche en EPSG:4326 produira une zone tampon de :",
    choices: [
      "200 mètres, car QGIS convertit automatiquement toute distance saisie en unités métriques",
      "200 degrés et non 200 mètres, car EPSG:4326 exprime ses coordonnées en degrés",
      "200 kilomètres, car QGIS interprète par défaut les valeurs de buffer en kilomètres",
      "Une erreur bloquante systématique, QGIS refusant tout buffer en CRS géographique",
    ],
    correctIndex: 1,
    explanation: "EPSG:4326 est un système géographique en degrés : un buffer de \"200\" y crée une zone de 200 degrés. Il faut d'abord reprojeter en système métrique (ex. Lambert-93).",
  },
  {
    question: "Dans QGIS, où vérifie-t-on le système de coordonnées (CRS) du projet ?",
    choices: [
      "Dans la table attributaire, au niveau de l'en-tête de la colonne active",
      "En bas à droite de la fenêtre, dans la barre d'état de QGIS",
      "Dans le menu Aide, sous l'entrée Informations système du logiciel",
      "Il n'est affiché nulle part, seules les propriétés du projet l'indiquent",
    ],
    correctIndex: 1,
    explanation: "Le CRS du projet est affiché en bas à droite de la fenêtre QGIS, à vérifier avant tout calcul de distance ou de surface.",
  },
  {
    question: "PyQGIS et GeoPandas se distinguent principalement par :",
    choices: [
      "PyQGIS est systématiquement plus rapide que GeoPandas, quel que soit le traitement effectué",
      "PyQGIS s'exécute à l'intérieur de QGIS, alors que GeoPandas fonctionne en dehors de toute interface graphique",
      "GeoPandas ne sait traiter que des données raster, pas des fichiers vecteur comme les shapefiles",
      "Ce sont en réalité deux noms différents désignant la même bibliothèque Python, développée par OSGeo",
    ],
    correctIndex: 1,
    explanation: "PyQGIS est l'API Python intégrée à QGIS (automatiser des traitements existants). GeoPandas est une bibliothèque autonome pour manipuler des données vecteur en pipeline, hors interface graphique.",
  },
  {
    question: "Avant de calculer une surface avec GeoPandas (`gdf.area`), il faut impérativement :",
    choices: [
      "Trier les entités par ordre alphabétique du champ identifiant avant le calcul de surface",
      "Reprojeter la couche dans un système de coordonnées métrique, par exemple EPSG:2154",
      "Convertir le fichier vecteur en GeoTIFF afin que `gdf.area` calcule une surface exacte",
      "Rien de particulier, `gdf.area` détecte le CRS et convertit automatiquement en mètres carrés",
    ],
    correctIndex: 1,
    explanation: "Comme pour un buffer, un calcul de surface directement en coordonnées géographiques (degrés) donne un résultat non interprétable. Reprojeter en Lambert-93 (ou un autre système métrique) est indispensable.",
  },
  {
    question: "Le Modifiable Areal Unit Problem (MAUP) désigne le fait que :",
    choices: [
      "Une carte publiée peut toujours être modifiée par la suite, tant que les données sources existent",
      "Un même jeu de données peut donner des résultats statistiques différents selon le découpage spatial choisi pour l'agréger",
      "Les unités de mesure comme les mètres et les degrés sont interchangeables sans incidence sur le résultat",
      "Un système d'information géographique ne peut traiter qu'un seul découpage administratif à la fois",
    ],
    correctIndex: 1,
    explanation: "Formalisé par Openshaw (1984), le MAUP montre que le choix d'une maille ou d'un zonage (commune, canton, carreau) influence directement le résultat statistique obtenu : une propriété structurelle, pas une erreur de calcul.",
  },
  {
    question: "Que mesure l'indice de Moran en analyse spatiale ?",
    choices: [
      "La distance moyenne séparant deux points choisis au hasard dans le jeu de données",
      "L'autocorrélation spatiale, à quel point des valeurs voisines se ressemblent dans l'espace",
      "La précision d'un géoréférencement, exprimée en écart de mètres par rapport aux points de contrôle",
      "Le nombre total d'entités présentes dans une couche vecteur donnée en entrée du traitement",
    ],
    correctIndex: 1,
    explanation: "Un indice de Moran proche de +1 signale un fort regroupement de valeurs similaires dans l'espace ; proche de 0, une répartition aléatoire sans structure spatiale.",
  },
  {
    question: "Contrairement à une simple pondération inverse à la distance (IDW), le krigeage ajoute :",
    choices: [
      "Rien de plus : le krigeage applique exactement la même formule que l'IDW, seul le nom diffère",
      "Une carte de variance de krigeage, indiquant où l'estimation est fiable et où elle l'est moins",
      "La nécessité de disposer d'un capteur radar pour collecter les données d'entrée du modèle",
      "Une résolution spatiale automatiquement plus fine que celle des points de mesure d'origine",
    ],
    correctIndex: 1,
    explanation: "Le krigeage estime d'abord la structure spatiale du phénomène via un variogramme, puis fournit à la fois une carte de valeurs et une carte d'incertitude : l'IDW, purement déterministe, ne produit que des valeurs, sans mesure de fiabilité.",
  },
  {
    question: "En SQL spatial PostGIS, `ST_Intersects(geom, ST_Buffer(riviere_geom, 200))` exécute quelle opération vue plus haut dans le module ?",
    choices: [
      "Un simple export de la couche vers un autre format, sans aucune opération spatiale réalisée",
      "La même logique que buffer puis intersection, exprimée en SQL exécutable sur des millions d'entités",
      "Un calcul de coefficient kappa, utilisé pour évaluer la qualité d'une classification obtenue",
      "Une reprojection de la couche vers un autre système de coordonnées de référence spatiale",
    ],
    correctIndex: 1,
    explanation: "C'est exactement la séquence buffer (zone tampon de 200 m) puis intersection (ST_Intersects), mais exprimée en SQL spatial, exécutable directement sur une base de données, sans passer par une interface graphique.",
  },
  {
    question: "Un index spatial (GiST) dans PostGIS sert principalement à :",
    choices: [
      "Corriger automatiquement les géométries invalides détectées dans la table attributaire",
      "Accélérer considérablement les requêtes spatiales lorsque le volume d'entités est important",
      "Reprojeter automatiquement toutes les couches de la base dans un même système de coordonnées",
      "Compresser le fichier physique de la base de données pour réduire son volume sur disque",
    ],
    correctIndex: 1,
    explanation: "Sans index spatial, chaque requête géométrique (intersection, contient, distance) doit comparer l'entité à toutes les autres une par une, un index GiST accélère cette recherche, indispensable au-delà de quelques dizaines de milliers d'entités.",
  },
]
