import { Suspense } from "react";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { fetchApiData } from "../services/api/apiClientAxios";
import { ApiResponse, BlogPost, BlogTopic } from "@/app/types/blogType";
import BlogPostCard from "./components/BlogPostCard";
import BlogTopicsDropdown from "./components/BlogTopicsDropdown";

// Server-side component to fetch topics
async function TopicsList() {
  const topicsResponse = await getApiData("/blog-topics/");
  const topics: BlogTopic[] = Array.isArray(topicsResponse.data)
    ? topicsResponse.data
    : topicsResponse.data?.results || [];

  return <BlogTopicsDropdown topics={topics} />;
}

// Client-side component to display posts
async function BlogPostsList({ topicSlug }: { topicSlug?: string }) {
  let posts: BlogPost[] = [];

  try {
    // fetchApiData حتما ApiResponse<BlogPost> برمیگردونه
    const response: ApiResponse<BlogPost> = await fetchApiData<BlogPost>(
      "blog-posts",
      topicSlug ? { "topic-slug": topicSlug } : undefined
    );

    posts = response.results; // اینجا آرایه اصلی بلاگ پست‌هاست
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return <div className="text-red-500">خطا در دریافت مطالب بلاگ</div>;
  }

  if (posts.length === 0) {
    return <div className="text-gray-500 py-8 text-center">مطلبی یافت نشد</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const selectedTopicSlug = searchParams.topic;

  return (
    <div dir="rtl" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">مطالب بلاگ</h1>

        {/* Topics dropdown - server-side rendered */}
        <Suspense
          fallback={
            <div className="w-64 h-10 bg-gray-200 rounded-md animate-pulse" />
          }
        >
          <TopicsList />
        </Suspense>
      </div>

      {/* Posts list - client-side rendered */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        }
      >
        <BlogPostsList topicSlug={selectedTopicSlug} />
      </Suspense>
    </div>
  );
}
