import type { ContentBlock } from "../types"
import { fondamentauxFiche } from "./fondamentaux"
import { teledetectionFiche } from "./teledetection"
import { indicesSpectrauxFiche } from "./indices-spectraux"
import { outilsSigFiche } from "./outils-sig"
import { travauxPratiquesFiche } from "./travaux-pratiques"
import { traitementsIaFiche } from "./traitements-ia"
import { methodologieFiche } from "./methodologie"
import { projectionsAvanceesFiche } from "./projections-avancees"
import { cartographieWebFiche } from "./cartographie-web"
import { statistiquesSpatialesFiche } from "./statistiques-spatiales"
import { photogrammetrieDronesFiche } from "./photogrammetrie-drones"
import { lidarFiche } from "./lidar"
import { basesDonneesSpatialesFiche } from "./bases-donnees-spatiales"
import { etudesDeCasSectoriellesFiche } from "./etudes-de-cas-sectorielles"

export const ficheContent: Record<string, ContentBlock[]> = {
  fondamentaux: fondamentauxFiche,
  teledetection: teledetectionFiche,
  "indices-spectraux": indicesSpectrauxFiche,
  "outils-sig": outilsSigFiche,
  "travaux-pratiques": travauxPratiquesFiche,
  "traitements-ia": traitementsIaFiche,
  methodologie: methodologieFiche,
  "projections-avancees": projectionsAvanceesFiche,
  "cartographie-web": cartographieWebFiche,
  "statistiques-spatiales": statistiquesSpatialesFiche,
  "photogrammetrie-drones": photogrammetrieDronesFiche,
  lidar: lidarFiche,
  "bases-donnees-spatiales": basesDonneesSpatialesFiche,
  "etudes-de-cas-sectorielles": etudesDeCasSectoriellesFiche,
}
