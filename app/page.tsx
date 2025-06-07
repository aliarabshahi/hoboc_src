// app/page.tsx
import Hero from "./components/hero/Hero";
import Vision from "./components/vision/Vision";
import RowLessonsData from "./components/courses/RowLessonsData";

import CoursesCard from "./components/courses/courses_card/CoursesCard";
import MainCoursesDetail from "./components/courses/MainCoursesDetail";
import CoursesDetail from "./components/courses/courses_detail/CoursesDetail";
import ActiveTopicDisplay from "./components/ActiveTopicDisplay";
export default function Home() {
  return (
    <main className="">
      <Hero />
      <Vision />
      {/* <CoursesCard /> */}
      {/* <RowLessonsData /> */}
      <CoursesDetail />
      {/* <MainCoursesDetail /> */}
      <ActiveTopicDisplay />
    </main>
  );
}
