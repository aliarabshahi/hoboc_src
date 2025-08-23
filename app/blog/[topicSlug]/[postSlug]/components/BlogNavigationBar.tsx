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
      className="bg-transparent backdrop-blur-sm border-b border-gray-400 py-3 mb-6"
      dir="rtl"
    >
      <ol className="flex items-center gap-1 text-sm select-none">
        {/* Root link */}
        <li>
          <Link
            href="/blog"
            className="hover:text-hoboc font-medium transition-colors duration-200 text-gray-500"
          >
            بلاگ
          </Link>
        </li>

        {/* Topic link */}
        <li className="flex items-center">
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <Link
            href={`/blog/${topic.slug}`}
            className="hover:text-hoboc-dark transition-colors duration-200 font-semibold text-gray-700"
          >
            {topic.title}
          </Link>
        </li>

        {/* Current post (active) */}
        <li className="flex items-center">
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <span
            title={postTitle} // Shows full title on hover
            className="truncate max-w-[200px] font-bold text-hoboc-dark"
          >
            {postTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
