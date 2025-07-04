// components/lessons/sidebar/SidebarLessonDetails.tsx

import { CoursesLesson } from "@/app/types/coursesType";
import { FiClock, FiUser, FiBookmark } from "react-icons/fi";

export default function SidebarLessonDetails({
  lessonData,
}: {
  lessonData: CoursesLesson;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">{lessonData.title}</h1>
      <p className="text-gray-500 mt-3 leading-relaxed text-[15px]">
        {lessonData.description}
      </p>

      <div className="mt-3 space-y-2 text-[13px]">
        {lessonData.instructor && (
          <div className="flex items-center gap-2">
            <FiUser className="text-gray-500" size={14} />
            <span className="text-gray-500">مدرس:</span>
            <span className="text-green-600">{lessonData.instructor.name}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <FiClock className="text-gray-500" size={14} />
          <span className="text-gray-500">مدت زمان:</span>
          <span className="text-green-600">{lessonData.duration} دقیقه</span>
        </div>

        {lessonData.tags?.length > 0 && (
          <div>
            <div className="flex items-center text-gray-500 text-[13px] gap-2">
              <FiBookmark size={14} className="text-gray-500" />
              <span>برچسب‌ها:</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-1" dir="ltr">
              {lessonData.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-hoboc/10 text-hoboc px-2.5 py-0.5 rounded-full text-xs font-medium hover:bg-hoboc-dark/10 transition-colors"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
