const STAC_SEARCH_URL = "https://earth-search.aws.element84.com/v1/search"

export interface StacScene {
  id: string
  datetime: string
  cloudCover: number
  redHref: string
  nirHref: string
}

interface StacItem {
  id: string
  properties: { datetime: string; "eo:cloud_cover": number }
  assets: Record<string, { href: string }>
}

async function searchScenes(bbox: { w: number; s: number; e: number; n: number }, datetimeRange: string, limit: number): Promise<StacItem[]> {
  const res = await fetch(STAC_SEARCH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      collections: ["sentinel-2-l2a"],
      bbox: [bbox.w, bbox.s, bbox.e, bbox.n],
      datetime: datetimeRange,
      limit,
      query: { "eo:cloud_cover": { lt: 10 } },
      sortby: [{ field: "properties.datetime", direction: "asc" }],
    }),
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  const items = (json.features ?? []) as StacItem[]
  // Certains items plus anciens du catalogue renvoient encore des hrefs
  // s3:// (JP2 d'origine, pas de COG converti) plutôt que https:// —
  // illisibles depuis un navigateur (fetch ne sait pas parler s3://). Écartés
  // ici plutôt que de laisser échouer le fetch plus tard, sans distinction
  // avec une vraie panne réseau.
  return items.filter((i) => i.assets.red?.href?.startsWith("https://") && i.assets.nir?.href?.startsWith("https://"))
}

function toScene(item: StacItem): StacScene {
  return {
    id: item.id,
    datetime: item.properties.datetime,
    cloudCover: item.properties["eo:cloud_cover"],
    redHref: item.assets.red.href,
    nirHref: item.assets.nir.href,
  }
}

function monthOf(iso: string): number {
  return new Date(iso).getUTCMonth() + 1 // 1-12
}

/**
 * Choisit deux dates réelles contrastées (été vs hiver, faible nuage) sur la
 * même emprise plutôt que deux dates arbitraires : le contraste saisonnier de
 * végétation est ce qui rend un swipe NDVI visuellement parlant. Repli sur
 * "première vs dernière date disponible" si l'un des deux seaux saisonniers
 * est vide (peu probable sur 3 ans de catalogue Sentinel-2, mais réel —
 * l'API est interrogée en direct, pas un jeu de données figé).
 */
export async function findTwoContrastingScenes(bbox: { w: number; s: number; e: number; n: number }): Promise<{ summer: StacScene; winter: StacScene }> {
  const items = await searchScenes(bbox, `${new Date(Date.now() - 3 * 365 * 86400000).toISOString()}/${new Date().toISOString()}`, 100)
  if (items.length < 2) throw new Error("pas assez de scènes disponibles sur cette emprise")

  const bySummer = items.filter((i) => [6, 7, 8].includes(monthOf(i.properties.datetime))).sort((a, b) => a.properties["eo:cloud_cover"] - b.properties["eo:cloud_cover"])
  const byWinter = items.filter((i) => [12, 1, 2].includes(monthOf(i.properties.datetime))).sort((a, b) => a.properties["eo:cloud_cover"] - b.properties["eo:cloud_cover"])

  if (bySummer.length > 0 && byWinter.length > 0) {
    return { summer: toScene(bySummer[0]), winter: toScene(byWinter[0]) }
  }

  const sortedByDate = [...items].sort((a, b) => a.properties.datetime.localeCompare(b.properties.datetime))
  return { summer: toScene(sortedByDate[sortedByDate.length - 1]), winter: toScene(sortedByDate[0]) }
}
