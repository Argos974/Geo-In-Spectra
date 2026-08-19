import { Link } from "react-router-dom"
import { modules } from "@/data/modules"
import { moduleContent } from "@/content"
import type { ContentBlock } from "@/content/types"
import { slugify } from "@/lib/slug"
import { artworks } from "@/data/artworks"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"

type WarningCallout = Extract<ContentBlock, { type: "callout" }> & { tone: "warning" }

/**
 * Page dérivée du contenu existant, pas rédigée à la main : rassemble tous les
 * callouts "warning" ("À ne pas confondre", mises en garde...) déjà écrits
 * dans les 7 salles. Aucun risque de désynchronisation — un nouveau piège
 * ajouté à une salle apparaît ici automatiquement, sans rien dupliquer.
 */
export function PiegesPage() {
  const art = artworks["ressources-pieges"]
  const sections = modules.map((m) => {
    const blocks = moduleContent[m.slug] ?? []
    let lastHeading = ""
    const items: { heading: string; callout: WarningCallout }[] = []
    for (const b of blocks) {
      if (b.type === "heading") lastHeading = b.text
      if (b.type === "callout" && b.tone === "warning") {
        items.push({ heading: lastHeading, callout: b as WarningCallout })
      }
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
            <h1 className="font-heading text-4xl md:text-5xl">Pièges fréquents</h1>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
        <p className="text-parchment-dim text-lg mb-12 text-justify">
          Les {total} mises en garde du cours, rassemblées en un seul endroit : chaque "À ne pas confondre" et chaque
          avertissement déjà rencontrés salle par salle, pour une révision rapide avant un examen ou un rapport.
        </p>

        <div className="space-y-16">
          {sections.map(({ module, items }) => (
            <section key={module.slug}>
              <h2 className="font-heading text-2xl text-gilt mb-6 pb-3 border-b border-gilt/15">{module.navLabel}</h2>
              <div className="space-y-4">
                {items.map(({ heading, callout }, i) => (
                  <Link
                    key={i}
                    to={`/module/${module.slug}#${slugify(heading)}`}
                    className="block border border-oxblood/40 bg-oxblood/[0.08] p-5 hover:bg-oxblood/[0.12] transition-colors"
                  >
                    {heading && <p className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/80 mb-2">{heading}</p>}
                    <p className="font-heading text-lg mb-1 text-parchment">{callout.title}</p>
                    <p className="text-parchment-dim leading-relaxed text-justify">{callout.text}</p>
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
