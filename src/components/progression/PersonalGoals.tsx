import { useState } from "react"
import { Link } from "react-router-dom"
import { modules } from "@/data/modules"
import { addGoal, getGoals, removeGoal, toggleGoal, type Goal } from "@/lib/goals"
import { cn } from "@/lib/utils"

function daysUntil(dueDate: string) {
  const due = new Date(dueDate + "T00:00:00")
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((due.getTime() - today.getTime()) / 86_400_000)
}

/**
 * Objectifs personnels — élément proactif (l'utilisateur fixe une échéance)
 * plutôt que seulement rétrospectif comme le reste de la page. Stockage
 * séparé de progress.ts (clé localStorage dédiée, src/lib/goals.ts) : un
 * objectif n'est pas une mesure de progression, c'est une intention.
 */
export function PersonalGoals() {
  const [goals, setGoals] = useState<Goal[]>(() => getGoals())
  const [label, setLabel] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [moduleSlug, setModuleSlug] = useState("")

  function handleAdd() {
    if (!label.trim() || !dueDate) return
    setGoals(addGoal(label.trim(), dueDate, moduleSlug || undefined))
    setLabel("")
    setDueDate("")
    setModuleSlug("")
  }

  return (
    <div className="border border-gilt/20 bg-canvas p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt mb-4">Objectifs personnels</p>

      {goals.length > 0 && (
        <ul className="flex flex-col gap-2 mb-5">
          {goals.map((g) => {
            const d = daysUntil(g.dueDate)
            const module = modules.find((m) => m.slug === g.moduleSlug)
            return (
              <li key={g.id} className="flex items-center justify-between gap-3 border-b border-gilt/10 pb-2">
                <button type="button" onClick={() => setGoals(toggleGoal(g.id))} className="flex items-start gap-3 text-left min-w-0">
                  <span
                    className={cn(
                      "mt-0.5 shrink-0 flex items-center justify-center w-4 h-4 border font-mono text-[10px]",
                      g.done ? "border-gilt bg-gilt/20 text-gilt" : "border-gilt/30 text-transparent",
                    )}
                  >
                    ✓
                  </span>
                  <span className="min-w-0">
                    <span className={cn("block text-sm truncate", g.done ? "text-parchment-dim/50 line-through" : "text-parchment")}>{g.label}</span>
                    <span className="block text-xs text-parchment-dim/60">
                      {module && <>{module.navLabel} · </>}
                      {g.done ? "atteint" : d < 0 ? "échéance dépassée" : d === 0 ? "aujourd'hui" : `dans ${d} j`}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setGoals(removeGoal(g.id))}
                  className="shrink-0 font-mono text-[10px] text-parchment-dim/50 hover:text-oxblood-bright"
                  aria-label="Supprimer l'objectif"
                >
                  ✕
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Nouvel objectif (ex. terminer Les Couleurs)"
          className="bg-ink border border-gilt/20 px-3 py-2 text-sm text-parchment placeholder:text-parchment-dim/40 focus:outline-none focus:border-gilt/50"
        />
        <div className="flex gap-2">
          <select
            value={moduleSlug}
            onChange={(e) => setModuleSlug(e.target.value)}
            className="flex-1 bg-ink border border-gilt/20 px-3 py-2 text-sm text-parchment-dim focus:outline-none focus:border-gilt/50"
          >
            <option value="">Salle liée (optionnel)</option>
            {modules.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.navLabel}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-ink border border-gilt/20 px-3 py-2 text-sm text-parchment-dim focus:outline-none focus:border-gilt/50"
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!label.trim() || !dueDate}
          className="self-start font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-2 hover:bg-gilt/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          Ajouter l'objectif
        </button>
      </div>

      <p className="font-mono text-[10px] text-parchment-dim/50 mt-4">
        Stocké séparément de la progression, uniquement dans ce navigateur. <Link to="/parcours" className="underline hover:text-gilt">Voir les parcours conseillés</Link> pour t'inspirer d'une échéance.
      </p>
    </div>
  )
}
