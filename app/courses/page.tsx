"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesTopic } from "@/app/types/coursesType";

import CourseHeader from "./components/CourseHeader";
import CourseTopicsFilter from "./components/CourseTopicsFilter";
import CourseList from "./components/main-page/CourseList";

/** Courses main page - shows topics filter + paginated courses list */
export default function CoursesPage() {
  const [topics, setTopics] = useState<CoursesTopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const searchParams = useSearchParams();
  const selectedTopicSlug = searchParams.get("topic") || undefined;

  // Find the topic selected via query param
  const selectedTopic = topics.find((t) => t.slug === selectedTopicSlug);
  const title = selectedTopic
    ? `دوره آموزشی ${selectedTopic.title || selectedTopic.title || ""}`
    : "دوره‌های آموزشی";
  const description =
    "یادگیری حرفه‌ای با دوره‌های کاربردی علم داده و مهندسی داده برای ورود به بازار کار";

  // Fetch course topics on mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await getApiData("/course-topics/");
        const data: CoursesTopic[] = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];
        setTopics(data);
      } finally {
        setLoadingTopics(false);
      }
    };
    fetchTopics();
  }, []);

  return (
    <main className="min-h-screen pb-16">
      {/* Page header */}
      <CourseHeader title={title} description={description} />

      {/* Topics filter section */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-10"
        dir="rtl"
      >
        {loadingTopics ? (
          // Skeleton loader while topics load
          <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mx-auto" />
        ) : (
          <CourseTopicsFilter
            topics={topics}
            selectedTopicSlug={selectedTopicSlug}
          />
        )}
      </section>

      {/* Courses list and pagination */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-8"
        dir="rtl"
      >
        <CourseList selectedTopicSlug={selectedTopicSlug} pageSize={9} />
      </section>
    </main>
  );
}
