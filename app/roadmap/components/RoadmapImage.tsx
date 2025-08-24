// roadmap/components/RoadmapImage.tsx
"use client";
import Image from "next/image";

export default function RoadmapImage() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <Image
        src="/images/roadmap_page/roadmap.svg" // Update this path to your roadmap image
        alt="نقشه راه یادگیری"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}