// app/lessons/page.tsx
import React from 'react';

const getLessons = async () => {
  const res = await fetch('http://localhost/hoboc/api/course-lessons/', {
    headers: {
      Authorization: 'Token c0881af7b46e2dc06f1ff49c2ff8472b9084e13e',
    },
    cache: 'no-store', // برای اینکه هر بار رفرش بشه
  });

  const data = await res.json();
  return Array.isArray(data.results) ? data.results : data;
};

export default async function LessonsPage() {
  const lessons = await getLessons();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Server-Side Rendered Lessons</h1>
      <pre>{JSON.stringify(lessons, null, 2)}</pre>
    </div>
  );
}
