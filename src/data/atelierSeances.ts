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
}

const M = (slug: string, label: string): AtelierSalleRef => ({ slug, label })

export const atelierSeances: AtelierSeanceRef[] = [
  // ---- Piste Lycée ----
  { heading: "Séance Lycée 1 : Cartographie de base sous QGIS", level: "lycee", salles: [M("methodologie", "La Méthode")] },
  { heading: "Séance Lycée 2 : Lire et localiser, les coordonnées Lambert-93", level: "lycee", salles: [M("fondamentaux", "Fondements")] },
  { heading: "Séance Lycée 3 : Vecteur ou raster, choisir la bonne donnée", level: "lycee", salles: [M("fondamentaux", "Fondements")] },
  { heading: "Séance Lycée 4 : Buffer et intersection, une contrainte réglementaire simple", level: "lycee", salles: [M("outils-sig", "Le Compas")] },
  { heading: "Séance Lycée 5 : Lire une image satellite à l'œil, la photo-interprétation", level: "lycee", salles: [M("teledetection", "Le Regard")] },
  { heading: "Séance Lycée 6 : Calculer et lire un NDVI", level: "lycee", salles: [M("indices-spectraux", "Les Couleurs")] },
  { heading: "Séance Lycée 7 : Repérer le bâti et l'eau, NDBI et NDWI", level: "lycee", salles: [M("indices-spectraux", "Les Couleurs")] },
  { heading: "Séance Lycée 8 : Mettre en page une carte, légende et sémiologie", level: "lycee", salles: [M("methodologie", "La Méthode")] },
  { heading: "Séance Lycée 9 : Commenter un document cartographique", level: "lycee", salles: [M("teledetection", "Le Regard"), M("methodologie", "La Méthode")] },
  { heading: "Séance Lycée 10 : Une carte ancienne face à une image récente", level: "lycee", salles: [M("fondamentaux", "Fondements")] },
  { heading: "Séance Lycée 11 : Le débat Mercator/Peters, mesurer une déformation", level: "lycee", salles: [M("fondamentaux", "Fondements")] },
  { heading: "Séance Lycée 12 : Mini-projet, une carte thématique complète", level: "lycee", salles: [M("methodologie", "La Méthode")] },

  // ---- Piste Licence/BUT ----
  { heading: "Séance Licence/BUT 1 : Prise en main QGIS avancée et automatisation légère", level: "superieur", salles: [M("outils-sig", "Le Compas")] },
  { heading: "Séance Licence/BUT 2 : Géoréférencer une image par grille", level: "superieur", salles: [M("outils-sig", "Le Compas")] },
  {
    heading: "Séance Licence/BUT 3 : De l'image géoréférencée à l'indice composé",
    level: "superieur",
    salles: [M("teledetection", "Le Regard"), M("indices-spectraux", "Les Couleurs"), M("outils-sig", "Le Compas")],
  },
  { heading: "Séance Licence/BUT 4 : Analyse spatiale professionnelle, jointure et découpage", level: "superieur", salles: [M("outils-sig", "Le Compas")] },
  { heading: "Séance Licence/BUT 5 : Programmation géospatiale simple", level: "superieur", salles: [M("outils-sig", "Le Compas")] },
  { heading: "Séance Licence/BUT 6 : Bases de données géographiques, PostGIS", level: "superieur", salles: [M("outils-sig", "Le Compas")] },
  { heading: "Séance Licence/BUT 7 : Classification supervisée et évaluation de précision", level: "superieur", salles: [M("traitements-ia", "L'Intelligence")] },
  { heading: "Séance Licence/BUT 8 : Statistiques de zone et algèbre raster", level: "superieur", salles: [M("outils-sig", "Le Compas")] },
  {
    heading: "Séance Licence/BUT 9 : Radar et interpolation spatiale",
    level: "superieur",
    salles: [M("teledetection", "Le Regard"), M("outils-sig", "Le Compas")],
  },
  { heading: "Séance Licence/BUT 10 : Auditer la qualité d'un jeu de données SIG", level: "superieur", salles: [M("outils-sig", "Le Compas")] },
  { heading: "Séance Licence/BUT 11 : Rédiger un rapport technique SIG", level: "superieur", salles: [M("methodologie", "La Méthode")] },
  { heading: "Séance Licence/BUT 12 : Mini-projet, un livrable professionnel complet", level: "superieur", salles: [M("methodologie", "La Méthode")] },

  // ---- Piste Master/Recherche ----
  { heading: "Séance Master/Recherche 1 : Cadrer une question de recherche", level: "approfondissement", salles: [M("methodologie", "La Méthode")] },
  { heading: "Séance Master/Recherche 2 : Prétraitement rigoureux, de la valeur brute à la réflectance", level: "approfondissement", salles: [M("teledetection", "Le Regard")] },
  { heading: "Séance Master/Recherche 3 : Valider un indice face à une mesure biophysique", level: "approfondissement", salles: [M("indices-spectraux", "Les Couleurs")] },
  { heading: "Séance Master/Recherche 4 : Séries temporelles et phénologie", level: "approfondissement", salles: [M("indices-spectraux", "Les Couleurs")] },
  { heading: "Séance Master/Recherche 5 : Classification par réseau de neurones simple", level: "approfondissement", salles: [M("traitements-ia", "L'Intelligence")] },
  { heading: "Séance Master/Recherche 6 : Valider statistiquement une classification", level: "approfondissement", salles: [M("traitements-ia", "L'Intelligence"), M("methodologie", "La Méthode")] },
  { heading: "Séance Master/Recherche 7 : Krigeage avancé, validation croisée du variogramme", level: "approfondissement", salles: [M("outils-sig", "Le Compas")] },
  { heading: "Séance Master/Recherche 8 : Analyse réseau et décision multicritère", level: "approfondissement", salles: [M("outils-sig", "Le Compas")] },
  { heading: "Séance Master/Recherche 9 : Au-delà du multispectral, l'imagerie hyperspectrale", level: "approfondissement", salles: [M("teledetection", "Le Regard")] },
  { heading: "Séance Master/Recherche 10 : Transfert radiatif et polarimétrie SAR", level: "approfondissement", salles: [M("teledetection", "Le Regard")] },
  { heading: "Séance Master/Recherche 11 : Étude de cas, mini-projet de recherche", level: "approfondissement", salles: [M("methodologie", "La Méthode")] },
  { heading: "Séance Master/Recherche 12 : Rédiger un mémoire structuré IMRaD", level: "approfondissement", salles: [M("methodologie", "La Méthode")] },
]
