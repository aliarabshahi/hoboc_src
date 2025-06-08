// stores/topicStore.ts
import { create } from "zustand";
import { CoursesTopic } from "@/app/types/coursesType";

interface TopicStore {
  activeTopic: CoursesTopic | null;
  setActiveTopic: (topic: CoursesTopic | null) => void;
}

export const useTopicStore = create<TopicStore>((set) => ({
  activeTopic: null,
  setActiveTopic: (topic) => set({ activeTopic: topic }),
}));
