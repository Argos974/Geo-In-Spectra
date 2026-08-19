import type { QuizQuestion } from "./types"
import { fondamentauxQuiz } from "./fondamentaux"
import { teledetectionQuiz } from "./teledetection"
import { indicesSpectrauxQuiz } from "./indices-spectraux"
import { outilsSigQuiz } from "./outils-sig"
import { travauxPratiquesQuiz } from "./travaux-pratiques"
import { traitementsIaQuiz } from "./traitements-ia"
import { methodologieQuiz } from "./methodologie"
import { projectionsAvanceesQuiz } from "./projections-avancees"
import { cartographieWebQuiz } from "./cartographie-web"
import { statistiquesSpatialesQuiz } from "./statistiques-spatiales"
import { photogrammetrieDronesQuiz } from "./photogrammetrie-drones"
import { lidarQuiz } from "./lidar"
import { basesDonneesSpatialesQuiz } from "./bases-donnees-spatiales"
import { etudesDeCasSectoriellesQuiz } from "./etudes-de-cas-sectorielles"

export const quizzes: Record<string, QuizQuestion[]> = {
  fondamentaux: fondamentauxQuiz,
  teledetection: teledetectionQuiz,
  "indices-spectraux": indicesSpectrauxQuiz,
  "outils-sig": outilsSigQuiz,
  "travaux-pratiques": travauxPratiquesQuiz,
  "traitements-ia": traitementsIaQuiz,
  methodologie: methodologieQuiz,
  "projections-avancees": projectionsAvanceesQuiz,
  "cartographie-web": cartographieWebQuiz,
  "statistiques-spatiales": statistiquesSpatialesQuiz,
  "photogrammetrie-drones": photogrammetrieDronesQuiz,
  lidar: lidarQuiz,
  "bases-donnees-spatiales": basesDonneesSpatialesQuiz,
  "etudes-de-cas-sectorielles": etudesDeCasSectoriellesQuiz,
}
