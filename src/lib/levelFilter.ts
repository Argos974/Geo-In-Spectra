import type { ContentBlock, ContentLevel } from "@/content/types"

export const ALL_LEVELS: ContentLevel[] = ["lycee", "superieur", "approfondissement"]

/** Libellé court d'une piste — partagé entre le sélecteur de ModuleChapterBody et toute page qui doit étiqueter une section par piste (Formulaire, Pièges fréquents). */
export const LEVEL_TOGGLE_LABEL: Record<ContentLevel, string> = {
  "lycee": "Lycée",
  superieur: "Licence / BUT",
  approfondissement: "Master / Recherche",
}

/**
 * Un bloc "hérite" du niveau du dernier titre rencontré avant lui. Un bloc placé
 * avant tout titre, ou sous un titre sans niveau explicite, est considéré "socle"
 * et reste toujours visible, quel que soit le filtre actif.
 */
export function filterBlocksByLevel(blocks: ContentBlock[], activeLevels: Set<ContentLevel>): ContentBlock[] {
  let currentLevel: ContentLevel | undefined
  const kept: ContentBlock[] = []
  for (const block of blocks) {
    if (block.type === "heading") {
      currentLevel = block.level
    }
    const visible = currentLevel === undefined || activeLevels.has(currentLevel)
    if (visible) kept.push(block)
  }
  return kept
}
