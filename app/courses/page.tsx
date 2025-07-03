// app/courses/page.tsx
import CourseTopics from "@/app/courses/components/CourseTopics";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesTopic } from "@/app/types/coursesType";
import CourseLessons from "./components/CourseLessons";
export default async function CoursesPage() {
  const response = await getApiData("/course-topics/");

  if (!response || !response.data) {
    return (
      <div className="text-red-500 text-center my-6">
        {response?.error || "خطا در دریافت اطلاعات موضوعات دوره"}
      </div>
    );
  }

  const topics: CoursesTopic[] = response.data;

  return (
    <div>
      <h1 className="text-2xl font-bold my-6 text-center">موضوعات دوره‌ها</h1>
      <CourseTopics topics={topics} />
    </div>
  );
}