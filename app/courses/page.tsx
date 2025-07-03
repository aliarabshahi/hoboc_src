import CourseTopics from "@/app/courses/components/CourseTopics";
import CourseLessons from "@/app/courses/components/CourseLessons";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesTopic } from "@/app/types/coursesType";

export default async function CoursesPage() {
  const topic_api_response = await getApiData("/course-topics/");
  const topic_name = "linux";
  const lessons_api_response = await getApiData(`/course-lessons/?topic-slug=${topic_name}`);

  if (!topic_api_response || !topic_api_response.data) {
    return (
      <div className="text-red-500 text-center my-6">
        {topic_api_response?.error || "خطا در دریافت اطلاعات موضوعات دوره"}
      </div>
    );
  }

  const topics: CoursesTopic[] = topic_api_response.data;

  return (
    <div>
      <h1 className="text-2xl font-bold my-6 text-center">موضوعات دوره‌ها</h1>
      <CourseTopics topics={topics} />
      <CourseLessons lessons_api_response={lessons_api_response} />
    </div>
  );
}
