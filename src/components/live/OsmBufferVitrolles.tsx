import { useEffect, useRef, useState } from "react"
import { makeLocalProjector } from "@/lib/vitrollesBbox"
import { DEMO_SITES, DEFAULT_SITE_ID, getSite } from "@/lib/sites"
import { cn } from "@/lib/utils"

// Mêmes bornes que le jeu de données canonique (voir lib/vitrollesBbox), pour
// que l'élève compare directement la même zone en donnée figée (Sentinel-2 du
// 06/08/2024) et en donnée vivante (OSM, mise à jour en continu par des contributeurs).
// L'instance historique (overpass-api.de) sature régulièrement sous sa propre
// charge globale (HTTP 504, indépendant de notre requête — vérifié par un
// appel curl direct pendant le développement de ce composant). maps.mail.ru
// héberge un miroir Overpass public à jour (vérifié : timestamp_osm_base
// récent et comptages non nuls sur cette emprise, contrairement à d'autres
// miroirs testés dont la base s'est avérée tronquée/obsolète) — utilisé en
// secours si le premier échoue ou sature.
const OVERPASS_URLS = ["https://overpass-api.de/api/interpreter", "https://maps.mail.ru/osm/tools/overpass/api/interpreter"]
const CACHE_KEY_PREFIX = "geo-in-spectra-osm-"
const CACHE_TTL_MS = 30 * 60 * 1000
type Bbox = { s: number; w: number; n: number; e: number }

interface Counts {
  buildings: number
  water: number
  roads: number
  fetchedAt: string
}

// Une seule requête combinée (3 jeux nommés, 3 "out count;" en série) plutôt
// que 3 requêtes séparées — Overpass est une infrastructure publique partagée
// et gratuite ; limiter le nombre d'appels HTTP est un minimum de politesse
// envers elle, et réduit d'autant le risque de 429 (trop de requêtes).
function combinedCountQuery(bbox: Bbox): string {
  const { s, w, n, e } = bbox
  const b = `${s},${w},${n},${e}`
  return [
    "[out:json][timeout:25];",
    `way["building"](${b})->.b;`,
    `(way["natural"="water"](${b});relation["natural"="water"](${b});)->.w;`,
    `way["highway"](${b})->.h;`,
    ".b out count;",
    ".w out count;",
    ".h out count;",
  ].join("")
}

async function fetchCounts(bbox: Bbox): Promise<{ buildings: number; water: number; roads: number }> {
  const body = `data=${encodeURIComponent(combinedCountQuery(bbox))}`
  let lastError = "erreur inconnue"
  for (const url of OVERPASS_URLS) {
    try {
      // Sans délai côté client, un serveur qui ne répond jamais (plutôt que de
      // renvoyer une erreur HTTP franche) bloquerait indéfiniment sur "en
      // cours" sans jamais essayer le miroir suivant ni proposer de réessayer.
      const res = await fetch(url, { method: "POST", body, signal: AbortSignal.timeout(15000) })
      if (!res.ok) {
        lastError = `HTTP ${res.status}`
        continue
      }
      const json = await res.json()
      const counts = (json.elements ?? []).filter((e: { type: string }) => e.type === "count").map((e: { tags: { total: string } }) => Number(e.tags.total))
      const [buildings = 0, water = 0, roads = 0] = counts
      return { buildings, water, roads }
    } catch (err) {
      lastError = err instanceof Error ? err.message : "erreur réseau"
    }
  }
  throw new Error(lastError)
}

interface OsmWay {
  points: [number, number][] // [lon, lat]
}

interface Geometries {
  buildings: OsmWay[]
  water: OsmWay[]
  roads: OsmWay[]
}

// "out geom;" sur des relations (multipolygones d'eau) ne renvoie pas une
// géométrie directement exploitable de la même façon qu'un simple way — pour
// garder le dessin robuste et simple, seules les entités "way" sont
// géométrisées ici (les relations restent comptées dans fetchCounts ci-dessus,
// juste pas dessinées) : une simplification documentée, pas un oubli.
function combinedGeometryQuery(bbox: Bbox): string {
  const { s, w, n, e } = bbox
  const b = `${s},${w},${n},${e}`
  return [
    "[out:json][timeout:25];",
    `(way["building"](${b});way["natural"="water"](${b});way["highway"](${b}););`,
    "out geom;",
  ].join("")
}

