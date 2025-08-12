"use client";

import { useEffect, useState } from "react";
import BlogCardsMainPage from "./BlogCardsMainPage";
import Link from "next/link";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { BlogPost } from "@/app/types/blogType";

function SkeletonBlogCard() {
  return (
    <div className="w-full h-[380px] rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
  );
}

export default function LatestBlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getApiData("/blog-posts/?page_size=3&ordering=-created_at");
        if (res.data) setPosts(res.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SkeletonBlogCard key={i} />
              ))
            : posts.map((post) => (
                <BlogCardsMainPage key={post.id} post={post} />
              ))}
        </div>
      </div>
    </section>
  );
}
