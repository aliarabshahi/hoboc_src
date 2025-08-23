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
      {/* Ultra faint near-white background */}
      <div className="absolute inset-0 -z-10">
        {/* Whisper-pink gradient, almost white */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffafd] via-[#fdf6fa] to-white" />
        {/* Faint pink overlay (opacity 5%) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f477b80a] via-transparent to-transparent opacity-5" />

        {/* Nearly invisible, very small, very soft pink blobs */}
        <div className="absolute top-[10%] left-[12%] w-32 h-32 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02]" />
        <div className="absolute top-[19%] right-[15%] w-20 h-20 bg-[#fbb5d4] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.015]" />
        <div className="absolute bottom-[17%] left-1/3 w-20 h-20 bg-[#fbd3e7] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.018]" />
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
