"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { fetchApiData } from "../services/api/apiClientAxios";
import { BlogPost, BlogTopic } from "@/app/types/blogType";
import BlogPostCard from "./components/BlogPostCard";
import BlogTopicsDropdown from "./components/BlogTopicsDropdown";

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
          Array.isArray(topicsResponse.data) ?
            topicsResponse.data : topicsResponse.data?.results || [];
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
  const title = selectedTopic ? `مطالب بلاگ ${selectedTopic.catchy_title}` : "مطالب بلاگ";

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white pt-16 pb-10 shadow rounded-b-xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800" dir="rtl">
            {title}
          </h1>
          <p className="text-gray-600 md:text-lg" dir="rtl">
            مقالات آموزشی در زمینه بورس، سرمایه‌گذاری و مهارت‌های مالی
          </p>
        </div>
      </section>

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
              <div key={i} className="h-[420px] bg-gray-200 rounded-xl animate-pulse" />
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
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-5">
    <div>
      <h2 className="font-bold text-2xl text-hoboc-dark mb-2" dir="rtl">مطالب جدید بلاگ را از دست ندهید!</h2>
      <p className="text-hoboc-dark text-base" dir="rtl">
        با دنبال کردن مقالات تخصصی، دانش خود را به‌روز کنید و با اطمینان سرمایه‌گذاری کنید.
      </p>
    </div>
    <button className="btn bg-hoboc hover:bg-hoboc-dark text-white px-8 py-3 rounded-xl font-bold text-lg transition">
      مشاهده همه مقالات
    </button>
  </div>
</section>

    </main>
  );
}