async function fetchGeometries(bbox: Bbox): Promise<Geometries> {
  const body = `data=${encodeURIComponent(combinedGeometryQuery(bbox))}`
  let lastError = "erreur inconnue"
  for (const url of OVERPASS_URLS) {
    try {
      const res = await fetch(url, { method: "POST", body, signal: AbortSignal.timeout(20000) })
      if (!res.ok) {
        lastError = `HTTP ${res.status}`
        continue
      }
      const json = await res.json()
      const buildings: OsmWay[] = []
      const water: OsmWay[] = []
      const roads: OsmWay[] = []
      for (const el of json.elements ?? []) {
        if (el.type !== "way" || !Array.isArray(el.geometry)) continue
        const points: [number, number][] = el.geometry.filter((p: unknown) => p != null).map((p: { lon: number; lat: number }) => [p.lon, p.lat])
        if (points.length < 2) continue
        const tags = el.tags ?? {}
        if (tags.building) buildings.push({ points })
        else if (tags.natural === "water") water.push({ points })
        else if (tags.highway) roads.push({ points })
      }
      return { buildings, water, roads }
    } catch (err) {
      lastError = err instanceof Error ? err.message : "erreur réseau"
    }
  }
  throw new Error(lastError)
}

/**
 * Interroge en direct l'API Overpass (OpenStreetMap) sur l'emprise exacte du
 * jeu de données canonique — publique, sans clé, CORS activé. Les nombres
 * affichés ne sont volontairement PAS fixes : OSM est une donnée vivante
 * (VGI, volunteered geographic information), modifiée en continu par des
 * contributeurs. C'est le point pédagogique de l'exercice, pas une gêne —
 * voir la consigne sous le composant.
 */
const MAP_SIZE = 640

