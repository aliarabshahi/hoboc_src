"use client";

import { useEffect, useState } from "react";
import CourseTopics from "@/app/courses/components/CourseTopics";
import CourseLessons from "@/app/courses/components/CourseLessons";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesTopic, CoursesLesson } from "@/app/types/coursesType";

// Skeleton for topics sidebar
function TopicsSkeleton() {
  return (
    <div className="w-full h-[500px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse mt-4" />
  );
}

function LessonsSkeleton() {
  return (
    <div className="w-full max-w-4xl h-[600px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse mx-auto mt-4" />
  );
}


type ApiResult<T> =
  | { data: T[]; message?: string; error?: undefined }
  | { data: null; error: string; message?: undefined }
  | { data: T[]; message: string; error?: undefined };

export default function CoursesPage() {
  const [loading, setLoading] = useState(true);
  const [topicsWithLessons, setTopicsWithLessons] = useState<{
    topic: CoursesTopic;
    lessons: CoursesLesson[];
    error?: string;
  }[]>([]);
  const [topics, setTopics] = useState<CoursesTopic[]>([]);
  const [topicsError, setTopicsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topic_api_response = (await getApiData("/course-topics/")) as ApiResult<CoursesTopic>;

        if (!topic_api_response || topic_api_response.data === null) {
          setTopicsError(topic_api_response?.error || "خطا در دریافت اطلاعات موضوعات دوره");
          setLoading(false);
          return;
        }

        setTopics(topic_api_response.data);

        const topicsWithLessonsData = await Promise.all(
          topic_api_response.data.map(async (topic) => {
            const lessons_api_response = (await getApiData(
              `/course-lessons/?topic-slug=${topic.slug}`
            )) as ApiResult<CoursesLesson>;

            return {
              topic,
              lessons: lessons_api_response.data || [],
              error: lessons_api_response.error,
            };
          })
        );

        setTopicsWithLessons(topicsWithLessonsData);
      } catch (error) {
        setTopicsError("خطا در دریافت اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => fetchData(), 1500); // Simulated loading time
    return () => clearTimeout(timer);
  }, []);

  if (topicsError) {
    return (
      <div className="text-red-600 dark:text-red-400 text-center my-6 font-semibold text-lg">
        {topicsError}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 min-h-screen">
      {/* Sidebar topics - shows skeleton when loading */}
      <aside>
        {loading ? <TopicsSkeleton /> : <CourseTopics topics={topics} />}
      </aside>

      {/* Main lessons content - shows skeleton when loading */}
      <main>
        {loading ? (
          <LessonsSkeleton />
        ) : (
          <div className="space-y-16">
            {topicsWithLessons.map(({ topic, lessons, error }, index) => (
              <section 
                key={topic.id} 
                id={`topic-${topic.id}`} 
                tabIndex={-1} 
                className="scroll-mt-24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hoboc focus-visible:ring-offset-4 focus-visible:rounded-md"
              >
                {error ? (
                  <div className="text-red-600 dark:text-red-400 text-center my-6 font-semibold text-lg">
                    {error || `خطا در دریافت اطلاعات درس‌های ${topic.title}`}
                  </div>
                ) : (
                  <CourseLessons
                    lessons_api_response={{ data: lessons }}
                    topic={topic}
                    noTopMargin={index === 0}
                  />
                )}
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}