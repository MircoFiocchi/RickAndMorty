import { RickAndMortyApi } from "@/src/infrastructure/api/RickAndMortyApi";


describe("RickAndMortyApi class", () => {
  let api: any;
  let globalFetch: any;

  beforeEach(() => {
    api = new RickAndMortyApi();
    globalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = globalFetch;
    jest.clearAllMocks();
  });

  describe("fetchCharacters", () => {
    it("should fetch characters successfully", async () => {
      const mockData = { results: [{ id: 1, name: "Rick Sanchez" }] };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await api.fetchCharacters(1);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/character?page=1"
      );
      expect(result).toEqual(mockData);
    });

    it("should throw error if fetch fails", async () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: false });

      await expect(api.fetchCharacters(1)).rejects.toThrow(
        "Failed to fetch characters"
      );
    });
  });

  describe("fetchEpisodes", () => {
    it("should fetch episodes with array of ids", async () => {
      const mockEpisodes = [{ id: 1, name: "Pilot" }];
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockEpisodes),
      });

      const result = await api.fetchEpisodes([1, 2]);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/episode/1,2"
      );
      expect(result).toEqual(mockEpisodes);
    });

    it("should fetch episodes with single id", async () => {
      const mockEpisodes = { id: 1, name: "Pilot" };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockEpisodes),
      });

      const result = await api.fetchEpisodes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/episode/1"
      );
      expect(result).toEqual(mockEpisodes);
    });

    it("should throw error if fetch fails", async () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: false });

      await expect(api.fetchEpisodes([1, 2])).rejects.toThrow(
        "Failed to fetch episodes"
      );
    });
  });
});
