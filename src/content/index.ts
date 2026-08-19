import type { ContentBlock } from "./types"
import { fondamentauxContent } from "./fondamentaux"
import { teledetectionContent } from "./teledetection"
import { indicesSpectrauxContent } from "./indices-spectraux"
import { outilsSigContent } from "./outils-sig"
import { travauxPratiquesContent } from "./travaux-pratiques"
import { traitementsIaContent } from "./traitements-ia"
import { methodologieContent } from "./methodologie"
import { projectionsAvanceesContent } from "./projections-avancees"
import { cartographieWebContent } from "./cartographie-web"
import { statistiquesSpatialesContent } from "./statistiques-spatiales"
import { photogrammetrieDronesContent } from "./photogrammetrie-drones"
import { lidarContent } from "./lidar"
import { basesDonneesSpatialesContent } from "./bases-donnees-spatiales"
import { etudesDeCasSectoriellesContent } from "./etudes-de-cas-sectorielles"

export const moduleContent: Record<string, ContentBlock[]> = {
  fondamentaux: fondamentauxContent,
  teledetection: teledetectionContent,
  "indices-spectraux": indicesSpectrauxContent,
  "outils-sig": outilsSigContent,
  "travaux-pratiques": travauxPratiquesContent,
  "traitements-ia": traitementsIaContent,
  methodologie: methodologieContent,
  "projections-avancees": projectionsAvanceesContent,
  "cartographie-web": cartographieWebContent,
  "statistiques-spatiales": statistiquesSpatialesContent,
  "photogrammetrie-drones": photogrammetrieDronesContent,
  lidar: lidarContent,
  "bases-donnees-spatiales": basesDonneesSpatialesContent,
  "etudes-de-cas-sectorielles": etudesDeCasSectoriellesContent,
}
