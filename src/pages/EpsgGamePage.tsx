import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface Pair {
  code: string
  name: string
}

const PAIRS: Pair[] = [
  { code: "EPSG:4326", name: "WGS84 (géographique, degrés)" },
  { code: "EPSG:2154", name: "Lambert-93 (France métropolitaine)" },
  { code: "EPSG:3857", name: "Web Mercator (cartes web)" },
  { code: "EPSG:25831", name: "ETRS89 / UTM zone 31N (Europe de l'Ouest)" },
  { code: "EPSG:32633", name: "WGS84 / UTM zone 33N" },
  { code: "EPSG:27700", name: "OSGB36 / British National Grid" },
]

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function EpsgGamePage() {
  const codes = useMemo(() => shuffled(PAIRS.map((p) => p.code)), [])
  const names = useMemo(() => shuffled(PAIRS.map((p) => p.name)), [])

  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const [solved, setSolved] = useState<Set<string>>(new Set())
  const [wrongFlash, setWrongFlash] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const isDone = solved.size === PAIRS.length

  function pickCode(code: string) {
    if (solved.has(code) || wrongFlash) return
    setSelectedCode(code)
    if (selectedName) evaluate(code, selectedName)
  }

  function pickName(name: string) {
    if (wrongFlash) return
    const pair = PAIRS.find((p) => p.name === name)
    if (pair && solved.has(pair.code)) return
    setSelectedName(name)
    if (selectedCode) evaluate(selectedCode, name)
  }

  function evaluate(code: string, name: string) {
    setAttempts((n) => n + 1)
    const pair = PAIRS.find((p) => p.code === code)
    if (pair && pair.name === name) {
      setSolved((prev) => new Set(prev).add(code))
      setSelectedCode(null)
      setSelectedName(null)
    } else {
      setWrongFlash(true)
      window.setTimeout(() => {
        setWrongFlash(false)
        setSelectedCode(null)
        setSelectedName(null)
      }, 550)
    }
  }

  function reset() {
    setSolved(new Set())
    setSelectedCode(null)
    setSelectedName(null)
    setAttempts(0)
    setWrongFlash(false)
  }

  return (
    <div className="min-h-screen bg-ink text-parchment px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline">
          ← La galerie
        </Link>

        <p className="font-mono text-[12px] text-gilt mt-8">Jeu</p>
        <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-4">La Chasse aux EPSG</h1>
        <p className="text-parchment-dim text-lg mb-4">
          Associer chaque code EPSG à son système de coordonnées. Cliquer un code, puis le
          système correspondant.
        </p>
        <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/70 mb-10">
          {solved.size} / {PAIRS.length} trouvés · {attempts} essai{attempts !== 1 ? "s" : ""}
        </p>

        {isDone ? (
          <div className="border border-gilt/40 bg-gilt/[0.06] p-8 text-center">
            <p className="font-heading text-2xl mb-3">Partie terminée</p>
            <p className="text-parchment-dim mb-6">
              {PAIRS.length} paires trouvées en {attempts} essai{attempts !== 1 ? "s" : ""}.
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              {codes.map((code) => {
                const isSolved = solved.has(code)
                const isSelected = selectedCode === code
                return (
                  <button
                    key={code}
                    type="button"
                    disabled={isSolved}
                    onClick={() => pickCode(code)}
                    className={cn(
                      "w-full font-mono text-sm text-left px-4 py-3 border transition-colors",
                      isSolved && "border-gilt/20 bg-gilt/[0.04] text-parchment-dim/50",
                      !isSolved && isSelected && !wrongFlash && "border-gilt bg-gilt/10 text-gilt",
                      !isSolved && isSelected && wrongFlash && "border-oxblood bg-oxblood/10 text-oxblood",
                      !isSolved && !isSelected && "border-gilt/20 text-parchment hover:border-gilt/50",
                    )}
                  >
                    {code}
                  </button>
                )
              })}
            </div>
            <div className="space-y-3">
              {names.map((name) => {
                const pair = PAIRS.find((p) => p.name === name)!
                const isSolved = solved.has(pair.code)
                const isSelected = selectedName === name
                return (
                  <button
                    key={name}
                    type="button"
                    disabled={isSolved}
                    onClick={() => pickName(name)}
                    className={cn(
                      "w-full text-sm text-left px-4 py-3 border transition-colors",
                      isSolved && "border-gilt/20 bg-gilt/[0.04] text-parchment-dim/50",
                      !isSolved && isSelected && !wrongFlash && "border-gilt bg-gilt/10 text-gilt",
                      !isSolved && isSelected && wrongFlash && "border-oxblood bg-oxblood/10 text-oxblood",
                      !isSolved && !isSelected && "border-gilt/20 text-parchment-dim hover:border-gilt/50",
                    )}
                  >
                    {name}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
