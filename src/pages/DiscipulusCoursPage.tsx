import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { ModuleChapterBody } from "@/components/content/ModuleChapterBody"
import { ChapterAccordion } from "@/components/content/ChapterAccordion"
import { ChapterNav } from "@/components/content/ChapterNav"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { openAndScrollTo } from "@/lib/lenisStore"
import { getProgress, markVisited } from "@/lib/progress"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V"]

/** Les 5 salles de savoir (hors La Méthode et l'Atelier, déménagées ailleurs) en chapitres repliables d'une seule page. */
const COURS_SLUGS = ["fondamentaux", "teledetection", "indices-spectraux", "outils-sig", "traitements-ia"]

export function DiscipulusCoursPage() {
  const courseModules = COURS_SLUGS.map((slug) => modules.find((m) => m.slug === slug)).filter((m) => m !== undefined)
  const art = artworks["discipulus-cours"]
  const location = useLocation()
  const [visitedSlugs, setVisitedSlugs] = useState<Set<string>>(() => {
    const progress = getProgress()
    return new Set(courseModules.filter((m) => progress[m.slug]?.visited).map((m) => m.slug))
  })

  // Arrivée depuis la recherche (RecherchePage) : ouvre et fait défiler jusqu'au
  // chapitre/section visé, transmis en state de navigation (pas d'URL — HashRouter
  // utilise déjà # pour les routes, pas de second fragment disponible pour l'ancre).
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (target) openAndScrollTo(target)
  }, [location.state])

  // Le premier chapitre est ouvert par défaut (defaultOpen) — le `toggle` natif ne
  // se déclenche que sur un changement d'état ultérieur, pas pour l'attribut open
  // initial, donc onOpen ne le marquerait jamais visité tout seul.
  useEffect(() => {
    const firstSlug = COURS_SLUGS[0]
    markVisited(firstSlug)
    setVisitedSlugs((prev) => new Set(prev).add(firstSlug))
  }, [])

  return (
    <div className="min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} figure="VIII" className="h-[70vh] min-h-[480px] w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-16 max-w-3xl">
            <Link to="/discipulus" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline w-fit mb-8">
              ← Discipulus
            </Link>
            <p className="font-mono text-[12px] text-gilt mb-3">Discipulus</p>
            <h1 className="font-heading text-4xl md:text-5xl mb-4">Cours</h1>
            <p className="font-body italic text-parchment-dim leading-relaxed text-justify border-l-2 border-gilt/30 pl-4">
              Cinq chapitres, du socle lycée à l'approfondissement. Déplie celui qu'il te faut : les autres se
              referment tout seuls, rien à faire défiler en trop.
            </p>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
        <ChapterNav titles={courseModules.map((m) => m.title)} />

        {courseModules.map((courseModule, i) => {
          const slug = courseModule.slug
          return (
            <ChapterAccordion
              key={slug}
              name="cours-chapitres"
              numeral={ROOM_NUMERALS[i]}
              title={courseModule.title}
              artwork={artworks[slug]}
              defaultOpen={i === 0}
              visited={visitedSlugs.has(slug)}
              onOpen={() => {
                markVisited(slug)
                setVisitedSlugs((prev) => new Set(prev).add(slug))
              }}
            >
              <ModuleChapterBody module={courseModule} />
            </ChapterAccordion>
          )
        })}
        </div>
      </div>
    </div>
  )
}
