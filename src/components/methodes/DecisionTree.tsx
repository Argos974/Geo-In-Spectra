import { useState } from "react"
import { methodesDecisionTree, type DecisionStep, type DecisionLeaf } from "@/data/methodesDecisionTree"
import { openAndScrollTo } from "@/lib/lenisStore"
import { slugify } from "@/lib/slug"

/**
 * Outil de recommandation, pas un chapitre de plus : 1-2 questions courtes qui
 * redirigent directement vers le bon groupe de Méthodes (ouvre l'accordéon
 * cible via le même mécanisme que ChapterNav/RoomIndex, openAndScrollTo).
 * Absent de Cours — Méthodes se consulte pour une tâche précise, ce composant
 * répond directement à "de quoi ai-je besoin maintenant ?".
 */
export function DecisionTree() {
  const [path, setPath] = useState<DecisionStep[]>([methodesDecisionTree])
  const [result, setResult] = useState<DecisionLeaf | null>(null)
  const current = path[path.length - 1]

  function reset() {
    setPath([methodesDecisionTree])
    setResult(null)
  }

  function choose(leaf: DecisionLeaf) {
    setResult(leaf)
  }

  function branch(next: DecisionStep) {
    setPath((p) => [...p, next])
  }

  function goToGroup(groupTitle: string) {
    openAndScrollTo(slugify(groupTitle))
  }

  return (
    <div className="mb-12 border border-gilt/20 bg-canvas p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt mb-4">
        Quelle méthode me faut-il ?
      </p>

      {result ? (
        <div>
          <p className="text-parchment mb-1">
            <span className="text-gilt">{result.groupTitle}</span> — {result.hint}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              onClick={() => goToGroup(result.groupTitle)}
              className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-2 hover:bg-gilt/10 transition-colors"
            >
              Aller au chapitre →
            </button>
            <button type="button" onClick={reset} className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/70 hover:text-parchment-dim">
              Recommencer
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-parchment-dim mb-4">{current.question}</p>
          <div className="flex flex-col gap-2 items-start">
            {current.leaves?.map((leaf) => (
              <button
                key={leaf.label}
                type="button"
                onClick={() => choose(leaf)}
                className="text-left font-body text-sm text-parchment-dim border border-gilt/15 px-4 py-2 hover:border-gilt/40 hover:text-gilt transition-colors w-full"
              >
                {leaf.label}
              </button>
            ))}
            {current.branches?.map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() => branch(b.next)}
                className="text-left font-body text-sm text-parchment-dim border border-gilt/15 px-4 py-2 hover:border-gilt/40 hover:text-gilt transition-colors w-full"
              >
                {b.label}
              </button>
            ))}
          </div>
          {path.length > 1 && (
            <button type="button" onClick={reset} className="mt-4 font-mono text-[11px] uppercase tracking-wider text-parchment-dim/70 hover:text-parchment-dim">
              ← Recommencer
            </button>
          )}
        </div>
      )}
    </div>
  )
}
