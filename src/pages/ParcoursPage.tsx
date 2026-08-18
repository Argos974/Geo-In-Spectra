import { Link, useNavigate } from "react-router-dom"
import { PARCOURS } from "@/data/parcours"
import { startParcours } from "@/lib/activeParcours"
import { useActiveParcours } from "@/hooks/useActiveParcours"

export function ParcoursPage() {
  const navigate = useNavigate()
  const active = useActiveParcours()

  function begin(id: string, firstStop: string) {
    startParcours(id)
    navigate(firstStop)
  }

  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← La galerie
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Ressources</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">Parcours conseillés</h1>
        <p className="text-parchment-dim text-lg mb-12 text-justify">
          Les 7 salles se lisent dans l'ordre par défaut, mais le chemin le plus utile dépend de l'objectif. Quatre
          parcours indicatifs, à ajuster librement. Choisis-en un pour être guidé étape par étape (un bandeau
          "Suivant →" reste affiché en haut de chaque page tant que le parcours est actif).
        </p>

        <div className="space-y-10">
          {PARCOURS.map((p) => {
            const isActive = active?.id === p.id
            return (
              <section key={p.id} className={isActive ? "border border-gilt/50 bg-gilt/[0.04] p-6" : "border border-gilt/20 p-6"}>
                <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
                  <h2 className="font-heading text-2xl text-gilt">{p.title}</h2>
                  <button
                    type="button"
                    onClick={() => begin(p.id, p.stops[0].to)}
                    className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/40 px-3 py-1.5 hover:bg-gilt/10 transition-colors"
                  >
                    {isActive ? "Recommencer ce parcours →" : "Commencer ce parcours →"}
                  </button>
                </div>
                {isActive && (
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gilt/80 mb-3">
                    Parcours actif, étape {active.stepIndex + 1} / {p.stops.length}
                  </p>
                )}
                <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-4">{p.audience}</p>
                <p className="text-parchment-dim leading-relaxed text-justify mb-5">{p.description}</p>
                <ol className="space-y-2 list-decimal pl-5">
                  {p.steps.map((s, i) => (
                    <li key={i} className="text-parchment-dim text-justify">{s}</li>
                  ))}
                </ol>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
