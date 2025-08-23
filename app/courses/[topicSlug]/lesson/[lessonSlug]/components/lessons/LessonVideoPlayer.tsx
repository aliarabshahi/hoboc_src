import { CoursesLesson } from "@/app/types/coursesType";

export default function LessonVideoPlayer({ lessonData }: { lessonData: CoursesLesson }) {
  if (!lessonData.video_url) return null;

  // Extract video hash from Aparat URL (e.g., from "https://www.aparat.com/v/ABC123")
  const getAparatVideoHash = (url: string) => {
    const match = url.match(/aparat\.com\/v\/([^\/]+)/);
    return match ? match[1] : null;
  };

  const videoHash = getAparatVideoHash(lessonData.video_url);

  if (!videoHash) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border">
        <a 
          href={lessonData.video_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:text-blue-800"
        >
          مشاهده ویدیو در آپارات
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <h3 className="text-lg font-bold mb-3">پخش ویدیو</h3>
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src={`https://www.aparat.com/video/video/embed/videohash/${videoHash}/vt/frame`}
          allowFullScreen
          className="w-full h-full"
          title="Aparat Video Player"
        ></iframe>
      </div>
      <div className="mt-2 text-sm text-gray-500 text-center">
        <a 
          href={lessonData.video_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          مشاهده ویدیو در آپارات
        </a>
      </div>
    </div>
  );
}