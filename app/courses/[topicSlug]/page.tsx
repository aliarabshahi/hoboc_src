import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesTopic, CoursesLesson } from "@/app/types/coursesType";
import { notFound } from "next/navigation";
import CourseNavigationBar from "./components/CourseNavigationBar";

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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Section */}
        <div className="flex-1 min-w-0 order-2 lg:order-1">

          {/* Raw JSON Debug Data */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Raw JSON Data</h2>
            <div className="bg-gray-100 p-4 rounded-lg text-xs whitespace-pre-wrap break-words">
              <strong>Topic:</strong>
              <pre className="mb-4">{JSON.stringify(topic, null, 2)}</pre>
              <strong>Lessons:</strong>
              <pre>{JSON.stringify(lessons, null, 2)}</pre>
            </div>
          </div>
        </div>

        {/* Sidebar (optional) */}
        <div className="lg:w-80 xl:w-96 order-1 lg:order-2 flex-shrink-0">
          {/* Add sidebar content if needed */}
        </div>
      </div>
    </div>
  );
}
