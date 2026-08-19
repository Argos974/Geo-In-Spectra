import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { PARCOURS, type Parcours } from "@/data/parcours"
import { startParcours } from "@/lib/activeParcours"
import { useActiveParcours } from "@/hooks/useActiveParcours"
import { getProgress, type ModuleProgress } from "@/lib/progress"

/** Extrait les slugs de module réellement traversés par un parcours, à partir de ses stops. */
function parcoursModuleSlugs(p: Parcours): string[] {
  const slugs = new Set<string>()
  for (const stop of p.stops) {
    const m = stop.to.match(/^\/module\/([^/]+)/)
    if (m) slugs.add(m[1])
    else if (stop.to === "/discipulus/methodes") slugs.add("methodologie")
  }
  return Array.from(slugs)
}

/** Fraction des salles du parcours déjà visitées — sert à repérer le parcours le plus avancé/pertinent pour cet utilisateur. */
function overlapScore(p: Parcours, progress: Record<string, ModuleProgress>): number {
  const slugs = parcoursModuleSlugs(p)
  if (slugs.length === 0) return 0
  return slugs.filter((s) => progress[s]?.visited).length / slugs.length
}

export function ParcoursPage() {
  const navigate = useNavigate()
  const active = useActiveParcours()
  const [progress] = useState<Record<string, ModuleProgress>>(() => getProgress())

  // Recommandation dérivée de la progression réelle (lib/progress.ts), pas d'un
  // ordre fixe : le parcours dont le plus de salles ont déjà été visitées est mis
  // en avant. Si rien n'a encore été visité, "Découverte (lycée)" reste le point
  // d'entrée par défaut le plus sûr, sans avoir besoin de calculer quoi que ce soit.
  const anyVisited = Object.values(progress).some((p) => p.visited)
  const recommendedId = anyVisited
    ? PARCOURS.map((p) => ({ id: p.id, score: overlapScore(p, progress) }))
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)[0]?.id
    : "decouverte-lycee"

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
            const isRecommended = !isActive && p.id === recommendedId
            return (
              <section key={p.id} className={isActive ? "border border-gilt/50 bg-gilt/[0.04] p-6" : isRecommended ? "border border-lapis/40 bg-lapis/[0.04] p-6" : "border border-gilt/20 p-6"}>
                <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
                  <h2 className="font-heading text-2xl text-gilt flex items-center gap-3">
                    {p.title}
                    {isRecommended && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-lapis-bright border border-lapis/40 px-2 py-0.5">
                        Recommandé pour toi
                      </span>
                    )}
                  </h2>
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
