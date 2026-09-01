import type { ParcoursStop } from "@/lib/activeParcours"
import type { ContentLevel } from "@/content/types"
import { modules } from "@/data/modules"
import { moduleTreeRoute, moduleTreeState } from "@/lib/moduleRoute"

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

/**
 * Construit un stop vers la maison canonique actuelle d'un chapitre (accordéon
 * Discipulus → Cours, ou Magister → Atelier) plutôt que vers l'ancien
 * lien profond /module/:slug — voir lib/moduleRoute.ts. Plusieurs stops de slugs
 * différents peuvent ainsi partager la même route (/discipulus/cours) : le `state`
 * (scrollTo) est ce qui distingue lequel s'ouvre réellement à l'arrivée.
 */
function moduleStop(label: string, slug: string): ParcoursStop {
  const title = modules.find((m) => m.slug === slug)?.title ?? ""
  return { label, to: moduleTreeRoute(slug), state: moduleTreeState(slug, title), moduleSlug: slug }
}

/** Stop vers la page d'exercices dédiée d'un module (route indépendante de la migration ci-dessus). */
function exercisesStop(label: string, slug: string): ParcoursStop {
  return { label, to: `/module/${slug}/exercices`, moduleSlug: slug }
}

export const PARCOURS: Parcours[] = [
  {
    id: "decouverte-lycee",
    title: "Découverte (lycée)",
    audience: "Premier contact avec la géomatique, aucun prérequis",
    description: "Filtrer chaque salle sur \"Lycée\" uniquement (bouton en haut de chaque salle, activé automatiquement tant que ce parcours est en cours) pour ne voir que le socle, sans les formules ni les approfondissements.",
    levels: ["lycee"],
    steps: [
      "Fondements (piste Lycée) : coordonnées, formats, histoire de la cartographie, lire une carte",
      "Le Regard (piste Lycée) : la photo-interprétation",
      "Les Couleurs (piste Lycée) : NDVI, NDMI, NDBI",
      "L'Atelier (piste Lycée, activée par défaut par ce parcours), séance 1 (cartographie de base) puis séance 4 (buffer/intersection)",
      "Un exercice noté ponctue chaque salle traversée (coordonnées, indices, sémiologie de Bertin) : à faire sur place avant de continuer.",
      "L'Atelier, séance 9 (commenter un document cartographique) : la seule séance qui fait lire et critiquer un document plutôt que d'en produire un",
    ],
    stops: [
      moduleStop("Fondements", "fondamentaux"),
      moduleStop("Le Regard", "teledetection"),
      moduleStop("Les Couleurs", "indices-spectraux"),
      moduleStop("L'Atelier (piste Lycée)", "travaux-pratiques"),
      moduleStop("L'Atelier, séance 9", "travaux-pratiques"),
    ],
  },
  {
    id: "licence-but-sig",
    title: "Licence / BUT SIG",
    audience: "Formation technique, objectif : maîtriser les outils",
    description: "Lire les 12 salles de Cours dans l'ordre, piste \"Licence/BUT\" activée automatiquement tant que ce parcours est en cours (chaque piste se lit seule, du socle à l'approfondissement), en s'arrêtant sur chaque séance de l'Atelier au fur et à mesure : c'est la voie la plus proche d'un vrai programme de cours.",
    levels: ["superieur"],
    steps: [
      "Fondements, Les Projections (piste Licence/BUT), dans l'ordre : coordonnées et référentiels, puis choix concret d'une projection (Lambert-93, UTM)",
      "Le Compas (piste Licence/BUT) : prise en main QGIS et analyses spatiales de base",
      "Après Le Compas : L'Atelier, séance 4 (analyse spatiale professionnelle), puis séance 10 (auditer la qualité d'un jeu de données), une compétence professionnelle directe pour un BUT",
      "Les Statistiques, puis La Base (piste Licence/BUT) : approfondir l'analyse spatiale (LISA, Gi*) puis la rendre interrogeable à grande échelle (index spatial, PostGIS)",
      "Après La Base : L'Atelier, séance 6 (PostGIS)",
      "Le Web (piste Licence/BUT) : publier les résultats sous forme de carte interactive",
      "Le Regard, Les Couleurs (piste Licence/BUT), dans l'ordre",
      "Après Les Couleurs : L'Atelier, piste Licence/BUT, séances 2, 3, 5 (géoréférencement, indices, Python)",
      "Le Drone, Le LiDAR (piste Licence/BUT) : les deux méthodes d'acquisition de données 3D les plus courantes sur le terrain",
      "L'Intelligence, puis L'Atelier, séance 7 (classification supervisée)",
      "Les Secteurs (piste Licence/BUT) : trois études de cas qui enchaînent l'ensemble des méthodes précédentes",
      "Terminer par le mini-projet (L'Atelier, séance 12, un livrable professionnel complet) sur un territoire choisi",
    ],
    stops: [
      moduleStop("Fondements", "fondamentaux"),
      moduleStop("Les Projections", "projections-avancees"),
      moduleStop("Le Compas", "outils-sig"),
      exercisesStop("Exercices, Le Compas", "outils-sig"),
      moduleStop("L'Atelier, séances 4, 10", "travaux-pratiques"),
      moduleStop("Les Statistiques", "statistiques-spatiales"),
      moduleStop("La Base", "bases-donnees-spatiales"),
      moduleStop("L'Atelier, séance 6", "travaux-pratiques"),
      moduleStop("Le Web", "cartographie-web"),
      moduleStop("Le Regard", "teledetection"),
      moduleStop("Les Couleurs", "indices-spectraux"),
      exercisesStop("Exercices, Les Couleurs", "indices-spectraux"),
      moduleStop("L'Atelier, séances 2, 3, 5", "travaux-pratiques"),
      moduleStop("Le Drone", "photogrammetrie-drones"),
      moduleStop("Le LiDAR", "lidar"),
      moduleStop("L'Intelligence", "traitements-ia"),
      moduleStop("L'Atelier, séance 7", "travaux-pratiques"),
      moduleStop("Les Secteurs", "etudes-de-cas-sectorielles"),
      moduleStop("L'Atelier, séance 12 (mini-projet)", "travaux-pratiques"),
    ],
  },
  {
    id: "prepa-concours",
    title: "Prépa concours (CAPES / Agrégation)",
    audience: "Écrit et oral d'histoire-géographie",
    description: "Commencer par La Méthode pour caler le cadre attendu avant même de réviser le fond : c'est la méthode, pas la quantité de contenu lu, qui fait la différence à l'écrit.",
    steps: [
      "La Méthode en entier (y compris la section 7, IMRaD et rigueur statistique)",
      "Fondements (piste Master/Recherche) : débat Mercator/Peters, sujet de dissertation classique",
      "Le Regard et Les Couleurs, piste Master/Recherche activée",
      "Le Compas (piste Licence/BUT) : les fondements théoriques de l'analyse spatiale (Tobler, Moran, MAUP)",
      "S'entraîner : L'Atelier, piste Master/Recherche, séance 12 (rédiger un mémoire structuré IMRaD), comme simulation de rapport structuré",
    ],
    stops: [
      { label: "La Méthode", to: "/discipulus/methodes" },
      moduleStop("Fondements (Mercator/Peters, piste Master/Recherche)", "fondamentaux"),
      moduleStop("Le Regard (Approfondissement)", "teledetection"),
      moduleStop("Les Couleurs (Approfondissement)", "indices-spectraux"),
      moduleStop("Le Compas (fondements théoriques)", "outils-sig"),
      moduleStop("L'Atelier, séance 12 (piste Master/Recherche)", "travaux-pratiques"),
    ],
  },
  {
    id: "approfondissement-recherche",
    title: "Approfondissement / initiation à la recherche",
    audience: "Master, stage, premier travail de recherche appliquée",
    description: "Ne lire que les sections tagées \"Approfondissement\" des salles traversées ci-dessous (filtre activé automatiquement tant que ce parcours est en cours), puis vérifier chaque notion sur le jeu de données réel plutôt que de rester dans l'abstrait.",
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
      moduleStop("Fondements (Approfondissement)", "fondamentaux"),
      moduleStop("Le Regard (Approfondissement)", "teledetection"),
      moduleStop("Les Couleurs (Approfondissement)", "indices-spectraux"),
      moduleStop("Le Compas (Approfondissement)", "outils-sig"),
      { label: "Jeux de données (Vitrolles)", to: "/jeux-de-donnees" },
      moduleStop("L'Atelier, séance 6 (piste Master/Recherche)", "travaux-pratiques"),
    ],
  },
]

/**
 * Slugs de module traversés par un parcours, lus directement sur `stop.moduleSlug`
 * plutôt que déduits de l'URL `to` (plusieurs stops de slugs différents peuvent
 * désormais partager la même route canonique, ex. /discipulus/cours — voir
 * moduleStop ci-dessus). Sert au mode express de RevisionPage : filtrer la file de
 * révision espacée sur le seul parcours actif plutôt que toutes les salles.
 */
export function getParcoursModuleSlugs(id: string): Set<string> {
  const parcours = PARCOURS.find((p) => p.id === id)
  const slugs = new Set<string>()
  if (!parcours) return slugs
  for (const stop of parcours.stops) {
    if (stop.moduleSlug) slugs.add(stop.moduleSlug)
  }
  return slugs
}
