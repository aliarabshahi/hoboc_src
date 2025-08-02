
// app/courses/components/CourseTopicsFilter.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CoursesTopic } from "@/app/types/coursesType";

export default function CourseTopicsFilter({
  topics,
  selectedTopicSlug,
}: {
  topics: CoursesTopic[];
  selectedTopicSlug?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    slug ? params.set("topic", slug) : params.delete("topic");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
      <button
        onClick={() => handleSelect("")}
        className={`px-4 py-2 rounded-full font-medium transition ${
          !selectedTopicSlug
            ? "bg-hoboc text-white"
            : "bg-gray-100 text-gray-700 hover:bg-hoboc hover:text-white"
        }`}
      >
        همه موضوعات
      </button>

      {topics.map((topic) => {
        const isActive = topic.slug === selectedTopicSlug;
        return (
          <button
            key={topic.id}
            onClick={() => handleSelect(topic.slug)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              isActive
                ? "bg-hoboc text-white"
                : "bg-gray-100 text-gray-700 hover:bg-hoboc hover:text-white"
            }`}
          >
            {topic.catchy_title || topic.title}
          </button>
        );
      })}
    </div>
  );
}
