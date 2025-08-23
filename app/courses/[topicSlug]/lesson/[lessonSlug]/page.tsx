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
  const topicResponse = await getApiData(`/course-topics/?topic-slug=${params.topicSlug}`);
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
    <div dir="rtl" className="relative isolate overflow-hidden min-h-screen">
      {/* Full-page background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fef6fb] to-white" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f9ece10] to-[#f477b815]" />

        {/* Large blurred blobs for dept and balance */}
        <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-[#1F9ECE] rounded-full mix-blend-multiply filter blur-2xl opacity-10" />
        <div className="absolute top-0 right-[-5%] w-64 h-64 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-2xl opacity-10" />
        <div className="absolute bottom-[-10%] left-1/4 w-64 h-64 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-2xl opacity-10" />
        <div className="absolute bottom-[-15%] right-1/3 w-72 h-72 bg-[#1F9ECE] rounded-full mix-blend-multiply filter blur-2xl opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Bar */}
        <LessonNavigationBar topic={topicData} lessonTitle={lessonData.title} />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* PDF Viewer */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            {lessonData.pdf_file && (
              <div className="border rounded-lg shadow-lg overflow-hidden h-[80vh] w-full">
                <PdfViewer pdfUrl={lessonData.pdf_file} />
              </div>
            )}
          </div>

          {/* Sidebar */}
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
    </div>
  );
}
