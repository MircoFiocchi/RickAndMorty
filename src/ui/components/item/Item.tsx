import React from "react";

interface ItemProps {
  episode: string;
  name: string;
  airDate: string;
}

const Item: React.FC<ItemProps> = ({ episode, name, airDate }) => {
  return (
    <div data-testid="episode-item" className="text-white">
      🎥 - {episode} - {name} - {airDate}
    </div>
  );
};

export default Item;
