import "@testing-library/jest-dom";

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CharacterCard from "@/src/ui/components/card";
import { charactersMock } from "../../../mocks/charactersMock";

const mockCharacter = charactersMock.results[0];

describe("CharacterCard", () => {
  it("renders character details correctly", () => {
    render(<CharacterCard character={mockCharacter} onClick={jest.fn()} />);
    expect(screen.getByText(/NAME:/i)).toBeInTheDocument();
    expect(screen.getByText(/Rick Sanchez/)).toBeInTheDocument();
    expect(screen.getByText(/STATUS:/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/)).toBeInTheDocument();
    expect(screen.getByText(/SPECIE:/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    const handleClick = jest.fn();
    render(<CharacterCard character={mockCharacter} onClick={handleClick} />);
    fireEvent.click(screen.getByAltText("Rick Sanchez").parentElement!);
    expect(handleClick).toHaveBeenCalled();
  });

  it("applies active styles when active prop is true", () => {
    render(
      <CharacterCard character={mockCharacter} onClick={jest.fn()} active />
    );
    const card = screen.getByTestId("character-card");
    expect(card).toHaveClass("bg-blue-700");
  });

  it("applies default styles when active prop is false", () => {
    render(<CharacterCard character={mockCharacter} onClick={jest.fn()} />);
    const card = screen.getByTestId("character-card");
    expect(card).toHaveClass("bg-gray-800");
  });
});
