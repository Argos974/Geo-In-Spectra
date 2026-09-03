import type { ContentBlock } from "./types"

export const outilsSigContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Un SIG (Système d'Information Géographique) permet de stocker, visualiser, interroger et analyser des données géographiques. Ce module présente QGIS (le SIG open-source de référence, gratuit et multiplateforme), puis les grandes familles d'analyses spatiales qu'on retrouve dans tout logiciel SIG, les bases théoriques de l'analyse spatiale, les bases de données géographiques, avant d'introduire l'automatisation en Python. Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. Prise en main de QGIS", level: "lycee" },
  {
    type: "list",
    items: [
      "Panneau des couches (Layers) : liste des données chargées, ordre d'affichage du haut vers le bas",
      "Vue carte : navigation (zoom/pan), affichage selon le système de coordonnées du projet",
      "Table attributaire : chaque entité géométrique (point/ligne/polygone) est une ligne, chaque colonne un attribut",
      "Symbologie : un clic droit sur une couche > Propriétés > Symbologie permet de styliser selon un attribut (couleur par catégorie, dégradé par valeur…)",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Système de coordonnées du projet",
    text: "QGIS reprojette à la volée l'affichage des couches, mais tout calcul de distance/surface doit se faire dans un système de coordonnées projeté et métrique (voir module Fondements). Vérifier le CRS du projet (coin bas-droit de la fenêtre) avant tout calcul.",
  },

  { type: "heading", text: "2. Les cinq opérations spatiales de base", level: "lycee" },
  {
    type: "brique",
    id: "buffer-intersection",
    title: "Buffer et intersection",
    blocks: [
      {
        type: "table",
        headers: ["Opération", "Ce qu'elle fait", "Exemple d'usage"],
        rows: [
          ["Buffer (zone tampon)", "Crée un polygone à une distance fixe autour d'une géométrie", "Zone de 200 m autour d'un cours d'eau (bande réglementaire)"],
          ["Intersection", "Ne garde que la partie commune entre deux couches", "Parcelles agricoles qui recoupent une zone inondable"],
          ["Dissolve", "Fusionne des géométries adjacentes qui partagent une même valeur d'attribut", "Fusionner les parcelles cadastrales d'une même commune en un seul polygone"],
          ["Union", "Superpose deux couches et conserve toutes les géométries des deux, avec leurs attributs combinés", "Croiser des zones agricoles et des zones inondables en gardant aussi les portions non recoupées"],
          ["Différence", "Retire d'une couche la partie qui recoupe une seconde couche", "Zone constructible = zone urbaine moins zone inondable"],
          ["Jointure spatiale", "Associe les attributs d'une couche à une autre selon leur position", "Attribuer à chaque bâtiment la commune dans laquelle il se trouve"],
        ],
      },
    ],
  },
  {
    type: "diagram",
    name: "spatial-operations",
    caption: "Trois opérations spatiales fondamentales, vues comme des figures géométriques.",
  },
  { type: "game" },
  {
    type: "paragraph",
    text: "Reconnaître le bon résultat parmi des vignettes (jeu ci-dessus) est une chose ; le construire soi-même en est une autre. L'exercice suivant demande de dessiner directement le résultat de l'opération, sommet par sommet, comparé automatiquement au vrai résultat.",
  },
  { type: "live-game", name: "draw-operation" },

  { type: "heading", text: "3. Interroger une couche : requêtes attributaires et spatiales", level: "lycee" },
  {
    type: "paragraph",
    text: "Une requête attributaire filtre des entités selon leurs valeurs de champ (ex. « altitude > 500 »). Une requête spatiale filtre selon une relation géométrique avec une autre couche (ex. « parcelles situées à moins de 500 m d'une route »). QGIS permet de combiner les deux via le générateur d'expressions ou l'outil « Sélection par emplacement ».",
  },
  {
    type: "formula",
    label: "Exemple d'expression QGIS",
    formula: "\"altitude\" > 500 AND \"pente\" > 15",
    note: "Sélectionne les entités dont l'altitude dépasse 500 m ET la pente dépasse 15° : syntaxe du générateur d'expressions QGIS, proche du SQL.",
  },
  { type: "heading", text: "4. Pourquoi la proximité compte en géographie", level: "lycee" },
  {
    type: "callout",
    tone: "info",
    title: "La première loi de la géographie (Tobler, 1970)",
    text: "« Tout est lié à tout le reste, mais les choses proches sont plus liées que les choses distantes. » Cette phrase, formulée par le géographe Waldo Tobler, explique pourquoi la plupart des outils SIG (buffer, jointure spatiale, statistiques de zone) ont un sens : deux parcelles voisines se ressemblent en général plus que deux parcelles à l'autre bout du pays, en climat, en usage du sol, en prix. Sans cette proximité qui compte, un buffer ou une jointure spatiale ne serait qu'un calcul arbitraire.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple concret",
    text: "La qualité de l'air mesurée par une station se ressemble davantage avec celle d'une station à 2 km qu'avec celle d'une station à 200 km : c'est cette idée, si intuitive qu'elle semble évidente une fois énoncée, qui justifie qu'on puisse estimer la qualité de l'air à un endroit sans station en s'appuyant sur les stations proches plutôt que sur une moyenne nationale.",
  },

  { type: "heading", text: "5. Résumer un raster par zone : les statistiques de zone", level: "lycee" },
  {
    type: "paragraph",
    text: "Un indice calculé pixel par pixel (comme le NDVI, module Les Couleurs) reste difficile à comparer d'une parcelle à l'autre tant qu'il reste éclaté en des milliers de valeurs individuelles. Les statistiques de zone résument un raster à l'intérieur de chaque polygone d'une couche vectorielle : par exemple, la moyenne du NDVI de chaque parcelle agricole, un seul chiffre par parcelle plutôt qu'une valeur par pixel.",
  },
  {
    type: "live",
    name: "grid-choropleth",
    caption: "Planche vivante. Statistiques de zone réelles : 1122 cellules de 100 m, moyenne NDVI/NDMI/NDBI par cellule.",
  },

  { type: "heading", text: "6. Automatiser plutôt que répéter à la main", level: "lycee" },
  {
    type: "paragraph",
    text: "Refaire à la main la même suite de clics QGIS sur cinquante fichiers différents prend du temps et multiplie le risque d'erreur (un clic oublié sur le fichier 37). Un script Python automatise exactement cette suite d'étapes : on l'écrit une fois, il s'exécute ensuite identiquement sur autant de fichiers que nécessaire, sans jamais se fatiguer ni se tromper d'étape.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Deux façons d'automatiser en géomatique",
    text: "PyQGIS permet de piloter QGIS lui-même par un script, sans reproduire les clics à la souris. GeoPandas, une bibliothèque Python indépendante de QGIS, manipule directement les données géographiques (calculer une surface, filtrer des entités) sans passer par une interface graphique du tout — l'outil de référence pour un traitement répété sur de nombreux fichiers.",
  },

  { type: "heading", text: "7. Une donnée n'est jamais parfaite : le rôle des métadonnées", level: "lycee" },
  {
    type: "paragraph",
    text: "Une donnée géographique téléchargée sur un portail public (data.gouv.fr, Géoportail) n'est jamais exacte à 100 % : la question utile n'est pas « est-elle juste ? » mais « à quel point, et depuis quand ? ». Les métadonnées documentent cette information : la source, la date de production, la précision estimée — sans elles, une donnée reste invérifiable.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Une carte sans date n'est pas fiable",
    text: "Une couche de bâti téléchargée sans indication de date peut avoir plusieurs années : des constructions récentes peuvent manquer, ou d'anciens bâtiments démolis peuvent encore y figurer. Vérifier la date de production avant d'utiliser une donnée est un réflexe aussi basique que vérifier l'échelle d'une carte papier (module Fondements).",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : QGIS reprojette à la volée mais tout calcul de distance/surface exige un CRS projeté ; buffer/intersection/union/différence/jointure sont les cinq opérations spatiales de base ; une requête filtre par attribut, une requête spatiale filtre par position relative à une autre couche ; la loi de Tobler (proximité = ressemblance) justifie l'essentiel de l'analyse spatiale ; les statistiques de zone résument un raster par polygone ; un script Python (PyQGIS, GeoPandas) automatise une suite de traitements répétitifs ; une donnée sans métadonnées (source, date, précision) reste invérifiable.",
    ],
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Pratiquer : les premiers pas sous QGIS",
    description: "La séance 1 de l'Atelier applique directement la prise en main présentée ici sur un vrai jeu de données.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. Prise en main de QGIS, en profondeur", level: "superieur" },
  {
    type: "list",
    items: [
      "Panneau des couches (Layers) : liste des données chargées, ordre d'affichage du haut vers le bas",
      "Vue carte : navigation (zoom/pan), affichage selon le système de coordonnées du projet",
      "Table attributaire : chaque entité géométrique (point/ligne/polygone) est une ligne, chaque colonne un attribut",
      "Symbologie : un clic droit sur une couche > Propriétés > Symbologie permet de styliser selon un attribut (couleur par catégorie, dégradé par valeur…)",
      "Boîte à outils de traitement (Processing Toolbox) : accès à des centaines d'algorithmes d'analyse prêts à l'emploi, dont beaucoup viennent en réalité de GDAL/OGR et SAGA, intégrés à QGIS plutôt que réécrits",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Système de coordonnées du projet",
    text: "QGIS reprojette à la volée l'affichage des couches, mais tout calcul de distance/surface doit se faire dans un système de coordonnées projeté et métrique (voir module Fondements). Vérifier le CRS du projet (coin bas-droit de la fenêtre) avant tout calcul.",
  },

  { type: "heading", text: "2. Les grandes familles d'analyses spatiales", level: "superieur" },
  {
    type: "table",
    headers: ["Opération", "Ce qu'elle fait", "Exemple d'usage"],
    rows: [
      ["Buffer (zone tampon)", "Crée un polygone à une distance fixe autour d'une géométrie", "Zone de 200 m autour d'un cours d'eau (bande réglementaire)"],
      ["Intersection", "Ne garde que la partie commune entre deux couches", "Parcelles agricoles qui recoupent une zone inondable"],
      ["Dissolve", "Fusionne des géométries adjacentes qui partagent une même valeur d'attribut", "Fusionner les parcelles cadastrales d'une même commune en un seul polygone"],
      ["Union", "Superpose deux couches et conserve toutes les géométries des deux, avec leurs attributs combinés", "Croiser des zones agricoles et des zones inondables en gardant aussi les portions non recoupées"],
      ["Différence", "Retire d'une couche la partie qui recoupe une seconde couche", "Zone constructible = zone urbaine moins zone inondable"],
      ["Différence symétrique", "Garde tout sauf la partie commune entre deux couches", "Zones qui ont changé d'usage entre deux dates (ce qui n'est ni dans l'un ni dans l'autre exclusivement)"],
      ["Jointure spatiale", "Associe les attributs d'une couche à une autre selon leur position", "Attribuer à chaque bâtiment la commune dans laquelle il se trouve"],
      ["Clip (découpage)", "Découpe une couche selon l'emprise d'une autre", "Extraire uniquement les routes situées dans un département"],
    ],
  },
  {
    type: "diagram",
    name: "spatial-operations",
    caption: "Trois opérations spatiales fondamentales, vues comme des figures géométriques.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ces opérations reposent sur l'algèbre des ensembles",
    text: "Buffer, intersection, union, différence et différence symétrique sont les cinq opérations classiques de l'algèbre booléenne appliquées à des polygones plutôt qu'à des ensembles abstraits. Comprendre l'une d'elles comme un diagramme de Venn géométrique rend les quatre autres immédiates : c'est la même logique, seule l'opération change.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Clip et Intersection ne sont pas interchangeables",
    text: "Les deux ne gardent que la zone de recouvrement géométrique, ce qui les fait souvent confondre — mais leurs attributs diffèrent. Clip découpe une couche selon l'emprise d'une seconde, et ne conserve que les attributs de la couche découpée (la seconde ne sert que de gabarit géométrique). Intersection conserve les attributs des deux couches combinés sur chaque géométrie résultante. Utiliser Clip quand on veut juste restreindre l'étendue d'une couche à une zone d'étude ; utiliser Intersection quand la table attributaire de la couche de découpage (surface, code, date…) doit elle aussi se retrouver dans le résultat.",
  },
  { type: "game" },

  { type: "heading", text: "3. Requêtes attributaires et spatiales", level: "superieur" },
  {
    type: "paragraph",
    text: "Une requête attributaire filtre des entités selon leurs valeurs de champ (ex. : \"altitude > 500\"). Une requête spatiale filtre selon une relation géométrique avec une autre couche (ex. : \"parcelles situées à moins de 500 m d'une route\"). QGIS permet de combiner les deux via le générateur d'expressions ou l'outil \"Sélection par emplacement\".",
  },
  {
    type: "formula",
    label: "Exemple d'expression QGIS",
    formula: "\"altitude\" > 500 AND \"pente\" > 15",
    note: "Sélectionne les entités dont l'altitude dépasse 500 m ET la pente dépasse 15° : syntaxe du générateur d'expressions QGIS, proche du SQL.",
  },
  {
    type: "table",
    headers: ["Relation spatiale", "Signification"],
    rows: [
      ["Intersects", "Les deux géométries ont au moins un point commun (y compris un simple contact au bord)"],
      ["Contains / Within", "L'une contient entièrement l'autre (relation asymétrique)"],
      ["Touches", "Les géométries se touchent en un point ou une ligne, sans se superposer"],
      ["Disjoint", "Aucun point commun entre les deux géométries"],
      ["Within distance", "Distance entre les deux géométries inférieure à un seuil donné"],
    ],
  },

  { type: "heading", text: "4. Les fondements théoriques de l'analyse spatiale", level: "superieur" },
  {
    type: "paragraph",
    text: "L'analyse spatiale ne se limite pas à une boîte à outils : elle repose sur des principes formulés en géographie théorique, qui expliquent pourquoi certaines méthodes fonctionnent et où elles peuvent tromper.",
  },
  {
    type: "callout",
    tone: "info",
    title: "La première loi de la géographie (Tobler, 1970)",
    text: "« Tout est lié à tout le reste, mais les choses proches sont plus liées que les choses distantes. » Formulée par Waldo Tobler, cette proposition justifie l'essentiel des méthodes d'analyse spatiale : l'interpolation (estimer une valeur inconnue à partir des points voisins), le lissage spatial, l'autocorrélation. Sans elle, un buffer ou une jointure spatiale n'aurait aucune justification théorique : ce ne serait qu'un calcul arbitraire.",
  },
  {
    type: "brique",
    id: "moran-maup",
    title: "Autocorrélation spatiale : Moran et MAUP",
    blocks: [
      {
        type: "paragraph",
        text: "L'autocorrélation spatiale mesure précisément à quel point cette proximité influence la ressemblance : un indice de Moran (I de Moran, Moran 1950) proche de +1 signale un fort regroupement de valeurs similaires (une maladie qui se propage en tache d'huile, un indice de végétation homogène par massif) ; proche de -1, une alternance de valeurs opposées ; proche de 0, une répartition aléatoire sans structure spatiale.",
      },
      {
        type: "formula",
        label: "Indice de Moran I",
        formula: "I = (n / S0) · [ Σᵢ Σⱼ wᵢⱼ (xᵢ − x̄)(xⱼ − x̄) ] / Σᵢ (xᵢ − x̄)²",
        note: "n = nombre d'entités, xᵢ = valeur de l'entité i, x̄ = moyenne de toutes les valeurs, wᵢⱼ = poids de voisinage entre i et j (souvent 1 si les entités sont adjacentes, 0 sinon), S0 = somme de tous les poids wᵢⱼ. Le numérateur compare chaque paire d'entités voisines à la moyenne globale ; le dénominateur normalise par la variance totale. Le choix de la matrice de poids wᵢⱼ (contiguïté, distance, k plus proches voisins) n'est pas neutre : deux définitions de voisinage différentes sur la même donnée peuvent donner des I sensiblement différents, à documenter comme tout autre choix méthodologique.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Le problème du zonage arbitraire (MAUP)",
        text: "Le Modifiable Areal Unit Problem, formalisé par Openshaw (1984), montre qu'un même jeu de données peut donner des résultats statistiques très différents selon le découpage administratif ou la maille choisie pour l'agréger (commune, canton, carreau de 1 km). Ce n'est pas une erreur de calcul : c'est une propriété structurelle de toute donnée agrégée spatialement. Toute carte de statistiques par zone (densité par commune, taux par département) doit être lue en gardant ce biais potentiel à l'esprit : changer d'échelle de zonage peut faire apparaître ou disparaître une corrélation.",
      },
      {
        type: "callout",
        tone: "example",
        title: "Exemple chiffré : le MAUP en action",
        text: "Un taux de criminalité calculé par quartier peut montrer une forte corrélation avec le taux de chômage local ; recalculé sur les mêmes données mais agrégées à l'échelle de la ville entière, la même corrélation peut s'effondrer ou même s'inverser, sans qu'aucune donnée n'ait changé — seul le découpage a changé. C'est cette sensibilité au zonage, pas une erreur de mesure, qu'Openshaw a formalisée.",
      },
    ],
  },

  { type: "heading", text: "5. Statistiques de zone et algèbre raster", level: "superieur" },
  {
    type: "paragraph",
    text: "Sur une donnée raster, deux familles d'opérations complètent les opérations vectorielles vues en section 2 :",
  },
  {
    type: "list",
    items: [
      "Statistiques de zone (zonal statistics) : calcule une statistique (moyenne, somme, max, écart-type) d'un raster à l'intérieur de chaque polygone d'une couche vectorielle, l'outil qui permet, par exemple, de résumer le NDVI moyen de chaque parcelle plutôt que de garder un indice pixel par pixel",
      "Algèbre raster (map algebra, calculatrice raster) : combine plusieurs rasters pixel à pixel avec des opérations arithmétiques ou logiques : c'est ainsi que se calcule tout indice spectral (NDVI = (NIR−Rouge)/(NIR+Rouge)) directement dans QGIS ou avec GDAL",
      "Analyse de voisinage (focal statistics, filtre à noyau) : recalcule chaque pixel à partir de son voisinage, détaillée dans le module L'Intelligence, qui la relie aux réseaux de neurones convolutifs",
    ],
  },
  {
    type: "live",
    name: "grid-choropleth",
    caption: "Planche vivante. Statistiques de zone réelles (résultat de référence de la séance 3 de l'Atelier) : 1122 cellules de 100 m, moyenne NDVI/NDMI/NDBI par cellule.",
  },
  {
    type: "link",
    to: "/module/indices-spectraux",
    label: "Voir en pratique : la calculatrice raster pour un NDVI",
    description: "Le module Les Couleurs utilise directement l'algèbre raster présentée ici pour calculer NDVI, NDMI, NDBI et leurs dérivés.",
  },

  { type: "heading", text: "6. Automatisation avec Python", level: "superieur" },
  {
    type: "paragraph",
    text: "Au-delà de quelques traitements manuels, l'automatisation devient indispensable : traiter des dizaines de fichiers, reproduire un même enchaînement d'analyses sur des données mises à jour régulièrement, ou effectuer des calculs qui n'existent pas nativement dans l'interface. Deux approches complémentaires :",
  },
  {
    type: "brique",
    id: "pyqgis-automation",
    title: "Automatiser avec PyQGIS et GeoPandas",
    blocks: [
      {
        type: "comparison",
        items: [
          {
            label: "PyQGIS",
            points: [
              "API Python intégrée à QGIS",
              "Accès à la console Python (Extension > Console Python)",
              "Permet d'automatiser des chaînes de traitements QGIS existants",
              "Utile pour scripter des exports, styles, ou traitements répétitifs dans QGIS",
            ],
          },
          {
            label: "GeoPandas (hors QGIS)",
            points: [
              "Bibliothèque Python autonome, basée sur pandas + Shapely",
              "Manipulation de données vecteur en dehors de toute interface graphique",
              "Standard pour les pipelines de traitement de données géographiques en Python",
              "S'intègre naturellement avec rasterio (raster), matplotlib (cartes rapides)",
            ],
          },
        ],
      },
      {
        type: "formula",
        label: "Exemple GeoPandas : calcul de surface",
        formula: "gdf['surface_ha'] = gdf.to_crs(epsg=2154).area / 10_000",
        note: "Reprojection en Lambert-93 (EPSG:2154) avant calcul de surface : indispensable, voir la mise en garde du module Fondements sur les coordonnées géographiques.",
      },
    ],
  },
  {
    type: "paragraph",
    text: "La console Python de QGIS convient pour un test rapide, mais pas pour un vrai script GeoPandas de plusieurs dizaines de lignes : sans coloration ni autocomplétion fiable, sans historique de versions, la moindre erreur devient longue à localiser. Visual Studio Code (VS Code), éditeur de code gratuit, comble ce manque : c'est l'environnement de travail réel pour écrire, déboguer et versionner les scripts GeoPandas/PyQGIS présentés ci-dessus, en dehors de toute interface SIG.",
  },
  {
    type: "list",
    items: [
      "Extension « Python » (Microsoft) : coloration syntaxique, autocomplétion sur les objets GeoPandas (GeoDataFrame, geometry…), détection des erreurs avant même d'exécuter le script",
      "Extension « Jupyter » : exécuter le script cellule par cellule pour inspecter un GeoDataFrame intermédiaire (gdf.head(), gdf.plot()) sans tout relancer depuis le début",
      "Terminal intégré : lancer le script (python mon_script.py) sans quitter l'éditeur, dans le même environnement Python que les imports du fichier",
      "Extension Git (intégrée nativement) : suivre l'évolution d'un script de traitement dans le temps, comme un plan de carte qu'on versionnerait — utile dès qu'un script est repris ou partagé",
    ],
  },
  {
    type: "comparison",
    items: [
      {
        label: "Console Python QGIS",
        points: [
          "Ouverte en permanence dans QGIS, accès direct aux couches déjà chargées",
          "Adaptée à un test ponctuel de quelques lignes",
          "Pas de vrai débogueur, pas de suivi de versions",
        ],
      },
      {
        label: "VS Code",
        points: [
          "Éditeur dédié, en dehors de QGIS",
          "Adapté à un script GeoPandas complet, réutilisable, versionné",
          "Point d'arrêt (breakpoint) pour inspecter une variable à l'endroit exact où le calcul dérape, plutôt que d'multiplier les print()",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Un point d'arrêt vaut mieux qu'un print()",
    text: "Poser un point d'arrêt (clic dans la marge à gauche d'une ligne, puis F5 en mode débogage) suspend le script à cet endroit précis et permet d'inspecter le contenu réel de chaque variable — gdf, une géométrie, un CRS — au lieu de deviner où ça casse en semant des print() qu'il faut ensuite retirer un par un.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Vers la pratique",
    text: "Le module Travaux pratiques met en œuvre ces outils sur des cas concrets : chargement d'une image Sentinel-2 dans QGIS, calcul de NDVI par calculatrice raster, puis croisement avec une couche vectorielle via une analyse spatiale.",
  },

  { type: "heading", text: "7. Qualité des données et métadonnées", level: "superieur" },
  {
    type: "paragraph",
    text: "Une donnée géographique n'est jamais parfaitement exacte, et ne prétend jamais l'être : ce qui compte, c'est de savoir à quel point elle l'est, et de le documenter pour quiconque la réutilise après vous.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Précision",
        points: [
          "Répétabilité de la mesure : des mesures répétées donnent-elles des résultats proches ?",
          "Une donnée peut être précise sans être exacte (biais systématique)",
        ],
      },
      {
        label: "Exactitude",
        points: [
          "Proximité avec la valeur réelle sur le terrain",
          "Se vérifie par comparaison à une référence indépendante (relevé GPS de contrôle, orthophoto)",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Résolution n'est pas précision",
    text: "Un raster à 10 m de résolution spatiale n'est pas nécessairement localisé avec une précision de 10 m : la résolution décrit la taille du pixel, la précision géométrique décrit l'écart entre la position affichée et la position réelle. Les deux notions sont indépendantes et se confondent souvent à tort.",
  },
  {
    type: "list",
    items: [
      "Les métadonnées documentent la source, la date, le système de coordonnées, la précision estimée et la méthode de production d'une couche",
      "Sans métadonnées, une donnée téléchargée reste invérifiable : impossible de savoir si elle est encore à jour ou dans quelles conditions elle a été produite",
      "La norme ISO 19115 encadre la structure des métadonnées géographiques, reprise par la plupart des portails de données ouvertes (dont data.gouv.fr)",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "L'erreur quadratique moyenne (RMSE), la mesure standard de la précision géométrique",
    text: "Après un géoréférencement (voir module Travaux pratiques, séance 2) ou un contrôle qualité, la précision d'un jeu de données se documente souvent par une RMSE (Root Mean Square Error) : la racine carrée de la moyenne des écarts au carré entre la position mesurée et la position de référence, sur un ensemble de points de contrôle indépendants. Une RMSE de 5 m signifie, en simplifiant, qu'un point typique de la couche est décalé d'environ 5 m par rapport à la réalité terrain — déjà rencontrée dans l'exercice du module Fondements.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : Tobler justifie théoriquement l'analyse spatiale (proximité = ressemblance) ; Moran quantifie l'autocorrélation, le MAUP rappelle que le découpage n'est jamais neutre ; statistiques de zone (vecteur+raster) et algèbre raster (pixel à pixel) sont les deux ponts entre les deux familles de données ; PyQGIS automatise QGIS, GeoPandas s'en affranchit ; précision ≠ exactitude ≠ résolution, et une RMSE documente la précision géométrique.",
    ],
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Continuer : LISA, points chauds et régression spatiale",
    description: "Le module Les Statistiques prolonge Moran et Tobler vers des méthodes locales (LISA, Gi*) et la régression spatiale.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. Bases de données géographiques : PostGIS", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà d'un fichier unique (Shapefile, GeoPackage), une organisation qui gère de gros volumes de données géographiques, avec plusieurs utilisateurs simultanés, s'appuie généralement sur une base de données spatiale. PostGIS, une extension du système de gestion de base de données relationnelle libre PostgreSQL, en est le standard open-source de référence.",
  },
  {
    type: "formula",
    label: "Exemple de requête spatiale SQL (PostGIS)",
    formula: "SELECT nom FROM communes WHERE ST_Intersects(geom, ST_Buffer(riviere_geom, 200));",
    note: "Sélectionne toutes les communes qui intersectent une zone tampon de 200 m autour d'une rivière, la même opération que buffer + intersection en interface graphique, mais exprimée directement en SQL spatial, exécutable sur des millions d'entités sans passer par une interface graphique.",
  },
  {
    type: "list",
    items: [
      "Index spatial (GiST) : structure qui accélère considérablement les requêtes spatiales sur de grands volumes, indispensable au-delà de quelques dizaines de milliers d'entités",
      "Topologie : PostGIS peut imposer des règles de cohérence géométrique (pas de chevauchement entre parcelles, réseau routier topologiquement connecté) : un vrai fichier Shapefile ne garantit rien de tel par construction",
      "Un serveur PostGIS peut alimenter directement QGIS (comme n'importe quelle couche), un service web (WMS/WFS, voir module Fondements), ou une application cartographique en ligne",
    ],
  },
  {
    type: "diagram",
    name: "spatial-index-tree",
    caption: "Un index GiST organise les géométries en rectangles englobants imbriqués : éliminer vite les candidats impossibles avant de tester la géométrie exacte.",
  },
  {
    type: "link",
    to: "/module/bases-donnees-spatiales",
    label: "Aller plus loin : index GiST, jointures spatiales et performance",
    description: "Le module La Base détaille PostGIS en profondeur : index spatiaux, EXPLAIN ANALYZE, exposition web d'une base spatiale.",
  },

  { type: "heading", text: "2. Géostatistique : interpoler avec le krigeage", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Estimer une valeur continue (pluviométrie, teneur en polluant, altitude) en un point non mesuré à partir d'un échantillon de points de mesure est un problème classique d'interpolation spatiale. Les méthodes déterministes simples (plus proche voisin, pondération inverse à la distance, IDW) ignorent la structure spatiale propre du phénomène ; le krigeage, lui, l'estime statistiquement avant d'interpoler.",
  },
  {
    type: "formula",
    label: "Variogramme expérimental : mesurer comment la ressemblance décroît avec la distance",
    formula: "γ(h) = (1 / 2N(h)) · Σ [z(xᵢ) − z(xᵢ + h)]²",
    note: "γ(h) est la semi-variance moyenne entre toutes les paires de points séparées d'une distance h, N(h) leur nombre. Contrairement à l'indice de Moran (mesure globale d'autocorrélation, piste Licence/BUT), le variogramme décrit comment la ressemblance décroît spécifiquement en fonction de la distance. Un modèle théorique (sphérique, exponentiel, gaussien) est ensuite ajusté sur ce nuage de points expérimental.",
  },
  {
    type: "diagram",
    name: "variogram",
    caption: "Forme typique d'un variogramme : effet de pépite à l'origine, montée jusqu'au palier, atteint à la portée.",
  },
  {
    type: "list",
    items: [
      "Portée (range) : distance au-delà de laquelle deux points ne sont plus statistiquement liés ; au-delà, γ(h) plafonne",
      "Palier (sill) : valeur de γ(h) à laquelle le variogramme plafonne, proche de la variance totale du phénomène",
      "Effet de pépite (nugget) : discontinuité à l'origine (h→0), traduisant soit une erreur de mesure, soit une variabilité à une échelle plus fine que l'échantillonnage",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Ce que le krigeage ajoute par rapport à l'IDW",
    text: "Une fois le variogramme ajusté, le krigeage l'utilise pour pondérer optimalement chaque point de mesure (au sens de la variance d'estimation minimale, sous hypothèse de stationnarité du phénomène), contrairement à l'IDW, dont la pondération par la seule distance est une convention arbitraire, pas une propriété statistiquement optimale du phénomène étudié. Le krigeage fournit en prime une carte d'incertitude (variance de krigeage), pas seulement une carte de valeurs estimées : on sait où l'estimation est fiable et où elle ne l'est pas, typiquement loin de tout point de mesure.",
  },

  { type: "heading", text: "3. Analyse réseau et décision multicritère", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Deux familles d'analyse spatiale, distinctes des opérations vectorielles/raster déjà vues, répondent à des questions différentes : « comment circule-t-on dans l'espace ? » et « comment arbitrer entre plusieurs critères contradictoires sur un même territoire ? »",
  },
  {
    type: "list",
    items: [
      "Analyse réseau (plus court chemin) : un réseau routier ou hydrographique est modélisé comme un graphe (nœuds = intersections, arêtes = tronçons pondérés par une distance, un temps ou un coût) ; l'algorithme de Dijkstra (1959) calcule le chemin de coût minimal entre deux nœuds, la base de tout calcul d'itinéraire ou de zone de chalandise (isochrone)",
      "Zone de service (service area) : ensemble des points atteignables depuis un point donné en deçà d'un coût maximal (ex. tout ce qui est à moins de 15 minutes d'un hôpital), une extension directe de Dijkstra, pas un algorithme différent",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "A* : Dijkstra guidé par une estimation de la distance restante",
    text: "Sur un très grand réseau routier national, Dijkstra explore le graphe dans toutes les directions à partir du point de départ, y compris à l'opposé de la destination réelle. L'algorithme A* (Hart, Nilsson & Raphael, 1968) ajoute une heuristique (typiquement la distance à vol d'oiseau restante jusqu'à la destination) qui oriente la recherche, réduisant fortement le nombre de nœuds explorés sans jamais renoncer à trouver le chemin réellement optimal, tant que l'heuristique ne surestime jamais la distance réelle restante. C'est l'algorithme derrière la quasi-totalité des calculs d'itinéraire routier grand public.",
  },
  {
    type: "brique",
    id: "krigeage-multicritere",
    title: "Krigeage et décision multicritère",
    blocks: [
      {
        type: "formula",
        label: "AHP (Analytic Hierarchy Process, Saaty, 1980) : pondérer plusieurs critères spatiaux",
        formula: "Score(x) = Σᵢ wᵢ · critère_i(x)   avec Σᵢ wᵢ = 1",
        note: "Utilisée pour combiner plusieurs couches raster/vecteur normalisées (pente, distance aux routes, exposition, occupation du sol…) en une carte de synthèse unique : typiquement une carte d'aptitude ou de risque. Les poids wᵢ ne sont pas fixés arbitrairement : l'AHP les dérive d'une matrice de comparaisons deux à deux entre critères (« la pente compte-t-elle plus ou moins que la distance aux routes, et dans quelle proportion ? »), avec un ratio de cohérence qui signale si les comparaisons fournies par l'expert sont mutuellement contradictoires.",
      },
      {
        type: "callout",
        tone: "example",
        title: "Lien direct avec les indices composites du module Les Couleurs",
        text: "Un indice composite de comportement du feu (module Les Couleurs, section indices composés) qui pondère NDMI, alignement vent/pente et exposition solaire est, de fait, une application d'AHP simplifiée : chaque couche est un critère normalisé, chaque poids reflète l'importance relative jugée du critère. Documenter explicitement ces poids (et idéalement leur cohérence, au sens de Saaty) plutôt que les fixer « au jugé » est ce qui distingue une analyse multicritère rigoureuse d'un bricolage de pondérations.",
      },
      {
        type: "callout",
        tone: "question",
        title: "À toi de voir",
        text: "Le krigeage et l'AHP répondent tous deux à un problème de pondération, mais de nature très différente. En quoi la pondération du krigeage (dérivée du variogramme) est-elle plus « objective » que celle de l'AHP (dérivée du jugement d'un expert) — et pourquoi cette différence n'invalide-t-elle pas l'AHP pour autant ?",
      },
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : PostGIS structure et interroge de gros volumes en SQL spatial (index GiST, topologie) ; le krigeage interpole en s'appuyant sur un variogramme ajusté (portée, palier, pépite), plus rigoureux qu'une simple pondération par la distance (IDW) ; Dijkstra calcule un plus court chemin sur un graphe, base de toute zone de chalandise ; l'AHP pondère explicitement plusieurs critères pour une carte de synthèse (aptitude, risque).",
    ],
  },
  {
    type: "link",
    to: "/module/bases-donnees-spatiales",
    label: "Continuer : bases de données spatiales en profondeur",
    description: "Le module La Base reprend PostGIS depuis les index spatiaux jusqu'à l'exposition web d'une base spatiale complète.",
  },
]
