"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { BlogTopic } from "@/app/types/blogType";

import BlogHeader from "./components/BlogHeader";
import BlogTopicsDropdown from "./components/BlogTopicsDropdown";
import BlogList from "./components/main-page/BlogList";

export default function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const selectedTopicSlug = searchParams.topic;
  const [topics, setTopics] = useState<BlogTopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await getApiData("/blog-topics/?page_size=30");
        const fetched: BlogTopic[] = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];
        setTopics(fetched);
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, []);

  // Find the currently selected topic object
  const selectedTopic = topics.find((t) => t.slug === selectedTopicSlug);

  // Build the title just like in CoursesPage
  const title = selectedTopic
    ? `مطالب بلاگ ${selectedTopic.title || selectedTopic.title || ""}`
    : "مطالب بلاگ";

  const description =
    "بلاگ تخصصی علم داده، مهندسی داده و تحلیل داده، کاربردی برای بازار کار و دنیای واقعی";

  return (
    <main className="min-h-screen pb-16">
      {/* Blog Header */}
      <BlogHeader title={title} description={description} />

      {/* Topics dropdown */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-8 text-center"
        dir="rtl"
      >
        {loadingTopics ? (
          <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mx-auto" />
        ) : (
          <BlogTopicsDropdown
            topics={topics}
            selectedTopicSlug={selectedTopicSlug}
          />
        )}
      </section>

      {/* Blog List */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-10"
        dir="rtl"
      >
        <BlogList selectedTopicSlug={selectedTopicSlug} pageSize={9} />
      </section>
    </main>
  );
}
