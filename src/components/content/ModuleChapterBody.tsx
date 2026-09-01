import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import type { CourseModule } from "@/data/modules"
import { moduleContent } from "@/content"
import { quizzes } from "@/data/quizzes"
import { games } from "@/data/games"
import { exercises } from "@/data/exercises"
import { ContentBlocks } from "@/components/content/ContentBlocks"
import { RoomIndex } from "@/components/content/RoomIndex"
import { AtelierIndex } from "@/components/content/AtelierIndex"
import { ChapterNav } from "@/components/content/ChapterNav"
import { atelierSeances } from "@/data/atelierSeances"
import { coursLevelSubtitle } from "@/data/coursLevels"
import { consumePendingSectionLevel } from "@/lib/pendingSectionLevel"
import { getPreferredLevel, setPreferredLevel } from "@/lib/preferredLevel"
import { usePreferredLevel } from "@/hooks/usePreferredLevel"
import { ALL_LEVELS, LEVEL_TOGGLE_LABEL, filterBlocksByLevel } from "@/lib/levelFilter"
import { LEVEL_TRACKS, coursePdfName, fichePdfName, quizCorrigePdfName } from "@/lib/pdfNames"
import type { ContentLevel } from "@/content/types"
import { useActiveParcours } from "@/hooks/useActiveParcours"
import { PARCOURS } from "@/data/parcours"
import { cn } from "@/lib/utils"

interface ModuleChapterBodyProps {
  module: CourseModule
  /** Masque le résumé en tête de corps — utile quand l'appelant (ex. ChapterAccordion) l'affiche déjà comme sous-titre. */
  hideSummary?: boolean
  /**
   * Affiche la couche de métadonnées enseignant (durée, matériel) de l'Atelier,
   * transmise telle quelle à AtelierIndex — sans effet sur les autres modules
   * (RoomIndex n'en a pas besoin). Off par défaut : MagisterCoursPage seul la
   * passe à true, ModulePage (route publique) et DiscipulusCoursPage n'y touchent pas.
   */
  showTeacherMeta?: boolean
  /**
   * Notifié à chaque changement de piste active — jamais un "vu" en soi (voir
   * plus bas pourquoi markVisited n'est pas appelé ici), juste un relais pour
   * que l'appelant sache QUELLE piste est actuellement affichée au moment où
   * lui-même détecte une vraie ouverture (ChapterAccordion::onOpen). Un
   * <details> fermé garde ce composant monté et cet effet actif : c'est
   * voulu, la piste doit rester à jour même repliée, seul l'appelant décide
   * quand "vu" doit réellement être enregistré.
   */
  onActiveTrackChange?: (level: ContentLevel) => void
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
export function ModuleChapterBody({ module, hideSummary, showTeacherMeta, onActiveTrackChange }: ModuleChapterBodyProps) {
  // Méthodologie est la seule exception au modèle "3 pistes" (CourseModule.leveled
  // = false) : son contenu est regroupé par finalité (Scolaire/Concours/
  // Professionnel/Recherche, voir DiscipulusMethodesPage.tsx), jamais présenté via
  // ce sélecteur de piste sur sa page réelle — seule la route historique
  // /module/methodologie passe encore par ce composant. Son bouton "Cours (PDF)"
  // actif (sur la page Méthodes, MethodesActionBar.tsx) télécharge le fichier non
  // suffixé `<NN>-methodologie-cours.pdf` (voir lib/pdfNames.ts, même exception) :
  // lui appliquer le sélecteur exclusif casserait ce lien réel pour un gain nul,
  // puisque personne n'y accède par ce chemin.
  const isLeveledCourse = module.leveled !== false

  // Toute salle de Cours (et l'Atelier) est 3 pistes complètes et indépendantes
  // (Lycée/Licence-BUT/Master-Recherche), jamais un même contenu simplement
  // stratifié par niveau qu'on empilerait : les afficher toutes par défaut
  // mélangerait des sections écrites pour des publics différents. Niveau actif
  // par défaut : la dernière piste choisie ailleurs sur le site (voir
  // lib/preferredLevel.ts), sinon Licence/BUT — le filtre "Afficher" reste
  // modifiable normalement pour changer de piste.
  const [activeLevels, setActiveLevels] = useState<Set<ContentLevel>>(
    () => new Set(isLeveledCourse ? [getPreferredLevel() ?? "superieur"] : ALL_LEVELS),
  )
  const activeParcours = useActiveParcours()
  const parcours = activeParcours ? PARCOURS.find((p) => p.id === activeParcours.id) : undefined
  const preferredLevel = usePreferredLevel()

  // Un seul effet, dans un ordre de priorité explicite — trois sources peuvent
  // vouloir fixer la piste active, jamais en même temps : un clic délibéré
  // (résultat de recherche, Formulaire, Pièges fréquents — un seul niveau
  // consommé une fois par lib/pendingSectionLevel.ts) l'emporte sur un parcours
  // actif en arrière-plan, qui l'emporte lui-même sur la simple préférence
  // mémorisée (laquelle se resynchronise en direct, voir usePreferredLevel —
  // utile puisque les 11 autres salles restent montées, repliées, en arrière-plan).
  // Les séparer en plusieurs effets indépendants créerait une course : selon
  // l'ordre de déclaration, l'un écraserait silencieusement le résultat des
  // autres au montage.
  useEffect(() => {
    const pendingLevel = consumePendingSectionLevel(module.slug)
    if (pendingLevel) {
      // Synchronise la piste active avec trois sources externes (signal one-shot,
      // parcours actif, préférence mémorisée), pas un état dérivé du rendu.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveLevels(new Set([pendingLevel]))
      return
    }
    if (parcours?.levels) {
      setActiveLevels(new Set(parcours.levels))
      return
    }
    if (isLeveledCourse && preferredLevel) {
      setActiveLevels(new Set([preferredLevel]))
    }
  }, [module.slug, parcours, preferredLevel, isLeveledCourse])

  const blocks = moduleContent[module.slug]
  const filteredBlocks = useMemo(
    () => (blocks ? filterBlocksByLevel(blocks, activeLevels) : undefined),
    [blocks, activeLevels],
  )

  // Mini-nav sticky (ChapterNav) pour l'Atelier, même mécanisme que Cours/Méthodes
  // (jusque-là seul module de type "Cours" à en être dépourvu) — le "Plan de
  // l'atelier" (AtelierIndex, juste en dessous) couvre déjà la navigation par
  // séance en détail, ce ChapterNav ajoute le saut rapide depuis n'importe où
  // dans la page longue, cohérent avec les autres onglets Cours.
  const visibleSeanceHeadings = useMemo(
    () => (module.slug === "travaux-pratiques" ? atelierSeances.filter((s) => activeLevels.has(s.level)).map((s) => s.heading) : []),
    [module.slug, activeLevels],
  )

  // Sélecteur de piste unique (pas un contenu stratifié cumulable) : choisir un
  // niveau remplace la piste active, jamais une liste de cases à cocher — sinon
  // on affiche des sections écrites pour des publics différents mélangées.
  // Méthodologie reste cumulable (voir isLeveledCourse) : son contenu n'est pas
  // organisé en 3 pistes indépendantes, rien n'empêche d'en afficher plusieurs
  // niveaux à la fois sur cette route historique.
  function toggleLevel(level: ContentLevel) {
    if (!isLeveledCourse) {
      setActiveLevels((prev) => {
        const next = new Set(prev)
        if (next.has(level)) {
          if (next.size === 1) return prev
          next.delete(level)
        } else {
          next.add(level)
        }
        return next
      })
      return
    }
    setActiveLevels(new Set([level]))
    setPreferredLevel(level)
  }

  // La fiche mémo, contrairement au cours, reste UN seul PDF par module (comme
  // pour l'Atelier) : un condensé des trois pistes plutôt qu'un bilan par
  // piste — voir content/fiches/*.ts, jamais filtré par niveau.
  const ficheName = fichePdfName(module.slug)
  const quizCorrigeName = quizCorrigePdfName(module.slug)
  const hasQuiz = Boolean(quizzes[module.slug])
  const hasExercises = Boolean(exercises[module.slug])
  // Un seul niveau actif à la fois (voir toggleLevel) : le PDF de cours
  // téléchargeable suit la piste choisie dans le filtre "Afficher", au lieu
  // d'empiler les trois liens (trop d'éléments, et ambigu vu que le filtre
  // n'affiche déjà plus qu'une seule piste). Méthodologie (isLeveledCourse
  // false) n'a pas de piste unique : un seul PDF non suffixé, comme avant.
  const activeTrack = LEVEL_TRACKS.find(({ level }) => activeLevels.has(level)) ?? LEVEL_TRACKS[0]

  useEffect(() => {
    if (isLeveledCourse) onActiveTrackChange?.(activeTrack.level)
  }, [isLeveledCourse, activeTrack.level, onActiveTrackChange])
  const trackCoursName = coursePdfName(module.slug, isLeveledCourse, activeTrack.level)

  const trackSubtitle = isLeveledCourse ? coursLevelSubtitle[module.slug]?.[activeTrack.level] : undefined

  return (
    <div>
      {trackSubtitle && (
        <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-2">
          {activeTrack.shortLabel} — {trackSubtitle}
        </p>
      )}
      {!hideSummary && <p className="text-parchment-dim text-lg mb-6 text-justify">{module.summary}</p>}

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
          <span className="font-mono text-[10px] text-parchment-dim/80">
            réglé par le parcours « {parcours.title} »
          </span>
        )}
      </div>

