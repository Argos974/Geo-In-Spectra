import { Link } from "react-router-dom"
import { PARCOURS } from "@/data/parcours"
import { artworks } from "@/data/artworks"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { ChapterAccordion } from "@/components/content/ChapterAccordion"
import { ChapterNav } from "@/components/content/ChapterNav"
import { atelierSeances } from "@/data/atelierSeances"
import { moduleContent } from "@/content"
import type { ContentLevel } from "@/content/types"
import { slugify } from "@/lib/slug"

const LEVEL_LABEL: Record<ContentLevel, string> = {
  lycee: "Lycée",
  superieur: "Supérieur",
  approfondissement: "Approfondissement",
}

const SECTIONS = [
  "Progression de base",
  "Vue d'ensemble des séances",
  "Variantes selon l'objectif visé",
  "Évaluation associée",
]

const EVAL_GRIDS = ["Scolaire", "Concours", "Professionnel", "Recherche"]

interface SeanceMeta {
  level?: ContentLevel
  devoirFormat?: string
  devoirTitle?: string
}

/**
 * Niveau et rendu attendu de chaque séance, dérivés du contenu réel de l'Atelier
 * (travaux-pratiques.ts) plutôt que ressaisis à la main — même logique que
 * PiegesPage : aucun risque de désynchronisation si une séance change côté source.
 */
function buildSeanceMeta(): Map<string, SeanceMeta> {
  const blocks = moduleContent["travaux-pratiques"] ?? []
  const map = new Map<string, SeanceMeta>()
  let current: string | null = null
  for (const b of blocks) {
    if (b.type === "heading" && /^(Séance|Bonus séance) /.test(b.text)) {
      current = b.text
      map.set(current, { level: b.level })
    } else if (b.type === "devoir" && current) {
      const meta = map.get(current)
      if (meta) {
        meta.devoirFormat = b.format
        meta.devoirTitle = b.title
      }
    }
  }
  return map
}

export function ProgrammePage() {
  const base = PARCOURS.find((p) => p.id === "licence-but-sig")
  const autres = PARCOURS.filter((p) => p.id !== "licence-but-sig")
  const art = artworks["magister-programme"]
  const seanceMeta = buildSeanceMeta()

  return (
    <div className="min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} figure="X" className="h-[70vh] min-h-[480px] w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-16 max-w-3xl">
            <Link to="/magister" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline w-fit mb-8">
              ← Magister
            </Link>
            <p className="font-mono text-[12px] text-gilt mb-3">Magister</p>
            <h1 className="font-heading text-4xl md:text-5xl mb-4">Programme</h1>
            <p className="font-body italic text-parchment-dim leading-relaxed text-justify border-l-2 border-gilt/30 pl-4">
              Une progression reliant Cours, Méthodes et Atelier en séquence enseignable. À la différence des
              parcours élève (guides de lecture), ceci est pensé comme trame de cours, à adapter au calendrier réel.
            </p>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
          <ChapterNav titles={SECTIONS} />

          <ChapterAccordion name="programme-sections" title={SECTIONS[0]} defaultOpen>
            {base && (
              <div className="border border-gilt/20 p-6 mb-6 bg-canvas">
                <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-2">Progression de base</p>
                <p className="font-heading text-2xl mb-4">{base.title}</p>
                <ol className="space-y-3">
                  {base.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-mono text-xs text-gilt/60 shrink-0 mt-1">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-parchment-dim leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <p className="text-parchment-dim/80 text-sm text-justify border-l-2 border-gilt/20 pl-4">
              Cette trame nomme 7 des 12 séances de l'Atelier (2, 3, 4, 5, 6, 7, 9) : les séances 1, 8, 10, 11 et 12
              (dont trois ajoutées depuis à l'Atelier) se rattachent naturellement selon le temps disponible. Voir
              la vue d'ensemble ci-dessous pour les intégrer.
            </p>
          </ChapterAccordion>

          <ChapterAccordion
            name="programme-sections"
            title={SECTIONS[1]}
            subtitle={`Les ${atelierSeances.length} séances de l'Atelier, avec leur niveau et le rendu attendu, dérivé du contenu réel et jamais ressaisi à la main.`}
          >
            <div className="overflow-x-auto border border-gilt/20 bg-canvas">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink/40">
                    <th className="text-left font-mono text-[11px] uppercase tracking-wider px-4 py-3 text-gilt">Séance</th>
                    <th className="text-left font-mono text-[11px] uppercase tracking-wider px-4 py-3 text-gilt whitespace-nowrap">Niveau</th>
                    <th className="text-left font-mono text-[11px] uppercase tracking-wider px-4 py-3 text-gilt">Salle(s) de référence</th>
                    <th className="text-left font-mono text-[11px] uppercase tracking-wider px-4 py-3 text-gilt">Rendu attendu</th>
                  </tr>
                </thead>
                <tbody>
                  {atelierSeances.map((s) => {
                    const meta = seanceMeta.get(s.heading)
                    return (
                      <tr key={s.heading} className="border-t border-gilt/10">
                        <td className="px-4 py-3 align-top">
                          <Link
                            to="/magister/cours"
                            state={{ scrollTo: slugify(s.heading) }}
                            className="text-parchment hover:text-gilt transition-colors"
                          >
                            {s.heading}
                          </Link>
                        </td>
                        <td className="px-4 py-3 align-top text-parchment-dim whitespace-nowrap">
                          {meta?.level ? LEVEL_LABEL[meta.level] : "–"}
                        </td>
                        <td className="px-4 py-3 align-top text-parchment-dim">
                          {s.salles.map((salle) => salle.label).join(" · ")}
                        </td>
                        <td className="px-4 py-3 align-top text-parchment-dim">
                          {meta?.devoirFormat ? (
                            <>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-lapis-bright">{meta.devoirFormat}</span>
                              <br />
                              {meta.devoirTitle}
                            </>
                          ) : (
                            "–"
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </ChapterAccordion>

          <ChapterAccordion name="programme-sections" title={SECTIONS[2]}>
            <div className="space-y-4">
              {autres.map((p) => (
                <div key={p.id} className="border border-gilt/15 p-5">
                  <p className="font-heading text-lg mb-1">{p.title}</p>
                  <p className="text-parchment-dim text-sm mb-3">{p.audience}</p>
                  <p className="text-parchment-dim text-sm leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </ChapterAccordion>

          <ChapterAccordion name="programme-sections" title={SECTIONS[3]}>
            <p className="text-parchment-dim leading-relaxed text-justify mb-6">
              Chaque rendu du tableau ci-dessus se note avec l'une des quatre grilles de correction de la page
              Évaluation, selon la finalité de la séance (scolaire, concours, professionnel ou recherche) : un
              rapport de mini-projet (séance 9) et une note d'analyse statistique (séance 12) ne s'évaluent pas avec
              les mêmes critères qu'un commentaire de document (séance 1 ou 10).
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {EVAL_GRIDS.map((title) => (
                <Link
                  key={title}
                  to="/magister/evaluation"
                  state={{ scrollTo: slugify(title) }}
                  className="block border border-gilt/20 p-5 hover:border-gilt/50 hover:bg-gilt/[0.04] transition-colors"
                >
                  <p className="font-heading text-lg mb-1">Grille {title} →</p>
                  <p className="text-parchment-dim text-sm leading-relaxed">
                    Compétences évaluées, attentes par niveau, exercice type et sujet blanc.
                  </p>
                </Link>
              ))}
            </div>
          </ChapterAccordion>
        </div>
      </div>
    </div>
  )
}
