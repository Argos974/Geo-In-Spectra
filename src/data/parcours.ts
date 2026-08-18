import type { ParcoursStop } from "@/lib/activeParcours"

export interface Parcours {
  id: string
  title: string
  audience: string
  description: string
  steps: string[]
  /** Séquence réelle de pages à parcourir pour ce parcours (guide "Suivant →" / "Précédent"). */
  stops: ParcoursStop[]
}

export const PARCOURS: Parcours[] = [
  {
    id: "decouverte-lycee",
    title: "Découverte (lycée)",
    audience: "Premier contact avec la géomatique, aucun prérequis",
    description: "Filtrer chaque salle sur \"Lycée\" uniquement (bouton en haut de chaque salle) pour ne voir que le socle, sans les formules ni les approfondissements.",
    steps: [
      "Fondements, sections 1, 7, 10, 11 (coordonnées, formats, histoire, lire une carte)",
      "Le Regard, section 9 (photo-interprétation)",
      "Les Couleurs, sections 1 à 3 (NDVI, NDMI, NDBI)",
      "L'Atelier, séance 1 (cartographie de base) puis séance 4 (buffer/intersection)",
      "Jouer : Le Compas des Coordonnées, Indice ou Formule, La Sémiologie de Bertin",
    ],
    stops: [
      { label: "Fondements", to: "/module/fondamentaux" },
      { label: "Le Regard", to: "/module/teledetection" },
      { label: "Les Couleurs", to: "/module/indices-spectraux" },
      { label: "L'Atelier", to: "/module/travaux-pratiques" },
      { label: "Jouer : Le Compas des Coordonnées", to: "/jeu/fondamentaux" },
    ],
  },
  {
    id: "licence-but-sig",
    title: "Licence / BUT SIG",
    audience: "Formation technique, objectif : maîtriser les outils",
    description: "Lire les 7 salles dans l'ordre, niveaux \"Lycée\" et \"Supérieur\" activés, en s'arrêtant sur chaque séance de l'Atelier au fur et à mesure : c'est la voie la plus proche d'un vrai programme de cours.",
    steps: [
      "Fondements, Le Regard, Les Couleurs, Le Compas, dans l'ordre, sans sauter de section",
      "Après Les Couleurs : séances 2, 3, 5 de l'Atelier (géoréférencement, indices, Python)",
      "Après Le Compas : séance 4 de l'Atelier (analyse spatiale)",
      "L'Intelligence, puis séances 6, 7 de l'Atelier (classification, réseau de neurones)",
      "Terminer par le mini-projet (séance 9) sur un territoire choisi",
    ],
    stops: [
      { label: "Fondements", to: "/module/fondamentaux" },
      { label: "Le Regard", to: "/module/teledetection" },
      { label: "Les Couleurs", to: "/module/indices-spectraux" },
      { label: "Exercices, Les Couleurs", to: "/module/indices-spectraux/exercices" },
      { label: "L'Atelier, séances 2, 3, 5", to: "/module/travaux-pratiques" },
      { label: "Le Compas", to: "/module/outils-sig" },
      { label: "Exercices, Le Compas", to: "/module/outils-sig/exercices" },
      { label: "L'Atelier, séance 4", to: "/module/travaux-pratiques" },
      { label: "L'Intelligence", to: "/module/traitements-ia" },
      { label: "L'Atelier, séances 6, 7, 9 (mini-projet)", to: "/module/travaux-pratiques" },
    ],
  },
  {
    id: "prepa-concours",
    title: "Prépa concours (CAPES / Agrégation)",
    audience: "Écrit et oral d'histoire-géographie",
    description: "Commencer par La Méthode pour caler le cadre attendu avant même de réviser le fond : c'est la méthode, pas la quantité de contenu lu, qui fait la différence à l'écrit.",
    steps: [
      "La Méthode en entier (y compris la section 7, IMRaD et rigueur statistique)",
      "Fondements, section 12 (débat Mercator/Peters), sujet de dissertation classique",
      "Le Regard et Les Couleurs, niveau \"Approfondissement\" activé",
      "Le Compas, section 4 (sémiologie et fondements théoriques de l'analyse spatiale)",
      "S'entraîner : séance 9 de l'Atelier comme simulation de rapport structuré",
    ],
    stops: [
      { label: "La Méthode", to: "/module/methodologie" },
      { label: "Fondements, section 12 (Mercator/Peters)", to: "/module/fondamentaux" },
      { label: "Le Regard (Approfondissement)", to: "/module/teledetection" },
      { label: "Les Couleurs (Approfondissement)", to: "/module/indices-spectraux" },
      { label: "Le Compas, section 4", to: "/module/outils-sig" },
      { label: "L'Atelier, séance 9", to: "/module/travaux-pratiques" },
    ],
  },
  {
    id: "approfondissement-recherche",
    title: "Approfondissement / initiation à la recherche",
    audience: "Master, stage, premier travail de recherche appliquée",
    description: "Ne lire que les sections tagées \"Approfondissement\" dans les 7 salles, puis vérifier chaque notion sur le jeu de données réel plutôt que de rester dans l'abstrait.",
    steps: [
      "Fondements : géoïde, trilatération GNSS, ITRF/ETRS89, transformation de Helmert",
      "Le Regard : hyperspectral, transfert radiatif, polarimétrie SAR",
      "Les Couleurs : validation statistique d'un indice, séries temporelles",
      "Le Compas : géostatistique/krigeage, analyse réseau, AHP",
      "Vérifier chaque notion sur le jeu de données Vitrolles (voir Ressources → Jeux de données)",
    ],
    stops: [
      { label: "Fondements (Approfondissement)", to: "/module/fondamentaux" },
      { label: "Le Regard (Approfondissement)", to: "/module/teledetection" },
      { label: "Les Couleurs (Approfondissement)", to: "/module/indices-spectraux" },
      { label: "Le Compas (Approfondissement)", to: "/module/outils-sig" },
      { label: "Jeux de données (Vitrolles)", to: "/jeux-de-donnees" },
    ],
  },
]
