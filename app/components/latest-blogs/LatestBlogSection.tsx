"use client";

import { useEffect, useState } from "react";
import BlogCardsMainPage from "./BlogCardsMainPage";
import Link from "next/link";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { BlogPost } from "@/app/types/blogType";
import { ChevronLeft, ChevronRight } from "lucide-react";

function SkeletonBlogCard() {
  return (
    <div className="w-full h-[340px] rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
  );
}

function SkeletonArrowButton() {
  return (
    <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse">
      <div className="w-6 h-6" />
    </div>
  );
}

export default function LatestBlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getApiData("/blog-posts/?page_size=6&ordering=-created_at");
        if (res.data) setPosts(res.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= posts.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0
        ? posts.length - (posts.length % 3 || 3)
        : prevIndex - 3
    );
  };

  const visiblePosts: (BlogPost | null)[] = loading
    ? Array(3).fill(null)
    : posts.slice(currentIndex, currentIndex + 3);

  return (
    <div className="w-full mt-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-hoboc-dark">
          آخرین مقالات
        </h2>
        <Link href="/blog">
          <button className="button button--gray text-white text-base font-medium px-4 py-2 rounded bg-gray-800 hover:bg-hoboc transition">
            مشاهده همه
          </button>
        </Link>
      </div>

      {/* Blog cards grid */}
      <div className="grid gap-6 md:grid-cols-3 relative z-10 lg:pr-10 ">
        {visiblePosts.map((post, index) => (
          <div key={post?.id || index}>
            {post === null ? (
              <SkeletonBlogCard />
            ) : (
              <BlogCardsMainPage post={post} />
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center gap-8 mt-8 relative z-10 lg:pr-10">
        {loading ? (
          <>
            <SkeletonArrowButton />
            <SkeletonArrowButton />
          </>
        ) : posts.length > 3 ? (
          <>
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition"
              aria-label="مقالات قبلی"
            >
              <ChevronRight size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition"
              aria-label="مقالات بعدی"
            >
              <ChevronLeft size={24} />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
