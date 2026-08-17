export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "formula"; label: string; formula: string; note?: string }
  | { type: "callout"; tone?: "info" | "warning" | "example"; title: string; text: string }
  | { type: "comparison"; items: { label: string; points: string[] }[] }
  | { type: "table"; headers: string[]; rows: string[][] }
