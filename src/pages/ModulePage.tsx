import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { moduleContent } from "@/content"
import { quizzes } from "@/data/quizzes"
import { games } from "@/data/games"
import { ContentBlocks } from "@/components/content/ContentBlocks"
import { RoomIndex } from "@/components/content/RoomIndex"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { ALL_LEVELS, filterBlocksByLevel } from "@/lib/levelFilter"
import type { ContentLevel } from "@/content/types"
import { cn } from "@/lib/utils"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"]

const LEVEL_TOGGLE_LABEL: Record<ContentLevel, string> = {
  "college-lycee": "Collège / lycée",
  superieur: "Supérieur",
  approfondissement: "Approfondissement",
}

export function ModulePage() {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)
  const [activeLevels, setActiveLevels] = useState<Set<ContentLevel>>(new Set(ALL_LEVELS))

  const blocks = module ? moduleContent[module.slug] : undefined
  const filteredBlocks = useMemo(
    () => (blocks ? filterBlocksByLevel(blocks, activeLevels) : undefined),
    [blocks, activeLevels],
  )

  if (!module) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-parchment gap-4">
        <p className="font-mono text-parchment-dim">Salle introuvable.</p>
        <Link to="/" className="text-gilt underline">Retour à la galerie</Link>
      </div>
    )
  }

  function toggleLevel(level: ContentLevel) {
    setActiveLevels((prev) => {
      const next = new Set(prev)
      if (next.has(level)) {
        if (next.size === 1) return prev // toujours garder au moins un niveau actif
        next.delete(level)
      } else {
        next.add(level)
      }
      return next
    })
  }

  const index = modules.findIndex((m) => m.slug === slug)
  const art = artworks[module.slug]
  const prev = modules[index - 1]
  const next = modules[index + 1]
  const numeral = ROOM_NUMERALS[index] ?? String(index + 1)
  const order = String(index + 1).padStart(2, "0")
  const coursName = `${order}-${module.slug}-cours.pdf`
  const ficheName = `${order}-${module.slug}-fiche-memo.pdf`
  const hasQuiz = Boolean(quizzes[module.slug])
  const hasGame = Boolean(games[module.slug])

  return (
    <div className="print-page min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} figure={numeral} className="h-[70vh] min-h-[480px] w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-16 max-w-3xl">
            <Link to="/" className="print:hidden font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline w-fit mb-8">
              ← La galerie
            </Link>
            <p className="font-mono text-[12px] text-gilt mb-3">Salle {numeral}</p>
            <h1 className="font-heading text-4xl md:text-5xl mb-4">{module.title}</h1>
            <p className="font-body italic text-parchment-dim leading-relaxed border-l-2 border-gilt/30 pl-4">
              {module.epigraph}
            </p>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <p className="text-parchment-dim text-lg mb-6">{module.summary}</p>

        <div className="print:hidden flex flex-wrap items-center gap-3 mb-6">
          <a
            href={`/pdf/${module.slug}/${coursName}`}
            download={coursName}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-4 py-2 hover:bg-gilt/10 transition-colors"
          >
            ↓ Télécharger le cours (PDF)
          </a>
          <a
            href={`/pdf/${module.slug}/${ficheName}`}
            download={ficheName}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-lapis border border-lapis/40 px-4 py-2 hover:bg-lapis/10 transition-colors"
          >
            ↓ Télécharger la fiche mémo (PDF)
          </a>
          {hasQuiz && (
            <Link
              to={`/module/${module.slug}/quiz`}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-parchment-dim border border-gilt/15 px-4 py-2 hover:border-gilt/40 hover:text-gilt transition-colors"
            >
              Faire le quiz →
            </Link>
          )}
          {hasGame && (
            <Link
              to={`/jeu/${module.slug}`}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-oxblood border border-oxblood/40 px-4 py-2 hover:bg-oxblood/10 transition-colors"
            >
              Jouer →
            </Link>
          )}
        </div>

        <div className="print:hidden flex flex-wrap items-center gap-2 mb-10">
          <span className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/60 mr-1">Afficher :</span>
          {ALL_LEVELS.map((level) => {
            const active = activeLevels.has(level)
            return (
              <button
                key={level}
                type="button"
                onClick={() => toggleLevel(level)}
                aria-pressed={active}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors",
                  active ? "border-gilt/50 text-gilt bg-gilt/[0.06]" : "border-gilt/15 text-parchment-dim/50 hover:text-parchment-dim hover:border-gilt/30",
                )}
              >
                {LEVEL_TOGGLE_LABEL[level]}
              </button>
            )
          })}
        </div>

        {filteredBlocks && <RoomIndex blocks={filteredBlocks} />}

        {filteredBlocks ? (
          filteredBlocks.length > 0 ? (
            <ContentBlocks blocks={filteredBlocks} />
          ) : (
            <div className="border border-dashed border-gilt/25 p-8 text-center text-parchment-dim">
              <p className="font-mono text-sm">Aucun contenu à ce niveau — élargis le filtre ci-dessus.</p>
            </div>
          )
        ) : (
          <div className="border border-dashed border-gilt/25 p-8 text-center text-parchment-dim">
            <p className="font-mono text-sm">Contenu du module à venir.</p>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-gilt/15 flex items-center justify-between font-mono text-[12px] uppercase tracking-wider">
          {prev ? (
            <Link to={`/module/${prev.slug}`} className="text-parchment-dim hover:text-gilt transition-colors">
              ← {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/module/${next.slug}`} className="text-gilt hover:text-gilt-bright transition-colors">
              {next.title} →
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  )
}
