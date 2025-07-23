import { render, screen, fireEvent } from "../utils/test-utils"
import GameCard from "@/components/GameCard/GameCard"
import type { Game } from "@/types/game"
import { jest } from "@jest/globals"

const mockGame: Game = {
  id: 1,
  name: "Test Game",
  price: 29.99,
  image: "/test.jpg",
  genre: "Action",
  description: "This is a test game with a long description that should be truncated when displayed.",
  isNew: true,
}

describe("GameCard", () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it("renders game information correctly", () => {
    render(<GameCard game={mockGame} />)

    expect(screen.getByText("Test Game")).toBeInTheDocument()
    expect(screen.getByText("GENRE")).toBeInTheDocument()
    expect(screen.getByText("$30")).toBeInTheDocument()
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("renders free games correctly", () => {
    const freeGame = { ...mockGame, price: 0 }
    render(<GameCard game={freeGame} />)

    expect(screen.getByText("Free")).toBeInTheDocument()
  })

  it("toggles cart state when button is clicked", () => {
    render(<GameCard game={mockGame} />)

    const button = screen.getByText("ADD TO CART")
    fireEvent.click(button)

    expect(screen.getByText("REMOVE FROM CART")).toBeInTheDocument()
  })

  it('removes game from cart when "REMOVE FROM CART" is clicked', () => {
    render(<GameCard game={mockGame} />)

    // First add to cart
    // fireEvent.click(screen.getByText("ADD TO CART"))
    // expect(screen.getByText("REMOVE FROM CART")).toBeInTheDocument()

    // Then remove from cart
    fireEvent.click(screen.getByText("REMOVE FROM CART"))
    expect(screen.getByText("ADD TO CART")).toBeInTheDocument()
  })

})
