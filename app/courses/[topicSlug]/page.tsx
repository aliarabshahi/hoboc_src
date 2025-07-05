// app/[topicSlug]/page.tsx
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesTopic, CoursesLesson } from "@/app/types/coursesType";
import { notFound } from "next/navigation";
import CourseNavigationBar from "./components/CourseNavigationBar";
import CourseSideBar from "./components/CourseSideBar";
import CourseLessonDetails from "./components/CourseLessonDetails";

interface PageProps {
  params: {
    topicSlug: string;
  };
}

export default async function TopicPage({ params }: PageProps) {
  // Fetch topic
  const topicResponse = await getApiData(`/course-topics/?topic-slug=${params.topicSlug}`);
  if (!topicResponse || !topicResponse.data || topicResponse.data.length === 0) {
    return notFound();
  }
  const topic: CoursesTopic = topicResponse.data[0];

  // Fetch lessons
  const lessonResponse = await getApiData(`/course-lessons/?topic-slug=${params.topicSlug}`);
  const lessons: CoursesLesson[] = lessonResponse?.data || [];

  return (
    <div dir="rtl" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation Bar */}
      <CourseNavigationBar topic={topic} />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6 ">
        {/* Sidebar */}
        <CourseSideBar topic={topic} lessons={lessons} />

        {/* Lesson List */}
        <CourseLessonDetails topic={topic} lessons={lessons} />
      </div>
    </div>
  );
}