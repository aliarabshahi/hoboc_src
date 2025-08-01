"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";
import { ChevronRight } from "lucide-react";
import LessonCardsMainPage from "./LessonCardMainPage";

export default function LatestLessonsSection() {
  const [lessons, setLessons] = useState<CoursesLesson[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await getApiData("/course-lessons/?page_size=6&ordering=-created_at");
        if (res.data) {
          setLessons(Array.isArray(res.data) ? res.data : res.data.results || []);
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchLessons();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCardClick = (e: React.MouseEvent, lessonId: number) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="w-full mt-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-hoboc-dark">
            جدیدترین درس ها
          </h2>
          <Link href="/courses" passHref>
            <button className="button button--gray mr-auto text-white text-base font-medium px-4 py-2 rounded bg-gray-500 hover:bg-hoboc transition">
              بیشتر
            </button>
          </Link>
        </div>

        {/* Arrows + Cards */}
        <div className="relative flex items-center">
          {/* Left Arrow - matches blog layout */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:block absolute -left-10 z-10 text-hoboc-dark hover:text-hoboc transition"
            aria-label="Scroll left"
          >
            <ChevronRight className="rotate-180" size={32} />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="
              flex gap-6 px-2 w-full 
              overflow-x-auto sm:overflow-x-auto 
              md:overflow-hidden 
              pb-4 
              scrollbar-thin scrollbar-thumb-hoboc-dark scrollbar-track-gray-100 
              cursor-grab active:cursor-grabbing
            "
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="min-w-[300px] max-w-[300px] flex-shrink-0"
                onClick={(e) => handleCardClick(e, lesson.id)}
              >
                <LessonCardsMainPage lesson={lesson} />
              </div>
            ))}
          </div>

          {/* Right Arrow - matches blog layout */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:block absolute -right-10 z-10 text-hoboc-dark hover:text-hoboc transition"
            aria-label="Scroll right"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}
