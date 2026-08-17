import type { ContentBlock } from "../types"
import { fondamentauxFiche } from "./fondamentaux"
import { teledetectionFiche } from "./teledetection"
import { indicesSpectrauxFiche } from "./indices-spectraux"
import { outilsSigFiche } from "./outils-sig"
import { travauxPratiquesFiche } from "./travaux-pratiques"
import { traitementsIaFiche } from "./traitements-ia"

export const ficheContent: Record<string, ContentBlock[]> = {
  fondamentaux: fondamentauxFiche,
  teledetection: teledetectionFiche,
  "indices-spectraux": indicesSpectrauxFiche,
  "outils-sig": outilsSigFiche,
  "travaux-pratiques": travauxPratiquesFiche,
  "traitements-ia": traitementsIaFiche,
}
