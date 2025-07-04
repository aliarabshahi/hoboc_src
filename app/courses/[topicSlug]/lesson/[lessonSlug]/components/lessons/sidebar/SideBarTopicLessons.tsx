import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

export default async function SideBarTopicLessons({
  topicSlug,
  currentLessonSlug,
}: {
  topicSlug: string;
  currentLessonSlug: string;
}) {
  const res = await getApiData(`/course-lessons/?topic-slug=${topicSlug}`);

  if (!res || !res.data) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-red-200 text-red-500 text-sm">
        دریافت اطلاعات دروس با خطا مواجه شد.
      </div>
    );
  }

  const lessons: CoursesLesson[] = res.data;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-hoboc mb-2">محتوای دوره</h2>

      {lessons.length === 0 ? (
        <p className="text-sm text-gray-500">درسی برای این موضوع یافت نشد.</p>
      ) : (
        <div className="flex flex-col gap-y-1">
          {lessons.map((lesson, index) => {
            const isActive = lesson.slug === currentLessonSlug;

            return (
              <Link
                key={lesson.id}
                href={`/courses/${topicSlug}/lesson/${lesson.slug}`}
                className={`group block p-2 rounded-md transition-colors duration-150 ${
                  isActive
                    ? "bg-hoboc/10 border border-hoboc"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  {/* Title container: flex-grow, wraps text */}
                  <div className="flex items-center gap-2 flex-grow min-w-0">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                        lesson.is_free
                          ? "bg-green-200 text-green-800"
                          : "bg-hoboc text-white"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <h3
                      className={`text-sm break-words ${
                        isActive
                          ? "text-hoboc font-bold"
                          : "text-gray-800 group-hover:text-hoboc"
                      }`}
                    >
                      {lesson.title}
                    </h3>
                  </div>

                  {/* Duration fixed width, no shrink */}
                  <div className="flex-shrink-0 flex items-center gap-1 text-gray-400 text-xs whitespace-nowrap">
                    <span>{lesson.duration} دقیقه</span>
                    <FaChevronLeft className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
