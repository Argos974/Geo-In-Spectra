import type { DiagramName } from "@/components/diagrams"

/** Repère de niveau affiché à côté d'un titre — organise une même salle pour plusieurs publics. */
export type ContentLevel = "lycee" | "superieur" | "approfondissement"

export type ImagePairItem = { src: string; alt: string; label: string; caption: string }

export type ContentBlock =
  | { type: "heading"; text: string; level?: ContentLevel }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "formula"; label: string; formula: string; note?: string }
  | { type: "callout"; tone?: "info" | "warning" | "example" | "question" | "rappel"; title: string; text: string }
  | { type: "comparison"; items: { label: string; points: string[] }[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "diagram"; name: DiagramName; caption?: string }
  | { type: "link"; to: string; label: string; description?: string }
  | { type: "solution"; title: string; text?: string; items?: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "imagepair"; images: [ImagePairItem, ImagePairItem] }
  | { type: "marginnote"; title: string; text: string }
  /**
   * Sous-groupe nommé et adressable de blocs à l'intérieur d'un chapitre — une
   * "brique" : le contenu le plus directement réutilisable (définition + formule
   * ou exemple court), enveloppé sans être dupliqué, pour être repris ailleurs
   * (voir lib/briques.ts::getBrique) — typiquement par une séance de l'Atelier
   * (travaux-pratiques.ts) qui dépend de cette notion plutôt que de la
   * reformuler. `id` unique au sein du module qui la déclare.
   */
  | { type: "brique"; id: string; title: string; blocks: ContentBlock[] }
  | { type: "live"; name: "osm-buffer-vitrolles" | "raster-explorer" | "grid-choropleth" | "sentinel-swipe" | "rtk-network-map" | "gps-live-demo" | "wildfire-kde-map" | "tile-pyramid-explorer"; caption?: string }
  | { type: "live-game"; name: "draw-operation" }
  | { type: "game" }
  | { type: "devoir"; format: string; title: string; prompt: string; criteria: string[] }
