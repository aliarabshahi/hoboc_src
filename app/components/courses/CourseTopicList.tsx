"use client";

import { useTopicStore } from "@/app/stores/topicStore";
import { getApiData } from "@/app/services/api/getData";
import { Topic } from "@/app/types/course";
import CourseTopic from "./CourseTopic";
import { useEffect, useState } from "react";

const CourseTopicList = () => {
  const { activeTopicSlug, setActiveTopicSlug } = useTopicStore();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleTopicClick = (topicSlug: string) => {
    setActiveTopicSlug(activeTopicSlug === topicSlug ? null : topicSlug);
  };

  if (isLoading) {
    return <div className="flex justify-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-4">{error}</div>;
  }

  if (!topics.length) {
    return <div className="py-4">No topics available</div>;
  }

  return (
    <div className="pt-3 pb-5 flex justify-center items-center gap-8 overflow-x-auto px-4" dir="rtl">
      {topics.map((topic) => (
        <CourseTopic
          key={topic.id}
          topic={topic}
          isActive={activeTopicSlug === topic.slug}
          onClick={() => handleTopicClick(topic.slug)}
        />
      ))}
    </div>
  );
};

export default CourseTopicList;