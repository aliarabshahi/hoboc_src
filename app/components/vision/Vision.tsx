// components/vision/Vision.tsx
import VisionTexts from "./VisionTexts";
import VisionImage from "./VisionImage";

export default function Vision() {
  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-20" dir="rtl">
      {/* Flex direction changes based on screen size */}
      <div className="flex flex-col lg:flex-row-reverse items-start gap-6 lg:gap-8">
        {/* Image - Appears first visually in both layouts */}
        <div className="w-full md:w-4/5 mx-auto lg:flex-[3] lg:w-auto lg:order-2 pt-10">
          <VisionImage className="max-w-[500px] mx-auto" />
        </div>
        
        {/* Text - Appears second visually in both layouts */}
        <div className="w-full lg:flex-[2] lg:py-12 lg:order-1">
          <VisionTexts />
        </div>
      </div>
    </section>
  );
}