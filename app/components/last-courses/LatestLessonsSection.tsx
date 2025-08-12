"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LessonCardsMainPage from "./LessonCardMainPage";

function SkeletonLessonCard() {
  return (
    <div className="w-full h-[418px] rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
  );
}

function SkeletonArrowButton() {
  return (
    <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse">
      <div className="w-6 h-6" />
    </div>
  );
}

export default function LatestLessonsSection() {
  const [lessons, setLessons] = useState<CoursesLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await getApiData("/course-lessons/?page_size=6&ordering=-created_at");
        if (res.data) {
          setLessons(Array.isArray(res.data) ? res.data : res.data.results || []);
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 >= lessons.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 3 < 0 ? lessons.length - (lessons.length % 3 || 3) : prevIndex - 3
    );
  };

  // Explicitly type the visibleLessons array
  const visibleLessons: (CoursesLesson | null)[] = loading 
    ? Array(3).fill(null) 
    : lessons.slice(currentIndex, currentIndex + 3);

  return (
    <section className="w-full mt-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-hoboc-dark">
            جدیدترین درس ها
          </h2>
          <Link href="/courses" passHref>
            <button className="button button--gray mr-auto text-white text-base font-medium px-4 py-2 rounded bg-hoboc-dark hover:bg-hoboc transition">
              مشاهده همه
            </button>
          </Link>
        </div>

        {/* Lessons grid - matching blog section exactly */}
        <div className="grid gap-6 md:grid-cols-3">
          {visibleLessons.map((lesson, index) => (
            <div key={lesson?.id || index}>
              {!lesson ? (
                <SkeletonLessonCard />
              ) : (
                <LessonCardsMainPage lesson={lesson} />
              )}
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-8 mt-8">
          {loading ? (
            <>
              <SkeletonArrowButton />
              <SkeletonArrowButton />
            </>
          ) : lessons.length > 3 ? (
            <>
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition"
                aria-label="درس های قبلی"
              >
                <ChevronRight size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition"
                aria-label="درس های بعدی"
              >
                <ChevronLeft size={24} />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}