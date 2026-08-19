import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { modules } from "@/data/modules"
import { quizzes } from "@/data/quizzes"
import { getDueReviewQuestions, getReviewQueueSize, advanceReviewBox, resetReviewBox } from "@/lib/progress"
import { cn } from "@/lib/utils"

interface ReviewItem {
  slug: string
  moduleTitle: string
  questionIndex: number
}

/**
 * Révision espacée (Leitner à 5 boîtes) — ne montre que les cartes dues
 * maintenant (getDueReviewQuestions), tous modules confondus, plutôt qu'un
 * quiz complet par salle (QuizPage). Une bonne réponse ici monte la carte
 * d'une boîte et repousse son échéance (advanceReviewBox) au lieu de la
 * retirer directement — une carte n'est considérée maîtrisée qu'après avoir
 * dépassé la boîte 5, pas après un seul succès.
 */
export function RevisionPage() {
  const initialItems = useMemo<ReviewItem[]>(() => {
    const wrong = getDueReviewQuestions()
    const items: ReviewItem[] = []
    for (const [slug, indices] of Object.entries(wrong)) {
      const module = modules.find((m) => m.slug === slug)
      const questions = quizzes[slug]
      if (!module || !questions) continue
      for (const i of indices) {
        if (questions[i]) items.push({ slug, moduleTitle: module.title, questionIndex: i })
      }
    }
    return items
  }, [])

  const [items, setItems] = useState(initialItems)
  const [pos, setPos] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  const current = items[pos]
  const question = current ? quizzes[current.slug]?.[current.questionIndex] : undefined

  // Même raison qu'en QuizPage : ordre mélangé à chaque question pour ne pas
  // laisser la position devenir un repère mémorisable indépendant du contenu.
  const shuffled = useMemo(() => {
    if (!question) return null
    const order = question.choices.map((_, i) => i)
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[order[i], order[j]] = [order[j], order[i]]
    }
    return { choices: order.map((i) => question.choices[i]), correctIndex: order.indexOf(question.correctIndex) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, question])

  function choose(i: number) {
    if (selected !== null || !current || !question || !shuffled) return
    setSelected(i)
    if (i === shuffled.correctIndex) advanceReviewBox(current.slug, current.questionIndex)
    else resetReviewBox(current.slug, current.questionIndex)
  }

  function next() {
    setSelected(null)
    if (pos + 1 >= items.length) {
      setItems([])
      setPos(0)
      return
    }
    setPos((p) => p + 1)
  }

  if (!current || !question) {
    const queueSize = getReviewQueueSize()
    return (
      <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] text-gilt mb-3">Discipulus</p>
          <h1 className="font-heading text-3xl md:text-4xl mb-6">Réviser mes erreurs</h1>
          <p className="text-parchment-dim mb-8">
            {initialItems.length > 0
              ? "Série terminée : les questions retrouvées correctement viennent de monter d'une boîte et sortent de la file jusqu'à leur prochaine échéance."
              : queueSize === 0
                ? "Aucune carte en file — soit tu n'as encore fait aucun quiz, soit tout est déjà maîtrisé (boîte 5 dépassée)."
                : `Rien à revoir aujourd'hui : ${queueSize} carte${queueSize > 1 ? "s" : ""} en file, mais aucune n'est encore due (répétition espacée, l'échéance dépend de la boîte atteinte).`}
          </p>
          <Link to="/discipulus/progression" className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-4 py-2 hover:bg-gilt/10 transition-colors">
            ← Retour à Progression
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-2xl">
        <Link to="/discipulus/progression" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← Progression
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Révision · {current.moduleTitle}</p>
        <h1 className="font-heading text-3xl md:text-4xl mt-3 mb-2">Réviser mes erreurs</h1>
        <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-8">
          Question {pos + 1} / {items.length}
        </p>

        <p className="font-heading text-xl mb-6">{question.question}</p>

        <div className="space-y-3 mb-6">
          {(shuffled?.choices ?? question.choices).map((choice, i) => {
            const isCorrect = i === (shuffled?.correctIndex ?? question.correctIndex)
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
            onClick={next}
            className="font-mono text-[12px] uppercase tracking-wider text-gilt border-b border-gilt/40 hover:border-gilt-bright hover:text-gilt-bright transition-colors pb-1"
          >
            {pos + 1 >= items.length ? "Terminer →" : "Question suivante →"}
          </button>
        )}
      </div>
    </div>
  )
}
