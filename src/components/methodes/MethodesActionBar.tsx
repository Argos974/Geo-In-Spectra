import { Link } from "react-router-dom"
import { modules } from "@/data/modules"
import { quizzes } from "@/data/quizzes"
import { exercises } from "@/data/exercises"

/**
 * Barre d'action compacte pour Méthodes — même cible (PDF/exercices/quiz) que
 * l'action row de ModuleChapterBody, mais en une seule ligne fine plutôt que
 * les gros boutons de Cours : Méthodes se consulte au coup par coup, pas
 * salle par salle, une barre discrète en tête convient mieux qu'un bloc large
 * répété à chaque chapitre.
 */
export function MethodesActionBar() {
  const slug = "methodologie"
  const index = modules.findIndex((m) => m.slug === slug)
  const order = String(index + 1).padStart(2, "0")
  const coursName = `${order}-${slug}-cours.pdf`
  const ficheName = `${order}-${slug}-fiche-memo.pdf`
  const hasQuiz = Boolean(quizzes[slug])
  const hasExercises = Boolean(exercises[slug])

  return (
    <div className="print:hidden flex flex-wrap items-center gap-x-5 gap-y-2 mb-10 pb-4 border-b border-gilt/15 font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80">
      <a href={`/pdf/${slug}/${coursName}`} download={coursName} className="hover:text-gilt transition-colors">
        ↓ Cours (PDF)
      </a>
      <a href={`/pdf/${slug}/${ficheName}`} download={ficheName} className="hover:text-lapis-bright transition-colors">
        ↓ Fiche mémo (PDF)
      </a>
      {hasExercises && (
        <Link to={`/module/${slug}/exercices`} className="hover:text-lapis-bright transition-colors">
          S'entraîner →
        </Link>
      )}
      {hasQuiz && (
        <Link to={`/module/${slug}/quiz`} className="hover:text-gilt transition-colors">
          Faire le quiz →
        </Link>
      )}
    </div>
  )
}
