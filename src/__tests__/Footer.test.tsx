import { render, screen } from "../utils/test-utils"
import Footer from "@/components/Footer/Footer";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  /* eslint-disable @next/next/no-img-element */
  default: (props: any) => <img {...props} alt={props.alt || "mocked image"} />,
}));

describe("Footer", () => {
  it("renders the logo with correct alt text", () => {
    render(<Footer />);

    const logoImage = screen.getByAltText("Apply Digital");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/apply-digital-logo.svg");
  });

  it("wraps logo in a link to the homepage", () => {
    render(<Footer />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
