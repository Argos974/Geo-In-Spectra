import type { DiagramName } from "@/components/diagrams"

/** Repère de niveau affiché à côté d'un titre — organise une même salle pour plusieurs publics. */
export type ContentLevel = "college-lycee" | "superieur" | "approfondissement"

export type ContentBlock =
  | { type: "heading"; text: string; level?: ContentLevel }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "formula"; label: string; formula: string; note?: string }
  | { type: "callout"; tone?: "info" | "warning" | "example"; title: string; text: string }
  | { type: "comparison"; items: { label: string; points: string[] }[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "diagram"; name: DiagramName; caption?: string }
  | { type: "link"; to: string; label: string; description?: string }
