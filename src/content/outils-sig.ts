import type { ContentBlock } from "./types"

export const outilsSigContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Un SIG (Système d'Information Géographique) permet de stocker, visualiser, interroger et analyser des données géographiques. Ce module présente QGIS (le SIG open-source de référence, gratuit et multiplateforme), puis les grandes familles d'analyses spatiales qu'on retrouve dans tout logiciel SIG, les bases théoriques de l'analyse spatiale (autocorrélation, échelle), les bases de données géographiques, avant d'introduire l'automatisation en Python.",
  },

  { type: "heading", text: "1. Prise en main de QGIS" },
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
    text: "QGIS reprojette à la volée l'affichage des couches, mais tout calcul de distance/surface doit se faire dans un système de coordonnées projeté et métrique (voir module 1). Vérifier le CRS du projet (coin bas-droit de la fenêtre) avant tout calcul.",
  },

  { type: "heading", text: "2. Les grandes familles d'analyses spatiales" },
  {
    type: "table",
    headers: ["Opération", "Ce qu'elle fait", "Exemple d'usage"],
    rows: [
      ["Buffer (zone tampon)", "Crée un polygone à une distance fixe autour d'une géométrie", "Zone de 200 m autour d'un cours d'eau (bande réglementaire)"],
      ["Intersection", "Ne garde que la partie commune entre deux couches", "Parcelles agricoles qui recoupent une zone inondable"],
      ["Union / Dissolve", "Fusionne des géométries adjacentes de même valeur", "Fusionner des parcelles cadastrales par commune"],
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
    text: "Buffer, intersection, union, différence et différence symétrique sont les cinq opérations classiques de l'algèbre booléenne appliquées à des polygones plutôt qu'à des ensembles abstraits. Comprendre l'une d'elles comme un diagramme de Venn géométrique rend les quatre autres immédiates — c'est la même logique, seule l'opération change.",
  },

  { type: "heading", text: "3. Requêtes attributaires et spatiales" },
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
    text: "« Tout est lié à tout le reste, mais les choses proches sont plus liées que les choses distantes. » Formulée par Waldo Tobler, cette proposition justifie l'essentiel des méthodes d'analyse spatiale : l'interpolation (estimer une valeur inconnue à partir des points voisins), le lissage spatial, l'autocorrélation. Sans elle, un buffer ou une jointure spatiale n'aurait aucune justification théorique — ce ne serait qu'un calcul arbitraire.",
  },
  {
    type: "paragraph",
    text: "L'autocorrélation spatiale mesure précisément à quel point cette proximité influence la ressemblance : un indice de Moran (I de Moran, Moran 1950) proche de +1 signale un fort regroupement de valeurs similaires (une maladie qui se propage en tache d'huile, un indice de végétation homogène par massif) ; proche de -1, une alternance de valeurs opposées ; proche de 0, une répartition aléatoire sans structure spatiale.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Le problème du zonage arbitraire (MAUP)",
    text: "Le Modifiable Areal Unit Problem, formalisé par Openshaw (1984), montre qu'un même jeu de données peut donner des résultats statistiques très différents selon le découpage administratif ou la maille choisie pour l'agréger (commune, canton, carreau de 1 km). Ce n'est pas une erreur de calcul : c'est une propriété structurelle de toute donnée agrégée spatialement. Toute carte de statistiques par zone (densité par commune, taux par département) doit être lue en gardant ce biais potentiel à l'esprit — changer d'échelle de zonage peut faire apparaître ou disparaître une corrélation.",
  },

  { type: "heading", text: "5. Statistiques de zone et algèbre raster", level: "superieur" },
  {
    type: "paragraph",
    text: "Sur une donnée raster, deux familles d'opérations complètent les opérations vectorielles vues en section 2 :",
  },
  {
    type: "list",
    items: [
      "Statistiques de zone (zonal statistics) : calcule une statistique (moyenne, somme, max, écart-type) d'un raster à l'intérieur de chaque polygone d'une couche vectorielle — l'outil qui permet, par exemple, de résumer le NDVI moyen de chaque parcelle plutôt que de garder un indice pixel par pixel",
      "Algèbre raster (map algebra, calculatrice raster) : combine plusieurs rasters pixel à pixel avec des opérations arithmétiques ou logiques — c'est ainsi que se calcule tout indice spectral (NDVI = (NIR−Rouge)/(NIR+Rouge)) directement dans QGIS ou avec GDAL",
      "Analyse de voisinage (focal statistics, filtre à noyau) : recalcule chaque pixel à partir de son voisinage — détaillée dans le module L'Intelligence, qui la relie aux réseaux de neurones convolutifs",
    ],
  },

  { type: "heading", text: "6. Automatisation avec Python" },
  {
    type: "paragraph",
    text: "Au-delà de quelques traitements manuels, l'automatisation devient indispensable : traiter des dizaines de fichiers, reproduire un même enchaînement d'analyses sur des données mises à jour régulièrement, ou effectuer des calculs qui n'existent pas nativement dans l'interface. Deux approches complémentaires :",
  },
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
    note: "Reprojection en Lambert-93 (EPSG:2154) avant calcul de surface : indispensable, voir la mise en garde du module 1 sur les coordonnées géographiques.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Vers la pratique",
    text: "Le module Travaux pratiques met en œuvre ces outils sur des cas concrets : chargement d'une image Sentinel-2 dans QGIS, calcul de NDVI par calculatrice raster, puis croisement avec une couche vectorielle via une analyse spatiale.",
  },

  { type: "heading", text: "7. Bases de données géographiques : PostGIS", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Au-delà d'un fichier unique (Shapefile, GeoPackage), une organisation qui gère de gros volumes de données géographiques, avec plusieurs utilisateurs simultanés, s'appuie généralement sur une base de données spatiale. PostGIS, une extension du système de gestion de base de données relationnelle libre PostgreSQL, en est le standard open-source de référence.",
  },
  {
    type: "formula",
    label: "Exemple de requête spatiale SQL (PostGIS)",
    formula: "SELECT nom FROM communes WHERE ST_Intersects(geom, ST_Buffer(riviere_geom, 200));",
    note: "Sélectionne toutes les communes qui intersectent une zone tampon de 200 m autour d'une rivière — la même opération que la section 2 (buffer + intersection), mais exprimée directement en SQL spatial, exécutable sur des millions d'entités sans passer par une interface graphique.",
  },
  {
    type: "list",
    items: [
      "Index spatial (GiST) : structure qui accélère considérablement les requêtes spatiales sur de grands volumes, indispensable au-delà de quelques dizaines de milliers d'entités",
      "Topologie : PostGIS peut imposer des règles de cohérence géométrique (pas de chevauchement entre parcelles, réseau routier topologiquement connecté) — un vrai fichier Shapefile ne garantit rien de tel par construction",
      "Un serveur PostGIS peut alimenter directement QGIS (comme n'importe quelle couche), un service web (WMS/WFS, voir module Fondements), ou une application cartographique en ligne",
    ],
  },

  { type: "heading", text: "8. Qualité des données et métadonnées", level: "superieur" },
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
    text: "Après un géoréférencement (voir module Travaux pratiques, séance 2) ou un contrôle qualité, la précision d'un jeu de données se documente souvent par une RMSE (Root Mean Square Error) : la racine carrée de la moyenne des écarts au carré entre la position mesurée et la position de référence, sur un ensemble de points de contrôle indépendants. Une RMSE de 5 m signifie, en simplifiant, qu'un point typique de la couche est décalé d'environ 5 m par rapport à la réalité terrain.",
  },
]
