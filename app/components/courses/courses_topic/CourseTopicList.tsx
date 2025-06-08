"use client";

import { useTopicStore } from "@/app/stores/topicStore";
import { CoursesTopic } from "@/app/types/coursesType";
import CourseTopic from "./CourseTopic";
import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/api/apiServerFetch";

interface CourseTopicListProps {
  initialTopics: CoursesTopic[];
}

const CourseTopicList = ({ initialTopics }: CourseTopicListProps) => {
  const { activeTopic, setActiveTopic } = useTopicStore();
  const [topics, setTopics] = useState<CoursesTopic[]>(initialTopics || []);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialTopics?.length);

  useEffect(() => {
    // Only fetch if we didn't get initial data from server
    if (initialTopics?.length > 0) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await getApiData("/course-topics/");

        if (error) {
          setError(error);
        } else {
          const topicsData = data as CoursesTopic[];
          setTopics(topicsData);

          if (topicsData.length > 0 && !activeTopic) {
            setActiveTopic(topicsData[0]);
          }
        }
      } catch (err) {
        setError("Failed to fetch topics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setActiveTopic, activeTopic, initialTopics]);

  const handleTopicClick = (topic: CoursesTopic) => {
    if (activeTopic?.slug !== topic.slug) {
      setActiveTopic(topic);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-4">Loading topics...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-4">{error}</div>;
  }

  if (!topics.length) {
    return <div className="py-4">No topics available</div>;
  }

  return (
    <div
      className="pt-3 pb-5 flex justify-center items-center gap-8 overflow-x-auto px-4"
      dir="rtl"
    >
      {topics.map((topic) => (
        <CourseTopic
          key={topic.id}
          topic={topic}
          isActive={activeTopic?.slug === topic.slug}
          onClick={() => handleTopicClick(topic)}
        />
      ))}
    </div>
  );
};

export default CourseTopicList;