/**
 * Ordres de grandeur réels du maillage GNSS permanent français, agrégés par
 * région (pas la position exacte de chaque antenne — non publiée en open data
 * exploitable telle quelle — mais des comptages et surfaces réels ou tirés de
 * sources publiques) :
 * - RGP (Réseau GNSS Permanent, IGN) : environ 510-520 stations actives en
 *   France (données par région estimées depuis la liste publique des stations,
 *   rgp.ign.fr/STATIONS/liste.php, consultée en 2026 — le total officiel
 *   communiqué début 2023 était de 523 stations actives).
 * - Centipède RTK : réseau ouvert et communautaire (déployé depuis 2019), plus
 *   de 750 stations opérationnelles en France en juillet 2024
 *   (docs.centipede.fr) — un facteur d'environ ×1,44 par rapport au RGP à
 *   l'échelle nationale, appliqué ici uniformément faute de détail régional
 *   public équivalent.
 * - Surfaces régionales : ordres de grandeur INSEE (comparateur de territoires).
 *
 * Les positions (Lambert-93) sont des centroïdes approximatifs par région
 * (repère schématique, pas un géoréférencement de précision) — cohérent avec
 * le traitement des autres planches illustratives du site, pas une base
 * géodésique. Sert à RtkNetworkMap (src/components/live) pour visualiser un
 * ordre de grandeur de couverture, pas un inventaire officiel du réseau.
 */
export interface RtkRegion {
  name: string
  /** Centroïde approximatif, mètres Lambert-93 (EPSG:2154). */
  x: number
  y: number
  /** Superficie réelle (km², ordre de grandeur INSEE). */
  areaKm2: number
  /** Nombre approximatif de stations RGP actives dans la région. */
  rgpStations: number
}

export const RTK_REGIONS: RtkRegion[] = [
  { name: "Auvergne-Rhône-Alpes", x: 842000, y: 6519000, areaKm2: 69711, rgpStations: 55 },
  { name: "Bourgogne-Franche-Comté", x: 846000, y: 6693000, areaKm2: 47784, rgpStations: 30 },
  { name: "Bretagne", x: 352000, y: 6786000, areaKm2: 27208, rgpStations: 45 },
  { name: "Centre-Val de Loire", x: 596000, y: 6740000, areaKm2: 39151, rgpStations: 30 },
  { name: "Corse", x: 1200000, y: 6155000, areaKm2: 8725, rgpStations: 10 },
  { name: "Grand Est", x: 940000, y: 6835000, areaKm2: 57433, rgpStations: 45 },
  { name: "Hauts-de-France", x: 648000, y: 6980000, areaKm2: 31907, rgpStations: 35 },
  { name: "Île-de-France", x: 652000, y: 6862000, areaKm2: 12011, rgpStations: 25 },
  { name: "Normandie", x: 432000, y: 6896000, areaKm2: 29907, rgpStations: 35 },
  { name: "Nouvelle-Aquitaine", x: 480000, y: 6520000, areaKm2: 84036, rgpStations: 65 },
  { name: "Occitanie", x: 620000, y: 6330000, areaKm2: 72724, rgpStations: 60 },
  { name: "Pays de la Loire", x: 420000, y: 6710000, areaKm2: 32082, rgpStations: 40 },
  { name: "Provence-Alpes-Côte d'Azur", x: 930000, y: 6330000, areaKm2: 31400, rgpStations: 30 },
]

/** Facteur multiplicatif national appliqué au comptage RGP pour estimer Centipède RTK (voir note ci-dessus). */
export const CENTIPEDE_FACTOR = 1.44

/** Rayon de portée RTK typique utilisable (km) — borne basse d'une plage usuelle de 15-20 km selon équipement et masquage du terrain. */
export const RTK_RADIUS_KM_OPTIONS = [15, 20] as const
