import { Link } from "react-router-dom"
import { modules } from "@/data/modules"
import type { ModuleProgress } from "@/lib/progress"

interface RecommendationsProps {
  progress: Record<string, ModuleProgress>
}

/**
 * Recommandations — logique pure, aucun nouveau stockage : repère la
 * prochaine salle jamais visitée et, parmi les salles déjà visitées, celle
 * au score de quiz le plus faible. Relie Progression → Cours/Méthodes par un
 * lien, sans dupliquer leur contenu ici.
 */
export function Recommendations({ progress }: RecommendationsProps) {
  const nextUnvisited = modules.find((m) => !progress[m.slug]?.visited)

  const weakest = modules
    .filter((m) => progress[m.slug]?.quizScore)
    .map((m) => ({ module: m, pct: progress[m.slug]!.quizScore!.score / progress[m.slug]!.quizScore!.total }))
    .sort((a, b) => a.pct - b.pct)[0]

  if (!nextUnvisited && !weakest) return null

  return (
    <div className="border border-gilt/20 bg-canvas p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt mb-4">Recommandé pour toi</p>
      <div className="flex flex-col gap-4">
        {nextUnvisited && (
          <p className="text-sm text-parchment-dim">
            Pas encore explorée : <Link to={`/module/${nextUnvisited.slug}`} className="text-gilt underline underline-offset-2 hover:text-gilt-bright">{nextUnvisited.title}</Link>
          </p>
        )}
        {weakest && weakest.pct < 0.7 && (
          <p className="text-sm text-parchment-dim">
            À consolider ({Math.round(weakest.pct * 100)}% au quiz) : <Link to={`/module/${weakest.module.slug}`} className="text-gilt underline underline-offset-2 hover:text-gilt-bright">{weakest.module.title}</Link>, puis{" "}
            <Link to="/discipulus/methodes" className="text-lapis-bright underline underline-offset-2 hover:text-gilt-bright">une fiche méthode</Link> pour retravailler la restitution.
          </p>
        )}
      </div>
    </div>
  )
}
