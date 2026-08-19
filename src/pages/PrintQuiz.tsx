import { useParams } from "react-router-dom"
import { modules } from "@/data/modules"
import { quizzes } from "@/data/quizzes"

const ROOM_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"]
const CHOICE_LETTERS = ["A", "B", "C", "D", "E", "F"]

interface PrintQuizProps {
  /** false → feuille d'énoncé vierge (choix listés, rien de coché) ; true → corrigé (bonne réponse marquée + explication). */
  corrige: boolean
}

/**
 * Mise en page dédiée à l'export PDF du quiz d'une salle — même principe que
 * PrintCourse/PrintFiche (route dédiée, jamais visitée par un humain dans le
 * navigateur, thème papier clair). Une même page sert les deux PDF annoncés
 * dans la convention de nommage (README, "Export PDF") : `quiz` (énoncé seul,
 * imprimable pour composer sans les réponses) et `quiz-corrige` (avec la
 * bonne réponse et l'explication) — seul le prop `corrige` change entre les
 * deux routes qui la rendent (voir RootRouter.tsx).
 */
export function PrintQuiz({ corrige }: PrintQuizProps) {
  const { slug } = useParams<{ slug: string }>()
  const module = modules.find((m) => m.slug === slug)
  if (!module) return null

  const index = modules.findIndex((m) => m.slug === slug)
  const numeral = ROOM_NUMERALS[index] ?? String(index + 1)
  const questions = quizzes[module.slug] ?? []

  return (
    <div className="bg-[#f3ecdd] text-[#2b2116] font-body px-16 py-20 max-w-3xl mx-auto">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#8a6a2f] mb-4">
        Geo-In-Spectra · {corrige ? "Quiz corrigé" : "Quiz"} · Salle {numeral}
      </p>
      <h1 className="font-heading text-3xl mb-2">{module.title}</h1>
      <p className="text-[#5c5140] mb-10 text-justify">
        {corrige
          ? "Corrigé : bonne réponse marquée, explication en dessous de chaque question."
          : `${questions.length} question${questions.length > 1 ? "s" : ""} — entourer la bonne réponse.`}
      </p>

      <ol className="space-y-10">
        {questions.map((q, qi) => (
          <li key={q.question} className="break-inside-avoid">
            <p className="font-heading text-lg mb-4">
              {qi + 1}. {q.question}
            </p>
            <ul className="space-y-2 mb-3">
              {q.choices.map((choice, ci) => {
                const isCorrect = corrige && ci === q.correctIndex
                return (
                  <li
                    key={choice}
                    className={isCorrect ? "font-semibold text-[#2b2116]" : "text-[#2b2116]"}
                  >
                    <span className="font-mono text-[#8a6a2f] mr-2">
                      {isCorrect ? "✓" : "☐"} {CHOICE_LETTERS[ci] ?? ci + 1}.
                    </span>
                    {choice}
                  </li>
                )
              })}
            </ul>
            {corrige && (
              <p className="text-[#5c5140] text-sm leading-relaxed text-justify border-l-2 border-[#8a6a2f]/30 pl-4">
                {q.explanation}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
