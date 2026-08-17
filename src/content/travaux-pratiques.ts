import type { ContentBlock } from "./types"

export const travauxPratiquesContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Ce module regroupe des exercices guidés, à réaliser dans QGIS avec des jeux de données publics et gratuits. Chaque TP part d'un objectif concret et détaille les étapes ; ils sont conçus pour être enchaînés dans l'ordre, chacun réutilisant les compétences du précédent.",
  },

  {
    type: "diagram",
    name: "workflow-tp",
    caption: "La marche à suivre, commune aux trois TP qui suivent.",
  },

  { type: "heading", text: "TP 1 : Cartographie de base sous QGIS" },
  {
    type: "paragraph",
    text: "Objectif : produire une première carte thématique en manipulant chargement de données, système de coordonnées et symbologie.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Télécharger un jeu de données vecteur public (ex. limites communales sur data.gouv.fr, format GeoJSON ou Shapefile)",
      "Charger la couche dans QGIS (glisser-déposer, ou Couche > Ajouter une couche)",
      "Vérifier le CRS du projet et le reprojeter en EPSG:2154 (Lambert-93) si nécessaire",
      "Ouvrir la table attributaire, identifier un champ numérique pertinent (ex. population, superficie)",
      "Appliquer une symbologie graduée sur ce champ (Propriétés de la couche > Symbologie > Graduée)",
      "Ajouter une légende, une échelle et une flèche du nord via la mise en page d'impression",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Point de contrôle",
    text: "La carte doit afficher un dégradé de couleur cohérent avec le champ choisi, une légende lisible, et le CRS du projet doit être EPSG:2154 (vérifiable en bas à droite de la fenêtre QGIS).",
  },

  { type: "heading", text: "TP 2 : Calcul du NDVI depuis une image Sentinel-2" },
  {
    type: "paragraph",
    text: "Objectif : appliquer la formule du NDVI (module Indices spectraux) sur une vraie image satellite, et interpréter le résultat.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Télécharger une image Sentinel-2 niveau L2A (déjà corrigée des effets atmosphériques) sur le Copernicus Data Space Ecosystem, sur une zone au choix",
      "Charger les bandes B04 (rouge) et B08 (NIR) dans QGIS",
      "Ouvrir la calculatrice raster (Raster > Calculatrice raster)",
      "Saisir l'expression : (\"B08@1\" - \"B04@1\") / (\"B08@1\" + \"B04@1\")",
      "Appliquer une palette de couleur divergente sur le raster obtenu (rouge = faible, vert = élevé)",
      "Comparer visuellement les zones de NDVI élevé avec la composition colorée naturelle de l'image d'origine",
    ],
  },
  {
    type: "formula",
    label: "Rappel : expression calculatrice raster QGIS",
    formula: "(\"B08@1\" - \"B04@1\") / (\"B08@1\" + \"B04@1\")",
    note: "@1 désigne la première bande de chaque raster chargé, à adapter selon la structure réelle du fichier téléchargé (bandes séparées ou empilées).",
  },

  { type: "heading", text: "TP 3 : Analyse spatiale, buffer et intersection" },
  {
    type: "paragraph",
    text: "Objectif : combiner deux couches vecteur pour répondre à une question spatiale concrète, en utilisant les opérations du module Outils SIG.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Charger une couche de cours d'eau et une couche de parcelles (ou bâtiments) sur une même zone",
      "Créer un buffer de 200 m autour des cours d'eau (Vecteur > Outils de géotraitement > Tampon)",
      "Intersecter ce buffer avec la couche de parcelles (Vecteur > Outils de géotraitement > Intersection)",
      "Ouvrir la table attributaire du résultat : chaque entité correspond à une parcelle (ou portion) située dans la zone tampon",
      "Calculer la surface totale concernée (Champ calculé : $area, après vérification du CRS en mètres)",
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Erreur fréquente",
    text: "Un buffer de \"200\" appliqué sur une couche en EPSG:4326 (degrés) produira une zone tampon de 200 degrés, pas 200 mètres. Toujours vérifier que la couche est en système projeté métrique avant de créer un buffer en mètres.",
  },

  { type: "heading", text: "TP 4 : Étude de cas, applications thématiques", level: "superieur" },
  {
    type: "paragraph",
    text: "Les trois TP précédents traitent chacun une seule compétence isolée. Un vrai projet de terrain les combine toutes, au service d'une question concrète. Quatre familles d'applications reviennent le plus souvent :",
  },
  {
    type: "list",
    items: [
      "Risques naturels : croiser indices d'humidité/de végétation, pente et vent pour cartographier un risque incendie (voir le module Traitements & IA pour un exemple réel d'indice composite de comportement du feu)",
      "Agriculture de précision : suivi du NDVI d'une parcelle dans le temps pour cibler l'irrigation ou détecter un stress hydrique précoce",
      "Urbanisme : NDBI et séries temporelles pour mesurer l'étalement urbain d'une commune sur dix ans",
      "Climat et environnement : détection de changement (déforestation, recul d'un glacier) par comparaison de deux dates",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Étude de cas guidée",
    text: "Choisir l'une des quatre familles ci-dessus sur un territoire connu. Lister les couches nécessaires (vecteur, raster, indice), la ou les analyses spatiales à mener, et rédiger en 10 lignes la méthode envisagée avant de l'exécuter dans QGIS — l'exercice méthodologique de cadrage compte autant que le résultat cartographique final.",
  },

  { type: "heading", text: "Mini-projet final" },
  {
    type: "paragraph",
    text: "Choisir un territoire et une problématique (ex. exposition d'un massif forestier au risque incendie, évolution de l'urbanisation d'une commune, suivi de la végétation d'un parc). Produire une carte finale qui combine au minimum : une donnée vecteur, une donnée raster ou un indice spectral calculé, et au moins une analyse spatiale (buffer, intersection ou jointure spatiale). Le rendu attendu est une carte mise en page avec légende, échelle, source des données et une courte note méthodologique expliquant les choix faits.",
  },
]
