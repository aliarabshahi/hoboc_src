// components/lessons/CourseNavigationBar.tsx

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { CoursesTopic } from "@/app/types/coursesType";

interface CourseNavigationBarProps {
  topic: CoursesTopic;
}

export default function CourseNavigationBar({ topic }: CourseNavigationBarProps) {
  return (
    <nav aria-label="breadcrumb" className="bg-white bg-transparent backdrop-blur-sm border-b border-gray-400 py-3 mb-6" dir="rtl">
      <ol className="flex items-center gap-1 text-gray-600 text-sm select-none">
        <li>
          <Link href="/courses" className="hover:text-hoboc transition-colors duration-200 font-medium">
            دوره‌ها
          </Link>
        </li>

        <li className="flex items-center text-hoboc-dark font-semibold">
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <span>{topic.title}</span>
        </li>
      </ol>
    </nav>
  );
}
