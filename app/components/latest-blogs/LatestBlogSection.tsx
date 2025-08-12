"use client";

import { useEffect, useState } from "react";
import BlogCardsMainPage from "./BlogCardsMainPage";
import Link from "next/link";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { BlogPost } from "@/app/types/blogType";
import { ChevronLeft, ChevronRight } from "lucide-react";

function SkeletonBlogCard() {
  return (
    <div className="w-full h-[380px] rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
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
      prevIndex - 3 < 0 ? posts.length - (posts.length % 3 || 3) : prevIndex - 3
    );
  };

  const visiblePosts = loading ? 
    Array.from({ length: 3 }) : 
    posts.slice(currentIndex, currentIndex + 3);

  return (
    <section className="w-full mt-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-hoboc-dark">
            جدیدترین مقالات
          </h2>
          <Link href="/blog">
            <button className="button button--gray text-white text-base font-medium px-4 py-2 rounded bg-hoboc-dark hover:bg-hoboc transition">
              مشاهده همه
            </button>
          </Link>
        </div>

        {/* Blog cards grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {visiblePosts.map((post, index) => (
            <div key={loading ? index : post.id}>
              {loading ? (
                <SkeletonBlogCard />
              ) : (
                <BlogCardsMainPage post={post} />
              )}
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {!loading && posts.length > 3 && (
          <div className="flex justify-center gap-8 mt-8">
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
          </div>
        )}
      </div>
    </section>
  );
}