"use client";

import Image from "next/image";
import type { ContentItem } from "../types";

interface ContentGridProps {
  items: ContentItem[];
  onItemClick: (item: ContentItem) => void;
}

export default function ContentGrid({ items, onItemClick }: ContentGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="group cursor-pointer bg-white dark:bg-cyan-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
          onClick={() => onItemClick(item)}
        >
          <div className="relative overflow-hidden">
            <Image
              src={item.thumbnail || "/placeholder.svg"}
              alt={item.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gray-300 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white dark:bg-slate-800 rounded-full p-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-slate-700 dark:text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute top-3 right-3">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {item.category}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 line-clamp-1">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
