import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Jeu de remise en ordre : les items sont donnes dans le bon ordre par le
 * module appelant, melanges a l'affichage. Le joueur clique dans l'ordre
 * qu'il pense correct ; un clic juste place l'item, un clic faux fait
 * clignoter en rouge sans rien reveler.
 */
export function SequenceGame({ items }: { items: string[] }) {
  const shuffledItems = useMemo(() => shuffled(items), [items])
  const [placed, setPlaced] = useState<string[]>([])
  const [wrongItem, setWrongItem] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)

  const isDone = placed.length === items.length
  const remaining = shuffledItems.filter((item) => !placed.includes(item))

  function pick(item: string) {
    if (wrongItem) return
    setAttempts((n) => n + 1)
    const expected = items[placed.length]
    if (item === expected) {
      setPlaced((p) => [...p, item])
    } else {
      setWrongItem(item)
      window.setTimeout(() => setWrongItem(null), 550)
    }
  }

  function reset() {
    setPlaced([])
    setWrongItem(null)
    setAttempts(0)
  }

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-10">
        {placed.length} / {items.length} placés · {attempts} essai{attempts !== 1 ? "s" : ""}
      </p>

      {isDone ? (
        <div className="border border-gilt/40 bg-gilt/[0.06] p-8 text-center">
          <p className="font-heading text-2xl mb-3">Partie terminée</p>
          <p className="text-parchment-dim mb-6">
            Ordre reconstitué en {attempts} essai{attempts !== 1 ? "s" : ""}.
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
        <div className="space-y-6">
          {placed.length > 0 && (
            <ol className="space-y-2">
              {placed.map((item, i) => (
                <li key={item} className="flex items-center gap-3 font-mono text-sm text-gilt border border-gilt/30 bg-gilt/[0.06] px-4 py-3">
                  <span className="text-gilt/60">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          )}
          <div className="space-y-3">
            {remaining.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => pick(item)}
                disabled={wrongItem !== null}
                className={cn(
                  "w-full text-left px-4 py-3 border transition-colors",
                  wrongItem === item ? "border-oxblood bg-oxblood/10 text-oxblood-bright" : "border-gilt/20 text-parchment hover:border-gilt/50",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
