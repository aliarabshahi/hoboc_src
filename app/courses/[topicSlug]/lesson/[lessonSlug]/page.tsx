// app/course/[topicSlug]/lesson/[lessonSlug]/page.tsx
import PdfViewer from "@/app/courses/components/lessons/PdfViewer";
import LessonContentMain from "@/app/courses/components/lessons/LessonContentMain";

interface Params {
  params: {
    topicSlug: string;
    lessonSlug: string;
  };
}

export default async function LessonPage({ params }: Params) {
  const { topicSlug, lessonSlug } = params;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Server component that fetches data */}

      {/* Client component for PDF viewer */}
      <div className="mt-8 border rounded-lg shadow-lg overflow-hidden">
        <PdfViewer pdfUrl="http://localhost/hoboc/media/courses/lessons/pdfs/RvuTMEe.pdf" />
      </div>
      <LessonContentMain topicSlug={topicSlug} lessonSlug={lessonSlug} />
    </div>
  );
}
