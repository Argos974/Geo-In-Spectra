import { useMemo, useState } from "react"
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
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return glossary
    return glossary.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q),
    )
  }, [query])

  const groups = groupByLetter(filtered)

  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← La galerie
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Annexe</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">Glossaire</h1>
        <p className="text-parchment-dim text-lg mb-6">
          Tout terme technique employé dans la galerie, avec un renvoi vers la salle qui l'introduit.
        </p>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un terme…"
          className="w-full bg-white/[0.02] border border-gilt/25 px-4 py-3 mb-12 font-body text-parchment placeholder:text-parchment-dim/50 focus:outline-none focus:border-gilt/60 transition-colors"
        />

        {filtered.length === 0 ? (
          <p className="text-parchment-dim font-mono text-sm">Aucun terme ne correspond à « {query} ».</p>
        ) : (
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
                        <dd className="font-mono text-[10.5px] text-parchment-dim/80 mt-1.5">{t.source}</dd>
                        {mod && (
                          <dd className="mt-2">
                            <Link
                              to={`/module/${mod.slug}`}
                              className="inline-block font-mono text-[10.5px] uppercase tracking-wider text-gilt hover:text-gilt-bright transition-colors"
                            >
                              → {mod.title}
                            </Link>
                          </dd>
                        )}
                      </div>
                    )
                  })}
                </dl>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
