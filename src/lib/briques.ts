import type { ContentBlock } from "@/content/types"

type Brique = Extract<ContentBlock, { type: "brique" }>

/** Cherche récursivement les blocs "brique" d'un module (une brique ne peut pas en contenir une autre en pratique, mais rien ne l'interdit au niveau du type). */
function collectBriques(blocks: ContentBlock[], into: Record<string, Brique>): void {
  for (const block of blocks) {
    if (block.type === "brique") {
      into[block.id] = block
      collectBriques(block.blocks, into)
    }
  }
}

/**
 * Récupère les blocs d'une brique déclarée dans le contenu d'un autre module
 * — la réutilisation réelle derrière les séances de l'Atelier (voir
 * atelierSeances.ts::salles) : la théorie n'est jamais recopiée, juste
 * réimportée telle quelle depuis sa salle d'origine. Prend le tableau de
 * blocs directement (ex. `fondamentauxContent`), pas un slug résolu via
 * `moduleContent` (src/content/index.ts) : ce module agrège justement
 * `travauxPratiquesContent`, donc un appel `getBrique(slug, id)` depuis
 * travaux-pratiques.ts créerait un cycle d'import où `moduleContent` n'est
 * pas encore initialisé au moment où travaux-pratiques.ts s'évalue.
 * `console.warn` plutôt qu'une exception si l'id n'existe pas : une séance
 * ne doit jamais planter tout le site pour une brique mal orthographiée,
 * juste afficher un trou visible en dev.
 */
export function getBrique(moduleBlocks: ContentBlock[], briqueId: string): ContentBlock[] {
  const briques: Record<string, Brique> = {}
  collectBriques(moduleBlocks, briques)
  const brique = briques[briqueId]
  if (!brique) {
    console.warn(`getBrique: brique "${briqueId}" introuvable`)
    return []
  }
  return brique.blocks
}
