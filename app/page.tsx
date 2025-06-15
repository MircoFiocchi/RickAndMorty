import { CharacterService } from "@/src/application/service/CharacterService";
import { RickAndMortyApi } from "@/src/infrastructure/api/RickAndMortyApi";
import ErrorPage from "@/src/ui/pages/error";

import PageHome from "@/src/ui/pages/home";

export default async function Home() {
  const api = new RickAndMortyApi();
  const service = new CharacterService(api);

  try {
    const evenCharacters = await service.fetchCharacters(1);
    const oddCharacters = await service.fetchCharacters(2);

    const evenOddTotals = {
      even: Math.floor(evenCharacters.info.pages / 2),
      odd: Math.ceil(evenCharacters.info.pages / 2),
    };

    return (
      <main>
        <PageHome
          evenCharacters={evenCharacters.results}
          oddCharacters={oddCharacters.results}
          evenOddTotals={evenOddTotals}
        />
      </main>
    );
  } catch (error) {
    console.error("Error fetching characters:", error);
    return <ErrorPage />;
  }
}
