// components/lessons/LessonNavigationBar.tsx

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
      className="bg-white border-b border-gray-200 py-3 mb-6"
      dir="rtl"
    >
      <ol className="flex items-center gap-1 text-gray-600 text-sm select-none">
        <li>
          <Link 
            href="/courses" 
            className="hover:text-hoboc transition-colors duration-200"
          >
            دوره‌ها
          </Link>
        </li>

        <li className="flex items-center">
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <Link
            href={`/courses/${topic.slug}`}
            className="hover:text-hoboc-dark transition-colors duration-200 font-medium"
          >
            {topic.title}
          </Link>
        </li>

        <li className="flex items-center text-hoboc-dark font-semibold">
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <span className="truncate max-w-xs">{lessonTitle}</span>
        </li>
      </ol>
    </nav>
  );
}
