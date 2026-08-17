import type { ContentBlock } from "./types"

export const fondamentauxContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "La géomatique regroupe l'ensemble des disciplines qui permettent d'acquérir, de traiter, d'analyser et de représenter des données géographiques : cartographie, systèmes d'information géographique (SIG), télédétection, GPS. Ce module pose les bases indispensables avant d'aborder l'imagerie satellite : comment on repère un point sur Terre, et comment on le transforme en position sur une carte plane.",
  },

  { type: "heading", text: "1. Le problème de départ : la Terre n'est pas plate" },
  {
    type: "paragraph",
    text: "La Terre est un ellipsoïde (une sphère légèrement aplatie aux pôles). Toute donnée géographique doit d'abord être rattachée à un modèle mathématique de cette forme — c'est le rôle d'un système géodésique (ou datum). Le plus utilisé au monde est WGS84, la référence du GPS. En France, l'IGN utilise RGF93, quasiment identique à WGS84 à quelques centimètres près.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Latitude / longitude : ce ne sont pas des mètres",
    text: "Un degré de longitude ne mesure pas la même distance au niveau de l'équateur qu'à Marseille — les méridiens se rapprochent vers les pôles. C'est pourquoi on ne calcule jamais une distance ou une surface directement en degrés : il faut d'abord projeter les coordonnées dans un système métrique (voir section 3).",
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
    text: "L'ensemble des traitements géomatiques de ce cours (et des projets réels associés) utilise Lambert-93 / EPSG:2154 comme référentiel de calcul — c'est le standard officiel français depuis 2006. Les données sources en WGS84 (GPS, beaucoup de fichiers GeoJSON publics) sont systématiquement reprojetées avant tout calcul de distance ou de surface.",
  },

  { type: "heading", text: "3. Les projections cartographiques" },
  {
    type: "paragraph",
    text: "Projeter, c'est transformer la surface courbe de l'ellipsoïde en un plan. Cette opération déforme nécessairement quelque chose : les surfaces, les angles, les distances, ou un mélange des trois. Le choix d'une projection dépend donc de l'usage :",
  },
  {
    type: "list",
    items: [
      "Conforme (conserve les angles/formes localement) — ex. Lambert conique conforme, utilisée pour Lambert-93",
      "Équivalente (conserve les surfaces) — utile pour comparer des superficies (ex. usage agricole, forestier)",
      "Équidistante (conserve certaines distances) — rare en usage général",
      "Mercator (conforme, très déformante en surface aux hautes latitudes) — standard des cartes web (Google Maps, OpenStreetMap) pour sa simplicité de calcul, pas pour sa précision métrique",
    ],
  },
  {
    type: "formula",
    label: "Code EPSG — identifiant universel d'un système de coordonnées",
    formula: "EPSG:4326 = WGS84 (géographique)   ·   EPSG:2154 = Lambert-93 (France métropolitaine)   ·   EPSG:3857 = Web Mercator",
    note: "Chaque logiciel SIG (QGIS, PostGIS, Leaflet, MapLibre…) identifie un référentiel par son code EPSG. Se tromper de code EPSG au chargement d'une couche est l'erreur la plus fréquente en géomatique — elle produit des données décalées de plusieurs centaines de mètres, parfois sans erreur visible immédiate.",
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
    type: "callout",
    tone: "info",
    title: "Un même phénomène, deux représentations possibles",
    text: "Une zone forestière peut être représentée en vecteur (un polygone \"forêt\" avec un attribut essence dominante) ou en raster (un indice de végétation calculé pixel par pixel depuis une image satellite). Le choix dépend de la précision recherchée et de la source de donnée disponible — c'est un fil conducteur qu'on retrouvera dans le module Télédétection.",
  },

  { type: "heading", text: "5. Formats de données courants" },
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

  {
    type: "callout",
    tone: "warning",
    title: "À retenir avant le module suivant",
    text: "La télédétection produit presque exclusivement des données raster (images satellite). Comprendre la différence entre résolution spatiale d'un raster et précision géométrique d'un vecteur est indispensable pour interpréter correctement une image satellite — c'est le point de départ du module 2.",
  },
]
