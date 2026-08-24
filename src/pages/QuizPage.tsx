import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { quizzes } from "@/data/quizzes"
import { QuestionAnswerBlock } from "@/components/quiz/QuestionAnswerBlock"
import { recordQuizScore, recordWrongQuestion, clearWrongQuestion } from "@/lib/progress"
import { moduleTreeRoute, moduleTreeState } from "@/lib/moduleRoute"
import { cn } from "@/lib/utils"

export function QuizPage() {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)
  const questions = slug ? quizzes[slug] : undefined

  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  // Incrémenté à chaque "Recommencer" pour forcer un nouveau tirage même sur
  // la question 0 (voir QuestionAnswerBlock, remonté via sa clé).
  const [shuffleSeed, setShuffleSeed] = useState(0)

  if (!module || !questions) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-parchment gap-4">
        <p className="font-mono text-parchment-dim">Quiz introuvable.</p>
        <Link to="/discipulus" className="text-gilt underline">Retour à Discipulus</Link>
      </div>
    )
  }

  // Alias plutôt que `questions` réutilisé tel quel : TypeScript ne propage pas le
  // rétrécissement de type (non-`undefined`) fait plus haut à l'intérieur des fonctions
  // imbriquées ci-dessous, seul un nouveau `const` capturé après coup le préserve.
  const quizQuestions = questions
  const moduleSlug = module.slug
  const backTo = moduleTreeRoute(moduleSlug)
  const backState = moduleTreeState(moduleSlug, module.title)
  const q = quizQuestions[index]
  const isLast = index + 1 >= quizQuestions.length

  function handleAnswered(correct: boolean) {
    if (correct) {
      setScore((s) => s + 1)
      clearWrongQuestion(moduleSlug, index)
    } else {
      recordWrongQuestion(moduleSlug, index)
    }
  }

  function next() {
    if (isLast) {
      setDone(true)
      recordQuizScore(moduleSlug, score, quizQuestions.length)
      return
    }
    setIndex((n) => n + 1)
  }

  function restart() {
    setIndex(0)
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
            <div
              className="mb-6"
              role="progressbar"
              aria-valuenow={index + 1}
              aria-valuemin={1}
              aria-valuemax={questions.length}
              aria-label={`Question ${index + 1} sur ${questions.length}`}
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-2">
                Question {index + 1} / {questions.length}
              </p>
              <div className="flex gap-1" aria-hidden="true">
                {quizQuestions.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-[3px] flex-1 transition-colors",
                      i < index ? "bg-gilt" : i === index ? "bg-gilt/50" : "bg-gilt/15",
                    )}
                  />
                ))}
              </div>
            </div>
            <p className="font-heading text-xl mb-6">{q.question}</p>

            {/* Clé = (index, shuffleSeed) : remonte le bloc à chaque nouvelle question ou
                "Recommencer", pour que le tirage aléatoire des choix se fasse une seule fois
                à l'initialisation de l'instance (voir QuestionAnswerBlock). */}
            <QuestionAnswerBlock
              key={`${index}-${shuffleSeed}`}
              question={q}
              nextLabel={isLast ? "Voir le score →" : "Question suivante →"}
              onAnswered={handleAnswered}
              onNext={next}
            />
          </div>
        )}
      </div>
    </div>
  )
}
