"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { fetchApiData } from "@/app/services/api/apiClientAxios";
import { BlogPost, BlogTopic } from "@/app/types/blogType";
import BlogPostCard from "../BlogPostCard";
import BlogListSkeletonCard from "./BlogListSkeletonCard";
import BlogPagination from "./BlogPagination";

export default function BlogList({
  selectedTopicSlug,
  pageSize,
}: {
  selectedTopicSlug?: string;
  pageSize: number;
}) {
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<BlogTopic[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

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

  const totalPages = Math.ceil(posts.length / pageSize);
  const currentPosts = posts.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  // Reset to first page when topic changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTopicSlug]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(pageSize)].map((_, i) => (
          <BlogListSkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-16">{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-gray-500 text-center mt-16">
        مطلبی یافت نشد. لطفاً موضوع دیگری را انتخاب کنید.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => {
            if (currentPage > 0) {
              setCurrentPage((p) => p - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          onNext={() => {
            if (currentPage < totalPages - 1) {
              setCurrentPage((p) => p + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        />
      )}
    </>
  );
}
