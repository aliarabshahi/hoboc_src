import { CoursesLesson } from "@/app/types/coursesType"
import VideoPlayer from "./VideoPlayer"

export default function LessonSidebar({ lessonData }: { lessonData: CoursesLesson }) {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h1 className="text-2xl font-bold text-gray-900">{lessonData.title}</h1>
        <p className="text-gray-600 mt-2">{lessonData.description}</p>
        
        <div className="mt-4 space-y-2">
          {lessonData.instructor && (
            <div className="flex justify-between">
              <span className="text-gray-500">مدرس:</span>
              <span>{lessonData.instructor.name}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">مدت زمان:</span>
            <span>{lessonData.duration} دقیقه</span>
          </div>
        </div>
      </div>
      
      <VideoPlayer lessonData={lessonData} />
    </>
  )
}