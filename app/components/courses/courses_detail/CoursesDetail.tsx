import React from "react";
import CoursesDetailHeader from "./CoursesDetailHeader";
import CoursesDetailContent from "./CoursesDetailContent";
import CoursesDetailImage from "./CoursesDetailImage";
import CoursesDetailEnroll from "./CoursesDetailEnroll";
import CourseTopicList from "../CourseTopicList";

const CoursesDetail = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <CourseTopicList />

      <CoursesDetailHeader />

      <div className="flex flex-col lg:flex-row gap-8" dir="rtl">
        <CoursesDetailContent />

        <div className="lg:w-1/3 flex flex-col gap-6">
          <CoursesDetailImage />
          {/* <CoursesDetailEnroll /> */}
        </div>
      </div>
    </div>
  );
};

export default CoursesDetail;
