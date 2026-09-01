import { Link } from "react-router-dom"
import { modules } from "@/data/modules"
import { moduleContent } from "@/content"
import type { ContentBlock, ContentLevel } from "@/content/types"
import { slugify } from "@/lib/slug"
import { artworks } from "@/data/artworks"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { moduleTreeRoute } from "@/lib/moduleRoute"
import { setPendingSectionLevel } from "@/lib/pendingSectionLevel"
import { LEVEL_TOGGLE_LABEL } from "@/lib/levelFilter"
import { usePageMeta } from "@/hooks/usePageMeta"

type FormulaBlock = Extract<ContentBlock, { type: "formula" }>

/**
 * Comme PiegesPage : dérivée du contenu existant, pas rédigée à la main.
 * Rassemble toutes les formules déjà écrites dans les salles — le
 * "formulaire" qu'on voudrait avoir sous la main avant un examen, toujours
 * synchronisé avec le cours puisqu'il n'existe pas de copie séparée à jour.
 *
 * Depuis le passage des salles de Cours à 3 pistes indépendantes, une même
 * formule réapparaît souvent telle quelle dans 2 pistes (ex. Lycée et
 * Licence/BUT) : plutôt que de la lister deux fois sans distinction — ce qui
 * lirait comme un bug —, chaque entrée porte désormais son étiquette de piste
 * (`level`, hérité du dernier titre, jamais lue plus haut jusqu'ici) et le
 * clic bascule explicitement sur cette piste avant de faire défiler jusqu'à
 * elle (voir lib/pendingSectionLevel.ts) — sinon la section resterait filtrée
 * par la piste par défaut et le scroll échouerait silencieusement.
 */
export function FormulairePage() {
  usePageMeta(
    "Formulaire",
    "Toutes les formules du cours rassemblées en un seul endroit, dérivées automatiquement du contenu des salles.",
  )
  const art = artworks["ressources-formulaire"]
  const sections = modules.map((m) => {
    const blocks = moduleContent[m.slug] ?? []
    let lastHeading = ""
    let lastLevel: ContentLevel | undefined
    const items: { heading: string; level: ContentLevel | undefined; formula: FormulaBlock }[] = []
    for (const b of blocks) {
      if (b.type === "heading") {
        lastHeading = b.text
        lastLevel = b.level
      }
      if (b.type === "formula") items.push({ heading: lastHeading, level: lastLevel, formula: b })
    }
    return { module: m, items }
  }).filter((s) => s.items.length > 0)

  const total = sections.reduce((n, s) => n + s.items.length, 0)

  return (
    <div className="min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} className="h-64 md:h-80 w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-10 max-w-3xl">
            <Link to="/ressources" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline w-fit mb-4">
              ← Ressources
            </Link>
            <p className="font-mono text-[12px] text-gilt mb-3">Ressources</p>
            <h1 className="font-heading text-4xl md:text-5xl">Formulaire</h1>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
        <p className="text-parchment-dim text-lg mb-12 text-justify">
          Les {total} formules du cours, réunies en un seul endroit, sans les explications qui les accompagnent
          dans chaque salle, pour une révision rapide plutôt qu'une relecture complète.
        </p>

        <div className="space-y-16">
          {sections.map(({ module, items }) => (
            <section key={module.slug}>
              <h2 className="font-heading text-2xl text-gilt mb-6 pb-3 border-b border-gilt/15">{module.navLabel}</h2>
              <div className="space-y-3">
                {items.map(({ heading, level, formula }, i) => (
                  <Link
                    key={i}
                    to={moduleTreeRoute(module.slug)}
                    state={{ scrollTo: slugify(heading) }}
                    onClick={() => {
                      if (level) setPendingSectionLevel(module.slug, level)
                    }}
                    className="block border border-gilt/25 bg-gilt/[0.04] p-5 hover:bg-gilt/10 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-gilt">{formula.label}</p>
                      {level && (
                        <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-gilt/25 text-parchment-dim/80">
                          {LEVEL_TOGGLE_LABEL[level]}
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-sm md:text-base text-parchment break-words">{formula.formula}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}
