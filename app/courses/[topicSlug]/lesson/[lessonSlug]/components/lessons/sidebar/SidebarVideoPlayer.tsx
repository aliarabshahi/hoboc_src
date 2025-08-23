// components/lessons/sidebar/SidebarVideoPlayer.tsx

import { CoursesLesson } from "@/app/types/coursesType";
import LessonVideoPlayer from "../LessonVideoPlayer";

export default function SidebarVideoPlayer({
  lessonData,
}: {
  lessonData: CoursesLesson;
}) {
  return <LessonVideoPlayer lessonData={lessonData} />;
}
