// app/courses/components/CourseTopics.tsx

import Image from "next/image";
import { CoursesTopic } from "@/app/types/coursesType";

interface CourseTopicsProps {
  topics: CoursesTopic[];
}

export default function CourseTopics({ topics }: CourseTopicsProps) {
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
        {/* Topics List */}
        <ul className="divide-y divide-gray-100 max-h-[50vh] lg:max-h-[calc(100vh-10rem)] overflow-y-auto">
          {topics.map((topic) => (
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
          ))}
        </ul>
      </div>
    </aside>
  );
}
