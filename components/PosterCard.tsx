import React from "react";
import { Poster } from "../types";

interface PosterCardProps {
  poster: Poster;
  onSelect: () => void;
}

const PosterCard: React.FC<PosterCardProps> = ({ poster, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="bg-base-100 rounded-lg overflow-hidden shadow-md group transform hover:-translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer border border-base-300 hover:shadow-xl"
      aria-label={`Lihat detail untuk ${poster.title}`}
    >
      <div className="relative h-80 bg-base-200">
        <img
          src={poster.thumbnailPath}
          alt={poster.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10 bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-300"></div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-content-strong mb-2 truncate">
          {poster.title}
        </h3>
        <p className="text-content text-sm h-10">{poster.shortDescription}</p>
      </div>
    </div>
  );
};

export default PosterCard;
