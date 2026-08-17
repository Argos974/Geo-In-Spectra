import { useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { moduleContent } from "@/content"
import { ContentBlocks } from "@/components/content/ContentBlocks"
import { GalleryFrame } from "@/components/gallery/GalleryFrame"
import type { ContentBlock } from "@/content/types"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V", "VI"]

/**
 * Mise en page dédiée à l'export PDF — pas la page web avec le chrome masqué :
 * une page de garde, un sommaire statique, puis le contenu. Rendue par
 * scripts/generate-course-pdfs.mjs, jamais visitée par un humain dans le
 * navigateur (aucun lien du site n'y mène).
 */
export function PrintCourse() {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)
  if (!module) return null

  const index = modules.findIndex((m) => m.slug === slug)
  const numeral = ROOM_NUMERALS[index] ?? String(index + 1)
  const blocks = moduleContent[module.slug] ?? []
  const art = artworks[module.slug]
  const headings = blocks.filter((b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading")

  return (
    <div className="bg-ink text-parchment font-body">
      {/* Page de garde */}
      <section className="print-cover min-h-screen flex flex-col justify-center items-center text-center px-16 py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-gilt mb-10">
          Geo-Ind-Spectra · Salle {numeral}
        </p>
        <h1 className="font-heading text-5xl mb-8 max-w-2xl">{module.title}</h1>
        <p className="font-body italic text-parchment-dim max-w-lg mb-12 leading-relaxed">{module.epigraph}</p>

        {art && (
          <GalleryFrame
            src={art.src}
            alt={art.alt}
            artist={art.artist}
            title={art.title}
            year={art.year}
            figure={numeral}
            className="max-w-sm mx-auto"
            priority
          />
        )}

        <p className="text-parchment-dim max-w-lg mt-12 leading-relaxed">{module.summary}</p>
      </section>

      {/* Sommaire */}
      {headings.length > 0 && (
        <section className="print-toc min-h-screen px-16 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gilt mb-8">Sommaire</p>
          <ol className="space-y-4">
            {headings.map((h) => (
              <li key={h.text} className="font-heading text-xl border-b border-gilt/15 pb-4">
                {h.text}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Contenu */}
      <section className="px-16 py-24 max-w-3xl mx-auto">
        <ContentBlocks blocks={blocks} />
      </section>
    </div>
  )
}
