import type { ContentBlock, ContentLevel } from "@/content/types"

export interface Chapter {
  heading: string
  level?: ContentLevel
  blocks: ContentBlock[]
}

/**
 * Découpe un flux de blocs en chapitres à chaque "heading" rencontré. Les blocs
 * avant le premier titre (souvent un paragraphe d'intro à la salle) sont exclus —
 * à afficher séparément par l'appelant, ils n'appartiennent à aucun chapitre.
 */
export function splitIntoChapters(blocks: ContentBlock[]): Chapter[] {
  const chapters: Chapter[] = []
  let current: Chapter | null = null
  for (const block of blocks) {
    if (block.type === "heading") {
      current = { heading: block.text, level: block.level, blocks: [block] }
      chapters.push(current)
    } else if (current) {
      current.blocks.push(block)
    }
  }
  return chapters
}

/** Blocs (paragraphes, etc.) placés avant le premier titre — l'intro de salle. */
export function leadingIntro(blocks: ContentBlock[]): ContentBlock[] {
  const intro: ContentBlock[] = []
  for (const block of blocks) {
    if (block.type === "heading") break
    intro.push(block)
  }
  return intro
}

/**
 * Regroupe des chapitres (déjà découpés par splitIntoChapters) en super-chapitres
 * nommés, par index de chapitre (0-based). Utilisé pour "Méthodes" : les 7 sections
 * numérotées de methodologie.ts n'ont pas la même finalité (scolaire/concours/
 * professionnel/recherche) — regroupées ici sans toucher au contenu source.
 */
export function groupChapters(chapters: Chapter[], groups: { title: string; indices: number[] }[]) {
  return groups.map((g) => ({
    title: g.title,
    blocks: g.indices.flatMap((i) => chapters[i]?.blocks ?? []),
  }))
}
