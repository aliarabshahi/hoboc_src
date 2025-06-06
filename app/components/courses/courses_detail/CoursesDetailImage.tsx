import React from "react";
import Image from "next/image";

type CourseImage = {
  id: string;
  title: string;
  image: string;
  level: "مبتدی" | "متوسط" | "پیشرفته"; // Translated levels
};

const CoursesDetailImage = () => {
  const courseData: CourseImage = {
    id: "react-advanced-2024",
    title: "الگوهای پیشرفته ری‌اکت", // Translated title
    image: "/logo.png",
    level: "متوسط" // Translated level
  };

  return (
    <div className="relative aspect-video rounded-box overflow-hidden shadow-xl flex-shrink-0" dir="rtl">
      <Image
        src={courseData.image}
        alt={courseData.title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 33vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 right-0 p-6"> {/* Changed left to right */}
        <span className="badge badge-accent mb-2">{courseData.level}</span>
        <h2 className="text-2xl font-bold text-white">{courseData.title}</h2>
      </div>
    </div>
  );
};

export default CoursesDetailImage;