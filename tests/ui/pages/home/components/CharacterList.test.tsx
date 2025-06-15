import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterList from "@/src/ui/pages/home/components/CharacterList";

import { charactersMock } from "../../../../mocks/charactersMock";

const mockCharacters = charactersMock.results;

const mockOnPageChange = jest.fn();
const mockSelectEpisodes = jest.fn();

jest.mock("@/src/ui/components/card/CharacterCard", () => (props: any) => (
  <div
    data-testid={`character-card-${props.character.id}`}
    data-active={props.active}
    onClick={props.onClick}
  >
    {props.character.name}
  </div>
));

jest.mock("@/src/ui/components/pagination", () => (props: any) => (
  <button
    data-testid="pagination"
    onClick={() => props.onPageChange(2)}
  >
    Pagination
  </button>
));

describe("CharacterList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title", () => {
    render(
      <CharacterList
        title="Test Title"
        characters={mockCharacters}
        totalPages={3}
        type="even"
        onPageChange={mockOnPageChange}
        selectEpisodes={mockSelectEpisodes}
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders all character cards", () => {
    render(
      <CharacterList
        title="Characters"
        characters={mockCharacters}
        totalPages={2}
        type="odd"
        onPageChange={mockOnPageChange}
        selectEpisodes={mockSelectEpisodes}
      />
    );
    expect(screen.getByTestId("character-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("character-card-2")).toBeInTheDocument();
  });

  it("calls selectEpisodes and sets activeId when a card is clicked", () => {
    render(
      <CharacterList
        title="Characters"
        characters={mockCharacters}
        totalPages={2}
        type="even"
        onPageChange={mockOnPageChange}
        selectEpisodes={mockSelectEpisodes}
      />
    );
    const card = screen.getByTestId("character-card-2");
    fireEvent.click(card);
    expect(mockSelectEpisodes).toHaveBeenCalledWith(
      mockCharacters[1].episode,
      "even"
    );
    expect(card.getAttribute("data-active")).toBe("true");
  });

  it("calls onPageChange with correct arguments when pagination is clicked", () => {
    render(
      <CharacterList
        title="Characters"
        characters={mockCharacters}
        totalPages={2}
        type="odd"
        onPageChange={mockOnPageChange}
        selectEpisodes={mockSelectEpisodes}
      />
    );
    const pagination = screen.getByTestId("pagination");
    fireEvent.click(pagination);
    expect(mockOnPageChange).toHaveBeenCalledWith(2, "odd");
  });
});