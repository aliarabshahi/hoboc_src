"use client";

import Image from "next/image";

/** Static illustration displayed beside the project order form */
export default function ProjectOrderImage() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <Image
        src="/images/forms/project-order.svg" // Ensure this asset exists in /public/images/forms/
        alt="سفارش پروژه"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
