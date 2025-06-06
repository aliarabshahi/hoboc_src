import CourseLessonCard from "./CourseLessonCard";
import { Course } from "@/app/types/course";

interface CoursesLessonListProps {
  courses: Course[];
}

const CoursesLessonList = ({ courses }: CoursesLessonListProps) => {
  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4"
    >
      {courses.map((course) => (
        <CourseLessonCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CoursesLessonList;
