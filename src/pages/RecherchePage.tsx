import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { buildSearchIndex, searchEntries, type SearchEntry } from "@/lib/searchIndex"
import { setPendingSectionLevel } from "@/lib/pendingSectionLevel"
import { cn } from "@/lib/utils"
import { usePageMeta } from "@/hooks/usePageMeta"

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
  usePageMeta("Recherche", "Recherche dans le contenu du site : cours, glossaire, ressources, jeux et quiz.")
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const index = useMemo(() => buildSearchIndex(), [])
  const results = useMemo(() => searchEntries(index, query), [index, query])

  function go(entry: SearchEntry) {
    // Bascule la piste AVANT de naviguer : ModuleChapterBody la consomme dans
    // un effet au montage (voir lib/pendingSectionLevel.ts), et openAndScrollTo
    // réessaie sur quelques frames le temps que ce re-rendu ait lieu.
    if (entry.moduleSlug && entry.level) setPendingSectionLevel(entry.moduleSlug, entry.level)
    navigate(entry.to, entry.scrollTo ? { state: { scrollTo: entry.scrollTo } } : undefined)
  }

  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-[13px] text-gilt mb-3">Discipulus · Magister</p>
        <h1 className="font-heading text-4xl md:text-5xl mb-6">Recherche</h1>

        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Terme, notion, titre de section…"
          aria-label="Rechercher sur le site"
          className="w-full bg-transparent border border-gilt/30 px-4 py-3 text-lg text-parchment placeholder:text-parchment-dim/50 focus:border-gilt/60 mb-8"
        />

        {/* Région permanente (jamais démontée) pour que le changement de texte soit
            fiablement annoncé par un lecteur d'écran à chaque frappe — un <p>
            aria-live qui n'existerait que le temps d'une requête non vide ne
            garantit pas la même annonce à sa toute première apparition. */}
        <p aria-live="polite" className="sr-only">
          {query.trim() ? `${results.length} résultat${results.length !== 1 ? "s" : ""}` : ""}
        </p>
        {query.trim() && (
          <p aria-hidden="true" className="font-mono text-[12px] uppercase tracking-wider text-parchment-dim/80 mb-4">
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
                  "shrink-0 mt-0.5 font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 border border-gilt/25 text-gilt/80",
                )}
              >
                {GROUP_LABEL[r.group]}
              </span>
              <span className="min-w-0">
                <span className="block text-parchment truncate" title={r.label}>{r.label}</span>
                {r.context && <span className="block text-parchment-dim text-sm truncate" title={r.context}>{r.context}</span>}
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
