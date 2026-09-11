import type { ContentBlock } from "../types"

export const qgisFiche: ContentBlock[] = [
  {
    type: "callout",
    tone: "info",
    title: "Interface",
    text: "Panneau des Couches (ordre d'affichage haut → bas) ; Navigateur (arborescence de fichiers) ; Table attributaire (une ligne = une entité) ; CRS du projet affiché en bas à droite — à vérifier (système projeté, métrique) avant tout calcul de surface/distance.",
  },
  {
    type: "table",
    headers: ["Algorithme Processing", "Fait"],
    rows: [
      ["Tampon (native:buffer)", "Zone tampon à distance fixe"],
      ["Découper (native:clip)", "Ne garde que les attributs de la couche découpée"],
      ["Fusionner (native:dissolve)", "Fusionne selon un champ (ou tout en un si vide)"],
      ["Union (native:union)", "Attributs des deux couches combinés"],
      ["Statistiques de zone", "Résume un raster par polygone"],
    ],
  },
  {
    type: "formula",
    label: "Expressions courantes",
    formula: "$area, $length, CASE WHEN … THEN … ELSE … END, \"champ\"",
    note: "Générateur d'expressions : calculatrice de champs, styles basés sur des règles, étiquetage.",
  },
  {
    type: "formula",
    label: "PyQGIS : itérer + lancer un traitement",
    formula: "for layer in QgsProject.instance().mapLayers().values(): ...\nprocessing.run(\"native:buffer\", {'INPUT': layer, 'DISTANCE': 200, 'OUTPUT': 'memory:'})",
  },
  {
    type: "formula",
    label: "qgis_process (CLI, sans interface)",
    formula: "qgis_process run native:buffer --INPUT=... --DISTANCE=200 --OUTPUT=...",
  },
  {
    type: "comparison",
    items: [
      { label: ".qgz", points: ["Archive compressée, par défaut", "Binaire : diff Git illisible"] },
      { label: ".qgs (XML)", points: ["Fichier texte", "Diff Git lisible, à préférer si versionné"] },
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "À ne pas confondre",
    text: "Clip garde les attributs de la couche découpée seulement ; Intersection garde ceux des deux couches. Un buffer/calcul de surface sans CRS projeté renvoie un résultat en degrés, inexploitable.",
  },
  {
    type: "callout",
    tone: "info",
    title: "PostGIS et interopérabilité",
    text: "Gestionnaire de sources (Ctrl+L) ou DB Manager pour une requête SQL directe (ST_Intersects, ST_Buffer). GDAL/OGR sous-tend QGIS, GeoPandas et R (sf) : un même GeoPackage s'ouvre dans les trois sans conversion.",
  },
]
