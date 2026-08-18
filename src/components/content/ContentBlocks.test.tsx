import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ContentBlocks } from "./ContentBlocks"
import type { ContentBlock } from "@/content/types"

const solutionBlock: ContentBlock = {
  type: "solution",
  title: "Séance 1",
  text: "Le CRS du projet doit être Lambert-93 avant tout calcul de surface.",
  items: ["Critère 1 : CRS vérifié", "Critère 2 : légende présente"],
}

describe("ContentBlocks — solution disclosure", () => {
  it("hides the corrigé text behind a closed toggle by default (dark variant)", () => {
    render(<ContentBlocks blocks={[solutionBlock]} />)
    expect(screen.getByRole("button", { name: /Voir le corrigé : Séance 1/ })).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByText(/Lambert-93 avant tout calcul/)).not.toBeInTheDocument()
  })

  it("reveals the corrigé text and flips aria-expanded on click", async () => {
    const user = userEvent.setup()
    render(<ContentBlocks blocks={[solutionBlock]} />)

    const toggle = screen.getByRole("button", { name: /Voir le corrigé : Séance 1/ })
    await user.click(toggle)

    expect(screen.getByText(/Lambert-93 avant tout calcul/)).toBeInTheDocument()
    expect(screen.getByText("Critère 1 : CRS vérifié")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Corrigé : Séance 1/ })).toHaveAttribute("aria-expanded", "true")
  })

  it("always renders the corrigé expanded, without a toggle button, in print variant", () => {
    render(<ContentBlocks blocks={[solutionBlock]} variant="print" />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
    expect(screen.getByText(/Lambert-93 avant tout calcul/)).toBeInTheDocument()
  })
})
