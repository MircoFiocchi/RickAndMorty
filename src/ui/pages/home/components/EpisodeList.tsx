"use client";
import React from "react";

import Episode from "@/src/domain/entities/Episode";
import Item from "@/src/ui/components/item/Item";

type EpisodeListProps = {
  title: string;
  subtitle: string;
  episodes: Episode[] | null;
};

const EpisodeList: React.FC<EpisodeListProps> = ({ title, subtitle, episodes }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 flex-1">
      <h2 className="text-white font-semibold mb-2">{title}</h2>
      <div className="flex flex-col gap-4 h-40 overflow-y-auto no-scrollbar">
        {episodes && episodes.length > 0 ? (
          <ul>
            {episodes.map((episode: Episode) => (
              <li key={episode.id}>
                <Item
                  episode={episode.episode}
                  name={episode.name}
                  airDate={episode.air_date}
                />
              </li>
            ))}
          </ul>
        ) : (
          <h1 className="text-white">{subtitle}</h1>
        )}
      </div>
    </div>
  );
};

export default EpisodeList;
