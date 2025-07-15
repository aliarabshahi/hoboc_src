import { BlogPost } from "@/app/types/blogType";
import VideoPlayer from "./VideoPlayer";
import { FiClock, FiUser, FiBookmark, FiCalendar } from "react-icons/fi";
import Link from "next/link";

interface BlogSidebarProps {
  postData: BlogPost;
  topicSlug: string;
  currentPostSlug: string;
}

export default function BlogSidebar({ postData, topicSlug }: BlogSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Post Info Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">{postData.title}</h1>
        <p className="text-gray-500 mt-3 leading-relaxed text-[15px]">
          {postData.description}
        </p>

        {/* Cover Image */}
        {postData.cover_image && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <img 
              src={postData.cover_image} 
              alt={postData.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Compact Metadata Section */}
        <div className="mt-3 space-y-2 text-[13px]">
          {postData.writer && (
            <div className="flex items-center gap-2">
              <FiUser className="text-gray-500" size={14} />
              <span className="text-gray-500">نویسنده:</span>
              <span className="text-green-600">
                {postData.writer.name}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-500" size={14} />
            <span className="text-gray-500">تاریخ انتشار:</span>
            <span className="text-green-600">
              {new Date(postData.created_at).toLocaleDateString('fa-IR')}
            </span>
          </div>

          {postData.tags?.length > 0 && (
            <div>
              <div className="flex items-center text-gray-500 text-[13px] gap-2">
                <FiBookmark size={14} className="text-gray-500" />
                <span>برچسب‌ها:</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-1" dir="ltr">
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