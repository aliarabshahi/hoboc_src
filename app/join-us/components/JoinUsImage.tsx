"use client";
import Image from "next/image";

export default function JoinUsImage() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <Image
        src="/forms_images/join-us.svg"
        alt="ارسال رزومه"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
