import { EngravedFrame } from "./EngravedFrame"
import { diagramRegistry, type DiagramName } from "./registry"

export type { DiagramName }

export function Diagram({ name, caption }: { name: DiagramName; caption?: string }) {
  const entry = diagramRegistry[name]
  if (!entry) return null
  const { Component, plate } = entry
  return (
    <EngravedFrame plate={plate} caption={caption}>
      <Component />
    </EngravedFrame>
  )
}
