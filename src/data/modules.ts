export interface CourseModule {
  slug: string
  /** Titre de salle, façon frontispice de traité ancien — c'est ce qui s'affiche. */
  title: string
  /** Libellé court pour la navigation d'en-tête (le titre complet n'y tiendrait pas). */
  navLabel: string
  summary: string
  topics: string[]
  /** Phrase reliant le sujet du module à l'œuvre qui l'illustre (voir src/data/artworks.ts). */
  epigraph: string
}

export const modules: CourseModule[] = [
  {
    slug: "fondamentaux",
    title: "De la Terre et de ses Mesures",
    navLabel: "Fondements",
    summary: "Systèmes de coordonnées, projections, référentiels, formats vecteur/raster.",
    topics: ["Systèmes de coordonnées (EPSG)", "Projections cartographiques", "Vecteur vs raster", "Bases SIG"],
    epigraph: "Comme Cellarius plaçait chaque orbite sur un système de cercles, tout point du monde n'existe, en géomatique, que rapporté à un référentiel.",
  },
  {
    slug: "teledetection",
    title: "De l'Œil qui Voit de Loin",
    navLabel: "Le Regard",
    summary: "Principes de l'observation satellite, capteurs, résolutions, plateformes.",
    topics: ["Rayonnement électromagnétique", "Capteurs optiques / radar", "Résolutions spatiale/spectrale/temporelle", "Missions Sentinel/Landsat"],
    epigraph: "L'astronome de Vermeer observe à l'œil et au globe. Le satellite fait le même geste : regarder, mesurer la lumière, à 800 km d'altitude.",
  },
  {
    slug: "indices-spectraux",
    title: "Du Langage des Couleurs",
    navLabel: "Les Couleurs",
    summary: "NDVI, NDMI, NDBI et autres indices dérivés des bandes satellite.",
    topics: ["NDVI : végétation", "NDMI : humidité", "NDBI : bâti", "Interprétation et limites"],
    epigraph: "Chaque constellation gravée par Cellarius est une lecture du ciel par la couleur et la forme ; l'indice spectral fait de même avec les bandes du capteur.",
  },
  {
    slug: "outils-sig",
    title: "De l'Art du Compas",
    navLabel: "Le Compas",
    summary: "QGIS, analyses spatiales, traitement de données géographiques.",
    topics: ["Prise en main QGIS", "Analyses spatiales", "Jointures et requêtes géographiques", "Automatisation (Python/PyQGIS)"],
    epigraph: "Le géographe de Vermeer prend le compas pour mesurer sa carte. Le SIG est ce même compas, rendu numérique et systématique.",
  },
  {
    slug: "travaux-pratiques",
    title: "Le Cabinet de l'Apprenti",
    navLabel: "L'Atelier",
    summary: "Exercices guidés, jeux de données réels, mini-projets.",
    topics: ["TP 1 : cartographie de base", "TP 2 : calcul d'indice NDVI", "TP 3 : analyse spatiale", "Mini-projet final"],
    epigraph: "Ortelius a rassemblé cartes et méthode en un atlas : le premier assemblage cohérent d'un savoir jusque-là dispersé. Ces travaux pratiques ont le même objectif.",
  },
]
