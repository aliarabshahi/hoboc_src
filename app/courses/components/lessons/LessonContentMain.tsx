import { CoursesLesson } from "@/app/types/coursesType";
import VideoPlayer from "./VideoPlayer";

export default function LessonContentMain({ lessonData }: { lessonData: CoursesLesson }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">{lessonData.title}</h1>
      
      {lessonData.instructor && (
        <div className="flex items-center gap-3">
          <div className="text-gray-700">مدرس:</div>
          <div className="font-medium">
            {lessonData.instructor.name}
          </div>
        </div>
      )}
      
      <div className="text-gray-600">{lessonData.description}</div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {lessonData.tags.map(tag => (
          <span key={tag.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {tag.name}
          </span>
        ))}
      </div>
      
      <div className="pt-4 border-t mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">مدت زمان:</span>
          <span>{lessonData.duration} دقیقه</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">وضعیت:</span>
          <span className={lessonData.is_published ? "text-green-600" : "text-yellow-600"}>
            {lessonData.is_published ? 'منتشر شده' : 'پیش‌نویس'}
          </span>
        </div>
      </div>
    </div>
  );
}