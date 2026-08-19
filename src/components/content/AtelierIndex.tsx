import { useMemo, useState } from "react"
import { atelierSeances } from "@/data/atelierSeances"
import { slugify } from "@/lib/slug"
import { scrollToAnchor } from "@/lib/lenisStore"
import { cn } from "@/lib/utils"
import type { ContentLevel } from "@/content/types"

type ViewMode = "pipeline" | "salle"

/**
 * Plan de l'Atelier à deux vues du même contenu, jamais dupliqué : "pipeline"
 * (ordre séquentiel 1→12 de la piste active, chaque séance construit sur la
 * précédente) et "par salle" (mêmes séances regroupées par module théorique de
 * référence). Les deux ne font que naviguer vers les mêmes ancres de titre déjà
 * rendues par ContentBlocks (même mécanisme que RoomIndex) — aucun contenu
 * n'est recalculé ou réordonné dans le DOM, seul l'index de navigation change
 * de tri.
 *
 * Filtré par `activeLevels` (même Set que le filtre "Afficher" du reste du
 * cours, ModuleChapterBody) : l'Atelier a trois pistes indépendantes de 12
 * séances (Lycée/Licence-BUT/Master-Recherche), pas un seul programme mixte —
 * sans ce filtre, le plan listerait les 36 séances des trois pistes à la fois,
 * y compris celles que le filtre de niveau masque déjà plus bas dans la page.
 *
 * `showTeacherMeta` (off par défaut) affiche la durée, le matériel et la note
 * d'animation de chaque séance (atelierSeances.ts) sous son intitulé — réservé
 * à MagisterCoursPage, la route publique /module/travaux-pratiques et
 * Discipulus n'en ont pas besoin (la note d'animation n'a aucun intérêt côté
 * élève, contrairement au reste du contenu de la séance qui lui est commun).
 */
export function AtelierIndex({ activeLevels, showTeacherMeta }: { activeLevels: Set<ContentLevel>; showTeacherMeta?: boolean }) {
  const [mode, setMode] = useState<ViewMode>("pipeline")
  const visibleSeances = useMemo(() => atelierSeances.filter((s) => activeLevels.has(s.level)), [activeLevels])

  function goTo(heading: string) {
    const id = slugify(heading)
    scrollToAnchor(id)
    const el = document.getElementById(id)
    if (!el) return
    el.classList.add("anchor-flash")
    window.setTimeout(() => el.classList.remove("anchor-flash"), 1300)
  }

  const grouped = useMemo(() => {
    const map = new Map<string, { label: string; seances: string[] }>()
    for (const s of visibleSeances) {
      for (const salle of s.salles) {
        if (!map.has(salle.slug)) map.set(salle.slug, { label: salle.label, seances: [] })
        map.get(salle.slug)!.seances.push(s.heading)
      }
    }
    return [...map.values()]
  }, [visibleSeances])

  const rowClass = "w-full flex items-center justify-between gap-4 px-5 py-3 text-left font-heading text-base text-parchment-dim hover:text-gilt hover:bg-gilt/[0.04] transition-colors"

  const seanceByHeading = useMemo(() => new Map(visibleSeances.map((s) => [s.heading, s])), [visibleSeances])

  // Fonction, pas un composant imbriqué : évite un remount de la ligne à chaque
  // rendu de AtelierIndex (piège classique d'une déclaration de composant dans
  // le corps d'un autre composant).
  function renderTeacherMeta(heading: string) {
    if (!showTeacherMeta) return null
    const s = seanceByHeading.get(heading)
    if (!s || (!s.dureeMin && !s.materiel?.length && !s.animation)) return null
    return (
      <div className="px-5 pb-3 -mt-2">
        {(s.dureeMin || s.materiel?.length) && (
          <p className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim">
            {s.dureeMin && <span>⏱ {s.dureeMin} min</span>}
            {s.dureeMin && s.materiel?.length ? <span className="mx-1.5 text-parchment-dim/50">·</span> : null}
            {s.materiel?.length ? <span>{s.materiel.join(", ")}</span> : null}
          </p>
        )}
        {s.animation && (
          <p className="text-[11px] leading-relaxed text-lapis-bright/90 border-l border-lapis/30 pl-2.5 mt-1.5">
            <span className="font-mono text-[9px] uppercase tracking-wider text-lapis-bright/70 mr-1">Animation ·</span>
            {s.animation}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="mb-12 border border-gilt/20 bg-canvas print:hidden">
      <div className="flex items-center justify-between flex-wrap gap-3 px-5 pt-4 pb-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt">Plan de l'atelier</p>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setMode("pipeline")}
            aria-pressed={mode === "pipeline"}
            className={cn(
              "font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border transition-colors",
              mode === "pipeline" ? "border-gilt/50 text-gilt bg-gilt/[0.06]" : "border-gilt/15 text-parchment-dim/80 hover:text-parchment-dim hover:border-gilt/30",
            )}
          >
            Vue pipeline
          </button>
          <button
            type="button"
            onClick={() => setMode("salle")}
            aria-pressed={mode === "salle"}
            className={cn(
              "font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border transition-colors",
              mode === "salle" ? "border-gilt/50 text-gilt bg-gilt/[0.06]" : "border-gilt/15 text-parchment-dim/80 hover:text-parchment-dim hover:border-gilt/30",
            )}
          >
            Vue par salle
          </button>
        </div>
      </div>

      {mode === "pipeline" ? (
        <table className="w-full text-sm">
          <tbody>
            {visibleSeances.map((s) => (
              <tr key={s.heading} className="border-t border-gilt/10">
                <td className="py-0">
                  <button type="button" onClick={() => goTo(s.heading)} className={rowClass}>
                    <span>{s.heading}</span>
                    <span className="font-mono text-xs text-gilt/50 shrink-0">→</span>
                  </button>
                  {renderTeacherMeta(s.heading)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="divide-y divide-gilt/10">
          {grouped.map((g) => (
            <div key={g.label} className="border-t border-gilt/10 first:border-t-0">
              <p className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/80 px-5 pt-3 pb-1">{g.label}</p>
              <table className="w-full text-sm">
                <tbody>
                  {g.seances.map((heading) => (
                    <tr key={heading}>
                      <td className="py-0">
                        <button type="button" onClick={() => goTo(heading)} className={rowClass}>
                          <span>{heading}</span>
                          <span className="font-mono text-xs text-gilt/50 shrink-0">→</span>
                        </button>
                        {renderTeacherMeta(heading)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
