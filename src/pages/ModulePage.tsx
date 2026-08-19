import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { ModuleChapterBody } from "@/components/content/ModuleChapterBody"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { markVisited } from "@/lib/progress"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"]

/**
 * Lien profond / vue autonome d'un module (imprimée, partagée, indexée) — le
 * chemin de navigation normal passe désormais par Discipulus → Cours (chapitres
 * repliables sur une seule page, voir DiscipulusCoursPage) ou Magister → Cours
 * pour l'Atelier, qui réutilisent le même ModuleChapterBody. Cette route reste
 * intacte pour ne casser aucun lien existant (parcours, renvois croisés, PDF).
 */
export function ModulePage() {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)

  useEffect(() => {
    if (module) markVisited(module.slug)
  }, [module])

  if (!module) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-parchment gap-4">
        <p className="font-mono text-parchment-dim">Salle introuvable.</p>
        <Link to="/" className="text-gilt underline">Retour à la galerie</Link>
      </div>
    )
  }

  const index = modules.findIndex((m) => m.slug === slug)
  const art = artworks[module.slug]
  const prev = modules[index - 1]
  const next = modules[index + 1]
  const numeral = ROOM_NUMERALS[index] ?? String(index + 1)

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
            <p className="font-body italic text-parchment-dim leading-relaxed text-justify border-l-2 border-gilt/30 pl-4">
              {module.epigraph}
            </p>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
        <ModuleChapterBody module={module} />

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
