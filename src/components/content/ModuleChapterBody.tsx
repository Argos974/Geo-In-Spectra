import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { modules, type CourseModule } from "@/data/modules"
import { moduleContent } from "@/content"
import { quizzes } from "@/data/quizzes"
import { games } from "@/data/games"
import { exercises } from "@/data/exercises"
import { ContentBlocks } from "@/components/content/ContentBlocks"
import { RoomIndex } from "@/components/content/RoomIndex"
import { AtelierIndex } from "@/components/content/AtelierIndex"
import { ALL_LEVELS, filterBlocksByLevel } from "@/lib/levelFilter"
import type { ContentLevel } from "@/content/types"
import { useActiveParcours } from "@/hooks/useActiveParcours"
import { PARCOURS } from "@/data/parcours"
import { cn } from "@/lib/utils"

const LEVEL_TOGGLE_LABEL: Record<ContentLevel, string> = {
  "lycee": "Lycée",
  superieur: "Supérieur",
  approfondissement: "Approfondissement",
}

interface ModuleChapterBodyProps {
  module: CourseModule
  /** Masque le résumé en tête de corps — utile quand l'appelant (ex. ChapterAccordion) l'affiche déjà comme sous-titre. */
  hideSummary?: boolean
}

/**
 * Corps de contenu d'un module (résumé, actions PDF/exercices/quiz/jeu, filtre de
 * niveau, sommaire, blocs) — extrait de ModulePage pour être réutilisable tel quel
 * à l'intérieur d'un chapitre repliable (DiscipulusCoursPage) sans dupliquer cette
 * logique. ModulePage (route /module/:slug, liens profonds, impression) l'utilise
 * aussi, inchangée dans son comportement.
 *
 * markVisited() n'est PAS appelé ici : un <details> fermé garde ses enfants montés
 * dans le DOM (juste masqués), donc un effet ici marquerait les 5 chapitres de Cours
 * comme visités dès le chargement de la page, ouverts ou non. Chaque appelant décide
 * quand c'est réellement vu — ModulePage/MagisterCoursPage au montage (page dédiée,
 * pas de repli possible), ChapterAccordion à l'ouverture réelle (voir son onOpen).
 */
export function ModuleChapterBody({ module, hideSummary }: ModuleChapterBodyProps) {
  const [activeLevels, setActiveLevels] = useState<Set<ContentLevel>>(new Set(ALL_LEVELS))
  const activeParcours = useActiveParcours()
  const parcours = activeParcours ? PARCOURS.find((p) => p.id === activeParcours.id) : undefined

  useEffect(() => {
    if (!parcours?.levels) return
    setActiveLevels(new Set(parcours.levels))
  }, [module.slug, parcours])

  const blocks = moduleContent[module.slug]
  const filteredBlocks = useMemo(
    () => (blocks ? filterBlocksByLevel(blocks, activeLevels) : undefined),
    [blocks, activeLevels],
  )

  function toggleLevel(level: ContentLevel) {
    setActiveLevels((prev) => {
      const next = new Set(prev)
      if (next.has(level)) {
        if (next.size === 1) return prev // toujours garder au moins un niveau actif
        next.delete(level)
      } else {
        next.add(level)
      }
      return next
    })
  }

  const index = modules.findIndex((m) => m.slug === module.slug)
  const order = String(index + 1).padStart(2, "0")
  const coursName = `${order}-${module.slug}-cours.pdf`
  const ficheName = `${order}-${module.slug}-fiche-memo.pdf`
  const hasQuiz = Boolean(quizzes[module.slug])
  const hasExercises = Boolean(exercises[module.slug])

  return (
    <div>
      {!hideSummary && <p className="text-parchment-dim text-lg mb-6 text-justify">{module.summary}</p>}

      <div className="print:hidden flex flex-nowrap items-center gap-2 mb-6 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
        <a
          href={`/pdf/${module.slug}/${coursName}`}
          download={coursName}
          className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-2 hover:bg-gilt/10 transition-colors"
        >
          ↓ Cours (PDF)
        </a>
        <a
          href={`/pdf/${module.slug}/${ficheName}`}
          download={ficheName}
          className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-lapis-bright border border-lapis/40 px-3 py-2 hover:bg-lapis/10 transition-colors"
        >
          ↓ Fiche mémo (PDF)
        </a>
        {hasExercises && (
          <Link
            to={`/module/${module.slug}/exercices`}
            className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-lapis-bright border border-lapis/40 px-3 py-2 hover:bg-lapis/10 transition-colors"
          >
            S'entraîner →
          </Link>
        )}
        {hasQuiz && (
          <Link
            to={`/module/${module.slug}/quiz`}
            className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-parchment-dim border border-gilt/15 px-3 py-2 hover:border-gilt/40 hover:text-gilt transition-colors"
          >
            Faire le quiz →
          </Link>
        )}
      </div>

      <div className="print:hidden flex flex-wrap items-center gap-2 mb-10">
        <span className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/80 mr-1">Afficher :</span>
        {ALL_LEVELS.map((level) => {
          const active = activeLevels.has(level)
          return (
            <button
              key={level}
              type="button"
              onClick={() => toggleLevel(level)}
              aria-pressed={active}
              className={cn(
                "font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors",
                active ? "border-gilt/50 text-gilt bg-gilt/[0.06]" : "border-gilt/15 text-parchment-dim/80 hover:text-parchment-dim hover:border-gilt/30",
              )}
            >
              {LEVEL_TOGGLE_LABEL[level]}
            </button>
          )
        })}
        {parcours?.levels && (
          <span className="font-mono text-[10px] text-parchment-dim/60">
            réglé par le parcours « {parcours.title} »
          </span>
        )}
      </div>

      {module.slug === "travaux-pratiques" ? <AtelierIndex /> : filteredBlocks && <RoomIndex blocks={filteredBlocks} />}

      {filteredBlocks ? (
        filteredBlocks.length > 0 ? (
          <ContentBlocks blocks={filteredBlocks} game={games[module.slug]} />
        ) : (
          <div className="border border-dashed border-gilt/25 p-8 text-center text-parchment-dim">
            <p className="font-mono text-sm">Aucun contenu à ce niveau, élargis le filtre ci-dessus.</p>
          </div>
        )
      ) : (
        <div className="border border-dashed border-gilt/25 p-8 text-center text-parchment-dim">
          <p className="font-mono text-sm">Contenu du module à venir.</p>
        </div>
      )}
    </div>
  )
}
