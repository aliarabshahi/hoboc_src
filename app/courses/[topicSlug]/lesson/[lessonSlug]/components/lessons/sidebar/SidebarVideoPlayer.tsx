// components/lessons/sidebar/SidebarVideoPlayer.tsx

import { CoursesLesson } from "@/app/types/coursesType";
import VideoPlayer from "../VideoPlayer";

export default function SidebarVideoPlayer({
  lessonData,
}: {
  lessonData: CoursesLesson;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <VideoPlayer lessonData={lessonData} />
    </div>
  );
}
