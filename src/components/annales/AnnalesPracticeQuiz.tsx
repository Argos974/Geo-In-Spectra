import { useState } from "react"
import type { QuizQuestion } from "@/data/quizzes/types"
import { recordWrongQuestion, clearWrongQuestion } from "@/lib/progress"
import { cn } from "@/lib/utils"

/**
 * QCM d'entraînement au format, embarqué directement dans une section
 * d'Annales — pas de route dédiée, mais suit bien dans progress.ts via
 * `reviewKey` (clé annalesQuiz, ex. "capes-agregation" — jamais un slug de
 * module) : une question ratée ici doit revenir en mode Révision comme une
 * question ratée en quiz de salle, sinon elle s'oublie sans repasser (trou
 * corrigé — voir resolveReviewSource pour le pendant lecture côté RevisionPage).
 */
export function AnnalesPracticeQuiz({ questions, reviewKey }: { questions: QuizQuestion[]; reviewKey: string }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-mono text-[11px] uppercase tracking-wider text-lapis-bright border border-lapis/40 px-3 py-2 hover:bg-lapis/10 transition-colors"
      >
        S'entraîner au format ({questions.length} questions) →
      </button>
    )
  }

  const q = questions[index]

  function choose(i: number) {
    if (selected !== null) return
    setSelected(i)
    if (i === q.correctIndex) {
      setScore((s) => s + 1)
      clearWrongQuestion(reviewKey, index)
    } else {
      recordWrongQuestion(reviewKey, index)
    }
  }

  function next() {
    if (index + 1 >= questions.length) {
      setDone(true)
      return
    }
    setIndex((n) => n + 1)
    setSelected(null)
  }

  function restart() {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  return (
    <div className="border border-lapis/30 bg-lapis/[0.03] p-5 mt-4">
      {done ? (
        <div className="text-center">
          <p className="font-heading text-xl mb-2">{score} / {questions.length}</p>
          <button type="button" onClick={restart} className="font-mono text-[11px] uppercase tracking-wider text-lapis-bright underline underline-offset-2">
            Recommencer
          </button>
        </div>
      ) : (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/70 mb-2">
            Question {index + 1} / {questions.length}
          </p>
          <p className="text-parchment mb-4">{q.question}</p>
          <div className="space-y-2 mb-4">
            {q.choices.map((choice, i) => {
              const isCorrect = i === q.correctIndex
              const isSelected = i === selected
              const revealed = selected !== null
              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={revealed}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm border transition-colors",
                    !revealed && "border-gilt/20 text-parchment-dim hover:border-gilt/50 hover:text-parchment",
                    revealed && isCorrect && "border-gilt bg-gilt/10 text-gilt",
                    revealed && isSelected && !isCorrect && "border-oxblood bg-oxblood/10 text-oxblood-bright",
                    revealed && !isSelected && !isCorrect && "border-gilt/10 text-parchment-dim/40",
                  )}
                >
                  {choice}
                </button>
              )
            })}
          </div>
          {selected !== null && (
            <div className="mb-4">
              <p className="text-parchment-dim text-sm text-justify">{q.explanation}</p>
            </div>
          )}
          {selected !== null && (
            <button type="button" onClick={next} className="font-mono text-[11px] uppercase tracking-wider text-lapis-bright underline underline-offset-2">
              {index + 1 >= questions.length ? "Voir le score →" : "Suivant →"}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
