import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { glossary } from "@/data/glossary"

/** "MAUP (Modifiable Areal Unit Problem)" → "MAUP" : la prose des salles emploie le terme court, jamais le libellé complet du glossaire. */
function primaryLabel(term: string): string {
  const i = term.indexOf(" (")
  return (i === -1 ? term : term.slice(0, i)).trim()
}

let cachedByModule: Map<string, { label: string; term: string }[]> | null = null

function termsForModule(moduleSlug: string): { label: string; term: string }[] {
  if (!cachedByModule) {
    cachedByModule = new Map()
    for (const g of glossary) {
      for (const slug of [g.moduleSlug, ...(g.alsoModuleSlugs ?? [])]) {
        const list = cachedByModule.get(slug) ?? []
        list.push({ label: primaryLabel(g.term), term: g.term })
        cachedByModule.set(slug, list)
      }
    }
    // Termes longs d'abord : évite qu'un match court ("SIG") capture une partie
    // d'un terme plus long qui le contient, avant que le terme long ait sa chance.
    for (const list of cachedByModule.values()) list.sort((a, b) => b.label.length - a.label.length)
  }
  return cachedByModule.get(moduleSlug) ?? []
}

/**
 * Relie la PREMIÈRE occurrence de chaque terme du glossaire propre à ce module
 * vers sa définition (GlossaryPage, préfiltrée sur ce terme via state.prefillQuery
 * — pas d'ancre de page, la recherche déjà présente sur /glossaire suffit).
 * Volontairement borné aux termes du MÊME module (pas tout le glossaire) : lier
 * depuis Fondements vers un terme de L'Intelligence introduirait un renvoi vers
 * une notion pas encore vue à ce stade de lecture, plus déroutant qu'utile.
 */
export function linkifyGlossaryTerms(text: string, moduleSlug: string | undefined): ReactNode {
  if (!moduleSlug) return text
  const terms = termsForModule(moduleSlug)
  if (terms.length === 0) return text

  const remaining = new Set(terms.map((t) => t.label))
  const pattern = terms.map((t) => t.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")
  const regex = new RegExp(`\\b(${pattern})\\b`, "g")

  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    const label = match[0]
    if (!remaining.has(label)) continue // déjà lié une fois plus haut dans ce même texte
    remaining.delete(label)
    const found = terms.find((t) => t.label === label)!
    parts.push(text.slice(lastIndex, match.index))
    parts.push(
      <Link
        key={key++}
        to="/glossaire"
        state={{ prefillQuery: found.term }}
        className="underline decoration-dotted decoration-gilt/50 underline-offset-4 hover:text-gilt hover:decoration-gilt transition-colors"
      >
        {label}
      </Link>,
    )
    lastIndex = match.index + label.length
  }
  parts.push(text.slice(lastIndex))
  return parts
}
