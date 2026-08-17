import { Link, useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { moduleContent } from "@/content"
import { ContentBlocks } from "@/components/content/ContentBlocks"
import { GalleryFrame } from "@/components/gallery/GalleryFrame"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V"]

export function ModulePage() {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)

  if (!module) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-vellum text-vellum-ink gap-4">
        <p className="font-mono text-vellum-dim">Salle introuvable.</p>
        <Link to="/" className="text-gilt-ink underline">Retour à la galerie</Link>
      </div>
    )
  }

  const index = modules.findIndex((m) => m.slug === slug)
  const blocks = moduleContent[module.slug]
  const art = artworks[module.slug]
  const prev = modules[index - 1]
  const next = modules[index + 1]

  return (
    <div className="min-h-screen bg-vellum text-vellum-ink px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-gilt-ink hover:underline">
          ← La galerie
        </Link>

        <p className="font-mono text-[12px] text-gilt-ink mt-8">Salle {ROOM_NUMERALS[index] ?? index + 1}</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-6">{module.title}</h1>
        <p className="text-vellum-dim text-lg mb-10">{module.summary}</p>

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
            variant="light"
          />
        )}

        {blocks ? (
          <ContentBlocks blocks={blocks} />
        ) : (
          <div className="border border-dashed border-gilt-ink/30 p-8 text-center text-vellum-dim">
            <p className="font-mono text-sm">Contenu du module à venir.</p>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-gilt-ink/20 flex items-center justify-between font-mono text-[12px] uppercase tracking-wider">
          {prev ? (
            <Link to={`/module/${prev.slug}`} className="text-vellum-dim hover:text-gilt-ink transition-colors">
              ← {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/module/${next.slug}`} className="text-gilt-ink hover:text-oxblood transition-colors">
              {next.title} →
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  )
}
