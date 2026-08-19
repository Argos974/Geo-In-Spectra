import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { modules } from "@/data/modules"
import { quizzes } from "@/data/quizzes"
import { artworks } from "@/data/artworks"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { getProgress, resetProgress, getActivityDates, exportProgress, importProgress, type ModuleProgress } from "@/lib/progress"
import { computeBadges } from "@/lib/badges"
import { cn } from "@/lib/utils"
import { CompetencyRadar } from "@/components/progression/CompetencyRadar"
import { ActivityHeatmap } from "@/components/progression/ActivityHeatmap"
import { PersonalGoals } from "@/components/progression/PersonalGoals"
import { Recommendations } from "@/components/progression/Recommendations"
import { BadgeList } from "@/components/progression/BadgeList"

/**
 * Bilan cumulé, entièrement local (localStorage, rien n'est envoyé à un
 * serveur — le site n'a pas de compte utilisateur). Trois signaux simples
 * par salle : visitée, score au quiz (meilleur essai gardé), exercices
 * consultés. Un signal grossier délibérément — pas un LMS avec suivi fin
 * par séance, juste de quoi voir d'un coup d'œil ce qui reste à faire.
 * Export/Import JSON (exportProgress/importProgress, lib/progress.ts) seul
 * moyen de faire suivre ce bilan d'un appareil/navigateur à l'autre, faute
 * de compte — écrase le bilan local à l'import, ne fusionne pas.
 */
export function BilanPage() {
  const art = artworks["discipulus-progression"]
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>(() => getProgress())
  const [importFeedback, setImportFeedback] = useState<"ok" | "error" | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleReset() {
    resetProgress()
    setProgress({})
  }

  function handleExport() {
    const blob = new Blob([exportProgress()], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `geo-in-spectra-bilan-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportClick() {
    fileInputRef.current?.click()
  }

  // Écrase le bilan actuel par le fichier importé — pas de fusion (une fusion
  // silencieuse entre deux historiques quizHistory/reviewQueue distincts serait
  // plus trompeuse qu'utile) : le cas d'usage visé est "je change d'appareil",
  // pas "je combine deux profils".
  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const ok = importProgress(String(reader.result ?? ""))
      setImportFeedback(ok ? "ok" : "error")
      if (ok) setProgress(getProgress())
    }
    reader.readAsText(file)
  }

  const total = modules.length
  const visitedCount = modules.filter((m) => progress[m.slug]?.visited).length
  const quizDoneCount = modules.filter((m) => progress[m.slug]?.quizScore).length
  const exercisesDoneCount = modules.filter((m) => progress[m.slug]?.exercisesVisited).length
  const overallPct = Math.round(((visitedCount + quizDoneCount + exercisesDoneCount) / (total * 3)) * 100)
  const activityDates = getActivityDates()
  const badges = computeBadges(progress)

  return (
    <div className="print-page min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} figure="XI" className="h-[70vh] min-h-[480px] w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-16 max-w-3xl">
            <Link to="/discipulus" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline w-fit mb-8">
              ← Discipulus
            </Link>
            <p className="font-mono text-[12px] text-gilt mb-3">Discipulus</p>
            <h1 className="font-heading text-4xl md:text-5xl mb-4">Progression</h1>
            <p className="font-body italic text-parchment-dim leading-relaxed text-justify border-l-2 border-gilt/30 pl-4">
              Suivi entièrement local : ce bilan est stocké uniquement dans ton navigateur (localStorage), rien
              n'est envoyé ni conservé ailleurs. Il se réinitialise si tu vides les données du site — exporte-le
              (bouton ci-dessous) avant de changer de navigateur/appareil, et réimporte-le une fois là-bas.
            </p>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-gilt/20 bg-gilt/[0.04] px-6 py-5 mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-1">Avancement global</p>
            <p className="font-heading text-3xl">{overallPct}%</p>
          </div>
          <div className="print:hidden flex flex-wrap items-center gap-2">
            <Link
              to="/discipulus/revision"
              className="font-mono text-[10px] uppercase tracking-wider text-lapis-bright border border-lapis/40 px-3 py-2 hover:bg-lapis/10 transition-colors"
            >
              Réviser mes erreurs
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="font-mono text-[10px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-2 hover:bg-gilt/10 transition-colors"
            >
              Imprimer / PDF
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="font-mono text-[10px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-2 hover:bg-gilt/10 transition-colors"
            >
              Exporter (JSON)
            </button>
            <button
              type="button"
              onClick={handleImportClick}
              className="font-mono text-[10px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-2 hover:bg-gilt/10 transition-colors"
            >
              Importer
            </button>
            <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImportFile} className="hidden" />
            <button
              type="button"
              onClick={handleReset}
              className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim border border-gilt/15 px-3 py-2 hover:text-oxblood-bright hover:border-oxblood/40 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {importFeedback && (
          <p className={cn("print:hidden font-mono text-[11px] mb-6 -mt-6", importFeedback === "ok" ? "text-gilt" : "text-oxblood-bright")}>
            {importFeedback === "ok" ? "Bilan importé avec succès." : "Fichier invalide — import ignoré, ton bilan actuel n'a pas été modifié."}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <CompetencyRadar progress={progress} />
          <div className="flex flex-col gap-6">
            <ActivityHeatmap activeDates={activityDates} />
            <Recommendations progress={progress} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <BadgeList badges={badges} />
          <PersonalGoals />
        </div>

        <table className="w-full text-sm border border-gilt/20 bg-canvas">
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
                    {m.slug === "travaux-pratiques" && (
                      <span className="block mt-1">
                        <Link
                          to="/magister/cours"
                          className="inline-block font-mono text-[9px] uppercase tracking-wider text-lapis-bright border border-lapis/40 px-1.5 py-0.5 hover:bg-lapis/10 transition-colors"
                        >
                          Espace Magister →
                        </Link>
                      </span>
                    )}
                    {m.slug === "methodologie" && (
                      <span className="block mt-1">
                        <Link
                          to="/discipulus/methodes"
                          className="inline-block font-mono text-[9px] uppercase tracking-wider text-lapis-bright border border-lapis/40 px-1.5 py-0.5 hover:bg-lapis/10 transition-colors"
                        >
                          Espace Méthodes →
                        </Link>
                      </span>
                    )}
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
    </div>
  )
}
