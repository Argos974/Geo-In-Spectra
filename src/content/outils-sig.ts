import type { ContentBlock } from "./types"

export const outilsSigContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Un SIG (Système d'Information Géographique) permet de stocker, visualiser, interroger et analyser des données géographiques. Ce module présente QGIS (le SIG open-source de référence, gratuit et multiplateforme), puis les grandes familles d'analyses spatiales qu'on retrouve dans tout logiciel SIG, avant d'introduire l'automatisation en Python.",
  },

  { type: "heading", text: "1. Prise en main de QGIS" },
  {
    type: "list",
    items: [
      "Panneau des couches (Layers) : liste des données chargées, ordre d'affichage du haut vers le bas",
      "Vue carte : navigation (zoom/pan), affichage selon le système de coordonnées du projet",
      "Table attributaire : chaque entité géométrique (point/ligne/polygone) est une ligne, chaque colonne un attribut",
      "Symbologie : un clic droit sur une couche > Propriétés > Symbologie permet de styliser selon un attribut (couleur par catégorie, dégradé par valeur…)",
      "Boîte à outils de traitement (Processing Toolbox) : accès à des centaines d'algorithmes d'analyse prêts à l'emploi",
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
      ["Jointure spatiale", "Associe les attributs d'une couche à une autre selon leur position", "Attribuer à chaque bâtiment la commune dans laquelle il se trouve"],
      ["Clip (découpage)", "Découpe une couche selon l'emprise d'une autre", "Extraire uniquement les routes situées dans un département"],
    ],
  },

  {
    type: "diagram",
    name: "spatial-operations",
    caption: "Trois opérations spatiales fondamentales, vues comme des figures géométriques.",
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

  { type: "heading", text: "4. Automatisation avec Python" },
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

  { type: "heading", text: "5. Qualité des données et métadonnées", level: "superieur" },
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
]
