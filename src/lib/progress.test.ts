import { beforeEach, describe, expect, it, vi } from "vitest"
import {
  advanceReviewBox,
  clearWrongQuestion,
  exportProgress,
  getActivityDates,
  getDueReviewQuestions,
  getProgress,
  getReviewQueueSize,
  importProgress,
  markExercisesVisited,
  markVisited,
  recordQuizScore,
  recordWrongQuestion,
  resetProgress,
  resetReviewBox,
} from "./progress"

beforeEach(() => {
  resetProgress()
})

describe("markVisited / getProgress", () => {
  it("marks a module visited with a timestamp", () => {
    markVisited("fondamentaux")
    const p = getProgress()
    expect(p.fondamentaux?.visited).toBe(true)
    expect(p.fondamentaux?.visitedAt).toBeTruthy()
  })
})

describe("recordQuizScore", () => {
  it("keeps only the best score but appends every attempt to history", () => {
    recordQuizScore("fondamentaux", 5, 10)
    recordQuizScore("fondamentaux", 8, 10)
    recordQuizScore("fondamentaux", 3, 10)
    const p = getProgress()
    expect(p.fondamentaux?.quizScore).toEqual({ score: 8, total: 10 })
    expect(p.fondamentaux?.quizHistory).toHaveLength(3)
  })
})

describe("Leitner review queue", () => {
  it("recordWrongQuestion enters a card at box 1, due immediately", () => {
    recordWrongQuestion("fondamentaux", 2)
    const due = getDueReviewQuestions()
    expect(due.fondamentaux).toEqual([2])
  })

  it("advanceReviewBox moves the card forward and pushes its due date out", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"))
    recordWrongQuestion("fondamentaux", 2)
    advanceReviewBox("fondamentaux", 2) // box 1 -> 2, due in 1 day
    expect(getDueReviewQuestions().fondamentaux).toBeUndefined()
    vi.setSystemTime(new Date("2026-01-02T00:00:01.000Z"))
    expect(getDueReviewQuestions().fondamentaux).toEqual([2])
    vi.useRealTimers()
  })

  it("advancing past box 5 removes the card from the queue entirely", () => {
    recordWrongQuestion("fondamentaux", 2)
    for (let i = 0; i < 5; i++) advanceReviewBox("fondamentaux", 2)
    expect(getReviewQueueSize()).toBe(0)
  })

  it("resetReviewBox drops a card back to box 1, due immediately", () => {
    recordWrongQuestion("fondamentaux", 2)
    advanceReviewBox("fondamentaux", 2)
    expect(getDueReviewQuestions().fondamentaux).toBeUndefined()
    resetReviewBox("fondamentaux", 2)
    expect(getDueReviewQuestions().fondamentaux).toEqual([2])
  })

  it("clearWrongQuestion removes a card without touching others", () => {
    recordWrongQuestion("fondamentaux", 1)
    recordWrongQuestion("fondamentaux", 2)
    clearWrongQuestion("fondamentaux", 1)
    expect(getDueReviewQuestions().fondamentaux).toEqual([2])
  })
})

describe("getActivityDates", () => {
  it("derives distinct days from visits, exercises and quiz attempts", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-01-01T10:00:00.000Z"))
    markVisited("fondamentaux")
    markExercisesVisited("teledetection")
    vi.setSystemTime(new Date("2026-01-02T10:00:00.000Z"))
    recordQuizScore("fondamentaux", 5, 10)
    vi.useRealTimers()
    expect(getActivityDates()).toEqual(["2026-01-01", "2026-01-02"])
  })
})

describe("export / import round trip", () => {
  it("importProgress restores exactly what exportProgress produced", () => {
    markVisited("fondamentaux")
    recordQuizScore("fondamentaux", 7, 10)
    const dump = exportProgress()
    resetProgress()
    expect(getProgress()).toEqual({})
    const ok = importProgress(dump)
    expect(ok).toBe(true)
    expect(getProgress()).toEqual(JSON.parse(dump))
  })

  it("rejects malformed JSON without touching existing progress", () => {
    markVisited("fondamentaux")
    const before = getProgress()
    expect(importProgress("not json")).toBe(false)
    expect(importProgress("[1,2,3]")).toBe(false)
    expect(importProgress('{"fondamentaux": "not an object"}')).toBe(false)
    expect(getProgress()).toEqual(before)
  })
})

describe("legacy wrongQuestions migration", () => {
  it("converts a pre-Leitner wrongQuestions list into a box-1 review queue on read", () => {
    localStorage.setItem(
      "geo-in-spectra-progress-v1",
      JSON.stringify({ fondamentaux: { visited: true, wrongQuestions: [0, 3] } }),
    )
    const due = getDueReviewQuestions()
    expect(due.fondamentaux?.sort()).toEqual([0, 3])
  })
})
