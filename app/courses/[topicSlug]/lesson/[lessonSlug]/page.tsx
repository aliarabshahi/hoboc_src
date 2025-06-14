// app/course/[topicSlug]/lesson/[lessonSlug]/page.tsx
import { getApiData } from "@/app/services/api/apiServerFetch";
import LessonContent from "@/app/courses/components/lessons/LessonContent";
import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";

interface Params {
  params: {
    topicSlug: string;
    lessonSlug: string;
  };
}

export default async function LessonPage({ params }: Params) {
  const { topicSlug, lessonSlug } = params;
  
  console.log("Received slugs - Topic:", topicSlug, "Lesson:", lessonSlug);

  // Minimal version - just pass the slugs to the component
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <LessonContent topicSlug={topicSlug} lessonSlug={lessonSlug} />
    </div>
  );
}