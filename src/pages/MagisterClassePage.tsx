import { useCallback, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { artworks } from "@/data/artworks"
import { modules } from "@/data/modules"
import { COURS_SLUGS } from "@/lib/moduleRoute"
import { ALL_LEVELS, LEVEL_TOGGLE_LABEL } from "@/lib/levelFilter"
import { ArtworkBackdrop } from "@/components/gallery/ArtworkBackdrop"
import { cn } from "@/lib/utils"
import { usePageMeta } from "@/hooks/usePageMeta"
import type { ContentLevel } from "@/content/types"
import type { ModuleProgress } from "@/lib/progress"

type ProgressState = Record<string, ModuleProgress>

interface StudentEntry {
  id: string
  name: string
  data: ProgressState
}

const coursModules = modules.filter((m) => COURS_SLUGS.has(m.slug))

/** Même tolérance de validation que lib/progress.ts::importProgress, mais sans jamais écrire dans le localStorage local (ce fichier n'est pas "le" bilan de l'enseignant, seulement une pièce à agréger). */
function parseProgressExport(json: string): ProgressState | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return null
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return null
  for (const v of Object.values(parsed as Record<string, unknown>)) {
    if (typeof v !== "object" || v === null || Array.isArray(v)) return null
  }
  return parsed as ProgressState
}

function levelAbbrev(level: ContentLevel): string {
  return level === "lycee" ? "L" : level === "superieur" ? "Li" : "M"
}

function studentQuizAverage(data: ProgressState): number | null {
  const scores = Object.values(data)
    .map((p) => p.quizScore)
    .filter((s): s is { score: number; total: number } => !!s && s.total > 0)
  if (scores.length === 0) return null
  const pct = scores.reduce((sum, s) => sum + s.score / s.total, 0) / scores.length
  return Math.round(pct * 100)
}

