import { useNavigate } from "react-router-dom"
import { X } from "lucide-react"
import { PARCOURS } from "@/data/parcours"
import { clearActiveParcours, setParcoursStep } from "@/lib/activeParcours"
import { useActiveParcours } from "@/hooks/useActiveParcours"

/**
 * Guide de parcours persistant : une fois "Commencer ce parcours" cliqué sur
 * /parcours, ce bandeau reste affiché sur toutes les pages tant que le
 * parcours n'est pas terminé ou quitté, pour ne pas obliger le visiteur à
 * revenir sur /parcours et se souvenir lui-même de l'étape suivante.
 */
export function ActiveParcoursBar() {
  const navigate = useNavigate()
  const active = useActiveParcours()
  const parcours = active ? PARCOURS.find((p) => p.id === active.id) : undefined

  if (!active || !parcours) return null

  const stop = parcours.stops[active.stepIndex]
  const isFirst = active.stepIndex === 0
  const isLast = active.stepIndex === parcours.stops.length - 1

  function goTo(index: number) {
    setParcoursStep(index)
    navigate(parcours!.stops[index].to)
  }

  return (
    <div className="fixed top-16 inset-x-0 z-40 border-b border-gilt/25 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1800px] px-6 md:px-8 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] uppercase tracking-wider">
        <span className="text-gilt/70 shrink-0">Parcours : {parcours.title}</span>
        <span className="text-parchment-dim shrink-0">
          Étape {active.stepIndex + 1}/{parcours.stops.length} · {stop.label}
        </span>
        <span className="flex-1" />
        <button
          type="button"
          onClick={() => goTo(active.stepIndex - 1)}
          disabled={isFirst}
          className="text-parchment-dim hover:text-gilt transition-colors disabled:opacity-30 disabled:hover:text-parchment-dim"
        >
          ← Précédent
        </button>
        {isLast ? (
          <span className="text-gilt">Dernière étape</span>
        ) : (
          <button type="button" onClick={() => goTo(active.stepIndex + 1)} className="text-gilt hover:text-gilt-bright transition-colors">
            Étape suivante →
          </button>
        )}
        <button
          type="button"
          onClick={clearActiveParcours}
          aria-label="Quitter le parcours"
          title="Quitter le parcours"
          className="text-parchment-dim hover:text-oxblood-bright transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
