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

  // Fetch lessons for each topic
  const topicsWithLessons = await Promise.all(
    topic_api_response.data.map(async (topic) => {
      const lessons_api_response = (await getApiData(
        `/course-lessons/?topic-slug=${topic.slug}`
      )) as ApiResult<CoursesLesson>;

      return {
        topic,
        lessons: lessons_api_response.data || [],
        error: lessons_api_response.error
      };
    })
  );

  return (
    <div>
      <h1 className="text-2xl font-bold my-6 text-center">موضوعات دوره‌ها</h1>
      <CourseTopics topics={topic_api_response.data} />
      
      {/* Render lessons for each topic */}
      {topicsWithLessons.map(({ topic, lessons, error }) => (
        <div key={topic.id}>
          <h2 className="text-xl font-semibold mt-8 mb-4">{topic.title}</h2>
          {error ? (
            <div className="text-red-500 text-center my-6">
              {error || `خطا در دریافت اطلاعات درس‌های ${topic.title}`}
            </div>
          ) : (
            <CourseLessons lessons_api_response={{ data: lessons }} />
          )}
        </div>
      ))}
    </div>
  );
}