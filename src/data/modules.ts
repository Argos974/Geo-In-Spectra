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
    summary: "Trente-six séances pratiques complètes (lycée, licence/BUT, master), chacune autonome et corrigée : cartographie, géoréférencement, indices, classification, réseau de neurones, radar, mini-projet, audit qualité, validation statistique.",
    topics: ["Géoréférencement par grille", "NDVI, indices par cellule, classification et réseau de neurones", "Radar et interpolation (krigeage)", "Programmation géospatiale et mini-projet corrigé"],
    epigraph: "Ortelius a rassemblé cartes et méthode en un atlas : le premier assemblage cohérent d'un savoir jusque-là dispersé. Ces travaux pratiques ont le même objectif.",
  },
  {
    slug: "projections-avancees",
    title: "Du Cône et du Cylindre",
    navLabel: "Les Projections",
    summary: "Familles de déformation, Lambert-93, UTM, Web Mercator, datum et transformation, choisir sa projection selon l'usage.",
    topics: ["Familles de déformation (conforme/équivalente)", "Lambert-93 et UTM", "Datum et transformation de coordonnées", "Choisir une projection selon l'usage"],
    epigraph: "Cellarius projetait déjà les orbites célestes sur le plan d'une planche gravée : toute projection, cartographique ou astronomique, choisit ce qu'elle déforme pour représenter une courbe sur un plat.",
  },
  {
    slug: "cartographie-web",
    title: "De la Carte qui Bouge",
    navLabel: "Le Web",
    summary: "Pyramide de tuiles, tuiles raster/vectorielles, bibliothèques Leaflet/MapLibre, standards WMS/WFS, performance et accessibilité.",
    topics: ["Pyramide de tuiles et zoom", "Bibliothèques de cartographie web", "Standards OGC (WMS/WMTS/WFS)", "Performance et accessibilité"],
    epigraph: "Ortelius assemblait ses planches en atlas relié ; la carte web assemble ses tuiles à la volée, une pyramide invisible derrière chaque geste de zoom.",
  },
  {
    slug: "statistiques-spatiales",
    title: "De ce qui se Regroupe",
    navLabel: "Les Statistiques",
    summary: "Indicateurs locaux d'association spatiale (LISA), points chauds (Gi*), densité par noyau, régression spatiale, cartographie du risque.",
    topics: ["LISA et statistique Gi* de Getis-Ord", "Estimation de densité par noyau (KDE)", "Régression spatiale et résidus autocorrélés", "Structure d'une cartographie du risque"],
    epigraph: "Le géographe de Vermeer mesurait déjà où les choses se regroupent sur sa carte ; l'indice local et le point chaud statistique font, avec des nombres, ce que son compas faisait à l'œil.",
  },
  {
    slug: "photogrammetrie-drones",
    title: "De l'Œil qui Vole Bas",
    navLabel: "Le Drone",
    summary: "Structure from Motion, recouvrement de vol, MNS/MNT, points d'appui au sol, planification et limites de la photogrammétrie par drone.",
    topics: ["Structure from Motion (SfM)", "MNS et MNT", "Points d'appui au sol (GCP)", "Planification de vol et RTK/PPK"],
    epigraph: "James Wallace Black photographiait déjà Boston depuis une montgolfière en 1860 : le même geste, voir le sol d'en haut pour le reconstruire, que le drone d'aujourd'hui répète, image par image assemblée.",
  },
  {
    slug: "lidar",
    title: "De la Lumière qui Mesure",
    navLabel: "Le LiDAR",
    summary: "Principe actif du temps de vol laser, retours multiples, classification du nuage de points, plateformes aéroportées et terrestres.",
    topics: ["Temps de vol d'un pulse laser", "Retours multiples et canopée", "Classification sol/végétation/bâti", "LiDAR aéroporté, terrestre, satellite"],
    epigraph: "L'alchimiste de Wright of Derby s'illumine de sa propre découverte, seule source de lumière de la scène : le LiDAR éclaire de même le terrain de son propre pulse, sans dépendre du soleil.",
  },
  {
    slug: "bases-donnees-spatiales",
    title: "De l'Ordre des Registres",
    navLabel: "La Base",
    summary: "Index spatial GiST, requêtes et jointures spatiales, topologie, performance, PostGIS Raster, exposition web d'une base spatiale.",
    topics: ["Index spatial GiST", "Requêtes et jointures spatiales", "Topologie et cohérence géométrique", "Performance et EXPLAIN ANALYZE"],
    epigraph: "Les collecteurs d'impôts de Reymerswale tiennent leur registre à jour, ligne après ligne : une base de données spatiale fait de même, mais interrogeable en un instant sur des millions de lignes à la fois.",
  },
  {
    slug: "etudes-de-cas-sectorielles",
    title: "Des Champs et des Villes",
    navLabel: "Les Secteurs",
    summary: "Agriculture de précision, artificialisation urbaine, gestion du risque incendie : trois études de cas complètes qui enchaînent les méthodes déjà vues.",
    topics: ["Agriculture de précision", "Artificialisation des sols et îlots de chaleur", "Risque incendie : aléa/enjeux/vulnérabilité en pratique", "Foresterie et ressources naturelles"],
    epigraph: "Les moissonneurs de Bruegel occupent un même paysage travaillé de mille façons différentes : l'agriculture, l'urbanisme et le risque naturel sont ce même territoire, lu par des méthodes différentes selon la question posée.",
  },
]
