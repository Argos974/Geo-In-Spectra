import { useCallback, useState } from "react"

/**
 * Conversion WGS84 → Lambert-93 (RGF93 / EPSG:2154), formule directe IGN
 * (ellipsoïde GRS80, projection conique conforme sécante) — mêmes constantes
 * que celles publiées par l'IGN (algorithme NTG_71/ALG0003), sans passer par
 * une sphère conforme intermédiaire.
 */
function wgs84ToLambert93(lonDeg: number, latDeg: number): { x: number; y: number } {
  const e = 0.0818191910428158
  const n = 0.7256077650
  const c = 11754255.426
  const xs = 700000
  const ys = 12655612.050
  const lon0 = (3 * Math.PI) / 180

  const lat = (latDeg * Math.PI) / 180
  const lon = (lonDeg * Math.PI) / 180
  const l = Math.log(
    Math.tan(Math.PI / 4 + lat / 2) * Math.pow((1 - e * Math.sin(lat)) / (1 + e * Math.sin(lat)), e / 2),
  )
  const r = c * Math.exp(-n * l)
  const gamma = n * (lon - lon0)
  return { x: xs + r * Math.sin(gamma), y: ys - r * Math.cos(gamma) }
}

type Status = "idle" | "locating" | "ok" | "error"

interface Fix {
  lat: number
  lon: number
  accuracyM: number
  timestamp: number
}

/**
 * Planche vivante : localise l'appareil du lecteur via l'API Geolocation du
 * navigateur (pas de donnée simulée), affiche la position brute en WGS84 et
 * sa conversion en Lambert-93 par la formule ci-dessus — rend concret, sur
 * SA propre position, ce que la carte RTK (RtkNetworkMap) montre à l'échelle
 * du pays : le champ `accuracyM` renvoyé par le navigateur (quelques mètres à
 * quelques dizaines de mètres, positionnement par code) est du même ordre de
 * grandeur que le mode "code" du cours GPS, et à comparer explicitement à la
 * précision centimétrique du RTK/PPK (mode "phase porteuse") — ce que
 * l'appareil du lecteur ne peut pas démontrer directement, d'où le rappel
 * textuel plutôt qu'une fausse simulation RTK.
 */
export function GpsLiveDemo() {
  const [status, setStatus] = useState<Status>("idle")
  const [fix, setFix] = useState<Fix | null>(null)
  const [errorMsg, setErrorMsg] = useState("")

  const locate = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setStatus("error")
      setErrorMsg("Ce navigateur ne fournit pas l'API de géolocalisation.")
      return
    }
    setStatus("locating")
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFix({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracyM: pos.coords.accuracy,
          timestamp: pos.timestamp,
        })
        setStatus("ok")
      },
      (err) => {
        setStatus("error")
        setErrorMsg(
          err.code === err.PERMISSION_DENIED
            ? "Localisation refusée — autorise-la dans les réglages du navigateur pour voir ta propre position."
            : "Position indisponible pour l'instant (signal GNSS/Wi-Fi insuffisant).",
        )
      },
      { enableHighAccuracy: true, timeout: 15000 },
    )
  }, [])

  const lambert = fix ? wgs84ToLambert93(fix.lon, fix.lat) : null

  return (
    <div className="border border-gilt/25 bg-black/20 p-5 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-wider text-gilt/80 mb-1">Planche vivante · Ta position réelle, en direct</p>
      <p className="font-mono text-[11px] text-parchment-dim mb-4">
        Interroge l'API de géolocalisation de ton propre appareil (aucune donnée simulée) et convertit le résultat en Lambert-93 avec la formule officielle IGN.
      </p>

      <button
        type="button"
        onClick={locate}
        disabled={status === "locating"}
        className="font-mono text-[10px] uppercase tracking-wider px-3 py-2 border border-gilt/40 text-gilt hover:bg-gilt/10 transition-colors disabled:opacity-50"
      >
        {status === "locating" ? "Localisation en cours…" : status === "ok" ? "Actualiser ma position" : "Me localiser"}
      </button>

      <div aria-live="polite" className="mt-5">
        {status === "error" && <p className="text-xs text-oxblood-bright">{errorMsg}</p>}

        {status === "ok" && fix && lambert && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-gilt/15 bg-gilt/[0.03] p-4 font-mono text-[11px] text-parchment-dim space-y-1.5">
              <p className="text-gilt uppercase tracking-wider text-[10px] mb-2">WGS84 (géographique)</p>
              <p>Latitude : {fix.lat.toFixed(6)}°</p>
              <p>Longitude : {fix.lon.toFixed(6)}°</p>
              <p>Précision annoncée : ≈{Math.round(fix.accuracyM)} m</p>
            </div>
            <div className="border border-gilt/15 bg-gilt/[0.03] p-4 font-mono text-[11px] text-parchment-dim space-y-1.5">
              <p className="text-gilt uppercase tracking-wider text-[10px] mb-2">Lambert-93 (EPSG:2154)</p>
              <p>X : {lambert.x.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} m</p>
              <p>Y : {lambert.y.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} m</p>
              <p className="text-parchment-dim/70">Conversion directe, ellipsoïde GRS80</p>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-parchment-dim/80 mt-4 leading-relaxed text-justify">
        La précision affichée ici (typiquement 5 à 50 m selon l'appareil et l'environnement) correspond au positionnement par code — la même famille que le GPS grand public décrit plus haut. Un récepteur RTK/PPK, en résolvant la phase porteuse plutôt que le seul code, ramènerait cette même mesure à 1-2 cm : ce que ton navigateur ne peut pas démontrer lui-même, faute de matériel GNSS professionnel, mais que la carte du réseau RGP/Centipède ci-dessus permet de situer géographiquement.
      </p>
    </div>
  )
}
