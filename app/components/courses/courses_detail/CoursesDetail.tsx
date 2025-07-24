"use client";

import React, { useEffect, useState } from "react";
import CoursesDetailHeader from "./CoursesDetailHeader";
import CoursesDetailContent from "./CoursesDetailContent";
import CoursesDetailImage from "./CoursesDetailImage";
import CourseTopicList from "../courses_topic/CourseTopicList";
import { fetchApiData } from "@/app/services/api/apiClientAxios";
import { useTopicStore } from "@/app/stores/topicStore";
import { CoursesTopic } from "@/app/types/coursesType";

interface CoursesDetailProps {
  initialTopic: CoursesTopic | null;
  topics: CoursesTopic[];
}

const SkeletonLoader = () => (
  <div className="flex flex-col gap-6" dir="rtl">
    {/* Fake Header */}
    <div className="h-14 w-1/5 bg-gray-100 rounded-lg animate-pulse" />

    {/* Main Flex Container */}
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Content block */}
      <div className="lg:w-2/3 h-[200px] bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />

      {/* Image block */}
      <div className="lg:w-1/3 h-[200px] aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
    </div>

  </div>
);

const NoTopicSelected = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-32 h-32 bg-gray-100 rounded-full mb-4"></div>
    <p className="text-lg text-gray-500">لطفاً یک موضوع را انتخاب کنید</p>
  </div>
);

const CourseNotFound = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-32 h-32 bg-gray-100 rounded-full mb-4"></div>
    <p className="text-lg text-gray-500">دوره مورد نظر یافت نشد</p>
  </div>
);

const CoursesDetail = ({ initialTopic, topics }: CoursesDetailProps) => {
  const { activeTopic, setActiveTopic } = useTopicStore();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialTopic && !activeTopic) {
      setActiveTopic(initialTopic);
    }
  }, [initialTopic, activeTopic, setActiveTopic]);

  useEffect(() => {
    const fetchData = async () => {
      if (!activeTopic) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);

      try {
        const data = await fetchApiData<any>("course-lessons", { 
          'topic-slug': activeTopic.slug 
        });
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
      <CourseTopicList initialTopics={topics} />

      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <div className="alert alert-error" dir="rtl">
          {error}
        </div>
      ) : !activeTopic ? (
        <NoTopicSelected />
      ) : (
        <>
          <CoursesDetailHeader topic={activeTopic} />
          {courseData ? (
            <div className="flex flex-col lg:flex-row gap-8" dir="rtl">
              <CoursesDetailContent course={courseData} />
              <div className="lg:w-1/3 flex flex-col gap-6">
                <CoursesDetailImage topic={activeTopic} />
              </div>
            </div>
          ) : (
            <CourseNotFound />
          )}
        </>
      )}
    </div>
  );
};

export default CoursesDetail;