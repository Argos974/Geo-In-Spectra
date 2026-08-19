import type { MatchingPair } from "@/components/games/MatchingGame"
import type { CategoryItem } from "@/components/games/CategoryGame"
import type { FormulaChallenge } from "@/components/games/FormulaBuilderGame"
import type { CityCoord } from "@/components/games/CoordinateMapGame"

export type GameDef =
  | { type: "matching"; title: string; instructions: string; pairs: MatchingPair[] }
  | { type: "sequence"; title: string; instructions: string; items: string[] }
  | { type: "category"; title: string; instructions: string; categories: string[]; items: CategoryItem[] }
  | { type: "formula-builder"; title: string; instructions: string; challenges: FormulaChallenge[] }
  | { type: "spatial-operation"; title: string; instructions: string }
  | { type: "coordinate-map"; title: string; instructions: string; cities: CityCoord[] }

export const games: Record<string, GameDef> = {
  fondamentaux: {
    type: "coordinate-map",
    title: "Le Compas des Coordonnées",
    instructions: "Une ville et ses vraies coordonnées Lambert-93 sont données : clique le point qui lui correspond sur le plan (X croît vers l'est, Y croît vers le nord).",
    cities: [
      { name: "Paris", x: 652000, y: 6862000 },
      { name: "Marseille", x: 892000, y: 6247000 },
      { name: "Lille", x: 703000, y: 7060000 },
      { name: "Bordeaux", x: 417000, y: 6427000 },
      { name: "Strasbourg", x: 1032000, y: 6841000 },
      { name: "Nice", x: 1049000, y: 6293000 },
    ],
  },
  teledetection: {
    type: "matching",
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
    type: "formula-builder",
    title: "L'Atelier des Formules",
    instructions: "Construis chaque formule en cliquant les tuiles dans l'ordre : attention, des tuiles pièges (mauvaise bande, mauvais opérateur) se glissent dans le tas.",
    challenges: [
      { name: "NDVI", tokens: ["(", "NIR", "−", "Rouge", ")", "/", "(", "NIR", "+", "Rouge", ")"], distractors: ["SWIR", "×", "Vert"] },
      { name: "NDMI", tokens: ["(", "NIR", "−", "SWIR", ")", "/", "(", "NIR", "+", "SWIR", ")"], distractors: ["Rouge", "Bleu"] },
      { name: "NDBI", tokens: ["(", "SWIR", "−", "NIR", ")", "/", "(", "SWIR", "+", "NIR", ")"], distractors: ["Vert", "÷"] },
      { name: "NDWI", tokens: ["(", "Vert", "−", "NIR", ")", "/", "(", "Vert", "+", "NIR", ")"], distractors: ["SWIR", "Rouge"] },
    ],
  },
  "outils-sig": {
    type: "spatial-operation",
    title: "Le Simulateur d'Opérations Spatiales",
    instructions: "Deux formes fixes, A et B (en pointillés) : reconnais visuellement le résultat de chaque opération spatiale parmi 4 vignettes.",
  },
  "traitements-ia": {
    type: "matching",
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
    type: "category",
    title: "La Sémiologie de Bertin",
    instructions: "Cliquer une donnée, puis la variable visuelle de Bertin adaptée pour la représenter.",
    categories: ["Taille ou valeur (quantité, ordre)", "Couleur / teinte (qualitatif, sans ordre)", "Forme (qualitatif catégoriel)"],
    items: [
      { label: "Population d'une commune", category: "Taille ou valeur (quantité, ordre)" },
      { label: "Taux de chômage par département", category: "Taille ou valeur (quantité, ordre)" },
      { label: "NDVI cartographié (continu, -1 à 1)", category: "Taille ou valeur (quantité, ordre)" },
      { label: "Type d'occupation du sol (forêt/culture/bâti)", category: "Couleur / teinte (qualitatif, sans ordre)" },
      { label: "Nature géologique du sol", category: "Couleur / teinte (qualitatif, sans ordre)" },
      { label: "Type d'équipement (école/mairie/hôpital)", category: "Forme (qualitatif catégoriel)" },
    ],
  },
  "travaux-pratiques": {
    type: "sequence",
    title: "Le Fil de l'Atelier",
    instructions: "Remettre dans l'ordre les étapes de la séance 3 : de l'image géoréférencée à l'indice composé.",
    items: [
      "Géoréférencer l'image par grille (points de contrôle, séance 2)",
      "Calculer le NDVI sur l'image géoréférencée",
      "Superposer une grille et calculer la moyenne de NDVI par cellule",
      "Répéter géoréférencement + NDVI sur une image d'une autre date",
      "Composer le ΔNDVI = NDVI(date 2) − NDVI(date 1)",
      "Classer les cellules en trois catégories : perte, stable, gain",
    ],
  },
  "projections-avancees": {
    type: "matching",
    title: "Cônes, Cylindres et Déformations",
    instructions: "Associer chaque terme de projection cartographique à sa définition.",
    pairs: [
      { left: "Lambert-93", right: "Conique conforme, sécante à 44°N et 49°N, référence française" },
      { left: "UTM", right: "60 fuseaux de 6°, cylindrique transverse, facteur d'échelle 0,9996" },
      { left: "Web Mercator (EPSG:3857)", right: "Cylindrique conforme simplifiée, standard des cartes web, surfaces déformées" },
      { left: "Projection conforme", right: "Préserve les angles locaux, déforme les surfaces" },
      { left: "Projection équivalente", right: "Préserve les surfaces, déforme les angles" },
      { left: "Datum", right: "Modèle géodésique de référence (ellipsoïde + point d'ancrage), distinct de la projection" },
      { left: "Indicatrice de Tissot", right: "Cercle déformé en ellipse après projection, outil de comparaison visuelle" },
    ],
  },
  "cartographie-web": {
    type: "matching",
    title: "Le Vocabulaire de la Carte en Ligne",
    instructions: "Associer chaque terme de cartographie web à sa définition.",
    pairs: [
      { left: "Tuile raster", right: "Image déjà dessinée côté serveur, style figé" },
      { left: "Tuile vectorielle", right: "Géométrie brute transmise, dessinée côté client" },
      { left: "WMS", right: "Renvoie une image à la demande, pas les données brutes" },
      { left: "WFS", right: "Renvoie la géométrie et les attributs bruts, pour analyse" },
      { left: "WMTS", right: "Comme le WMS, mais pré-découpé en tuiles fixes mises en cache" },
      { left: "Schéma XYZ", right: "Identifie chaque tuile par zoom, colonne et ligne" },
      { left: "MapLibre GL", right: "Bibliothèque de rendu WebGL, tuiles vectorielles natives" },
    ],
  },
  "statistiques-spatiales": {
    type: "formula-builder",
    title: "La Structure du Risque",
    instructions: "Construis la formule en cliquant les tuiles dans l'ordre : attention aux tuiles pièges.",
    challenges: [
      { name: "Structure du risque", tokens: ["Aléa", "×", "Enjeux", "×", "Vulnérabilité"], distractors: ["Probabilité", "÷", "Coût"] },
      { name: "Indice de Moran (forme simplifiée)", tokens: ["I", "=", "(", "n", "/", "S0", ")"], distractors: ["h", "K", "−"] },
    ],
  },
  "photogrammetrie-drones": {
    type: "matching",
    title: "Du Vol au Modèle 3D",
    instructions: "Associer chaque terme de photogrammétrie de drone à sa définition.",
    pairs: [
      { left: "Structure from Motion (SfM)", right: "Reconstruit trajectoire caméra et géométrie 3D simultanément" },
      { left: "MNS", right: "Altitude de tout ce qui est visible d'en haut (bâti, végétation compris)" },
      { left: "MNT", right: "Altitude du sol nu uniquement, après filtrage du MNS" },
      { left: "GCP", right: "Point d'appui au sol mesuré au GPS, cale le modèle sur un référentiel réel" },
      { left: "GSD", right: "Résolution au sol : taille réelle représentée par un pixel" },
      { left: "RTK/PPK", right: "Correction GPS embarquée ramenant la précision à quelques centimètres" },
      { left: "Recouvrement", right: "Condition indispensable : un point vu sous au moins deux angles" },
    ],
  },
  lidar: {
    type: "matching",
    title: "Le Vocabulaire du LiDAR",
    instructions: "Associer chaque terme LiDAR à sa définition.",
    pairs: [
      { left: "Temps de vol (time of flight)", right: "Principe de mesure de distance par un pulse laser aller-retour" },
      { left: "Premier retour", right: "Écho venant typiquement du sommet de la canopée ou d'une toiture" },
      { left: "Derniers retours", right: "Échos les plus susceptibles de venir du sol sous couvert clairsemé" },
      { left: "CHM", right: "Modèle de hauteur de canopée, MNS moins MNT" },
      { left: "LiDAR bathymétrique", right: "Longueur d'onde verte, pénètre l'eau claire" },
      { left: "Capteur actif", right: "Émet sa propre source d'énergie plutôt que de dépendre du soleil" },
      { left: "ICESat-2 / GEDI", right: "LiDAR satellite, profils étroits, échantillonnage épars" },
    ],
  },
  "bases-donnees-spatiales": {
    type: "matching",
    title: "Le Vocabulaire des Bases Spatiales",
    instructions: "Associer chaque terme de base de données spatiale à sa définition.",
    pairs: [
      { left: "Index GiST", right: "Organise les géométries par rectangles englobants imbriqués" },
      { left: "ST_Intersects", right: "Teste si deux géométries se touchent ou se chevauchent" },
      { left: "EXPLAIN ANALYZE", right: "Révèle le plan d'exécution réel choisi par la base pour une requête" },
      { left: "Seq Scan", right: "Balayage complet de table, signe qu'un index n'est pas exploité" },
      { left: "Topologie", right: "Impose des règles de cohérence géométrique entre entités" },
      { left: "SpatiaLite", right: "Base spatiale en un seul fichier, sans serveur dédié" },
      { left: "PostGIS Raster", right: "Stocke des données raster en base, découpées en tuiles internes" },
    ],
  },
  "etudes-de-cas-sectorielles": {
    type: "sequence",
    title: "De l'Image à la Décision",
    instructions: "Remettre dans l'ordre les étapes d'une carte de préconisation agricole à taux variable.",
    items: [
      "Acquérir une image satellite ou drone récente sur la parcelle",
      "Calculer le NDVI par algèbre raster",
      "Nettoyer les artefacts (nuages, ombres) via une bande de classification",
      "Classer l'image en zones de vigueur (classification non supervisée)",
      "Associer chaque classe à une dose d'intrant",
      "Exporter la carte de préconisation vers le système de guidage du tracteur",
    ],
  },
}
