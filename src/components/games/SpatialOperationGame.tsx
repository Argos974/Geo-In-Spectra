import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

// Deux rectangles fixes ("parcelle A" et "zone tampon B") qui se chevauchent
// partiellement — les memes deux formes servent de base a toutes les
// questions, seule l'operation demandee change le resultat attendu. Chemins
// calcules a la main a partir des coordonnees des deux rectangles (pas de
// bibliotheque de geometrie : les deux formes sont simples et fixes).
const A = { x0: 20, y0: 20, x1: 100, y1: 80 }
const B = { x0: 60, y0: 50, x1: 140, y1: 110 }

const RECT_A = `M${A.x0},${A.y0} L${A.x1},${A.y0} L${A.x1},${A.y1} L${A.x0},${A.y1} Z`
const RECT_B = `M${B.x0},${B.y0} L${B.x1},${B.y0} L${B.x1},${B.y1} L${B.x0},${B.y1} Z`
const INTERSECTION = `M60,50 L100,50 L100,80 L60,80 Z`
const UNION = `M20,20 L100,20 L100,50 L140,50 L140,110 L60,110 L60,80 L20,80 Z`
const DIFF_A_MINUS_B = `M20,20 L100,20 L100,50 L60,50 L60,80 L20,80 Z`
const DIFF_B_MINUS_A = `M100,50 L140,50 L140,110 L60,110 L60,80 L100,80 Z`

type ShapeKey = "A" | "B" | "raw" | "intersection" | "union" | "diffAB" | "diffBA" | "symdiff"

// Chaque choix ne rend qu'un pictogramme SVG (ShapeThumb), sans aucun texte —
// un bouton sans nom accessible pour un lecteur d'écran (audit axe-core,
// button-name). Décrit la géométrie affichée, pas la réponse attendue : ce
// label reste valable même quand ce choix est un distracteur, pas la bonne
// réponse à cette question précise.
const SHAPE_KEY_LABEL: Record<ShapeKey, string> = {
  A: "Forme A seule",
  B: "Forme B seule",
  raw: "Formes A et B superposées, sans opération appliquée",
  intersection: "Intersection de A et B",
  union: "Union de A et B",
  diffAB: "Différence A moins B",
  diffBA: "Différence B moins A",
  symdiff: "Différence symétrique de A et B",
}

const SHAPE_PATHS: Record<ShapeKey, string[]> = {
  A: [RECT_A],
  B: [RECT_B],
  raw: [RECT_A, RECT_B],
  intersection: [INTERSECTION],
  union: [UNION],
  diffAB: [DIFF_A_MINUS_B],
  diffBA: [DIFF_B_MINUS_A],
  symdiff: [DIFF_A_MINUS_B, DIFF_B_MINUS_A],
}

function ShapeThumb({ shapeKey, highlight }: { shapeKey: ShapeKey; highlight?: "correct" | "wrong" }) {
  const paths = SHAPE_PATHS[shapeKey]
  const color = highlight === "wrong" ? "rgb(var(--color-oxblood))" : "rgb(var(--color-gilt))"
  const stroke = color
  const fill = color
  return (
    <svg viewBox="0 0 160 130" className="w-full h-24">
      <rect x={A.x0} y={A.y0} width={A.x1 - A.x0} height={A.y1 - A.y0} fill="none" stroke="rgb(var(--color-parchment-dim))" strokeWidth={1} strokeDasharray="3,3" />
      <rect x={B.x0} y={B.y0} width={B.x1 - B.x0} height={B.y1 - B.y0} fill="none" stroke="rgb(var(--color-parchment-dim))" strokeWidth={1} strokeDasharray="3,3" />
      {paths.map((d, i) => (
        <path key={i} d={d} fill={fill} fillOpacity={0.35} stroke={stroke} strokeWidth={2} />
      ))}
    </svg>
  )
}

interface OperationQuestion {
  label: string
  correct: ShapeKey
  choices: ShapeKey[]
}

const ALL_SHAPES: ShapeKey[] = ["A", "B", "raw", "intersection", "union", "diffAB", "diffBA", "symdiff"]

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions(): OperationQuestion[] {
  const defs: { label: string; correct: ShapeKey }[] = [
    { label: "Intersection(A, B)", correct: "intersection" },
    { label: "Union(A, B)", correct: "union" },
    { label: "Différence A − B", correct: "diffAB" },
    { label: "Différence symétrique(A, B)", correct: "symdiff" },
  ]
  return defs.map(({ label, correct }) => {
    const distractors = shuffled(ALL_SHAPES.filter((s) => s !== correct)).slice(0, 3)
    return { label, correct, choices: shuffled([correct, ...distractors]) }
  })
}

/**
 * A et B sont deux rectangles fixes ("parcelle" et "zone tampon") affiches en
 * pointilles sur chaque vignette. Le joueur doit reconnaitre visuellement la
 * forme resultant de l'operation demandee parmi 4 vignettes — un raisonnement
 * geometrique reel, pas un appariement de texte.
 */
export function SpatialOperationGame() {
  const questions = useMemo(() => buildQuestions(), [])
  const [index, setIndex] = useState(0)
  const [wrongChoice, setWrongChoice] = useState<ShapeKey | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [solvedCount, setSolvedCount] = useState(0)

  const isDone = solvedCount === questions.length
  const q = questions[index]

  function pick(shapeKey: ShapeKey) {
    if (wrongChoice) return
    setAttempts((n) => n + 1)
    if (shapeKey === q.correct) {
      window.setTimeout(() => {
        setSolvedCount((n) => n + 1)
        setIndex((i) => i + 1)
      }, 500)
    } else {
      setWrongChoice(shapeKey)
      window.setTimeout(() => setWrongChoice(null), 550)
    }
  }

  function reset() {
    setIndex(0)
    setWrongChoice(null)
    setAttempts(0)
    setSolvedCount(0)
  }

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim/80 mb-10">
        {solvedCount} / {questions.length} résolues · {attempts} essai{attempts !== 1 ? "s" : ""}
      </p>

      {isDone ? (
        <div className="border border-gilt/40 bg-gilt/[0.06] p-8 text-center">
          <p className="font-heading text-2xl mb-3">Partie terminée</p>
          <p className="text-parchment-dim mb-6">
            {questions.length} opérations résolues en {attempts} essai{attempts !== 1 ? "s" : ""}.
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
        <div>
          <p className="font-heading text-xl mb-6 text-parchment">
            Quel est le résultat de : <span className="text-gilt">{q.label}</span> ?
          </p>
          <div className="grid grid-cols-2 gap-4">
            {q.choices.map((shapeKey) => (
              <button
                key={shapeKey}
                type="button"
                onClick={() => pick(shapeKey)}
                aria-label={SHAPE_KEY_LABEL[shapeKey]}
                className={cn(
                  "border p-3 transition-colors",
                  wrongChoice === shapeKey ? "border-oxblood bg-oxblood/10" : "border-gilt/20 hover:border-gilt/50 bg-white/[0.02]",
                )}
              >
                <ShapeThumb shapeKey={shapeKey} highlight={wrongChoice === shapeKey ? "wrong" : undefined} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
