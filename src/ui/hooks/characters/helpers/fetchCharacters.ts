import { CharacterService } from "@/src/application/service/CharacterService";
import { RickAndMortyApi } from "@/src/infrastructure/api/RickAndMortyApi";

import { Action } from "../actions";

export const fetchAndSetCharacters = async (
  dispatch: React.Dispatch<Action>,
  page: number,
  type: "odd" | "even"
) => {
  const api = new RickAndMortyApi();
  const service = new CharacterService(api);

  try {
    const characters = await service.fetchCharacters(page);

    if (type === "odd") {
      dispatch({
        type: "SET_CHARACTERS_ODD",
        odd: characters.results,
      });
    } else if (type === "even") {
      dispatch({
        type: "SET_CHARACTERS_EVEN",
        even: characters.results,
      });
    }
  } catch {
    dispatch({
      type: "FETCH_CHARACTERS_ERROR",
      error: true,
    });
  }
};
