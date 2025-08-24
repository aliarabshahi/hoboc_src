import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";
import { notFound } from "next/navigation";
import LessonPdfViewer from "@/app/courses/[topicSlug]/lesson/[lessonSlug]/components/lessons/LessonPdfViewer";
import Sidebar from "@/app/courses/[topicSlug]/lesson/[lessonSlug]/components/lessons/sidebar/Sidebar";
import LessonNavigationBar from "@/app/courses/[topicSlug]/lesson/[lessonSlug]/components/lessons/LessonNavigationBar";

interface Params {
  params: {
    topicSlug: string;
    lessonSlug: string;
  };
}

/** Course lesson page showing PDF content and related lesson navigation */
export default async function LessonPage({ params }: Params) {
  // --- Fetch lesson data by slug ---
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

  // --- Fetch related topic data by slug ---
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
      {/* Ultra pale background with soft pink shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffafd] via-[#fdf6fa] to-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f477b80a] via-transparent to-transparent opacity-5" />
        <div className="absolute top-[10%] left-[12%] w-32 h-32 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02]" />
        <div className="absolute top-[19%] right-[15%] w-20 h-20 bg-[#fbb5d4] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.015]" />
        <div className="absolute bottom-[17%] left-1/3 w-20 h-20 bg-[#fbd3e7] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.018]" />
      </div>

      {/* Page container */}
      <section className="container mx-auto px-4 md:px-8 lg:px-20 py-8">
        {/* Lesson breadcrumb/navigation bar */}
        <LessonNavigationBar topic={topicData} lessonTitle={lessonData.title} />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* PDF Viewer */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            {lessonData.pdf_file && (
              <div className="border rounded-lg shadow-lg overflow-hidden h-[80vh] w-full">
                <LessonPdfViewer pdfUrl={lessonData.pdf_file} />
              </div>
            )}
          </div>

          {/* Sidebar with lessons list and navigation */}
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
      </section>
    </div>
  );
}
