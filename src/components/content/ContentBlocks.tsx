import type { ContentBlock } from "@/content/types"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/slug"
import { Diagram } from "@/components/diagrams"

const calloutStyles: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "border-lapis/40 bg-lapis/[0.08]",
  warning: "border-oxblood/40 bg-oxblood/[0.08]",
  example: "border-gilt/40 bg-gilt/[0.07]",
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

const levelStyle: Record<NonNullable<Extract<ContentBlock, { type: "heading" }>["level"]>, string> = {
  "college-lycee": "border-lapis/50 text-lapis",
  superieur: "border-gilt/50 text-gilt",
  approfondissement: "border-oxblood/50 text-oxblood",
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
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
                <h2 className="font-heading text-2xl md:text-3xl">{block.text}</h2>
              </div>
            )

          case "diagram":
            return <Diagram key={i} name={block.name} caption={block.caption} />

          case "paragraph":
            return (
              <p key={i} className="text-parchment-dim leading-relaxed">
                {block.text}
              </p>
            )

          case "list": {
            const Tag = block.ordered ? "ol" : "ul"
            return (
              <Tag key={i} className={cn("space-y-2 text-parchment-dim", block.ordered ? "list-decimal pl-5" : "pl-0")}>
                {block.items.map((item, j) => (
                  <li key={j} className={cn(!block.ordered && "flex items-start gap-3")}>
                    {!block.ordered && <span className="h-1.5 w-1.5 rounded-full bg-gilt shrink-0 mt-2" />}
                    <span>{item}</span>
                  </li>
                ))}
              </Tag>
            )
          }

          case "formula":
            return (
              <div key={i} className="border border-gilt/25 bg-gilt/[0.04] p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-gilt mb-2">{block.label}</p>
                <p className="font-mono text-sm md:text-base text-parchment break-words">{block.formula}</p>
                {block.note && <p className="text-parchment-dim text-sm mt-3">{block.note}</p>}
              </div>
            )

          case "callout":
            return (
              <div key={i} className={cn("border p-5", calloutStyles[block.tone ?? "info"])}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-parchment-dim mb-2">
                  {calloutLabel[block.tone ?? "info"]}
                </p>
                <p className="font-heading text-lg mb-1">{block.title}</p>
                <p className="text-parchment-dim leading-relaxed">{block.text}</p>
              </div>
            )

          case "comparison":
            return (
              <div key={i} className="grid gap-4 md:grid-cols-2">
                {block.items.map((col) => (
                  <div key={col.label} className="border border-gilt/15 bg-white/[0.02] p-5">
                    <p className="font-heading mb-3">{col.label}</p>
                    <ul className="space-y-2">
                      {col.points.map((p, j) => (
                        <li key={j} className="flex items-start gap-2 text-parchment-dim text-sm">
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
              <div key={i} className="overflow-x-auto border border-gilt/15">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gilt/[0.06]">
                      {block.headers.map((h) => (
                        <th key={h} className="text-left font-mono text-[11px] uppercase tracking-wider text-gilt px-4 py-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-t border-gilt/10">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-3 text-parchment-dim align-top">
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
