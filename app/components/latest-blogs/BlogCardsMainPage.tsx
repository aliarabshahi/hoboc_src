import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/app/types/blogType";
import { FiCalendar, FiUser } from "react-icons/fi";

export default function BlogCardsMainPage({ post }: { post: BlogPost }) {
  return (
    <article
      dir="rtl"
      className="
        relative isolate flex flex-col justify-end 
        overflow-hidden rounded-2xl bg-gray-900 
        px-6 pb-6 pt-64 sm:pt-48 lg:pt-64
        shadow-lg hover:shadow-xl transition
      "
    >
      {/* پس‌زمینه عکس */}
      {post.cover_image && (
        <Image
          src={post.cover_image}
          alt={post.title}
          className="absolute inset-0 -z-10 size-full object-cover"
          fill
          priority={false}
          unoptimized={post.cover_image.startsWith("data:")}
        />
      )}

      {/* گرادینت تیره روی عکس */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />

      {/* حلقه حاشیه روشن */}
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      {/* اطلاعات نویسنده و تاریخ */}
      <div className="flex flex-wrap items-center gap-x-4 text-sm text-gray-300">
        {/* نویسنده */}
        <div className="flex items-center gap-x-1">
          <FiUser size={14} className="text-gray-300" />
          <span>{post.writer?.name || "ناشناس"}</span>
        </div>

        {/* تاریخ */}
        <div className="flex items-center gap-x-1">
          <FiCalendar size={14} className="text-gray-300" />
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString("fa-IR")}
          </time>
        </div>
      </div>

      {/* عنوان بلاگ */}
      <h3 className="mt-3 text-lg font-semibold text-white line-clamp-2 leading-7">
        <Link
          href={`/blog/${post.topic}/${post.slug}`}
          className="hover:text-gray-200 transition-colors"
        >
          <span className="absolute inset-0" />
          {post.title}
        </Link>
      </h3>
    </article>
  );
}
