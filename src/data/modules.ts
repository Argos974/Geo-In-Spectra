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
  /**
   * Faux seulement pour Méthodologie : organisée par finalité (Scolaire/Concours/
   * Professionnel/Recherche, voir DiscipulusMethodesPage), jamais en 3 pistes
   * Lycée/Licence-BUT/Master-Recherche indépendantes comme les autres salles.
   * Piloté par la donnée plutôt que par une comparaison de slug en dur éparpillée
   * dans ModuleChapterBody — vrai (3 pistes) par défaut si omis.
   */
  leveled?: boolean
}

/**
 * Ordre volontairement cohérent avec la progression pédagogique demandée :
 * les fondements, puis l'analyse spatiale (projections, SIG, statistiques
 * spatiales, bases de données, cartographie web), puis le traitement
 * d'image (télédétection, indices, photogrammétrie, LiDAR), puis la machine
 * qui apprend (IA), puis la synthèse (études de cas) — méthodologie et
 * l'Atelier restent en fin de liste, transversaux plutôt que séquentiels.
 * Cet ordre détermine à la fois le préfixe numérique des PDF exportés (voir
 * ModuleChapterBody::order) et l'affichage de l'accordéon Discipulus (voir
 * lib/moduleRoute.ts::COURS_SLUGS, à garder synchronisé avec cet ordre).
 */
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
    slug: "projections-avancees",
    title: "Du Cône et du Cylindre",
    navLabel: "Les Projections",
    summary: "Familles de déformation, Lambert-93, UTM, Web Mercator, datum et transformation, choisir sa projection selon l'usage.",
    topics: ["Familles de déformation (conforme/équivalente)", "Lambert-93 et UTM", "Datum et transformation de coordonnées", "Choisir une projection selon l'usage"],
    epigraph: "Cellarius projetait déjà les orbites célestes sur le plan d'une planche gravée : toute projection, cartographique ou astronomique, choisit ce qu'elle déforme pour représenter une courbe sur un plat.",
  },
  {
    slug: "outils-sig",
    title: "De l'Art du Compas",
    navLabel: "Le Compas",
    summary: "QGIS, analyses spatiales, géostatistique et traitement de données géographiques.",
    topics: ["Prise en main QGIS", "Analyses spatiales, Moran et MAUP", "Géostatistique (krigeage) et décision multicritère", "Automatisation (Python/PyQGIS, PostGIS)"],
    epigraph: "Le géographe de Vermeer prend le compas pour mesurer sa carte. Le SIG est ce même compas, rendu numérique et systématique.",
  },
  // Quatre salles-outils : chacune un tutoriel complet d'un logiciel/langage
  // (et non plus seulement sa mention en passant dans "Le Compas"), avec sa
  // propre œuvre choisie pour son lien avec le geste du logiciel plutôt que
  // pour décorer — voir src/data/artworks.ts. Groupées juste après "Le
  // Compas" (SIG en général) : de l'outil géométrique (QGIS) au langage de
  // programmation généraliste (VS Code), en passant par la modélisation
  // raster (TerrSet) et la statistique (R).
  {
    slug: "qgis",
    title: "De la Géométrie Pensive",
    navLabel: "QGIS",
    summary: "Tutoriel complet de QGIS : interface, symbologie, boîte à outils de traitement, modeleur graphique, extensions et automatisation par lot, en trois parcours de niveau.",
    topics: ["Interface et gestion des couches", "Symbologie et mise en page cartographique", "Boîte à outils de traitement et modeleur graphique", "Extensions, PyQGIS et automatisation par lot"],
    epigraph: "Dürer entoure son ange pensif d'un compas, d'une sphère et d'un solide inachevé : cette même géométrie patiente, appliquée à la carte plutôt qu'à la pierre, est ce que QGIS met entre les mains de qui l'apprend.",
  },
  {
    slug: "terrset",
    title: "Des Couches qui se Bâtissent",
    navLabel: "TerrSet",
    summary: "Tutoriel complet de TerrSet (IDRISI) : algèbre raster, classification, chaînes de Markov, automates cellulaires et modélisation prédictive du changement d'occupation du sol, en trois parcours de niveau.",
    topics: ["Interface et modules raster de TerrSet", "Classification et changement d'occupation du sol", "Chaînes de Markov et automates cellulaires (Land Change Modeler)", "Analyse multicritère et validation (indice kappa)"],
    epigraph: "Bruegel peint une tour dont les étages anciens, en pierre grise, portent déjà les étages neufs, en brique rouge, encore en chantier : TerrSet modélise ce même empilement, couche de sol après couche de sol, pour prévoir l'étage que le territoire bâtira demain.",
  },
  {
    slug: "programmation-r",
    title: "De l'Instrument et du Nombre",
    navLabel: "R",
    summary: "Tutoriel complet du langage R : syntaxe, structures de données, visualisation avec ggplot2, statistique et cartographie spatiale, en trois parcours de niveau.",
    topics: ["Syntaxe, vecteurs et data frames", "Visualisation avec ggplot2", "Statistique et cartographie spatiale (sf, tmap)", "Modèles, simulation et reproductibilité (R Markdown)"],
    epigraph: "Les Ambassadeurs de Holbein posent leurs instruments de mesure du monde — globe, quadrant, cadran — sur un tapis richement chargé : R est ce même établi, réduit à un langage, où chaque fonction mesure, résume ou représente une donnée à la place d'un instrument de laiton.",
  },
  {
    slug: "vscode",
    title: "De la Plume et du Texte",
    navLabel: "VS Code",
    summary: "Tutoriel complet de Visual Studio Code : installation, interface, extensions Python/Jupyter/débogueur, Git intégré et automatisation, en trois parcours de niveau.",
    topics: ["Installation, interface et terminal intégré", "Extensions Python, Jupyter et débogueur", "Git intégré et gestion de version", "Espaces de travail, snippets et automatisation (tasks.json)"],
    epigraph: "Érasme, saisi par Holbein la plume à la main, corrige son texte mot à mot dans la marge : VS Code offre au code ce que l'écritoire offrait à l'humaniste, un espace pour écrire, corriger et reprendre, phrase après phrase.",
  },
  // Deux salles d'algorithmes généraux, juste avant leurs applications spatiales
  // spécialisées (Les Statistiques, La Base) : l'analyse statistique générale
  // d'abord (base commune, non spécifiquement spatiale), puis les algorithmes
  // spatiaux qui la mobilisent concrètement (interpolation, indexation,
  // réseau, géométrie), avant que Les Statistiques n'aille plus loin sur le
  // versant proprement spatial (LISA, Gi*, régression).
  {
    slug: "analyse-statistique",
    title: "Du Hasard et de la Preuve",
    navLabel: "Analyse Statistique",
    summary: "Statistique descriptive et inférentielle, tests d'hypothèse, corrélation et régression, analyse multivariée, apprentissage statistique : un très grand nombre de méthodes, en trois parcours de niveau.",
    topics: ["Statistique descriptive et probabilités", "Tests d'hypothèse (Student, khi², ANOVA)", "Corrélation, régression linéaire et logistique", "Analyse multivariée (ACP, classification) et apprentissage statistique"],
    epigraph: "Les Tricheurs du Caravage lisent et manipulent le hasard aux cartes ; l'analyse statistique fait, avec rigueur plutôt qu'avec tromperie, ce que ces joueurs pressentaient déjà : le hasard obéit à des lois qu'on peut mesurer.",
  },
  {
    slug: "algorithmes-spatiaux",
    title: "De la Grille et du Point",
    navLabel: "Algorithmes Spatiaux",
    summary: "Un catalogue très fourni d'algorithmes d'analyse spatiale : interpolation, indexation, géométrie computationnelle, analyse de réseau, détection de motifs — mécanique, complexité et cas d'usage, en trois parcours de niveau.",
    topics: ["Interpolation spatiale (IDW, krigeage, TIN, splines)", "Structures d'indexation (quadtree, k-d tree, R-tree)", "Géométrie computationnelle (enveloppe convexe, Voronoï/Delaunay, Douglas-Peucker)", "Analyse de réseau et détection de motifs (Dijkstra, A*, DBSCAN, Ripley K)"],
    epigraph: "Le dessinateur de Dürer transfère, point par point à travers une grille tendue, la forme d'un luth vers une surface plane : un algorithme spatial fait ce même geste méthodique, transposé au calcul plutôt qu'au trait de plume.",
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
    slug: "bases-donnees-spatiales",
    title: "De l'Ordre des Registres",
    navLabel: "La Base",
    summary: "Index spatial GiST, requêtes et jointures spatiales, topologie, performance, PostGIS Raster, exposition web d'une base spatiale.",
    topics: ["Index spatial GiST", "Requêtes et jointures spatiales", "Topologie et cohérence géométrique", "Performance et EXPLAIN ANALYZE"],
    epigraph: "Les collecteurs d'impôts de Reymerswale tiennent leur registre à jour, ligne après ligne : une base de données spatiale fait de même, mais interrogeable en un instant sur des millions de lignes à la fois.",
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
    slug: "traitements-ia",
    title: "De la Machine qui Apprend",
    navLabel: "L'Intelligence",
    summary: "Filtres à noyau, classification, évaluation de précision, deep learning : la place de l'IA en géomatique et télédétection.",
    topics: ["Filtres kernel et passe-haut", "Classification supervisée / non supervisée", "Matrice de confusion et kappa", "Deep learning : CNN, U-Net, Transformers"],
    epigraph: "Comme le cabinet de curiosités range chaque coquillage, chaque tableau, chaque médaille dans une catégorie pour le comprendre, l'algorithme range chaque pixel dans une classe pour lire le paysage.",
  },
  {
    slug: "systemes-multi-agents",
    title: "De Cent Jeux à la Fois",
    navLabel: "Systèmes Multi-Agents",
    summary: "Modélisation à base d'agents (ABM), automates cellulaires, essaims et algorithmes collectifs, plateformes NetLogo/Mesa/GAMA, validation et enjeux d'un modèle multi-agent en géographie, en trois parcours de niveau.",
    topics: ["Agents, environnement et comportements (règles locales)", "Automates cellulaires et modèles de ségrégation/diffusion", "Intelligence en essaim (colonies de fourmis, PSO, boids)", "Plateformes (NetLogo, Mesa, GAMA), calibration et validation"],
    epigraph: "Bruegel peint plus de deux cents enfants, chacun absorbé dans son propre jeu selon ses propres règles, sans chef d'orchestre : un système multi-agent modélise exactement cette idée, une multitude d'entités autonomes dont les interactions locales font émerger, sans plan centralisé, l'ordre collectif de toute la scène.",
  },
  {
    slug: "etudes-de-cas-sectorielles",
    title: "Des Champs et des Villes",
    navLabel: "Les Secteurs",
    summary: "Agriculture de précision, artificialisation urbaine, gestion du risque incendie : trois études de cas complètes qui enchaînent les méthodes déjà vues.",
    topics: ["Agriculture de précision", "Artificialisation des sols et îlots de chaleur", "Risque incendie : aléa/enjeux/vulnérabilité en pratique", "Foresterie et ressources naturelles"],
    epigraph: "Les moissonneurs de Bruegel occupent un même paysage travaillé de mille façons différentes : l'agriculture, l'urbanisme et le risque naturel sont ce même territoire, lu par des méthodes différentes selon la question posée.",
  },
  {
    slug: "methodologie",
    title: "De l'Ordre des Idées",
    navLabel: "La Méthode",
    summary: "Commentaire de document, dissertation, rapport technique, concours : mobiliser le cours à l'écrit.",
    topics: ["Commentaire de carte", "Dissertation de géographie", "Rapport technique SIG", "Concours CAPES/Agrégation"],
    epigraph: "Le philosophe de Rembrandt médite dans l'ombre d'un escalier qui monte en spirale : la méthode, en géographie comme ailleurs, est cet escalier qui structure la pensée avant qu'elle ne s'exprime.",
    leveled: false,
  },
  {
    slug: "travaux-pratiques",
    title: "Le Cabinet de l'Apprenti",
    navLabel: "L'Atelier",
    summary: "Trente-six séances pratiques complètes (lycée, licence/BUT, master), chacune autonome et corrigée : cartographie, géoréférencement, indices, classification, réseau de neurones, radar, mini-projet, audit qualité, validation statistique.",
    topics: ["Géoréférencement par grille", "NDVI, indices par cellule, classification et réseau de neurones", "Radar et interpolation (krigeage)", "Programmation géospatiale et mini-projet corrigé"],
    epigraph: "Ortelius a rassemblé cartes et méthode en un atlas : le premier assemblage cohérent d'un savoir jusque-là dispersé. Ces travaux pratiques ont le même objectif.",
  },
]
