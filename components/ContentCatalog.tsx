"use client";

import { useState } from "react";
import ContentGrid from "./ContentGrid";
import PosterModal from "./PosterModal";
import type { ContentItem } from "../types";

// Sample data - in a real app, this would come from an API or database
const sampleContent: ContentItem[] = [
  {
    id: "1",
    title: "Poster Kesiapsiagaan Bencana",
    description:
      "Informasi penting tentang kesiapsiagaan bencana untuk masyarakat.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    posterUrl: "/data/poster/kesiapsiagaan-bencana.pdf",
    category: "Poster",
  },
  {
    id: "2",
    title: "Digital Art Collection",
    description: "Curated selection of digital artwork and illustrations",
    thumbnail: "/placeholder.svg?height=300&width=400",
    posterUrl: "/api/posters/digital-art.pdf",
    category: "Art",
  },
  {
    id: "3",
    title: "Photography Portfolio",
    description: "Professional photography showcase and techniques",
    thumbnail: "/placeholder.svg?height=300&width=400",
    posterUrl: "/api/posters/photography.pdf",
    category: "Photography",
  },
  {
    id: "4",
    title: "Web Design Trends",
    description: "Latest trends in web design and user experience",
    thumbnail: "/placeholder.svg?height=300&width=400",
    posterUrl: "/api/posters/web-design.pdf",
    category: "Design",
  },
  {
    id: "5",
    title: "Brand Identity Guide",
    description: "Complete guide to creating strong brand identities",
    thumbnail: "/placeholder.svg?height=300&width=400",
    posterUrl: "/api/posters/branding.pdf",
    category: "Branding",
  },
  {
    id: "6",
    title: "Mobile UI Patterns",
    description: "Essential mobile user interface design patterns",
    thumbnail: "/placeholder.svg?height=300&width=400",
    posterUrl: "/api/posters/mobile-ui.pdf",
    category: "Mobile",
  },
  {
    id: "7",
    title: "Color Theory Basics",
    description: "Understanding color relationships in design",
    thumbnail: "/placeholder.svg?height=300&width=400",
    posterUrl: "/api/posters/color-theory.pdf",
    category: "Theory",
  },
  {
    id: "8",
    title: "Typography Essentials",
    description: "Fundamentals of typography and font selection",
    thumbnail: "/placeholder.svg?height=300&width=400",
    posterUrl: "/api/posters/typography.pdf",
    category: "Typography",
  },
];

export default function ContentCatalog() {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <ContentGrid items={sampleContent} onItemClick={handleItemClick} />
      <PosterModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={handleCloseModal}
      />
    </>
  );
}
