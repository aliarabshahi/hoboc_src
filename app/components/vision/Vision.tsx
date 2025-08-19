// components/vision/Vision.tsx
"use client";

import VisionTexts from "./VisionTexts";
import VisionImage from "./VisionImage";

export default function Vision() {
  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-between min-h-[400px] gap-8">
      {/* Image side - unchanged from your original */}
      <div className="w-full lg:flex-[4] flex">
        <VisionImage className="w-full h-full" />
      </div>

      {/* Text side - improved layout */}
      <div className="w-full lg:flex-[2] flex items-center">
        <VisionTexts />
      </div>
    </div>
  );
}