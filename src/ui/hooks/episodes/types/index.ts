import Episode from "@/src/domain/entities/Episode";

export type State = {
  characterOneEpisodes: Episode[];
  characterTwoEpisodes: Episode[];
  sharedEpisodes: Episode[];
};
