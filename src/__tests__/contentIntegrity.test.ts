import { describe, expect, it } from 'vitest'
import { moduleContent } from '@/content'
import { modules } from '@/data/modules'
import type { ContentBlock } from '@/content/types'

// Garde-fous nés d'un audit qui a trouvé, à la main, ~20 renvois internes cassés
// après le passage des salles de Cours à 3 pistes (titres dupliqués entre pistes,
// "(section N)" pointant vers un numéro qui n'existe plus, liens vers un slug
// disparu). Ces trois tests attrapent la même classe d'erreur avant qu'elle ne
// retraverse tout le site pour être retrouvée à la main une seconde fois.

const NAV_LABELS_WITH_TRACKS = new Set(
  modules
    .filter((m) => m.slug !== 'methodologie')
    .map((m) => m.navLabel),
)

describe('content headings are unique within each module', () => {
  // slugify() (lib/slug.ts) fabrique l'id DOM et l'ancre de recherche/scroll à
  // partir du seul texte du titre : deux titres identiques dans le même module
  // produiraient deux éléments DOM avec le même id, l'un des deux invisible à
  // toute ancre.
  for (const [slug, blocks] of Object.entries(moduleContent)) {
    it(`${slug} has no duplicate heading text`, () => {
      const headings = blocks.filter((b): b is Extract<ContentBlock, { type: 'heading' }> => b.type === 'heading').map((b) => b.text)
      const seen = new Set<string>()
      const duplicates = headings.filter((h) => {
        if (seen.has(h)) return true
        seen.add(h)
        return false
      })
      expect(duplicates).toEqual([])
    })
  }
})

describe('content has no fragile numeric section reference to a leveled module', () => {
  // Un renvoi du type "(module Le Regard, section 9)" pointait vers un numéro de
  // section qui n'existe plus une fois cette salle éclatée en 3 pistes numérotées
  // indépendamment — la classe de bug exacte trouvée par l'audit. La correction
  // adoptée partout est un renvoi non numérique ("piste Lycée : sujet"), robuste
  // à un futur remaniement. Ce test interdit qu'un nouveau renvoi numérique vers
  // l'une des salles à pistes ne réapparaisse sans être vu.
  const pattern = /\b([A-ZÀ-Ý][\wÀ-ÿ' ]*?),?\s*section\s+\d+/g

  for (const [slug, blocks] of Object.entries(moduleContent)) {
    it(`${slug} does not reference a leveled module by numeric section`, () => {
      const offenders: string[] = []
      for (const b of blocks) {
        const text = 'text' in b ? b.text : undefined
        if (!text) continue
        for (const match of text.matchAll(pattern)) {
          const label = match[1].trim()
          if (NAV_LABELS_WITH_TRACKS.has(label)) offenders.push(match[0])
        }
      }
      expect(offenders).toEqual([])
    })
  }
})

describe('internal content links resolve to a real module slug', () => {
  const validSlugs = new Set(modules.map((m) => m.slug))

  for (const [slug, blocks] of Object.entries(moduleContent)) {
    it(`${slug} only links to modules that exist`, () => {
      const badLinks: string[] = []
      for (const b of blocks) {
        if (b.type !== 'link') continue
        const match = b.to.match(/^\/module\/([^/]+)/)
        if (match && !validSlugs.has(match[1])) badLinks.push(b.to)
      }
      expect(badLinks).toEqual([])
    })
  }
})
