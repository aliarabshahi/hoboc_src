// app/page.tsx
import Hero from "./components/hero/Hero";
import NewHero from "./components/hero/NewHero";

import Vision from "./components/vision/Vision";
import RowLessonsData from "./components/courses/RowLessonsData";

import CoursesCard from "./components/courses/courses_card/CoursesCard";
import MainCoursesDetail from "./components/courses/MainCoursesDetail";
import CoursesDetail from "./components/courses/courses_detail/CoursesDetail";
import CoursesDetailWrapper from "./components/courses/courses_detail/CoursesDetailWrapper";
import Looser from "./components/looser/Looser";
export default function Home() {
  return (
    <main className="">
      {/* <Hero /> */}
            {/* <NewHero /> */}

      <Vision />
      {/* <CoursesCard /> */}
      {/* <RowLessonsData /> */}
      <CoursesDetailWrapper />
      {/* <MainCoursesDetail /> */}
      <Looser/>
    </main>
  );
}
