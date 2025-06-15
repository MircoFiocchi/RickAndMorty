import "@testing-library/jest-dom";

import React from "react";
import { render, screen } from "@testing-library/react";

import Item from "@/src/ui/components/item/Item";


describe("Item", () => {
  it("renders the episode, name, and airDate correctly", () => {
    render(<Item episode="S01E01" name="Pilot" airDate="2023-01-01" />);
    const el = screen.getByTestId("episode-item");
    expect(el).toHaveTextContent("🎥 - S01E01 - Pilot - 2023-01-01");
  });
});
