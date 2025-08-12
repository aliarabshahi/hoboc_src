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
import LatestBlogSection from "./components/latest-blogs/LatestBlogSection";
import LatestLessonsSection from "./components/last-courses/LatestLessonsSection";
import HeroBackgroundFooter from "./components/looser/HeroBackgroundFooter";
import CallToAction from "./components/homepage/CallToAction";
import Example from "./components/homepage/SecondaryFeatures";
import Testimonial from "./components/Testimonials";
export default function Home() {
  return (
    <main className="">
      {/* <Hero /> */}
      <NewHero />

      <section className="container mx-auto px-4 md:px-8 lg:px-20" dir="rtl">
        <Vision />
      </section>
      <section className="my-20">
        <CallToAction />
      </section>

      {/* <CoursesCard /> */}
      {/* <RowLessonsData /> */}
      {/* <CoursesDetailWrapper /> */}
      {/* <MainCoursesDetail /> */}

      <section className="container mx-auto px-4 md:px-8 lg:px-20" dir="rtl">
        <LatestLessonsSection />
      </section>


      <section className="my-20">
      <Testimonial />
      </section>

      {/* LatestBlogSection with custom padding and rtl direction */}
      <section className="container mx-auto px-4 md:px-8 lg:px-20" dir="rtl">
        <LatestBlogSection />
      </section>
      <HeroBackgroundFooter />
      {/* <Example /> */}
      {/* <Looser /> */}
    </main>
  );
}
