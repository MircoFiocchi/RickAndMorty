"use client";
import React from "react";

import Character from "@/src/domain/entities/Character";

import { useCharacters } from "../../hooks/characters/useCharacters";
import { useEpisodes } from "../../hooks/episodes/useEpisodes";
import EpisodeList from "./components/EpisodeList";
import CharacterList from "./components/CharacterList";
import ErrorPage from "../error";

interface PageHomeProps {
  evenCharacters: Character[];
  oddCharacters: Character[];
  evenOddTotals: {
    even: number;
    odd: number;
  };
}

const PageHome: React.FC<PageHomeProps> = ({
  evenCharacters,
  oddCharacters,
  evenOddTotals,
}) => {
  const { stateCharacters, handlePageChange, selectEpisodes } = useCharacters({
    initialEvenCharacters: evenCharacters,
    initialOddCharacters: oddCharacters,
    evenOddTotals,
  });

  const { stateEpisodes } = useEpisodes({
    characterOneEpisodesIds: stateCharacters.characterOneEpisodesIds,
    characterTwoEpisodesIds: stateCharacters.characterTwoEpisodesIds,
  });

  if(stateCharacters.error) return <ErrorPage />

  return (
    <div className="flex flex-col p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CharacterList
          title="Character #1"
          characters={stateCharacters.evenCharacters}
          type="even"
          totalPages={evenOddTotals.even}
          selectEpisodes={selectEpisodes}
          onPageChange={handlePageChange}
        />

        <CharacterList
          title="Character #2"
          characters={stateCharacters.oddCharacters}
          type="odd"
          totalPages={evenOddTotals.odd}
          selectEpisodes={selectEpisodes}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <EpisodeList
          title="Character #1 - Only Episodes"
          subtitle="Please select a Character #1"
          episodes={stateEpisodes.characterOneEpisodes}
        />
        <EpisodeList
          title="Character #1 & #2 - Shared Episodes"
          subtitle="Please select Character #1 and #2"
          episodes={stateEpisodes.sharedEpisodes}
        />
        <EpisodeList
          title="Character #2 - Only Episodes"
          subtitle="Please select a Character #2"
          episodes={stateEpisodes.characterTwoEpisodes}
        />
      </div>
    </div>
  );
};

export default PageHome;
