import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";
import { notFound } from "next/navigation";
import PdfViewer from "@/app/courses/[topicSlug]/lesson/[lessonSlug]/components/lessons/PdfViewer";
import Sidebar from "@/app/courses/[topicSlug]/lesson/[lessonSlug]/components/lessons/sidebar/Sidebar";

interface Params {
  params: {
    topicSlug: string;
    lessonSlug: string;
  };
}

export default async function LessonPage({ params }: Params) {
  const response = await getApiData(
    `/course-lessons/?slug=${params.lessonSlug}`
  );
  let lessonData: CoursesLesson | undefined;

  if (Array.isArray(response.data)) {
    lessonData = response.data.find(
      (l: CoursesLesson) => l.slug === params.lessonSlug
    );
  } else if (response.data?.results) {
    lessonData = response.data.results.find(
      (l: CoursesLesson) => l.slug === params.lessonSlug
    );
  } else {
    lessonData = response.data;
  }

  if (!lessonData) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main PDF Content - takes remaining space */}
        <div className="flex-1 min-w-0 order-2 lg:order-1">
          {" "}
          {/* min-w-0 prevents flex item from overflowing */}
          {lessonData.pdf_file && (
            <div className="border rounded-lg shadow-lg overflow-hidden h-[80vh] w-full">
              <PdfViewer pdfUrl={lessonData.pdf_file} />
            </div>
          )}
        </div>

        {/* Sidebar - fixed width */}
        <div className="lg:w-80 xl:w-96 order-1 lg:order-2 flex-shrink-0">
          {" "}
          {/* flex-shrink-0 prevents sidebar from shrinking */}
          <div className="sticky top-16 space-y-6">
            <Sidebar lessonData={lessonData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Arrangement:

// ┌───────────────┬──────────────────┐
// │  ▲ Sticky     │                  │
// │  Course Info  │   PDF Viewer     │
// │  ▼            │   (scrolls)      │
// ├───────────────┤                  │
// │  Video        │                  │
// └───────────────┴──────────────────┘
