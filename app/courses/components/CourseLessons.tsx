// app/courses/components/CourseLessons.tsx
"use client";

interface CourseLessonsProps {
  lessons_api_response: any;
}

export default function CourseLessons({ lessons_api_response }: CourseLessonsProps) {
  return (
    <div className="mt-10 p-4 bg-gray-100 rounded text-sm text-left whitespace-pre-wrap overflow-auto">
      <h2 className="font-semibold text-lg mb-2 text-center">
        درس‌های مربوط به "linux"
      </h2>
      <pre>{JSON.stringify(lessons_api_response, null, 2)}</pre>
    </div>
  );
}
