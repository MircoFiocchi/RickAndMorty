import Episode from "@/src/domain/entities/Episode";
import { RickAndMortyApi } from "@/src/infrastructure/api/RickAndMortyApi";

export class EpisodeService {
  private api: RickAndMortyApi;

  constructor(api: RickAndMortyApi) {
    this.api = api;
  }

  async fetchEpisodes(ids: string[] | number): Promise<Episode[]> {
    try {
      const response = await this.api.fetchEpisodes(ids);
      return response;
    } catch (error) {
      console.error("Failed to fetch episodes:", error);
      throw new Error("Error fetching characters");
    }
  }
}
