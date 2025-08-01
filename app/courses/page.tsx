// app/courses/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";
import CourseCard from "./components/CourseCard";
import CourseTopicsFilter from "./components/CourseTopicsFilter";
export default function CoursesPage() {
  const [topics, setTopics] = useState<CoursesTopic[]>([]);
  const [lessons, setLessons] = useState<CoursesLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const selectedTopicSlug = searchParams.get("topic");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const topicsRes = await getApiData("/course-topics/");
        const topicsData: CoursesTopic[] =
          Array.isArray(topicsRes.data) ? topicsRes.data : topicsRes.data?.results || [];
        setTopics(topicsData);

        let lessonsRes;
        if (selectedTopicSlug) {
          lessonsRes = await getApiData(`/course-lessons/?topic-slug=${selectedTopicSlug}`);
        } else {
          // Optional: نمایش همه‌ی درس‌ها وقتی موضوع انتخاب نشده
          const allLessons: CoursesLesson[] = [];
          for (const topic of topicsData) {
            const res = await getApiData(`/course-lessons/?topic-slug=${topic.slug}`);
            allLessons.push(...(res.data || []));
          }
          lessonsRes = { data: allLessons };
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

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      <section className="bg-white pt-16 pb-10 shadow rounded-b-xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800" dir="rtl">
            دوره‌های آموزشی
          </h1>
          <p className="text-gray-600 md:text-lg" dir="rtl">
            یادگیری حرفه‌ای با دوره‌های کاربردی و تخصصی
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-10">
        {loading ? (
          <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mx-auto" />
        ) : (
          <CourseTopicsFilter topics={topics} selectedTopicSlug={selectedTopicSlug || ""} />
        )}
      </section>

      <section className="container mx-auto px-4 mt-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[320px] bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : lessons.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">درسی یافت نشد.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <CourseCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
