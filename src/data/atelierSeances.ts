/**
 * Métadonnées de navigation pour l'Atelier — ne duplique aucun contenu, juste
 * un pointeur (titre exact de heading, pour slugify()) vers la ou les salles
 * théoriques dont chaque séance dépend. Sert uniquement à construire la vue
 * "par salle" du plan de l'atelier (AtelierIndex) à côté de la vue pipeline.
 */
export interface AtelierSalleRef {
  slug: string
  label: string
}

export interface AtelierSeanceRef {
  /** Doit correspondre exactement au texte du bloc `heading` dans travaux-pratiques.ts (slugify() en dépend). */
  heading: string
  salles: AtelierSalleRef[]
}

export const atelierSeances: AtelierSeanceRef[] = [
  { heading: "Séance 1 : Cartographie de base sous QGIS", salles: [{ slug: "methodologie", label: "La Méthode" }] },
  { heading: "Séance 2 : Géoréférencer une image par grille", salles: [{ slug: "outils-sig", label: "Le Compas" }] },
  {
    heading: "Séance 3 : De l'image géoréférencée à l'indice composé",
    salles: [
      { slug: "teledetection", label: "Le Regard" },
      { slug: "indices-spectraux", label: "Les Couleurs" },
      { slug: "outils-sig", label: "Le Compas" },
    ],
  },
  { heading: "Séance 4 : Analyse spatiale, buffer et intersection", salles: [{ slug: "outils-sig", label: "Le Compas" }] },
  { heading: "Bonus séance 4 : la même question, sur une donnée vivante", salles: [{ slug: "outils-sig", label: "Le Compas" }] },
  { heading: "Séance 5 : Programmation géospatiale simple", salles: [{ slug: "outils-sig", label: "Le Compas" }] },
  { heading: "Séance 6 : Classification supervisée et évaluation de précision", salles: [{ slug: "traitements-ia", label: "L'Intelligence" }] },
  { heading: "Séance 7 : Classification par réseau de neurones simple", salles: [{ slug: "traitements-ia", label: "L'Intelligence" }] },
  {
    heading: "Séance 8 : Radar et interpolation spatiale",
    salles: [
      { slug: "teledetection", label: "Le Regard" },
      { slug: "outils-sig", label: "Le Compas" },
    ],
  },
  { heading: "Séance 9 : Étude de cas et mini-projet final", salles: [{ slug: "methodologie", label: "La Méthode" }] },
  {
    heading: "Séance 10 : Commenter un document cartographique",
    salles: [
      { slug: "teledetection", label: "Le Regard" },
      { slug: "methodologie", label: "La Méthode" },
    ],
  },
  { heading: "Séance 11 : Auditer la qualité d'un jeu de données SIG", salles: [{ slug: "outils-sig", label: "Le Compas" }] },
  {
    heading: "Séance 12 : Valider statistiquement une classification",
    salles: [
      { slug: "traitements-ia", label: "L'Intelligence" },
      { slug: "methodologie", label: "La Méthode" },
    ],
  },
]
