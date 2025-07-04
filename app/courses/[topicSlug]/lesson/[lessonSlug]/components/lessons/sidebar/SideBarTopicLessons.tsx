// components/lessons/sidebar/SideBarTopicLessons.tsx

import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";

export default async function SideBarTopicLessons({ topicSlug }: { topicSlug: string }) {
  const res = await getApiData(`/course-lessons/?topic-slug=${topicSlug}`);

  if (!res || !res.data) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-red-200 text-red-500 text-sm">
        دریافت اطلاعات دروس این موضوع با خطا مواجه شد.
      </div>
    );
  }

  const lessons: CoursesLesson[] = res.data;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-blue-600 mb-3">
        لیست دروس مرتبط با: {topicSlug}
      </h2>

      {lessons.length === 0 ? (
        <p className="text-sm text-gray-500">درسی برای این موضوع یافت نشد.</p>
      ) : (
        <ul className="text-sm space-y-2">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="border-b pb-2">
              <div className="font-medium text-gray-800">{lesson.title}</div>
              <div className="text-gray-500 text-xs">مدت: {lesson.duration} دقیقه</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
