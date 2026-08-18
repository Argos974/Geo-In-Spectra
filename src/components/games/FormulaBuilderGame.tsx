import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

export interface FormulaChallenge {
  name: string
  tokens: string[]
  distractors: string[]
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
 * Construction de formule : contrairement a un jeu d'appariement, le pool de
 * tuiles contient de vrais leurres (bandes/operateurs qui n'appartiennent pas
 * a la formule cible) — reconnaitre et ecarter un leurre fait partie du jeu,
 * pas seulement retrouver le bon ordre d'un ensemble deja correct.
 */
export function FormulaBuilderGame({ challenges }: { challenges: FormulaChallenge[] }) {
  const [round, setRound] = useState(0)
  const [built, setBuilt] = useState<string[]>([])
  const [wrongTile, setWrongTile] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [roundsDone, setRoundsDone] = useState(0)

  const challenge = challenges[round]
  const pool = useMemo(
    () => (challenge ? shuffled(challenge.tokens.map((t, i) => `${t}#${i}`).concat(challenge.distractors.map((t, i) => `${t}#d${i}`))) : []),
    [challenge],
  )
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set())

  const isRoundDone = challenge ? built.length === challenge.tokens.length : false
  const isGameDone = roundsDone === challenges.length

  function pick(tileId: string, label: string) {
    if (wrongTile || !challenge) return
    setAttempts((n) => n + 1)
    const expected = challenge.tokens[built.length]
    if (label === expected) {
      setBuilt((b) => [...b, label])
      setUsedIds((s) => new Set(s).add(tileId))
      if (built.length + 1 === challenge.tokens.length) {
        window.setTimeout(() => {
          setRoundsDone((n) => n + 1)
          setRound((r) => r + 1)
          setBuilt([])
          setUsedIds(new Set())
        }, 700)
      }
    } else {
      setWrongTile(tileId)
      window.setTimeout(() => setWrongTile(null), 550)
    }
  }

  function reset() {
    setRound(0)
    setBuilt([])
    setUsedIds(new Set())
    setWrongTile(null)
    setAttempts(0)
    setRoundsDone(0)
  }

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-10">
        Formule {Math.min(round + 1, challenges.length)} / {challenges.length} · {attempts} essai{attempts !== 1 ? "s" : ""}
      </p>

      {isGameDone ? (
        <div className="border border-gilt/40 bg-gilt/[0.06] p-8 text-center">
          <p className="font-heading text-2xl mb-3">Partie terminée</p>
          <p className="text-parchment-dim mb-6">
            {challenges.length} formules construites en {attempts} essai{attempts !== 1 ? "s" : ""}.
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
        <div className="space-y-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-3">Construis : {challenge.name}</p>
            <div className="border border-gilt/30 bg-gilt/[0.06] px-5 py-4 min-h-[4rem] flex items-center flex-wrap gap-2 font-mono text-lg text-parchment">
              {built.length === 0 && <span className="text-parchment-dim/80 text-sm">Clique les tuiles ci-dessous, dans l'ordre.</span>}
              {built.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {pool.map((tile) => {
              const [label, id] = [tile.split("#")[0], tile]
              const used = usedIds.has(id)
              return (
                <button
                  key={id}
                  type="button"
                  disabled={used || isRoundDone}
                  onClick={() => pick(id, label)}
                  className={cn(
                    "font-mono text-base px-4 py-2 border transition-colors",
                    used && "border-gilt/20 bg-gilt/[0.04] text-parchment-dim/30",
                    !used && wrongTile === id && "border-oxblood bg-oxblood/10 text-oxblood-bright",
                    !used && wrongTile !== id && "border-gilt/20 text-parchment hover:border-gilt/50",
                  )}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
