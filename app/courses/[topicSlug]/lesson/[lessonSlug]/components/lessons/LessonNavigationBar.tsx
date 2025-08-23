import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { CoursesTopic } from "@/app/types/coursesType";

interface LessonNavigationBarProps {
  topic: CoursesTopic;
  lessonTitle: string;
}

export default function LessonNavigationBar({ topic, lessonTitle }: LessonNavigationBarProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className="bg-transparent backdrop-blur-sm border-b border-gray-200 py-3 mb-6"
      dir="rtl"
    >
      <ol className="flex items-center gap-1 text-sm select-none">
        {/* Root link */}
        <li>
          <Link
            href="/courses"
            className="hover:text-hoboc font-medium transition-colors duration-200 text-gray-500"
          >
            دوره‌ها
          </Link>
        </li>

        {/* Topic link */}
        <li className="flex items-center">
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <Link
            href={`/courses/${topic.slug}`}
            className="hover:text-hoboc-dark transition-colors duration-200 font-semibold text-gray-700"
          >
            {topic.title}
          </Link>
        </li>

        {/* Current lesson (active) */}
        <li className="flex items-center">
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <span
            title={lessonTitle} // Full title on hover
            className="truncate max-w-[220px] font-bold text-hoboc-dark"
          >
            {lessonTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
