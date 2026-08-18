import type { ParcoursStop } from "@/lib/activeParcours"
import type { ContentLevel } from "@/content/types"

export interface Parcours {
  id: string
  title: string
  audience: string
  description: string
  steps: string[]
  /** Séquence réelle de pages à parcourir pour ce parcours (guide "Suivant →" / "Précédent"). */
  stops: ParcoursStop[]
  /**
   * Niveaux à activer automatiquement sur le filtre "Afficher :" de chaque salle
   * tant que ce parcours est actif (ModulePage). Omis quand le niveau voulu varie
   * réellement d'un stop à l'autre du même parcours (ex. prepa-concours : "La Méthode"
   * en entier vs "Le Regard"/"Les Couleurs" en Approfondissement seul) — dans ce cas
   * le filtre reste manuel, un seul Set global appliqué à toutes les salles du
   * parcours serait faux sur au moins un stop.
   */
  levels?: ContentLevel[]
}

export const PARCOURS: Parcours[] = [
  {
    id: "decouverte-lycee",
    title: "Découverte (lycée)",
    audience: "Premier contact avec la géomatique, aucun prérequis",
    description: "Filtrer chaque salle sur \"Lycée\" uniquement (bouton en haut de chaque salle, activé automatiquement tant que ce parcours est en cours) pour ne voir que le socle, sans les formules ni les approfondissements.",
    levels: ["lycee"],
    steps: [
      "Fondements, sections 1, 7, 10, 11 (coordonnées, formats, histoire, lire une carte)",
      "Le Regard, section 9 (photo-interprétation)",
      "Les Couleurs, sections 1 à 3 (NDVI, NDMI, NDBI)",
      "L'Atelier (piste Lycée, activée par défaut par ce parcours), séance 1 (cartographie de base) puis séance 4 (buffer/intersection)",
      "Un exercice noté ponctue chaque salle traversée (coordonnées, indices, sémiologie de Bertin) : à faire sur place avant de continuer.",
      "L'Atelier, séance 9 (commenter un document cartographique) : la seule séance qui fait lire et critiquer un document plutôt que d'en produire un",
    ],
    stops: [
      { label: "Fondements", to: "/module/fondamentaux" },
      { label: "Le Regard", to: "/module/teledetection" },
      { label: "Les Couleurs", to: "/module/indices-spectraux" },
      { label: "L'Atelier (piste Lycée)", to: "/module/travaux-pratiques" },
      { label: "L'Atelier, séance 9", to: "/module/travaux-pratiques" },
    ],
  },
  {
    id: "licence-but-sig",
    title: "Licence / BUT SIG",
    audience: "Formation technique, objectif : maîtriser les outils",
    description: "Lire les 7 salles dans l'ordre, niveaux \"Lycée\" et \"Supérieur\" activés (automatique tant que ce parcours est en cours), en s'arrêtant sur chaque séance de l'Atelier au fur et à mesure : c'est la voie la plus proche d'un vrai programme de cours.",
    levels: ["lycee", "superieur"],
    steps: [
      "Fondements, Le Regard, Les Couleurs, Le Compas, dans l'ordre, sans sauter de section",
      "Après Les Couleurs : L'Atelier, piste Licence/BUT, séances 2, 3, 5 (géoréférencement, indices, Python)",
      "Après Le Compas : L'Atelier, séance 4 (analyse spatiale professionnelle) puis séance 6 (PostGIS)",
      "L'Intelligence, puis L'Atelier, séance 7 (classification supervisée)",
      "Après Le Compas également : L'Atelier, séance 10 (auditer la qualité d'un jeu de données), une compétence professionnelle directe pour un BUT",
      "Terminer par le mini-projet (L'Atelier, séance 12, un livrable professionnel complet) sur un territoire choisi",
    ],
    stops: [
      { label: "Fondements", to: "/module/fondamentaux" },
      { label: "Le Regard", to: "/module/teledetection" },
      { label: "Les Couleurs", to: "/module/indices-spectraux" },
      { label: "Exercices, Les Couleurs", to: "/module/indices-spectraux/exercices" },
      { label: "L'Atelier, séances 2, 3, 5", to: "/module/travaux-pratiques" },
      { label: "Le Compas", to: "/module/outils-sig" },
      { label: "Exercices, Le Compas", to: "/module/outils-sig/exercices" },
      { label: "L'Atelier, séances 4, 6, 10", to: "/module/travaux-pratiques" },
      { label: "L'Intelligence", to: "/module/traitements-ia" },
      { label: "L'Atelier, séances 7, 12 (mini-projet)", to: "/module/travaux-pratiques" },
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
      "S'entraîner : L'Atelier, piste Master/Recherche, séance 12 (rédiger un mémoire structuré IMRaD), comme simulation de rapport structuré",
    ],
    stops: [
      { label: "La Méthode", to: "/discipulus/methodes" },
      { label: "Fondements, section 12 (Mercator/Peters)", to: "/module/fondamentaux" },
      { label: "Le Regard (Approfondissement)", to: "/module/teledetection" },
      { label: "Les Couleurs (Approfondissement)", to: "/module/indices-spectraux" },
      { label: "Le Compas, section 4", to: "/module/outils-sig" },
      { label: "L'Atelier, séance 12 (piste Master/Recherche)", to: "/module/travaux-pratiques" },
    ],
  },
  {
    id: "approfondissement-recherche",
    title: "Approfondissement / initiation à la recherche",
    audience: "Master, stage, premier travail de recherche appliquée",
    description: "Ne lire que les sections tagées \"Approfondissement\" dans les 7 salles (filtre activé automatiquement tant que ce parcours est en cours), puis vérifier chaque notion sur le jeu de données réel plutôt que de rester dans l'abstrait.",
    levels: ["approfondissement"],
    steps: [
      "Fondements : géoïde, trilatération GNSS, ITRF/ETRS89, transformation de Helmert",
      "Le Regard : hyperspectral, transfert radiatif, polarimétrie SAR",
      "Les Couleurs : validation statistique d'un indice, séries temporelles",
      "Le Compas : géostatistique/krigeage, analyse réseau, AHP",
      "Vérifier chaque notion sur le jeu de données Vitrolles (voir Ressources → Jeux de données)",
      "L'Atelier, piste Master/Recherche, séance 6 : valider statistiquement une classification (test de McNemar), sur les résultats réels de la séance 5",
    ],
    stops: [
      { label: "Fondements (Approfondissement)", to: "/module/fondamentaux" },
      { label: "Le Regard (Approfondissement)", to: "/module/teledetection" },
      { label: "Les Couleurs (Approfondissement)", to: "/module/indices-spectraux" },
      { label: "Le Compas (Approfondissement)", to: "/module/outils-sig" },
      { label: "Jeux de données (Vitrolles)", to: "/jeux-de-donnees" },
      { label: "L'Atelier, séance 6 (piste Master/Recherche)", to: "/module/travaux-pratiques" },
    ],
  },
]
