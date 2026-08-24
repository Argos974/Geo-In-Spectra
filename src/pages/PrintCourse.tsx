import { useParams, useSearchParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { games } from "@/data/games"
import { moduleContent } from "@/content"
import { ContentBlocks } from "@/components/content/ContentBlocks"
import { GalleryFrame } from "@/components/gallery/GalleryFrame"
import { slugify } from "@/lib/slug"
import { filterBlocksByLevel } from "@/lib/levelFilter"
import type { ContentBlock, ContentLevel } from "@/content/types"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"]

/**
 * L'Atelier (travaux-pratiques) n'est pas un module stratifié comme les autres
 * (un même contenu simplement enrichi par niveau) mais trois pistes indépendantes
 * de 12 séances chacune (Lycée / Licence-BUT / Master-Recherche, voir
 * ModuleChapterBody.tsx). Sans filtre, l'export PDF de "Cours" empilait les trois
 * à la suite : ~64 pages, un lycéen qui télécharge le PDF récupère aussi les
 * séances Master/Recherche. generate-course-pdfs.mjs appelle donc cette route
 * avec ?level=<niveau> pour cette seule salle, une fois par piste — jamais sans
 * ce paramètre pour les autres salles, où les niveaux cohabitent dans un même
 * récit et où le mélange est voulu.
 */
const TRACK_LABEL: Record<ContentLevel, string> = {
  lycee: "Piste Lycée",
  superieur: "Piste Licence/BUT",
  approfondissement: "Piste Master/Recherche",
}

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
  const [searchParams] = useSearchParams()
  const module = modules.find((m) => m.slug === slug)
  if (!module) return null

  const requestedLevel = searchParams.get("level")
  const track = requestedLevel && requestedLevel in TRACK_LABEL ? (requestedLevel as ContentLevel) : undefined

  const index = modules.findIndex((m) => m.slug === slug)
  const numeral = ROOM_NUMERALS[index] ?? String(index + 1)
  const rawBlocks = moduleContent[module.slug] ?? []
  const blocks = track ? filterBlocksByLevel(rawBlocks, new Set([track])) : rawBlocks
  const art = artworks[module.slug]
  // Couverture allégée (voir generate-print-covers.mjs) : affichée à max-w-sm, la
  // planche plein cadre (1920 px, calibrée pour ArtworkBackdrop côté web) n'apporte
  // rien de plus ici et alourdit chaque PDF de plusieurs centaines de Ko pour rien.
  const printCoverSrc = art?.src.replace("/images/gallery/", "/images/gallery-print/")
  const headings = blocks.filter((b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading")

  return (
    <div className="bg-[#f3ecdd] text-[#2b2116] font-body">
      {/* Page de garde */}
      <section className="print-cover min-h-screen flex flex-col justify-center items-center text-center px-16 py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#8a6a2f] mb-10">
          Geo-In-Spectra · Salle {numeral}
          {track && <> · {TRACK_LABEL[track]}</>}
        </p>
        <h1 className="font-heading text-5xl mb-8 max-w-2xl">{module.title}</h1>
        <p className="font-body italic text-[#5c5140] max-w-lg mb-12 leading-relaxed text-justify">{module.epigraph}</p>

        {art && printCoverSrc && (
          <GalleryFrame
            src={printCoverSrc}
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
        <ContentBlocks blocks={blocks} variant="print" game={games[module.slug]} />
      </section>
    </div>
  )
}
