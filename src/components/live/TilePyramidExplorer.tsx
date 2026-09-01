import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

const VIEW = 300
const EARTH_RADIUS_M = 6378137
const MAX_DRAWN_GRID = 16

type Preset = { label: string; lon: number; lat: number }

const PRESETS: Preset[] = [
  { label: "Paris", lon: 2.3522, lat: 48.8566 },
  { label: "Quito (équateur)", lon: -78.5249, lat: -0.1807 },
  { label: "Reykjavik (haute latitude)", lon: -21.9426, lat: 64.1466 },
  { label: "Le Cap", lon: 18.4241, lat: -33.9249 },
]

function lonLatToFraction(lon: number, lat: number) {
  const latRad = (lat * Math.PI) / 180
  return {
    px: (lon + 180) / 360,
    py: (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2,
  }
}

function fractionToLonLat(px: number, py: number) {
  const latRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * py)))
  return { lon: px * 360 - 180, lat: (latRad * 180) / Math.PI }
}

/**
 * Planche vivante : instancie la formule "slippy map" du cours (lon/lat → z/x/y,
 * dérivée de Web Mercator) sur un point que le lecteur choisit lui-même, plutôt
 * que de la laisser purement abstraite. La grille affichée est plafonnée à
 * 16×16 (au-delà, 2^z dépasse ce qui reste lisible à l'écran) ; seuls les
 * nombres z/x/y et la résolution au sol restent exacts à tout niveau de zoom.
 * L'espacement des parallèles de référence, resserré à l'équateur et étiré
 * aux hautes latitudes, rend visible la même déformation Web Mercator décrite
 * ailleurs dans ce module et dans Projections avancées.
 */
