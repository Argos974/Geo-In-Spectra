import type { ContentLevel } from "@/content/types"

/**
 * Métadonnées de navigation pour l'Atelier — ne duplique aucun contenu, juste
 * un pointeur (titre exact de heading, pour slugify()) vers la ou les salles
 * théoriques dont chaque séance dépend, plus son niveau (doit correspondre au
 * `level` du même heading dans travaux-pratiques.ts — utilisé par AtelierIndex
 * pour n'afficher que la piste active, comme le filtre "Afficher" du reste du
 * cours). Trois pistes indépendantes de 12 séances (voir la réponse à la
 * demande "12 séances par niveau, contenu indépendant" — pas un même sujet
 * décliné en trois profondeurs).
 */
export interface AtelierSalleRef {
  slug: string
  label: string
}

export interface AtelierSeanceRef {
  /** Doit correspondre exactement au texte du bloc `heading` dans travaux-pratiques.ts (slugify() en dépend). */
  heading: string
  level: ContentLevel
  salles: AtelierSalleRef[]
  /**
   * Durée réaliste de la séance en minutes, jugée sur le nombre et la complexité
   * réels des étapes du déroulé dans travaux-pratiques.ts (pas une valeur par
   * défaut uniforme) — métadonnée enseignant, ignorée côté Discipulus/élève.
   */
  dureeMin?: number
  /**
   * Matériel/outils concrètement mobilisés par le déroulé de cette séance (2-5
   * items courts), lu dans les étapes réelles, pas générique — même origine que
   * dureeMin.
   */
  materiel?: string[]
  /**
   * Note d'animation à l'usage de l'enseignant : le point de friction réel de
   * cette séance (piège technique, dépendance à une séance précédente, étape
   * qui casse le rythme si non anticipée) et comment l'organiser en conséquence
   * — jamais une reformulation générique, toujours dérivée d'un warning, d'un
   * résultat réel ou d'une dépendance effectivement présents dans le déroulé de
   * travaux-pratiques.ts. Distincte des callouts "Pièges fréquents" (erreurs de
   * contenu/notion, déjà rassemblées sur /pieges-frequents) : ceci porte sur la
   * conduite de séance (temps, matériel, ordre), pas sur le savoir.
   */
  animation?: string
}

const M = (slug: string, label: string): AtelierSalleRef => ({ slug, label })

