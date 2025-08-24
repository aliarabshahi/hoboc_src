"use client";

import Image from "next/image";
import { CoursesTopic } from "@/app/types/coursesType";

interface CoursesDetailImageProps {
  topic: CoursesTopic | null;
}

const CoursesDetailImage = ({ topic }: CoursesDetailImageProps) => {
  if (!topic) {
    return (
      <div
        className="relative aspect-video rounded-box overflow-hidden shadow-xl flex-shrink-0 bg-gray-200 flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-gray-500">هیچ موضوعی انتخاب نشده است</div>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-video rounded-box overflow-hidden shadow-xl flex-shrink-0"
      dir="rtl"
    >
      <Image
        src={topic.image || "/images/logo.png"}
        alt={topic.title}
        fill
        className="object-cover"
        priority
        unoptimized={process.env.NODE_ENV !== "production"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="absolute bottom-0 right-0 p-6">
        {/* <span className="badge badge-accent mb-2">متوسط</span> */}
        {/* <h2 className="text-2xl pr-6 font-bold text-white">{topic.title}</h2> */}
        {/* {topic.description && (
          <p className="text-white/80 text-sm mt-1">{topic.description}</p>
        )} */}
      </div>
    </div>
  );
};

export default CoursesDetailImage;
