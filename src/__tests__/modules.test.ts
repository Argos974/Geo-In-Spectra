import { describe, expect, it } from 'vitest'
import { modules } from '@/data/modules'

describe('modules data', () => {
  it('has unique slugs', () => {
    const slugs = modules.map((m) => m.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('every module has at least one topic', () => {
    for (const m of modules) {
      expect(m.topics.length).toBeGreaterThan(0)
    }
  })
})
