// app/courses/[topicSlug]/page.tsx

import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesTopic } from "@/app/types/coursesType";
import { notFound } from "next/navigation";
import CourseNavigationBar from "./components/CourseNavigationBar";


interface PageProps {
  params: {
    topicSlug: string;
  };
}

export default async function TopicPage({ params }: PageProps) {
  // Fetch the specific topic data using the slug from params
  const topicResponse = await getApiData(`/course-topics/?topic-slug=${params.topicSlug}`);

  if (!topicResponse || !topicResponse.data || topicResponse.data.length === 0) {
    return notFound(); // This will show the 404 page
  }

  const topic: CoursesTopic = topicResponse.data[0];

  return (
    <div dir="rtl" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation Bar */}
      <CourseNavigationBar topic={topic} />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* You can add your main topic content here */}
        <div className="flex-1 min-w-0 order-2 lg:order-1">
          <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
          <p className="text-gray-700 leading-relaxed">{topic.description}</p>
          {/* Add more topic-specific content as needed */}
        </div>

        {/* Sidebar or any other content */}
        <div className="lg:w-80 xl:w-96 order-1 lg:order-2 flex-shrink-0">
          {/* Optional: You can add a sidebar here if needed */}
        </div>
      </div>
    </div>
  );
}
