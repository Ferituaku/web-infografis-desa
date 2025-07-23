import React from "react";
import { Poster } from "../types";
import PosterCard from "./PosterCard";

interface ContentGridProps {
  posters: Poster[];
  onPosterSelect: (poster: Poster) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  posters,
  onPosterSelect,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {posters.map((poster) => (
        <PosterCard
          key={poster.id}
          poster={poster}
          onSelect={() => onPosterSelect(poster)}
        />
      ))}
    </div>
  );
};

export default ContentGrid;