export function OsmBufferVitrolles() {
  const [siteId, setSiteId] = useState(DEFAULT_SITE_ID)
  const site = getSite(siteId)
  const [state, setState] = useState<{ status: "loading" | "error" | "done"; counts?: Counts; error?: string }>({ status: "loading" })
  const [mapState, setMapState] = useState<{ status: "idle" | "loading" | "error" | "done"; geometries?: Geometries; error?: string }>({ status: "idle" })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const geometriesCache = useRef<Map<string, Geometries>>(new Map())

  async function loadMap() {
    const cached = geometriesCache.current.get(siteId)
    if (cached) {
      setMapState({ status: "done", geometries: cached })
      return
    }
    setMapState({ status: "loading" })
    try {
      const geometries = await fetchGeometries(site.bbox)
      geometriesCache.current.set(siteId, geometries)
      setMapState({ status: "done", geometries })
    } catch (err) {
      setMapState({ status: "error", error: err instanceof Error ? err.message : "erreur réseau" })
    }
  }

  async function load(force = false) {
    const cacheKey = CACHE_KEY_PREFIX + siteId
    if (!force) {
      try {
        const cached = sessionStorage.getItem(cacheKey)
        if (cached) {
          const parsed = JSON.parse(cached) as Counts & { cachedAt: number }
          if (Date.now() - parsed.cachedAt < CACHE_TTL_MS) {
            setState({ status: "done", counts: parsed })
            return
          }
        }
      } catch {
        // sessionStorage indisponible : on retente simplement un fetch réseau
      }
    }
    setState({ status: "loading" })
    try {
      const { buildings, water, roads } = await fetchCounts(site.bbox)
      const counts: Counts = { buildings, water, roads, fetchedAt: new Date().toLocaleString("fr-FR") }
      setState({ status: "done", counts })
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ ...counts, cachedAt: Date.now() }))
      } catch {
        // idem
      }
    } catch (err) {
      setState({ status: "error", error: err instanceof Error ? err.message : "erreur réseau" })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- charge des données au montage/changement de site, pas une valeur dérivée du rendu
    setMapState({ status: "idle" })
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId])

  useEffect(() => {
    if (mapState.status !== "done" || !mapState.geometries || !canvasRef.current) return
    const canvas = canvasRef.current
    canvas.width = MAP_SIZE
    canvas.height = MAP_SIZE
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const project = makeLocalProjector(site.bbox, MAP_SIZE, MAP_SIZE)

    ctx.fillStyle = "rgb(13 14 18)"
    ctx.fillRect(0, 0, MAP_SIZE, MAP_SIZE)

    function drawWays(ways: OsmWay[], fillStyle: string | null, strokeStyle: string, lineWidth: number) {
      for (const way of ways) {
        ctx!.beginPath()
        way.points.forEach(([lon, lat], i) => {
          const [x, y] = project(lon, lat)
          if (i === 0) ctx!.moveTo(x, y)
          else ctx!.lineTo(x, y)
        })
        if (fillStyle) {
          ctx!.fillStyle = fillStyle
          ctx!.fill()
        }
        ctx!.strokeStyle = strokeStyle
        ctx!.lineWidth = lineWidth
        ctx!.stroke()
      }
    }

    // Ordre de dessin : eau (fond), puis routes, puis bâtiments par-dessus —
    // même hiérarchie visuelle qu'une carte topographique classique.
    drawWays(mapState.geometries.water, "rgba(63,80,102,0.55)", "rgba(150,175,205,0.7)", 1)
    drawWays(mapState.geometries.roads, null, "rgba(168,159,140,0.55)", 1)
    drawWays(mapState.geometries.buildings, "rgba(184,147,79,0.35)", "rgba(217,180,106,0.6)", 0.75)
  }, [mapState, site.bbox])

  return (
    <div className="border border-gilt/25 bg-black/20 p-5 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-wider text-gilt/80 mb-1">Requête en direct · API Overpass (OpenStreetMap)</p>
      <p className="font-mono text-[11px] text-parchment-dim mb-3">
        {site.label} — emprise : {site.bbox.s.toFixed(4)}, {site.bbox.w.toFixed(4)} → {site.bbox.n.toFixed(4)}, {site.bbox.e.toFixed(4)} (identique au jeu de données canonique)
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {DEMO_SITES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSiteId(s.id)}
            className={cn(
              "font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border transition-colors",
              siteId === s.id ? "border-gilt bg-gilt/15 text-gilt" : "border-gilt/25 text-parchment-dim hover:border-gilt/50",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {state.status === "loading" && <p className="font-mono text-sm text-parchment-dim">Interrogation d'Overpass (OpenStreetMap)…</p>}

      {state.status === "error" && (
        <div>
          <p className="font-mono text-sm text-oxblood-bright mb-3">Échec de la requête ({state.error}) sur les instances publiques essayées. L'API Overpass est une infrastructure gratuite et partagée par toute la communauté OSM, elle sature parfois en période de forte charge, indépendamment de ce site.</p>
          <button type="button" onClick={() => load(true)} className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-1.5 hover:bg-gilt/10 transition-colors">
            Réessayer
          </button>
        </div>
      )}

      {state.status === "done" && state.counts && (
        <div>
          <table className="w-full font-mono text-sm mb-4">
            <tbody>
              <tr className="border-b border-gilt/10">
                <td className="py-2 text-parchment-dim">Bâtiments recensés (way[building])</td>
                <td className="py-2 text-right text-parchment tabular-nums">{state.counts.buildings.toLocaleString("fr-FR")}</td>
              </tr>
              <tr className="border-b border-gilt/10">
                <td className="py-2 text-parchment-dim">Segments de route (way[highway])</td>
                <td className="py-2 text-right text-parchment tabular-nums">{state.counts.roads.toLocaleString("fr-FR")}</td>
              </tr>
              <tr>
                <td className="py-2 text-parchment-dim">Entités « plan d'eau » (natural=water)</td>
                <td className="py-2 text-right text-parchment tabular-nums">{state.counts.water.toLocaleString("fr-FR")}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-between mb-6">
            <p className="font-mono text-[10px] text-parchment-dim/80">Interrogé le {state.counts.fetchedAt}</p>
            <button type="button" onClick={() => load(true)} className="font-mono text-[10px] uppercase tracking-wider text-gilt/85 hover:text-gilt transition-colors">
              ↻ Rafraîchir
            </button>
          </div>

          {mapState.status === "idle" && (
            <button
              type="button"
              onClick={loadMap}
              className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-1.5 hover:bg-gilt/10 transition-colors"
            >
              Afficher la carte (géométries OSM réelles) →
            </button>
          )}

          {mapState.status === "loading" && <p className="font-mono text-sm text-parchment-dim">Récupération des géométries (bâtiments, routes, eau)…</p>}

          {mapState.status === "error" && (
            <div>
              <p className="font-mono text-sm text-oxblood-bright mb-3">Échec de la requête géométrie ({mapState.error}).</p>
              <button type="button" onClick={loadMap} className="font-mono text-[11px] uppercase tracking-wider text-gilt border border-gilt/30 px-3 py-1.5 hover:bg-gilt/10 transition-colors">
                Réessayer
              </button>
            </div>
          )}

          {mapState.status === "done" && mapState.geometries && (
            <div>
              <canvas ref={canvasRef} className="w-full h-auto border border-gilt/15 bg-ink" />
              <div className="flex flex-wrap gap-4 mt-3 font-mono text-[10px] text-parchment-dim">
                <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 bg-lapis/60 border border-lapis-bright/60" /> Eau ({mapState.geometries.water.length})</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-parchment-dim" /> Routes ({mapState.geometries.roads.length})</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 bg-gilt/40 border border-gilt-bright/60" /> Bâtiments ({mapState.geometries.buildings.length})</span>
              </div>
              <p className="font-mono text-[10px] text-parchment-dim/80 mt-3 text-justify">
                Chaque forme est un contour réel dessiné par un contributeur OSM (VGI), pas une donnée nettoyée
                pour l'affichage : des bâtiments manquants, désalignés ou mal fermés sont normaux et font partie
                de ce que « donnée vivante » veut dire — comparer avec la précision du bâti visible sur la
                planche Sentinel-2 ci-dessus (module Indices spectraux) est un bon exercice.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
