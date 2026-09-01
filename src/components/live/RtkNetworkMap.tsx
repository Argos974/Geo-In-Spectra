import { useMemo, useState } from "react"
import { FRANCE_OUTLINE_BBOX, FRANCE_OUTLINE_CORSICA, FRANCE_OUTLINE_MAINLAND } from "@/data/franceOutline"
import { CENTIPEDE_FACTOR, RTK_REGIONS, RTK_RADIUS_KM_OPTIONS, type RtkRegion } from "@/data/rtkNetwork"
import { cn } from "@/lib/utils"

const VIEW = 520
const PAD = 24
const OUTLINE_MARGIN = 40_000 // m, même marge que CoordinateMapGame pour respirer autour des points côtiers/corses

const { xMin, xMax, yMin, yMax } = FRANCE_OUTLINE_BBOX
const boxX = xMax - xMin + 2 * OUTLINE_MARGIN
const boxY = yMax - yMin + 2 * OUTLINE_MARGIN
const scale = Math.min((VIEW - 2 * PAD) / boxX, (VIEW - 2 * PAD) / boxY)
const drawnW = boxX * scale
const drawnH = boxY * scale
const offsetX = (VIEW - drawnW) / 2
const offsetY = (VIEW - drawnH) / 2

/** Échelle uniforme (pas d'étirement séparé X/Y) — un cercle de rayon réel en mètres se projette donc en un vrai cercle à l'écran, à la bonne échelle relative à la carte. */
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

type Network = "rgp" | "centipede"

function stationsFor(region: RtkRegion, network: Network): number {
  return network === "rgp" ? region.rgpStations : Math.round(region.rgpStations * CENTIPEDE_FACTOR)
}

/** Ratio (surface couverte à ce rayon par ce nombre de stations) / (surface réelle de la région) — une estimation de densité, pas une carte de portée radio réelle (masquage du relief non modélisé, voir note sous la carte). */
function coverageRatio(region: RtkRegion, network: Network, radiusKm: number): number {
  const coveredKm2 = stationsFor(region, network) * Math.PI * radiusKm * radiusKm
  return coveredKm2 / region.areaKm2
}

function ratioColor(ratio: number): { fill: string; label: string } {
  if (ratio >= 1) return { fill: "rgb(var(--color-lapis-bright))", label: "Densité suffisante (ordre de grandeur)" }
  if (ratio >= 0.6) return { fill: "rgb(var(--color-gilt))", label: "Densité intermédiaire" }
  return { fill: "rgb(var(--color-oxblood-bright))", label: "Densité faible : zone probablement sous-couverte" }
}

/**
 * Planche vivante : ordre de grandeur réel de la densité du réseau GNSS
 * permanent français (RGP-IGN, et Centipède RTK en option) par région, mis en
 * regard de la surface réelle de chaque région — pas un inventaire officiel
 * station par station (non disponible en open data exploitable ici, voir
 * data/rtkNetwork.ts pour les sources et la méthode d'estimation). Répond
 * concrètement à la question posée juste après dans le cours : le réseau
 * RTK est-il suffisant pour couvrir toute la France ? Sert le questionnement,
 * pas une réponse toute faite — d'où le clic pour inspecter région par région
 * plutôt qu'un simple verdict global affiché d'emblée.
 */
