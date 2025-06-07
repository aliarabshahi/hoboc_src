import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Course } from "@/app/types/course";

interface CoursesDetailImageProps {
  course: Course;
}

const CoursesDetailImage = ({ course }: CoursesDetailImageProps) => {
  const getLevel = () => {
    // You can implement your own logic to determine course level
    return "متوسط";
  };

  return (
    <div className="relative aspect-video rounded-box overflow-hidden shadow-xl flex-shrink-0" dir="rtl">
      <Image
        src={course.thumbnail || "/logo.png"}
        alt={course.title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 33vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 right-0 p-6">
        <span className="badge badge-accent mb-2">{getLevel()}</span>
        <h2 className="text-2xl font-bold text-white">{course.title}</h2>
      </div>
    </div>
  );
};

export default CoursesDetailImage;