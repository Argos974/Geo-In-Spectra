import type { ContentBlock } from "./types"

export const fondamentauxContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "La géomatique regroupe l'ensemble des disciplines qui permettent d'acquérir, de traiter, d'analyser et de représenter des données géographiques : cartographie, systèmes d'information géographique (SIG), télédétection, GPS. Ce module pose les bases indispensables avant d'aborder l'imagerie satellite : comment on repère un point sur Terre, et comment on le transforme en position sur une carte plane.",
  },

  { type: "heading", text: "1. Le problème de départ : la Terre n'est pas plate" },
  {
    type: "paragraph",
    text: "La Terre est un ellipsoïde (une sphère légèrement aplatie aux pôles). Toute donnée géographique doit d'abord être rattachée à un modèle mathématique de cette forme : c'est le rôle d'un système géodésique (ou datum). Le plus utilisé au monde est WGS84, la référence du GPS. En France, l'IGN utilise RGF93, quasiment identique à WGS84 à quelques centimètres près.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Latitude / longitude : ce ne sont pas des mètres",
    text: "Un degré de longitude ne mesure pas la même distance au niveau de l'équateur qu'à Marseille : les méridiens se rapprochent vers les pôles. C'est pourquoi on ne calcule jamais une distance ou une surface directement en degrés : il faut d'abord projeter les coordonnées dans un système métrique (voir section 3).",
  },

  { type: "heading", text: "2. Coordonnées géographiques vs coordonnées projetées" },
  {
    type: "comparison",
    items: [
      {
        label: "Géographiques (angulaires)",
        points: [
          "Latitude / longitude, en degrés décimaux",
          "Exemple : 43.5297° N, 5.4474° E (Marseille)",
          "Référence : WGS84 (EPSG:4326)",
          "Pratique pour l'échange de données, pas pour mesurer des distances/surfaces",
        ],
      },
      {
        label: "Projetées (métriques)",
        points: [
          "X / Y en mètres, sur un plan",
          "Exemple : 892 000 ; 6 247 000 (Lambert-93)",
          "Référence en France : Lambert-93 (EPSG:2154)",
          "Nécessaire pour calculer distances, surfaces, buffers, superposer des couches",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Convention du projet",
    text: "L'ensemble des traitements géomatiques de ce cours (et des projets réels associés) utilise Lambert-93 / EPSG:2154 comme référentiel de calcul : c'est le standard officiel français depuis 2006. Les données sources en WGS84 (GPS, beaucoup de fichiers GeoJSON publics) sont systématiquement reprojetées avant tout calcul de distance ou de surface.",
  },

  {
    type: "diagram",
    name: "coordinate-systems",
    caption: "Un même point de Marseille, lu en degrés sur le globe puis reporté en mètres sur le plan projeté.",
  },

  { type: "heading", text: "3. Les projections cartographiques" },
  {
    type: "paragraph",
    text: "Projeter, c'est transformer la surface courbe de l'ellipsoïde en un plan. Cette opération déforme nécessairement quelque chose : les surfaces, les angles, les distances, ou un mélange des trois. Le choix d'une projection dépend donc de l'usage :",
  },
  {
    type: "list",
    items: [
      "Conforme (conserve les angles/formes localement) : ex. Lambert conique conforme, utilisée pour Lambert-93",
      "Équivalente (conserve les surfaces) : utile pour comparer des superficies (ex. usage agricole, forestier)",
      "Équidistante (conserve certaines distances) : rare en usage général",
      "Mercator (conforme, très déformante en surface aux hautes latitudes) : standard des cartes web (Google Maps, OpenStreetMap) pour sa simplicité de calcul, pas pour sa précision métrique",
    ],
  },
  {
    type: "formula",
    label: "Code EPSG : identifiant universel d'un système de coordonnées",
    formula: "EPSG:4326 = WGS84 (géographique)   ·   EPSG:2154 = Lambert-93 (France métropolitaine)   ·   EPSG:3857 = Web Mercator",
    note: "Chaque logiciel SIG (QGIS, PostGIS, Leaflet, MapLibre…) identifie un référentiel par son code EPSG. Se tromper de code EPSG au chargement d'une couche est l'erreur la plus fréquente en géomatique. Elle produit des données décalées de plusieurs centaines de mètres, parfois sans erreur visible immédiate.",
  },

  { type: "heading", text: "4. Vecteur vs raster : les deux familles de données" },
  {
    type: "comparison",
    items: [
      {
        label: "Vecteur",
        points: [
          "Objets géométriques : points, lignes, polygones",
          "Chaque objet porte des attributs (nom, catégorie, valeur…)",
          "Exemples : parcelles cadastrales, réseau routier, limites administratives",
          "Formats courants : Shapefile (.shp), GeoJSON, GeoPackage (.gpkg)",
        ],
      },
      {
        label: "Raster",
        points: [
          "Grille régulière de pixels, chaque pixel porte une valeur",
          "Résolution = taille au sol d'un pixel (ex. 10 m pour Sentinel-2)",
          "Exemples : image satellite, modèle numérique de terrain (MNT), carte de température",
          "Formats courants : GeoTIFF (.tif), NetCDF",
        ],
      },
    ],
  },
  {
    type: "diagram",
    name: "vector-raster",
    caption: "Le même paysage lu comme des objets (points, ligne, polygone) ou comme une grille de cellules.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Un même phénomène, deux représentations possibles",
    text: "Une zone forestière peut être représentée en vecteur (un polygone \"forêt\" avec un attribut essence dominante) ou en raster (un indice de végétation calculé pixel par pixel depuis une image satellite). Le choix dépend de la précision recherchée et de la source de donnée disponible : c'est un fil conducteur qu'on retrouvera dans le module Télédétection.",
  },

  { type: "heading", text: "5. Formats de données courants", level: "college-lycee" },
  {
    type: "table",
    headers: ["Format", "Type", "Points clés"],
    rows: [
      ["Shapefile (.shp)", "Vecteur", "Ancien standard (Esri), toujours très utilisé, multi-fichiers (.shp/.shx/.dbf/.prj)"],
      ["GeoJSON", "Vecteur", "Texte lisible, standard du web, coordonnées en WGS84 par convention"],
      ["GeoPackage (.gpkg)", "Vecteur (+ raster)", "Fichier unique type base de données, remplace progressivement le Shapefile"],
      ["GeoTIFF (.tif)", "Raster", "Image géoréférencée, standard pour l'imagerie satellite et les MNT"],
    ],
  },

  { type: "heading", text: "6. D'autres formats, pour des besoins précis", level: "superieur" },
  {
    type: "paragraph",
    text: "Au-delà des quatre formats du cœur du métier, chaque besoin a fait émerger son propre format, aujourd'hui incontournable dans un contexte précis :",
  },
  {
    type: "table",
    headers: ["Format", "Type", "Usage typique"],
    rows: [
      ["KML / KMZ", "Vecteur", "Format ouvert par Google Earth, très lisible, pédagogique"],
      ["WMS (Web Map Service)", "Service raster", "Diffuse une carte déjà stylisée en tant qu'image (pas de données brutes)"],
      ["WFS (Web Feature Service)", "Service vecteur", "Diffuse les entités géographiques elles-mêmes, interrogeables"],
      ["CSV avec coordonnées", "Tabulaire", "Le format le plus simple pour un relevé de terrain (colonnes X/Y ou lat/lon)"],
      ["NetCDF", "Raster multidimensionnel", "Données climatiques/océaniques avec une dimension temporelle en plus de l'espace"],
      ["LAS / LAZ", "Nuage de points", "Données LiDAR : des millions de points 3D, LAZ = LAS compressé"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "WMS vs WFS : la différence qui piège le plus souvent",
    text: "Un flux WMS renvoie une image déjà mise en forme (impossible d'en changer la couleur ou de récupérer les attributs). Un flux WFS renvoie les géométries et leurs attributs bruts, modifiables et interrogeables dans un SIG. Confondre les deux est une source fréquente de blocage en début de projet web-cartographique.",
  },

  { type: "heading", text: "7. Codes et identifiants géographiques", level: "superieur" },
  {
    type: "paragraph",
    text: "Le code EPSG identifie un système de coordonnées (section 3), mais ce n'est qu'un type de code parmi d'autres utilisés en géographie pour désigner un lieu de façon non ambiguë, sans redire son nom en toutes lettres :",
  },
  {
    type: "list",
    items: [
      "Code INSEE / COG (Code Officiel Géographique) : identifiant à 5 chiffres unique de chaque commune française, stable même si son nom change",
      "Codes NUTS (Nomenclature des Unités Territoriales Statistiques) : découpage européen normalisé (région, département, canton) utilisé pour comparer des statistiques entre pays",
      "Référence cadastrale : identifie une parcelle précise (section + numéro) au sein d'une commune, indépendamment de ses coordonnées",
      "Code postal : identifiant de distribution postale, à ne pas confondre avec une unité administrative (un code postal peut chevaucher plusieurs communes)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un code postal n'est pas une commune",
    text: "Joindre des données par code postal plutôt que par code INSEE est une erreur fréquente : plusieurs communes peuvent partager un même code postal, et une commune peut en couvrir plusieurs. Le code INSEE (ou son équivalent cadastral pour la parcelle) est la clé de jointure fiable en géomatique française.",
  },
  {
    type: "link",
    to: "/jeu/epsg",
    label: "S'entraîner : la Chasse aux EPSG",
    description: "Un jeu court pour associer les codes EPSG de cette section à leur système, en pratique plutôt qu'en lecture.",
  },

  { type: "heading", text: "8. Petite histoire de la cartographie", level: "college-lycee" },
  {
    type: "paragraph",
    text: "Mesurer et représenter la Terre n'a rien d'une invention récente. Le fil qui va de Ptolémée aux satellites d'observation actuels est continu : à chaque époque, un instrument nouveau a permis de mesurer un peu plus précisément ce que l'époque précédente ne pouvait qu'estimer.",
  },
  {
    type: "diagram",
    name: "cartography-timeline",
    caption: "De la Géographie de Ptolémée aux satellites d'observation actuels, une même quête de précision.",
  },
  {
    type: "list",
    items: [
      "Antiquité : Ptolémée (~150 apr. J.-C.) formalise un système de coordonnées et une première projection dans sa Géographia",
      "Moyen Âge / Renaissance : les portulans, cartes marines fondées sur le relevé au compas entre ports, précèdent la triangulation terrestre",
      "XVIᵉ siècle : Mercator (1569) publie sa projection conforme, encore la base du Web Mercator des cartes en ligne aujourd'hui",
      "XVIIIᵉ siècle : la famille Cassini triangule systématiquement la France, premier grand relevé topographique national",
      "XXᵉ – XXIᵉ siècle : de Landsat 1 (1972, premier satellite civil d'observation) à Sentinel-2 (2015, données ouvertes et gratuites)",
    ],
  },

  { type: "heading", text: "9. Lire une carte", level: "college-lycee" },
  {
    type: "paragraph",
    text: "Une carte topographique se lit avec une méthode, pas au hasard. Quatre éléments à vérifier systématiquement avant d'interpréter le contenu lui-même :",
  },
  {
    type: "list",
    items: [
      "La légende : sans elle, aucun symbole n'a de sens garanti — ne jamais supposer qu'une couleur ou un pictogramme signifie la même chose d'une carte à l'autre",
      "L'échelle : le rapport entre une distance sur la carte et la distance réelle (ex. 1:25 000 = 1 cm sur la carte pour 250 m sur le terrain)",
      "L'orientation : par convention le nord est en haut, sauf mention contraire explicite (flèche du nord)",
      "Les courbes de niveau : relient les points de même altitude ; plus elles sont rapprochées, plus la pente est forte",
    ],
  },

  { type: "heading", text: "10. Le débat des projections : Mercator contre Peters", level: "approfondissement" },
  {
    type: "paragraph",
    text: "La projection de Mercator (section 3) conserve les angles, ce qui la rend précieuse pour la navigation, mais déforme considérablement les surfaces aux hautes latitudes : le Groenland y paraît aussi grand que l'Afrique, alors qu'il est en réalité environ 14 fois plus petit. La projection de Peters (1973), équivalente, corrige les surfaces mais déforme fortement les formes.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Un choix de projection n'est jamais neutre",
    text: "Le débat Mercator/Peters dépasse la seule technique : représenter le monde avec une projection qui agrandit visuellement les pays du Nord (Mercator) ou qui respecte les surfaces réelles au prix de formes moins familières (Peters) porte un message implicite sur l'importance relative des territoires. C'est un bon sujet de commentaire de carte ou de dissertation (voir le module Méthodologie).",
  },

  {
    type: "callout",
    tone: "warning",
    title: "À retenir avant le module suivant",
    text: "La télédétection produit presque exclusivement des données raster (images satellite). Comprendre la différence entre résolution spatiale d'un raster et précision géométrique d'un vecteur est indispensable pour interpréter correctement une image satellite : c'est le point de départ du module 2.",
  },
]
