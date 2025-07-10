"use client";
import Image from "next/image";

export default function ProjectOrderImage() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <Image
        src="/forms_images/project-order.svg"
        alt="سفارش پروژه"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
