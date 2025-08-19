"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { fetchApiData } from "../services/api/apiClientAxios";
import { BlogPost, BlogTopic } from "@/app/types/blogType";
import BlogPostCard from "./components/BlogPostCard";
import BlogTopicsDropdown from "./components/BlogTopicsDropdown";
import BlogHeader from "./components/BlogHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ---- تابع اسکلتون بلاگ کارت ----
function SkeletonBlogCard() {
  return (
    <div className="h-[320px] bg-gray-200 rounded-xl animate-pulse" />
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

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 9;

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

  // وقتی موضوع تغییر کرد صفحه اول
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTopicSlug]);

  const totalPages = Math.ceil(posts.length / pageSize);
  const currentPosts = posts.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const selectedTopic = topics.find((t) => t.slug === selectedTopicSlug);
  const title = selectedTopic
    ? `مطالب بلاگ ${selectedTopic.catchy_title || selectedTopic.title || ""}`
    : "مطالب بلاگ";

  const description =
    "بلاگ تخصصی علم داده، مهندسی داده و تحلیل داده، کاربردی برای بازار کار و دنیای واقعی";

  return (
    <main className="min-h-screen pb-16">
      {/* Blog Header */}
      <BlogHeader title={title} description={description} />

      {/* Dropdown Filter */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-8 text-center"
        dir="rtl"
      >
        {loading ? (
          <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mx-auto" />
        ) : (
          <BlogTopicsDropdown
            topics={topics}
            selectedTopicSlug={selectedTopicSlug}
          />
        )}
      </section>

      {/* Blog Grid */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-10"
        dir="rtl"
      >
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(pageSize)].map((_, i) => (
              <SkeletonBlogCard key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-gray-500 text-center mt-16">
            مطلبی یافت نشد. لطفاً موضوع دیگری را انتخاب کنید.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-8 mt-10">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition disabled:opacity-50"
                  aria-label="صفحه قبلی"
                >
                  <ChevronRight size={24} />
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition disabled:opacity-50"
                  aria-label="صفحه بعدی"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
