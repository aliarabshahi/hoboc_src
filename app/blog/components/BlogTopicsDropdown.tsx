"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { BlogTopic } from "@/app/types/blogType";

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
      <select
        value={currentTopic || ""}
        onChange={handleTopicChange}
        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hoboc focus:border-hoboc"
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