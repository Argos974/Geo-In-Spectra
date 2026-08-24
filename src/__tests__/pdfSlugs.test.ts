import { describe, expect, it } from 'vitest'
import { modules } from '@/data/modules'
import { ALL_SLUGS } from '../../scripts/lib/pdfServer.mjs'

// scripts/lib/pdfServer.mjs duplique la liste des slugs (et leur ordre, qui fixe la
// numérotation "01-", "02-"... des PDF générés) en dur, plutôt que d'importer
// src/data/modules.ts — ces scripts sont du Node autonome sans loader TypeScript (voir
// commentaire dans pdfServer.mjs). Ce test est le seul garde-fou contre un oubli de mise
// à jour de cette copie quand une salle est ajoutée, renommée ou réordonnée.
describe('ALL_SLUGS (scripts/lib/pdfServer.mjs) stays in sync with modules.ts', () => {
  it('has the exact same slugs, in the exact same order', () => {
    expect(ALL_SLUGS).toEqual(modules.map((m) => m.slug))
  })
})
