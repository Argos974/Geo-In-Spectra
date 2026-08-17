export interface CourseModule {
  slug: string
  title: string
  summary: string
  topics: string[]
}

export const modules: CourseModule[] = [
  {
    slug: "fondamentaux",
    title: "Fondamentaux de la géomatique",
    summary: "Systèmes de coordonnées, projections, référentiels, formats vecteur/raster.",
    topics: ["Systèmes de coordonnées (EPSG)", "Projections cartographiques", "Vecteur vs raster", "Bases SIG"],
  },
  {
    slug: "teledetection",
    title: "Télédétection",
    summary: "Principes de l'observation satellite, capteurs, résolutions, plateformes.",
    topics: ["Rayonnement électromagnétique", "Capteurs optiques / radar", "Résolutions spatiale/spectrale/temporelle", "Missions Sentinel/Landsat"],
  },
  {
    slug: "indices-spectraux",
    title: "Indices spectraux",
    summary: "NDVI, NDMI, NDBI et autres indices dérivés des bandes satellite.",
    topics: ["NDVI — végétation", "NDMI — humidité", "NDBI — bâti", "Interprétation et limites"],
  },
  {
    slug: "outils-sig",
    title: "Outils SIG",
    summary: "QGIS, analyses spatiales, traitement de données géographiques.",
    topics: ["Prise en main QGIS", "Analyses spatiales", "Jointures et requêtes géographiques", "Automatisation (Python/PyQGIS)"],
  },
  {
    slug: "travaux-pratiques",
    title: "Travaux pratiques",
    summary: "Exercices guidés, jeux de données réels, mini-projets.",
    topics: ["TP 1 — cartographie de base", "TP 2 — calcul d'indice NDVI", "TP 3 — analyse spatiale", "Mini-projet final"],
  },
]