export const atelierSeances: AtelierSeanceRef[] = [
  // ---- Piste Lycée ----
  {
    heading: "Séance Lycée 1 : Cartographie de base sous QGIS",
    level: "lycee",
    salles: [M("methodologie", "La Méthode")],
    dureeMin: 90,
    materiel: ["QGIS", "jeu de données vecteur public (data.gouv.fr)", "mise en page d'impression"],
    animation: "Démontrer collectivement la vérification du CRS avant de lâcher les élèves en autonomie : c'est le seul geste de la séance qui ne pardonne pas d'erreur silencieuse (un projet resté en degrés stylise et s'imprime sans message d'erreur, juste un calcul de surface faux plus tard).",
  },
  {
    heading: "Séance Lycée 2 : Lire et localiser, les coordonnées Lambert-93",
    level: "lycee",
    salles: [M("fondamentaux", "Fondements")],
    dureeMin: 60,
    materiel: ["QGIS (affichage des coordonnées)", "jeu « Le Compas des Coordonnées »", "coordonnées Lambert-93 fournies"],
    animation: "Placer le tout premier point au vidéoprojecteur avec le groupe avant de distribuer les coordonnées individuelles : manipuler des chiffres sans aucun repère visuel est déstabilisant en première approche, le jeu en autonomie fonctionne bien ensuite mais pas en ouverture.",
  },
  {
    heading: "Séance Lycée 3 : Vecteur ou raster, choisir la bonne donnée",
    level: "lycee",
    salles: [M("fondamentaux", "Fondements")],
    dureeMin: 60,
    materiel: ["QGIS", "sentinel2_2024-08-06_vitrolles_bands.tif", "couche vecteur bâtiments/parcelles"],
    animation: "Faire le zoom extrême sur les deux couches au vidéoprojecteur, en même temps : c'est le contraste vu en direct (pixellisation vs contour net) qui fait comprendre la distinction, une explication seule au tableau avant la manipulation ne suffit pas.",
  },
  {
    heading: "Séance Lycée 4 : Buffer et intersection, une contrainte réglementaire simple",
    level: "lycee",
    salles: [M("outils-sig", "Le Compas")],
    dureeMin: 75,
    materiel: ["QGIS", "couche cours d'eau", "couche parcelles/bâtiments", "outils Tampon + Intersection"],
    animation: "Redémontrer au tableau le piège CRS/degrés (« buffer 200 en EPSG:4326 donne 200 degrés ») avant que les élèves ne créent leur propre tampon : c'est l'erreur la plus fréquente de cette séance et elle ne produit aucun message d'erreur qui alerterait seul l'élève.",
  },
  {
    heading: "Séance Lycée 5 : Lire une image satellite à l'œil, la photo-interprétation",
    level: "lycee",
    salles: [M("teledetection", "Le Regard")],
    dureeMin: 60,
    materiel: ["composition couleur naturelle Vitrolles", "grille des six clés de lecture (module Le Regard)"],
    animation: "Faire chercher les six clés individuellement d'abord (5-10 min), puis mise en commun orale au tableau avant la rédaction de la légende commentée : sinon les élèves les plus rapides imposent leurs exemples et les autres n'ont plus rien à observer par eux-mêmes.",
  },
  {
    heading: "Séance Lycée 6 : Calculer et lire un NDVI",
    level: "lycee",
    salles: [M("indices-spectraux", "Les Couleurs")],
    dureeMin: 60,
    materiel: ["QGIS (calculatrice raster)", "sentinel2_2024-08-06_vitrolles_bands.tif"],
    animation: "Circuler pendant le calcul et demander à chaque binôme sa valeur moyenne obtenue : la comparaison immédiate au repère réel (NDVI moyen 0.33 sur cette emprise) permet de repérer une formule fautive en direct, sans attendre la correction collective en fin de séance.",
  },
  {
    heading: "Séance Lycée 7 : Repérer le bâti et l'eau, NDBI et NDWI",
    level: "lycee",
    salles: [M("indices-spectraux", "Les Couleurs")],
    dureeMin: 60,
    materiel: ["QGIS (calculatrice raster)", "bandes SWIR/NIR/Vert du fichier Vitrolles"],
    animation: "Répartir en binôme un indice chacun (l'un NDBI, l'autre NDWI) plutôt que de faire calculer les deux formules par tout le monde : la mise en commun orale au moment du tableau comparatif final couvre les deux sans double calcul individuel.",
  },
  {
    heading: "Séance Lycée 8 : Mettre en page une carte, légende et sémiologie",
    level: "lycee",
    salles: [M("methodologie", "La Méthode")],
    dureeMin: 60,
    materiel: ["QGIS (mise en page d'impression)", "carte produite en séance précédente"],
    animation: "Vérifier en ouverture que chaque élève reprend bien une carte réellement produite par lui-même en séance précédente, pas un exemple fourni par le professeur : sans un vrai défaut personnel à corriger, la refonte sémiologique n'a rien de concret à améliorer.",
  },
  {
    heading: "Séance Lycée 9 : Commenter un document cartographique",
    level: "lycee",
    salles: [M("teledetection", "Le Regard"), M("methodologie", "La Méthode")],
    dureeMin: 90,
    materiel: ["composition couleur naturelle + NDVI Vitrolles", "grille de commentaire structuré"],
    animation: "Lire à voix haute un exemple de phrase fautive (connaissance générale plaquée, sans renvoi au document) avant de lancer la rédaction individuelle : ancrer concrètement l'erreur à éviter fonctionne mieux qu'une consigne écrite seule, c'est le piège le plus fréquent de l'exercice.",
  },
  {
    heading: "Séance Lycée 10 : Une carte ancienne face à une image récente",
    level: "lycee",
    salles: [M("fondamentaux", "Fondements")],
    dureeMin: 90,
    materiel: ["carte de Cassini (remonterletemps.ign.fr)", "image satellite récente (Vitrolles ou cartes.gouv.fr)", "accès internet"],
    animation: "Vérifier l'accès internet de la salle avant la séance (remonterletemps.ign.fr) et prévoir un jeu de secours hors-ligne (carte postale ou plan ancien déjà numérisé de la commune) : c'est la seule séance de la piste Lycée dépendante d'un service externe en direct.",
  },
  {
    heading: "Séance Lycée 11 : Le débat Mercator/Peters, mesurer une déformation",
    level: "lycee",
    salles: [M("fondamentaux", "Fondements")],
    dureeMin: 75,
    materiel: ["QGIS", "couche mondiale des pays", "projections EPSG:3857 et EPSG:8857"],
    animation: "Le piège n'est pas la mesure elle-même mais d'oublier de reprojeter en système équivalent avant de mesurer une surface : redémontrer ce réflexe au tableau avant la mesure comparative Groenland/Afrique, sinon le ratio obtenu reste faux sans que personne ne s'en aperçoive.",
  },
  {
    heading: "Séance Lycée 12 : Mini-projet, une carte thématique complète",
    level: "lycee",
    salles: [M("methodologie", "La Méthode")],
    dureeMin: 150,
    materiel: ["QGIS", "jeu de données au choix (data.gouv.fr)", "grille de barème indicatif"],
    animation: "Séance longue (150 min) : prévoir un point d'étape collectif à mi-parcours (30-40 min) pour vérifier que chaque élève a un sujet réellement cadré avant de produire la carte, sinon le temps de rédaction du commentaire final est celui qui saute en dernière minute.",
  },

  // ---- Piste Licence/BUT ----
  {
    heading: "Séance Licence/BUT 1 : Prise en main QGIS avancée et automatisation légère",
    level: "superieur",
    salles: [M("outils-sig", "Le Compas")],
    dureeMin: 90,
    materiel: ["QGIS (Modeleur graphique)", "couches communes/cours d'eau/bâtiments"],
    animation: "Construire le premier modèle au vidéoprojecteur avec le groupe, en insistant sur les paramètres exposés en haut du formulaire (pas figés en dur) : c'est ce geste précis, difficile à décrire par écrit, qui rend le modèle réellement réutilisable sur le second territoire demandé.",
  },
  {
    heading: "Séance Licence/BUT 2 : Géoréférencer une image par grille",
    level: "superieur",
    salles: [M("outils-sig", "Le Compas")],
    dureeMin: 120,
    materiel: ["QGIS (Géoréférenceur)", "document scanné à grille (DFCI/Lambert)", "points de contrôle (GCP)"],
    animation: "Prévoir un document scanné à grille par binôme et démontrer au tableau la lecture d'une seule intersection avant de lâcher le groupe : lire un code de grille DFCI/Lambert n'est pas intuitif au premier essai, et une erreur de lecture ici contamine tout le géoréférencement sans le signaler.",
  },
  {
    heading: "Séance Licence/BUT 3 : De l'image géoréférencée à l'indice composé",
    level: "superieur",
    salles: [M("teledetection", "Le Regard"), M("indices-spectraux", "Les Couleurs"), M("outils-sig", "Le Compas")],
    dureeMin: 90,
    materiel: ["QGIS (calculatrice raster, fishnet, statistiques de zone)", "grille_100m_indices.geojson (validation)"],
    animation: "Séance dépendante du résultat de la séance précédente : prévoir une image déjà géoréférencée en secours pour les binômes qui n'auraient pas terminé la 2, sinon ils décrochent dès l'ouverture faute de support de travail.",
  },
  {
    heading: "Séance Licence/BUT 4 : Analyse spatiale professionnelle, jointure et découpage",
    level: "superieur",
    salles: [M("outils-sig", "Le Compas")],
    dureeMin: 90,
    materiel: ["QGIS", "couche bâtiments", "couche communes", "jointure spatiale + découpage (clip)"],
    animation: "Poser la question au tableau avant de commencer (« qu'est-ce qui distingue une jointure spatiale d'une jointure par champ commun ? ») et vérifier la réponse collectivement : l'erreur de confusion entre les deux ne produit aucun message explicite, un résultat vide ou aberrant passe facilement inaperçu.",
  },
  {
    heading: "Séance Licence/BUT 5 : Programmation géospatiale simple",
    level: "superieur",
    salles: [M("outils-sig", "Le Compas")],
    dureeMin: 120,
    materiel: ["Python", "GeoPandas + Shapely", "rasterio", "GDAL (gdalinfo)"],
    animation: "Séance modulaire : les 4 exercices sont indépendants, répartir un exercice par binôme en parallèle plutôt que de faire traiter les 4 dans l'ordre par tout le monde, puis mise en commun orale — gain de temps réel sur les 120 minutes.",
  },
  {
    heading: "Séance Licence/BUT 6 : Bases de données géographiques, PostGIS",
    level: "superieur",
    salles: [M("outils-sig", "Le Compas")],
    dureeMin: 120,
    materiel: ["PostgreSQL/PostGIS", "QGIS", "SQL (ST_DWithin, ST_Area)"],
    animation: "Faire installer PostgreSQL/PostGIS en amont de la séance, jamais pendant : une installation qui traîne peut à elle seule absorber la moitié du temps disponible et laisser trop peu de temps pour la pratique SQL, qui est le vrai objectif.",
  },
  {
    heading: "Séance Licence/BUT 7 : Classification supervisée et évaluation de précision",
    level: "superieur",
    salles: [M("traitements-ia", "L'Intelligence")],
    dureeMin: 120,
    materiel: ["QGIS ou Python (scikit-learn/SCP)", "bandes Sentinel-2 + bande SCL", "matrice de confusion"],
    animation: "Redémontrer au tableau pourquoi le découpage entraînement/test doit être spatial (jamais un tirage aléatoire pixel par pixel) et signaler d'emblée que la classe eau sera absente du jeu de test avec ce découpage par tiers : sans cette annonce, plusieurs binômes perdent du temps à chercher une erreur qui n'en est pas une.",
  },
  {
    heading: "Séance Licence/BUT 8 : Statistiques de zone et algèbre raster",
    level: "superieur",
    salles: [M("outils-sig", "Le Compas")],
    dureeMin: 90,
    materiel: ["QGIS (calculatrice raster, statistiques de zone)", "indices précalculés Vitrolles (NDVI/NDMI/NDBI…)"],
    animation: "Demander à chaque binôme de noter ses seuils choisis au tableau en fin de séance : la comparaison collective de seuils différents pour un même objectif montre concrètement leur caractère arbitraire, mieux qu'une explication seule sur le papier.",
  },
  {
    heading: "Séance Licence/BUT 9 : Radar et interpolation spatiale",
    level: "superieur",
    salles: [M("teledetection", "Le Regard"), M("outils-sig", "Le Compas")],
    dureeMin: 150,
    materiel: ["QGIS/SNAP", "scène Sentinel-1 GRD (Copernicus Data Space Ecosystem)", "module krigeage/IDW"],
    animation: "Télécharger la scène Sentinel-1 en amont pour tout le groupe (fichier unique partagé) : un téléchargement individuel via Copernicus Data Space peut à lui seul consommer 20 à 30 minutes de cette séance déjà la plus longue de la piste (150 min).",
  },
  {
    heading: "Séance Licence/BUT 10 : Auditer la qualité d'un jeu de données SIG",
    level: "superieur",
    salles: [M("outils-sig", "Le Compas")],
    dureeMin: 90,
    materiel: ["jeu de données Vitrolles (6 fichiers)", "QGIS", "fiche de métadonnées ISO 19115 simplifiée"],
    animation: "Ne pas révéler d'emblée l'anomalie de la classe eau dans classification_reference.json : la laisser être découverte par les élèves pendant l'audit, l'effet pédagogique (un jeu par ailleurs cohérent peut cacher une limite structurelle) est plus fort en découverte qu'en annonce.",
  },
  {
    heading: "Séance Licence/BUT 11 : Rédiger un rapport technique SIG",
    level: "superieur",
    salles: [M("methodologie", "La Méthode")],
    dureeMin: 90,
    materiel: ["résultat d'une séance précédente", "grille Professionnel (page Évaluation)"],
    animation: "Vérifier en ouverture que chaque élève repart d'un résultat réellement produit par lui-même dans une séance antérieure, pas celui d'un camarade : sans données personnelles à rapporter, la séparation résultats/discussion attendue reste un exercice abstrait plutôt que concret.",
  },
  {
    heading: "Séance Licence/BUT 12 : Mini-projet, un livrable professionnel complet",
    level: "superieur",
    salles: [M("methodologie", "La Méthode")],
    dureeMin: 180,
    materiel: ["QGIS", "Python (au choix)", "grille Professionnel (page Évaluation)"],
    animation: "Séance la plus longue de la piste (180 min) : prévoir un point d'étape à la moitié pour vérifier que le sujet est cadré et la méthode choisie avant que les élèves n'entament la rédaction, sinon la synthèse exécutive et la discussion (les plus notées) sont sacrifiées en fin de séance.",
  },

  // ---- Piste Master/Recherche ----
  {
    heading: "Séance Master/Recherche 1 : Cadrer une question de recherche",
    level: "approfondissement",
    salles: [M("methodologie", "La Méthode")],
    dureeMin: 75,
    materiel: ["jeu de données Vitrolles (ancrage du thème)", "traitement de texte"],
    animation: "Réserver explicitement un temps de relecture par un pair (« est-elle réellement répondable avec les données disponibles ? ») dans le minutage : c'est le point central de la séance, sans lui une bonne partie des questions restent mal cadrées jusqu'à la séance 11.",
  },
  {
    heading: "Séance Master/Recherche 2 : Prétraitement rigoureux, de la valeur brute à la réflectance",
    level: "approfondissement",
    salles: [M("teledetection", "Le Regard")],
    dureeMin: 90,
    materiel: ["image Sentinel-2 L1C + L2A", "calculatrice raster", "formules DN → radiance → réflectance"],
    animation: "Insister collectivement sur l'interdiction de comparer deux images à des niveaux de traitement différents avant que les étudiants ne choisissent leurs propres images pour le mini-projet (séance 11) : une erreur ici se répercute sur tout le travail de recherche final sans être détectable a posteriori.",
  },
  {
    heading: "Séance Master/Recherche 3 : Valider un indice face à une mesure biophysique",
    level: "approfondissement",
    salles: [M("indices-spectraux", "Les Couleurs")],
    dureeMin: 120,
    materiel: ["source de mesure de terrain (réseau de stations ou jeu publié)", "indices NDVI/NDMI", "Python/R (corrélation, RMSE)"],
    animation: "Préparer une liste de sources de mesure de terrain déjà identifiées (réseaux de stations, jeux publiés) à distribuer si un binôme n'en trouve aucune en autonomie : la recherche de données peut sinon consommer toute la séance au détriment de l'analyse elle-même.",
  },
  {
    heading: "Séance Master/Recherche 4 : Séries temporelles et phénologie",
    level: "approfondissement",
    salles: [M("indices-spectraux", "Les Couleurs")],
    dureeMin: 120,
    materiel: ["images multi-dates (Copernicus Data Space Ecosystem)", "Python (pandas/matplotlib)", "détection de rupture (BFAST si disponible)"],
    animation: "Ne pas laisser l'installation d'un outil avancé bloquer la séance : un simple test de tendance suffit à l'objectif si BFAST n'est pas disponible sur le poste, l'énoncé lui-même le prévoit comme repli.",
  },
  {
    heading: "Séance Master/Recherche 5 : Classification par réseau de neurones simple",
    level: "approfondissement",
    salles: [M("traitements-ia", "L'Intelligence")],
    dureeMin: 120,
    materiel: ["Python", "scikit-learn (MLPClassifier)", "jeu d'entraînement/test Vitrolles"],
    animation: "Ne pas révéler le résultat réel (le MLP fait légèrement mieux que le Random Forest sur ce jeu précis) avant que chaque étudiant ait fait tourner son propre MLP : c'est l'écart avec l'intuition générale qui déclenche la discussion critique attendue en fin de séance et dans le devoir.",
  },
  {
    heading: "Séance Master/Recherche 6 : Valider statistiquement une classification",
    level: "approfondissement",
    salles: [M("traitements-ia", "L'Intelligence"), M("methodologie", "La Méthode")],
    dureeMin: 90,
    materiel: ["classification_reference.json", "Python (test de McNemar, scipy/statsmodels)"],
    animation: "Séance dépendante d'un vrai résultat MLP personnel produit en séance 5, pas seulement des chiffres de référence du site : vérifier que chaque étudiant a bien ses propres pixels de désaccord RF/MLP avant de lancer le test de McNemar, sinon il n'y a rien de concret à comparer.",
  },
  {
    heading: "Séance Master/Recherche 7 : Krigeage avancé, validation croisée du variogramme",
    level: "approfondissement",
    salles: [M("outils-sig", "Le Compas")],
    dureeMin: 120,
    materiel: ["logiciel de géostatistique (R gstat, Python PyKrige, ou QGIS)", "jeu de points mesurés"],
    animation: "Prévoir un jeu de points de taille raisonnable (quelques dizaines, pas des centaines) : une validation croisée leave-one-out répète le krigeage une fois par point, et peut devenir lente au point de déborder les 120 minutes sur un jeu trop grand.",
  },
  {
    heading: "Séance Master/Recherche 8 : Analyse réseau et décision multicritère",
    level: "approfondissement",
    salles: [M("outils-sig", "Le Compas")],
    dureeMin: 120,
    materiel: ["QGIS (algèbre raster)", "tableur (matrice de comparaison AHP)", "calcul du ratio de cohérence"],
    animation: "Prévenir en amont qu'un ratio de cohérence supérieur à 0.10 est fréquent en premier essai (jugements pas encore stabilisés) : présenté comme une étape normale à corriger plutôt qu'un échec, ça évite le découragement au moment où la matrice doit être révisée.",
  },
  {
    heading: "Séance Master/Recherche 9 : Au-delà du multispectral, l'imagerie hyperspectrale",
    level: "approfondissement",
    salles: [M("teledetection", "Le Regard")],
    dureeMin: 120,
    materiel: ["jeu hyperspectral public (AVIRIS, Pavia University ou EnMAP)", "Python (spectral, numpy)"],
    animation: "Présélectionner un jeu hyperspectral accessible avant la séance plutôt que de laisser chaque étudiant chercher : ces jeux sont volumineux et parfois d'accès non trivial, la recherche seule peut consommer une bonne partie des 120 minutes.",
  },
  {
    heading: "Séance Master/Recherche 10 : Transfert radiatif et polarimétrie SAR",
    level: "approfondissement",
    salles: [M("teledetection", "Le Regard")],
    dureeMin: 150,
    materiel: ["SNAP (ESA)", "scène Sentinel-1 double polarisation VV+VH", "Copernicus Data Space Ecosystem"],
    animation: "Vérifier l'installation de SNAP en amont (même précaution que PostGIS en Licence/BUT 6) et prévoir une scène double-pol déjà téléchargée en secours : séance la plus longue de la piste (150 min), aucune marge pour un problème d'installation en cours de route.",
  },
  {
    heading: "Séance Master/Recherche 11 : Étude de cas, mini-projet de recherche",
    level: "approfondissement",
    salles: [M("methodologie", "La Méthode")],
    dureeMin: 180,
    materiel: ["jeu de données selon le thème choisi", "QGIS/Python", "méthode de validation statistique"],
    animation: "Laisser choisir le thème parmi les 4 proposés (risques, agriculture, urbanisme, climat) plutôt que l'imposer, mais fixer une échéance intermédiaire explicite de validation de la question de recherche (reprise de la séance 1) avant de lancer la production : un cadrage tardif ne laisse plus le temps de la validation statistique attendue.",
  },
  {
    heading: "Séance Master/Recherche 12 : Rédiger un mémoire structuré IMRaD",
    level: "approfondissement",
    salles: [M("methodologie", "La Méthode")],
    dureeMin: 150,
    materiel: ["résultat du mini-projet (séance 11)", "sources bibliographiques normées", "grille Recherche (page Évaluation)"],
    animation: "Faire relire par un pair la seule section « résultats », isolée du reste du mémoire : une phrase d'interprétation glissée dans les résultats se repère bien plus facilement de l'extérieur que par l'auteur lui-même, c'est l'erreur la plus fréquente de l'exercice.",
  },
]
