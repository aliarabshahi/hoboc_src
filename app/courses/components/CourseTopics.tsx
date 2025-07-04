import Image from "next/image";
import { CoursesTopic } from "@/app/types/coursesType";

interface CourseTopicsProps {
  topics: CoursesTopic[];
}

export default function CourseTopics({ topics }: CourseTopicsProps) {
  if (topics.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500 bg-gray-50 rounded-lg">
        هیچ موضوع دوره‌ای یافت نشد
      </div>
    );
  }

  return (
    <aside className="w-72 bg-white border border-gray-200 rounded-lg shadow-sm h-full overflow-y-auto rtl sticky top-16 max-h-screen">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-lg text-gray-800">همه موضوعات</h2>
      </div>

      <ul className="divide-y divide-gray-100">
        {topics.map((topic) => (
          <li key={topic.id}>
            <a
              href={`#topic-${topic.id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
            >
              {topic.logo_file && (
                <div className="flex-shrink-0">
                  <Image
                    src={topic.logo_file}
                    alt={topic.title}
                    width={36}
                    height={36}
                    className="rounded-full object-cover border border-gray-200"
                  />
                </div>
              )}
              <span className="font-medium text-gray-700 text-sm truncate">
                {topic.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
