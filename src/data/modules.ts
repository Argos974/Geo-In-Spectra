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
    title: "Du Langage aux Couleurs",
    navLabel: "Les Couleurs",
    summary: "NDVI, NDMI, NDBI et autres indices dérivés des bandes satellite, jusqu'aux indices composés et complexes.",
    topics: ["NDVI, NDMI, NDBI", "SAVI, EVI, NBR, NDRE et autres indices dérivés", "Indices composés et complexes (Tasseled Cap)", "Validation statistique et séries temporelles"],
    epigraph: "Chaque constellation gravée par Cellarius est une lecture du ciel par la couleur et la forme ; l'indice spectral fait de même avec les bandes du capteur.",
  },
  {
    slug: "outils-sig",
    title: "De l'Art du Compas",
    navLabel: "Le Compas",
    summary: "QGIS, analyses spatiales, géostatistique et traitement de données géographiques.",
    topics: ["Prise en main QGIS", "Analyses spatiales, Moran et MAUP", "Géostatistique (krigeage) et décision multicritère", "Automatisation (Python/PyQGIS, PostGIS)"],
    epigraph: "Le géographe de Vermeer prend le compas pour mesurer sa carte. Le SIG est ce même compas, rendu numérique et systématique.",
  },
  {
    slug: "traitements-ia",
    title: "De la Machine qui Apprend",
    navLabel: "L'Intelligence",
    summary: "Filtres à noyau, classification, évaluation de précision, deep learning : la place de l'IA en géomatique et télédétection.",
    topics: ["Filtres kernel et passe-haut", "Classification supervisée / non supervisée", "Matrice de confusion et kappa", "Deep learning : CNN, U-Net, Transformers"],
    epigraph: "Comme le cabinet de curiosités range chaque coquillage, chaque tableau, chaque médaille dans une catégorie pour le comprendre, l'algorithme range chaque pixel dans une classe pour lire le paysage.",
  },
  {
    slug: "methodologie",
    title: "De l'Ordre des Idées",
    navLabel: "La Méthode",
    summary: "Commentaire de document, dissertation, rapport technique, concours : mobiliser le cours à l'écrit.",
    topics: ["Commentaire de carte", "Dissertation de géographie", "Rapport technique SIG", "Concours CAPES/Agrégation"],
    epigraph: "Le philosophe de Rembrandt médite dans l'ombre d'un escalier qui monte en spirale : la méthode, en géographie comme ailleurs, est cet escalier qui structure la pensée avant qu'elle ne s'exprime.",
  },
  {
    slug: "travaux-pratiques",
    title: "Le Cabinet de l'Apprenti",
    navLabel: "L'Atelier",
    summary: "Neuf séances pratiques complètes, chacune autonome et corrigée : géoréférencement, indices, classification, réseau de neurones, radar, krigeage, mini-projet.",
    topics: ["Géoréférencement par grille", "NDVI, indices par cellule, classification et réseau de neurones", "Radar et interpolation (krigeage)", "Programmation géospatiale et mini-projet corrigé"],
    epigraph: "Ortelius a rassemblé cartes et méthode en un atlas : le premier assemblage cohérent d'un savoir jusque-là dispersé. Ces travaux pratiques ont le même objectif.",
  },
]
