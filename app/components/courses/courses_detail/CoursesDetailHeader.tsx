import React from "react";
import { CoursesTopic } from "@/app/types/coursesType";

interface CoursesDetailHeaderProps {
  topic: CoursesTopic | null;
}

const CoursesDetailHeader = ({ topic }: CoursesDetailHeaderProps) => {
  if (!topic) {
    return (
      <div className="mb-8" dir="rtl">
        <h1 className="text-2xl font-bold mt-2">هیچ موضوعی انتخاب نشده است</h1>
      </div>
    );
  }

  return (
    <div className="mb-8" dir="rtl">
      <h1 className="text-2xl font-bold mt-2">{topic.catchy_title}</h1>
      <p className="text-md opacity-80 mt-2">{topic.description}</p>

      {/* <div className="flex items-center mt-4">
        {course.instructor && (
          <div className="flex items-center ml-6">
            <span className="text-sm opacity-70">مدرس:</span>
            <span className="font-medium mr-2">
              {(course.instructor as any)?.user?.name || 'نامعلوم'}
            </span>
          </div>
        )}
        
        <div className="flex items-center">
          <span className="text-sm opacity-70">دسته‌بندی:</span>
          <span className="font-medium mr-2">
            {(course.topic as any)?.title || course.topic}
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default CoursesDetailHeader;
