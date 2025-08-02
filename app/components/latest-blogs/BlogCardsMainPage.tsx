import Link from "next/link";
import Image from "next/image"; // ← just added this line
import { BlogPost } from "@/app/types/blogType";
import { FiCalendar, FiUser } from "react-icons/fi";

export default function BlogCardsMainPage({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-hoboc flex flex-col transition hover:shadow-md relative overflow-hidden">
      {post.cover_image && (
        <div className="-mt-5 -mx-5 mb-4 h-40 overflow-hidden">
          <Image
            src={post.cover_image}
            alt={post.title}
            className="object-cover w-full h-full rounded-t-xl"
            width={400}    // minimum required by next/image, pick a number close to your card!
            height={160}
            unoptimized={post.cover_image.startsWith("data:")}
          />
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-700 mb-1 line-clamp-2">
        {post.title}
      </h3>

      {/* <p className="text-gray-500 text-sm mb-3 line-clamp-3">{post.description}</p> */}

      <div className="flex items-center justify-between text-sm text-hoboc-dark mt-auto pt-3">
        <div className="flex items-center gap-2">
          <FiUser size={14} className="text-hoboc-dark" />
          <span>{post.writer?.name || "ناشناس"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar size={14} className="text-hoboc-dark" />
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
