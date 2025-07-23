import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardContent } from "@/components/Card/Card";

describe("Card component", () => {

  it("renders children correctly", () => {

    render(<Card>Card content</Card>);

    expect(screen.getByText("Card content")).toBeInTheDocument();

  });

  it("applies default padding (md)", () => {
    const { container } = render(<Card>Content</Card>);

    expect(container.firstChild).toHaveClass("p-6");
  });

  it("applies custom padding", () => {
    const { container } = render(<Card padding="lg">Content</Card>);

    expect(container.firstChild).toHaveClass("p-8");
  });

  it("adds extra className if it exists", () => {
    const { container } = render(<Card className="shadow-lg">Content</Card>);

    expect(container.firstChild).toHaveClass("shadow-lg");
  });
});

describe("CardHeader component", () => {
  it("renders children", () => {
    render(<CardHeader>Header</CardHeader>);

    expect(screen.getByText("Header")).toBeInTheDocument();

  });

  it("adds extra className", () => {

    const { container } = render(
      <CardHeader className="text-xl">Header</CardHeader>
    );

    expect(container.firstChild).toHaveClass("text-xl");
  });
});

describe("CardContent component", () => {

  it("renders children", () => {

    render(<CardContent>Body</CardContent>);

    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("adds extra className", () => {

    const { container } = render(

      <CardContent className="text-gray-700">Body</CardContent>
    );

    expect(container.firstChild).toHaveClass("text-gray-700");
  });
});
