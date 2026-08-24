// Déclarations pour pdfServer.mjs — permet à un fichier .ts (src/__tests__/pdfSlugs.test.ts)
// de l'importer sous `strict`/`bundler` sans que tsc ne tente de vérifier ce module Node
// autonome (pas de allowJs/checkJs sur tsconfig.app.json, qui ne couvre que src/).
export const ROOT: string
export const PORT: number
export const BASE_URL: string
export const ALL_SLUGS: string[]
export const ROOM_NUMERALS: string[]
export function resolveRequestedSlugs(): string[]
export function withPdfServer(fn: (page: import("playwright").Page) => Promise<void>): Promise<void>
export const PDF_MARGIN: { top: string; bottom: string; left: string; right: string }
export const PDF_HEADER_TEMPLATE: string
export function footerTemplateForSlug(slug: string): string
