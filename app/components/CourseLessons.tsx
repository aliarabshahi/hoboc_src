"use client";

import React, { useEffect, useState } from 'react';
import {fetchApiData }from '@/app/services/api/apiClient'; // Adjust the import path as needed
import { useTopicStore } from '@/app/stores/topicStore';

// Types (adjust based on your API)
interface Lesson {
  id: number;
  topic: string;
  title: string;
  description: string;
  video_url: string | null;
  instructor: {
    name: string;
    profile_picture: string;
  };
}

const CourseLessons = () => {
  const activeTopicSlug = useTopicStore((state) => state.activeTopicSlug);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch lessons whenever activeTopicSlug changes
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = activeTopicSlug ? { topic: activeTopicSlug } : undefined;
        const data = await fetchApiData<Lesson>('course-lessons', params);
        setLessons(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [activeTopicSlug]); // Re-run when activeTopicSlug changes

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {activeTopicSlug ? `Lessons for: ${activeTopicSlug}` : 'All Lessons'}
      </h1>

      {/* Loading/Error States */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Lessons List */}
      <ul className="space-y-4">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg">{lesson.title}</h3>
            <p className="text-gray-600">{lesson.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <img
                src={lesson.instructor.profile_picture}
                alt={lesson.instructor.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{lesson.instructor.name}</span>
            </div>
            {lesson.video_url && (
              <a
                href={lesson.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Watch Video
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseLessons;