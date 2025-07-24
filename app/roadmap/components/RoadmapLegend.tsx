import { RoadmapLevel } from "@/app/types/roadmapType";
import { motion } from "framer-motion";

export const RoadmapLegend = () => {
  const levels: RoadmapLevel[] = ['مبتدی', 'متوسط', 'پیشرفته'];
  
  const getLevelColor = (level: RoadmapLevel): string => {
    switch (level) {
      case 'مبتدی':
        return 'bg-hoboc hover:bg-hoboc-dark text-white';
      case 'متوسط':
        return 'bg-hoboc-dark hover:bg-hoboc-darker text-white';
      case 'پیشرفته':
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      default:
        return 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
        راهنمای سطوح یادگیری
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {levels.map((level) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={level} 
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full transition-colors ${getLevelColor(level)}`}
          >
            <div className="w-3 h-3 rounded-full bg-white/30"></div>
            <span className="font-medium">{level}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};