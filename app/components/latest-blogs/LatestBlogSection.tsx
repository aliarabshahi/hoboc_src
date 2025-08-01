"use client";

import { useEffect, useState, useRef } from "react";
import BlogCardsMainPage from "./BlogCardsMainPage";
import Link from "next/link";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { BlogPost } from "@/app/types/blogType";
import { ChevronRight } from "lucide-react";

function SkeletonBlogCard() {
  return (
    <div
      className="
        min-w-[300px]
        max-w-[300px]
        h-[263px]   /* approximate total height of the blog card */
        rounded-xl
        bg-gray-200 dark:bg-gray-700
        shadow-sm
        animate-pulse
        flex-shrink-0
      "
    />
  );
}


export default function LatestBlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getApiData(
          "/blog-posts/?page_size=6&ordering=-created_at"
        );
        if (res.data) {
          setPosts(res.data);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCardClick = (e: React.MouseEvent, postId: number) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="w-full mt-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-hoboc-dark">
            جدیدترین مقالات
          </h2>

          <Link href="/blog" passHref>
            <button className="button button--gray mr-auto text-white text-base font-medium px-4 py-2 rounded bg-hoboc-dark hover:bg-hoboc transition">
              مشاهده بیشتر
            </button>
          </Link>
        </div>

        {/* Arrows + Cards */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:block absolute -left-10 z-10 text-hoboc-dark hover:text-hoboc transition"
            aria-label="Scroll left"
          >
            <ChevronRight className="rotate-180" size={32} />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="
              flex gap-6 px-2 w-full 
              overflow-x-auto sm:overflow-x-auto 
              md:overflow-hidden 
              pb-4 
              scrollbar-thin scrollbar-thumb-hoboc-dark scrollbar-track-gray-100 
              cursor-grab active:cursor-grabbing
            "
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonBlogCard key={i} />
                ))
              : posts.map((post) => (
                  <div
                    key={post.id}
                    className="min-w-[300px] max-w-[300px] flex-shrink-0"
                    onClick={(e) => handleCardClick(e, post.id)}
                  >
                    <BlogCardsMainPage post={post} />
                  </div>
                ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:block absolute -right-10 z-10 text-hoboc-dark hover:text-hoboc transition"
            aria-label="Scroll right"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}
