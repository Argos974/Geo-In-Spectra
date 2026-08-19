import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { getDueReviewQuestions, getReviewQueueSize, advanceReviewBox, resetReviewBox } from "@/lib/progress"
import { resolveReviewSource } from "@/lib/reviewSource"
import { useActiveParcours } from "@/hooks/useActiveParcours"
import { PARCOURS, getParcoursModuleSlugs } from "@/data/parcours"
import { cn } from "@/lib/utils"

interface ReviewItem {
  slug: string
  sourceTitle: string
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
  const activeParcours = useActiveParcours()
  const parcoursMeta = activeParcours ? PARCOURS.find((p) => p.id === activeParcours.id) : undefined
  const parcoursSlugs = useMemo(() => (parcoursMeta ? getParcoursModuleSlugs(parcoursMeta.id) : null), [parcoursMeta])

  const allItems = useMemo<ReviewItem[]>(() => {
    const wrong = getDueReviewQuestions()
    const items: ReviewItem[] = []
    for (const [slug, indices] of Object.entries(wrong)) {
      const source = resolveReviewSource(slug)
      if (!source) continue
      for (const i of indices) {
        if (source.questions[i]) items.push({ slug, sourceTitle: source.title, questionIndex: i })
      }
    }
    return items
  }, [])

  // Mode express : limite la file au seul parcours actif — activé par défaut dès qu'un
  // parcours est en cours, désactivable pour revoir toutes les salles.
  const [expressMode, setExpressMode] = useState(() => Boolean(parcoursMeta))
  const items = useMemo(
    () => (expressMode && parcoursSlugs ? allItems.filter((it) => parcoursSlugs.has(it.slug)) : allItems),
    [expressMode, parcoursSlugs, allItems],
  )
  const [finished, setFinished] = useState(false)
  const [pos, setPos] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  function toggleExpressMode() {
    setExpressMode((v) => !v)
    setFinished(false)
    setPos(0)
    setSelected(null)
  }

  const current = items[pos]
  const question = current ? resolveReviewSource(current.slug)?.questions[current.questionIndex] : undefined

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
      setFinished(true)
      setPos(0)
      return
    }
    setPos((p) => p + 1)
  }

  if (!current || !question) {
    const queueSize = getReviewQueueSize()
    const filteredEmpty = !finished && expressMode && items.length === 0 && allItems.length > 0
    return (
      <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] text-gilt mb-3">Discipulus</p>
          <h1 className="font-heading text-3xl md:text-4xl mb-6">Réviser mes erreurs</h1>
          <p className="text-parchment-dim mb-8">
            {finished
              ? "Série terminée : les questions retrouvées correctement viennent de monter d'une boîte et sortent de la file jusqu'à leur prochaine échéance."
              : filteredEmpty
                ? `Rien à revoir dans "${parcoursMeta?.title}" pour l'instant, mais ${allItems.length} carte${allItems.length > 1 ? "s" : ""} due${allItems.length > 1 ? "s" : ""} ailleurs — désactive le mode express pour les voir.`
                : queueSize === 0
                  ? "Aucune carte en file — soit tu n'as encore fait aucun quiz, soit tout est déjà maîtrisé (boîte 5 dépassée)."
                  : `Rien à revoir aujourd'hui : ${queueSize} carte${queueSize > 1 ? "s" : ""} en file, mais aucune n'est encore due (répétition espacée, l'échéance dépend de la boîte atteinte).`}
          </p>
          {parcoursMeta && (
            <button
              type="button"
              onClick={toggleExpressMode}
              className={cn(
                "font-mono text-[11px] uppercase tracking-wider border px-4 py-2 transition-colors mb-4 mr-3",
                expressMode ? "border-gilt bg-gilt/10 text-gilt" : "border-gilt/30 text-parchment-dim hover:text-gilt hover:border-gilt/50",
              )}
            >
              Mode express · {parcoursMeta.title} {expressMode ? "(actif)" : ""}
            </button>
          )}
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

        <div className="flex items-center justify-between gap-4 flex-wrap mt-8">
          <p className="font-mono text-[12px] text-gilt">Révision · {current.sourceTitle}</p>
          {parcoursMeta && (
            <button
              type="button"
              onClick={toggleExpressMode}
              className={cn(
                "font-mono text-[10px] uppercase tracking-wider border px-3 py-1 transition-colors",
                expressMode ? "border-gilt bg-gilt/10 text-gilt" : "border-gilt/30 text-parchment-dim/70 hover:text-gilt hover:border-gilt/50",
              )}
            >
              Express · {parcoursMeta.title}
            </button>
          )}
        </div>
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
