import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";

import { useCharacters } from "@/src/ui/hooks/characters/useCharacters";
import { useEpisodes } from "@/src/ui/hooks/episodes/useEpisodes";
import PageHome from "@/src/ui/pages/home";

import { charactersMock } from "../../../mocks/charactersMock";

jest.mock("@/src/ui/hooks/characters/useCharacters");
jest.mock("@/src/ui/hooks/episodes/useEpisodes");
jest.mock("@/src/ui/pages/home/components/EpisodeList", () => (props: any) => (
  <div data-testid={`episode-list-${props.title}`}>{props.title}</div>
));
jest.mock("@/src/ui/pages/home/components/CharacterList", () => (props: any) => (
  <div data-testid={`character-list-${props.title}`}>{props.title}</div>
));
jest.mock("@/src/ui/pages/error", () => () => <div data-testid="error-page">ErrorPage</div>);

const evenCharacters = [{ id: 1, name: "EvenChar" }] as any;
const oddCharacters = [{ id: 2, name: "OddChar" }] as any;
const evenOddTotals = { even: 2, odd: 2 };

const mockStateCharacters = {
  evenCharacters,
  oddCharacters,
  characterOneEpisodesIds: ["1"],
  characterTwoEpisodesIds: ["2"],
  error: false,
};

const mockStateEpisodes = {
  characterOneEpisodes: charactersMock.results,
  characterTwoEpisodes: [{ id: "2", name: "Ep2" }],
  sharedEpisodes: [{ id: "3", name: "Ep3" }],
};

describe("PageHome", () => {
  beforeEach(() => {
    (useCharacters as jest.Mock).mockReturnValue({
      stateCharacters: mockStateCharacters,
      handlePageChange: jest.fn(),
      selectEpisodes: jest.fn(),
    });
    (useEpisodes as jest.Mock).mockReturnValue({
      stateEpisodes: mockStateEpisodes,
    });
  });

  it("renders CharacterList and EpisodeList components with correct props", () => {
    render(
      <PageHome
        evenCharacters={evenCharacters}
        oddCharacters={oddCharacters}
        evenOddTotals={evenOddTotals}
      />
    );

    expect(screen.getByTestId("character-list-Character #1")).toBeInTheDocument();
    expect(screen.getByTestId("character-list-Character #2")).toBeInTheDocument();

    expect(screen.getByTestId("episode-list-Character #1 - Only Episodes")).toBeInTheDocument();
    expect(screen.getByTestId("episode-list-Character #2 - Only Episodes")).toBeInTheDocument();
    expect(screen.getByTestId("episode-list-Character #1 & #2 - Shared Episodes")).toBeInTheDocument();
  });

  it("renders ErrorPage if stateCharacters.error is true", () => {
    (useCharacters as jest.Mock).mockReturnValueOnce({
      ...mockStateCharacters,
      stateCharacters: {
        error: true,
      }
    });

    render(
      <PageHome
        evenCharacters={evenCharacters}
        oddCharacters={oddCharacters}
        evenOddTotals={evenOddTotals}
      />
    );

    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });
});