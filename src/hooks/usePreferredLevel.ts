import { useEffect, useState } from "react"
import { getPreferredLevel, subscribePreferredLevel } from "@/lib/preferredLevel"
import type { ContentLevel } from "@/content/types"

/**
 * Se resynchronise en direct : les 12 salles de Cours restent toutes montées
 * dans le DOM même repliées (voir ChapterAccordion), donc changer de piste
 * dans la salle ouverte doit mettre à jour le défaut des 11 autres, fermées à
 * cet instant — jamais de saut visuel, seule la salle actuellement ouverte a
 * pu déclencher le changement (accordéon à exclusivité native, une seule
 * ouverte à la fois).
 */
export function usePreferredLevel(): ContentLevel | null {
  const [level, setLevel] = useState<ContentLevel | null>(() => getPreferredLevel())

  useEffect(() => subscribePreferredLevel(() => setLevel(getPreferredLevel())), [])

  return level
}
