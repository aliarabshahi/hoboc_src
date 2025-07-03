import { CoursesLesson } from "@/app/types/coursesType";

export default function VideoPlayer({ lessonData }: { lessonData: CoursesLesson }) {
  if (!lessonData.video_file && !lessonData.video_url) return null;

  return (
    <div className="mt-6 lg:mt-0">
      <h2 className="text-xl font-bold mb-4">ویدیوی آموزشی</h2>
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        {lessonData.video_file ? (
          <video controls className="w-full h-full rounded-lg">
            <source src={lessonData.video_file} type="video/mp4" />
          </video>
        ) : lessonData.video_url ? (
          <div className="text-center p-4">
            <p>لینک ویدیو خارجی:</p>
            <a href={lessonData.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              مشاهده در صفحه جدید
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}