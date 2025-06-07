import React from "react";
import CoursesDetailHeader from "./CoursesDetailHeader";
import CoursesDetailContent from "./CoursesDetailContent";
import CoursesDetailImage from "./CoursesDetailImage";
import CoursesDetailEnroll from "./CoursesDetailEnroll";
import CourseTopicList from "../CourseTopicList";
import { getApiData } from "@/app/services/api/getData";
import { Course } from "@/app/types/course";

const CoursesDetail = async () => {
  const { data: courseData, error } = await getApiData(`/course-lessons/`);

  if (error) {
    return (
      <div className="alert alert-error" dir="rtl">
        {error}
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="alert alert-info" dir="rtl">
        دوره مورد نظر یافت نشد
      </div>
    );
  }

  const course = courseData as Course;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <CourseTopicList />

      <CoursesDetailHeader course={course} />

      <div className="flex flex-col lg:flex-row gap-8" dir="rtl">
        <CoursesDetailContent course={course} />

        <div className="lg:w-1/3 flex flex-col gap-6">
          <CoursesDetailImage course={course} />
          {/* <CoursesDetailEnroll course={course} /> */}
        </div>
      </div>
    </div>
  );
};

export default CoursesDetail;