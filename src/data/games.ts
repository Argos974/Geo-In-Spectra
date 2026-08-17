import type { MatchingPair } from "@/components/games/MatchingGame"

export interface GameDef {
  title: string
  instructions: string
  pairs: MatchingPair[]
}

export const games: Record<string, GameDef> = {
  fondamentaux: {
    title: "La Chasse aux EPSG",
    instructions: "Associer chaque code EPSG à son système de coordonnées. Cliquer un code, puis le système correspondant.",
    pairs: [
      { left: "EPSG:4326", right: "WGS84 (géographique, degrés)" },
      { left: "EPSG:2154", right: "Lambert-93 (France métropolitaine)" },
      { left: "EPSG:3857", right: "Web Mercator (cartes web)" },
      { left: "EPSG:25831", right: "ETRS89 / UTM zone 31N (Europe de l'Ouest)" },
      { left: "EPSG:32633", right: "WGS84 / UTM zone 33N" },
      { left: "EPSG:27700", right: "OSGB36 / British National Grid" },
      { left: "ITRF", right: "Référentiel global, suit en continu la dérive des plaques tectoniques" },
      { left: "ETRS89 / RGF93", right: "Référentiel \"gelé\" sur la plaque eurasienne à l'époque 1989" },
    ],
  },
  teledetection: {
    title: "Les Quatre Résolutions",
    instructions: "Associer chaque type de résolution (ou de capteur) à sa définition. Cliquer un terme, puis sa définition.",
    pairs: [
      { left: "Résolution spatiale", right: "Taille au sol représentée par un pixel" },
      { left: "Résolution spectrale", right: "Nombre et finesse des bandes mesurées" },
      { left: "Résolution temporelle", right: "Fréquence de revisite du même lieu" },
      { left: "Résolution radiométrique", right: "Nombre de niveaux d'intensité codés par pixel" },
      { left: "Capteur optique", right: "Mesure la lumière solaire réfléchie, bloqué par les nuages" },
      { left: "Capteur radar (SAR)", right: "Émet sa propre onde, traverse les nuages" },
      { left: "Capteur hyperspectral", right: "Plusieurs centaines de bandes contiguës très fines" },
      { left: "Double-rebond (SAR)", right: "Façade + sol, ou tronc + eau : réflexion en coin caractéristique" },
    ],
  },
  "indices-spectraux": {
    title: "Indice ou Formule ?",
    instructions: "Associer chaque indice spectral à sa formule ou à son usage principal.",
    pairs: [
      { left: "NDVI", right: "(NIR − Rouge) / (NIR + Rouge)" },
      { left: "NDMI", right: "(NIR − SWIR) / (NIR + SWIR)" },
      { left: "NDBI", right: "(SWIR − NIR) / (SWIR + NIR)" },
      { left: "SAVI", right: "NDVI corrigé de l'effet du sol nu" },
      { left: "NBR", right: "Sévérité de brûlis, bande SWIR2" },
      { left: "EVI", right: "Corrige la saturation et les résidus atmosphériques" },
      { left: "NDRE", right: "Bandes red-edge, sature plus tard que le NDVI" },
    ],
  },
  "outils-sig": {
    title: "Le Cabinet des Opérations",
    instructions: "Associer chaque opération spatiale à ce qu'elle fait réellement.",
    pairs: [
      { left: "Buffer", right: "Polygone à distance fixe autour d'une géométrie" },
      { left: "Intersection", right: "Ne garde que la partie commune entre deux couches" },
      { left: "Dissolve", right: "Fusionne les géométries adjacentes de même valeur" },
      { left: "Jointure spatiale", right: "Associe des attributs selon la position" },
      { left: "Clip", right: "Découpe une couche selon l'emprise d'une autre" },
      { left: "Différence symétrique", right: "Garde tout sauf la partie commune aux deux couches" },
      { left: "Krigeage", right: "Interpolation statistique, fournit aussi une carte d'incertitude" },
      { left: "AHP", right: "Pondère plusieurs critères spatiaux à partir de comparaisons deux à deux" },
    ],
  },
  "traitements-ia": {
    title: "Machine et Vocabulaire",
    instructions: "Associer chaque terme d'apprentissage automatique à sa définition.",
    pairs: [
      { left: "Kappa", right: "Corrige la précision globale de l'accord dû au hasard" },
      { left: "Overfitting", right: "Le modèle mémorise l'entraînement, généralise mal" },
      { left: "U-Net", right: "Architecture de segmentation pixel par pixel" },
      { left: "Random Forest", right: "Assemble de nombreux arbres de décision" },
      { left: "Transfer learning", right: "Réutilise un modèle déjà entraîné sur une autre tâche" },
      { left: "Data leakage", right: "Le jeu de test contamine l'entraînement, précision faussée" },
      { left: "IoU", right: "Recouvrement prédiction/vérité terrain, métrique de segmentation" },
    ],
  },
  methodologie: {
    title: "La Grammaire de la Carte",
    instructions: "Associer chaque variable visuelle de Bertin ou type de plan à ce qu'il/elle sert à représenter.",
    pairs: [
      { left: "Taille", right: "Une quantité (ex. ronds proportionnels)" },
      { left: "Valeur (clair → foncé)", right: "Un ordre, une intensité progressive" },
      { left: "Couleur (teinte)", right: "Une donnée qualitative, sans ordre" },
      { left: "Forme", right: "Une donnée qualitative catégorielle" },
      { left: "Plan dialectique", right: "Sujet formulé comme une question fermée ou un débat" },
      { left: "Plan thématique", right: "Sujet qui invite à explorer plusieurs dimensions d'un phénomène" },
      { left: "Structure IMRaD", right: "Introduction, Méthode, Résultats, Discussion" },
    ],
  },
  "travaux-pratiques": {
    title: "L'Établi de l'Apprenti",
    instructions: "Associer chaque outil ou mesure de contrôle à son usage en séance pratique.",
    pairs: [
      { left: "ogrinfo", right: "Inspecte une couche vecteur en ligne de commande" },
      { left: "gdalinfo", right: "Inspecte un raster en ligne de commande" },
      { left: "Géoréférenceur QGIS", right: "Associe des pixels à des coordonnées réelles via des GCP" },
      { left: "Statistiques de zone", right: "Moyenne d'un raster à l'intérieur de chaque polygone" },
      { left: "RMSE", right: "Mesure la précision géométrique d'un géoréférencement" },
      { left: "Matrice de confusion", right: "Évalue la précision d'une classification" },
      { left: "MLPClassifier", right: "Réseau de neurones simple, à comparer au Random Forest sur le même jeu de test" },
    ],
  },
}
