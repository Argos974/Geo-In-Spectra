import { modules } from "@/data/modules"
import type { ModuleProgress } from "@/lib/progress"

export interface Badge {
  id: string
  label: string
  detail: string
  earned: boolean
  /** Icône lucide-react à afficher dans l'écusson (voir BadgeIcon). */
  icon: string
  /** Progression actuelle vers le seuil (peut dépasser `target` une fois le badge acquis). */
  progress: number
  /** Seuil à atteindre pour obtenir le badge. */
  target: number
}

/**
 * Badges dérivés uniquement de getProgress() — aucun nouveau stockage requis
 * (pas de "vu/pas vu" persisté : recalculé à chaque rendu, coût négligeable
 * vu le nombre de modules).
 *
 * Seuils volontairement proportionnels à `modules.length` (14 salles au
 * moment de ce calibrage) plutôt que des constantes figées à l'ancienne
 * taille du site (5/3/3/5 sur 10 salles) — sinon un badge "Explorateur"
 * obtenu après 5 salles sur 14 se gagne en une session et perd tout son rôle
 * de jalon. `progress`/`target` exposés (pas juste `earned`) pour la barre de
 * progression affichée au clic (voir BadgeModal).
 */
export function computeBadges(progress: Record<string, ModuleProgress>): Badge[] {
  const visitedCount = modules.filter((m) => progress[m.slug]?.visited).length
  const quizzesTaken = Object.values(progress).filter((p) => p.quizScore).length
  const perfectQuizzes = Object.values(progress).filter((p) => p.quizScore && p.quizScore.score === p.quizScore.total).length
  const exercisesDone = Object.values(progress).filter((p) => p.exercisesVisited).length
  const totalAttempts = Object.values(progress).reduce((n, p) => n + (p.quizHistory?.length ?? 0), 0)

  const explorerTarget = Math.max(5, Math.ceil(modules.length * 0.6))
  const rigueurTarget = Math.max(3, Math.ceil(modules.length * 0.4))
  const exercisesTarget = Math.max(5, Math.ceil(modules.length * 0.6))
  const persistentTarget = 12

  return [
    {
      id: "first-quiz",
      label: "Premier quiz",
      detail: "Terminer un quiz, quel que soit le score.",
      earned: quizzesTaken >= 1,
      icon: "Rocket",
      progress: Math.min(quizzesTaken, 1),
      target: 1,
    },
    {
      id: "five-visited",
      label: "Explorateur",
      detail: `Visiter ${explorerTarget} salles sur ${modules.length}.`,
      earned: visitedCount >= explorerTarget,
      icon: "Compass",
      progress: visitedCount,
      target: explorerTarget,
    },
    {
      id: "all-visited",
      label: "Toutes les salles",
      detail: `Visiter les ${modules.length} salles.`,
      earned: visitedCount >= modules.length,
      icon: "Trophy",
      progress: visitedCount,
      target: modules.length,
    },
    {
      id: "perfect",
      label: "Sans faute",
      detail: "Obtenir un score parfait à un quiz.",
      earned: perfectQuizzes >= 1,
      icon: "Star",
      progress: Math.min(perfectQuizzes, 1),
      target: 1,
    },
    {
      id: "three-perfect",
      label: "Rigueur",
      detail: `${rigueurTarget} quiz sans faute.`,
      earned: perfectQuizzes >= rigueurTarget,
      icon: "ShieldCheck",
      progress: perfectQuizzes,
      target: rigueurTarget,
    },
    {
      id: "exercises",
      label: "Sur le terrain",
      detail: `Consulter les exercices d'au moins ${exercisesTarget} salles.`,
      earned: exercisesDone >= exercisesTarget,
      icon: "Target",
      progress: exercisesDone,
      target: exercisesTarget,
    },
    {
      id: "persistent",
      label: "Persévérance",
      detail: `Retenter un quiz jusqu'à ${persistentTarget} tentatives au total.`,
      earned: totalAttempts >= persistentTarget,
      icon: "Flame",
      progress: totalAttempts,
      target: persistentTarget,
    },
  ]
}
