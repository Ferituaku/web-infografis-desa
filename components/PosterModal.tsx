import React, { useEffect, useState } from "react";
import { Poster } from "../types";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"; // Impor ikon navigasi

interface PosterModalProps {
  poster: Poster;
  onClose: () => void;
}

const PosterModal: React.FC<PosterModalProps> = ({ poster, onClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  // State baru untuk melacak halaman/gambar yang aktif
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const isMultiPage = poster.imagePath.length > 1;
  const currentImage = poster.imagePath[currentPageIndex];

  // Fungsi navigasi
  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentPageIndex((prev) => (prev + 1) % poster.imagePath.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentPageIndex(
      (prev) => (prev - 1 + poster.imagePath.length) % poster.imagePath.length
    );
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        isFullScreen ? setIsFullScreen(false) : onClose();
      }
    };
    // Tambahkan navigasi keyboard panah kanan/kiri
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isMultiPage) {
        if (event.key === "ArrowRight") handleNext();
        if (event.key === "ArrowLeft") handlePrev();
      }
    };

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose, isFullScreen, isMultiPage]);

  // Reset halaman ke 0 saat poster berubah
  useEffect(() => {
    setCurrentPageIndex(0);
  }, [poster]);

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullScreen((v) => !v);
  };

  // Komponen UI untuk navigasi, agar tidak duplikat kode
  const NavigationControls = ({ inFullScreen = false }) => (
    <>
      {isMultiPage && (
        <>
          {/* Tombol Previous */}
          <button
            onClick={handlePrev}
            className={`absolute top-1/2 left-2 md:left-4 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all z-10 ${
              inFullScreen ? "p-3" : "p-2"
            }`}
            aria-label="Halaman Sebelumnya"
          >
            <ChevronLeft className={inFullScreen ? "w-7 h-7" : "w-6 h-6"} />
          </button>
          {/* Tombol Next */}
          <button
            onClick={handleNext}
            className={`absolute top-1/2 right-2 md:right-4 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all z-10 ${
              inFullScreen ? "p-3" : "p-2"
            }`}
            aria-label="Halaman Berikutnya"
          >
            <ChevronRight className={inFullScreen ? "w-7 h-7" : "w-6 h-6"} />
          </button>
          {/* Penunjuk Halaman */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {currentPageIndex + 1} / {poster.imagePath.length}
          </div>
        </>
      )}
    </>
  );

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
          className="bg-base-100 bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden relative animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-content-light hover:text-content-strong transition-colors z-20 p-1 bg-base-200/80 rounded-full"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Bagian Gambar Utama */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-base-200 flex items-center justify-center group">
            <img
              src={currentImage} // Gunakan gambar yang aktif
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
            {/* Tampilkan kontrol navigasi */}
            <NavigationControls />
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

      {/* Tampilan Full Screen */}
      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsFullScreen(false)}
          role="dialog"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullScreen(false);
            }}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-20"
            aria-label="Tutup Tampilan Penuh"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="w-full h-full flex items-center justify-center relative" // Tambah 'relative'
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage} // Gunakan gambar yang aktif
              alt={`Poster: ${poster.title} (tampilan penuh)`}
              className="max-w-full max-h-full object-contain block"
            />
            {/* Tampilkan kontrol navigasi di mode fullscreen */}
            <NavigationControls inFullScreen={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default PosterModal;
