import { useState } from "react"
import { methodesChecklist } from "@/data/methodesChecklist"

/**
 * Auto-évaluation avant de rendre un travail — coché soi-même, non noté, non
 * persisté (pas un quiz, pas un doublon de recordQuizScore/progress.ts) :
 * un simple aide-mémoire à cocher juste avant de rendre une copie ou un rapport.
 */
export function SelfCheckList() {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const allChecked = checked.size === methodesChecklist.length

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="mb-12 border border-gilt/20 bg-canvas p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt">Avant de rendre : auto-évaluation</p>
        {allChecked && <span className="font-mono text-[10px] text-lapis-bright">✓ tout coché</span>}
      </div>
      <ul className="flex flex-col gap-3">
        {methodesChecklist.map((item, i) => {
          const active = checked.has(i)
          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={active}
                className="w-full flex items-start gap-3 text-left group"
              >
                <span
                  className={`mt-0.5 shrink-0 flex items-center justify-center w-4 h-4 border font-mono text-[10px] transition-colors ${
                    active ? "border-gilt bg-gilt/20 text-gilt" : "border-gilt/30 text-transparent group-hover:border-gilt/50"
                  }`}
                >
                  ✓
                </span>
                <span>
                  <span className={`block text-sm ${active ? "text-parchment-dim/80 line-through" : "text-parchment"}`}>{item.label}</span>
                  <span className="block text-xs text-parchment-dim/80 mt-0.5">{item.detail}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
