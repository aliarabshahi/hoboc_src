// app/components/courses/courses_detail/LessonContent.tsx
import { getApiData } from "@/app/services/api/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";

interface LessonContentProps {
  topicSlug: string;
  lessonSlug: string;
}

const LessonContentMain = async ({ topicSlug, lessonSlug }: LessonContentProps) => {
  const response = await getApiData(`/course-lessons/?slug=${lessonSlug}`);

  if (response.error) {
    return <p>{response.error}</p>;
  }

  if (response.message) {
    return <p>{response.message}</p>;
  }

  let lessonData: CoursesLesson | undefined;

  if (Array.isArray(response.data)) {
    lessonData = response.data.find((l: CoursesLesson) => l.slug === lessonSlug);
  } else if (response.data?.results) {
    lessonData = response.data.results.find((l: CoursesLesson) => l.slug === lessonSlug);
  } else {
    lessonData = response.data;
  }

  if (!lessonData) {
    return <p>درس مورد نظر یافت نشد</p>;
  }

  return (
    <div dir="rtl">
      <p>عنوان: {lessonData.title}</p>
      <p>توضیحات: {lessonData.description}</p>
      <p>شناسه: {lessonData.id}</p>
      <p>موضوع: {typeof lessonData.topic === 'string' ? lessonData.topic : lessonData.topic?.title}</p>
      <p>مدرس: {lessonData.instructor ? lessonData.instructor.name : 'ندارد'}</p>
      <p>برچسب‌ها: {lessonData.tags.map(tag => typeof tag === 'string' ? tag : tag.name).join(', ')}</p>
      <p>اسلاگ: {lessonData.slug}</p>
      <p>فایل PDF: {lessonData.pdf_file || 'ندارد'}</p>
      <p>فایل ویدیویی: {lessonData.video_file || 'ندارد'}</p>
      <p>لینک ویدیو: {lessonData.video_url || 'ندارد'}</p>
      <p>تصویر بندانگشتی: {lessonData.thumbnail || 'ندارد'}</p>
      <p>وضعیت انتشار: {lessonData.is_published ? 'منتشر شده' : 'منتشر نشده'}</p>
      <p>رایگان: {lessonData.is_free ? 'بله' : 'خیر'}</p>
      <p>مدت زمان: {lessonData.duration} دقیقه</p>
      <p>تاریخ ایجاد: {lessonData.created_at}</p>
      <p>آخرین بروزرسانی: {lessonData.updated_at}</p>
    </div>
  );
};

export default LessonContentMain;