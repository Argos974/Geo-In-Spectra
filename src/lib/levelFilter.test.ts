import { describe, expect, it } from "vitest"
import { ALL_LEVELS, filterBlocksByLevel } from "./levelFilter"
import type { ContentBlock, ContentLevel } from "@/content/types"

const heading = (text: string, level?: ContentLevel): ContentBlock => ({ type: "heading", text, level })

const paragraph = (text: string): ContentBlock => ({ type: "paragraph", text })

describe("filterBlocksByLevel", () => {
  it("keeps everything when all levels are active", () => {
    const blocks: ContentBlock[] = [
      paragraph("intro"),
      heading("1. Base", "lycee"),
      paragraph("base content"),
      heading("2. Avancé", "approfondissement"),
      paragraph("advanced content"),
    ]
    const result = filterBlocksByLevel(blocks, new Set(ALL_LEVELS))
    expect(result).toEqual(blocks)
  })

  it("drops a leveled heading and its following blocks when its level is inactive", () => {
    const blocks: ContentBlock[] = [
      heading("1. Base", "lycee"),
      paragraph("base content"),
      heading("2. Avancé", "approfondissement"),
      paragraph("advanced content"),
    ]
    const result = filterBlocksByLevel(blocks, new Set(["lycee"]))
    expect(result).toEqual([heading("1. Base", "lycee"), paragraph("base content")])
  })

  it("always keeps blocks with no preceding leveled heading (socle content)", () => {
    const blocks: ContentBlock[] = [
      paragraph("intro socle"),
      heading("1. Approfondi", "approfondissement"),
      paragraph("hidden if approfondissement inactive"),
    ]
    const result = filterBlocksByLevel(blocks, new Set(["lycee"]))
    expect(result).toEqual([paragraph("intro socle")])
  })

  it("reverts to socle visibility once a heading without a level follows a leveled section", () => {
    const blocks: ContentBlock[] = [
      heading("1. Approfondi", "approfondissement"),
      paragraph("hidden"),
      heading("2. Socle", undefined),
      paragraph("always visible"),
    ]
    const result = filterBlocksByLevel(blocks, new Set(["lycee"]))
    expect(result).toEqual([heading("2. Socle", undefined), paragraph("always visible")])
  })

  it("never drops every level at once from the caller's perspective (ModulePage keeps at least one active)", () => {
    // filterBlocksByLevel itself has no such guard — it's ModulePage's toggle logic
    // that refuses to let the active set become empty. With a genuinely empty set,
    // every leveled section disappears and only unleveled "socle" blocks remain.
    const blocks: ContentBlock[] = [heading("1. X", "superieur"), paragraph("body")]
    const result = filterBlocksByLevel(blocks, new Set())
    expect(result).toEqual([])
  })
})
