import { useState } from "react"
import type { Badge } from "@/lib/badges"
import { BadgeIcon } from "@/components/progression/BadgeIcon"
import { BadgeModal } from "@/components/progression/BadgeModal"
import { cn } from "@/lib/utils"

export function BadgeList({ badges }: { badges: Badge[] }) {
  const earnedCount = badges.filter((b) => b.earned).length
  const [selected, setSelected] = useState<Badge | null>(null)

  return (
    <div className="border border-gilt/20 bg-canvas p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt">Badges</p>
        <p className="font-mono text-[10px] text-parchment-dim/60">{earnedCount} / {badges.length}</p>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {badges.map((b) => (
          <li key={b.id}>
            <button
              type="button"
              onClick={() => setSelected(b)}
              title={b.detail}
              className={cn(
                "w-full border px-3 py-3 text-center transition-colors",
                b.earned ? "border-gilt/40 bg-gilt/[0.08] hover:bg-gilt/[0.12]" : "border-gilt/10 opacity-50 hover:opacity-80",
              )}
            >
              <BadgeIcon icon={b.icon} earned={b.earned} />
              <p className={cn("font-mono text-[10px] uppercase tracking-wider mt-2", b.earned ? "text-gilt" : "text-parchment-dim")}>
                {b.label}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {selected && <BadgeModal badge={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
