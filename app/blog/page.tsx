"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { fetchApiData } from "../services/api/apiClientAxios";
import { BlogPost, BlogTopic } from "@/app/types/blogType";
import BlogPostCard from "./components/BlogPostCard";
import BlogTopicsDropdown from "./components/BlogTopicsDropdown";
import BlogCTABanner from "./components/BlogCTABanner";
import BlogHeader from "./components/BlogHeader"; // مسیر را با ساختار پروژه چک کن

// ---- تابع اسکلتون بلاگ کارت ----
function SkeletonBlogCard() {
  return (
    <div className="h-[360px] bg-gray-200 rounded-xl animate-pulse" />
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
        const topicsResponse = await getApiData("/blog-topics/?page_size=30");
        const fetchedTopics: BlogTopic[] =
          Array.isArray(topicsResponse.data)
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTopicSlug]);

  const selectedTopic = topics.find((t) => t.slug === selectedTopicSlug);
  const title = selectedTopic
    ? `مطالب بلاگ ${selectedTopic.catchy_title || selectedTopic.title || selectedTopic.catchy_title || ""}`
    : "مطالب بلاگ";

  // توضیح قابل تنظیم زیر عنوان بلاگ
  const description = "بلاگ تخصصی علم داده، مهندسی داده و تحلیل داده، کاربردی برای بازار کار و دنیای واقعی";

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Blog Header */}
      <BlogHeader title={title} description={description} />

      {/* Dropdown Filter */}
      <section className="container mx-auto px-4 mt-8 text-center">
        {loading ? (
          <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mx-auto" />
        ) : (
          <BlogTopicsDropdown topics={topics} selectedTopicSlug={selectedTopicSlug} />
        )}
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 mt-10 mb-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <SkeletonBlogCard key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-gray-500 text-center mt-16">
            مطلبی یافت نشد. لطفاً موضوع دیگری را انتخاب کنید.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
      {/* CTA Banner */}
      <section className="w-full bg-hoboc/10 py-10 mt-16">
        <BlogCTABanner />
      </section>
    </main>
  );
}
