// page.tsx
"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { BlogTopic } from "@/app/types/blogType";

import BlogHeader from "./components/BlogHeader";
import BlogTopicsDropdown from "./components/BlogTopicsDropdown";
import BlogList from "./components/main-page/BlogList";

export default function BlogPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const selectedTopicSlug = searchParams.topic;
  const [topics, setTopics] = useState<BlogTopic[]>([]);

  useEffect(() => {
    getApiData("/blog-topics/?page_size=30").then((res) => {
      const fetched: BlogTopic[] =
        Array.isArray(res.data) ? res.data : res.data?.results || [];
      setTopics(fetched);
    });
  }, []);

  const description =
    "بلاگ تخصصی علم داده، مهندسی داده و تحلیل داده، کاربردی برای بازار کار و دنیای واقعی";

  return (
    <main className="min-h-screen pb-16">
      <BlogHeader
        title={
          selectedTopicSlug
            ? `مطالب بلاگ ${decodeURIComponent(selectedTopicSlug)}`
            : "مطالب بلاگ"
        }
        description={description}
      />

      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-8 text-center"
        dir="rtl"
      >
        <BlogTopicsDropdown topics={topics} selectedTopicSlug={selectedTopicSlug} />
      </section>

      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-10"
        dir="rtl"
      >
        <BlogList selectedTopicSlug={selectedTopicSlug} pageSize={9} />
      </section>
    </main>
  );
}
