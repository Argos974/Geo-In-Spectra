import { Link, useParams } from "react-router-dom"
import { modules } from "@/data/modules"

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

  return (
    <div className="min-h-screen bg-space text-text-primary px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-signal hover:underline">
          ← Modules
        </Link>
        <p className="font-mono text-[12px] text-signal mt-8">Module {String(index + 1).padStart(2, "0")}</p>
        <h1 className="font-heading text-4xl md:text-5xl font-semibold mt-3 mb-6">{module.title}</h1>
        <p className="text-text-secondary text-lg mb-12">{module.summary}</p>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-8 mb-8">
          <h2 className="font-heading text-xl font-semibold mb-4">Sommaire</h2>
          <ul className="space-y-3">
            {module.topics.map((topic) => (
              <li key={topic} className="flex items-center gap-3 text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-signal shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-dashed border-white/15 p-8 text-center text-text-secondary">
          <p className="font-mono text-sm">Contenu du module à venir.</p>
          <p className="text-xs mt-2 opacity-70">
            Texte, schémas, démos interactives et export PDF téléchargeable — à remplir.
          </p>
        </div>
      </div>
    </div>
  )
}
