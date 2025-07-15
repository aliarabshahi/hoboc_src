import { Suspense } from "react";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { fetchApiData } from "../services/api/apiClientAxios";
import { ApiResponse, BlogPost, BlogTopic } from "@/app/types/blogType";
import BlogPostCard from "./components/BlogPostCard";
import BlogTopicsDropdown from "./components/BlogTopicsDropdown";

async function TopicsList() {
  const topicsResponse = await getApiData("/blog-topics/");
  const topics: BlogTopic[] = Array.isArray(topicsResponse.data)
    ? topicsResponse.data
    : topicsResponse.data?.results || [];

  return <BlogTopicsDropdown topics={topics} />;
}

async function BlogPostsList({ topicSlug }: { topicSlug?: string }) {
  let posts: BlogPost[] = [];

  try {
    const response: ApiResponse<BlogPost> = await fetchApiData<BlogPost>(
      "blog-posts",
      topicSlug ? { "topic-slug": topicSlug } : undefined
    );
    posts = response.results;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return <div className="text-red-500 text-center py-8">خطا در دریافت مطالب بلاگ</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-gray-500 py-12 text-center">
        <p className="text-lg">مطلبی یافت نشد</p>
        <p className="text-sm mt-2">لطفاً موضوع دیگری را انتخاب کنید</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <Suspense fallback={<div className="w-64 h-10 bg-gray-200 rounded-md animate-pulse" />}>
          <TopicsList />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-100 rounded-lg animate-pulse"
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