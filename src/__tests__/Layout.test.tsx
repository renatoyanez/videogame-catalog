import { render, screen } from "@testing-library/react";
import Layout from "@/components/Layout/Layout";

jest.mock("../components/Layout/classes", () => ({
  layoutClasses: {
    container: {
      page: "page-layout-class",
      header: "header-layout-class",
    },
  },
}));

describe("Layout component", () => {
  it("renders children correctly", () => {
    render(
      <Layout>
        <p>Test content</p>
      </Layout>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies default layout class (type='page')", () => {
    const { container } = render(
      <Layout>
        <p>Content</p>
      </Layout>
    );
    const layoutDiv = container.querySelector("div");
    expect(layoutDiv).toHaveClass("page-layout-class");
  });

  it("applies 'header' layout class when type is 'header'", () => {
    const { container } = render(
      <Layout type="header">
        <p>Content</p>
      </Layout>
    );
    const layoutDiv = container.querySelector("div");
    expect(layoutDiv).toHaveClass("header-layout-class");
  });

  it("appends custom className if provided", () => {
    const { container } = render(
      <Layout className="custom-class">
        <p>Test</p>
      </Layout>
    );
    const layoutDiv = container.querySelector("div");
    expect(layoutDiv).toHaveClass("custom-class");
  });

  it("renders backButton when provided", () => {
    render(
      <Layout backButton={<button>Go Back</button>}>
        <p>Page</p>
      </Layout>
    );
    expect(
      screen.getByRole("button", { name: /go back/i })
    ).toBeInTheDocument();
  });
});
