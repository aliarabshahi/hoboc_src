import CourseTopics from "@/app/courses/components/CourseTopics";
import CourseLessons from "@/app/courses/components/CourseLessons";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesTopic, CoursesLesson } from "@/app/types/coursesType";

type ApiResult<T> =
  | { data: T[]; message?: string; error?: undefined }
  | { data: null; error: string; message?: undefined }
  | { data: T[]; message: string; error?: undefined };

export default async function CoursesPage() {
  const topic_api_response = (await getApiData("/course-topics/")) as ApiResult<CoursesTopic>;

  if (!topic_api_response || topic_api_response.data === null) {
    return (
      <div className="text-red-500 text-center my-6">
        {topic_api_response?.error || "خطا در دریافت اطلاعات موضوعات دوره"}
      </div>
    );
  }

  const topicsWithLessons = await Promise.all(
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

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
      <CourseTopics topics={topic_api_response.data} />

      <main>
        {topicsWithLessons.map(({ topic, lessons, error }, index) => (
          <div key={topic.id}>
            {error ? (
              <div className="text-red-500 text-center my-6">
                {error || `خطا در دریافت اطلاعات درس‌های ${topic.title}`}
              </div>
            ) : (
              <CourseLessons
                lessons_api_response={{ data: lessons }}
                topic={topic}
                noTopMargin={index === 0}
              />
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
