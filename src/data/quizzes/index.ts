import type { QuizQuestion } from "./types"
import { fondamentauxQuiz } from "./fondamentaux"
import { teledetectionQuiz } from "./teledetection"
import { indicesSpectrauxQuiz } from "./indices-spectraux"
import { outilsSigQuiz } from "./outils-sig"
import { travauxPratiquesQuiz } from "./travaux-pratiques"
import { traitementsIaQuiz } from "./traitements-ia"
import { methodologieQuiz } from "./methodologie"

export const quizzes: Record<string, QuizQuestion[]> = {
  fondamentaux: fondamentauxQuiz,
  teledetection: teledetectionQuiz,
  "indices-spectraux": indicesSpectrauxQuiz,
  "outils-sig": outilsSigQuiz,
  "travaux-pratiques": travauxPratiquesQuiz,
  "traitements-ia": traitementsIaQuiz,
  methodologie: methodologieQuiz,
}
