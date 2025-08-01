import Link from "next/link";
import { FiBookOpen, FiClock } from "react-icons/fi";
import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";

// کارت درس ویژه صفحه اصلی سایت
export default function LessonCardsMainPage({ lesson }: { lesson: CoursesLesson }) {
  // گرفتن اسلاگ موضوع درس
  const getTopicSlug = (lesson: CoursesLesson): string => {
    if (lesson.tags && Array.isArray(lesson.tags) && lesson.tags.length > 0 && lesson.tags[0].slug) {
      return lesson.tags[0].slug;
    }
    if (lesson.topic && typeof lesson.topic !== "string" && (lesson.topic as CoursesTopic).slug) {
      return (lesson.topic as CoursesTopic).slug;
    }
    return "general";
  };

  // نمایش عنوان موضوع
  const getTopicTitle = (topic: string | CoursesTopic): string => {
    return typeof topic === "string" ? topic : topic?.title || "بدون موضوع";
  };

  // فرمت زمان درس
  const formatDuration = (duration: number | null): string => {
    if (!duration) return "زمان نامشخص";
    return duration < 60 ? `${duration} دقیقه` : `${Math.floor(duration / 60)} ساعت و ${duration % 60} دقیقه`;
  };

  return (
    <Link
      href={`/courses/${getTopicSlug(lesson)}/lesson/${lesson.slug}`}
      prefetch={false}
      className="group block bg-white p-5 rounded-xl shadow-sm border border-hoboc flex flex-col justify-between transition hover:shadow-md relative overflow-hidden"
    >
      {/* تصویر تامبنیل بالا */}
      {lesson.thumbnail && (
        <div className="-mt-5 -mx-5 mb-4 h-40 overflow-hidden flex items-center justify-center rounded-t-xl">
          <img
            src={lesson.thumbnail}
            alt={lesson.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      )}

      {/* عنوان درس */}
      <h3 className="text-lg font-bold text-gray-700 mb-1 line-clamp-2">
        {lesson.title}
      </h3>

      {/* توضیح کوتاه درس */}
      {lesson.description && (
        <p className="text-gray-500 text-sm mb-3 mt-1 line-clamp-3 leading-6">
          {lesson.description}
        </p>
      )}

      {/* اطلاعات درس با آیکون */}
      <div className="flex items-center justify-between text-sm text-hoboc-dark mt-auto mb-5 pt-3">
        <div className="flex items-center gap-2">
          <FiBookOpen size={14} />
          <span>{getTopicTitle(lesson.topic)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiClock size={14} />
          <span>{formatDuration(lesson.duration)}</span>
        </div>
      </div>

      {/* دکمه مشاهده دوره پایین کارت */}
      <div className="mt-auto">
        <div
          className="block w-full select-none text-center py-3 rounded-xl font-bold
                     bg-white text-hoboc border border-hoboc
                     group-hover:bg-hoboc group-hover:text-white
                     transition-colors duration-200 shadow-sm"
        >
          مشاهده درس
        </div>
      </div>
    </Link>
  );
}
