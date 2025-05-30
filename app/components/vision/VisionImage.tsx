// components/vision/VisionImage.tsx
// illustration svg
import Image from "next/image";

export default function VisionImage({ className }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Image
        src="/vision.svg"
        alt="Vision Image"
        width={600}
        height={600}
        className="object-cover w-full h-full" // Removed rounded-lg and shadow-lg
      />
    </div>
  );
}