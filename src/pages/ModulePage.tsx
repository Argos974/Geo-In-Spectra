import { Link, useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { moduleContent } from "@/content"
import { ContentBlocks } from "@/components/content/ContentBlocks"

export function ModulePage() {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)

  if (!module) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-space text-text-primary gap-4">
        <p className="font-mono text-text-secondary">Module introuvable.</p>
        <Link to="/" className="text-signal underline">Retour à l&apos;accueil</Link>
      </div>
    )
  }

  const index = modules.findIndex((m) => m.slug === slug)
  const blocks = moduleContent[module.slug]
  const prev = modules[index - 1]
  const next = modules[index + 1]

  return (
    <div className="min-h-screen bg-space text-text-primary px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-signal hover:underline">
          ← Modules
        </Link>
        <p className="font-mono text-[12px] text-signal mt-8">Module {String(index + 1).padStart(2, "0")}</p>
        <h1 className="font-heading text-4xl md:text-5xl font-semibold mt-3 mb-6">{module.title}</h1>
        <p className="text-text-secondary text-lg mb-12">{module.summary}</p>

        {blocks ? (
          <ContentBlocks blocks={blocks} />
        ) : (
          <div className="rounded-lg border border-dashed border-white/15 p-8 text-center text-text-secondary">
            <p className="font-mono text-sm">Contenu du module à venir.</p>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between font-mono text-[12px] uppercase tracking-wider">
          {prev ? (
            <Link to={`/module/${prev.slug}`} className="text-text-secondary hover:text-signal transition-colors">
              ← {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/module/${next.slug}`} className="text-signal hover:text-signal/80 transition-colors">
              {next.title} →
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  )
}
