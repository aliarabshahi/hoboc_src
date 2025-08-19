import { getApiData } from "@/app/services/api/apiServerFetch";
import CoursesLessonList from "./CoursesLessonList";
import { CoursesLesson } from "@/app/types/coursesType";
import CourseTopicList from "../courses_topic/CourseTopicList";

const CoursesCard = async () => {
  const { data, error } = await getApiData("/course-lessons/");

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
        دوره‌ای برای نمایش وجود ندارد
      </div>
    );
  }

  const courses = data as CoursesLesson[];

  return (
    <section className="py-12" dir="rtl">
      <div className="container mx-auto">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold mb-1 text-center">
            دوره‌های آموزشی
          </h2>

          {/* <CourseTopicList /> */}
          <CoursesLessonList courses={courses} />
        </div>
      </div>
    </section>
  );
};

export default CoursesCard;
