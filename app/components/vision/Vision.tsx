// components/vision/Vision.tsx
import VisionTexts from "./VisionTexts";
import VisionImage from "./VisionImage";

export default function Vision() {
  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-20" dir="rtl">
      {/* Flex container set to LTR to force image on left */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8" >
        {/* Image on the left */}
        <div className="w-full lg:flex-[3]">
          <VisionImage className="w-full max-w-[500px]" />
        </div>

        {/* Texts on the right */}
        <div className="w-full lg:flex-[2]">
          <VisionTexts />
        </div>
      </div>
    </section>
  );
}
