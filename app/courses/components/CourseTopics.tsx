// app/courses/components/CourseTopics.tsx
"use client";

import Image from "next/image";
import { CoursesTopic } from "@/app/types/coursesType";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

interface CourseTopicsProps {
  topics: CoursesTopic[];
}

export default function CourseTopics({ topics }: CourseTopicsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (topics.length === 0) {
    return (
      <div className="text-center p-6 bg-white rounded-xl shadow-sm">
        <h3 className="text-gray-600">هیچ موضوع دوره‌ای یافت نشد</h3>
      </div>
    );
  }

  return (
    <aside className="lg:sticky static lg:top-20 h-auto lg:h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Search Box */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجوی موضوعات..."
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Topics List */}
        <ul className="divide-y divide-gray-100 max-h-[50vh] lg:max-h-[calc(100vh-10rem)] overflow-y-auto">
          {filteredTopics.length === 0 ? (
            <li className="p-4 text-center text-gray-500">نتیجه‌ای یافت نشد</li>
          ) : (
            filteredTopics.map((topic) => (
              <li key={topic.id}>
                <a
                  href={`#topic-${topic.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-hoboc/5 transition-colors duration-200 group"
                >
                  {topic.logo_file && (
                    <div className="flex-shrink-0 bg-white p-1 rounded-lg border border-gray-200 group-hover:border-hoboc/30 transition-colors">
                      <Image
                        src={topic.logo_file}
                        alt={topic.title}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 text-sm truncate">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {topic.catchy_title}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    topic.is_published 
                      ? "bg-hoboc/10 text-hoboc-dark" 
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {topic.is_published ? "فعال" : "غیرفعال"}
                  </span>
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}