"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";
import CourseCard from "./components/CourseCard";
import CourseTopicsFilter from "./components/CourseTopicsFilter";
import CourseHeader from "./components/CourseHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- تابع اسکلتون کارت ---
function SkeletonCard() {
  return (
    <div className="h-[420px] bg-gray-200 rounded-xl animate-pulse" />
  );
}

export default function CoursesPage() {
  const [topics, setTopics] = useState<CoursesTopic[]>([]);
  const [lessons, setLessons] = useState<CoursesLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 9;

  const searchParams = useSearchParams();
  const selectedTopicSlug = searchParams.get("topic");

  const selectedTopic = topics.find((t) => t.slug === selectedTopicSlug);
  const title = selectedTopic
    ? `دوره آموزشی ${selectedTopic.title || selectedTopic.catchy_title || ""}`
    : "دوره‌های آموزشی";

  const description =
    "یادگیری حرفه‌ای با دوره‌های کاربردی علم داده و مهندسی داده برای ورود به بازار کار";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const topicsRes = await getApiData("/course-topics/");
        const topicsData: CoursesTopic[] =
          Array.isArray(topicsRes.data)
            ? topicsRes.data
            : topicsRes.data?.results || [];
        setTopics(topicsData);

        let lessonsRes;
        if (selectedTopicSlug) {
          lessonsRes = await getApiData(
            `/course-lessons/?topic-slug=${selectedTopicSlug}&ordering=created_at`
          );
        } else {
          lessonsRes = await getApiData("/course-lessons/");
        }

        setLessons(lessonsRes.data || []);
        setError(null);
      } catch (err) {
        setError("خطا در دریافت اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTopicSlug]);

  // وقتی موضوع عوض شد صفحه به اول برگرده
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTopicSlug]);

  const totalPages = Math.ceil(lessons.length / pageSize);
  const currentLessons = lessons.slice(
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

  return (
    <main className="min-h-screen pb-16">
      {/* Header Section */}
      <CourseHeader title={title} description={description} />

      {/* Topic Filter */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-10"
        dir="rtl"
      >
        {loading ? (
          <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mx-auto" />
        ) : (
          <CourseTopicsFilter
            topics={topics}
            selectedTopicSlug={selectedTopicSlug || ""}
          />
        )}
      </section>

      {/* Course Grid */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-8"
        dir="rtl"
      >
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(pageSize)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : lessons.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            درسی یافت نشد.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentLessons.map((lesson, index) => (
                <CourseCard
                  key={lesson.id}
                  lesson={lesson}
                  lessonNumber={currentPage * pageSize + index + 1}
                  showLessonNumber={!!selectedTopicSlug}
                />
              ))}
            </div>

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
