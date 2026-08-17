import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MatchingGame } from "./MatchingGame"

const pairs = [
  { left: "NDVI", right: "(NIR − Rouge) / (NIR + Rouge)" },
  { left: "NDBI", right: "(SWIR − NIR) / (SWIR + NIR)" },
]

describe("MatchingGame", () => {
  it("shows the initial 0/N found counter and every pair once", () => {
    render(<MatchingGame pairs={pairs} />)
    expect(screen.getByText(/0 \/ 2 trouvés/)).toBeInTheDocument()
    expect(screen.getByText("NDVI")).toBeInTheDocument()
    expect(screen.getByText("(NIR − Rouge) / (NIR + Rouge)")).toBeInTheDocument()
  })

  it("marks a correct pair as solved and increments the counter", async () => {
    const user = userEvent.setup()
    render(<MatchingGame pairs={pairs} />)

    await user.click(screen.getByText("NDVI"))
    await user.click(screen.getByText("(NIR − Rouge) / (NIR + Rouge)"))

    expect(await screen.findByText(/1 \/ 2 trouvés/)).toBeInTheDocument()
  })

  it("does not advance the solved count on an incorrect pair", async () => {
    const user = userEvent.setup()
    render(<MatchingGame pairs={pairs} />)

    await user.click(screen.getByText("NDVI"))
    await user.click(screen.getByText("(SWIR − NIR) / (SWIR + NIR)"))

    expect(screen.getByText(/0 \/ 2 trouvés/)).toBeInTheDocument()
    expect(screen.getByText(/1 essai/)).toBeInTheDocument()
  })

  it("shows a completion message once every pair is solved", async () => {
    const user = userEvent.setup()
    render(<MatchingGame pairs={pairs} />)

    await user.click(screen.getByText("NDVI"))
    await user.click(screen.getByText("(NIR − Rouge) / (NIR + Rouge)"))
    await user.click(screen.getByText("NDBI"))
    await user.click(screen.getByText("(SWIR − NIR) / (SWIR + NIR)"))

    expect(await screen.findByText("Partie terminée")).toBeInTheDocument()
  })
})
