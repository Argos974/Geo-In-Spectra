import { modules } from "@/data/modules"
import { quizzes } from "@/data/quizzes"
import { annalesQuiz, annalesQuizTitles } from "@/data/annalesQuiz"
import type { QuizQuestion } from "@/data/quizzes/types"

export interface ReviewSource {
  title: string
  questions: QuizQuestion[]
}

/**
 * Résout un slug de progressQueue (clé de reviewQueue dans progress.ts) vers son
 * titre affichable et ses questions, quelle que soit son origine — quiz de salle
 * (modules.ts + quizzes/) ou QCM d'entraînement d'Annales (annalesQuiz.ts, clés
 * distinctes type "capes-agregation", jamais un slug de module). RevisionPage est
 * le seul consommateur : centralisé ici pour ne pas dupliquer ce lookup à deux
 * origines quand une 3e source de quiz apparaîtra.
 */
export function resolveReviewSource(slug: string): ReviewSource | undefined {
  const module = modules.find((m) => m.slug === slug)
  const moduleQuestions = quizzes[slug]
  if (module && moduleQuestions) return { title: module.title, questions: moduleQuestions }

  const annalesQuestions = annalesQuiz[slug]
  if (annalesQuestions) return { title: annalesQuizTitles[slug] ?? slug, questions: annalesQuestions }

  return undefined
}
