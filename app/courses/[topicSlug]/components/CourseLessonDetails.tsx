import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { BsBook } from "react-icons/bs";

function truncateDescription(text: string, maxLength = 150): string {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  const slice = text.slice(0, maxLength);
  const lastSpaceIndex = slice.lastIndexOf(" ");

  if (lastSpaceIndex === -1) {
    return slice + "...";
  }

  return slice.slice(0, lastSpaceIndex) + "...";
}

export default function CourseLessonDetails({
  topic,
  lessons,
}: {
  topic: CoursesTopic;
  lessons: CoursesLesson[];
}) {
  return (
    <div className="flex-1 min-w-0 ">
      <div className="bg-white p-4 rounded-xl py-6 px-6 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800 dark:text-gray-100">
          <BsBook className="w-6 h-6 ml-2" />
          محتوای دوره
        </h2>

        <div className="overflow-y-auto max-h-[calc(100vh-200px)] pl-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/courses/${topic.slug}/lesson/${lesson.slug}`}
                className="group block rounded-md p-3 transition-colors duration-200 cursor-pointer bg-base-100 dark:bg-gray-900 hover:bg-hoboc/5 dark:hover:bg-hoboc/10 shadow-none hover:shadow-none focus:outline-none focus-visible:ring-0 border-0"
                aria-label={`رفتن به درس ${lesson.title}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`min-w-7 min-h-7 w-7 h-7 aspect-square rounded-full flex items-center justify-center text-sm font-semibold select-none
                        ${
                          lesson.is_free
                            ? "bg-green-200 text-green-800 group-hover:bg-green-300"
                            : "bg-hoboc text-white group-hover:bg-hoboc-dark"
                        }`}
                      aria-hidden="true"
                      style={{ boxShadow: "none", border: "none" }}
                    >
                      {index + 1}
                    </div>
                    <div className="text-right max-w-xs">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-hoboc transition-colors truncate">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {truncateDescription(lesson.description, 100)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-400 dark:text-gray-400 text-xs select-none">
                    <span className="whitespace-nowrap pr-2">{lesson.duration} دقیقه</span>
                    {lesson.is_free && (
                      <span className="bg-green-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-none select-none">
                        رایگان
                      </span>
                    )}
                    <FaChevronLeft className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:text-hoboc" />
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
