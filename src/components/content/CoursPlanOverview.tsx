import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { modules } from "@/data/modules"
import { moduleContent } from "@/content"
import { quizzes } from "@/data/quizzes"
import { exercises } from "@/data/exercises"
import { coursLevelSubtitle } from "@/data/coursLevels"
import { COURS_SLUGS } from "@/lib/moduleRoute"
import { getPreferredLevel, setPreferredLevel } from "@/lib/preferredLevel"
import { ALL_LEVELS, LEVEL_TOGGLE_LABEL } from "@/lib/levelFilter"
import { coursePdfName } from "@/lib/pdfNames"
import { openAndScrollTo } from "@/lib/lenisStore"
import { slugify } from "@/lib/slug"
import type { ContentLevel } from "@/content/types"
import { cn } from "@/lib/utils"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]

/** Titres des sections (headings) d'un module qui appartiennent à une piste donnée — le plan de la salle pour cette piste, sans dupliquer le contenu. */
function chapterTitlesAtLevel(slug: string, level: ContentLevel): string[] {
  const blocks = moduleContent[slug] ?? []
  return blocks.filter((b) => b.type === "heading" && b.level === level).map((b) => (b as { text: string }).text)
}

/**
 * Trame générale du cours, affichée EN TÊTE de DiscipulusCoursPage (avant les 12 salles
 * elles-mêmes) — même piste alors que le sélecteur "Afficher" est par ailleurs indépendant
 * salle par salle : ce plan pilote donc explicitement la préférence globale
 * (setPreferredLevel), qu'un changement de piste ici s'applique aux 12 salles en même
 * temps, cohérent avec ce qu'un plan général doit montrer. Cliquer une salle ouvre son
 * accordéon et y défile (openAndScrollTo), sans navigation : tout se passe sur la même
 * page — contrairement à un lien externe, aucun besoin de relais one-shot
 * (pendingSectionLevel), les 12 salles sont déjà montées.
 */
export function CoursPlanOverview() {
  const [level, setLevel] = useState<ContentLevel>(() => getPreferredLevel() ?? "superieur")
  const coursSlugs = useMemo(() => [...COURS_SLUGS], [])
  const courseModules = coursSlugs.map((slug) => modules.find((m) => m.slug === slug)).filter((m) => m !== undefined)

  function selectLevel(next: ContentLevel) {
    setLevel(next)
    setPreferredLevel(next)
  }

  const withExercises = courseModules.filter((m) => Boolean(exercises[m.slug])).length
  const withQuiz = courseModules.filter((m) => Boolean(quizzes[m.slug])).length

  return (
    <div>
      <p className="text-parchment-dim leading-relaxed text-justify max-w-2xl mb-6">
        Les douze salles vues d'un coup d'œil, piste par piste : choisis la tienne pour voir exactement ce qu'elle
        couvre, salle par salle, avant de plonger dans le détail ci-dessous.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/80 mr-1">Piste :</span>
        {ALL_LEVELS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => selectLevel(l)}
            aria-pressed={level === l}
            className={cn(
              "font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors",
              level === l ? "border-gilt/50 text-gilt bg-gilt/[0.06]" : "border-gilt/15 text-parchment-dim/80 hover:text-parchment-dim hover:border-gilt/30",
            )}
          >
            {LEVEL_TOGGLE_LABEL[l]}
          </button>
        ))}
      </div>

      <p className="font-mono text-[11px] text-parchment-dim mb-8">
        À cette piste : {withExercises}/{courseModules.length} salle{withExercises > 1 ? "s" : ""} avec exercices,{" "}
        {withQuiz}/{courseModules.length} avec quiz.
      </p>

      <div className="space-y-3">
        {courseModules.map((courseModule, i) => {
          const slug = courseModule.slug
          const titles = chapterTitlesAtLevel(slug, level)
          const subtitle = coursLevelSubtitle[slug]?.[level]
          const hasExercises = Boolean(exercises[slug])
          const hasQuiz = Boolean(quizzes[slug])
          return (
            <div key={slug} className="border border-gilt/15 p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                <div>
                  <p className="font-mono text-[11px] text-gilt mb-1">{ROOM_NUMERALS[i]}</p>
                  <button
                    type="button"
                    onClick={() => openAndScrollTo(slugify(courseModule.title))}
                    className="font-heading text-xl hover:text-gilt transition-colors text-left"
                  >
                    {courseModule.title}
                  </button>
                  {subtitle && <p className="text-parchment-dim text-sm mt-1">{subtitle}</p>}
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <a
                    href={`/pdf/${slug}/${coursePdfName(slug, true, level)}`}
                    download={coursePdfName(slug, true, level)}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gilt border border-gilt/30 px-2.5 py-1.5 hover:bg-gilt/10 transition-colors"
                  >
                    ↓ PDF
                  </a>
                  {hasExercises && (
                    <Link
                      to={`/module/${slug}/exercices?level=${level}`}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-lapis-bright border border-lapis/40 px-2.5 py-1.5 hover:bg-lapis/10 transition-colors"
                    >
                      Exercices
                    </Link>
                  )}
                  {hasQuiz && (
                    <Link
                      to={`/module/${slug}/quiz`}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-parchment-dim border border-gilt/15 px-2.5 py-1.5 hover:border-gilt/40 hover:text-gilt transition-colors"
                    >
                      Quiz
                    </Link>
                  )}
                </div>
              </div>
              {titles.length > 0 ? (
                <ul className="flex flex-wrap gap-x-2 gap-y-1 text-parchment-dim/80 text-sm">
                  {titles.map((t) => (
                    <li key={t} className="after:content-['·'] after:ml-2 after:text-gilt/30 last:after:content-none">
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-parchment-dim/50 text-sm italic">Aucune section à cette piste pour l'instant.</p>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-parchment-dim text-sm mt-10 border-l-2 border-gilt/20 pl-4">
        Méthodes n'apparaît pas ici : ce n'est pas une salle à 3 pistes mais un contenu regroupé par finalité
        (Scolaire/Concours/Professionnel/Recherche) — <Link to="/discipulus/methodes" className="text-gilt underline underline-offset-2 hover:text-gilt-bright">à consulter directement</Link>.
        Pour la trame de séances côté enseignant (Atelier), voir <Link to="/magister/programme" className="text-gilt underline underline-offset-2 hover:text-gilt-bright">Magister → Programme</Link>.
      </p>
    </div>
  )
}
