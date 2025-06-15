import Episode from "@/src/domain/entities/Episode";
import { CharactersResponse } from "@/src/domain/types/reponses/CharacterResponse";

export class RickAndMortyApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "https://rickandmortyapi.com/api";
  }

  public async fetchCharacters(page: number = 1): Promise<CharactersResponse> {
    const response = await fetch(`${this.baseUrl}/character?page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    return response.json();
  }

    public async fetchEpisodes(ids: string[] | number): Promise<Episode[]> {
      const idsParam = Array.isArray(ids) ? ids.join(",") : ids;
      const response = await fetch(`${this.baseUrl}/episode/${idsParam}`);
      if (!response.ok) {
        throw new Error("Failed to fetch episodes");
      }
      return response.json();
    }
}
