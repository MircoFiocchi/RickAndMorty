import { EpisodeService } from "@/src/application/service/EpisodeService";
import { RickAndMortyApi } from "@/src/infrastructure/api/RickAndMortyApi";

export async function fetchEpisodes(ids: string[]) {
  if (ids.length === 0) return [];
  const api = new RickAndMortyApi();
  const service = new EpisodeService(api);
  const episodes = await service.fetchEpisodes(ids);
  if (!Array.isArray(episodes)) {
    return [episodes];
  }
  return episodes;
}
