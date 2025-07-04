// components/lessons/sidebar/Sidebar.tsx

import { CoursesLesson } from "@/app/types/coursesType";
import SidebarLessonDetails from "./SidebarLessonDetails";
import SidebarVideoPlayer from "./SidebarVideoPlayer";
export default function Sidebar({ lessonData }: { lessonData: CoursesLesson }) {
  return (
    <div className="space-y-4">
      <SidebarLessonDetails lessonData={lessonData} />
      <SidebarVideoPlayer lessonData={lessonData} />
    </div>
  );
}
