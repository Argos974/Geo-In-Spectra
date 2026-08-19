import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { moduleContent } from "@/content"
import { modules } from "@/data/modules"
import { artworks } from "@/data/artworks"
import { games } from "@/data/games"
import { ContentBlocks } from "@/components/content/ContentBlocks"
import { ChapterAccordion } from "@/components/content/ChapterAccordion"
import { ChapterNav } from "@/components/content/ChapterNav"
import { RoomIndex } from "@/components/content/RoomIndex"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { splitIntoChapters, leadingIntro, groupChapters } from "@/lib/chapters"
import { markVisited } from "@/lib/progress"
import { openAndScrollTo } from "@/lib/lenisStore"
import { exercises } from "@/data/exercises"
import { MethodesActionBar } from "@/components/methodes/MethodesActionBar"
import { DecisionTree } from "@/components/methodes/DecisionTree"
import { GuidedCase } from "@/components/methodes/GuidedCase"
import { SelfCheckList } from "@/components/methodes/SelfCheckList"

/**
 * "La Méthode" (7 sections numérotées) regroupées ici par finalité réelle plutôt
 * que par ordre 1→7 : les sections ne servent pas toutes le même public (lycée en
 * examen n'est pas un rapport professionnel n'est pas un mémoire de recherche).
 * Regroupement fait uniquement à l'affichage (indices dans methodologie.ts,
 * jamais renuméroté) — le contenu source n'est pas modifié.
 */
const GROUPS = [
  { title: "Scolaire", subtitle: "Épreuves de lycée : commentaire de document.", indices: [0], artworkKey: "methodologie-scolaire" },
  { title: "Concours", subtitle: "Dissertation, croquis, préparation CAPES/Agrégation.", indices: [1, 4, 5], artworkKey: "methodologie-concours" },
  { title: "Professionnel", subtitle: "Rapport technique SIG et sémiologie appliquée.", indices: [2, 3], artworkKey: "methodologie-professionnel" },
  { title: "Recherche", subtitle: "Mémoire, structure IMRaD, rigueur statistique.", indices: [6], artworkKey: "methodologie-recherche" },
]

export function DiscipulusMethodesPage() {
  const blocks = moduleContent.methodologie ?? []
  const intro = leadingIntro(blocks)
  const chapters = splitIntoChapters(blocks)
  const grouped = groupChapters(chapters, GROUPS.map((g) => ({ title: g.title, indices: g.indices })))
  const methodologie = modules.find((m) => m.slug === "methodologie")
  const art = artworks.methodologie
  const location = useLocation()

  useEffect(() => {
    markVisited("methodologie")
  }, [])

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (target) openAndScrollTo(target)
  }, [location.state])

  return (
    <div className="print-page min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} figure="VI" className="h-[70vh] min-h-[480px] w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-16 max-w-3xl">
            <Link to="/discipulus" className="print:hidden font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline w-fit mb-8">
              ← Discipulus
            </Link>
            <p className="font-mono text-[12px] text-gilt mb-3">Discipulus</p>
            <h1 className="font-heading text-4xl md:text-5xl mb-4">Méthodes</h1>
            {methodologie && (
              <p className="font-body italic text-parchment-dim leading-relaxed text-justify border-l-2 border-gilt/30 pl-4">
                {methodologie.epigraph}
              </p>
            )}
          </div>
        </ArtworkBackdrop>
      )}

      <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
        <MethodesActionBar />

        {intro.length > 0 && <ContentBlocks blocks={intro} game={games.methodologie} moduleSlug="methodologie" />}

        <DecisionTree />

        <ChapterNav titles={GROUPS.map((g) => g.title)} />

        {grouped.map((g, i) => {
          const source = GROUPS[i]
          return (
            <ChapterAccordion
              key={g.title}
              name="methodes-chapitres"
              title={g.title}
              subtitle={source?.subtitle}
              artwork={source?.artworkKey ? artworks[source.artworkKey] : undefined}
              defaultOpen={i === 0}
            >
              {/* Plan du chapitre — utile dès qu'un chapitre fusionne plusieurs sections
                  d'origine (Concours, Professionnel) ; inutile pour un chapitre à une seule
                  section (Scolaire, Recherche), RoomIndex se masque de lui-même sinon. */}
              {(source?.indices.length ?? 0) > 1 && <RoomIndex blocks={g.blocks} />}
              <ContentBlocks blocks={g.blocks} game={games.methodologie} moduleSlug="methodologie" />
            </ChapterAccordion>
          )
        })}

        {exercises.methodologie && <GuidedCase set={exercises.methodologie} />}

        <SelfCheckList />
      </div>
    </div>
  )
}
