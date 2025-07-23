import React, { useEffect, useState } from "react";
import { Poster } from "../types";
import { X, ZoomIn } from "lucide-react";

interface PosterModalProps {
  poster: Poster;
  onClose: () => void;
}

const PosterModal: React.FC<PosterModalProps> = ({ poster, onClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isFullScreen) {
          setIsFullScreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleEsc);

    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose, isFullScreen]);

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullScreen((v) => !v);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="poster-title"
      >
        <div
          className="bg-base-100 rounded-lg bg-white shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden relative animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-content-light hover:text-content-strong transition-colors z-20 p-1 bg-base-200/80 rounded-full"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-base-200 flex items-center justify-center group">
            <img
              src={poster.imagePath}
              alt={`Poster: ${poster.title}`}
              className="w-full h-full object-contain cursor-pointer"
              onClick={toggleFullScreen}
            />
            <div
              onClick={toggleFullScreen}
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Perbesar gambar"
              role="button"
            >
              <ZoomIn className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
            <h2
              id="poster-title"
              className="text-2xl lg:text-3xl font-extrabold text-content-strong mb-4"
            >
              {poster.title}
            </h2>
            <p className="text-content leading-relaxed">
              {poster.longDescription}
            </p>
          </div>
        </div>
      </div>

      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsFullScreen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Tampilan penuh gambar poster"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullScreen(false);
            }}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Tutup Tampilan Penuh"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={poster.imagePath}
              alt={`Poster: ${poster.title} (tampilan penuh)`}
              className="max-w-full max-h-full object-contain block"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PosterModal;
