"use client";

import Link from "next/link";
import { FiBookOpen, FiClock, FiUser } from "react-icons/fi";
import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";

export default function CourseCard({ lesson }: { lesson: CoursesLesson }) {
  // گرفتن اسلاگ موضوع
  const getTopicSlug = (): string => {
    if (lesson.tags?.[0]?.slug) return lesson.tags[0].slug;
    if (lesson.topic && typeof lesson.topic !== "string") return lesson.topic.slug || "general";
    return "general";
  };

  // عنوان موضوع
  const getTopicTitle = (): string => {
    return typeof lesson.topic === "string" ? lesson.topic : lesson.topic?.title || "بدون موضوع";
  };

  // فرمت زمان
  const formatDuration = (duration: number | null): string => {
    if (!duration) return "زمان نامشخص";
    return duration < 60
      ? `${duration} دقیقه`
      : `${Math.floor(duration / 60)} ساعت و ${duration % 60} دقیقه`;
  };

  return (
    <div className="group block bg-white p-5 rounded-xl shadow-sm border border-hoboc flex flex-col justify-between transition hover:shadow-md relative overflow-hidden">
      {/* تصویر */}
      {lesson.thumbnail && (
        <Link 
          href={`/courses/${getTopicSlug()}/lesson/${lesson.slug}`}
          className="h-40 w-full mb-4 rounded-lg overflow-hidden block"
        >
          <img
            src={lesson.thumbnail}
            alt={lesson.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </Link>
      )}

      {/* عنوان */}
      <Link 
        href={`/courses/${getTopicSlug()}/lesson/${lesson.slug}`}
        className="text-lg font-bold text-gray-700 mb-0 line-clamp-2 hover:text-hoboc transition-colors"
      >
        {lesson.title}
      </Link>

      {/* توضیح */}
      {lesson.description && (
        <p className="text-gray-500 text-sm mb-3 mt-0 line-clamp-3 leading-6">{lesson.description}</p>
      )}

      {/* اطلاعات پایین */}
      <div className="flex justify-between items-center mt-auto mb-4 pt-1 text-sm text-hoboc-dark">
        {/* موضوع - با لینک جداگانه */}
        <Link 
          href={`/courses/${getTopicSlug()}`}
          className="flex items-center gap-2 hover:text-hoboc transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <FiBookOpen size={14} />
          <span>{getTopicTitle()}</span>
        </Link>

        {/* زمان */}
        <div className="flex items-center gap-2">
          <FiClock size={14} />
          <span>{formatDuration(lesson.duration)}</span>
        </div>

        {/* مدرس */}
        {/* {lesson.instructor?.name && (
          <div className="flex items-center gap-2">
            <FiUser size={14} />
            <span>مدرس: {lesson.instructor.name}</span>
          </div>
        )} */}
      </div>

      {/* دکمه */}
      <Link 
        href={`/courses/${getTopicSlug()}/lesson/${lesson.slug}`}
        className="block w-full select-none text-center py-3 rounded-xl font-bold
                 bg-white text-hoboc border border-hoboc
                 hover:bg-hoboc hover:text-white
                 transition-colors duration-200 shadow-sm"
      >
        مشاهده درس
      </Link>
    </div>
  );
}