export function MagisterClassePage() {
  usePageMeta(
    "Classe — Magister",
    "Agrégation des bilans de progression exportés par les élèves, pour un suivi de classe sans compte ni serveur.",
  )
  const art = artworks["methodologie-scolaire"]
  const [students, setStudents] = useState<StudentEntry[]>([])
  const [rejected, setRejected] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList)
    setRejected([])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const text = typeof reader.result === "string" ? reader.result : ""
        const parsed = parseProgressExport(text)
        if (!parsed) {
          setRejected((prev) => [...prev, file.name])
          return
        }
        const name = file.name.replace(/\.json$/i, "")
        setStudents((prev) => [...prev, { id: `${name}-${Date.now()}-${Math.random()}`, name, data: parsed }])
      }
      reader.readAsText(file)
    })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  const removeStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const classAverages = useMemo(() => {
    if (students.length === 0) return null
    const perTrack: Record<ContentLevel, number> = { lycee: 0, superieur: 0, approfondissement: 0 }
    for (const level of ALL_LEVELS) {
      const total = students.length * coursModules.length
      let done = 0
      for (const s of students) {
        for (const m of coursModules) {
          if (s.data[m.slug]?.visitedLevels?.includes(level)) done += 1
        }
      }
      perTrack[level] = total > 0 ? Math.round((done / total) * 100) : 0
    }
    const quizAvgs = students.map((s) => studentQuizAverage(s.data)).filter((v): v is number => v !== null)
    const quizAvg = quizAvgs.length > 0 ? Math.round(quizAvgs.reduce((a, b) => a + b, 0) / quizAvgs.length) : null
    return { perTrack, quizAvg }
  }, [students])

  return (
    <div className="min-h-screen bg-ink text-parchment">
      {art && (
        <ArtworkBackdrop art={art} className="h-64 md:h-80 w-full pt-24">
          <div className="h-full flex flex-col justify-end px-6 md:px-16 pb-10 max-w-3xl">
            <Link to="/magister" className="font-mono text-[11px] uppercase tracking-wider text-gilt hover:underline w-fit mb-4">
              ← Magister
            </Link>
            <p className="font-mono text-[12px] text-gilt mb-3">Profil · Magister</p>
            <h1 className="font-heading text-4xl md:text-5xl">Suivi de classe</h1>
          </div>
        </ArtworkBackdrop>
      )}

      <div className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-parchment-dim text-lg mb-4 text-justify max-w-2xl">
            Aucun compte, aucun serveur : chaque élève exporte son bilan (bouton « Exporter » de sa page Progression,
            un fichier JSON) et vous les déposez ici, dans votre propre navigateur, pour une vue d'ensemble de la
            classe. Rien n'est envoyé nulle part — fermer cet onglet efface la vue, sans toucher au bilan de
            personne.
          </p>

          <div className="border border-gilt/25 bg-gilt/[0.03] p-6 mb-8">
            <label htmlFor="progress-files" className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-3 block">
              Déposer les fichiers export-progression.json
            </label>
            <input
              ref={fileInputRef}
              id="progress-files"
              type="file"
              accept=".json,application/json"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="font-mono text-[11px] text-parchment-dim file:mr-3 file:px-3 file:py-1.5 file:border file:border-gilt/40 file:bg-transparent file:text-gilt file:font-mono file:text-[10px] file:uppercase file:tracking-wider file:cursor-pointer hover:file:bg-gilt/10"
            />
            {rejected.length > 0 && (
              <p className="text-xs text-oxblood-bright mt-3">
                Fichier{rejected.length > 1 ? "s" : ""} illisible{rejected.length > 1 ? "s" : ""} (pas un export de progression valide) : {rejected.join(", ")}
              </p>
            )}
          </div>

          {students.length === 0 ? (
            <p className="font-mono text-[11px] text-parchment-dim/70">Aucun élève chargé pour l'instant.</p>
          ) : (
            <>
              {classAverages && (
                <div className="border border-gilt/15 bg-black/20 p-5 mb-8">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gilt mb-3">
                    Classe entière — {students.length} élève{students.length > 1 ? "s" : ""}
                  </p>
                  <div className="flex flex-wrap gap-6 font-mono text-[11px] text-parchment-dim">
                    {ALL_LEVELS.map((level) => (
                      <p key={level}>
                        Piste {LEVEL_TOGGLE_LABEL[level]} : <span className="text-parchment">{classAverages.perTrack[level]}%</span> des salles ouvertes en moyenne
                      </p>
                    ))}
                    <p>
                      Moyenne quiz : <span className="text-parchment">{classAverages.quizAvg !== null ? `${classAverages.quizAvg}%` : "—"}</span>
                    </p>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto border border-gilt/15">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gilt/25 bg-gilt/[0.04]">
                      <th className="font-mono text-[10px] uppercase tracking-wider text-gilt p-2.5 sticky left-0 bg-ink">Élève</th>
                      {coursModules.map((m) => (
                        <th key={m.slug} className="font-mono text-[10px] uppercase tracking-wider text-gilt p-2.5 whitespace-nowrap">{m.navLabel}</th>
                      ))}
                      <th className="font-mono text-[10px] uppercase tracking-wider text-gilt p-2.5 whitespace-nowrap">Quiz</th>
                      <th className="p-2.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => {
                      const avg = studentQuizAverage(s.data)
                      return (
                        <tr key={s.id} className="border-b border-gilt/10">
                          <td className="font-mono text-[11px] text-parchment p-2.5 sticky left-0 bg-ink whitespace-nowrap">{s.name}</td>
                          {coursModules.map((m) => {
                            const levels = s.data[m.slug]?.visitedLevels ?? []
                            return (
                              <td key={m.slug} className="p-2.5">
                                <div className="flex gap-1">
                                  {ALL_LEVELS.map((level) => (
                                    <span
                                      key={level}
                                      title={LEVEL_TOGGLE_LABEL[level]}
                                      className={cn(
                                        "inline-flex items-center justify-center w-5 h-5 font-mono text-[9px] border",
                                        levels.includes(level) ? "border-gilt bg-gilt/20 text-gilt" : "border-gilt/15 text-parchment-dim/40",
                                      )}
                                    >
                                      {levelAbbrev(level)}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            )
                          })}
                          <td className="font-mono text-[11px] text-parchment-dim p-2.5 whitespace-nowrap">{avg !== null ? `${avg}%` : "—"}</td>
                          <td className="p-2.5">
                            <button
                              type="button"
                              onClick={() => removeStudent(s.id)}
                              className="font-mono text-[10px] uppercase tracking-wider text-parchment-dim/60 hover:text-oxblood-bright transition-colors"
                            >
                              Retirer
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
