// components/CourseLessonDetails.tsx

import { getApiData } from "@/app/services/api/apiServerFetch";
import { notFound } from "next/navigation";

interface CourseLessonDetailsProps {
  topicSlug: string;
}

export default async function CourseLessonDetails({ topicSlug }: CourseLessonDetailsProps) {
  // Fetch lessons data by topicSlug
  const response = await getApiData(`/course-lessons/?slug=${topicSlug}`);

  let lessonsData = undefined;

  if (Array.isArray(response.data)) {
    lessonsData = response.data.find((l: any) => l.slug === topicSlug);
  } else if (response.data?.results) {
    lessonsData = response.data.results.find((l: any) => l.slug === topicSlug);
  } else {
    lessonsData = response.data;
  }

  if (!lessonsData) {
    notFound();
  }

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50 text-sm font-mono whitespace-pre-wrap overflow-auto max-h-96">
      <h2 className="text-xl font-semibold mb-4">درس‌ها برای موضوع: {topicSlug}</h2>
      <pre>{JSON.stringify(lessonsData, null, 2)}</pre>
    </div>
  );
}
