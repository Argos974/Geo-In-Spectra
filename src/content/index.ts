import type { ContentBlock } from "./types"
import { fondamentauxContent } from "./fondamentaux"
import { teledetectionContent } from "./teledetection"
import { indicesSpectrauxContent } from "./indices-spectraux"
import { outilsSigContent } from "./outils-sig"
import { travauxPratiquesContent } from "./travaux-pratiques"
import { traitementsIaContent } from "./traitements-ia"

export const moduleContent: Record<string, ContentBlock[]> = {
  fondamentaux: fondamentauxContent,
  teledetection: teledetectionContent,
  "indices-spectraux": indicesSpectrauxContent,
  "outils-sig": outilsSigContent,
  "travaux-pratiques": travauxPratiquesContent,
  "traitements-ia": traitementsIaContent,
}
