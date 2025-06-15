import { Action } from "../actions";
import { State } from "../types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CHARACTER_ONE_EPISODES":
      return {
        ...state,
        characterOneEpisodes: action.characterOneEpisodes,
      };
    case "SET_CHARACTER_TWO_EPISODES":
      return {
        ...state,
        characterTwoEpisodes: action.characterTwoEpisodes,
      };
    case "SET_SHARED_EPISODES":
      return {
        ...state,
        sharedEpisodes: action.sharedEpisodes,
      };

    default:
      return state;
  }
};
