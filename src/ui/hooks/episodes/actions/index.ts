import Episode from "@/src/domain/entities/Episode";

export type Action =
  | { type: "SET_CHARACTER_ONE_EPISODES"; characterOneEpisodes: Episode[] }
  | { type: "SET_CHARACTER_TWO_EPISODES"; characterTwoEpisodes: Episode[] }
  | { type: "SET_SHARED_EPISODES"; sharedEpisodes: Episode[] };
