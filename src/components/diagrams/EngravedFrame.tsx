import { useRef, type CSSProperties, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { useTiltHover } from "@/hooks/useTiltHover"

interface EngravedFrameProps {
  children: ReactNode
  caption?: string
  plate: string
  /** "dark" = site web (fond ink), "print" = PDF (fond papier clair). */
  variant?: "dark" | "print"
}

/**
 * Cadre commun à toutes les planches diagrammatiques — même filet doré que GalleryFrame,
 * mais pensé pour un schéma vectoriel (fond de la page, pas de photo à recadrer). Les
 * planches elles-mêmes dessinent en `currentColor` : c'est ce wrapper qui décide si
 * elles rendent en or sur fond sombre (site) ou en encre sombre sur papier (PDF).
 */
export function EngravedFrame({ children, caption, plate, variant = "dark" }: EngravedFrameProps) {
  const isPrint = variant === "print"
  const figureRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useScrollReveal(figureRef, !isPrint && !reducedMotion)
  useTiltHover(frameRef, !isPrint && !reducedMotion, 4)

  return (
    <figure ref={figureRef} className="my-2">
      <div ref={frameRef} className={cn("border p-5 md:p-8", isPrint ? "border-[#8a6a2f]/40 bg-black/[0.02]" : "border-gilt/25 bg-black/20 gilt-sheen")}>
        <div
          className={isPrint ? "text-[#3a3020]" : "text-gilt/80"}
          // Un diagramme (NeuralNetwork) a besoin de connaître la couleur de fond réelle
          // pour un effet de "trou" — en impression, ce fond est toujours le papier clair
          // du PDF, quel que soit le thème (sombre/clair) actif sur le site au moment de
          // l'export. Cette variable scoped l'informe sans lui faire porter la logique
          // print/thème lui-même (il continue de ne lire que --color-ink).
          style={isPrint ? ({ "--color-ink": "243 236 221" } as CSSProperties) : undefined}
        >
          {children}
        </div>
      </div>
      <figcaption className={cn("mt-3 font-mono text-[11px] uppercase tracking-[0.15em]", isPrint ? "text-[#5c5140]" : "text-parchment-dim")}>
        <span className={isPrint ? "text-[#8a6a2f]" : "text-gilt"}>Planche {plate}.</span>
        {caption ? <> {caption}</> : null}
      </figcaption>
    </figure>
  )
}
