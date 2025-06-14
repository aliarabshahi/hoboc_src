// app/components/courses/courses_detail/LessonContent.tsx
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";

interface LessonContentProps {
  topicSlug: string;
  lessonSlug: string;
}

const LessonContent = async ({ topicSlug, lessonSlug }: LessonContentProps) => {
  // Fetch lesson data from the API
  const response = await getApiData(`/course-lessons/?slug=${lessonSlug}`);

  if (response.error) {
    return (
      <div dir="rtl" className="p-4 text-error">
        {response.error}
      </div>
    );
  }

  if (response.message) {
    return (
      <div dir="rtl" className="p-4 text-info">
        {response.message}
      </div>
    );
  }

  // Handle different API response structures
  let lessonData: CoursesLesson | undefined;

  if (Array.isArray(response.data)) {
    lessonData = response.data.find((l: CoursesLesson) => l.slug === lessonSlug);
  } else if (response.data?.results) {
    lessonData = response.data.results.find((l: CoursesLesson) => l.slug === lessonSlug);
  } else {
    lessonData = response.data;
  }

  if (!lessonData) {
    return (
      <div dir="rtl" className="p-4 text-error">
        درس مورد نظر یافت نشد
      </div>
    );
  }

  return (
    <div dir="rtl" className="p-4">
      <h1 className="text-2xl font-bold mb-4">{lessonData.title}</h1>
      
      <div className="bg-base-100 p-6 rounded-box shadow-md">
        <h2 className="text-xl font-bold mb-2">مشخصات درس:</h2>
        <p className="mb-2">
          <span className="font-semibold">توضیحات:</span> {lessonData.description}
        </p>
        <p className="mb-2">
          <span className="font-semibold">مدت زمان:</span> {lessonData.duration} دقیقه
        </p>
        <p className="mb-2">
          <span className="font-semibold">وضعیت:</span> 
          {lessonData.is_published ? " منتشر شده" : " منتشر نشده"}
        </p>
        {lessonData.video_url && (
          <p className="mb-2">
            <span className="font-semibold">لینک ویدیو:</span> {lessonData.video_url}
          </p>
        )}
      </div>
    </div>
  );
};

export default LessonContent;