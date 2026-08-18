import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

export interface CategoryItem {
  label: string
  category: string
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
 * Jeu de tri par categorie : cliquer un item puis la categorie a laquelle il
 * appartient. Une categorie prend un flash rouge en cas d'erreur, sans
 * reveler la bonne reponse.
 */
export function CategoryGame({ categories, items }: { categories: string[]; items: CategoryItem[] }) {
  const shuffledItems = useMemo(() => shuffled(items), [items])
  const [selected, setSelected] = useState<string | null>(null)
  const [solved, setSolved] = useState<Record<string, string>>({}) // item label -> category
  const [wrongCategory, setWrongCategory] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)

  const isDone = Object.keys(solved).length === items.length

  function pickItem(label: string) {
    if (wrongCategory || solved[label]) return
    setSelected(label)
  }

  function pickCategory(category: string) {
    if (!selected || wrongCategory) return
    setAttempts((n) => n + 1)
    const item = items.find((it) => it.label === selected)
    if (item && item.category === category) {
      setSolved((s) => ({ ...s, [selected]: category }))
      setSelected(null)
    } else {
      setWrongCategory(category)
      window.setTimeout(() => setWrongCategory(null), 550)
    }
  }

  function reset() {
    setSolved({})
    setSelected(null)
    setWrongCategory(null)
    setAttempts(0)
  }

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-10">
        {Object.keys(solved).length} / {items.length} classés · {attempts} essai{attempts !== 1 ? "s" : ""}
      </p>

      {isDone ? (
        <div className="border border-gilt/40 bg-gilt/[0.06] p-8 text-center">
          <p className="font-heading text-2xl mb-3">Partie terminée</p>
          <p className="text-parchment-dim mb-6">
            {items.length} éléments classés en {attempts} essai{attempts !== 1 ? "s" : ""}.
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
          <div className="flex flex-wrap gap-3">
            {shuffledItems.map(({ label }) => {
              const isSolved = Boolean(solved[label])
              const isSelected = selected === label
              return (
                <button
                  key={label}
                  type="button"
                  disabled={isSolved}
                  onClick={() => pickItem(label)}
                  className={cn(
                    "font-mono text-sm px-4 py-2 border transition-colors",
                    isSolved && "border-gilt/20 bg-gilt/[0.04] text-parchment-dim/40",
                    !isSolved && isSelected && "border-gilt bg-gilt/10 text-gilt",
                    !isSolved && !isSelected && "border-gilt/20 text-parchment hover:border-gilt/50",
                  )}
                >
                  {label}
                  {isSolved && <span className="ml-2 text-gilt/60">→ {solved[label]}</span>}
                </button>
              )
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => pickCategory(cat)}
                disabled={!selected}
                className={cn(
                  "text-left px-4 py-3 border transition-colors",
                  wrongCategory === cat && "border-oxblood bg-oxblood/10 text-oxblood-bright",
                  wrongCategory !== cat && selected && "border-lapis/50 text-parchment hover:bg-lapis/10",
                  wrongCategory !== cat && !selected && "border-gilt/15 text-parchment-dim/50",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