export function TilePyramidExplorer() {
  const [z, setZ] = useState(3)
  const [point, setPoint] = useState(() => lonLatToFraction(PRESETS[0].lon, PRESETS[0].lat))

  const { lon, lat } = useMemo(() => fractionToLonLat(point.px, point.py), [point])
  const gridN = 2 ** z
  const drawnN = Math.min(gridN, MAX_DRAWN_GRID)
  const tileCount = 4 ** z
  const tileX = Math.min(gridN - 1, Math.floor(point.px * gridN))
  const tileY = Math.min(gridN - 1, Math.floor(point.py * gridN))
  const resolutionM = (2 * Math.PI * EARTH_RADIUS_M * Math.cos((lat * Math.PI) / 180)) / (256 * gridN)

  const cellPx = VIEW / drawnN
  const highlightX = Math.min(drawnN - 1, Math.floor(point.px * drawnN)) * cellPx
  const highlightY = Math.min(drawnN - 1, Math.floor(point.py * drawnN)) * cellPx

  const parallels = [-80, -60, -30, 0, 30, 60, 80]

  function handlePick(e: React.MouseEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = Math.min(0.9999, Math.max(0, (e.clientX - rect.left) / rect.width))
    const py = Math.min(0.9999, Math.max(0, (e.clientY - rect.top) / rect.height))
    setPoint({ px, py })
  }

  return (
    <div className="border border-gilt/25 bg-black/20 p-5 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-wider text-gilt/80 mb-1">Planche vivante · La pyramide de tuiles, en direct</p>
      <p className="font-mono text-[11px] text-parchment-dim mb-4">
        Clique un point du carré (ou choisis une ville), puis change le zoom : les indices z/x/y et la résolution au sol se recalculent avec la formule
        « slippy map » du cours.
      </p>

      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        <span className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/70 mr-1">Point :</span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setPoint(lonLatToFraction(p.lon, p.lat))}
            className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border border-gilt/25 text-parchment-dim hover:border-gilt/50 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-6">
        <div>
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full h-auto border border-gilt/15 bg-canvas" role="img" aria-label="Grille de tuiles Web Mercator, cliquable">
            {parallels.map((phi) => {
              const { py } = lonLatToFraction(0, phi)
              const y = py * VIEW
              return (
                <g key={phi}>
                  <line x1={0} x2={VIEW} y1={y} y2={y} stroke="rgba(201,162,75,0.22)" strokeWidth={1} />
                  <text x={4} y={y - 3} fontSize={7} fill="rgba(201,162,75,0.55)" fontFamily="monospace">
                    {phi}°
                  </text>
                </g>
              )
            })}
            {Array.from({ length: drawnN + 1 }, (_, i) => (i * VIEW) / drawnN).map((x, i) => (
              <line key={`v${i}`} x1={x} x2={x} y1={0} y2={VIEW} stroke="rgba(201,162,75,0.12)" strokeWidth={1} />
            ))}
            {Array.from({ length: drawnN + 1 }, (_, i) => (i * VIEW) / drawnN).map((y, i) => (
              <line key={`h${i}`} x1={0} x2={VIEW} y1={y} y2={y} stroke="rgba(201,162,75,0.12)" strokeWidth={1} />
            ))}

            <rect x={0} y={0} width={VIEW} height={VIEW} fill="transparent" onClick={handlePick} className="cursor-crosshair" />

            <rect x={highlightX} y={highlightY} width={cellPx} height={cellPx} fill="rgb(var(--color-oxblood-bright))" fillOpacity={0.18} stroke="rgb(var(--color-oxblood-bright))" strokeWidth={1.5} pointerEvents="none" />
            <circle cx={point.px * VIEW} cy={point.py * VIEW} r={4} fill="#f3ecdd" stroke="rgb(var(--color-oxblood-bright))" strokeWidth={1.5} pointerEvents="none" />
          </svg>
          <input
            type="range"
            min={0}
            max={19}
            value={z}
            onChange={(e) => setZ(Number(e.target.value))}
            className="w-full mt-3 accent-gilt"
            aria-label="Niveau de zoom z"
          />
          <p className="font-mono text-[10px] text-parchment-dim/70 mt-1">
            Zoom z = {z} {gridN > MAX_DRAWN_GRID && `(grille réelle ${gridN}×${gridN}, affichage plafonné à ${MAX_DRAWN_GRID}×${MAX_DRAWN_GRID})`}
          </p>
        </div>

        <div className="border border-gilt/15 bg-gilt/[0.03] p-4 space-y-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-gilt mb-1">Position choisie</p>
            <p className="font-mono text-[11px] text-parchment-dim">
              lon {lon.toFixed(4)}° · lat {lat.toFixed(4)}°
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-gilt mb-1">Tuile z/x/y</p>
            <p className="font-mono text-[13px] text-parchment">
              {z} / {tileX} / {tileY}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-gilt mb-1">Tuiles au total à ce zoom</p>
            <p className="font-mono text-[11px] text-parchment-dim">4^{z} = {tileCount.toLocaleString("fr-FR")}</p>
          </div>
          <div>
            <p className={cn("font-mono text-[10px] uppercase tracking-wider mb-1", "text-gilt")}>Résolution au sol à cette latitude</p>
            <p className="font-mono text-[11px] text-parchment-dim">
              {resolutionM >= 1 ? `≈ ${resolutionM.toFixed(1)} m/pixel` : `≈ ${(resolutionM * 100).toFixed(1)} cm/pixel`}
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-parchment-dim/80 mt-4 leading-relaxed text-justify">
        Résolution au sol = (2π × rayon terrestre × cos(latitude)) / (256 × 2^z) : à zoom égal, une tuile couvre plus de terrain réel près de l'équateur
        (Quito, peu de mètres perdus par pixel) que près des pôles (Reykjavik, où le facteur cos(latitude) réduit fortement les mètres par pixel) — la
        même déformation Web Mercator qui étire visiblement l'espacement des parallèles ci-dessus au-delà de 60°, déjà décrite plus haut dans ce module
        et dans Projections avancées.
      </p>
    </div>
  )
}
