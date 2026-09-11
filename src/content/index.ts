import type { ContentBlock } from "./types"
import { fondamentauxContent } from "./fondamentaux"
import { teledetectionContent } from "./teledetection"
import { indicesSpectrauxContent } from "./indices-spectraux"
import { outilsSigContent } from "./outils-sig"
import { qgisContent } from "./qgis"
import { terrsetContent } from "./terrset"
import { programmationRContent } from "./programmation-r"
import { vscodeContent } from "./vscode"
import { analyseStatistiqueContent } from "./analyse-statistique"
import { algorithmesSpatiauxContent } from "./algorithmes-spatiaux"
import { systemesMultiAgentsContent } from "./systemes-multi-agents"
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
  qgis: qgisContent,
  terrset: terrsetContent,
  "programmation-r": programmationRContent,
  vscode: vscodeContent,
  "analyse-statistique": analyseStatistiqueContent,
  "algorithmes-spatiaux": algorithmesSpatiauxContent,
  "systemes-multi-agents": systemesMultiAgentsContent,
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
