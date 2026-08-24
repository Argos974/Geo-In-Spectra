import { slugify } from "@/lib/slug"

/**
 * Modules affichés comme chapitres repliables sur /discipulus/cours — source
 * unique (DiscipulusCoursPage en dérive son ordre d'affichage via `[...COURS_SLUGS]`,
 * l'ordre d'itération d'un Set étant son ordre d'insertion) pour éviter que cette
 * liste ne diverge entre les deux usages, comme c'était le cas auparavant.
 */
export const COURS_SLUGS = new Set([
  "fondamentaux",
  "teledetection",
  "indices-spectraux",
  "outils-sig",
  "traitements-ia",
  "projections-avancees",
  "cartographie-web",
  "statistiques-spatiales",
  "photogrammetrie-drones",
  "lidar",
  "bases-donnees-spatiales",
  "etudes-de-cas-sectorielles",
])

/**
 * Route réelle dans l'arborescence (profils → cours) où vit le contenu d'un
 * module — à utiliser pour tout lien de RETOUR depuis une vue enfant (quiz,
 * exercices, recherche) plutôt que la page de lien profond /module/:slug, qui
 * n'est plus le chemin de navigation normal (voir ModulePage.tsx).
 */
export function moduleTreeRoute(slug: string): string {
  if (COURS_SLUGS.has(slug)) return "/discipulus/cours"
  if (slug === "methodologie") return "/discipulus/methodes"
  if (slug === "travaux-pratiques") return "/magister/cours"
  return `/module/${slug}`
}

/** State de navigation pour rouvrir/faire défiler jusqu'au bon chapitre à l'arrivée sur moduleTreeRoute (voir lib/lenisStore.ts::openAndScrollTo). */
export function moduleTreeState(slug: string, title: string): { scrollTo: string } | undefined {
  return COURS_SLUGS.has(slug) ? { scrollTo: slugify(title) } : undefined
}
