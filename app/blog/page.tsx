"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { fetchApiData } from "../services/api/apiClientAxios";
import { BlogPost, BlogTopic } from "@/app/types/blogType";
import BlogPostCard from "./components/BlogPostCard";
import BlogTopicsDropdown from "./components/BlogTopicsDropdown";

// Match BlogTopicsDropdown
function TopicsSkeleton() {
  return (
    <div className="pt-4">
      <div className="w-48 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
    </div>
  );
}

// Match BlogPostCard
function PostsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-[420px] w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<BlogTopic[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const selectedTopicSlug = searchParams.topic;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicsResponse = await getApiData("/blog-topics/");
        if (!topicsResponse || topicsResponse.data === null) {
          setError(topicsResponse?.error || "خطا در دریافت موضوعات بلاگ");
          return;
        }

        const fetchedTopics: BlogTopic[] = Array.isArray(topicsResponse.data)
          ? topicsResponse.data
          : topicsResponse.data?.results || [];
        setTopics(fetchedTopics);

        const postsResponse = await fetchApiData<BlogPost>(
          "blog-posts",
          selectedTopicSlug ? { "topic-slug": selectedTopicSlug } : undefined
        );
        setPosts(postsResponse.results);
      } catch (err) {
        setError("خطا در دریافت اطلاعات بلاگ");
        console.error("Failed to fetch blog data:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => fetchData(), 1200); // Optional simulated loading delay
    return () => clearTimeout(timer);
  }, [selectedTopicSlug]);

  const selectedTopic = topics.find((t) => t.slug === selectedTopicSlug);
  const title = selectedTopic
    ? `مطالب بلاگ ${selectedTopic.catchy_title}`
    : "مطالب بلاگ";

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400 text-center my-6 font-semibold text-lg">
        {error}
      </div>
    );
  }

  return (
    <div dir="rtl" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
      </div>

      <div className="mb-8">
        {loading ? (
          <TopicsSkeleton />
        ) : (
          <BlogTopicsDropdown
            topics={topics}
            selectedTopicSlug={selectedTopicSlug}
          />
        )}
      </div>

      {loading ? (
        <PostsSkeleton />
      ) : posts.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 py-12 text-center">
          <p className="text-lg">مطلبی یافت نشد</p>
          <p className="text-sm mt-2">لطفاً موضوع دیگری را انتخاب کنید</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
