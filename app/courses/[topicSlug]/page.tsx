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
    <div dir="rtl" className="relative isolate overflow-hidden min-h-screen">
      {/* Full-page background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fef6fb] to-white" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f9ece10] to-[#f477b815]" />

        {/* Large blurred blobs for depth */}
        <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-[#1F9ECE] rounded-full mix-blend-multiply filter blur-2xl opacity-10" />
        <div className="absolute top-0 right-[-5%] w-64 h-64 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-2xl opacity-10" />
        <div className="absolute bottom-[-10%] left-1/4 w-64 h-64 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-2xl opacity-10" />
        <div className="absolute bottom-[-15%] right-1/3 w-72 h-72 bg-[#1F9ECE] rounded-full mix-blend-multiply filter blur-2xl opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Bar */}
        <CourseNavigationBar topic={topic} />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Sidebar */}
          <CourseSideBar topic={topic} lessons={lessons} />

          {/* Lesson List */}
          <CourseLessonDetails topic={topic} lessons={lessons} />
        </div>
      </div>
    </div>
  );
}
