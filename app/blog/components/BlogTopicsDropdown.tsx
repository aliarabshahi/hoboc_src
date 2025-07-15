"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { BlogTopic } from "@/app/types/blogType";
import { BsChevronDown } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";

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
  const currentTopic = selectedTopicSlug || "";

  const selectedTopic = topics.find((t) => t.slug === currentTopic);
  const selectedTitle = selectedTopic?.catchy_title || "همه موضوعات";

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("topic", slug);
    } else {
      params.delete("topic");
    }

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative inline-block text-right z-50 pt-4"
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition"
      >
        {selectedTitle}
        <BsChevronDown className="ml-2 text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => handleSelect("")}
              className="block  w-full px-4 py-2 text-base text-gray-700 hover:bg-gray-100 text-right"
            >
              همه موضوعات
            </button>
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSelect(topic.slug)}
                className="block w-full px-4 py-2 text-base text-gray-700 hover:bg-gray-100 text-right"
              >
                {topic.catchy_title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
