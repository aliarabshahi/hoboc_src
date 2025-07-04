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
      id={`topic-${topic.id}`}
      className={`max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 ${
        noTopMargin ? "" : "mt-10"
      } flex flex-col lg:flex-row gap-8 scroll-mt-24`}
      dir="rtl"
    >
      {/* تصویر موضوع */}
      <div className="w-full lg:w-1/3 relative rounded-lg overflow-hidden shadow-md flex items-center justify-center">
        <Image
          src={topic.image || "/logo.png"}
          alt={topic.title}
          width={280}
          height={160}
          className="object-cover rounded-lg"
          priority
          unoptimized={process.env.NODE_ENV !== "production"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
        <div className="absolute bottom-3 right-3 text-white text-right">
          <span className="bg-hoboc text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm inline-block mb-1">
            متوسط
          </span>
          <h2 className="text-sm font-semibold drop-shadow-md">{topic.title}</h2>
        </div>
      </div>

      {/* لیست درس‌ها */}
      <div className="flex-1 flex flex-col" dir="rtl">
        <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2 text-hoboc">
          <BsBook className="w-5 h-5" />
          {topicName}
        </h2>

        <div className="space-y-3 overflow-visible">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/courses/${topic.slug}/lesson/${lesson.slug}`}
              className="group block bg-gray-50 dark:bg-gray-800 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold select-none
                      ${
                        lesson.is_free
                          ? "bg-green-200 text-green-800 group-hover:bg-green-300"
                          : "bg-hoboc text-white group-hover:bg-hoboc-dark"
                      }`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-hoboc transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-xs">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-400 text-xs">
                  <span className="whitespace-nowrap">{lesson.duration} دقیقه</span>
                  {lesson.is_free && (
                    <span className="bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm select-none">
                      رایگان
                    </span>
                  )}
                  <FaChevronLeft className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
