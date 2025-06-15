import { act, renderHook } from "@testing-library/react";

import Character from "@/src/domain/entities/Character";
import { useCharacters } from "@/src/ui/hooks/characters/useCharacters";

import { charactersMock } from "../../mocks/charactersMock";


const mockEvenCharacters: Character[] = charactersMock.results;

const mockOddCharacters: Character[] = charactersMock.results;

describe("useCharacters", () => {
  it("initializes the state correctly", () => {
    const { result } = renderHook(() =>
      useCharacters({
        initialEvenCharacters: mockEvenCharacters,
        initialOddCharacters: mockOddCharacters,
        evenOddTotals: { even: 1, odd: 2 },
      })
    );
    expect(result.current.stateCharacters.evenCharacters).toEqual(
      mockEvenCharacters
    );
    expect(result.current.stateCharacters.oddCharacters).toEqual(
      mockOddCharacters
    );
    expect(result.current.stateCharacters.evenOddTotals).toEqual({
      even: 1,
      odd: 2,
    });
  });

  it("updates selected episodes", () => {
    const { result } = renderHook(() =>
      useCharacters({
        initialEvenCharacters: mockEvenCharacters,
        initialOddCharacters: mockOddCharacters,
        evenOddTotals: { even: 1, odd: 2 },
      })
    );
    act(() => {
      result.current.selectEpisodes(["https://api/episode/15"], "even");
    });
    expect(result.current.stateCharacters.characterOneEpisodesIds).toEqual([
      "15",
    ]);
  });
});
