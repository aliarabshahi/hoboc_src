// components/lessons/sidebar/Sidebar.tsx

import { CoursesLesson } from "@/app/types/coursesType";
import SidebarLessonDetails from "./SidebarLessonDetails";
import SidebarVideoPlayer from "./SidebarVideoPlayer";
import SideBarTopicLessons from "./SideBarTopicLessons";

export default function Sidebar({
  lessonData,
  topicSlug,
}: {
  lessonData: CoursesLesson;
  topicSlug: string;
}) {
  return (
    <div className="space-y-4">
      <SidebarLessonDetails lessonData={lessonData} />
      <SidebarVideoPlayer lessonData={lessonData} />
      <SideBarTopicLessons topicSlug={topicSlug} />
    </div>
  );
}
