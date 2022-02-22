import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders series of advisor cards", () => {
    render(<App />);
    const headingElement = screen.getByText("Advisors");
    expect(headingElement).toBeInTheDocument();
  });
});
