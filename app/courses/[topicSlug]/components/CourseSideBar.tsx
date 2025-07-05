import { CoursesTopic } from "@/app/types/coursesType";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { FiBookmark, FiUser, FiClock, FiBarChart2, FiFolder } from "react-icons/fi";

export default function CourseSideBar({ topic }: { topic: CoursesTopic }) {
  // Mock data - replace with actual data from your API
  const courseDetails = {
    instructor: { name: "احمد محمدی" },
    duration: "320", // in minutes
    level: "مقدماتی",
    category: "برنامه‌نویسی"
  };

  return (
    <div className="lg:w-80 xl:w-96 flex-shrink-0">
      <div className="bg-base-100 rounded-box shadow-md p-6 sticky top-6">
        {/* Back button */}
        <Link 
          href="/courses" 
          className="flex items-center text-sm text-gray-500 hover:text-hoboc mb-4 transition-colors"
        >
          <BsArrowLeftShort className="w-5 h-5 ml-1" />
          بازگشت به دوره‌ها
        </Link>

        {/* Course Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
          <Image
            src={topic.image}
            alt={topic.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Course Title */}
        <h1 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{topic.title}</h1>

        {/* Course Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
          {topic.description}
        </p>

        {/* Metadata */}
        <div className="mt-3 space-y-2 text-[13px]">
          {courseDetails.instructor && (
            <div className="flex items-center gap-2">
              <FiUser className="text-gray-500" size={14} />
              <span className="text-gray-500">مدرس:</span>
              <span className="text-green-600">
                {courseDetails.instructor.name}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <FiClock className="text-gray-500" size={14} />
            <span className="text-gray-500">مدت زمان:</span>
            <span className="text-green-600">{courseDetails.duration} دقیقه</span>
          </div>

          <div className="flex items-center gap-2">
            <FiBarChart2 className="text-gray-500" size={14} />
            <span className="text-gray-500">سطح:</span>
            <span className="text-green-600">{courseDetails.level}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiFolder className="text-gray-500" size={14} />
            <span className="text-gray-500">دسته‌بندی:</span>
            <span className="text-green-600">{courseDetails.category}</span>
          </div>
        </div>

        {/* Start Course Button */}
        <button className="btn bg-hoboc hover:bg-hoboc-dark text-white w-full mt-6 transition-colors">
          شروع دوره
        </button>

        {/* Tags */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-gray-500 text-[13px] gap-2 mb-2">
            <FiBookmark size={14} className="text-gray-500" />
            <span>برچسب‌ها:</span>
          </div>
          <div className="flex flex-wrap gap-2" dir="ltr">
            {['جاوااسکریپت', 'تایپ‌اسکریپت', 'React'].map(tag => (
              <span 
                key={tag}
                className="bg-hoboc/10 text-hoboc px-2.5 py-0.5 rounded-full text-xs font-medium hover:bg-hoboc-dark/10 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}