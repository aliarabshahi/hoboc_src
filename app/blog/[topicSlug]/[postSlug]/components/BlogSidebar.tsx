import { BlogPost } from "@/app/types/blogType";
import VideoPlayer from "./VideoPlayer";
import { FiUser, FiCalendar, FiBookmark } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image"; // ✅ Import added

interface BlogSidebarProps {
  postData: BlogPost;
  topicSlug: string;
  currentPostSlug: string;
}

export default function BlogSidebar({ postData, topicSlug }: BlogSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Cover Image - Fixed size banner at top */}
      {postData.cover_image && (
        <div className="bg-white p-0 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Image
            src={postData.cover_image}
            alt={postData.title}
            className="w-full h-48 object-cover"
            width={640}    // عرض دلخواه بنر، متناسب با سایت. اعداد را می‌توانی تنظیم کنی
            height={192}   // ارتفاع بنر
            priority={true} // چون احتمالاً همیشه بالای سایدبار هست
            unoptimized={postData.cover_image.startsWith("data:")}
          />
        </div>
      )}

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
                    width={24} // 6 × 4px = 24px
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
              {new Date(postData.created_at).toLocaleDateString('fa-IR')}
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

      {/* Video Section */}
      {(postData.video_url || postData.video_file) && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <VideoPlayer postData={postData} />
        </div>
      )}
    </div>
  );
}
