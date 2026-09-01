import { useEffect } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { exercises } from "@/data/exercises"
import { ContentBlocks } from "@/components/content/ContentBlocks"
import type { ContentBlock, ContentLevel } from "@/content/types"
import { LEVEL_TOGGLE_LABEL } from "@/lib/levelFilter"
import { markExercisesVisited } from "@/lib/progress"
import { moduleTreeRoute, moduleTreeState } from "@/lib/moduleRoute"
import { usePageMeta } from "@/hooks/usePageMeta"

const VALID_LEVELS: ContentLevel[] = ["lycee", "superieur", "approfondissement"]

export function ExercisesPage() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const module = modules.find((m) => m.slug === slug)
  const set = slug ? exercises[slug] : undefined

  usePageMeta(
    module ? `Exercices — ${module.title}` : "Exercices introuvables",
    module ? `Exercices corrigés sur la salle « ${module.title} » : ${module.summary}` : undefined,
  )
  const requestedLevel = searchParams.get("level")
  const level = VALID_LEVELS.includes(requestedLevel as ContentLevel) ? (requestedLevel as ContentLevel) : undefined

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

  // Un exercice sans `level` (pas encore décliné par piste) reste visible quelle
  // que soit la piste demandée — jamais masqué faute d'avoir été retaggé, voir
  // data/exercises.ts::Exercise.level.
  const visibleExercises = level ? set.exercises.filter((ex) => !ex.level || ex.level === level) : set.exercises
  const hiddenCount = set.exercises.length - visibleExercises.length

  const blocks: ContentBlock[] = visibleExercises.flatMap((ex, i): ContentBlock[] => {
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
    if (ex.diagram) {
      parts.push({ type: "diagram", name: ex.diagram.name, caption: ex.diagram.caption })
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

        <p className="font-mono text-[12px] text-gilt mt-8">Exercices{level && ` — piste ${LEVEL_TOGGLE_LABEL[level]}`}</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">{set.title}</h1>
        <p className="text-parchment-dim text-lg mb-4 text-justify">{set.intro}</p>
        {level && hiddenCount > 0 && (
          <p className="font-mono text-[11px] text-parchment-dim/70 mb-10">
            {hiddenCount} exercice{hiddenCount > 1 ? "s" : ""} d'une autre piste masqué{hiddenCount > 1 ? "s" : ""} — change de piste dans la salle pour les voir.
          </p>
        )}
        {(!level || hiddenCount === 0) && <div className="mb-10" />}

        <ContentBlocks blocks={blocks} moduleSlug={module.slug} />
      </div>
    </div>
  )
}
