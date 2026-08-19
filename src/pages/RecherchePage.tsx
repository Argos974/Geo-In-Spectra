import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { buildSearchIndex, searchEntries, type SearchEntry } from "@/lib/searchIndex"
import { cn } from "@/lib/utils"

const GROUP_LABEL: Record<SearchEntry["group"], string> = {
  Chapitre: "Cours",
  Section: "Section",
  Glossaire: "Glossaire",
  Jeu: "Jeu",
  Page: "Page",
  Quiz: "Quiz",
  Exercice: "Exercice",
}

/** Mutualisé — recherche texte simple sur tout le contenu indexé (voir lib/searchIndex.ts). */
export function RecherchePage() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const index = useMemo(() => buildSearchIndex(), [])
  const results = useMemo(() => searchEntries(index, query), [index, query])

  function go(entry: SearchEntry) {
    navigate(entry.to, entry.scrollTo ? { state: { scrollTo: entry.scrollTo } } : undefined)
  }

  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-[12px] text-gilt mb-3">Discipulus · Magister</p>
        <h1 className="font-heading text-4xl md:text-5xl mb-6">Recherche</h1>

        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Terme, notion, titre de section…"
          className="w-full bg-transparent border border-gilt/30 px-4 py-3 text-lg text-parchment placeholder:text-parchment-dim/50 focus:outline-none focus:border-gilt/60 mb-8"
        />

        {query.trim() && (
          <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/60 mb-4">
            {results.length} résultat{results.length !== 1 ? "s" : ""}
          </p>
        )}

        <div className="space-y-1">
          {results.map((r, i) => (
            <button
              key={`${r.to}-${r.label}-${i}`}
              type="button"
              onClick={() => go(r)}
              className="w-full text-left flex items-start gap-3 px-4 py-3 border border-transparent hover:border-gilt/20 hover:bg-gilt/[0.04] transition-colors"
            >
              <span
                className={cn(
                  "shrink-0 mt-0.5 font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-gilt/25 text-gilt/80",
                )}
              >
                {GROUP_LABEL[r.group]}
              </span>
              <span className="min-w-0">
                <span className="block text-parchment truncate">{r.label}</span>
                {r.context && <span className="block text-parchment-dim text-sm truncate">{r.context}</span>}
              </span>
            </button>
          ))}
        </div>

        {query.trim() && results.length === 0 && (
          <p className="text-parchment-dim text-sm">Rien ne correspond à « {query} ».</p>
        )}
      </div>
    </div>
  )
}
