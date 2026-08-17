import type { ContentBlock } from "@/content/types"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/slug"
import { Diagram } from "@/components/diagrams"

type Variant = "dark" | "print"

const calloutStylesDark: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "border-lapis/40 bg-lapis/[0.08]",
  warning: "border-oxblood/40 bg-oxblood/[0.08]",
  example: "border-gilt/40 bg-gilt/[0.07]",
}
const calloutStylesPrint: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "border-lapis/50 bg-lapis/[0.05]",
  warning: "border-oxblood/50 bg-oxblood/[0.05]",
  example: "border-[#8a6a2f]/50 bg-[#8a6a2f]/[0.05]",
}

const calloutLabel: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "Remarque",
  warning: "Attention",
  example: "Exemple",
}

const levelLabel: Record<NonNullable<Extract<ContentBlock, { type: "heading" }>["level"]>, string> = {
  "college-lycee": "Collège / lycée",
  superieur: "Supérieur",
  approfondissement: "Approfondissement",
}

const levelStyleDark: Record<NonNullable<Extract<ContentBlock, { type: "heading" }>["level"]>, string> = {
  "college-lycee": "border-lapis/50 text-lapis",
  superieur: "border-gilt/50 text-gilt",
  approfondissement: "border-oxblood/50 text-oxblood",
}
const levelStylePrint: Record<NonNullable<Extract<ContentBlock, { type: "heading" }>["level"]>, string> = {
  "college-lycee": "border-lapis/60 text-lapis",
  superieur: "border-[#8a6a2f]/60 text-[#8a6a2f]",
  approfondissement: "border-oxblood/60 text-oxblood",
}

export function ContentBlocks({ blocks, variant = "dark" }: { blocks: ContentBlock[]; variant?: Variant }) {
  const isPrint = variant === "print"

  const text = isPrint ? "text-[#2b2116]" : "text-parchment"
  const textDim = isPrint ? "text-[#5c5140]" : "text-parchment-dim"
  const accent = isPrint ? "text-[#8a6a2f]" : "text-gilt"
  const accentBg = isPrint ? "bg-[#8a6a2f]" : "bg-gilt"
  const border = isPrint ? "border-[#8a6a2f]/35" : "border-gilt/25"
  const borderSoft = isPrint ? "border-[#8a6a2f]/20" : "border-gilt/15"
  const panelBg = isPrint ? "bg-[#8a6a2f]/[0.04]" : "bg-gilt/[0.04]"
  const calloutStyles = isPrint ? calloutStylesPrint : calloutStylesDark
  const levelStyle = isPrint ? levelStylePrint : levelStyleDark

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <div key={i} id={slugify(block.text)} className="pt-8 first:pt-0 scroll-mt-28">
                {block.level && (
                  <span className={cn("inline-block mb-2 font-mono text-[10px] uppercase tracking-wider border px-2 py-0.5", levelStyle[block.level])}>
                    {levelLabel[block.level]}
                  </span>
                )}
                <h2 className={cn("font-heading text-2xl md:text-3xl", text)}>{block.text}</h2>
              </div>
            )

          case "diagram":
            return <Diagram key={i} name={block.name} caption={block.caption} variant={variant} />

          case "paragraph":
            return (
              <p key={i} className={cn("leading-relaxed", textDim)}>
                {block.text}
              </p>
            )

          case "list": {
            const Tag = block.ordered ? "ol" : "ul"
            return (
              <Tag key={i} className={cn("space-y-2", textDim, block.ordered ? "list-decimal pl-5" : "pl-0")}>
                {block.items.map((item, j) => (
                  <li key={j} className={cn(!block.ordered && "flex items-start gap-3")}>
                    {!block.ordered && <span className={cn("h-1.5 w-1.5 rounded-full shrink-0 mt-2", accentBg)} />}
                    <span>{item}</span>
                  </li>
                ))}
              </Tag>
            )
          }

          case "formula":
            return (
              <div key={i} className={cn("border p-5", border, panelBg)}>
                <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-2", accent)}>{block.label}</p>
                <p className={cn("font-mono text-sm md:text-base break-words", text)}>{block.formula}</p>
                {block.note && <p className={cn("text-sm mt-3", textDim)}>{block.note}</p>}
              </div>
            )

          case "callout":
            return (
              <div key={i} className={cn("border p-5", calloutStyles[block.tone ?? "info"])}>
                <p className={cn("font-mono text-[11px] uppercase tracking-wider mb-2", textDim)}>
                  {calloutLabel[block.tone ?? "info"]}
                </p>
                <p className={cn("font-heading text-lg mb-1", text)}>{block.title}</p>
                <p className={cn("leading-relaxed", textDim)}>{block.text}</p>
              </div>
            )

          case "comparison":
            return (
              <div key={i} className="grid gap-4 md:grid-cols-2">
                {block.items.map((col) => (
                  <div key={col.label} className={cn("border p-5", borderSoft, isPrint ? "bg-black/[0.015]" : "bg-white/[0.02]")}>
                    <p className={cn("font-heading mb-3", text)}>{col.label}</p>
                    <ul className="space-y-2">
                      {col.points.map((p, j) => (
                        <li key={j} className={cn("flex items-start gap-2 text-sm", textDim)}>
                          <span className="h-1.5 w-1.5 rounded-full bg-lapis shrink-0 mt-1.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )

          case "table":
            return (
              <div key={i} className={cn("overflow-x-auto border", borderSoft)}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className={panelBg}>
                      {block.headers.map((h) => (
                        <th key={h} className={cn("text-left font-mono text-[11px] uppercase tracking-wider px-4 py-3 whitespace-nowrap", accent)}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className={cn("border-t", borderSoft)}>
                        {row.map((cell, k) => (
                          <td key={k} className={cn("px-4 py-3 align-top", textDim)}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
