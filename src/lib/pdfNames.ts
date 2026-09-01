import { modules } from "@/data/modules"
import type { ContentLevel } from "@/content/types"

/**
 * Suffixes de piste alignés sur generate-course-pdfs.mjs (LEVEL_TRACKS) —
 * unique source pour ModuleChapterBody, MethodesActionBar et PlanPage, qui
 * avaient chacun leur propre logique de nommage avant cette extraction.
 */
export const LEVEL_TRACKS: { level: ContentLevel; suffix: string; shortLabel: string }[] = [
  { level: "lycee", suffix: "lycee", shortLabel: "Lycée" },
  { level: "superieur", suffix: "licence-but", shortLabel: "Licence/BUT" },
  { level: "approfondissement", suffix: "master-recherche", shortLabel: "Master/Recherche" },
]

/** Préfixe numérique à deux chiffres d'un module, dérivé de sa position dans `modules` (voir generate-course-pdfs.mjs). */
export function moduleOrder(slug: string): string {
  const index = modules.findIndex((m) => m.slug === slug)
  return String(index + 1).padStart(2, "0")
}

/**
 * Nom du PDF de cours pour un module — décliné par piste (`<NN>-<slug>-cours-<suffix>.pdf`)
 * pour un module "3 pistes" (leveled !== false), un seul fichier non suffixé sinon
 * (Méthodologie, seule exception — voir CourseModule.leveled).
 */
export function coursePdfName(slug: string, leveled: boolean, level: ContentLevel): string {
  const order = moduleOrder(slug)
  if (!leveled) return `${order}-${slug}-cours.pdf`
  const track = LEVEL_TRACKS.find((t) => t.level === level) ?? LEVEL_TRACKS[0]
  return `${order}-${slug}-cours-${track.suffix}.pdf`
}

/** Fiche mémo : toujours un seul PDF par module, jamais filtré par niveau (condensé des trois pistes). */
export function fichePdfName(slug: string): string {
  return `${moduleOrder(slug)}-${slug}-fiche-memo.pdf`
}

/** Corrigé de quiz : un seul PDF par module, réservé à la couche enseignant (showTeacherMeta). */
export function quizCorrigePdfName(slug: string): string {
  return `${moduleOrder(slug)}-${slug}-quiz-corrige.pdf`
}
