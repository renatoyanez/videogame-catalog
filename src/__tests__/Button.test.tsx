import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/Button/Button"; // adjust path to where your Button lives

describe("Button", () => {

  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    
    expect(button).toHaveClass("bg-[#585660]");
  });

  it("renders a secondary variant", () => {

    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole("button", { name: /secondary/i });

    expect(button).toHaveClass("bg-gray-100");
  });

  it("is disabled when loading", () => {

    render(<Button loading>Loading</Button>);
    const button = screen.getByRole("button", { name: /loading/i });

    expect(button).toBeDisabled();
    expect(button.querySelector("svg")).toBeInTheDocument(); // loading spinner
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    const button = screen.getByRole("button", { name: /click/i });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
