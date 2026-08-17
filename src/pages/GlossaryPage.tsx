import { Link } from "react-router-dom"
import { glossary } from "@/data/glossary"
import { modules } from "@/data/modules"

function groupByLetter(terms: typeof glossary) {
  const groups = new Map<string, typeof glossary>()
  for (const t of [...terms].sort((a, b) => a.term.localeCompare(b.term, "fr"))) {
    const letter = t.term[0].toUpperCase()
    if (!groups.has(letter)) groups.set(letter, [])
    groups.get(letter)!.push(t)
  }
  return groups
}

export function GlossaryPage() {
  const groups = groupByLetter(glossary)

  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← La galerie
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Annexe</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">Glossaire</h1>
        <p className="text-parchment-dim text-lg mb-12">
          Tout terme technique employé dans la galerie, avec un renvoi vers la salle qui l'introduit.
        </p>

        <div className="space-y-10">
          {[...groups.entries()].map(([letter, terms]) => (
            <div key={letter}>
              <p className="font-heading text-2xl text-gilt mb-4">{letter}</p>
              <dl className="space-y-5">
                {terms.map((t) => {
                  const mod = modules.find((m) => m.slug === t.moduleSlug)
                  return (
                    <div key={t.term} className="border-l-2 border-gilt/20 pl-4">
                      <dt className="font-heading text-lg">{t.term}</dt>
                      <dd className="text-parchment-dim mt-1">{t.definition}</dd>
                      {mod && (
                        <Link
                          to={`/module/${mod.slug}`}
                          className="inline-block mt-2 font-mono text-[10.5px] uppercase tracking-wider text-gilt hover:text-gilt-bright transition-colors"
                        >
                          → {mod.title}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
