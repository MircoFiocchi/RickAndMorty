import Character from "@/src/domain/entities/Character";

export type State = {
  evenCharacters: Character[];
  oddCharacters: Character[];
  evenOddTotals: { even: number; odd: number };
  characterOneEpisodesIds: string[] | [];
  characterTwoEpisodesIds: string[] | [];
  error: boolean;
};