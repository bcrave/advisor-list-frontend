import { render, screen, fireEvent } from "@testing-library/react";
import AdvisorsList from "../components/AdvisorsListMobile";

describe("AdvisorsList", () => {
  it("fetches and renders an advisor div", async () => {
    render(<AdvisorsList />);
    const advisorDivElement = await screen.findByTestId("advisor-item-0");
    expect(advisorDivElement).toBeInTheDocument();
  });

  it("renders multiple advisor items", async () => {
    render(<AdvisorsList />);
    const advisorDivElements = await screen.findAllByTestId(/advisor-item/i);
    expect(advisorDivElements.length).toBeGreaterThan(1);
  });
});
