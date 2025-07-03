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
    <div className="lg:w-2/3 bg-base-100 rounded-box shadow-md p-6 mt-10 flex gap-6" dir="ltr">
      {/* تصویر موضوع سمت چپ با margin-top 45px */}
      <div className="relative w-40 h-28 rounded-box overflow-hidden flex-shrink-0 shadow-lg mt-[45px]">
        <Image
          src={topic.image || "/logo.png"}
          alt={topic.title}
          fill
          className="object-cover"
          priority
          unoptimized={process.env.NODE_ENV !== "production"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-2 text-right">
          <span className="badge badge-accent mb-1">متوسط</span>
          <h2 className="text-white text-sm font-bold">{topic.title}</h2>
        </div>
      </div>

      {/* لیست درس‌ها سمت راست */}
      <div className="flex-1 text-right" dir="rtl">
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-start">
          <BsBook className="w-6 h-6 mr-2" />
<p>&nbsp;&nbsp;&nbsp;</p>
           {topicName}
        </h2>

        {/* حذف overflow-y-auto و max-h-[300px] برای نمایش کامل */}
        <div className="pl-4">
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/courses/${topicName}/lesson/${lesson.slug}`}
              >
                <div className="flex items-center justify-between p-4 hover:bg-base-200 rounded-lg transition-colors duration-200 cursor-pointer">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
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
    </div>
  );
}
