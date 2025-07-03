"use client";

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import { CoursesLesson } from "@/app/types/coursesType";

interface CourseLessonsProps {
  lessons_api_response: {
    data?: CoursesLesson[];
    results?: CoursesLesson[];
    [key: string]: any;
  };
}

export default function CourseLessons({ lessons_api_response }: CourseLessonsProps) {
  const lessons: CoursesLesson[] =
    lessons_api_response?.data ||
    lessons_api_response?.results ||
    [];

  if (!lessons.length) return null;

  return (
    <div className="lg:w-2/3 bg-base-100 rounded-box shadow-md p-6 mt-10" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <BsBook className="w-6 h-6 ml-2" />
        درس‌های مربوط به "linux"
      </h2>

      <div className="overflow-y-auto max-h-[300px] pl-4">
        <div className="space-y-3">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/courses/linux/lesson/${lesson.slug}`}
              passHref
            >
              <div className="flex items-center justify-between p-4 hover:bg-base-200 rounded-lg transition-colors duration-200 cursor-pointer">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ml-4 flex-shrink-0 ${
                      lesson.is_free
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="text-sm text-gray-500">{lesson.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xs ml-3">{lesson.duration} دقیقه</span>
                  {lesson.is_free && (
                    <span className="badge badge-success badge-sm">رایگان</span>
                  )}
                  <FaChevronLeft className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
