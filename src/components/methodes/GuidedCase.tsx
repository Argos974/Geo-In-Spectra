import { useState } from "react"
import type { ExerciseSet } from "@/data/exercises"

/**
 * Cas pratique guidé — affichage séquentiel (une question à la fois, réponse
 * de l'utilisateur avant correction) plutôt que la liste question+corrigé déjà
 * visible d'un bloc sur /module/methodologie/exercices. Réutilise exactement
 * les mêmes données (exercises.methodologie), pas un nouveau type d'exercice :
 * seul le mode d'affichage change, pour donner à Méthodes un format qui lui
 * est propre (l'entraînement pas-à-pas) plutôt qu'un doublon de la page Cours.
 */
export function GuidedCase({ set }: { set: ExerciseSet }) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [draft, setDraft] = useState("")
  const exercise = set.exercises[index]
  const isLast = index === set.exercises.length - 1

  function next() {
    setIndex((i) => i + 1)
    setRevealed(false)
    setDraft("")
  }

  function restart() {
    setIndex(0)
    setRevealed(false)
    setDraft("")
  }

  if (!exercise) return null

  return (
    <div className="mb-12 border border-gilt/20 bg-canvas p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt mb-1">Cas pratique guidé</p>
      <p className="font-mono text-[10px] text-parchment-dim/80 mb-4">
        Étape {index + 1} / {set.exercises.length}
      </p>

      <p className="text-parchment mb-4 text-justify">{exercise.prompt}</p>

      {!revealed ? (
        <div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Rédige ta réponse avant de voir le corrigé (non enregistrée)…"
            aria-label="Ta réponse au cas pratique"
            rows={3}
            className="w-full bg-ink border border-gilt/20 px-3 py-2 text-sm text-parchment placeholder:text-parchment-dim/40 focus:outline-none focus:border-gilt/50 mb-3"
          />
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-2 hover:bg-gilt/10 transition-colors"
          >
            Voir le corrigé
          </button>
        </div>
      ) : (
        <div>
          <div className="border-l-2 border-lapis/40 pl-4 mb-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-lapis-bright mb-1">Corrigé</p>
            <p className="text-parchment-dim text-sm text-justify">{exercise.solutionText}</p>
          </div>
          {isLast ? (
            <button
              type="button"
              onClick={restart}
              className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 border border-gilt/15 px-3 py-2 hover:text-gilt hover:border-gilt/40 transition-colors"
            >
              Recommencer la série
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-2 hover:bg-gilt/10 transition-colors"
            >
              Question suivante →
            </button>
          )}
        </div>
      )}
    </div>
  )
}
