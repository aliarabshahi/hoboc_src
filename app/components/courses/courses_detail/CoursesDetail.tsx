"use client";

import React, { useEffect, useState } from "react";
import CoursesDetailHeader from "./CoursesDetailHeader";
import CoursesDetailContent from "./CoursesDetailContent";
import CoursesDetailImage from "./CoursesDetailImage";
import CourseTopicList from "../courses_topic/CourseTopicList";
import { fetchApiData } from "@/app/services/api/apiClientAxios";
import { useTopicStore } from "@/app/stores/topicStore";

const CoursesDetail = () => {
  const activeTopic = useTopicStore((state) => state.activeTopic);
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = activeTopic ? { topic: activeTopic.slug } : undefined;
        const data = await fetchApiData<any>("course-lessons", params);
        setCourseData(data.results[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTopic?.slug]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <CourseTopicList />

      {loading && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error" dir="rtl">
          {error}
        </div>
      )}

      {!loading && (
        <>
          <CoursesDetailHeader topic={activeTopic} />
          {courseData && (
            <div className="flex flex-col lg:flex-row gap-8" dir="rtl">
              <CoursesDetailContent course={courseData} />
              <div className="lg:w-1/3 flex flex-col gap-6">
                <CoursesDetailImage topic={activeTopic} />
              </div>
            </div>
          )}
        </>
      )}

      {!loading && !courseData && !error && (
        <div className="alert alert-info" dir="rtl">
          دوره مورد نظر یافت نشد
        </div>
      )}
    </div>
  );
};

export default CoursesDetail;
