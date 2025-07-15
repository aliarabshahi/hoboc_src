"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { BlogTopic } from "@/app/types/blogType";
import { FiChevronDown } from "react-icons/fi";

export default function BlogTopicsDropdown({ topics }: { topics: BlogTopic[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTopic = searchParams.get('topic');

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTopic = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (newTopic) {
      params.set('topic', newTopic);
    } else {
      params.delete('topic');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full md:w-64">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        <FiChevronDown />
      </div>
      <select
        value={currentTopic || ""}
        onChange={handleTopicChange}
        className="block w-full px-4 py-2 pr-10 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-hoboc focus:border-hoboc hover:border-gray-400 transition-colors duration-200"
      >
        <option value="">همه موضوعات</option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.slug}>
            {topic.title}
          </option>
        ))}
      </select>
    </div>
  );
}