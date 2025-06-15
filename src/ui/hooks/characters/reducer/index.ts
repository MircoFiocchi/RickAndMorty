import { Action } from "../actions";
import { State } from "../types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CHARACTERS_EVEN":
      return {
        ...state,
        evenCharacters: action.even,
      };
    case "SET_CHARACTERS_ODD":
      return {
        ...state,
        oddCharacters: action.odd,
      };
    case "SET_CHARACTER_ONE_EPISODES_IDS":
      return {
        ...state,
        characterOneEpisodesIds: action.characterOneEpisodesIds,
      };
    case "SET_CHARACTER_TWO_EPISODES_IDS":
      return {
        ...state,
        characterTwoEpisodesIds: action.characterTwoEpisodesIds,
      };
    case "FETCH_CHARACTERS_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
