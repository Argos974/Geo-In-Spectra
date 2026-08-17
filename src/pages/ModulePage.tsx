import { Link, useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { moduleContent } from "@/content"
import { ContentBlocks } from "@/components/content/ContentBlocks"
import { RoomIndex } from "@/components/content/RoomIndex"
import { GalleryFrame } from "@/components/gallery/GalleryFrame"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V"]

export function ModulePage() {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)

  if (!module) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-parchment gap-4">
        <p className="font-mono text-parchment-dim">Salle introuvable.</p>
        <Link to="/" className="text-gilt underline">Retour à la galerie</Link>
      </div>
    )
  }

  const index = modules.findIndex((m) => m.slug === slug)
  const blocks = moduleContent[module.slug]
  const art = artworks[module.slug]
  const prev = modules[index - 1]
  const next = modules[index + 1]

  return (
    <div className="print-page min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="print:hidden font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← La galerie
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Salle {ROOM_NUMERALS[index] ?? index + 1}</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">{module.title}</h1>
        <p className="font-body italic text-parchment-dim mb-6 leading-relaxed border-l-2 border-gilt/30 pl-4">
          {module.epigraph}
        </p>
        <p className="text-parchment-dim text-lg mb-6">{module.summary}</p>

        <a
          href={`/pdf/${module.slug}/cours.pdf`}
          download
          className="print:hidden inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-4 py-2 mb-10 hover:bg-gilt/10 transition-colors"
        >
          ↓ Télécharger cette salle en PDF
        </a>

        {art && (
          <GalleryFrame
            src={art.src}
            alt={art.alt}
            artist={art.artist}
            title={art.title}
            year={art.year}
            figure={ROOM_NUMERALS[index] ?? String(index + 1)}
            className="mb-12 max-w-md"
            priority
          />
        )}

        {blocks && <RoomIndex blocks={blocks} />}

        {blocks ? (
          <ContentBlocks blocks={blocks} />
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
