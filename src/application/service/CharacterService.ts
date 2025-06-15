import { CharactersResponse } from "@/src/domain/types/reponses/CharacterResponse";
import { RickAndMortyApi } from "@/src/infrastructure/api/RickAndMortyApi";

export class CharacterService {
  private api: RickAndMortyApi;

  constructor(api: RickAndMortyApi) {
    this.api = api;
  }

  async fetchCharacters(page: number): Promise<CharactersResponse> {
    try {
      const response = await this.api.fetchCharacters(page);
      return response;
    } catch (error) {
      console.error("Failed to fetch characters:", error);
      throw new Error("Error fetching characters");
    }
  }
}
