// stores/topicStore.ts
import { create } from "zustand";

interface TopicStore {
  activeTopicSlug: string | null;
  setActiveTopicSlug: (slug: string | null) => void;
}

export const useTopicStore = create<TopicStore>((set) => ({
  activeTopicSlug: null,
  setActiveTopicSlug: (slug) => set({ activeTopicSlug: slug }),
}));