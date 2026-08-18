import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { modules } from "@/data/modules"
import { quizzes } from "@/data/quizzes"
import { getProgress, resetProgress, type ModuleProgress } from "@/lib/progress"
import { cn } from "@/lib/utils"

/**
 * Bilan cumulé, entièrement local (localStorage, rien n'est envoyé à un
 * serveur — le site n'a pas de compte utilisateur). Trois signaux simples
 * par salle : visitée, score au quiz (meilleur essai gardé), exercices
 * consultés. Un signal grossier délibérément — pas un LMS avec suivi fin
 * par séance, juste de quoi voir d'un coup d'œil ce qui reste à faire.
 */
export function BilanPage() {
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({})

  useEffect(() => {
    setProgress(getProgress())
  }, [])

  function handleReset() {
    resetProgress()
    setProgress({})
  }

  const total = modules.length
  const visitedCount = modules.filter((m) => progress[m.slug]?.visited).length
  const quizDoneCount = modules.filter((m) => progress[m.slug]?.quizScore).length
  const exercisesDoneCount = modules.filter((m) => progress[m.slug]?.exercisesVisited).length
  const overallPct = Math.round(((visitedCount + quizDoneCount + exercisesDoneCount) / (total * 3)) * 100)

  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← La galerie
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Ressources</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">Bilan de progression</h1>
        <p className="text-parchment-dim text-lg mb-4 text-justify">
          Suivi entièrement local : ce bilan est stocké uniquement dans ton navigateur (localStorage), rien n'est envoyé
          ni conservé ailleurs. Il se réinitialise si tu vides les données du site ou changes de navigateur/appareil.
        </p>

        <div className="flex items-center justify-between border border-gilt/20 bg-gilt/[0.04] px-6 py-5 mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-1">Avancement global</p>
            <p className="font-heading text-3xl">{overallPct}%</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim border border-gilt/15 px-3 py-2 hover:text-oxblood-bright hover:border-oxblood/40 transition-colors"
          >
            Réinitialiser
          </button>
        </div>

        <table className="w-full text-sm border border-gilt/20">
          <thead>
            <tr className="border-b border-gilt/20 font-mono text-[10px] uppercase tracking-wider text-parchment-dim/80">
              <th className="text-left px-4 py-3">Salle</th>
              <th className="text-center px-4 py-3">Visitée</th>
              <th className="text-center px-4 py-3">Quiz (meilleur score)</th>
              <th className="text-center px-4 py-3">Exercices</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((m) => {
              const p = progress[m.slug]
              const quizTotal = quizzes[m.slug]?.length
              return (
                <tr key={m.slug} className="border-b border-gilt/10 last:border-b-0">
                  <td className="px-4 py-3">
                    <Link to={`/module/${m.slug}`} className="text-parchment hover:text-gilt transition-colors">
                      {m.title}
                    </Link>
                  </td>
                  <td className="text-center px-4 py-3">
                    <span className={cn("font-mono", p?.visited ? "text-gilt" : "text-parchment-dim/80")}>{p?.visited ? "✓" : "–"}</span>
                  </td>
                  <td className="text-center px-4 py-3 font-mono">
                    {p?.quizScore ? (
                      <span className={p.quizScore.score === p.quizScore.total ? "text-gilt" : "text-parchment-dim"}>
                        {p.quizScore.score} / {p.quizScore.total}
                      </span>
                    ) : (
                      <span className="text-parchment-dim/80">{quizTotal ? `– / ${quizTotal}` : "–"}</span>
                    )}
                  </td>
                  <td className="text-center px-4 py-3">
                    <span className={cn("font-mono", p?.exercisesVisited ? "text-gilt" : "text-parchment-dim/80")}>{p?.exercisesVisited ? "✓" : "–"}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <p className="font-mono text-[11px] text-parchment-dim/80 mt-6">
          Pas encore de salle visitée ? <Link to="/parcours" className="text-gilt underline underline-offset-2 hover:text-gilt-bright">Voir les parcours conseillés</Link> pour savoir par où commencer.
        </p>
      </div>
    </div>
  )
}
