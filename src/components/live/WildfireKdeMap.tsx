import { useMemo, useState } from "react"
import { FRANCE_OUTLINE_BBOX, FRANCE_OUTLINE_CORSICA, FRANCE_OUTLINE_MAINLAND } from "@/data/franceOutline"
import { WILDFIRE_BANDWIDTH_KM_OPTIONS, WILDFIRE_EVENTS, type WildfireEvent } from "@/data/wildfires"
import { cn } from "@/lib/utils"

const VIEW = 520
const PAD = 24
const OUTLINE_MARGIN = 40_000

const { xMin, xMax, yMin, yMax } = FRANCE_OUTLINE_BBOX
const boxX = xMax - xMin + 2 * OUTLINE_MARGIN
const boxY = yMax - yMin + 2 * OUTLINE_MARGIN
const scale = Math.min((VIEW - 2 * PAD) / boxX, (VIEW - 2 * PAD) / boxY)
const drawnW = boxX * scale
const drawnH = boxY * scale
const offsetX = (VIEW - drawnW) / 2
const offsetY = (VIEW - drawnH) / 2

function project(x: number, y: number) {
  return {
    sx: (x - xMin + OUTLINE_MARGIN) * scale + offsetX,
    sy: drawnH - (y - yMin + OUTLINE_MARGIN) * scale + offsetY,
  }
}

function ringToPath(ring: readonly [number, number][]) {
  return ring.map(([x, y], i) => {
    const { sx, sy } = project(x, y)
    return `${i === 0 ? "M" : "L"}${sx.toFixed(1)},${sy.toFixed(1)}`
  }).join(" ") + " Z"
}

const maxHectares = Math.max(...WILDFIRE_EVENTS.map((f) => f.hectares))

/**
 * Planche vivante : six mégafeux français réels et nommés (data/wildfires.ts)
 * projetés en semis de points pondérés (poids = hectares brûlés), avec un
 * curseur de bande passante h qui fait littéralement varier la netteté de la
 * surface de densité affichée — rend visible sur des points réels ce que la
 * formule KDE du cours (juste au-dessus) ne peut que décrire en abstrait : h
 * trop petit isole chaque feu individuellement, h trop grand fusionne des
 * foyers pourtant distants de plusieurs centaines de kilomètres (Gironde,
 * Var, Corse) en une seule tache continue trompeuse.
 */
