import { useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { ficheContent } from "@/content/fiches"
import { ContentBlocks } from "@/components/content/ContentBlocks"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V", "VI"]

/**
 * Mise en page dédiée à la fiche mémo, l'essentiel d'une salle condensé sur
 * une page ou deux. Même principe que PrintCourse : rendue sur sa propre
 * route (/print/fiche/:slug), sans chrome web, uniquement pour l'export PDF.
 */
export function PrintFiche() {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)
  if (!module) return null

  const index = modules.findIndex((m) => m.slug === slug)
  const numeral = ROOM_NUMERALS[index] ?? String(index + 1)
  const blocks = ficheContent[module.slug] ?? []

  return (
    <div className="bg-ink text-parchment font-body px-16 py-20 max-w-3xl mx-auto">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gilt mb-4">
        Geo-Ind-Spectra · Fiche mémo · Salle {numeral}
      </p>
      <h1 className="font-heading text-3xl mb-2">{module.title}</h1>
      <p className="text-parchment-dim mb-10">{module.summary}</p>

      <ContentBlocks blocks={blocks} />
    </div>
  )
}
