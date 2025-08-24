import Image from "next/image";

export default function VisionImage({ className }: { className?: string }) {
  return (
    <div
      className={`${className ?? ""} relative w-full min-h-[300px] flex items-center justify-center`}
    >
      <Image
        src="/images/main_page/vision/education-bro.svg"
        alt="Vision Image"
        width={1500}
        height={1500}
        className="object-contain w-full h-auto"
        priority
      />
    </div>
  );
}
