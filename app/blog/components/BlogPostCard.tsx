import Link from "next/link";
import { BlogPost } from "@/app/types/blogType";
import { FiCalendar, FiUser } from "react-icons/fi";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link 
      href={`/blog/${post.topic}/${post.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {post.cover_image && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {post.title}
        </h2>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FiUser size={14} />
            <span>{post.writer?.name || 'ناشناس'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FiCalendar size={14} />
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('fa-IR')}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
}