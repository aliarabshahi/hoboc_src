// components/vision/VisionImage.tsx
import Image from "next/image";

export default function VisionImage({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/hero_images/hero_image55.svg"
        alt="Vision Image"
        width={600}
        height={600}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
