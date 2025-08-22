// app/components/courses/courses_detail/CoursesDetailWrapper.tsx

import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesTopic } from "@/app/types/coursesType";
import CoursesDetail from "./CoursesDetail";

export default async function CoursesDetailWrapper() {
  const { data: topics } = await getApiData("/course-topics/");
  const initialTopic = topics?.length > 0 ? topics[0] : null;

  return (
    // z-40 = below navbar (z-50) but above most background content
    <div className="relative z-40 bg-transparent">
      <CoursesDetail initialTopic={initialTopic} topics={topics} />
    </div>
  );
}
