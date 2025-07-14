import { BlogPost } from "@/app/types/blogType";
import VideoPlayer from "./VideoPlayer";
import { FiClock, FiUser, FiBookmark, FiCalendar } from "react-icons/fi";
import Link from "next/link"; // ✅ اصلاح اینجا

interface BlogSidebarProps {
  postData: BlogPost;
  topicSlug: string;
}

export default function BlogSidebar({ postData, topicSlug }: BlogSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Author Card */}
      {postData.writer && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            {postData.writer.profile_picture && (
              <img 
                src={postData.writer.profile_picture} 
                alt={postData.writer.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-bold text-gray-800">نویسنده</h3>
              <p className="text-gray-600">{postData.writer.name}</p>
              {postData.writer.bio && (
                <p className="text-gray-500 text-sm mt-1">{postData.writer.bio}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Post Metadata */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <FiCalendar className="text-gray-500" size={14} />
            <span className="text-gray-500">تاریخ انتشار:</span>
            <span className="text-gray-700">
              {new Date(postData.created_at).toLocaleDateString('fa-IR')}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <FiCalendar className="text-gray-500" size={14} />
            <span className="text-gray-500">آخرین بروزرسانی:</span>
            <span className="text-gray-700">
              {new Date(postData.updated_at).toLocaleDateString('fa-IR')}
            </span>
          </div>

          {/* Tags */}
          {postData.tags?.length > 0 && (
            <div>
              <div className="flex items-center text-gray-500 text-sm gap-2">
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
