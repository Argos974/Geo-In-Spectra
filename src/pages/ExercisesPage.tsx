import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { exercises } from "@/data/exercises"
import { ContentBlocks } from "@/components/content/ContentBlocks"
import type { ContentBlock } from "@/content/types"
import { markExercisesVisited } from "@/lib/progress"
import { moduleTreeRoute, moduleTreeState } from "@/lib/moduleRoute"

export function ExercisesPage() {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)
  const set = slug ? exercises[slug] : undefined

  useEffect(() => {
    if (module && set) markExercisesVisited(module.slug)
  }, [module, set])

  if (!module || !set) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-parchment gap-4">
        <p className="font-mono text-parchment-dim">Exercices introuvables.</p>
        <Link to="/discipulus" className="text-gilt underline">Retour à Discipulus</Link>
      </div>
    )
  }

  const blocks: ContentBlock[] = set.exercises.flatMap((ex, i): ContentBlock[] => {
    const parts: ContentBlock[] = [
      { type: "heading", text: `Exercice ${i + 1}` },
      { type: "paragraph", text: ex.prompt },
    ]
    if (ex.formula) {
      parts.push({ type: "formula", label: ex.formula.label, formula: ex.formula.formula, note: ex.formula.note })
    }
    if (ex.dataset) {
      parts.push({ type: "table", headers: ex.dataset.headers, rows: ex.dataset.rows })
    }
    parts.push({ type: "solution", title: `Exercice ${i + 1}`, text: ex.solutionText, items: ex.solutionItems })
    return parts
  })

  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <Link
          to={moduleTreeRoute(module.slug)}
          state={moduleTreeState(module.slug, module.title)}
          className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline"
        >
          ← {module.title}
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Exercices</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">{set.title}</h1>
        <p className="text-parchment-dim text-lg mb-10 text-justify">{set.intro}</p>

        <ContentBlocks blocks={blocks} moduleSlug={module.slug} />
      </div>
    </div>
  )
}
