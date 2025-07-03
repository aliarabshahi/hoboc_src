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
}

export default function CourseLessons({ lessons_api_response, topic }: CourseLessonsProps) {
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
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mt-12 flex flex-col lg:flex-row gap-10" dir="rtl">
      {/* تصویر موضوع سمت چپ */}
      <div className="w-full lg:w-1/3 relative rounded-xl overflow-hidden shadow-xl flex items-center justify-center">
        <Image
          src={topic.image || "/logo.png"}
          alt={topic.title}
          width={320}
          height={180}
          className="object-cover rounded-xl"
          priority
          unoptimized={process.env.NODE_ENV !== "production"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
        <div className="absolute bottom-4 right-4 text-right text-white">
          <span className="bg-indigo-600 text-xs px-3 py-1 rounded-full shadow-md inline-block mb-1">متوسط</span>
          <h2 className="text-xl font-semibold drop-shadow-lg">{topic.title}</h2>
        </div>
      </div>

      {/* لیست درس‌ها سمت راست */}
      <div className="flex-1 flex flex-col" dir="rtl">
        <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-3 text-indigo-700 dark:text-indigo-400">
          <BsBook className="w-7 h-7" />
          {topicName}
        </h2>

        <div className="space-y-5 overflow-visible">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/courses/${topicName}/lesson/${lesson.slug}`}
              className="group block bg-gray-50 dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold select-none
                      ${
                        lesson.is_free
                          ? "bg-green-200 text-green-800 group-hover:bg-green-300"
                          : "bg-indigo-200 text-indigo-800 group-hover:bg-indigo-300"
                      }`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 transition-colors">{lesson.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{lesson.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-400 dark:text-gray-400">
                  <span className="text-sm whitespace-nowrap">{lesson.duration} دقیقه</span>
                  {lesson.is_free && (
                    <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm select-none">
                      رایگان
                    </span>
                  )}
                  <FaChevronLeft className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
