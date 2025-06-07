// app/components/ActiveTopicDisplay.tsx
"use client";

import { useTopicStore } from "@/app/stores/topicStore";

const ActiveTopicDisplay = () => {
  const activeTopicSlug = useTopicStore((state) => state.activeTopicSlug);

  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-4">
      {activeTopicSlug ? (
        <p>Current active topic slug: <strong>{activeTopicSlug}</strong></p>
      ) : (
        <p>No topic selected</p>
      )}
    </div>
  );
};

export default ActiveTopicDisplay;