import { Link } from "react-router-dom"
import { modules } from "@/data/modules"
import { quizzes } from "@/data/quizzes"
import { exercises } from "@/data/exercises"

/**
 * Barre d'action pour Méthodes — mêmes cibles (PDF/exercices/quiz) et même
 * style de bouton que l'action row de ModuleChapterBody (Cours), pour que les
 * deux onglets se comportent de façon cohérente plutôt que Méthodes ayant ses
 * propres boutons discrets en simple lien souligné.
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
    <div className="print:hidden flex flex-nowrap items-center gap-2 mb-10 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
      <a
        href={`/pdf/${slug}/${coursName}`}
        download={coursName}
        className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-2 hover:bg-gilt/10 transition-colors"
      >
        ↓ Cours (PDF)
      </a>
      <a
        href={`/pdf/${slug}/${ficheName}`}
        download={ficheName}
        className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-lapis-bright border border-lapis/40 px-3 py-2 hover:bg-lapis/10 transition-colors"
      >
        ↓ Fiche mémo (PDF)
      </a>
      {hasExercises && (
        <Link
          to={`/module/${slug}/exercices`}
          className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-lapis-bright border border-lapis/40 px-3 py-2 hover:bg-lapis/10 transition-colors"
        >
          S'entraîner →
        </Link>
      )}
      {hasQuiz && (
        <Link
          to={`/module/${slug}/quiz`}
          className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-parchment-dim border border-gilt/15 px-3 py-2 hover:border-gilt/40 hover:text-gilt transition-colors"
        >
          Faire le quiz →
        </Link>
      )}
    </div>
  )
}
