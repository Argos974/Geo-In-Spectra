interface ActivityHeatmapProps {
  activeDates: string[] // YYYY-MM-DD
  weeks?: number
}

/**
 * Frise d'activité type "calendrier de contributions" — sur les N dernières
 * semaines, une case par jour, plus claire si une activité (visite/quiz/
 * exercice) a été enregistrée ce jour-là. Renforce la régularité, un signal
 * que ni Cours ni Méthodes ne portent.
 */
export function ActivityHeatmap({ activeDates, weeks = 18 }: ActivityHeatmapProps) {
  const active = new Set(activeDates)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const days: { date: string; active: boolean }[] = []
  const totalDays = weeks * 7
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const iso = d.toISOString().slice(0, 10)
    days.push({ date: iso, active: active.has(iso) })
  }

  const columns: { date: string; active: boolean }[][] = []
  for (let i = 0; i < days.length; i += 7) columns.push(days.slice(i, i + 7))

  const activeCount = activeDates.length

  return (
    <div className="border border-gilt/20 bg-canvas p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt">Activité récente</p>
        <p className="font-mono text-[10px] text-parchment-dim/80">{activeCount} jour{activeCount > 1 ? "s" : ""} au total</p>
      </div>
      <div className="flex gap-1 overflow-x-auto">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1">
            {col.map((d) => (
              <div
                key={d.date}
                title={d.date}
                className={d.active ? "w-3 h-3 bg-gilt" : "w-3 h-3 bg-gilt/10"}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
