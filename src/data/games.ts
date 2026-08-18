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
}
