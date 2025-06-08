// app/components/courses/CoursesDetailWrapper.tsx
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesTopic } from "@/app/types/coursesType";
import CoursesDetail from "./CoursesDetail";

export default async function CoursesDetailWrapper() {
  const { data: topics } = await getApiData("/course-topics/");
  const initialTopic = topics?.length > 0 ? topics[0] : null;

  return <CoursesDetail initialTopic={initialTopic} topics={topics} />;
}