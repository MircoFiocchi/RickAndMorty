import Character from "@/src/domain/entities/Character";

export type Action =
  | { type: "SET_CHARACTERS_EVEN"; even: Character[] }
  | { type: "SET_CHARACTERS_ODD"; odd: Character[] }
  | { type: "SET_CHARACTER_ONE_EPISODES_IDS"; characterOneEpisodesIds: string[] | [] }
  | { type: "SET_CHARACTER_TWO_EPISODES_IDS"; characterTwoEpisodesIds: string[] | [] }
  | { type: "FETCH_CHARACTERS_ERROR"; error: boolean }
