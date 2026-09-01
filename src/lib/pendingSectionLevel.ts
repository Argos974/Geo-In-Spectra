import type { ContentLevel } from "@/content/types"

/**
 * Relais éphémère entre "je clique un résultat de recherche/formulaire/piège
 * qui pointe vers une section d'une piste précise" et le ModuleChapterBody
 * concerné, qui doit basculer sur cette piste AVANT que openAndScrollTo
 * (lenisStore.ts) ne cherche l'ancre dans le DOM — sinon la section reste
 * filtrée par la piste par défaut ("superieur") et le scroll ne trouve rien
 * (voir le "silent no-op" de openAndScrollTo). Pas de persistance
 * localStorage : une navigation SPA suffit, la valeur est consommée une
 * seule fois par le module ciblé puis effacée, jamais lue par un autre.
 */
let pending: { moduleSlug: string; level: ContentLevel } | null = null

export function setPendingSectionLevel(moduleSlug: string, level: ContentLevel) {
  pending = { moduleSlug, level }
}

/** Consomme la piste en attente si elle concerne ce module précis — undefined sinon, sans effet de bord sur une cible destinée à un autre module. */
export function consumePendingSectionLevel(moduleSlug: string): ContentLevel | undefined {
  if (pending?.moduleSlug !== moduleSlug) return undefined
  const level = pending.level
  pending = null
  return level
}
