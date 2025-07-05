import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";
import { notFound } from "next/navigation";
import PdfViewer from "@/app/courses/[topicSlug]/lesson/[lessonSlug]/components/lessons/PdfViewer";
import Sidebar from "@/app/courses/[topicSlug]/lesson/[lessonSlug]/components/lessons/sidebar/Sidebar";
import LessonNavigationBar from "@/app/courses/[topicSlug]/lesson/[lessonSlug]/components/lessons/LessonNavigationBar";

interface Params {
  params: {
    topicSlug: string;
    lessonSlug: string;
  };
}

export default async function LessonPage({ params }: Params) {
  // Fetch lesson data
  const response = await getApiData(`/course-lessons/?lesson-slug=${params.lessonSlug}`);
  let lessonData: CoursesLesson | undefined;

  if (Array.isArray(response.data)) {
    lessonData = response.data.find((l: CoursesLesson) => l.slug === params.lessonSlug);
  } else if (response.data?.results) {
    lessonData = response.data.results.find((l: CoursesLesson) => l.slug === params.lessonSlug);
  } else {
    lessonData = response.data;
  }

  if (!lessonData) notFound();

  // Fetch topic data
  const topicResponse = await getApiData(`/course-topics/?slug=${params.topicSlug}`);
  let topicData: CoursesTopic | undefined;

  if (Array.isArray(topicResponse.data)) {
    topicData = topicResponse.data.find((t: CoursesTopic) => t.slug === params.topicSlug);
  } else if (topicResponse.data?.results) {
    topicData = topicResponse.data.results.find((t: CoursesTopic) => t.slug === params.topicSlug);
  } else {
    topicData = topicResponse.data;
  }

  if (!topicData) notFound();

  return (
    <div dir="rtl" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation Bar */}
      <LessonNavigationBar topic={topicData} lessonTitle={lessonData.title} />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0 order-2 lg:order-1">
          {lessonData.pdf_file && (
            <div className="border rounded-lg shadow-lg overflow-hidden h-[80vh] w-full">
              <PdfViewer pdfUrl={lessonData.pdf_file} />
            </div>
          )}
        </div>

        <div className="lg:w-80 xl:w-96 order-1 lg:order-2 flex-shrink-0">
          <div className="sticky top-16 space-y-6">
            <Sidebar
              lessonData={lessonData}
              topicSlug={params.topicSlug}
              currentLessonSlug={params.lessonSlug}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
