/**
 * Six grands incendies français réels, nommés et sourcés (année, département,
 * surface brûlée en hectares) — pas un inventaire exhaustif de la BDIFF
 * (Base de Données sur les Incendies de Forêt, agriculture.gouv.fr, des
 * milliers d'événements par an dont l'immense majorité fait moins d'1 ha),
 * volontairement restreint à quelques mégafeux médiatisés et bien documentés
 * pour illustrer un semis de points réel avec un poids réel (hectares) — la
 * même logique de rigueur que src/data/rtkNetwork.ts, adaptée à des points
 * individuels plutôt qu'à des agrégats régionaux.
 *
 * Sources : chiffres hectares — SDES (Chiffres clés des risques naturels,
 * édition 2023) pour le bilan Sud-Ouest 2022 et Méditerranée 2022 ; presse
 * spécialisée (alertes-meteo.com, canopee.ong) pour le détail par feu nommé
 * (Landiras 1/2, La Teste-de-Buch, Vidauban, Gonfaron, Biguglia), recoupée sur
 * plusieurs sources. Coordonnées : centroïde approximatif de la commune
 * d'origine (pas le contour réel du feu), converti WGS84 → Lambert-93 par la
 * même formule que GpsLiveDemo.tsx.
 */
export interface WildfireEvent {
  name: string
  department: string
  year: number
  hectares: number
  /** Centroïde approximatif, mètres Lambert-93 (EPSG:2154). */
  x: number
  y: number
}

export const WILDFIRE_EVENTS: WildfireEvent[] = [
  { name: "Landiras 1", department: "Gironde", year: 2022, hectares: 12500, x: 432632, y: 6389137 },
  { name: "Landiras 2", department: "Gironde", year: 2022, hectares: 7100, x: 436129, y: 6383430 },
  { name: "La Teste-de-Buch", department: "Gironde", year: 2022, hectares: 5700, x: 370992, y: 6401304 },
  { name: "Gonfaron (Monts des Maures)", department: "Var", year: 2021, hectares: 6800, x: 965782, y: 6266737 },
  { name: "Vidauban", department: "Var", year: 2003, hectares: 6700, x: 978000, y: 6265365 },
  { name: "Biguglia", department: "Haute-Corse", year: 2017, hectares: 2000, x: 1229299, y: 6190220 },
]

/** Rayons de bande passante (h) proposés pour la démonstration KDE, en km — du bruité au trop lissé, cf. le cours (module Les Statistiques, piste Licence/BUT, section 3). */
export const WILDFIRE_BANDWIDTH_KM_OPTIONS = [15, 40, 80] as const
