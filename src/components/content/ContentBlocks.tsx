import type { ContentBlock } from "@/content/types"
import { cn } from "@/lib/utils"

const calloutStyles: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "border-signal/30 bg-signal/[0.06]",
  warning: "border-amber/40 bg-amber/[0.06]",
  example: "border-terrain/30 bg-terrain/[0.06]",
}

const calloutLabel: Record<NonNullable<Extract<ContentBlock, { type: "callout" }>["tone"]>, string> = {
  info: "Info",
  warning: "Attention",
  example: "Exemple",
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="font-heading text-2xl md:text-3xl font-semibold pt-8 first:pt-0">
                {block.text}
              </h2>
            )

          case "paragraph":
            return (
              <p key={i} className="text-text-secondary leading-relaxed">
                {block.text}
              </p>
            )

          case "list": {
            const Tag = block.ordered ? "ol" : "ul"
            return (
              <Tag key={i} className={cn("space-y-2 text-text-secondary", block.ordered ? "list-decimal pl-5" : "pl-0")}>
                {block.items.map((item, j) => (
                  <li key={j} className={cn(!block.ordered && "flex items-start gap-3")}>
                    {!block.ordered && <span className="h-1.5 w-1.5 rounded-full bg-signal shrink-0 mt-2" />}
                    <span>{item}</span>
                  </li>
                ))}
              </Tag>
            )
          }

          case "formula":
            return (
              <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-signal mb-2">{block.label}</p>
                <p className="font-mono text-sm md:text-base text-text-primary break-words">{block.formula}</p>
                {block.note && <p className="text-text-secondary text-sm mt-3">{block.note}</p>}
              </div>
            )

          case "callout":
            return (
              <div key={i} className={cn("rounded-lg border p-5", calloutStyles[block.tone ?? "info"])}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-2">
                  {calloutLabel[block.tone ?? "info"]}
                </p>
                <p className="font-heading text-lg font-semibold mb-1">{block.title}</p>
                <p className="text-text-secondary leading-relaxed">{block.text}</p>
              </div>
            )

          case "comparison":
            return (
              <div key={i} className="grid gap-4 md:grid-cols-2">
                {block.items.map((col) => (
                  <div key={col.label} className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
                    <p className="font-heading font-semibold mb-3">{col.label}</p>
                    <ul className="space-y-2">
                      {col.points.map((p, j) => (
                        <li key={j} className="flex items-start gap-2 text-text-secondary text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber shrink-0 mt-1.5" />
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
              <div key={i} className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.04]">
                      {block.headers.map((h) => (
                        <th key={h} className="text-left font-mono text-[11px] uppercase tracking-wider text-signal px-4 py-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-t border-white/5">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-3 text-text-secondary align-top">
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
