
// components/CourseTopicList.tsx
import React from "react";
import { getApiData } from "@/app/services/api/getData";
import { Topic } from "@/app/types/course";
import CourseTopic from "./CourseTopic";

const CourseTopicList = async () => {
  const { data, error } = await getApiData("/course-topics/");

  if (error) {
    return (
      <div className="alert alert-error" dir="rtl">
        {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="alert alert-info" dir="rtl">
        دسته‌بندی‌ای برای نمایش وجود ندارد
      </div>
    );
  }

  const topics = data as Topic[];

return (
  <div
    className="pt-3 pb-5 cursor-pointer flex justify-center items-center gap-8 overflow-x-auto px-4"
    dir="rtl"
  >
    {topics.map((topic) => (
      <CourseTopic key={topic.id} topic={topic} />
    ))}
  </div>
);

};

export default CourseTopicList;
