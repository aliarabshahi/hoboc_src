import PdfViewer from "@/app/courses/components/lessons/PdfViewer";
import LessonContentMain from "@/app/courses/components/lessons/LessonContentMain";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";

interface Params {
  params: {
    topicSlug: string;
    lessonSlug: string;
  };
}

export default async function LessonPage({ params }: Params) {
  const { topicSlug, lessonSlug } = params;

  const response = await getApiData(`/course-lessons/?slug=${lessonSlug}`);
  let lessonData: CoursesLesson | undefined;

  if (Array.isArray(response.data)) {
    lessonData = response.data.find((l: CoursesLesson) => l.slug === lessonSlug);
  } else if (response.data?.results) {
    lessonData = response.data.results.find((l: CoursesLesson) => l.slug === lessonSlug);
  } else {
    lessonData = response.data;
  }

  const pdfUrl = lessonData?.pdf_file;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Client component for PDF viewer */}
      {pdfUrl ? (
        <div className="mt-8 border rounded-lg shadow-lg overflow-hidden">
          <PdfViewer pdfUrl={pdfUrl} />
        </div>
      ) : (
        <p className="text-red-600">فایل PDF برای این درس وجود ندارد.</p>
      )}

      {/* Pass lessonData directly to LessonContentMain */}
      {lessonData ? (
        <LessonContentMain lessonData={lessonData} />
      ) : (
        <p>درس مورد نظر یافت نشد</p>
      )}
    </div>
  );
}
