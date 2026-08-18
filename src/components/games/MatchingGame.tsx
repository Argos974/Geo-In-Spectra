import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

export interface MatchingPair {
  left: string
  right: string
}

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Jeu d'association générique (gauche ↔ droite) — extrait de l'ancienne
 * Chasse aux EPSG pour être réutilisé par une salle du site. Chaque salle
 * fournit ses propres paires via src/data/games.ts ; ce composant ne connaît
 * rien du domaine (EPSG, indices, opérations spatiales…).
 */
export function MatchingGame({ pairs }: { pairs: MatchingPair[] }) {
  const lefts = useMemo(() => shuffled(pairs.map((p) => p.left)), [pairs])
  const rights = useMemo(() => shuffled(pairs.map((p) => p.right)), [pairs])

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [selectedRight, setSelectedRight] = useState<string | null>(null)
  const [solved, setSolved] = useState<Set<string>>(new Set())
  const [wrongFlash, setWrongFlash] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const isDone = solved.size === pairs.length

  function pickLeft(left: string) {
    if (solved.has(left) || wrongFlash) return
    setSelectedLeft(left)
    if (selectedRight) evaluate(left, selectedRight)
  }

  function pickRight(right: string) {
    if (wrongFlash) return
    const pair = pairs.find((p) => p.right === right)
    if (pair && solved.has(pair.left)) return
    setSelectedRight(right)
    if (selectedLeft) evaluate(selectedLeft, right)
  }

  function evaluate(left: string, right: string) {
    setAttempts((n) => n + 1)
    const pair = pairs.find((p) => p.left === left)
    if (pair && pair.right === right) {
      setSolved((s) => new Set(s).add(left))
      setSelectedLeft(null)
      setSelectedRight(null)
    } else {
      setWrongFlash(true)
      window.setTimeout(() => {
        setWrongFlash(false)
        setSelectedLeft(null)
        setSelectedRight(null)
      }, 550)
    }
  }

  function reset() {
    setSolved(new Set())
    setSelectedLeft(null)
    setSelectedRight(null)
    setAttempts(0)
    setWrongFlash(false)
  }

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-10">
        {solved.size} / {pairs.length} trouvés · {attempts} essai{attempts !== 1 ? "s" : ""}
      </p>

      {isDone ? (
        <div className="border border-gilt/40 bg-gilt/[0.06] p-8 text-center">
          <p className="font-heading text-2xl mb-3">Partie terminée</p>
          <p className="text-parchment-dim mb-6">
            {pairs.length} paires trouvées en {attempts} essai{attempts !== 1 ? "s" : ""}.
          </p>
          <button
            type="button"
            onClick={reset}
            className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-4 py-2 hover:bg-gilt/10 transition-colors"
          >
            Rejouer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            {lefts.map((left) => {
              const isSolved = solved.has(left)
              const isSelected = selectedLeft === left
              return (
                <button
                  key={left}
                  type="button"
                  disabled={isSolved}
                  onClick={() => pickLeft(left)}
                  className={cn(
                    "w-full font-mono text-sm text-left px-4 py-3 border transition-colors",
                    isSolved && "border-gilt/20 bg-gilt/[0.04] text-parchment-dim/50",
                    !isSolved && isSelected && !wrongFlash && "border-gilt bg-gilt/10 text-gilt",
                    !isSolved && isSelected && wrongFlash && "border-oxblood bg-oxblood/10 text-oxblood-bright",
                    !isSolved && !isSelected && "border-gilt/20 text-parchment hover:border-gilt/50",
                  )}
                >
                  {left}
                </button>
              )
            })}
          </div>
          <div className="space-y-3">
            {rights.map((right) => {
              const pair = pairs.find((p) => p.right === right)!
              const isSolved = solved.has(pair.left)
              const isSelected = selectedRight === right
              return (
                <button
                  key={right}
                  type="button"
                  disabled={isSolved}
                  onClick={() => pickRight(right)}
                  className={cn(
                    "w-full text-sm text-left px-4 py-3 border transition-colors",
                    isSolved && "border-gilt/20 bg-gilt/[0.04] text-parchment-dim/50",
                    !isSolved && isSelected && !wrongFlash && "border-gilt bg-gilt/10 text-gilt",
                    !isSolved && isSelected && wrongFlash && "border-oxblood bg-oxblood/10 text-oxblood-bright",
                    !isSolved && !isSelected && "border-gilt/20 text-parchment-dim hover:border-gilt/50",
                  )}
                >
                  {right}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
