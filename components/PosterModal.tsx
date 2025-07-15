"use client";

import { useEffect } from "react";
import type { ContentItem } from "../types";

interface PosterModalProps {
  item: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PosterModal({
  item,
  isOpen,
  onClose,
}: PosterModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-md bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div className="relative bg-white dark:bg-cyan-700 rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {item.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              {item.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6 text-slate-500 dark:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="p-6">
          <div
            className="bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden"
            style={{ height: "70vh" }}
          >
            <iframe
              src={item.posterUrl}
              className="w-full h-full border-0"
              title={`${item.title} Poster`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full font-medium">
              {item.category}
            </span>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => window.open(item.posterUrl, "_blank")}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              Open in New Tab
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
