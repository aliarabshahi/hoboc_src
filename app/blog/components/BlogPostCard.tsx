import Link from "next/link";
import { BlogPost } from "@/app/types/blogType";
import { FiCalendar, FiUser } from "react-icons/fi";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <div className="relative h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
      {post.cover_image && (
        <div className="h-48 overflow-hidden relative">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3 flex justify-start">
          <span className="inline-block px-2 py-1 text-xs font-medium text-hoboc-dark bg-hoboc/10 rounded-full">
            {typeof post.topic === "string" ? post.topic : post.topic.title}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-650 mb-3 line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {post.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <FiUser className="text-hoboc" size={14} />
            <span>{post.writer?.name || "ناشناس"}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiCalendar className="text-hoboc" size={14} />
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString("fa-IR")}
            </time>
          </div>
        </div>
      </div>

      <Link
        href={`/blog/${post.topic}/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read more about ${post.title}`}
      />
    </div>
  );
}
