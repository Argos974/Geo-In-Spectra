import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { ModuleChapterBody } from "@/components/content/ModuleChapterBody"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { openAndScrollTo } from "@/lib/lenisStore"
import { markVisited } from "@/lib/progress"

/** Détail de l'Atelier (12 séances, autonomes et corrigées) — le kit pédagogique pour enseigner, pas pour réviser. */
export function MagisterCoursPage() {
  const atelier = modules.find((m) => m.slug === "travaux-pratiques")
  const art = artworks["magister-cours"]
  const location = useLocation()

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (target) openAndScrollTo(target)
  }, [location.state])

  useEffect(() => {
    if (atelier) markVisited(atelier.slug)
  }, [atelier])

  if (!atelier) return null

  return (
    <div className="print-page min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} figure="IX" className="h-[70vh] min-h-[480px] w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-16 max-w-3xl">
            <Link to="/magister" className="print:hidden font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline w-fit mb-8">
              ← Magister
            </Link>
            <p className="font-mono text-[12px] text-gilt mb-3">Magister</p>
            <h1 className="font-heading text-4xl md:text-5xl mb-4">{atelier.title}</h1>
            <p className="font-body italic text-parchment-dim leading-relaxed text-justify border-l-2 border-gilt/30 pl-4">
              {atelier.epigraph}
            </p>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
        <ModuleChapterBody module={atelier} />
      </div>
    </div>
  )
}
