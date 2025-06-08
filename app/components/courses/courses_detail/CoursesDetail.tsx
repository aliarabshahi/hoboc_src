"use client";

import React, { useEffect, useState } from 'react';
import CoursesDetailHeader from "./CoursesDetailHeader";
import CoursesDetailContent from "./CoursesDetailContent";
import CoursesDetailImage from "./CoursesDetailImage";
import CourseTopicList from "../CourseTopicList";
import { fetchApiData } from '@/app/services/api/apiClient';
import { useTopicStore } from '@/app/stores/topicStore';

const CoursesDetail = () => {
  const activeTopicSlug = useTopicStore((state) => state.activeTopicSlug);
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = activeTopicSlug ? { topic: activeTopicSlug } : undefined;
        const data = await fetchApiData<any>('course-lessons', params);
        setCourseData(data.results[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTopicSlug]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Always show CourseTopicList regardless of loading/error state */}
      <CourseTopicList />

      {/* Loading state - show spinner but keep CourseTopicList visible */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error state - show error but keep CourseTopicList visible */}
      {error && (
        <div className="alert alert-error" dir="rtl">
          {error}
        </div>
      )}

      {/* Main content - only show when we have courseData */}
      {!loading && courseData && (
        <>
          <CoursesDetailHeader course={courseData} />
          <div className="flex flex-col lg:flex-row gap-8" dir="rtl">
            <CoursesDetailContent course={courseData} />
            <div className="lg:w-1/3 flex flex-col gap-6">
              <CoursesDetailImage course={courseData} />
            </div>
          </div>
        </>
      )}

      {/* No data state - show message but keep CourseTopicList visible */}
      {!loading && !courseData && !error && (
        <div className="alert alert-info" dir="rtl">
          دوره مورد نظر یافت نشد
        </div>
      )}
    </div>
  );
};

export default CoursesDetail;