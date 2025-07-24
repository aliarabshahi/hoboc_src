// components/Roadmap.tsx
import { RoadmapItem } from "./RoadmapItem";
import { RoadmapLegend } from "./RoadmapLegend";
import { RoadmapItem as RoadmapItemType } from "@/app/types/roadmapType";
import { motion } from "framer-motion";

interface RoadmapProps {
  title: string;
  description: string;
  roadmapData: RoadmapItemType[];
}

export const Roadmap = ({ title, description, roadmapData }: RoadmapProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-hoboc mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div className="space-y-4">
        {roadmapData.map((item) => (
          <RoadmapItem key={item.id} {...item} />
        ))}
      </div>

      <RoadmapLegend />
    </motion.div>
  );
};