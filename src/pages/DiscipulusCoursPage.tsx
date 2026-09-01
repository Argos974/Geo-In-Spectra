import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { ModuleChapterBody } from "@/components/content/ModuleChapterBody"
import { ChapterAccordion } from "@/components/content/ChapterAccordion"
import { ChapterNav } from "@/components/content/ChapterNav"
import { LevelIntroBanner } from "@/components/content/LevelIntroBanner"
import { CoursPlanOverview } from "@/components/content/CoursPlanOverview"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { openAndScrollTo } from "@/lib/lenisStore"
import { getProgress, markVisited } from "@/lib/progress"
import { COURS_SLUGS } from "@/lib/moduleRoute"
import { usePageMeta } from "@/hooks/usePageMeta"
import type { ContentLevel } from "@/content/types"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]

export function DiscipulusCoursPage() {
  // COURS_SLUGS est un Set (source unique, voir lib/moduleRoute.ts) mais son ordre
  // d'itération — l'ordre d'insertion — est celui d'affichage voulu ici. Mémorisé
  // (référence stable) pour ne pas recalculer courseModules à chaque rendu.
  usePageMeta(
    "Cours — Discipulus",
    "Douze salles de cours de géomatique et télédétection, du socle lycée à l'approfondissement, en chapitres repliables.",
  )
  const coursSlugs = useMemo(() => [...COURS_SLUGS], [])
  const courseModules = coursSlugs.map((slug) => modules.find((m) => m.slug === slug)).filter((m) => m !== undefined)
  const art = artworks["discipulus-cours"]
  const location = useLocation()
  const [visitedSlugs, setVisitedSlugs] = useState<Set<string>>(() => {
    const progress = getProgress()
    return new Set(courseModules.filter((m) => progress[m.slug]?.visited).map((m) => m.slug))
  })

  // Piste actuellement affichée par chaque salle, tenue à jour même repliée
  // (voir ModuleChapterBody::onActiveTrackChange) — un ref, pas un state,
  // aucune de ces mises à jour ne doit provoquer de rendu ici. `openSlug`
  // retient LA salle actuellement dépliée (groupe d'exclusivité natif, une
  // seule à la fois) : changer de piste alors qu'elle est déjà ouverte doit
  // aussi compter comme "vu" — sans ce second déclenchement, seule la piste
  // affichée pile au moment du clic d'ouverture (onOpen, qui ne se redéclenche
  // pas pour un changement de contenu dans un <details> déjà ouvert) serait
  // jamais enregistrée, alors que l'élève voit bien la piste suivante.
  const activeTrackBySlug = useRef<Map<string, ContentLevel>>(new Map())
  const openSlugRef = useRef<string | null>(null)
  const handleActiveTrackChange = useCallback((slug: string, level: ContentLevel) => {
    activeTrackBySlug.current.set(slug, level)
    if (slug === openSlugRef.current) {
      markVisited(slug, level)
      setVisitedSlugs((prev) => (prev.has(slug) ? prev : new Set(prev).add(slug)))
    }
  }, [])

  // Arrivée depuis la recherche (RecherchePage) : ouvre et fait défiler jusqu'au
  // chapitre/section visé, transmis en state de navigation (pas d'URL — HashRouter
  // utilise déjà # pour les routes, pas de second fragment disponible pour l'ancre).
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (target) openAndScrollTo(target)
  }, [location.state])

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
              Douze chapitres, du socle lycée à l'approfondissement. Déplie celui qu'il te faut : les autres se
              referment tout seuls, rien à faire défiler en trop.
            </p>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
        <LevelIntroBanner />

        <ChapterAccordion name="cours-chapitres" title="Plan du cours" subtitle="La trame générale, avant d'entrer dans une salle" defaultOpen>
          <CoursPlanOverview />
        </ChapterAccordion>

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
              visited={visitedSlugs.has(slug)}
              onOpen={() => {
                openSlugRef.current = slug
                markVisited(slug, activeTrackBySlug.current.get(slug))
                setVisitedSlugs((prev) => new Set(prev).add(slug))
              }}
            >
              <ModuleChapterBody
                module={courseModule}
                onActiveTrackChange={(level) => handleActiveTrackChange(slug, level)}
              />
            </ChapterAccordion>
          )
        })}
        </div>
      </div>
    </div>
  )
}
