import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  rating: number;
  students: number;
};

const CoursesDetailHeader = () => {
  const courseData: Course = {
    id: "react-advanced-2024",
    title: "الگوهای پیشرفته ری‌اکت",
    description: "بر مفاهیم پیشرفته ری‌اکت و الگوهای طراحی مورد استفاده توسعه‌دهندگان ارشد در شرکت‌های برتر فناوری مسلط شوید.",
    instructor: "سارا جانسون",
    category: "توسعه فرانت‌اند",
    rating: 4.9,
    students: 2450,
  };

  return (
    <div className="mb-8" dir="rtl">
      <h1 className="text-2xl font-bold mt-2">{courseData.title}</h1>
      <p className="text-md opacity-80 mt-2">{courseData.description}</p>
      
      
    </div>
  );
};

export default CoursesDetailHeader;