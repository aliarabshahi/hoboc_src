import { BlogPost } from "@/app/types/blogType";
import BlogVideoPlayer from "./BlogVideoPlayer";
import { FiUser, FiCalendar, FiBookmark } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

interface BlogSidebarProps {
  postData: BlogPost;
  topicSlug: string;
  currentPostSlug: string;
}

export default function BlogSidebar({ postData, topicSlug }: BlogSidebarProps) {
  return (
    <div className="space-y-4">


      {/* Post Info Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">{postData.title}</h1>

        {/* Description */}
        {postData.description && (
          <p className="text-gray-500 leading-relaxed text-[15px]">
            {postData.description}
          </p>
        )}

        {/* Metadata Section */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          {/* Author */}
          {postData.writer && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <FiUser className="text-gray-500" size={14} />
                <span>نویسنده:</span>
              </div>
              <div className="flex items-center gap-2">
                {postData.writer.profile_picture && (
                  <Image
                    src={postData.writer.profile_picture}
                    alt={postData.writer.name}
                    className="w-6 h-6 rounded-full object-cover"
                    width={24}
                    height={24}
                    unoptimized={postData.writer.profile_picture.startsWith("data:")}
                  />
                )}
                <span className="text-green-600 text-sm">
                  {postData.writer.name}
                </span>
              </div>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FiCalendar className="text-gray-500" size={14} />
            <span>تاریخ انتشار:</span>
            <span className="text-gray-700">
              {new Date(postData.created_at).toLocaleDateString("fa-IR")}
            </span>
          </div>

          {/* Tags */}
          {postData.tags?.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center text-gray-600 text-sm gap-2">
                <FiBookmark size={14} className="text-gray-500" />
                <span>برچسب‌ها:</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2" dir="ltr">
                {postData.tags.map((tag) => (
                  <Link
                    href={`/blog/${topicSlug}?tag=${tag.slug}`}
                    key={tag.id}
                    className="bg-hoboc/10 text-hoboc px-2.5 py-0.5 rounded-full text-xs font-medium hover:bg-hoboc-dark/10 transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Cover Image - Now square */}
      {postData.cover_image && (
        <div className="bg-white p-0 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative w-full aspect-square">
            <Image
              src={postData.cover_image}
              alt={postData.title}
              fill
              className="object-cover"
              priority={true}
              unoptimized={postData.cover_image.startsWith("data:")}
            />
          </div>
        </div>
      )}
      {/* Video Section */}
      {(postData.video_url || postData.video_file) && (
        <BlogVideoPlayer postData={postData} />
      )}
    </div>
  );
}
