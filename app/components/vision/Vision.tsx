// components/vision/Vision.tsx
import VisionTexts from "./VisionTexts";
import VisionImage from "./VisionImage";

export default function Vision() {
  return (
    <div
      className="flex flex-col lg:flex-row items-stretch justify-between 
                  min-h-[400px] "
    >
      {/* Image side */}
      <div className="w-full lg:flex-[4]  flex">
        <VisionImage className="w-full h-full" />
      </div>

      {/* Text side */}
      <div className="w-full lg:flex-[2] flex items-center pl-4">
        <VisionTexts />
      </div>
    </div>
  );
}
