import { Rocket, Compass, Trophy, Star, ShieldCheck, Target, Flame, BookOpen, GraduationCap, Microscope, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const ICONS: Record<string, LucideIcon> = {
  Rocket,
  Compass,
  Trophy,
  Star,
  ShieldCheck,
  Target,
  Flame,
  BookOpen,
  GraduationCap,
  Microscope,
}

interface BadgeIconProps {
  icon: string
  earned: boolean
  size?: "sm" | "lg"
}

/**
 * Écusson héraldique (silhouette de blason en clip-path, pas un simple cercle
 * ou carré) portant l'icône du badge — gravé plein or une fois acquis,
 * simple contour terne sinon. `size="lg"` pour la fenêtre pop-up de détail.
 */
export function BadgeIcon({ icon, earned, size = "sm" }: BadgeIconProps) {
  const Icon = ICONS[icon] ?? Star
  const dims = size === "lg" ? "w-20 h-24" : "w-11 h-[3.25rem]"
  const iconSize = size === "lg" ? 34 : 20

  return (
    <div
      className={cn(dims, "relative mx-auto shrink-0")}
      style={{ clipPath: "polygon(50% 0%, 100% 16%, 100% 58%, 50% 100%, 0% 58%, 0% 16%)" }}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center border",
          earned ? "bg-gradient-to-b from-gilt/30 to-gilt/5 border-gilt/60" : "bg-white/[0.02] border-gilt/15",
        )}
      >
        <Icon size={iconSize} strokeWidth={1.75} className={earned ? "text-gilt-bright" : "text-parchment-dim/50"} />
      </div>
    </div>
  )
}