export function WildfireKdeMap() {
  const [bandwidthKm, setBandwidthKm] = useState<(typeof WILDFIRE_BANDWIDTH_KM_OPTIONS)[number]>(WILDFIRE_BANDWIDTH_KM_OPTIONS[1])
  const [picked, setPicked] = useState<WildfireEvent | null>(null)

  const mainlandPath = useMemo(() => ringToPath(FRANCE_OUTLINE_MAINLAND), [])
  const corsicaPath = useMemo(() => ringToPath(FRANCE_OUTLINE_CORSICA), [])
  const bandwidthPx = bandwidthKm * 1000 * scale

  return (
    <div className="border border-gilt/25 bg-black/20 p-5 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-wider text-gilt/80 mb-1">Planche vivante · Six mégafeux réels, densité par noyau</p>
      <p className="font-mono text-[11px] text-parchment-dim mb-4">
        Change la bande passante h pour voir la surface de densité se resserrer ou s'étaler. Clique un point pour le détail du feu.
      </p>

      <div className="flex flex-wrap items-center gap-1.5 mb-5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/70 mr-1">Bande passante h :</span>
        {WILDFIRE_BANDWIDTH_KM_OPTIONS.map((km) => (
          <button
            key={km}
            type="button"
            onClick={() => setBandwidthKm(km)}
            aria-pressed={bandwidthKm === km}
            className={cn(
              "font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border transition-colors",
              bandwidthKm === km ? "border-gilt bg-gilt/15 text-gilt" : "border-gilt/25 text-parchment-dim hover:border-gilt/50",
            )}
          >
            {km} km {km === WILDFIRE_BANDWIDTH_KM_OPTIONS[0] ? "(bruité)" : km === WILDFIRE_BANDWIDTH_KM_OPTIONS[WILDFIRE_BANDWIDTH_KM_OPTIONS.length - 1] ? "(sur-lissé)" : ""}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-6">
        <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full h-auto border border-gilt/15 bg-canvas" role="img" aria-label="Carte de densité par noyau de six grands incendies français réels">
          <defs>
            <filter id="kde-blur" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation={Math.max(2, bandwidthPx / 3)} />
            </filter>
          </defs>

          <path d={mainlandPath} fill="rgba(201,162,75,0.06)" stroke="rgba(201,162,75,0.35)" strokeWidth={1} />
          <path d={corsicaPath} fill="rgba(201,162,75,0.06)" stroke="rgba(201,162,75,0.35)" strokeWidth={1} />

          <g filter="url(#kde-blur)">
            {WILDFIRE_EVENTS.map((fire) => {
              const { sx, sy } = project(fire.x, fire.y)
              const weight = fire.hectares / maxHectares
              return (
                <circle
                  key={`${fire.name}-blur`}
                  cx={sx}
                  cy={sy}
                  r={Math.max(bandwidthPx * 0.5, 6)}
                  fill="rgb(var(--color-oxblood-bright))"
                  fillOpacity={0.15 + weight * 0.35}
                  aria-hidden="true"
                />
              )
            })}
          </g>

          {WILDFIRE_EVENTS.map((fire) => {
            const { sx, sy } = project(fire.x, fire.y)
            const r = 4 + Math.sqrt(fire.hectares) * 0.09
            const isPicked = picked?.name === fire.name
            return (
              <g
                key={fire.name}
                role="button"
                tabIndex={0}
                aria-label={`${fire.name}, ${fire.department}, ${fire.year} : ${fire.hectares.toLocaleString("fr-FR")} hectares`}
                aria-pressed={isPicked}
                onClick={() => setPicked(fire)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setPicked(fire)
                  }
                }}
                className="cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt-bright"
              >
                <title>{fire.name}</title>
                <circle cx={sx} cy={sy} r={r} fill="rgb(var(--color-oxblood-bright))" stroke={isPicked ? "#f3ecdd" : "rgba(0,0,0,0.4)"} strokeWidth={isPicked ? 2 : 1} />
                {isPicked && <circle cx={sx} cy={sy} r={r + 4} fill="none" stroke="#f3ecdd" strokeWidth={1} strokeDasharray="2 2" />}
              </g>
            )
          })}
        </svg>

        <div className="border border-gilt/15 bg-gilt/[0.03] p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-gilt mb-3">Feu sélectionné</p>
          {picked ? (
            <div className="space-y-2 font-mono text-[11px] text-parchment-dim">
              <p className="text-parchment text-[13px] font-body">{picked.name}</p>
              <p>Département : {picked.department}</p>
              <p>Année : {picked.year}</p>
              <p>Surface brûlée : {picked.hectares.toLocaleString("fr-FR")} ha</p>
            </div>
          ) : (
            <p className="font-mono text-[11px] text-parchment-dim/80">Clique un point de la carte pour voir le détail réel du feu.</p>
          )}
        </div>
      </div>

      <p className="text-xs text-parchment-dim/80 mt-4 leading-relaxed text-justify">
        Six mégafeux français réels et nommés, pas un inventaire exhaustif : la BDIFF (base officielle, agriculture.gouv.fr) recense plusieurs milliers de départs de feu chaque année, la quasi-totalité de moins d'un hectare — cette planche isole volontairement quelques événements majeurs, bien documentés (voir data/wildfires.ts pour les sources et années), pour donner un semis de points réel à la formule KDE plutôt qu'une simulation. Une vraie estimation de densité opérationnelle se calculerait sur l'historique complet, pas sur six points.
      </p>
    </div>
  )
}
