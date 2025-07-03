import PdfViewer from "@/app/courses/components/lessons/PdfViewer";
import LessonContentMain from "@/app/courses/components/lessons/LessonContentMain";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";
import { notFound } from "next/navigation"; // Next.js 13+ app router

interface Params {
  params: {
    topicSlug: string;
    lessonSlug: string;
  };
}

export default async function LessonPage({ params }: Params) {
  const { lessonSlug } = params;

  const response = await getApiData(`/course-lessons/?slug=${lessonSlug}`);
  let lessonData: CoursesLesson | undefined;

  if (Array.isArray(response.data)) {
    lessonData = response.data.find((l: CoursesLesson) => l.slug === lessonSlug);
  } else if (response.data?.results) {
    lessonData = response.data.results.find((l: CoursesLesson) => l.slug === lessonSlug);
  } else {
    lessonData = response.data;
  }

  // If lessonData does not exist, trigger 404 page
  if (!lessonData) {
    notFound();
  }

  const pdfUrl = lessonData.pdf_file ?? "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      {/* Main Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - PDF Viewer (main content) */}
        <div className="lg:flex-1 order-2 lg:order-1">
          {pdfUrl && (
            <div className="border rounded-lg shadow-lg overflow-hidden h-[80vh]">
              <PdfViewer pdfUrl={pdfUrl} />
            </div>
          )}
        </div>

        {/* Right Column - Sticky Sidebar */}
        <div className="lg:w-80 xl:w-96 order-1 lg:order-2">
          <div className="sticky top-4 space-y-6">
            {/* Lesson Info Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <LessonContentMain lessonData={lessonData} />
            </div>

            {/* Video Section (if exists) */}
            {(lessonData.video_file || lessonData.video_url) && (
              <div className="bg-white p-4 rounded-lg shadow-md border">
                <h3 className="text-lg font-bold mb-3">پخش ویدیو</h3>
                {/* Replace with your video player component */}
                <div className="aspect-video bg-gray-100 rounded flex items-center justify-center">
                  <span>پخش کننده ویدیو</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
