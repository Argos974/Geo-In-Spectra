import { useMemo, useState } from "react"
import { atelierSeances } from "@/data/atelierSeances"
import { slugify } from "@/lib/slug"
import { scrollToAnchor } from "@/lib/lenisStore"
import { cn } from "@/lib/utils"

type ViewMode = "pipeline" | "salle"

/**
 * Plan de l'Atelier à deux vues du même contenu, jamais dupliqué : "pipeline"
 * (ordre séquentiel 1→9, chaque séance construit sur la précédente) et "par
 * salle" (mêmes séances regroupées par module théorique de référence). Les
 * deux ne font que naviguer vers les mêmes ancres de titre déjà rendues par
 * ContentBlocks (même mécanisme que RoomIndex) — aucun contenu n'est recalculé
 * ou réordonné dans le DOM, seul l'index de navigation change de tri.
 */
export function AtelierIndex() {
  const [mode, setMode] = useState<ViewMode>("pipeline")

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
    for (const s of atelierSeances) {
      for (const salle of s.salles) {
        if (!map.has(salle.slug)) map.set(salle.slug, { label: salle.label, seances: [] })
        map.get(salle.slug)!.seances.push(s.heading)
      }
    }
    return [...map.values()]
  }, [])

  const rowClass = "w-full flex items-center justify-between gap-4 px-5 py-3 text-left font-heading text-base text-parchment-dim hover:text-gilt hover:bg-gilt/[0.04] transition-colors"

  return (
    <div className="mb-12 border border-gilt/20 print:hidden">
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
            {atelierSeances.map((s) => (
              <tr key={s.heading} className="border-t border-gilt/10">
                <td className="py-0">
                  <button type="button" onClick={() => goTo(s.heading)} className={rowClass}>
                    <span>{s.heading}</span>
                    <span className="font-mono text-xs text-gilt/50 shrink-0">→</span>
                  </button>
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
