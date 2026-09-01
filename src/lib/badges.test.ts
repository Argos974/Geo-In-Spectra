import { describe, expect, it } from "vitest"
import { computeBadges } from "./badges"
import { modules } from "@/data/modules"
import { COURS_SLUGS } from "@/lib/moduleRoute"
import type { ModuleProgress } from "@/lib/progress"

describe("computeBadges", () => {
  it("earns nothing from empty progress", () => {
    const badges = computeBadges({})
    expect(badges.every((b) => !b.earned)).toBe(true)
  })

  it("first-quiz and perfect badges react to a single attempt", () => {
    const progress: Record<string, ModuleProgress> = {
      [modules[0].slug]: { quizScore: { score: 10, total: 10 } },
    }
    const badges = computeBadges(progress)
    expect(badges.find((b) => b.id === "first-quiz")?.earned).toBe(true)
    expect(badges.find((b) => b.id === "perfect")?.earned).toBe(true)
    // a non-perfect module shouldn't count toward "perfect"
    const mixed: Record<string, ModuleProgress> = {
      ...progress,
      [modules[1].slug]: { quizScore: { score: 4, total: 10 } },
    }
    expect(computeBadges(mixed).find((b) => b.id === "perfect")?.earned).toBe(true)
  })

  it("all-visited only fires once every module has been visited", () => {
    const almostAll: Record<string, ModuleProgress> = Object.fromEntries(
      modules.slice(0, modules.length - 1).map((m) => [m.slug, { visited: true }]),
    )
    expect(computeBadges(almostAll).find((b) => b.id === "all-visited")?.earned).toBe(false)

    const all: Record<string, ModuleProgress> = Object.fromEntries(modules.map((m) => [m.slug, { visited: true }]))
    const badges = computeBadges(all)
    const allVisited = badges.find((b) => b.id === "all-visited")!
    expect(allVisited.earned).toBe(true)
    expect(allVisited.progress).toBe(modules.length)
  })

  it("explorer threshold scales with the number of modules, never below 5", () => {
    const explorerTarget = Math.max(5, Math.ceil(modules.length * 0.6))
    const justBelow: Record<string, ModuleProgress> = Object.fromEntries(
      modules.slice(0, explorerTarget - 1).map((m) => [m.slug, { visited: true }]),
    )
    expect(computeBadges(justBelow).find((b) => b.id === "five-visited")?.earned).toBe(false)

    const atTarget: Record<string, ModuleProgress> = Object.fromEntries(
      modules.slice(0, explorerTarget).map((m) => [m.slug, { visited: true }]),
    )
    expect(computeBadges(atTarget).find((b) => b.id === "five-visited")?.earned).toBe(true)
  })

  it("persistent badge counts total quiz attempts across all modules, not distinct modules", () => {
    const progress: Record<string, ModuleProgress> = {
      [modules[0].slug]: {
        quizHistory: Array.from({ length: 7 }, (_, i) => ({ score: i, total: 10, date: "2026-01-01" })),
      },
      [modules[1].slug]: {
        quizHistory: Array.from({ length: 5 }, (_, i) => ({ score: i, total: 10, date: "2026-01-01" })),
      },
    }
    const persistent = computeBadges(progress).find((b) => b.id === "persistent")!
    expect(persistent.progress).toBe(12)
    expect(persistent.earned).toBe(true)
  })

  it("track badges only count the 12 leveled Cours modules, one piste at a time", () => {
    const coursSlugs = [...COURS_SLUGS]
    // Visiter Lycée sur toutes les salles de Cours ne doit pas suffire pour la piste Master.
    const allLycee: Record<string, ModuleProgress> = Object.fromEntries(
      coursSlugs.map((slug) => [slug, { visited: true, visitedLevels: ["lycee"] }]),
    )
    const badges = computeBadges(allLycee)
    expect(badges.find((b) => b.id === "track-lycee")?.earned).toBe(true)
    expect(badges.find((b) => b.id === "track-master")?.earned).toBe(false)
  })

  it("track badges ignore a module that only reports 'visited' without a level (legacy entries)", () => {
    const coursSlugs = [...COURS_SLUGS]
    const legacy: Record<string, ModuleProgress> = Object.fromEntries(coursSlugs.map((slug) => [slug, { visited: true }]))
    const badges = computeBadges(legacy)
    expect(badges.find((b) => b.id === "track-lycee")?.progress).toBe(0)
  })
})
