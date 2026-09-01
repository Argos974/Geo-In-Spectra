import { modules } from "@/data/modules"
import { COURS_SLUGS } from "@/lib/moduleRoute"
import { LEVEL_TOGGLE_LABEL } from "@/lib/levelFilter"
import type { ModuleProgress } from "@/lib/progress"
import type { ContentLevel } from "@/content/types"

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
/**
 * Salles à 3 pistes indépendantes (les 12 salles de Cours) — "visité" au sens
 * de ModuleProgress.visited ne dit qu'"au moins une piste vue" ; ces badges
 * comptent une piste précise sur les 12, seule mesure fidèle à ce qu'une
 * salle à 3 pistes veut réellement dire "terminée" à ce niveau.
 */
const LEVELED_SLUGS = [...COURS_SLUGS]

function countTrackCompletion(progress: Record<string, ModuleProgress>, level: ContentLevel): number {
  return LEVELED_SLUGS.filter((slug) => progress[slug]?.visitedLevels?.includes(level)).length
}

export function computeBadges(progress: Record<string, ModuleProgress>): Badge[] {
  const visitedCount = modules.filter((m) => progress[m.slug]?.visited).length
  const quizzesTaken = Object.values(progress).filter((p) => p.quizScore).length
  const perfectQuizzes = Object.values(progress).filter((p) => p.quizScore && p.quizScore.score === p.quizScore.total).length
  const exercisesDone = Object.values(progress).filter((p) => p.exercisesVisited).length
  const totalAttempts = Object.values(progress).reduce((n, p) => n + (p.quizHistory?.length ?? 0), 0)
  const lyceeCount = countTrackCompletion(progress, "lycee")
  const licenceCount = countTrackCompletion(progress, "superieur")
  const masterCount = countTrackCompletion(progress, "approfondissement")

  const explorerTarget = Math.max(5, Math.ceil(modules.length * 0.6))
  const rigueurTarget = Math.max(3, Math.ceil(modules.length * 0.4))
  const exercisesTarget = Math.max(5, Math.ceil(modules.length * 0.6))
  const persistentTarget = 12
  const trackTarget = LEVELED_SLUGS.length

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
    {
      id: "track-lycee",
      label: `Piste ${LEVEL_TOGGLE_LABEL.lycee} complète`,
      detail: `Ouvrir la piste ${LEVEL_TOGGLE_LABEL.lycee} des ${trackTarget} salles de Cours.`,
      earned: lyceeCount >= trackTarget,
      icon: "BookOpen",
      progress: lyceeCount,
      target: trackTarget,
    },
    {
      id: "track-licence",
      label: `Piste ${LEVEL_TOGGLE_LABEL.superieur} complète`,
      detail: `Ouvrir la piste ${LEVEL_TOGGLE_LABEL.superieur} des ${trackTarget} salles de Cours.`,
      earned: licenceCount >= trackTarget,
      icon: "GraduationCap",
      progress: licenceCount,
      target: trackTarget,
    },
    {
      id: "track-master",
      label: `Piste ${LEVEL_TOGGLE_LABEL.approfondissement} complète`,
      detail: `Ouvrir la piste ${LEVEL_TOGGLE_LABEL.approfondissement} des ${trackTarget} salles de Cours.`,
      earned: masterCount >= trackTarget,
      icon: "Microscope",
      progress: masterCount,
      target: trackTarget,
    },
  ]
}
