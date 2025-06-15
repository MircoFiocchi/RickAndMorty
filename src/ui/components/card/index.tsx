import React, { FC } from "react";

import Image from "next/image";

import Character from "@/src/domain/entities/Character";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  active?: boolean;
}

const CharacterCard: FC<CharacterCardProps> = ({
  character,
  onClick,
  active = false,
}) => {
  return (
    <div
      data-testid="character-card"
      className={`flex flex-col items-center rounded-xl shadow-md transition-all duration-200 md:flex-row md:max-w-xs border border-gray-700 cursor-pointer ${
        active ? "bg-blue-700" : "bg-gray-800 hover:bg-blue-600"
      }`}
      onClick={onClick}
    >
      <Image
        className="object-cover w-full rounded-t-xl h-60 md:h-36 md:w-28 md:rounded-none md:rounded-l-xl"
        src={character.image}
        alt={character.name}
        width={100}
        height={100}
        priority
      />
      <div className="flex flex-col gap-2 justify-between px-4 py-3 text-left">
        <h5 className="text-sm font-bold text-gray-50">
          🫰 NAME: <span className="font-normal">{character.name}</span>
        </h5>
        <h5 className="text-sm font-bold text-gray-400">
          ❤️ STATUS: <span className="font-normal">{character.status}</span>
        </h5>
        <p className="text-sm text-gray-400">🧬 SPECIE: {character.species}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
