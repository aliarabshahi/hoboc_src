"use client";

import Image from "next/image";

const CoursesDetailImage = ({ course }: { course: any }) => {
  return (
    <div className="relative aspect-video rounded-box overflow-hidden shadow-xl flex-shrink-0" dir="rtl">
      <Image
        src={course.thumbnail || "/logo.png"}
        alt={course.title || "Course image"}
        fill
        className="object-cover"
        priority
        unoptimized={process.env.NODE_ENV !== 'production'} // Only optimize in production
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 right-0 p-6">
        <span className="badge badge-accent mb-2">متوسط</span>
        <h2 className="text-2xl font-bold text-white">{course.title}</h2>
      </div>
    </div>
  );
};

export default CoursesDetailImage;