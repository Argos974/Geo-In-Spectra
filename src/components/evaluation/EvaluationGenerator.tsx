import { useState } from "react"
import { modules } from "@/data/modules"
import { quizzes } from "@/data/quizzes"
import type { QuizQuestion } from "@/data/quizzes/types"
import { cn } from "@/lib/utils"

interface Sujet {
  moduleTitle: string
  questions: QuizQuestion[]
  generatedAt: string
}

const EVALUABLE_MODULES = modules.filter((m) => (quizzes[m.slug]?.length ?? 0) > 0)

/**
 * Générateur de sujet à choix multiples : tire N questions au hasard dans la banque déjà
 * utilisée par le quiz interactif de chaque salle (src/data/quizzes) — pas de contenu
 * dupliqué, un jeu de questions différent à chaque tirage. Export imprimable via
 * window.print() (voir print:hidden sur SiteHeader/SiteFooter/CanvasGrain/ActiveParcoursBar
 * et sur le reste de cette page) plutôt qu'un nouveau PDF Playwright — plus léger pour un
 * sujet composé à la volée, propre à chaque enseignant.
 */
export function EvaluationGenerator() {
  const [slug, setSlug] = useState(EVALUABLE_MODULES[0]?.slug ?? "")
  const available = quizzes[slug]?.length ?? 0
  const [count, setCount] = useState(Math.min(8, available))
  const [showAnswers, setShowAnswers] = useState(false)
  const [sujet, setSujet] = useState<Sujet | null>(null)

  function handleSlugChange(next: string) {
    const nextAvailable = quizzes[next]?.length ?? 0
    setSlug(next)
    setCount(Math.min(8, nextAvailable))
    setSujet(null)
  }

  function generate() {
    const module = modules.find((m) => m.slug === slug)
    const bank = quizzes[slug] ?? []
    if (!module || bank.length === 0) return
    setSujet({
      moduleTitle: module.title,
      questions: pickRandom(bank, count),
      generatedAt: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }),
    })
  }

  return (
    <div className="mb-16">
      <div className="print:hidden border border-lapis/30 bg-lapis/[0.05] p-6 mb-8">
        <p className="font-mono text-[11px] uppercase tracking-wider text-lapis-bright mb-2">Outil</p>
        <h2 className="font-heading text-2xl mb-2">Générateur de sujet</h2>
        <p className="text-parchment-dim text-sm leading-relaxed mb-6 max-w-2xl">
          Tire un sujet à choix multiples dans la banque de questions déjà utilisée par le quiz interactif de chaque
          salle — un jeu de questions différent à chaque tirage, imprimable avec ou sans corrigé.
        </p>

        <div className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/80">Salle</span>
            <select
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              className="bg-canvas border border-gilt/30 px-3 py-2 text-sm text-parchment min-w-[240px]"
            >
              {EVALUABLE_MODULES.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.navLabel} — {quizzes[m.slug].length} questions
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/80">Nombre de questions</span>
            <input
              type="number"
              min={1}
              max={available}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(available, Number(e.target.value) || 1)))}
              className="bg-canvas border border-gilt/30 px-3 py-2 text-sm text-parchment w-24"
            />
          </label>

          <label className="flex items-center gap-2 pb-2.5 cursor-pointer">
            <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} className="accent-gilt" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim">Afficher le corrigé</span>
          </label>

          <button
            type="button"
            onClick={generate}
            className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/40 px-4 py-2.5 hover:bg-gilt/10 transition-colors"
          >
            Tirer un sujet →
          </button>

          {sujet && (
            <button
              type="button"
              onClick={() => window.print()}
              className="font-mono text-[11px] uppercase tracking-wider text-lapis-bright border border-lapis/40 px-4 py-2.5 hover:bg-lapis/10 transition-colors"
            >
              ↓ Imprimer / PDF
            </button>
          )}
        </div>
      </div>

      {sujet && (
        <div className="bg-parchment text-ink-deep p-8 md:p-12">
          <div className="flex items-start justify-between gap-6 border-b-2 border-ink-deep/20 pb-4 mb-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-deep/60 mb-1">
                Geo-In-Spectra · {showAnswers ? "Corrigé" : "Sujet"}
              </p>
              <h3 className="font-heading text-2xl">{sujet.moduleTitle}</h3>
            </div>
            <div className="text-right font-mono text-[11px] text-ink-deep/60 shrink-0">
              <p>{sujet.generatedAt}</p>
              <p>{sujet.questions.length} questions</p>
            </div>
          </div>

          <ol className="space-y-8">
            {sujet.questions.map((q, i) => (
              <li key={i}>
                <p className="font-body font-semibold mb-3">
                  {i + 1}. {q.question}
                </p>
                <ul className="space-y-1.5 pl-1">
                  {q.choices.map((choice, ci) => (
                    <li key={ci} className={cn("flex items-start gap-2 text-sm", showAnswers && ci === q.correctIndex && "font-semibold")}>
                      <span className="font-mono text-ink-deep/50">{String.fromCharCode(65 + ci)}.</span>
                      <span>{choice}</span>
                      {showAnswers && ci === q.correctIndex && <span className="text-lapis-bright">✓</span>}
                    </li>
                  ))}
                </ul>
                {showAnswers && <p className="mt-2 text-sm text-ink-deep/70 italic border-l-2 border-ink-deep/20 pl-3">{q.explanation}</p>}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function pickRandom<T>(source: T[], n: number): T[] {
  const pool = [...source]
  const picked: T[] = []
  const count = Math.min(n, pool.length)
  for (let i = 0; i < count; i++) {
    const j = Math.floor(Math.random() * pool.length)
    picked.push(pool.splice(j, 1)[0])
  }
  return picked
}
