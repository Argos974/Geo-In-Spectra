import { useState } from "react"
import type { QuizQuestion } from "@/data/quizzes/types"
import { cn } from "@/lib/utils"

interface QuestionAnswerBlockProps {
  question: QuizQuestion
  nextLabel: string
  onAnswered: (correct: boolean) => void
  onNext: () => void
}

/**
 * Rendu d'une question à choix multiples, ordre des réponses mélangé. À monter avec une
 * `key` qui change à chaque nouvelle question (et à chaque "Recommencer") : le tirage
 * (Math.random) se fait une seule fois, dans l'initialiseur paresseux de useState, lié à
 * l'identité de cette instance — la règle de pureté des hooks interdit Math.random() en
 * plein rendu, mais l'admet dans ce cas précis (doc React, "réinitialiser l'état avec une
 * clé"). Partagé entre QuizPage et RevisionPage, qui avaient chacun leur propre copie de
 * cette logique.
 */
export function QuestionAnswerBlock({ question, nextLabel, onAnswered, onNext }: QuestionAnswerBlockProps) {
  const [shuffled] = useState(() => shuffleChoices(question))
  const [selected, setSelected] = useState<number | null>(null)

  function choose(i: number) {
    if (selected !== null) return
    setSelected(i)
    onAnswered(i === shuffled.correctIndex)
  }

  return (
    <>
      <div className="space-y-3 mb-6">
        {shuffled.choices.map((choice, i) => {
          const isCorrect = i === shuffled.correctIndex
          const isSelected = i === selected
          const revealed = selected !== null
          return (
            <button
              key={choice}
              type="button"
              onClick={() => choose(i)}
              disabled={revealed}
              className={cn(
                "w-full text-left px-4 py-3 border transition-colors",
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
        <div className="border border-gilt/20 bg-white/[0.02] p-5 mb-6">
          <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-2">Explication</p>
          <p className="text-parchment-dim leading-relaxed text-justify">{question.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <button
          type="button"
          onClick={onNext}
          className="font-mono text-[12px] uppercase tracking-wider text-gilt border-b border-gilt/40 hover:border-gilt-bright hover:text-gilt-bright transition-colors pb-1"
        >
          {nextLabel}
        </button>
      )}
    </>
  )
}

function shuffleChoices(question: QuizQuestion) {
  const order = question.choices.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return { choices: order.map((i) => question.choices[i]), correctIndex: order.indexOf(question.correctIndex) }
}
