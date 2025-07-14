import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { BlogTopic } from "@/app/types/blogType";

interface BlogNavigationBarProps {
  topic: BlogTopic;
  postTitle: string;
}

export default function BlogNavigationBar({ topic, postTitle }: BlogNavigationBarProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className="bg-white border-b border-gray-200 py-3 mb-6"
      dir="rtl"
    >
      <ol className="flex items-center gap-1 text-gray-600 text-sm select-none">
        <li>
          <Link 
            href="/blog" 
            className="hover:text-hoboc transition-colors duration-200"
          >
            بلاگ
          </Link>
        </li>

        <li className="flex items-center">
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <Link
            href={`/blog/${topic.slug}`}
            className="hover:text-hoboc-dark transition-colors duration-200 font-medium"
          >
            {topic.title}
          </Link>
        </li>

        <li className="flex items-center text-hoboc-dark font-semibold">
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <span className="truncate max-w-xs">{postTitle}</span>
        </li>
      </ol>
    </nav>
  );
}