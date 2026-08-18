import { useEffect, useState } from "react"
import { getActiveParcours, subscribeActiveParcours, type ActiveParcoursState } from "@/lib/activeParcours"

export function useActiveParcours(): ActiveParcoursState | null {
  const [state, setState] = useState<ActiveParcoursState | null>(() => getActiveParcours())

  useEffect(() => subscribeActiveParcours(() => setState(getActiveParcours())), [])

  return state
}
