import React from "react";
import Link from "next/link";
import { FaChevronLeft, FaCheck } from "react-icons/fa"; // Changed to ChevronLeft
import { BsBook } from "react-icons/bs";

type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  isFree: boolean;
  order: number;
};

type CourseContent = {
  id: string;
  lessons: Lesson[];
};

const CoursesDetailContent = () => {
  const courseData: CourseContent = {
    id: "react-advanced-2024",
    lessons: [
      {
        id: "compound-components",
        title: "کامپوننت‌های ترکیبی",
        description:
          "یاد بگیرید چگونه APIهای کامپوننت انعطاف‌پذیر با حالت ضمنی مشترانعطاف‌پذیر با حالت ضمنی مشترکانعطاف‌پذیر با حالت ضمنی مشترکانعطاف‌پذیر با حالت ضمنی مشترکانعطاف‌پذیر با حالت ضمنی مشترکک بسازید",
        duration: "۴۵ دقیقه",
        isFree: true,
        order: 1,
      },
      {
        id: "render-props",
        title: "الگوی Render Props",
        description: "تکنیک render props برای ترکیب کامپوننت‌ها را بیاموزید",
        duration: "۳۸ دقیقه",
        isFree: true,
        order: 2,
      },
      {
        id: "context-optimization",
        title: "بهینه‌سازی Context",
        description: "تکنیک‌های پیشرفته برای بهینه‌سازی عملکرد React context",
        duration: "۵۲ دقیقه",
        isFree: true,
        order: 3,
      },
      {
        id: "state-machines",
        title: "ماشین‌های حالت با XState",
        description: "پیاده‌سازی ماشین‌های حالت محدود برای جریان‌های UI پیچیده",
        duration: "۱ ساعت و ۱۵ دقیقه",
        isFree: true,
        order: 4,
      },
      {
        id: "performance-patterns",
        title: "الگوهای عملکرد",
        description: "تکنیک‌های پیشرفته memoization و بهینه‌سازی رندرینگ",
        duration: "۴۹ دقیقه",
        isFree: true,
        order: 5,
      },
      {
        id: "suspense-patterns",
        title: "الگوهای Suspense",
        description: "دریافت داده و رندرینگ ناهمزمان با React Suspense",
        duration: "۵۶ دقیقه",
        isFree: true,
        order: 6,
      },
      {
        id: "advanced-hooks",
        title: "الگوهای پیشرفته هوک‌ها",
        description: "ساخت هوک‌های سفارشی برای استفاده مجدد از منطق پیچیده",
        duration: "۴۲ دقیقه",
        isFree: true,
        order: 7,
      },
      {
        id: "type-safe-react",
        title: "React با تایپ ایمن",
        description: "الگوهای پیشرفته TypeScript برای React",
        duration: "۵۱ دقیقه",
        isFree: true,
        order: 8,
      },
    ],
  };

  return (
    <div className="lg:w-2/3 bg-base-100 rounded-box shadow-md p-6" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <BsBook className="w-6 h-6 ml-2" /> {/* Changed mr to ml */}
        محتوای دوره
      </h2>

      <div className="overflow-y-auto max-h-[300px] pl-4">
        {" "}
        {/* Changed pr to pl */}
        <div className="space-y-3">
          {courseData.lessons.map((lesson) => (
            <Link
              href={`/course/${courseData.id}/lesson/${lesson.id}`}
              key={lesson.id}
            >
              <div className="flex items-center justify-between p-4 hover:bg-base-200 rounded-lg transition-colors duration-200 cursor-pointer">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ml-4 flex-shrink-0 ${
                      lesson.isFree
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {lesson.order}
                  </div>
                  <div>
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="text-sm text-gray-500">
                      {lesson.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xs ml-3">{lesson.duration}</span>{" "}
                  {/* Changed mr to ml */}
                  {lesson.isFree && (
                    <span className="badge badge-success badge-sm">رایگان</span>
                  )}
                  <FaChevronLeft className="w-4 h-4 text-gray-400" />{" "}
                  {/* Changed to ChevronLeft */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesDetailContent;