export function RtkNetworkMap() {
  const [network, setNetwork] = useState<Network>("rgp")
  const [radiusKm, setRadiusKm] = useState<(typeof RTK_RADIUS_KM_OPTIONS)[number]>(RTK_RADIUS_KM_OPTIONS[0])
  const [showRadius, setShowRadius] = useState(false)
  const [picked, setPicked] = useState<RtkRegion | null>(null)

  const mainlandPath = useMemo(() => ringToPath(FRANCE_OUTLINE_MAINLAND), [])
  const corsicaPath = useMemo(() => ringToPath(FRANCE_OUTLINE_CORSICA), [])
  const radiusPx = radiusKm * 1000 * scale

  const rows = useMemo(
    () => RTK_REGIONS.map((r) => ({ region: r, ratio: coverageRatio(r, network, radiusKm), stations: stationsFor(r, network) })),
    [network, radiusKm],
  )

  return (
    <div className="border border-gilt/25 bg-black/20 p-5 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-wider text-gilt/80 mb-1">Planche vivante · Réseau GNSS permanent, ordre de grandeur réel</p>
      <p className="font-mono text-[11px] text-parchment-dim mb-4">
        Clique une région pour voir son détail. Densité = (stations × portée choisie) rapportée à la surface réelle de la région — un indicateur, pas une carte de réception radio.
      </p>

      <div className="flex flex-wrap gap-1.5 mb-2">
        <button type="button" onClick={() => setNetwork("rgp")} aria-pressed={network === "rgp"} className={cn("font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border transition-colors", network === "rgp" ? "border-gilt bg-gilt/15 text-gilt" : "border-gilt/25 text-parchment-dim hover:border-gilt/50")}>
          RGP (IGN) seul — ≈520 stations
        </button>
        <button type="button" onClick={() => setNetwork("centipede")} aria-pressed={network === "centipede"} className={cn("font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border transition-colors", network === "centipede" ? "border-gilt bg-gilt/15 text-gilt" : "border-gilt/25 text-parchment-dim hover:border-gilt/50")}>
          RGP + Centipède RTK — ≈750 stations
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 mb-5">
        {RTK_RADIUS_KM_OPTIONS.map((km) => (
          <button key={km} type="button" onClick={() => setRadiusKm(km)} aria-pressed={radiusKm === km} className={cn("font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border transition-colors", radiusKm === km ? "border-gilt bg-gilt/15 text-gilt" : "border-gilt/25 text-parchment-dim hover:border-gilt/50")}>
            Portée {km} km
          </button>
        ))}
        <button type="button" onClick={() => setShowRadius((v) => !v)} aria-pressed={showRadius} className={cn("font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border transition-colors ml-1", showRadius ? "border-gilt bg-gilt/15 text-gilt" : "border-gilt/25 text-parchment-dim hover:border-gilt/50")}>
          {showRadius ? "Masquer" : "Afficher"} un rayon à l'échelle
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-6">
        <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full h-auto border border-gilt/15 bg-canvas" role="img" aria-label="Carte de densité du réseau GNSS permanent par région française">
          <path d={mainlandPath} fill="rgba(201,162,75,0.06)" stroke="rgba(201,162,75,0.35)" strokeWidth={1} />
          <path d={corsicaPath} fill="rgba(201,162,75,0.06)" stroke="rgba(201,162,75,0.35)" strokeWidth={1} />

          {showRadius && rows.map(({ region }) => {
            const { sx, sy } = project(region.x, region.y)
            return <circle key={`${region.name}-radius`} cx={sx} cy={sy} r={radiusPx} fill="rgba(201,162,75,0.10)" stroke="rgba(201,162,75,0.4)" strokeWidth={1} strokeDasharray="3 2" aria-hidden="true" />
          })}

          {rows.map(({ region, ratio, stations }) => {
            const { sx, sy } = project(region.x, region.y)
            const { fill, label } = ratioColor(ratio)
            const r = 6 + Math.sqrt(stations) * 1.1
            const isPicked = picked?.name === region.name
            return (
              <g
                key={region.name}
                role="button"
                tabIndex={0}
                aria-label={`${region.name} : ${stations} stations, ${label}`}
                aria-pressed={isPicked}
                onClick={() => setPicked(region)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setPicked(region)
                  }
                }}
                className="cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt-bright"
              >
                <title>{region.name}</title>
                <circle cx={sx} cy={sy} r={r} fill={fill} fillOpacity={0.8} stroke={isPicked ? "#f3ecdd" : "rgba(0,0,0,0.4)"} strokeWidth={isPicked ? 2 : 1} />
                {isPicked && <circle cx={sx} cy={sy} r={r + 4} fill="none" stroke="#f3ecdd" strokeWidth={1} strokeDasharray="2 2" />}
              </g>
            )
          })}
        </svg>

        <div className="border border-gilt/15 bg-gilt/[0.03] p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-gilt mb-3">Région sélectionnée</p>
          {picked ? (
            (() => {
              const row = rows.find((r) => r.region.name === picked.name)!
              const { label } = ratioColor(row.ratio)
              return (
                <div className="space-y-2 font-mono text-[11px] text-parchment-dim">
                  <p className="text-parchment text-[13px] font-body">{picked.name}</p>
                  <p>Stations estimées : {row.stations}</p>
                  <p>Surface réelle : {picked.areaKm2.toLocaleString("fr-FR")} km²</p>
                  <p>Indice de densité : {row.ratio.toFixed(2)}</p>
                  <p className="text-parchment-dim/90">{label}</p>
                </div>
              )
            })()
          ) : (
            <p className="font-mono text-[11px] text-parchment-dim/80">Clique un point de la carte pour voir le détail réel de sa région.</p>
          )}
        </div>
      </div>

      <p className="text-xs text-parchment-dim/80 mt-4 leading-relaxed text-justify">
        Comptages RGP-IGN et Centipède RTK approximatifs, agrégés par région (pas de position exacte par antenne, voir data/rtkNetwork.ts pour la méthode et les sources) — l'indice de densité ignore aussi le masquage du relief (une station en fond de vallée alpine ou corse couvre bien moins que son rayon nominal), donc les zones montagneuses sont probablement encore moins couvertes que ce que ce seul indice ne montre.
      </p>
    </div>
  )
}
