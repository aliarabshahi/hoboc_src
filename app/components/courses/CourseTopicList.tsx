"use client";

import React, { useState, useEffect } from "react";
import { getApiData } from "@/app/services/api/getData";
import { Topic } from "@/app/types/course";
import CourseTopic from "./CourseTopic";

const CourseTopicList = () => {
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await getApiData("/course-topics/");
        
        if (error) {
          setError(error);
        } else {
          setTopics(data as Topic[]);
        }
      } catch (err) {
        setError("Failed to fetch topics");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleTopicClick = (topicId: string) => {
    setActiveTopicId(activeTopicId === topicId ? null : topicId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-3 pb-5" dir="rtl">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error" dir="rtl">
        {error}
      </div>
    );
  }

  if (!topics || topics.length === 0) {
    return (
      <div className="alert alert-info" dir="rtl">
        دسته‌بندی‌ای برای نمایش وجود ندارد
      </div>
    );
  }

  return (
    <div
      className="pt-3 pb-5 cursor-pointer flex justify-center items-center gap-8 overflow-x-auto px-4"
      dir="rtl"
    >
      {topics.map((topic) => (
        <CourseTopic
          key={topic.id}
          topic={topic}
          isActive={activeTopicId === String(topic.id)}
          onClick={() => handleTopicClick(String(topic.id))}
        />
      ))}
    </div>
  );
};

export default CourseTopicList;