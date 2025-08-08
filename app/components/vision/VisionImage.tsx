import Image from "next/image";

export default function VisionImage({ className }: { className?: string }) {
  return (
    <div className={`${className ?? ""}`}>
      <Image
        src="/main/Education-bro (5).svg"
        alt="Vision Image"
        width={1500}
        height={1500}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
