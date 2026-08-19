import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { quizzes } from "@/data/quizzes"
import { cn } from "@/lib/utils"
import { recordQuizScore, recordWrongQuestion, clearWrongQuestion } from "@/lib/progress"
import { moduleTreeRoute, moduleTreeState } from "@/lib/moduleRoute"

export function QuizPage() {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)
  const questions = slug ? quizzes[slug] : undefined

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  // Incrémenté à chaque "Recommencer" pour forcer un nouveau tirage même sur
  // la question 0 (sinon useMemo, indexé sur `index` seul, garderait le même
  // ordre déjà vu à la tentative précédente).
  const [shuffleSeed, setShuffleSeed] = useState(0)

  if (!module || !questions) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-parchment gap-4">
        <p className="font-mono text-parchment-dim">Quiz introuvable.</p>
        <Link to="/" className="text-gilt underline">Retour à la galerie</Link>
      </div>
    )
  }

  const quizQuestions = questions
  const q = quizQuestions[index]
  const moduleSlug = module.slug
  const backTo = moduleTreeRoute(moduleSlug)
  const backState = moduleTreeState(moduleSlug, module.title)

  // Ordre des choix mélangé à chaque question (et à chaque "Recommencer") —
  // sinon la bonne réponse reste sur le même index d'une lecture à l'autre et
  // devient un repère de position mémorisable indépendamment du contenu.
  const shuffled = useMemo(() => {
    const order = q.choices.map((_, i) => i)
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[order[i], order[j]] = [order[j], order[i]]
    }
    return { choices: order.map((i) => q.choices[i]), correctIndex: order.indexOf(q.correctIndex) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, shuffleSeed, q])

  function choose(i: number) {
    if (selected !== null) return
    setSelected(i)
    if (i === shuffled.correctIndex) {
      setScore((s) => s + 1)
      clearWrongQuestion(moduleSlug, index)
    } else {
      recordWrongQuestion(moduleSlug, index)
    }
  }

  function next() {
    if (index + 1 >= quizQuestions.length) {
      setDone(true)
      recordQuizScore(moduleSlug, score, quizQuestions.length)
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
    setShuffleSeed((s) => s + 1)
  }

  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-2xl">
        <Link to={backTo} state={backState} className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← {module.title}
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Quiz</p>
        <h1 className="font-heading text-3xl md:text-4xl mt-3 mb-10">{module.title}</h1>

        {done ? (
          <div className="border border-gilt/40 bg-gilt/[0.06] p-8 text-center">
            <p className="font-heading text-2xl mb-3">
              {score} / {questions.length}
            </p>
            <p className="text-parchment-dim mb-6">
              {score === questions.length
                ? "Sans faute."
                : score >= questions.length / 2
                  ? "Bonne base, une relecture de la salle affinera le reste."
                  : "Une relecture de la salle est conseillée avant de retenter."}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={restart}
                className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-4 py-2 hover:bg-gilt/10 transition-colors"
              >
                Recommencer
              </button>
              <Link
                to={backTo}
                state={backState}
                className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim hover:text-gilt transition-colors"
              >
                Retour à la salle
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-4">
              Question {index + 1} / {questions.length}
            </p>
            <p className="font-heading text-xl mb-6">{q.question}</p>

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
                <p className="text-parchment-dim leading-relaxed text-justify">{q.explanation}</p>
              </div>
            )}

            {selected !== null && (
              <button
                type="button"
                onClick={next}
                className="font-mono text-[12px] uppercase tracking-wider text-gilt border-b border-gilt/40 hover:border-gilt-bright hover:text-gilt-bright transition-colors pb-1"
              >
                {index + 1 >= questions.length ? "Voir le score →" : "Question suivante →"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