      {module.slug === "travaux-pratiques" && visibleSeanceHeadings.length > 0 && <ChapterNav titles={visibleSeanceHeadings} />}

      {module.slug === "travaux-pratiques" ? (
        <AtelierIndex activeLevels={activeLevels} showTeacherMeta={showTeacherMeta} />
      ) : (
        filteredBlocks && <RoomIndex blocks={filteredBlocks} />
      )}

      {filteredBlocks ? (
        filteredBlocks.length > 0 ? (
          <ContentBlocks blocks={filteredBlocks} game={games[module.slug]} moduleSlug={module.slug} />
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

      {/*
       * PDF cours / fiche mémo / entraînement / quiz : proposés une fois la
       * piste effectivement lue, pas avant — placés en tête ils poussaient à
       * télécharger avant même d'avoir vu le cours. Le sélecteur de niveau,
       * lui, reste en haut : il faut choisir sa piste avant de lire.
       */}
      {filteredBlocks && filteredBlocks.length > 0 && (
        <div className="print:hidden flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-gilt/15">
          <a
            href={`/pdf/${module.slug}/${trackCoursName}`}
            download={trackCoursName}
            className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-2 hover:bg-gilt/10 transition-colors"
          >
            ↓ Cours {isLeveledCourse ? `${activeTrack.shortLabel} ` : ""}(PDF)
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
              to={isLeveledCourse ? `/module/${module.slug}/exercices?level=${activeTrack.level}` : `/module/${module.slug}/exercices`}
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
          {hasQuiz && showTeacherMeta && (
            <a
              href={`/pdf/${module.slug}/${quizCorrigeName}`}
              download={quizCorrigeName}
              className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-parchment-dim border border-gilt/15 px-3 py-2 hover:border-gilt/40 hover:text-gilt transition-colors"
            >
              ↓ Corrigé quiz (PDF)
            </a>
          )}
        </div>
      )}
    </div>
  )
}
