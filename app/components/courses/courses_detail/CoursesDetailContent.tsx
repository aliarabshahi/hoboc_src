import React from "react";
import Link from "next/link";
import { FaChevronLeft, FaCheck } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import { Course } from "@/app/types/course";
import { getApiData } from "@/app/services/api/getData";

interface CoursesDetailContentProps {
  course: Course;
}

const CoursesDetailContent = async ({ course }: CoursesDetailContentProps) => {
  const { data: lessonsData, error } = await getApiData(`/course-lessons/`);

  if (error) {
    return (
      <div className="alert alert-error" dir="rtl">
        {error}
      </div>
    );
  }

  if (!lessonsData || lessonsData.length === 0) {
    return (
      <div className="alert alert-info" dir="rtl">
        درسی برای نمایش وجود ندارد
      </div>
    );
  }

  return (
    <div className="lg:w-2/3 bg-base-100 rounded-box shadow-md p-6" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <BsBook className="w-6 h-6 ml-2" />
        محتوای دوره
      </h2>

      <div className="overflow-y-auto max-h-[300px] pl-4">
        <div className="space-y-3">
          {lessonsData.map((lesson: any, index: number) => (
            <Link
              href={`/course/${course.slug}/lesson/${lesson.slug}`}
              key={lesson.id}
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
                    <p className="text-sm text-gray-500">
                      {lesson.description}
                    </p>
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
};

export default CoursesDetailContent;