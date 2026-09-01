import { useState } from "react"
import { hasSeenLevelIntro, markLevelIntroSeen } from "@/lib/onboarding"

/**
 * Affiché une seule fois (marqueur localStorage, voir lib/onboarding.ts) en
 * tête de Cours/Atelier : un élève déjà inscrit avant le passage à un
 * sélecteur de piste exclusif retrouvait un comportement différent de
 * l'ancien filtre cumulable (cocher plusieurs niveaux à la fois) sans y avoir
 * été préparé — la bascule automatique de piste depuis la recherche réduit la
 * confusion, mais n'explique rien la première fois qu'on l'observe.
 */
export function LevelIntroBanner() {
  const [visible, setVisible] = useState(() => !hasSeenLevelIntro())
  if (!visible) return null

  function dismiss() {
    markLevelIntroSeen()
    setVisible(false)
  }

  return (
    <div className="print:hidden flex items-start gap-4 border border-gilt/30 bg-gilt/[0.05] px-5 py-4 mb-10">
      <p className="flex-1 text-sm text-parchment-dim leading-relaxed">
        <span className="font-mono text-[10px] uppercase tracking-wider text-gilt mr-2">Nouveau</span>
        Chaque salle propose désormais 3 parcours complets et indépendants (Lycée, Licence/BUT, Master/Recherche) plutôt que des niveaux à cumuler : choisis le tien dans le filtre « Afficher », il reste mémorisé d'une salle à l'autre.
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-1.5 hover:bg-gilt/10 transition-colors"
      >
        Compris
      </button>
    </div>
  )
}
