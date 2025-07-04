"use client";

import React from "react";
import Link from "next/link";
import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";
import { BsBook } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";

function truncateDescription(text: string, maxLength = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}

interface TestProps {
  lessons: CoursesLesson[];
  activeTopic?: CoursesTopic;
}

export default function Test({ lessons, activeTopic }: TestProps) {
  return (
    <div className="lg:w-2/3 bg-base-100 rounded-box shadow-md p-6" dir="rtl">
      <h2 className="text-xl font-bold mb-6 flex items-center ">
        <BsBook className="w-6 h-6 ml-2" />
        محتوای دوره
      </h2>

      <div className="overflow-y-auto max-h-[300px] pl-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
        <div className="space-y-2">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/courses/${(lesson.topic as CoursesTopic)?.slug ?? activeTopic?.slug}/lesson/${lesson.slug}`}
              className="group block rounded-md p-3 transition-colors duration-200 cursor-pointer bg-base-100 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-none hover:shadow-none focus:outline-none focus-visible:ring-0 border-0"
              aria-label={`رفتن به درس ${lesson.title}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`min-w-7 min-h-7 w-7 h-7 aspect-square rounded-full flex items-center justify-center text-sm font-semibold select-none
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
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {truncateDescription(lesson.description)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-400 text-xs select-none">
                  <span className="whitespace-nowrap pr-2">
                    {lesson.duration} دقیقه
                  </span>
                  {lesson.is_free && (
                    <span className="bg-green-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-none select-none">
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
