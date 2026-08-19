import { useEffect } from "react"
import { X } from "lucide-react"
import type { Badge } from "@/lib/badges"
import { BadgeIcon } from "@/components/progression/BadgeIcon"
import { cn } from "@/lib/utils"

interface BadgeModalProps {
  badge: Badge
  onClose: () => void
}

/** Fenêtre pop-up de détail d'un badge — la barre de progression y vit, pas dans la grille (trop de badges pour l'afficher partout sans surcharger). */
export function BadgeModal({ badge, onClose }: BadgeModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const pct = Math.min(100, Math.round((badge.progress / badge.target) * 100))

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 backdrop-blur-sm px-6"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="badge-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm border border-gilt/30 bg-canvas p-7 text-center"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-3 right-3 text-parchment-dim hover:text-gilt transition-colors"
        >
          <X size={18} />
        </button>

        <BadgeIcon icon={badge.icon} earned={badge.earned} size="lg" />

        <p id="badge-modal-title" className={cn("font-heading text-2xl mt-5 mb-1", badge.earned ? "text-gilt" : "text-parchment")}>
          {badge.label}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/60 mb-5">
          {badge.earned ? "Acquis" : "Non acquis"}
        </p>

        <p className="text-parchment-dim text-sm mb-5 text-justify">{badge.detail}</p>

        <div className="text-left">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-parchment-dim/80 mb-1.5">
            <span>Progression</span>
            <span>{Math.min(badge.progress, badge.target)} / {badge.target}</span>
          </div>
          <div className="h-2 w-full bg-white/5 border border-gilt/15 overflow-hidden">
            <div
              className={cn("h-full transition-all", badge.earned ? "bg-gilt" : "bg-lapis-bright/70")}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
