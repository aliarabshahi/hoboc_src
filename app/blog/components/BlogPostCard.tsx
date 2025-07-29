import Link from "next/link";
import { BlogPost } from "@/app/types/blogType";
import { FiCalendar, FiUser } from "react-icons/fi";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-hoboc flex flex-col transition hover:shadow-md relative overflow-hidden">
      {post.cover_image && (
        <div className="h-40 w-full mb-4 rounded-lg overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <span className="text-xs font-medium text-hoboc-dark bg-hoboc/10 rounded-full px-2 py-1 mb-2 w-max">
        {typeof post.topic === "string" ? post.topic : post.topic.title}
      </span>

      <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{post.title}</h3>
      <p className="text-gray-500 text-sm mb-3 line-clamp-3">{post.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-3 border-t border-hoboc/30">
        <div className="flex items-center gap-2">
          <FiUser size={14} className="text-hoboc" />
          <span>{post.writer?.name || "ناشناس"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar size={14} className="text-hoboc" />
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString("fa-IR")}
          </time>
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
