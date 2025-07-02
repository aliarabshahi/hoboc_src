// app/course/[topicSlug]/lesson/[lessonSlug]/page.tsx
"use client";

import { useState } from "react";
import PdfViewer from "@/app/courses/components/lessons/PdfViewer";
import LessonContent from "@/app/courses/components/lessons/LessonContent";
import LessonContentMain from "@/app/courses/components/lessons/LessonContentMain";
interface Params {
  params: {
    topicSlug: string;
    lessonSlug: string;
  };
}

export default function LessonPage({ params }: Params) {
  const { topicSlug, lessonSlug } = params;
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Your lesson content */}
      {/* <LessonContent topicSlug={topicSlug} lessonSlug={lessonSlug} /> */}
      {/* PDF Viewer - embedded by default */}
      <div className="mt-8 border rounded-lg shadow-lg overflow-hidden">
        <PdfViewer
          pdfUrl="http://localhost/hoboc/media/courses/lessons/pdfs/RvuTMEe.pdf"
          isFullscreen={isFullscreen}
          onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
        />
      </div>
      <LessonContentMain topicSlug={topicSlug} lessonSlug={lessonSlug} />

      {/* More lesson content can go here */}
    </div>
  );
}
