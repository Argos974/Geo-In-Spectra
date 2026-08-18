import { useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { moduleContent } from "@/content"
import { ContentBlocks } from "@/components/content/ContentBlocks"
import { GalleryFrame } from "@/components/gallery/GalleryFrame"
import { slugify } from "@/lib/slug"
import type { ContentBlock } from "@/content/types"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"]

/**
 * Mise en page dédiée à l'export PDF — pas la page web avec le chrome masqué :
 * une page de garde, un sommaire statique, puis le contenu. Rendue par
 * scripts/generate-course-pdfs.mjs, jamais visitée par un humain dans le
 * navigateur (aucun lien du site n'y mène). Thème papier clair, volontairement
 * différent du site (fond sombre) : un support de cours formel destiné à être
 * imprimé ou lu à l'écran comme un document, pas comme une page web.
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
    <div className="bg-[#f3ecdd] text-[#2b2116] font-body">
      {/* Page de garde */}
      <section className="print-cover min-h-screen flex flex-col justify-center items-center text-center px-16 py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#8a6a2f] mb-10">
          Geo-In-Spectra · Salle {numeral}
        </p>
        <h1 className="font-heading text-5xl mb-8 max-w-2xl">{module.title}</h1>
        <p className="font-body italic text-[#5c5140] max-w-lg mb-12 leading-relaxed text-justify">{module.epigraph}</p>

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
            variant="print"
          />
        )}

        <p className="text-[#5c5140] max-w-lg mt-12 leading-relaxed text-justify">{module.summary}</p>
      </section>

      {/* Sommaire — pas de min-h-screen ici : contrairement à la page de garde
          (page de titre volontairement spacieuse, un vrai choix de mise en
          page), un sommaire à peu d'entrées forcé sur une hauteur de
          viewport complète laisse une grande zone vide en bas de page sans
          raison. La page se referme sur son contenu réel, break-after:page
          garantit quand même qu'elle reste séparée du contenu qui suit. */}
      {headings.length > 0 && (
        <section className="print-toc px-16 pt-24 pb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#8a6a2f] mb-8">Sommaire</p>
          <ol className="space-y-4">
            {headings.map((h) => (
              <li key={h.text} className="border-b border-[#8a6a2f]/20 pb-4">
                <a href={`#${slugify(h.text)}`} className="font-heading text-xl text-[#2b2116] no-underline">
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Contenu */}
      <section className="px-16 py-24 max-w-3xl mx-auto">
        <ContentBlocks blocks={blocks} variant="print" />
      </section>
    </div>
  )
}
