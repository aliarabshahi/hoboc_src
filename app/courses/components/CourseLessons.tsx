"use client";

import Link from "next/link";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";

interface CourseLessonsProps {
  lessons_api_response: {
    data?: CoursesLesson[];
    results?: CoursesLesson[];
    [key: string]: any;
  };
  topic: CoursesTopic;
  noTopMargin?: boolean;
}

export default function CourseLessons({ lessons_api_response, topic, noTopMargin }: CourseLessonsProps) {
  const lessons: CoursesLesson[] =
    lessons_api_response?.data ||
    lessons_api_response?.results ||
    [];

  if (!lessons.length) return null;

  const topicName =
    lessons[0]?.topic && typeof lessons[0].topic === "string"
      ? lessons[0].topic
      : (lessons[0]?.topic as any)?.title || topic.title || "موضوع نامشخص";

  return (
    <div
      className={`max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-md shadow-sm p-4 ${
        noTopMargin ? "" : "mt-8"
      } flex flex-col lg:flex-row gap-6 scroll-mt-24`}
      dir="rtl"
      aria-label={`درس‌های موضوع ${topicName}`}
    >
      {/* Topic Image - Simplified version without text overlay */}
      <div className="w-full lg:w-1/4 relative rounded-md overflow-hidden shadow-sm flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <Image
          src={topic.image || "/logo.png"}
          alt={topic.title}
          width={240}
          height={135}
          className="object-cover rounded-md"
          priority
          unoptimized={process.env.NODE_ENV !== "production"}
        />
      </div>

      {/* Lessons List */}
      <div className="flex-1 flex flex-col" dir="rtl">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-hoboc">
          <BsBook className="w-4 h-4" />
          {topicName}
        </h2>

        <div className="space-y-2 overflow-visible">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/courses/${topic.slug}/lesson/${lesson.slug}`}
              className="group block bg-gray-50 dark:bg-gray-800 rounded-md p-3 shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-hoboc focus-visible:ring-offset-1"
              aria-label={`رفتن به درس ${lesson.title}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold select-none
                      ${
                        lesson.is_free
                          ? "bg-green-200 text-green-800 group-hover:bg-green-300"
                          : "bg-hoboc text-white group-hover:bg-hoboc-dark"
                      }`}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </div>
                  <div className="text-right max-w-xs">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-hoboc transition-colors truncate">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-400 text-xs select-none">
                  <span className="whitespace-nowrap">{lesson.duration} دقیقه</span>
                  {lesson.is_free && (
                    <span className="bg-green-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm select-none">
                      رایگان
                    </span>
                  )}
                  <FaChevronLeft className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}