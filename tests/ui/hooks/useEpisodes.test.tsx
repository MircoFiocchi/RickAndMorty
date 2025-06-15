import { waitFor, renderHook } from "@testing-library/react";

import { episodesMock1and2 } from "../../mocks/episodesMock";

jest.mock("../../../src/ui/hooks/episodes/helpers/fetchEpisodes", () => ({
  fetchEpisodes: jest.fn(() => {
    return Promise.resolve(episodesMock1and2);
  }),
}));

import { fetchEpisodes } from "../../../src/ui/hooks/episodes/helpers/fetchEpisodes";
import { useEpisodes } from "../../../src/ui/hooks/episodes/useEpisodes";

describe("useEpisodes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and sets character one episodes", async () => {
    (fetchEpisodes as jest.Mock).mockResolvedValueOnce(episodesMock1and2);

    const { result } = renderHook(() =>
      useEpisodes({
        characterOneEpisodesIds: ["1", "2"],
        characterTwoEpisodesIds: [],
      })
    );

    await waitFor(() => {
      expect(
        Array.isArray(result.current.stateEpisodes.characterOneEpisodes)
      ).toBe(true);

      expect(result.current.stateEpisodes.characterOneEpisodes).toEqual(
        episodesMock1and2
      );
    });
  });

  it("fetches and sets character two episodes", async () => {
    (fetchEpisodes as jest.Mock).mockResolvedValueOnce(episodesMock1and2);

    const { result } = renderHook(() =>
      useEpisodes({
        characterOneEpisodesIds: [],
        characterTwoEpisodesIds: ["1", "2"],
      })
    );

    await waitFor(() => {
      expect(
        Array.isArray(result.current.stateEpisodes.characterTwoEpisodes)
      ).toBe(true);
      expect(result.current.stateEpisodes.characterTwoEpisodes).toEqual(
        episodesMock1and2
      );
    });
  });

  it("fetches and sets shared episodes", async () => {
    (fetchEpisodes as jest.Mock).mockResolvedValueOnce(episodesMock1and2);

    const { result } = renderHook(() =>
      useEpisodes({
        characterOneEpisodesIds: ["1"],
        characterTwoEpisodesIds: ["2"],
      })
    );

    await waitFor(() => {
      expect(Array.isArray(result.current.stateEpisodes.sharedEpisodes)).toBe(
        true
      );
      expect(result.current.stateEpisodes.sharedEpisodes).toEqual(
        episodesMock1and2
      );
    });
  });
});
