import { CharacterService } from "@/src/application/service/CharacterService";
import { RickAndMortyApi } from "@/src/infrastructure/api/RickAndMortyApi";

import { charactersMock } from "../../mocks/charactersMock";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("CharacterService", () => {
  let characterService: CharacterService;
  let mockApi: jest.Mocked<RickAndMortyApi>;

  beforeEach(() => {
    mockApi = {
      fetchCharacters: jest.fn(),
    } as unknown as jest.Mocked<RickAndMortyApi>;
    characterService = new CharacterService(mockApi);
  });

  test("should fetch characters for a given page", async () => {
    const page = 1;
    mockApi.fetchCharacters.mockResolvedValue(charactersMock);

    const result = await characterService.fetchCharacters(page);
    expect(mockApi.fetchCharacters).toHaveBeenCalledWith(page);
    expect(result).toEqual(charactersMock);
  });

  test("should throw error when fetchCharacters fails", async () => {
    const page = 1;
    mockApi.fetchCharacters.mockRejectedValue(new Error("API Error"));

    await expect(characterService.fetchCharacters(page)).rejects.toThrow(
      "Error fetching characters"
    );
  });
});