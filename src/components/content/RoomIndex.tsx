import type { ContentBlock } from "@/content/types"
import { slugify } from "@/lib/slug"
import { scrollToAnchor } from "@/lib/lenisStore"

/**
 * "Plan de la salle" — table des matières cliquable extraite des titres du module.
 * C'est l'aspect interactif demandé : cliquer une ligne du tableau déplace le
 * visiteur (en douceur, via Lenis) jusqu'à la partie correspondante — voyager
 * dans le cours plutôt que le dérouler passivement.
 */
export function RoomIndex({ blocks }: { blocks: ContentBlock[] }) {
  const headings = blocks.filter((b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading")
  if (headings.length === 0) return null

  function goTo(text: string) {
    const id = slugify(text)
    scrollToAnchor(id)
    const el = document.getElementById(id)
    if (!el) return
    el.classList.add("anchor-flash")
    window.setTimeout(() => el.classList.remove("anchor-flash"), 1300)
  }

  return (
    <div className="mb-12 border border-gilt/20">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gilt px-5 pt-4 pb-3">
        Plan de la salle
      </p>
      <table className="w-full text-sm">
        <tbody>
          {headings.map((h) => (
            <tr key={h.text} className="border-t border-gilt/10">
              <td className="py-0">
                <button
                  type="button"
                  onClick={() => goTo(h.text)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-3 text-left font-heading text-base text-parchment-dim hover:text-gilt hover:bg-gilt/[0.04] transition-colors"
                >
                  <span>{h.text}</span>
                  <span className="font-mono text-xs text-gilt/50 shrink-0">→</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
