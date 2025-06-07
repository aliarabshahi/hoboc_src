import React from "react";
import { Course } from "@/app/types/course";

interface CoursesDetailHeaderProps {
  course: Course;
}

const CoursesDetailHeader = ({ course }: CoursesDetailHeaderProps) => {
  return (
    <div className="mb-8" dir="rtl">
      <h1 className="text-2xl font-bold mt-2">{course.title}</h1>
      <p className="text-md opacity-80 mt-2">{course.description}</p>
      
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