"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { BlogTopic } from "@/app/types/blogType";

export default function BlogTopicsDropdown({
  topics,
  selectedTopicSlug,
}: {
  topics: BlogTopic[];
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
    <section className="container mx-auto px-4 mt-10">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
        {/* "همه موضوعات" button */}
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

        {/* dynamic topics */}
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
              {topic.catchy_title}
            </button>
          );
        })}
      </div>
    </section>
  );
}
