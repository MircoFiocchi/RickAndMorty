
import { EpisodeService } from "@/src/application/service/EpisodeService";
import { RickAndMortyApi } from "@/src/infrastructure/api/RickAndMortyApi";

import { episodesMock1and2 } from "../../mocks/episodesMock";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("EpisodeService", () => {
	let episodeService: EpisodeService;
	let mockApi: jest.Mocked<RickAndMortyApi>;

	beforeEach(() => {
		mockApi = {
			fetchEpisodes: jest.fn(),
		} as unknown as jest.Mocked<RickAndMortyApi>;
		episodeService = new EpisodeService(mockApi);
	});

	test("should fetch episodes for given ids", async () => {
		mockApi.fetchEpisodes = jest.fn().mockResolvedValue(episodesMock1and2);

		const ids = [1, 2];
		const stringIds = ids.map(String);
		const result = await episodeService.fetchEpisodes(stringIds);

		expect(mockApi.fetchEpisodes).toHaveBeenCalledWith(stringIds);
		expect(result).toEqual(episodesMock1and2);
	});

	test("should throw error when fetchEpisodes fails", async () => {
		mockApi.fetchEpisodes = jest.fn().mockRejectedValue(new Error("API Error"));
		const ids = [1, 2];
		const stringIds = ids.map(String);
		await expect(episodeService.fetchEpisodes(stringIds)).rejects.toThrow(
			"Error fetching characters"
		);
	});
});
