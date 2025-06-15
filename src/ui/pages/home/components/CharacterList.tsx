"use client";
import React, { useState } from "react";

import CharacterCard from "@/src/ui/components/card";
import Pagination from "@/src/ui/components/pagination";
import Character from "@/src/domain/entities/Character";

interface CharacterListProps {
  title: string;
  characters: Character[];
  totalPages: number;
  type: "even" | "odd";
  onPageChange: (page: number, type: "even" | "odd") => void;
  selectEpisodes: (episodes: string[], type: "even" | "odd") => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  title,
  characters,
  totalPages,
  type,
  onPageChange,
  selectEpisodes,
}) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleCardClick = (character: Character) => {
    setActiveId(character.id);
    selectEpisodes(character.episode, type);
  };

  return (
    <div className="relativeflex flex-col p-5 rounded-lg shadow-md bg-gray-900">
      <h2 className="text-gray-100 font-semibold text-lg mb-4">{title}</h2>
      <div className="rounded-lg p-4 shadow-md">
        <li className="overflow-x-auto no-scrollbar grid grid-flow-col grid-rows-3 gap-4 auto-cols-max">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              active={activeId === character.id}
              onClick={() => handleCardClick(character)}
            />
          ))}
        </li>
      </div>
      <div className="flex justify-center my-4">
        <Pagination
          totalPages={totalPages}
          type={type}
          onPageChange={(page) => onPageChange(page, type)}
        />
      </div>
    </div>
  );
};

export default CharacterList;
