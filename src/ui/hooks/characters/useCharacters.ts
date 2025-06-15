import { useReducer } from "react";

import Character from "@/src/domain/entities/Character";

import { State } from "./types";
import { reducer } from "./reducer";
import { fetchAndSetCharacters } from "./helpers/fetchCharacters";
import { Action } from "./actions";

interface UseCharactersProps {
  initialEvenCharacters: Character[];
  initialOddCharacters: Character[];
  evenOddTotals: {
    even: number;
    odd: number;
  };
}

const initialState = (props: UseCharactersProps): State => ({
  evenCharacters: props.initialEvenCharacters,
  oddCharacters: props.initialOddCharacters,
  evenOddTotals: props.evenOddTotals,
  characterOneEpisodesIds: [],
  characterTwoEpisodesIds: [],
  error: false,
});

export const useCharacters = ({
  initialEvenCharacters,
  initialOddCharacters,
  evenOddTotals,
}: UseCharactersProps) => {
  const [stateCharacters, dispatchCharacters] = useReducer(
    reducer,
    { initialEvenCharacters, initialOddCharacters, evenOddTotals },
    initialState
  );

  const handlePageChange = (index: number, type: "even" | "odd") => {
    fetchAndSetCharacters(dispatchCharacters, index, type);
  };

  const selectEpisodes = (
    episodesIds: string[] | string,
    type: "even" | "odd"
  ) => {
    const idsArray = Array.isArray(episodesIds) ? episodesIds : [episodesIds];
    const episodeNumbers = idsArray
      .map((url) => {
        const match = url.match(/\/episode\/(\d+)$/);
        return match ? match[1] : "";
      })
      .filter(Boolean);

    const action =
      type === "even"
        ? {
            type: "SET_CHARACTER_ONE_EPISODES_IDS",
            characterOneEpisodesIds: episodeNumbers,
          }
        : {
            type: "SET_CHARACTER_TWO_EPISODES_IDS",
            characterTwoEpisodesIds: episodeNumbers,
          };
    dispatchCharacters(action as Action);
  };

  return {
    stateCharacters,
    handlePageChange,
    selectEpisodes,
  };
};
