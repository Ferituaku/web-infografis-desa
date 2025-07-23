"use client";

import React, { useState, useCallback } from "react";
import { Poster } from "../types";
import { posterData } from "../data/posters";
import ContentGrid from "./ContentGrid";
import PosterModal from "./PosterModal";

const ContentCatalog: React.FC = () => {
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);

  const handlePosterSelect = useCallback((poster: Poster) => {
    setSelectedPoster(poster);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPoster(null);
  }, []);

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-md">
      <h3 className="font-bold text-content-strong mb-6 text-xl">
        Katalog Poster Infografis
      </h3>
      <ContentGrid posters={posterData} onPosterSelect={handlePosterSelect} />

      {selectedPoster && (
        <PosterModal poster={selectedPoster} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ContentCatalog;
